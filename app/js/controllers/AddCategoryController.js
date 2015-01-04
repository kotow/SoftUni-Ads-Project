app.controller('AddCategoryController', function($scope, $log, $http) {
	$http.defaults.headers.common['Authorization'] = "Bearer " + userSession.getCurrentUser().access_token;
	   deleteTown = function(){
	   var town = {name:$scope.name};
	   var responsePromise = $http.post("http://softuni-ads.azurewebsites.net/api/admin/categories/", town);
        responsePromise.success(function(dataFromServer) {
         	//$location.path( '/admin/home' );
		});
        responsePromise.error(function(data, status, headers, config) {
			alert("Submitting form failed!");
		});
	}    
});