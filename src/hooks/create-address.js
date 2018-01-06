// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html
var bitcore = require('bitcore-lib');
var ducatuscore = require('ducatuscore-lib');

var redis = require('redis'),
	client = redis.createClient();
var bluebird = require('bluebird');
bluebird.promisifyAll(redis.RedisClient.prototype);
bluebird.promisifyAll(redis.Multi.prototype);

const errors = require('@feathersjs/errors');

module.exports = function (options = {}) { // eslint-disable-line no-unused-vars
	return async context => {
		if (!context.data.api_key) {
			throw new errors.BadRequest("Missing 'api_key'");
		}
		return context.app.service('api_key').get(context.data.api_key).then( api_data => {

			return client.evalshaAsync(
				context.app.get('redis-get-address-index-sha1'), // SHA1 of script
				2, // Number of keys being accessed
				`queue:${context.data.api_key}`, // Queue
				`head:${context.data.api_key}` // Head
			).then(function(reply) {
				var publicKey;
				var address;
				if (api_data.crypto_symbol == 'dtc') {
				publicKey = new ducatuscore.HDPublicKey(api_data.ex_pub_key);
				address = new ducatuscore.Address(publicKey.derive(0).derive(parseInt(reply)).publicKey, ducatuscore.Networks.testnet);
				} else if (api_data.crypto_symbol == 'btc') {
				publicKey = new bitcore.HDPublicKey(api_data.ex_pub_key);
				address = new bitcore.Address(publicKey.derive(0).derive(parseInt(reply)).publicKey, ducatuscore.Networks.testnet);
				}

				context.data.derived_index = parseInt(reply);
				context.data.address = address.toString();
				context.data.createdAtEpoch = Date.now();
				context.data.expiresAt = Date.now() + context.app.get('addressExpiresInMilli');
				context.data.actual_paid = 0;
				context.data.valid = true;
				return context;
			});
		});

	};
};
