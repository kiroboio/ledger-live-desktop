// @flow

import type { Transfer } from './TransfersList.types'
import {
  groupAccountOperationsByDay,
  groupAccountsOperationsByDay,
  flattenAccounts,
} from '@ledgerhq/live-common/lib/account'
import keyBy from 'lodash/keyBy'
import type { Account, Currency } from '@ledgerhq/live-common/lib/types'

export const groupTransfersByDate = (transfers: Transfer[]) => {
  const result = {}
  const sorted = transfers.sort((a, b) => new Date(b.date) - new Date(a.date))
  sorted.forEach(transfer => {
    const date = transfer.date.toString()
    if (!Object.keys(result).includes(date)) {
      result[date] = [transfer]
    } else {
      result[date].push(transfer)
    }
  })

  return result
}

type MakeAccountProps = {
  accounts: any,
  accountId: any,
}
export const makeAccount = ({ accounts, accountId }: MakeAccountProps) => {
  const all = flattenAccounts(accounts || [])
  const accountsMap = keyBy(all, 'id')
  const account = accountsMap[accountId]
  return account
}
