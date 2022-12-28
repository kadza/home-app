<script>
  import Clock from './clock.svelte'
  import Temp from './temperature.svelte'
</script>

<div class="flex flex-row-reverse gap-2 bg-gray-800/40 px-2 py-2 shadow">
  <div class="bg-white/10 px-2 py-1">
    <Clock />
  </div>
  <div class="bg-white/10 px-2 py-1">
    <Temp />
  </div>
</div>
