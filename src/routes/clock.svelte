<script>
  import clockStore from '../clock-store'
  import Clock from 'svelte-material-icons/Clock.svelte'

  const clock = clockStore()
</script>

<style>
  .clock {
    color: #fff;
    font-weight: 400;
    display: flex;
    align-items: center;
  }
  .label {
    margin-left: 0.25rem;
  }
</style>

<div class="clock">
  <Clock color={'white'} />
  <span class="label">
    {$clock.getHours().toString().padStart(2, '0')} : {$clock
      .getMinutes()
      .toString()
      .padStart(2, '0')} : {$clock.getSeconds().toString().padStart(2, '0')}
  </span>
</div>
