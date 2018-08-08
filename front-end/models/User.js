const mongoose = require('mongoose');
// A third party package that allows us to validate unqiue data
const uniqueValidator = require('mongoose-unique-validator');

var UserSchema = new mongoose.Schema({
  firstName: {type: String, default: String ,required:true},
  lastName: {type: String, default: String, required:true},
  email: {type: String, default: String, required:true, unique: true},
  password: {type: String, default: String, required:true}
});

/**
 * Plugs in the unqiue validator. So any field with a unique
 * attribute will be checked. If it's not unique it will
 * cause an error
 */
UserSchema.plugin(uniqueValidator);

module.exports = mongoose.model('User',UserSchema);
