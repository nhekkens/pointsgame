// set up ========================
var mongoose = require('mongoose'); 					// mongoose for mongodb

// configuration =================

mongoose.connect('mongodb://nhekkens:zsefvf3eywhd4@novus.modulusmongo.net:27017/a5wYhavy'); 	// connect to mongoDB database on modulus.io


module.exports = mongoose;
