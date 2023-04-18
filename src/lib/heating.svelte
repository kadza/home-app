<script lang="ts">
  import Radiator from 'svelte-material-icons/Radiator.svelte'
  import RadiatorOff from 'svelte-material-icons/RadiatorOff.svelte'
  import type { BooleanDeviceState } from './device-state'

  export let state: BooleanDeviceState
</script>

{#if state === true}
  <Radiator class="text-gray-100" />
{:else if state === false}
  <RadiatorOff class="text-gray-400" />
{:else if state === 'error'}
  <RadiatorOff class="text-red-400" />
{:else if state === 'disabled'}
  <RadiatorOff class="text-gray-400" />
{:else if state === 'not-initialized'}
  <RadiatorOff class="text-gray-400" />
{/if}
