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
.config(function ($routeProvider, $locationProvider) {
	//$locationProvider.html5Mode(true);
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
	$routeProvider.otherwise({
		templateUrl: 'templates/allAds.html',
		controller: 'AllAdsController',
		resolve: { loginNotRequired: loginNotRequired }
	});
});