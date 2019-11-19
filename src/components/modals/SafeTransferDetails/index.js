// @flow

import React, { Fragment, Component, useCallback } from 'react'
import { connect } from 'react-redux'
import { openURL } from 'helpers/linking'
import { Trans, translate } from 'react-i18next'
import styled from 'styled-components'
import { push } from 'react-router-redux'
import moment from 'moment'
import {
  getOperationAmountNumber,
  findOperationInAccount,
} from '@ledgerhq/live-common/lib/operation'
import { getTransactionExplorer, getDefaultExplorerView } from '@ledgerhq/live-common/lib/explorers'
import { listTokenTypesForCryptoCurrency } from '@ledgerhq/live-common/lib/currencies'
import uniq from 'lodash/uniq'

import TrackPage from 'analytics/TrackPage'
import type { Operation } from '@ledgerhq/live-common/lib/types'
import {
  getAccountCurrency,
  getAccountUnit,
  getMainAccount,
  findSubAccountById,
} from '@ledgerhq/live-common/lib/account'

import type { T } from 'types/common'
import { MODAL_SAFE_TRANSFER_DETAILS } from 'config/constants'
import { urls } from 'config/urls'

import { getMarketColor } from 'styles/helpers'
import Box from 'components/base/Box'
import Button from 'components/base/Button'
// import Bar from 'components/base/Bar'
import FormattedVal from 'components/base/FormattedVal'
import Modal, { ModalBody } from 'components/base/Modal'
import Text from 'components/base/Text'
import LabelInfoTooltip from 'components/base/LabelInfoTooltip'
import OperationComponent from 'components/OperationsList/Operation'

import ConfirmationCheck from 'components/OperationsList/ConfirmationCheck'
import CopyWithFeedback from 'components/base/CopyWithFeedback'
import FakeLink from 'components/base/FakeLink'
import Ellipsis from 'components/base/Ellipsis'
import { accountSelector } from 'reducers/accounts'
import { openModal } from 'reducers/modals'

import { confirmationsNbForCurrencySelector, marketIndicatorSelector } from 'reducers/settings'
import IconChevronRight from 'icons/ChevronRight'
import IconExternalLink from 'icons/ExternalLink'
import CounterValue from 'components/CounterValue'
import Link from '../../base/Link'

import {
  TextEllipsis,
  Separator,
  GradientHover,
  Address,
  OpDetailsSection,
  NoMarginWrapper,
  B,
  OpDetailsTitle,
  OpDetailsData,
} from './SafeTransferDetails.styles'
import type { Props, openOperationType, ModalRenderProps } from './SafeTransferDetails.types'

const mapDispatchToProps = {
  openModal,
  push,
}

const mapStateToProps = (state, { transfer }) => {
  // const {transferId, accountId} = transfer
  const marketIndicator = marketIndicatorSelector(state)
  // const parentAccount: ?Account = parentId && accountSelector(state, { accountId: parentId })
  // let account: ?AccountLike
  // if (parentAccount) {
  //   account = findSubAccountById(parentAccount, accountId)
  // } else {
  const account = accountSelector(state, { accountId: transfer.accountId })
  // }
  const mainCurrency = account && account.type === 'Account' ? account.currency : null
  const confirmationsNb = mainCurrency
    ? confirmationsNbForCurrencySelector(state, { currency: mainCurrency })
    : 0
  const operation = account ? findOperationInAccount(account, transfer.id) : null
  return {
    marketIndicator,
    account,
    // parentAccount,
    operation,
    confirmationsNb,
    currentLocation: state.router.location.pathname,
  }
}

const OperationDetails = connect(
  mapStateToProps,
  mapDispatchToProps,
)((props: Props) => {
  const {
    t,
    onClose,
    operation,
    account,
    parentAccount,
    confirmationsNb,
    marketIndicator,
    openModal,
    parentOperation,
    push,
    currentLocation,
  } = props

  if (!operation || !account) return null
  const mainAccount = getMainAccount(account, parentAccount)
  const { extra, hash, date, senders, type, fee, recipients } = operation
  const { name } = mainAccount
  const currency = getAccountCurrency(account)
  const unit = getAccountUnit(account)
  const amount = getOperationAmountNumber(operation)
  const isNegative = amount.isNegative()
  const marketColor = getMarketColor({
    marketIndicator,
    isNegative,
  })
  const confirmations = operation.blockHeight ? mainAccount.blockHeight - operation.blockHeight : 0
  const isConfirmed = confirmations >= confirmationsNb

  const url = getTransactionExplorer(getDefaultExplorerView(mainAccount.currency), operation.hash)
  const uniqueSenders = uniq(senders)

  const { hasFailed } = operation
  const subOperations = operation.subOperations || []
  const internalOperations = operation.internalOperations || []

  const isToken = listTokenTypesForCryptoCurrency(mainAccount.currency).length > 0

  const openOperation = useCallback(
    (type: openOperationType, operation: Operation, parentOperation?: Operation) => {
      const data = {
        operationId: operation.id,
        accountId: operation.accountId,
        parentOperation: undefined,
        parentId: undefined,
      }
      if (['subOperation', 'internalOperation'].includes(type)) {
        data.parentOperation = parentOperation
        if (type === 'subOperation') {
          data.parentId = account.id
        }
      }
      openModal(MODAL_SAFE_TRANSFER_DETAILS, data)
    },
    [openModal, account],
  )

  const goToMainAccount = useCallback(() => {
    const url = `/account/${mainAccount.id}`
    if (currentLocation !== url) {
      push(url)
    }
    onClose()
  }, [mainAccount, push, onClose, currentLocation])

  const goToSubAccount = useCallback(() => {
    const url = `/account/${mainAccount.id}/${account.id}`
    if (currentLocation !== url) {
      push(url)
    }
    onClose()
  }, [mainAccount, account, push, onClose, currentLocation])

  return (
    <ModalBody
      title={t('operationDetails.title')}
      onClose={onClose}
      onBack={parentOperation ? () => openOperation('goBack', parentOperation) : undefined}
      render={() => (
        <Box flow={3}>
          <Box alignItems="center" mt={1}>
            <ConfirmationCheck
              marketColor={marketColor}
              isConfirmed={isConfirmed}
              hasFailed={hasFailed}
              style={{
                transform: 'scale(1.5)',
              }}
              t={t}
              type={type}
              withTooltip={false}
            />
          </Box>
          <Box my={4} alignItems="center">
            <Box selectable>
              {hasFailed ? null : (
                <FormattedVal
                  color={amount.isNegative() ? 'palette.text.shade80' : undefined}
                  unit={unit}
                  alwaysShowSign
                  showCode
                  val={amount}
                  fontSize={7}
                  disableRounding
                />
              )}
            </Box>
            <Box mt={1} selectable>
              {hasFailed ? null : (
                <CounterValue
                  color="palette.text.shade60"
                  fontSize={5}
                  date={date}
                  currency={currency}
                  value={amount}
                />
              )}
            </Box>
          </Box>
          {subOperations.length > 0 && account.type === 'Account' && (
            <React.Fragment>
              <OpDetailsSection>
                {t(
                  isToken
                    ? 'operationDetails.tokenOperations'
                    : 'operationDetails.subAccountOperations',
                )}
                <LabelInfoTooltip
                  text={t(
                    isToken
                      ? 'operationDetails.tokenTooltip'
                      : 'operationDetails.subAccountTooltip',
                  )}
                  style={{ marginLeft: 4 }}
                />
              </OpDetailsSection>
              <Box>
                {subOperations.map((op, i) => {
                  const opAccount = findSubAccountById(account, op.accountId)

                  if (!opAccount) return null

                  return (
                    <NoMarginWrapper key={`${op.id}`}>
                      <OperationComponent
                        compact
                        text={getAccountCurrency(opAccount).name}
                        operation={op}
                        account={opAccount}
                        parentAccount={account}
                        onOperationClick={() => openOperation('subOperation', op, operation)}
                        t={t}
                      />
                      {i < subOperations.length - 1 && <B />}
                    </NoMarginWrapper>
                  )
                })}
              </Box>
            </React.Fragment>
          )}

          {internalOperations.length > 0 && account.type === 'Account' && (
            <React.Fragment>
              <OpDetailsSection>
                {t('operationDetails.internalOperations')}
                <LabelInfoTooltip
                  text={t('operationDetails.internalOpTooltip')}
                  style={{ marginLeft: 4 }}
                />
              </OpDetailsSection>
              <Box>
                {internalOperations.map((op, i) => (
                  <NoMarginWrapper key={`${op.id}`}>
                    <OperationComponent
                      compact
                      text={account.currency.name}
                      operation={op}
                      account={account}
                      onOperationClick={() => openOperation('internalOperation', op, operation)}
                      t={t}
                    />
                    {i < internalOperations.length - 1 && <B />}
                  </NoMarginWrapper>
                ))}
              </Box>
            </React.Fragment>
          )}

          {internalOperations.length || subOperations.length ? (
            <OpDetailsSection mb={2}>
              {t('operationDetails.details', { currency: currency.name })}
            </OpDetailsSection>
          ) : null}

          <Box horizontal flow={2}>
            <Box flex={1}>
              <OpDetailsTitle>{t('operationDetails.account')}</OpDetailsTitle>
              <OpDetailsData horizontal>
                <TextEllipsis style={parentAccount ? { maxWidth: '50%', flexShrink: 0 } : null}>
                  <Link onClick={goToMainAccount}>{name}</Link>
                </TextEllipsis>

                {parentAccount ? (
                  <>
                    <Separator>{'/'}</Separator>
                    <TextEllipsis>
                      <Link onClick={goToSubAccount}>{currency.name}</Link>
                    </TextEllipsis>
                  </>
                ) : null}
              </OpDetailsData>
            </Box>
            <Box flex={1}>
              <OpDetailsTitle>{t('operationDetails.date')}</OpDetailsTitle>
              <OpDetailsData>{moment(date).format('LLL')}</OpDetailsData>
            </Box>
          </Box>
          <B />
          <Box horizontal flow={2}>
            {isNegative && (
              <Box flex={1}>
                <OpDetailsTitle>{t('operationDetails.fees')}</OpDetailsTitle>
                {fee ? (
                  <Fragment>
                    <OpDetailsData>
                      <FormattedVal
                        unit={mainAccount.unit}
                        showCode
                        val={fee}
                        color="palette.text.shade80"
                      />
                      <Box horizontal>
                        <CounterValue
                          color="palette.text.shade60"
                          date={date}
                          fontSize={3}
                          currency={mainAccount.currency}
                          value={fee}
                          alwaysShowSign={false}
                          subMagnitude={1}
                          prefix={
                            <Box mr={1} color="palette.text.shade60" style={{ lineHeight: 1.2 }}>
                              {'≈'}
                            </Box>
                          }
                        />
                      </Box>
                    </OpDetailsData>
                  </Fragment>
                ) : (
                  <OpDetailsData>{t('operationDetails.noFees')}</OpDetailsData>
                )}
              </Box>
            )}
            <Box flex={1}>
              <OpDetailsTitle>{t('operationDetails.status')}</OpDetailsTitle>
              <OpDetailsData
                color={hasFailed ? 'alertRed' : isConfirmed ? 'positiveGreen' : null}
                horizontal
                flow={1}
              >
                <Box>
                  {hasFailed
                    ? t('operationDetails.failed')
                    : isConfirmed
                    ? t('operationDetails.confirmed')
                    : t('operationDetails.notConfirmed')}
                </Box>
                {hasFailed ? null : <Box>{`(${confirmations})`}</Box>}
              </OpDetailsData>
            </Box>
          </Box>
          <B />
          <Box>
            <OpDetailsTitle>{t('operationDetails.identifier')}</OpDetailsTitle>
            <OpDetailsData>
              <Ellipsis canSelect>{hash}</Ellipsis>
              <GradientHover>
                <CopyWithFeedback text={hash} />
              </GradientHover>
            </OpDetailsData>
          </Box>
          <B />
          <Box>
            <OpDetailsTitle>{t('operationDetails.from')}</OpDetailsTitle>
            <DataList lines={uniqueSenders} t={t} />
          </Box>
          <B />
          <Box>
            <Box horizontal>
              <OpDetailsTitle>{t('operationDetails.to')}</OpDetailsTitle>
              {recipients.length > 1 ? (
                <Link>
                  <FakeLink
                    underline
                    fontSize={3}
                    ml={2}
                    color="palette.text.shade80"
                    onClick={() => openURL(urls.multipleDestinationAddresses)}
                    iconFirst
                  >
                    <Box mr={1}>
                      <IconExternalLink size={12} />
                    </Box>
                    {t('operationDetails.multipleAddresses')}
                  </FakeLink>
                </Link>
              ) : null}
            </Box>
            <DataList lines={recipients} t={t} />
          </Box>
          {Object.entries(extra).map(([key, value]) => (
            <Box key={key}>
              <OpDetailsTitle>
                <Trans i18nKey={`operationDetails.extra.${key}`} defaults={key} />
              </OpDetailsTitle>
              <OpDetailsData>{value}</OpDetailsData>
            </Box>
          ))}
        </Box>
      )}
      renderFooter={() => (
        <div
          style={{
            width: '100%',
            display: 'flex',
            justifyContent: 'space-between',
          }}
        >
          {/* TODO: Add the 'Cancel' function */}
          <Button danger onClick={() => {}}>
            {t('safeTransferDetails.cancel')}
          </Button>
          {url && (
            <Button primary onClick={() => openURL(url)}>
              {t('safeTransferDetails.viewTransfer')}
            </Button>
          )}
        </div>
      )}
    >
      <TrackPage category="Modal" name="OperationDetails" />
    </ModalBody>
  )
})

const OperationDetailsWrapper = ({ t }: { t: T }) => (
  <Modal
    name={MODAL_SAFE_TRANSFER_DETAILS}
    centered
    render={(props: ModalRenderProps) => {
      const { data, onClose } = props
      return <OperationDetails t={t} {...data} onClose={onClose} />
    }}
  />
)

export default translate()(OperationDetailsWrapper)

const More = styled(Text).attrs(p => ({
  ff: p.ff ? p.ff : 'Inter|Bold',
  fontSize: p.fontSize ? p.fontSize : 2,
  color: p.color || 'palette.text.shade100',
  tabIndex: 0,
}))`
  text-transform: ${p => (!p.textTransform ? 'auto' : 'uppercase')};
  outline: none;
`

export class DataList extends Component<{ lines: string[], t: T }, *> {
  state = {
    showMore: false,
  }
  onClick = () => {
    this.setState(({ showMore }) => ({ showMore: !showMore }))
  }
  render() {
    const { lines, t } = this.props
    const { showMore } = this.state
    // Hardcoded for now
    const numToShow = 2
    const shouldShowMore = lines.length > 3
    return (
      <Box>
        {(shouldShowMore ? lines.slice(0, numToShow) : lines).map(line => (
          <OpDetailsData key={line}>
            <Address>{line}</Address>
            <GradientHover>
              <CopyWithFeedback text={line} />
            </GradientHover>
          </OpDetailsData>
        ))}
        {shouldShowMore && !showMore && (
          <Box onClick={this.onClick} py={1}>
            <More fontSize={4} color="wallet" ff="Inter|SemiBold" mt={1}>
              <IconChevronRight size={12} style={{ marginRight: 5 }} />
              {t('operationDetails.showMore', { recipients: lines.length - numToShow })}
            </More>
          </Box>
        )}
        {showMore &&
          lines.slice(numToShow).map(line => (
            <OpDetailsData key={line}>
              <Address>{line}</Address>
              <GradientHover>
                <CopyWithFeedback text={line} />
              </GradientHover>
            </OpDetailsData>
          ))}
        {shouldShowMore && showMore && (
          <Box onClick={this.onClick} py={1}>
            <More fontSize={4} color="wallet" ff="Inter|SemiBold" mt={1}>
              <IconChevronRight size={12} style={{ marginRight: 5 }} />
              {t('operationDetails.showLess')}
            </More>
          </Box>
        )}
      </Box>
    )
  }
}
