// set up ========================
var express  = require('express');
var app      = express(); 								// create our app w/ express
var https     = require("https");

var UserControl     = require("./modules/userControl");
var User     = require("./modules/user");
var getGames     = require("./modules/getGames");

app.configure(function() {
	app.use(express.static(__dirname + '/public')); 		// set the static files location /public/img will be /img for users
	app.use(express.logger('dev')); 						// log every request to the console
	app.use(express.bodyParser()); 							// pull information from html in POST
  // app.engine('html', require('ejs').renderFile);
});

// listen (start app with node server.js) ======================================
app.listen(1337);
console.log("App listening on port 1337");


// GET users
app.get('/api/users', function(req, res) {

	User.find(function(err, users) {

		if (err)
			res.send(err)

		res.json(users);
	});
});

// GET user ID
app.get('/api/users/:user_id', function(req, res) {

	User.find({ user_id: req.params.user_id }, function(err, users) {

		console.log('Request for user: ' + req.params.user_id);

		if (err)
			res.send(err)

		res.json(users);

	})

});

// Redirect if the page is refreshed.
app.get('*', function (req, res) {
	// res.render('index');
	res.sendfile( __dirname + '/public/index.html');
});

// getGames(); // Run get games and update user game data.

// Timeout to call lol api
// var minutes = 15, the_interval = minutes * 60 * 1000;
// setInterval(function() {
//
//   console.log('Retrieving data from LOL api. This will repeat every ' + minutes + 'min.');
//
//   getGames(); // Run get games and update user game data.
//
// }, the_interval);
