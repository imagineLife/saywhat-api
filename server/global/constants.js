const routes = {
  HEALTH_CHECK: '/health-check',
  DB: {
    KILL: '/kill',
    RESTART:'/restart',
    ROOT: '/db',
    STATUS: '/status'
  },
  USERS: '/users'
}

module.exports = routes;