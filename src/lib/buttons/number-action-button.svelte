<script lang="ts">
    import { getMetadataText, type NumberDeviceState, type DeviceMetadata } from '../device-state'
  
    export let onClick = () => {}
    export let state: NumberDeviceState
    export let metadata: DeviceMetadata | undefined = undefined
  </script>
  
  <button
    class="p-2 rounded-full w-8 h-8"
    class:bg-cyan-700={state === 100 || state === 0}
    class:bg-red-700={state === 'error'}
    class:bg-gray-700={state === 'disabled'}
    class:bg-gray-400={state === 'not-initialized'}
    on:click={onClick}
    title={getMetadataText(metadata)}
  >
    {#if state === 0}
      <slot name="active" />
    {:else if state === 100}
      <slot name="inactive" />
    {:else if state === 'disabled'}
      <slot name="disabled" />
    {:else if state === 'error'}
      <slot name="error" />
    {:else if state === 'not-initialized'}
      <slot name="not-initialized" />
    {/if}
  </button>
  