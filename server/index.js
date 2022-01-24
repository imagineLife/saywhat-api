// Dependencies
const express = require('express');

// vars & setup
const PORT = process.env.PORT || 3000;

const server = express()

server.use('/', (req,res,next) => {
  res.status(200).send('inital server response')
})

server.listen(PORT, () => {
  console.log(`http server listening on ${PORT}`)
})