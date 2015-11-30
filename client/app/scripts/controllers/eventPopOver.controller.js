(function() {
  'use strict';

  angular.module('clientApp').controller('EventPopOverCtrl', function ($scope, CalendarEvent, Calendar, $uibModal) {

    $scope.calendarEvent = {};
    $scope.calendar = {};
    $scope.eventDate = '-';

    $scope.eventPopOver = {
      isOpen: false,
      templateUrl: 'templates/eventPopOver.tpl.html',
      placement: 'top',
      open: function(id) {
        CalendarEvent.one(id).get().then(function(calendarEvent) {
          $scope.calendarEvent = calendarEvent;
          $scope.eventDate = moment(calendarEvent.start).format('DD MMMM YYYY');
          console.log($scope.eventDate);
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

    $scope.openEventModal = function(id) {
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
          calendars: function () {
            return $scope.calendars;
          }
        }
      });
    };

  });
})();
