const GLOBAL_STATE = {
  DB_CONNECTED:false,   //used in checkForDbConnection middleware
  DBS:{
    SayWhat: false
  },
  Collections: {
    Users: false,
    Speeches: false
  }
}

module.exports = GLOBAL_STATE;