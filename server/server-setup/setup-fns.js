const { twoAreEqual } = require('./../helpers')
const PORT = process.env.PORT || 3000;
console.log('----startup env vars----')
console.table({
  NODE_ENV: process.env.NODE_ENV,
  PORT: process.env.PORT
})

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
    console.log(`SERVER: http server listening on ${PORT}`)
  })
}

module.exports = {
  startServer,
  stopServer,
  logIfTrue
}