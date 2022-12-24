<script>
  export let isLightOn = false;
  $: color = isLightOn ? "#ffcc00" : "#d6d6c2";
  export let roomClicked = () => {};
  export let columnStart = 0;
  export let rowStart = 0;
  export let columnSpan = 0;
  export let rowSpan = 0;
  export let id = "";
</script>

<style>
  .room {
    border: 1px;
    border-color: #d6d6c2;
    border-style: solid;
    border-radius: 3px;
  }
</style>

<div {id} class="room" style="background-color: {color}; grid-area: {rowStart} / {columnStart} / span {rowSpan} / span {columnSpan}" on:click={roomClicked}>
</div>