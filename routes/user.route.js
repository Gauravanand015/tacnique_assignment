const express = require("express");
const userRouter = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const UserModel = require("../models/user.model");
const createHttpError = require("http-errors");
require("dotenv").config();

// Route to register a new user
userRouter.post("/register", async (req, res, next) => {
  let { name, email, password } = req.body;
  if (!name || !email || !password) {
    return next(createHttpError.NotFound("Please enter all required fields"));
  }
  try {
    // Check if a user with the same email already exists
    const existingUser = await UserModel.findOne({ email: email });

    if (!existingUser) {
      // Hash the password and create a new user
      bcrypt.hash(password, 6, async (err, hash) => {
        if (err) {
          next(err);
        } else {
          const newUser = new UserModel({
            name,
            email,
            password: hash,
          });

          await newUser.save();
          res.status(201).send("User Registered");
        }
      });
    } else {
      // User with the same email already exists
      next(createHttpError.Forbidden("User already registered"));
    }
  } catch (error) {
    next(error);
  }
});

// Route to log in a user
userRouter.post("/login", async (req, res, next) => {
  const { email, password } = req.body;

  try {
    // Find the user by email
    const user = await UserModel.findOne({ email: email });

    if (user) {
      // Compare the provided password with the hashed password in the database
      bcrypt.compare(password, user.password, (err, result) => {
        if (err) return next(err);
        else if (result) {
          // Generate a JWT token for authentication
          let token = jwt.sign(
            { email: user.email, _id: user._id },
            process.env.SECRET_KEY
          );

          res.status(200).json({
            Message: "Login Successful",
            token: token,
          });
        } else {
          // Password does not match
          next(createHttpError.Unauthorized("Incorrect password"));
        }
      });
    } else {
      // User with the provided email is not found
      next(createHttpError.NotFound("This email is not registered"));
    }
  } catch (error) {
    next(error);
  }
});

module.exports = {
  userRouter,
};
