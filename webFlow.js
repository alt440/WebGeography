var router = require('./authentication.js');

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

router.get('/typeGame.html', ensureAuthenticated, function(req, res){
  res.render('typeGame');
})

router.get('/typeQuestion.html', ensureAuthenticated, function(req, res){
  //res.sendFile(__dirname+'/typeQuestion.html');
  res.render('typeQuestion');
});

router.get('/examMaxScore.html', ensureAuthenticated, function(req, res){
  //res.sendFile(__dirname+'/examMaxScore.html');
  res.render('examMaxScore');
});

router.get('/flagQuestions.html', ensureAuthenticated, function(req, res){
  res.render('flagQuestions');
});

//checks if the user is authenticated
function ensureAuthenticated(req, res, next){
  if (req.isAuthenticated()){
    next();
  }

  res.redirect("/login.html");
}

module.exports = router;
