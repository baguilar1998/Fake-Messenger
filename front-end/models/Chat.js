const mongoose = require('mongoose');
// Subject to change
var ChatSchema = new mongoose.Schema({
  users: [{type: mongoose.Schema.Types.ObjectId, ref: 'User'}],
  messages: [{type: mongoose.Schema.Types.ObjectId, ref: 'Message'}]
});

module.exports = mongoose.model('Chat',ChatSchema);
