import lunr from 'lunr';
import lazyImages from 'ds-assets/lazy/images';
import getAll from 'ds-assets/dom/get-all';
import stripHTMLTags from '../lib/strip-html-tags';
import searchResultTemplate from '../templates/search-result';

var $searchInput;
var $searchList;
var db = {};

var index = lunr(function() {
	this.field('title', {
		boost: 10
	});
	this.field('description');
	this.ref('id');
});

var getData = function(resource, query, map = (data) => data) {
	// Cached in local storage
	var expires = localStorage.getItem(`search:${resource}:expires`);
	if (expires && expires > Date.now()) {
		var data = localStorage.getItem(`search:${resource}:data`);
		if (data) {
			return Promise.resolve(JSON.parse(data));
		}
	}

	var url = window.ghost.url.api(resource, query);

	// Get data from api
	return fetch(url, {
			method: 'GET'
		})
		.then(function(response) {
			if (response.status !== 200) {
				return Promise.reject(response.status);
			}
			return response.json();
		})

	// Map posts
	.then(data => data[resource].map(map))

	// Cache in local storage
	.then(function(data) {
		localStorage.setItem(`search:${resource}:data`, JSON.stringify(data));

		var tomorrow = Date.now() + 24 * 60 * 60 * 1000;
		localStorage.setItem(`search:${resource}:expires`, tomorrow);
		return data;
	});
};

var buildIndex = function(resource, query, map) {
	return getData(resource, query, map).then(function(data) {
		data.forEach(function(entry) {
			db[entry.id] = entry;
			index.add(entry);
		});
	});
};

var buildPostsIndex = function() {
	return buildIndex('posts', {
		limit: 'all',
		fields: 'title,html,uuid,slug'
	}, function(post) {
		return {
			title: post.title,
			description: stripHTMLTags(post.html),
			id: post.uuid,
			url: `/${post.slug}/`,
			category: 'article'
		};
	});
};

var buildTagsIndex = function() {
	return buildIndex('tags', {
		limit: 'all',
		fields: 'description,name,slug,uuid'
	}, function(tag) {
		return {
			title: tag.name,
			description: tag.description,
			id: tag.uuid,
			url: `/tag/${tag.slug}/`,
			category: 'tag'
		};
	});
};

var buildUsersIndex = function() {
	return buildIndex('users', {
		limit: 'all',
		fields: 'bio,name,slug,uuid'
	}, function(user) {
		return {
			title: user.name,
			description: user.bio,
			id: user.uuid,
			url: `/author/${user.slug}/`,
			category: 'author'
		};
	});
};

var search = function(query) {
	return index.search(query).map(function(entry) {
		return db[entry.ref];
	});
};

var renderSearchResults = function(results) {
	var html = '';
	results.forEach(function(result) {
		html += searchResultTemplate(result);
	});
	$searchList.innerHTML = html;
	getAll('.boxes__item', $searchList).forEach(function($boxItem, i) {
		setTimeout(function() {
			$boxItem.classList.remove('hidden');
			setTimeout(() => $boxItem.classList.add('animate--active'), 0);
		}, 300 + i * 250);
	});
	lazyImages(1);
};

export default function() {
	buildPostsIndex().catch(e => console.error(e));
	buildTagsIndex().catch(e => console.error(e));
	buildUsersIndex().catch(e => console.error(e));

	$searchInput = document.querySelector('.search__input');
	$searchList = document.querySelector('.search__list');

	if (!$searchInput || !$searchList) {
		return;
	}
	$searchInput.addEventListener('input', function() {
		var results = search($searchInput.value);
		renderSearchResults(results);
	});

	$searchInput.focus();

	$searchList.setAttribute('style', `min-height: ${window.innerHeight}px`);

}
