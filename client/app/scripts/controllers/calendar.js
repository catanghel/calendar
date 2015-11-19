'use strict';

/**
 * @ngdoc function
 * @name clientApp.controller:CalendarCtrl
 * @description
 * # CalendarCtrl
 * Controller of the clientApp
 */
angular.module('clientApp')
  .controller('CalendarCtrl', function ($scope, CalendarEvent) {
    var i, event, day;

    // just testing restangular and node-restful with parameters
    $scope.events = [];
    //$scope.currentMonth = $scope.month.month();
    $scope.calendar = '564d8f861e3dcf101db271af';

    $scope.populate = function(events) {
      var eventsThisMonth;
      if (events) {
        $scope.events = events;
      }

      eventsThisMonth = _.filter($scope.events, function(e) {
        console.log(e);
        return e.start.month === $scope.month.month() && e.start.year === $scope.month.year();
      });

      _.each(eventsThisMonth, function(e, k) {
        if (e) {
          day = $('[data-day=' + e.start.day + ']').find('.events-container');
          day.append('<li class="event">' + e.title + '</li>');
        }
      });
    }

    CalendarEvent.getList({calendar: $scope.calendar}).then($scope.populate);


  });
