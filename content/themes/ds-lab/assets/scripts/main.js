(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
module.exports={
  "seconds": 60,
  "minutes": 60,
  "hours": 24,
  "days": 7,
  "weeks": 4,
  "months": 12
}

},{}],2:[function(require,module,exports){
var converter = module.exports = {
  cutoff: require('./cutoff/cutoff.json'),
  suffixDictionary: require('./suffix/suffix-dictionary.json'),
  timeCalcs: require('./time-calculations')
}
converter.timeAgo = require('./time-ago/time-ago.js').bind(converter)

},{"./cutoff/cutoff.json":1,"./suffix/suffix-dictionary.json":3,"./time-ago/time-ago.js":4,"./time-calculations":5}],3:[function(require,module,exports){
module.exports={
  "seconds": {
    "singular": " second ago",
    "plural": " seconds ago"
  },
  "minutes": {
    "singular": " minute ago",
    "plural": " minutes ago"
  },
  "hours": {
    "singular": " hour ago",
    "plural": " hours ago"
  },
  "days": {
    "singular": " day ago",
    "plural": " days ago"
  },
  "weeks": {
    "singular": " week ago",
    "plural": " weeks ago"
  },
  "months": {
    "singular": " month ago",
    "plural": " months ago"
  },
  "years": {
    "singular": " year ago",
    "plural": " years ago"
  }
}

},{}],4:[function(require,module,exports){
module.exports = TimeAgo

function TimeAgo (pastEpoch, currentEpoch) {
  var seconds = Math.round(this.timeCalcs.seconds(pastEpoch, currentEpoch))
  var minutes = Math.round(this.timeCalcs.minutes(pastEpoch, currentEpoch))
  var hours = Math.round(this.timeCalcs.hours(pastEpoch, currentEpoch))
  var days = Math.round(this.timeCalcs.days(pastEpoch, currentEpoch))
  var weeks = Math.round(this.timeCalcs.weeks(pastEpoch, currentEpoch))
  var months = Math.round(this.timeCalcs.months(pastEpoch, currentEpoch))
  var years = Math.round(this.timeCalcs.years(pastEpoch, currentEpoch))

  var suffix = this.suffixDictionary
  var cutoff = this.cutoff

  if (seconds < cutoff.seconds) {
    return seconds + suffix.seconds[getForm(seconds)]
  } else if (minutes < cutoff.minutes) {
    return minutes + suffix.minutes[getForm(minutes)]
  } else if (hours < cutoff.hours) {
    return hours + suffix.hours[getForm(hours)]
  } else if (days < cutoff.days) {
    return days + suffix.days[getForm(days)]
  } else if (weeks < cutoff.weeks) {
    return weeks + suffix.weeks[getForm(weeks)]
  } else if (months < cutoff.months) {
    return months + suffix.months[getForm(months)]
  } else {
    return years + suffix.years[getForm(years)]
  }
}

function getForm (value) {
  if (value === 1) {
    return 'singular'
  }
  return 'plural'
}

},{}],5:[function(require,module,exports){
module.exports = {
  seconds: require('./time-ago/seconds-ago.js'),
  minutes: require('./time-ago/minutes-ago.js'),
  hours: require('./time-ago/hours-ago.js'),
  days: require('./time-ago/days-ago.js'),
  weeks: require('./time-ago/weeks-ago.js'),
  months: require('./time-ago/months-ago.js'),
  years: require('./time-ago/years-ago.js')
}

},{"./time-ago/days-ago.js":6,"./time-ago/hours-ago.js":7,"./time-ago/minutes-ago.js":8,"./time-ago/months-ago.js":9,"./time-ago/seconds-ago.js":10,"./time-ago/weeks-ago.js":11,"./time-ago/years-ago.js":12}],6:[function(require,module,exports){
module.exports = DaysAgo

function DaysAgo (pastEpoch, currentEpoch) {
  var daysAgo = (currentEpoch - pastEpoch) / 1000 / 60 / 60 / 24
  return daysAgo
}

},{}],7:[function(require,module,exports){
module.exports = HoursAgo

function HoursAgo (pastEpoch, currentEpoch) {
  var hoursAgo = (currentEpoch - pastEpoch) / 1000 / 60 / 60
  return hoursAgo
}

},{}],8:[function(require,module,exports){
module.exports = MinutesAgo

function MinutesAgo (pastEpoch, currentEpoch) {
  var minutesAgo = (currentEpoch - pastEpoch) / 1000 / 60
  return minutesAgo
}

},{}],9:[function(require,module,exports){
module.exports = MonthsAgo

function MonthsAgo (pastEpoch, currentEpoch) {
  var monthsAgo = (currentEpoch - pastEpoch) / 1000 / 60 / 60 / 24 / 31
  return monthsAgo
}

},{}],10:[function(require,module,exports){
module.exports = SecondsAgo

function SecondsAgo (pastEpoch, currentEpoch) {
  var secondsAgo = (currentEpoch - pastEpoch) / 1000
  return secondsAgo
}

},{}],11:[function(require,module,exports){
module.exports = WeeksAgo

function WeeksAgo (pastEpoch, currentEpoch) {
  var weeksAgo = (currentEpoch - pastEpoch) / 1000 / 60 / 60 / 24 / 7
  return weeksAgo
}

},{}],12:[function(require,module,exports){
module.exports = YearsAgo

function YearsAgo (pastEpoch, currentEpoch) {
  var yearsAgo = (currentEpoch - pastEpoch) / 1000 / 60 / 60 / 24 / 31 / 12
  return yearsAgo
}

},{}],13:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function () {

  var $nav = document.querySelector('.nav');
  if (!$nav) {
    return;
  }

  var $body = document.querySelector('body');

  // Clone navigation and make the new one sticky
  var $stickyNav = $nav.cloneNode(true);
  $stickyNav.classList.add('nav--sticky');
  $body.insertBefore($stickyNav, $body.firstChild);

  // Activate the sticky navigation when the user scrolls up.
  // This will firs take effect, when the user has scrolled "a screen" down.
  (0, _scrollChange2.default)(function () {
    $stickyNav.classList.remove('nav--active');
  }, function () {
    $stickyNav.classList.add('nav--active');
  }, window.innerHeight);

  /**
   * Hide sticky navigation when scrolled to the top of the document
   * @return {void}
   */
  var onTop = function onTop() {
    var scrollPos = window.scrollY || document.documentElement.scrollTop;
    if (scrollPos <= 0) {
      $stickyNav.classList.add('nav--hidden');
      $stickyNav.classList.remove('nav--active');
    } else {
      $stickyNav.classList.remove('nav--hidden');
    }
  };

  window.addEventListener('scroll', (0, _debounce2.default)(onTop));
  window.addEventListener('resize', (0, _debounce2.default)(onTop));

  // Change wording on "sign in" button when user is logged in
  (0, _getLoggedInData2.default)().then(function () {
    (0, _getAll2.default)('.nav__item--sign-in').forEach(function ($signin) {
      $signin.innerHTML = 'Create a story';
    });
  }).catch(function () {});
};

var _scrollChange = require('ds-assets/scroll/scroll-change');

var _scrollChange2 = _interopRequireDefault(_scrollChange);

var _debounce = require('ds-assets/async/debounce');

var _debounce2 = _interopRequireDefault(_debounce);

var _getAll = require('ds-assets/dom/get-all');

var _getAll2 = _interopRequireDefault(_getAll);

var _getLoggedInData = require('../lib/get-logged-in-data');

var _getLoggedInData2 = _interopRequireDefault(_getLoggedInData);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

},{"../lib/get-logged-in-data":20,"ds-assets/async/debounce":32,"ds-assets/dom/get-all":34,"ds-assets/scroll/scroll-change":38}],14:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

exports.default = function () {
	$responseForm = document.querySelector('.responses__form');

	if (!$responseForm) {
		return;
	}

	// Cache dom elements
	$cta = $responseForm.querySelector('.btn--cta');
	$responsesList = document.querySelector('.responses__list');
	$validators = (0, _getAll2.default)('.validate', $responseForm);

	// Update from as user types
	(0, _liveValidation2.default)($validators, updateResponseCTA);

	// Render responses and like
	renderMeta();

	// Change form if user is logged in
	(0, _getLoggedInData2.default)().then(renderUserForm).catch(function () {});

	// User already likes this article
	if (localStorage.getItem('like:' + window.postId)) {
		liked();
	}

	(0, _getAll2.default)('.share__like').forEach(attachLikeEvent);
	$cta.addEventListener('click', submitResponse);

	// Show markdown helpers
	document.querySelector('.response-form__markdown-expander').addEventListener('click', function (e) {
		e.preventDefault();
		document.querySelector('.response-form__markdown-helpers').classList.remove('hidden');
	});
};

var _getAll = require('ds-assets/dom/get-all');

var _getAll2 = _interopRequireDefault(_getAll);

var _images = require('ds-assets/lazy/images');

var _images2 = _interopRequireDefault(_images);

var _api = require('../lib/api');

var api = _interopRequireWildcard(_api);

var _getLoggedInData = require('../lib/get-logged-in-data');

var _getLoggedInData2 = _interopRequireDefault(_getLoggedInData);

var _responseMeta = require('../templates/response-meta');

var _responseMeta2 = _interopRequireDefault(_responseMeta);

var _response = require('../templates/response');

var _response2 = _interopRequireDefault(_response);

var _getDocumentOffsetTop = require('ds-assets/dom/get-document-offset-top');

var _getDocumentOffsetTop2 = _interopRequireDefault(_getDocumentOffsetTop);

var _liveValidation = require('../lib/form/live-validation');

var _liveValidation2 = _interopRequireDefault(_liveValidation);

var _validate = require('../lib/form/validate');

var _validate2 = _interopRequireDefault(_validate);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Cached dom elements
var $responseForm; /**
                    * Handle responses and likes in posts
                    */

// Dependencies

var $cta;
var $validators;
var $responsesList;
var renderResponses;
var addDeleteEvents;
var setResponsesNumber;
var addReadMoreEvent;

var updateResponseCTA = function updateResponseCTA(valid) {
	if (valid) {
		$cta.classList.remove('btn--disabled');
	} else {
		$cta.classList.add('btn--disabled');
	}
};

/**
 * Delete response when delete icon clicked
 */
addDeleteEvents = function addDeleteEvents() {
	(0, _getAll2.default)('.response__delete').forEach(function ($delete) {
		$delete.addEventListener('click', function (e) {
			e.preventDefault();
			api.removeResponse($delete.dataset.published, $delete.dataset.name).then(function (data) {
				renderResponses(data.responses);
				setResponsesNumber(data.responses);
			});
		});
	});
};

/**
 * Expand response with full text when read more button is activated.
 * Basically it hides the excerpt and the read more button and displays the
 * full text.
 * @param {element} $response
 */
addReadMoreEvent = function addReadMoreEvent($response) {
	var $readMore = $response.querySelector('.response__read-more');
	if (!$readMore) {
		return;
	}
	$readMore.addEventListener('click', function (e) {
		e.preventDefault();
		var $excerpt = $response.querySelector('.response__excerpt');
		var $readMoreContainer = $readMore.parentNode;

		$readMoreContainer.parentNode.removeChild($readMoreContainer);
		$excerpt.parentNode.removeChild($excerpt);

		$response.querySelector('.response__text').classList.remove('hidden');
	});
};

/**
 * Render templates for responses and insert html in the responses list.
 * - Lazy load images in responses
 * - Attach new events in responses
 * @param  {array} responses
 * @return {void}
 */
renderResponses = function renderResponses(responses) {
	var html = '';
	responses.forEach(function (response) {
		html += (0, _response2.default)(response);
	});
	$responsesList.innerHTML = html;
	(0, _images2.default)(1);
	addDeleteEvents();
	(0, _getAll2.default)('.response', $responsesList).forEach(addReadMoreEvent);
};

/**
 * Update the count of responses
 * @param {array} responses
 */
setResponsesNumber = function setResponsesNumber(responses) {
	document.querySelector('.share__responses').innerHTML = responses.length;
};

/**
 * Update the count fo likes for this post
 * @param {number} likes
 */
var setLikesNumber = function setLikesNumber(likes) {
	document.querySelector('.share__likes').innerHTML = likes;
};

/**
 * Get data from api with meta data: responses and likes.
 * Render this in the dom.
 * @return {void}
 */
var renderMeta = function renderMeta() {
	api.getMeta().then(function (data) {
		renderResponses(data.responses);
		setResponsesNumber(data.responses);
		setLikesNumber(data.likes);
	});
};

/**
 * Post new response to post
 * - checks for validation before posting
 * @param  {event} e
 * @return {void}
 */
var submitResponse = function submitResponse(e) {
	e.preventDefault();

	var loggedIn = document.querySelector('body').classList.contains('user-logged-in');

	// If a field is not valid this field will get focus, so the user quickly can update the value.
	var notValid = $validators.some(function ($validator) {
		if ($validator.classList.contains('validate--not-valid')) {
			var $validateField = $validator.querySelector('input, textarea');
			$validateField.focus();
			return true;
		}
	});

	if (notValid) {
		return;
	}

	// Create a response object based on values in form
	var response = {};
	(0, _getAll2.default)('input, textarea', $responseForm).forEach(function ($field) {
		var name = $field.getAttribute('name');
		if ($field.value) {
			response[name] = $field.value;
		}
	});

	$cta.innerHTML = 'Posting...';
	$cta.classList.add('btn--disabled');
	api.addResponse(response).then(function (data) {
		renderResponses(data.responses);
		setResponsesNumber(data.responses);

		// Scroll to new response
		var $lastResponse = $responsesList.querySelector('.response:last-child');
		var offset = (0, _getDocumentOffsetTop2.default)($lastResponse);
		window.scrollTo(0, offset - 0.5 * window.innerHeight);

		// Reset form
		$cta.innerHTML = 'Respond';
		if (loggedIn) {
			var $text = $responseForm.querySelector('.responses-form__text');
			$text.classList.add('validate--not-valid');
			$text.classList.remove('validate--valid');
			$text.querySelector('textarea').value = '';
		} else {
			$validators.forEach(function ($validator) {
				if ($validator.dataset.validateRequired !== undefined) {
					$validator.classList.add('validate--not-valid');
					$validator.classList.remove('validate--valid');
				}
				$validator.querySelector('input, textarea').value = '';
			});
		}
	});
};

/**
 * Update heart (like) icons to indicate, that the user have liked the article
 * @return {void}
 */
var liked = function liked() {
	var $toolTipIcon = document.querySelector('.tool-tip__like-icon');
	$toolTipIcon.setAttribute('src', '/assets/images/heart--inverse--active.svg');
	$toolTipIcon.setAttribute('data-src', '/assets/images/heart--inverse--active.svg');

	var $footerIcon = document.querySelector('.post-footer__like-icon');
	$footerIcon.setAttribute('src', '/assets/images/heart--active.svg');
	$footerIcon.setAttribute('data-src', '/assets/images/heart--active.svg');

	// Indicates, that the like button no longer is clickable
	(0, _getAll2.default)('.share__like').forEach(function ($like) {
		return $like.classList.add('disabled');
	});
};

/**
 * Activate like, when like buttons are clicked
 * @param  {element} $anchor
 * @return {void}
 */
var attachLikeEvent = function attachLikeEvent($anchor) {
	$anchor.addEventListener('click', function (e) {
		e.preventDefault();

		// Already liked this article
		if (localStorage.getItem('like:' + window.postId)) {
			return;
		}

		localStorage.setItem('like:' + window.postId, true);
		liked();

		api.like().then(function (data) {
			setLikesNumber(data.likes);
		});
	});
};

/**
 * Update responses form if user is logged in.
 * User do not need to fill e-mail, name etc.
 * @param  {object} data
 * @return {void}
 */
var renderUserForm = function renderUserForm(user) {
	var html = (0, _responseMeta2.default)(user);
	var $meta = document.createElement('div');
	$meta.innerHTML = html;
	var $header = document.querySelector('.responses__form h3');

	// Fill input fields with relevant data
	(0, _getAll2.default)('.responses__form input').forEach(function ($input) {
		var name = $input.getAttribute('name');
		if (name === 'website') {
			$input.value = '/author/' + user.slug;
		} else {
			$input.value = user[name];
		}
		$input.parentNode.classList.add('validate--valid');
		$input.parentNode.classList.remove('validate--not-valid');
	});

	// Insert after header
	$header.parentNode.insertBefore($meta, $header.nextSibling);
	(0, _images2.default)(1);
	(0, _validate2.default)($validators, updateResponseCTA);
};

/**
 * Init responses
 * @return {void}
 */

},{"../lib/api":17,"../lib/form/live-validation":18,"../lib/form/validate":19,"../lib/get-logged-in-data":20,"../templates/response":29,"../templates/response-meta":28,"ds-assets/dom/get-all":34,"ds-assets/dom/get-document-offset-top":35,"ds-assets/lazy/images":36}],15:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

exports.default = function () {

	$searchInput = document.querySelector('.search__input');
	$searchList = document.querySelector('.search__list');

	if (!$searchInput || !$searchList) {
		return;
	}
	$searchInput.addEventListener('input', function () {
		search($searchInput.value);
	});

	$searchInput.focus();

	$searchList.setAttribute('style', 'min-height: ' + window.innerHeight + 'px');
};

var _images = require('ds-assets/lazy/images');

var _images2 = _interopRequireDefault(_images);

var _getAll = require('ds-assets/dom/get-all');

var _getAll2 = _interopRequireDefault(_getAll);

var _api = require('../lib/api');

var api = _interopRequireWildcard(_api);

var _post = require('../templates/post');

var _post2 = _interopRequireDefault(_post);

var _author = require('../templates/author');

var _author2 = _interopRequireDefault(_author);

var _tag = require('../templates/tag');

var _tag2 = _interopRequireDefault(_tag);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var MAX_RESULTS = 10;

var $searchInput;
var $searchList;
var latestCounter = 0;

var getSearchResult = function getSearchResult(path) {
	var absolute = window.ghost.url.api(path, {
		include: 'tags,author,count.posts'
	});
	var relative = absolute.substr(absolute.indexOf('/ghost'), absolute.length);
	return fetch(relative).then(function (response) {
		if (response.status >= 300) {
			return Promise.reject(response);
		}
		return response;
	}).then(function (response) {
		return response.json();
	});
};

var renderResults = function renderResults(results) {
	var html = results.map(function (result) {
		if (result.posts) {
			return (0, _post2.default)(result.posts[0]);
		}
		if (result.users) {
			return (0, _author2.default)(result.users[0]);
		}
		if (result.tags) {
			return (0, _tag2.default)(result.tags[0]);
		}
		return '';
	}).join('');
	$searchList.innerHTML = html;
	(0, _images2.default)(1);
	(0, _getAll2.default)('.boxes__item', $searchList).forEach(function ($boxItem, i) {
		setTimeout(function () {
			$boxItem.classList.remove('hidden');
			setTimeout(function () {
				return $boxItem.classList.add('animate--active');
			}, 0);
		}, i * 500);
	});
};

var search = function search(query) {

	var id = ++latestCounter;
	var minTime = Date.now() + 300;

	$searchList.innerHTML = '';

	var isLatest = function isLatest(data) {
		if (id !== latestCounter) {
			return Promise.reject();
		}
		return data;
	};

	api.getSearchIndex(query).then(isLatest).then(function (indexes) {
		var promises = indexes.slice(0, MAX_RESULTS).map(function (index) {
			return getSearchResult(index.ref);
		});
		return Promise.all(promises);
	}).then(function (data) {
		if (minTime < Date.now()) {
			return data;
		}
		return new Promise(function (resolve) {
			setTimeout(function () {
				return resolve(data);
			}, minTime - Date.now());
		});
	}).then(isLatest).then(renderResults).catch(function (err) {
		if (err) {
			console.error(err);
		}
	});
};

},{"../lib/api":17,"../templates/author":26,"../templates/post":27,"../templates/tag":30,"ds-assets/dom/get-all":34,"ds-assets/lazy/images":36}],16:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

exports.default = function () {
	$postContent = document.querySelector('.content');
	$toolTip = document.querySelector('.tool-tip');

	if (!$postContent || !$toolTip) {
		return;
	}

	$responseForm = document.querySelector('.responses__form');
	$cta = $responseForm.querySelector('.btn--cta');

	$twitter = $toolTip.querySelector('.tool-tip__twitter');

	document.addEventListener('mouseup', placeToolTip);
	document.addEventListener('keyup', placeToolTip);

	// Fill form with selected text to make a quick response on the article by
	// the user
	var $responseText = document.querySelector('.responses__form textarea');
	$toolTip.querySelector('.tool-tip__response').addEventListener('click', function (e) {
		e.preventDefault();
		var highlightedText = getSelectedText();
		$responseText.value = '> ' + highlightedText + '\n\n';
		$responseText.focus();
		$responseText.parentNode.classList.add('validate--valid');
		$responseText.parentNode.classList.remove('validate--not-valid');
		var valid = (0, _validate2.default)((0, _getAll2.default)('.validate', $responseForm));
		if (valid) {
			$cta.classList.remove('btn--disabled');
		} else {
			$cta.classList.add('btn--disabled');
		}
	});
};

var _validate = require('../lib/form/validate');

var _validate2 = _interopRequireDefault(_validate);

var _getAll = require('ds-assets/dom/get-all');

var _getAll2 = _interopRequireDefault(_getAll);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Cached dom elements
/**
 * Tool tip showed when user marks text in article.
 * This makes the use able to share/comment on the marked.
 */

var $postContent;
var $toolTip;
var $twitter;
var $responseForm;
var $cta;

/**
 * Get the text selected by the user
 * @return {string}
 */
var getSelectedText = function getSelectedText() {
	var text = '';
	if (typeof window.getSelection !== 'undefined') {
		text = window.getSelection().toString();
	} else if (typeof document.selection !== 'undefined' && document.selection.type === 'Text') {
		text = document.selection.createRange().text;
	}
	return text;
};

/**
 * Check if the selected text is inside the content container
 * @param  {object}  selection
 * @return {Boolean}
 */
var isInsideContent = function isInsideContent(selection) {
	var $container = selection.anchorNode.parentElement;

	while ($container !== $postContent && $container.parentNode) {
		$container = $container.parentNode;
	}

	return $container === $postContent;
};

/**
 * Places the tool tip above the selected text
 * @return {void}
 */
var placeToolTip = function placeToolTip() {

	// Timeout to make sure the text has been selected
	setTimeout(function () {

		var highlightedText = getSelectedText();

		// Hide tool tip if nothing is selected
		if (!highlightedText) {
			$toolTip.classList.remove('tool-tip--visible');
			return;
		}

		// Display tool tip if selection is inside the content container
		var selection = window.getSelection();
		if (!isInsideContent(selection)) {
			$toolTip.classList.remove('tool-tip--visible');
			return;
		}

		// Change contextual actions
		$twitter.setAttribute('href', 'https://twitter.com/intent/tweet?text=' + encodeURIComponent('"' + highlightedText + '" - ' + $twitter.dataset.url));

		// Show and place tool tip
		var scrollPosition = window.scrollY || document.documentElement.scrollTop;
		var range = selection.getRangeAt(0);
		var rect = range.getBoundingClientRect();
		$toolTip.style.top = rect.top + scrollPosition + 'px';
		$toolTip.classList.add('tool-tip--visible');
		$toolTip.style.left = 0.5 * rect.left + 0.5 * rect.right - 0.5 * $toolTip.clientWidth + 'px';
	}, 10);
};

},{"../lib/form/validate":19,"ds-assets/dom/get-all":34}],17:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
/**
 * Helpers for communicating with the meta api holding responses and likes for
 * the articles.
 */

var apiUrl = window.apiURL;
var id = window.postId;

/**
 * Make a AJAX call to the api
 * @param  {String} path
 * @param  {String} method
 * @param  {object} data
 * @return {Promise}
 */
var request = function request() {
  var path = arguments.length <= 0 || arguments[0] === undefined ? '' : arguments[0];
  var method = arguments.length <= 1 || arguments[1] === undefined ? 'GET' : arguments[1];
  var data = arguments.length <= 2 || arguments[2] === undefined ? null : arguments[2];


  var fetchOptions = {
    method: method,
    headers: {
      'Content-Type': 'application/json; charset=utf-8'
    }
  };

  if (data) {
    fetchOptions.body = JSON.stringify(data);
  }

  // Perform the ajax call
  return fetch(apiUrl + path, fetchOptions).then(function (response) {
    if (response.status >= 300) {
      return Promise.reject(response);
    }
    return response;
  }).then(function (response) {
    return response.json();
  });
};

/**
 * Get meta data from the article. If no meta data is present for the actual
 * article and new entry will be made.
 * @param  {boolean} raw Whether to include computed fields
 * @return {Promise}
 */
var getMeta = exports.getMeta = function getMeta(raw) {
  var query = '?id=' + id;
  if (raw) {
    query += '&raw';
  }
  return request(query).catch(function () {
    return request('', 'POST', {
      responses: [],
      likes: 0,
      id: id
    });
  });
};

var getSearchIndex = exports.getSearchIndex = function getSearchIndex(query) {
  return request('search?q=' + query);
};

/**
 * Increment the like value with one
 * @return {Promise}
 */
var like = exports.like = function like() {
  return getMeta(id, true).then(function (data) {
    return request('?id=' + id, 'PUT', {
      likes: data.likes + 1
    });
  });
};

/**
 * Update author email used to send e-mails when a response i received.
 * @return {Promise}
 */
var updateAuthorEmail = exports.updateAuthorEmail = function updateAuthorEmail(authorEmail) {
  if (!id) {
    return Promise.reject(new Error('No postId'));
  }
  return request('?id=' + id, 'PUT', {
    authorEmail: authorEmail
  });
};

/**
 * Add a response
 * @param {object} response
 * @return {Promise}
 */
var addResponse = exports.addResponse = function addResponse(response) {
  return getMeta(true).then(function (data) {

    // Set the publish data to now
    response.published = new Date().toISOString();

    // Update the responses list
    data.responses.push(response);
    return request('?id=' + id, 'PUT', {
      responses: data.responses
    });
  });
};

/**
 * Remove a response
 * @param  {string} published
 * @param  {string} name
 * @return {Promise}
 */
var removeResponse = exports.removeResponse = function removeResponse(published, name) {
  return getMeta(true).then(function (data) {

    // Remove respose which matches on publish date and author name
    var responses = data.responses.filter(function (response) {
      return response.published !== published || response.name !== name;
    });

    return request('?id=' + id, 'PUT', {
      responses: responses
    });
  });
};

},{}],18:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

exports.default = function ($validators, callback) {
	$validators.forEach(function ($validateContainer) {
		var $validateField = $validateContainer.querySelector('input, textarea');

		$validateField.addEventListener('input', function () {
			var valid = (0, _validate2.default)($validators);
			callback(valid);
		});
	});
};

var _validate = require('./validate');

var _validate2 = _interopRequireDefault(_validate);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

},{"./validate":19}],19:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

exports.default = function ($validators) {
	var notValid = $validators.some(function ($validator) {
		if ($validator.dataset.validateRequired !== undefined) {
			return !$validator.classList.contains('validate--valid');
		} else {
			return $validator.classList.contains('validate--not-valid');
		}
	});

	return !notValid;
};

},{}],20:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

exports.default = function () {

	// Return cached promise if already called
	if (!dataPromise) {
		dataPromise = get();
	}
	return dataPromise;
};

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
var getUserData = function getUserData(token) {
	return fetch('/ghost/api/v0.1/users/me/?include=roles&status=all', {
		method: 'GET',
		headers: {
			'Authorization': 'Bearer ' + token
		}
	}).then(function (response) {
		if (response.status !== 200) {
			return Promise.reject('Old session');
		}
		return response.json();
	}).then(function (data) {
		return data.users[0];
	});
};

/**
 * Check if there is a Ghost session. If so use it to get the users data.
 * @return {Promise}
 */
var get = function get() {

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

},{}],21:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (string) {
  var htmlEncodedValue = document.createElement('div').appendChild(document.createTextNode(string)).parentNode.innerHTML;
  return htmlEncodedValue.replace(/\r?\n/g, '<br>');
};

},{}],22:[function(require,module,exports){
'use strict';

var _getAll = require('ds-assets/dom/get-all');

var _getAll2 = _interopRequireDefault(_getAll);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = function (raw) {
	var $container = document.createElement('div');
	$container.innerHTML = raw;
	(0, _getAll2.default)('img', $container).forEach(function ($img) {
		var $imgWrapper = document.createElement('div');
		$imgWrapper.classList.add('img-wrapper');
		$imgWrapper.innerHTML = '<div class="img-container"><img></div>';
		var src = $img.getAttribute('src');
		var alt = $img.getAttribute('alt');
		var padding = 50;

		// Lazy load all but the first image
		var $newImg = $imgWrapper.querySelector('img');

		$newImg.setAttribute('data-src', src);
		$newImg.setAttribute('class', 'lazy-image');

		alt.split(';').forEach(function (str) {
			if (str === 'full-size' || str === 'full-width') {
				$imgWrapper.classList.add('full-width');
			} else if (str.indexOf('ratio=') === 0) {
				var ratio = str.replace('ratio=', '');
				if (ratio.indexOf(':')) {
					var dimensions = ratio.split(':');
					ratio = dimensions[0] / dimensions[1];
				}
				padding = 100 / ratio;
			} else if (str === 'borders') {
				$imgWrapper.querySelector('.img-container').classList.add('img-container--borders');
			} else {
				alt = str;
			}
		});

		$newImg.setAttribute('alt', alt);
		$newImg.setAttribute('title', $img.getAttribute('title'));

		$imgWrapper.querySelector('.img-container').setAttribute('style', 'padding-bottom:' + padding + '%');

		$img.parentNode.outerHTML = $imgWrapper.outerHTML;
	});
	return $container.innerHTML;
};

},{"ds-assets/dom/get-all":34}],23:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

exports.default = function (html) {
	var text = (0, _stripHtmlTags2.default)(html);
	var words = (0, _wordCount2.default)(text);
	var readTime = Math.ceil(words / 300);

	var affix = ' min';
	if (readTime > 1) {
		affix += 's';
	}

	return readTime + affix;
};

var _stripHtmlTags = require('./strip-html-tags');

var _stripHtmlTags2 = _interopRequireDefault(_stripHtmlTags);

var _wordCount = require('word-count');

var _wordCount2 = _interopRequireDefault(_wordCount);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

},{"./strip-html-tags":24,"word-count":31}],24:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

exports.default = function (html) {
	var tmp = document.createElement('div');
	tmp.innerHTML = html;
	return tmp.textContent || tmp.innerText || '';
};

},{}],25:[function(require,module,exports){
'use strict';

var _images = require('ds-assets/lazy/images');

var _images2 = _interopRequireDefault(_images);

var _getAll = require('ds-assets/dom/get-all');

var _getAll2 = _interopRequireDefault(_getAll);

var _inputFields = require('ds-assets/validate/input-fields');

var _inputFields2 = _interopRequireDefault(_inputFields);

var _navigation = require('./components/navigation');

var _navigation2 = _interopRequireDefault(_navigation);

var _response = require('./components/response');

var _response2 = _interopRequireDefault(_response);

var _toolTip = require('./components/tool-tip');

var _toolTip2 = _interopRequireDefault(_toolTip);

var _search = require('./components/search');

var _search2 = _interopRequireDefault(_search);

var _getLoggedInData = require('./lib/get-logged-in-data');

var _getLoggedInData2 = _interopRequireDefault(_getLoggedInData);

var _api = require('./lib/api');

var api = _interopRequireWildcard(_api);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _navigation2.default)(); /**
                              * Main entry for the javascript.
                              * Import modules and start them
                              */

(0, _toolTip2.default)();
(0, _search2.default)();

(0, _getAll2.default)('img').forEach(function ($img) {
	$img.onload = function () {
		this.classList.add('animate--active');
	};
});
(0, _images2.default)(1);
(0, _inputFields2.default)();
(0, _response2.default)();
(0, _getLoggedInData2.default)().then(function (user) {
	var $body = document.querySelector('body');

	$body.classList.add('user-logged-in');

	// Admin logged in
	var admin = user.roles.some(function (role) {
		return role.name === 'Owner' || role.name === 'Administrator';
	});
	if (admin) {
		$body.classList.add('admin-logged-in');
	}

	// Author logged in
	if (user.name === window.authorName) {
		$body.classList.add('author-logged-in');
		return api.updateAuthorEmail(user.email);
	}
}).catch(function () {});

},{"./components/navigation":13,"./components/response":14,"./components/search":15,"./components/tool-tip":16,"./lib/api":17,"./lib/get-logged-in-data":20,"ds-assets/dom/get-all":34,"ds-assets/lazy/images":36,"ds-assets/validate/input-fields":41}],26:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

exports.default = function (author) {

    var authorImage = '';
    if (author.image) {
        authorImage = '<td width="5%"><img src="' + author.image + '" class="author__image round-img"></td>';
    }

    var coverImage = '';
    if (author.cover) {
        coverImage = '\n<img data-src="' + author.cover + '" class="lazy-image full-width img-full-width" alt="' + author.name + '" >\n';
    }

    return '\n<article class="boxes__item small animate animate__fade-in">\n  <header class="author">\n      <table>\n          <tr>\n              ' + authorImage + '\n              <td><span class="author__name"><a href="/author/' + author.slug + '">' + author.name + '</a></span><br>\n              \t' + author.count.posts + ' articles\n              </td>\n          </tr>\n      </table>\n  </header>\n  ' + coverImage + '\n  <p>' + (author.bio || '') + '</p>\n  <p><a href="/author/' + author.slug + '/" class="btn">Articles by author</a></p>\n</article>\n';
};

},{}],27:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

exports.default = function (post) {

	var authorImage = '';
	if (post.author.image) {
		authorImage = '<td width="5%"><img src="' + post.author.image + '" class="author__image round-img"></td>';
	}

	var tags = '';
	if (post.tags) {
		tags = '<br><span class="tags">' + post.tags.map(function (tag) {
			return '<a href="/tag/' + tag.slug + '/">' + tag.name + '</a>';
		}).join('') + '</span>';
	}

	var published = new Date(post.published_at).getTime();
	var now = Date.now();
	var timeAgo = _epochToTimeago2.default.timeAgo(published, now);

	var html = (0, _imageConverter2.default)(post.html);
	var excerpt = html.substr(0, html.indexOf('</p>') + 4);

	return '\n<article class="boxes__item small animate animate__fade-in">\n  <header class="author">\n      <table>\n          <tr>\n              ' + authorImage + '\n              <td><span class="author__name"><a href="/author/' + post.author.slug + '">' + post.author.name + '</a></span><br>\n              ' + timeAgo + ' &middot; ' + (0, _readTime2.default)(post.html) + ' read' + tags + '</td>\n          </tr>\n      </table>\n  </header>\n  ' + excerpt + '\n  <p><a href="/' + post.slug + '/" class="btn">Read article</a></p>\n</article>\n';
};

var _imageConverter = require('../lib/image-converter');

var _imageConverter2 = _interopRequireDefault(_imageConverter);

var _readTime = require('../lib/read-time');

var _readTime2 = _interopRequireDefault(_readTime);

var _epochToTimeago = require('epoch-to-timeago');

var _epochToTimeago2 = _interopRequireDefault(_epochToTimeago);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

},{"../lib/image-converter":22,"../lib/read-time":23,"epoch-to-timeago":2}],28:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
		value: true
});

exports.default = function (user) {
		var image = '';
		if (user.image) {
				image = '\n<td width="5%"><img data-src="' + user.image + '" class="author__image author__image--small lazy-image img-bg round-img"></td>\n\t\t';
		}

		return '\n<div class="author small">\n  <table><tbody><tr>\n\t\t' + image + '\n    <td>\n      <span class="author__name">' + user.name + '</span>\n    </td>\n  </tr></tbody></table>\n</div>\n';
};

},{}],29:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (response) {

  var classes = 'response boxes__item';
  if (response.name.toLowerCase() === window.authorName.toLowerCase()) {
    classes += ' boxes__item--transparent';
  }

  var image = '';
  if (response.image) {
    image = '<td width="5%"><img data-src="' + response.image + '" class="author__image author__image--small lazy-image img-bg round-img"></td>';
  }

  var readTime = '';
  if (response.readTime) {
    readTime = ' &middot; ' + response.readTime + ' read';
  }

  var excerpt = response.excerpt || response.html;

  var readMore = '';
  if (response.excerpt) {
    readMore = '\n<div class="response__text hidden">' + response.html + '</div>\n<p><a href="#" class="btn response__read-more">Read more</a></p>\n';
  }

  var name = '' + (0, _htmlEncode2.default)(response.name);
  if (response.website) {
    name = '<a href="' + (0, _htmlEncode2.default)(response.website) + '">' + name + '</a>';
  }

  return '\n<div class="' + classes + ' small">\n  <div class="author">\n    <table>\n      <tr>\n        ' + image + '\n        <td>\n          <span class="author__name">' + name + '</span><br>\n          ' + response.timeAgo + readTime + '\n        </td>\n      </tr>\n    </table>\n  </div>\n  <a href="#" class="response__delete" data-published="' + response.published + '" data-name="' + response.name + '"><img data-src="/assets/images/trash.svg" class="lazy-image"></a>\n  <div class="response__excerpt">' + excerpt + '</div>\n  ' + readMore + '\n</div>';
};

var _htmlEncode = require('../lib/html-encode');

var _htmlEncode2 = _interopRequireDefault(_htmlEncode);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

},{"../lib/html-encode":21}],30:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (tag) {

  console.log(tag);

  var coverImage = '';
  if (tag.image) {
    coverImage = '\n<img data-src="' + tag.image + '" class="lazy-image full-width img-full-width" alt="' + tag.name + '" >\n';
  }

  return '\n<article class="boxes__item small animate animate__fade-in">\n  <header class="author">\n      <table>\n          <tr>\n              <td><span class="author__name"><a href="/tag/' + tag.slug + '">' + tag.name + '</a></span><br>\n              \t' + tag.count.posts + ' articles\n              </td>\n          </tr>\n      </table>\n  </header>\n  ' + coverImage + '\n  <p>' + (tag.description || '') + '</p>\n  <p><a href="/tag/' + tag.slug + '/" class="btn">Articles in category</a></p>\n</article>\n';
};

},{}],31:[function(require,module,exports){
/**
 * Word Count
 *
 * Word count in respect of CJK characters.
 *
 * Copyright (c) 2015 by Hsiaoming Yang.
 */

var pattern = /[a-zA-Z0-9_\u0392-\u03c9\u00c0-\u00ff\u0600-\u06ff]+|[\u4e00-\u9fff\u3400-\u4dbf\uf900-\ufaff\u3040-\u309f\uac00-\ud7af]+/g;

module.exports = function (data) {
  var m = data.match(pattern);
  var count = 0;
  for (var i = 0; i < m.length; i++) {
    if (m[i].charCodeAt(0) >= 0x4e00) {
      count += m[i].length;
    } else {
      count += 1;
    }
  }
  return count;
};

},{}],32:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (callback, timeout) {
  var pending = false;
  var done = function done() {
    pending = false;
  };
  return function () {
    if (pending) {
      return;
    }
    pending = true;
    callback.apply(this, arguments);
    if (!timeout) {
      window.requestAnimationFrame(done);
    } else {
      window.setTimeout(done, timeout);
    }
  };
};

},{}],33:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (callback, timeout) {
  var _this = this,
      _arguments = arguments;

  var pending = false;
  var done = function done() {
    callback.apply(_this, _arguments);
    pending = false;
  };
  return function () {
    if (pending) {
      return;
    }
    pending = true;
    if (!timeout) {
      window.requestAnimationFrame(done);
    } else {
      window.setTimeout(done, timeout);
    }
  };
};

},{}],34:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (selector) {
  var $root = arguments.length <= 1 || arguments[1] === undefined ? document : arguments[1];

  return Array.prototype.slice.call($root.querySelectorAll(selector));
};

},{}],35:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function ($element) {
  var offset = 0;

  while ($element && !isNaN($element.offsetTop)) {
    offset += $element.offsetTop;
    $element = $element.offsetParent;
  }
  return offset;
};

},{}],36:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function () {
  var threshold = arguments.length <= 0 || arguments[0] === undefined ? 0.5 : arguments[0];

  var $lazyImages = (0, _getAll2.default)('.lazy-image');

  window.requestAnimationFrame(function () {
    $lazyImages.forEach(function ($lazyImage) {

      // Ignore images which has already been registered
      if ($lazyImage.dataset.lazyImageListening) {
        return;
      }
      $lazyImage.setAttribute('data-lazy-image-listening', 'true');

      (0, _visible2.default)($lazyImage, threshold).then(function () {
        return loadElement($lazyImage);
      });
    });
  });
};

var _getAll = require('../dom/get-all');

var _getAll2 = _interopRequireDefault(_getAll);

var _visible = require('../scroll/visible');

var _visible2 = _interopRequireDefault(_visible);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Load image element
/**
 * Lazy load images with class .lazy-images.
 * Depending on the treshold images will load as the user scrolls down on the
 * document.
 */

// Dependenceis
var loadImg = function loadImg($img) {

  if ($img.dataset.src) {
    $img.setAttribute('src', $img.dataset.src);
  }
  if ($img.dataset.srcset) {
    $img.setAttribute('srcset', $img.dataset.srcset);
  }
};

// Load picture element
var loadPicture = function loadPicture($picture) {
  loadImg($picture.querySelector('img'));
  var $sources = Array.prototype.slice.call($picture.querySelectorAll('source'));
  $sources.forEach(function ($source) {
    return $source.setAttribute('srcset', $source.dataset.srcset);
  });
};

var loadElement = function loadElement($element) {
  if ($element.matches('picture')) {
    loadPicture($element);
  } else if ($element.matches('img')) {
    loadImg($element);
  }

  // Make sure picturefill will update the image when source has changed
  if (window.picturefill) {
    window.picturefill({
      reevaluate: true
    });
  }
};

/**
 * Activate lazy load of images as user scrolls
 * @param  {float} threshold  Percent below screen to initialize load of image
 * @return {void}
 */

},{"../dom/get-all":34,"../scroll/visible":39}],37:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function ($element) {
  var threshold = arguments.length <= 1 || arguments[1] === undefined ? 0 : arguments[1];

  var scrollBottom = (window.scrollY || document.documentElement.scrollTop) + window.innerHeight * (1 + threshold);
  var offsetTop = (0, _getDocumentOffsetTop2.default)($element);
  return scrollBottom > offsetTop;
};

var _getDocumentOffsetTop = require('../dom/get-document-offset-top');

var _getDocumentOffsetTop2 = _interopRequireDefault(_getDocumentOffsetTop);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

},{"../dom/get-document-offset-top":35}],38:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function () {
  var downCallback = arguments.length <= 0 || arguments[0] === undefined ? function () {} : arguments[0];
  var upCallback = arguments.length <= 1 || arguments[1] === undefined ? function () {} : arguments[1];
  var threshold = arguments.length <= 2 || arguments[2] === undefined ? 0 : arguments[2];


  var lastScrollPos = 0;
  var scrolledDown = false;

  var isScrolling = function isScrolling() {
    var currentScrollPos = window.scrollY;

    if (!scrolledDown && currentScrollPos > threshold && currentScrollPos > lastScrollPos + 20) {
      downCallback();
      scrolledDown = true;
    } else if (scrolledDown && (currentScrollPos <= threshold || currentScrollPos < lastScrollPos - 20) && currentScrollPos + window.innerHeight < document.body.clientHeight) {
      upCallback();
      scrolledDown = false;
    }

    lastScrollPos = currentScrollPos;
  };

  window.addEventListener('scroll', (0, _delay2.default)(isScrolling, 200));
  document.addEventListener('DOMContentLoaded', isScrolling);
};

var _delay = require('../async/delay');

var _delay2 = _interopRequireDefault(_delay);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

},{"../async/delay":33}],39:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function ($element) {
  var threshold = arguments.length <= 1 || arguments[1] === undefined ? 0 : arguments[1];


  return new Promise(function (resolve) {

    var checkElement = (0, _debounce2.default)(function () {
      if ((0, _hasScrolledPast2.default)($element, threshold)) {
        window.removeEventListener('scroll', checkElement);
        window.removeEventListener('resize', checkElement);
        resolve();
      }
    });

    window.addEventListener('scroll', checkElement);
    window.addEventListener('resize', checkElement);
    document.addEventListener('DOMContentLoaded', checkElement);
    setTimeout(checkElement, 0);
  });
};

var _debounce = require('../async/debounce');

var _debounce2 = _interopRequireDefault(_debounce);

var _hasScrolledPast = require('./has-scrolled-past');

var _hasScrolledPast2 = _interopRequireDefault(_hasScrolledPast);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

},{"../async/debounce":32,"./has-scrolled-past":37}],40:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _isDate = require('./is-date');

var _isDate2 = _interopRequireDefault(_isDate);

var _isEmail = require('./is-email');

var _isEmail2 = _interopRequireDefault(_isEmail);

var _isFloat = require('./is-float');

var _isFloat2 = _interopRequireDefault(_isFloat);

var _isInt = require('./is-int');

var _isInt2 = _interopRequireDefault(_isInt);

var _isRequired = require('./is-required');

var _isRequired2 = _interopRequireDefault(_isRequired);

var _isUrl = require('./is-url');

var _isUrl2 = _interopRequireDefault(_isUrl);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Helpers for validating input fields
 */

exports.default = {
  isDate: _isDate2.default,
  isEmail: _isEmail2.default,
  isFloat: _isFloat2.default,
  isInt: _isInt2.default,
  isRequired: _isRequired2.default,
  isUrl: _isUrl2.default
};

},{"./is-date":42,"./is-email":43,"./is-float":44,"./is-int":45,"./is-required":46,"./is-url":47}],41:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function () {

  (0, _getAll2.default)('.validate').forEach(function ($validateContainer) {

    var $validateField = $validateContainer;

    if (!$validateContainer.matches('input, textarea')) {
      $validateField = $validateContainer.querySelector('input, textarea');
    }

    if (!$validateField) {
      return;
    }

    // Find relevat validation methods
    var validatorNames = [];
    for (var key in $validateContainer.dataset) {
      if (key !== 'validate' && key.indexOf('validate') === 0) {
        var validatorName = key.replace('validate', '');

        if (_2.default['is' + validatorName]) {
          validatorNames.push(validatorName);
        }
      }
    }

    if (validatorNames.length === 0) {
      return;
    }

    // Check validation when input on field is changed
    $validateField.addEventListener('input', function () {
      var input = $validateField.value;
      var valid = !validatorNames.some(function (validatorName) {
        if (!input && validatorName !== 'Required') {
          return false;
        }
        return !_2.default['is' + validatorName](input);
      });

      if (valid) {
        $validateContainer.classList.add('validate--valid');
        $validateContainer.classList.remove('validate--not-valid');
      } else {
        $validateContainer.classList.add('validate--not-valid');
        $validateContainer.classList.remove('validate--valid');
      }
    });
  });
};

var _getAll = require('../dom/get-all');

var _getAll2 = _interopRequireDefault(_getAll);

var _ = require('./');

var _2 = _interopRequireDefault(_);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

},{"../dom/get-all":34,"./":40}],42:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (date) {
  return !isNaN(Date.parse(date));
};

},{}],43:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (email) {
  var re = /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/;
  return re.test(email);
};

},{}],44:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (float) {
  var re = /^(?:[-+]?(?:[0-9]+))?(?:\.[0-9]*)?(?:[eE][\+\-]?(?:[0-9]+))?$/;
  return float !== '' && re.test(float);
};

},{}],45:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (integer) {
  var re = /^(?:[-+]?(?:0|[1-9][0-9]*))$/;
  return re.test(integer);
};

},{}],46:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (input) {
  return input.trim() !== '';
};

},{}],47:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (url) {
  var re = /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/;
  return re.test(url);
};

},{}]},{},[25])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJub2RlX21vZHVsZXMvZXBvY2gtdG8tdGltZWFnby9jdXRvZmYvY3V0b2ZmLmpzb24iLCJub2RlX21vZHVsZXMvZXBvY2gtdG8tdGltZWFnby9pbmRleC5qcyIsIm5vZGVfbW9kdWxlcy9lcG9jaC10by10aW1lYWdvL3N1ZmZpeC9zdWZmaXgtZGljdGlvbmFyeS5qc29uIiwibm9kZV9tb2R1bGVzL2Vwb2NoLXRvLXRpbWVhZ28vdGltZS1hZ28vdGltZS1hZ28uanMiLCJub2RlX21vZHVsZXMvZXBvY2gtdG8tdGltZWFnby90aW1lLWNhbGN1bGF0aW9ucy9pbmRleC5qcyIsIm5vZGVfbW9kdWxlcy9lcG9jaC10by10aW1lYWdvL3RpbWUtY2FsY3VsYXRpb25zL3RpbWUtYWdvL2RheXMtYWdvLmpzIiwibm9kZV9tb2R1bGVzL2Vwb2NoLXRvLXRpbWVhZ28vdGltZS1jYWxjdWxhdGlvbnMvdGltZS1hZ28vaG91cnMtYWdvLmpzIiwibm9kZV9tb2R1bGVzL2Vwb2NoLXRvLXRpbWVhZ28vdGltZS1jYWxjdWxhdGlvbnMvdGltZS1hZ28vbWludXRlcy1hZ28uanMiLCJub2RlX21vZHVsZXMvZXBvY2gtdG8tdGltZWFnby90aW1lLWNhbGN1bGF0aW9ucy90aW1lLWFnby9tb250aHMtYWdvLmpzIiwibm9kZV9tb2R1bGVzL2Vwb2NoLXRvLXRpbWVhZ28vdGltZS1jYWxjdWxhdGlvbnMvdGltZS1hZ28vc2Vjb25kcy1hZ28uanMiLCJub2RlX21vZHVsZXMvZXBvY2gtdG8tdGltZWFnby90aW1lLWNhbGN1bGF0aW9ucy90aW1lLWFnby93ZWVrcy1hZ28uanMiLCJub2RlX21vZHVsZXMvZXBvY2gtdG8tdGltZWFnby90aW1lLWNhbGN1bGF0aW9ucy90aW1lLWFnby95ZWFycy1hZ28uanMiLCJzcmMvc2NyaXB0cy9jb21wb25lbnRzL25hdmlnYXRpb24uanMiLCJzcmMvc2NyaXB0cy9jb21wb25lbnRzL3Jlc3BvbnNlLmpzIiwic3JjL3NjcmlwdHMvY29tcG9uZW50cy9zZWFyY2guanMiLCJzcmMvc2NyaXB0cy9jb21wb25lbnRzL3Rvb2wtdGlwLmpzIiwic3JjL3NjcmlwdHMvbGliL2FwaS5qcyIsInNyYy9zY3JpcHRzL2xpYi9mb3JtL2xpdmUtdmFsaWRhdGlvbi5qcyIsInNyYy9zY3JpcHRzL2xpYi9mb3JtL3ZhbGlkYXRlLmpzIiwic3JjL3NjcmlwdHMvbGliL2dldC1sb2dnZWQtaW4tZGF0YS5qcyIsInNyYy9zY3JpcHRzL2xpYi9odG1sLWVuY29kZS5qcyIsInNyYy9zY3JpcHRzL2xpYi9pbWFnZS1jb252ZXJ0ZXIuanMiLCJzcmMvc2NyaXB0cy9saWIvcmVhZC10aW1lLmpzIiwic3JjL3NjcmlwdHMvbGliL3N0cmlwLWh0bWwtdGFncy5qcyIsInNyYy9zY3JpcHRzL21haW4uanMiLCJzcmMvc2NyaXB0cy90ZW1wbGF0ZXMvYXV0aG9yLmpzIiwic3JjL3NjcmlwdHMvdGVtcGxhdGVzL3Bvc3QuanMiLCJzcmMvc2NyaXB0cy90ZW1wbGF0ZXMvcmVzcG9uc2UtbWV0YS5qcyIsInNyYy9zY3JpcHRzL3RlbXBsYXRlcy9yZXNwb25zZS5qcyIsInNyYy9zY3JpcHRzL3RlbXBsYXRlcy90YWcuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvd29yZC1jb3VudC9pbmRleC5qcyIsIi4uLy4uLy4uLy4uL3RlYW0tbnBtLXBhY2thZ2VzL2RzLWFzc2V0cy9hc3luYy9kZWJvdW5jZS5qcyIsIi4uLy4uLy4uLy4uL3RlYW0tbnBtLXBhY2thZ2VzL2RzLWFzc2V0cy9hc3luYy9kZWxheS5qcyIsIi4uLy4uLy4uLy4uL3RlYW0tbnBtLXBhY2thZ2VzL2RzLWFzc2V0cy9kb20vZ2V0LWFsbC5qcyIsIi4uLy4uLy4uLy4uL3RlYW0tbnBtLXBhY2thZ2VzL2RzLWFzc2V0cy9kb20vZ2V0LWRvY3VtZW50LW9mZnNldC10b3AuanMiLCIuLi8uLi8uLi8uLi90ZWFtLW5wbS1wYWNrYWdlcy9kcy1hc3NldHMvbGF6eS9pbWFnZXMuanMiLCIuLi8uLi8uLi8uLi90ZWFtLW5wbS1wYWNrYWdlcy9kcy1hc3NldHMvc2Nyb2xsL2hhcy1zY3JvbGxlZC1wYXN0LmpzIiwiLi4vLi4vLi4vLi4vdGVhbS1ucG0tcGFja2FnZXMvZHMtYXNzZXRzL3Njcm9sbC9zY3JvbGwtY2hhbmdlLmpzIiwiLi4vLi4vLi4vLi4vdGVhbS1ucG0tcGFja2FnZXMvZHMtYXNzZXRzL3Njcm9sbC92aXNpYmxlLmpzIiwiLi4vLi4vLi4vLi4vdGVhbS1ucG0tcGFja2FnZXMvZHMtYXNzZXRzL3ZhbGlkYXRlL2luZGV4LmpzIiwiLi4vLi4vLi4vLi4vdGVhbS1ucG0tcGFja2FnZXMvZHMtYXNzZXRzL3ZhbGlkYXRlL2lucHV0LWZpZWxkcy5qcyIsIi4uLy4uLy4uLy4uL3RlYW0tbnBtLXBhY2thZ2VzL2RzLWFzc2V0cy92YWxpZGF0ZS9pcy1kYXRlLmpzIiwiLi4vLi4vLi4vLi4vdGVhbS1ucG0tcGFja2FnZXMvZHMtYXNzZXRzL3ZhbGlkYXRlL2lzLWVtYWlsLmpzIiwiLi4vLi4vLi4vLi4vdGVhbS1ucG0tcGFja2FnZXMvZHMtYXNzZXRzL3ZhbGlkYXRlL2lzLWZsb2F0LmpzIiwiLi4vLi4vLi4vLi4vdGVhbS1ucG0tcGFja2FnZXMvZHMtYXNzZXRzL3ZhbGlkYXRlL2lzLWludC5qcyIsIi4uLy4uLy4uLy4uL3RlYW0tbnBtLXBhY2thZ2VzL2RzLWFzc2V0cy92YWxpZGF0ZS9pcy1yZXF1aXJlZC5qcyIsIi4uLy4uLy4uLy4uL3RlYW0tbnBtLXBhY2thZ2VzL2RzLWFzc2V0cy92YWxpZGF0ZS9pcy11cmwuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDUkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDTkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtB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QixTQUFPLEdBQUcsSUFBSCxDQUFRLE9BQVIsQ0FBUCxDQUYrQjtDQUFsQjs7Ozs7Ozs7O2tCQ0FBLFVBQVMsS0FBVCxFQUFnQjtBQUM3QixTQUFPLE1BQU0sSUFBTixPQUFpQixFQUFqQixDQURzQjtDQUFoQjs7Ozs7Ozs7O2tCQ0FBLFVBQVMsR0FBVCxFQUFjO0FBQzNCLE1BQUksS0FBSyxnRUFBTCxDQUR1QjtBQUUzQixTQUFPLEdBQUcsSUFBSCxDQUFRLEdBQVIsQ0FBUCxDQUYyQjtDQUFkIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsIm1vZHVsZS5leHBvcnRzPXtcbiAgXCJzZWNvbmRzXCI6IDYwLFxuICBcIm1pbnV0ZXNcIjogNjAsXG4gIFwiaG91cnNcIjogMjQsXG4gIFwiZGF5c1wiOiA3LFxuICBcIndlZWtzXCI6IDQsXG4gIFwibW9udGhzXCI6IDEyXG59XG4iLCJ2YXIgY29udmVydGVyID0gbW9kdWxlLmV4cG9ydHMgPSB7XG4gIGN1dG9mZjogcmVxdWlyZSgnLi9jdXRvZmYvY3V0b2ZmLmpzb24nKSxcbiAgc3VmZml4RGljdGlvbmFyeTogcmVxdWlyZSgnLi9zdWZmaXgvc3VmZml4LWRpY3Rpb25hcnkuanNvbicpLFxuICB0aW1lQ2FsY3M6IHJlcXVpcmUoJy4vdGltZS1jYWxjdWxhdGlvbnMnKVxufVxuY29udmVydGVyLnRpbWVBZ28gPSByZXF1aXJlKCcuL3RpbWUtYWdvL3RpbWUtYWdvLmpzJykuYmluZChjb252ZXJ0ZXIpXG4iLCJtb2R1bGUuZXhwb3J0cz17XG4gIFwic2Vjb25kc1wiOiB7XG4gICAgXCJzaW5ndWxhclwiOiBcIiBzZWNvbmQgYWdvXCIsXG4gICAgXCJwbHVyYWxcIjogXCIgc2Vjb25kcyBhZ29cIlxuICB9LFxuICBcIm1pbnV0ZXNcIjoge1xuICAgIFwic2luZ3VsYXJcIjogXCIgbWludXRlIGFnb1wiLFxuICAgIFwicGx1cmFsXCI6IFwiIG1pbnV0ZXMgYWdvXCJcbiAgfSxcbiAgXCJob3Vyc1wiOiB7XG4gICAgXCJzaW5ndWxhclwiOiBcIiBob3VyIGFnb1wiLFxuICAgIFwicGx1cmFsXCI6IFwiIGhvdXJzIGFnb1wiXG4gIH0sXG4gIFwiZGF5c1wiOiB7XG4gICAgXCJzaW5ndWxhclwiOiBcIiBkYXkgYWdvXCIsXG4gICAgXCJwbHVyYWxcIjogXCIgZGF5cyBhZ29cIlxuICB9LFxuICBcIndlZWtzXCI6IHtcbiAgICBcInNpbmd1bGFyXCI6IFwiIHdlZWsgYWdvXCIsXG4gICAgXCJwbHVyYWxcIjogXCIgd2Vla3MgYWdvXCJcbiAgfSxcbiAgXCJtb250aHNcIjoge1xuICAgIFwic2luZ3VsYXJcIjogXCIgbW9udGggYWdvXCIsXG4gICAgXCJwbHVyYWxcIjogXCIgbW9udGhzIGFnb1wiXG4gIH0sXG4gIFwieWVhcnNcIjoge1xuICAgIFwic2luZ3VsYXJcIjogXCIgeWVhciBhZ29cIixcbiAgICBcInBsdXJhbFwiOiBcIiB5ZWFycyBhZ29cIlxuICB9XG59XG4iLCJtb2R1bGUuZXhwb3J0cyA9IFRpbWVBZ29cblxuZnVuY3Rpb24gVGltZUFnbyAocGFzdEVwb2NoLCBjdXJyZW50RXBvY2gpIHtcbiAgdmFyIHNlY29uZHMgPSBNYXRoLnJvdW5kKHRoaXMudGltZUNhbGNzLnNlY29uZHMocGFzdEVwb2NoLCBjdXJyZW50RXBvY2gpKVxuICB2YXIgbWludXRlcyA9IE1hdGgucm91bmQodGhpcy50aW1lQ2FsY3MubWludXRlcyhwYXN0RXBvY2gsIGN1cnJlbnRFcG9jaCkpXG4gIHZhciBob3VycyA9IE1hdGgucm91bmQodGhpcy50aW1lQ2FsY3MuaG91cnMocGFzdEVwb2NoLCBjdXJyZW50RXBvY2gpKVxuICB2YXIgZGF5cyA9IE1hdGgucm91bmQodGhpcy50aW1lQ2FsY3MuZGF5cyhwYXN0RXBvY2gsIGN1cnJlbnRFcG9jaCkpXG4gIHZhciB3ZWVrcyA9IE1hdGgucm91bmQodGhpcy50aW1lQ2FsY3Mud2Vla3MocGFzdEVwb2NoLCBjdXJyZW50RXBvY2gpKVxuICB2YXIgbW9udGhzID0gTWF0aC5yb3VuZCh0aGlzLnRpbWVDYWxjcy5tb250aHMocGFzdEVwb2NoLCBjdXJyZW50RXBvY2gpKVxuICB2YXIgeWVhcnMgPSBNYXRoLnJvdW5kKHRoaXMudGltZUNhbGNzLnllYXJzKHBhc3RFcG9jaCwgY3VycmVudEVwb2NoKSlcblxuICB2YXIgc3VmZml4ID0gdGhpcy5zdWZmaXhEaWN0aW9uYXJ5XG4gIHZhciBjdXRvZmYgPSB0aGlzLmN1dG9mZlxuXG4gIGlmIChzZWNvbmRzIDwgY3V0b2ZmLnNlY29uZHMpIHtcbiAgICByZXR1cm4gc2Vjb25kcyArIHN1ZmZpeC5zZWNvbmRzW2dldEZvcm0oc2Vjb25kcyldXG4gIH0gZWxzZSBpZiAobWludXRlcyA8IGN1dG9mZi5taW51dGVzKSB7XG4gICAgcmV0dXJuIG1pbnV0ZXMgKyBzdWZmaXgubWludXRlc1tnZXRGb3JtKG1pbnV0ZXMpXVxuICB9IGVsc2UgaWYgKGhvdXJzIDwgY3V0b2ZmLmhvdXJzKSB7XG4gICAgcmV0dXJuIGhvdXJzICsgc3VmZml4LmhvdXJzW2dldEZvcm0oaG91cnMpXVxuICB9IGVsc2UgaWYgKGRheXMgPCBjdXRvZmYuZGF5cykge1xuICAgIHJldHVybiBkYXlzICsgc3VmZml4LmRheXNbZ2V0Rm9ybShkYXlzKV1cbiAgfSBlbHNlIGlmICh3ZWVrcyA8IGN1dG9mZi53ZWVrcykge1xuICAgIHJldHVybiB3ZWVrcyArIHN1ZmZpeC53ZWVrc1tnZXRGb3JtKHdlZWtzKV1cbiAgfSBlbHNlIGlmIChtb250aHMgPCBjdXRvZmYubW9udGhzKSB7XG4gICAgcmV0dXJuIG1vbnRocyArIHN1ZmZpeC5tb250aHNbZ2V0Rm9ybShtb250aHMpXVxuICB9IGVsc2Uge1xuICAgIHJldHVybiB5ZWFycyArIHN1ZmZpeC55ZWFyc1tnZXRGb3JtKHllYXJzKV1cbiAgfVxufVxuXG5mdW5jdGlvbiBnZXRGb3JtICh2YWx1ZSkge1xuICBpZiAodmFsdWUgPT09IDEpIHtcbiAgICByZXR1cm4gJ3Npbmd1bGFyJ1xuICB9XG4gIHJldHVybiAncGx1cmFsJ1xufVxuIiwibW9kdWxlLmV4cG9ydHMgPSB7XG4gIHNlY29uZHM6IHJlcXVpcmUoJy4vdGltZS1hZ28vc2Vjb25kcy1hZ28uanMnKSxcbiAgbWludXRlczogcmVxdWlyZSgnLi90aW1lLWFnby9taW51dGVzLWFnby5qcycpLFxuICBob3VyczogcmVxdWlyZSgnLi90aW1lLWFnby9ob3Vycy1hZ28uanMnKSxcbiAgZGF5czogcmVxdWlyZSgnLi90aW1lLWFnby9kYXlzLWFnby5qcycpLFxuICB3ZWVrczogcmVxdWlyZSgnLi90aW1lLWFnby93ZWVrcy1hZ28uanMnKSxcbiAgbW9udGhzOiByZXF1aXJlKCcuL3RpbWUtYWdvL21vbnRocy1hZ28uanMnKSxcbiAgeWVhcnM6IHJlcXVpcmUoJy4vdGltZS1hZ28veWVhcnMtYWdvLmpzJylcbn1cbiIsIm1vZHVsZS5leHBvcnRzID0gRGF5c0Fnb1xuXG5mdW5jdGlvbiBEYXlzQWdvIChwYXN0RXBvY2gsIGN1cnJlbnRFcG9jaCkge1xuICB2YXIgZGF5c0FnbyA9IChjdXJyZW50RXBvY2ggLSBwYXN0RXBvY2gpIC8gMTAwMCAvIDYwIC8gNjAgLyAyNFxuICByZXR1cm4gZGF5c0Fnb1xufVxuIiwibW9kdWxlLmV4cG9ydHMgPSBIb3Vyc0Fnb1xuXG5mdW5jdGlvbiBIb3Vyc0FnbyAocGFzdEVwb2NoLCBjdXJyZW50RXBvY2gpIHtcbiAgdmFyIGhvdXJzQWdvID0gKGN1cnJlbnRFcG9jaCAtIHBhc3RFcG9jaCkgLyAxMDAwIC8gNjAgLyA2MFxuICByZXR1cm4gaG91cnNBZ29cbn1cbiIsIm1vZHVsZS5leHBvcnRzID0gTWludXRlc0Fnb1xuXG5mdW5jdGlvbiBNaW51dGVzQWdvIChwYXN0RXBvY2gsIGN1cnJlbnRFcG9jaCkge1xuICB2YXIgbWludXRlc0FnbyA9IChjdXJyZW50RXBvY2ggLSBwYXN0RXBvY2gpIC8gMTAwMCAvIDYwXG4gIHJldHVybiBtaW51dGVzQWdvXG59XG4iLCJtb2R1bGUuZXhwb3J0cyA9IE1vbnRoc0Fnb1xuXG5mdW5jdGlvbiBNb250aHNBZ28gKHBhc3RFcG9jaCwgY3VycmVudEVwb2NoKSB7XG4gIHZhciBtb250aHNBZ28gPSAoY3VycmVudEVwb2NoIC0gcGFzdEVwb2NoKSAvIDEwMDAgLyA2MCAvIDYwIC8gMjQgLyAzMVxuICByZXR1cm4gbW9udGhzQWdvXG59XG4iLCJtb2R1bGUuZXhwb3J0cyA9IFNlY29uZHNBZ29cblxuZnVuY3Rpb24gU2Vjb25kc0FnbyAocGFzdEVwb2NoLCBjdXJyZW50RXBvY2gpIHtcbiAgdmFyIHNlY29uZHNBZ28gPSAoY3VycmVudEVwb2NoIC0gcGFzdEVwb2NoKSAvIDEwMDBcbiAgcmV0dXJuIHNlY29uZHNBZ29cbn1cbiIsIm1vZHVsZS5leHBvcnRzID0gV2Vla3NBZ29cblxuZnVuY3Rpb24gV2Vla3NBZ28gKHBhc3RFcG9jaCwgY3VycmVudEVwb2NoKSB7XG4gIHZhciB3ZWVrc0FnbyA9IChjdXJyZW50RXBvY2ggLSBwYXN0RXBvY2gpIC8gMTAwMCAvIDYwIC8gNjAgLyAyNCAvIDdcbiAgcmV0dXJuIHdlZWtzQWdvXG59XG4iLCJtb2R1bGUuZXhwb3J0cyA9IFllYXJzQWdvXG5cbmZ1bmN0aW9uIFllYXJzQWdvIChwYXN0RXBvY2gsIGN1cnJlbnRFcG9jaCkge1xuICB2YXIgeWVhcnNBZ28gPSAoY3VycmVudEVwb2NoIC0gcGFzdEVwb2NoKSAvIDEwMDAgLyA2MCAvIDYwIC8gMjQgLyAzMSAvIDEyXG4gIHJldHVybiB5ZWFyc0Fnb1xufVxuIiwiLyoqXG4gKiBIYW5kbGUgbmF2aWdhdGlvblxuICovXG5cbi8vIERlcGVuZGVuY2llc1xuaW1wb3J0IHNjcm9sbENoYW5nZSBmcm9tICdkcy1hc3NldHMvc2Nyb2xsL3Njcm9sbC1jaGFuZ2UnO1xuaW1wb3J0IGRlYm91bmNlIGZyb20gJ2RzLWFzc2V0cy9hc3luYy9kZWJvdW5jZSc7XG5pbXBvcnQgZ2V0QWxsIGZyb20gJ2RzLWFzc2V0cy9kb20vZ2V0LWFsbCc7XG5pbXBvcnQgZ2V0VXNlckRhdGEgZnJvbSAnLi4vbGliL2dldC1sb2dnZWQtaW4tZGF0YSc7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uKCkge1xuXG4gIHZhciAkbmF2ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLm5hdicpO1xuICBpZiAoISRuYXYpIHtcbiAgICByZXR1cm47XG4gIH1cblxuICB2YXIgJGJvZHkgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdib2R5Jyk7XG5cbiAgLy8gQ2xvbmUgbmF2aWdhdGlvbiBhbmQgbWFrZSB0aGUgbmV3IG9uZSBzdGlja3lcbiAgdmFyICRzdGlja3lOYXYgPSAkbmF2LmNsb25lTm9kZSh0cnVlKTtcbiAgJHN0aWNreU5hdi5jbGFzc0xpc3QuYWRkKCduYXYtLXN0aWNreScpO1xuICAkYm9keS5pbnNlcnRCZWZvcmUoJHN0aWNreU5hdiwgJGJvZHkuZmlyc3RDaGlsZCk7XG5cbiAgLy8gQWN0aXZhdGUgdGhlIHN0aWNreSBuYXZpZ2F0aW9uIHdoZW4gdGhlIHVzZXIgc2Nyb2xscyB1cC5cbiAgLy8gVGhpcyB3aWxsIGZpcnMgdGFrZSBlZmZlY3QsIHdoZW4gdGhlIHVzZXIgaGFzIHNjcm9sbGVkIFwiYSBzY3JlZW5cIiBkb3duLlxuICBzY3JvbGxDaGFuZ2UoZnVuY3Rpb24oKSB7XG4gICAgJHN0aWNreU5hdi5jbGFzc0xpc3QucmVtb3ZlKCduYXYtLWFjdGl2ZScpO1xuICB9LCBmdW5jdGlvbigpIHtcbiAgICAkc3RpY2t5TmF2LmNsYXNzTGlzdC5hZGQoJ25hdi0tYWN0aXZlJyk7XG4gIH0sIHdpbmRvdy5pbm5lckhlaWdodCk7XG5cbiAgLyoqXG4gICAqIEhpZGUgc3RpY2t5IG5hdmlnYXRpb24gd2hlbiBzY3JvbGxlZCB0byB0aGUgdG9wIG9mIHRoZSBkb2N1bWVudFxuICAgKiBAcmV0dXJuIHt2b2lkfVxuICAgKi9cbiAgdmFyIG9uVG9wID0gZnVuY3Rpb24oKSB7XG4gICAgdmFyIHNjcm9sbFBvcyA9IHdpbmRvdy5zY3JvbGxZIHx8IGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5zY3JvbGxUb3A7XG4gICAgaWYgKHNjcm9sbFBvcyA8PSAwKSB7XG4gICAgICAkc3RpY2t5TmF2LmNsYXNzTGlzdC5hZGQoJ25hdi0taGlkZGVuJyk7XG4gICAgICAkc3RpY2t5TmF2LmNsYXNzTGlzdC5yZW1vdmUoJ25hdi0tYWN0aXZlJyk7XG4gICAgfSBlbHNlIHtcbiAgICAgICRzdGlja3lOYXYuY2xhc3NMaXN0LnJlbW92ZSgnbmF2LS1oaWRkZW4nKTtcbiAgICB9XG4gIH07XG5cbiAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3Njcm9sbCcsIGRlYm91bmNlKG9uVG9wKSk7XG4gIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdyZXNpemUnLCBkZWJvdW5jZShvblRvcCkpO1xuXG4gIC8vIENoYW5nZSB3b3JkaW5nIG9uIFwic2lnbiBpblwiIGJ1dHRvbiB3aGVuIHVzZXIgaXMgbG9nZ2VkIGluXG4gIGdldFVzZXJEYXRhKCkudGhlbihmdW5jdGlvbigpIHtcbiAgICBnZXRBbGwoJy5uYXZfX2l0ZW0tLXNpZ24taW4nKS5mb3JFYWNoKGZ1bmN0aW9uKCRzaWduaW4pIHtcbiAgICAgICRzaWduaW4uaW5uZXJIVE1MID0gJ0NyZWF0ZSBhIHN0b3J5JztcbiAgICB9KTtcbiAgfSkuY2F0Y2goZnVuY3Rpb24oKSB7fSk7XG5cbn1cbiIsIi8qKlxuICogSGFuZGxlIHJlc3BvbnNlcyBhbmQgbGlrZXMgaW4gcG9zdHNcbiAqL1xuXG4vLyBEZXBlbmRlbmNpZXNcbmltcG9ydCBnZXRBbGwgZnJvbSAnZHMtYXNzZXRzL2RvbS9nZXQtYWxsJztcbmltcG9ydCBsYXp5SW1hZ2VzIGZyb20gJ2RzLWFzc2V0cy9sYXp5L2ltYWdlcyc7XG5pbXBvcnQgKiBhcyBhcGkgZnJvbSAnLi4vbGliL2FwaSc7XG5pbXBvcnQgZ2V0VXNlckRhdGEgZnJvbSAnLi4vbGliL2dldC1sb2dnZWQtaW4tZGF0YSc7XG5pbXBvcnQgdXNlck1ldGFUZW1wbGF0ZSBmcm9tICcuLi90ZW1wbGF0ZXMvcmVzcG9uc2UtbWV0YSc7XG5pbXBvcnQgcmVzcG9uc2VUZW1wbGF0ZSBmcm9tICcuLi90ZW1wbGF0ZXMvcmVzcG9uc2UnO1xuaW1wb3J0IG9mZnNldFRvcCBmcm9tICdkcy1hc3NldHMvZG9tL2dldC1kb2N1bWVudC1vZmZzZXQtdG9wJztcbmltcG9ydCBsaXZlVmFsaWRhdGlvbiBmcm9tICcuLi9saWIvZm9ybS9saXZlLXZhbGlkYXRpb24nO1xuaW1wb3J0IHZhbGlkYXRlRm9ybSBmcm9tICcuLi9saWIvZm9ybS92YWxpZGF0ZSc7XG5cbi8vIENhY2hlZCBkb20gZWxlbWVudHNcbnZhciAkcmVzcG9uc2VGb3JtO1xudmFyICRjdGE7XG52YXIgJHZhbGlkYXRvcnM7XG52YXIgJHJlc3BvbnNlc0xpc3Q7XG52YXIgcmVuZGVyUmVzcG9uc2VzO1xudmFyIGFkZERlbGV0ZUV2ZW50cztcbnZhciBzZXRSZXNwb25zZXNOdW1iZXI7XG52YXIgYWRkUmVhZE1vcmVFdmVudDtcblxudmFyIHVwZGF0ZVJlc3BvbnNlQ1RBID0gZnVuY3Rpb24odmFsaWQpIHtcblx0aWYgKHZhbGlkKSB7XG5cdFx0JGN0YS5jbGFzc0xpc3QucmVtb3ZlKCdidG4tLWRpc2FibGVkJyk7XG5cdH0gZWxzZSB7XG5cdFx0JGN0YS5jbGFzc0xpc3QuYWRkKCdidG4tLWRpc2FibGVkJyk7XG5cdH1cbn07XG5cbi8qKlxuICogRGVsZXRlIHJlc3BvbnNlIHdoZW4gZGVsZXRlIGljb24gY2xpY2tlZFxuICovXG5hZGREZWxldGVFdmVudHMgPSBmdW5jdGlvbigpIHtcblx0Z2V0QWxsKCcucmVzcG9uc2VfX2RlbGV0ZScpLmZvckVhY2goZnVuY3Rpb24oJGRlbGV0ZSkge1xuXHRcdCRkZWxldGUuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbihlKSB7XG5cdFx0XHRlLnByZXZlbnREZWZhdWx0KCk7XG5cdFx0XHRhcGkucmVtb3ZlUmVzcG9uc2UoJGRlbGV0ZS5kYXRhc2V0LnB1Ymxpc2hlZCwgJGRlbGV0ZS5kYXRhc2V0Lm5hbWUpXG5cdFx0XHRcdC50aGVuKGZ1bmN0aW9uKGRhdGEpIHtcblx0XHRcdFx0XHRyZW5kZXJSZXNwb25zZXMoZGF0YS5yZXNwb25zZXMpO1xuXHRcdFx0XHRcdHNldFJlc3BvbnNlc051bWJlcihkYXRhLnJlc3BvbnNlcyk7XG5cdFx0XHRcdH0pO1xuXHRcdH0pO1xuXHR9KTtcbn07XG5cbi8qKlxuICogRXhwYW5kIHJlc3BvbnNlIHdpdGggZnVsbCB0ZXh0IHdoZW4gcmVhZCBtb3JlIGJ1dHRvbiBpcyBhY3RpdmF0ZWQuXG4gKiBCYXNpY2FsbHkgaXQgaGlkZXMgdGhlIGV4Y2VycHQgYW5kIHRoZSByZWFkIG1vcmUgYnV0dG9uIGFuZCBkaXNwbGF5cyB0aGVcbiAqIGZ1bGwgdGV4dC5cbiAqIEBwYXJhbSB7ZWxlbWVudH0gJHJlc3BvbnNlXG4gKi9cbmFkZFJlYWRNb3JlRXZlbnQgPSBmdW5jdGlvbigkcmVzcG9uc2UpIHtcblx0dmFyICRyZWFkTW9yZSA9ICRyZXNwb25zZS5xdWVyeVNlbGVjdG9yKCcucmVzcG9uc2VfX3JlYWQtbW9yZScpO1xuXHRpZiAoISRyZWFkTW9yZSkge1xuXHRcdHJldHVybjtcblx0fVxuXHQkcmVhZE1vcmUuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbihlKSB7XG5cdFx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xuXHRcdHZhciAkZXhjZXJwdCA9ICRyZXNwb25zZS5xdWVyeVNlbGVjdG9yKCcucmVzcG9uc2VfX2V4Y2VycHQnKTtcblx0XHR2YXIgJHJlYWRNb3JlQ29udGFpbmVyID0gJHJlYWRNb3JlLnBhcmVudE5vZGU7XG5cblx0XHQkcmVhZE1vcmVDb250YWluZXIucGFyZW50Tm9kZS5yZW1vdmVDaGlsZCgkcmVhZE1vcmVDb250YWluZXIpO1xuXHRcdCRleGNlcnB0LnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQoJGV4Y2VycHQpO1xuXG5cdFx0JHJlc3BvbnNlLnF1ZXJ5U2VsZWN0b3IoJy5yZXNwb25zZV9fdGV4dCcpLmNsYXNzTGlzdC5yZW1vdmUoJ2hpZGRlbicpO1xuXHR9KTtcbn07XG5cbi8qKlxuICogUmVuZGVyIHRlbXBsYXRlcyBmb3IgcmVzcG9uc2VzIGFuZCBpbnNlcnQgaHRtbCBpbiB0aGUgcmVzcG9uc2VzIGxpc3QuXG4gKiAtIExhenkgbG9hZCBpbWFnZXMgaW4gcmVzcG9uc2VzXG4gKiAtIEF0dGFjaCBuZXcgZXZlbnRzIGluIHJlc3BvbnNlc1xuICogQHBhcmFtICB7YXJyYXl9IHJlc3BvbnNlc1xuICogQHJldHVybiB7dm9pZH1cbiAqL1xucmVuZGVyUmVzcG9uc2VzID0gZnVuY3Rpb24ocmVzcG9uc2VzKSB7XG5cdHZhciBodG1sID0gJyc7XG5cdHJlc3BvbnNlcy5mb3JFYWNoKGZ1bmN0aW9uKHJlc3BvbnNlKSB7XG5cdFx0aHRtbCArPSByZXNwb25zZVRlbXBsYXRlKHJlc3BvbnNlKTtcblx0fSk7XG5cdCRyZXNwb25zZXNMaXN0LmlubmVySFRNTCA9IGh0bWw7XG5cdGxhenlJbWFnZXMoMSk7XG5cdGFkZERlbGV0ZUV2ZW50cygpO1xuXHRnZXRBbGwoJy5yZXNwb25zZScsICRyZXNwb25zZXNMaXN0KS5mb3JFYWNoKGFkZFJlYWRNb3JlRXZlbnQpO1xufTtcblxuLyoqXG4gKiBVcGRhdGUgdGhlIGNvdW50IG9mIHJlc3BvbnNlc1xuICogQHBhcmFtIHthcnJheX0gcmVzcG9uc2VzXG4gKi9cbnNldFJlc3BvbnNlc051bWJlciA9IGZ1bmN0aW9uKHJlc3BvbnNlcykge1xuXHRkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuc2hhcmVfX3Jlc3BvbnNlcycpLmlubmVySFRNTCA9IHJlc3BvbnNlcy5sZW5ndGg7XG59O1xuXG4vKipcbiAqIFVwZGF0ZSB0aGUgY291bnQgZm8gbGlrZXMgZm9yIHRoaXMgcG9zdFxuICogQHBhcmFtIHtudW1iZXJ9IGxpa2VzXG4gKi9cbnZhciBzZXRMaWtlc051bWJlciA9IGZ1bmN0aW9uKGxpa2VzKSB7XG5cdGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5zaGFyZV9fbGlrZXMnKS5pbm5lckhUTUwgPSBsaWtlcztcbn07XG5cbi8qKlxuICogR2V0IGRhdGEgZnJvbSBhcGkgd2l0aCBtZXRhIGRhdGE6IHJlc3BvbnNlcyBhbmQgbGlrZXMuXG4gKiBSZW5kZXIgdGhpcyBpbiB0aGUgZG9tLlxuICogQHJldHVybiB7dm9pZH1cbiAqL1xudmFyIHJlbmRlck1ldGEgPSBmdW5jdGlvbigpIHtcblx0YXBpLmdldE1ldGEoKS50aGVuKGZ1bmN0aW9uKGRhdGEpIHtcblx0XHRyZW5kZXJSZXNwb25zZXMoZGF0YS5yZXNwb25zZXMpO1xuXHRcdHNldFJlc3BvbnNlc051bWJlcihkYXRhLnJlc3BvbnNlcyk7XG5cdFx0c2V0TGlrZXNOdW1iZXIoZGF0YS5saWtlcyk7XG5cdH0pO1xufTtcblxuLyoqXG4gKiBQb3N0IG5ldyByZXNwb25zZSB0byBwb3N0XG4gKiAtIGNoZWNrcyBmb3IgdmFsaWRhdGlvbiBiZWZvcmUgcG9zdGluZ1xuICogQHBhcmFtICB7ZXZlbnR9IGVcbiAqIEByZXR1cm4ge3ZvaWR9XG4gKi9cbnZhciBzdWJtaXRSZXNwb25zZSA9IGZ1bmN0aW9uKGUpIHtcblx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xuXG5cdHZhciBsb2dnZWRJbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2JvZHknKS5jbGFzc0xpc3QuY29udGFpbnMoJ3VzZXItbG9nZ2VkLWluJyk7XG5cblx0Ly8gSWYgYSBmaWVsZCBpcyBub3QgdmFsaWQgdGhpcyBmaWVsZCB3aWxsIGdldCBmb2N1cywgc28gdGhlIHVzZXIgcXVpY2tseSBjYW4gdXBkYXRlIHRoZSB2YWx1ZS5cblx0dmFyIG5vdFZhbGlkID0gJHZhbGlkYXRvcnMuc29tZShmdW5jdGlvbigkdmFsaWRhdG9yKSB7XG5cdFx0aWYgKCR2YWxpZGF0b3IuY2xhc3NMaXN0LmNvbnRhaW5zKCd2YWxpZGF0ZS0tbm90LXZhbGlkJykpIHtcblx0XHRcdHZhciAkdmFsaWRhdGVGaWVsZCA9ICR2YWxpZGF0b3IucXVlcnlTZWxlY3RvcignaW5wdXQsIHRleHRhcmVhJyk7XG5cdFx0XHQkdmFsaWRhdGVGaWVsZC5mb2N1cygpO1xuXHRcdFx0cmV0dXJuIHRydWU7XG5cdFx0fVxuXHR9KTtcblxuXHRpZiAobm90VmFsaWQpIHtcblx0XHRyZXR1cm47XG5cdH1cblxuXHQvLyBDcmVhdGUgYSByZXNwb25zZSBvYmplY3QgYmFzZWQgb24gdmFsdWVzIGluIGZvcm1cblx0dmFyIHJlc3BvbnNlID0ge307XG5cdGdldEFsbCgnaW5wdXQsIHRleHRhcmVhJywgJHJlc3BvbnNlRm9ybSkuZm9yRWFjaChmdW5jdGlvbigkZmllbGQpIHtcblx0XHR2YXIgbmFtZSA9ICRmaWVsZC5nZXRBdHRyaWJ1dGUoJ25hbWUnKTtcblx0XHRpZiAoJGZpZWxkLnZhbHVlKSB7XG5cdFx0XHRyZXNwb25zZVtuYW1lXSA9ICRmaWVsZC52YWx1ZTtcblx0XHR9XG5cdH0pO1xuXG5cdCRjdGEuaW5uZXJIVE1MID0gJ1Bvc3RpbmcuLi4nO1xuXHQkY3RhLmNsYXNzTGlzdC5hZGQoJ2J0bi0tZGlzYWJsZWQnKTtcblx0YXBpLmFkZFJlc3BvbnNlKHJlc3BvbnNlKS50aGVuKGZ1bmN0aW9uKGRhdGEpIHtcblx0XHRyZW5kZXJSZXNwb25zZXMoZGF0YS5yZXNwb25zZXMpO1xuXHRcdHNldFJlc3BvbnNlc051bWJlcihkYXRhLnJlc3BvbnNlcyk7XG5cblx0XHQvLyBTY3JvbGwgdG8gbmV3IHJlc3BvbnNlXG5cdFx0dmFyICRsYXN0UmVzcG9uc2UgPSAkcmVzcG9uc2VzTGlzdC5xdWVyeVNlbGVjdG9yKCcucmVzcG9uc2U6bGFzdC1jaGlsZCcpO1xuXHRcdHZhciBvZmZzZXQgPSBvZmZzZXRUb3AoJGxhc3RSZXNwb25zZSk7XG5cdFx0d2luZG93LnNjcm9sbFRvKDAsIG9mZnNldCAtICgwLjUgKiB3aW5kb3cuaW5uZXJIZWlnaHQpKTtcblxuXHRcdC8vIFJlc2V0IGZvcm1cblx0XHQkY3RhLmlubmVySFRNTCA9ICdSZXNwb25kJztcblx0XHRpZiAobG9nZ2VkSW4pIHtcblx0XHRcdHZhciAkdGV4dCA9ICRyZXNwb25zZUZvcm0ucXVlcnlTZWxlY3RvcignLnJlc3BvbnNlcy1mb3JtX190ZXh0Jyk7XG5cdFx0XHQkdGV4dC5jbGFzc0xpc3QuYWRkKCd2YWxpZGF0ZS0tbm90LXZhbGlkJyk7XG5cdFx0XHQkdGV4dC5jbGFzc0xpc3QucmVtb3ZlKCd2YWxpZGF0ZS0tdmFsaWQnKTtcblx0XHRcdCR0ZXh0LnF1ZXJ5U2VsZWN0b3IoJ3RleHRhcmVhJykudmFsdWUgPSAnJztcblx0XHR9IGVsc2Uge1xuXHRcdFx0JHZhbGlkYXRvcnMuZm9yRWFjaChmdW5jdGlvbigkdmFsaWRhdG9yKSB7XG5cdFx0XHRcdGlmICgkdmFsaWRhdG9yLmRhdGFzZXQudmFsaWRhdGVSZXF1aXJlZCAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0XHRcdFx0JHZhbGlkYXRvci5jbGFzc0xpc3QuYWRkKCd2YWxpZGF0ZS0tbm90LXZhbGlkJyk7XG5cdFx0XHRcdFx0JHZhbGlkYXRvci5jbGFzc0xpc3QucmVtb3ZlKCd2YWxpZGF0ZS0tdmFsaWQnKTtcblx0XHRcdFx0fVxuXHRcdFx0XHQkdmFsaWRhdG9yLnF1ZXJ5U2VsZWN0b3IoJ2lucHV0LCB0ZXh0YXJlYScpLnZhbHVlID0gJyc7XG5cdFx0XHR9KTtcblx0XHR9XG5cdH0pO1xuXG59O1xuXG4vKipcbiAqIFVwZGF0ZSBoZWFydCAobGlrZSkgaWNvbnMgdG8gaW5kaWNhdGUsIHRoYXQgdGhlIHVzZXIgaGF2ZSBsaWtlZCB0aGUgYXJ0aWNsZVxuICogQHJldHVybiB7dm9pZH1cbiAqL1xudmFyIGxpa2VkID0gZnVuY3Rpb24oKSB7XG5cdHZhciAkdG9vbFRpcEljb24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcudG9vbC10aXBfX2xpa2UtaWNvbicpO1xuXHQkdG9vbFRpcEljb24uc2V0QXR0cmlidXRlKCdzcmMnLCAnL2Fzc2V0cy9pbWFnZXMvaGVhcnQtLWludmVyc2UtLWFjdGl2ZS5zdmcnKTtcblx0JHRvb2xUaXBJY29uLnNldEF0dHJpYnV0ZSgnZGF0YS1zcmMnLCAnL2Fzc2V0cy9pbWFnZXMvaGVhcnQtLWludmVyc2UtLWFjdGl2ZS5zdmcnKTtcblxuXHR2YXIgJGZvb3Rlckljb24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucG9zdC1mb290ZXJfX2xpa2UtaWNvbicpO1xuXHQkZm9vdGVySWNvbi5zZXRBdHRyaWJ1dGUoJ3NyYycsICcvYXNzZXRzL2ltYWdlcy9oZWFydC0tYWN0aXZlLnN2ZycpO1xuXHQkZm9vdGVySWNvbi5zZXRBdHRyaWJ1dGUoJ2RhdGEtc3JjJywgJy9hc3NldHMvaW1hZ2VzL2hlYXJ0LS1hY3RpdmUuc3ZnJyk7XG5cblx0Ly8gSW5kaWNhdGVzLCB0aGF0IHRoZSBsaWtlIGJ1dHRvbiBubyBsb25nZXIgaXMgY2xpY2thYmxlXG5cdGdldEFsbCgnLnNoYXJlX19saWtlJykuZm9yRWFjaCgkbGlrZSA9PiAkbGlrZS5jbGFzc0xpc3QuYWRkKCdkaXNhYmxlZCcpKTtcbn07XG5cbi8qKlxuICogQWN0aXZhdGUgbGlrZSwgd2hlbiBsaWtlIGJ1dHRvbnMgYXJlIGNsaWNrZWRcbiAqIEBwYXJhbSAge2VsZW1lbnR9ICRhbmNob3JcbiAqIEByZXR1cm4ge3ZvaWR9XG4gKi9cbnZhciBhdHRhY2hMaWtlRXZlbnQgPSBmdW5jdGlvbigkYW5jaG9yKSB7XG5cdCRhbmNob3IuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbihlKSB7XG5cdFx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xuXG5cdFx0Ly8gQWxyZWFkeSBsaWtlZCB0aGlzIGFydGljbGVcblx0XHRpZiAobG9jYWxTdG9yYWdlLmdldEl0ZW0oJ2xpa2U6JyArIHdpbmRvdy5wb3N0SWQpKSB7XG5cdFx0XHRyZXR1cm47XG5cdFx0fVxuXG5cdFx0bG9jYWxTdG9yYWdlLnNldEl0ZW0oJ2xpa2U6JyArIHdpbmRvdy5wb3N0SWQsIHRydWUpO1xuXHRcdGxpa2VkKCk7XG5cblx0XHRhcGkubGlrZSgpLnRoZW4oZnVuY3Rpb24oZGF0YSkge1xuXHRcdFx0c2V0TGlrZXNOdW1iZXIoZGF0YS5saWtlcyk7XG5cdFx0fSk7XG5cdH0pO1xufTtcblxuLyoqXG4gKiBVcGRhdGUgcmVzcG9uc2VzIGZvcm0gaWYgdXNlciBpcyBsb2dnZWQgaW4uXG4gKiBVc2VyIGRvIG5vdCBuZWVkIHRvIGZpbGwgZS1tYWlsLCBuYW1lIGV0Yy5cbiAqIEBwYXJhbSAge29iamVjdH0gZGF0YVxuICogQHJldHVybiB7dm9pZH1cbiAqL1xudmFyIHJlbmRlclVzZXJGb3JtID0gZnVuY3Rpb24odXNlcikge1xuXHR2YXIgaHRtbCA9IHVzZXJNZXRhVGVtcGxhdGUodXNlcik7XG5cdHZhciAkbWV0YSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuXHQkbWV0YS5pbm5lckhUTUwgPSBodG1sO1xuXHR2YXIgJGhlYWRlciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5yZXNwb25zZXNfX2Zvcm0gaDMnKTtcblxuXHQvLyBGaWxsIGlucHV0IGZpZWxkcyB3aXRoIHJlbGV2YW50IGRhdGFcblx0Z2V0QWxsKCcucmVzcG9uc2VzX19mb3JtIGlucHV0JykuZm9yRWFjaChmdW5jdGlvbigkaW5wdXQpIHtcblx0XHR2YXIgbmFtZSA9ICRpbnB1dC5nZXRBdHRyaWJ1dGUoJ25hbWUnKTtcblx0XHRpZiAobmFtZSA9PT0gJ3dlYnNpdGUnKSB7XG5cdFx0XHQkaW5wdXQudmFsdWUgPSAnL2F1dGhvci8nICsgdXNlci5zbHVnO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHQkaW5wdXQudmFsdWUgPSB1c2VyW25hbWVdO1xuXHRcdH1cblx0XHQkaW5wdXQucGFyZW50Tm9kZS5jbGFzc0xpc3QuYWRkKCd2YWxpZGF0ZS0tdmFsaWQnKTtcblx0XHQkaW5wdXQucGFyZW50Tm9kZS5jbGFzc0xpc3QucmVtb3ZlKCd2YWxpZGF0ZS0tbm90LXZhbGlkJyk7XG5cdH0pO1xuXG5cdC8vIEluc2VydCBhZnRlciBoZWFkZXJcblx0JGhlYWRlci5wYXJlbnROb2RlLmluc2VydEJlZm9yZSgkbWV0YSwgJGhlYWRlci5uZXh0U2libGluZyk7XG5cdGxhenlJbWFnZXMoMSk7XG5cdHZhbGlkYXRlRm9ybSgkdmFsaWRhdG9ycywgdXBkYXRlUmVzcG9uc2VDVEEpO1xufTtcblxuLyoqXG4gKiBJbml0IHJlc3BvbnNlc1xuICogQHJldHVybiB7dm9pZH1cbiAqL1xuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24oKSB7XG5cdCRyZXNwb25zZUZvcm0gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucmVzcG9uc2VzX19mb3JtJyk7XG5cblx0aWYgKCEkcmVzcG9uc2VGb3JtKSB7XG5cdFx0cmV0dXJuO1xuXHR9XG5cblx0Ly8gQ2FjaGUgZG9tIGVsZW1lbnRzXG5cdCRjdGEgPSAkcmVzcG9uc2VGb3JtLnF1ZXJ5U2VsZWN0b3IoJy5idG4tLWN0YScpO1xuXHQkcmVzcG9uc2VzTGlzdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5yZXNwb25zZXNfX2xpc3QnKTtcblx0JHZhbGlkYXRvcnMgPSBnZXRBbGwoJy52YWxpZGF0ZScsICRyZXNwb25zZUZvcm0pO1xuXG5cdC8vIFVwZGF0ZSBmcm9tIGFzIHVzZXIgdHlwZXNcblx0bGl2ZVZhbGlkYXRpb24oJHZhbGlkYXRvcnMsIHVwZGF0ZVJlc3BvbnNlQ1RBKTtcblxuXHQvLyBSZW5kZXIgcmVzcG9uc2VzIGFuZCBsaWtlXG5cdHJlbmRlck1ldGEoKTtcblxuXHQvLyBDaGFuZ2UgZm9ybSBpZiB1c2VyIGlzIGxvZ2dlZCBpblxuXHRnZXRVc2VyRGF0YSgpLnRoZW4ocmVuZGVyVXNlckZvcm0pLmNhdGNoKGZ1bmN0aW9uKCkge30pO1xuXG5cdC8vIFVzZXIgYWxyZWFkeSBsaWtlcyB0aGlzIGFydGljbGVcblx0aWYgKGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdsaWtlOicgKyB3aW5kb3cucG9zdElkKSkge1xuXHRcdGxpa2VkKCk7XG5cdH1cblxuXHRnZXRBbGwoJy5zaGFyZV9fbGlrZScpLmZvckVhY2goYXR0YWNoTGlrZUV2ZW50KTtcblx0JGN0YS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHN1Ym1pdFJlc3BvbnNlKTtcblxuXHQvLyBTaG93IG1hcmtkb3duIGhlbHBlcnNcblx0ZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnJlc3BvbnNlLWZvcm1fX21hcmtkb3duLWV4cGFuZGVyJykuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbihlKSB7XG5cdFx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xuXHRcdGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5yZXNwb25zZS1mb3JtX19tYXJrZG93bi1oZWxwZXJzJykuY2xhc3NMaXN0LnJlbW92ZSgnaGlkZGVuJyk7XG5cdH0pO1xuXG59XG4iLCJpbXBvcnQgbGF6eUltYWdlcyBmcm9tICdkcy1hc3NldHMvbGF6eS9pbWFnZXMnO1xuaW1wb3J0IGdldEFsbCBmcm9tICdkcy1hc3NldHMvZG9tL2dldC1hbGwnO1xuaW1wb3J0ICogYXMgYXBpIGZyb20gJy4uL2xpYi9hcGknO1xuaW1wb3J0IHBvc3RUZW1wbGF0ZSBmcm9tICcuLi90ZW1wbGF0ZXMvcG9zdCc7XG5pbXBvcnQgYXV0aG9yVGVtcGxhdGUgZnJvbSAnLi4vdGVtcGxhdGVzL2F1dGhvcic7XG5pbXBvcnQgdGFnVGVtcGxhdGUgZnJvbSAnLi4vdGVtcGxhdGVzL3RhZyc7XG5cbmNvbnN0IE1BWF9SRVNVTFRTID0gMTA7XG5cbnZhciAkc2VhcmNoSW5wdXQ7XG52YXIgJHNlYXJjaExpc3Q7XG52YXIgbGF0ZXN0Q291bnRlciA9IDA7XG5cbnZhciBnZXRTZWFyY2hSZXN1bHQgPSBmdW5jdGlvbihwYXRoKSB7XG5cdHZhciBhYnNvbHV0ZSA9IHdpbmRvdy5naG9zdC51cmwuYXBpKHBhdGgsIHtcblx0XHRpbmNsdWRlOiAndGFncyxhdXRob3IsY291bnQucG9zdHMnXG5cdH0pO1xuXHR2YXIgcmVsYXRpdmUgPSBhYnNvbHV0ZS5zdWJzdHIoYWJzb2x1dGUuaW5kZXhPZignL2dob3N0JyksIGFic29sdXRlLmxlbmd0aCk7XG5cdHJldHVybiBmZXRjaChyZWxhdGl2ZSlcblx0XHQudGhlbihmdW5jdGlvbihyZXNwb25zZSkge1xuXHRcdFx0aWYgKHJlc3BvbnNlLnN0YXR1cyA+PSAzMDApIHtcblx0XHRcdFx0cmV0dXJuIFByb21pc2UucmVqZWN0KHJlc3BvbnNlKTtcblx0XHRcdH1cblx0XHRcdHJldHVybiByZXNwb25zZTtcblx0XHR9KVxuXHRcdC50aGVuKHJlc3BvbnNlID0+IHJlc3BvbnNlLmpzb24oKSk7XG59O1xuXG52YXIgcmVuZGVyUmVzdWx0cyA9IGZ1bmN0aW9uKHJlc3VsdHMpIHtcblx0dmFyIGh0bWwgPSByZXN1bHRzLm1hcChmdW5jdGlvbihyZXN1bHQpIHtcblx0XHRpZiAocmVzdWx0LnBvc3RzKSB7XG5cdFx0XHRyZXR1cm4gcG9zdFRlbXBsYXRlKHJlc3VsdC5wb3N0c1swXSk7XG5cdFx0fVxuXHRcdGlmIChyZXN1bHQudXNlcnMpIHtcblx0XHRcdHJldHVybiBhdXRob3JUZW1wbGF0ZShyZXN1bHQudXNlcnNbMF0pO1xuXHRcdH1cblx0XHRpZiAocmVzdWx0LnRhZ3MpIHtcblx0XHRcdHJldHVybiB0YWdUZW1wbGF0ZShyZXN1bHQudGFnc1swXSk7XG5cdFx0fVxuXHRcdHJldHVybiAnJztcblx0fSkuam9pbignJyk7XG5cdCRzZWFyY2hMaXN0LmlubmVySFRNTCA9IGh0bWw7XG5cdGxhenlJbWFnZXMoMSk7XG5cdGdldEFsbCgnLmJveGVzX19pdGVtJywgJHNlYXJjaExpc3QpLmZvckVhY2goZnVuY3Rpb24oJGJveEl0ZW0sIGkpIHtcblx0XHRzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xuXHRcdFx0JGJveEl0ZW0uY2xhc3NMaXN0LnJlbW92ZSgnaGlkZGVuJyk7XG5cdFx0XHRzZXRUaW1lb3V0KCgpID0+ICRib3hJdGVtLmNsYXNzTGlzdC5hZGQoJ2FuaW1hdGUtLWFjdGl2ZScpLCAwKTtcblx0XHR9LCBpICogNTAwKTtcblx0fSk7XG59O1xuXG52YXIgc2VhcmNoID0gZnVuY3Rpb24ocXVlcnkpIHtcblxuXHR2YXIgaWQgPSArK2xhdGVzdENvdW50ZXI7XG5cdHZhciBtaW5UaW1lID0gRGF0ZS5ub3coKSArIDMwMDtcblxuXHQkc2VhcmNoTGlzdC5pbm5lckhUTUwgPSAnJztcblxuXHR2YXIgaXNMYXRlc3QgPSBmdW5jdGlvbihkYXRhKSB7XG5cdFx0aWYgKGlkICE9PSBsYXRlc3RDb3VudGVyKSB7XG5cdFx0XHRyZXR1cm4gUHJvbWlzZS5yZWplY3QoKTtcblx0XHR9XG5cdFx0cmV0dXJuIGRhdGE7XG5cdH07XG5cblx0YXBpLmdldFNlYXJjaEluZGV4KHF1ZXJ5KVxuXHRcdC50aGVuKGlzTGF0ZXN0KVxuXHRcdC50aGVuKGZ1bmN0aW9uKGluZGV4ZXMpIHtcblx0XHRcdHZhciBwcm9taXNlcyA9IGluZGV4ZXMuc2xpY2UoMCwgTUFYX1JFU1VMVFMpLm1hcChmdW5jdGlvbihpbmRleCkge1xuXHRcdFx0XHRyZXR1cm4gZ2V0U2VhcmNoUmVzdWx0KGluZGV4LnJlZik7XG5cdFx0XHR9KTtcblx0XHRcdHJldHVybiBQcm9taXNlLmFsbChwcm9taXNlcyk7XG5cdFx0fSlcblx0XHQudGhlbihmdW5jdGlvbihkYXRhKSB7XG5cdFx0XHRpZiAobWluVGltZSA8IERhdGUubm93KCkpIHtcblx0XHRcdFx0cmV0dXJuIGRhdGE7XG5cdFx0XHR9XG5cdFx0XHRyZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24ocmVzb2x2ZSkge1xuXHRcdFx0XHRzZXRUaW1lb3V0KCgpID0+IHJlc29sdmUoZGF0YSksIG1pblRpbWUgLSBEYXRlLm5vdygpKTtcblx0XHRcdH0pO1xuXHRcdH0pXG5cdFx0LnRoZW4oaXNMYXRlc3QpXG5cdFx0LnRoZW4ocmVuZGVyUmVzdWx0cylcblx0XHQuY2F0Y2goZnVuY3Rpb24oZXJyKSB7XG5cdFx0XHRpZiAoZXJyKSB7XG5cdFx0XHRcdGNvbnNvbGUuZXJyb3IoZXJyKTtcblx0XHRcdH1cblx0XHR9KTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uKCkge1xuXG5cdCRzZWFyY2hJbnB1dCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5zZWFyY2hfX2lucHV0Jyk7XG5cdCRzZWFyY2hMaXN0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnNlYXJjaF9fbGlzdCcpO1xuXG5cdGlmICghJHNlYXJjaElucHV0IHx8ICEkc2VhcmNoTGlzdCkge1xuXHRcdHJldHVybjtcblx0fVxuXHQkc2VhcmNoSW5wdXQuYWRkRXZlbnRMaXN0ZW5lcignaW5wdXQnLCBmdW5jdGlvbigpIHtcblx0XHRzZWFyY2goJHNlYXJjaElucHV0LnZhbHVlKTtcblx0fSk7XG5cblx0JHNlYXJjaElucHV0LmZvY3VzKCk7XG5cblx0JHNlYXJjaExpc3Quc2V0QXR0cmlidXRlKCdzdHlsZScsIGBtaW4taGVpZ2h0OiAke3dpbmRvdy5pbm5lckhlaWdodH1weGApO1xuXG59XG4iLCIvKipcbiAqIFRvb2wgdGlwIHNob3dlZCB3aGVuIHVzZXIgbWFya3MgdGV4dCBpbiBhcnRpY2xlLlxuICogVGhpcyBtYWtlcyB0aGUgdXNlIGFibGUgdG8gc2hhcmUvY29tbWVudCBvbiB0aGUgbWFya2VkLlxuICovXG5cbmltcG9ydCB2YWxpZGF0ZUZvcm0gZnJvbSAnLi4vbGliL2Zvcm0vdmFsaWRhdGUnO1xuaW1wb3J0IGdldEFsbCBmcm9tICdkcy1hc3NldHMvZG9tL2dldC1hbGwnO1xuXG4vLyBDYWNoZWQgZG9tIGVsZW1lbnRzXG52YXIgJHBvc3RDb250ZW50O1xudmFyICR0b29sVGlwO1xudmFyICR0d2l0dGVyO1xudmFyICRyZXNwb25zZUZvcm07XG52YXIgJGN0YTtcblxuXG4vKipcbiAqIEdldCB0aGUgdGV4dCBzZWxlY3RlZCBieSB0aGUgdXNlclxuICogQHJldHVybiB7c3RyaW5nfVxuICovXG52YXIgZ2V0U2VsZWN0ZWRUZXh0ID0gZnVuY3Rpb24oKSB7XG5cdHZhciB0ZXh0ID0gJyc7XG5cdGlmICh0eXBlb2Ygd2luZG93LmdldFNlbGVjdGlvbiAhPT0gJ3VuZGVmaW5lZCcpIHtcblx0XHR0ZXh0ID0gd2luZG93LmdldFNlbGVjdGlvbigpLnRvU3RyaW5nKCk7XG5cdH0gZWxzZSBpZiAodHlwZW9mIGRvY3VtZW50LnNlbGVjdGlvbiAhPT0gJ3VuZGVmaW5lZCcgJiYgZG9jdW1lbnQuc2VsZWN0aW9uLnR5cGUgPT09ICdUZXh0Jykge1xuXHRcdHRleHQgPSBkb2N1bWVudC5zZWxlY3Rpb24uY3JlYXRlUmFuZ2UoKS50ZXh0O1xuXHR9XG5cdHJldHVybiB0ZXh0O1xufTtcblxuLyoqXG4gKiBDaGVjayBpZiB0aGUgc2VsZWN0ZWQgdGV4dCBpcyBpbnNpZGUgdGhlIGNvbnRlbnQgY29udGFpbmVyXG4gKiBAcGFyYW0gIHtvYmplY3R9ICBzZWxlY3Rpb25cbiAqIEByZXR1cm4ge0Jvb2xlYW59XG4gKi9cbnZhciBpc0luc2lkZUNvbnRlbnQgPSBmdW5jdGlvbihzZWxlY3Rpb24pIHtcblx0dmFyICRjb250YWluZXIgPSBzZWxlY3Rpb24uYW5jaG9yTm9kZS5wYXJlbnRFbGVtZW50O1xuXG5cdHdoaWxlICgkY29udGFpbmVyICE9PSAkcG9zdENvbnRlbnQgJiYgJGNvbnRhaW5lci5wYXJlbnROb2RlKSB7XG5cdFx0JGNvbnRhaW5lciA9ICRjb250YWluZXIucGFyZW50Tm9kZTtcblx0fVxuXG5cdHJldHVybiAoJGNvbnRhaW5lciA9PT0gJHBvc3RDb250ZW50KTtcblxufTtcblxuLyoqXG4gKiBQbGFjZXMgdGhlIHRvb2wgdGlwIGFib3ZlIHRoZSBzZWxlY3RlZCB0ZXh0XG4gKiBAcmV0dXJuIHt2b2lkfVxuICovXG52YXIgcGxhY2VUb29sVGlwID0gZnVuY3Rpb24oKSB7XG5cblx0Ly8gVGltZW91dCB0byBtYWtlIHN1cmUgdGhlIHRleHQgaGFzIGJlZW4gc2VsZWN0ZWRcblx0c2V0VGltZW91dChmdW5jdGlvbigpIHtcblxuXHRcdHZhciBoaWdobGlnaHRlZFRleHQgPSBnZXRTZWxlY3RlZFRleHQoKTtcblxuXHRcdC8vIEhpZGUgdG9vbCB0aXAgaWYgbm90aGluZyBpcyBzZWxlY3RlZFxuXHRcdGlmICghaGlnaGxpZ2h0ZWRUZXh0KSB7XG5cdFx0XHQkdG9vbFRpcC5jbGFzc0xpc3QucmVtb3ZlKCd0b29sLXRpcC0tdmlzaWJsZScpO1xuXHRcdFx0cmV0dXJuO1xuXHRcdH1cblxuXHRcdC8vIERpc3BsYXkgdG9vbCB0aXAgaWYgc2VsZWN0aW9uIGlzIGluc2lkZSB0aGUgY29udGVudCBjb250YWluZXJcblx0XHR2YXIgc2VsZWN0aW9uID0gd2luZG93LmdldFNlbGVjdGlvbigpO1xuXHRcdGlmICghaXNJbnNpZGVDb250ZW50KHNlbGVjdGlvbikpIHtcblx0XHRcdCR0b29sVGlwLmNsYXNzTGlzdC5yZW1vdmUoJ3Rvb2wtdGlwLS12aXNpYmxlJyk7XG5cdFx0XHRyZXR1cm47XG5cdFx0fVxuXG5cdFx0Ly8gQ2hhbmdlIGNvbnRleHR1YWwgYWN0aW9uc1xuXHRcdCR0d2l0dGVyLnNldEF0dHJpYnV0ZSgnaHJlZicsIGBodHRwczovL3R3aXR0ZXIuY29tL2ludGVudC90d2VldD90ZXh0PSR7ZW5jb2RlVVJJQ29tcG9uZW50KCdcIicgKyBoaWdobGlnaHRlZFRleHQgKyAnXCIgLSAnICsgJHR3aXR0ZXIuZGF0YXNldC51cmwpfWApO1xuXG5cdFx0Ly8gU2hvdyBhbmQgcGxhY2UgdG9vbCB0aXBcblx0XHR2YXIgc2Nyb2xsUG9zaXRpb24gPSAod2luZG93LnNjcm9sbFkgfHwgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LnNjcm9sbFRvcCk7XG5cdFx0dmFyIHJhbmdlID0gc2VsZWN0aW9uLmdldFJhbmdlQXQoMCk7XG5cdFx0dmFyIHJlY3QgPSByYW5nZS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcblx0XHQkdG9vbFRpcC5zdHlsZS50b3AgPSAocmVjdC50b3AgKyBzY3JvbGxQb3NpdGlvbikgKyAncHgnO1xuXHRcdCR0b29sVGlwLmNsYXNzTGlzdC5hZGQoJ3Rvb2wtdGlwLS12aXNpYmxlJyk7XG5cdFx0JHRvb2xUaXAuc3R5bGUubGVmdCA9ICgwLjUgKiByZWN0LmxlZnQgKyAwLjUgKiByZWN0LnJpZ2h0IC0gMC41ICogJHRvb2xUaXAuY2xpZW50V2lkdGgpICsgJ3B4Jztcblx0fSwgMTApO1xufTtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24oKSB7XG5cdCRwb3N0Q29udGVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5jb250ZW50Jyk7XG5cdCR0b29sVGlwID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnRvb2wtdGlwJyk7XG5cblx0aWYgKCEkcG9zdENvbnRlbnQgfHwgISR0b29sVGlwKSB7XG5cdFx0cmV0dXJuO1xuXHR9XG5cblx0JHJlc3BvbnNlRm9ybSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5yZXNwb25zZXNfX2Zvcm0nKTtcblx0JGN0YSA9ICRyZXNwb25zZUZvcm0ucXVlcnlTZWxlY3RvcignLmJ0bi0tY3RhJyk7XG5cblx0JHR3aXR0ZXIgPSAkdG9vbFRpcC5xdWVyeVNlbGVjdG9yKCcudG9vbC10aXBfX3R3aXR0ZXInKTtcblxuXHRkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdtb3VzZXVwJywgcGxhY2VUb29sVGlwKTtcblx0ZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcigna2V5dXAnLCBwbGFjZVRvb2xUaXApO1xuXG5cdC8vIEZpbGwgZm9ybSB3aXRoIHNlbGVjdGVkIHRleHQgdG8gbWFrZSBhIHF1aWNrIHJlc3BvbnNlIG9uIHRoZSBhcnRpY2xlIGJ5XG5cdC8vIHRoZSB1c2VyXG5cdHZhciAkcmVzcG9uc2VUZXh0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnJlc3BvbnNlc19fZm9ybSB0ZXh0YXJlYScpO1xuXHQkdG9vbFRpcC5xdWVyeVNlbGVjdG9yKCcudG9vbC10aXBfX3Jlc3BvbnNlJykuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbihlKSB7XG5cdFx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xuXHRcdHZhciBoaWdobGlnaHRlZFRleHQgPSBnZXRTZWxlY3RlZFRleHQoKTtcblx0XHQkcmVzcG9uc2VUZXh0LnZhbHVlID0gYD4gJHtoaWdobGlnaHRlZFRleHR9XG5cbmA7XG5cdFx0JHJlc3BvbnNlVGV4dC5mb2N1cygpO1xuXHRcdCRyZXNwb25zZVRleHQucGFyZW50Tm9kZS5jbGFzc0xpc3QuYWRkKCd2YWxpZGF0ZS0tdmFsaWQnKTtcblx0XHQkcmVzcG9uc2VUZXh0LnBhcmVudE5vZGUuY2xhc3NMaXN0LnJlbW92ZSgndmFsaWRhdGUtLW5vdC12YWxpZCcpO1xuXHRcdHZhciB2YWxpZCA9IHZhbGlkYXRlRm9ybShnZXRBbGwoJy52YWxpZGF0ZScsICRyZXNwb25zZUZvcm0pKTtcblx0XHRpZiAodmFsaWQpIHtcblx0XHRcdCRjdGEuY2xhc3NMaXN0LnJlbW92ZSgnYnRuLS1kaXNhYmxlZCcpO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHQkY3RhLmNsYXNzTGlzdC5hZGQoJ2J0bi0tZGlzYWJsZWQnKTtcblx0XHR9XG5cdH0pO1xufVxuIiwiLyoqXG4gKiBIZWxwZXJzIGZvciBjb21tdW5pY2F0aW5nIHdpdGggdGhlIG1ldGEgYXBpIGhvbGRpbmcgcmVzcG9uc2VzIGFuZCBsaWtlcyBmb3JcbiAqIHRoZSBhcnRpY2xlcy5cbiAqL1xuXG52YXIgYXBpVXJsID0gd2luZG93LmFwaVVSTDtcbnZhciBpZCA9IHdpbmRvdy5wb3N0SWQ7XG5cbi8qKlxuICogTWFrZSBhIEFKQVggY2FsbCB0byB0aGUgYXBpXG4gKiBAcGFyYW0gIHtTdHJpbmd9IHBhdGhcbiAqIEBwYXJhbSAge1N0cmluZ30gbWV0aG9kXG4gKiBAcGFyYW0gIHtvYmplY3R9IGRhdGFcbiAqIEByZXR1cm4ge1Byb21pc2V9XG4gKi9cbnZhciByZXF1ZXN0ID0gZnVuY3Rpb24ocGF0aCA9ICcnLCBtZXRob2QgPSAnR0VUJywgZGF0YSA9IG51bGwpIHtcblxuICB2YXIgZmV0Y2hPcHRpb25zID0ge1xuICAgIG1ldGhvZCxcbiAgICBoZWFkZXJzOiB7XG4gICAgICAnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL2pzb247IGNoYXJzZXQ9dXRmLTgnXG4gICAgfVxuICB9O1xuXG4gIGlmIChkYXRhKSB7XG4gICAgZmV0Y2hPcHRpb25zLmJvZHkgPSBKU09OLnN0cmluZ2lmeShkYXRhKTtcbiAgfVxuXG4gIC8vIFBlcmZvcm0gdGhlIGFqYXggY2FsbFxuICByZXR1cm4gZmV0Y2goYXBpVXJsICsgcGF0aCwgZmV0Y2hPcHRpb25zKVxuICAgIC50aGVuKGZ1bmN0aW9uKHJlc3BvbnNlKSB7XG4gICAgICBpZiAocmVzcG9uc2Uuc3RhdHVzID49IDMwMCkge1xuICAgICAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QocmVzcG9uc2UpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHJlc3BvbnNlO1xuICAgIH0pXG4gICAgLnRoZW4ocmVzcG9uc2UgPT4gcmVzcG9uc2UuanNvbigpKTtcbn07XG5cbi8qKlxuICogR2V0IG1ldGEgZGF0YSBmcm9tIHRoZSBhcnRpY2xlLiBJZiBubyBtZXRhIGRhdGEgaXMgcHJlc2VudCBmb3IgdGhlIGFjdHVhbFxuICogYXJ0aWNsZSBhbmQgbmV3IGVudHJ5IHdpbGwgYmUgbWFkZS5cbiAqIEBwYXJhbSAge2Jvb2xlYW59IHJhdyBXaGV0aGVyIHRvIGluY2x1ZGUgY29tcHV0ZWQgZmllbGRzXG4gKiBAcmV0dXJuIHtQcm9taXNlfVxuICovXG5leHBvcnQgdmFyIGdldE1ldGEgPSBmdW5jdGlvbihyYXcpIHtcbiAgdmFyIHF1ZXJ5ID0gJz9pZD0nICsgaWQ7XG4gIGlmIChyYXcpIHtcbiAgICBxdWVyeSArPSAnJnJhdyc7XG4gIH1cbiAgcmV0dXJuIHJlcXVlc3QocXVlcnkpXG4gICAgLmNhdGNoKGZ1bmN0aW9uKCkge1xuICAgICAgcmV0dXJuIHJlcXVlc3QoJycsICdQT1NUJywge1xuICAgICAgICByZXNwb25zZXM6IFtdLFxuICAgICAgICBsaWtlczogMCxcbiAgICAgICAgaWRcbiAgICAgIH0pO1xuICAgIH0pO1xufTtcblxuZXhwb3J0IHZhciBnZXRTZWFyY2hJbmRleCA9IGZ1bmN0aW9uKHF1ZXJ5KSB7XG4gIHJldHVybiByZXF1ZXN0KCdzZWFyY2g/cT0nICsgcXVlcnkpO1xufTtcblxuLyoqXG4gKiBJbmNyZW1lbnQgdGhlIGxpa2UgdmFsdWUgd2l0aCBvbmVcbiAqIEByZXR1cm4ge1Byb21pc2V9XG4gKi9cbmV4cG9ydCB2YXIgbGlrZSA9IGZ1bmN0aW9uKCkge1xuICByZXR1cm4gZ2V0TWV0YShpZCwgdHJ1ZSlcbiAgICAudGhlbihmdW5jdGlvbihkYXRhKSB7XG4gICAgICByZXR1cm4gcmVxdWVzdCgnP2lkPScgKyBpZCwgJ1BVVCcsIHtcbiAgICAgICAgbGlrZXM6IGRhdGEubGlrZXMgKyAxXG4gICAgICB9KTtcbiAgICB9KTtcbn07XG5cbi8qKlxuICogVXBkYXRlIGF1dGhvciBlbWFpbCB1c2VkIHRvIHNlbmQgZS1tYWlscyB3aGVuIGEgcmVzcG9uc2UgaSByZWNlaXZlZC5cbiAqIEByZXR1cm4ge1Byb21pc2V9XG4gKi9cbmV4cG9ydCB2YXIgdXBkYXRlQXV0aG9yRW1haWwgPSBmdW5jdGlvbihhdXRob3JFbWFpbCkge1xuICBpZiAoIWlkKSB7XG4gICAgcmV0dXJuIFByb21pc2UucmVqZWN0KG5ldyBFcnJvcignTm8gcG9zdElkJykpO1xuICB9XG4gIHJldHVybiByZXF1ZXN0KCc/aWQ9JyArIGlkLCAnUFVUJywge1xuICAgIGF1dGhvckVtYWlsXG4gIH0pO1xufTtcblxuLyoqXG4gKiBBZGQgYSByZXNwb25zZVxuICogQHBhcmFtIHtvYmplY3R9IHJlc3BvbnNlXG4gKiBAcmV0dXJuIHtQcm9taXNlfVxuICovXG5leHBvcnQgdmFyIGFkZFJlc3BvbnNlID0gZnVuY3Rpb24ocmVzcG9uc2UpIHtcbiAgcmV0dXJuIGdldE1ldGEodHJ1ZSlcbiAgICAudGhlbihmdW5jdGlvbihkYXRhKSB7XG5cbiAgICAgIC8vIFNldCB0aGUgcHVibGlzaCBkYXRhIHRvIG5vd1xuICAgICAgcmVzcG9uc2UucHVibGlzaGVkID0gbmV3IERhdGUoKS50b0lTT1N0cmluZygpO1xuXG4gICAgICAvLyBVcGRhdGUgdGhlIHJlc3BvbnNlcyBsaXN0XG4gICAgICBkYXRhLnJlc3BvbnNlcy5wdXNoKHJlc3BvbnNlKTtcbiAgICAgIHJldHVybiByZXF1ZXN0KCc/aWQ9JyArIGlkLCAnUFVUJywge1xuICAgICAgICByZXNwb25zZXM6IGRhdGEucmVzcG9uc2VzXG4gICAgICB9KTtcbiAgICB9KTtcbn07XG5cbi8qKlxuICogUmVtb3ZlIGEgcmVzcG9uc2VcbiAqIEBwYXJhbSAge3N0cmluZ30gcHVibGlzaGVkXG4gKiBAcGFyYW0gIHtzdHJpbmd9IG5hbWVcbiAqIEByZXR1cm4ge1Byb21pc2V9XG4gKi9cbmV4cG9ydCB2YXIgcmVtb3ZlUmVzcG9uc2UgPSBmdW5jdGlvbihwdWJsaXNoZWQsIG5hbWUpIHtcbiAgcmV0dXJuIGdldE1ldGEodHJ1ZSlcbiAgICAudGhlbihmdW5jdGlvbihkYXRhKSB7XG5cbiAgICAgIC8vIFJlbW92ZSByZXNwb3NlIHdoaWNoIG1hdGNoZXMgb24gcHVibGlzaCBkYXRlIGFuZCBhdXRob3IgbmFtZVxuICAgICAgdmFyIHJlc3BvbnNlcyA9IGRhdGEucmVzcG9uc2VzLmZpbHRlcihmdW5jdGlvbihyZXNwb25zZSkge1xuICAgICAgICByZXR1cm4gKHJlc3BvbnNlLnB1Ymxpc2hlZCAhPT0gcHVibGlzaGVkIHx8IHJlc3BvbnNlLm5hbWUgIT09IG5hbWUpO1xuICAgICAgfSk7XG5cbiAgICAgIHJldHVybiByZXF1ZXN0KCc/aWQ9JyArIGlkLCAnUFVUJywge1xuICAgICAgICByZXNwb25zZXNcbiAgICAgIH0pO1xuICAgIH0pO1xufTtcbiIsIi8qKlxuICogVmFsaWRhdGUgaW5wdXQgZmllbGRzIGFzIHVzZXIgdHlwZXNcbiAqL1xuXG4vLyBEZXBlbmRlbmNpZXNcbmltcG9ydCB2YWxpZGF0ZUZvcm0gZnJvbSAnLi92YWxpZGF0ZSc7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uKCR2YWxpZGF0b3JzLCBjYWxsYmFjaykge1xuXHQkdmFsaWRhdG9ycy5mb3JFYWNoKGZ1bmN0aW9uKCR2YWxpZGF0ZUNvbnRhaW5lcikge1xuXHRcdHZhciAkdmFsaWRhdGVGaWVsZCA9ICR2YWxpZGF0ZUNvbnRhaW5lci5xdWVyeVNlbGVjdG9yKCdpbnB1dCwgdGV4dGFyZWEnKTtcblxuXHRcdCR2YWxpZGF0ZUZpZWxkLmFkZEV2ZW50TGlzdGVuZXIoJ2lucHV0JywgZnVuY3Rpb24oKSB7XG5cdFx0XHR2YXIgdmFsaWQgPSB2YWxpZGF0ZUZvcm0oJHZhbGlkYXRvcnMpO1xuXHRcdFx0Y2FsbGJhY2sodmFsaWQpO1xuXHRcdH0pO1xuXHR9KTtcbn1cbiIsIi8qKlxuICogQ2hlY2sgaWYgdGhlIGZvcm0gaXMgdmFsaWRcbiAqL1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbigkdmFsaWRhdG9ycykge1xuXHR2YXIgbm90VmFsaWQgPSAkdmFsaWRhdG9ycy5zb21lKGZ1bmN0aW9uKCR2YWxpZGF0b3IpIHtcblx0XHRpZiAoJHZhbGlkYXRvci5kYXRhc2V0LnZhbGlkYXRlUmVxdWlyZWQgIT09IHVuZGVmaW5lZCkge1xuXHRcdFx0cmV0dXJuICEkdmFsaWRhdG9yLmNsYXNzTGlzdC5jb250YWlucygndmFsaWRhdGUtLXZhbGlkJyk7XG5cdFx0fSBlbHNlIHtcblx0XHRcdHJldHVybiAkdmFsaWRhdG9yLmNsYXNzTGlzdC5jb250YWlucygndmFsaWRhdGUtLW5vdC12YWxpZCcpO1xuXHRcdH1cblx0fSk7XG5cblx0cmV0dXJuICFub3RWYWxpZDtcbn1cbiIsIi8qKlxuICogQ2hlY2sgaWYgdXNlciBpcyBsb2dnZWQgaW4gdXNpbmcgdGhlIGdob3N0IHNlc3Npb24uIElmIGxvZ2dlZCBpbiBnZXQgdXNlclxuICogZGF0YS5cbiAqL1xuXG4vLyBDYWNoZWQgcHJvbWlzZVxudmFyIGRhdGFQcm9taXNlO1xuXG4vKipcbiAqIEdldCB0aGUgZGF0YSBmb3IgdGhlIGxvZ2dlZCBpbiB1c2VkXG4gKiBAcGFyYW0gIHtzdHJpbmd9IHRva2VuXG4gKiBAcmV0dXJuIHtQcm9taXNlfVxuICovXG52YXIgZ2V0VXNlckRhdGEgPSBmdW5jdGlvbih0b2tlbikge1xuXHRyZXR1cm4gZmV0Y2goJy9naG9zdC9hcGkvdjAuMS91c2Vycy9tZS8/aW5jbHVkZT1yb2xlcyZzdGF0dXM9YWxsJywge1xuXHRcdG1ldGhvZDogJ0dFVCcsXG5cdFx0aGVhZGVyczoge1xuXHRcdFx0J0F1dGhvcml6YXRpb24nOiAnQmVhcmVyICcgKyB0b2tlblxuXHRcdH1cblx0fSkudGhlbihmdW5jdGlvbihyZXNwb25zZSkge1xuXHRcdGlmIChyZXNwb25zZS5zdGF0dXMgIT09IDIwMCkge1xuXHRcdFx0cmV0dXJuIFByb21pc2UucmVqZWN0KCdPbGQgc2Vzc2lvbicpO1xuXHRcdH1cblx0XHRyZXR1cm4gcmVzcG9uc2UuanNvbigpO1xuXHR9KS50aGVuKGZ1bmN0aW9uKGRhdGEpIHtcblx0XHRyZXR1cm4gZGF0YS51c2Vyc1swXTtcblx0fSk7XG59O1xuXG4vKipcbiAqIENoZWNrIGlmIHRoZXJlIGlzIGEgR2hvc3Qgc2Vzc2lvbi4gSWYgc28gdXNlIGl0IHRvIGdldCB0aGUgdXNlcnMgZGF0YS5cbiAqIEByZXR1cm4ge1Byb21pc2V9XG4gKi9cbnZhciBnZXQgPSBmdW5jdGlvbigpIHtcblxuXHQvLyBHaG9zdCBzdG9yZXMgaXQgc2Vzc2lvbiBpbiBsb2NhbFN0b3JhZ2Vcblx0dmFyIHNlc3Npb25TdHJpbmcgPSBsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnZ2hvc3Q6c2Vzc2lvbicpO1xuXHRpZiAoIXNlc3Npb25TdHJpbmcpIHtcblx0XHRyZXR1cm4gUHJvbWlzZS5yZWplY3QoJ05vIHNlc3Npb24nKTtcblx0fVxuXG5cdC8vIFZhbGlkIHNlc3Npb24/XG5cdHZhciBzZXNzaW9uID0gSlNPTi5wYXJzZShzZXNzaW9uU3RyaW5nKTtcblx0aWYgKCFzZXNzaW9uIHx8ICFzZXNzaW9uLmF1dGhlbnRpY2F0ZWQgfHwgIXNlc3Npb24uYXV0aGVudGljYXRlZC5hY2Nlc3NfdG9rZW4pIHtcblx0XHRyZXR1cm4gUHJvbWlzZS5yZWplY3QoJ05vIHNlc3Npb24nKTtcblx0fVxuXG5cdC8vIFNlc3Npb24gZXhwaXJlZD9cblx0aWYgKHNlc3Npb24uYXV0aGVudGljYXRlZC5leHBpcmVzX2F0IDwgRGF0ZS5ub3coKSkge1xuXHRcdHJldHVybiBQcm9taXNlLnJlamVjdCgnU2Vzc2lvbiBleHBpcmVkJyk7XG5cdH1cblxuXHRyZXR1cm4gZ2V0VXNlckRhdGEoc2Vzc2lvbi5hdXRoZW50aWNhdGVkLmFjY2Vzc190b2tlbik7XG5cbn07XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uKCkge1xuXG5cdC8vIFJldHVybiBjYWNoZWQgcHJvbWlzZSBpZiBhbHJlYWR5IGNhbGxlZFxuXHRpZiAoIWRhdGFQcm9taXNlKSB7XG5cdFx0ZGF0YVByb21pc2UgPSBnZXQoKTtcblx0fVxuXHRyZXR1cm4gZGF0YVByb21pc2U7XG59XG4iLCIvKipcbiAqIEVuY29kZSBhIHN0cmluZ1xuICogQHBhcmFtICB7c3RyaW5nfSBzdHJpbmdcbiAqIEByZXR1cm4ge3N0cmluZ31cbiAqL1xuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24oc3RyaW5nKSB7XG5cdHZhciBodG1sRW5jb2RlZFZhbHVlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2JykuYXBwZW5kQ2hpbGQoXG5cdFx0ZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoc3RyaW5nKSkucGFyZW50Tm9kZS5pbm5lckhUTUw7XG5cdHJldHVybiBodG1sRW5jb2RlZFZhbHVlLnJlcGxhY2UoL1xccj9cXG4vZywgJzxicj4nKTtcbn1cbiIsImltcG9ydCBnZXRBbGwgZnJvbSAnZHMtYXNzZXRzL2RvbS9nZXQtYWxsJztcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihyYXcpIHtcblx0dmFyICRjb250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcblx0JGNvbnRhaW5lci5pbm5lckhUTUwgPSByYXc7XG5cdGdldEFsbCgnaW1nJywgJGNvbnRhaW5lcikuZm9yRWFjaChmdW5jdGlvbigkaW1nKSB7XG5cdFx0dmFyICRpbWdXcmFwcGVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG5cdFx0JGltZ1dyYXBwZXIuY2xhc3NMaXN0LmFkZCgnaW1nLXdyYXBwZXInKTtcblx0XHQkaW1nV3JhcHBlci5pbm5lckhUTUwgPSAnPGRpdiBjbGFzcz1cImltZy1jb250YWluZXJcIj48aW1nPjwvZGl2Pic7XG5cdFx0dmFyIHNyYyA9ICRpbWcuZ2V0QXR0cmlidXRlKCdzcmMnKTtcblx0XHR2YXIgYWx0ID0gJGltZy5nZXRBdHRyaWJ1dGUoJ2FsdCcpO1xuXHRcdHZhciBwYWRkaW5nID0gNTA7XG5cblx0XHQvLyBMYXp5IGxvYWQgYWxsIGJ1dCB0aGUgZmlyc3QgaW1hZ2Vcblx0XHR2YXIgJG5ld0ltZyA9ICRpbWdXcmFwcGVyLnF1ZXJ5U2VsZWN0b3IoJ2ltZycpO1xuXG5cdFx0JG5ld0ltZy5zZXRBdHRyaWJ1dGUoJ2RhdGEtc3JjJywgc3JjKTtcblx0XHQkbmV3SW1nLnNldEF0dHJpYnV0ZSgnY2xhc3MnLCAnbGF6eS1pbWFnZScpO1xuXG5cdFx0YWx0LnNwbGl0KCc7JykuZm9yRWFjaChmdW5jdGlvbihzdHIpIHtcblx0XHRcdGlmIChzdHIgPT09ICdmdWxsLXNpemUnIHx8IHN0ciA9PT0gJ2Z1bGwtd2lkdGgnKSB7XG5cdFx0XHRcdCRpbWdXcmFwcGVyLmNsYXNzTGlzdC5hZGQoJ2Z1bGwtd2lkdGgnKTtcblx0XHRcdH0gZWxzZSBpZiAoc3RyLmluZGV4T2YoJ3JhdGlvPScpID09PSAwKSB7XG5cdFx0XHRcdHZhciByYXRpbyA9IHN0ci5yZXBsYWNlKCdyYXRpbz0nLCAnJyk7XG5cdFx0XHRcdGlmIChyYXRpby5pbmRleE9mKCc6JykpIHtcblx0XHRcdFx0XHR2YXIgZGltZW5zaW9ucyA9IHJhdGlvLnNwbGl0KCc6Jyk7XG5cdFx0XHRcdFx0cmF0aW8gPSBkaW1lbnNpb25zWzBdIC8gZGltZW5zaW9uc1sxXTtcblx0XHRcdFx0fVxuXHRcdFx0XHRwYWRkaW5nID0gMTAwIC8gcmF0aW87XG5cdFx0XHR9IGVsc2UgaWYgKHN0ciA9PT0gJ2JvcmRlcnMnKSB7XG5cdFx0XHRcdCRpbWdXcmFwcGVyLnF1ZXJ5U2VsZWN0b3IoJy5pbWctY29udGFpbmVyJykuY2xhc3NMaXN0LmFkZCgnaW1nLWNvbnRhaW5lci0tYm9yZGVycycpO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0YWx0ID0gc3RyO1xuXHRcdFx0fVxuXHRcdH0pO1xuXG5cdFx0JG5ld0ltZy5zZXRBdHRyaWJ1dGUoJ2FsdCcsIGFsdCk7XG5cdFx0JG5ld0ltZy5zZXRBdHRyaWJ1dGUoJ3RpdGxlJywgJGltZy5nZXRBdHRyaWJ1dGUoJ3RpdGxlJykpO1xuXG5cdFx0JGltZ1dyYXBwZXIucXVlcnlTZWxlY3RvcignLmltZy1jb250YWluZXInKVxuXHRcdFx0LnNldEF0dHJpYnV0ZSgnc3R5bGUnLCAncGFkZGluZy1ib3R0b206JyArIHBhZGRpbmcgKyAnJScpO1xuXG5cdFx0JGltZy5wYXJlbnROb2RlLm91dGVySFRNTCA9ICRpbWdXcmFwcGVyLm91dGVySFRNTDtcblx0fSk7XG5cdHJldHVybiAkY29udGFpbmVyLmlubmVySFRNTDtcbn07XG4iLCJpbXBvcnQgc3RyaXBUYWdzIGZyb20gJy4vc3RyaXAtaHRtbC10YWdzJztcbmltcG9ydCB3b3JkQ291bnQgZnJvbSAnd29yZC1jb3VudCc7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uKGh0bWwpIHtcblx0dmFyIHRleHQgPSBzdHJpcFRhZ3MoaHRtbCk7XG5cdHZhciB3b3JkcyA9IHdvcmRDb3VudCh0ZXh0KTtcblx0dmFyIHJlYWRUaW1lID0gTWF0aC5jZWlsKHdvcmRzIC8gMzAwKTtcblxuXHR2YXIgYWZmaXggPSAnIG1pbic7XG5cdGlmIChyZWFkVGltZSA+IDEpIHtcblx0XHRhZmZpeCArPSAncyc7XG5cdH1cblxuXHRyZXR1cm4gcmVhZFRpbWUgKyBhZmZpeDtcbn1cbiIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uKGh0bWwpIHtcblx0dmFyIHRtcCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuXHR0bXAuaW5uZXJIVE1MID0gaHRtbDtcblx0cmV0dXJuIHRtcC50ZXh0Q29udGVudCB8fCB0bXAuaW5uZXJUZXh0IHx8ICcnO1xufVxuIiwiLyoqXG4gKiBNYWluIGVudHJ5IGZvciB0aGUgamF2YXNjcmlwdC5cbiAqIEltcG9ydCBtb2R1bGVzIGFuZCBzdGFydCB0aGVtXG4gKi9cblxuaW1wb3J0IGxhenlJbWFnZXMgZnJvbSAnZHMtYXNzZXRzL2xhenkvaW1hZ2VzJztcbmltcG9ydCBnZXRBbGwgZnJvbSAnZHMtYXNzZXRzL2RvbS9nZXQtYWxsJztcbmltcG9ydCB2YWxpZGF0ZUlucHV0RmllbGRzIGZyb20gJ2RzLWFzc2V0cy92YWxpZGF0ZS9pbnB1dC1maWVsZHMnO1xuaW1wb3J0IG5hdmlnYXRpb24gZnJvbSAnLi9jb21wb25lbnRzL25hdmlnYXRpb24nO1xuaW1wb3J0IHJlc3BvbnNlIGZyb20gJy4vY29tcG9uZW50cy9yZXNwb25zZSc7XG5pbXBvcnQgdG9vbFRpcCBmcm9tICcuL2NvbXBvbmVudHMvdG9vbC10aXAnO1xuaW1wb3J0IHNlYXJjaCBmcm9tICcuL2NvbXBvbmVudHMvc2VhcmNoJztcbmltcG9ydCBnZXRMb2dnZWRJbkRhdGEgZnJvbSAnLi9saWIvZ2V0LWxvZ2dlZC1pbi1kYXRhJztcbmltcG9ydCAqIGFzIGFwaSBmcm9tICcuL2xpYi9hcGknO1xuXG5uYXZpZ2F0aW9uKCk7XG50b29sVGlwKCk7XG5zZWFyY2goKTtcblxuZ2V0QWxsKCdpbWcnKS5mb3JFYWNoKGZ1bmN0aW9uKCRpbWcpIHtcblx0JGltZy5vbmxvYWQgPSBmdW5jdGlvbigpIHtcblx0XHR0aGlzLmNsYXNzTGlzdC5hZGQoJ2FuaW1hdGUtLWFjdGl2ZScpO1xuXHR9O1xufSk7XG5sYXp5SW1hZ2VzKDEpO1xudmFsaWRhdGVJbnB1dEZpZWxkcygpO1xucmVzcG9uc2UoKTtcbmdldExvZ2dlZEluRGF0YSgpLnRoZW4oZnVuY3Rpb24odXNlcikge1xuXHR2YXIgJGJvZHkgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdib2R5Jyk7XG5cblx0JGJvZHkuY2xhc3NMaXN0LmFkZCgndXNlci1sb2dnZWQtaW4nKTtcblxuXHQvLyBBZG1pbiBsb2dnZWQgaW5cblx0dmFyIGFkbWluID0gdXNlci5yb2xlcy5zb21lKGZ1bmN0aW9uKHJvbGUpIHtcblx0XHRyZXR1cm4gKHJvbGUubmFtZSA9PT0gJ093bmVyJyB8fCByb2xlLm5hbWUgPT09ICdBZG1pbmlzdHJhdG9yJyk7XG5cdH0pO1xuXHRpZiAoYWRtaW4pIHtcblx0XHQkYm9keS5jbGFzc0xpc3QuYWRkKCdhZG1pbi1sb2dnZWQtaW4nKTtcblx0fVxuXG5cdC8vIEF1dGhvciBsb2dnZWQgaW5cblx0aWYgKHVzZXIubmFtZSA9PT0gd2luZG93LmF1dGhvck5hbWUpIHtcblx0XHQkYm9keS5jbGFzc0xpc3QuYWRkKCdhdXRob3ItbG9nZ2VkLWluJyk7XG5cdFx0cmV0dXJuIGFwaS51cGRhdGVBdXRob3JFbWFpbCh1c2VyLmVtYWlsKTtcblx0fVxufSkuY2F0Y2goZnVuY3Rpb24oKSB7fSk7XG4iLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbihhdXRob3IpIHtcblxuXHR2YXIgYXV0aG9ySW1hZ2UgPSAnJztcblx0aWYgKGF1dGhvci5pbWFnZSkge1xuXHRcdGF1dGhvckltYWdlID0gYDx0ZCB3aWR0aD1cIjUlXCI+PGltZyBzcmM9XCIke2F1dGhvci5pbWFnZX1cIiBjbGFzcz1cImF1dGhvcl9faW1hZ2Ugcm91bmQtaW1nXCI+PC90ZD5gO1xuXHR9XG5cblx0dmFyIGNvdmVySW1hZ2UgPSAnJztcblx0aWYgKGF1dGhvci5jb3Zlcikge1xuXHRcdGNvdmVySW1hZ2UgPSBgXG48aW1nIGRhdGEtc3JjPVwiJHthdXRob3IuY292ZXJ9XCIgY2xhc3M9XCJsYXp5LWltYWdlIGZ1bGwtd2lkdGggaW1nLWZ1bGwtd2lkdGhcIiBhbHQ9XCIke2F1dGhvci5uYW1lfVwiID5cbmA7XG5cdH1cblxuXHRyZXR1cm4gYFxuPGFydGljbGUgY2xhc3M9XCJib3hlc19faXRlbSBzbWFsbCBhbmltYXRlIGFuaW1hdGVfX2ZhZGUtaW5cIj5cbiAgPGhlYWRlciBjbGFzcz1cImF1dGhvclwiPlxuICAgICAgPHRhYmxlPlxuICAgICAgICAgIDx0cj5cbiAgICAgICAgICAgICAgJHthdXRob3JJbWFnZX1cbiAgICAgICAgICAgICAgPHRkPjxzcGFuIGNsYXNzPVwiYXV0aG9yX19uYW1lXCI+PGEgaHJlZj1cIi9hdXRob3IvJHthdXRob3Iuc2x1Z31cIj4ke2F1dGhvci5uYW1lfTwvYT48L3NwYW4+PGJyPlxuICAgICAgICAgICAgICBcdCR7YXV0aG9yLmNvdW50LnBvc3RzfSBhcnRpY2xlc1xuICAgICAgICAgICAgICA8L3RkPlxuICAgICAgICAgIDwvdHI+XG4gICAgICA8L3RhYmxlPlxuICA8L2hlYWRlcj5cbiAgJHtjb3ZlckltYWdlfVxuICA8cD4ke2F1dGhvci5iaW8gfHwgJyd9PC9wPlxuICA8cD48YSBocmVmPVwiL2F1dGhvci8ke2F1dGhvci5zbHVnfS9cIiBjbGFzcz1cImJ0blwiPkFydGljbGVzIGJ5IGF1dGhvcjwvYT48L3A+XG48L2FydGljbGU+XG5gO1xufVxuIiwiaW1wb3J0IGltYWdlQ29udmVydGVkIGZyb20gJy4uL2xpYi9pbWFnZS1jb252ZXJ0ZXInO1xuaW1wb3J0IHJlYWRUaW1lIGZyb20gJy4uL2xpYi9yZWFkLXRpbWUnO1xuaW1wb3J0IGVwb2NoVG9UaW1lYWdvIGZyb20gJ2Vwb2NoLXRvLXRpbWVhZ28nO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbihwb3N0KSB7XG5cblx0dmFyIGF1dGhvckltYWdlID0gJyc7XG5cdGlmIChwb3N0LmF1dGhvci5pbWFnZSkge1xuXHRcdGF1dGhvckltYWdlID0gYDx0ZCB3aWR0aD1cIjUlXCI+PGltZyBzcmM9XCIke3Bvc3QuYXV0aG9yLmltYWdlfVwiIGNsYXNzPVwiYXV0aG9yX19pbWFnZSByb3VuZC1pbWdcIj48L3RkPmA7XG5cdH1cblxuXHR2YXIgdGFncyA9ICcnO1xuXHRpZiAocG9zdC50YWdzKSB7XG5cdFx0dGFncyA9ICc8YnI+PHNwYW4gY2xhc3M9XCJ0YWdzXCI+JyArIHBvc3QudGFncy5tYXAoZnVuY3Rpb24odGFnKSB7XG5cdFx0XHRyZXR1cm4gYDxhIGhyZWY9XCIvdGFnLyR7dGFnLnNsdWd9L1wiPiR7dGFnLm5hbWV9PC9hPmA7XG5cdFx0fSkuam9pbignJykgKyAnPC9zcGFuPic7XG5cdH1cblxuXHR2YXIgcHVibGlzaGVkID0gbmV3IERhdGUocG9zdC5wdWJsaXNoZWRfYXQpLmdldFRpbWUoKTtcblx0dmFyIG5vdyA9IERhdGUubm93KCk7XG5cdHZhciB0aW1lQWdvID0gZXBvY2hUb1RpbWVhZ28udGltZUFnbyhwdWJsaXNoZWQsIG5vdyk7XG5cblx0dmFyIGh0bWwgPSBpbWFnZUNvbnZlcnRlZChwb3N0Lmh0bWwpO1xuXHR2YXIgZXhjZXJwdCA9IGh0bWwuc3Vic3RyKDAsIGh0bWwuaW5kZXhPZignPC9wPicpICsgNCk7XG5cblx0cmV0dXJuIGBcbjxhcnRpY2xlIGNsYXNzPVwiYm94ZXNfX2l0ZW0gc21hbGwgYW5pbWF0ZSBhbmltYXRlX19mYWRlLWluXCI+XG4gIDxoZWFkZXIgY2xhc3M9XCJhdXRob3JcIj5cbiAgICAgIDx0YWJsZT5cbiAgICAgICAgICA8dHI+XG4gICAgICAgICAgICAgICR7YXV0aG9ySW1hZ2V9XG4gICAgICAgICAgICAgIDx0ZD48c3BhbiBjbGFzcz1cImF1dGhvcl9fbmFtZVwiPjxhIGhyZWY9XCIvYXV0aG9yLyR7cG9zdC5hdXRob3Iuc2x1Z31cIj4ke3Bvc3QuYXV0aG9yLm5hbWV9PC9hPjwvc3Bhbj48YnI+XG4gICAgICAgICAgICAgICR7dGltZUFnb30gJm1pZGRvdDsgJHtyZWFkVGltZShwb3N0Lmh0bWwpfSByZWFkJHt0YWdzfTwvdGQ+XG4gICAgICAgICAgPC90cj5cbiAgICAgIDwvdGFibGU+XG4gIDwvaGVhZGVyPlxuICAke2V4Y2VycHR9XG4gIDxwPjxhIGhyZWY9XCIvJHtwb3N0LnNsdWd9L1wiIGNsYXNzPVwiYnRuXCI+UmVhZCBhcnRpY2xlPC9hPjwvcD5cbjwvYXJ0aWNsZT5cbmA7XG59XG4iLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbih1c2VyKSB7XG5cdHZhciBpbWFnZSA9ICcnO1xuXHRpZiAodXNlci5pbWFnZSkge1xuXHRcdGltYWdlID0gYFxuPHRkIHdpZHRoPVwiNSVcIj48aW1nIGRhdGEtc3JjPVwiJHt1c2VyLmltYWdlfVwiIGNsYXNzPVwiYXV0aG9yX19pbWFnZSBhdXRob3JfX2ltYWdlLS1zbWFsbCBsYXp5LWltYWdlIGltZy1iZyByb3VuZC1pbWdcIj48L3RkPlxuXHRcdGA7XG5cdH1cblxuXHRyZXR1cm4gYFxuPGRpdiBjbGFzcz1cImF1dGhvciBzbWFsbFwiPlxuICA8dGFibGU+PHRib2R5Pjx0cj5cblx0XHQke2ltYWdlfVxuICAgIDx0ZD5cbiAgICAgIDxzcGFuIGNsYXNzPVwiYXV0aG9yX19uYW1lXCI+JHt1c2VyLm5hbWV9PC9zcGFuPlxuICAgIDwvdGQ+XG4gIDwvdHI+PC90Ym9keT48L3RhYmxlPlxuPC9kaXY+XG5gO1xufVxuIiwiaW1wb3J0IGVuY29kZSBmcm9tICcuLi9saWIvaHRtbC1lbmNvZGUnO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbihyZXNwb25zZSkge1xuXG4gIHZhciBjbGFzc2VzID0gJ3Jlc3BvbnNlIGJveGVzX19pdGVtJztcbiAgaWYgKHJlc3BvbnNlLm5hbWUudG9Mb3dlckNhc2UoKSA9PT0gd2luZG93LmF1dGhvck5hbWUudG9Mb3dlckNhc2UoKSkge1xuICAgIGNsYXNzZXMgKz0gJyBib3hlc19faXRlbS0tdHJhbnNwYXJlbnQnO1xuICB9XG5cbiAgdmFyIGltYWdlID0gJyc7XG4gIGlmIChyZXNwb25zZS5pbWFnZSkge1xuICAgIGltYWdlID0gYDx0ZCB3aWR0aD1cIjUlXCI+PGltZyBkYXRhLXNyYz1cIiR7cmVzcG9uc2UuaW1hZ2V9XCIgY2xhc3M9XCJhdXRob3JfX2ltYWdlIGF1dGhvcl9faW1hZ2UtLXNtYWxsIGxhenktaW1hZ2UgaW1nLWJnIHJvdW5kLWltZ1wiPjwvdGQ+YDtcbiAgfVxuXG4gIHZhciByZWFkVGltZSA9ICcnO1xuICBpZiAocmVzcG9uc2UucmVhZFRpbWUpIHtcbiAgICByZWFkVGltZSA9IGAgJm1pZGRvdDsgJHtyZXNwb25zZS5yZWFkVGltZX0gcmVhZGA7XG4gIH1cblxuICB2YXIgZXhjZXJwdCA9IHJlc3BvbnNlLmV4Y2VycHQgfHwgcmVzcG9uc2UuaHRtbDtcblxuICB2YXIgcmVhZE1vcmUgPSAnJztcbiAgaWYgKHJlc3BvbnNlLmV4Y2VycHQpIHtcbiAgICByZWFkTW9yZSA9IGBcbjxkaXYgY2xhc3M9XCJyZXNwb25zZV9fdGV4dCBoaWRkZW5cIj4ke3Jlc3BvbnNlLmh0bWx9PC9kaXY+XG48cD48YSBocmVmPVwiI1wiIGNsYXNzPVwiYnRuIHJlc3BvbnNlX19yZWFkLW1vcmVcIj5SZWFkIG1vcmU8L2E+PC9wPlxuYDtcbiAgfVxuXG4gIHZhciBuYW1lID0gYCR7ZW5jb2RlKHJlc3BvbnNlLm5hbWUpfWA7XG4gIGlmIChyZXNwb25zZS53ZWJzaXRlKSB7XG4gICAgbmFtZSA9IGA8YSBocmVmPVwiJHtlbmNvZGUocmVzcG9uc2Uud2Vic2l0ZSl9XCI+JHtuYW1lfTwvYT5gO1xuICB9XG5cbiAgcmV0dXJuIGBcbjxkaXYgY2xhc3M9XCIke2NsYXNzZXN9IHNtYWxsXCI+XG4gIDxkaXYgY2xhc3M9XCJhdXRob3JcIj5cbiAgICA8dGFibGU+XG4gICAgICA8dHI+XG4gICAgICAgICR7aW1hZ2V9XG4gICAgICAgIDx0ZD5cbiAgICAgICAgICA8c3BhbiBjbGFzcz1cImF1dGhvcl9fbmFtZVwiPiR7bmFtZX08L3NwYW4+PGJyPlxuICAgICAgICAgICR7cmVzcG9uc2UudGltZUFnb30ke3JlYWRUaW1lfVxuICAgICAgICA8L3RkPlxuICAgICAgPC90cj5cbiAgICA8L3RhYmxlPlxuICA8L2Rpdj5cbiAgPGEgaHJlZj1cIiNcIiBjbGFzcz1cInJlc3BvbnNlX19kZWxldGVcIiBkYXRhLXB1Ymxpc2hlZD1cIiR7cmVzcG9uc2UucHVibGlzaGVkfVwiIGRhdGEtbmFtZT1cIiR7cmVzcG9uc2UubmFtZX1cIj48aW1nIGRhdGEtc3JjPVwiL2Fzc2V0cy9pbWFnZXMvdHJhc2guc3ZnXCIgY2xhc3M9XCJsYXp5LWltYWdlXCI+PC9hPlxuICA8ZGl2IGNsYXNzPVwicmVzcG9uc2VfX2V4Y2VycHRcIj4ke2V4Y2VycHR9PC9kaXY+XG4gICR7cmVhZE1vcmV9XG48L2Rpdj5gO1xufVxuIiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24odGFnKSB7XG5cbiAgY29uc29sZS5sb2codGFnKTtcblxuICB2YXIgY292ZXJJbWFnZSA9ICcnO1xuICBpZiAodGFnLmltYWdlKSB7XG4gICAgY292ZXJJbWFnZSA9IGBcbjxpbWcgZGF0YS1zcmM9XCIke3RhZy5pbWFnZX1cIiBjbGFzcz1cImxhenktaW1hZ2UgZnVsbC13aWR0aCBpbWctZnVsbC13aWR0aFwiIGFsdD1cIiR7dGFnLm5hbWV9XCIgPlxuYDtcbiAgfVxuXG4gIHJldHVybiBgXG48YXJ0aWNsZSBjbGFzcz1cImJveGVzX19pdGVtIHNtYWxsIGFuaW1hdGUgYW5pbWF0ZV9fZmFkZS1pblwiPlxuICA8aGVhZGVyIGNsYXNzPVwiYXV0aG9yXCI+XG4gICAgICA8dGFibGU+XG4gICAgICAgICAgPHRyPlxuICAgICAgICAgICAgICA8dGQ+PHNwYW4gY2xhc3M9XCJhdXRob3JfX25hbWVcIj48YSBocmVmPVwiL3RhZy8ke3RhZy5zbHVnfVwiPiR7dGFnLm5hbWV9PC9hPjwvc3Bhbj48YnI+XG4gICAgICAgICAgICAgIFx0JHt0YWcuY291bnQucG9zdHN9IGFydGljbGVzXG4gICAgICAgICAgICAgIDwvdGQ+XG4gICAgICAgICAgPC90cj5cbiAgICAgIDwvdGFibGU+XG4gIDwvaGVhZGVyPlxuICAke2NvdmVySW1hZ2V9XG4gIDxwPiR7dGFnLmRlc2NyaXB0aW9uIHx8ICcnfTwvcD5cbiAgPHA+PGEgaHJlZj1cIi90YWcvJHt0YWcuc2x1Z30vXCIgY2xhc3M9XCJidG5cIj5BcnRpY2xlcyBpbiBjYXRlZ29yeTwvYT48L3A+XG48L2FydGljbGU+XG5gO1xufVxuIiwiLyoqXG4gKiBXb3JkIENvdW50XG4gKlxuICogV29yZCBjb3VudCBpbiByZXNwZWN0IG9mIENKSyBjaGFyYWN0ZXJzLlxuICpcbiAqIENvcHlyaWdodCAoYykgMjAxNSBieSBIc2lhb21pbmcgWWFuZy5cbiAqL1xuXG52YXIgcGF0dGVybiA9IC9bYS16QS1aMC05X1xcdTAzOTItXFx1MDNjOVxcdTAwYzAtXFx1MDBmZlxcdTA2MDAtXFx1MDZmZl0rfFtcXHU0ZTAwLVxcdTlmZmZcXHUzNDAwLVxcdTRkYmZcXHVmOTAwLVxcdWZhZmZcXHUzMDQwLVxcdTMwOWZcXHVhYzAwLVxcdWQ3YWZdKy9nO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChkYXRhKSB7XG4gIHZhciBtID0gZGF0YS5tYXRjaChwYXR0ZXJuKTtcbiAgdmFyIGNvdW50ID0gMDtcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBtLmxlbmd0aDsgaSsrKSB7XG4gICAgaWYgKG1baV0uY2hhckNvZGVBdCgwKSA+PSAweDRlMDApIHtcbiAgICAgIGNvdW50ICs9IG1baV0ubGVuZ3RoO1xuICAgIH0gZWxzZSB7XG4gICAgICBjb3VudCArPSAxO1xuICAgIH1cbiAgfVxuICByZXR1cm4gY291bnQ7XG59O1xuIiwiLyoqXG4gKiBNYWtlIHN1cmUgYSBmdW5jdGlvbiBvbmx5IGlzIHJ1biBldmVyeSB4IG1zXG4gKiBAcGFyYW0gIHtGdW5jdGlvbn0gY2FsbGJhY2sgTWV0aG9kIHRvIGV4ZWN1dGUgaWYgaXQgaXMgbm90IGRlYm91bmNlZFxuICogQHBhcmFtICB7aW50ZWdlcn0gIHRpbWVvdXQgIE1pbGxpc2Vjb25kcyB0byB3YWl0IGJlZm9yZSBuZXh0IGFsbG93ZWQgY2FsbGJhY2suIERlZmF1bHRzIHRvIHRoZSBhbmltYXRpb24gZnJhbWUgcmF0ZSBpbiB0aGUgYnJvd3NlclxuICogQHJldHVybiB7dm9pZH1cbiAqL1xuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24oY2FsbGJhY2ssIHRpbWVvdXQpIHtcbiAgdmFyIHBlbmRpbmcgPSBmYWxzZTtcbiAgdmFyIGRvbmUgPSAoKSA9PiB7XG4gICAgcGVuZGluZyA9IGZhbHNlO1xuICB9O1xuICByZXR1cm4gZnVuY3Rpb24oKSB7XG4gICAgaWYgKHBlbmRpbmcpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgcGVuZGluZyA9IHRydWU7XG4gICAgY2FsbGJhY2suYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgICBpZiAoIXRpbWVvdXQpIHtcbiAgICAgIHdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUoZG9uZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHdpbmRvdy5zZXRUaW1lb3V0KGRvbmUsIHRpbWVvdXQpO1xuICAgIH1cbiAgfTtcbn1cbiIsIi8qKlxuICogRGVsYXkgYSBmdW5jdGlvbiBhbmQgb25seSBydW4gb25jZVxuICogQHBhcmFtICB7RnVuY3Rpb259IGNhbGxiYWNrIE1ldGhvZCB0byBleGVjdXRlIGlmIGl0IGlzIG5vdCBkZWJvdW5jZWRcbiAqIEBwYXJhbSAge2ludGVnZXJ9ICB0aW1lb3V0ICBNaWxsaXNlY29uZHMgdG8gd2FpdCBiZWZvcmUgbmV4dCBhbGxvd2VkIGNhbGxiYWNrLiBEZWZhdWx0cyB0byB0aGUgYW5pbWF0aW9uIGZyYW1lIHJhdGUgaW4gdGhlIGJyb3dzZXJcbiAqIEByZXR1cm4ge3ZvaWR9XG4gKi9cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uKGNhbGxiYWNrLCB0aW1lb3V0KSB7XG4gIHZhciBwZW5kaW5nID0gZmFsc2U7XG4gIHZhciBkb25lID0gKCkgPT4ge1xuICAgIGNhbGxiYWNrLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgcGVuZGluZyA9IGZhbHNlO1xuICB9O1xuICByZXR1cm4gZnVuY3Rpb24oKSB7XG4gICAgaWYgKHBlbmRpbmcpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgcGVuZGluZyA9IHRydWU7XG4gICAgaWYgKCF0aW1lb3V0KSB7XG4gICAgICB3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lKGRvbmUpO1xuICAgIH0gZWxzZSB7XG4gICAgICB3aW5kb3cuc2V0VGltZW91dChkb25lLCB0aW1lb3V0KTtcbiAgICB9XG4gIH07XG59XG4iLCIvKipcbiAqIEdldCBhbiBhcnJheSBvZiBkb20gZWxlbWVudHMgbWF0Y2hpbmcgdGhlIHNlbGVjdG9yXG4gKiBAcGFyYW0gIHtzdHJpbmd9ICAgICBzZWxlY3RvclxuICogQHBhcmFtICB7RE9NZWxlbWVudH0gRE9NIGVsZW1lbnQgdG8gc2VhcmNoIGluLiBEZWZhdWx0cyB0byBkb2N1bWVudFxuICogQHJldHVybiB7YXJyYXl9XG4gKi9cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uKHNlbGVjdG9yLCAkcm9vdCA9IGRvY3VtZW50KSB7XG4gIHJldHVybiBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbCgkcm9vdC5xdWVyeVNlbGVjdG9yQWxsKHNlbGVjdG9yKSk7XG59XG4iLCIvKipcbiAqIEdldCB0aGUgZWxlbWVudHMgb2Zmc2V0IHJlbGF0aXZlIHRvIHRoZSBkb2N1bWVudFxuICogQHBhcmFtICB7RE9NRWxlbWVudH0gJGVsZW1lbnQgRWxlbWVudCB0byBnZXQgdGhlIG9mZnNldCBmcm9tXG4gKiBAcmV0dXJuIHtpbnRlZ2VyfSAgICAgICAgICAgICBPZmZzZXQgaW4gcGl4ZWxzXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uKCRlbGVtZW50KSB7XG4gIHZhciBvZmZzZXQgPSAwO1xuXG4gIHdoaWxlICgkZWxlbWVudCAmJiAhaXNOYU4oJGVsZW1lbnQub2Zmc2V0VG9wKSkge1xuICAgIG9mZnNldCArPSAkZWxlbWVudC5vZmZzZXRUb3A7XG4gICAgJGVsZW1lbnQgPSAkZWxlbWVudC5vZmZzZXRQYXJlbnQ7XG4gIH1cbiAgcmV0dXJuIG9mZnNldDtcbn1cbiIsIi8qKlxuICogTGF6eSBsb2FkIGltYWdlcyB3aXRoIGNsYXNzIC5sYXp5LWltYWdlcy5cbiAqIERlcGVuZGluZyBvbiB0aGUgdHJlc2hvbGQgaW1hZ2VzIHdpbGwgbG9hZCBhcyB0aGUgdXNlciBzY3JvbGxzIGRvd24gb24gdGhlXG4gKiBkb2N1bWVudC5cbiAqL1xuXG4vLyBEZXBlbmRlbmNlaXNcbmltcG9ydCBnZXRBbGxFbGVtZW50cyBmcm9tICcuLi9kb20vZ2V0LWFsbCc7XG5pbXBvcnQgc2Nyb2xsVmlzaWJsZSBmcm9tICcuLi9zY3JvbGwvdmlzaWJsZSc7XG5cbi8vIExvYWQgaW1hZ2UgZWxlbWVudFxudmFyIGxvYWRJbWcgPSBmdW5jdGlvbigkaW1nKSB7XG5cbiAgaWYgKCRpbWcuZGF0YXNldC5zcmMpIHtcbiAgICAkaW1nLnNldEF0dHJpYnV0ZSgnc3JjJywgJGltZy5kYXRhc2V0LnNyYyk7XG4gIH1cbiAgaWYgKCRpbWcuZGF0YXNldC5zcmNzZXQpIHtcbiAgICAkaW1nLnNldEF0dHJpYnV0ZSgnc3Jjc2V0JywgJGltZy5kYXRhc2V0LnNyY3NldCk7XG4gIH1cbn07XG5cbi8vIExvYWQgcGljdHVyZSBlbGVtZW50XG52YXIgbG9hZFBpY3R1cmUgPSBmdW5jdGlvbigkcGljdHVyZSkge1xuICBsb2FkSW1nKCRwaWN0dXJlLnF1ZXJ5U2VsZWN0b3IoJ2ltZycpKTtcbiAgdmFyICRzb3VyY2VzID0gQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoJHBpY3R1cmUucXVlcnlTZWxlY3RvckFsbCgnc291cmNlJykpO1xuICAkc291cmNlcy5mb3JFYWNoKCRzb3VyY2UgPT4gJHNvdXJjZS5zZXRBdHRyaWJ1dGUoJ3NyY3NldCcsICRzb3VyY2UuZGF0YXNldC5zcmNzZXQpKTtcbn07XG5cbnZhciBsb2FkRWxlbWVudCA9IGZ1bmN0aW9uKCRlbGVtZW50KSB7XG4gIGlmICgkZWxlbWVudC5tYXRjaGVzKCdwaWN0dXJlJykpIHtcbiAgICBsb2FkUGljdHVyZSgkZWxlbWVudCk7XG4gIH0gZWxzZSBpZiAoJGVsZW1lbnQubWF0Y2hlcygnaW1nJykpIHtcbiAgICBsb2FkSW1nKCRlbGVtZW50KTtcbiAgfVxuXG4gIC8vIE1ha2Ugc3VyZSBwaWN0dXJlZmlsbCB3aWxsIHVwZGF0ZSB0aGUgaW1hZ2Ugd2hlbiBzb3VyY2UgaGFzIGNoYW5nZWRcbiAgaWYgKHdpbmRvdy5waWN0dXJlZmlsbCkge1xuICAgIHdpbmRvdy5waWN0dXJlZmlsbCh7XG4gICAgICByZWV2YWx1YXRlOiB0cnVlXG4gICAgfSk7XG4gIH1cbn07XG5cbi8qKlxuICogQWN0aXZhdGUgbGF6eSBsb2FkIG9mIGltYWdlcyBhcyB1c2VyIHNjcm9sbHNcbiAqIEBwYXJhbSAge2Zsb2F0fSB0aHJlc2hvbGQgIFBlcmNlbnQgYmVsb3cgc2NyZWVuIHRvIGluaXRpYWxpemUgbG9hZCBvZiBpbWFnZVxuICogQHJldHVybiB7dm9pZH1cbiAqL1xuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24odGhyZXNob2xkID0gMC41KSB7XG4gIHZhciAkbGF6eUltYWdlcyA9IGdldEFsbEVsZW1lbnRzKCcubGF6eS1pbWFnZScpO1xuXG4gIHdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUoZnVuY3Rpb24oKSB7XG4gICAgJGxhenlJbWFnZXMuZm9yRWFjaChmdW5jdGlvbigkbGF6eUltYWdlKSB7XG5cbiAgICAgIC8vIElnbm9yZSBpbWFnZXMgd2hpY2ggaGFzIGFscmVhZHkgYmVlbiByZWdpc3RlcmVkXG4gICAgICBpZiAoJGxhenlJbWFnZS5kYXRhc2V0LmxhenlJbWFnZUxpc3RlbmluZykge1xuXHRyZXR1cm47XG4gICAgICB9XG4gICAgICAkbGF6eUltYWdlLnNldEF0dHJpYnV0ZSgnZGF0YS1sYXp5LWltYWdlLWxpc3RlbmluZycsICd0cnVlJyk7XG5cbiAgICAgIHNjcm9sbFZpc2libGUoJGxhenlJbWFnZSwgdGhyZXNob2xkKVxuICAgICAgICAudGhlbigoKSA9PiBsb2FkRWxlbWVudCgkbGF6eUltYWdlKSk7XG4gICAgfSk7XG4gIH0pO1xuXG59XG4iLCIvLyBEZXBlbmRlbmNpZXNcbmltcG9ydCBnZXREb2N1bWVudE9mZnNldFRvcCBmcm9tICcuLi9kb20vZ2V0LWRvY3VtZW50LW9mZnNldC10b3AnO1xuXG4vKipcbiAqIENoZWNrcyBpZiB0aGUgdXNlciBoYXMgc2Nyb2xsZWQgdG8gb3IgcGFzdCBhbiBlbGVtZW50XG4gKiBAcGFyYW0gIHtET01FbGVtZW50fSAkZWxlbWVudCAgVGhlIGVsZW1lbnQgdG8gY2hlY2sgYWdhaW5zdFxuICogQHBhcmFtICB7ZmxvYXR9ICAgICAgdGhyZXNob2xkIERpc3RhbmNlIGluIHBlcmNlbnQgb2YgdGhlIHNjZWVlbiBoZWlnaHQgdG8gbWVhc3VyZSBhZ2FpbnN0LlxuICogQHJldHVybiB7Ym9vbGVhbn1cbiAqL1xuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24oJGVsZW1lbnQsIHRocmVzaG9sZCA9IDApIHtcbiAgdmFyIHNjcm9sbEJvdHRvbSA9ICh3aW5kb3cuc2Nyb2xsWSB8fCBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuc2Nyb2xsVG9wKSArICh3aW5kb3cuaW5uZXJIZWlnaHQgKiAoMSArIHRocmVzaG9sZCkpO1xuICB2YXIgb2Zmc2V0VG9wID0gZ2V0RG9jdW1lbnRPZmZzZXRUb3AoJGVsZW1lbnQpO1xuICByZXR1cm4gKHNjcm9sbEJvdHRvbSA+IG9mZnNldFRvcCk7XG59XG4iLCIvLyBkZXBlbmRlbmNpZXNcbmltcG9ydCBkZWxheSBmcm9tICcuLi9hc3luYy9kZWxheSc7XG5cbi8qKlxuICogUnVucyBzY3JpcHRzIGVhY2ggdGltZSB0aGUgdXNlciBjaGFuZ2VzIHNjcm9sbCBkaXJlY3Rpb25cbiAqIEBwYXJhbSAge0Z1bmN0aW9ufSBkb3duQ2FsbGJhY2sgIENhbGxiYWNrIGV2ZXJ5IHRpbWUgdGhlIHVzZXIgc3RhcnRzIHNjcm9sbGluZyBkb3duXG4gKiBAcGFyYW0gIHtGdW5jdGlvbn0gdXBDYWxsYmFjayAgICBDYWxsYmFjayBldmVyeSB0aW1lIHRoZSB1c2VyIHN0YXJ0cyBzY3JvbGxpbmcgdXBcbiAqIEBwYXJhbSAge2Zsb2F0fSAgICB0aHJlc2hvbGQgICAgIE1hcmdpbiBpbiB0b3Agd2hlcmUgc2Nyb2xsIGRvd24gaXMgaWdub3JlZCAoY291bGQgYmUgdXNlZCBmb3IgbmF2cylcbiAqIEByZXR1cm4ge3ZvaWR9XG4gKi9cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uKGRvd25DYWxsYmFjayA9IGZ1bmN0aW9uKCkge30sIHVwQ2FsbGJhY2sgPSBmdW5jdGlvbigpIHt9LCB0aHJlc2hvbGQgPSAwKSB7XG5cbiAgdmFyIGxhc3RTY3JvbGxQb3MgPSAwO1xuICB2YXIgc2Nyb2xsZWREb3duID0gZmFsc2U7XG5cbiAgdmFyIGlzU2Nyb2xsaW5nID0gZnVuY3Rpb24oKSB7XG4gICAgdmFyIGN1cnJlbnRTY3JvbGxQb3MgPSB3aW5kb3cuc2Nyb2xsWTtcblxuICAgIGlmICghc2Nyb2xsZWREb3duICYmXG4gICAgICBjdXJyZW50U2Nyb2xsUG9zID4gdGhyZXNob2xkICYmXG4gICAgICBjdXJyZW50U2Nyb2xsUG9zID4gKGxhc3RTY3JvbGxQb3MgKyAyMCkpIHtcbiAgICAgIGRvd25DYWxsYmFjaygpO1xuICAgICAgc2Nyb2xsZWREb3duID0gdHJ1ZTtcbiAgICB9IGVsc2UgaWYgKHNjcm9sbGVkRG93biAmJlxuICAgICAgKGN1cnJlbnRTY3JvbGxQb3MgPD0gdGhyZXNob2xkIHx8IGN1cnJlbnRTY3JvbGxQb3MgPCAobGFzdFNjcm9sbFBvcyAtIDIwKSkgJiZcbiAgICAgIChjdXJyZW50U2Nyb2xsUG9zICsgd2luZG93LmlubmVySGVpZ2h0IDwgZG9jdW1lbnQuYm9keS5jbGllbnRIZWlnaHQpKSB7XG4gICAgICB1cENhbGxiYWNrKCk7XG4gICAgICBzY3JvbGxlZERvd24gPSBmYWxzZTtcbiAgICB9XG5cbiAgICBsYXN0U2Nyb2xsUG9zID0gY3VycmVudFNjcm9sbFBvcztcbiAgfTtcblxuICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignc2Nyb2xsJywgZGVsYXkoaXNTY3JvbGxpbmcsIDIwMCkpO1xuICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdET01Db250ZW50TG9hZGVkJywgaXNTY3JvbGxpbmcpO1xufVxuIiwiLy8gRGVwZW5kZW5jZWlzXG5pbXBvcnQgZGVib3VuY2UgZnJvbSAnLi4vYXN5bmMvZGVib3VuY2UnO1xuaW1wb3J0IGhhc1Njcm9sbGVkUGFzdCBmcm9tICcuL2hhcy1zY3JvbGxlZC1wYXN0JztcblxuLyoqXG4gKiBGdWxmaWxsIGEgcHJvbWlzZSwgd2hlbiB0aGUgZWxlbWVudCBpcyB2aXNpYmxlIChzY3JvbGxlZCB0byBvciBwYXN0KVxuICogQHBhcmFtICB7RE9NRWxlbWVudH0gJGVsZW1lbnQgIEVsZW1lbnQgdG8gY2hlY2tcbiAqIEBwYXJhbSAge2Zsb2F0fSAgICAgIHRocmVzaG9sZCBEaXN0YW5jZSBpbiBwZXJjZW50XG4gKiBAcmV0dXJuIHtbdHlwZV19ICAgICAgICAgICBbZGVzY3JpcHRpb25dXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uKCRlbGVtZW50LCB0aHJlc2hvbGQgPSAwKSB7XG5cbiAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uKHJlc29sdmUpIHtcblxuICAgIHZhciBjaGVja0VsZW1lbnQgPSBkZWJvdW5jZShmdW5jdGlvbigpIHtcbiAgICAgIGlmIChoYXNTY3JvbGxlZFBhc3QoJGVsZW1lbnQsIHRocmVzaG9sZCkpIHtcbiAgICAgICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3Njcm9sbCcsIGNoZWNrRWxlbWVudCk7XG4gICAgICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKCdyZXNpemUnLCBjaGVja0VsZW1lbnQpO1xuICAgICAgICByZXNvbHZlKCk7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignc2Nyb2xsJywgY2hlY2tFbGVtZW50KTtcbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigncmVzaXplJywgY2hlY2tFbGVtZW50KTtcbiAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdET01Db250ZW50TG9hZGVkJywgY2hlY2tFbGVtZW50KTtcbiAgICBzZXRUaW1lb3V0KGNoZWNrRWxlbWVudCwgMCk7XG4gIH0pO1xufVxuIiwiLyoqXG4gKiBIZWxwZXJzIGZvciB2YWxpZGF0aW5nIGlucHV0IGZpZWxkc1xuICovXG5cbmltcG9ydCBpc0RhdGUgZnJvbSAnLi9pcy1kYXRlJztcbmltcG9ydCBpc0VtYWlsIGZyb20gJy4vaXMtZW1haWwnO1xuaW1wb3J0IGlzRmxvYXQgZnJvbSAnLi9pcy1mbG9hdCc7XG5pbXBvcnQgaXNJbnQgZnJvbSAnLi9pcy1pbnQnO1xuaW1wb3J0IGlzUmVxdWlyZWQgZnJvbSAnLi9pcy1yZXF1aXJlZCc7XG5pbXBvcnQgaXNVcmwgZnJvbSAnLi9pcy11cmwnO1xuXG5leHBvcnQgZGVmYXVsdCB7XG4gIGlzRGF0ZSxcbiAgaXNFbWFpbCxcbiAgaXNGbG9hdCxcbiAgaXNJbnQsXG4gIGlzUmVxdWlyZWQsXG4gIGlzVXJsXG59O1xuIiwiaW1wb3J0IGdldEFsbEVsZW1lbnRzIGZyb20gJy4uL2RvbS9nZXQtYWxsJztcbmltcG9ydCB2YWxpZGF0ZSBmcm9tICcuLyc7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uKCkge1xuXG4gIGdldEFsbEVsZW1lbnRzKCcudmFsaWRhdGUnKS5mb3JFYWNoKGZ1bmN0aW9uKCR2YWxpZGF0ZUNvbnRhaW5lcikge1xuXG4gICAgdmFyICR2YWxpZGF0ZUZpZWxkID0gJHZhbGlkYXRlQ29udGFpbmVyO1xuXG4gICAgaWYgKCEkdmFsaWRhdGVDb250YWluZXIubWF0Y2hlcygnaW5wdXQsIHRleHRhcmVhJykpIHtcbiAgICAgICR2YWxpZGF0ZUZpZWxkID0gJHZhbGlkYXRlQ29udGFpbmVyLnF1ZXJ5U2VsZWN0b3IoJ2lucHV0LCB0ZXh0YXJlYScpO1xuICAgIH1cblxuICAgIGlmICghJHZhbGlkYXRlRmllbGQpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICAvLyBGaW5kIHJlbGV2YXQgdmFsaWRhdGlvbiBtZXRob2RzXG4gICAgdmFyIHZhbGlkYXRvck5hbWVzID0gW107XG4gICAgZm9yICh2YXIga2V5IGluICR2YWxpZGF0ZUNvbnRhaW5lci5kYXRhc2V0KSB7XG4gICAgICBpZiAoa2V5ICE9PSAndmFsaWRhdGUnICYmIGtleS5pbmRleE9mKCd2YWxpZGF0ZScpID09PSAwKSB7XG4gICAgICAgIHZhciB2YWxpZGF0b3JOYW1lID0ga2V5LnJlcGxhY2UoJ3ZhbGlkYXRlJywgJycpO1xuXG4gICAgICAgIGlmICh2YWxpZGF0ZVsnaXMnICsgdmFsaWRhdG9yTmFtZV0pIHtcbiAgICAgICAgICB2YWxpZGF0b3JOYW1lcy5wdXNoKHZhbGlkYXRvck5hbWUpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKHZhbGlkYXRvck5hbWVzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIC8vIENoZWNrIHZhbGlkYXRpb24gd2hlbiBpbnB1dCBvbiBmaWVsZCBpcyBjaGFuZ2VkXG4gICAgJHZhbGlkYXRlRmllbGQuYWRkRXZlbnRMaXN0ZW5lcignaW5wdXQnLCBmdW5jdGlvbigpIHtcbiAgICAgIHZhciBpbnB1dCA9ICR2YWxpZGF0ZUZpZWxkLnZhbHVlO1xuICAgICAgdmFyIHZhbGlkID0gIXZhbGlkYXRvck5hbWVzLnNvbWUoZnVuY3Rpb24odmFsaWRhdG9yTmFtZSkge1xuXHRpZiAoIWlucHV0ICYmIHZhbGlkYXRvck5hbWUgIT09ICdSZXF1aXJlZCcpIHtcblx0ICByZXR1cm4gZmFsc2U7XG5cdH1cbiAgICAgICAgcmV0dXJuICF2YWxpZGF0ZVsnaXMnICsgdmFsaWRhdG9yTmFtZV0oaW5wdXQpO1xuICAgICAgfSk7XG5cbiAgICAgIGlmICh2YWxpZCkge1xuXHQkdmFsaWRhdGVDb250YWluZXIuY2xhc3NMaXN0LmFkZCgndmFsaWRhdGUtLXZhbGlkJyk7XG5cdCR2YWxpZGF0ZUNvbnRhaW5lci5jbGFzc0xpc3QucmVtb3ZlKCd2YWxpZGF0ZS0tbm90LXZhbGlkJyk7XG4gICAgICB9IGVsc2Uge1xuXHQkdmFsaWRhdGVDb250YWluZXIuY2xhc3NMaXN0LmFkZCgndmFsaWRhdGUtLW5vdC12YWxpZCcpO1xuXHQkdmFsaWRhdGVDb250YWluZXIuY2xhc3NMaXN0LnJlbW92ZSgndmFsaWRhdGUtLXZhbGlkJyk7XG4gICAgICB9XG4gICAgfSk7XG4gIH0pO1xufVxuIiwiLyoqXG4gKiBWYWxpZGF0ZSB0aGF0IHN0cmluZyBjYW4gYmUgY29udmVydGVkIHRvIGRhdGVcbiAqIEBwYXJhbSAge3N0cmluZ30gZGF0ZSBpbnB1dFxuICogQHJldHVybiB7Ym9vbGVhbn1cbiAqL1xuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24oZGF0ZSkge1xuICByZXR1cm4gIWlzTmFOKERhdGUucGFyc2UoZGF0ZSkpO1xufVxuIiwiLyoqXG4gKiBWYWxpZGF0ZSBlLW1haWxcbiAqIEBwYXJhbSAge3N0cmluZ30gZW1haWwgaW5wdXRcbiAqIEByZXR1cm4ge2Jvb2xlYW59XG4gKi9cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uKGVtYWlsKSB7XG4gIHZhciByZSA9IC9eKFthLXowLTlfXFwuLV0rKUAoW1xcZGEtelxcLi1dKylcXC4oW2EtelxcLl17Miw2fSkkLztcbiAgcmV0dXJuIHJlLnRlc3QoZW1haWwpO1xufVxuIiwiLyoqXG4gKiBWYWxpZGF0ZSBmbG9hdFxuICogQHBhcmFtICB7c3RyaW5nfSBmbG9hdCBpbnB1dFxuICogQHJldHVybiB7Ym9vbGVhbn1cbiAqL1xuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24oZmxvYXQpIHtcbiAgdmFyIHJlID0gL14oPzpbLStdPyg/OlswLTldKykpPyg/OlxcLlswLTldKik/KD86W2VFXVtcXCtcXC1dPyg/OlswLTldKykpPyQvO1xuICByZXR1cm4gZmxvYXQgIT09ICcnICYmIHJlLnRlc3QoZmxvYXQpO1xufVxuIiwiLyoqXG4gKiBWYWxpZGF0ZSBpbnRlZ2V0XG4gKiBAcGFyYW0gIHtzdHJpbmd9IGludGVnZXIgaW5wdXRcbiAqIEByZXR1cm4ge2Jvb2xlYW59XG4gKi9cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uKGludGVnZXIpIHtcbiAgdmFyIHJlID0gL14oPzpbLStdPyg/OjB8WzEtOV1bMC05XSopKSQvO1xuICByZXR1cm4gcmUudGVzdChpbnRlZ2VyKTtcbn1cbiIsIi8qKlxuICogVmFsaWRhdGUgaWYgdGhlIHN0cmluZyBpcyBlbXB0eVxuICogQHBhcmFtICB7c3RyaW5nfSBpbnB1dFxuICogQHJldHVybiB7Ym9vbGVhbn1cbiAqL1xuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24oaW5wdXQpIHtcbiAgcmV0dXJuIGlucHV0LnRyaW0oKSAhPT0gJyc7XG59XG4iLCIvKipcbiAqIFZhbGlkYXRlIHVybFxuICogQHBhcmFtICB7c3RyaW5nfSB1cmwgaW5wdXRcbiAqIEByZXR1cm4ge2Jvb2xlYW59XG4gKi9cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uKHVybCkge1xuICB2YXIgcmUgPSAvXihodHRwcz86XFwvXFwvKT8oW1xcZGEtelxcLi1dKylcXC4oW2EtelxcLl17Miw2fSkoW1xcL1xcdyBcXC4tXSopKlxcLz8kLztcbiAgcmV0dXJuIHJlLnRlc3QodXJsKTtcbn1cbiJdfQ==
