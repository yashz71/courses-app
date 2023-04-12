let express = require('express');
let app = express();
let bodyParser = require('body-parser');
let user = require('./routes/users');
const router = express.Router()
let mongoose = require('mongoose');

mongoose.Promise = global.Promise;
const uri = 'mongodb+srv://Youssef:KLPHvTh5Zup6oHEo@cluster0.bzvglhj.mongodb.net/users?retryWrites=true&w=majority';
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


const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  };

mongoose.connect(uri, options)
  .then(() => {
    console.log("Connecté à la base MongoDB assignments dans le cloud !");
    console.log("at URI = " + uri);
    console.log("vérifiez with http://localhost:8080/api/users que cela fonctionne")
    },
    err => {
      console.log('Erreur de connexion: ', err);
    });

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.use(bodyParser.urlencoded({extended: true}));
  app.use(bodyParser.json());
  
  let port = process.env.PORT || 8080; 

  app.use(express.json())

  // les routes
const prefix = '/api';


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


app.get(prefix+'/',
  limitRequests(5, 10), // Apply rate limiting middleware
  (req, res) => {
      res.send('Hello from the rate limited API');
  }
);

app.route(prefix + '/users')
  .get(user.getUsers);

app.route(prefix + '/users/:id')
  
  .delete(user.deleteUser);
  

  app.route(prefix + '/signin')
  .post(user.signin)
  app.route(prefix + '/signup')
  .post(user.signup)

// On démarre le serveur
app.listen(port, "0.0.0.0");
console.log('Serveur démarré sur http://localhost:' + port);


module.exports = app;


