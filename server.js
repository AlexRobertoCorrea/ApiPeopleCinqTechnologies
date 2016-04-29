/**
 * Created by alex on 26/04/16.
 */
// server.js

var express        = require('express'); 		// call express
var app            = express(); 				// define our app using express
var path           = require('path');
var bodyParser     = require('body-parser');
var expressHbs     = require('express-handlebars');
var corser         = require('corser');
var cacheResponse  = require('express-cache-response-directive');
var legacyExpires  = require('express-legacy-expires');
var morgan         = require('morgan');
var _              = require('underscore');
var autoIncrement  = require('mongoose-auto-increment');

var appConfig = require('./server/config');


// Configure Express4
app.engine('html', expressHbs({extname:'html'}));
app.set('view engine', 'html');

var rootPath = path.normalize(__dirname + '');
var env = process.env.NODE_ENV || 'development';

app.use(bodyParser.urlencoded({
	extended: true
}));
app.use(bodyParser.json());

app.use(corser.create({
	methods: corser.simpleMethods.concat(["PUT", "DELETE"]),
	requestHeaders: corser.simpleRequestHeaders.concat(["Authorization","X-List-Total"])
}));

//Morgan HTTP request logger: https://github.com/expressjs/morgan
app.use(morgan(':remote-addr - :remote-user [:date] ":method :url HTTP/:http-version" :status :res[content-length] ":referrer" ":user-agent"'));

// cache control for development
app.use(cacheResponse());
app.use(function noCache(req, res, next) {
	res.cacheControl("private");
	res.cacheControl({maxAge: 0});
	next();
});
app.use(legacyExpires());

if ('production' == env) {
	// cache control for production
	app.use(cacheResponse());
	app.use(function noCache(req, res, next) {
		res.cacheControl("private");
		res.cacheControl({maxAge: 0});
		next();
	});

	app.use(legacyExpires());

	// views and statics for production
	app.set('views', rootPath + '/dist');
	app.use(express.static(path.join(rootPath, 'dist')));

}
else {
	// cache control for development
	app.use(cacheResponse());
	app.use(function noCache(req, res, next) {
		res.cacheControl("private");
		res.cacheControl({maxAge: 0});
		next();
	});
	app.use(legacyExpires());

	// views and statics for development
	app.set('views', rootPath + '/frontend');
	app.use(express.static(path.join(rootPath, '.tmp')));
	app.use(express.static(path.join(rootPath, 'frontend')));
}

var port = process.env.PORT || 3002; 		// set our port

//database
var mongoose   = require('mongoose');
var uri = appConfig.get('db:uri');
if (!_.isEmpty(uri)) {
	console.log('connecting to mongo uri: '+uri);
	var connection = mongoose.connect(uri);
    autoIncrement.initialize(connection);
} else {
	console.error('mongo uri is empty');
}

//mongoose.set('debug', true);

// API V1
var appApiV1 = require('./server/apis/v1');
app.use('/api/v1', appApiV1());

var expressAngularRoutes = require('./server/express-angular-routes');
app.use('/', expressAngularRoutes());

if(!process.env.DONT_START_SERVER) {
	app.listen(port, function () {
		console.log('Magic happens on port ' + port);
	});
}

process.on('uncaughtException', function (err) {
	console.log('uncaughtException: '+err);
});

module.exports.dbinfo={mongoose:mongoose};
module.exports.app = app;
module.exports.port = port;
