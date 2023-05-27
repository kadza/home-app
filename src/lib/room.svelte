<script lang="ts">
  import Temperature from './temperature.svelte'
  import HumanMale from 'svelte-material-icons/HumanMale.svelte'
  import ChartLine from 'svelte-material-icons/ChartLine.svelte'
  import BlindsButton from './buttons/blinds-button.svelte'
  import Heating from './heating.svelte'
  import StoreWrapperLightButton from './store-wrapper-light-button.svelte'
  import { get, type Writable } from 'svelte/store'
  import {
    toggleBooleanDeviceState,
    type BooleanDeviceState,
    type NumberDeviceState
  } from './device-state'
    import { configuration } from '../house-stores-repository'

  export let id: string = ''
  export let displayName: string = ''
  export let columnStart: number = 0
  export let rowStart: number = 0
  export let columnSpan: number = 0
  export let rowSpan: number = 0

  function getStores() {
    const deviceConfigs = configuration.filter((config) => config.roomId === id)
    const heatingConfig = deviceConfigs.find((config) => config.deviceType === 'heating')
    const heating = heatingConfig?.store as Writable<BooleanDeviceState>
    const heatingMetadata = heatingConfig
      ? {
          deviceId: heatingConfig.deviceId,
          readTopic: heatingConfig.readTopic,
          writeTopic: heatingConfig.writeTopic
        }
      : undefined
    const blindsSate = undefined
    const isPresent = undefined
    const chartUrl = undefined
    const temperatureConfig = deviceConfigs.find((config) => config.deviceType === 'temperature')
    const temperature = temperatureConfig?.store as Writable<NumberDeviceState>
    const setTemperaturConfig = deviceConfigs.find(
      (config) => config.deviceType === 'setTemperature'
    )
    const setTemperature = setTemperaturConfig?.store as Writable<NumberDeviceState>
    const lightStoreConfigs = deviceConfigs.filter((config) => config.deviceType === 'light')

    const lightStores = lightStoreConfigs.map((light) => ({
      state: light.store as Writable<BooleanDeviceState>,
      onClick: () => {
        const lightStore = light.store as Writable<BooleanDeviceState>
        const currentValue = get(lightStore)
        lightStore.set(toggleBooleanDeviceState(currentValue))
      }
    }))

    return {
      lights: lightStores,
      blindsSate,
      heating,
      heatingMetadata,
      temperature,
      setTemperature,
      isPresent,
      chartUrl
    }
  }

  const {
    lights,
    blindsSate,
    heating,
    heatingMetadata,
    temperature,
    setTemperature,
    isPresent,
    chartUrl
  } = getStores()
</script>

<div
  {id}
  class="shadow bg-gray-800/40 rounded flex"
  style="grid-area: {rowStart} / {columnStart} / span {rowSpan} / span {columnSpan}"
>
  <div class="flex flex-col justify-between items-center w-full p-1">
    {#if rowSpan > 2 && columnSpan > 1}
      <span class="text-xs p-1 w-full">{displayName}</span>
    {/if}
    <div class="flex gap-1 flex-wrap justify-center">
      {#each lights as { state, onClick }}
        <StoreWrapperLightButton {state} {onClick} />
      {/each}
      <!-- https://github.com/sveltejs/language-tools/issues/1341#issuecomment-1025469467 -->
      {#if blindsSate && $blindsSate}
        <BlindsButton state={$blindsSate} />
      {/if}
    </div>
    {#if rowSpan > 2 && columnSpan > 1}
      <div class="flex justify-between w-full">
        <div class="flex">
          {#if heating !== undefined && $heating !== undefined}
            <Heating state={$heating} metadata={heatingMetadata} />
          {/if}
          {#if isPresent !== undefined && $isPresent !== undefined}
            {#if $isPresent === true}
              <HumanMale />
            {:else if $isPresent === false}
              <HumanMale color={'grey'} />
            {/if}
          {/if}
          {#if chartUrl}
            <button>
              <ChartLine />
            </button>
          {/if}
        </div>
        {#if temperature !== undefined && $temperature !== undefined}
          <Temperature state={$temperature} setState={$setTemperature} />
        {/if}
      </div>
    {/if}
  </div>
</div>
