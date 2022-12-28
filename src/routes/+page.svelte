<script>
  import Header from './header.svelte'
  import Room from './room.svelte'
  import { isGuestLightOn } from '../home-store'

  const toggleGuestLight = () => {
    isGuestLightOn.update((n) => !n)
  }
</script>

<style>
  .floor {
    display: grid;
    grid-template-columns: repeat(17, 2fr);
    grid-template-rows: repeat(19, 2fr);
    height: calc(100vh - 100px);
    aspect-ratio: 1/1;
    row-gap: 0.25rem;
    column-gap: 0.25rem;
  }
</style>

<div class="space-y-4 space-x-4">
  <Header />
  <div class="flex flex-row space-x-4">
    <div class="floor">
      <Room id="bay" name="Bay" rowStart={1} columnStart={11} rowSpan={1} columnSpan={6} />
      <Room id="living" name="Living" rowStart={2} columnStart={10} rowSpan={8} columnSpan={8} />
      <Room
        id="guest"
        name="Guest"
        rowStart={2}
        columnStart={1}
        rowSpan={5}
        columnSpan={4}
        roomClicked={toggleGuestLight}
        isLightOn={$isGuestLightOn}
      />
      <Room id="bath-0" name="Bath" rowStart={2} columnStart={5} rowSpan={4} columnSpan={3} />
      <Room id="stairs-0" name="Stairs" rowStart={2} columnStart={8} rowSpan={5} columnSpan={2} />
      <Room id="hall-0" name="Hall" rowStart={6} columnStart={5} rowSpan={1} columnSpan={3} />
      <Room id="boiler" name="Boiler" rowStart={7} columnStart={1} rowSpan={3} columnSpan={5} />
      <Room id="store" name="Store" rowStart={7} columnStart={6} rowSpan={3} columnSpan={4} />
      <Room id="garage" name="Garage" rowStart={10} columnStart={1} rowSpan={9} columnSpan={9} />
      <Room
        id="entrance"
        name="Entrance"
        rowStart={10}
        columnStart={10}
        rowSpan={4}
        columnSpan={3}
      />
      <Room id="kitchen" name="Kitchen" rowStart={10} columnStart={13} rowSpan={4} columnSpan={5} />
    </div>
    <div class="floor">
      <Room id="bedroom" name="Bedroom" rowStart={2} columnStart={1} rowSpan={8} columnSpan={7} />
      <Room id="stairs-1" name="Stairs" rowStart={2} columnStart={8} rowSpan={6} columnSpan={4} />
      <Room id="blanka" name="Blanka" rowStart={2} columnStart={12} rowSpan={6} columnSpan={6} />
      <Room id="hall-1" name="Hall" rowStart={8} columnStart={8} rowSpan={2} columnSpan={5} />
      <Room id="leon" name="Leon" rowStart={8} columnStart={13} rowSpan={6} columnSpan={5} />
      <Room
        id="wardrobe"
        name="Wardrobe"
        rowStart={10}
        columnStart={1}
        rowSpan={4}
        columnSpan={4}
      />
      <Room id="laundry" name="Laundry" rowStart={10} columnStart={5} rowSpan={4} columnSpan={4} />
      <Room id="bath-1" name="Bath" rowStart={10} columnStart={9} rowSpan={4} columnSpan={4} />
    </div>
  </div>
</div>
