//Dependencies
const { expressObj } = require('./express-setup');
const { twoAreEqual } = require('./helpers')
/*

  Variables

*/ 
const PORT = process.env.PORT || 3000;
console.log(`PROCESS PORT: ${process.env.PORT}`)
console.log(`PROCESS NODE_ENV: ${process.env.NODE_ENV}`)





/*

  Server Listen && Graceful Shutdown

*/ 
// let serverApp;
async function stopServer(srvr){
  console.log('CLOSING SERVER')  
  return await srvr.close(() => {
    if (twoAreEqual(require.main, module)) {
      console.log('HTTP Graceful Shutdown')
    }
  })
}

async function startServer(srvr){
  process.on('SIGTERM', () => {
    stopServer(srvr)
  })

  return srvr.listen(PORT, () => {
    console.log(`http server listening on ${PORT}`)
  })
}

if (twoAreEqual(require.main, module)) {
  try{
    startServer(expressObj)
  }catch(e){
    console.log('ERROR: ROOT CATCH')
    console.log(e)
  }
}

module.exports = {
  startServer,
  stopServer,
  twoAreEqual
};