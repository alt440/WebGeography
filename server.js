var express = require('express');//our pre-built server
var bodyParser = require('body-parser');//used to get POST info

//for all express communication
var app = express();

//to include my webFlow.js
var router = require('./webFlow');

//MONGODB from mlab website connection
//import the mongodb native drivers.
var mongodb = require('mongodb');

//mongoose for communicating with MongoDB
var mongoose = require('mongoose');

//SOURCE OF PASSPORT CONFIG: https://code.tutsplus.com/tutorials/authenticating-nodejs-applications-with-passport--cms-21619
// Configuring Passport. Used for user authentication, and to get the contents
//of forms.
var passport = require('passport');
//cookie parser --> used with PASSPORT
var cookieParser = require('cookie-parser');
// Same as a PHP session
var expressSession = require('express-session');

//to set the view engine to ejs. Ejs is used to communicate with your html code
//by providing an easy way to display your variables on your html page.
app.set('view engine', 'ejs');

//session hash is first param. For init session with express session
//BEFORE PASSPORT.SESSION
app.use(expressSession({
  secret: '#!9t&dkeB34$*bGhLK*()++DKGH@#*9530hjdh320$%&',
  saveUninitialized: false,
  resave: false,
}));

//b4 passport (ORDER MATTERS)
app.use(cookieParser());

app.use(passport.initialize());
app.use(passport.session());



//serialization and deserialization to not request password and username on each page
passport.serializeUser(function(user, done) {
  done(null, user._id);
});

passport.deserializeUser(function(id, done) {
  User.findById(id, function(err, user) {
    done(err, user);
  });
});

//(Focus on This Variable)
var url = "mongodb://perS0nADm1N:"+encodeURIComponent("*geo@P0w3r3d*")+"@ds155097.mlab.com:55097/web_geography";
//Connects to the online DB.
mongoose.connect(url, {useNewUrlParser: true});



var path = require('path');

//setting folder as views folder
app.set('WebGeography', path.join(__dirname, 'WebGeography'));
//enabling css and js
app.use(express.static(__dirname + '/public'));

//for the favicon
var favicon = require('serve-favicon');
app.use(favicon(__dirname + '/public/img/favicon.ico'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

//to make all webFlow valid from router variable
app.use('/', router);

app.listen(1337); //listens on port 1337
console.log("Server is running on port 1337");
