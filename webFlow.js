var router = require('./authentication.js');

//this is temporary
//to connect with the mongo client
var mongo = require('mongodb');
var MongoClient = require('mongodb').MongoClient;

var UserStats = require('./models/userStatsEntry');
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

router.get('/userStats.html', function(req, res){
  res.render('userStats');
});

router.get('/statsB4ScoreSend.html', function(req, res){
  res.render('statsB4ScoreSend');
});

router.post('/statsB4ScoreSend.html', async(req, res) =>{

  var url = "mongodb://127.0.0.1:27017/web_geography";

  //check where the data needs to be added
  //give general names to see it more easily
  var typeQuestion = req.body.typeQuestionText;
  var typeGame = req.body.gameChoiceText;
  var continent = req.body.continentChoiceText;
  var score = req.body.scoreText;
  //check if user already registered
  let userStats = await UserStats.findOne({ username: req.user.username });

  //because I dont want more than the 10 most recent games saved, an extra
  //condition was added.

  if(userStats){

    //add to this object
    //means exam mode
    if(req.body.typeQuestionText == 1){
      //means country mode
      if(req.body.gameChoiceText == 1){
        //need to calculate frequency of the continent played to know if we unshift
        var c = 0;
        for(var i=0;i< userStats.statsExamCountryContinent.length;i++){
          if(userStats.statsExamCountryContinent[i] == continent) c++;
        }
        userStats.statsExamCountryScores.set(userStats.statsExamCountryContinent.length,score);
        userStats.statsExamCountryContinent.set(userStats.statsExamCountryContinent.length,continent);
        if(c >= 2){
          userStats.statsExamCountryScores.shift();
          userStats.statsExamCountryContinent.shift();
        }
      }
      //flag mode
      else{
        //need to calculate frequency of the continent played to know if we unshift
        var c = 0;
        for(var i=0;i< userStats.statsExamFlagContinent.length;i++){
          if(userStats.statsExamFlagContinent[i] == continent) c++;
        }
        userStats.statsExamFlagScores.set(userStats.statsExamFlagContinent.length,score);
        userStats.statsExamFlagContinent.set(userStats.statsExamFlagContinent.length,continent);
        if(c >= 2){
          userStats.statsExamFlagScores.shift();
          userStats.statsExamFlagContinent.shift();
        }
      }
    }
    //practice mode
    else{
      //means country mode
      if(req.body.gameChoiceText == 1){
        //need to calculate frequency of the continent played to know if we unshift
        var c = 0;
        for(var i=0;i< userStats.statsPracticeCountryContinent.length;i++){
          if(userStats.statsPracticeCountryContinent[i] == continent) c++;
        }
        userStats.statsPracticeCountryScores.set(userStats.statsPracticeCountryScores.length,score);
        userStats.statsPracticeCountryContinent.set(userStats.statsPracticeCountryContinent.length,continent);
        if(c >= 2){
          userStats.statsPracticeCountryScores.shift();
          userStats.statsPracticeCountryContinent.shift();
        }
      }
      else{
        //need to calculate frequency of the continent played to know if we unshift
        var c = 0;
        for(var i=0;i< userStats.statsPracticeFlagContinent.length;i++){
          if(userStats.statsPracticeFlagContinent[i] == continent) c++;
        }
        userStats.statsPracticeFlagScores.set(userStats.statsPracticeFlagScores.length,score);
        userStats.statsPracticeFlagContinent.set(userStats.statsPracticeFlagContinent.length,continent);
        if(c >= 2){
          userStats.statsPracticeFlagScores.shift();
          userStats.statsPracticeFlagContinent.shift();
        }
      }
    }

    //saves changes to DB in collection userStats
    userStats.save();

  }
  else{
    userStats = new UserStats({
      username: req.user.username,
      statsPracticeCountry:[],
      statsPracticeFlag:[],
      statsPracticeCapital: [],
      statsExamCountry: [],
      statsExamFlag: [],
      statsExamCapital: [],
    });

    //means exam mode
    if(req.body.typeQuestionText == 1){
      //means country mode
      if(req.body.gameChoiceText == 1){
        userStats.statsExamCountryScores.set(userStats.statsExamCountryContinent.length,score);
        userStats.statsExamCountryContinent.set(userStats.statsExamCountryContinent.length,continent);
      }
      //flag mode
      else{
        userStats.statsExamFlagScores.set(userStats.statsExamFlagContinent.length,score);
        userStats.statsExamFlagContinent.set(userStats.statsExamFlagContinent.length,continent);
      }
    }
    //practice mode
    else{
      //means country mode
      if(req.body.gameChoiceText == 1){
        userStats.statsPracticeCountryScores.set(userStats.statsPracticeCountryScores.length,score);
        userStats.statsPracticeCountryContinent.set(userStats.statsPracticeCountryContinent.length,continent);
      }
      else{
        userStats.statsPracticeFlagScores.set(userStats.statsPracticeFlagScores.length,score);
        userStats.statsPracticeFlagContinent.set(userStats.statsPracticeFlagContinent.length,continent);
      }
    }

    //saves to DB using mongoose
    userStats.save();
  }

  if(typeQuestion == 1){
    res.redirect("/sendScore.html");
  }
  else{
    res.redirect("/gameOver.html");
  }
});

//checks if the user is authenticated
function ensureAuthenticated(req, res, next){
  if (req.isAuthenticated()){
    next();
  }

  res.redirect("/login.html");
}

module.exports = router;
