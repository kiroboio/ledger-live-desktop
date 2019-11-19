// @flow

import React, { PureComponent } from 'react'
import styled from 'styled-components'
import type { Operation } from '@ledgerhq/live-common/lib/types'

import Address from '../Address'

import type { AddressProps } from './Cells.types'
import { AddressCell } from './Cells.styles'

export default ({ address }: AddressProps) => (
  <AddressCell grow shrink style={{ display: 'block' }}>
    <Address value={address} />
  </AddressCell>
)
