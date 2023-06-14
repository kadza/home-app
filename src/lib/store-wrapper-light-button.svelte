
<!-- 
    I have an array of light stores and I had to add this wrapper component to make it work.
    Error: Stores must be declared at the top level of the component (this may change in a future version of Svelte) 
-->

<script lang="ts">
    import LightButton from './buttons/light-button.svelte'
    import type { Writable } from 'svelte/store'
    import type { BooleanDeviceState, DeviceMetadata } from './device-state'
    
    export let state: Writable<BooleanDeviceState>
    export let metadata: DeviceMetadata | undefined = undefined
    export let onClick: () => void
</script>


<LightButton state={$state} {onClick} {metadata}/>