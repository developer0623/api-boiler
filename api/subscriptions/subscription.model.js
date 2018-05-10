var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var subscriptionSchema = new Schema({
  articleId: String,
  login: String

}, {collection: 'subscriptions' });

module.exports = mongoose.model('Subscriptions', subscriptionSchema);