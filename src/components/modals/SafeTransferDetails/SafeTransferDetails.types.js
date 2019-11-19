// @flow

import type { AccountLike, Account, Operation } from '@ledgerhq/live-common/lib/types'
import { openModal } from 'reducers/modals'
import type { T } from 'types/common'

export type Props = {
  transfer: any,
  t: T,
  operation: ?Operation,
  account: ?AccountLike,
  accountId: string,
  parentAccount: ?Account,
  parentId: ?string,
  confirmationsNb: number,
  onClose: () => void,
  marketIndicator: *,
  openModal: typeof openModal,
  parentOperation?: Operation,
  push: string => void,
  currentLocation: string,
}

export type openOperationType = 'goBack' | 'subOperation' | 'internalOperation'

export type ModalRenderProps = {
  data: {
    account: string,
    operation: string,
  },
  onClose?: Function,
}
