import { env } from '$env/dynamic/public'
import { connect, MqttClient } from 'mqtt'
import { browser } from '$app/environment'
import { get, type Writable } from 'svelte/store'
import {
  hasNumberDeviceStateValue,
  type BooleanDeviceState,
  type NumberDeviceState
} from '$lib/device-state'
import { storesConfiguration } from './house-stores-repository'

const rawMessageHandlers = new Map<string, (topic: string, message: string) => void>()

console.log('kuku')

const client = browser
  ? connect(env.PUBLIC_MQTT_URL, {
      username: env.PUBLIC_MQTT_USER,
      password: env.PUBLIC_MQTT_PASSWORD
    })
  : null

const readMessageOnRawStoreChange = (
  messagesStore: Writable<BooleanDeviceState | boolean | number>,
  rawMessagesStore: Writable<string>,
  topic: string,
  type: string
) => {
  rawMessagesStore.subscribe((value) => {
    if (value === undefined) return

    let convertedValue: BooleanDeviceState | boolean | number

    if (type == 'boolean') {
      convertedValue = value === '1' ? true : false
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
  store: Writable<BooleanDeviceState | NumberDeviceState>,
  rawMessagesStore: Writable<string>,
  publishTopic: string,
  type: string,
  client: MqttClient
) => {
  store.subscribe((value) => {
    if (value === undefined) return

    let message

    if (type == 'boolean') {
      if (value === true) {
        message = '1'
      } else if (value === false) {
        message = '0'
      } else if (value === 'not-initialized' || value === 'error' || value === 'disabled') {
        return
      } else {
        throw new Error(`Unknown value ${value} for boolean`)
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

export const init = () => {
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
}
