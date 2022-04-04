const state = {
  routes: {
    HEALTH_CHECK: '/health-check',
    DB: {
      KILL: '/kill',
      RESTART:'/restart',
      ROOT: '/db',
      STATUS: '/status'
    },
    USERS: '/users',
    SPEECHES: {
      ROOT: '/speeches',
      BY_ID: '/:speechId'
    }
  },
  db: {
    NAME: 'SayWhat',
    collections: {
      USERS: 'Users',
      SPEECHES: 'Speeches'
    }
  }
}

module.exports = state;