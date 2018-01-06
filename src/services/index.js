const requestPayment = require('./request-payment/request-payment.service.js');
const apiKey = require('./api-key/api-key.service.js');
module.exports = function (app) {
  app.configure(requestPayment);
  app.configure(apiKey);
};
