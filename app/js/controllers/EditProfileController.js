app.controller('EditProfileController', function($scope, $http, $location) {
	$http.defaults.headers.common['Authorization'] = "Bearer " + userSession.getCurrentUser().access_token;
	$scope.myForm = {};
	var responsePromise = $http.get("http://softuni-ads.azurewebsites.net/api/user/profile", {});
    responsePromise.success(function(dataFromServer, status, headers, config) {
		$scope.myForm = dataFromServer;
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
	
	submitTheForm = function(item, event) {
		var responsePromisee = $http.put("http://softuni-ads.azurewebsites.net/api/user/profile", $scope.myForm, {});
		responsePromisee	.success(function(dataFromServer, status, headers, config) {
		});
		responsePromise.error(function(data, status, headers, config) {
			alert("Submitting form failed!");
		});
	}
	//var pass = {};
	changePass = function(item, event) {
	password = {
	oldPassword: $scope.pass.old,
	newPassword: $scope.pass.new,
	confirmPassword: $scope.pass.conf
	}
	
		var responsePromisee = $http.put("http://softuni-ads.azurewebsites.net/api/user/changepassword", password, {});
		responsePromisee.success(function(dataFromServer, status, headers, config) {
		});
		responsePromise.error(function(data, status, headers, config) {
			alert("Submitting form failed!");
		});
	}

});
