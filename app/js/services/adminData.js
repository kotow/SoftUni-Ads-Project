app.factory('adminData', function ($http) {
	$http.defaults.headers.common['Authorization'] = "Bearer " + userSession.getCurrentUser().access_token;
	var url = 'http://softuni-ads.azurewebsites.net/api/admin';

	function getAds(adParams) {
		return $http.get(url + '/ads', {params: adParams});
	}

	function getAdById(id) {
		return $http.get(url + '/ads/' + id);
	}

	function getTowns(adParams) {
		return $http.get(url + '/towns', {params: adParams});
	}

	function getCategories(adParams) {
		return $http.get(url + '/categories', {params: adParams});
	}

	function approveAd(id) {
		return $http.put(url + "/ads/approve/" + id);
	}

	function rejectAd(id) {
		return $http.put(url + "/ads/reject/" + id);
	}

	function deleteAd(id) {
		return $http.delete(url + '/ads/' + id);
	}

	function editAd(id, adDetails) {
		return $http.put(url + '/ads/' + id, adDetails);
	}

	function deleteTown(id) {
		return $http.delete( url + "/towns/" + id);
	}

	function getTownById(id) {
		return $http.get(url + "/towns/" + id);
	}

	function createTown(town) {
		return $http.post(url + "/towns", town);
	}

	function editTown(id, town) {
		return $http.put(url + "/towns/" + id, town);
	}
	
	function deleteCategory(id) {
		return $http.delete( url + "/categories/" + id);
	}

	function getCategoryById(id) {
		return $http.get(url + "/categories/" + id);
	}

	function createCategory(category) {
		return $http.post(url + "/categories", category);
	}

	function editCategory(id, category) {
		return $http.put(url + "/categories/" + id, category);
	}

	function deleteUser(name) {
		return $http.delete( url + "/users/" + name);
	}

	function getUsers() {
		return $http.get(url + "/users/");
	}

	function getUserById(id) {
		return $http.get(url + "/users/" + id);
	}

	function editUserProfile(name, profile) {
		return $http.put(url + "/user/" + name, profile);
	}

	function changeUserPassword(password) {
		return $http.put(url + "/setpassword", password);
	}

	function deleteUser(user) {
		return $http.put(url + "/user/" + user);
	}

	return {
		getAds: getAds,
		getAdById: getAdById,
		getTowns: getTowns,
		getCategories: getCategories,
		approveAd: approveAd,
		rejectAd: rejectAd,
		deleteAd: deleteAd,
		editAd: editAd,
		deleteTown: deleteTown,
		getTownById: getTownById,
		createTown: createTown,
		editTown: editTown,
		deleteCategory: deleteCategory,
		getCategoryById: getCategoryById,
		createCategory: createCategory,
		editCategory: editCategory,		
		getUsers: getUsers,
		getUserById: getUserById,
		editUserProfile: editUserProfile,
		changeUserPassword: changeUserPassword,
		deleteUser: deleteUser
		}
});