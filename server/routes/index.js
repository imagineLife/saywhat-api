
const router = require('express').Router()
const {
  routes: { 
    DB,
    HEALTH_CHECK,
    SPEECHES
    // USERS
  }
} = require('./../global/constants');
const healthCheckHandler =  require('./healthcheck');
const dbStatusHandler = require('./dbStatus');
const speechesHandler = require('./speeches')

router.use(DB.ROOT, dbStatusHandler)
router.use(HEALTH_CHECK, healthCheckHandler)
router.use(SPEECHES.ROOT, speechesHandler)

module.exports = router;