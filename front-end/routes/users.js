const express = require('express');
// A library that allows use to hash passwords
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const router = express.Router();
const User = require('../models/User');
// Middleware
const checkAuth = require('../middleware/check-auth');

//Library to extract image data
const multer = require("multer");

const MIME_TYPE_MAP = {
  'image/png' : 'png',
  'image/jpeg' : 'jpg',
  'image/jpg' : 'jpg'
};

const storage = multer.diskStorage({
  //Runs when a function tries to save a file
  destination: (req, file, cb) => {
    // Checks to see if we have a valid file type
    const isValid = MIME_TYPE_MAP[file.mimetype];
    let error = new Error("Invalid mimetype");
    if (isValid){
      error = null;
    }
    cb(error, '../images');
  },
  filename : (req,file,cb) => {
    const name = file.originalname.toLowerCase().split(' ').join('-');
    const ext = MIME_TYPE_MAP[file.mimetype];
    cb(null, name + '-' + Date.now() + '.' + ext);
  }
});

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
      return res.status(401).json({message:"User could not be found"});
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
      return res.status(401).json({message:"User entered wrong password"});
    }

    const token = jwt.sign(
      {email:fetchedUser.email, userId: fetchedUser._id},
      'secret_this_should_be_longer',
      {expiresIn:'1h'}
    );

    console.log('User can log in');
    res.status(200).json({
      token:token,
      expiresIn: 3600
    });

  }).catch(err =>{
    return res.status(401).json({message:"Auth Failed"});
  })

});

/**
 * A post function that retrevies the current users information
 */
router.post('/getUser', (req,res)=>{
  //Querys the current user
  User.findOne({email:req.body.Email})
  .then(user =>{
    //Checks to see if the user exists
    if(!user){
      return res.status(401).json({message:"Auth Failed"});
    }
    //Sends a json object if the user is found
    res.status(200).json({
      currentUser:user,
      message: "Got User"
    })
  });
});

/**
 * A post function that updates any user information
 * multer({storage: storage}).single('image')
 */
router.post('/updateUser', (req,res, next)=>{
  //Gets the Query
  User.findOne({_id:req.body._id})
  .then(user=>{
    bcrypt.hash(req.body.password, 10).then(hash=>{
      req.body.password = hash;
      User.update(user,req.body,function(err){
        if(err)throw err;
      });
    });

    res.status(200).json({message:"User updated"});

  });
})
module.exports = router;
