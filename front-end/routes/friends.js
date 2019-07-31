const express = require('express');
const router = express.Router();
const User = require('../models/User');

router.get('/allUsers', (req,res)=>{
  User.find({}).then(users=>{
    if(!users){
      res.status(400).json({message:"No users created"});
    }

    res.status(200).json({
      allUsers : users,
      message: "Got users"
    })
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
