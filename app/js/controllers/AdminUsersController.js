app.controller('AdminUsersController', function($scope, $location, $routeParams, notifyService, adminData, publicData, $http) {
	$scope.adsParams = {
		'startPage' : 1,
		'pageSize' : 20
	};
	
	$scope.reloadAds = function() {
		adminData.getUsers($scope.adsParams)
		.success(function(dataFromServer) {
			$scope.users = dataFromServer;
			$scope.ads = dataFromServer;
		})
		.error(function(data, status, headers, config) {
			notifyService.showError("Failed to load users", data);
		});
	};

	$scope.reloadAds();

	$scope.myForm = {};
	
	publicData.getTowns()
	.success(function(dataFromServer) {
		$scope.towns = dataFromServer;
	})
	.error(function(data) {
		notifyService.showError("Failed to load towns", data);
	});
	
	deleteUser = function(item, event) {
		adminData.deleteUser($routeParams.userName)
		.success(function(dataFromServer) {
			notifyService.showInfo("User deleted successful");
			$location.path('/admin/users/list');
		})
		.error(function(data, status, headers, config) {
				notifyService.showError("Failed to delete user", data);
		});
	}
	
	if($routeParams.userName){
	/*
		adminData.getUserById($routeParams.userName)
		.success(function(dataFromServer) {
			$scope.myForm = dataFromServer;
		})
		.error(function(data, status, headers, config) {
			notifyService.showError("Failed to load user", data);
		});
	*/
	var responsePromise = $http.get("http://softuni-ads.azurewebsites.net/api/admin/users", {params: {pagesize: 1000}});
    responsePromise.success(function(dataFromServer, status, headers, config) {
		for(var i=0; i<dataFromServer.users.length;i++){
		if(dataFromServer.users[i].username == $routeParams.userName)
		$scope.myForm = dataFromServer.users[i];
}	});
}
	editUserProfile = function(item, event) {
		adminData.editUserProfile($routeParams.userName, $scope.myForm)
		.success(function(dataFromServer, status, headers, config) {
			notifyService.showInfo("User data edited successful");
			$location.path('/admin/users/list');
		})
		.error(function(data, status, headers, config) {
			notifyService.showError("Failed to edit user data", data);
		});
	}
	
	changePass = function(item, event) {
		password = {
			username: $scope.myForm.username,
			newPassword: $scope.pass.new,
			confirmPassword: $scope.pass.conf
		};

		adminData.changeUserPassword(password)
		.success(function(dataFromServer) {
			notifyService.showInfo("Password edited successful");
			$location.path('/admin/users/list');
		})
		.error(function(data, status, headers, config) {
			notifyService.showError("Failed to change user password", data);
		});
	}

});