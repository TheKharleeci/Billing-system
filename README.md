# Billing-system
A billing system microservices implemented with postgres, rabbitMQ and Nodejs

## Requirements

To get a copy of this project up and running on your local machine for testing and development, you would need to have a minimum of the listed prerequisites installed on your local machine.

### Prerequisites

You must have

1. [Node.js](https://nodejs.org/) (_v8.12.0 or higher_) and npm (_6.4.1 or higher_) installed on your local machine. Run `node -v` and `npm -v` in your terminal to confirm that you have them installed

2. GIT and Bash

3. Docker

### Installation

    $ Clone the App
    $ run `npm install` to install dependencies.
    $ Create a `.env` file and add the environment variables described in the [.env.sample file]


## Running migrations

    $ run `npm run migrate_up` set up the database tables
    $ run `npm run seed_up` to seed user data


## Starting the dev server

    $ run `npm run migrate_up and npm run seed_up` to create db and run migrations
    $ run `npm run dev` to start the app

## Running the project with docker

    $ run `docker-compose up --build` to create a docker image and start the app


## Running tests

    $ npm test


## Technologies

- Node JS
- Express
- Postman
- Postgres
- Chai, Chai-http and mocha
- Docker
- RabbitMQ


## Documentation

    $ Documentation can be found at 