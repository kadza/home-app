<script lang="ts">
  import Radiator from 'svelte-material-icons/Radiator.svelte'
  import RadiatorOff from 'svelte-material-icons/RadiatorOff.svelte'
  import { camelCaseToWords, type BooleanDeviceState, type DeviceMetadata } from './device-state'

  export let state: BooleanDeviceState
  export let metadata: DeviceMetadata | undefined = undefined
</script>

<span
  title={metadata
    ? `Device: ${camelCaseToWords(metadata.deviceId)} \nRead topic: ${
        metadata.readTopic ? metadata.readTopic : 'n/a'
      }`
    : ''}
>
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
</span>
