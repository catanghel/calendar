'use strict';

/**
 * @ngdoc service
 * @name clientApp.CalendarEventRestangular
 * @description
 * # CalendarEventRestangular
 * Factory in the clientApp.
 */
angular.module('clientApp')
  .factory('CalendarEventRestangular', function (Restangular) {

    return Restangular.withConfig(function(RestangularConfigurer) {
      RestangularConfigurer.setRestangularFields({
        id: '_id'
      });
    });
  })
  .factory('CalendarEvent', function(CalendarEventRestangular) {

    return CalendarEventRestangular.service('events');
  });
