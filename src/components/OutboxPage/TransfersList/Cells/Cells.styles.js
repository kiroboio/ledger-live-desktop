import styled from 'styled-components'

import Box from 'components/base/Box'
import Text from 'components/base/Text'

export const Cell = styled(Box).attrs(() => ({
  px: 4,
  horizontal: false,
  alignItems: 'flex-end',
}))`
  width: 150px;
  text-align: right;
  justify-content: space-between;
  /* height: 32px; */
`

export const Hour = styled(Text).attrs(() => ({
  color: 'palette.text.shade60',
  fontSize: 3,
  ff: 'Inter',
}))`
  letter-spacing: 0.3px;
  /* text-transform: uppercase; */
`

export const Account = styled(Box).attrs(() => ({
  px: 2,
  horizontal: true,
  alignItems: 'center',
}))`
  flex: 1;
  overflow: hidden;
  max-width: 400px;
`

export const AccountNameEllipsis = styled(Box).attrs(() => ({
  ff: 'Inter|SemiBold',
  fontSize: 3,
  color: 'palette.text.shade100',
  flexShrink: 1,
}))`
  flex: 1;
  min-width: 0;
  display: block;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`
// export const AccountCell = styled(Box).attrs(() => ({
//   px: 4,
//   // horizontal: true,
//   alignItems: 'center',
// }))`
//   flex: 1;
//   overflow: hidden;
//   max-width: 400px;
//   height: fit-content;
// `

export const AddressCell = styled(Box).attrs(() => ({
  px: 4,
  horizontal: true,
  alignItems: 'center',
}))`
  width: 150px;
`
