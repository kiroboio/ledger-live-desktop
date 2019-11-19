// @flow

import React from 'react'
import { Trans } from 'react-i18next'

import Box from 'components/base/Box'
import TransferDate from './TransferDate'

import type { DateCellProps } from './Cells.types'
import { Cell } from './Cells.styles'

export default ({ transfer }: DateCellProps) => {
  const ellipsis = {
    display: 'block',
    textOverflow: 'ellipsis',
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    color: transfer.status === 'error' ? 'red' : undefined,
  }

  return (
    <Cell compact style={{ alignItems: 'flex-start', width: 'auto' }}>
      <Box ff="Inter|SemiBold" fontSize={3} color="palette.text.shade80" style={ellipsis}>
        <Trans i18nKey={`outbox.statuses.${transfer.status}`} />
      </Box>
      <TransferDate date={transfer.date} />
    </Cell>
  )
}
