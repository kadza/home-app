<script lang="ts">
  import type { ActionState } from '../action-state'

  export let onClick = () => {}
  export let state: ActionState
</script>

<button
  class="p-1.5 rounded-full"
  class:bg-cyan-700={state === 'active' || state === 'inactive'}
  class:bg-red-700={state === 'error'}
  class:bg-gray-700={state === 'disabled'}
  class:bg-gray-400={state === 'not-initialized'}
  on:click={onClick}
>
  {#if state === 'active'}
    <slot name="active" />
  {:else if state === 'inactive'}
    <slot name="inactive" />
  {:else if state === 'disabled'}
    <slot name="disabled" />
  {:else if state === 'error'}
    <slot name="error" />
  {:else if state === 'not-initialized'}
    <slot name="not-initialized" />
  {/if}
</button>
