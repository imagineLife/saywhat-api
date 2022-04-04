function postASpeech(req, res, next) { 
  console.log('req.body')
  console.log(req.body)
  
  return res.status(500).json('posting a speech here, see server logs for more deets')
}

module.exports = postASpeech;