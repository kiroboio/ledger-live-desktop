// @flow

import React from 'react'

import { multiline } from 'styles/helpers'

import TrackPage from 'analytics/TrackPage'
import { urls } from 'config/urls'
import { openURL } from 'helpers/linking'
import LinkWithExternalIcon from 'components/base/LinkWithExternalIcon'
import Box from 'components/base/Box'
import WarnBox from 'components/WarnBox'
import Interactions from 'icons/device/interactions'

import { Container, Info } from './Verification.style'

import type { StepProps } from '../types'

export default ({ t, device, isBlue }: StepProps) => (
  <Container>
    <TrackPage category="Send Flow" name="Step 3" />
    <WarnBox>
      {multiline(t('send.steps.verification.warning'))}
      <LinkWithExternalIcon
        onClick={() => openURL(urls.recipientAddressInfo)}
        label={t('common.learnMore')}
      />
    </WarnBox>
    <Info>{t('send.steps.verification.body')}</Info>
    {!device ? null : (
      <Box mt={isBlue ? 4 : null}>
        <Interactions
          screen="validation"
          action="accept"
          type={device.modelId}
          width={isBlue ? 120 : 375}
          wire="wired"
        />
      </Box>
    )}
  </Container>
)
