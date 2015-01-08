app.controller('UserController', function($scope, $log, $http, $routeParams, $location, notifyService, $route) {	
	$http.defaults.headers.common['Authorization'] = "Bearer " + userSession.getCurrentUser().access_token;
	$scope.hideFilters = true;
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
			notifyService.showError("Failed to load ads", data);
		});
    };

    $scope.$on("statusSelectionChanged", function(event, status) {
		$scope.adsParams.status = status;
		$scope.adsParams.startPage = 1;
		$scope.reloadAds();
    });

	$scope.reloadAds();

	$scope.publish = {};
	$scope.fileSelected = function(fileInputField) {
		var file = fileInputField.files[0];
            if (file.type.match(/image\/.*/)) {
				var reader = new FileReader();
                reader.onload = function() {
					$scope.publish.imageDataUrl = reader.result;
                    $(".image-box").html("<img src='" + reader.result + "'>");
                };
				reader.readAsDataURL(file);
            } else {
                $(".image-box").html("<p>File type not supported!</p>");
            }
    }
    
	$scope.publish.submit = function(item, event) {
		var adDetails = {
			imageDataUrl: $scope.publish.imageDataUrl,
			title: $scope.publish.title,
			text: $scope.publish.text,
			categoryId: $scope.publish.categoryId,
			townId: $scope.publish.townId,
		};
		var responsePromise = $http.post("http://softuni-ads.azurewebsites.net/api/user/ads", adDetails); 
		responsePromise.success(function(dataFromServer, status, headers, config) {
			notifyService.showInfo("Ad published");
			$location.path('user/ads');
		});
		responsePromise.error(function(data, status, headers, config) {
			notifyService.showError("Failed to post ad", data);
		});
	}
	
	var responsePromise = $http.get("http://softuni-ads.azurewebsites.net/api/categories", {});
	responsePromise.success(function(dataFromServer) {
		$scope.categories = dataFromServer;
	});
	responsePromise.error(function(data, status, headers, config) {
		notifyService.showError("Failed to load categories", data);
	});
		
	var responsePromiseTowns = $http.get("http://softuni-ads.azurewebsites.net/api/towns", {});
	responsePromiseTowns.success(function(dataFromServer) {
		$scope.towns = dataFromServer;
	});
	responsePromiseTowns.error(function(data, status, headers, config) {
        notifyService.showError("Failed to load towns", data);
	});
	
	if($routeParams.adId){
		var getAd = $http.get("http://softuni-ads.azurewebsites.net/api/user/ads/" + $routeParams.adId)
			.success(function(dataFromServer) {
				$scope.ad = dataFromServer;
			})
			.error(function(data, status, headers, config) {
				notifyService.showError("Failed to load ad", data);
			});
	}
	
	$scope.publishAgain =  function(id){
		var responsePromise = $http.put("http://softuni-ads.azurewebsites.net/api/user/ads/publishagain/" + id);
        responsePromise.success(function(dataFromServer) {
         	notifyService.showInfo("Ad resend for approving");
			$route.reload();
		});
        responsePromise.error(function(data, status, headers, config) {
			notifyService.showError("Failed to publish ad", data);
		});
	}    
	
	$scope.deactivateAd =  function(id){
		var responsePromise = $http.put("http://softuni-ads.azurewebsites.net/api/user/ads/deactivate/" + id);
        responsePromise.success(function(dataFromServer) {
			notifyService.showInfo("Ad deactivated");    
			$route.reload();
		});
        responsePromise.error(function(data, status, headers, config) {
			notifyService.showError("Failed to deactivate ad", data);
		});
	}    
	
	$scope.deleteAd =  function(){
		var responsePromise = $http.delete("http://softuni-ads.azurewebsites.net/api/user/ads/"+$routeParams.adId, {});
        responsePromise.success(function(dataFromServer) {
         	notifyService.showInfo("Ad deleted");
			$location.path( '/user/ads' );
		});
        responsePromise.error(function(data, status, headers, config) {
			notifyService.showError("Failed to delete ad", data);
		});
	} 

	var dataObject = {};
	$(".image-box").html("<img src='" + dataObject.imageDataUrl + "'>");

	$scope.fileSelected = function(fileInputField) {
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
         	notifyService.showInfo("Ad edited");
			$location.path( '/user/ads' );
		});
        responsePromise.error(function(data, status, headers, config) {
			notifyService.showError("Failed to edit ad", data);
		});
	}


	var responsePromise = $http.get("http://softuni-ads.azurewebsites.net/api/user/profile", {});
    responsePromise.success(function(dataFromServer, status, headers, config) {
		$scope.myForm = dataFromServer;
	});
	responsePromise.error(function(data, status, headers, config) {
		notifyService.showError("Failed to get user profile", data);
	});
	
	submitTheForm = function(item, event) {
		var responsePromisee = $http.put("http://softuni-ads.azurewebsites.net/api/user/profile", $scope.myForm, {});
		responsePromisee.success(function(dataFromServer, status, headers, config) {
			notifyService.showInfo("Profile edited");
			$location.path('user/ads');
		});
		responsePromise.error(function(data, status, headers, config) {
			notifyService.showError("Failed to edit user profile", data);
		});
	}
	
	changePass = function(item, event) {
		password = {
			oldPassword: $scope.pass.old,
			newPassword: $scope.pass.new,
			confirmPassword: $scope.pass.conf
		}
		var responsePromisee = $http.put("http://softuni-ads.azurewebsites.net/api/user/changepassword", password, {});
		responsePromisee.success(function(dataFromServer, status, headers, config) {
			notifyService.showInfo("Password changed");
			$location.path('user/ads');
		});
		responsePromise.error(function(data, status, headers, config) {
			notifyService.showError("Failed to change pass", data);
		});
	}
});