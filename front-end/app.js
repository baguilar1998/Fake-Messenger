var createError = require('http-errors');
var express = require('express');
var path = require('path');

var app = express();

//app.use(express.json());
//app.use(express.urlencoded({ extended: false }));
//app.use(express.static(path.join(__dirname, 'dist/front-end')));
//app.use('/', express.static(path.join(__dirname, 'dist')));

app.use(function(req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Header","Origin, X-Requested, Content-Type, Accept");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE, OPTIONS");
  next();
});


// status(200) this will send back the response if
// the response was successful
app.use('/api/users', (req,res,next)=>{
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
  res.send(err.status);
});

module.exports = app;
