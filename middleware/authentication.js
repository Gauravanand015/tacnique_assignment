const jwt = require("jsonwebtoken");
require("dotenv").config();

// Middleware for user authentication using JWT
const authentication = (req, res, next) => {
  // Get the token from the request headers
  const token = req.headers.authorization;

  try {
    // Verify the token using the provided secret key
    jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
      if (err) {
        // If token verification fails, pass the error to the error handling middleware
        console.log(err);
        next(err);
      } else {
        // If the token is successfully verified, add user information to the request body
        req.body._id = decoded._id;
        req.body.email = decoded.email;
        next();
      }
    });
  } catch (error) {
    // Pass any unexpected errors to the error handling middleware
    console.log(error);
    next(error);
  }
};

module.exports = authentication;
