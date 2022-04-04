const router = require('express').Router()
const getSpeeches = require('./get');
const postASpeech = require('./post');

// summary of speeches
router.get(`/`, getSpeeches)
router.post('/', postASpeech);

module.exports = router;