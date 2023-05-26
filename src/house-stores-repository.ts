import { env } from '$env/dynamic/public'
import type { BooleanDeviceState, NumberDeviceState } from './lib/device-state'
import { writable, type Writable } from 'svelte/store'

export type DeviceId =
  | 'bath0Heating'
  | 'bath0Light'
  | 'bath0MirrorLight'
  | 'bath0SetTemperature'
  | 'bath0Temperature'
  | 'boilerLight'
  | 'boilerTemperature'
  | 'boilerWallLight'
  | 'diningLight'
  | 'entranceHeating'
  | 'entranceLight'
  | 'entranceSetTemperature'
  | 'entranceTemperature'
  | 'externalTemperature'
  | 'garageHeating'
  | 'garageLight0'
  | 'garageLight1'
  | 'garageSetTemperature'
  | 'garageTemperature'
  | 'guestHeating'
  | 'guestLight'
  | 'guestSetTemperature'
  | 'guestTemperature'
  | 'hall0Light'
  | 'kitchenLight'
  | 'livingEntranceLight'
  | 'livingGardenLight'
  | 'livingHeating'
  | 'livingLight'
  | 'livingSetTemperature'
  | 'livingTemperature'
  | 'stairsEntranceLight'
  | 'stairsGardenLight'
  | 'stairsHeating'
  | 'stairsLight'
  | 'stairsSetTemperature'
  | 'stairsTemperature'
  | 'storeLight'
  | 'storeTemperature'

export const getNumberDeviceStore = (deviceId: string) => {
  const device = storesConfiguration.find((device) => device.deviceId === deviceId)
  if (!device) {
    throw new Error(`Device ${deviceId} not found`)
  }

  if (device.type !== 'number') {
    throw new Error(`Device ${deviceId} is not a number device`)
  }

  return device.store as Writable<NumberDeviceState>
}

export const getBooleanDeviceStore = (deviceId: string) => {
  const device = storesConfiguration.find((device) => device.deviceId === deviceId)
  if (!device) {
    throw new Error(`Device ${deviceId} not found`)
  }

  if (device.type !== 'boolean') {
    throw new Error(`Device ${deviceId} is not a boolean device`)
  }

  return device.store as Writable<BooleanDeviceState>
}

export const getDeviceMetadata = (deviceId: string) => {
  const device = storesConfiguration.find((device) => device.deviceId === deviceId)

  if (!device) {
    throw new Error(`Device ${deviceId} not found`)
  }

  return {
    deviceId: device.deviceId,
    readTopic: device.readTopic,
    writeTopic: device.writeTopic
  }
}

export const storesConfiguration = [
  {
    deviceId: 'guestLight',
    store: writable<BooleanDeviceState>('not-initialized'),
    rawStore: writable<string>(),
    readTopic: env.PUBLIC_GUEST_LIGHT_FROM,
    writeTopic: env.PUBLIC_GUEST_LIGHT_TO,
    type: 'boolean'
  },
  {
    deviceId: 'guestHeating',
    store: writable<BooleanDeviceState>('not-initialized'),
    rawStore: writable<string>(),
    readTopic: env.PUBLIC_GUEST_HEAT_VALVE,
    type: 'boolean'
  },
  {
    deviceId: 'diningLight',
    store: writable<BooleanDeviceState>('not-initialized'),
    rawStore: writable<string>(),
    readTopic: env.PUBLIC_DINING_LIGHT_FROM,
    writeTopic: env.PUBLIC_DINING_LIGHT_TO,
    type: 'boolean'
  },
  {
    deviceId: 'guestTemperature',
    store: writable<NumberDeviceState>('not-initialized'),
    rawStore: writable<string>(),
    readTopic: env.PUBLIC_GUEST_TEMP,
    type: 'number'
  },
  {
    deviceId: 'guestSetTemperature',
    store: writable<NumberDeviceState>('not-initialized'),
    rawStore: writable<string>(),
    readTopic: env.PUBLIC_GUEST_SET_TEMP,
    type: 'number'
  },
  {
    deviceId: 'livingLight',
    store: writable<BooleanDeviceState>('not-initialized'),
    rawStore: writable<string>(),
    readTopic: env.PUBLIC_LIVING_LIGHT_FROM,
    writeTopic: env.PUBLIC_LIVING_LIGHT_TO,
    type: 'boolean'
  },
  {
    deviceId: 'livingHeating',
    store: writable<BooleanDeviceState>('not-initialized'),
    rawStore: writable<string>(),
    readTopic: env.PUBLIC_LIVING_HEAT_VALVE,
    type: 'boolean'
  },
  {
    deviceId: 'livingTemperature',
    store: writable<NumberDeviceState>('not-initialized'),
    rawStore: writable<string>(),
    readTopic: env.PUBLIC_LIVING_TEMP,
    type: 'number'
  },
  {
    deviceId: 'livingSetTemperature',
    store: writable<NumberDeviceState>('not-initialized'),
    rawStore: writable<string>(),
    readTopic: env.PUBLIC_LIVING_SET_TEMP,
    type: 'number'
  },
  {
    deviceId: 'livingEntranceLight',
    store: writable<BooleanDeviceState>('not-initialized'),
    rawStore: writable<string>(),
    readTopic: env.PUBLIC_LIVING_ENTRANCE_LIGHT_FROM,
    writeTopic: env.PUBLIC_LIVING_ENTRANCE_LIGHT_TO,
    type: 'boolean'
  },
  {
    deviceId: 'livingGardenLight',
    store: writable<BooleanDeviceState>('not-initialized'),
    rawStore: writable<string>(),
    readTopic: env.PUBLIC_LIVING_GARDEN_LIGHT_FROM,
    writeTopic: env.PUBLIC_LIVING_GARDEN_LIGHT_TO,
    type: 'boolean'
  },
  {
    deviceId: 'bath0Light',
    store: writable<BooleanDeviceState>('not-initialized'),
    rawStore: writable<string>(),
    readTopic: env.PUBLIC_BATH_0_LIGHT_FROM,
    writeTopic: env.PUBLIC_BATH_0_LIGHT_TO,
    type: 'boolean'
  },
  {
    deviceId: 'bath0MirrorLight',
    store: writable<BooleanDeviceState>('not-initialized'),
    rawStore: writable<string>(),
    readTopic: env.PUBLIC_BATH_0_MIRROR_LIGHT_FROM,
    writeTopic: env.PUBLIC_BATH_0_MIRROR_LIGHT_TO,
    type: 'boolean'
  },
  {
    deviceId: 'bath0Heating',
    store: writable<BooleanDeviceState>('not-initialized'),
    rawStore: writable<string>(),
    readTopic: env.PUBLIC_BATH_0_HEAT_VALVE,
    type: 'boolean'
  },
  {
    deviceId: 'bath0Temperature',
    store: writable<NumberDeviceState>('error'),
    rawStore: writable<string>(),
    readTopic: env.PUBLIC_BATH_0_TEMP,
    type: 'number'
  },
  {
    deviceId: 'bath0SetTemperature',
    store: writable<NumberDeviceState>('not-initialized'),
    rawStore: writable<string>(),
    readTopic: env.PUBLIC_BATH_0_SET_TEMP,
    type: 'number'
  },
  {
    deviceId: 'hall0Light',
    store: writable<BooleanDeviceState>('not-initialized'),
    rawStore: writable<string>(),
    readTopic: env.PUBLIC_HALL_0_LIGHT_FROM,
    writeTopic: env.PUBLIC_HALL_0_LIGHT_TO,
    type: 'boolean'
  },
  {
    deviceId: 'stairsLight',
    store: writable<BooleanDeviceState>('not-initialized'),
    rawStore: writable<string>(),
    readTopic: env.PUBLIC_STAIRS_LIGHT_FROM,
    writeTopic: env.PUBLIC_STAIRS_LIGHT_TO,
    type: 'boolean'
  },
  {
    deviceId: 'externalTemperature',
    store: writable<NumberDeviceState>('not-initialized'),
    rawStore: writable<string>(),
    readTopic: env.PUBLIC_EXTERNAL_TEMP,
    type: 'number'
  },
  {
    deviceId: 'entranceLight',
    store: writable<BooleanDeviceState>('not-initialized'),
    rawStore: writable<string>(),
    readTopic: env.PUBLIC_ENTRANCE_LIGHT_FROM,
    writeTopic: env.PUBLIC_ENTRANCE_LIGHT_TO,
    type: 'boolean'
  },
  {
    deviceId: 'entranceHeating',
    store: writable<BooleanDeviceState>('not-initialized'),
    rawStore: writable<string>(),
    readTopic: env.PUBLIC_ENTRANCE_HEAT_VALVE,
    type: 'boolean'
  },
  {
    deviceId: 'entranceTemperature',
    store: writable<NumberDeviceState>('not-initialized'),
    rawStore: writable<string>(),
    readTopic: env.PUBLIC_ENTRANCE_TEMP,
    type: 'number'
  },
  {
    deviceId: 'entranceSetTemperature',
    store: writable<NumberDeviceState>('not-initialized'),
    rawStore: writable<string>(),
    readTopic: env.PUBLIC_ENTRANCE_SET_TEMP,
    type: 'number'
  },
  {
    deviceId: 'boilerLight',
    store: writable<BooleanDeviceState>('not-initialized'),
    rawStore: writable<string>(),
    readTopic: env.PUBLIC_BOILER_LIGHT_FROM,
    writeTopic: env.PUBLIC_BOILER_LIGHT_TO,
    type: 'boolean'
  },
  {
    deviceId: 'boilerWallLight',
    store: writable<BooleanDeviceState>('not-initialized'),
    rawStore: writable<string>(),
    readTopic: env.PUBLIC_BOILER_WALL_LIGHT_FROM,
    writeTopic: env.PUBLIC_BOILER_WALL_LIGHT_TO,
    type: 'boolean'
  },
  {
    deviceId: 'boilerTemperature',
    store: writable<NumberDeviceState>('not-initialized'),
    rawStore: writable<string>(),
    readTopic: env.PUBLIC_BOILER_TEMP,
    type: 'number'
  },
  {
    deviceId: 'storeLight',
    store: writable<BooleanDeviceState>('not-initialized'),
    rawStore: writable<string>(),
    readTopic: env.PUBLIC_STORE_LIGHT_FROM,
    writeTopic: env.PUBLIC_STORE_LIGHT_TO,
    type: 'boolean'
  },
  {
    deviceId: 'storeTemperature',
    store: writable<NumberDeviceState>('not-initialized'),
    rawStore: writable<string>(),
    readTopic: env.PUBLIC_STORE_TEMP,
    type: 'number'
  },
  {
    deviceId: 'garageLight0',
    store: writable<BooleanDeviceState>('not-initialized'),
    rawStore: writable<string>(),
    readTopic: env.PUBLIC_GARAGE_LIGHT_0_FROM,
    writeTopic: env.PUBLIC_GARAGE_LIGHT_0_TO,
    type: 'boolean'
  },
  {
    deviceId: 'garageLight1',
    store: writable<BooleanDeviceState>('not-initialized'),
    rawStore: writable<string>(),
    readTopic: env.PUBLIC_GARAGE_LIGHT_1_FROM,
    writeTopic: env.PUBLIC_GARAGE_LIGHT_1_TO,
    type: 'boolean'
  },
  {
    deviceId: 'garageTemperature',
    store: writable<NumberDeviceState>('not-initialized'),
    rawStore: writable<string>(),
    readTopic: env.PUBLIC_GARAGE_TEMP,
    type: 'number'
  },
  {
    deviceId: 'garageSetTemperature',
    store: writable<NumberDeviceState>('not-initialized'),
    rawStore: writable<string>(),
    readTopic: env.PUBLIC_GARAGE_SET_TEMP,
    type: 'number'
  },
  {
    deviceId: 'garageHeating',
    store: writable<BooleanDeviceState>('not-initialized'),
    rawStore: writable<string>(),
    readTopic: env.PUBLIC_GARAGE_HEAT_VALVE,
    type: 'boolean'
  },
  {
    deviceId: 'garageDoor',
    store: writable<BooleanDeviceState>('not-initialized'),
    rawStore: writable<string>(),
    readTopic: env.PUBLIC_GARAGE_DOOR_FROM,
    type: 'boolean'
  },
  {
    deviceId: 'kitchenLight',
    store: writable<BooleanDeviceState>('not-initialized'),
    rawStore: writable<string>(),
    readTopic: env.PUBLIC_KITCHEN_LIGHT_FROM,
    writeTopic: env.PUBLIC_KITCHEN_LIGHT_TO,
    type: 'boolean'
  }
]
