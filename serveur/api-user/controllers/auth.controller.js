const config = require("../config/auth.config");
const User = require("../model/user-shema");


var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

exports.signup = (req, res) => {
  // Save User to Database
  User.create({
    userName: req.body.username,
    userMail: req.body.email,
    userPassword: bcrypt.hashSync(req.body.password, 8)
  })
    
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
};

exports.signin = (req, res) => {
  User.findOne({
    where: {
      userName: req.body.userName
    }
  })
    .then(user => {
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
          id: user.id,
          userName: user.userName,
          userMail: user.userMail,
         
          accessToken: token
        });
     
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
};
