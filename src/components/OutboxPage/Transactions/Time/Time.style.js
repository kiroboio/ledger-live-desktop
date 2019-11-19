import styled from 'styled-components'

import Text from 'components/base/Text'

// const Time = styled.div`
//   white-space: nowrap;

// `

const Time = styled(Text).attrs(() => ({
  color: 'palette.text.shade60',
  fontSize: 3,
  ff: 'Inter',
}))`
  letter-spacing: 0.3px;
  white-space: nowrap;
  /* text-transform: uppercase; */
`
export default Time
