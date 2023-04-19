<script lang="ts">
  import ActionButton from './action-button.svelte'
  import BlindsOpen from 'svelte-material-icons/BlindsOpen.svelte'
  import BlindsClosed from 'svelte-material-icons/Blinds.svelte'
  import type { BooleanDeviceState } from '../device-state'

  export let onClick = () => {}
  export let state: BooleanDeviceState
</script>

<ActionButton {onClick} {state}>
  <BlindsOpen slot="active" class="text-gray-100" />
  <BlindsClosed slot="inactive" class="text-gray-400" />
  <BlindsClosed slot="error" class="text-gray-700" />
  <BlindsClosed slot="disabled" class="text-gray-400" />
  <BlindsClosed slot="not-initialized" class="text-gray-700" />
</ActionButton>
