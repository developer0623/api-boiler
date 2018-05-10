var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var languageSchema = new Schema({
  language: String,
  creator: {
  	login: {
  		type: String,
  		required: false,
  		default: ''
  	},
  	type: {
  		type: String,
  		required: false,
  		default: ''
  	}
  }

}, {collection: 'languages' });

module.exports = mongoose.model('Languages', languageSchema);