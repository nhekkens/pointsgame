// Create Module
var user = angular.module( 'user', [ 'ngRoute' ] );

// Config route
user.config( function ($routeProvider, $locationProvider) {

  $locationProvider.html5Mode(true);

  $routeProvider
    .when('/',
      {
        controller: 'listController',
        templateUrl: 'views/index.html'
      })
    .when('/:playerId',
      {
        controller: 'playerController',
        templateUrl: 'views/player.html',

      })
    .otherwise({ redirectTo: '/' });

});

// Directives
user.directive('repeatCompleteDirective', function() {
  return function(scope, element, attrs) {
    if (scope.$last) {
      scope.$emit('ngRepeatFinished');
      console.log('ngrepeat is done, Executing.');
    }
  };
});

// Controllers
var controllers = {};

controllers.listController = function listController( $scope, $http ) {

  console.log('List Controller');

  // when landing on the page, get all Users and show them
	$http.get('/api/users')
		.success(function(data) {
			$scope.users = data;
			// console.log(data);
		})
		.error(function(data) {
			console.log('Error: ' + data);
		});

  // get new data with ajax req
  refreshData = function() {
    console.log('Retrieving new data.');
    $.ajax({
      url: "/refreshData"
    }).done(function() {
      console.log('Done')
      $( this ).addClass( "done" );
    });
  }
};

controllers.playerController = function playerController( $scope, $route, $http ) {

  console.log('Player Controller');

  var userId = $route.current.params.playerId;
  console.log(userId);

  // when landing on the page, get User and add to scope.
  $http.get('/api/users/' + userId )
    .success(function(data) {
      $scope.games = data[0].games;
      $scope.name = data[0].user_name;
      console.log(data[0].games);

      // ISOTOPE start
      setTimeout(function(){

        console.log('Isotope Init.' );
        var $isoContainer = $('.isotope');
        $isoContainer.isotope({

          itemSelector: '.game',
          layoutMode: 'masonry',
          sortAscending: false,

          getSortData: {
            minionkills: '.minion-kills parseInt',
            gold: '.gold parseInt',
            kills: '.kills parseInt',
            deaths: '.deaths parseInt',
            assits: '.assits parseInt',
            points: '.points parseInt',
            spree: '.spree parseInt'
          }

        });

        $('#filters').on( 'click', 'button', function() {
          var filterValue = $(this).attr('data-filter');
          $isoContainer.isotope({ filter: filterValue });
        });

        $('#sorts').on( 'click', 'button', function() {
          var sortByValue = $(this).attr('data-sort-by');
          $isoContainer.isotope({ sortBy: sortByValue });
        });
      }, 500);
      // ISOTOPE stop

    })
    .error(function(data) {
      console.log('Error: ' + data);
    });

  // After ngrepeat, this is will call all funcs for this page
  $scope.$on('ngRepeatFinished', function() {

    // add up all points and output
    calcPlayerPoints();
  });

  function calcPlayerPoints() {
    var totalPoints = 0;

    angular.forEach($scope.games,function(value,index){
      if(typeof value.points != 'undefined')
      console.log(value.points);
      totalPoints =+ value.points;
    })

    $('.totalPoints span').html(totalPoints);
  }
};

user.controller(controllers);
