<script>
  import LightBulb from 'svelte-material-icons/Lightbulb.svelte'
  import LightBulbOff from 'svelte-material-icons/LightbulbOff.svelte'
  import BlindsOpen from 'svelte-material-icons/BlindsOpen.svelte'
  import BlindsClosed from 'svelte-material-icons/Blinds.svelte'
  import Radiator from 'svelte-material-icons/Radiator.svelte'
  import RadiatorOff from 'svelte-material-icons/RadiatorOff.svelte'
  export let isLightOn = false
  export let roomClicked = () => {}
  export let columnStart = 0
  export let rowStart = 0
  export let columnSpan = 0
  export let rowSpan = 0
  export let id = ''
  export let name = ''
</script>

<div
  {id}
  class="shadow bg-gray-800/40 rounded"
  style="grid-area: {rowStart} / {columnStart} / span {rowSpan} / span {columnSpan}"
>
  <div class="px-2 py-2 space-y-1 flex flex-col text-gray-300">
    <span class="text-xs">{name}</span>
    <div>
      <button on:click={roomClicked}>
        {#if isLightOn}
          <LightBulb />
        {:else}
          <LightBulbOff color={'grey'} />
        {/if}
      </button>
      <button on:click={roomClicked}>
        {#if isLightOn}
          <BlindsClosed />
        {:else}
          <BlindsOpen color={'grey'} />
        {/if}
      </button>
      <button on:click={roomClicked}>
        {#if isLightOn}
          <Radiator />
        {:else}
          <RadiatorOff color={'grey'} />
        {/if}
      </button>
    </div>
  </div>
</div>
