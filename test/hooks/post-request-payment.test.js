const assert = require('assert');
const feathers = require('@feathersjs/feathers');
const postRequestPayment = require('../../src/hooks/post-request-payment');

describe('\'post-request-payment\' hook', () => {
  let app;

  beforeEach(() => {
    app = feathers();

    app.use('/dummy', {
      async get(id) {
        return { id };
      }
    });

    app.service('dummy').hooks({
      after: postRequestPayment()
    });
  });

  it('runs the hook', async () => {
    const result = await app.service('dummy').get('test');
    
    assert.deepEqual(result, { id: 'test' });
  });
});
