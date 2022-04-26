// dependencies
const chai = require('chai');
const chaiHttp= require('chai-http');
const { routes: { SPEECHES: { ROOT } } } = require('./../../../../global/constants');
const { GLOBAL_STATE } = require('./../../../../global')
const { startServer, stopServer, expressObj, setupDB } = require('./../../../../server-setup');
const { Crud } = require('../../../../models');
// const { MongoClient } = require('mongodb')
describe(`${ROOT}:/speechId : GET`, function () {
  chai.use(chaiHttp);
  let TestMongoClient;
  let localServerObj;
  let TestSpeechCollection;
  beforeAll(async function () {
    process.env.MONGO_AUTH = false;
    if (localServerObj && localServerObj.close) {
      await stopServer(localServerObj);
    }
    if (expressObj && expressObj.close) {
      await stopServer(expressObj);
    }
    localServerObj = await startServer(expressObj);

    const db_obj = {
      host: 'localhost',
      port: '27017',
    };
    TestMongoClient = await setupDB({ ...db_obj });

    TestSayWhat = TestMongoClient.registerDB('TestSayWhat');
    TestSpeechCollection = new Crud({
      db: TestSayWhat,
      collection: 'TestSpeeches',
    });
    GLOBAL_STATE.Collections.Speeches = TestSpeechCollection;
  });

  afterAll(async function () {
    if (localServerObj && localServerObj.close) {
      await stopServer(localServerObj);
    }
    if (expressObj && expressObj.close) {
      await stopServer(expressObj);
    }
    GLOBAL_STATE.Collections.Speeches = false;
    await TestMongoClient.close();
  });

  it('successfully gets speech by speechID after speech insert', async () => {
    let insertedSpeech;
    const mockSpeech = {
      orator: 'Test User',
      date: '1234-23-2345',
      text: 'This is the song that never ends',
    };
    try {
      console.log('IN TRY')
      
      // insert
      const { insertedId } = await TestSpeechCollection.createOne(mockSpeech);
      insertedSpeech = insertedId;
      const reqURL = `${ROOT}/${insertedId}`;
      const apiRes = await chai.request(localServerObj).get(reqURL);
      expect(apiRes.body.orator).toBeTruthy();
      expect(apiRes.body.date).toBeTruthy();
      expect(apiRes.body.text).toBeTruthy();
    } catch (e) {
      throw new Error(e)
    } finally {
      await TestSpeechCollection.remove()
    }
  });
});

