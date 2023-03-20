import { env } from '$env/dynamic/public'
import { connect, MqttClient } from 'mqtt'
import { browser } from '$app/environment'

export let client: MqttClient

if (browser) {
  client = connect(env.PUBLIC_MQTT_URL, {
    username: env.PUBLIC_MQTT_USER,
    password: env.PUBLIC_MQTT_PASSWORD
  })
}
