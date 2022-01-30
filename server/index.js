/*

  dependencies

*/ 
const express = require('express');
const router = express.Router();
const { healthCheckHandler } = require('./routes')





/*

  vars

*/ 
const PORT = process.env.PORT || 3000;
const STATIC_DIR = './static';
console.log(`PROCESS PORT: ${process.env.PORT}`)




/*

  server setup

*/ 
const expressObj = express();
expressObj.use(express.static(STATIC_DIR));





/*

  endpoint registration

*/ 
expressObj.use('/health-check', healthCheckHandler)





/*

  server listen
  + graceful shutdown

*/ 
const serverApp = expressObj.listen(PORT, () => {
  console.log(`http server listening on ${PORT}`)
})

process.on('SIGTERM', () => {
  console.log('SIGTERM signal received: closing HTTP server')
  serverApp.close(() => {
    console.log('HTTP server closed Gracefully')
  })
})