let User = require('../model/user-shema');

checkDuplicateUsernameOrEmail = (req, res, next) => {
    // Username
    User.findOne({
      userName: req.body.userName
    }).exec((err, user) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }
  
      if (user) {
        res.status(400).send({ message: "Failed! Username is already in use!" });
        return;
      }
  
      // Email
      User.findOne({
        userMail: req.body.userMail
      }).exec((err, user) => {
        if (err) {
          res.status(500).send({ message: err });
          return;
        }
  
        if (user) {
          res.status(400).send({ message: "Failed! Email is already in use!" });
          return;
        }
  
        next();
      });
    });
  };

  module.exports = { checkDuplicateUsernameOrEmail };