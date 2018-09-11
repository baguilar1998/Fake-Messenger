const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Chat = require('../models/Chat');
const Message = require('../models/Message');

router.get('/getConversation', (req, res, next)=>{
  Chat.find({users: req.user._id})
  .select('_id')
  .exec(function (err, chats){

    if (err){
      res.status(400).json({error:err});
    }

    let conversations = [];
    chats.forEach(function(data){
      Message.find({'chatId': data._id})
      .sort('-createdAt')
      .limit(1)
      .populate({
        path:'author',
        select: ''
      })
      .exec(function(err, message){

        if(err){
          res.status(400).json({error:err});
        }

        conversations.push(message);
        if(conversations.length == chats.length){
          return res.status(200).json({chat: conversations});
        }

      })
    });

  })

});

module.exports = router;
