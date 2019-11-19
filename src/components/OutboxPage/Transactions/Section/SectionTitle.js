// @flow

import React from 'react'
import moment from 'moment'
import Box from 'components/base/Box'

const calendarOpts = {
  sameDay: 'LL – [Today]',
  nextDay: 'LL – [Tomorrow]',
  lastDay: 'LL – [Yesterday]',
  lastWeek: 'LL',
  sameElse: 'LL',
}

type SectionTitleProps = {
  day: Date,
}

export default ({ day }: SectionTitleProps) => (
  <Box ff="Inter|SemiBold" fontSize={4} color="palette.text.shade60">
    {moment(day).calendar(null, calendarOpts)}
  </Box>
)
