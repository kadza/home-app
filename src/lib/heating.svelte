<script lang="ts">
  import Radiator from 'svelte-material-icons/Radiator.svelte'
  import RadiatorOff from 'svelte-material-icons/RadiatorOff.svelte'
  import type { ActionState } from './action-state'

  export let state: ActionState
</script>

{#if state === 'active'}
  <Radiator class="text-gray-100" />
{:else if state === 'inactive'}
  <RadiatorOff class="text-gray-400" />
{:else if state === 'error'}
  <RadiatorOff class="text-red-400" />
{:else if state === 'disabled'}
  <RadiatorOff class="text-gray-400" />
{:else if state === 'not-initialized'}
  <RadiatorOff class="text-gray-400" />
{/if}
