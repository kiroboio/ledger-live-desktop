// @flow

import CryptoJS from 'crypto-js'
import type { Account } from '@ledgerhq/live-common/lib/types'
import type { BigNumber } from 'bignumber.js'
import type { KiSendResult } from 'actions/kitransfer'

export type KiData = {
  destination: string,
  amount: BigNumber,
  passcode: string,
  signedTransaction: string,
}

export type KiObject = {
  destination: string,
  amount: BigNumber,
  transaction: string,
}

export const enctyptAndSendData = async ({
  destination,
  amount,
  passcode,
  signedTransaction,
}: KiData) => {
  const encryptedTrx = CryptoJS.AES.encrypt(signedTransaction, passcode).toString()
  const dataObject: KiObject = { destination, amount, transaction: encryptedTrx }

  // TODO: send the object and return the status
  // TODO: return the result
  const payload: KiSendResult = { status: true, message: 'Hello' }
  return {
    type: 'KI_RESULT',
    payload,
  }
}
