// dependencies
const chai= require('chai');
const chaiHttp= require('chai-http');
const { HEALTH_CHECK } = require('./../../global/constants');
const { startServer, stopServer, expressObj } = require('./../../server-setup');
describe(HEALTH_CHECK, function () {
  chai.use(chaiHttp);
  let localServerObj;
  beforeEach(async function () {
    localServerObj = await startServer(expressObj)
  });

  afterEach(async function () {
    await stopServer(localServerObj)
  });

  it('get returns "server is up & running!"', async function () {
    const res = await chai.request(localServerObj).get(HEALTH_CHECK);
    expect(res.text).toBe("server is up & running!");
  });
});
