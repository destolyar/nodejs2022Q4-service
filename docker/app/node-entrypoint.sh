#!/usr/bin/env sh
set -e

echo "Start entrypoint.sh. Installing packages..."

npm install;

echo "Running NestJS app...";

npm run start:prod