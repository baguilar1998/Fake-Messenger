/**
 * -----------------------------
 * Package Imports
 * -----------------------------
 */
const createError = require('http-errors');
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
//const path = require('path');


//Express Import
const app = express();

/**
 * -----------------------------
 * Route Imports
 * -----------------------------
 */
const userRoute = require('./routes/users');

// Connects the application to the database
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
 * localhost:3000 (CORS)
 */
app.use((req, res, next) =>{
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers","Origin, X-Requested, Content-Type, Accept");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE, OPTIONS");
  next();
});

//Express Routes for RESTAPI
app.use('/api/users',userRoute);

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
