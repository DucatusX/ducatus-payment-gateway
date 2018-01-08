// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html
var redis = require('redis');
var bluebird = require('bluebird');

bluebird.promisifyAll(redis.RedisClient.prototype);
bluebird.promisifyAll(redis.Multi.prototype);

// After the address expires, this runs
function recycle_address_index(context) {

	context.app.service('request_payment').patch(context.result._id, 
		{ valid: false }).then(patch => {
			console.log(patch);
			redisClient.lpush(`queue:${context.result.api_key}`, context.result.derived_index);
		});

}

function send_to_ipn(context, tx) {

	console.log(JSON.stringify(context));
	console.log(JSON.stringify(tx));
}
	

module.exports = function (options = {}) { // eslint-disable-line no-unused-vars
	return async context => {
		setTimeout(recycle_address_index, context.app.get('addressExpiresInMilli'), context);
		context.app.redisClient.multi()
			.set(`address:${context.data.address}`, context.result._id)
			.expire(`address:${context.data.address}`, context.app.get('addressExpiresInMilli') * .00105)
			.exec();

		app.insight.events.on(context.data.address, send_to_ipn(context,tx));

		return context;
	};
};
