import styled from 'styled-components'

import Box from 'components/base/Box'

export const Container = styled(Box).attrs(() => ({ alignItems: 'center', fontSize: 4, pb: 4 }))``

export const Info = styled(Box).attrs(() => ({
  ff: 'Inter|SemiBold',
  color: 'palette.text.shade100',
  mt: 6,
  mb: 4,
  px: 5,
}))`
  text-align: center;
`
export const ImageContainer = styled(Box)`
  div {
    margin: 0 auto;
  }
  svg {
    height: 30px;
  }
`
export const KiInfo = styled(Info)`
  margin-top: 10px;
`

export const Amount = styled.div`
  width: auto;
  padding-right: 10px;
`
