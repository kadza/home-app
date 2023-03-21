<script lang="ts">
  import '../app.css'
  import Clock from '../lib/clock.svelte'
  import Temperature from '../lib/temperature.svelte'
  import { client } from '../lib/home-client'
  import { writable } from 'svelte/store'
  import { env } from '$env/dynamic/public'
  import { onMount } from 'svelte'

  const temperature = writable<number | undefined>(undefined)

  // onMount(() => {
  //   client.on('connect', function () {
  //     client.subscribe(env.PUBLIC_EXTERNAL_TEMP)
  //   })

  //   client.on('message', function (topic, message) {
  //     console.log(`${topic} ${message.toString()}`)

  //     switch (topic) {
  //       case env.PUBLIC_EXTERNAL_TEMP:
  //         temperature.set(parseFloat(message.toString()))
  //         break
  //     }
  //   })
  // })
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
