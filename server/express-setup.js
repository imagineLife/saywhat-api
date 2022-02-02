/*

  Dependencies

*/ 
const express = require('express');
const rootRouter = require('./routes')
const { GLOBAL_STATE, ServicesEmitter } = require('./global');
const STATIC_DIR = './static';




/*

  Server Setup

*/ 
const router = express.Router();
const expressObj = express();
expressObj.use(express.static(STATIC_DIR));





/*

  setup express Route Handling

*/ 
expressObj.use('/', rootRouter)
module.exports = { expressObj }