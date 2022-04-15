const router = require('express').Router({mergeParams: true})
const {
  routes: {
    SPEECHES
  }
} = require('./../../../global/constants');

const getById = require('./get');

// single speed info
router.get(`/`, getById)

module.exports = router;