app.controller('DeleteCategoryController', function($scope, adsData, $log, $http, $routeParams, $location) {
	$http.defaults.headers.common['Authorization'] = "Bearer " + userSession.getCurrentUser().access_token;
	var responsePromiseTowns = $http.get("http://softuni-ads.azurewebsites.net/api/categories", {});
	responsePromiseTowns.success(function(dataFromServer) {
		for(var i=0;i<dataFromServer.length;i++){
			if(dataFromServer[i].id == $routeParams.townId){
				$scope.town = dataFromServer[i];
			}
		}
	  });
	deleteTown = function(){
		var responsePromise = $http.delete("http://softuni-ads.azurewebsites.net/api/admin/categories/"+$routeParams.townId);
		responsePromise.success(function(dataFromServer) {
			$location.path( '/admin/towns/list' );
		});
        responsePromise.error(function(data, status, headers, config) {
			alert("Submitting form failed!");
		});
	}    
});