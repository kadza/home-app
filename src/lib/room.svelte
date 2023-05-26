<script lang="ts">
  import Temperature from './temperature.svelte'
  import HumanMale from 'svelte-material-icons/HumanMale.svelte'
  import ChartLine from 'svelte-material-icons/ChartLine.svelte'
  import BlindsButton from './buttons/blinds-button.svelte'
  import Heating from './heating.svelte'
  import type { BooleanDeviceState, DeviceMetadata, NumberDeviceState } from './device-state'
  import type { Writable } from 'svelte/store'
  import StoreWrapperLightButton from './store-wrapper-light-button.svelte'

  export let lights: { state: Writable<BooleanDeviceState>; onClick: () => void }[] = []
  export let blindsSate: Writable<BooleanDeviceState> | undefined = undefined
  export let onBlindsClick: (() => void) | undefined = undefined
  export let heating: Writable<BooleanDeviceState> | undefined = undefined
  export let heatingMetadata: DeviceMetadata | undefined = undefined
  export let columnStart: number = 0
  export let rowStart: number = 0
  export let columnSpan: number = 0
  export let rowSpan: number = 0
  export let id: string = ''
  export let name: string = ''
  export let temperature: Writable<NumberDeviceState> | undefined = undefined
  export let setTemperature: Writable<NumberDeviceState> | undefined = undefined
  export let isPresent: Writable<boolean> | undefined = undefined
  export let chartUrl: Writable<string> | undefined = undefined
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
      {#each lights as { state, onClick }}
        <StoreWrapperLightButton state={state} onClick={onClick} />
      {/each}
      <!-- https://github.com/sveltejs/language-tools/issues/1341#issuecomment-1025469467 -->
      {#if blindsSate && $blindsSate && onBlindsClick}
        <BlindsButton onClick={onBlindsClick} state={$blindsSate} />
      {/if}
    </div>
    {#if rowSpan > 2 && columnSpan > 1}
      <div class="flex justify-between w-full">
        <div class="flex">
          {#if heating !== undefined && $heating !== undefined}
            <Heating state={$heating} metadata={heatingMetadata} />
          {/if}
          {#if $isPresent === true}
            <HumanMale />
          {:else if $isPresent === false}
            <HumanMale color={'grey'} />
          {/if}
          {#if chartUrl}
            <button>
              <ChartLine />
            </button>
          {/if}
        </div>
        {#if temperature !== undefined && $temperature !== undefined}
          <Temperature temperature={$temperature} setTemperature={$setTemperature} />
        {/if}
      </div>
    {/if}
  </div>
</div>
