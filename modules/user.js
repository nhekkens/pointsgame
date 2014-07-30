var mongoosedb = require('./mydb');

var userSchema = new mongoosedb.Schema({

  user_id :  Number,

  user_name:  String,

  total_wins : Number,

  total_loses : Number,

  wins_ratio : Number,

  average_points : Number,

  total_games : Number,

  average_kills : Number,

  average_deaths : Number,

  average_assists : Number,

  champ_coin : Number

});

// Compile a 'User' model using the userSchema as the structure.
var User = mongoosedb.model('User', userSchema);

// export to server js
module.exports = User;
