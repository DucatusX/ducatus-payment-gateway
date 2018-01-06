

const beforeApiKeyPost = require('../../hooks/before-api-key-post');

const afterApiKeyPost = require('../../hooks/after-api-key-post');

module.exports = {
  before: {
    all: [],
    find: [],
    get: [],
    create: [beforeApiKeyPost()],
    update: [],
    patch: [],
    remove: []
  },

  after: {
    all: [],
    find: [],
    get: [],
    create: [afterApiKeyPost()],
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
