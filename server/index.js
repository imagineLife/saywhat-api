// Dependencies
const express = require('express');

// vars & setup
const PORT = process.env.PORT || 3000;
const STATIC_DIR = './static';

const server = express();
server.use(express.static(STATIC_DIR));

server.listen(PORT, () => {
  console.log(`http server listening on ${PORT}`)
})