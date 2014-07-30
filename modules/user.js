var mongoosedb = require('./mydb');

var userGames = new  mongoosedb.Schema({

  game_id : { type:String, unique: true },

  kills : Number,

  deaths : Number,

  assists : Number,

  minions : Number,

  gold : Number,

});


var userSchema = new mongoosedb.Schema({

  user_id          : Number,

  user_name        : String,

  total_wins       : Number,

  total_loses      : Number,

  wins_ratio       : Number,

  average_points   : Number,

  total_games      : Number,

  average_kills    : Number,

  average_deaths   : Number,

  average_assists  : Number,

  champ_coin       : Number,

  games            : [userGames]

});

// Compile a 'User' model using the userSchema as the structure.
var User = mongoosedb.model('User', userSchema);

// export to server js
module.exports = User;
