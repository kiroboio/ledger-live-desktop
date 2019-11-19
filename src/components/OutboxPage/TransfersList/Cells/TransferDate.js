// @flow
import React from 'react'
import moment from 'moment'

import { Hour } from './Cells.styles'

export default ({ date }: { date: Date }) => <Hour>at {moment(date).format('HH:mm')}</Hour>
