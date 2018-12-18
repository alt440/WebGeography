var mongoose = require('mongoose'); //used to communicate with the MongoDB database
var Schema = mongoose.Schema;

var bcrypt = require('bcryptjs');
var Joi = require('joi');

//creating the schema
var userSchema = new Schema({
  //defining extra conditions within the parameters (no need of JOI)
  username: {
    type: String,
    required: true,
    unique: true,
    minlength: 5,
    maxlength: 20
  },

  password: {
    type: String,
    required: true,
    minlength: 5
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
  },
});

//creating model using Schema
var User = mongoose.model('User', userSchema);

module.exports.validate = function(User){
  const schema = {
    username: Joi.string().min(5).max(20).required(),
    password: Joi.string().min(5).required(),
    email: Joi.string().min(5).max(40).required().email(),
    timeStamp: Joi.string()
  }

  return Joi.validate(User, schema);
}

exports.createUser = function(newUser, callback){
	bcrypt.genSalt(10, function(err, salt) {
    	bcrypt.hash(newUser.password, salt, function(err, hash) {
   			newUser.password = hash;
   			newUser.save(callback);
    	});
	});
}

module.exports.getUserById = function(id, callback){
	User.findById(id, callback);
}

module.exports.getUserByUsername = function(username, callback){
	var query = {username: username};
	User.findOne(query, callback);
}

module.exports.comparePassword = function(candidatePassword, hash, callback){
	bcrypt.compare(candidatePassword, hash, function(err, isMatch) {
    	callback(null, isMatch);
	});
}

//make the model available in other files
module.exports.User = User;
