app.controller('AllAdsController', function($scope, adsData, $log, $http) {
	adsData.getAll()
		.$promise
		.then(function (data) {
			$scope.data = data;
		}, function (error) {
			$log.error(error);
		})
	var responsePromise = $http.get("http://softuni-ads.azurewebsites.net/api/categories", {});
       responsePromise.success(function(dataFromServer) {
		  $scope.categories = dataFromServer;
       });
        responsePromise.error(function(data, status, headers, config) {
          alert("Submitting form failed!");
       });
	var responsePromiseTowns = $http.get("http://softuni-ads.azurewebsites.net/api/towns", {});
       responsePromiseTowns.success(function(dataFromServer) {
		  $scope.towns = dataFromServer;
       });
        responsePromiseTowns.error(function(data, status, headers, config) {
          alert("Submitting form failed!");
       });
});