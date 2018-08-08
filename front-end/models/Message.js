const mongoose = require('mongoose');
// Subject to change
var MessageSchema = new mongoose.Schema({
  chat_id: {type:mongoose.Schema.Types.ObjectId, ref: 'Chat'},
  date_sent:{type:Date},
  message:{type:String}
});

module.exports = mongoose.Model('Message',MessageSchema);
