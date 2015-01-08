app.controller('AdminUsersController', function($scope, $log, $http, $routeParams) {
	$http.defaults.headers.common['Authorization'] = "Bearer " + userSession.getCurrentUser().access_token;	
	$scope.adsParams = {
		'startPage' : 1,
		'pageSize' : 20
	};
	
	$scope.reloadAds = function() {
		var getAds = $http.get("http://softuni-ads.azurewebsites.net/api/admin/users?", {params: $scope.adsParams})
			.success(function(dataFromServer) {
				$scope.users = dataFromServer;
				$scope.ads = dataFromServer;
			})
			.error(function(data, status, headers, config) {
				alert("Submitting form failed!");
			});
	};

	$scope.reloadAds();

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
	
	deleteUser = function(item, event) {
		var responsePromisee = $http.delete("http://softuni-ads.azurewebsites.net/api/admin/user/" + $routeParams.userName);
		responsePromisee.success(function(dataFromServer, status, headers, config) {
		console.log(dataFromServer);
		});
		responsePromise.error(function(data, status, headers, config) {
			alert("Submitting form failed!");
		});
	}
	
	editUserProfile = function(item, event) {
		var responsePromisee = $http.put("http://softuni-ads.azurewebsites.net/api/admin/user/"+$routeParams.userName, $scope.myForm, {});
		responsePromisee.success(function(dataFromServer, status, headers, config) {
			console.log(dataFromServer);
		});
		responsePromise.error(function(data, status, headers, config) {
			alert("Submitting form failed!");
		});
	}
	
	changePass = function(item, event) {
	password = {
	username: $scope.myForm.username,
	newPassword: $scope.pass.new,
	confirmPassword: $scope.pass.conf
	}
	
		var responsePromisee = $http.put("http://softuni-ads.azurewebsites.net/api/admin/setpassword", password);
		responsePromisee.success(function(dataFromServer, status, headers, config) {
		});
		responsePromise.error(function(data, status, headers, config) {
			alert("Submitting form failed!");
		});
	}

});