var app = angular.module('softUniApp', ['ngResource', 'ngRoute'])
.config(function ($routeProvider, $locationProvider) {
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
		controller: 'AllAdsController'
	});
	$routeProvider.when('/publish', {
		templateUrl: 'templates/user/publish.html',
		controller: 'PublishNewAd'
	});
	$routeProvider.when('/userAds', {
		templateUrl: 'templates/user/home.html',
		controller: 'UserAdsController'
	});
	$routeProvider.otherwise({
		templateUrl: 'templates/allAds.html',
		controller: 'AllAdsController'
	});
	$locationProvider.html5Mode(true);
});