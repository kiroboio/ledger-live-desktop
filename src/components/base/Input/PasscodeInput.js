// @flow
// Kirobo double input for password
import React, { useCallback, useState } from 'react'
import noop from 'lodash/noop'
import TranslatedError from 'components/TranslatedError'
import Box from 'components/base/Box'
import { i } from 'helpers/staticPath'
import type { Props } from './PasscodeInput.types'
import {
  Base,
  Container,
  ErrorDisplay,
  WarningDisplay,
  RenderRightWrapper,
  Right,
  BaseInput,
  BaseInputWrapper,
} from './PasscodeInput.styles'

const refer: any = React.forwardRef

const Input = refer(
  (
    {
      show,
      containerProps,
      editInPlace,
      small = false,
      loading,
      warning,
      error,
      disabled,
      onChangeLeft,
      onChangeRight,
      keepEvent,
      onEnter,
      onEsc,
      onFocus = noop,
      onBlur = noop,
      placeholders,
      passcode,
      repeatPasscode,
      onClickLogo,
      onFocusRight,
      onBlurRight,
      enableRight,
      ...props
    }: Props,
    inputRef,
  ) => {
    const [isFocus, setFocus] = useState(false)
    const handleChangeLeft = useCallback(
      (e: SyntheticInputEvent<HTMLInputElement>) => {
        if (onChangeLeft) {
          onChangeLeft(keepEvent ? e : e.target.value)
        }
      },
      [onChangeLeft, keepEvent],
    )

    const handleChangeRight = useCallback(
      (e: SyntheticInputEvent<HTMLInputElement>) => {
        if (onChangeRight) {
          onChangeRight(keepEvent ? e : e.target.value)
        }
      },
      [onChangeRight, keepEvent],
    )

    const handleFocus = useCallback(
      (e: SyntheticInputEvent<HTMLInputElement>) => {
        setFocus(true)
        if (onFocus) {
          onFocus(e)
        }
      },
      [onFocus],
    )

    const handleBlur = useCallback(
      (e: SyntheticInputEvent<HTMLInputElement>) => {
        setFocus(false)
        if (onBlur) {
          onBlur(e)
        }
      },
      [onBlur],
    )

    const renderRight = () => (
      <RenderRightWrapper>
        <Right onClick={onClickLogo}>
          <img src={i('kirobo-logo.svg')} alt="Kirobo logo" />
        </Right>
      </RenderRightWrapper>
    )

    return (
      <Container
        isFocus={isFocus}
        shrink
        {...containerProps}
        disabled={disabled}
        small={small}
        error={error}
        warning={warning}
        editInPlace={editInPlace}
      >
        <Box px={0} grow shrink>
          <Base>
            <BaseInputWrapper>
              <BaseInput
                {...props}
                placeholder={placeholders.left}
                type={show ? 'text' : 'password'}
                small={small}
                disabled={disabled}
                ref={inputRef}
                onFocus={handleFocus}
                onBlur={handleBlur}
                onChange={handleChangeLeft}
                value={passcode}
              />
              <BaseInput
                {...props}
                placeholder={enableRight ? placeholders.right.empty : null}
                disabled={!enableRight}
                type={show ? 'text' : 'password'}
                small={small}
                ref={inputRef}
                onFocus={handleFocus}
                onBlur={handleBlur}
                onChange={handleChangeRight}
                value={repeatPasscode}
              />
            </BaseInputWrapper>
            {renderRight()}
          </Base>
          {error ? (
            <ErrorDisplay>
              <TranslatedError error={error} />
            </ErrorDisplay>
          ) : warning ? (
            <WarningDisplay>
              <TranslatedError error={warning} />
            </WarningDisplay>
          ) : null}
        </Box>
      </Container>
    )
  },
)

export default Input
