app.controller('PublishNewAd', function($scope, $http) {
	$scope.myForm = {};
 $scope.fileSelected = function(fileInputField) {
            //delete $scope.adData.imageDataUrl;
            var file = fileInputField.files[0];
            if (file.type.match(/image\/.*/)) {
                var reader = new FileReader();
                reader.onload = function() {
                    $scope.myForm.imageDataUrl = reader.result;
                    $(".image-box").html("<img src='" + reader.result + "'>");
                };
                reader.readAsDataURL(file);
            } else {
                $(".image-box").html("<p>File type not supported!</p>");
            }
        }
    $scope.myForm.submitTheForm = function(item, event) {
		$http.defaults.headers.common['Authorization'] = "Bearer " + userSession.getCurrentUser().access_token;
		var dataObject = {
			imageDataUrl: $scope.myForm.imageDataUrl,
			title: $scope.myForm.title,
			text: $scope.myForm.text,
			categoryId: $scope.myForm.categoryId,
			townId: $scope.myForm.townId,
		};
		var responsePromise = $http.post("http://softuni-ads.azurewebsites.net/api/user/ads", dataObject, {}); 
		responsePromise.success(function(dataFromServer, status, headers, config) {
		});
		responsePromise.error(function(data, status, headers, config) {
			alert("Submitting form failed!");
		});
	}
	
	var responsePromise = $http.get("http://softuni-ads.azurewebsites.net/api/categories", {});
	responsePromise.success(function(dataFromServer) {
		$scope.categories = dataFromServer;
	});
	responsePromise.error(function(data, status, headers, config) {
		alert("Submitting form failed!");
	});
		
	var responsePromiseTowns = $http.get("http://softuni-ads.azurewebsites.net/api/towns", {});
	responsePromiseTowns.success(function(dataFromServer) {
		$scope.towns = dataFromServer;
	});
	responsePromiseTowns.error(function(data, status, headers, config) {
          alert("Submitting form failed!");
	});
});