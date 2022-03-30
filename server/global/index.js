const GLOBAL_STATE = require('./state')
const ServicesEmitter = require('./events');
const state = require('./constants')
module.exports = { 
  GLOBAL_STATE,
  ServicesEmitter,
  routes: state.routes
}