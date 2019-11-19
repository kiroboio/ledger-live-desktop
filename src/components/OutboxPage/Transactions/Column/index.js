// @flow

import React from 'react'

import Column, { Title } from './Column.style'

type ColumnProps = {
  title: string,
  start?: boolean,
  hidden?: boolean,
  nowrap?: boolean,
  children: React.ReactElement,
}

export default ({ title, start, hidden, nowrap, children }: ColumnProps) => (
  <Column
    style={{
      alignItems: start ? 'flex-start' : 'flex-end',
      overflow: hidden ? 'hidden' : 'inherit',
      whiteSpace: nowrap ? 'nowrap' : 'wrap',
    }}
  >
    <Title>{title}</Title>
    {children}
  </Column>
)
