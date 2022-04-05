const { Crud } = require('../crud');

class UserAuth extends Crud{
  constructor(props) {
    super(props)
    this.db = props.db
    this.collectionName = props.collection;
    this.collection = this.db.collection(props.collection);
  }

  /*
    Allow user-registration (see functionalities/USER_REGISTRATION.md) for more deets
    FIRST STEP in user-registration
    - Create a user account
    - create a registration_expires date
    - create an registration_token or something...
    - send an email to the user with a unique code for them to enter here
  */
  async registerEmail() { 
    return 'UserAuth signupMethod Here'
  }

  /*
    SECOND STEP in user-registration process
    - check token match
    - check time is before registration_expires date
    - creates create_pw_token or something...

    ALSO
    - used when user "forgets" or wants to "reset" their pw...hmm
  */ 
  validateEmail() { 
    return 'UserAuth validateEmail Here'
  }

  /*
    Create a pw
    - sets pw field in user
    - sets last_updated
  */
  setPW() { 
    return 'UserAuth setPW Here'
  }

  /*
    SIMILAR to the "validateEmail" 
      but instead of registration_expires
      use pw_reset_expires
    - sets account_locked
    - set a pw_reset_token
    - set pw_reset_expires
    - sends email with button to reset pw or something?!
  */ 
  requestPwReset() { 
    return `UserAuth requestPwReset Here`
  }

}

module.exports = {
  UserAuth
}
