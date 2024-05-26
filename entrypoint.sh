#!/bin/sh

# Wait for the database to be ready
until pg_isready -h db -p 5432 -U app; do
  echo "Waiting for database..."
  sleep 2
done

npx prisma migrate dev --name init

yarn dev

# Start the application
exec "$@"
