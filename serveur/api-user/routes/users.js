let Users = require('../model/user-shema');



function getUsers(req, res){
    var aggregateQuery=Users.aggregate();
    Users.aggregatePaginate(aggregateQuery,
        {
            page: parseInt(req.query.page) || 1,
            limit: parseInt(req.query.limit) ||20,
        },
        (err, users) =>{
        if(err){
            res.send(err)
        }

        res.send(users);
    }
        );
       
    }

// Récupérer un assignment par son id (GET)
function getUser(req, res){
    let userId = req.params.id;
    let usersName = req.params.userName;
    let usersMail = req.params.userMail;
    let usersPassword = req.params.userPassword;

    Users.findOne({id: userId,usersName,usersMail,usersPassword}, (err, user) =>{
        if(err){res.send(err)}
        res.json(user);
    })
}

function postUser(req, res){
    let user = new Users();
    user.id = req.body.id;
    user.userName = req.body.userName;
    user.userMail = req.body.userMail;
    user.userPassword = req.body.userPassword;

    console.log("POST assignment reçu :");
    console.log(user)

    user.save( (err) => {
        if(err){
            res.send('cant post assignment ', err);
        }
        res.json({ message: `${user.userName} saved!`})
    })
}


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

module.exports = { getUsers,postUser, getUser, updateUser, deleteUser };