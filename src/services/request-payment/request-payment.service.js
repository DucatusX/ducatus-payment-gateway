// Initializes the `request_payment` service on path `/request_payment`
const createService = require('feathers-nedb');
const createModel = require('../../models/request-payment.model');
const hooks = require('./request-payment.hooks');

module.exports = function (app) {
  const Model = createModel(app);
  const paginate = app.get('paginate');

  const options = {
    name: 'request-payment',
    Model,
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/request_payment', createService(options));

  // Get our initialized service so that we can register hooks and filters
  const service = app.service('request_payment');

  service.hooks(hooks);
};
