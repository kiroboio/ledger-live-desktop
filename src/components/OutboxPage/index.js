// @flow

import React from 'react'
import TrackPage from 'analytics/TrackPage'
import Box from 'components/base/Box'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import type { Account } from '@ledgerhq/live-common/lib/types'

import { accountsSelector } from 'reducers/accounts'
import { openModal } from 'reducers/modals'
import { MODAL_SAFE_TRANSFER_DETAILS } from 'config/constants'
import UpdateBanner from 'components/Updater/Banner'
import { TopBannerContainer } from '../DashboardPage'
import MigrationBanner from '../modals/MigrateAccounts/Banner'

import OutboxHeader from './OutboxHeader'
import TransfersList from './TransfersList'
import { mockOutbox } from './mock_data'
import type { Transfer } from './TransfersList/TransfersList.types'

type OutboxPageProps = {
  outbox: [],
  accounts: Account[],
  openModal: (string, Object) => *,
}

const AccountsPage = ({ outbox, accounts, openModal }: OutboxPageProps) => {
  const handleTransferClick = (transferId: string) => {
    const transfer = outbox.filter(transfer => transfer.id === transferId)[0]
    console.log(transfer)
    console.log(transferId)
    openModal(MODAL_SAFE_TRANSFER_DETAILS, { transfer })
  }

  const isEmpty = outbox.length === 0

  const content = (
    <>
      <TrackPage category="Outbox" accountsLength={outbox.length} />
      <TopBannerContainer>
        {isEmpty && <UpdateBanner />}
        <MigrationBanner />
      </TopBannerContainer>
      <OutboxHeader />
      <TransfersList accounts={accounts} onClick={handleTransferClick} transfers={outbox} />
    </>
  )

  return isEmpty ? content : <Box>{content}</Box>
}

// TODO: Remove below mock data
const outboxMock = () => {
  const data: Transfer[] = mockOutbox
  return data
}

const mapStateToProps = createStructuredSelector({
  outbox: outboxMock,
  accounts: accountsSelector,
})

export default connect(
  mapStateToProps,
  { openModal },
)(AccountsPage)
