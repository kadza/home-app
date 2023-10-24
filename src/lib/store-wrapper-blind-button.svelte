
<!-- 
    I have an array of blind stores and I had to add this wrapper component to make it work.
    Error: Stores must be declared at the top level of the component (this may change in a future version of Svelte) 
-->

<script lang="ts">
    import BlindsButton from './buttons/blinds-button.svelte'
    import type { Writable } from 'svelte/store'
    import type { NumberDeviceState, DeviceMetadata } from './device-state'
    
    export let state: Writable<NumberDeviceState>
    export let metadata: DeviceMetadata | undefined = undefined
    export let onClick: () => void
</script>


<BlindsButton state={$state} {onClick} {metadata}/>