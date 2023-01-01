<script lang="ts">
  import Room from '../room.svelte'
  import { client } from '../home-client'
  import { PUBLIC_GUEST_LIGHT_FROM, PUBLIC_GUEST_LIGHT_TO } from '$env/static/public'
  import { writable } from 'svelte/store'

  const isGuestLightOn = writable<boolean | null>(null)

  client.on('connect', function () {
    client.subscribe(PUBLIC_GUEST_LIGHT_FROM)

    client.on('message', function (topic, message) {
      console.log(`${topic} ${message.toString()}`)

      if (topic === PUBLIC_GUEST_LIGHT_FROM) {
        isGuestLightOn.set(message.toString() === '1')
      }
    })
  })

  const toggleGuestLight = () => {
    isGuestLightOn.update((n) => !n)
  }

  isGuestLightOn.subscribe((value) => {
    if (value === null) return

    client.publish(PUBLIC_GUEST_LIGHT_TO, value ? '1' : '0')
  })
</script>

<Room
  id="guest"
  name="Guest"
  rowStart={2}
  columnStart={1}
  rowSpan={5}
  columnSpan={4}
  onLightClick={toggleGuestLight}
  isLightOn={Boolean($isGuestLightOn)}
/>
