import { writable, type Writable } from 'svelte/store'
import { env } from '$env/dynamic/public'
import { connect } from 'mqtt'
import { browser } from '$app/environment'

console.log('Imported messages-store-factory.ts')
const storeCache = new Map<string, Writable<string>>()
const topicToStoreIds = new Map<string, { ids: string[]; isSubscribed: boolean }>()

const client = browser
  ? connect(env.PUBLIC_MQTT_URL, {
      username: env.PUBLIC_MQTT_USER,
      password: env.PUBLIC_MQTT_PASSWORD
    })
  : null

if (client) {
  console.log('Connecting to MQTT broker')
  client.on('connect', () => {
    console.log('Connected to MQTT broker')
    for (const topic of topicToStoreIds.keys()) {
      const storeId = topicToStoreIds.get(topic)
      if (storeId && !storeId?.isSubscribed) {
        client.subscribe(topic)
        storeId.isSubscribed = true
        console.log('Subscribed to topic', topic)
      }
    }

    client.on('message', (topic, message) => {
      const storeIds = topicToStoreIds.get(topic)
      if (storeIds) {
        for (const id of storeIds.ids) {
          const store = storeCache.get(id)
          if (store) {
            store.set(message.toString())
          }
        }
      }
    })
  })
}

const subscribe = (topic: string): { id: string; store: Writable<string> } => {
  if (topic === '') {
    throw new Error('Topic cannot be empty')
  }

  const id =
    Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
  const store = writable<string>()
  storeCache.set(id, store)
  topicToStoreIds.get(topic)
    ? topicToStoreIds.get(topic)?.ids.push(id)
    : topicToStoreIds.set(topic, { ids: [id], isSubscribed: false })

  if (client && client.connected) {
    client.subscribe(topic)
  }

  return { id, store }
}

const unsubscribe = (id: string): void => {
  const store = storeCache.get(id)
  if (store) {
    storeCache.delete(id)
  }

  for (const storeIds of topicToStoreIds.values()) {
    const index = storeIds.ids.indexOf(id)
    if (index > -1) {
      storeIds.ids.splice(index, 1)
    }
  }

  if (client && client.connected) {
    topicToStoreIds.forEach((storeIds, topic) => {
      if (storeIds.ids.length === 0) {
        client.unsubscribe(topic)
        console.log('Unsubscribed from topic', topic)
      }
    })
  }
}

export { subscribe, unsubscribe }
