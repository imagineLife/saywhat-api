function getUsers(req, res, next) { 
  return res.status(200).send('get user by id')
}

module.exports = getUsers;