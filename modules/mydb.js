// set up ========================
var mongoose = require('mongoose'); 					// mongoose for mongodb

// configuration =================

mongoose.connect('mongodb://nhekkens:PointsGame@novus.modulusmongo.net:27017/ag3ipawI'); 	// connect to mongoDB database on modulus.io


module.exports = mongoose;
