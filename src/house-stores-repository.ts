import { env } from '$env/dynamic/public'
import type { BooleanDeviceState, NumberDeviceState } from '$lib/device-state'
import { writable } from 'svelte/store'

export const guestLightStore = writable<BooleanDeviceState>('not-initialized')
export const guestHeatingStore = writable<BooleanDeviceState>('not-initialized')
export const guestTemperatureStore = writable<NumberDeviceState>('not-initialized')
export const diningLightStore = writable<BooleanDeviceState>('not-initialized')
export const livingLightStore = writable<BooleanDeviceState>('not-initialized')
export const livingHeatingStore = writable<BooleanDeviceState>('not-initialized')
export const livingTemperatureStore = writable<NumberDeviceState>('not-initialized')
export const livingEntranceLightStore = writable<BooleanDeviceState>('not-initialized')
export const livingGardenLightStore = writable<BooleanDeviceState>('not-initialized')
export const bath0LightStore = writable<BooleanDeviceState>('not-initialized')
export const bath0MirrorLightStore = writable<BooleanDeviceState>('not-initialized')
export const bath0HeatingStore = writable<BooleanDeviceState>('not-initialized')
export const bath0TemperatureStore = writable<NumberDeviceState>('error')
export const stairsLightStore = writable<BooleanDeviceState>('not-initialized')
export const hall0LightStore = writable<BooleanDeviceState>('not-initialized')
export const externalTemperatureStore = writable<NumberDeviceState>('not-initialized')
export const entranceLightStore = writable<BooleanDeviceState>('not-initialized')
export const entranceHeatingStore = writable<BooleanDeviceState>('not-initialized')
export const entranceTemperatureStore = writable<NumberDeviceState>('not-initialized')

const rawGuestLightStore = writable<string>()
const rawGuestHeatingStore = writable<string>()
const rawDiningLightStore = writable<string>()
const rawGuestTemperatureStore = writable<string>()
const rawLivingLightStore = writable<string>()
const rawLivingHeatingStore = writable<string>()
const rawLivingTemperatureStore = writable<string>()
const rawLivingEntranceLightStore = writable<string>()
const rawLivingGardenLightStore = writable<string>()
const rawBath0LightStore = writable<string>()
const rawBath0MirrorLightStore = writable<string>()
const rawBath0HeatingStore = writable<string>()
const rawBath0TemperatureStore = writable<string>()
const rawStairsLightStore = writable<string>()
const rawHall0LightStore = writable<string>()
const rawExternalTemperatureStore = writable<string>()
const rawEntranceLightStore = writable<string>()
const rawEntranceHeatingStore = writable<string>()
const rawEntranceTemperatureStore = writable<string>()

export const storesConfiguration = [
  {
    deviceId: 'guest-light',
    store: guestLightStore,
    rawStore: rawGuestLightStore,
    readTopic: env.PUBLIC_GUEST_LIGHT_FROM,
    writeTopic: env.PUBLIC_GUEST_LIGHT_TO,
    type: 'boolean'
  },
  {
    deviceId: 'guest-heating',
    store: guestHeatingStore,
    rawStore: rawGuestHeatingStore,
    readTopic: env.PUBLIC_GUEST_HEAT_VALVE,
    type: 'boolean'
  },
  {
    deviceId: 'dining-light',
    store: diningLightStore,
    rawStore: rawDiningLightStore,
    readTopic: env.PUBLIC_DINING_LIGHT_FROM,
    writeTopic: env.PUBLIC_DINING_LIGHT_TO,
    type: 'boolean'
  },
  {
    deviceId: 'guest-temperature',
    store: guestTemperatureStore,
    rawStore: rawGuestTemperatureStore,
    readTopic: env.PUBLIC_GUEST_TEMP,
    type: 'number'
  },
  {
    deviceId: 'living-light',
    store: livingLightStore,
    rawStore: rawLivingLightStore,
    readTopic: env.PUBLIC_LIVING_LIGHT_FROM,
    writeTopic: env.PUBLIC_LIVING_LIGHT_TO,
    type: 'boolean'
  },
  {
    deviceId: 'living-heating',
    store: livingHeatingStore,
    rawStore: rawLivingHeatingStore,
    readTopic: env.PUBLIC_LIVING_HEAT_VALVE,
    type: 'boolean'
  },
  {
    deviceId: 'living-temperature',
    store: livingTemperatureStore,
    rawStore: rawLivingTemperatureStore,
    readTopic: env.PUBLIC_LIVING_TEMP,
    type: 'number'
  },
  {
    deviceId: 'living-entrance-light',
    store: livingEntranceLightStore,
    rawStore: rawLivingEntranceLightStore,
    readTopic: env.PUBLIC_LIVING_ENTRANCE_LIGHT_FROM,
    writeTopic: env.PUBLIC_LIVING_ENTRANCE_LIGHT_TO,
    type: 'boolean'
  },
  {
    deviceId: 'living-garden-light',
    store: livingGardenLightStore,
    rawStore: rawLivingGardenLightStore,
    readTopic: env.PUBLIC_LIVING_GARDEN_LIGHT_FROM,
    writeTopic: env.PUBLIC_LIVING_GARDEN_LIGHT_TO,
    type: 'boolean'
  },
  {
    deviceId: 'bath-0-light',
    store: bath0LightStore,
    rawStore: rawBath0LightStore,
    readTopic: env.PUBLIC_BATH_0_LIGHT_FROM,
    writeTopic: env.PUBLIC_BATH_0_LIGHT_TO,
    type: 'boolean'
  },
  {
    deviceId: 'bath-0-mirror-light',
    store: bath0MirrorLightStore,
    rawStore: rawBath0MirrorLightStore,
    readTopic: env.PUBLIC_BATH_0_MIRROR_LIGHT_FROM,
    writeTopic: env.PUBLIC_BATH_0_MIRROR_LIGHT_TO,
    type: 'boolean'
  },
  {
    deviceId: 'bath-0-heating',
    store: bath0HeatingStore,
    rawStore: rawBath0HeatingStore,
    readTopic: env.PUBLIC_BATH_0_HEAT_VALVE,
    type: 'number'
  },
  {
    deviceId: 'bath-0-temperature',
    store: bath0TemperatureStore,
    rawStore: rawBath0TemperatureStore,
    readTopic: env.PUBLIC_BATH_0_TEMP,
    type: 'number'
  },
  {
    deviceId: 'hall-0-light',
    store: hall0LightStore,
    rawStore: rawHall0LightStore,
    readTopic: env.PUBLIC_HALL_0_LIGHT_FROM,
    writeTopic: env.PUBLIC_HALL_0_LIGHT_TO,
    type: 'boolean'
  },
  {
    deviceId: 'stairs-light',
    store: stairsLightStore,
    rawStore: rawStairsLightStore,
    readTopic: env.PUBLIC_STAIRS_LIGHT_FROM,
    writeTopic: env.PUBLIC_STAIRS_LIGHT_TO,
    type: 'boolean'
  },
  {
    deviceId: 'external-temperature',
    store: externalTemperatureStore,
    rawStore: rawExternalTemperatureStore,
    readTopic: env.PUBLIC_EXTERNAL_TEMP,
    type: 'number'
  },
  {
    deviceId: 'entrance-light',
    store: entranceLightStore,
    rawStore: rawEntranceLightStore,
    readTopic: env.PUBLIC_ENTRANCE_LIGHT_FROM,
    writeTopic: env.PUBLIC_ENTRANCE_LIGHT_TO,
    type: 'boolean'
  },
  {
    deviceId: 'entrance-heating',
    store: entranceHeatingStore,
    rawStore: rawEntranceHeatingStore,
    readTopic: env.PUBLIC_ENTRANCE_HEAT_VALVE,
    type: 'boolean'
  },
  {
    deviceId: 'entrance-temperature',
    store: entranceTemperatureStore,
    rawStore: rawEntranceTemperatureStore,
    readTopic: env.PUBLIC_ENTRANCE_TEMP,
    type: 'number'
  }
]
