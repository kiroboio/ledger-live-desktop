// @flow
import React from 'react'

import FormattedVal from 'components/base/FormattedVal'

import { Row } from '../../../OutboxPage/Transactions/Row/Row.style'
import Column from '../../../OutboxPage/Transactions/Column'
import Account from '../../../OutboxPage/Transactions/Account'

import type { StepProps } from '../types'

export default ({ stage, transaction, unit }: StepProps) => (
  <Row style={{ margin: '20px 0 20px 0' }}>
    <Column nowrap start title={stage === 1 ? 'Deposit Account #:' : 'Destination Account #:'}>
      <Account data={transaction.recipient} />
    </Column>

    <div style={{ width: 'auto', paddingRight: '10px' }}>
      <FormattedVal
        val={transaction.amount}
        unit={unit}
        showCode
        fontSize={4}
        alwaysShowSign={false}
      />
    </div>
  </Row>
)
