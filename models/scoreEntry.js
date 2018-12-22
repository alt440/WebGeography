//this model stores the high scores for the different continent choice plays in
//exam mode

var mongoose = require('mongoose'); //used to communicate with the MongoDB database
var Schema = mongoose.Schema;

var scoreEntry = new Schema({

  //defining extra conditions within the parameters (no need of JOI)
  username: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 20,
  },

  score: {
    type: Number,
    required: true,
  },

  continentChoice: {
    type: Number,
    required: true,
  },

  timeStamp:{
    type: String,
    required: true,
  },
});

//creating model using Schema
var ScoreEntry = mongoose.model('ScoreEntry', scoreEntry);

module.exports = ScoreEntry;
