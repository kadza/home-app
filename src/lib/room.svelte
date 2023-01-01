<script lang="ts">
  import LightBulb from 'svelte-material-icons/Lightbulb.svelte'
  import LightBulbOff from 'svelte-material-icons/LightbulbOff.svelte'
  import BlindsOpen from 'svelte-material-icons/BlindsOpen.svelte'
  import BlindsClosed from 'svelte-material-icons/Blinds.svelte'
  import Radiator from 'svelte-material-icons/Radiator.svelte'
  import RadiatorOff from 'svelte-material-icons/RadiatorOff.svelte'
  import Temperature from './temperature.svelte'
  import HumanMale from 'svelte-material-icons/HumanMale.svelte'
  import ChartLine from 'svelte-material-icons/ChartLine.svelte'
  import ActionButton from './action-button.svelte'
  export let isLightOn = false
  export let roomClicked = () => {}
  export let columnStart = 0
  export let rowStart = 0
  export let columnSpan = 0
  export let rowSpan = 0
  export let id = ''
  export let name = ''
  export let temperature: number | undefined
  export let setTemperature: number | undefined = undefined
  export let isHeatingOn: boolean | undefined = undefined
  export let isPresent: boolean | undefined = undefined
</script>

<div
  {id}
  class="shadow bg-gray-800/40 rounded flex"
  style="grid-area: {rowStart} / {columnStart} / span {rowSpan} / span {columnSpan}"
>
  <div class="flex flex-col justify-between h-full w-full p-1">
    {#if rowSpan > 2 && columnSpan > 2}
      <span class="text-xs p-1">{name}</span>
    {/if}
    <div class="flex justify-center gap-2 items-center h-full">
      <ActionButton onClick={roomClicked} isActive={isLightOn} />
      <ActionButton actionType={"blinds"} isActive={isLightOn}/>
    </div>
    {#if rowSpan > 2 && columnSpan > 2}
      <div class="flex justify-between">
        <div class="flex">
          <button>
            {#if isHeatingOn === true}
              <Radiator />
            {:else if isHeatingOn === false}
              <RadiatorOff color={'grey'} />
            {/if}
          </button>
          <button>
            {#if isPresent === true}
              <HumanMale />
            {:else if isPresent === false}
              <HumanMale color={'grey'} />
            {/if}
          </button>
          <button>
            <ChartLine />
          </button>
        </div>
        <Temperature {temperature} {setTemperature} />
      </div>
    {/if}
  </div>
</div>
