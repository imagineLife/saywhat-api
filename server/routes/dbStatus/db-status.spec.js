// dependencies
const chai= require('chai');
const chaiHttp= require('chai-http');
const { DB } = require('./../../global/constants');
const { expressObj } = require('./../../express-setup');
const { startServer, stopServer } = require('./../../../server');
describe(DB.ROOT, function () {
  chai.use(chaiHttp);
  let localServerObj;
  beforeAll(async function () {
    localServerObj = await startServer(expressObj)
  });

  afterAll(async function () {
    await stopServer(localServerObj)
  });

  it(`${DB.KILL} returns down val`, async function () {
    const res = await chai.request(localServerObj).get(`${DB.ROOT}${DB.KILL}`);
    expect(JSON.stringify(res.body)).toBe(JSON.stringify({DB_CONNECTED: false}));
  });
  it(`${DB.RESTART} returns down val`, async function () {
    const res = await chai.request(localServerObj).get(`${DB.ROOT}${DB.RESTART}`);
    expect(JSON.stringify(res.body)).toBe(JSON.stringify({DB_CONNECTED: true}));
  });
});
