const { GLOBAL_STATE } = require('./../../global')

function checkForDbConnection(req,res,nxt){  
  const notDB = !req.path.match('^/db')
  const notHealthCheck = !req.path.match('^/health-check')
  const DB_NOT_CONNECTED = GLOBAL_STATE.DB_CONNECTED !== true;
  if( notDB && notHealthCheck && DB_NOT_CONNECTED ){
    return res.status(200).send({Error: "Server Error, try again shortly"})
  }
  nxt()
}

module.exports = {
 checkForDbConnection 
}