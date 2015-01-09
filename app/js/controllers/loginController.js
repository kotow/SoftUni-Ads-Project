app.controller('loginController', function($scope, $http, $location, notifyService, $route) {
    $scope.login = function(item, event) {
       var dataObject = {
	   username: $scope.username,
	   password:$scope.password,
	   };

       var responsePromise = $http.post("http://softuni-ads.azurewebsites.net/api/user/login", dataObject, {});
       responsePromise.success(function(dataFromServer, status, headers, config) {
		  console.log(dataFromServer);userSession.login(dataFromServer);
		  $scope.user = true;
		  if(!dataFromServer.isAdmin){
		  $location.path( '/user/ads' );} else $location.path( '/admin/home' )
		  
		  $route.reload();
       });
        responsePromise.error(function(data, status, headers, config) {
                  notifyService.showError("Login failed", data);
		  //$location.path( '/login' );
       });
	}

});