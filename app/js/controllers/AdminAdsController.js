app.controller('AdminAdsController', function($scope, $route, $http, $rootScope, $routeParams, $location, notifyService) {
	$http.defaults.headers.common['Authorization'] = "Bearer " + userSession.getCurrentUser().access_token;

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

	var getAds = $http.get("http://softuni-ads.azurewebsites.net/api/admin/ads?", {params:$scope.adsParams})
		.success(function(dataFromServer) {
			$scope.data = dataFromServer;
			$scope.ads = dataFromServer;
		})
		.error(function(data, status, headers, config) {
			notifyService.showError("Failed to load ads", data);
		});

	$scope.reloadAds = function() {
		var getAds = $http.get("http://softuni-ads.azurewebsites.net/api/admin/ads?", {params:$scope.adsParams})
			.success(function(dataFromServer) {
				$scope.data = dataFromServer;
				$scope.ads = dataFromServer;
			})
			.error(function(data, status, headers, config) {
				notifyService.showError("Load ads failed", data);
			});
	};
	$scope.reloadAds();
	
	var getCategories = $http.get("http://softuni-ads.azurewebsites.net/api/categories", {})
		.success(function(dataFromServer) {
			$scope.categories = dataFromServer;
		})
		.error(function(data, status, headers, config) {
			notifyService.showError("Failed to load categories", data);
		});
	var getTowns = $http.get("http://softuni-ads.azurewebsites.net/api/towns", {})
		.success(function(dataFromServer) {
			$scope.towns = dataFromServer;
		})
		.error(function(data, status, headers, config) {
			notifyService.showError("Failed to load towns", data);
		});
	   
	$scope.aprove = function(id){
		aproveAd = $http.put("http://softuni-ads.azurewebsites.net/api/admin/ads/approve/"+id)
		.success(function(dataFromServer) {
			notifyService.showInfo("Ad approved successful");
			$route.reload();
		})
		.error(function(data, status, headers, config) {
			notifyService.showError("Failed to approve ad", data);
		});
	}
	
	$scope.reject = function(id){
		rejectAd = $http.put("http://softuni-ads.azurewebsites.net/api/admin/ads/reject/"+id)
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
		var getAdById = $http.get("http://softuni-ads.azurewebsites.net/api/admin/ads/" + $routeParams.adId, {})
		.success(function(dataFromServer) {
			$(".image-box").html("<img src='" + dataFromServer.imageDataUrl + "'>");
		
			$scope.ad = dataFromServer;console.log($scope.ad)
        })
        .error(function(data, status, headers, config) {
			notifyService.showError("Failed to load ad", data);
        });
		
	}	

	$scope.editAd =  function(){
		var dataObject = {
			title: $scope.ad.title,
			text: $scope.ad.text,
			categoryId: $scope.ad.categoryId,
			townId: $scope.ad.townId,
		};
		var responsePromise = $http.put("http://softuni-ads.azurewebsites.net/api/admin/ads/"+$routeParams.adId, dataObject);
        responsePromise.success(function(dataFromServer) {
         	notifyService.showInfo("Ad edited");
			$location.path( '/admin/home' );
		});
        responsePromise.error(function(data, status, headers, config) {
			notifyService.showError("Failed to edit ad", data);
		});
	}

		$scope.deleteAd =  function(){
			var responsePromise = $http.delete("http://softuni-ads.azurewebsites.net/api/admin/ads/"+$routeParams.adId, {});
			responsePromise.success(function(dataFromServer) {
			notifyService.showInfo("Ad deleted");
			$location.path( '/admin/home' );
		});
        responsePromise.error(function(data, status, headers, config) {
			notifyService.showError("Failed to delelete ad", data);
		});
	}    

});