app.controller('AllAdsController', function($scope, publicData, notifyService) {
	$scope.hideFilters = false;
	$scope.adsParams = {
		'startPage' : 1,
		'pageSize' : 5
	};
	
	$scope.reloadAds = function() {
		var getAds = publicData.getAds($scope.adsParams)
			.success(function(dataFromServer) {
				$scope.data = dataFromServer;
				$scope.ads = dataFromServer;
			})
			.error(function(data, status, headers, config) {
				notifyService.showError("Load ads failed", data);
			});
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

	$scope.reloadAds();
});