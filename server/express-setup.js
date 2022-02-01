/*

  Dependencies

*/ 
const express = require('express');
const { healthCheckHandler } = require('./routes')
const { GLOBAL_STATE, ServicesEmitter, routes: { DB, HEALTH_CHECK } } = require('./global');
const STATIC_DIR = './static';




/*

  Server Setup

*/ 
const router = express.Router();
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

module.exports = { expressObj }