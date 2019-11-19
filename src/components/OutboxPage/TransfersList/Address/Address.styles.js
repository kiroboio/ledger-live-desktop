import styled from 'styled-components'

export const Left = styled.div`
  overflow: hidden;
  white-space: nowrap;
`

export const Right = styled.div`
  overflow: hidden;
  white-space: nowrap;
  direction: rtl;
`

export const Middle = styled.div`
  display: block;
  flex-shrink: 1;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  min-width: 1em;
`
