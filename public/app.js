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
        // ISOTOPE stop

        // get current time and minus the game timestamp.
        howLongAgo();

      }, 500);
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
      if(typeof value.points != 'undefined') {
        console.log('This value is not undefined: ' + value.points);
        totalPoints =+ value.points;
      } else {
        console.log('This value is undefined: ' + value.points + 'turning it to 0.');
        totalPoints =+ 0;
      }
    })

    $('.totalPoints span').html(totalPoints);
  }

  function howLongAgo() {
    angular.forEach($scope.games,function(value,index){

      longAgo = timeSince( value.game_date );

      console.log('Time since ' + value.game_id + ' was ' + longAgo);

      $('.' + value.game_id).html(longAgo + ' ago.');
    })
  }

  function timeSince(date) {

    var seconds = Math.floor((new Date() - date) / 1000);

    var interval = Math.floor(seconds / 31536000);

    if (interval > 1) {
        return interval + " years";
    }
    interval = Math.floor(seconds / 2592000);
    if (interval > 1) {
        return interval + " months";
    }
    interval = Math.floor(seconds / 86400);
    if (interval > 1) {
        return interval + " days";
    }
    interval = Math.floor(seconds / 3600);
    if (interval > 1) {
        return interval + " hours";
    }
    interval = Math.floor(seconds / 60);
    if (interval > 1) {
        return interval + " minutes";
    }
    return Math.floor(seconds) + " seconds";
  }
};

user.controller(controllers);
