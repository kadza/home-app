<script lang="ts">
  import Temperature from './temperature.svelte'
  import HumanMale from 'svelte-material-icons/Human.svelte'
  import ChartLine from 'svelte-material-icons/ChartLine.svelte'
  import Heating from './heating.svelte'
  import StoreWrapperLightButton from './store-wrapper-light-button.svelte'
  import StoreWrapperBlindButton from './store-wrapper-blind-button.svelte'
  import { get, type Writable } from 'svelte/store'
  import {
    toggleBooleanDeviceState,
    type BooleanDeviceState,
    type NumberDeviceState,
    hasNumberDeviceStateValue,
  } from './device-state'
    import { configuration, findDeviceMetadata, findDeviceStore } from '../house-stores-repository'

  export let id: string = ''
  export let displayName: string = ''
  export let columnStart: number = 0
  export let rowStart: number = 0
  export let columnSpan: number = 0
  export let rowSpan: number = 0

  function getStores() {
    const deviceConfigs = configuration.filter((config) => config.roomId === id)
    const heating = findDeviceStore(id, 'heating')
    const heatingMetadata = findDeviceMetadata(id, 'heating')
    const isPresent = findDeviceStore(id, 'presence')
    const chartUrl = undefined
    const temperature = findDeviceStore(id, 'temperature')
    const temperatureMetadata = findDeviceMetadata(id, 'temperature')
    const setTemperature = findDeviceStore(id, 'setTemperature')
    const setTemperatureMetadata = findDeviceMetadata(id, 'setTemperature')
    const lightStoreConfigs = deviceConfigs.filter((config) => config.deviceType === 'light')

    const lightStores = lightStoreConfigs.map((light) => ({
      state: light.store as Writable<BooleanDeviceState>,
      metadata: findDeviceMetadata(light.roomId, 'light', light.deviceId),
      onClick: () => {
        const lightStore = light.store as Writable<BooleanDeviceState>
        const currentValue = get(lightStore)
        lightStore.set(toggleBooleanDeviceState(currentValue))
      }
    }))


    // const blindStoreConfigs = deviceConfigs.filter((config) => config.deviceType === 'blind')

    // const blindStores = blindStoreConfigs.map((blind) => ({
    //   state: blind.readStore as Writable<NumberDeviceState>,
    //   metadata: findDeviceMetadata(blind.roomId, 'blind', blind.deviceId),
    //   onClick: () => {
    //     const blindReadStore = blind.readStore as Writable<NumberDeviceState>
    //     const blindWriteStore = blind.writeStore as Writable<NumberDeviceState>
    //     const blindState = get(blindReadStore)
    //     const blindCommandState = get(blindWriteStore)

    //     let newValue = 0

    //     if (blindCommandState === 1 || blindCommandState === 2) {
    //       newValue = 0
    //     } 

    //     if (blindCommandState === 0) {
    //       if (hasNumberDeviceStateValue(blindState) && blindState > 0) {
    //         newValue = 2
    //       } else {
    //         newValue = 2
    //       }
    //     }

    //     blindWriteStore.set(newValue)
    //   }
    // }))

    return {
      lights: lightStores,
      blinds: [],
      heating,
      heatingMetadata,
      temperature,
      temperatureMetadata,
      setTemperature,
      setTemperatureMetadata,
      isPresent,
      chartUrl
    }
  }

  const {
    lights,
    blinds,
    heating,
    heatingMetadata,
    temperature,
    temperatureMetadata,
    setTemperature,
    setTemperatureMetadata,
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
      {#each lights as { state, onClick, metadata }}
        <StoreWrapperLightButton {state} {onClick} {metadata} />
      {/each}
      <!-- https://github.com/sveltejs/language-tools/issues/1341#issuecomment-1025469467 -->
      {#each blinds as { state, onClick, metadata }}
        <StoreWrapperBlindButton {state} {onClick} {metadata} />
      {/each}
    </div>
    {#if rowSpan > 2 && columnSpan > 1}
      <div class="flex justify-between w-full">
        <div class="flex">
           <!-- https://github.com/sveltejs/language-tools/issues/1341#issuecomment-1025469467 -->
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
          <Temperature state={$temperature} setState={$setTemperature} stateMetadata={temperatureMetadata} setStateMetadata={setTemperatureMetadata}/>
        {/if}
      </div>
    {/if}
  </div>
</div>
