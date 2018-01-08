const path = require('path');
const favicon = require('serve-favicon');
const compress = require('compression');
const cors = require('cors');
const helmet = require('helmet');
const logger = require('winston');
const fs = require('fs');
const redis = require('redis');

const insight = require('insight-watcher');

const feathers = require('@feathersjs/feathers');
const configuration = require('@feathersjs/configuration');
const express = require('@feathersjs/express');
const socketio = require('@feathersjs/socketio');


const middleware = require('./middleware');
const services = require('./services');
const appHooks = require('./app.hooks');
const channels = require('./channels');

const app = express(feathers());

// Load app configuration
app.configure(configuration());

// Set up Redis
app.redisClient = redis.createClient(app.get('redis_url'));
app.redisClient.on("error", function (err) {
	    console.log("Error " + err);
});
app.redisClient.flushdb(function(err, succeeded) {
	console.log("Flushed database");

	// Load LUA script to redis
	lua_script = fs.readFileSync('./src/lua/get-address-index.lua', 'utf8');
	app.redisClient.script('load', lua_script, function(err, replies) {
		app.set('redis-get-address-index-sha1', replies);
	});
})

// Set up Insight
app.insight = new insight;

app.insight.init(app.get('btc_params'));

app.insight.connect();

//app.insightBtc.getBalance('12apEeTCQNaQVEs3m6f7y6Y1U69Wods2mU').then(function(balance) {
//	console.log('balance:', JSON.stringify(balance, null, 2))
//})

//app.insight.events.on('M6F66cKgRYByXyJuz4MnSmhtkFGP3ra2Mn', function(tx) {
//	console.log('Transaction: ', JSON.stringify(tx));
//});

//app.insightBtc.getData('1BG1Kh5mhKyG2JZ7anmv48HnQbouccioQH').then(function(balance) {
//	console.log('balance:', JSON.stringify(balance, null, 2))
//})

// Enable CORS, security, compression, favicon and body parsing
app.use(cors());
app.use(helmet());
app.use(compress());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(favicon(path.join(app.get('public'), 'favicon.ico')));
// Host the public folder
app.use('/', express.static(app.get('public')));

// Set up Plugins and providers
app.configure(express.rest());
app.configure(socketio());

// Configure other middleware (see `middleware/index.js`)
app.configure(middleware);
// Set up our services (see `services/index.js`)
app.configure(services);
// Set up event channels (see channels.js)
app.configure(channels);

// Configure a middleware for 404s and the error handler
app.use(express.notFound());
app.use(express.errorHandler({ logger }));

app.hooks(appHooks);

module.exports = app;
