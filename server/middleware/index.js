const { auth, adminAuth } = require('./auth');
const { checkForDbConnection } = require('./check-for-db');

module.exports = {
  auth,
  adminAuth,
  checkForDbConnection
}