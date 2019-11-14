import styled from 'styled-components'
import fontFamily from 'styles/styled/fontFamily'
import { fontSize } from 'styled-system'
import Box from 'components/base/Box'
import { radii } from 'styles/theme'

export const Container = styled(Box).attrs(() => ({
  horizontal: true,
}))`
  background: ${p =>
    p.disabled
      ? p.theme.colors.palette.background.default
      : p.theme.colors.palette.background.paper};
  border-radius: ${p => p.theme.radii[1]}px;
  border-width: 1px;
  border-style: solid;
  border-color: ${p =>
    p.error
      ? p.theme.colors.pearl
      : p.warning
      ? p.theme.colors.warning
      : p.isFocus
      ? p.theme.colors.wallet
      : p.theme.colors.palette.divider};
  box-shadow: ${p => (p.isFocus ? `rgba(0, 0, 0, 0.05) 0 2px 2px` : 'none')};
  height: ${p => (p.small ? '34' : '40')}px;
  position: relative;

  &:not(:hover) {
    background: ${p => (!p.isFocus && p.editInPlace ? 'transparent' : undefined)};
    border-color: ${p => (!p.isFocus && p.editInPlace ? 'transparent' : undefined)};
  }
`

export const ErrorDisplay = styled(Box)`
  position: absolute;
  bottom: -20px;
  left: 0px;
  font-size: 12px;
  white-space: nowrap;
  color: ${p => p.theme.colors.pearl};
  transition: all 0.5s ease-in-out;
`

export const RenderRightWrapper = styled(Box)`
  height: 100%;
  right: 0px;
  top: 0px;
  bottom: 0px;
  display: flex;
  align-items: center;
  justify-content: center;
  & > * {
    flex: 1;
  }
  img {
    height: 35px;
    width: 35px;
  }
`

export const Right = styled(Box).attrs(() => ({
  bg: 'palette.background.default',
  px: 1,
  align: 'center',
  justify: 'center',
}))`
  cursor: pointer;
  border-top-right-radius: ${radii[1]}px;
  border-bottom-right-radius: ${radii[1]}px;
  border-left: 1px solid ${p => p.theme.colors.palette.divider};
`

export const WarningDisplay = styled(ErrorDisplay)`
  color: ${p => p.theme.colors.warning};
  transition: all 0.5s ease-in-out;
`

export const Base = styled.section`
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  align-items: center;
  height: 100%;
  width: 100%;
`

export const BaseInputWrapper = styled.div`
  display: flex;
  height: inherit;
  justify-content: space-between;
  flex-grow: 5;
`

export const BaseInput = styled.input.attrs(() => ({
  fontSize: 4,
}))`
  display: flex;
  font-family: 'Inter';
  font-weight: 600;
  ${fontFamily};
  ${fontSize};
  border: 0;
  color: ${p => p.theme.colors.palette.text.shade80};
  height: 100%;
  outline: none;
  padding: 0;
  background: none;
  cursor: text;
  flex-grow: 5;
  padding: 0 15px;
  &:first-of-type {
    border-right: 1px solid ${p => p.theme.colors.palette.divider};
  }
  &::placeholder {
    color: ${p => p.theme.colors.palette.divider};
    font-weight: 400;
  }
`
