// @flow

import React from 'react'
import {
  getAccountCurrency,
  getAccountName,
  getAccountUnit,
} from '@ledgerhq/live-common/lib/account'
import { getOperationAmountNumber } from '@ledgerhq/live-common/lib/operation'
import type { AccountLike, Operation } from '@ledgerhq/live-common/lib/types'

import { Row, Line, Spacer } from './Row.style'

import Account from '../Account'
import Column from '../Column'
import Network from '../Network'
import Time from '../Time'
import Amount from '../Amount'

type RowProps = {
  account: AccountLike,
  transfer: Operation,
  onClick: string => void,
}

export default ({ account, transfer, onClick }: RowProps) => {
  const currency = getAccountCurrency(account)
  const accountName = getAccountName(account)
  const date = transfer.date
  const amount = getOperationAmountNumber(transfer)
  const unit = getAccountUnit(account)

  const amountProps = {
    amount,
    date,
    currency,
    unit,
  }

  return (
    <Row onClick={() => onClick(transfer.id)}>
      <Line>
        <Column nowrap start title="Pending">
          <Time value={date} />
        </Column>
        <Spacer />
        <Column start title="To">
          <Account data={transfer.recipients[0]} />
        </Column>

        <Spacer />
        <Column hidden start title="Via">
          <Network accountName={accountName} currency={currency} />
        </Column>
      </Line>
      <Spacer />
      <Amount {...amountProps} />
    </Row>
  )
}
