export type BooleanDeviceState = boolean | 'disabled' | 'error' | 'not-initialized'

export function toggleBooleanDeviceState(state: BooleanDeviceState): BooleanDeviceState {
  if (state === true) {
    return false
  } else if (state === false) {
    return true
  } else {
    return state
  }
}

export type NumberDeviceState = 'disabled' | 'error' | 'not-initialized' | number

export function hasNumberDeviceStateValue(state: any): state is number {
  return typeof state === 'number'
}
