// dependencies
const chai = require('chai');
const chaiHttp= require('chai-http');
const { routes: { SPEECHES: { ROOT } } } = require('./../../../../global/constants');
const GLOBAL_STATE = require('./../../../../global/state')
const { startServer, stopServer, expressObj, setupDB } = require('./../../../../server-setup');
describe(`${ROOT}: POST`, function () {
  chai.use(chaiHttp);
  let localServerObj;
  let TestMongoClient;
  
  beforeAll(async () => { 
    process.env.MONGO_AUTH = false;
    const db_obj = {
      host: 'localhost',
      port: '27017'
    }
    TestMongoClient = await setupDB({ ...db_obj });
  })

  afterAll(async () => { 
    await TestMongoClient.close()
  })

  beforeEach(async () => {
    if (localServerObj && localServerObj.close) {
      await stopServer(localServerObj) 
    }
    if (expressObj && expressObj.close) { 
      await stopServer(expressObj)
    }
    localServerObj = await startServer(expressObj)
  });

  afterEach(async () => {
    if (localServerObj && localServerObj.close) {
      await stopServer(localServerObj) 
    }
    if (expressObj && expressObj.close) { 
      await stopServer(expressObj)
    }
  });

  it(`returns horse`, async () => {
    const res = await chai.request(localServerObj).post(`${ROOT}`);
    expect(res.body).toBe("posting a speech here, see server logs for more deets")
  });
});
