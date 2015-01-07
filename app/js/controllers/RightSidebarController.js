app.controller('RightSidebarController',
    function ($http, $scope, $rootScope, publicData) {
	$scope.categoryClicked = function(clickedCategoryId) {
            $scope.selectedCategoryId = clickedCategoryId;
            $rootScope.$broadcast("categorySelectionChanged", clickedCategoryId);
        };

        $scope.townClicked = function(clickedTownId) {
            $scope.selectedTownId = clickedTownId;
            $rootScope.$broadcast("townSelectionChanged", clickedTownId);
        };
    
	var categories = publicData.getCategories();
       categories.success(function(dataFromServer) {
		  $scope.categories = dataFromServer;
       });
        categories.error(function(data, status, headers, config) {
          alert("Submitting form failed!");
       });
	var Towns = publicData.getTowns();
       Towns.success(function(dataFromServer) {
		  $scope.towns = dataFromServer;
       });
        Towns.error(function(data, status, headers, config) {
          alert("Submitting form failed!");
       });
	   }
);
