<script lang="ts">
  import Room from './room.svelte'
  import { client } from './home-client'
  import { writable } from 'svelte/store'

  export let name: string
  export let id: string
  export let rowStart: number
  export let columnStart: number
  export let rowSpan: number
  export let columnSpan: number
  export let lightFromTopic: string | undefined = undefined
  export let lightToTopic: string | undefined = undefined
  export let temperatureFromTopic: string | undefined = undefined
  export let setTemperatureFromTopic: string | undefined = undefined

  const isLightAvailable = Boolean(lightFromTopic && lightToTopic)
  const isLightOn = writable<boolean | null>(null)

  const temperature = writable<number | null>(null)
  const setTemperature = writable<number | null>(null)

  client.on('connect', function () {
    if (lightFromTopic) client.subscribe(lightFromTopic)

    client.on('message', function (topic, message) {
      console.log(`${topic} ${message.toString()}`)

      if (lightFromTopic && topic === lightFromTopic) isLightOn.set(message.toString() === '1')

      if (temperatureFromTopic && topic === temperatureFromTopic)
        temperature.set(parseFloat(message.toString()))

      if (setTemperatureFromTopic && topic === setTemperatureFromTopic)
        setTemperature.set(parseFloat(message.toString()))
    })
  })

  const toggleGuestLight = () => {
    isLightOn.update((n) => !n)
  }

  isLightOn.subscribe((value) => {
    if (!lightToTopic || value === null) return

    client.publish(lightToTopic, value ? '1' : '0')
  })
</script>

<Room
  {id}
  {name}
  {rowStart}
  {columnStart}
  {rowSpan}
  {columnSpan}
  onLightClick={isLightAvailable ? toggleGuestLight : undefined}
  isLightOn={isLightAvailable ? Boolean($isLightOn) : undefined}
  temperature={temperatureFromTopic ? $temperature : undefined}
  setTemperature={setTemperatureFromTopic ? $setTemperature : undefined}
/>
