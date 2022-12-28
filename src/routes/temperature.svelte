<script>
  import { temperature } from '../home-store'
  import Thermometer from 'svelte-material-icons/Thermometer.svelte'
</script>

<div class="flex items-center">
  <Thermometer />
  <span>{$temperature} °C</span>
</div>
