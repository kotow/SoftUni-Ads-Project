app.controller('UserAdsController', function($scope, adsData, $log, $http) {
	   $http.defaults.headers.common['Authorization'] = "Bearer " + userSession.getCurrentUser().access_token;
	var responsePromise = $http.get("http://softuni-ads.azurewebsites.net/api/user/ads", {});
       responsePromise.success(function(dataFromServer) {
          //console.log(dataFromServer);
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