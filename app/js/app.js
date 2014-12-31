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
var app = angular.module('softUniApp', ['ngResource', 'ngRoute'])
.config(function ($routeProvider, $locationProvider) {
	$locationProvider.html5Mode(true);
	$routeProvider.when('/ads', {
		templateUrl: 'templates/allAds.html',
		controller: 'AllAdsController'
	});
	$routeProvider.when('/login', {
		templateUrl: 'templates/login.html',
		controller: 'loginController'
	});
	$routeProvider.when('/register', {
		templateUrl: 'templates/register.html',
		controller: 'registerController'
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
	$routeProvider.when('/a/:adId', {
		templateUrl: 'templates/user/delete.html',
		controller: 'DeleteAdController',
		resolve: { loginRequired: loginRequired }
	});
	$routeProvider.otherwise({
		templateUrl: 'templates/allAds.html',
		controller: 'AllAdsController'
	});
});