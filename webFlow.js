const {User, validate, createUser, getUserById, getUserByUsername, comparePassword} = require('./models/user');
var express = require('express');
var router = express.Router();

var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

var bcrypt = require('bcryptjs');

//serialization and deserialization
//for passport: maintaining active session
passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  getUserById(id, function(err, user) {
    done(err, user);
  });
});

//set strategy
passport.use(new LocalStrategy(function(username, password, done){
  //looks at whether the username exists in DB
  console.log(username);
  console.log(password);
  getUserByUsername(username, function(err, user){
    if(err) throw err;
    if(!user){
      return done(null, false);
    }

    //if it does, then compares password
    comparePassword(password, user.password, function(err, isMatch){
      if(err) return done(err);
      if(isMatch){
        return done(null, user);
      } else {
        return done(null, false);
      }
    });
  });
}));

//GET requests
//listings on what to do depending on the file being opened.
router.get('/', function(req, res){
  res.sendFile(__dirname+'/homePage.html');
});

router.get('/homePage.html', function(req, res){
  res.sendFile(__dirname+'/homePage.html');
})

router.get('/play.html', function(req, res){
  res.sendFile(__dirname+'/play.html');
});

router.get('/about_us.html', function(req, res){
  res.sendFile(__dirname+'/about_us.html');
});

router.get('/gameOver.html', function(req, res){
  res.sendFile(__dirname+'/gameOver.html');
});

router.get('/questions.html', function(req, res){
  res.sendFile(__dirname+'/questions.html');
});

router.get('/selectContinentForPlay.html', function(req, res){
  res.sendFile(__dirname+'/selectContinentForPlay.html');
});

router.get('/login.html', function(req, res){
  res.sendFile(__dirname+'/login.html');
});

router.get('/register.html', function(req, res){
  res.sendFile(__dirname+'/register.html');
});

//To handle the POST forms of the login and register pages
router.post('/login.html',
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/register.html",
    failureFlash: true
  })
);

router.post('/register.html', async(req, res) =>{
  //https://vegibit.com/node-js-mongodb-user-registration/
  // First Validate The Request
    const { error } = validate(req.body);
    if (error) {
        console.log(error.details[0].message);
        return res.status(400).send(error.details[0].message);
    }

    // Check if this user already exists
    let user = await User.findOne({ email: req.body.email });
    if (user) {
        return res.status(400).send('That user already exists!');
    } else {

        // Insert the new user if they do not exist yet
        user = new User({
            username: req.body.username,
            email: req.body.email,
            password: req.body.password,
            //the time stamp give this format: 'YYYY-MM-DD hh:mm:ss'
            timeStamp: new Date().toISOString().replace(/T/, ' ').replace(/\..+/, ''),
        });

        //use schema.create to insert data into the db
        createUser(user, function(err, user){
          if(err) throw err;
          else console.log(user);
        });
        User.create(user, function (err, user) {
          if (err) {
            return next(err);
          } else {

            return res.redirect('/homePage.html');
          }
        });
        return console.log("User created!");

    }



});

module.exports = router;
