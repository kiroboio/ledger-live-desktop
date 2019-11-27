// @flow

import React, { useEffect, useState, useRef, useCallback } from 'react'
import invariant from 'invariant'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { Trans, translate } from 'react-i18next'
import { createStructuredSelector } from 'reselect'
import type { Account, AccountLike, Operation } from '@ledgerhq/live-common/lib/types'
import { getMainAccount, addPendingOperation } from '@ledgerhq/live-common/lib/account'
import useBridgeTransaction from '@ledgerhq/live-common/lib/bridge/useBridgeTransaction'
import Track from 'analytics/Track'
import { updateAccountWithUpdater } from 'actions/accounts'
import { MODAL_SEND } from 'config/constants'
import logger from 'logger'
import { getAccountBridge } from '@ledgerhq/live-common/lib/bridge'
import type { T, Device } from 'types/common'
import { track } from 'analytics/segment'

import { getCurrentDevice } from 'reducers/devices'
import { accountsSelector } from 'reducers/accounts'
import { closeModal, openModal } from 'reducers/modals'
import { DisconnectedDevice, UserRefusedOnDevice } from '@ledgerhq/errors'

import Stepper from 'components/base/Stepper'
import SyncSkipUnderPriority from 'components/SyncSkipUnderPriority'

import StepAmount, { StepAmountFooter } from './steps/01-step-amount'
import StepConnectDevice, { StepConnectDeviceFooter } from './steps/02-step-connect-device'
import StepVerification from './steps/03-step-verification'
import StepConfirmation, { StepConfirmationFooter } from './steps/04-step-confirmation'
// import { enctyptAndSendData } from 'actions/kitransfer'

type OwnProps = {|
  stepId: string,
  onClose: () => void,
  onChangeStepId: string => void,
  params: {
    account: ?AccountLike,
    parentAccount: ?Account,
  },
|}

type StateProps = {|
  t: T,
  device: ?Device,
  accounts: Account[],
  closeModal: string => void,
  openModal: (string, any) => void,
  updateAccountWithUpdater: (string, (Account) => Account) => void,
|}

type Props = {|
  ...OwnProps,
  ...StateProps,
|}

const createSteps = () => [
  {
    id: 'amount',
    label: <Trans i18nKey="send.steps.amount.title" />,
    component: StepAmount,
    footer: StepAmountFooter,
  },
  {
    id: 'device',
    label: <Trans i18nKey="send.steps.connectDevice.title" />,
    component: StepConnectDevice,
    footer: StepConnectDeviceFooter,
    onBack: ({ transitionTo }) => transitionTo('amount'),
  },
  {
    id: 'verification',
    label: <Trans i18nKey="send.steps.verification.title" />,
    component: StepVerification,
    shouldPreventClose: true,
  },
  {
    id: 'confirmation',
    label: <Trans i18nKey="send.steps.confirmation.title" />,
    component: StepConfirmation,
    footer: StepConfirmationFooter,
    onBack: ({ transitionTo, onRetry }) => {
      onRetry()
      transitionTo('amount')
    },
  },
]

const mapStateToProps = createStructuredSelector({
  device: getCurrentDevice,
  accounts: accountsSelector,
})

const mapDispatchToProps = {
  closeModal,
  openModal,
  updateAccountWithUpdater,
  enctyptAndSendData,
}

const Body = ({
  t,
  device,
  openModal,
  closeModal,
  onChangeStepId,
  onClose,
  stepId,
  params,
  accounts,
  updateAccountWithUpdater,
  enctyptAndSendData,
}: Props) => {
  const openedFromAccount = !!params.account
  const [steps] = useState(createSteps)
  const {
    transaction,
    setTransaction,
    account,
    parentAccount,
    setAccount,
    status,
    bridgeError,
    bridgePending,
  } = useBridgeTransaction()

  const [isAppOpened, setAppOpened] = useState(false)
  const [optimisticOperation, setOptimisticOperation] = useState(null)
  const [transactionError, setTransactionError] = useState(null)
  const [signed, setSigned] = useState(false)
  const [kiPass, setKiPass] = useState()
  const [kiPassEntering, setKiPassEntering] = useState(false)
  const [stage, setStage] = useState(0)
  const [transitionTo, setTransitionTo] = useState()
  const [signedTransaction, setSignedTransaction] = useState()
  const signTransactionSubRef = useRef(null)

  const handleCloseModal = useCallback(() => closeModal(MODAL_SEND), [closeModal])

  const handleChangeAccount = useCallback(
    (nextAccount: AccountLike, nextParentAccount: ?Account) => {
      if (account !== nextAccount) {
        setAccount(nextAccount, nextParentAccount)
      }
    },
    [account, setAccount],
  )

  const handleRetry = useCallback(() => {
    setTransactionError(null)
    setOptimisticOperation(null)
    setAppOpened(false)
    setSigned(false)
  }, [])

  const handleTransactionError = useCallback(
    (error: Error) => {
      if (!(error instanceof UserRefusedOnDevice)) {
        logger.critical(error)
      }
      const stepVerificationIndex = steps.findIndex(step => step.id === 'verification')
      if (stepVerificationIndex === -1) return
      setTransactionError(error)
    },
    [steps],
  )

  const handleOperationBroadcasted = useCallback(
    (optimisticOperation: Operation) => {
      if (!account) return
      const mainAccount = getMainAccount(account, parentAccount)
      updateAccountWithUpdater(mainAccount.id, account =>
        addPendingOperation(account, optimisticOperation),
      )
      setOptimisticOperation(optimisticOperation)
      setTransactionError(null)
    },
    [account, parentAccount, updateAccountWithUpdater],
  )

  // Kirobo passcode
  const enteringKiPass = (status: boolean) => {
    if (kiPassEntering !== status) setKiPassEntering(status)
  }

  const setPasscode = (s: string) => {
    if (s !== kiPass) {
      setKiPass(s)
      setKiPassEntering(false)
    }
  }

  // Kirobo: if pass is entered, perform stages
  // stage 1: change recipient and perform 2S transaction
  // stage 2: prepare 2D transaction from Safe to Destination, and perform
  // *: there will be a second request to sign
  // stage 3: prepare the object and send to API

  const handleStage = (data?: any) => {
    if (stage === 1) {
      setStage(2)
    } else if (stage === 2) {
      // TODO: How data is returning back
      setSignedTransaction(data)
      setStage(3)
    }
  }

  // original
  const handleSignTransaction = useCallback(
    async ({ transitionTo }: { transitionTo: string => void }) => {
      if (!account) return
      const mainAccount = getMainAccount(account, parentAccount)
      const bridge = getAccountBridge(account, parentAccount)
      if (!device) {
        handleTransactionError(new DisconnectedDevice())
        transitionTo('confirmation')
        return
      }

      invariant(account && transaction && bridge, 'signTransaction invalid conditions')

      const eventProps = {
        currencyName: mainAccount.currency.name,
        derivationMode: mainAccount.derivationMode,
        freshAddressPath: mainAccount.freshAddressPath,
        operationsLength: mainAccount.operations.length,
      }
      track('SendTransactionStart', eventProps)

      signTransactionSubRef.current = bridge
        .signAndBroadcast(mainAccount, transaction, device.path)
        .subscribe({
          next: e => {
            switch (e.type) {
              case 'signed': {
                track('SendTransactionSigned', eventProps)
                setSigned(true)
                transitionTo('confirmation')
                break
              }
              case 'broadcasted': {
                track('SendTransactionBroadcasted', eventProps)
                handleOperationBroadcasted(e.operation)
                break
              }
              default:
            }
          },
          error: err => {
            const error = err.statusCode === 0x6985 ? new UserRefusedOnDevice() : err
            track(
              error instanceof UserRefusedOnDevice
                ? 'SendTransactionRefused'
                : 'SendTransactionError',
              eventProps,
            )
            handleTransactionError(error)
            transitionTo('confirmation')
          },
        })
    },
    [
      device,
      account,
      parentAccount,
      handleOperationBroadcasted,
      transaction,
      handleTransactionError,
    ],
  )

  type TransactionProps = {
    transitionTo: (*) => void,
  }

  /**
   * Function to handle signing and broadcasting for kiTransaction elements
   * @param { transitionTo } - Function to close the modal
   * @param {Object} data - Data to use for current operation
   * @param {Account} data.account - Account to be sent from
   * @param {Object} data.transaction - Transaction to be used
   *
   * */
  const handleKiTransaction = useCallback(
    async ({ transitionTo, data }: TransactionProps) => {
      if (!account) return
      const mainAccount = getMainAccount(data.account, parentAccount)
      const bridge = getAccountBridge(data.account, parentAccount)
      if (!device) {
        handleTransactionError(new DisconnectedDevice())
        transitionTo('confirmation')
        return
      }

      invariant(data.account && data.transaction && bridge, 'signTransaction invalid conditions')

      const eventProps = {
        currencyName: mainAccount.currency.name,
        derivationMode: mainAccount.derivationMode,
        freshAddressPath: mainAccount.freshAddressPath,
        operationsLength: mainAccount.operations.length,
      }
      track('SendTransactionStart', eventProps)

      signTransactionSubRef.current = bridge
        .signAndBroadcast(mainAccount, data.transaction, device.path)
        .subscribe({
          next: e => {
            switch (e.type) {
              case 'signed': {
                track('SendTransactionSigned', eventProps)
                setSigned(true)
                // if stage 2, then the signed transaction is the one to be sent to API
                stage === 2 ? transitionTo(e.signedTransaction) : transitionTo('confirmation')
                break
              }
              case 'broadcasted': {
                track('SendTransactionBroadcasted', eventProps)
                handleOperationBroadcasted(e.operation)
                break
              }
              default:
            }
          },
          error: err => {
            const error = err.statusCode === 0x6985 ? new UserRefusedOnDevice() : err
            track(
              error instanceof UserRefusedOnDevice
                ? 'SendTransactionRefused'
                : 'SendTransactionError',
              eventProps,
            )
            handleTransactionError(error)
            transitionTo('confirmation')
          },
        })
    },
    [account, device, handleOperationBroadcasted, handleTransactionError, parentAccount, stage],
  )

  /**
   * Function to handle the send of data to Kirobo API
   * @param {transitionTo} - Function to close the modal
   * @param {Object} data - Data for the API
   * @param {string} data.id - ID of the kiTransaction
   * @param {string} data.transaction - Signed transaction for broadcasting
   * @param {string} data.passcode - Passcode to release the transaction for broadcasting
   */
  const handleSendData = ({ data, transitionTo }: SendData) => {
    console.log('KI >> sending data', data)
    // enctyptAndSendData(data)
    transitionTo('confirmation')
  }

  /**
   * Function to handle the switch between regular transaction and kiTransaction
   * @callback transitionTo - Function to call next step
   */
  const handleTransactionChoice = useCallback(
    async ({ transitionTo }: { transitionTo: string => void }) => {
      // If kiPass is set, store 'transitionTo' and set the stage to 1 to launch the kiTrx
      if (kiPass) {
        await setTransitionTo({ transitionTo })
        setStage(1)
      } else handleSignTransaction({ transitionTo })
    },
    [kiPass, handleSignTransaction],
  )

  // Switching the stages
  useEffect(() => {
    const stageOne = async () => {
      // TODO: where should we get the S account?
      const safeAccount = transaction.recipient

      const trx = { ...transaction, recipient: safeAccount }
      const data = { account, transaction: trx }
      handleKiTransaction({ transitionTo: handleStage, data })
    }

    const stageTwo = async () => {
      // TODO: where should we get the S account object?
      const safeAccountDetails = account

      const trx = { ...transaction, disableBroadcast: true }
      const data = { account: safeAccountDetails, transaction: trx }
      handleKiTransaction({ transitionTo: handleStage, data })
    }

    const stageThree = () => {
      // TODO: what should go as ID for the transaction?
      const data = {
        destination: transaction.recipient,
        amount: transaction.amount,
        passcode: kiPass,
        signedTransaction,
      }

      handleSendData({ data, ...transitionTo })
      setStage(0)
    }

    if (stage === 1) {
      // change recipient
      stageOne()
    } else if (stage === 2) {
      stageTwo()
    } else if (stage === 3) {
      stageThree()
    }
  }, [stage])

  const handleStepChange = useCallback(e => onChangeStepId(e.id), [onChangeStepId])

  // only call on mount/unmount
  useEffect(() => {
    const parentAccount = params && params.parentAccount
    const account = (params && params.account) || accounts[0]
    setAccount(account, parentAccount)
    return () => {
      if (signTransactionSubRef.current) {
        signTransactionSubRef.current.unsubscribe()
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const errorSteps = []

  if (transactionError) {
    if (transactionError instanceof UserRefusedOnDevice) {
      errorSteps.push(2)
    } else {
      errorSteps.push(3)
    }
  } else if (bridgeError) {
    errorSteps.push(0)
  }

  const error = transactionError || bridgeError

  const stepperProps = {
    title: t('send.title'),
    initialStepId: stepId,
    steps,
    errorSteps,
    device,
    openedFromAccount,
    account,
    parentAccount,
    transaction,
    isAppOpened,
    hideBreadcrumb: !!error && stepId === 'amount',
    error,
    status,
    bridgePending,
    signed,
    optimisticOperation,
    openModal,
    onClose,
    closeModal: handleCloseModal,
    onChangeAccount: handleChangeAccount,
    onChangeAppOpened: setAppOpened,
    onChangeTransaction: setTransaction,
    onRetry: handleRetry,
    signTransaction: handleTransactionChoice,
    onStepChange: handleStepChange,
    passcode: kiPass,
    setPasscode,
    kiPassEntering,
    enteringKiPass,
  }

  if (!status) return null

  return (
    <Stepper {...stepperProps}>
      <SyncSkipUnderPriority priority={100} />
      <Track onUnmount event="CloseModalSend" />
    </Stepper>
  )
}

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  ),
  translate(),
)(Body)
