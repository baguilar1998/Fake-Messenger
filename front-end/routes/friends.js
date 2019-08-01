const express = require('express');
const router = express.Router();
const User = require('../models/User');
const mongoose = require('mongoose');
mongoose.promise = require('bluebird');
/**
 * Debugging route
 */
router.get('/allUsers', (req,res)=>{
  User.find({}).then(users=>{
    if(!users){
      res.status(400).json({message:"No users created"});
    }
    res.status(200).json({
      allUsers : users,
      message: "Got users"
    });
  });
});

router.post('/addFriend', (req,res,next)=>{
  const user = req.body.user;
  const friend = req.body.friend;
  User.updateOne({"_id":user}, {$push:{friends:friend}}, {safe:true, multi:true})
  .then(results =>{
    res.status(200).send(results);
  }).catch(err=>{
    console.log("An error has occured in adding a frined");
    console.log(err);
    res.status(400).send(err);
  });

});

router.post('/findFriends', (req,res,next)=>{
  const user = req.body.user;
  User.findOne({_id:user}).then(results=>{
    let currentFriends = [];
    console.log(results);
    results.friends.forEach(function(f) {
       currentFriends.push(User.findById(f));
    });
    return Promise.all(currentFriends);
  }).then(allFriends =>{
    console.log(allFriends);
    res.status(200).send(allFriends);
  });
});

router.post('/findUsers', (req,res,next)=>{
  const name = req.body.name;
  User.find({$or:[ {'firstName': {$regex:".*"+name+".*"}}, {'lastName': {$regex:".*"+name+".*"}}]})
  .limit(20).then(users=>{
    res.status(200).send(users);
  })
});

module.exports = router;
