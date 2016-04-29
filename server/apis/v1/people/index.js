/**
 * Created by alex on 26/04/16.
 */
var express = require('express');
var _ = require('underscore');
var ERRORS=require('../../../utils/constants').ERRORS;
var peopleService=require('../../../services/peopleService');

exports = module.exports = this_module;

function this_module(options) {

	var api = express.Router();

	api.route('/')
		.get(function (req, res) {
			var name=req.query.name|| "";
			var params = {};
			if(name)
			{
				params.name = new RegExp(name, 'i');
			}
			return peopleService.listAndCount(params).spread(function(people, count) {
				res.header('X-List-Total', count).json(people);
			}, function(err) {
				res.status(ERRORS.unknown.httpStatus).json(_.extend({},ERRORS.unauthorized,{original:err&&err.stack||err}));
				console.error('[people get] error: ',err&&err.stack||err);
			});
		})
		.post(function(req, res) {
			var json = req.body;
			return peopleService.create(json).then(function(person) {
				res.json(person);
			}).catch(function(err) {
				if(err && err.code==11000) {
					var value = err.err&&err.err.match(/: "([^"]+)"/);
					res.status(ERRORS.duplicate_value.httpStatus).json(_.extend({},ERRORS.duplicate_value,{value: value&&value[1]}));
				} else {
					res.status(ERRORS.unknown.httpStatus).json(_.extend({},ERRORS.unauthorized,{original:err&&err.stack||err}));
					console.error('[people post] error: ',err&&err.stack||err);
				}
			}).done();
		});
	api.route('/:id')
		.get(function (req, res) {
			return peopleService.get(Number(req.params.id)).then(function(person) {
				res.json(person);
			}, function(err) {
				res.status(ERRORS.unknown.httpStatus).json(_.extend({},ERRORS.unauthorized,{original:err&&err.stack||err}));
				console.error('[people/:peopleId get] error: ',err&&err.stack||err);
			});
		})
		.put(function (req, res) {
			var json = req.body;
			return peopleService.update(Number(req.params.id), json).then(function(person){
				res.json(person);
			}, function(err) {
				if(err && err.code==11000) {
					var value = err.err&&err.err.match(/: "([^"]+)"/);
					res.status(ERRORS.duplicate_value.httpStatus).json(_.extend({},ERRORS.duplicate_value,{value: value&&value[1]}));
				} else {
					res.status(ERRORS.unknown.httpStatus).json(_.extend({},ERRORS.unknown,{original:err&&err.stack||err}));
					console.error('[people/:peopleId put] error: ',err&&err.stack||err);
				}
			});
		})
		.delete(function (req, res) {
			return peopleService.delete(Number(req.params.id)).then(function() {
				res.status(204).json("Person successfully deleted.");
			}, function(err) {
				res.status(ERRORS.unknown.httpStatus).json(_.extend({},ERRORS.unauthorized,{original:err&&err.stack||err}));
				console.error('[people/:peopleId delete] error: ',err&&err.stack||err);
			});
		});

	return api;
}
