<script lang="ts">
  import Thermometer from 'svelte-material-icons/Thermometer.svelte'
  import { hasNumberDeviceStateValue, type NumberDeviceState } from './device-state'

  export let temperature: NumberDeviceState
  export let setTemperature: NumberDeviceState | undefined = undefined
</script>

<div
  class="flex items-center"
  class:text-red-500={temperature === 'error' || setTemperature === 'error'}
  class:text-gray-700={temperature === 'disabled' || setTemperature === 'disabled'}
  class:text-gray-400={temperature === 'not-initialized' || setTemperature === 'not-initialized'}
>
  <Thermometer />
  {#if hasNumberDeviceStateValue(temperature)}
    <span class="text-xs">{temperature} °C</span>
  {/if}
  {#if setTemperature && hasNumberDeviceStateValue(setTemperature)}
    <span class="text-xs text-gray-400">&nbsp;/ {setTemperature} °C</span>
  {/if}
</div>
