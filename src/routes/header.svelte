<script>
  import Clock from './clock.svelte'
  import Temp from './temp.svelte'
</script>

<style>
  .header {
    display: flex;
    justify-content: flex-end;
    border: 1px;
    border-radius: 2px;
    box-shadow: 0 1px 5px rgba(0, 0, 0, 0.1);
    background-color: rgba(0, 0, 0, 0.3);
    padding: 0.5rem;
  }
  .header-element {
    background: rgba(255, 255, 255, 0.1);
    line-height: 100%;
    padding: 0.5rem 0.5rem;
    font-size: 1rem;
    margin-left: 1rem;
    border-radius: 2px;
  }
</style>

<div class="header">
  <div class="header-element">
    <Temp />
  </div>
  <div class="header-element">
    <Clock />
  </div>
</div>
