// @flow

import { createSelector } from 'reselect'
import { handleActions } from 'redux-actions'

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
  KI_SENDING: (state: KiState, { payload }: { payload: boolean }): KiState => payload,
  KI_RESULT: (state: KiState, { payload }: { payload: KiSendResult }): KiState => {
    console.log(payload)
    const newState = { ...state, result: payload }
    return newState
  },
}

// Selectors

export const kiSelector = (state: { kitransfer: KiState }): KiState => state.kitransfer

export default handleActions(handlers, state)
