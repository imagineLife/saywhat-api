function getById(req, res, next) { 
  console.log('getById: req.params')
  console.log(req.params)
  return res.status(200).json(`getById: ${req.params.speechId}`)
}

module.exports = getById;