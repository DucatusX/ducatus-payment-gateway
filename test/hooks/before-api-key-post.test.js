const assert = require('assert');
const feathers = require('@feathersjs/feathers');
const beforeApiKeyPost = require('../../src/hooks/before-api-key-post');

describe('\'before-api-key-post\' hook', () => {
  let app;

  beforeEach(() => {
    app = feathers();

    app.use('/dummy', {
      async get(id) {
        return { id };
      }
    });

    app.service('dummy').hooks({
      before: beforeApiKeyPost()
    });
  });

  it('runs the hook', async () => {
    const result = await app.service('dummy').get('test');
    
    assert.deepEqual(result, { id: 'test' });
  });
});
