/*

  Dependencies

*/ 
const express = require('express');
const router = express.Router();
const { healthCheckHandler } = require('./routes')





/*

  Variables

*/ 
const PORT = process.env.PORT || 3000;
const STATIC_DIR = './static';
console.log(`PROCESS PORT: ${process.env.PORT}`)
console.log(`PROCESS NODE_ENV: ${process.env.NODE_ENV}`)




/*

  Server Setup

*/ 
const expressObj = express();
expressObj.use(express.static(STATIC_DIR));





/*

  Endpoint Registration

*/ 
expressObj.use('/health-check', healthCheckHandler)





/*

  Server Listen && Graceful Shutdown

*/ 
const serverApp = expressObj.listen(PORT, () => {
  console.log(`http server listening on ${PORT}`)
})

process.on('SIGTERM', () => {
  serverApp.close(() => {
    console.log('HTTP Graceful Shutdown')
  })
})