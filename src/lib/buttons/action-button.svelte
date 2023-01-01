<script lang="ts">
  export let onClick = () => {}
  export let isActive = false
</script>

<button class="p-1.5 bg-cyan-700 rounded-full" on:click={onClick}>
  {#if isActive}
    <slot name="active" />
  {:else}
    <slot name="inactive" />
  {/if}
</button>
