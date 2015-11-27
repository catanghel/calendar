/*global $, _, moment*/
(function() {
  'use strict';

  angular.module('clientApp').controller('CalendarCtrl', function ($scope, Calendar, CalendarEvent, Socket) {

    $scope.calendars = [];
    $scope.events = [];
    $scope.calendar = '';

    Socket.on('message', function (msg) {
      console.log(msg);
    });

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
        var eventDate = moment(e.start);
        var month = eventDate.month();
        var year = eventDate.year();
        return month === $scope.month.month() && year === $scope.month.year();
      });

      $('.event').remove();

      _.each(eventsThisMonth, function(e) {
        var dayOfMonth;
        if (e) {
          dayOfMonth = moment(e.start).date();
          day = $('[data-day=' + dayOfMonth + ']').find('.events-container');
          day.empty();
          day.append('<li class="event">' + e.title + '</li>');
        }
      });
    };

    function getEvents(calendars) {
      $scope.calendars = calendars;
      if (calendars.length) {
        $scope.onCalendarSelect($scope.calendars[0]._id);
      }
    }

    Socket.on('calendar', function (msg) {
      console.log(msg);
      Calendar.getList().then(function(calendars) {
        $scope.calendars = calendars;
      });
    });


    Calendar.getList().then(getEvents);

  });
})();
