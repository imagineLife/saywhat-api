
const router = require('express').Router()
const { DB, HEALTH_CHECK } = require('./../global/constants');
const healthCheckHandler =  require('./healthcheck');
const dbStatusHandler =  require('./dbStatus');

router.use(DB.ROOT, dbStatusHandler)
router.use(HEALTH_CHECK, healthCheckHandler)

module.exports = router;