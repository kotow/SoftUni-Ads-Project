app.controller('loginController', function($scope, $http) {
	$scope.myForm = {};
    $scope.myForm.submitTheForm = function(item, event) {
       console.log($scope.myForm);
       var dataObject = {
	   username: $scope.myForm.username,
	   password:$scope.myForm.password,
	   };

       var responsePromise = $http.post("http://softuni-ads.azurewebsites.net/api/user/login", dataObject, {});
       responsePromise.success(function(dataFromServer, status, headers, config) {
          console.log(dataFromServer);
		  userSession.login(dataFromServer);
       });
        responsePromise.error(function(data, status, headers, config) {
          alert("Submitting form failed!");
       });
	}

});