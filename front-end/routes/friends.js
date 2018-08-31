const express = require('express');
const router = express.Router();
const User = require('../models/User');

router.get('/allUsers', (req,res)=>{
  User.find({}).then(users=>{
    if(!users){
      res.status(400).json({message:"No users created"});
    }

    res.status(201).json({
      allUsers : users,
      message: "Got users"
    })
  });
});

module.exports = router;
