// @flow

import React from 'react'

import Box from 'components/base/Box'
import CryptoCurrencyIcon from 'components/CryptoCurrencyIcon'

import { AddressCell } from '.'
import type { AccountProps } from './Cells.types'
import { Account, AccountNameEllipsis } from './Cells.styles'

export default ({ recipient, currency, accountName }: AccountProps) => (
  <>
    <AddressCell address={recipient} />
    <Account horizontal flow={2}>
      <Box alignItems="center" justifyContent="center">
        <CryptoCurrencyIcon size={16} currency={currency} />
      </Box>
      <AccountNameEllipsis>{accountName}</AccountNameEllipsis>
    </Account>
  </>
)
