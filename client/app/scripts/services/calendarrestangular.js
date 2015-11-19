'use strict';

/**
 * @ngdoc service
 * @name clientApp.CalendarRestangular
 * @description
 * # CalendarRestangular
 * Factory in the clientApp.
 */
angular.module('clientApp')
  .factory('CalendarRestangular', function (Restangular) {

    return Restangular.withConfig(function(RestangularConfigurer) {
      RestangularConfigurer.setRestangularFields({
        id: '_id'
      });
    });
  })
  .factory('Calendar', function(CalendarRestangular) {

    return CalendarRestangular.service('calendars');
  });
