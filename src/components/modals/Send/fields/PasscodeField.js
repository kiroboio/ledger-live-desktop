// @flow
// Kirobo passcode input component
import React, { useState, useCallback } from 'react'
import { Trans } from 'react-i18next'
import styled from 'styled-components'

import Box from 'components/base/Box'
import Label from 'components/base/Label'
import LabelWithExternalIcon from 'components/base/LabelWithExternalIcon'
import Input from 'components/base/Input/PasscodeInput'
import Switch from 'components/base/Switch'
import { colors } from 'styles/theme'
import { openURL } from 'helpers/linking'
import { track } from 'analytics/segment'
import { urls } from 'config/urls'

type Props = {
  t: *,
  passcode: string,
  setPasscode: (arg0: string) => void,
  passcodeEntering: boolean,
  setPasscodeEntering: (arg0: boolean) => void,
}

const SendMaxSeparator = styled.div`
  margin: 0 10px;
  width: 1px;
  height: 8px;
  background: ${p => p.theme.colors.fog};
`

const PasscodeField = ({
  t,
  passcode,
  setPasscode,
  passcodeEntering,
  setPasscodeEntering,
}: Props) => {
  const [showPasscode, setShowPasscode] = useState(false)
  const [pass, setPass] = useState('')
  const [repeatPasscode, setRepeatPasscode] = useState('')
  const [warning, setWarning] = useState('')
  const [error, setError] = useState('')
  const [enableRight, setEnableRight] = useState(false)

  const sendPasscode = (s: string) => {
    if ((!!pass && !!s && pass === s && pass !== passcode) || !s) {
      setPasscode(s)
    }
  }

  const toggleShowPasscode = () => setShowPasscode(!showPasscode)

  const clearErrorsWarnings = () => {
    if (error) setError('')
    if (warning) setWarning('')
  }

  // check passcode
  const handleCheckPasscode = (s: string) => {
    // since this method runs only when working with passcode, we don't need repeat passcode at all to avoid mess
    if (repeatPasscode) setRepeatPasscode('')
    if (passcode) setPasscode('')
    if (enableRight) setEnableRight(false)
    // spaces in passcode are not allowed
    const matchSpaces = s.match(/\s/g)
    if (matchSpaces) {
      setError(t('send.steps.amount.passcode.check.illegal'))
    } else {
      // if spaces are not there, clear the error
      if (error) setError('')
      // passcode rules
      const length = s.length >= 6
      const matchNumbers = s.match(/\d/g)
      const matchSymbols = s.match(/\W/g)

      // set/clear warnings
      const warnings = []
      if (!length) warnings.push(t('send.steps.amount.passcode.check.short'))
      if (
        (!matchNumbers && !matchSymbols) ||
        (matchNumbers && s.length === matchNumbers.length) ||
        (matchSymbols && s.length === matchSymbols.length)
      )
        warnings.push(t('send.steps.amount.passcode.check.simple'))

      setWarning(warnings.join(' '))
      // if passcode is OK, allow to enter the repeat
      if (length && !warnings.length) setEnableRight(true)
    }
  }

  const setErrorMessages = (match?: boolean) => {
    if (passcode) setPasscode('')

    if (match) setError(t('send.steps.amount.passcode.check.match'))
    else setError(t('send.steps.amount.passcode.check.empty'))
  }

  const handleCheckRepeatPasscode = (s: string) => {
    if (!s) setErrorMessages()
    else if (pass !== s) setErrorMessages(true)
    else {
      clearErrorsWarnings()
      sendPasscode(s)
    }
  }

  const handleOnChangeLeft = (s: string) => {
    setPass(s)
    if (!s) {
      if (enableRight) setEnableRight(false)
      if (repeatPasscode) setRepeatPasscode('')
      if (error || warning) clearErrorsWarnings()
      sendPasscode(s)
    } else {
      if (!passcodeEntering) setPasscodeEntering(true)
      handleCheckPasscode(s)
    }
  }

  const handleOnChangeRight = (s: string) => {
    setRepeatPasscode(s)
    handleCheckRepeatPasscode(s)
  }

  const handleOnBlur = () => {
    if (enableRight && !repeatPasscode) setErrorMessages()
    else if (enableRight && pass !== repeatPasscode) setErrorMessages(true)
  }

  const handlePasscodeHelp = useCallback(() => {
    openURL(urls.kirobo.passcode)
    track('Send Flow Passcode Help Requested')
  }, [])

  const handleKiroboHomepage = useCallback(() => {
    openURL(urls.kirobo.passcode)
    track('Send Flow Passcode Help Requested')
  }, [])

  const placeholders = {
    left: t('send.steps.amount.passcode.placeholders.left'),
    right: {
      optional: t('send.steps.amount.passcode.placeholders.right.optional'),
      empty: t('send.steps.amount.passcode.placeholders.right.empty'),
    },
  }

  return (
    <Box flow={1}>
      <Box horizontal alignItems="center">
        <LabelWithExternalIcon
          onClick={handlePasscodeHelp}
          label={t('send.steps.amount.passcode.title')}
        />
        <SendMaxSeparator />
        <Box horizontal alignItems="center">
          <Label
            color={colors.separator}
            style={{ paddingRight: 8 }}
            onClick={() => toggleShowPasscode()}
          >
            <Trans i18nKey="send.steps.amount.passcode" />
          </Label>
          <Switch small isChecked={showPasscode} onChange={toggleShowPasscode} />
        </Box>
      </Box>
      <Input
        show={showPasscode}
        warning={warning}
        error={error}
        onBlur={handleOnBlur}
        onChangeLeft={handleOnChangeLeft}
        onChangeRight={handleOnChangeRight}
        placeholders={placeholders}
        passcode={pass}
        repeatPasscode={repeatPasscode}
        onClickLogo={handleKiroboHomepage}
        enableRight={enableRight}
      />
    </Box>
  )
}

export default PasscodeField
