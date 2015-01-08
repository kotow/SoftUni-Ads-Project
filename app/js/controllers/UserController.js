app.controller('UserController', function($scope, $log, $http, $routeParams, $location) {	
	$http.defaults.headers.common['Authorization'] = "Bearer " + userSession.getCurrentUser().access_token;
	$scope.adsParams = {
		'startPage' : 1,
		'pageSize' : 1
	};
	$scope.reloadAds = function() {

	var getUserAds = $http.get("http://softuni-ads.azurewebsites.net/api/user/ads?", {params: $scope.adsParams})
		.success(function(dataFromServer) {
			$scope.data = dataFromServer;
			$scope.ads = dataFromServer;
		})
		.error(function(data, status, headers, config) {
			alert("Submitting form failed!");
		});
    };

	$scope.reloadAds();

	$scope.myForm = {};
	$scope.fileSelected = function(fileInputField) {
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
	if($routeParams.adId){
	var responsePromise = $http.get("http://softuni-ads.azurewebsites.net/api/user/ads/"+$routeParams.adId, {});
        responsePromise.success(function(dataFromServer) {
		  $scope.ad = dataFromServer;
        });
        responsePromise.error(function(data, status, headers, config) {
          alert("Submitting form failed!");
        });
	}
	$scope.publishAgain =  function(){
		var responsePromise = $http.put("http://softuni-ads.azurewebsites.net/api/user/ads/publishagain/"+$routeParams.adId, {});
        responsePromise.success(function(dataFromServer) {
         	$location.path( '/user/ads' );
			console.log(dataFromServer);
		});
        responsePromise.error(function(data, status, headers, config) {
			alert("Submitting form failed!");
		});
	}    
	$scope.deactivateAd =  function(){
		var responsePromise = $http.put("http://softuni-ads.azurewebsites.net/api/user/ads/deactivate/"+$routeParams.adId, {});
        responsePromise.success(function(dataFromServer) {
         	$location.path( '/user/ads' );
			console.log(dataFromServer);
		});
        responsePromise.error(function(data, status, headers, config) {
			alert("Submitting form failed!");
		});
	}    
	$scope.deleteAd =  function(){
		var responsePromise = $http.delete("http://softuni-ads.azurewebsites.net/api/user/ads/"+$routeParams.adId, {});
        responsePromise.success(function(dataFromServer) {
         	$location.path( '/user' );
		});
        responsePromise.error(function(data, status, headers, config) {
			alert("Submitting form failed!");
		});
	} 

var dataObject = {};
$(".image-box").html("<img src='" + dataObject.imageDataUrl + "'>");

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


	var responsePromise = $http.get("http://softuni-ads.azurewebsites.net/api/user/profile", {});
    responsePromise.success(function(dataFromServer, status, headers, config) {
		$scope.myForm = dataFromServer;
	});
	responsePromise.error(function(data, status, headers, config) {
		alert("Submitting form failed!");
	});
	
	submitTheForm = function(item, event) {
		var responsePromisee = $http.put("http://softuni-ads.azurewebsites.net/api/user/profile", $scope.myForm, {});
		responsePromisee	.success(function(dataFromServer, status, headers, config) {
		});
		responsePromise.error(function(data, status, headers, config) {
			alert("Submitting form failed!");
		});
	}
	//var pass = {};
	changePass = function(item, event) {
	password = {
	oldPassword: $scope.pass.old,
	newPassword: $scope.pass.new,
	confirmPassword: $scope.pass.conf
	}
	
		var responsePromisee = $http.put("http://softuni-ads.azurewebsites.net/api/user/changepassword", password, {});
		responsePromisee.success(function(dataFromServer, status, headers, config) {
		});
		responsePromise.error(function(data, status, headers, config) {
			alert("Submitting form failed!");
		});
	}


});