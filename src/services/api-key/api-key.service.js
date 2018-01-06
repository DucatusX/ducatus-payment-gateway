// Initializes the `api_key` service on path `/api_key`
const createService = require('feathers-nedb');
const createModel = require('../../models/api-key.model');
const hooks = require('./api-key.hooks');

module.exports = function (app) {
  const Model = createModel(app);
  const paginate = app.get('paginate');

  const options = {
    name: 'api-key',
    Model,
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/api_key', createService(options));

  // Get our initialized service so that we can register hooks and filters
  const service = app.service('api_key');

  service.hooks(hooks);
};
