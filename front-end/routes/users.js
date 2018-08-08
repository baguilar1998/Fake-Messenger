const express = require('express');
// A library that allows use to hash passwords
const bcrypt = require('bcrypt');
const router = express.Router();
const User = require('../models/User');

/**
 * A post function that registers a new user
 * into the database
 */
router.post('/signup',(req,res,next) => {

  //Crypting the password
  bcrypt.hash(req.body.password, 10).then(hash=>{
    // A function that executes if the hashing works
    // Add the keyword hash to whatever fields you want
    // to hash
    const user = new User({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      password: hash
    });

    //Saves the user into the database
    user.save().then(result => {
      //Successful
      res.status(201).json({
        message: "User created"
      });
    }).catch(err => {
      //Error
      res.status(500).json({
        error:err
      });
    })
  });
});



/**
 * A post function that logs the user in
 */
router.post('/login',(req,res,next)=>{
  console.log(req.body.Email);
  res.status(201).json({
    message: "Logged In"
  });
});

// status(200) this will send back the response if
// the response was successful
//router.get('/', (req,res,next)=>{
  //User.find().then(documents =>{
    //res.status(200).json({"message":"logged"})
    //console.log(documents);
  //});
//});

module.exports = router;
