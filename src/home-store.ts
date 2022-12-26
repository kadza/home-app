import { PUBLIC_EXTERNAL_TEMP, PUBLIC_GUEST_LIGHT_FROM, PUBLIC_GUEST_LIGHT_TO, PUBLIC_MQTT_PASSWORD, PUBLIC_MQTT_URL, PUBLIC_MQTT_USER } from "$env/static/public";
import { connect } from "mqtt";
import { writable } from "svelte/store";

export const isGuestLightOn = writable(false);
export const temperature = writable(0);

let client = connect(PUBLIC_MQTT_URL, {username: PUBLIC_MQTT_USER, password: PUBLIC_MQTT_PASSWORD});

client.on('connect', function () {
  client.subscribe(PUBLIC_GUEST_LIGHT_FROM);
  client.subscribe(PUBLIC_EXTERNAL_TEMP);
})

client.on('message', function (topic, message) {
  console.log(`${topic} ${message.toString()}`)

  switch (topic) {
    case PUBLIC_GUEST_LIGHT_FROM:
      isGuestLightOn.set(message.toString() === "1");
      break;
    case PUBLIC_EXTERNAL_TEMP:
      temperature.set(parseFloat(message.toString()));
      break;
  }
})

isGuestLightOn.subscribe((value) => {
  client.publish(PUBLIC_GUEST_LIGHT_TO, value ? "1" : "0");
});

