const router = require('express').Router()
const {
  routes: {
    SPEECHES
  }
} = require('./../../global/constants');
const rootHandler = require('./root');

router.get(`/?`, rootHandler)

module.exports = router;