// @flow

import React from 'react'

import Account, { Wrapper } from './Account.style'

const separator = '...'

export default ({ data }: { data: string }) => (
  <Account>
    <Wrapper>
      <span>{data}</span>
      <span>{separator}</span>
      <span>{data}</span>
    </Wrapper>
  </Account>
)
