//Dependencies
const { expressObj } = require('./express-setup');
/*

  Variables

*/ 
const PORT = process.env.PORT || 3000;
if(process.env !== 'test'){
  console.log(`PROCESS PORT: ${process.env.PORT}`)
  console.log(`PROCESS NODE_ENV: ${process.env.NODE_ENV}`)
}





/*

  Server Listen && Graceful Shutdown

*/ 
// let serverApp;
async function stopServer(srvr){
  if(process.env !== 'test'){
    console.log('CLOSING SERVER')  
  }
  return await srvr.close(() => {
    if (require.main === module) {
      console.log('HTTP Graceful Shutdown')
    }
  })
}

function startServer(srvr){
  process.on('SIGTERM', () => {
    stopServer(srvr)
  })

  return srvr.listen(PORT, () => {
    if(process.env !== 'test'){
      console.log(`http server listening on ${PORT}`)
    }
  })
}

if (require.main === module) {
  try{
    startServer(expressObj).then(serverStartString => {
      console.log(serverStartString)
    })
  }catch(e){
    console.log('ERROR: ROOT CATCH')
    console.log(e)
  }
}

module.exports = {
  startServer,
  stopServer
};