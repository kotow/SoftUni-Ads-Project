app.controller('EditAdController', function($scope, adsData, $log, $http, $routeParams, $location) {
	$http.defaults.headers.common['Authorization'] = "Bearer " + userSession.getCurrentUser().access_token;
var dataObject = {};

	$scope.fileSelected = function(fileInputField) {
            //delete $scope.adData.imageDataUrl;
            var file = fileInputField.files[0];
            if (file.type.match(/image\/.*/)) {
                var reader = new FileReader();
                reader.onload = function() {
                    dataObject.imageDataUrl = reader.result;
					dataObject.changeimage = true;
                    $(".image-box").html("<img src='" + reader.result + "'>");
                };
                reader.readAsDataURL(file);
            } else {
                $(".image-box").html("<p>File type not supported!</p>");
            }
        }

	
	var responsePromise = $http.get("http://softuni-ads.azurewebsites.net/api/user/ads/"+$routeParams.adId, {});
        responsePromise.success(function(dataFromServer) {
		$(".image-box").html("<img src='" + dataFromServer.imageDataUrl + "'>");
		$scope.ad = dataFromServer;
        });
        responsePromise.error(function(data, status, headers, config) {
          alert("Submitting form failed!");
        });    
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
$scope.editAd =  function(){
		dataObject.title = $scope.ad.title;
			dataObject.text = $scope.ad.text;
			dataObject.categoryId = $scope.ad.categoryId;
			dataObject.townId = $scope.ad.townId;
		var responsePromise = $http.put("http://softuni-ads.azurewebsites.net/api/user/ads/"+$routeParams.adId, dataObject);
        responsePromise.success(function(dataFromServer) {
         	//$location.path( '/user' );
		});
        responsePromise.error(function(data, status, headers, config) {
			alert("Submitting form failed!");
		});
	}
});
