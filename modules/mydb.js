// set up ========================
var mongoose = require('mongoose'); 					// mongoose for mongodb

// configuration =================

mongoose.connect('mongodb://nhekkens:1234abcd@proximus.modulusmongo.net:27017/uQa4rezi'); 	// connect to mongoDB database on modulus.io


module.exports = mongoose;
