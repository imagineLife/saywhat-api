const router = require('express').Router({ mergeParams: true })
const getUsers = require('./get')
const postUsers = require('./post')

router.get(`/`, getUsers)
router.post(`/`, postUsers)

module.exports = router;