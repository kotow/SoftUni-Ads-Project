app.controller('LeftSidebarController',
	function ($scope, $rootScope) {	
	$scope.statusClicked = function(status) {
		$scope.selectedStatus = status;
		$rootScope.$broadcast("statusSelectionChanged", status);
    };
	$scope.user = {
    notLoggedUser : function() {
        if (!sessionStorage['currentUser']) {
            return true;
        }
		else return false;
    },
    isLoggedUser : function() {
        if (sessionStorage['currentUser']) {
			var userData = JSON.parse(sessionStorage['currentUser']);
			if(userData.isAdmin == undefined) {
				return true;
			}
		}
		else {
			return true;
		}
    },
	isAdmin : function() {
        if (sessionStorage['currentUser']) {
		var userData = JSON.parse(sessionStorage['currentUser']);
		return userData.isAdmin;
        }
		else return false;
	}
}
});
