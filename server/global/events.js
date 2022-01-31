/*

  Dependencies

*/ 
const { EventEmitter } = require("events");
const GLOBAL_STATE = require('./state');

const ServicesEmitter = new EventEmitter()
ServicesEmitter.on('DB_DISCONNECT', () => {
  console.log('KILLING DB')
  return new Promise((res, rej) => {
    GLOBAL_STATE.DB_CONNECTED = false;
    res()
  })
})
ServicesEmitter.on('DB_CONNECT', () => {
  console.log('RECONNECTING DB')
  return new Promise((res, rej) => {
    GLOBAL_STATE.DB_CONNECTED = true;
    res()
  })
})

module.exports = ServicesEmitter;