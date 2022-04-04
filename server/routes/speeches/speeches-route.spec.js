// dependencies
const chai = require('chai');
const chaiHttp= require('chai-http');
const { routes: { SPEECHES } } = require('./../../global/constants');
const GLOBAL_STATE = require('./../../global/state')
const { startServer, stopServer, expressObj, setupDB } = require('./../../server-setup');
// const { MongoClient } = require('mongodb')

describe(SPEECHES.ROOT, function () {
  chai.use(chaiHttp);
  let localServerObj;
  let TestMongoClient;
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
    if (localServerObj && localServerObj.close) {
      await stopServer(localServerObj) 
    }
    if (expressObj && expressObj.close) { 
      await stopServer(expressObj)
    }
    await TestMongoClient.close()
  });
  
  // describe(`${SPEECHES.ROOT} GET`, () => { 
    it('returns 500 & err string when db not connected', async () => {
      const res = await chai.request(localServerObj).get(`${SPEECHES.ROOT}`);
      expect(res.status).toBe(500)
      expect(res.body).toBe('server error')
    })
  // })
});
