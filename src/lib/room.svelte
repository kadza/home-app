<script lang="ts">
  import Temperature from './temperature.svelte'
  import HumanMale from 'svelte-material-icons/HumanMale.svelte'
  import ChartLine from 'svelte-material-icons/ChartLine.svelte'
  import LightButton from './buttons/light-button.svelte'
  import BlindsButton from './buttons/blinds-button.svelte'
  import Heating from './heating.svelte'
  import type { BooleanDeviceState, NumberDeviceState } from './device-state'
  export let lights: { state: BooleanDeviceState; onClick: () => void }[] = []
  export let blindsSate: BooleanDeviceState | undefined = undefined
  export let onBlindsClick: (() => void) | undefined = undefined
  export let heating: BooleanDeviceState | undefined = undefined
  export let columnStart = 0
  export let rowStart = 0
  export let columnSpan = 0
  export let rowSpan = 0
  export let id = ''
  export let name = ''
  export let temperature: NumberDeviceState | undefined = undefined
  export let setTemperature: NumberDeviceState | undefined = undefined
  export let isPresent: boolean | undefined = undefined
</script>

<div
  {id}
  class="shadow bg-gray-800/40 rounded flex"
  style="grid-area: {rowStart} / {columnStart} / span {rowSpan} / span {columnSpan}"
>
  <div class="flex flex-col justify-between items-center w-full p-1">
    {#if rowSpan > 2 && columnSpan > 1}
      <span class="text-xs p-1 w-full">{name}</span>
    {/if}
    <div class="flex gap-1 flex-wrap justify-center">
      {#each lights as light}
        <LightButton state={light.state} onClick={light.onClick} />
      {/each}
      {#if blindsSate && onBlindsClick}
        <BlindsButton onClick={onBlindsClick} state={blindsSate} />
      {/if}
    </div>
    {#if rowSpan > 2 && columnSpan > 1}
      <div class="flex justify-between w-full">
        <div class="flex">
          {#if heating !== undefined}
            <Heating state={heating} />
          {/if}
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
