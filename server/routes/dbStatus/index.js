const killHandler = require('./kill')
const restartHandler = require('./restart')
const router = require('express').Router()
const { DB: { KILL, RESTART } } = require('./../../global/constants');

router.get(KILL, killHandler);
router.get(RESTART, restartHandler);
module.exports = router