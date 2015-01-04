app.controller('registerController', function($scope, $http, $location) {
	$scope.myForm = {};
    $scope.myForm.submitTheForm = function(item, event) {
       var dataObject = {
	   username: $scope.myForm.username,
	   password:$scope.myForm.password,
	   confirmPassword:$scope.myForm.passwordConf,
	   name:$scope.myForm.name,
	   email:$scope.myForm.email,
	   phone:$scope.myForm.phone,
	   townId:$scope.myForm.townId
	   };

       var responsePromise = $http.post("http://softuni-ads.azurewebsites.net/api/user/register", dataObject, {});
       responsePromise.success(function(dataFromServer, status, headers, config) {
		  userSession.login(dataFromServer);
		  $location.path( '/user' );
       });
        responsePromise.error(function(data, status, headers, config) {
          alert("Submitting form failed!");
       });
	}
	var responsePromiseTowns = $http.get("http://softuni-ads.azurewebsites.net/api/towns", {});
       responsePromiseTowns.success(function(dataFromServer) {
		  $scope.towns = dataFromServer;
       });
        responsePromiseTowns.error(function(data, status, headers, config) {
          alert("Submitting form failed!");
       });

});
