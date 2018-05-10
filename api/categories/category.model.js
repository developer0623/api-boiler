var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var categorySchema = new Schema({
  category: String,
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

}, {collection: 'categories' });

module.exports = mongoose.model('Categories', categorySchema);