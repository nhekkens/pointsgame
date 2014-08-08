// Create Module
var user = angular.module( 'user', [ 'ngRoute', 'restangular' ] );

// Config route
user.config( function ($routeProvider, $locationProvider, RestangularProvider) {

  $locationProvider.html5Mode(true);

  $routeProvider
    .when('/',
      {
        controller: 'listController',
        templateUrl: 'views/index.html'
      })
    .when('/login',
      {
        controller: 'loginController',
        templateUrl: 'views/login.html'
      })
    .when('/league',
      {
        controller: 'leagueController',
        templateUrl: 'views/league.html'
      })
    .when('/:playerId',
      {
        controller: 'playerController',
        templateUrl: 'views/player.html',

      })
    .otherwise({ redirectTo: '/' });

});

// Controllers
var controllers = {};

controllers.listController = function listController( $scope, $http ) {

  // when landing on the page, get all Users and show them
	$http.get('/api/users')
		.success(function(data) {
			$scope.users = data;
			// console.log(data);
		})
		.error(function(data) {
			console.log('Error: ' + data);
		});
};

controllers.loginController = function leagueController( $scope ) {

  $scope.players = players;

};


controllers.playerController = function playerController( $scope, $route, $http ) {

  var userId = $route.current.params.playerId;
  console.log(userId);

  // when landing on the page, get all Users and show them
  $http.get('/api/users/' + userId )
    .success(function(data) {
      $scope.games = data[0].games;
      $scope.name = data[0].user_name;
      console.log(data[0].games);
    })
    .error(function(data) {
      console.log('Error: ' + data);
    });

};

user.controller(controllers);
