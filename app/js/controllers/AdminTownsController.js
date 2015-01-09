app.controller('AdminTownsController', function($scope, $log, $http, $routeParams, $location, notifyService) {	
	$http.defaults.headers.common['Authorization'] = "Bearer " + userSession.getCurrentUser().access_token;
	$scope.adsParams = {
		'startPage' : 1,
		'pageSize' : 5
	};
    $scope.reloadAds = function() {
	var getTowns = $http.get("http://softuni-ads.azurewebsites.net/api/admin/towns?", {params: $scope.adsParams})
		.success(function(dataFromServer) {
			$scope.towns = dataFromServer.towns;
			console.log($scope.towns);
			$scope.ads = dataFromServer;
		})
		.error(function(data, status, headers, config) {
			notifyService.showError("Failed to load towns", data);
		});
	};

	$scope.reloadAds();
	
	   	var responsePromiseTowns = $http.get("http://softuni-ads.azurewebsites.net/api/towns", {});
	responsePromiseTowns.success(function(dataFromServer) {
		for(var i=0;i<dataFromServer.length;i++){
			if(dataFromServer[i].id == $routeParams.townId){
				$scope.town = dataFromServer[i];
			}
		}
	  });
	
	deleteTown = function(){
		var responsePromise = $http.delete("http://softuni-ads.azurewebsites.net/api/admin/towns/"+$routeParams.townId)
			.success(function(dataFromServer) {
			notifyService.showInfo("Town deleted successful");
			$location.path( '/admin/towns/list' );
			})
			.error(function(data, status, headers, config) {
				notifyService.showError("Failed to delete town", data);
			});
	};    
	 
	createTown = function(){
		var town = {name:$scope.name};
		var responsePromise = $http.post("http://softuni-ads.azurewebsites.net/api/admin/towns/", town);
        responsePromise.success(function(dataFromServer) {
			notifyService.showInfo("Town created successful");
         	$location.path( '/admin/home' );
		});
        responsePromise.error(function(data, status, headers, config) {
			notifyService.showError("Failed to create town", data);
		});
	};   
	
	editTown = function(){
	var town = {
		name:$scope.town.name
	};
		var responsePromise = $http.put("http://softuni-ads.azurewebsites.net/api/admin/towns/"+$routeParams.townId, town);
		responsePromise.success(function(dataFromServer) {
			notifyService.showInfo("Town edited successful");
			$location.path( '/admin/towns/list' );
		});
        responsePromise.error(function(data, status, headers, config) {
			notifyService.showError("Failed to edit town", data);
		});
	}    

});
