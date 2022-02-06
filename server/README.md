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
  - [Loggin](#loggin)
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

## Loggin