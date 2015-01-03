app.controller('EditAdController', function($scope, adsData, $log, $http, $routeParams, $location) {
	$http.defaults.headers.common['Authorization'] = "Bearer " + userSession.getCurrentUser().access_token;
	var responsePromise = $http.get("http://softuni-ads.azurewebsites.net/api/user/ads/"+$routeParams.adId, {});
        responsePromise.success(function(dataFromServer) {
          //console.log(dataFromServer);
		  $scope.ad = dataFromServer;
        });
        responsePromise.error(function(data, status, headers, config) {
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
$scope.editAd =  function(){
		var dataObject = {
			//imageDataUrl: $scope.ad.imageDataUrl,
			title: $scope.ad.title,
			text: $scope.ad.text,
			categoryId: $scope.ad.categoryId,
			townId: $scope.ad.townId,
		};
		var responsePromise = $http.put("http://softuni-ads.azurewebsites.net/api/user/ads/"+$routeParams.adId, dataObject);
        responsePromise.success(function(dataFromServer) {
         	//$location.path( '/user' );
			console.log(dataFromServer);
		});
        responsePromise.error(function(data, status, headers, config) {
			alert("Submitting form failed!");
		});
	}
});
