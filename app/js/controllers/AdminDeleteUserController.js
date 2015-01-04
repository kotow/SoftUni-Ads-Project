app.controller('AdminDeleteUserController', function($scope, $http, $location, $routeParams) {
	$http.defaults.headers.common['Authorization'] = "Bearer " + userSession.getCurrentUser().access_token;
	$scope.myForm = {};
	var responsePromise = $http.get("http://softuni-ads.azurewebsites.net/api/admin/users", {});
    responsePromise.success(function(dataFromServer, status, headers, config) {
		for(var i=0; i<dataFromServer.users.length;i++){
		if(dataFromServer.users[i].username == $routeParams.userName)
		$scope.myForm = dataFromServer.users[i];
}	});
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
	
	submitTheForm = function(item, event) {
		var responsePromisee = $http.delete("http://softuni-ads.azurewebsites.net/api/admin/user/"+$routeParams.userName);
		responsePromisee.success(function(dataFromServer, status, headers, config) {
		});
		responsePromise.error(function(data, status, headers, config) {
			alert("Submitting form failed!");
		});
	}
});
