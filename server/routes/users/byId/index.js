const router = require('express').Router({ mergeParams: true })
const getById = require('./get')
const patchById = require('./patch')

router.get(`/`, getById)
router.patch(`/`, patchById)

module.exports = router;