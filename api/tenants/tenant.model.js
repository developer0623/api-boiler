var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var tenantSchema = new Schema({
  name: String,
  login: String,
  passwordHash: String,
  my_access_key: String

}, {collection: 'tenants' });

module.exports = mongoose.model('Tenants', tenantSchema);