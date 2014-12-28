app.controller('UserAdsController', function($scope, adsData, $log, $http) {
	   $http.defaults.headers.common['Authorization'] = "Bearer " + userSession.getCurrentUser().access_token;
	var responsePromise = $http.get("http://softuni-ads.azurewebsites.net/api/user/ads", {});
       responsePromise.success(function(dataFromServer) {
          console.log(dataFromServer);
		  $scope.data = dataFromServer;
       });
        responsePromise.error(function(data, status, headers, config) {
          alert("Submitting form failed!");
       });
});