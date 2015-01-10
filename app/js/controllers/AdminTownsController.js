app.controller('AdminTownsController', function($scope, $routeParams, $location, notifyService, adminData, publicData) {	

	$scope.adsParams = {
		'startPage' : 1,
		'pageSize' : 5
	};
    $scope.reloadAds = function() {
		adminData.getTowns($scope.adsParams)
		.success(function(dataFromServer) {
			$scope.towns = dataFromServer.towns;
			$scope.ads = dataFromServer;
		})
		.error(function(data, status, headers, config) {
			notifyService.showError("Failed to load towns", data);
		});
	};

	$scope.reloadAds();
if($routeParams.townId != undefined){
	publicData.getTowns()
	.success(function(dataFromServer) {
		for(var i=0;i<dataFromServer.length;i++){
			if(dataFromServer[i].id == $routeParams.townId){
				$scope.town = dataFromServer[i];
			}
		}
	  });
}/*		
	if($routeParams.townId != undefined){
		adminData.getTownById($routeParams.townId)
		.success(function(dataFromServer) {
			$scope.town = dataFromServer;
		})
		.error(function(data, status, headers, config) {
			notifyService.showError("Failed to load town", data);
		});
	}
	*/
	deleteTown = function(){
		adminData.deleteTown($routeParams.townId)
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
		adminData.createTown(town)
        .success(function(dataFromServer) {
			notifyService.showInfo("Town created successful");
         	$location.path( '/admin/towns/list' );
		})
        .error(function(data) {
			notifyService.showError("Failed to create town", data);
		});
	};   
	
	editTown = function(){
		var town = {
			name:$scope.town.name
		};
		adminData.editTown($routeParams.townId, town)
		.success(function(dataFromServer) {
			notifyService.showInfo("Town edited successful");
			$location.path( '/admin/towns/list' );
		})
        .error(function(data, status, headers, config) {
			notifyService.showError("Failed to edit town", data);
		});
	}    

});
