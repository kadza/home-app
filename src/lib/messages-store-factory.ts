import { writable, type Writable } from 'svelte/store'
import { client } from './home-client'

const storeCache = new Map<string, Writable<string>>()
const topicToStoreIds = new Map<string, string[]>()

client.on('connect', () => {
  //subscribe to all topics from topicToStoreIds
  for (const topic of topicToStoreIds.keys()) {
    client.subscribe(topic)
  }

  //listen for messages
  client.on('message', (topic, message) => {
    //get the list of subscribers for the topic
    const storeIds = topicToStoreIds.get(topic)
    if (storeIds) {
      //update the store for each subscriber
      for (const id of storeIds) {
        const store = storeCache.get(id)
        if (store) {
          store.set(message.toString())
        }
      }
    }
  })
})

export const subscribe = (topic: string): { id: string; store: Writable<string> } => {
  //generate a random id for the subscription
  const id =
    Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
  //subscribe to the topic
  const store = writable<string>()
  storeCache.set(id, store)
  //add the id to the topic's list of subscribers
  const storeIds = topicToStoreIds.get(topic) || []
  storeIds.push(id)
  topicToStoreIds.set(topic, storeIds)

  //if client is connected, subscribe to the topic
  if (client.connected) {
    client.subscribe(topic)
  }

  return { id, store }
}

export const unsubscribe = (id: string): void => {
  //remove the subscription from the cache
  const store = storeCache.get(id)
  if (store) {
    storeCache.delete(id)
  }
  //remove the id from the topic's list of subscribers
  for (const storeIds of topicToStoreIds.values()) {
    const index = storeIds.indexOf(id)
    if (index > -1) {
      storeIds.splice(index, 1)
    }
  }

  //if client is connected and there are no more subscribers, unsubscribe from the topic
  if (client.connected && topicToStoreIds.get(id)?.length === 0) {
    client.unsubscribe(id)
  }
}
