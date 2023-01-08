<script lang="ts" context="module">
  import { PUBLIC_MQTT_PASSWORD, PUBLIC_MQTT_URL, PUBLIC_MQTT_USER } from '$env/static/public'
  import { connect, MqttClient } from 'mqtt'
  import { browser } from '$app/environment'

  export let client: MqttClient

  if (browser) {
    client = connect(PUBLIC_MQTT_URL, {
      username: PUBLIC_MQTT_USER,
      password: PUBLIC_MQTT_PASSWORD
    })
  }
</script>
