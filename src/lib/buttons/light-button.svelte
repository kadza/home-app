<script lang="ts">
  import ActionButton from './action-button.svelte'
  import LightBulb from 'svelte-material-icons/Lightbulb.svelte'
  import LightBulbOff from 'svelte-material-icons/LightbulbOff.svelte'
  import type { BooleanDeviceState } from '../device-state'

  export let onClick = () => {}
  export let state: BooleanDeviceState
</script>

<ActionButton {onClick} {state}>
  <LightBulb slot="active" class="text-gray-100" />
  <LightBulbOff slot="inactive" class="text-gray-400" />
  <LightBulbOff slot="error" class="text-gray-700" />
  <LightBulbOff slot="disabled" class="text-gray-400" />
  <LightBulbOff slot="not-initialized" class="text-gray-700" />
</ActionButton>
