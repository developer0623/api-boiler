var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var adminUserSchema = new Schema({
  name: String,
  login: String,
  passwordHash: String

}, {collection: 'admins' });

module.exports = mongoose.model('Admins', adminUserSchema);