// dependencies
const chai= require('chai');
const chaiHttp= require('chai-http');
const { HEALTH_CHECK } = require('./../../global/constants');
const { expressObj } = require('./../../express-setup');
const { startServer, stopServer } = require('./../../server-fns');
describe(HEALTH_CHECK, function () {
  chai.use(chaiHttp);
  let localServerObj;
  beforeAll(async function () {
    localServerObj = await startServer(expressObj)
  });

  afterAll(async function () {
    await stopServer(localServerObj)
  });

  it('get returns "server is up & running!"', async function () {
    const res = await chai.request(localServerObj).get(HEALTH_CHECK);
    expect(res.text).toBe("server is up & running!");
  });
});
