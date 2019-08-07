const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Chat = require('../models/Chat');
const Message = require('../models/Message');

router.post('/newConversation', (req,res,next)=>{
  const chat = new Chat({
    users: req.body.users
  });
  chat.save().then(results => {
    console.log("A new conversation has started!");
    res.status(200).send(results);
  }).catch(err => {
    console.log("There was an error in creating a new chat");
    res.status(500).send(err);
  });

});

router.post('/getConversation', (req,res,next)=>{
  const users = req.body.users;
  console.log(users);
  Chat.find({users:{$in:users}}).then((results)=>{
    let chat = {};
    for(let i = 0; i < results.length; i++) {
      let chatResults = results[i].users;
      if(chatResults.indexOf(users[0]) > -1 && chatResults.indexOf(users[1]) > -1) {
        chat = results[i];
      }
    }
    res.status(200).send(chat);
  });
});

router.post('/sendMessage', (req,res,next)=>{
  const message = new Message({
    chatId: req.body.chatId,
    body: req.body.body,
    author: req.body.author
  });

  message.save().then(results => {
    console.log("Message Sent");
    res.status(200).send(results);
  }).catch(err=>{
    console.log("There was an error in sending a message");
    console.log(err);
    res.status(500).send(err);
  });
});

router.post('/getMessages', (req,res,next)=>{
  Message.find({chatId: req.body._id}).then(messages =>{
    res.status(200).send(messages);
  }).catch(err=>{
    res.status(500).send({message:"No messages"});
  });
});

module.exports = router;
