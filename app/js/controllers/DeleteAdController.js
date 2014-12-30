app.controller('DeleteAdController', function($scope, adsData, $log, $http, $routeParams) {
	   $http.defaults.headers.common['Authorization'] = "Bearer " + userSession.getCurrentUser().access_token;
	var responsePromise = $http.get("http://softuni-ads.azurewebsites.net/api/user/ads/"+$routeParams.adId, {});
       responsePromise.success(function(dataFromServer) {
          //console.log(dataFromServer);
		  $scope.ad = dataFromServer;
       });
        responsePromise.error(function(data, status, headers, config) {
          alert("Submitting form failed!");
       });
});