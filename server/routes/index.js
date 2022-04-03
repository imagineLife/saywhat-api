
const router = require('express').Router()
const {
  routes: { 
    DB,
    HEALTH_CHECK,
    // USERS
  }
} = require('./../global/constants');
const healthCheckHandler =  require('./healthcheck');
const dbStatusHandler = require('./dbStatus');

router.use(DB.ROOT, dbStatusHandler)
router.use(HEALTH_CHECK, healthCheckHandler)


module.exports = router;