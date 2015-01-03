app.controller('AdminAllUsersController', function($scope, adsData, $log, $http) {
	$http.defaults.headers.common['Authorization'] = "Bearer " + userSession.getCurrentUser().access_token;
	var responsePromiseTowns = $http.get("http://softuni-ads.azurewebsites.net/api/admin/users", {});
       responsePromiseTowns.success(function(dataFromServer) {
          console.log(dataFromServer);
		  $scope.users = dataFromServer;
       });
        responsePromiseTowns.error(function(data, status, headers, config) {
          alert("Submitting form failed!");
       });
});