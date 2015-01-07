app.controller('AllAdsController', function($scope, adsData, $log, $http) {
	      $scope.adsParams = {
          'startPage' : 1,
          'pageSize' : 5
      };
      $scope.reloadAds = function() {
	var getAds = $http.get("http://softuni-ads.azurewebsites.net/api/ads?startPage="+ $scope.adsParams.startPage + "&pageSize="+ $scope.adsParams.pageSize);
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

});