# auth-nodejs-mongo

Boilerplate for authentication using node.js and mongo. Based on Stephen Grider's course.

## Setup

Install mongodb
Run `mongod`
Run `yarn install`
Run `yarn run dev`

## Available routes and how it works

`/signup` - it accepts email and password. Once it's been verified that there's no user with the given email in the database, the email and hashed password is save in the database and a JWT token is created and sent back to the user

`/singin` - it accepts email and password. It checks if the email and password are ok and a JWT token is sent back to the user

`/` - in order to access the route you have to include the JWT token in the `authorization` header in the request.