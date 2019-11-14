//  @flow
// Types for Kirobo PasscodeInput
export type Props = {
  keepEvent?: boolean,
  placeholders: { left: string, right: { optional: string, empty: string } },
  show: boolean,
  onBlur: (SyntheticInputEvent<HTMLInputElement>) => void,
  onChange?: Function,
  onEnter?: (SyntheticKeyboardEvent<HTMLInputElement>) => *,
  onEsc?: (SyntheticKeyboardEvent<HTMLInputElement>) => void,
  onFocus: (SyntheticInputEvent<HTMLInputElement>) => void,
  onChangeLeft: string => void,
  onChangeRight: string => void,
  passcode: string,
  repeatPasscode: string,
  containerProps?: Object,
  loading?: boolean,
  error?: ?Error | boolean,
  warning?: ?Error | boolean,
  small?: boolean,
  editInPlace?: boolean,
  disabled?: boolean,
  onClickLogo: () => void,
}
