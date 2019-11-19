import React from 'react'
import { Trans } from 'react-i18next'

import Box from 'components/base/Box'
import Text from 'components/base/Text'

export default () => (
  <Box p={6} align="center">
    <Text ff="Inter" fontSize={3}>
      <Trans i18nKey="outbox.noMoreTransfers" />
    </Text>
  </Box>
)
