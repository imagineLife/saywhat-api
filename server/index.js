//Dependencies
const {expressObj} = require('./express-setup');
/*

  Variables

*/ 
const PORT = process.env.PORT || 3000;
console.log(`PROCESS PORT: ${process.env.PORT}`)
console.log(`PROCESS NODE_ENV: ${process.env.NODE_ENV}`)





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
  startServer
};