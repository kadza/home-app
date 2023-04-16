<script lang="ts">
  import Radiator from 'svelte-material-icons/Radiator.svelte'
  import RadiatorOff from 'svelte-material-icons/RadiatorOff.svelte'
  import Temperature from './temperature.svelte'
  import HumanMale from 'svelte-material-icons/HumanMale.svelte'
  import ChartLine from 'svelte-material-icons/ChartLine.svelte'
  import LightButton from './buttons/light-button.svelte'
  import BlindsButton from './buttons/blinds-button.svelte'
  import type { ActionState } from './action-state'
  export let lightState: ActionState | undefined = undefined
  export let onLightClick: (() => void) | undefined = undefined
  export let blindsSate: ActionState | undefined = undefined
  export let onBlindsClick: (() => void) | undefined = undefined
  export let columnStart = 0
  export let rowStart = 0
  export let columnSpan = 0
  export let rowSpan = 0
  export let id = ''
  export let name = ''
  export let temperature: number | null | undefined = undefined
  export let setTemperature: number | null | undefined = undefined
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
      {#if lightState && onLightClick}
        <LightButton onClick={onLightClick} state={lightState} />
      {/if}
      {#if blindsSate && onBlindsClick}
        <BlindsButton onClick={onBlindsClick} state={blindsSate} />
      {/if}
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
        {#if temperature !== undefined}
          <Temperature {temperature} {setTemperature} />
        {/if}
      </div>
    {/if}
  </div>
</div>
