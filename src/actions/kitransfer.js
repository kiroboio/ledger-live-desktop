// @flow

import type { Account } from '@ledgerhq/live-common/lib/types'
import type { BigNumber } from 'bignumber.js'

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

export const enctyptAndSendData = ({
  destination,
  amount,
  passcode,
  signedTransaction,
}: KiData) => {
  // TODO: encrypt the trx with passcode
  const encryptedTrx = 'this is encTrx'
  const dataObject: KiObject = { destination, amount, trasnaction: encryptedTrx }
  // TODO: send the object and return the status
  return {
    type: 'KI:OBJECT_SENT',
    payload: dataObject,
  }
}
