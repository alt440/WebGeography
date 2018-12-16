var express = require('express');//our pre-built server
var bodyParser = require('body-parser');//used to get POST info

var path = require('path');

var app = express();

//setting folder as views folder
app.set('WebGeography', path.join(__dirname, 'WebGeography'));
//enabling css and js
app.use(express.static(__dirname + '/public'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

//listings on what to do depending on the file being opened.
app.get('/', function(req, res){
  res.sendFile(__dirname+'/homePage.html');
});

app.get('/homePage.html', function(req, res){
  res.sendFile(__dirname+'/homePage.html');
})

app.get('/play.html', function(req, res){
  res.sendFile(__dirname+'/play.html');
});

app.get('/about_us.html', function(req, res){
  res.sendFile(__dirname+'/about_us.html');
});

app.get('/gameOver.html', function(req, res){
  res.sendFile(__dirname+'/gameOver.html');
});

app.get('/questions.html', function(req, res){
  res.sendFile(__dirname+'/questions.html');
});

app.get('/selectContinentForPlay.html', function(req, res){
  res.sendFile(__dirname+'/selectContinentForPlay.html');
});

app.listen(1337); //listens on port 1337
console.log("Server is running on port 1337");
