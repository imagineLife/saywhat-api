// Dependencies
const express = require('express');

// vars & setup
const PORT = process.env.PORT || 3000;
const STATIC_DIR = './static';

const expressObj = express();
expressObj.use(express.static(STATIC_DIR));

const serverApp = expressObj.listen(PORT, () => {
  console.log(`http server listening on ${PORT}`)
})

process.on('SIGTERM', () => {
  console.log('SIGTERM signal received: closing HTTP server')
  serverApp.close(() => {
    console.log('HTTP server closed Gracefully')
  })
})