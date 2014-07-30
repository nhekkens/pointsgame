var express  = require('express');
var app      = express(); 								// create our app w/ express
var https     = require("https");
var Game     = require("./game");
var User     = require("./user");

// START
var getGames = function() {

// 3. Get user data and add it to player games.
function getRecent( user_id, user_name ) {

  var lol_apiKey = '43b8a50b-cdba-4dfb-b9af-ad4d0c10aa26';

  https.get('https://euw.api.pvp.net/api/lol/euw/v1.3/game/by-summoner/' + user_id + '/recent?api_key=' + lol_apiKey, function(res) {

    var output = '';
    var playerGames = null;

    // get chunks and add to output
    res.on('data', function(chunk) {
      output += chunk;
    });

    // once we got all chunks put output into  playergames
    res.on('end', function() {

      playerGames = JSON.parse(output);

      makeData(playerGames, user_name);

    });


  })

  .on('error', function(e) {
    console.log("Got error: " + e.message);
  });

}

// 3. Get user data and add it to player games.
function makeData( playerGames, user_name ) {

  console.log( user_name );

  for ( var i in playerGames.games ) {

    console.log( 'GAMES ID = ' + playerGames.games[i].gameId );


  }


}






















  // 1. define Games var where all raw data will start in
  var allGames = [];

  // 2. get users and send each user_id to getRecent.
  User.find(function(err, User) {
    // console.log(User);

    for (var i in User) {
      getRecent(User[i].user_id, User[i].user_name);
    }
  });



};
// END


// export to server js
module.exports = getGames;
