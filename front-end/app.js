/**
 * Create By Brian Aguilar
 */

/**
 * -----------------------------
 * Package Imports
 * -----------------------------
 */
const createError = require('http-errors');
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path');
const http = require('http').Server(express);
const io = require('socket.io')(http);
//const path = require('path');


//Express Import
const app = express();

/**
 * -----------------------------
 * Route Imports
 * -----------------------------
 */
const userRoute = require('./routes/users');
const friendsRoute = require('./routes/friends');
const chatRoute = require('./routes/chat');

// Connects the application to the database
// mongo "mongodb+srv://user-bmyfw.mongodb.net/test" --username Brian
mongoose.connect("mongodb+srv://Brian:YBOfPjIDYQ001tCp@user-bmyfw.mongodb.net/Main?retryWrites=true")
.then(()=>{
  console.log("Connected to database");
}).catch(()=>{
  console.log("Connection failed");
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
//app.use("/images", express.static(path.join("front-end/images")));
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
  res.setHeader("Access-Control-Allow-Headers","Origin, X-Requested, Content-Type, Accept, Authorization");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, PUT, DELETE, OPTIONS");
  next();
});

//Express Routes for RESTAPI
app.use('/api/users',userRoute);
app.use('/api/friends',friendsRoute);
app.use('/api/chat',chatRoute);

http.listen(4444, ()=>{
  console.log("Starting a connection");
});

io.on("connection", (socket)=>{
  console.log("A user has entered the site");

  socket.on("sendMessage", (message)=>{
    console.log("Someone has sent a message");
    io.emit("sendMessage",message);
  });

  socket.on("disconnect", () => {
    console.log("A user has left the site");
  });

});
/**
 * Web Socket Code

let http = require('http').Server(app);
let io = require('socket.io')(http);

io.on('connection', (socket) => {

    // Log whenever a user connects
    console.log('user connected');

    // Log whenever a client disconnects from our websocket server
    socket.on('disconnect', function(){
        console.log('user disconnected');
    });

    // When we receive a 'message' event from our client, print out
    // the contents of that message and then echo it back to our client
    // using `io.emit()`
    socket.on('message', (message) => {
        console.log("Message Received: " + message);
        io.emit('message', {type:'new-message', text: message});
    });
});

// Initialize our websocket server on port 5000
http.listen(5000, () => {
    console.log('real-time messaging');
});*/

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
