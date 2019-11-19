// @flow

import type { Account, Currency, Unit, Operation } from '@ledgerhq/live-common/lib/types'

import type { Transfer } from '../TransfersList.types'

export type AmountCellProps = {
  transfer: Operation,
  currency: Currency,
  unit: Unit,
}

export type DateCellProps = {
  transfer: Transfer,
}

export type AccountProps = {
  recipient: Account,
  currency: Currency,
  accountName: string,
}

export type AddressProps = {
  address: string,
}
