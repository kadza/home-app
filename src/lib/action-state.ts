export type ActionState = 'active' | 'inactive' | 'disabled' | 'error' | 'not-initialized'

export function toggleActionState(state: ActionState): ActionState {
  if (state === 'active') {
    return 'inactive'
  } else if (state === 'inactive') {
    return 'active'
  } else {
    return state
  }
}

export type NumberDeviceState = 'disabled' | 'error' | 'not-initialized' | number

export function hasNumberDeviceStateValue(state: any): state is number {
  return typeof state === 'number'
}
