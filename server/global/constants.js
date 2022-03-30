const state = {
  routes: {
    HEALTH_CHECK: '/health-check',
    DB: {
      KILL: '/kill',
      RESTART:'/restart',
      ROOT: '/db',
      STATUS: '/status'
    },
    USERS: '/users'
  },
  db: {
    NAME: 'SayWhat',
    collections: {
      USERS: 'Users'
    }
  }
}

module.exports = state;