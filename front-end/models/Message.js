const mongoose = require('mongoose');
// Subject to change
var MessageSchema = new mongoose.Schema({
  chatId: {
    type:mongoose.Schema.Types.ObjectId,
    ref: 'Chat',
    required: true},
    body: {
      type: String,
      required: true
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }
  },
  {
    timestamps: true //Saves createdAt and updatedAt as dates
});

module.exports = mongoose.model('Message',MessageSchema);
