const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Chat = require('../models/Chat');
const Message = require('../models/Message');


router.post('/getConversation', (req,res,next)=>{
  const email = req.body.email;
  console.log(email);
  Chat.find({email:email}).then((results)=>{
    res.status(200).send(results);
  });
});

module.exports = router;
