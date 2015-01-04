app.controller('PublishAgainAdController', function($scope, adsData, $log, $http, $routeParams, $location) {
	$http.defaults.headers.common['Authorization'] = "Bearer " + userSession.getCurrentUser().access_token;
	var responsePromise = $http.get("http://softuni-ads.azurewebsites.net/api/user/ads/"+$routeParams.adId, {});
        responsePromise.success(function(dataFromServer) {
		  $scope.ad = dataFromServer;
        });
        responsePromise.error(function(data, status, headers, config) {
          alert("Submitting form failed!");
        });
	$scope.publishAgain =  function(){
		var responsePromise = $http.put("http://softuni-ads.azurewebsites.net/api/user/ads/publishagain/"+$routeParams.adId, {});
        responsePromise.success(function(dataFromServer) {
         	$location.path( '/user' );
		});
        responsePromise.error(function(data, status, headers, config) {
			alert("Submitting form failed!");
		});
	}    
});
