app.controller('loginController', function($scope, $http, $location, notifyService, $route) {
	$scope.myForm = {};
    $scope.myForm.submitTheForm = function(item, event) {
       var dataObject = {
	   username: $scope.myForm.username,
	   password:$scope.myForm.password,
	   };

       var responsePromise = $http.post("http://softuni-ads.azurewebsites.net/api/user/login", dataObject, {});
       responsePromise.success(function(dataFromServer, status, headers, config) {
		  userSession.login(dataFromServer);
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