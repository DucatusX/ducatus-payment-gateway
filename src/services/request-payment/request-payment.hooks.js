

const createAddress = require('../../hooks/create-address');

const postRequestPayment = require('../../hooks/post-request-payment');

module.exports = {
  before: {
    all: [],
    find: [],
    get: [],
    create: [createAddress()],
    update: [],
    patch: [],
    remove: []
  },

  after: {
    all: [],
    find: [],
    get: [],
    create: [postRequestPayment()],
    update: [],
    patch: [],
    remove: []
  },

  error: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  }
};
