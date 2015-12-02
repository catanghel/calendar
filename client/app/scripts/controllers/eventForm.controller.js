/*global moment*/
(function() {
  'use strict';

  angular.module('clientApp').controller('EventFormCtrl', function ($scope, $uibModalInstance, Calendar, CalendarEvent, eventId, calendarId, deleteEvent, calendars) {

    $scope.calendars = calendars || [];
    $scope.calendarEvent = {};
    $scope.isEditMode = false;
    $scope.isConfirmScreen = false;

    if (!$scope.calendars.length) {
      Calendar.getList().then(function(calendars) {
        $scope.calendars = calendars;
      });
    }

    if (eventId) {
      $scope.isEditMode = true;
      CalendarEvent.one(eventId).get().then(function(calendarEvent) {
        if (deleteEvent) {
          $scope.isConfirmScreen = true;
        }
        $scope.calendarEvent = calendarEvent;
        $scope.dt = moment(calendarEvent.start).format('DD MMMM YYYY');
        $scope.from = moment(calendarEvent.start);
        $scope.to = moment(calendarEvent.end);
      });
    } else {
      $scope.calendarEvent.isAllDay = true;
      $scope.calendarEvent.color = '#337ab7';
      $scope.calendarEvent.calendar = calendarId;
      $scope.dt = moment().format('DD MMMM YYYY');
      $scope.from = moment().hour(9).minute(0);
      $scope.to = moment().hour(10).minute(0);
    }

    function closeModal() {
      $uibModalInstance.close($scope.calendarEvent);
    }

    $scope.save = function () {
      var date, fromHour, toHour, fromMinute, toMinute;
      date = moment($scope.dt);
      fromHour = $scope.from.hour();
      toHour = $scope.to.hour();
      fromMinute = $scope.from.minute();
      toMinute = $scope.to.minute();

      $scope.calendarEvent.start = date.hour(fromHour).minute(fromMinute).format('x');
      $scope.calendarEvent.end = date.hour(toHour).minute(toMinute).format('x');

      if ($scope.isEditMode) {
        $scope.calendarEvent.save().then(closeModal);
      } else {
        CalendarEvent.post($scope.calendarEvent).then(closeModal);
      }
    };

    $scope.delete = function () {
      $scope.calendarEvent.remove().then(closeModal);
    };

    $scope.cancel = function () {
      $uibModalInstance.dismiss('cancel');
    };


    // date picker
    $scope.format = 'dd MMMM yyyy';
    $scope.today = function() {
      $scope.dt = moment();
    };

    $scope.status = {
      opened: false
    };
    $scope.open = function($event) {
      $scope.status.opened = true;
    };

    $scope.setDate = function(year, month, day) {
      $scope.dt = moment(year, month, day);
    };

  });

})();
