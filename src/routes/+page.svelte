<script lang {ts}>
  import Room from '../lib/room-container.svelte'
  import { PUBLIC_EXTERNAL_TEMP, PUBLIC_GUEST_LIGHT_FROM, PUBLIC_GUEST_LIGHT_TO } from '$env/static/public'
</script>

<div class="flex flex-col items-center xl:flex-row xl:space-x-4 xl:justify-center">
  <div class="grid grid-cols-[repeat(17,2.25rem)] grid-rows-[repeat(19,2.25rem)] gap-1">
    <Room id="bay" name="Bay" rowStart={1} columnStart={11} rowSpan={1} columnSpan={6} />
    <Room id="living" name="Living" rowStart={2} columnStart={10} rowSpan={8} columnSpan={8} />
    <Room
      id="guest"
      name="Guest"
      rowStart={2}
      columnStart={1}
      rowSpan={5}
      columnSpan={4}
      lightFromTopic={PUBLIC_GUEST_LIGHT_FROM}
      lightToTopic={PUBLIC_GUEST_LIGHT_TO}
    />
    <Room id="bath-0" name="Bath" rowStart={2} columnStart={5} rowSpan={4} columnSpan={3} />
    <Room id="stairs-0" name="Stairs" rowStart={2} columnStart={8} rowSpan={5} columnSpan={2} />
    <Room id="hall-0" name="Hall" rowStart={6} columnStart={5} rowSpan={1} columnSpan={3} />
    <Room id="boiler" name="Boiler" rowStart={7} columnStart={1} rowSpan={3} columnSpan={5} />
    <Room id="store" name="Store" rowStart={7} columnStart={6} rowSpan={3} columnSpan={4} />
    <Room
      id="garage"
      name="Garage"
      rowStart={10}
      columnStart={1}
      rowSpan={9}
      columnSpan={9}
      temperatureFromTopic={PUBLIC_EXTERNAL_TEMP}
    />
    <Room id="entrance" name="Entrance" rowStart={10} columnStart={10} rowSpan={4} columnSpan={3} />
    <Room id="kitchen" name="Kitchen" rowStart={10} columnStart={13} rowSpan={4} columnSpan={5} />
  </div>
  <div class="grid grid-cols-[repeat(17,2.25rem)] grid-rows-[repeat(19,2.25rem)] gap-1">
    <Room id="bedroom" name="Bedroom" rowStart={2} columnStart={1} rowSpan={8} columnSpan={7} />
    <Room id="stairs-1" name="Stairs" rowStart={2} columnStart={8} rowSpan={6} columnSpan={4} />
    <Room id="blanka" name="Blanka" rowStart={2} columnStart={12} rowSpan={6} columnSpan={6} />
    <Room id="hall-1" name="Hall" rowStart={8} columnStart={8} rowSpan={2} columnSpan={5} />
    <Room id="leon" name="Leon" rowStart={8} columnStart={13} rowSpan={6} columnSpan={5} />
    <Room id="wardrobe" name="Wardrobe" rowStart={10} columnStart={1} rowSpan={4} columnSpan={4} />
    <Room id="laundry" name="Laundry" rowStart={10} columnStart={5} rowSpan={4} columnSpan={4} />
    <Room id="bath-1" name="Bath" rowStart={10} columnStart={9} rowSpan={4} columnSpan={4} />
  </div>
</div>
