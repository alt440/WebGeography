var express = require('express');
var router = express.Router();

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
router.post('/login.html', function(req, res){
  res.sendFile(__dirname+'/login.html');
});

router.post('/register.html', function(req, res){
  res.sendFile(__dirname+'/register.html');
});

module.exports = router;
