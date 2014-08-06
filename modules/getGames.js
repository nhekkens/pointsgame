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

        makeData(playerGames, user_id, user_name);

      });

    })
    .on('error', function(e) {
      console.log("Got error: " + e.message);
    });

  }

  // 3. Get user data and add it to player games.
  function makeData( playerGames, user_id, user_name ) {

    // console.log( 'Making data for user: ' + user_name );

    // loop throught the games
    for ( var i in playerGames.games ) {

      // console.log( 'GAMES ID = ' + playerGames.games[i].gameId );

      // addd data to variable
      var newPlayerGame = {

        game_id : playerGames.games[i].gameId,

        kills : playerGames.games[i].stats.championsKilled,

        deaths : playerGames.games[i].stats.numDeaths,

        assists : playerGames.games[i].stats.assists,

        minions : playerGames.games[i].stats.minionsKilled,

        gold : playerGames.games[i].stats.goldEarned,

        multi_kill : playerGames.games[i].stats.largestMultiKill,

        team : playerGames.games[i].stats.team,

        win : playerGames.games[i].stats.win,

        game_mode : playerGames.games[i].gameMode,

        game_type : playerGames.games[i].gameType,

        sub_game_type : playerGames.games[i].subType

      }

      // console.log(newPlayerGame, user_name);

      User.find({ user_id: user_id, games: { $elemMatch: { game_id: playerGames.games[i].gameId } } }, function(err, myvar) {

        // console.log(err, myvar);

        if ( myvar.lenght > 0 ) {
          console.log( 'Skipping: ' + playerGames.games[i].gameId + ' || Reason: Duplication || ' + 'User: ' + user_name );
          return
        }



        console.log( 'Adding: ' + playerGames.games[i].gameId + ' || Reason: New Data || ' + 'User: ' + user_name );
        addGame( user_id, newPlayerGame );

      } );



      // // find user and game id in db
      // User.find({ user_id: user_id },{ games: { $elemMatch: { game_id: playerGames.games[i].gameId } } } ).exec(function (err, user) {
      //
      //   // If user exsists skip this game
      //   if ( user ) {
      //     console.log( 'Skipping: ' + playerGames.games[i].gameId + ' || Reason: Duplication || ' + 'User: ' + user_name );
      //     console.log( 'User OBJECT : ' + user.games );
      //     return
      //   }
      //
      //
      //   // if user failed so adding newplayergame to DB
      //   console.log( 'Adding: ' + playerGames.games[i].gameId + ' || Reason: New Data || ' + 'User: ' + user_name );
      //   addGame( user_id, newPlayerGame );
      // })
    }
  }


  // add game to User
  function addGame( user_id, newPlayerGame ) {

    User.update({ user_id : user_id }, {$push: { games : newPlayerGame }}, function(err, User) {

      if (err)
        console.log('ERROR: ' + err)

    });
  }

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
