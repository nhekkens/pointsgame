var express  = require('express');
var app      = express(); 								// create our app w/ express
var https     = require("https");
var Game     = require("./game");
var User     = require("./user");
var bodyParser = require('body-parser')

// parse application/json
app.use(bodyParser.json())


// START
var getGames = function() {

  // 1. define Games var where all raw data will start in
  var playerGames = [];

  // 2. get users and send each user_id to getRecent.
  User.find(function(err, User) {
    // console.log(User);

    for (var i in User) {
      getRecent(User[i].user_id);
    }
  });

  // 3. Get user data and add it to player games.
  var getRecent = function( user_id ) {

    var lol_apiKey = '43b8a50b-cdba-4dfb-b9af-ad4d0c10aa26';

    https.get('https://euw.api.pvp.net/api/lol/euw/v1.3/game/by-summoner/' + user_id + '/recent?api_key=' + lol_apiKey, function(req, res) {

      console.log(req.body);
      // playerGames.push(res.body);

    }).on('error', function(e) {
      console.log("Got error: " + e.message);
    });

  }

  // console.log(playerGames);

};
// END


// export to server js
module.exports = getGames;
