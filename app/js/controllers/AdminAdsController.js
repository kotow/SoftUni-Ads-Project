app.controller('AdminAdsController', function($scope, $log, $http, $rootScope, $routeParams, $location) {
	$http.defaults.headers.common['Authorization'] = "Bearer " + userSession.getCurrentUser().access_token;

	$scope.adsParams = {
		'startPage' : 1,
		'pageSize' : 5
	};
    
	$scope.categoryClicked = function(clickedCategoryId) {
		$scope.selectedCategoryId = clickedCategoryId;
		$rootScope.$broadcast("categorySelectionChanged", clickedCategoryId);
		$scope.reloadAds();
	};
	
	$scope.statusClicked = function(clickedCategoryId) {
		$scope.selectedCategoryId = clickedCategoryId;
		$rootScope.$broadcast("statusSelectionChanged", clickedCategoryId);
		$scope.reloadAds();
	};

	$scope.townClicked = function(clickedTownId) {
		$scope.selectedTownId = clickedTownId;
		$rootScope.$broadcast("townSelectionChanged", clickedTownId);
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
			alert("Submitting form failed!");
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
			alert("Submitting form failed!");
		});
		
	var getTowns = $http.get("http://softuni-ads.azurewebsites.net/api/towns", {})
		.success(function(dataFromServer) {
			$scope.towns = dataFromServer;
		})
		.error(function(data, status, headers, config) {
			alert("Submitting form failed!");
		});
	   
	$scope.aprove = function(id){
		aproveAd = $http.put("http://softuni-ads.azurewebsites.net/api/admin/ads/approve/"+id)
		.success(function(dataFromServer) {
		})
		.error(function(data, status, headers, config) {
			alert("Submitting form failed!");
		});
	}
	
	$scope.reject = function(id){
		rejectAd = $http.put("http://softuni-ads.azurewebsites.net/api/admin/ads/reject/"+id)
		.success(function(dataFromServer) {
		})
		.error(function(data, status, headers, config) {
			alert("Submitting form failed!");
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
			$scope.ad = dataFromServer;
        })
        .error(function(data, status, headers, config) {
          alert("Submitting form failed!");
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
         	$location.path( '/admin/home' );
		});
        responsePromise.error(function(data, status, headers, config) {
			alert("Submitting form failed!");
		});
	}

		$scope.deleteAd =  function(){
		var responsePromise = $http.delete("http://softuni-ads.azurewebsites.net/api/admin/ads/"+$routeParams.adId, {});
        responsePromise.success(function(dataFromServer) {
         	$location.path( '/admin/home' );
		});
        responsePromise.error(function(data, status, headers, config) {
			alert("Submitting form failed!");
		});
	}    

});