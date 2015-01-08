app.controller('LeftSidebarController',
	function ($scope, $rootScope) {	
	$scope.statusClicked = function(status) {
		$scope.selectedStatus = status;
		$rootScope.$broadcast("statusSelectionChanged", status);
    };
	$scope.user = {
    notLoggedUser : function() {
        var userData = sessionStorage['currentUser'];
        if (!userData) {
            return true;
        }
		else return false;
    },
    isLoggedUser : function() {
        var userData = sessionStorage['currentUser'];
        if (userData && !userData.isAdmin) {
            return true;
        }
		else return false;
    },
	isAdmin : function() {
		var userData = JSON.parse(sessionStorage['currentUser']);
        if (userData) {
		return userData.isAdmin;
        }
		else return false;
	}
}
});
