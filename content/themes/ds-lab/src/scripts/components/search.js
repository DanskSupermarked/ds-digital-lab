import lazyImages from 'ds-assets/lazy/images';
import getAll from 'ds-assets/dom/get-all';
import * as api from '../lib/api';
import postTemplate from '../templates/post';
import authorTemplate from '../templates/author';
import tagTemplate from '../templates/tag';

const MAX_RESULTS = 10;

var $searchInput;
var $searchList;
var latestCounter = 0;

var getSearchResult = function(path) {
	var absolute = window.ghost.url.api(path, {
		include: 'tags,author,count.posts'
	});
	var relative = absolute.substr(absolute.indexOf('/ghost'), absolute.length);
	return fetch(relative)
		.then(function(response) {
			if (response.status >= 300) {
				return Promise.reject(response);
			}
			return response;
		})
		.then(response => response.json());
};

var renderResults = function(results) {
	var html = results.map(function(result) {
		if (result.posts) {
			return postTemplate(result.posts[0]);
		}
		if (result.users) {
			return authorTemplate(result.users[0]);
		}
		if (result.tags) {
			return tagTemplate(result.tags[0]);
		}
		return '';
	}).join('');
	$searchList.innerHTML = html;
	lazyImages(1);
	getAll('.boxes__item', $searchList).forEach(function($boxItem, i) {
		setTimeout(function() {
			$boxItem.classList.remove('hidden');
			setTimeout(() => $boxItem.classList.add('animate--active'), 0);
		}, i * 500);
	});
};

var search = function(query) {

	var id = ++latestCounter;
	var minTime = Date.now() + 300;

	$searchList.innerHTML = '';

	var isLatest = function(data) {
		if (id !== latestCounter) {
			return Promise.reject();
		}
		return data;
	};

	api.getSearchIndex(query)
		.then(isLatest)
		.then(function(indexes) {
			var promises = indexes.slice(0, MAX_RESULTS).map(function(index) {
				return getSearchResult(index.ref);
			});
			return Promise.all(promises);
		})
		.then(function(data) {
			if (minTime < Date.now()) {
				return data;
			}
			return new Promise(function(resolve) {
				setTimeout(() => resolve(data), minTime - Date.now());
			});
		})
		.then(isLatest)
		.then(renderResults)
		.catch(function(err) {
			if (err) {
				console.error(err);
			}
		});
};

export default function() {

	$searchInput = document.querySelector('.search__input');
	$searchList = document.querySelector('.search__list');

	if (!$searchInput || !$searchList) {
		return;
	}
	$searchInput.addEventListener('input', function() {
		search($searchInput.value);
	});

	$searchInput.focus();

	$searchList.setAttribute('style', `min-height: ${window.innerHeight}px`);

}
