// @flow

import React from 'react'
import { Trans } from 'react-i18next'
import type { AccountLike, Operation } from '@ledgerhq/live-common/lib/types'

import Text from 'components/base/Text'
import StickyBackToTop from 'components/StickyBackToTop'
import Box from 'components/base/Box'

import Footer from './Footer'
import Section from './Section'
import { groupTransfersByDate } from './tools'

type TransactionsProps = {
  accounts: AccountLike[],
  transfers: Operation[],
  onClick: string => void,
}

export default ({ accounts, transfers, onClick }: TransactionsProps) => {
  let content = (
    <Text style={{ display: 'block', padding: 60, textAlign: 'center' }}>
      <Trans i18nKey="outbox.noResultFound" />
    </Text>
  )

  const isEmpty = transfers.length === 0

  if (!isEmpty) {
    const sorted: {} = groupTransfersByDate(transfers)
    content = (
      <Box flow={4}>
        {Object.keys(sorted).map(key => {
          const date = new Date(key)
          return (
            <Section
              key={key}
              date={date}
              accounts={accounts}
              transfers={sorted[key]}
              onClick={onClick}
            />
          )
        })}
        <Footer />
      </Box>
    )
  }

  return (
    <div style={{ paddingBlock: 70 }}>
      {content}
      <StickyBackToTop scrollUpOnMount />
    </div>
  )
}
