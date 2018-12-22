const {User, validate, createUser, getUserById, getUserByUsername, comparePassword} = require('./models/user');
const ScoreEntry = require('./models/scoreEntry');
var express = require('express');
var router = express.Router();

//to connect with db
var url = "mongodb://perS0nADm1N:"+encodeURIComponent("*geo@P0w3r3d*")+"@ds155097.mlab.com:55097/web_geography";
//to connect with the mongo client
var mongo = require('mongodb')
var MongoClient = require('mongodb').MongoClient;

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

  //this is to determine if the user has logged in. If so, sends a username
  if(req.user != undefined){
    res.render('homePage', {username: req.user.username});
  }
  //otherwise no username set, nothing appears on homepage.
  else{
    res.render('homePage', {username: undefined});
  }
});

router.get('/homePage.html', function(req, res){
  //res.sendFile(__dirname+'/homePage.html');

  //a parameter is included in the brackets.
  //this is to determine if the user has logged in. If so, sends a username
  if(req.user != undefined){
    res.render('homePage', {username: req.user.username});
  }
  //otherwise no username set, nothing appears on homepage.
  else{
    res.render('homePage', {username: undefined});
  }
});

router.get('/play.html', ensureAuthenticated, function(req, res){
  //res.sendFile(__dirname+'/play.html');
  res.render('play');
});

router.get('/about_us.html', function(req, res){
  //res.sendFile(__dirname+'/about_us.html');
  res.render('about_us');
});

//test
router.get('/sendScore.html', ensureAuthenticated, function(req, res){
  //res.sendFile(__dirname+'/sendScore.html');

  res.render('sendScore');
});

router.get('/gameOver.html', ensureAuthenticated, function(req, res){
  //res.sendFile(__dirname+'/gameOver.html');

  res.render('gameOver');
});

router.get('/questions.html', ensureAuthenticated, function(req, res){
  //res.sendFile(__dirname+'/questions.html');
  res.render('questions');
});

router.get('/selectContinentForPlay.html', ensureAuthenticated, function(req, res){
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

router.get('/typeQuestion.html', ensureAuthenticated, function(req, res){
  //res.sendFile(__dirname+'/typeQuestion.html');
  res.render('typeQuestion');
});

router.get('/examMaxScore.html', ensureAuthenticated, function(req, res){
  //res.sendFile(__dirname+'/examMaxScore.html');
  res.render('examMaxScore');
});

router.get('/leaderboard.html', function(req, res){

  var scoreArray = new Array(0);
  var usernameArray = new Array(0);
  var continentChoiceArray = new Array(0);
  //var url = "mongodb://perS0nADm1N:"+encodeURIComponent("*geo@P0w3r3d*")+"@ds155097.mlab.com:55097/web_geography";
  //grab the scores entries before with a list for users and list for scores
  MongoClient.connect(url,
    function(err, db) {
    if (err) throw err;
    console.log("DB reached!");
    var dbo = db.db("web_geography");
    var results = dbo.collection("scoreentries").find({});

    dbo.collection("scoreentries").find({ $query: {}, $orderby: {score: -1}})
      .toArray(function(err, result) {
      if (err) throw err;
      console.log(result);

      for(var i=0;i<result.length;i++){
        //checking if timestamp is expired. if it is, delete the score
        if(new Date().getTime() - result[i].timeStamp >= 604800000){
          //delete the object
          dbo.collection("scoreentries").deleteMany({timeStamp: result[i].timeStamp});
        }

        usernameArray[i]=result[i].username;
        scoreArray[i]=result[i].score;
        continentChoiceArray[i]=result[i].continentChoice;
      }
      console.log(usernameArray[0]);
      res.render('leaderboard', {userList: usernameArray,
        scoreList: scoreArray, continentChoiceList: continentChoiceArray});
      db.close();
    });

  });

});

//To send the score of the user to the backend for handling
router.post('/sendScore.html', async(req, res) =>{
  console.log(req.body.scoreText);

  scoreEntry = new ScoreEntry({
    username: req.user.username,
    score: req.body.scoreText,
    continentChoice: req.body.continentChoiceText,
    timeStamp: new Date().getTime(),
  });

  //there must be a condition to see if there is an already existing score for
  //the user, as username cannot be replicated
  let user = await ScoreEntry.findOne({ username: req.user.username,
          continentChoice: req.body.continentChoiceText});
  //if the user already exist in the leaderboard of the specific continent choice
  if (user) {
      //we need to update the user's score if the new score is greater
      if(req.body.scoreText > user.score){
        MongoClient.connect(url,
          function(err, db) {

            var dbo = db.db("web_geography");
            //query to set the new values
            var newvalues = { $set: {score: req.body.scoreText} };
            dbo.collection("scoreentries").updateOne(user, newvalues, function(err, res) {
              if (err)
                throw err;

              console.log("1 document updated");
              db.close();
            });

        });
      }

      //if the new score isnt greater, then do nothing.

  }
  else{
    //create a new score entry for the user
    ScoreEntry.create(scoreEntry, function (err, user) {
      if (err) {
        console.log(err);
        throw err;
      } else {
        //should indicate here that the user was successfully created
        //returns to the hompage if the user was created
        console.log("New score entry");
      }
    });
  }

  res.redirect('/gameOver.html');
})

//To handle the POST forms of the login and register pages
router.post('/login.html',
  passport.authenticate("local", {
    //if the login is successful, then we go to the homepage.
    successRedirect: "/",
    //if the login is unsuccessful, then we go to the register page (need to change)
    failureRedirect: "/login.html",
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
            throw err;
          } else {
            //should indicate here that the user was successfully created
            //returns to the hompage if the user was created
            return res.redirect('/login.html');
          }
        });
        return console.log("User created!");

    }



});

//logout page. just redirects the user to the login page.
router.get("/logout.html", function(req, res){
  req.logout();
  res.redirect("/login.html");
});

//checks if the user is authenticated
function ensureAuthenticated(req, res, next){
  if (req.isAuthenticated()){
    next();
  }

  res.redirect("/login.html");
}

module.exports = router;
