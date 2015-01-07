app.factory('publicData', function ($http) {

	function getAllAds(adParams) {
		return $http.get('http://softuni-ads.azurewebsites.net/api/ads', {params: adParams});
	}

	function getAllTowns() {
		return $http.get('http://softuni-ads.azurewebsites.net/api/towns');
	}

	function getAllCategories() {
		return $http.get('http://softuni-ads.azurewebsites.net/api/categories');
	}

	return {
		getAds: getAllAds,
		getTowns: getAllTowns,
		getCategories: getAllCategories,
		}
});