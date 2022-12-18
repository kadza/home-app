<style>
.floor-0 {
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

.wykusz {
  grid-column-start: 2;
  grid-column-end: 9;
  grid-row-start: 1;
  grid-row-end: 2;
  background-color:#661766 ;
}

.salon {
  grid-column-start: 1;
  grid-column-end: 9;
  grid-row-start: 2;
  grid-row-end: 10;
  background-color:#e322c3;
}

.kuchnia {
  grid-column-start: 1;
  grid-column-end: 6;
  grid-row-start: 10;
  grid-row-end: 14;
  background-color:#a36298;
}

.przedpokoj {
  grid-column-start: 6;
  grid-column-end: 9;
  grid-row-start: 10;
  grid-row-end: 14;
  background-color:#e099a7;
}

.garaz {
  grid-column-start: 9;
  grid-column-end: 18;
  grid-row-start: 10;
  grid-row-end: 19;
  background-color:#7988c9
}


.hol {
  grid-column-start: 11;
  grid-column-end: 14;
  grid-row-start: 6;
  grid-row-end: 7;
  background-color:#b3bff2
}


.schody {
  grid-column-start: 9;
  grid-column-end: 11;
  grid-row-start: 2;
  grid-row-end: 7;
  background-color:#2646d1
}


.goscinny {
  grid-column-start: 14;
  grid-column-end: 18;
  grid-row-start: 2;
  grid-row-end: 7;
  background-color:#26afd1
}


.kotlownia {
  grid-column-start: 13;
  grid-column-end: 18;
  grid-row-start: 7;
  grid-row-end: 10;
  background-color:#0c5061
}


.spizarnia {
  grid-column-start: 9;
  grid-column-end: 13;
  grid-row-start: 7;
  grid-row-end: 10;
  background-color:#4ecded
}

.lazienka {
  grid-column-start: 11;
  grid-column-end: 14;
  grid-row-start: 2;
  grid-row-end: 6;
  background-color:#190c5e
}

</style>

<div class="floor-0">
  <div class="wykusz room"></div>
  <div class="salon room"></div>
  <div class="kuchnia room"></div>
  <div class="przedpokoj room"></div>
  <div class="garaz room"></div>
  <div class="hol room"></div>
  <div class="lazienka room"></div>
  <div class="schody room"></div>
  <div class="goscinny room"></div>
  <div class="spizarnia room"></div>
  <div class="kotlownia room"></div>
</div>