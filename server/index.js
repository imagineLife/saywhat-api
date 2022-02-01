/*

  Dependencies

*/ 
const express = require('express');
const router = express.Router();
const { healthCheckHandler } = require('./routes')
const { GLOBAL_STATE, ServicesEmitter, routes: { DB, HEALTH_CHECK } } = require('./global');


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
expressObj.use(`${DB.ROOT}${DB.KILL}`, async (req,res,nxt) => {
  let emitterRes = await ServicesEmitter.emit('DB_DISCONNECT')
  res.status(200).send({DB_CONNECTED: GLOBAL_STATE.DB_CONNECTED})
})
expressObj.use(`${DB.ROOT}${DB.RESTART}`, async (req,res,nxt) => {
  let emitterRes = await ServicesEmitter.emit('DB_CONNECT')
  res.status(200).send({DB_CONNECTED: GLOBAL_STATE.DB_CONNECTED})
})
expressObj.use(HEALTH_CHECK, healthCheckHandler)





/*

  Server Listen && Graceful Shutdown

*/ 
let serverApp;
function stopServer(){
  serverApp.close(() => {
    console.log('HTTP Graceful Shutdown')
  })
}

function startServer(){
   return new Promise(resolve => {
     serverApp = expressObj.listen(PORT, () => {
       resolve(`http server listening on ${PORT}`);
    })
  });

  process.on('SIGTERM', () => {
    stopServer()
  })
}

try{
  startServer().then(serverStartString => {
    console.log(serverStartString)
  })
}catch(e){
  console.log('ERROR: ROOT CATCH')
  console.log(e)
}

module.exports = {
  expressObj,
  startServer
};