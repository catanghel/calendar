(function() {
	'use strict';

	angular.module('clientApp').controller('CalendarFormCtrl', function ($scope, $uibModalInstance, Calendar, calendarId) {

		$scope.calendar = {};
		$scope.isEditMode = false;
		$scope.isConfirmScreen = false;

		if (calendarId) {
			$scope.isEditMode = true;
			Calendar.one(calendarId).get().then(function(calendar) {
				$scope.calendar = calendar;
			});
		}

		function closeModal() {
			$uibModalInstance.close($scope.calendar);
		}

		$scope.save = function () {
			if ($scope.isEditMode) {
				$scope.calendar.save().then(closeModal);
			} else {
				Calendar.post($scope.calendar).then(closeModal);
			}
		};

		$scope.delete = function () {
			$scope.calendar.remove().then(closeModal);
		};

		$scope.cancel = function () {
			$uibModalInstance.dismiss('cancel');
		};

	});

})();