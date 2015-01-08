app.controller('AdminCategoriesController', function($scope, $log, $http, $routeParams, $location) {
	$http.defaults.headers.common['Authorization'] = "Bearer " + userSession.getCurrentUser().access_token;
	$scope.adsParams = {
		'startPage' : 1,
		'pageSize' : 5
	};
	$scope.reloadAds = function() {
		var getCats = $http.get("http://softuni-ads.azurewebsites.net/api/admin/categories?", {params: $scope.adsParams})
			.success(function(dataFromServer) {
				$scope.categories = dataFromServer.categories;
				$scope.ads = dataFromServer;
			})
			.error(function(data, status, headers, config) {
				alert("Submitting form failed!");
			});
      };

	$scope.reloadAds();

	var responsePromiseTowns = $http.get("http://softuni-ads.azurewebsites.net/api/categories", {});
	responsePromiseTowns.success(function(dataFromServer) {
		for(var i=0;i<dataFromServer.length;i++){
			if(dataFromServer[i].id == $routeParams.categoryId){
				$scope.category = dataFromServer[i];
			}
		}
	  });
	
	deleteCategory = function() {
		var deleteCat = $http.delete("http://softuni-ads.azurewebsites.net/api/admin/categories/" + $routeParams.categoryId)
			.success(function(dataFromServer) {
				$location.path( '/admin/categories/list' );
			})
			.error(function(data, status, headers, config) {
				alert("Submitting form failed!");
			});
	}
    
	editCategory = function() {
		var category = {
			name:$scope.category.name
		};
		var editCat = $http.put("http://softuni-ads.azurewebsites.net/api/admin/categories/" + $routeParams.categoryId, category)
			.success(function(dataFromServer) {
				$location.path( '/admin/categories/list' );
			})
			.error(function(data, status, headers, config) {
				alert("Submitting form failed!");
			});
	}    

	createCategory = function() {
		var category = {
			name:$scope.name
		};
		var createCat = $http.post("http://softuni-ads.azurewebsites.net/api/admin/categories/", category)
			.success(function(dataFromServer) {
				$location.path( '/admin/categories/list' );
			})
			.error(function(data, status, headers, config) {
				alert("Submitting form failed!");
			});
	}    

	});