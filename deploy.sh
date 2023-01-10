#!/bin/bash

TAG="${1:-latest}"

docker buildx build --build-arg NPM_TOKEN=${NPM_TOKEN} --network=host -t kadzaa/home-app:${TAG} --platform linux/amd64,linux/arm64/v8 --push .