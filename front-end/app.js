var createError = require('http-errors');
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const User = require('./models/User');

var path = require('path');

const app = express();

mongoose.connect("mongodb+srv://Brian:YBOfPjIDYQ001tCp@user-bmyfw.mongodb.net/Main?retryWrites=true")
.then(()=>{
  console.log("Connected to database");
}).catch(()=>{
  console.log("Connection failed");
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false}));

//app.use(express.json());
//app.use(express.urlencoded({ extended: false }));
//app.use(express.static(path.join(__dirname, 'dist/front-end')));
//app.use('/', express.static(path.join(__dirname, 'dist')));

/**
 * Allows us to connect to any other server if needed.
 * Angular is on localhost:4200, while the backend is on
 * localhost:3000
 */
app.use(function(req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers","Origin, X-Requested, Content-Type, Accept");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE, OPTIONS");
  next();
});

// Posts a requests (FIND OUT WHY POST ISNT WORKING)
app.use('/api/users',(req,res,next) => {

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
app.get('/api/users', (req,res,next)=>{
    res.status(200).json({text:"This route wdfgdforks"});
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.sendStatus(err.status);
});

module.exports = app;
