const mongoose = require('mongoose');
// Subject to change
var ChatSchema = new mongoose.Schema({
  users: [{type: mongoose.Schema.Types.ObjectId, ref: 'User'}],
});

module.exports = mongoose.model('Chat',ChatSchema);
