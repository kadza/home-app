<script lang="ts">
  import Room from './room.svelte'
  import { client } from './home-client.svelte'
  import { writable } from 'svelte/store'
  import { onMount } from 'svelte'

  export let name: string
  export let id: string
  export let rowStart: number
  export let columnStart: number
  export let rowSpan: number
  export let columnSpan: number
  export let lightFromTopic: string | string[] | undefined = undefined
  export let lightToTopic: string | string[] | undefined = undefined
  export let temperatureFromTopic: string | undefined = undefined
  export let setTemperatureFromTopic: string | undefined = undefined
  export let heatingValveFromTopic: string | undefined = undefined

  const isLightAvailable = Boolean(lightFromTopic && lightToTopic)
  const isLightOn = writable<boolean | null>(null)
  const temperature = writable<number | null>(null)
  const setTemperature = writable<number | null>(null)
  const isHeatingOn = writable<boolean | null>(null)

  onMount(() => {
    client.on('connect', function () {
      if (lightFromTopic && typeof lightFromTopic === 'string') client.subscribe(lightFromTopic)
      if (lightFromTopic && Array.isArray(lightFromTopic))
        lightFromTopic.forEach((topic) => client.subscribe(topic))

      if (temperatureFromTopic) client.subscribe(temperatureFromTopic)
      if (heatingValveFromTopic) client.subscribe(heatingValveFromTopic)

      client.on('message', function (topic, message) {
        console.log(`${topic} ${message.toString()}`)

        if (lightFromTopic && topic === lightFromTopic && typeof lightFromTopic === 'string')
          isLightOn.set(message.toString() === '1')
        if (lightFromTopic && Array.isArray(lightFromTopic) && lightFromTopic.includes(topic))
          isLightOn.set(message.toString() === '1')

        if (temperatureFromTopic && topic === temperatureFromTopic)
          temperature.set(parseFloat(message.toString()))

        if (setTemperatureFromTopic && topic === setTemperatureFromTopic)
          setTemperature.set(parseFloat(message.toString()))

        if (heatingValveFromTopic && topic === heatingValveFromTopic)
          isHeatingOn.set(message.toString() === '1')
      })
    })

    isLightOn.subscribe((value) => {
      if (!lightToTopic || value === null) return

      if (typeof lightToTopic === 'string') client.publish(lightToTopic, value ? '1' : '0')
      if (Array.isArray(lightToTopic))
        lightToTopic.forEach((topic) => client.publish(topic, value ? '1' : '0'))
    })
  })
  const toggleGuestLight = () => {
    isLightOn.update((n) => !n)
  }
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
  isHeatingOn={heatingValveFromTopic ? Boolean($isHeatingOn) : undefined}
/>
