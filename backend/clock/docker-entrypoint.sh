#!/bin/bash

set -e

echo "Running database migrations"
yarn migrate

echo "Seeding database"
yarn seed

# echo "Running Unit Tests"
# yarn test

echo "Starting server"
yarn start