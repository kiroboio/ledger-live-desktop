import styled from 'styled-components'
import Box from 'components/base/Box'
import { rgba } from 'styles/helpers'

export const Wrapper = styled.span`
  display: flex;
  flex: 1;
  justify-content: flex-start;
  align-items: center;
`

const Row = styled(Box).attrs(() => ({
  horizontal: true,
  alignItems: 'center',
  justifyContent: 'space-between',
}))`
  border-bottom: 1px solid ${p => p.theme.colors.palette.divider};
  height: 68px;
  opacity: ${p => (p.isOptimistic ? 0.5 : 1)};
  cursor: pointer;

  &:last-child {
    border-bottom: 0;
  }

  &:hover {
    background: ${p => rgba(p.theme.colors.wallet, 0.04)};
  }
`

export default Row
