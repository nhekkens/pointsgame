var User     = require("./user");

// ADMIN USER CONTROL

var Slapy = {
  user_id          :  28040465,
  user_name        :  'Slapy',
  games : []
};

var Lee = {
  user_id          :  19323636,
  user_name        :  'Lee',
  games : []
};

var Inev = {
  user_id          :  28187872,
  user_name        :  'Inev',
  games : []
};

var Jaka = {
  user_id          :  28138070,
  user_name        :  'Jaka',
  games : []
};

var Grim = {
  user_id          :  19074041,
  user_name        :  'Grim',
  games : []
};

var Furnus = {
  user_id          :  25231674,
  user_name        :  'Furnus',
  games : []
};

var Terrance = {
  user_id          :  24480384,
  user_name        :  'Terrance',
  games : []
};

var Cortex = {
  user_id          :  28375567,
  user_name        :  'Cortex',
  games : []
};

var BarbarianBeefHQ = {
  user_id          :  30170513,
  user_name        :  'BarbarianBeefHQ',
  games : []
};

var BarbarianDuitsHQ = {
  user_id          :  29206175,
  user_name        :  'BarbarianDuitsHQ',
  games : []
};

var sioux51 = {
  user_id          :  27885241,
  user_name        :  'sioux51',
  games : []
};






// Remove user =================================================================
// User.remove({ user_id: 28040465 }, function (err) {
//   console.log('Slapy Removed.');
// }); //Slapy
// User.remove({ user_id: 19323636 }, function (err) {
//   console.log('Lee Removed.');
// }); //Lee
// User.remove({ user_id: 28187872 }, function (err) {
//   console.log('Inev Removed.');
// }); //Inev
// User.remove({ user_id: 28138070 }, function (err) {
//   console.log('Jaka Removed.');
// }); //Jaka
// User.remove({ user_id: 19074041 }, function (err) {
//   console.log('Grim Removed.');
// }); //Grim
// User.remove({ user_id: 25231674 }, function (err) {
//   console.log('Furnus Removed.');
// }); //Furnus
// User.remove({ user_id: 24480384 }, function (err) {
//   console.log('Terrance Removed.');
// }); //Terrance
// User.remove({ user_id: 28375567 }, function (err) {
//   console.log('Terrance Removed.');
// }); //Cortex
// // User.remove({ user_id: 30170513 }, function (err) {
//   console.log('BarbarianBeefHQ Removed.');
// }); //Cortex
// // User.remove({ user_id: 29206175 }, function (err) {
//   console.log('BarbarianDuitsHQ Removed.');
// }); //Cortex
// // User.remove({ user_id: 27885241 }, function (err) {
//   console.log('sioux51 Removed.');
// }); //Cortex

// Create user =================================================================
// User.create(Slapy, function(err, User) {
//     console.log('Slapy Created');
// });
// User.create(Lee, function(err, User) {
//     console.log('Lee Created');
// });
// User.create(Inev, function(err, User) {
//     console.log('Inev Created');
// });
// User.create(Jaka, function(err, User) {
//     console.log('Jaka Created');
// });
// User.create(Grim, function(err, User) {
//     console.log('Grim Created');
// });
// User.create(Furnus, function(err, User) {
//     console.log('Furnus Created');
// });
// User.create(Terrance, function(err, User) {
//     console.log('Terrance Created');
// });
// User.create(Cortex, function(err, User) {
//     console.log('Cortex Created');
// });
User.create(BarbarianBeefHQ, function(err, User) {
    console.log('BarbarianBeefHQ Created');
});
User.create(BarbarianDuitsHQ, function(err, User) {
    console.log('BarbarianDuitsHQ Created');
});
User.create(sioux51, function(err, User) {
    console.log('sioux51 Created');
});

// Output the users=============================================================
// User.find(function(err, User) {
//   console.log(User);
// });
