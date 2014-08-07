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
  app.engine('html', require('ejs').renderFile);
});

// app.get('*', function(req, res) {
//
//     app.render('/index', function(err, html){
//     });
//
// });

// listen (start app with node server.js) ======================================
app.listen(8080);
console.log("App listening on port 8080");



// handle querys CRUD
app.get('/api/users', function(req, res) {

	User.find(function(err, users) {

		if (err)
			res.send(err)

		res.json(users);
	});
});

// create user and send back all users after creation
app.post('/api/users', function(req, res) {

	// create a user, information comes from AJAX request from Angular
	User.create({
		text : req.body.text,
		done : false
	}, function(err, user) {
		if (err)
			res.send(err);

		// get and return all the users after you create another
		User.find(function(err, users) {
			if (err)
				res.send(err)
			res.json(users);
		});
	});

});

// delete a user
app.delete('/api/users/:user_id', function(req, res) {
	User.remove({
		_id : req.params.user_id
	}, function(err, user) {
		if (err)
			res.send(err);

		// get and return all the users after you create another
		User.find(function(err, users) {
			if (err)
				res.send(err)
			res.json(users);
		});
	});
});
// USERS MONGOOSE STUFF =================STOP===================



// getGames(); // Run get games and update user game data.
