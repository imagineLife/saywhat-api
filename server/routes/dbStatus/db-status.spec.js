// dependencies
const chai= require('chai');
const chaiHttp= require('chai-http');
const { routes: { DB } } = require('./../../global/constants');
const GLOBAL_STATE = require('./../../global/state')
const { startServer, stopServer, expressObj, setupDB } = require('./../../server-setup');
// const { MongoClient } = require('mongodb')
describe(DB.ROOT, function () {
  chai.use(chaiHttp);
  let localServerObj;
  let TestMongoClient;
  beforeAll(async function () {
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

  afterAll(async function () {
    if (localServerObj && localServerObj.close) {
      await stopServer(localServerObj) 
    }
    if (expressObj && expressObj.close) { 
      await stopServer(expressObj)
    }
  });

  it(`${DB.STATUS} returns db Status obj`, async function () {
    const res = await chai.request(localServerObj).get(`${DB.ROOT}${DB.STATUS}`);
    expect(Object.keys(res.body)[0]).toBe('MONGO_CONNECTED');
  });
  it(`${DB.KILL} returns down val`, async function () {
    const res = await chai.request(localServerObj).get(`${DB.ROOT}${DB.KILL}`);
    expect(JSON.stringify(res.body)).toBe(JSON.stringify({MONGO_CONNECTED: false}));
  });
  describe(`${DB.RESTART}`, () => {
    it(`returns up val`, async function () {
      const res = await chai.request(localServerObj).get(`${DB.ROOT}${DB.RESTART}`);
      expect(JSON.stringify(res.body)).toBe(JSON.stringify({ MONGO_CONNECTED: true }));
    });

    it('throws err when db is disconnected', async () => {
      await TestMongoClient.close();
      const res = await chai.request(localServerObj).get(`${DB.ROOT}${DB.RESTART}`);
      expect(JSON.stringify(res.body)).toBe(JSON.stringify({ Error: 'server error' }));
    })
  })
});
