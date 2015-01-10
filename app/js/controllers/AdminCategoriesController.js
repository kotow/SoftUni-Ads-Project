app.controller('AdminCategoriesController', function($scope, $routeParams, $location, notifyService, adminData, publicData) {

	$scope.adsParams = {
		'startPage' : 1,
		'pageSize' : 5
	};
	$scope.reloadAds = function() {
		adminData.getCategories($scope.adsParams)
		.success(function(dataFromServer) {
			$scope.categories = dataFromServer.categories;
			$scope.ads = dataFromServer;
		})
		.error(function(data, status, headers, config) {
			notifyService.showError("Failed to load categories", data);
		});
      };

	$scope.reloadAds();
if($routeParams.categoryId != undefined){
	publicData.getCategories()
	.success(function(dataFromServer) {
		for(var i=0;i<dataFromServer.length;i++){
			if(dataFromServer[i].id == $routeParams.categoryId){
				$scope.category = dataFromServer[i];
			}
		}
	  });
}
	/*
	if($routeParams.categoryId != undefined){
		adminData.getCategoryById($routeParams.categoryId)
		.success(function(dataFromServer) {
			$scope.category = dataFromServer;
		})
		.error(function(data, status, headers, config) {
			notifyService.showError("Failed to load category", data);
		});
	}*/
	deleteCategory = function() {
		adminData.deleteCategory($routeParams.categoryId)
		.success(function(dataFromServer) {
			notifyService.showInfo("Category deleted successful");
			$location.path( '/admin/categories/list' );
		})
		.error(function(data) {
			notifyService.showError("Failed to delete category", data);
		});
	}
    
	editCategory = function() {
		var category = {
			name:$scope.category.name
		};
		adminData.editCategory($routeParams.categoryId, category)
		.success(function(dataFromServer) {
			notifyService.showInfo("Category edited successful");
			$location.path( '/admin/categories/list' );
		})
		.error(function(data) {
			notifyService.showError("Failed to edit category", data);
		});
	}    

	createCategory = function() {
		var category = {
			name:$scope.name
		};
		adminData.createCategory(category)
		.success(function(dataFromServer) {
			notifyService.showInfo("Category created successful");
			$location.path( '/admin/categories/list' );
		})
		.error(function(data) {
			notifyService.showError("Failed to create category", data);
		});
	}    

	});