const { twoAreEqual } = require('./../helpers')
const PORT = process.env.PORT || 3000;
console.log(`PROCESS PORT: ${process.env.PORT}`)

function logIfTrue(a,b, logString){
  if (twoAreEqual(a,b)) {
    console.log(logString)
  }
}
async function stopServer(srvr){
  console.log('CLOSING SERVER')  
  return await srvr.close(logIfTrue(require.main, module, 'HTTP Graceful Shutdown'))
}

async function startServer(srvr){
  process.on('SIGTERM', () => {
    stopServer(srvr)
  })

  return srvr.listen(PORT, () => {
    console.log(`http server listening on ${PORT}`)
  })
}

module.exports = {
  startServer,
  stopServer,
  logIfTrue
}