const router = require('express').Router({ mergeParams: true })
const getById = require('./root/get')
const patchById = require('./root/patch')

router.get(`/`, getById)
router.patch(`/`, patchById)

module.exports = router;