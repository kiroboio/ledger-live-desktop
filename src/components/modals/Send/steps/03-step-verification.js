// @flow

import React, { PureComponent } from 'react'
import { getAccountUnit } from '@ledgerhq/live-common/lib/account'

import Verification from '../verification/Verification'
import KiVerification from '../verification/KiVerification'

import type { StepProps } from '../types'

export default class StepVerification extends PureComponent<StepProps> {
  componentDidMount() {
    this.signTransaction()
  }

  signTransaction = async () => {
    const { transitionTo } = this.props
    // TODO: not very good pattern to pass transitionTo... Stepper needs to be
    // controlled
    this.props.signTransaction({ transitionTo })
  }

  render() {
    const { t, device, passcode, transaction, account, stage } = this.props
    const isBlue = device && device.modelId === 'blue'
    const verificationProps = { t, device, isBlue }

    // if passcode is used > use Kirobo updated component
    const unit = getAccountUnit(account)
    const trx = { t, transaction, stage, unit }
    const kiVerificationProps = { ...verificationProps, trx }

    return passcode ? (
      <KiVerification {...kiVerificationProps} />
    ) : (
      <Verification {...verificationProps} />
    )
  }
}
