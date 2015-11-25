/*global moment*/
(function() {
  'use strict';

  angular.module('clientApp').directive('calendar', function () {
    return {
      templateUrl: 'templates/calendar.html',
      restrict: 'A',
      link: function(scope) {
        var start;

        function reset(date) {
          return date.hour(0).minute(0).second(0).millisecond(0);
        }

        function buildMonth(scope, start, month) {
          var done = false,
          date = start.clone(),
          monthIndex = date.month(),
          dayOfWeek = date.day(),
          count = 0;

          if (dayOfWeek !== 0) {
            date.subtract(dayOfWeek, 'days');
          }

          scope.weeks = [];
          while (!done) {
            scope.weeks.push({ days: buildWeek(date.clone(), month) });
            date.add(1, 'w');
            done = count++ > 2 && monthIndex !== date.month();
            monthIndex = date.month();
          }
        }

        function buildWeek(date, month) {
          var days = [];
          var i;

          for (i = 0; i < 7; i++) {
            days.push({
              name: date.format('dd').substring(0, 1),
              number: date.date(),
              month: month.month(),
              isCurrentMonth: date.month() === month.month(),
              isToday: date.isSame(new Date(), 'day'),
              date: date
            });
            date = date.clone();
            date.add(1, 'd');
          }
          return days;
        }

        scope.selected = reset(scope.selected || moment());
        scope.month = scope.selected.clone();

        start = scope.selected.clone();
        start.date(1);
        reset(start.day(0));

        buildMonth(scope, start, scope.month);

        scope.select = function(day) {
          scope.selected = day.date;
        };

        scope.next = function() {
          var next = scope.month.clone();

          reset(next.month(next.month()+1).date(1));
          scope.month.month(scope.month.month()+1);
          buildMonth(scope, next, scope.month);
          setTimeout(scope.populate, 100);
        };

        scope.previous = function() {
          var previous = scope.month.clone();

          reset(previous.month(previous.month()-1).date(1));
          scope.month.month(scope.month.month()-1);
          buildMonth(scope, previous, scope.month);
          setTimeout(scope.populate, 100);
        };

      }
    };
  });
})();
