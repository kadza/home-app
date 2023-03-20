import type { MqttClient } from 'mqtt'
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { subscribe } from './messages-store-factory'
import { client } from './home-client'

vi.mock('./home-client', () => {
  const client: MqttClient = {
    on: vi.fn(),
    subscribe: vi.fn(),
    connected: true
  }

  return { client }
})

describe('messages-store-factory', () => {
  afterEach(() => {
    vi.clearAllMocks()
  })
  it('kuku2', () => {
    const id = subscribe('kuku1')
    expect(client.on).toBeCalledTimes(1)
    expect(client.subscribe).toBeCalledTimes(1)
  })
})
