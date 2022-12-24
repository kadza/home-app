<script>
	import Room from "./room.svelte";
  import {isGuestLightOn} from "../home-store";

  const toggleGuestLight = () =>  {
    isGuestLightOn.update(n => !n);
  }
</script>

<style>
  .home {
  display: flex;
  }
  .floor {
    display: grid;
    grid-template-columns: repeat(18, 2fr);
    grid-template-rows: repeat(19, 2fr);
    height: calc(100vh - 50px);
    aspect-ratio: 1/1;
    row-gap: 0.25rem;
    column-gap: 0.25rem;
  }
</style>

<div class="home">
  <div class="floor">
    <Room id="bay" rowStart={1} columnStart={11} rowSpan={1} columnSpan={6} />
    <Room id="living" rowStart={2} columnStart={10} rowSpan={8} columnSpan={8} />
    <Room id="guest" rowStart={2} columnStart={1} rowSpan={5} columnSpan={4} roomClicked={toggleGuestLight} isLightOn={$isGuestLightOn}/>
    <Room id="bath-0" rowStart={2} columnStart={5} rowSpan={4} columnSpan={3} />
    <Room id="stairs-0" rowStart={2} columnStart={8} rowSpan={5} columnSpan={2} />
    <Room id="hall-0" rowStart={6} columnStart={5} rowSpan={1} columnSpan={3} />
    <Room id="boiler" rowStart={7} columnStart={1} rowSpan={3} columnSpan={5} />
    <Room id="store" rowStart={7} columnStart={6} rowSpan={3} columnSpan={4} />
    <Room id="garage" rowStart={10} columnStart={1} rowSpan={9} columnSpan={9} />
    <Room id="entrance" rowStart={10} columnStart={10} rowSpan={4} columnSpan={3} />
    <Room id="kitchen" rowStart={10} columnStart={13} rowSpan={4} columnSpan={5} />
  </div>
  <div class="floor">
    <Room id="bedroom" rowStart={2} columnStart={1} rowSpan={8} columnSpan={7} />
    <Room id="stairs-1" rowStart={2} columnStart={8} rowSpan={6} columnSpan={4} />
    <Room id="blanka" rowStart={2} columnStart={12} rowSpan={6} columnSpan={6} />
    <Room id="hall-1" rowStart={8} columnStart={8} rowSpan={2} columnSpan={5} />
    <Room id="blanka" rowStart={8} columnStart={13} rowSpan={6} columnSpan={5} />
    <Room id="wardrobe" rowStart={10} columnStart={1} rowSpan={4} columnSpan={4} />
    <Room id="laundry" rowStart={10} columnStart={5} rowSpan={4} columnSpan={4} />
    <Room id="bath-1" rowStart={10} columnStart={9} rowSpan={4} columnSpan={4} />
  </div>
</div>