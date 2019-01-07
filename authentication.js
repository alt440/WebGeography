const {User, validate, createUser, getUserById, getUserByUsername, comparePassword} = require('./models/user');

//getting the router from scoreHandling
var router = require("./scoreHandling.js");

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
  //console.log(username);
  //console.log(password);
  //check whether one is undefined
  if(username==undefined || password==undefined){
    //req.session['message'] = "Some field(s) is/are undefined";
    return done(null, false);
  }
  getUserByUsername(username, function(err, user){
    if(err) throw err;
    if(!user){
      //req.session['message'] = "The user does not exist";
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
        //req.session['message'] = "Your password is wrong";
        return done(null, false);
      }
    });
  });
}));


router.get('/login.html', function(req, res){
  //res.sendFile(__dirname+'/login.html');
  var message = req.session['message'];
  console.log(message);
  //set the field by using the req.session
  req.session['message'] = undefined;
  res.render('login', {message: message});
});

router.get('/register.html', function(req, res){
  //res.sendFile(__dirname+'/register.html');
  var message = req.session['message'];
  //set the field by using the req.session
  req.session['message'] = undefined;
  res.render('register', {message: message});
});

//To handle the POST forms of the login and register pages
router.post('/login.html',
  passport.authenticate("local", {
    //if the login is successful, then we go to the homepage.
    //(NOTE: Message of "Login unsuccessful" from login page is unset only if gone to homepage after)
    successRedirect : "/",
    //if the login is unsuccessful, then we go to the register page (need to change)
    failureRedirect : "/login.html"
  })
);

router.post('/register.html', async(req, res) =>{
  //https://vegibit.com/node-js-mongodb-user-registration/
  // First Validate The Request
    //the validate function is from the JOI extension, in user.js
    const { error } = validate(req.body);
    if (error) {
        console.log(error.details[0].message);
        return res.redirect('/register.html')/*res.status(400).send(error.details[0].message)*/;
    }

    // Check if this user already exists
    let user = await User.findOne({ email: req.body.email });
    if (user) {
        req.session['message']="User already exists!";
        return res.redirect('/register.html');
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
            req.session['message'] = "User created!";
            return res.redirect('/register.html');
          }
        });
        return console.log("User created!");

    }



});

//logout page. just redirects the user to the login page.
router.get("/logout.html", function(req, res){
  req.logout();
  res.redirect("/");
});

//checks if the user is authenticated
function ensureAuthenticated(req, res, next){
  if (req.isAuthenticated()){
    next();
  }

  res.redirect("/login.html");
}

module.exports = router;
