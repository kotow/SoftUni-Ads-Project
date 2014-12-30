app.controller('DeleteAdController', function($scope, adsData, $log, $http, $routeParams) {
	adsData.getById(226)
		.$promise
		.then(function (data) {
			$scope.ad = data;
			console.log(data);
		}, function (error) {
			$log.error(error);
		});
});