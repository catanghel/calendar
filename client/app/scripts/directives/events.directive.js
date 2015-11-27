/*global _*/
(function() {
  'use strict';

  angular.module('clientApp').directive('events', function () {
    return {
      restrict: 'A',
      link: function (scope, element, attrs) {
        console.log(element[0]);
        scope.$watchCollection (function(){return scope.eventsThisMonth;}, function (n, o) {

          console.dir(o);
        });

/*        scope.eventsToday = [];

        _.each(attrs.events, function(e) {
          var day = element[0].attributes['data-day'].value;
          if (e && day == e.start.day) {
            scope.eventsToday.push(e);
          }
        });*/
}
};
});

})();
