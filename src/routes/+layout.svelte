<script lang="ts">
  import '../app.css'
  import Clock from '../lib/clock.svelte'
  import Temperature from '../lib/temperature.svelte'
  import { externalTemperatureStore } from '$lib/house-stores-repository'
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
    <Temperature temperature={$externalTemperatureStore} />
  </div>
</div>

<slot />
