
app.controller('AdminAllAdsController', function($scope, adsData, $log, $http, $rootScope) {
	$http.defaults.headers.common['Authorization'] = "Bearer " + userSession.getCurrentUser().access_token;

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
	$scope.adsParams = {
          'startPage' : 1,
          'pageSize' : 5
      };
      $scope.reloadAds = function() {
		  
	  // This event is sent by RightSideBarController when the current category is changed
        $scope.$on("categorySelectionChanged", function(event, selectedCategoryId) {
            $scope.adsParams.categoryId = selectedCategoryId;
            $scope.adsParams.startPage = 1;
            $scope.reloadAds();
        });

        // This event is sent by RightSideBarController when the current town is changed
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

		
	var getAds = $http.get("http://softuni-ads.azurewebsites.net/api/admin/ads?", {params:$scope.adsParams});
		getAds.success(function(dataFromServer) {
			$scope.data = dataFromServer;
			console.log(dataFromServer);
			console.log($scope.adsParams);
			$scope.ads = dataFromServer;
		});
		getAds.error(function(data, status, headers, config) {
			alert("Submitting form failed!");
		});
      };

      $scope.reloadAds();
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
	   
	$scope.aprove = function(id){
		aproveAd = $http.put("http://softuni-ads.azurewebsites.net/api/admin/ads/approve/"+id);
		aproveAd.success(function(dataFromServer) {
		});
		aproveAd.error(function(data, status, headers, config) {
			alert("Submitting form failed!");
		});
	}
	
	$scope.reject = function(id){
		aproveAd = $http.put("http://softuni-ads.azurewebsites.net/api/admin/ads/reject/"+id);
		aproveAd.success(function(dataFromServer) {
		});
		aproveAd.error(function(data, status, headers, config) {
			alert("Submitting form failed!");
		});
	}
});