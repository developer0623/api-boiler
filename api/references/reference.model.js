var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var referenceSchema = new Schema({
  articleId: String,
  reference: String,
  status: String

}, {collection: 'references' });

module.exports = mongoose.model('References', referenceSchema);