/**
 * Created by alex on 26/04/16.
 */
var People = require('../models/people');
var baseService = require('./baseService');

module.exports.create=function(json) {
	return baseService.create(People,json).then(function(people) {
		return people;
	});
};

module.exports.get=function(id, populates) {
	return baseService.get(People, {_id: id}, populates).then(function(person) {
		return person;
	});
};

module.exports.listAndCount=function(params, start,limit, sort, populates) {
	return baseService.listAndCount(People,params,start,limit, sort, populates);
};

module.exports.update=function(id, json) {
	return baseService.createOrUpdate(People, {_id: id}, json).then(function(person) {
		return person;
	});
};

module.exports.delete=function(id) {
	return baseService.delete(People, {_id: id});
};
