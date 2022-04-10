const { Crud } = require('../crud');

class UserAuth extends Crud{
  constructor(props) {
    super(props)
    this.db = props.db
    this.collectionName = props.collection;
    this.collection = this.db.collection(props.collection);
  }

  async createOne(obj) {
    if (!this.validateEmailString(obj.email)) { 
      throw new Error(`Cannot call UserAuth createOne without a valid email address`)
    }
    try {
      return await this.collection.insertOne({
        ...obj,
        _id: obj.email
      })
    } catch (e) { 
      console.log(`${this.collectionName} createOne error`)
      throw new Error(e)
    }
  }

  // regex validates that string is indeed an email address string
  validateEmailString(str){
    return String(str)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

  oneHourFromNow() { 
    const now = this.nowUTC()
    const nowParsed = Date.parse(now)
    const oneHourMS = 60 * 60 * 1000;
    const inOneHour = nowParsed + oneHourMS;
    return new Date(inOneHour)
  }
  /*
    Allow user-registration (see functionalities/USER_REGISTRATION.md) for more deets
    FIRST STEP in user-registration
    - Create a user account
    - create a registration_expires date
    - create an registration_token or something...
    - send an email to the user with a unique code for them to enter here
  */
  async registerEmail({ email }) { 
    if (!this.validateEmailString(email)) { 
      throw new Error(`Cannot call registerEmail without a valid email address`)
    }

    try {
      let newUser = await this.createOne({
        email,
        created_date: this.nowUTC(),
        registration_expires: this.oneHourFromNow()
      })
      
      return newUser;
      
    } catch (e) { 
      console.log('userAuth registerEmail Error')
      console.log(e.message)
      console.log(e)
      throw new Error(e)
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
  async validateEmail({ email }) { 
    if (!this.validateEmailString(email)) { 
      throw new Error(`Cannot call validateEmail without a valid email address`)
    }

    let foundUser = await this.readOne({_id: email})
    
    if (!foundUser) { 
      return false;
    }
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
