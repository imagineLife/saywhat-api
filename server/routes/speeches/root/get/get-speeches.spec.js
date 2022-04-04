// dependencies
const chai = require('chai');
const chaiHttp= require('chai-http');
const { routes: { SPEECHES: { ROOT } } } = require('./../../../../global/constants');
const GLOBAL_STATE = require('./../../../../global/state')
const { startServer, stopServer, expressObj, setupDB } = require('./../../../../server-setup');
// const { MongoClient } = require('mongodb')
describe(`${ROOT}: GET`, function () {
  chai.use(chaiHttp);
  let localServerObj;
  // let TestMongoClient;
  beforeEach(async function () {
    process.env.MONGO_AUTH = false;
    if (localServerObj && localServerObj.close) {
      await stopServer(localServerObj) 
    }
    if (expressObj && expressObj.close) { 
      await stopServer(expressObj)
    }
    localServerObj = await startServer(expressObj)

    const db_obj = {
      host: 'localhost',
      port: '27017'
    }
    TestMongoClient = await setupDB({ ...db_obj });
  });

  afterEach(async function () {
    // await TestMongoClient.close()
    if (localServerObj && localServerObj.close) {
      await stopServer(localServerObj) 
    }
    if (expressObj && expressObj.close) { 
      await stopServer(expressObj)
    }
    await TestMongoClient.close()
  });

  it(`returns horse`, async function () {
    const res = await chai.request(localServerObj).get(`${ROOT}`);
    expect(res.body).toBe("server error")
  });
  // it(`${DB.KILL} returns down val`, async function () {
  //   const res = await chai.request(localServerObj).get(`${DB.ROOT}${DB.KILL}`);
  //   expect(JSON.stringify(res.body)).toBe(JSON.stringify({MONGO_CONNECTED: false}));
  // });
});
