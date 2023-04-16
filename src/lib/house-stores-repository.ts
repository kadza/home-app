import { browser } from '$app/environment'
import { env } from '$env/dynamic/public'
import { connect, MqttClient } from 'mqtt'
import { writable, type Writable } from 'svelte/store'
import { get } from 'svelte/store'
import { hasNumberDeviceStateValue, type ActionState, type NumberDeviceState } from './action-state'

export const guestLightStore = writable<ActionState>('not-initialized')
export const guestHeatingStore = writable<ActionState>('not-initialized')
export const guestTemperatureStore = writable<NumberDeviceState>('not-initialized')
export const diningLightStore = writable<ActionState>('not-initialized')
export const livingLightStore = writable<ActionState>('not-initialized')
export const livingHeatingStore = writable<ActionState>('not-initialized')
export const livingTemperatureStore = writable<NumberDeviceState>('not-initialized')
export const livingEntranceLightStore = writable<ActionState>('not-initialized')
export const livingGardenLightStore = writable<ActionState>('not-initialized')
export const bath0LightStore = writable<ActionState>('not-initialized')
export const bath0MirrorLightStore = writable<ActionState>('not-initialized')
export const bath0HeatingStore = writable<ActionState>('not-initialized')
export const bath0TemperatureStore = writable<NumberDeviceState>('error')
export const stairsLightStore = writable<ActionState>('not-initialized')
export const hall0LightStore = writable<ActionState>('not-initialized')
export const externalTemperatureStore = writable<NumberDeviceState>('not-initialized')

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

const rawMessageHandlers = new Map<string, (topic: string, message: string) => void>()

const storesConfiguration = [
  {
    deviceId: 'guest-light',
    store: guestLightStore,
    rawStore: rawGuestLightStore,
    readTopic: env.PUBLIC_GUEST_LIGHT_FROM,
    writeTopic: env.PUBLIC_GUEST_LIGHT_TO,
    type: 'action-state'
  },
  {
    deviceId: 'guest-heating',
    store: guestHeatingStore,
    rawStore: rawGuestHeatingStore,
    readTopic: env.PUBLIC_GUEST_HEAT_VALVE,
    type: 'action-state'
  },
  {
    deviceId: 'dining-light',
    store: diningLightStore,
    rawStore: rawDiningLightStore,
    readTopic: env.PUBLIC_DINING_LIGHT_FROM,
    writeTopic: env.PUBLIC_DINING_LIGHT_TO,
    type: 'action-state'
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
    type: 'action-state'
  },
  {
    deviceId: 'living-heating',
    store: livingHeatingStore,
    rawStore: rawLivingHeatingStore,
    readTopic: env.PUBLIC_LIVING_HEAT_VALVE,
    type: 'action-state'
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
    type: 'action-state'
  },
  {
    deviceId: 'living-garden-light',
    store: livingGardenLightStore,
    rawStore: rawLivingGardenLightStore,
    readTopic: env.PUBLIC_LIVING_GARDEN_LIGHT_FROM,
    writeTopic: env.PUBLIC_LIVING_GARDEN_LIGHT_TO,
    type: 'action-state'
  },
  {
    deviceId: 'stairs-light',
    store: bath0LightStore,
    rawStore: rawBath0LightStore,
    readTopic: env.PUBLIC_BATH_0_LIGHT_FROM,
    writeTopic: env.PUBLIC_BATH_0_LIGHT_TO,
    type: 'action-state'
  },
  {
    deviceId: 'bath-0-mirror-light',
    store: bath0MirrorLightStore,
    rawStore: rawBath0MirrorLightStore,
    readTopic: env.PUBLIC_BATH_0_MIRROR_LIGHT_FROM,
    writeTopic: env.PUBLIC_BATH_0_MIRROR_LIGHT_TO,
    type: 'action-state'
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
    type: 'action-state'
  },
  {
    deviceId: 'stairs-light',
    store: stairsLightStore,
    rawStore: rawStairsLightStore,
    readTopic: env.PUBLIC_STAIRS_LIGHT_FROM,
    writeTopic: env.PUBLIC_STAIRS_LIGHT_TO,
    type: 'action-state'
  },
  {
    deviceId: 'external-temperature',
    store: externalTemperatureStore,
    rawStore: rawExternalTemperatureStore,
    readTopic: env.PUBLIC_EXTERNAL_TEMP,
    type: 'number'
  }
]

const readMessageOnRawStoreChange = (
  messagesStore: Writable<ActionState | boolean | number>,
  rawMessagesStore: Writable<string>,
  topic: string,
  type: string
) => {
  rawMessagesStore.subscribe((value) => {
    if (value === undefined) return

    let convertedValue: ActionState | boolean | number

    if (type == 'action-state') {
      convertedValue = value === '1' ? 'active' : 'inactive'
    } else if (type === 'number') {
      convertedValue = parseFloat(value)
    } else {
      throw new Error(`Unknown type ${type}`)
    }

    const messagesStoreState = get(messagesStore)

    if (messagesStoreState !== convertedValue) {
      messagesStore.set(convertedValue)
    }
  })

  const rawMessagesHandler = (messageTopic: string, message: string) => {
    if (messageTopic === topic) {
      rawMessagesStore.set(message)
    }
  }

  rawMessageHandlers.set(topic, rawMessagesHandler)
}

const publishMessageOnStoreChange = (
  deviceId: string,
  store: Writable<ActionState | NumberDeviceState>,
  rawMessagesStore: Writable<string>,
  publishTopic: string,
  type: string,
  client: MqttClient
) => {
  store.subscribe((value) => {
    if (value === undefined) return

    let message

    if (type == 'action-state') {
      if (value === 'active') {
        message = '1'
      } else if (value === 'inactive') {
        message = '0'
      } else if (value === 'not-initialized' || value === 'error' || value === 'disabled') {
        return
      } else {
        throw new Error(`Unknown value ${value} for action-state`)
      }
    } else if (type === 'number') {
      if (hasNumberDeviceStateValue(value)) {
        message = value.toString()
      } else if (value === 'not-initialized' || value === 'error' || value === 'disabled') {
        return
      } else {
        throw new Error(`Unknown value ${value} for number`)
      }
    } else {
      throw new Error(`Unknown type ${type}`)
    }

    if (message !== get(rawMessagesStore)) {
      console.log(`Publishing message to ${deviceId}`, publishTopic, message)
      client.publish(publishTopic, message)
    }
  })
}

const client = browser
  ? connect(env.PUBLIC_MQTT_URL, {
      username: env.PUBLIC_MQTT_USER,
      password: env.PUBLIC_MQTT_PASSWORD
    })
  : null

if (client) {
  console.log('Connecting to MQTT broker')

  storesConfiguration.forEach((config) => {
    readMessageOnRawStoreChange(config.store, config.rawStore, config.readTopic, config.type)
  })

  client.on('connect', () => {
    console.log('Connected to MQTT broker')
    storesConfiguration.forEach((config) => {
      if (config.readTopic && config.readTopic !== '') {
        console.log('Subscribing to topic', config.readTopic)
        client.subscribe(config.readTopic)
      }
    })
    client.on('message', (topic, message) => {
      const deviceId = storesConfiguration.find((config) => config.readTopic === topic)?.deviceId
      console.log(
        `Received message: ${message.toString()} from device: ${deviceId} on topic: ${topic}`
      )
      const handler = rawMessageHandlers.get(topic)

      if (handler) {
        handler(topic, message.toString())
      }
    })
  })

  storesConfiguration.forEach((config) => {
    if (config.writeTopic)
      publishMessageOnStoreChange(
        config.deviceId,
        config.store,
        config.rawStore,
        config.writeTopic,
        config.type,
        client
      )
  })
}
