app.controller('PublishNewAd', function($scope, $http) {
	$scope.myForm = {};
    $scope.myForm.submitTheForm = function(item, event) {
       console.log($scope.myForm);
	   $http.defaults.headers.common['Authorization'] ="Bearer GnNzp1tphJhQoujJG-dm6DnMM0VInJ7EECYmjlXvcGl3iA_jkJ6gLmZpsmxpyS63MTxkdKQnUDqIw-nowoeSvBEXMHbhL7NwJ_W1iRcIe_LGeVkiRopczG7BDCG0RODwWqIBqGYHy7uWlt6FCSo3mEJqYW8xS7e1NudEdg2KIvG7K8nK7vlYtERUnuIYl65gSwVmzZNmddWPEU-j53wuTGZDAeoTBI7F-Qmvh1Fbdx2dC4u8QpYwVZeoc6DRjLjIxugrImiR4jfL7xkhzGbEXztuo-hDrtnJBFyiIw1YPIsgUxuCCjSVQIaSAT9TjU21y3_O77ioi_gQvkj5hiaZ6_8rIKGgl4V3PotuBWDJaB16q9kh0ul7w2j27gVNFSjommoqDR9_OAGENMWZ8yyaj3z2vMHEAq22zPoDh9WP71utyfAZFnmzMwg8tbjLnGzvpodO7PDX3t1mVqkt5MO8RqyQu759HHmlvxZcbXe-Gvxv0rZfko9pF3MDS21L2-r51pcEvfHuXA-R0KiCrInRrA";
       var dataObject = {
	   title: $scope.myForm.title,
	   text:$scope.myForm.text,
	   categoryId:$scope.myForm.categoryId,
	   townId:$scope.myForm.townId
	   };

       var responsePromise = $http.post("http://softuni-ads.azurewebsites.net/api/user/ads", dataObject, {}); 
       responsePromise.success(function(dataFromServer, status, headers, config) {
          console.log(dataFromServer);
       });
        responsePromise.error(function(data, status, headers, config) {
          alert("Submitting form failed!");
       });
	}
	var responsePromise = $http.get("http://softuni-ads.azurewebsites.net/api/categories", {});
       responsePromise.success(function(dataFromServer) {
          console.log(dataFromServer);
		  $scope.categories = dataFromServer;
       });
        responsePromise.error(function(data, status, headers, config) {
          alert("Submitting form failed!");
       });
	var responsePromiseTowns = $http.get("http://softuni-ads.azurewebsites.net/api/towns", {});
       responsePromiseTowns.success(function(dataFromServer) {
          console.log(dataFromServer);
		  $scope.towns = dataFromServer;
       });
        responsePromiseTowns.error(function(data, status, headers, config) {
          alert("Submitting form failed!");
       });

});