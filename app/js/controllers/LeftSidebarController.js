app.controller('LeftSidebarController',
	function ($scope, $rootScope) {	
	$scope.statusClicked = function(status) {
		$scope.selectedStatus = status;
		$rootScope.$broadcast("statusSelectionChanged", status);
    };
	if(!userSession.getCurrentUser()){
		$scope.guest = true;
		$scope.user = false;
		$scope.admin = false;
	}
	
	else if(userSession.getCurrentUser() && !userSession.getCurrentUser().isAdmin){
		$scope.guest = false;
		$scope.user = true;
		$scope.admin = false;
	}
	else if(userSession.getCurrentUser() && userSession.getCurrentUser().isAdmin){
		$scope.guest = false;
		$scope.user = false;
		$scope.admin = true;
	}
	console.log($scope.guest,$scope.user,$scope.admin)
});
