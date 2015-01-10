app.controller('AdminAdsController', function($scope, $route, $rootScope, $routeParams, $location, notifyService, adminData, publicData) {

	$scope.adsParams = {
		'startPage' : 1,
		'pageSize' : 5
	};
    
	$scope.$on("categorySelectionChanged", function(event, selectedCategoryId) {
		$scope.adsParams.categoryId = selectedCategoryId;
		$scope.adsParams.startPage = 1;
		$scope.reloadAds();
	});
	
    $scope.$on("townSelectionChanged", function(event, selectedTownId) {
		$scope.adsParams.townId = selectedTownId;
		$scope.adsParams.startPage = 1;
		$scope.reloadAds();
	});

	$scope.$on("statusSelectionChanged", function(event, selectedTownId) {
		$scope.adsParams.status = selectedTownId;
		$scope.adsParams.startPage = 1;
		$scope.reloadAds();
	});

	$scope.reloadAds = function() {
		adminData.getAds($scope.adsParams)
		.success(function(dataFromServer) {
			$scope.data = dataFromServer;
			$scope.ads = dataFromServer;
		})
		.error(function(data, status, headers, config) {
			notifyService.showError("Load ads failed", data);
		});
	};
	$scope.reloadAds();
	
	publicData.getCategories()
	.success(function(dataFromServer) {
		$scope.categories = dataFromServer;
	})
	.error(function(data, status, headers, config) {
		notifyService.showError("Failed to load categories", data);
	});
	publicData.getTowns()
	.success(function(dataFromServer) {
		$scope.towns = dataFromServer;
	})
	.error(function(data, status, headers, config) {
		notifyService.showError("Failed to load towns", data);
	});
	   
	$scope.aprove = function(id){
		adminData.approveAd(id)
		.success(function(dataFromServer) {
			notifyService.showInfo("Ad approved successful");
			$route.reload();
		})
		.error(function(data, status, headers, config) {
			notifyService.showError("Failed to approve ad", data);
		});
	}
	
	$scope.reject = function(id){
		adminData.rejectAd(id)
		.success(function(dataFromServer) {
			notifyService.showInfo("Ad rejected successful");
			$route.reload();
		})
		.error(function(data, status, headers, config) {
			notifyService.showError("Failed to reject ad", data);
		});
	}

	$scope.fileSelected = function(fileInputField) {
		var file = fileInputField.files[0];
            if (file.type.match(/image\/.*/)) {
                var reader = new FileReader();
                reader.onload = function() {
                    $scope.myForm.imageDataUrl = reader.result;
					$scope.myForm.changeimage = true;
                    $(".image-box").html("<img src='" + reader.result + "'>");
                };
                reader.readAsDataURL(file);
            } else {
                $(".image-box").html("<p>File type not supported!</p>");
            }
        }

	if ($routeParams.adId !== undefined) {
		adminData.getAdById($routeParams.adId)
		.success(function(dataFromServer) {
			$(".image-box").html("<img src='" + dataFromServer.imageDataUrl + "'>");		
			$scope.ad = dataFromServer;console.log($scope.ad)
        })
        .error(function(data, status, headers, config) {
			notifyService.showError("Failed to load ad", data);
        });
		
	}	
	
	$scope.removeImg = function(){
		$scope.ad.changeImage = true;
		$scope.ad.imageDataUrl = null;
		$(".image-box").html("<img src=''>");
	}
	
	$scope.editAd =  function(){
		var dataObject = {
			title: $scope.ad.title,
			text: $scope.ad.text,
			categoryId: $scope.ad.categoryId,
			townId: $scope.ad.townId,
		};
		adminData.editAd($routeParams.adId, dataObject)
        .success(function(dataFromServer) {
         	notifyService.showInfo("Ad edited");
			$location.path( '/admin/home' );
		})
        .error(function(data, status, headers, config) {
			notifyService.showError("Failed to edit ad", data);
		});
	}

	$scope.deleteAd =  function(){
		adminData.deleteAd($routeParams.adId)
		.success(function(dataFromServer) {
			notifyService.showInfo("Ad deleted");
			$location.path( '/admin/home' );
		})
        .error(function(data, status, headers, config) {
			notifyService.showError("Failed to delete ad", data);
		});
	}    

});