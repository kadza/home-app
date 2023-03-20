import { writable, type Writable } from 'svelte/store'
import { client } from './home-client'

class MessagesStore {
  private static instance: MessagesStore
  private static storeCache = new Map<string, Writable<string>>()
  private static topicToStoreIds = new Map<string, string[]>()

  private constructor() {
    client.on('connect', () => {
      for (const topic of MessagesStore.topicToStoreIds.keys()) {
        client.subscribe(topic)
      }

      client.on('message', (topic, message) => {
        const storeIds = MessagesStore.topicToStoreIds.get(topic)
        if (storeIds) {
          for (const id of storeIds) {
            const store = MessagesStore.storeCache.get(id)
            if (store) {
              store.set(message.toString())
            }
          }
        }
      })
    })
  }

  public static getInstance(): MessagesStore {
    if (!MessagesStore.instance) {
      MessagesStore.instance = new MessagesStore()
    }

    return MessagesStore.instance
  }

  public subscribe(topic: string): { id: string; store: Writable<string> } {
    const id =
      Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
    const store = writable<string>()
    MessagesStore.storeCache.set(id, store)
    const storeIds = MessagesStore.topicToStoreIds.get(topic) || []
    storeIds.push(id)
    MessagesStore.topicToStoreIds.set(topic, storeIds)

    if (client.connected) {
      client.subscribe(topic)
    }

    return { id, store }
  }

  public unsubscribe(id: string): void {
    const store = MessagesStore.storeCache.get(id)
    if (store) {
      MessagesStore.storeCache.delete(id)
    }
    for (const storeIds of MessagesStore.topicToStoreIds.values()) {
      const index = storeIds.indexOf(id)
      if (index > -1) {
        storeIds.splice(index, 1)
      }
    }

    if (client.connected && MessagesStore.topicToStoreIds.get(id)?.length === 0) {
      client.unsubscribe(id)
    }
  }
}

export default MessagesStore.getInstance()
