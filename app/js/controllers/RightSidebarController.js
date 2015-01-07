app.controller('RightSidebarController',
    function ($http, $scope, $rootScope) {
       
        $scope.categoryClicked = function(clickedCategoryId) {
            $scope.selectedCategoryId = clickedCategoryId;
            $rootScope.$broadcast("categorySelectionChanged", clickedCategoryId);
        };

        $scope.townClicked = function(clickedTownId) {
            $scope.selectedTownId = clickedTownId;
            $rootScope.$broadcast("townSelectionChanged", clickedTownId);
        };
    
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
	   }
);
