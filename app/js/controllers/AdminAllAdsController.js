app.controller('AdminAllAdsController', function($scope, adsData, $log, $http) {
	$http.defaults.headers.common['Authorization'] = "Bearer " + userSession.getCurrentUser().access_token;
	      $scope.adsParams = {
          'startPage' : 1,
          'pageSize' : 20
      };
      $scope.reloadAds = function() {
	var getAds = $http.get("http://softuni-ads.azurewebsites.net/api/admin/ads?startPage="+ $scope.adsParams.startPage + "&pageSize="+ $scope.adsParams.pageSize);
		getAds.success(function(dataFromServer) {
			$scope.data = dataFromServer;
			console.log(dataFromServer);
			console.log($scope.adsParams);
			$scope.ads = dataFromServer;
		});
		getAds.error(function(data, status, headers, config) {
			alert("Submitting form failed!");
		});
      };

      $scope.reloadAds();

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
	   
	$scope.aprove = function(id){
		aproveAd = $http.put("http://softuni-ads.azurewebsites.net/api/admin/ads/approve/"+id);
		aproveAd.success(function(dataFromServer) {
		});
		aproveAd.error(function(data, status, headers, config) {
			alert("Submitting form failed!");
		});
	}
	
	$scope.reject = function(id){
		aproveAd = $http.put("http://softuni-ads.azurewebsites.net/api/admin/ads/reject/"+id);
		aproveAd.success(function(dataFromServer) {
		});
		aproveAd.error(function(data, status, headers, config) {
			alert("Submitting form failed!");
		});
	}
});