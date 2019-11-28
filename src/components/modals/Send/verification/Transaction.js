// @flow

// Kirobo transaction prompt
import React from 'react'

import FormattedVal from 'components/base/FormattedVal'

import Account from 'components/OutboxPage/Transactions/Account'
import Column from 'components/OutboxPage/Transactions/Column'

import { Row } from 'components/OutboxPage/Transactions/Row/Row.style'
import { Amount } from './Verification.style'

import type { StepProps } from '../types'

export default ({ t, stage, transaction, unit }: StepProps) => (
  <Row style={{ margin: '20px 0 20px 0' }}>
    <Column
      nowrap
      start
      title={
        stage === 1
          ? t('send.steps.verification.accountTitle.deposit')
          : t('send.steps.verification.accountTitle.destination')
      }
    >
      <Account data={transaction.recipient} />
    </Column>
    <Amount>
      <FormattedVal
        val={transaction.amount}
        unit={unit}
        showCode
        fontSize={4}
        alwaysShowSign={false}
      />
    </Amount>
  </Row>
)
