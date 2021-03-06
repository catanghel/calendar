/*global $, _, moment*/
(function() {
  'use strict';

  angular.module('clientApp').controller('CalendarCtrl', function ($scope, $compile, Calendar, CalendarEvent, Socket, $uibModal) {

    $scope.calendars = [];
    $scope.events = [];
    $scope.calendar = {};

    function getCalendars(calendars) {
      $scope.calendars = calendars;
      if (calendars.length) {
        $scope.calendar = calendars[0]._id;
        $scope.onCalendarSelect();
      }
    }

    function addEvent(e) {
      var dayOfMonth, days, day, eventString, eventsContainer;
      if (!e) {
        return;
      }
      dayOfMonth = moment(e.start).date();
      days = $('[data-day=' + dayOfMonth + ']');

      if (days.length > 1) {
        if (dayOfMonth < 10 ) {
          day = $(days[0]);
        } else {
          day = $(days[1]);
        }
      } else {
        day = $(days[0]);
      }

      eventsContainer = day.find('.events-container');
      eventString = '<li class="event" style="border: 1px solid ' + e.color + '"> ' +
      '<a ng-controller="EventPopOverCtrl" ';
      if (day.parent().is(':first-child')) {
        eventString += 'popover-placement="bottom" ';
      } else if(day.is(':last-child')) {
        eventString += 'popover-placement="left" ';
      }
      eventString += 'popover-is-open="eventPopOver.isOpen" ' +
      'popover-template="eventPopOver.templateUrl" ' +
      'popover-trigger="none" ' +
      'ng-click="eventPopOver.open(\'' + e._id + '\')">' + e.title + '</a></li>';

      angular.element(eventsContainer).append($compile(eventString)($scope));
    }

    $scope.populate = function (events) {
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

      _.each(eventsThisMonth, addEvent);
    }


    $scope.onCalendarSelect = function () {
      CalendarEvent.getList({calendar: $scope.calendar}).then($scope.populate);
    };

    $scope.openCalendarModal = function (id) {
      $uibModal.open({
        animation: true,
        templateUrl: './templates/calendarForm.tpl.html',
        controller: 'CalendarFormCtrl',
        size: 'md',
        resolve: {
          calendarId: function () {
            return id;
          }
        }
      });
    };

    $scope.openEventModal = function (id) {
      $uibModal.open({
        animation: true,
        templateUrl: './templates/eventForm.tpl.html',
        controller: 'EventFormCtrl',
        size: 'md',
        resolve: {
          eventId: function () {
            return id;
          },
          calendarId: function () {
            return $scope.calendar;
          },
          deleteEvent: function () {
            return false;
          },
          calendars: function () {
            return $scope.calendars;
          }
        }
      });
    };

    Calendar.getList().then(getCalendars);

    Socket.on('calendar', function (msg) {
      Calendar.getList().then(getCalendars);
    });

    Socket.on('event', function (msg) {
      CalendarEvent.getList({calendar: $scope.calendar}).then($scope.populate);
    });

  });
})();
