var mongoose = require('mongoose');

var UserSchema = new mongoose.Schema({
  firstName: {type: String, default: String},
  lastName: {type: String, default: String},
  email: {type: String, default: String},
  password: {type: String, default: String}
});

module.exports = mongoose.model('User',UserSchema);
