app.controller('PublishNewAd', function($scope, $http) {
	$scope.myForm = {};
    $scope.myForm.submitTheForm = function(item, event) {
		console.log($scope.myForm);
		$http.defaults.headers.common['Authorization'] = "Bearer " + userSession.getCurrentUser().access_token;
		var dataObject = {
			title: $scope.myForm.title,
			text:$scope.myForm.text,
			categoryId:$scope.myForm.categoryId,
			townId:$scope.myForm.townId
		};
		var responsePromise = $http.post("http://softuni-ads.azurewebsites.net/api/user/ads", dataObject, {}); 
		responsePromise.success(function(dataFromServer, status, headers, config) {
			console.log(dataFromServer);
		});
		responsePromise.error(function(data, status, headers, config) {
			alert("Submitting form failed!");
		});
	}
	
	var responsePromise = $http.get("http://softuni-ads.azurewebsites.net/api/categories", {});
	responsePromise.success(function(dataFromServer) {
		console.log(dataFromServer);
		$scope.categories = dataFromServer;
	});
	responsePromise.error(function(data, status, headers, config) {
		alert("Submitting form failed!");
	});
		
	var responsePromiseTowns = $http.get("http://softuni-ads.azurewebsites.net/api/towns", {});
	responsePromiseTowns.success(function(dataFromServer) {
		console.log(dataFromServer);
		$scope.towns = dataFromServer;
	});
	responsePromiseTowns.error(function(data, status, headers, config) {
          alert("Submitting form failed!");
	});
});