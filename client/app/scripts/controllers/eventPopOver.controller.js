(function() {
  'use strict';

  angular.module('clientApp').controller('EventPopOverCtrl', function ($scope, CalendarEvent, Calendar, $uibModal) {

    $scope.calendarEvent = {};
    $scope.calendar = {};

    $scope.eventPopOver = {
      isOpen: false,
      templateUrl: 'templates/eventPopOver.tpl.html',
      placement: 'top',
      open: function(id) {
        CalendarEvent.one(id).get().then(function(calendarEvent) {
          $scope.calendarEvent = calendarEvent;
          Calendar.one($scope.calendarEvent.calendar).get().then(function(calendar) {
            $scope.calendar = calendar;
            $scope.eventPopOver.isOpen = true;
          });
        });
      },
      close: function() {
        $scope.eventPopOver.isOpen = false;
      }
    };

    $scope.openEventModal = function(id, deleteEvent) {
      $scope.eventPopOver.isOpen = false;
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
          deleteEvent: function (){
            return deleteEvent;
          },
          calendars: function () {
            return $scope.calendars;
          }
        }
      });
    };

  });
})();
