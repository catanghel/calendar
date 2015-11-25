/*global $, _*/
(function() {
  'use strict';

  angular.module('clientApp').controller('CalendarCtrl', function ($scope, Calendar, CalendarEvent) {
    var day;

    $scope.calendars = [];
    $scope.events = [];
    $scope.calendar = '';

    $scope.onCalendarSelect = function (id) {
      $scope.calendar = id;
      CalendarEvent.getList({calendar: $scope.calendar}).then($scope.populate);
    };

    $scope.populate = function(events) {
      var eventsThisMonth;
      if (events) {
        $scope.events = events;
      }

      eventsThisMonth = _.filter($scope.events, function(e) {
        return e.start.month === $scope.month.month() && e.start.year === $scope.month.year();
      });

      $('.event').remove();

      _.each(eventsThisMonth, function(e) {
        if (e) {
          day = $('[data-day=' + e.start.day + ']').find('.events-container');
          day.empty();
          day.append('<li class="event">' + e.title + '</li>');
        }
      });
    };

    function getCalendars(calendars) {
      $scope.calendars = calendars;
      $scope.calendar = $scope.calendars[0]._id;
      CalendarEvent.getList({calendar: $scope.calendar}).then($scope.populate);
    }

    Calendar.getList().then(getCalendars);
  });
})();
