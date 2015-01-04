app.controller('loginController', function($scope, $http, $location) {
	$scope.myForm = {};
    $scope.myForm.submitTheForm = function(item, event) {
       var dataObject = {
	   username: $scope.myForm.username,
	   password:$scope.myForm.password,
	   };

       var responsePromise = $http.post("http://softuni-ads.azurewebsites.net/api/user/login", dataObject, {});
       responsePromise.success(function(dataFromServer, status, headers, config) {
		  userSession.login(dataFromServer);
		  $location.path( '/user' );
       });
        responsePromise.error(function(data, status, headers, config) {
          alert("Submitting form failed!");
       });
	}

});