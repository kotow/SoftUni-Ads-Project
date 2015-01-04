app.controller('AdminDeleteAdController', function($scope, adsData, $log, $http, $routeParams, $location) {
	$http.defaults.headers.common['Authorization'] = "Bearer " + userSession.getCurrentUser().access_token;
	var responsePromise = $http.get("http://softuni-ads.azurewebsites.net/api/admin/ads/"+$routeParams.adId, {});
        responsePromise.success(function(dataFromServer) {
          //console.log(dataFromServer);
		  $scope.town = dataFromServer;
        });
        responsePromise.error(function(data, status, headers, config) {
          alert("Submitting form failed!");
        });
	$scope.deleteAd =  function(){
		var responsePromise = $http.delete("http://softuni-ads.azurewebsites.net/api/admin/ads/"+$routeParams.adId, {});
        responsePromise.success(function(dataFromServer) {
         	$location.path( '/admin/home' );
			console.log(dataFromServer);
		});
        responsePromise.error(function(data, status, headers, config) {
			alert("Submitting form failed!");
		});
	}    
});
