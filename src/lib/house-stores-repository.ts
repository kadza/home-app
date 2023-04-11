import { browser } from '$app/environment'
import { env } from '$env/dynamic/public'
import { connect, MqttClient } from 'mqtt'
import { writable, type Writable } from 'svelte/store'
import { get } from 'svelte/store'

export const guestLightStore = writable<boolean>()
export const guestHeatingStore = writable<boolean>()
export const guestTemperatureStore = writable<number>()
export const diningLightStore = writable<boolean>()
export const livingLightStore = writable<boolean>()
export const livingHeatingStore = writable<boolean>()
export const livingTemperatureStore = writable<number>()
export const livingEntranceLightStore = writable<boolean>()
export const livingGardenLightStore = writable<boolean>()
export const bath0LightStore = writable<boolean>()
export const bath0MirrorLightStore = writable<boolean>()
export const bath0HeatingStore = writable<boolean>()
export const bath0TemperatureStore = writable<number>()
export const stairsLightStore = writable<boolean>()
export const hall0LightStore = writable<boolean>()

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

const rawMessageHandlers = new Map<string, (topic: string, message: string) => void>()

const storesConfiguration = [
  {
    store: guestLightStore,
    rawStore: rawGuestLightStore,
    readTopic: env.PUBLIC_GUEST_LIGHT_FROM,
    writeTopic: env.PUBLIC_GUEST_LIGHT_TO,
    type: 'boolean'
  },
  {
    store: guestHeatingStore,
    rawStore: rawGuestHeatingStore,
    readTopic: env.PUBLIC_GUEST_HEAT_VALVE,
    type: 'boolean'
  },
  {
    store: diningLightStore,
    rawStore: rawDiningLightStore,
    readTopic: env.PUBLIC_DINING_LIGHT_FROM,
    writeTopic: env.PUBLIC_DINING_LIGHT_TO,
    type: 'boolean'
  },
  {
    store: guestTemperatureStore,
    rawStore: rawGuestTemperatureStore,
    readTopic: env.PUBLIC_GUEST_TEMP,
    type: 'number'
  },
  {
    store: livingLightStore,
    rawStore: rawLivingLightStore,
    readTopic: env.PUBLIC_LIVING_LIGHT_FROM,
    writeTopic: env.PUBLIC_LIVING_LIGHT_TO,
    type: 'boolean'
  },
  {
    store: livingHeatingStore,
    rawStore: rawLivingHeatingStore,
    readTopic: env.PUBLIC_LIVING_HEAT_VALVE,
    type: 'boolean'
  },
  {
    store: livingTemperatureStore,
    rawStore: rawLivingTemperatureStore,
    readTopic: env.PUBLIC_LIVING_TEMP,
    type: 'number'
  },
  {
    store: livingEntranceLightStore,
    rawStore: rawLivingEntranceLightStore,
    readTopic: env.PUBLIC_LIVING_ENTRANCE_LIGHT_FROM,
    writeTopic: env.PUBLIC_LIVING_ENTRANCE_LIGHT_TO,
    type: 'boolean'
  },
  {
    store: livingGardenLightStore,
    rawStore: rawLivingGardenLightStore,
    readTopic: env.PUBLIC_LIVING_GARDEN_LIGHT_FROM,
    writeTopic: env.PUBLIC_LIVING_GARDEN_LIGHT_TO,
    type: 'boolean'
  },
  {
    store: bath0LightStore,
    rawStore: rawBath0LightStore,
    readTopic: env.PUBLIC_BATH_0_LIGHT_FROM,
    writeTopic: env.PUBLIC_BATH_0_LIGHT_TO,
    type: 'boolean'
  },
  {
    store: bath0MirrorLightStore,
    rawStore: rawBath0MirrorLightStore,
    readTopic: env.PUBLIC_BATH_0_MIRROR_LIGHT_FROM,
    writeTopic: env.PUBLIC_BATH_0_MIRROR_LIGHT_TO,
    type: 'boolean'
  },
  {
    store: bath0HeatingStore,
    rawStore: rawBath0HeatingStore,
    readTopic: env.PUBLIC_BATH_0_HEAT_VALVE,
    type: 'boolean'
  },
  {
    store: bath0TemperatureStore,
    rawStore: rawBath0TemperatureStore,
    readTopic: env.PUBLIC_BATH_0_TEMP,
    type: 'number'
  },
  {
    store: hall0LightStore,
    rawStore: rawHall0LightStore,
    readTopic: env.PUBLIC_HALL_0_LIGHT_FROM,
    writeTopic: env.PUBLIC_HALL_0_LIGHT_TO,
    type: 'boolean'
  },
  {
    store: stairsLightStore,
    rawStore: rawStairsLightStore,
    readTopic: env.PUBLIC_STAIRS_LIGHT_FROM,
    writeTopic: env.PUBLIC_STAIRS_LIGHT_TO,
    type: 'boolean'
  }
]

const readMessageOnRawStoreChange = (
  messagesStore: Writable<boolean | number>,
  rawMessagesStore: Writable<string>,
  topic: string,
  type: string
) => {
  rawMessagesStore.subscribe((value) => {
    if (value === undefined) return

    let convertedValue: boolean | number

    if (type === 'boolean') {
      convertedValue = value === '1'
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
  store: Writable<boolean | number>,
  rawMessagesStore: Writable<string>,
  publishTopic: string,
  type: string,
  client: MqttClient
) => {
  store.subscribe((value) => {
    if (value === undefined) return

    let message

    if (type === 'boolean') {
      message = value ? '1' : '0'
    } else if (type === 'number') {
      message = value.toString()
    } else {
      throw new Error(`Unknown type ${type}`)
    }

    if (message !== get(rawMessagesStore)) {
      console.log('Publishing message', publishTopic, message)
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
      console.log('Received message', topic, message.toString())
      const handler = rawMessageHandlers.get(topic)

      if (handler) {
        handler(topic, message.toString())
      }
    })
  })

  storesConfiguration.forEach((config) => {
    if (config.writeTopic)
      publishMessageOnStoreChange(
        config.store,
        config.rawStore,
        config.writeTopic,
        config.type,
        client
      )
  })
}
