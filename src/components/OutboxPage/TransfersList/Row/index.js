// @flow

import React from 'react'
import {
  getAccountCurrency,
  getAccountName,
  getAccountUnit,
} from '@ledgerhq/live-common/lib/account'
import type { Account } from '@ledgerhq/live-common/lib/types'

import { AmountCell, DateCell, AccountCell } from '../Cells'
import type { Transfer } from '../TransfersList.types'
import Row, { Wrapper } from './Row.style'

type RowProps = {
  account: Account,
  transfer: Transfer,
  onClick: string => void,
}

export default ({ account, transfer, onClick }: RowProps) => {
  const currency = getAccountCurrency(account)
  const unit = getAccountUnit(account)

  return (
    <Row onClick={() => onClick(transfer.id)}>
      <Wrapper>
        <DateCell compact transfer={transfer} />
        <AccountCell
          recipient={transfer.recipients[0]}
          accountName={getAccountName(account)}
          currency={currency}
        />
      </Wrapper>
      <AmountCell transfer={transfer} unit={unit} currency={currency} />
    </Row>
  )
}
