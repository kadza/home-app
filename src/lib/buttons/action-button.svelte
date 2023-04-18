<script lang="ts">
  import type { BooleanDeviceState } from '../device-state'

  export let onClick = () => {}
  export let state: BooleanDeviceState
</script>

<button
  class="p-2 rounded-full w-8 h-8"
  class:bg-cyan-700={state === true || state === false}
  class:bg-red-700={state === 'error'}
  class:bg-gray-700={state === 'disabled'}
  class:bg-gray-400={state === 'not-initialized'}
  on:click={onClick}
>
  {#if state === true}
    <slot name="active" />
  {:else if state === false}
    <slot name="inactive" />
  {:else if state === 'disabled'}
    <slot name="disabled" />
  {:else if state === 'error'}
    <slot name="error" />
  {:else if state === 'not-initialized'}
    <slot name="not-initialized" />
  {/if}
</button>
