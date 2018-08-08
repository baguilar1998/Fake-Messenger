const express = require('express');
const router = express.Router();
const User = require('../models/User');

// Posts a requests (FIND OUT WHY POST ISNT WORKING)
router.post('/api/users/signup',(req,res,next) => {

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

// status(200) this will send back the response if
// the response was successful
router.get('/api/users', (req,res,next)=>{
  User.find().then(documents =>{
    res.status(200).json({"message":"logged"})
    console.log(documents);
  });
});

module.exports = router;
