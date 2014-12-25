var app = angular.module('softUniApp', ['ngResource', 'ngRoute'])
.config(function ($routeProvider, $locationProvider) {
	$routeProvider.when('/ads', {
		templateUrl: 'templates/allAds.html',
		controller: 'AllAdsController'
	});
	$routeProvider.when('/login', {
		templateUrl: 'templates/newAd.html',
		controller: 'AdDetailsController'
	});
	$routeProvider.otherwise({
		templateUrl: 'templates/allAds.html',
		controller: 'AllAdsController'
	});
	$locationProvider.html5Mode(true);
});