// set up ========================
var express  = require('express');
var app      = express(); 								// create our app w/ express
var https     = require("https");

var Game     = require("./modules/game");
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




// handle querys CRUD
app.get('/api/games', function(req, res) {

  Game.find(function(err, games) {

    if (err)
      res.send(err)

    res.json(games);
  });
});

// create user and send back all games after creation
app.post('/api/games', function(req, res) {

  // create a user, information comes from AJAX request from Angular
  Game.create({
    text : req.body.text,
    done : false
  }, function(err, game) {
    if (err)
      res.send(err);

    // get and return all the games after you create another
    Game.find(function(err, games) {
      if (err)
        res.send(err)
      res.json(games);
    });
  });

});

// delete a game
app.delete('/api/games/:game_id', function(req, res) {
  Game.remove({
    _id : req.params.user_id
  }, function(err, game) {
    if (err)
      res.send(err);

    // get and return all the games after you create another
    Game.find(function(err, games) {
      if (err)
        res.send(err)
      res.json(games);
    });
  });
});

// GAMES MONGOOSE STUFF =================STOP===================


// LOL API GET USER DATA


    // https://euw.api.pvp.net/api/lol/euw/v1.3/game/by-summoner/28187872/recent?api_key=



var getRecent = function( user_id ) {

  var lol_apiKey = '43b8a50b-cdba-4dfb-b9af-ad4d0c10aa26';

  https.get('https://euw.api.pvp.net/api/lol/euw/v1.3/game/by-summoner/' + user_id + '/recent?api_key=' + lol_apiKey, function(res) {

    console.log("Got response: " + res.statusCode);

    console.log("res: " + res);

  }).on('error', function(e) {
    console.log("Got error: " + e.message);
  });

}


// getRecent(28187872);


getGames();




var slapy = {

  user_id : 28187872,

  user_name: 'Inev',

  total_wins : 0,

  total_loses : 0,

  wins_ratio : 0,

  average_points : 0,

  total_games : 0,

  average_kills : 0,

  average_deaths : 0,

  average_assists : 0,

  champ_coin : 0

};



// { name:'Slapy', ID:'28040465' },
// { name:'Lee', ID:'19323636' },
// { name:'Inev', ID:'28187872' },
// { name:'Jaka', ID:'28138070' },



// User.remove({ user_id: 28187872 }, function (err) {});

// User.create(slapy, function(err, User) {
//   if (err)
//     console.log('user exsists' + err)
// });

// User.find(function(err, User) {
//   console.log(User);
//
//
// });







// Get all game data ( for loop for each user then retrieve recent games from lol api.)

// get latest game in games then check the data for the game id. from there we will continue

// Build the latest game , getting all data for each player and making a game table.

// Insert the latest game into the Mongo database.

// after inserting new game into mongo, add thsi new data to each user account. updating there averages. and blal bla bla.

// do this every hour


// Set up Mongoose table schemas for user and game data.
