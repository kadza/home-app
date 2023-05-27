import { env } from '$env/dynamic/public'
import type { BooleanDeviceState, NumberDeviceState } from './lib/device-state'
import { writable, type Writable } from 'svelte/store'

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

export const configuration: ConfigurationEntry[] = [
  {
    roomId: 'guest',
    deviceId: 'guestLight',
    displayName: 'Guest light',
    store: writable<BooleanDeviceState>('not-initialized'),
    rawStore: writable<string>(),
    readTopic: env.PUBLIC_GUEST_LIGHT_FROM,
    writeTopic: env.PUBLIC_GUEST_LIGHT_TO,
    deviceType: 'light',
    type: 'boolean',
  },
  {
    roomId: 'guest',
    deviceId: 'guestHeating',
    displayName: 'Guest heating',
    readTopic: env.PUBLIC_GUEST_HEAT_VALVE,
    store: writable<BooleanDeviceState>('not-initialized'),
    rawStore: writable<string>(), 
    deviceType: 'heating',
    type: 'boolean',
  },
  {
    roomId: 'guest',
    deviceId: 'guestTemperature',
    displayName: 'Guest temperature',
    readTopic: env.PUBLIC_GUEST_TEMP,
    store: writable<NumberDeviceState>('not-initialized'),
    rawStore: writable<string>(),
    deviceType: 'temperature',
    type: 'number',
  },
  {
    roomId: 'guest',
    deviceId: 'guestSetTemperature',
    displayName: 'Guest set temperature',
    readTopic: env.PUBLIC_GUEST_SET_TEMP,
    store: writable<NumberDeviceState>('not-initialized'),
    rawStore: writable<string>(),
    deviceType: 'setTemperature',
    type: 'number',
  },
  {
    roomId: 'living',
    deviceId: 'livingLight',
    displayName: 'Living light',
    store: writable<BooleanDeviceState>('not-initialized'),
    rawStore: writable<string>(),
    readTopic: env.PUBLIC_LIVING_LIGHT_FROM,
    writeTopic: env.PUBLIC_LIVING_LIGHT_TO,
    deviceType: 'light',
    type: 'boolean',
  },
  {
    roomId: 'living',
    deviceId: 'livingHeating',
    displayName: 'Living heating',
    readTopic: env.PUBLIC_LIVING_HEAT_VALVE,
    store: writable<BooleanDeviceState>('not-initialized'),
    rawStore: writable<string>(),
    deviceType: 'heating',
    type: 'boolean',
  },
  {
    roomId: 'living',
    deviceId: 'livingTemperature',
    displayName: 'Living temperature',
    readTopic: env.PUBLIC_LIVING_TEMP,
    store: writable<NumberDeviceState>('not-initialized'),
    rawStore: writable<string>(),
    deviceType: 'temperature',
    type: 'number',
  },
  {
    roomId: 'living',
    deviceId: 'livingSetTemperature',
    displayName: 'Living set temperature',
    readTopic: env.PUBLIC_LIVING_SET_TEMP,
    store: writable<NumberDeviceState>('not-initialized'),
    rawStore: writable<string>(),
    deviceType: 'setTemperature',
    type: 'number',
  },
  {
    roomId: 'living',
    deviceId: 'livingEntranceLight',
    displayName: 'Living entrance light',
    store: writable<BooleanDeviceState>('not-initialized'),
    rawStore: writable<string>(),
    readTopic: env.PUBLIC_LIVING_ENTRANCE_LIGHT_FROM,
    writeTopic: env.PUBLIC_LIVING_ENTRANCE_LIGHT_TO,
    deviceType: 'light',
    type: 'boolean',
  },
  {
    roomId: 'dining',
    deviceId: 'diningLight',
    displayName: 'Dining light',
    store: writable<BooleanDeviceState>('not-initialized'),
    rawStore: writable<string>(),
    readTopic: env.PUBLIC_DINING_LIGHT_FROM,
    writeTopic: env.PUBLIC_DINING_LIGHT_TO,
    deviceType: 'light',
    type: 'boolean',
  },
  {
    roomId: 'livingGarden',
    deviceId: 'livingGardenLight',
    displayName: 'Living garden light',
    store: writable<BooleanDeviceState>('not-initialized'),
    rawStore: writable<string>(),
    readTopic: env.PUBLIC_LIVING_GARDEN_LIGHT_FROM,
    writeTopic: env.PUBLIC_LIVING_GARDEN_LIGHT_TO,
    deviceType: 'light',
    type: 'boolean',
  },
  {
    roomId: 'kitchen',
    deviceId: 'kitchenLight',
    displayName: 'Kitchen light',
    store: writable<BooleanDeviceState>('not-initialized'),
    rawStore: writable<string>(),
    readTopic: env.PUBLIC_KITCHEN_LIGHT_FROM,
    writeTopic: env.PUBLIC_KITCHEN_LIGHT_TO,
    deviceType: 'light',
    type: 'boolean',
  },
  {
    roomId: 'store',
    deviceId: 'storeLight',
    displayName: 'Store light',
    store: writable<BooleanDeviceState>('not-initialized'),
    rawStore: writable<string>(),
    readTopic: env.PUBLIC_STORE_LIGHT_FROM,
    writeTopic: env.PUBLIC_STORE_LIGHT_TO,
    deviceType: 'light',
    type: 'boolean',
  },
  {
    roomId: 'store',
    deviceId: 'storeTemperature',
    displayName: 'Store temperature',
    readTopic: env.PUBLIC_STORE_TEMP,
    store: writable<NumberDeviceState>('not-initialized'),
    rawStore: writable<string>(),
    deviceType: 'temperature',
    type: 'number',
  },
  {
    roomId: 'entrance',
    deviceId: 'entranceLight',
    displayName: 'Entrance light',
    store: writable<BooleanDeviceState>('not-initialized'),
    rawStore: writable<string>(),
    readTopic: env.PUBLIC_ENTRANCE_LIGHT_FROM,
    writeTopic: env.PUBLIC_ENTRANCE_LIGHT_TO,
    deviceType: 'light',
    type: 'boolean',
  },
  {
    roomId: 'entrance',
    deviceId: 'entranceHeating',
    displayName: 'Entrance heating',
    readTopic: env.PUBLIC_ENTRANCE_HEAT_VALVE,
    store: writable<BooleanDeviceState>('not-initialized'),
    rawStore: writable<string>(),
    deviceType: 'heating',
    type: 'boolean',
  },
  {
    roomId: 'entrance',
    deviceId: 'entranceTemperature',
    displayName: 'Entrance temperature',
    readTopic: env.PUBLIC_ENTRANCE_TEMP,
    store: writable<NumberDeviceState>('not-initialized'),
    rawStore: writable<string>(),
    deviceType: 'temperature',
    type: 'number',
  },
  {
    roomId: 'entrance',
    deviceId: 'entranceSetTemperature',
    displayName: 'Entrance set temperature',
    readTopic: env.PUBLIC_ENTRANCE_SET_TEMP,
    store: writable<NumberDeviceState>('not-initialized'),
    rawStore: writable<string>(),
    deviceType: 'setTemperature',
    type: 'number',
  },
  {
    roomId: 'bath0',
    deviceId: 'bath0Light',
    displayName: 'Bath0 light',
    store: writable<BooleanDeviceState>('not-initialized'),
    rawStore: writable<string>(),
    readTopic: env.PUBLIC_BATH_0_LIGHT_FROM,
    writeTopic: env.PUBLIC_BATH_0_LIGHT_TO,
    deviceType: 'light',
    type: 'boolean',
  },
  {
    roomId: 'bath0',
    deviceId: 'bath0MirrorLight',
    displayName: 'Bath0 mirror light',
    store: writable<BooleanDeviceState>('not-initialized'),
    rawStore: writable<string>(),
    readTopic: env.PUBLIC_BATH_0_MIRROR_LIGHT_FROM,
    writeTopic: env.PUBLIC_BATH_0_MIRROR_LIGHT_TO,
    deviceType: 'light',
    type: 'boolean',
  },
  {
    roomId: 'bath0',
    deviceId: 'bath0Temperature',
    displayName: 'Bath0 temperature',
    readTopic: env.PUBLIC_BATH_0_TEMP,
    store: writable<NumberDeviceState>('error'),
    rawStore: writable<string>(),
    deviceType: 'temperature',
    type: 'number',
  },
  {
    roomId: 'bath0',
    deviceId: 'bath0SetTemperature',
    displayName: 'Bath0 set temperature',
    readTopic: env.PUBLIC_BATH_0_SET_TEMP,
    store: writable<NumberDeviceState>('not-initialized'),
    rawStore: writable<string>(),
    deviceType: 'setTemperature',
    type: 'number',
  },
  {
    roomId: 'bath0',
    deviceId: 'bath0Heating',
    displayName: 'Bath0 heating',
    readTopic: env.PUBLIC_BATH_0_HEAT_VALVE,
    store: writable<BooleanDeviceState>('not-initialized'),
    rawStore: writable<string>(),
    deviceType: 'heating',
    type: 'boolean',
  },
  {
    roomId: 'boiler',
    deviceId: 'boilerTemperature',
    displayName: 'Boiler temperature',
    readTopic: env.PUBLIC_BOILER_TEMP,
    store: writable<NumberDeviceState>('not-initialized'),
    rawStore: writable<string>(),
    deviceType: 'temperature',
    type: 'number',
  },
  {
    roomId: 'boiler',
    deviceId: 'boilerLight',
    displayName: 'Boiler light',
    store: writable<BooleanDeviceState>('not-initialized'),
    rawStore: writable<string>(),
    readTopic: env.PUBLIC_BOILER_LIGHT_FROM,
    writeTopic: env.PUBLIC_BOILER_LIGHT_TO,
    deviceType: 'light',
    type: 'boolean',
  },
  {
    roomId: 'boiler',
    deviceId: 'boilerWallLight',
    displayName: 'Boiler wall light',
    store: writable<BooleanDeviceState>('not-initialized'),
    rawStore: writable<string>(),
    readTopic: env.PUBLIC_BOILER_WALL_LIGHT_FROM,
    writeTopic: env.PUBLIC_BOILER_WALL_LIGHT_TO,
    deviceType: 'light',
    type: 'boolean',
  },
  {
    roomId: 'hall0',
    deviceId: 'hall0Light',
    displayName: 'Hall0 light',
    store: writable<BooleanDeviceState>('not-initialized'),
    rawStore: writable<string>(),
    readTopic: env.PUBLIC_HALL_0_LIGHT_FROM,
    writeTopic: env.PUBLIC_HALL_0_LIGHT_TO,
    deviceType: 'light',
    type: 'boolean',
  },
  {
    roomId: 'stairs',
    deviceId: 'stairsLight',
    displayName: 'Stairs light',
    store: writable<BooleanDeviceState>('not-initialized'),
    rawStore: writable<string>(),
    readTopic: env.PUBLIC_STAIRS_LIGHT_FROM,
    writeTopic: env.PUBLIC_STAIRS_LIGHT_TO,
    deviceType: 'light',
    type: 'boolean',
  },
  {
    roomId: 'garage',
    deviceId: 'garageLight0',
    displayName: 'Garage light 0',
    store: writable<BooleanDeviceState>('not-initialized'),
    rawStore: writable<string>(),
    readTopic: env.PUBLIC_GARAGE_LIGHT_0_FROM,
    writeTopic: env.PUBLIC_GARAGE_LIGHT_0_TO,
    deviceType: 'light',
    type: 'boolean',
  },
  {
    roomId: 'garage',
    deviceId: 'garageLight1',
    displayName: 'Garage light 1',
    store: writable<BooleanDeviceState>('not-initialized'),
    rawStore: writable<string>(),
    readTopic: env.PUBLIC_GARAGE_LIGHT_1_FROM,
    writeTopic: env.PUBLIC_GARAGE_LIGHT_1_TO,
    deviceType: 'light',
    type: 'boolean',
  },
  {
    roomId: 'garage',
    deviceId: 'garageTemperature',
    displayName: 'Garage temperature',
    readTopic: env.PUBLIC_GARAGE_TEMP,
    store: writable<NumberDeviceState>('not-initialized'),
    rawStore: writable<string>(),
    deviceType: 'temperature',
    type: 'number',
  },
  {
    roomId: 'garage',
    deviceId: 'garageSetTemperature',
    displayName: 'Garage set temperature',
    readTopic: env.PUBLIC_GARAGE_SET_TEMP,
    store: writable<NumberDeviceState>('not-initialized'),
    rawStore: writable<string>(),
    deviceType: 'setTemperature',
    type: 'number',
  },
  {
    roomId: 'garage',
    deviceId: 'garageHeating',
    displayName: 'Garage heating',
    readTopic: env.PUBLIC_GARAGE_HEAT_VALVE,
    store: writable<BooleanDeviceState>('not-initialized'),
    rawStore: writable<string>(),
    deviceType: 'heating',
    type: 'boolean',
  },
]

export type ConfigurationEntry = {
  roomId: string,
  deviceId: string,
  displayName: string,
  readTopic: string,
  writeTopic?: string,
  store: Writable<BooleanDeviceState> | Writable<NumberDeviceState>,
  rawStore: Writable<string>,
  deviceType: 'light' | 'heating' | 'temperature' | 'setTemperature'
  type: 'boolean' | 'number'
}

export const storesConfiguration = [
  {
    deviceId: 'externalTemperature',
    store: writable<NumberDeviceState>('not-initialized'),
    rawStore: writable<string>(),
    readTopic: env.PUBLIC_EXTERNAL_TEMP,
    type: 'number'
  },
]
