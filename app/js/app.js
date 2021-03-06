var adminRequired = function($location, $q) {  
    var deferred = $q.defer();

    if(userSession.getCurrentUser() && userSession.getCurrentUser().isAdmin) {
        deferred.resolve();
    } else {
	deferred.reject()
	if(!userSession.getCurrentUser())
        $location.path('/login');
		else
		$location.path('/user');
    }

    return deferred.promise;
}
var loginRequired = function($location, $q) {  
    var deferred = $q.defer();

    if(! userSession.getCurrentUser()) {
        deferred.reject()
        $location.path('/login');
    } else 
    if(userSession.getCurrentUser().isAdmin) {
        deferred.reject()
        $location.path('/admin/home');
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
var app = angular.module('softUniApp', ['ngResource', 'ngRoute', 'ui.bootstrap.pagination'])
.config(function ($routeProvider) {
	$routeProvider.when('/', {
		templateUrl: 'templates/allAds.html',
		controller: 'AllAdsController'
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
	$routeProvider.when('/user/ads/publish', {
		templateUrl: 'templates/user/publish.html',
		controller: 'UserController',
		resolve: { loginRequired: loginRequired }
	});
	$routeProvider.when('/user/ads', {
		templateUrl: 'templates/user/userAds.html',
		controller: 'UserController',
		resolve: { loginRequired: loginRequired }
	});
	$routeProvider.when('/user/ads/delete/:adId', {
		templateUrl: 'templates/user/delete.html',
		controller: 'UserController',
		resolve: { loginRequired: loginRequired }
	});
	$routeProvider.when('/user/ads/edit/:adId', {
		templateUrl: 'templates/user/edit.html',
		controller: 'UserController',
		resolve: { loginRequired: loginRequired }
	});
	$routeProvider.when('/user/profile', {
		templateUrl: 'templates/user/editprofile.html',
		controller: 'UserController',
		resolve: { loginRequired: loginRequired }
	});
	$routeProvider.when('/admin/home', {
		templateUrl: 'templates/admin/home.html',
		controller: 'AdminAdsController',
		resolve: {adminRequired: adminRequired}
	});
	$routeProvider.when('/admin/users/list', {
		templateUrl: 'templates/admin/users.html',
		controller: 'AdminUsersController',
		resolve: {adminRequired: adminRequired}
	});
	$routeProvider.when('/admin/categories/list', {
		templateUrl: 'templates/admin/categories.html',
		controller: 'AdminCategoriesController',
		resolve: {adminRequired: adminRequired}
	});	
	$routeProvider.when('/admin/ads/edit/:adId', {
		templateUrl: 'templates/admin/editAd.html',
		controller: 'AdminAdsController',
		resolve: {adminRequired: adminRequired}
	});
	$routeProvider.when('/admin/ads/delete/:adId', {
		templateUrl: 'templates/admin/deleteAd.html',
		controller: 'AdminAdsController',
		resolve: {adminRequired: adminRequired}
	});
	$routeProvider.when('/admin/towns/delete/:townId', {
		templateUrl: 'templates/admin/deletetown.html',
		controller: 'AdminTownsController',
		resolve: {adminRequired: adminRequired}
	});
	$routeProvider.when('/admin/towns/edit/:townId', {
		templateUrl: 'templates/admin/editTown.html',
		controller: 'AdminTownsController',
		resolve: {adminRequired: adminRequired}
	});
	$routeProvider.when('/admin/towns/add', {
		templateUrl: 'templates/admin/addtown.html',
		controller: 'AdminTownsController',
		resolve: {adminRequired: adminRequired}
	});
	$routeProvider.when('/admin/categories/delete/:categoryId', {
		templateUrl: 'templates/admin/deletecategory.html',
		controller: 'AdminCategoriesController',
		resolve: {adminRequired: adminRequired}
	});
	$routeProvider.when('/admin/categories/edit/:categoryId', {
		templateUrl: 'templates/admin/editcategory.html',
		controller: 'AdminCategoriesController',
		resolve: {adminRequired: adminRequired}
	});
	$routeProvider.when('/admin/categories/add', {
		templateUrl: 'templates/admin/addcategory.html',
		controller: 'AdminCategoriesController',
		resolve: {adminRequired: adminRequired}
	});
	$routeProvider.when('/admin/towns/list', {
		templateUrl: 'templates/admin/towns.html',
		controller: 'AdminTownsController',
		resolve: {adminRequired: adminRequired}
	});
	$routeProvider.when('/admin/users/edit/:userName', {
		templateUrl: 'templates/admin/editUser.html',
		controller: 'AdminUsersController',
		resolve: {adminRequired: adminRequired}
	});
	$routeProvider.when('/admin/users/delete/:userName', {
		templateUrl: 'templates/admin/deleteUser.html',
		controller: 'AdminUsersController',
		resolve: {adminRequired: adminRequired}
	});
	$routeProvider.otherwise({
		templateUrl: 'templates/allAds.html',
		controller: 'AllAdsController',
		resolve: { loginNotRequired: loginNotRequired }
	});
});