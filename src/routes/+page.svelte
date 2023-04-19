<script lang {ts}>
  import Room from '$lib/room.svelte'
  import {
    bath0HeatingStore,
    bath0LightStore,
    bath0MirrorLightStore,
    bath0SetTemperatureStore,
    bath0TemperatureStore,
    boilerLightStore,
    boilerTemperatureStore,
    boilerWallLightStore,
    diningLightStore,
    entranceHeatingStore,
    entranceLightStore,
    entranceSetTemperatureStore,
    entranceTemperatureStore,
    garageHeatingStore,
    garageLight0Store,
    garageLight1Store,
    garageSetTemperatureStore,
    garageTemperatureStore,
    guestHeatingStore,
    guestLightStore,
    guestSetTemperatureStore,
    guestTemperatureStore,
    hall0LightStore,
    kitchenLightStore,
    livingEntranceLightStore,
    livingGardenLightStore,
    livingHeatingStore,
    livingLightStore,
    livingSetTemperatureStore,
    livingTemperatureStore,
    stairsLightStore,
    storeLightStore,
    storeTemperatureStore
  } from '../house-stores-repository'
  import { toggleBooleanDeviceState } from '$lib/device-state'
  import { init } from '../home-client'

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
          state: $livingGardenLightStore,
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
          state: $livingLightStore,
          onClick: () => {
            $livingLightStore = toggleBooleanDeviceState($livingLightStore)
          }
        },
        {
          state: $livingGardenLightStore,
          onClick: () => {
            $livingGardenLightStore = toggleBooleanDeviceState($livingGardenLightStore)
          }
        },
        {
          state: $livingEntranceLightStore,
          onClick: () => {
            $livingEntranceLightStore = toggleBooleanDeviceState($livingEntranceLightStore)
          }
        }
      ]}
      heating={$livingHeatingStore}
      temperature={$livingTemperatureStore}
      setTemperature={$livingSetTemperatureStore}
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
          state: $diningLightStore,
          onClick: () => {
            $diningLightStore = toggleBooleanDeviceState($diningLightStore)
          }
        }
      ]}
    />
    <Room
      id="guest"
      name="Guest"
      rowStart={2}
      columnStart={1}
      rowSpan={5}
      columnSpan={4}
      lights={[
        {
          state: $guestLightStore,
          onClick: () => {
            $guestLightStore = toggleBooleanDeviceState($guestLightStore)
          }
        }
      ]}
      heating={$guestHeatingStore}
      temperature={$guestTemperatureStore}
      setTemperature={$guestSetTemperatureStore}
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
          state: $bath0LightStore,
          onClick: () => {
            $bath0LightStore = toggleBooleanDeviceState($bath0LightStore)
          }
        },
        {
          state: $bath0MirrorLightStore,
          onClick: () => {
            $bath0MirrorLightStore = toggleBooleanDeviceState($bath0MirrorLightStore)
          }
        }
      ]}
      heating={$bath0HeatingStore}
      temperature={$bath0TemperatureStore}
      setTemperature={$bath0SetTemperatureStore}
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
          state: $stairsLightStore,
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
          state: $hall0LightStore,
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
          state: $boilerLightStore,
          onClick: () => {
            $boilerLightStore = toggleBooleanDeviceState($boilerLightStore)
          }
        },
        {
          state: $boilerWallLightStore,
          onClick: () => {
            $boilerWallLightStore = toggleBooleanDeviceState($boilerWallLightStore)
          }
        }
      ]}
      temperature={$boilerTemperatureStore}
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
          state: $storeLightStore,
          onClick: () => {
            $storeLightStore = toggleBooleanDeviceState($storeLightStore)
          }
        }
      ]}
      temperature={$storeTemperatureStore}
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
          state: $garageLight0Store,
          onClick: () => {
            $garageLight0Store = toggleBooleanDeviceState($garageLight0Store)
          }
        },
        {
          state: $garageLight1Store,
          onClick: () => {
            $garageLight1Store = toggleBooleanDeviceState($garageLight1Store)
          }
        }
      ]}
      temperature={$garageTemperatureStore}
      heating={$garageHeatingStore}
      setTemperature={$garageSetTemperatureStore}
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
          state: $entranceLightStore,
          onClick: () => {
            $entranceLightStore = toggleBooleanDeviceState($entranceLightStore)
          }
        }
      ]}
      heating={$entranceHeatingStore}
      temperature={$entranceTemperatureStore}
      setTemperature={$entranceSetTemperatureStore}
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
          state: $kitchenLightStore,
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
