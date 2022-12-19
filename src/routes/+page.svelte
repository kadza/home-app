<script>
  import { connect } from "mqtt";
	import Floor_0 from "./floor-0.svelte";
  import Floor_1 from "./floor-1.svelte";
  import { PUBLIC_MQTT_URL, PUBLIC_MQTT_USER, PUBLIC_MQTT_PASSWORD, PUBLIC_GUEST_LIGHT_FROM } from "$env/static/public";

  let client = connect(PUBLIC_MQTT_URL, {username: PUBLIC_MQTT_USER, password: PUBLIC_MQTT_PASSWORD});
  client.subscribe(PUBLIC_GUEST_LIGHT_FROM);
  client.on('message', function (topic, message) {
    console.log(`Topic: ${topic}, message: ${message.toString()}`)
  })
</script>

<style>
  .home {
  display: flex;
  }
</style>

<div class="home">
  <Floor_0 />
  <Floor_1 />
</div>