// @flow

import React from 'react'
import moment from 'moment'

import Time from './Time.style'

type TimeProps = {
  value: Date,
}

export default ({ value }: TimeProps) => <Time>at {moment(value).format('HH:mm')}</Time>
