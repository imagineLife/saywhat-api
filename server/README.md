Here is a developing http server.  
This server will serve data to a client & act as a "middle-man" between the requesting client and some data.  

- [Goals](#goals)
  - [CRUD Accounts](#crud-accounts)
  - [CRUD Text](#crud-text)
    - [Store Text](#store-text)
    - [Add Metadata to Text](#add-metadata-to-text)
# Goals
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
- [ ] 