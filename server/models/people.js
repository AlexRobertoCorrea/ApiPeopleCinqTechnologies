/**
 * Created by alex on 26/04/16.
 */
var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;
var autoIncrement = require('mongoose-auto-increment');
var mongoose_plugins = require('../utils/mongoose_plugins');
var appConfig = require('../config');

var uri = appConfig.get('db:uri');
var connection = mongoose.createConnection(uri);

autoIncrement.initialize(connection);

var PersonSchema   = new Schema({
	name: {type: String, required: true, trim:true},
	disclosableInfo: String
});
PersonSchema.plugin(mongoose_plugins.timestamps);

PersonSchema.plugin(autoIncrement.plugin, {
    model: 'People',
    field: '_id',
    startAt: 0,
    incrementBy: 1
});

//Transform
PersonSchema.set('toJSON', {
	virtuals: true,
	transform: function (doc, ret, options) {
		delete ret._id;
		delete ret.__v;
        ret.id = Number(ret.id);
	}
});

var Person = module.exports = mongoose.model('Person', PersonSchema);
