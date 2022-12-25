<script>
  import clockStore from '../clock-store';
  const clock = clockStore();
</script>

<style>
    .header {
      display: flex;
      justify-content: flex-end;
    border: 1px;
    border-radius: 2px;
    box-shadow: 0 1px 5px rgba(0,0,0,.1);
    background-color: rgba(0,0,0,.3);
    padding: .5rem;
  }
  .clock{
    background: rgba(255,255,255,.1);
    line-height: 100%;
    padding: .5rem .5rem;
    font-size: 1rem;
    margin-left: 1rem;
    border-radius: 2px;
    color: #fff;
    font-weight: 400;
  }
</style>

<div class="header">
  <div class="clock">
    {
      $clock.getHours().toString().padStart(2, '0')
    } : {
      $clock.getMinutes().toString().padStart(2, '0')
    } : {
      $clock.getSeconds().toString().padStart(2, '0')
    }
  </div>
</div>