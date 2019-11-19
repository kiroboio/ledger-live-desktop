// @flow

import React from 'react'
import type { BigNumber } from 'bignumber.js'
import type { Currency, Unit } from '@ledgerhq/live-common/lib/types'

import CounterValue from 'components/CounterValue'
import FormattedVal from 'components/base/FormattedVal'

import Column from '../Column/Column.style'

type AmountProps = {
  amount: BigNumber,
  date: Date,
  currency: Currency,
  unit: Unit,
}

export default ({ amount, date, currency, unit }: AmountProps) => (
  <Column
    style={{
      alignItems: 'flex-end',
      overflow: 'hidden',
      whiteSpace: 'nowrap',
    }}
  >
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
      date={date}
      currency={currency}
      value={amount}
    />
  </Column>
)
