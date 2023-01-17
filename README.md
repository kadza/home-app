## Prerequisites:

- Node.js 18.13.0
  - install via nvm
    - https://github.com/nvm-sh/nvm
    - `curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.3/install.sh | bash`
    - `nvm install 18.13.0`
- pnpm
  - https://pnpm.io/installation
  - `npm install -g pnpm`
- Copy .env.example to .env and configure

## Useful commands

- Run dev `pnpm run dev`
- Build and deploy Docker image `./deploy [TAG]`
- Run Docker container `docker compose up -d home-app`

## Notes

### SvelteKit

.svelte-kit/ambient.d.ts contains ts defs of env vars. NOTE!!! dynamic vars should be imported differently than static ones.
See comments in the file for more info.

### Github actions

https://github.com/docker/build-push-action
https://github.com/docker/login-action

### Misc

Mosquitto MQTT broker configuration location /etc/mosquitto/mosquitto.conf
