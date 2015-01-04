var loginRequired = function($location, $q) {  
    var deferred = $q.defer();

    if(! userSession.getCurrentUser()) {
        deferred.reject()
        $location.path('/login');
    } else {
        deferred.resolve()
    }

    return deferred.promise;
}
var loginNotRequired = function($location, $q) {  
    var deferred = $q.defer();

    if(userSession.getCurrentUser()) {
        deferred.reject()
        $location.path('/user');
    } else {
        deferred.resolve()
    }

    return deferred.promise;
}
var app = angular.module('softUniApp', ['ngResource', 'ngRoute'])
.config(function ($routeProvider) {
	$routeProvider.when('/ads', {
		templateUrl: 'templates/allAds.html',
		controller: 'AllAdsController',
		resolve: { loginNotRequired: loginNotRequired }
	});
	$routeProvider.when('/login', {
		templateUrl: 'templates/login.html',
		controller: 'loginController',
		resolve: { loginNotRequired: loginNotRequired }
	});
	$routeProvider.when('/register', {
		templateUrl: 'templates/register.html',
		controller: 'registerController',
		resolve: { loginNotRequired: loginNotRequired }
	});
	$routeProvider.when('/user', {
		templateUrl: 'templates/user/home.html',
		controller: 'AllAdsController',
		resolve: { loginRequired: loginRequired }
	});
	$routeProvider.when('/publish', {
		templateUrl: 'templates/user/publish.html',
		controller: 'PublishNewAd',
		resolve: { loginRequired: loginRequired }
	});
	$routeProvider.when('/userAds', {
		templateUrl: 'templates/user/userAds.html',
		controller: 'UserAdsController',
		resolve: { loginRequired: loginRequired }
	});
	$routeProvider.when('/delete/:adId', {
		templateUrl: 'templates/user/delete.html',
		controller: 'DeleteAdController',
		resolve: { loginRequired: loginRequired }
	});
	$routeProvider.when('/deactivate/:adId', {
		templateUrl: 'templates/user/deactivate.html',
		controller: 'DeactivateAdController',
		resolve: { loginRequired: loginRequired }
	});
	$routeProvider.when('/publishagain/:adId', {
		templateUrl: 'templates/user/rePublish.html',
		controller: 'PublishAgainAdController',
		resolve: { loginRequired: loginRequired }
	});
	$routeProvider.when('/edit/:adId', {
		templateUrl: 'templates/user/edit.html',
		controller: 'EditAdController',
		resolve: { loginRequired: loginRequired }
	});
	$routeProvider.when('/editprofile', {
		templateUrl: 'templates/user/editprofile.html',
		controller: 'EditProfileController',
		resolve: { loginRequired: loginRequired }
	});
	$routeProvider.when('/admin/home', {
		templateUrl: 'templates/admin/home.html',
		controller: 'AdminAllAdsController',
	});
	$routeProvider.when('/admin/users/list', {
		templateUrl: 'templates/admin/users.html',
		controller: 'AdminAllUsersController',
	});
	$routeProvider.when('/admin/categories/list', {
		templateUrl: 'templates/admin/categories.html',
		controller: 'AdminAllCategoriesController',
	});
	$routeProvider.when('/admin/towns/delete/:townId', {
		templateUrl: 'templates/admin/deletetown.html',
		controller: 'DeleteTownController',
	});
	$routeProvider.when('/admin/towns/edit/:townId', {
		templateUrl: 'templates/admin/editTown.html',
		controller: 'EditTownController',
	});
	$routeProvider.when('/admin/towns/add', {
		templateUrl: 'templates/admin/addtown.html',
		controller: 'AddTownController',
	});
	$routeProvider.when('/admin/categories/delete/:townId', {
		templateUrl: 'templates/admin/deletecategory.html',
		controller: 'DeleteCategoryController',
	});
	$routeProvider.when('/admin/categories/edit/:townId', {
		templateUrl: 'templates/admin/editcategory.html',
		controller: 'EditCategoryController',
	});
	$routeProvider.when('/admin/categories/add', {
		templateUrl: 'templates/admin/addcategory.html',
		controller: 'AddCategoryController',
	});
	$routeProvider.when('/admin/towns/list', {
		templateUrl: 'templates/admin/towns.html',
		controller: 'AdminAllTownsController',
	});
	$routeProvider.otherwise({
		templateUrl: 'templates/allAds.html',
		controller: 'AllAdsController',
		resolve: { loginNotRequired: loginNotRequired }
	});
});