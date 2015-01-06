app.controller('UserAdsController', function($scope, adsData, $log, $http) {
	   $http.defaults.headers.common['Authorization'] = "Bearer " + userSession.getCurrentUser().access_token;
	      $scope.adsParams = {
          'startPage' : 1,
          'pageSize' : 20
      };
      $scope.reloadAds = function() {
	var getAds = $http.get("http://softuni-ads.azurewebsites.net/api/user/ads?startPage="+ $scope.adsParams.startPage + "&pageSize="+ $scope.adsParams.pageSize);
		getAds.success(function(dataFromServer) {
			$scope.data = dataFromServer;
			$scope.ads = dataFromServer;
		});
		getAds.error(function(data, status, headers, config) {
			alert("Submitting form failed!");
		});
      };

      $scope.reloadAds();

	   var responsePromise = $http.get("http://softuni-ads.azurewebsites.net/api/user/ads", {});
       responsePromise.success(function(dataFromServer) {
		  $scope.data = dataFromServer;
       });
        responsePromise.error(function(data, status, headers, config) {
          alert("Submitting form failed!");
       });
   var doPagination = (function(resp) {
            $scope.data = resp;
        //pagination
        $scope.totalItems = $scope.data.numItems;
        $scope.currentPage = 1;
        $scope.itemsPerPage = 5;

        $scope.pageCount = function () {
            return Math.ceil($scope.totalItems / $scope.itemsPerPage);
        };


        $scope.$watch( 'currentPage + itemsPerPage', function() {
            var begin = (($scope.currentPage - 1) * $scope.itemsPerPage),
                end = begin + $scope.itemsPerPage;

            $scope.filteredAds = $scope.data.ads.slice(begin, end);

        });
    });
});