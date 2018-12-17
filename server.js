var express = require('express');//our pre-built server
var bodyParser = require('body-parser');//used to get POST info

//for all express communication
var app = express();

//to include my webFlow.js
var router = require('./webFlow');

//MONGODB from mlab website connection
//import the mongodb native drivers.
var mongodb = require('mongodb');


//SOURCE OF PASSPORT CONFIG: https://code.tutsplus.com/tutorials/authenticating-nodejs-applications-with-passport--cms-21619
// Configuring Passport. Used for user authentication, and to get the contents
//of forms.
var passport = require('passport');
// Same as a PHP session
var expressSession = require('express-session');
app.use(expressSession({secret: 'mySecretKey'}));
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

//We need to work with "MongoClient" interface in order to connect to a mongodb server.
var MongoClient = mongodb.MongoClient;

// Connection URL. This is where your mongodb server is running.

//(Focus on This Variable)
var url = "mongodb://perS0nADm1N:"+encodeURIComponent("*geo@P0w3r3d*")+"@ds155097.mlab.com:55097/web_geography";
//(Focus on This Variable)

// Use connect method to connect to the Server
  MongoClient.connect(url, {useNewUrlParser:true}, function (err, db) {
  if (err) {
    console.log('Unable to connect to the mongoDB server. Error:', err);
  } else {
    console.log('Connection established to', url);

    // do some work here with the database.

    //Close connection
    db.close();
  }
});
//END MONGODB connection

var path = require('path');



//setting folder as views folder
app.set('WebGeography', path.join(__dirname, 'WebGeography'));
//enabling css and js
app.use(express.static(__dirname + '/public'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

//to make all webFlow valid from router variable
app.use('/', router);


app.listen(1337); //listens on port 1337
console.log("Server is running on port 1337");
