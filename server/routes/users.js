var express = require('express');
var router = express.Router();
// setup mongoose
var mongoose = require('mongoose');
var options = { useNewUrlParser : true, useUnifiedTopology : true };
mongoose.connect('mongodb://127.0.0.1:27017/valet', options);
var Schema = mongoose.Schema;
var userSchema = new Schema({
    username: {type:String, required:true},
    name: {type:String, required:true},
    password: {type:String, required:true}
});
var UserData = mongoose.model('UserData', userSchema);



/* Simple hashing function */
function stringToHash(string) {
    var hash = 0;
  
    if (string.length == 0) return hash;
     
    for (i = 0; i < string.length; i++) {
        char = string.charCodeAt(i);
        hash = ((hash << 5) - hash) + char;
        hash = hash & hash;
    }
    return hash;
  }

async function getAllUsers() {
    const data = await UserData.find({}).exec();
    return data;
}

async function getUserByUsername(un) {
    const data = await UserData.findOne({username: un}).exec();
    return data;
}

async function addNewUser(user) {
    var data = new UserData({
        username: user.username,
        name: user.name,
        password: stringToHash(user.password)
    });
    await data.save();
    return data;
}

async function updateUserById(uid, body) {
    const filter = { _id: uid };
    const doc = await UserData.findOneAndUpdate(filter, body, { new: true });
    return doc;
}

async function deleteUserById(uid) {
    await UserData.findByIdAndDelete(uid).exec();
}

async function getUserById(uid) {
    const data = await UserData.findById(uid).exec();
    return data;
}


/*  GET /users 
    Return all users */
router.get('/users', (req, res) => {
    if(!req.session.user) {
        res.status(403).send("NOT AUTHENTICATED");
        return;
    }
    getAllUsers().then(data => {
        res.send(data);
    })
});

/*  POST /users 
    Create new user */
router.post('/users', (req, res) => {
    if(!req.session.user) {
        res.status(403).send("NOT AUTHENTICATED");
        return;
    }
    addNewUser(req.body)
    .then(data => { res.send(data); });
});

/*  POST /uids/{uid}?updatePassword=true 
    Update this user */
router.post('/uids/:uid', (req, res) => {
    if (!req.session.user) {
        res.status(403).send("NOT AUTHENTICATED");
        return;
    }
    req.body.password = stringToHash(req.body.password);
    updateUserById(req.params.uid, req.body)
        .then(data => { res.send(data); } );
});

/*  DELETE /uid/{uid} 
    Delete this user */
router.delete('/uids/:uid', (req, res) => {
    if(!req.session.user) {
        res.status(403).send("NOT AUTHENTICATED");
        return;
    }
    deleteUserById(req.params.uid).then(res.status(200).send());
});

/*  GET /uids/{uid} 
    Get this user */
router.get('/uids/:uid', (req, res) => {
    if(!req.session.user) {
        res.status(403).send("NOT AUTHENTICATED");
        return;
    }
    getUserById(req.params.uid)
        .then(data => { res.send(data); });
})


/* Log In */
router.post('/login', (req, res) => {
    const ERROR = "INVALID CREDENTIALS";
    getUserByUsername(req.body.username).then((user) => {
    //console.log(user);
    if(user) {
      req.session.regenerate( () => {
        if(stringToHash(req.body.password) == user.password) {
          req.session.user = user;
          user.password='';
          res.json(user);
        }
        else {
          res.status(200).json({msg:ERROR});
        }
      });
    }
    else {
      res.status(200).json({msg:ERROR});
    }
  })});
  
  /* Log Out */
  router.post('/logout', (req, res) => {
    req.session.destroy( () => {
      res.status(200).send({});
    })
  });


module.exports = router, getUserByUsername;
