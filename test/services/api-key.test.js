const assert = require('assert');
const app = require('../../src/app');

describe('\'api_key\' service', () => {
  it('registered the service', () => {
    const service = app.service('api_key');

    assert.ok(service, 'Registered the service');
  });
});
