const assert = require('assert');
const app = require('../../src/app');

describe('\'request_payment\' service', () => {
  it('registered the service', () => {
    const service = app.service('request_payment');

    assert.ok(service, 'Registered the service');
  });
});
