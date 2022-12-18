<style>
  .floor-1 {
    display: grid;
    grid-template-columns: repeat(18, 2fr);
    grid-template-rows: repeat(19, 2fr);
    height: calc(100vh - 50px);
    aspect-ratio: 1/1;
    row-gap: 0.25rem;
    column-gap: 0.25rem;
  }

  .room {
    border: 1px;
    border-color: black;
    border-style: solid;
    border-radius: 3px;
  }

  .blanka {
    grid-column-start: 1;
    grid-column-end: 7;
    grid-row-start: 2;
    grid-row-end: 8;
    background-color: #eb4034;

  }

  .leon {
    grid-column-start: 1;
    grid-column-end: 6;
    grid-row-start: 8;
    grid-row-end: 14;
    background-color: #eb8334;
  }

  .lazienka-1 {
    grid-column-start: 6;
    grid-column-end: 10;
    grid-row-start: 10;
    grid-row-end: 14;
    background-color: #ebe534;
  }

  .pralnia {
    grid-column-start: 10;
    grid-column-end: 14;
    grid-row-start: 10;
    grid-row-end: 14;
    background-color: #3deb34;
  }

  .garderoba {
    grid-column-start: 14;
    grid-column-end: 18;
    grid-row-start: 10;
    grid-row-end: 14;
    background-color: #34baeb;
  }

  .hol-1 {
    grid-column-start: 6;
    grid-column-end: 18;
    grid-row-start: 8;
    grid-row-end: 10;
    background-color: #5934eb;
  }

  .schody-1 {
    grid-column-start: 7;
    grid-column-end: 11;
    grid-row-start: 2;
    grid-row-end: 8;
    background-color: #8934eb;
  }

  .sypialnia {
    grid-column-start: 11;
    grid-column-end: 18;
    grid-row-start: 2;
    grid-row-end: 8;
    background-color: #eb34ba;
  }
  </style>

  <div class="floor-1">
    <div class="blanka room"></div>
    <div class="leon room"></div>
    <div class="lazienka-1 room"></div>
    <div class="pralnia room"></div>
    <div class="garderoba room"></div>
    <div class="hol-1 room"></div>
    <div class="schody-1 room"></div>
    <div class="sypialnia room"></div>
  </div>