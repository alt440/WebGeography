var mongoose = require('mongoose'); //used to communicate with the MongoDB database
var Schema = mongoose.Schema;

var scoreEntry = new Schema({

  //defining extra conditions within the parameters (no need of JOI)
  username: {
    type: String,
    required: true,
    unique: true,
    minlength: 5,
    maxlength: 20
  },

  score: {
    type: Number,
    required: true,
  }
});

//creating model using Schema
var ScoreEntry = mongoose.model('ScoreEntry', scoreEntry);

module.exports.ScoreEntry = ScoreEntry;
