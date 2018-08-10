/**
 * Midlleware file to stop users from accessing
 * some paths if they are not authenticated
 */
const jwt = require('jsonwebtoken');

module.exports = (req,res,next) => {
  //Added a try and catch block because a token could not be returned at all
  try{
    const token = req.headers.authorization.split(" ")[1];
    jwt.verify(token,"secret_this_should_be_longer");
    next();
  }catch(error){
    res.status(401).json({message: "Auth Failed"})
  }
};
