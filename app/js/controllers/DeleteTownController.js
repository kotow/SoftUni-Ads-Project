app.controller('DeleteTownController', function($scope, $log, $http, $routeParams, $location) {
	$http.defaults.headers.common['Authorization'] = "Bearer " + userSession.getCurrentUser().access_token;
	var responsePromiseTowns = $http.get("http://softuni-ads.azurewebsites.net/api/towns", {});
	responsePromiseTowns.success(function(dataFromServer) {
		for(var i=0;i<dataFromServer.length;i++){
			if(dataFromServer[i].id == $routeParams.townId){
				$scope.town = dataFromServer[i];
			}
		}
	  });
	deleteTown = function(){
		var responsePromise = $http.delete("http://softuni-ads.azurewebsites.net/api/admin/towns/"+$routeParams.townId);
		responsePromise.success(function(dataFromServer) {
			$location.path( '/admin/towns/list' );
		});
        responsePromise.error(function(data, status, headers, config) {
			alert("Submitting form failed!");
		});
	}    
});