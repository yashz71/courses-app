let Users = require('../model/user-shema');
var bcrypt = require("bcryptjs");
var jwt = require("jsonwebtoken");
const {secret} = require("../config/auth.config");
const { Validator } = require('node-input-validator');



class TokenBucket {

  constructor(capacity, fillPerSecond) {
      this.capacity = capacity;
      this.tokens = capacity;
      setInterval(() => this.addToken(), 1000 / fillPerSecond);
  }

  addToken() {
      if (this.tokens < this.capacity) {
          this.tokens += 1;
      }
  }

  take() {
      if (this.tokens > 0) {
          this.tokens -= 1;
          return true;
      }

      return false;
  }
}
function limitRequests(perSecond, maxBurst) {
  const bucket = new TokenBucket(maxBurst, perSecond);

  // Return an Express middleware function
  return function limitRequestsMiddleware(req, res, next) {
      if (bucket.take()) {
          next();
      } else {
          res.status(429).send('Rate limit exceeded');
      }
  }
}






function getUsers(req, res){
    var aggregateQuery=Users.aggregate();
    Users.aggregatePaginate(aggregateQuery,
        {
            page: parseInt(req.query.page) || 1,
            limit: parseInt(req.query.limit) ||20,
        },
        (err, users) =>{
        if(err){
            res.status(500).send(err);
            return;
        }
        res.send(users);
      return;
    }
        );
       
    }

// Récupérer un assignment par son id (GET)





// Update d'un assignment (PUT)
function updateUser(req, res) {
    console.log("UPDATE recu assignment : ");
    console.log(req.body);
    Users.findByIdAndUpdate(req.body._id, req.body, {new: true}, (err, user) => {
        if (err) {
            console.log(err);
            res.send(err)
        } else {
          res.json({message: 'updated'})
        }

      // console.log('updated ', assignment)
    });

}

// suppression d'un assignment (DELETE)
function deleteUser(req, res) {

    Users.findByIdAndRemove(req.params.id, (err, user) => {
        if (err) {
            res.send(err);
        }
        res.json({message: `${user.userName} deleted`});
    })
    
}

function signup  (req, res)  {
  
 
  // Save User to Database
  const v = new Validator(req.body, {
    userName: 'required',
    userMail: 'required|email',
    userPassword: 'required|minLength:10|regex:^[a-zA-Z0-9!@#$%^&*]+$'
  });

  v.check().then((matched) => {
    if (!matched) {
      return res.status(422).send(v.errors);
    }
    if(matched){
      const user = new Users({
        userName: req.body.userName,
        userMail: req.body.usereMail,
        userPassword: bcrypt.hashSync(req.body.userPassword, 14)
      });
      Users.findOne({
        userName: req.body.userName
      }).exec((err,users)=>{
        if(users){
          return res.status(404).send({ message: "User Already existing." });
        }
        user.save((err, _user) => {
          if (err) {
            res.status(500).send({ message: err });
          }
          res.send({ message: "User was registered successfully!" });
                });
      
      })
    }
  });

          
        
};
function signin  (req, res)  {
  
  const v = new Validator(req.body, {
    userName: 'required',
    userPassword: 'required'
  });

  v.check().then((matched) => {
    if (!matched) {
      res.status(422).send(v.errors);
    }
    if(matched){
      Users.findOne({
        userName: req.body.userName
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
    
          var token = jwt.sign({ id: user._id }, secret, {
            expiresIn: 86400 // 24 hours
          });
    
         
          res.status(200).send({
            id: user._id,
            username: user.userName,
            accessToken: token
          });
        });
    }
  });
  
};

module.exports = { getUsers,signin,signup, updateUser, deleteUser };