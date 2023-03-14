const config = require("../config/auth.config");
const User = require("../model/user-shema");

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

exports.signup = (req, res) => {
  const user = new User({
    username: req.body.userName,
    email: req.body.usereMail,
    password: bcrypt.hashSync(req.body.userPassword, 8)
  });

  user.save((err, user) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }
    res.send({ message: "User was registered successfully!" });
          });
          
        }
        exports.signin = (req, res) => {
            User.findOne({
              username: req.body.userName
            })
              .exec((err, user) => {
                if (err) {
                  res.status(500).send({ message: err });
                  return;
                }
          
                if (!user) {
                  return res.status(404).send({ message: "User Not found." });
                }
          
                var passwordIsValid = bcrypt.compareSync(
                  req.body.userPassword,
                  user.userPassword
                );
          
                if (!passwordIsValid) {
                  return res.status(401).send({
                    accessToken: null,
                    message: "Invalid Password!"
                  });
                }
          
                var token = jwt.sign({ id: user.id }, config.secret, {
                  expiresIn: 86400 // 24 hours
                });
          
               
                res.status(200).send({
                  id: user._id,
                  username: user.userName,
                  accessToken: token
                });
              });
          };