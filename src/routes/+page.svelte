<script lang="ts">
  import Room from '$lib/room.svelte'
  import { init } from '../home-client'

  const displayConfigs = [
    {
      id: 'living',
      displayName: 'Living',
      rowStart: 2,
      columnStart: 10,
      rowSpan: 5,
      columnSpan: 8
    },
    {
      id: 'livingGarden',
      displayName: 'Garden',
      rowStart: 1,
      columnStart: 11,
      rowSpan: 1,
      columnSpan: 6
    },
    {
      id: 'dining',
      displayName: 'Dining',
      rowStart: 7,
      columnStart: 10,
      rowSpan: 3,
      columnSpan: 8
    },
    {
      id: 'guest',
      displayName: 'Guest',
      rowStart: 2,
      columnStart: 1,
      rowSpan: 5,
      columnSpan: 4
    },
    {
      id: 'kitchen',
      displayName: 'Kitchen',
      rowStart: 10,
      columnStart: 13,
      rowSpan: 4,
      columnSpan: 5
    },
    {
      id: 'bath0',
      displayName: 'Bath',
      rowStart: 2,
      columnStart: 5,
      rowSpan: 4,
      columnSpan: 3
    },
    {
      id: 'stairs',
      displayName: 'Stairs',
      rowStart: 2,
      columnStart: 8,
      rowSpan: 5,
      columnSpan: 2
    },
    {
      id: 'hall0',
      displayName: 'Hall',
      rowStart: 6,
      columnStart: 5,
      rowSpan: 1,
      columnSpan: 3
    },
    {
      id: 'entrance',
      displayName: 'Entrance',
      rowStart: 10,
      columnStart: 10,
      rowSpan: 4,
      columnSpan: 3
    },
    {
      id: 'store',
      displayName: 'Store',
      rowStart: 7,
      columnStart: 6,
      rowSpan: 3,
      columnSpan: 4
    },
    { 
      id: 'boiler',
      displayName: 'Boiler',
      rowStart: 7,
      columnStart: 1,
      rowSpan: 3,
      columnSpan: 5
    },
    {
      id: 'garage',
      displayName: 'Garage',
      rowStart: 10,
      columnStart: 1,
      rowSpan: 9,
      columnSpan: 9
    }
  ]

  init()
</script>

<div class="flex flex-col items-center xl:flex-row xl:space-x-4 xl:justify-center">
  <div class="grid grid-cols-[repeat(17,2.5rem)] grid-rows-[repeat(19,2.5rem)] gap-1">
    {#each displayConfigs as { id, displayName, rowStart, columnStart, rowSpan, columnSpan }}
      <Room
        {id}
        {displayName}
        {rowStart}
        {columnStart}
        {rowSpan}
        {columnSpan}
      />
    {/each}
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
