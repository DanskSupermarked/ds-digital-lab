/**
 * Main entry for the javascript.
 * Import modules and start them
 */

import lazyImages from 'ds-assets/lazy/images';
import getAll from 'ds-assets/dom/get-all';
import validateInputFields from 'ds-assets/validate/input-fields';
import navigation from './components/navigation';
import response from './components/response';
import toolTip from './components/tool-tip';
import getLoggedInData from './lib/get-logged-in-data';

navigation();
toolTip();

getAll('img').forEach(function($img) {
	$img.onload = function() {
		this.classList.add('animate--active');
	};
});
lazyImages(1);
validateInputFields();
response();
getLoggedInData().then(function(user) {
	var $body = document.querySelector('body');

	$body.classList.add('user-logged-in');

	// Admin logged in
	var admin = user.roles.some(function(role) {
		return (role.name === 'Owner' || role.name === 'Administrator');
	});
	if (admin) {
		$body.classList.add('admin-logged-in');
	}

	// Author logged in
	if (user.name === window.authorName) {
		$body.classList.add('author-logged-in');
	}
}).catch(function() {});
