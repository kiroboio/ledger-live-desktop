// @flow

import React from 'react'
import { getOperationAmountNumber } from '@ledgerhq/live-common/lib/operation'

import CounterValue from 'components/CounterValue'
import FormattedVal from 'components/base/FormattedVal'

import type { AmountCellProps } from './Cells.types'
import { Cell } from './Cells.styles'

export default ({ transfer, currency, unit }: AmountCellProps) => {
  const amount = getOperationAmountNumber(transfer)

  return (
    <Cell>
      <FormattedVal
        val={amount}
        unit={unit}
        showCode
        fontSize={4}
        alwaysShowSign
        color={amount.isNegative() ? 'palette.text.shade80' : undefined}
      />
      <CounterValue
        color="palette.text.shade60"
        fontSize={3}
        alwaysShowSign
        date={transfer.date}
        currency={currency}
        value={amount}
      />
    </Cell>
  )
}
