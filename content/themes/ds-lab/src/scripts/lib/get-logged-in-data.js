/**
 * Check if user is logged in using the ghost session. If logged in get user
 * data.
 */

// Cached promise
var dataPromise;

/**
 * Get the data for the logged in used
 * @param  {string} token
 * @return {Promise}
 */
var getUserData = function(token) {
	return fetch('/ghost/api/v0.1/users/me/?include=roles&status=all', {
		method: 'GET',
		headers: {
			'Authorization': 'Bearer ' + token
		}
	}).then(function(response) {
		if (response.status !== 200) {
			return Promise.reject('Old session');
		}
		return response.json();
	}).then(function(data) {
		return data.users[0];
	});
};

/**
 * Check if there is a Ghost session. If so use it to get the users data.
 * @return {Promise}
 */
var get = function() {

	// Ghost stores it session in localStorage
	var sessionString = localStorage.getItem('ghost:session');
	if (!sessionString) {
		return Promise.reject('No session');
	}

	// Valid session?
	var session = JSON.parse(sessionString);
	if (!session || !session.authenticated || !session.authenticated.access_token) {
		return Promise.reject('No session');
	}

	// Session expired?
	if (session.authenticated.expires_at < Date.now()) {
		return Promise.reject('Session expired');
	}

	return getUserData(session.authenticated.access_token);

};

export default function() {

	// Return cached promise if already called
	if (!dataPromise) {
		dataPromise = get();
	}
	return dataPromise;
}
