// @flow
// Kirobo Outbox
import React from 'react'
import { compose } from 'redux'
import { T, translate } from 'react-i18next'
import { connect } from 'react-redux'

import IconPlus from 'icons/Plus'
import Box from 'components/base/Box'
import Button from 'components/base/Button'
import { openModal } from 'reducers/modals'

type OutboxHeaderProps = {
  t: T,
}

const AccountsHeader = ({ t }: OutboxHeaderProps) => {
  const handleNewSafeTransfer = () => {}
  return (
    <Box horizontal style={{ paddingBottom: 32 }}>
      <Box
        grow
        ff="Inter|SemiBold"
        fontSize={7}
        color="palette.text.shade100"
        data-e2e="accountsPage_title"
      >
        {t('outbox.title')}
      </Box>
      <Box horizontal flow={2} alignItems="center" justifyContent="flex-end">
        <Button small primary onClick={handleNewSafeTransfer} data-e2e="addAccount_button">
          <Box horizontal flow={1} alignItems="center">
            <IconPlus size={12} />
            <Box>{t('outbox.send')}</Box>
          </Box>
        </Button>
      </Box>
    </Box>
  )
}

const mapDispatchToProps = {
  openModal,
}

export default compose(
  translate(),
  connect(
    null,
    mapDispatchToProps,
  ),
)(AccountsHeader)
