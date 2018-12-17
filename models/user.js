var mongoose = require('mongoose'); //used to communicate with the MongoDB database
var Schema = mongoose.Schema;

var Joi = require('joi');

//creating the schema
var userSchema = new Schema({
  //defining extra conditions within the parameters (only available with JOI)
  username: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 20
  },

  password: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 30
  },

  email: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 40,
    unique: true
  },

  //No extra params (can be defined this way without JOI)
  timeStamp: {
    type: String
  }
});

//creating model using Schema
const User = mongoose.model('User', userSchema);

function validateUser(User){
  const schema = {
    username: Joi.string().min(5).max(20).required(),
    password: Joi.string().min(5).max(30).required(),
    email: Joi.string().min(5).max(40).required().email(),
    timeStamp: Joi.string()
  }

  return Joi.validate(User, schema);
}

//make the model available in other files
exports.User = User;
exports.validate = validateUser;
