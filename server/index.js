//Dependencies
const { expressObj } = require('./express-setup');
const { twoAreEqual } = require('./helpers')
const { startServer } = require('./server-fns')

console.log(`PROCESS NODE_ENV: ${process.env.NODE_ENV}`)

if (twoAreEqual(require.main, module)) {
  try{
    startServer(expressObj)
  }catch(e){
    console.log('ERROR: ROOT CATCH')
    console.log(e)
  }
}

module.exports = {
  startServer
};