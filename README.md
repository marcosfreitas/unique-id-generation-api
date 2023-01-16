<br>
<p align="center">
<img src="https://nestjs.com/img/logo_text.svg" width="80">
</p>

<p align="center">Project built with NestJS Framework.</p>

## Description
This project implements an API to generates and store unique human-readable IDs. These are the features:
- [x] Readable Codes creation for a given Transaction ID;
- [x] Retrieving the Readable Code for a Transaction ID;

🔗 At the [Notes.md](./Notes.md) file there are more details about these features.

## Environment variables

Create a file `.env` file at the project's root and define these environment variables before start this project


```diff
+ APP_NAME=UNIQUE-ID-GENERATION-API <- this will be the name of the database

NODE_ENV=dev
APP_VERSION=1.0.0
APP_PORT=22200
APP_DEBUGGER_PORT=22300

+ DB_DRIVER=mysql  <- don't need to change
+ DB_HOST=database <- don't need to change
DB_ROOT_PASSWORD=banana pijama
DB_USER=docker
DB_PASSWORD=banana pijama

+ CODE_LENGTH = 7 <- readable code length
```

## Deps Installation

The project is using yarn to manage the dependencies.

```bash
$ yarn install
```

### Running with Docker Compose
```bash
# there is a docker-compose.dev.yml for development purposes only
$ docker-compose -f docker-compose.dev.yml up

# for prune purposes this command will clean all related contained, image and volume for this project only
$ docker-compose -f docker-compose.dev.yml down -v --rmi all
```

### Initial Setup

We need to run our migrations before. From inside the running nodejs container, run the command bellow:

```bash
# creates the database and run the migrations
$ yarn db:create
```

You may want to access the database. Do this with the credentials provided at the `.env` file.

Use `localhost:3306` as the host to access the docker container externally.

## Testing

The project have End-To-End tests implemented that checks all the features workflow as a consumer client would do.

You should run the command bellow inside the running nodejs container.

```bash
# e2e tests
$ yarn test:e2e

# unit tests
$ yarn test
```

#### Available Endpoints

[Here is a Postman collection](https://www.postman.com/speeding-eclipse-658927/workspace/unique-id-generation-api/request/8697812-ab95aaae-f57c-4d95-8457-2b9c20612172) that can help you to consume the available REST endpoints:

**Use http://localhost:22200 as host**

- [x] `(POST) /v1/readable-codes`
- [x] `(GET) /v1/readable-codes`


## Technical Details


**DDD** has been implemented. Adopting modules and each of them had the  `Application` and `Domain` layers. Also, a `Shared` layer is available with resources that can be used for each layer.

Inside the domain exists a  **Command** layer that process the bussiness logic implementation.

Also, there is a **Repository** layer provided by TypeORM that works with our the domain entity ReadableCode, to manage the database operations easily.

Endpoint data **validations** are made automatically by applied **DTO classes** to the controller's methods's signatures, preventing unwanted / invalid values to be processed.


#### Database choosen

The SQL kind database was choosen due to the nature of those entity being capable to have relationships in future features, but It can work well with a Non-SQL database.

## 🚩 Critique

#### Escalability

This project has been prepared with NestJS focusing on microsservices. The type of the app configuration was planned to work with microsservices architecture, as NestJS hybrid application, that receives and send data among other services.

However, some another steps should be taken to have a  complete microsservices architecture implemented.

By example, the project doesn't have yet queues to process communications from and to another services.

Considering the Docker's mounted environment, the actual configuration can manage a large amount of data. But for a massive adoption, **creation and listing feature could have a overload problem** due to the project have a single container for the Database and the API.

To solve this, an horizontal auto-scaling is necessary with some of tweaks at the context of database read-replicas.

Also, some cache layer would be great to improve the API performance and could be applied by a Proxy service or a Redis implemented at the project App.
