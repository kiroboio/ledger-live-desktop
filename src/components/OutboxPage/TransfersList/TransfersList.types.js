// @flow

import type { BigNumber } from 'bignumber.js'
import type { Account } from '@ledgerhq/live-common/lib/types'

export type Transfer = {
  accountId: Account,
  blockHash: string,
  blockHeight: number,
  date: Date,
  extra: {},
  fee: BigNumber,
  hash: string,
  id: string,
  recipients: string[],
  senders: string[],
  type: string,
  value: BigNumber,
  status: string,
}

export type TransfersListProps = {
  accounts: Account[],
  transfers: Transfer[],
  onClick: string => void,
}

export type BodyProps = {
  visibleTransfers: Transfer[],
  onAccountClick: string => void,
  showNewAccount: boolean,
}

export type HeaderProps = {
  onModeChange: (*) => void,
  onTextChange: (evt: SyntheticInputEvent<HTMLInputElement>) => void,
  mode: string,
  search?: string,
  range?: string,
}
