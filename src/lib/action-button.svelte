<script lang="ts">
  import LightBulb from 'svelte-material-icons/Lightbulb.svelte'
  import LightBulbOff from 'svelte-material-icons/LightbulbOff.svelte'
  import BlindsOpen from 'svelte-material-icons/BlindsOpen.svelte'
  import BlindsClosed from 'svelte-material-icons/Blinds.svelte'

  export let onClick = () => {}
  export let isActive = false
  export let actionType:'light' | 'blinds' = 'light'
</script>

<button class="p-1.5 bg-cyan-700 rounded-full" on:click={onClick}>
  {#if isActive}
    {#if actionType === 'light' && isActive}
      <LightBulb />
    {:else}
      <BlindsClosed />
    {/if}
  {:else}
    {#if actionType === 'light' && !isActive}
      <LightBulbOff color={'grey'} />
    {:else}
      <BlindsOpen color={'grey'} />
    {/if}
  {/if}
</button>
