const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Chat = require('../models/Chat');
const Message = require('../models/Message');

/**
 * Generates the list of converstaions
 * (tba if needed)
 */
router.get('/listConversation', (req, res, next)=>{
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

/**
 * Note for later: Create a typescript model that will store the list
 * of conversations
 *
 * Gets all the messages from a single conversation
 * (as a param, use the chat_id)
 */
router.post('/getConversation', function(req,res,next){
  Message.find({ chatId: req.body.chatId})
  .select('createdAt body author')
  .sort('-createdAt')
  .populate({
    path:'author',
    select: '' //figure this line out later
   })
   .exec(function(err,messages){
      //Throws an error if no messages have been recevied
      if(err){
        res.status(500).json({error: err})
        return next(err);
      }

      res.status(200).json({conversation: messages});
   });

});

/**
 * Creates a new conversation
 * (as a param, use the original user id and other users id and first message)
 */
router.post('/newConversation', function(req,res,next){
  /**
   * Create an object with these params
   * const newConversation =
   * {currentUser:string,newUser:string,message:string}
   */
  if(!req.body.newUser){
    res.status(422).send({error:'Choose a valid user'});
    return next();
  }

  if(!req.body.message){
    res.status(422).send({error: 'Please enter a message'});
    return next();
  }

  // Creates a new chat document
  const chat = new Chat({
    users: [req.body.currentUser, req.body.newUser]
  });

  // Saves the new conversation in the Chat Schema
  chat.save(function(err, newChat){

    if(err){
      res.send({error:err});
      return next(err);
    }

    //If the chat was stored in the database, store the message
    const message = new Message({
      chatId: newChat._id,
      body: req.body.message,
      author: req.body.currentUser
    });

    //Stores the first message in the Message Schema
    message.save(function(err, newMessage){
      if(err){
        res.send({error:err});
        return next(err);
      }
    });

    res.status(200).json({message:'Conversation started', chatId: chat.id});
    return next();
  });
});

/**
 * Sends a message to a chat
 * (as a param send, chatId,userId and message)
 */
router.post('/reply',function(req,res,next){
  //Creates a new Message document
  const reply = new Message({
    chatId: req.body.chatId,
    body: req.body.message,
    author: req.body.userId
  });

  reply.save(function(err,replySent){
    if(err){
      res.send({error:err});
      return next(err);
    }
    res.status(200).json({message:'Reply sent'});
    return (next);
  });
});

module.exports = router;
