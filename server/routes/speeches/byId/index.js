const router = require('express').Router({mergeParams: true})
const {
  routes: {
    SPEECHES
  }
} = require('./../../../global/constants');

const getById = require('./get');

// summary of speeches
router.get(`/`, getById)

module.exports = router;