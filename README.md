## COLIDIALI

## A Web app to find transporters around the world

This repo contains two folders, a client and a server
Installation

VANGO FINDER requires Node.js v10+ to run.

# 1. Steps to run the application locally

- Install the dependencies and dev Dependencies

```sh
cd colidiali
npm i --legacy-peer-deps --prefix client
npm i --prefix server
```

- Editing env variables for dev mode : inside the .env file in the client folder, make sure that :

```sh
REACT_APP_HOST_API_KEY=http://localhost:1337
```

    Laucnh the app : 3.1 Locally inside colidiali folder run :

```sh
npm start --prefix client
npm start --prefix server
```

Then a brower will be displayed showing the home page.

# 2 Using Docker containers inside vango-finder folder build the docker images using the following commands :

```sh
cd vango-finder/client
docker build -f Dockerfile.frontend .
```

```sh
cd ../vango-finder/server
docker build -f Dockerfile.backend .
```

then in the root directory run :

```sh
docker-compose up --build
```
