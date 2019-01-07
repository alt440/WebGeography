var mongoose = require('mongoose');

//(Focus on This Variable)
var url = "mongodb://perS0nADm1N:"+encodeURIComponent("*geo@P0w3r3d*")+"@ds155097.mlab.com:55097/web_geography";

//this is the local DB url. No authentication required
var local_url = "mongodb://127.0.0.1:27017/web_geography";

var conn = mongoose.createConnection(url, {useNewUrlParser: true});
var conn2 = mongoose.createConnection(local_url);

module.exports.connectUrl = conn;
module.exports.connectLocal = conn2;
