const express = require('express');
const router = express.Router();
const User = require('../models/User');

/**
 * A post function that registers a new user
 * into the database
 */
router.post('/signup',(req,res,next) => {

  const user = new User({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    password: req.body.password
  });

  //Saves the user into the database
  user.save();


  //A new resource was created
  res.status(201).json({
    message:"Successful"
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
})
// status(200) this will send back the response if
// the response was successful
//router.get('/', (req,res,next)=>{
  //User.find().then(documents =>{
    //res.status(200).json({"message":"logged"})
    //console.log(documents);
  //});
//});

module.exports = router;
