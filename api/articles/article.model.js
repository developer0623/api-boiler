var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var articleSchema = new Schema({
  title: String,
  description: String,
  image: String,
  type: String,
  private_to_tenant: Boolean,
  start_date: Date,
  expiry_date: Date,
  access_key: String,
  tags: [String],
  categories: [String],
  language: String,
  jurisdictions: [String],
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

}, {collection: 'articles' });

module.exports = mongoose.model('Articles', articleSchema);