const express = require('express');
// A library that allows use to hash passwords
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const router = express.Router();
const User = require('../models/User');
// Middleware
const checkAuth = require('../middleware/check-auth');

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
  let fetchedUser;
  User.findOne({email: req.body.Email})
  .then(user =>{
    // Rejects auth if the user is not found in the database (email)
    if(!user){
      return res.status(401).json({message:"Auth Failed"});
    }

    /**
     * You can't dehash data, but if you enter in the same input as
     * the hashed data, it should produce the same hash code.
     *
     * returns true if the comparison was successful otherwise false
     * and this returns a promise
     */
    fetchedUser = user;
    return bcrypt.compare(req.body.Password, user.password)

  }).then(result => {
    // Sends an Auth Fail reponse if the user didnt type in the correct password
    if(!result){
      return res.status(401).json({message:"Auth Failed"});
    }

    const token = jwt.sign(
      {email:fetchedUser.email, userId: fetchedUser._id},
      'secret_this_should_be_longer',
      {expiresIn:'1h'}
    );

    res.status(200).json({
      token:token
    });

  }).catch(err =>{
    return res.status(401).json({message:"Auth Failed"});
  })

});

/**
 * Test function to test out middle ware
 */
router.post('/test',checkAuth,(req,res,next)=>{
  res.json({message:"This worked"});
});
module.exports = router;
