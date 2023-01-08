<script lang="ts">
  import '../app.css'
  import Clock from '../lib/clock.svelte'
  import Temperature from '../lib/temperature.svelte'
  import { client } from '../lib/home-client.svelte'
  import { writable } from 'svelte/store'
  import { PUBLIC_EXTERNAL_TEMP } from '$env/static/public'
  import { onMount } from 'svelte'

  const temperature = writable<number | undefined>(undefined)

  onMount(() => {
    client.on('connect', function () {
      client.subscribe(PUBLIC_EXTERNAL_TEMP)
    })

    client.on('message', function (topic, message) {
      console.log(`${topic} ${message.toString()}`)

      switch (topic) {
        case PUBLIC_EXTERNAL_TEMP:
          temperature.set(parseFloat(message.toString()))
          break
      }
    })
  })
  export const prerender = false
  export const ssr = false
</script>

<style>
  :global(body) {
    background-image: url(/bg.jpeg);
    background-attachment: fixed;
  }
</style>

<div class="flex flex-row-reverse gap-2 bg-gray-800/40 px-2 py-2 shadow mb-4">
  <div class="bg-white/10 px-2 py-1">
    <Clock />
  </div>
  <div class="bg-white/10 px-2 py-1">
    <Temperature temperature={$temperature} />
  </div>
</div>

<slot />
