// dependencies
const chai= require('chai');
const chaiHttp= require('chai-http');
const { routes: { DB } } = require('./../../global/constants');
const { startServer, stopServer, expressObj } = require('./../../server-setup');
describe(DB.ROOT, function () {
  chai.use(chaiHttp);
  let localServerObj;
  beforeEach(async function () {
    localServerObj = await startServer(expressObj)
  });

  afterEach(async function () {
    await stopServer(localServerObj)
  });

  it(`${DB.KILL} returns down val`, async function () {
    const res = await chai.request(localServerObj).get(`${DB.ROOT}${DB.KILL}`);
    expect(JSON.stringify(res.body)).toBe(JSON.stringify({MONGO_CONNECTED: false}));
  });
  it(`${DB.RESTART} returns up val`, async function () {
    const res = await chai.request(localServerObj).get(`${DB.ROOT}${DB.RESTART}`);
    expect(JSON.stringify(res.body)).toBe(JSON.stringify({MONGO_CONNECTED: true}));
  });
  it(`${DB.STATUS} returns db Status obj`, async function () {
    const res = await chai.request(localServerObj).get(`${DB.ROOT}${DB.STATUS}`);
    expect(Object.keys(res.body)[0]).toBe('MONGO_CONNECTED');
  });
});
