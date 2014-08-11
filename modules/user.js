var mongoosedb = require('./mydb');

var userGames = new  mongoosedb.Schema({

  game_id : Number,

  kills : Number,

  deaths : Number,

  assists : Number,

  minions : Number,

  gold : Number,

  multi_kill : Number,

  team : Number,

  win : Boolean,

  game_mode : String,

  game_type : String,

  sub_game_type : String,

  game_date : Number,

  points : Number,

  champion : Number,

  spree : Number

});


var userSchema = new mongoosedb.Schema({

  user_id          :  { type:Number, unique: true },

  user_name        :  { type:String, unique: true },

  games            : [userGames]

});

// Compile a 'User' model using the userSchema as the structure.
var User = mongoosedb.model('User', userSchema, null, false );

// export to server js
module.exports = User;
