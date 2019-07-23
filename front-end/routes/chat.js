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
  const email = req.body.email;
  Chat.find({email:email}).then((results)=>{
    res.status(200).send(results);
  });
});

router.post('/sendMessage', (req,res,next)=>{

});

module.exports = router;
