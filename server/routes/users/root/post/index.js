/*
  Dependencies
*/ 
const {
  GLOBAL_STATE: { 
    Collections
  } 
 } = require('./../../../../global')

async function postUsers(req, res, next) { 
  try {
    let { Users } = Collections;
    let createdUser = await Users.createOne({ asdf: 'sdfg' })
    return res.status(200).json({works: 'qwer'})
  } catch (e) { 
    console.log('e')
    console.log(e)
    res.status(500).json({Error: 'postUsers error'})
  }
}

module.exports = postUsers;