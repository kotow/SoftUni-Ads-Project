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
				notifyService.showError("Failed to load users", data);
			});
	};

	$scope.reloadAds();

	$scope.myForm = {};
	
	var responsePromiseTowns = $http.get("http://softuni-ads.azurewebsites.net/api/towns", {});
	responsePromiseTowns.success(function(dataFromServer) {
		$scope.towns = dataFromServer;
	});
	responsePromiseTowns.error(function(data, status, headers, config) {
				notifyService.showError("Failed to load towns", data);
	});
	
	deleteUser = function(item, event) {
		var responsePromisee = $http.delete("http://softuni-ads.azurewebsites.net/api/admin/user/" + $routeParams.userName);
		responsePromisee.success(function(dataFromServer, status, headers, config) {
			notifyService.showInfo("User deleted successful");
			$location.path('/admin/users/list');
		console.log(dataFromServer);
		});
		responsePromise.error(function(data, status, headers, config) {
				notifyService.showError("Failed to delete user", data);
		});
	}
	
	editUserProfile = function(item, event) {
		var responsePromisee = $http.put("http://softuni-ads.azurewebsites.net/api/admin/user/"+$routeParams.userName, $scope.myForm, {});
		responsePromisee.success(function(dataFromServer, status, headers, config) {
			notifyService.showInfo("User data edited successful");
			$location.path('/admin/users/list');
			console.log(dataFromServer);
		});
		responsePromise.error(function(data, status, headers, config) {
				notifyService.showError("Failed to edit user data", data);
		});
	}
	
	changePass = function(item, event) {
		password = {
			username: $scope.myForm.username,
			newPassword: $scope.pass.new,
			confirmPassword: $scope.pass.conf
		};

		var responsePromisee = $http.put("http://softuni-ads.azurewebsites.net/api/admin/setpassword", password);
		responsePromisee.success(function(dataFromServer, status, headers, config) {
			notifyService.showInfo("Password edited successful");
			$location.path('/admin/users/list');
		});
		responsePromise.error(function(data, status, headers, config) {
				notifyService.showError("Failed to change user password", data);
		});
	}

});