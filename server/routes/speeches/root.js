function speechesRootHandler(req, res, next) { 
  return res.status(500).json('server error')
}

module.exports = speechesRootHandler;