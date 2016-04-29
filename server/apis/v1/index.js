/**
 * Created by alex on 26/04/16.
 */
var express    = require('express');

exports = module.exports = this_module;

function this_module(options){

	var appApi = express.Router();

	appApi.use('/people', require('./people')());

	appApi.get('/me', function(req, res) {
		res.json(req.payload.auth);
	});

	return appApi;
}
