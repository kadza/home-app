<script>
  import Clock from './clock.svelte'
  import Temperature from './temperature.svelte'
  import { temperature } from '../home-store';
</script>

<div class="flex flex-row-reverse gap-2 bg-gray-800/40 px-2 py-2 shadow mb-4">
  <div class="bg-white/10 px-2 py-1">
    <Clock />
  </div>
  <div class="bg-white/10 px-2 py-1">
    <Temperature temperature={$temperature}/>
  </div>
</div>
