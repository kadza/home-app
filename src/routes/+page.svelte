<script lang="ts">
  import Room from '$lib/room.svelte'
  import {
    toggleBooleanDeviceState,
  } from '$lib/device-state'
  import { init } from '../home-client'
  import {
    getBooleanDeviceStore,
    getDeviceMetadata,
    getNumberDeviceStore
  } from '../house-stores-repository'
  import { get, writable } from 'svelte/store'

  function getTemperaturePropsByDevice(device: string) {
    return writable({
      temperature: getNumberDeviceStore(`${device}Temperature`),
      setTemperature: getNumberDeviceStore(`${device}SetTemperature`),
      heating: getBooleanDeviceStore(`${device}Heating`),
      heatingMetadata: getDeviceMetadata(`${device}Heating`)
    })
  }

  type RoomProps = {
    roomName: string
    rowStart: number
    columnStart: number
    rowSpan: number
    columnSpan: number
    lights?: string[]
  }

  function createRoom({ roomName, rowStart, columnStart, rowSpan, columnSpan, lights = [] }: RoomProps) {
    const roomLights = lights.map((light) => ({
      state: getBooleanDeviceStore(`${roomName}${light}`),
      onClick: () => {
        const lightStore = getBooleanDeviceStore(`${roomName}${light}`)
        const currentValue = get(lightStore)
        lightStore.set(toggleBooleanDeviceState(currentValue))
      }
    }))

    const temperature = getNumberDeviceStore(`${roomName}Temperature`)
    const setTemperature = getNumberDeviceStore(`${roomName}SetTemperature`)
    const heating = getBooleanDeviceStore(`${roomName}Heating`)
    const heatingMetadata = getDeviceMetadata(`${roomName}Heating`)

    return {
      id: roomName.toLocaleLowerCase(),
      name: roomName,
      rowStart,
      columnStart,
      rowSpan,
      columnSpan,
      lights: roomLights,
      temperature,
      setTemperature,
      heating,
      heatingMetadata
    }
  }

  const bath0HeatingStore = getBooleanDeviceStore('bath0Heating')
  const bath0LightStore = getBooleanDeviceStore('bath0Light')
  const bath0MirrorLightStore = getBooleanDeviceStore('bath0MirrorLight')
  const bath0SetTemperatureStore = getNumberDeviceStore('bath0SetTemperature')
  const bath0TemperatureStore = getNumberDeviceStore('bath0Temperature')
  const boilerLightStore = getBooleanDeviceStore('boilerLight')
  const boilerTemperatureStore = getNumberDeviceStore('boilerTemperature')
  const boilerWallLightStore = getBooleanDeviceStore('boilerWallLight')
  const diningLightStore = getBooleanDeviceStore('diningLight')
  const entranceHeatingStore = getBooleanDeviceStore('entranceHeating')
  const entranceLightStore = getBooleanDeviceStore('entranceLight')
  const entranceSetTemperatureStore = getNumberDeviceStore('entranceSetTemperature')
  const entranceTemperatureStore = getNumberDeviceStore('entranceTemperature')
  const garageHeatingStore = getBooleanDeviceStore('garageHeating')
  const garageLight0Store = getBooleanDeviceStore('garageLight0')
  const garageLight1Store = getBooleanDeviceStore('garageLight1')
  const garageSetTemperatureStore = getNumberDeviceStore('garageSetTemperature')
  const garageTemperatureStore = getNumberDeviceStore('garageTemperature')
  const hall0LightStore = getBooleanDeviceStore('hall0Light')
  const kitchenLightStore = getBooleanDeviceStore('kitchenLight')
  const livingEntranceLightStore = getBooleanDeviceStore('livingEntranceLight')
  const livingGardenLightStore = getBooleanDeviceStore('livingGardenLight')
  const livingLightStore = getBooleanDeviceStore('livingLight')
  const stairsLightStore = getBooleanDeviceStore('stairsLight')
  const storeLightStore = getBooleanDeviceStore('storeLight')
  const storeTemperatureStore = getNumberDeviceStore('storeTemperature')

  init()
</script>

<div class="flex flex-col items-center xl:flex-row xl:space-x-4 xl:justify-center">
  <div class="grid grid-cols-[repeat(17,2.5rem)] grid-rows-[repeat(19,2.5rem)] gap-1">
    <Room
      id="living-garden"
      name="Garden"
      rowStart={1}
      columnStart={11}
      rowSpan={1}
      columnSpan={6}
      lights={[
        {
          state: livingGardenLightStore,
          onClick: () => {
            $livingGardenLightStore = toggleBooleanDeviceState($livingGardenLightStore)
          }
        }
      ]}
    />
    <Room
      id="living"
      name="Living"
      rowStart={2}
      columnStart={10}
      rowSpan={5}
      columnSpan={8}
      lights={[
        {
          state: livingLightStore,
          onClick: () => {
            $livingLightStore = toggleBooleanDeviceState($livingLightStore)
          }
        },
        {
          state: livingGardenLightStore,
          onClick: () => {
            $livingGardenLightStore = toggleBooleanDeviceState($livingGardenLightStore)
          }
        },
        {
          state: livingEntranceLightStore,
          onClick: () => {
            $livingEntranceLightStore = toggleBooleanDeviceState($livingEntranceLightStore)
          }
        }
      ]}
      {...getTemperaturePropsByDevice('living')}
    />
    <Room
      id="dining"
      name="Dining"
      rowStart={7}
      columnStart={10}
      rowSpan={3}
      columnSpan={8}
      lights={[
        {
          state: diningLightStore,
          onClick: () => {
            $diningLightStore = toggleBooleanDeviceState($diningLightStore)
          }
        }
      ]}
    />
    <Room
      {...createRoom({
        roomName: 'guest',
        rowStart: 2,
        columnStart: 1,
        rowSpan: 5,
        columnSpan: 4,
        lights: ['Light']
      })}
    />
    <Room
      id="bath-0"
      name="Bath"
      rowStart={2}
      columnStart={5}
      rowSpan={4}
      columnSpan={3}
      lights={[
        {
          state: bath0LightStore,
          onClick: () => {
            $bath0LightStore = toggleBooleanDeviceState($bath0LightStore)
          }
        },
        {
          state: bath0MirrorLightStore,
          onClick: () => {
            $bath0MirrorLightStore = toggleBooleanDeviceState($bath0MirrorLightStore)
          }
        }
      ]}
      heating={bath0HeatingStore}
      temperature={bath0TemperatureStore}
      setTemperature={bath0SetTemperatureStore}
    />
    <Room
      id="stairs-0"
      name="Stairs"
      rowStart={2}
      columnStart={8}
      rowSpan={5}
      columnSpan={2}
      lights={[
        {
          state: stairsLightStore,
          onClick: () => {
            $stairsLightStore = toggleBooleanDeviceState($stairsLightStore)
          }
        }
      ]}
    />
    <Room
      id="hall-0"
      name="Hall"
      rowStart={6}
      columnStart={5}
      rowSpan={1}
      columnSpan={3}
      lights={[
        {
          state: hall0LightStore,
          onClick: () => {
            $hall0LightStore = toggleBooleanDeviceState($hall0LightStore)
          }
        }
      ]}
    />
    <Room
      id="boiler"
      name="Boiler"
      rowStart={7}
      columnStart={1}
      rowSpan={3}
      columnSpan={5}
      lights={[
        {
          state: boilerLightStore,
          onClick: () => {
            $boilerLightStore = toggleBooleanDeviceState($boilerLightStore)
          }
        },
        {
          state: boilerWallLightStore,
          onClick: () => {
            $boilerWallLightStore = toggleBooleanDeviceState($boilerWallLightStore)
          }
        }
      ]}
      temperature={boilerTemperatureStore}
    />
    <Room
      id="store"
      name="Store"
      rowStart={7}
      columnStart={6}
      rowSpan={3}
      columnSpan={4}
      lights={[
        {
          state: storeLightStore,
          onClick: () => {
            $storeLightStore = toggleBooleanDeviceState($storeLightStore)
          }
        }
      ]}
      temperature={storeTemperatureStore}
    />
    <Room
      id="garage"
      name="Garage"
      rowStart={10}
      columnStart={1}
      rowSpan={9}
      columnSpan={9}
      lights={[
        {
          state: garageLight0Store,
          onClick: () => {
            $garageLight0Store = toggleBooleanDeviceState($garageLight0Store)
          }
        },
        {
          state: garageLight1Store,
          onClick: () => {
            $garageLight1Store = toggleBooleanDeviceState($garageLight1Store)
          }
        }
      ]}
      temperature={garageTemperatureStore}
      heating={garageHeatingStore}
      setTemperature={garageSetTemperatureStore}
    />
    <Room
      id="entrance"
      name="Entrance"
      rowStart={10}
      columnStart={10}
      rowSpan={4}
      columnSpan={3}
      lights={[
        {
          state: entranceLightStore,
          onClick: () => {
            $entranceLightStore = toggleBooleanDeviceState($entranceLightStore)
          }
        }
      ]}
      heating={entranceHeatingStore}
      temperature={entranceTemperatureStore}
      setTemperature={entranceSetTemperatureStore}
    />
    <Room
      id="kitchen"
      name="Kitchen"
      rowStart={10}
      columnStart={13}
      rowSpan={4}
      columnSpan={5}
      lights={[
        {
          state: kitchenLightStore,
          onClick: () => {
            $kitchenLightStore = toggleBooleanDeviceState($kitchenLightStore)
          }
        }
      ]}
    />
  </div>
  <!--div class="grid grid-cols-[repeat(17,2.25rem)] grid-rows-[repeat(19,2.25rem)] gap-1">
    <Room
      id="bedroom"
      name="Bedroom"
      rowStart={2}
      columnStart={1}
      rowSpan={8}
      columnSpan={7}
      lightFromTopic={[env.PUBLIC_BEDROOM_LIGHT_FROM, env.PUBLIC_BEDROOM_WINDOW_LIGHT_FROM]}
      lightToTopic={[env.PUBLIC_BEDROOM_LIGHT_TO, env.PUBLIC_BEDROOM_WINDOW_LIGHT_TO]}
      temperatureFromTopic={env.PUBLIC_BEDROOM_TEMP}
    />
    <Room
      id="stairs-1"
      name="Stairs"
      rowStart={2}
      columnStart={8}
      rowSpan={6}
      columnSpan={4}
      lightFromTopic={env.PUBLIC_STAIRS_LIGHT_FROM}
      lightToTopic={env.PUBLIC_STAIRS_LIGHT_TO}
    />
    <Room
      id="blanka"
      name="Blanka"
      rowStart={2}
      columnStart={12}
      rowSpan={6}
      columnSpan={6}
      lightFromTopic={[env.PUBLIC_BLANKA_LIGHT_FROM, env.PUBLIC_BLANKA_WALL_LIGHT_FROM]}
      lightToTopic={[env.PUBLIC_BLANKA_LIGHT_TO, env.PUBLIC_BLANKA_WALL_LIGHT_TO]}
      temperatureFromTopic={env.PUBLIC_BLANKA_TEMP}
    />
    <Room
      id="hall-1"
      name="Hall"
      rowStart={8}
      columnStart={8}
      rowSpan={2}
      columnSpan={5}
      lightFromTopic={env.PUBLIC_HALL_1_LIGHT_FROM}
      lightToTopic={env.PUBLIC_HALL_1_LIGHT_TO}
      temperatureFromTopic={env.PUBLIC_HALL_1_TEMP}
    />
    <Room
      id="leon"
      name="Leon"
      rowStart={8}
      columnStart={13}
      rowSpan={6}
      columnSpan={5}
      lightFromTopic={[env.PUBLIC_LEON_LIGHT_FROM, env.PUBLIC_LEON_WALL_LIGHT_FROM]}
      lightToTopic={[env.PUBLIC_LEON_LIGHT_TO, env.PUBLIC_LEON_WALL_LIGHT_TO]}
      temperatureFromTopic={env.PUBLIC_LEON_TEMP}
    />
    <Room
      id="wardrobe"
      name="Wardrobe"
      rowStart={10}
      columnStart={1}
      rowSpan={4}
      columnSpan={4}
      lightFromTopic={env.PUBLIC_WARDROBE_LIGHT_FROM}
      lightToTopic={env.PUBLIC_WARDROBE_LIGHT_TO}
      temperatureFromTopic={env.PUBLIC_WARDROBE_TEMP}
    />
    <Room
      id="laundry"
      name="Laundry"
      rowStart={10}
      columnStart={5}
      rowSpan={4}
      columnSpan={4}
      lightFromTopic={env.PUBLIC_LAUNDRY_LIGHT_FROM}
      lightToTopic={env.PUBLIC_LAUNDRY_LIGHT_TO}
      temperatureFromTopic={env.PUBLIC_LAUNDRY_TEMP}
    />
    <Room
      id="bath-1"
      name="Bath"
      rowStart={10}
      columnStart={9}
      rowSpan={4}
      columnSpan={4}
      lightFromTopic={[env.PUBLIC_BATH_1_LIGHT_FROM, env.PUBLIC_BATH_1_MIRROR_LIGHT_FROM]}
      lightToTopic={[env.PUBLIC_BATH_1_LIGHT_TO, env.PUBLIC_BATH_1_MIRROR_LIGHT_TO]}
      temperatureFromTopic={env.PUBLIC_BATH_1_TEMP}
      heatingValveFromTopic={env.PUBLIC_BATH_1_HEAT_VALVE}
    />
  </div-->
</div>
