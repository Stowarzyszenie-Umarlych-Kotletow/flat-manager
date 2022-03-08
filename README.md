# Flat manager

### Overview

React Native mobile-first application to manage flat users, their tasks and transactions.
The application has a monolithic architecture with additional [OCR receipt parser](https://gitlab.ziemniak.cloud/pis-group/flat-manager-ocr).


![Architecture](https://i.imgur.com/lAzU98O.png)

### Getting started

#### Requirements
All apps are containerized, therefore you need to setup `docker` and `docker-compose` for convenience.

The Spring backend uses JDK11, which can be obtained from AdoptOpenJDK.

The React Native frontend uses Node.js v17; you also need to globally install `expo`:
```shell
$ npm install -g expo
```

#### Backend
To start the backend, you first need to prepare your `.env` file. You can simply copy the `.env.template` to get started.

Proceed by obtaining the images for `ocr-service` (available as `nexus.ziemniak.cloud:8090/flatmanager/ocr`) and building the Spring backend:
```shell
$ ./mvnw spring-boot:build-image
```

You may need to re-tag some images depending on your repository prefix in `.env`, eg.:
```shell
$ docker tag nexus.ziemniak.cloud:8090/flatmanager/ocr flatmanager/ocr
```

Next, start the app using `docker-compose`:
```shell
$ docker-compose up --build -d
```

#### Frontend
First, you need to install all dependencies:
```shell
$ npm install
```
In order to run frontend in the browser, simply run:
```shell
$ expo start --web
```

If you wish to deploy your app, make sure to adjust your configuration in `src/config/index.ts`.

