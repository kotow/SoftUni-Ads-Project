'use strict'

var userSession = {
    login : function(data) {
        sessionStorage['currentUser'] = JSON.stringify(data);
    },
    getCurrentUser : function() {
        var userData = sessionStorage['currentUser'];
        if (userData) {
            return JSON.parse(sessionStorage['currentUser']);
        }
    },
	isAdmin : function() {
		var userData = JSON.parse(sessionStorage['currentUser']);
		return userData.isAdmin;
	},
    logout : function() {
        delete sessionStorage['currentUser'];
    }
}