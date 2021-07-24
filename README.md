  <h1 align="center">nestjs-task-management</h1>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">Task management API based on NestJS</p>
    <p align="center">

## Description

nestjs-task-management - a simple api for creating a task storage system

## Installation

```bash
$ npm install
```

## Running the app

1. Add configuration file

`cp .env.dev.example .env.dev`
`cp .env.prod.example .env.prod`

2. Change the configuration file for yourself

```dotenv
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=postgres
DB_NAME=three-plates
```

3. Start application

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Stay in touch

- Author - [Alexander "whitered932" Chernykh](https://github.com/whitered932)
- NestJS Website - [https://nestjs.com](https://nestjs.com/)

## License

- Nest is MIT licensed.
- nestjs-task-management is Apache 2.0 licensed.
