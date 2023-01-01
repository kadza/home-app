<script lang="ts">
    import ActionButton from "./action-button.svelte"
    import LightBulb from "svelte-material-icons/Lightbulb.svelte"
    import LightBulbOff from "svelte-material-icons/LightbulbOff.svelte"

    export let onClick = () => {}
    export let isLightOn = false
</script>

<ActionButton onClick={onClick} isActive={isLightOn}>
    <LightBulb slot="active" />
    <LightBulbOff slot="inactive" color={'grey'} />
</ActionButton>