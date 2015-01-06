app.controller('AdminAllCategoriesController', function($scope, adsData, $log, $http) {
	$http.defaults.headers.common['Authorization'] = "Bearer " + userSession.getCurrentUser().access_token;
	      $scope.adsParams = {
          'startPage' : 1,
          'pageSize' : 5
      };
      $scope.reloadAds = function() {
	var getAds = $http.get("http://softuni-ads.azurewebsites.net/api/admin/categories?startPage="+ $scope.adsParams.startPage + "&pageSize="+ $scope.adsParams.pageSize);
		getAds.success(function(dataFromServer) {
			$scope.towns = dataFromServer.categories;
			$scope.ads = dataFromServer;
		});
		getAds.error(function(data, status, headers, config) {
			alert("Submitting form failed!");
		});
      };

      $scope.reloadAds();


	var responsePromiseTowns = $http.get("http://softuni-ads.azurewebsites.net/api/categories", {});
       responsePromiseTowns.success(function(dataFromServer) {
		  $scope.towns = dataFromServer;
       });
        responsePromiseTowns.error(function(data, status, headers, config) {
          alert("Submitting form failed!");
       });
});