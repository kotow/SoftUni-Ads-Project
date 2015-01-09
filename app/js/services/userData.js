app.factory('publicData', function ($http) {
	$http.defaults.headers.common['Authorization'] = "Bearer " + userSession.getCurrentUser().access_token;
	var url = 'http://softuni-ads.azurewebsites.net/api/user';
	function getUserAds(adParams) {
		return $http.get(url + '/ads', {params: adParams});
	}

	function getAdById(id) {
		return $http.get(url + '/ads/' + id);
	}

	function publishAd(adDetails) {
		return $http.post(url + "/ads", adDetails);
	}

	function publishAgain(id) {
		return $http.put(url + '/ads/publishagain/' + id);
	}

	function deactivateAd(id) {
		return $http.put(url + '/ads/deactivate/' + id);
	}

	function deleteAd(id) {
		return $http.delete(url + '/ads/' + id);
	}

	function editAd(id, adDetails) {
		return $http.put(url + '/ads/' + id, adDetails);
	}

	function getProfile() {
		return $http.get(url + "/profile");
	}

	function editProfile(info) {
		return $http.put(url + "/profile", info);
	}

	function changePassword(pass) {
		return $http.put(url + "/changepassword", pass);
	}

	return {
		getAds: getUserAds,
		publish: publishAd,
		getAd: getAdById,
		publishAgain: publishAgain,
		deactivate: deactivateAd,
		deleteAd: deleteAd,
		edit: editAd,
		getProfile: getProfile,
		editProfile: editProfile,
		changePassword: changePassword
		}
});