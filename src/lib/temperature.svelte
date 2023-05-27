<script lang="ts">
  import Thermometer from 'svelte-material-icons/Thermometer.svelte'
  import { hasNumberDeviceStateValue, type NumberDeviceState } from './device-state'

  export let state: NumberDeviceState
  export let setState: NumberDeviceState | undefined = undefined
</script>

<div
  class="flex items-center"
  class:text-red-500={state === 'error' || setState === 'error'}
  class:text-gray-700={state === 'disabled' || setState === 'disabled'}
  class:text-gray-400={state === 'not-initialized' || setState === 'not-initialized'}
>
  <Thermometer />
  {#if hasNumberDeviceStateValue(state)}
    <span class="text-xs">{state} °C</span>
  {/if}
  {#if setState && hasNumberDeviceStateValue(setState)}
    <span class="text-xs text-gray-400">&nbsp;/ {setState} °C</span>
  {/if}
</div>
