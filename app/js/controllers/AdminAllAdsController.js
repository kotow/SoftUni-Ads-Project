app.controller('AdminAllAdsController', function($scope, adsData, $log, $http) {
	$http.defaults.headers.common['Authorization'] = "Bearer " + userSession.getCurrentUser().access_token;
	var getAds = $http.get("http://softuni-ads.azurewebsites.net/api/admin/ads", {});
		getAds.success(function(dataFromServer) {
			console.log(dataFromServer);
			$scope.data = dataFromServer;
		});
		getAds.error(function(data, status, headers, config) {
			alert("Submitting form failed!");
		});
		
	var responsePromise = $http.get("http://softuni-ads.azurewebsites.net/api/categories", {});
		responsePromise.success(function(dataFromServer) {
			console.log(dataFromServer);
			$scope.categories = dataFromServer;
		});
		responsePromise.error(function(data, status, headers, config) {
			alert("Submitting form failed!");
		});
		
	var responsePromiseTowns = $http.get("http://softuni-ads.azurewebsites.net/api/towns", {});
		responsePromiseTowns.success(function(dataFromServer) {
			console.log(dataFromServer);
			$scope.towns = dataFromServer;
		});
		responsePromiseTowns.error(function(data, status, headers, config) {
			alert("Submitting form failed!");
		});
	   
	$scope.aprove = function(id){
		console.log(id)
		aproveAd = $http.put("http://softuni-ads.azurewebsites.net/api/admin/ads/approve/"+id);
		aproveAd.success(function(dataFromServer) {
			console.log(dataFromServer);
		});
		aproveAd.error(function(data, status, headers, config) {
			alert("Submitting form failed!");
		});
	}
	
	$scope.reject = function(id){
		console.log(id)
		aproveAd = $http.put("http://softuni-ads.azurewebsites.net/api/admin/ads/reject/"+id);
		aproveAd.success(function(dataFromServer) {
			console.log(dataFromServer);
		});
		aproveAd.error(function(data, status, headers, config) {
			alert("Submitting form failed!");
		});
	}
});