const { Crud } = require('../crud');

class UserAuth extends Crud{
  constructor(props) {
    super(props)
    this.db = props.db
    this.collectionName = props.collection;
    this.collection = this.db.collection(props.collection);
  }

  validateEmailString(str){
    return String(str)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

  /*
    Allow user-registration (see functionalities/USER_REGISTRATION.md) for more deets
    FIRST STEP in user-registration
    - Create a user account
    - create a registration_expires date
    - create an registration_token or something...
    - send an email to the user with a unique code for them to enter here
  */
  async registerEmail({email}) { 
    if (!this.validateEmailString(email)) { 
      throw new Error(`Cannot call registerEmail without a valid email address`)
    }

    let now = this.nowUTC()
    let expirationTime;
    try {
      await this.createOne({
        email,
        created_date: now,
        registration_expires: 
      })
      
    } catch (e) { 
      console.log(`userAuth registerEmail`)
    }
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
