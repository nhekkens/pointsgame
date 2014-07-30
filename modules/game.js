var mongoosedb = require('./mydb');

var gameSchema = new mongoosedb.Schema({

    game_id : Number,

    game_mode : { type: String },

    date : Number,

    players : {

      0: {

        user_id : Number,

        kills : Number,

        deaths : Number,

        assists : Number,

        multi_kills : Number,

        minion_kills : Number,

        gold : Number,

        points : Number,

      },

      1: {

        user_id : Number,

        kills : Number,

        deaths : Number,

        assists : Number,

        multi_kills : Number,

        minion_kills : Number,

        gold : Number,

        points : Number,

      },

      2: {

        user_id : Number,

        kills : Number,

        deaths : Number,

        assists : Number,

        multi_kills : Number,

        minion_kills : Number,

        gold : Number,

        points : Number,

      },

      3: {

        user_id : Number,

        kills : Number,

        deaths : Number,

        assists : Number,

        multi_kills : Number,

        minion_kills : Number,

        gold : Number,

        points : Number,

      },

      4: {

        user_id : Number,

        kills : Number,

        deaths : Number,

        assists : Number,

        multi_kills : Number,

        minion_kills : Number,

        gold : Number,

        points : Number,

      },

    }

});

// Compile a 'User' model using the userSchema as the structure.
var Game = mongoosedb.model('Game', gameSchema);


// export to server js
module.exports = Game;
