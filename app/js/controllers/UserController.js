app.controller('UserController', function($scope, $routeParams, $location, notifyService, $route, publicData, userData) {	
	$scope.hideFilters = true;
	$scope.adsParams = {
		'startPage' : 1,
		'pageSize' : 1
	};
	
	$scope.reloadAds = function() {
		var getUserAds = userData.getAds($scope.adsParams)
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
					dataObject.changeImage = true;
					dataObject.imageDataUrl = reader.result;
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
		var publish = userData.publish(adDetails) 
			.success(function() {
				notifyService.showInfo("Ad published");
				$location.path('user/ads');
			})
			.error(function(data) {
				notifyService.showError("Failed to post ad", data);
			});
	}
	
	var getCategories = publicData.getCategories()
		.success(function(dataFromServer) {
			$scope.categories = dataFromServer;
		})
		.error(function(data, status, headers, config) {
			notifyService.showError("Failed to load categories", data);
		});
		
	var getTowns = publicData.getTowns()
		.success(function(dataFromServer) {
			$scope.towns = dataFromServer;
		})
		.error(function(data) {
			notifyService.showError("Failed to load towns", data);
		});
	
	if($routeParams.adId){
		var getAd = userData.getAd($routeParams.adId)
			.success(function(dataFromServer) {
			$scope.ad = dataFromServer;
			$(".image-box").html("<img src='" + $scope.ad.imageDataUrl + "'>");
			})
			.error(function(data) {
				notifyService.showError("Failed to load ad", data);
			});
	}
	
	$scope.publishAgain =  function(id){
		var publishAgain = userData.publishAgain(id)
			.success(function(dataFromServer) {
				notifyService.showInfo("Ad resend for approving");
				$route.reload();
			})
			.error(function(data, status, headers, config) {
				notifyService.showError("Failed to publish ad", data);
			});
	}    
	
	$scope.deactivateAd =  function(id){
		var deactivate = userData.deactivate(id)
			.success(function(dataFromServer) {
				notifyService.showInfo("Ad deactivated");    
				$route.reload();
			})
			.error(function(data, status, headers, config) {
				notifyService.showError("Failed to deactivate ad", data);
			});
	}    
	
	$scope.deleteAd =  function(){
		var deleteAd = userData.deleteAd($routeParams.adId)
			.success(function(dataFromServer) {
				notifyService.showInfo("Ad deleted");
				$location.path( '/user/ads' );
			})
			.error(function(data) {
				notifyService.showError("Failed to delete ad", data);
			});
	} 

	var dataObject = {};
	
	$scope.removeImg = function(){
		dataObject.changeImage = true;
		dataObject.imageDataUrl = null;
		$(".image-box").html("<img src=''>");
	}
	
	$scope.editAd =  function(){
		dataObject.title = $scope.ad.title;
		dataObject.text = $scope.ad.text;
		dataObject.categoryId = $scope.ad.categoryId;
		dataObject.townId = $scope.ad.townId;
		var edit = userData.edit($routeParams.adId, dataObject)
			.success(function(dataFromServer) {
				notifyService.showInfo("Ad edited");
				$location.path( '/user/ads' );
			})
			.error(function(data) {
				notifyService.showError("Failed to edit ad", data);
			});
	}


	var getProfile = userData.getProfile()
		.success(function(dataFromServer) {
			$scope.myForm = dataFromServer;
		})
		.error(function(data, status, headers, config) {
			notifyService.showError("Failed to get user profile", data);
		});
	
	submitTheForm = function(item, event) {
		var editProfile = userData.editProfile($scope.myForm)
			.success(function(dataFromServer) {
				notifyService.showInfo("Profile edited");
				$location.path('user/ads');
			})
			.error(function(data, status, headers, config) {
				notifyService.showError("Failed to edit user profile", data);
			});
	}
	
	changePass = function(item, event) {
		password = {
			oldPassword: $scope.pass.old,
			newPassword: $scope.pass.new,
			confirmPassword: $scope.pass.conf
		}
		var change = userData.changePassword(password)
			.success(function(dataFromServer) {
				notifyService.showInfo("Password changed");
				$location.path('user/ads');
			})
			.error(function(data, status, headers, config) {
				notifyService.showError("Failed to change pass", data);
			});
	}
});