var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var jurisdictionSchema = new Schema({
  jurisdiction: String,
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

}, {collection: 'jurisdictions' });

module.exports = mongoose.model('Jurisdictions', jurisdictionSchema);