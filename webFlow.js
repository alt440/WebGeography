const {User, validate, createUser, getUserById, getUserByUsername, comparePassword} = require('./models/user');
var express = require('express');
var router = express.Router();

//to do the log in phase
var passport = require('passport');

//passport local is for choosing the strategy that is going to be implemented during the authentication
var LocalStrategy = require('passport-local').Strategy;

//to encrypt password
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

//set strategy. Responds to the "authenticate" function on login page
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
        //resets the timeStamp. Next step is to send it to DB!
        user.timeStamp = new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '');
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
  //res.sendFile(__dirname+'/homePage.html');

  //a parameter is included in the brackets.
  //only works with passport session and express session! (in the right order)
  if(req.user != undefined){
    res.render('homePage', {username: req.user.username});
  }
  else{
    res.render('homePage', {username: undefined});
  }
});

router.get('/homePage.html', function(req, res){
  //res.sendFile(__dirname+'/homePage.html');

  //a parameter is included in the brackets.
  res.render('homePage', {user: req.user.username});
});

router.get('/play.html', function(req, res){
  //res.sendFile(__dirname+'/play.html');
  res.render('play');
});

router.get('/about_us.html', function(req, res){
  //res.sendFile(__dirname+'/about_us.html');
  res.render('about_us');
});

router.get('/gameOver.html', function(req, res){
  //res.sendFile(__dirname+'/gameOver.html');
  res.render('gameOver');
});

router.get('/questions.html', function(req, res){
  //res.sendFile(__dirname+'/questions.html');
  res.render('questions');
});

router.get('/selectContinentForPlay.html', function(req, res){
  //res.sendFile(__dirname+'/selectContinentForPlay.html');
  res.render('selectContinentForPlay');
});

router.get('/login.html', function(req, res){
  //res.sendFile(__dirname+'/login.html');
  res.render('login');
});

router.get('/register.html', function(req, res){
  //res.sendFile(__dirname+'/register.html');
  res.render('register');
});

router.get('/typeQuestion.html', function(req, res){
  //res.sendFile(__dirname+'/typeQuestion.html');
  res.render('typeQuestion');
});

router.get('/examMaxScore.html', function(req, res){
  //res.sendFile(__dirname+'/examMaxScore.html');
  res.render('examMaxScore');
});

//To handle the POST forms of the login and register pages
router.post('/login.html',
  passport.authenticate("local", {
    //if the login is successful, then we go to the homepage.
    successRedirect: "/",
    //if the login is unsuccessful, then we go to the register page (need to change)
    failureRedirect: "/register.html",
    failureFlash: true
  })
);

router.post('/register.html', async(req, res) =>{
  //https://vegibit.com/node-js-mongodb-user-registration/
  // First Validate The Request
    //the validate function is from the JOI extension, in user.js
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
            //should indicate here that the user was successfully created
            //returns to the hompage if the user was created
            return res.redirect('/homePage.html');
          }
        });
        return console.log("User created!");

    }



});

//logout page. just redirects the user to the login page.
router.get("/logout.html", function(req, res){
  req.logout();
  res.redirect("/login.html");
})

module.exports = router;
