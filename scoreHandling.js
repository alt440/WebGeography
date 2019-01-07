var express = require('express');
var router = express.Router();

//to connect with db
var url = "mongodb://perS0nADm1N:"+encodeURIComponent("*geo@P0w3r3d*")+"@ds155097.mlab.com:55097/web_geography";
var local_url = "mongodb://127.0.0.1:27017/web_geography";

//to connect with the mongo client
var mongo = require('mongodb');
var MongoClient = require('mongodb').MongoClient;



//for the scoreEntry objects
const ScoreEntry = require('./models/scoreEntry');
const FlagScoreEntry = require('./models/flagScoreEntry');

//test
router.get('/sendScore.html', ensureAuthenticated, function(req, res){
  //res.sendFile(__dirname+'/sendScore.html');

  res.render('sendScore');
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
    //sorts the list before giving the result set
    dbo.collection("scoreentries").find().sort({score: -1})
      .toArray(function(err, result) {
      if (err) throw err;
      console.log(result);

      //counting scores for each type. If it surpasses ten, the other scores are deleted
      var africaCount = 0;
      var asiaCount = 0;
      var europeCount = 0;
      var NACount = 0;
      var oceaniaCount = 0;
      var SACount = 0;
      var allCount = 0;

      for(var i=0;i<result.length;i++){
        console.log(result[i].score);
        //checking if timestamp is expired. if it is, delete the score
        if(new Date().getTime() - result[i].timeStamp >= 604800000){
          //delete the object
          dbo.collection("scoreentries").deleteMany({timeStamp: result[i].timeStamp});
          continue;
        }

        if(result[i].continentChoice == 1 && africaCount < 10){
          africaCount+=1;
        }
        else if(result[i].continentChoice == 2 && asiaCount < 10){
          asiaCount+=1;
        }
        else if(result[i].continentChoice == 3 && europeCount < 10){
          europeCount+=1;
        }
        else if(result[i].continentChoice == 4 && NACount < 10){
          NACount+=1;
        }
        else if(result[i].continentChoice == 5 && oceaniaCount < 10){
          oceaniaCount+=1;
        }
        else if(result[i].continentChoice == 6 && SACount < 10){
          SACount+=1;
        }
        else if((result[i].continentChoice == 0
          || result[i].continentChoice == undefined) && allCount < 10){
          allCount+=1;
        }
        else{
          //deletes by timestamp as timestamp is very unique for each score
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

router.get('/leaderboardFlags.html', function(req, res){

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
    //sorts the list before giving the result set
    dbo.collection("flagscoreentries").find().sort({score: -1})
      .toArray(function(err, result) {
      if (err) throw err;
      console.log(result);

      //counting scores for each type. If it surpasses ten, the other scores are deleted
      var africaCount = 0;
      var asiaCount = 0;
      var europeCount = 0;
      var NACount = 0;
      var oceaniaCount = 0;
      var SACount = 0;
      var allCount = 0;

      for(var i=0;i<result.length;i++){
        console.log(result[i].score);
        //checking if timestamp is expired. if it is, delete the score
        if(new Date().getTime() - result[i].timeStamp >= 604800000){
          //delete the object
          dbo.collection("flagscoreentries").deleteMany({timeStamp: result[i].timeStamp});
          continue;
        }

        if(result[i].continentChoice == 1 && africaCount < 10){
          africaCount+=1;
        }
        else if(result[i].continentChoice == 2 && asiaCount < 10){
          asiaCount+=1;
        }
        else if(result[i].continentChoice == 3 && europeCount < 10){
          europeCount+=1;
        }
        else if(result[i].continentChoice == 4 && NACount < 10){
          NACount+=1;
        }
        else if(result[i].continentChoice == 5 && oceaniaCount < 10){
          oceaniaCount+=1;
        }
        else if(result[i].continentChoice == 6 && SACount < 10){
          SACount+=1;
        }
        else if((result[i].continentChoice == 0
          || result[i].continentChoice == undefined) && allCount < 10){
          allCount+=1;
        }
        else{
          //deletes by timestamp as timestamp is very unique for each score
          dbo.collection("flagscoreentries").deleteMany({timeStamp: result[i].timeStamp});
        }
        usernameArray[i]=result[i].username;
        scoreArray[i]=result[i].score;
        continentChoiceArray[i]=result[i].continentChoice;
      }
      console.log(usernameArray[0]);
      res.render('leaderboardFlags', {userList: usernameArray,
        scoreList: scoreArray, continentChoiceList: continentChoiceArray});
      db.close();
    });

  });

});

//To send the score of the user to the backend for handling
router.post('/sendScore.html', async(req, res) =>{
  console.log(req.body.scoreText);
  console.log(req.user.username+" My Username");
  scoreEntry = new ScoreEntry({
    username: req.user.username,
    score: req.body.scoreText,
    continentChoice: req.body.continentChoiceText,
    timeStamp: new Date().getTime(),
  });

  var typeGame = req.body.gameChoiceText;

  //choosing the appropriate type of game
  var object=null;
  var collection="";
  if(typeGame == 1){
    collection = "scoreentries";
    object = ScoreEntry;
  }
  else{
    collection = "flagscoreentries";
    object = FlagScoreEntry;
  }

  //there must be a condition to see if there is an already existing score for
  //the user, as username cannot be replicated
  let user = await object.findOne({ username: req.user.username,
          continentChoice: req.body.continentChoiceText});
  //if the user already exist in the leaderboard of the specific continent choice
  if (user) {
      //we need to update the user's score if the new score is greater
      if(req.body.scoreText > user.score){
        MongoClient.connect(url,
          function(err, db) {
            console.log(url);
            var dbo = db.db("web_geography");
            //query to set the new values
            var newvalues = { $set: {score: req.body.scoreText} };
            dbo.collection(collection).updateOne(user, newvalues, function(err, res) {
              if (err)
                throw err;
              console.log(user.username);
              console.log("1 document updated");
              db.close();
            });

        });
      }

      //if the new score isnt greater, then do nothing.

  }
  else{
    //create a new score entry for the user. Verifies on leaderboard page if it merits to stay in DB.
    //first connect to outside DB
    //Connects to the online DB.
    MongoClient.connect(url, { useNewUrlParser: true }, function(err,db){
      object.create(scoreEntry, function (err, user) {
        console.log(url);
        if (err) {
          console.log(err);
          throw err;
        } else {
          //should indicate here that the user was successfully created
          //returns to the hompage if the user was created
          console.log("New score entry");
          console.log(scoreEntry.username);
        }
      });
    });

  }
  console.log("Has finished: "+req.body.hasFinished);
  if(req.body.hasFinished == 1){
    res.redirect('/examMaxScore.html');
  }
  else{
    res.redirect('/gameOver.html');
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
