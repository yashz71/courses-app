const config = require("../config/auth.config");
const User = require("../model/user-shema");
const jwt = require('jsonwebtoken')
const jwtSecret = '4715aed3c946f7b0a38e6b534a9583628d84e96d10fbc04700770d572af3dce43625dd'
var bcrypt = require("bcryptjs");
const username="";
const password ="";
exports.signup = (req, res) => {
  const user = new User({
    username: req.body.userName,
    email: req.body.usereMail,
    password: bcrypt.hashSync(req.body.userPassword, 8)
  });

  user.save((err, _user) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }
    res.send({ message: "User was registered successfully!" });
          });
          
        }
        exports.login = async (req, res, next) => {
          const  username  = "admin";
          const  password =  "admin";

  // Check if username and password is provided
  if (!username || !password) {
    return res.status(400).json({
      message: "Username or Password not present",
    })
  }
  try {
    const user = await User.findOne({ username })
    if (!user) {
      res.status(400).json({
        message: "Login not successful",
        error: "User not found",
      })
    } else {
      // comparing given password with hashed password
      bcrypt.compareSync(password, user.password).then(function (result) {
        result
          ? res.status(200).json({
              message: "Login successful",
              user,
            })
          : res.status(400).json({ message: "Login not succesful" })
      })
    }
  } catch (error) {
    res.status(400).json({
      message: "An error occurred",
      error: error.message,
    })
  }

        }