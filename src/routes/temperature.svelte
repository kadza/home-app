<script lang="ts">
  import Thermometer from 'svelte-material-icons/Thermometer.svelte'

  export let temperature: number | undefined
  export let setTemperature: number | undefined = undefined
</script>

<div class="flex items-center">
  <Thermometer />
  <span
    >{temperature ? `${temperature} °C` : 'N/A °C'}{setTemperature ? ` / ${setTemperature} °C` : ''}
  </span>
</div>
