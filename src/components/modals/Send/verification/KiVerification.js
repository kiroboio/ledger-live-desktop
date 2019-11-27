// @flow

import React from 'react'

import { multiline } from 'styles/helpers'
import TrackPage from 'analytics/TrackPage'
import { urls } from 'config/urls'
import { openURL } from 'helpers/linking'
import LinkWithExternalIcon from 'components/base/LinkWithExternalIcon'
import WarnBox from 'components/WarnBox'
import Interactions from 'icons/device/interactions'

import Transaction from './Transaction'
import { Container, KiInfo, ImageContainer } from './Verification.style'

import type { StepProps } from '../types'

export default ({ t, device, isBlue, trx }: StepProps) => (
  <Container>
    <TrackPage category="Send Flow" name="Step 3" />
    <WarnBox>
      {multiline(t('send.steps.verification.warning'))}
      <LinkWithExternalIcon
        onClick={() => openURL(urls.recipientAddressInfo)}
        label={t('common.learnMore')}
      />
    </WarnBox>
    {(trx.stage === 1 || trx.stage === 2) && <Transaction {...trx} />}
    <KiInfo>{t('send.steps.verification.body')}</KiInfo>
    {!device ? null : (
      <ImageContainer mt={isBlue ? 4 : null}>
        <Interactions
          screen="validation"
          action="accept"
          type={device.modelId}
          width={isBlue ? 120 : 375}
          wire="wired"
        />
      </ImageContainer>
    )}
  </Container>
)
