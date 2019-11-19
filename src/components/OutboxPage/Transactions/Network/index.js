// @flow

import React from 'react'
import type { Currency } from '@ledgerhq/live-common/lib/types'

import Box from 'components/base/Box'
import CryptoCurrencyIcon from 'components/CryptoCurrencyIcon'

import Network, { Name } from './Network.style'

type NetworkProps = {
  currency: Currency,
  accountName: string,
}

export default ({ currency, accountName }: NetworkProps) => (
  <Network>
    <Box alignItems="center" justifyContent="center">
      <CryptoCurrencyIcon size={16} currency={currency} />
    </Box>
    <Name>{accountName}</Name>
  </Network>
)
