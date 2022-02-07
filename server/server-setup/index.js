const { expressObj } = require('./express');
const { 
  startServer,
  stopServer,
  logIfTrue 
} = require('./setup-fns')

  module.exports = {
    expressObj,
    startServer,
    stopServer,
    logIfTrue
  }