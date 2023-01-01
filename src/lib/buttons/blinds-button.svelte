<script lang="ts">
  import ActionButton from './action-button.svelte'
  import BlindsOpen from 'svelte-material-icons/BlindsOpen.svelte'
  import BlindsClosed from 'svelte-material-icons/Blinds.svelte'

  export let onClick = () => {}
  export let isBlindsOpen = false
</script>

<ActionButton {onClick} isActive={isBlindsOpen}>
  <BlindsOpen slot="active" />
  <BlindsClosed slot="inactive" color={'grey'} />
</ActionButton>
