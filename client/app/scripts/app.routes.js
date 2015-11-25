(function() {
  'use strict';

  angular.module('clientApp')
  .config(function ($routeProvider, RestangularProvider) {

    RestangularProvider.setBaseUrl('http://localhost:3000/api/');

    $routeProvider
    .when('/calendar', {
      templateUrl: 'views/calendar.html',
      controller: 'CalendarCtrl',
      controllerAs: 'calendar'
    })
    .otherwise({
      redirectTo: '/calendar'
    });
  });
})();
