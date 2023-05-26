export type DeviceMetadata = {
  deviceId: string
  readTopic: string | undefined
  writeTopic: string | undefined
}

export function camelCaseToWords(str: string) {
  return str
    .replace(/([A-Z0-9])/g, ' $1')
    .trim()
    .toLocaleLowerCase()
}

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
