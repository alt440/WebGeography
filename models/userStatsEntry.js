var mongoose = require('mongoose'); //used to communicate with the MongoDB database
const {connectUrl, connectLocal} = require('./../mongooseSetup');

var Schema = mongoose.Schema;

var userStatsEntry = new Schema({

  //defining extra conditions within the parameters (no need of JOI)
  username: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 20,
  },

  statsPracticeCountryScores: [Number],

  statsPracticeCountryContinent: [Number],

  statsPracticeFlagScores: [Number],

  statsPracticeFlagContinent: [Number],

  statsPracticeCapitalScores:[Number],

  statsPracticeCapitalContinent: [Number],

  statsExamCountryScores:[Number],

  statsExamCountryContinent:[Number],

  statsExamFlagScores: [Number],

  statsExamFlagContinent: [Number],

  statsExamCapitalScores: [Number],

  statsExamCapitalContinent: [Number],
});

//creating model using Schema
var UserStats = connectLocal.model('UserStats', userStatsEntry);

module.exports = UserStats;
