const GLOBAL_STATE = require('./../../global/state');

function statusHandler(req,res,nxt){
  res.status(200).send({MONGO_CONNECTED: GLOBAL_STATE.MONGO_CONNECTED})
}

module.exports = statusHandler;