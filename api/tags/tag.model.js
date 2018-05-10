var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var tagSchema = new Schema({
  tag: String,
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

}, {collection: 'tags' });

module.exports = mongoose.model('Tags', tagSchema);