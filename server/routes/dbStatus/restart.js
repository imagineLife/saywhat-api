const { ServicesEmitter } = require('./../../global/events')
const GLOBAL_STATE = require('./../../global/state');
function restartHandler(req,res){
  ServicesEmitter.emit('DB_CONNECT', true)
  res.status(200).send({DB_CONNECTED: GLOBAL_STATE.DB_CONNECTED})
}

module.exports = restartHandler;