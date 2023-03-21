<script lang="ts">
  import { onDestroy, onMount } from 'svelte'
  import { writable } from 'svelte/store'
  import { client } from './home-client'
  import Room from './room.svelte'
  import { subscribe, unsubscribe } from './messages-store-factory'

  type Origin = 'app' | 'remote'

  const isLightOn = writable<{ isOn: boolean; origin: Origin } | null>(null)
  const temperature = writable<number | null>(null)
  const setTemperature = writable<number | null>(null)
  const isHeatingOn = writable<boolean | null>(null)
  const subscriptionIds: string[] = []

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

  onMount(() => {
    if (lightFromTopic && typeof lightFromTopic === 'string' && lightFromTopic !== '') {
      const { id, store } = subscribe(lightFromTopic)
      subscriptionIds.push(id)

      store.subscribe((message) => {
        if (message) isLightOn.set({ isOn: message.toString() === '1', origin: 'remote' })
      })
    }
    if (lightFromTopic && Array.isArray(lightFromTopic))
      lightFromTopic.forEach((topic) => {
        if (topic === '') return
        const { id, store } = subscribe(topic)
        subscriptionIds.push(id)

        store.subscribe((message) => {
          if (message) isLightOn.set({ isOn: message.toString() === '1', origin: 'remote' })
        })
      })

    if (temperatureFromTopic && temperatureFromTopic !== '') {
      const { id, store } = subscribe(temperatureFromTopic)
      subscriptionIds.push(id)

      store.subscribe((message) => {
        if (message) temperature.set(parseFloat(message.toString()))
      })
    }

    if (heatingValveFromTopic && heatingValveFromTopic !== '') {
      const { id, store } = subscribe(heatingValveFromTopic)
      subscriptionIds.push(id)

      store.subscribe((message) => {
        if (message) isHeatingOn.set(message.toString() === '1')
      })
    }
  })
  // client.on('message', function (topic, message) {
  //   if (lightFromTopic && topic === lightFromTopic && typeof lightFromTopic === 'string')
  //     isLightOn.set({ isOn: message.toString() === '1', origin: 'remote' })
  //   if (lightFromTopic && Array.isArray(lightFromTopic) && lightFromTopic.includes(topic))
  //     isLightOn.set({ isOn: message.toString() === '1', origin: 'remote' })

  // if (temperatureFromTopic && topic === temperatureFromTopic)
  //     temperature.set(parseFloat(message.toString()))

  //   if (setTemperatureFromTopic && topic === setTemperatureFromTopic)
  //     setTemperature.set(parseFloat(message.toString()))

  //   if (heatingValveFromTopic && topic === heatingValveFromTopic)
  //     isHeatingOn.set(message.toString() === '1')
  // })

  onDestroy(() => subscriptionIds.forEach((id) => unsubscribe(id)))

  $: {
    if (lightToTopic && client && $isLightOn !== null && $isLightOn.origin !== 'remote') {
      if (typeof lightToTopic === 'string')
        client.publish(lightToTopic, $isLightOn.isOn ? '1' : '0')
      if (Array.isArray(lightToTopic))
        lightToTopic.forEach((topic) => client.publish(topic, $isLightOn?.isOn ? '1' : '0'))
    }
  }

  const toggleGuestLight = () => {
    isLightOn.update((n) => ({ isOn: !n?.isOn, origin: 'app' }))
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
  isLightOn={isLightAvailable ? $isLightOn?.isOn : undefined}
  temperature={temperatureFromTopic ? $temperature : undefined}
  setTemperature={setTemperatureFromTopic ? $setTemperature : undefined}
  isHeatingOn={heatingValveFromTopic ? Boolean($isHeatingOn) : undefined}
/>
