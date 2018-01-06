// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html
var validUrl = require('valid-url');
var bitcore = require('bitcore-lib');
var ducatuscore = require('ducatuscore-lib');

const errors = require('@feathersjs/errors');

module.exports = function (options = {}) { // eslint-disable-line no-unused-vars
  return async context => {
	  if (!context.data.ipn) {
		  throw new errors.BadRequest("Missing IPN parameter");
	  }
	  if (!validUrl.isUri(context.data.ipn)) {
		  throw new errors.BadRequest("IPN must be a URL");
	  }
	  if (!context.data.ex_pub_key) {
		  throw new errors.BadRequest("Missing 'ex_pub_key'");
	  }
	  if (!context.data.crypto_symbol) {
		  throw new errors.BadRequest("Missing 'crypto_symbol'");
	  }
	  if (context.data.crypto_symbol.toLowerCase() != 'btc' && context.data.crypto_symbol.toLowerCase() != 'dtc') {
		  throw new errors.BadRequest("Currently only BTC and DTC is accepted for crypto symbols");
	  }
	  if (context.data.crypto_symbol.toLowerCase() == 'btc') {
		  try {
			  var publicKey = new bitcore.HDPublicKey(context.data.ex_pub_key);
		  } catch (ex) {
			  throw new errors.BadRequest("Invalid 'ex_pub_key'");
		  }
	  }
	  if (context.data.crypto_symbol.toLowerCase() == 'dtc') {
		  try {
			  var publicKey = new ducatuscore.HDPublicKey(context.data.ex_pub_key);
		  } catch (ex) {
			  throw new errors.BadRequest("Invalid 'ex_pub_key'");
		  }
	  }
	  context.data.crypto_symbol = context.data.crypto_symbol.toLowerCase();


    return context;
  };
};
