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

<style>
  .room {
    border: 1px;
    border-radius: 2px;
    box-shadow: 0 1px 5px rgba(0, 0, 0, 0.1);
    background-color: rgba(0, 0, 0, 0.3);
  }
  .room small {
    font-size: 0.75rem;
    display: block;
    color: rgba(255, 255, 255, 0.5);
  }
  .room button {
    margin-top: 0.5rem;
    background-color: transparent;
    color: rgba(255, 255, 255, 0.85);
    display: inline-block;
    font-weight: 400;
    text-align: center;
    vertical-align: middle;
    background-color: transparent;
    border: none;
    font-size: 1rem;
    border-radius: 2px;
    cursor: pointer;
  }
</style>

<div
  {id}
  class="room"
  style="grid-area: {rowStart} / {columnStart} / span {rowSpan} / span {columnSpan}"
>
  <div style="padding: 0.5rem">
    <small>{name}</small>
    <button on:click={roomClicked}>
      {#if isLightOn}
        <LightBulb color={'white'} />
      {:else}
        <LightBulbOff color={'grey'} />
      {/if}
    </button>
    <button on:click={roomClicked}>
      {#if isLightOn}
        <BlindsClosed color={'white'} />
      {:else}
        <BlindsOpen color={'grey'} />
      {/if}
    </button>
    <button on:click={roomClicked}>
      {#if isLightOn}
        <Radiator color={'white'} />
      {:else}
        <RadiatorOff color={'grey'} />
      {/if}
    </button>
  </div>
</div>
