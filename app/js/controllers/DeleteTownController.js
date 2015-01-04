app.controller('DeleteTownController', function($scope, adsData, $log, $http, $routeParams) {
	$http.defaults.headers.common['Authorization'] = "Bearer " + userSession.getCurrentUser().access_token;
	   deleteTown = function(){
	   var responsePromise = $http.delete("http://softuni-ads.azurewebsites.net/api/admin/towns/"+$routeParams.townId);
        responsePromise.success(function(dataFromServer) {
         	$location.path( '/user' );
			console.log(dataFromServer);
		});
        responsePromise.error(function(data, status, headers, config) {
			alert("Submitting form failed!");
		});
	}    
});