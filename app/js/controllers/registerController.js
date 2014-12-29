app.controller('registerController', function($scope, $http, $location) {
	$scope.myForm = {};
    $scope.myForm.submitTheForm = function(item, event) {
       console.log($scope.myForm);
       var dataObject = {
	   username: $scope.myForm.username,
	   password:$scope.myForm.password,
	   confirmPassword:$scope.myForm.password + 'a',
	   name:$scope.myForm.name,
	   email:$scope.myForm.email,
	   phone:$scope.myForm.phone,
	   townId:1
	   };

       var responsePromise = $http.post("http://softuni-ads.azurewebsites.net/api/user/register", dataObject, {});
       responsePromise.success(function(dataFromServer, status, headers, config) {
          console.log(dataFromServer);
		  $location.path( '/user' );
       });
        responsePromise.error(function(data, status, headers, config) {
          alert("Submitting form failed!");
       });
	}
});