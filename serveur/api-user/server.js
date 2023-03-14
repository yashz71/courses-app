let express = require('express');
let app = express();
const controller = require("./controllers/controllers");
let bodyParser = require('body-parser');
let user = require('./routes/users');
let verify = require('./middleware/verify');
let mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const uri = 'mongodb+srv://Youssef:KLPHvTh5Zup6oHEo@cluster0.bzvglhj.mongodb.net/users?retryWrites=true&w=majority';



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


  // les routes
const prefix = '/api';

app.route(prefix + '/users')
  .get(user.getUsers);

app.route(prefix + '/users/:id')
  .get(user.getUser)
  .delete(user.deleteUser);
  
app.route(prefix + '/users')
  .post(user.postUser)
  .post(checkDuplicateUsernameOrEmail)
  .post(controller.signin)
  .put(user.updateUser);





  
// On démarre le serveur
app.listen(port, "0.0.0.0");
console.log('Serveur démarré sur http://localhost:' + port);

module.exports = verify;

module.exports = app;


