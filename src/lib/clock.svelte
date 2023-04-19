<script>
  import clockStore from './clock-store'
  import Clock from 'svelte-material-icons/Clock.svelte'

  const clock = clockStore()
</script>

<div class="flex items-center space-x-1">
  <Clock />
  <span class="text-xs">
    {$clock.getHours().toString().padStart(2, '0')} : {$clock
      .getMinutes()
      .toString()
      .padStart(2, '0')} : {$clock.getSeconds().toString().padStart(2, '0')}
  </span>
</div>
