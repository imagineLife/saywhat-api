/*

  Dependencies

*/ 
const { EventEmitter } = require("events");
const GLOBAL_STATE = require('./state');

const ServicesEmitter = new EventEmitter()
ServicesEmitter.on('DB_DISCONNECT', () => {
  GLOBAL_STATE.DB_CONNECTED = false;
})
ServicesEmitter.on('DB_CONNECT', () => {
  GLOBAL_STATE.DB_CONNECTED = true;
})

module.exports = ServicesEmitter;