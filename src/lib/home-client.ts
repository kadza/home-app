import {
  PUBLIC_MQTT_PASSWORD,
  PUBLIC_MQTT_URL,
  PUBLIC_MQTT_USER
} from '$env/static/public'
import { connect } from 'mqtt'

export let client = connect(PUBLIC_MQTT_URL, {
  username: PUBLIC_MQTT_USER,
  password: PUBLIC_MQTT_PASSWORD
})


