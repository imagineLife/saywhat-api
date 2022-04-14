Here is a developing http server.  
This server will serve data to a client & act as a "middle-man" between the requesting client and some data.    

This API, and this project at large, will intend to follow the [12-Factor App](https://12factor.net/) methodology.

- [Goals](#goals)
  - [DB Dependent](#db-dependent)
    - [Event-Driven DB Config](#event-driven-db-config)
- [User Account APIS](#user-account-apis)
  - [Register Account](#register-account)
  - [Forgot + Reset PW](#forgot--reset-pw)
    - [admin details later](#admin-details-later)
  - [CRUD Text](#crud-text)
    - [Store Text](#store-text)
    - [Add Metadata to Text](#add-metadata-to-text)
  - [Logging](#logging)
  - [Optimizing For Production](#optimizing-for-production)
  - [Using With Docker](#using-with-docker)
    - [Dev](#dev)
    - [Dev with an authenticated Mongo Instance](#dev-with-an-authenticated-mongo-instance)
    - [Prod](#prod)
- [Working With the Code](#working-with-the-code)
  - [Testing](#testing)
    - [Requires MongoDB Connection](#requires-mongodb-connection)
    - [Leverage NPM Test Scripts](#leverage-npm-test-scripts)
- [Code Details](#code-details)
# Goals

## DB Dependent
This API will be connected to a db.  
The db connection will be event-driven.
- The api will start without a connected db
- The db connection instantiation will be async
### Event-Driven DB Config
**A few events** will be setup to interact with the db
- an event that triggers an attempt to connect to the db
  - this will be run on api start as well as during re-try attempts when detected db disconnection
- an event that triggers the "knowledge" of the db connection success
  - this will inform the api to "talk to" the database in the normally expected workflow
- an event that triggers the "knowledge" ofa db error (_and/or disconnection_)
  - this will update the api to return errors to the client during unforeseen db down time

# User Account APIS
As a user I can 
- [ ] Create my account with attributes
  - [ ] first name
  - [ ] last name
  - [ ] email address
  - [ ] password
    - pw stored as one-way non-readable hashed vals

## Register Account
- [ ] Go through an account registration workflow
  - [ ] Sign-up (_register email address_)
  - [ ] validate email
  - [ ] save password

## Forgot + Reset PW
- [ ] Forgot password workflow
  - enter email 
  - click submit 
  - check email
  - click a button in the email or get code from email
  - enter code in ui for email validation
  - enter new pw
- [ ] Reset pw
  - enter current pw
  - enter new pw
  - submit
### admin details later
As an client with "admin" type user credentials, I can
- [ ] Get List of user accounts
  - [ ] email address
  - [ ] last login date
  - [ ] user name
  - [ ] date created

## CRUD Text

### Store Text
As a user I will be able to store text-blobs so that I can later view text for analysis:
- [ ] Text blobs
  - [ ] "raw"?
  - [ ] formatted?

### Add Metadata to Text
As a user, I will be able to add "metadata", important attributes, to the text so that I can categorize the text with 
- [ ] Orator
- [ ] Date
- [ ] tags (_perhaps later on due to complexity of tag integration?!_)
- [ ] more...

## Logging
Incorporates a flexible logging solution.  

## Optimizing For Production
The API is setup to be "bundled" for a tiny code footprint.

## Using With Docker
This server can be run a few different ways as a "containerized" service: one way in a more dev-friendly setup and one way in a more prod-like setup. 

### Dev
A dev image can be built & run as a container using the `dev.Dockerfile`. To build this image (_with docker installed & running on your machine_)
- cd into the server dir
- run `docker build -t dev-server -f dev.Dockerfile .`: this will build a dev-friendly image tagged "dev-server"
- run `docker run --rm -p 3000:3000 -v ${PWD}:/server qwer`: this will run the image as a container
This image is dev friendly with these 2 details, specifically:  
- uses [`nodemon`](https://www.npmjs.com/package/nodemon), which includes "hot-reloading" for faster server development

### Dev with an authenticated Mongo Instance
A dev image and a mongo image can both be started with a docker-compose setup.  
One way to run this is to run from the command line `docker-compose -f dev.docker-compose.yml up --build`.  

### Prod




# Working With the Code
## Testing
### Requires MongoDB Connection
Testing the api requires a connection to a mongo database on `localhost:27017`. Assure a mongo instance is up, running, and available through `localhost:27017`.  
One way to setup a mongo instance could be to use docker with:  
`docker run -p 27017:27017 --rm mongo:5.0.2`.  
### Leverage NPM Test Scripts
With a mongo instance available, leverage a few npm scripts:  
- **`npm run test`**: runs the tests
- **`npm run test:coverage`**: runs the tests and prints a code-coverage result in the terminal (_configured with [jest](https://jestjs.io/) and jest's [code coverage threshold config](https://jestjs.io/docs/configuration#coveragethreshold-object)_)


# Code Details
See [Code Readme](CODE.md) for more details
