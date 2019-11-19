// @flow

import React from 'react'

import Box from 'components/base/Box'

import { Left, Middle, Right } from './Address.styles'

export default ({ value }: { value: string }) => {
  if (!value) {
    return <Box />
  }

  const quarter = Math.round(value.length / 4)

  const left = value.slice(0, quarter)
  const middle = value.slice(quarter, -quarter)
  const right = value.slice(-quarter)

  return (
    <Box horizontal color="palette.text.shade80" ff="Inter" fontSize={3}>
      <Left>{left}</Left>
      <Middle>{middle}</Middle>
      <Right>{right}</Right>
    </Box>
  )
}
