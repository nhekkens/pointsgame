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
    .when('/:playerId',
      {
        controller: 'playerController',
        templateUrl: 'views/player.html',

        resolve: {
          playerRecent: function(Restangular, $route){
            return Restangular.one( $route.current.params.playerId , 'recent').get();
          }
        }
      })
    .otherwise({ redirectTo: '/' });

    // https://euw.api.pvp.net/api/lol/euw/v1.3/game/by-summoner/28187872/recent?api_key=43b8a50b-cdba-4dfb-b9af-ad4d0c10aa26
    RestangularProvider.setBaseUrl('https://euw.api.pvp.net/api/lol/euw/v1.3/game/by-summoner/');

    RestangularProvider.setDefaultRequestParams({ 'api_key': '43b8a50b-cdba-4dfb-b9af-ad4d0c10aa26' })

});

var players = [

  { name:'Slapy', ID:'28040465' },
  { name:'Lee', ID:'19323636' },
  { name:'Inev', ID:'28187872' },
  { name:'Jaka', ID:'28138070' },

];

// Controllers
var controllers = {};

controllers.listController = function listController( $scope, Restangular ) {

      $scope.players = players;

};

controllers.loginController = function listController( $scope, Restangular ) {

      $scope.players = players;

};


controllers.playerController = function playerController( $scope, Restangular, playerRecent ) {

    $scope.games = playerRecent.games;

    // $scope.stats = playerStats;

    _.each($scope.games, function(element, index, list) {
      console.log('Loop: ' + index + ' element: ' + element);
    })
};

user.controller(controllers);
