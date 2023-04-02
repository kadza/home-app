import { browser } from '$app/environment'
import { env } from '$env/dynamic/public'
import { connect, MqttClient } from 'mqtt'
import { writable, type Writable } from 'svelte/store'
import { get } from 'svelte/store'

export const guestLightStore = writable<boolean>()
export const guestHeatingStore = writable<boolean>()
export const diningLightStore = writable<boolean>()

const rawGuestLightStore = writable<string>()
const rawGuestHeatingStore = writable<string>()
const rawDiningLightStore = writable<string>()

const rawMessageHandlers = new Map<string, (topic: string, message: string) => void>()

const readMessageStoresConfiguration = [
  {
    store: guestLightStore,
    rawStore: rawGuestLightStore,
    topic: env.PUBLIC_GUEST_LIGHT_FROM
  },
  {
    store: guestHeatingStore,
    rawStore: rawGuestHeatingStore,
    topic: env.PUBLIC_GUEST_HEAT_VALVE
  },
  {
    store: diningLightStore,
    rawStore: rawDiningLightStore,
    topic: env.PUBLIC_DINING_LIGHT_FROM
  }
]

const publishMessageStoresConfiguration = [
  {
    store: guestLightStore,
    rawStore: rawGuestLightStore,
    publishTopic: env.PUBLIC_GUEST_LIGHT_TO
  }
]

// create logging store

const readMessageOnRawStoreChange = (
  messagesStore: Writable<boolean>,
  rawMessagesStore: Writable<string>,
  topic: string
) => {
  rawMessagesStore.subscribe((value) => {
    if (value === undefined) return

    const isOn = value === '1'
    const messagesStoreState = get(messagesStore)

    if (messagesStoreState !== isOn) {
      messagesStore.set(isOn)
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
  store: Writable<boolean>,
  rawMessagesStore: Writable<string>,
  publishTopic: string,
  client: MqttClient
) => {
  store.subscribe((value) => {
    if (value === undefined) return

    const message = value ? '1' : '0'

    if (message !== get(rawMessagesStore)) {
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

  readMessageStoresConfiguration.forEach((config) => {
    readMessageOnRawStoreChange(config.store, config.rawStore, config.topic)
  })

  client.on('connect', () => {
    console.log('Connected to MQTT broker')
    client.subscribe(env.PUBLIC_GUEST_LIGHT_FROM)

    client.on('message', (topic, message) => {
      const handler = rawMessageHandlers.get(topic)

      if (handler) {
        handler(topic, message.toString())
      }
    })
  })

  publishMessageStoresConfiguration.forEach((config) => {
    publishMessageOnStoreChange(config.store, config.rawStore, config.publishTopic, client)
  })
}
