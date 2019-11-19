// @flow

import React from 'react'
import type { Account } from '@ledgerhq/live-common/lib/types'

import Box, { Card } from 'components/base/Box'
import SectionTitle from './SectionTitle'
import Row from '../Row'

import type { Transfer } from '../TransfersList.types'
import { makeAccount } from '../tools'

type SectionProps = {
  date: Date,
  accounts: Account[],
  transfers: Transfer[],
  onClick: string => void,
}

export default ({ date, accounts, transfers, onClick }: SectionProps) => (
  <Box flow={2}>
    <SectionTitle day={date} />
    <Card p={0}>
      {transfers.map((transfer, index) => {
        const account = makeAccount({ accounts, accountId: transfer.accountId })

        return (
          <Row
            key={transfer.id + index.toString()}
            account={account}
            transfer={transfer}
            onClick={onClick}
          />
        )
      })}
    </Card>
  </Box>
)
