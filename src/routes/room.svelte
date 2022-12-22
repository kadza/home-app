<script>
  export let isLightOn = false;
  $: color = isLightOn ? "yellow" : "grey";
  export let roomClicked = () => {};
  export let columnStart = 0;
  export let rowStart = 0;
  export let columnSpan = 0;
  export let rowSpan = 0;
</script>

<style>
  .room {
    border: 1px;
    border-color: black;
    border-style: solid;
    border-radius: 3px;
  }
</style>

<div class="room" style="background-color: {color}; grid-area: {rowStart} / {columnStart} / span {rowSpan} / span {columnSpan}" on:click={roomClicked}></div>