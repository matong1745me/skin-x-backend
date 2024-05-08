

## Installation

```bash
$ yarn install
```

## Running the app (Docker is required)

```bash
# development
$ docker compose up -d

```

## Seed data

```bash
# look at container id for post-skin-backend-app image
$ docker ps

# Exec into container 
$ docker exec -it <CONTAINER ID> sh

# run seed migrations in docker
$ npm run migration:run
```
