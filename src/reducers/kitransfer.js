// @flow

import { createSelector } from 'reselect'
import { handleActions } from 'redux-actions'
// import accountModel from 'helpers/accountModel'
// import logger from 'logger'
// import type { Account } from '@ledgerhq/live-common/lib/types'
// import {
//   flattenAccounts,
//   clearAccount,
//   canBeMigrated,
//   getAccountCurrency,
// } from '@ledgerhq/live-common/lib/account'
// import { getEnv } from '@ledgerhq/live-common/lib/env'
// import { OUTDATED_CONSIDERED_DELAY, DEBUG_SYNC } from 'config/constants'
// import { currenciesStatusSelector, currencyDownStatusLocal } from './currenciesStatus'
// import { starredAccountIdsSelector } from './settings'

// export type AccountsState = Account[]
// const state: AccountsState = []

export type KiSendResult = {
  status: boolean,
  message?: string,
}

export type KiState = {
  isSending: '',
  result: KiSendResult,
}
const state: KiState = { isSending: false, result: { status: false, message: '' } }

const handlers: Object = {
  SET_SENDING: (state: KiState, { payload }: { payload: boolean }): KiState => payload,
  SET_RESULT: (state: KiState, { payload }: { payload: KiSendResult }): KiState => {
    const newState = { ...state, result: payload }
    return newState
  },

  // SET_ACCOUNTS: (
  //   state: AccountsState,
  //   { payload: accounts }: { payload: Account[] },
  // ): AccountsState => accounts,
  //
  // ADD_ACCOUNT: (
  //   state: AccountsState,
  //   { payload: account }: { payload: Account },
  // ): AccountsState => {
  //   if (state.some(a => a.id === account.id)) {
  //     logger.warn('ADD_ACCOUNT attempt for an account that already exists!', account.id)
  //     return state
  //   }
  //   return [...state, account]
  // },
}

// Selectors

export const kiSelector = (state: { kitransfer: KiState }): KiState => state.kitransfer

// export const accountsSelector = (state: { accounts: AccountsState }): Account[] => state.accounts
//
//
// export const activeAccountsSelector = createSelector(
//   accountsSelector,
//   currenciesStatusSelector,
//   (accounts, currenciesStatus) =>
//     accounts.filter(a => !currencyDownStatusLocal(currenciesStatus, a.currency)),
// )
//
// export const isUpToDateSelector = createSelector(
//   activeAccountsSelector,
//   accounts =>
//     accounts.every(a => {
//       const { lastSyncDate } = a
//       const { blockAvgTime } = a.currency
//       if (!blockAvgTime) return true
//       const outdated =
//         Date.now() - (lastSyncDate || 0) > blockAvgTime * 1000 + OUTDATED_CONSIDERED_DELAY
//       if (outdated && DEBUG_SYNC) {
//         logger.log('account not up to date', a)
//       }
//       return !outdated
//     }),
// )
//
export default handleActions(handlers, state)
