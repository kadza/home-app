import { browser } from '$app/environment'
import { env } from '$env/dynamic/public'
import { connect } from 'mqtt'
import { writable } from 'svelte/store'
import { get } from 'svelte/store'

const rawGuestLightStore = writable<string>()
export const guestLightStore = writable<boolean>()

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
    client.subscribe(env.PUBLIC_GUEST_LIGHT_FROM)

    client.on('message', (topic, message) => {
      if (topic === env.PUBLIC_GUEST_LIGHT_FROM) {
        console.log('Received guest light message', message.toString())
        rawGuestLightStore.set(message.toString())
      }
    })
  })

  rawGuestLightStore.subscribe((value) => {
    console.log('Received raw guest light store change', value)

    if (value === undefined) return

    const isGuestLightOn = value === '1'
    const guestLightStoreState = get(guestLightStore)

    if (guestLightStoreState !== isGuestLightOn) {
      console.log('Updating guest light store', isGuestLightOn)
      guestLightStore.set(isGuestLightOn)

      return
    }

    console.log('Message did not require guest light store update')
  })

  guestLightStore.subscribe((value) => {
    console.log('Received guest light store change', value)

    if (value === undefined) return

    const message = value ? '1' : '0'

    if (message !== get(rawGuestLightStore)) {
      console.log('Publishing guest light message', value)
      client.publish(env.PUBLIC_GUEST_LIGHT_TO, value ? '1' : '0')

      return
    }

    console.log('Message did not require MQTT publish')
  })
}
