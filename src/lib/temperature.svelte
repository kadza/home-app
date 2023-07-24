<script lang="ts">
  import Thermometer from 'svelte-material-icons/Thermometer.svelte'
  import { hasNumberDeviceStateValue, type DeviceMetadata, type NumberDeviceState, getMetadataText } from './device-state'

  export let state: NumberDeviceState
  export let setState: NumberDeviceState | undefined = undefined
  export let stateMetadata: DeviceMetadata | undefined = undefined
  export let setStateMetadata: DeviceMetadata | undefined = undefined
</script>

<div
  class="flex items-center cursor-default"
  class:text-red-500={state === 'error' || setState === 'error'}
  class:text-gray-700={state === 'disabled' || setState === 'disabled'}
  class:text-gray-400={state === 'not-initialized' || setState === 'not-initialized'}
>
  <Thermometer />
  {#if hasNumberDeviceStateValue(state)}
    <span title={getMetadataText(stateMetadata)} class="text-xs mouse-arrow">{state}</span>
  {:else if state==='error'}
    <span title={getMetadataText(stateMetadata)} class="text-xs text-red-500">err</span>
  {/if} 
  {#if setState && hasNumberDeviceStateValue(setState)}
    <span title={getMetadataText(setStateMetadata)} class="text-xs text-gray-400">&nbsp;/ {setState}</span>
  {:else if setState==='error'}
    <span title={getMetadataText(setStateMetadata)} class="text-xs text-red-500">err</span>
  {/if} 
</div>
