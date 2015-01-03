app.controller('AdminAllCategoriesController', function($scope, adsData, $log, $http) {
	$http.defaults.headers.common['Authorization'] = "Bearer " + userSession.getCurrentUser().access_token;
	var responsePromiseTowns = $http.get("http://softuni-ads.azurewebsites.net/api/categories", {});
       responsePromiseTowns.success(function(dataFromServer) {
          console.log(dataFromServer);
		  $scope.towns = dataFromServer;
       });
        responsePromiseTowns.error(function(data, status, headers, config) {
          alert("Submitting form failed!");
       });
});