const GLOBAL_STATE = require('./../../global/state');

function statusHandler(req,res,nxt){
  res.status(200).send({DB_CONNECTED: GLOBAL_STATE.DB_CONNECTED})
}

module.exports = statusHandler;