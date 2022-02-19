Here is a developing http server.  
This server will serve data to a client & act as a "middle-man" between the requesting client and some data.    

This API, and this project at large, will intend to follow the [12-Factor App](https://12factor.net/) methodology.

- [Goals](#goals)
  - [DB Dependent](#db-dependent)
    - [Event-Driven DB Config](#event-driven-db-config)
  - [CRUD Accounts](#crud-accounts)
  - [CRUD Text](#crud-text)
    - [Store Text](#store-text)
    - [Add Metadata to Text](#add-metadata-to-text)
  - [Logging](#logging)
  - [Optimizing For Production](#optimizing-for-production)
  - [Using With Docker](#using-with-docker)
    - [Dev](#dev)
    - [Prod](#prod)
- [Working With the Code](#working-with-the-code)
  - [Testing](#testing)
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

## CRUD Accounts
As an client with "admin" type user credentials, I can
- [ ] Get List of user accounts
  - [ ] email address
  - [ ] last login date
  - [ ] user name
  - [ ] date created
As a client with "user" type credentials I can 
- [ ] Create my account with attributes
  - [ ] first name
  - [ ] last name
  - [ ] email address
  - [ ] password
    - pw stored as one-way non-readable hashed vals
- [ ] Edit my account attributes

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

### Prod




# Working With the Code
## Testing
Testing the api requires a connection to a mongo database on `localhost:27017`.  

