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

// getGames(); // Run get games and update user game data.

// ADMIN USER CONTROL

var user = {

	user_id          :  25231674,

	user_name        :  'Furnus',

	total_wins       : 0,

	total_loses      : 0,

	wins_ratio       : 0,

	average_points   : 0,

	total_games      : 0,

	average_kills    : 0,

	average_deaths   : 0,

	average_assists  : 0,

	champ_coin       : 0,

	games : [

	{ game_id: 1499737512,
  kills: 5,
  deaths: 5,
  assists: 2,
  minions: 116,
  gold: 7778,
  multi_kill: 1,
  team: 100,
  win: false,
  game_mode: 'CLASSIC',
  game_type: 'MATCHED_GAME',
  sub_game_type: 'RANKED_SOLO_5x5' }

	]
};

// { name:'Slapy', ID:'28040465' },
// { name:'Lee', ID:'19323636' },
// { name:'Inev', ID:'28187872' },
// { name:'Jaka', ID:'28138070' },
// Grim  34489178
//  'Furnus',25231674,




// Remove user
// User.remove({ user_id: 25231674 }, function (err) {});


// Create user
// User.create(user, function(err, User) {
//   if (err)
//     console.log('user exsists' + err)
// });


// Output the users
User.find(function(err, User) {
  console.log(User);
});
