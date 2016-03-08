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

  var $footerShareBar = document.querySelector('.footer__share-bar');
  var $stickyShareBar;
  if ($footerShareBar) {
    $stickyShareBar = $footerShareBar.cloneNode(true);
    $stickyShareBar.classList.add('footer__share-bar--sticky');
    $body.insertBefore($stickyShareBar, $body.firstChild);
  }

  // Activate the sticky navigation when the user scrolls up.
  // This will firs take effect, when the user has scrolled "a screen" down.
  (0, _scrollChange2.default)(function () {
    $stickyNav.classList.remove('nav--active');
    if ($stickyShareBar) {
      $stickyShareBar.classList.remove('footer__share-bar--sticky-active');
    }
  }, function () {
    $stickyNav.classList.add('nav--active');
    if ($stickyShareBar) {
      $stickyShareBar.classList.add('footer__share-bar--sticky-active');
    }
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
    if ($stickyShareBar) {
      var threshold = $footerShareBar.offsetHeight / window.innerHeight;
      if ((0, _hasScrolledPast2.default)($footerShareBar, -1 * threshold)) {
        $stickyShareBar.classList.add('hidden');
      } else {
        $stickyShareBar.classList.remove('hidden');
      }
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

var _hasScrolledPast = require('ds-assets/scroll/has-scrolled-past');

var _hasScrolledPast2 = _interopRequireDefault(_hasScrolledPast);

var _getLoggedInData = require('../lib/get-logged-in-data');

var _getLoggedInData2 = _interopRequireDefault(_getLoggedInData);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

},{"../lib/get-logged-in-data":20,"ds-assets/async/debounce":32,"ds-assets/dom/get-all":34,"ds-assets/scroll/has-scrolled-past":37,"ds-assets/scroll/scroll-change":38}],14:[function(require,module,exports){
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
	(0, _getAll2.default)('.share__responses').forEach(function ($responses) {
		$responses.innerHTML = responses.length;
	});
};

/**
 * Update the count fo likes for this post
 * @param {number} likes
 */
var setLikesNumber = function setLikesNumber(likes) {
	(0, _getAll2.default)('.share__likes').forEach(function ($likes) {
		$likes.innerHTML = likes;
	});
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

	(0, _getAll2.default)('.post-footer__like-icon').forEach(function ($footerIcon) {
		$footerIcon.setAttribute('src', '/assets/images/heart--active.svg');
		$footerIcon.setAttribute('data-src', '/assets/images/heart--active.svg');
	});

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

    if (!scrolledDown && currentScrollPos > threshold && currentScrollPos > lastScrollPos + 10) {
      downCallback();
      scrolledDown = true;
    } else if (scrolledDown && (currentScrollPos <= threshold || currentScrollPos < lastScrollPos - 100) && currentScrollPos + window.innerHeight < document.body.clientHeight) {
      upCallback();
      scrolledDown = false;
    }

    lastScrollPos = currentScrollPos;
  };

  window.addEventListener('scroll', (0, _delay2.default)(isScrolling, 250));
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJub2RlX21vZHVsZXMvZXBvY2gtdG8tdGltZWFnby9jdXRvZmYvY3V0b2ZmLmpzb24iLCJub2RlX21vZHVsZXMvZXBvY2gtdG8tdGltZWFnby9pbmRleC5qcyIsIm5vZGVfbW9kdWxlcy9lcG9jaC10by10aW1lYWdvL3N1ZmZpeC9zdWZmaXgtZGljdGlvbmFyeS5qc29uIiwibm9kZV9tb2R1bGVzL2Vwb2NoLXRvLXRpbWVhZ28vdGltZS1hZ28vdGltZS1hZ28uanMiLCJub2RlX21vZHVsZXMvZXBvY2gtdG8tdGltZWFnby90aW1lLWNhbGN1bGF0aW9ucy9pbmRleC5qcyIsIm5vZGVfbW9kdWxlcy9lcG9jaC10by10aW1lYWdvL3RpbWUtY2FsY3VsYXRpb25zL3RpbWUtYWdvL2RheXMtYWdvLmpzIiwibm9kZV9tb2R1bGVzL2Vwb2NoLXRvLXRpbWVhZ28vdGltZS1jYWxjdWxhdGlvbnMvdGltZS1hZ28vaG91cnMtYWdvLmpzIiwibm9kZV9tb2R1bGVzL2Vwb2NoLXRvLXRpbWVhZ28vdGltZS1jYWxjdWxhdGlvbnMvdGltZS1hZ28vbWludXRlcy1hZ28uanMiLCJub2RlX21vZHVsZXMvZXBvY2gtdG8tdGltZWFnby90aW1lLWNhbGN1bGF0aW9ucy90aW1lLWFnby9tb250aHMtYWdvLmpzIiwibm9kZV9tb2R1bGVzL2Vwb2NoLXRvLXRpbWVhZ28vdGltZS1jYWxjdWxhdGlvbnMvdGltZS1hZ28vc2Vjb25kcy1hZ28uanMiLCJub2RlX21vZHVsZXMvZXBvY2gtdG8tdGltZWFnby90aW1lLWNhbGN1bGF0aW9ucy90aW1lLWFnby93ZWVrcy1hZ28uanMiLCJub2RlX21vZHVsZXMvZXBvY2gtdG8tdGltZWFnby90aW1lLWNhbGN1bGF0aW9ucy90aW1lLWFnby95ZWFycy1hZ28uanMiLCJzcmMvc2NyaXB0cy9jb21wb25lbnRzL25hdmlnYXRpb24uanMiLCJzcmMvc2NyaXB0cy9jb21wb25lbnRzL3Jlc3BvbnNlLmpzIiwic3JjL3NjcmlwdHMvY29tcG9uZW50cy9zZWFyY2guanMiLCJzcmMvc2NyaXB0cy9jb21wb25lbnRzL3Rvb2wtdGlwLmpzIiwic3JjL3NjcmlwdHMvbGliL2FwaS5qcyIsInNyYy9zY3JpcHRzL2xpYi9mb3JtL2xpdmUtdmFsaWRhdGlvbi5qcyIsInNyYy9zY3JpcHRzL2xpYi9mb3JtL3ZhbGlkYXRlLmpzIiwic3JjL3NjcmlwdHMvbGliL2dldC1sb2dnZWQtaW4tZGF0YS5qcyIsInNyYy9zY3JpcHRzL2xpYi9odG1sLWVuY29kZS5qcyIsInNyYy9zY3JpcHRzL2xpYi9pbWFnZS1jb252ZXJ0ZXIuanMiLCJzcmMvc2NyaXB0cy9saWIvcmVhZC10aW1lLmpzIiwic3JjL3NjcmlwdHMvbGliL3N0cmlwLWh0bWwtdGFncy5qcyIsInNyYy9zY3JpcHRzL21haW4uanMiLCJzcmMvc2NyaXB0cy90ZW1wbGF0ZXMvYXV0aG9yLmpzIiwic3JjL3NjcmlwdHMvdGVtcGxhdGVzL3Bvc3QuanMiLCJzcmMvc2NyaXB0cy90ZW1wbGF0ZXMvcmVzcG9uc2UtbWV0YS5qcyIsInNyYy9zY3JpcHRzL3RlbXBsYXRlcy9yZXNwb25zZS5qcyIsInNyYy9zY3JpcHRzL3RlbXBsYXRlcy90YWcuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvd29yZC1jb3VudC9pbmRleC5qcyIsIi4uLy4uLy4uLy4uL3RlYW0tbnBtLXBhY2thZ2VzL2RzLWFzc2V0cy9hc3luYy9kZWJvdW5jZS5qcyIsIi4uLy4uLy4uLy4uL3RlYW0tbnBtLXBhY2thZ2VzL2RzLWFzc2V0cy9hc3luYy9kZWxheS5qcyIsIi4uLy4uLy4uLy4uL3RlYW0tbnBtLXBhY2thZ2VzL2RzLWFzc2V0cy9kb20vZ2V0LWFsbC5qcyIsIi4uLy4uLy4uLy4uL3RlYW0tbnBtLXBhY2thZ2VzL2RzLWFzc2V0cy9kb20vZ2V0LWRvY3VtZW50LW9mZnNldC10b3AuanMiLCIuLi8uLi8uLi8uLi90ZWFtLW5wbS1wYWNrYWdlcy9kcy1hc3NldHMvbGF6eS9pbWFnZXMuanMiLCIuLi8uLi8uLi8uLi90ZWFtLW5wbS1wYWNrYWdlcy9kcy1hc3NldHMvc2Nyb2xsL2hhcy1zY3JvbGxlZC1wYXN0LmpzIiwiLi4vLi4vLi4vLi4vdGVhbS1ucG0tcGFja2FnZXMvZHMtYXNzZXRzL3Njcm9sbC9zY3JvbGwtY2hhbmdlLmpzIiwiLi4vLi4vLi4vLi4vdGVhbS1ucG0tcGFja2FnZXMvZHMtYXNzZXRzL3Njcm9sbC92aXNpYmxlLmpzIiwiLi4vLi4vLi4vLi4vdGVhbS1ucG0tcGFja2FnZXMvZHMtYXNzZXRzL3ZhbGlkYXRlL2luZGV4LmpzIiwiLi4vLi4vLi4vLi4vdGVhbS1ucG0tcGFja2FnZXMvZHMtYXNzZXRzL3ZhbGlkYXRlL2lucHV0LWZpZWxkcy5qcyIsIi4uLy4uLy4uLy4uL3RlYW0tbnBtLXBhY2thZ2VzL2RzLWFzc2V0cy92YWxpZGF0ZS9pcy1kYXRlLmpzIiwiLi4vLi4vLi4vLi4vdGVhbS1ucG0tcGFja2FnZXMvZHMtYXNzZXRzL3ZhbGlkYXRlL2lzLWVtYWlsLmpzIiwiLi4vLi4vLi4vLi4vdGVhbS1ucG0tcGFja2FnZXMvZHMtYXNzZXRzL3ZhbGlkYXRlL2lzLWZsb2F0LmpzIiwiLi4vLi4vLi4vLi4vdGVhbS1ucG0tcGFja2FnZXMvZHMtYXNzZXRzL3ZhbGlkYXRlL2lzLWludC5qcyIsIi4uLy4uLy4uLy4uL3RlYW0tbnBtLXBhY2thZ2VzL2RzLWFzc2V0cy92YWxpZGF0ZS9pcy1yZXF1aXJlZC5qcyIsIi4uLy4uLy4uLy4uL3RlYW0tbnBtLXBhY2thZ2VzL2RzLWFzc2V0cy92YWxpZGF0ZS9pcy11cmwuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDUkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDTkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtB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O0NBQWhCOzs7Ozs7Ozs7a0JDQUEsVUFBUyxHQUFULEVBQWM7QUFDM0IsTUFBSSxLQUFLLGdFQUFMLENBRHVCO0FBRTNCLFNBQU8sR0FBRyxJQUFILENBQVEsR0FBUixDQUFQLENBRjJCO0NBQWQiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwibW9kdWxlLmV4cG9ydHM9e1xuICBcInNlY29uZHNcIjogNjAsXG4gIFwibWludXRlc1wiOiA2MCxcbiAgXCJob3Vyc1wiOiAyNCxcbiAgXCJkYXlzXCI6IDcsXG4gIFwid2Vla3NcIjogNCxcbiAgXCJtb250aHNcIjogMTJcbn1cbiIsInZhciBjb252ZXJ0ZXIgPSBtb2R1bGUuZXhwb3J0cyA9IHtcbiAgY3V0b2ZmOiByZXF1aXJlKCcuL2N1dG9mZi9jdXRvZmYuanNvbicpLFxuICBzdWZmaXhEaWN0aW9uYXJ5OiByZXF1aXJlKCcuL3N1ZmZpeC9zdWZmaXgtZGljdGlvbmFyeS5qc29uJyksXG4gIHRpbWVDYWxjczogcmVxdWlyZSgnLi90aW1lLWNhbGN1bGF0aW9ucycpXG59XG5jb252ZXJ0ZXIudGltZUFnbyA9IHJlcXVpcmUoJy4vdGltZS1hZ28vdGltZS1hZ28uanMnKS5iaW5kKGNvbnZlcnRlcilcbiIsIm1vZHVsZS5leHBvcnRzPXtcbiAgXCJzZWNvbmRzXCI6IHtcbiAgICBcInNpbmd1bGFyXCI6IFwiIHNlY29uZCBhZ29cIixcbiAgICBcInBsdXJhbFwiOiBcIiBzZWNvbmRzIGFnb1wiXG4gIH0sXG4gIFwibWludXRlc1wiOiB7XG4gICAgXCJzaW5ndWxhclwiOiBcIiBtaW51dGUgYWdvXCIsXG4gICAgXCJwbHVyYWxcIjogXCIgbWludXRlcyBhZ29cIlxuICB9LFxuICBcImhvdXJzXCI6IHtcbiAgICBcInNpbmd1bGFyXCI6IFwiIGhvdXIgYWdvXCIsXG4gICAgXCJwbHVyYWxcIjogXCIgaG91cnMgYWdvXCJcbiAgfSxcbiAgXCJkYXlzXCI6IHtcbiAgICBcInNpbmd1bGFyXCI6IFwiIGRheSBhZ29cIixcbiAgICBcInBsdXJhbFwiOiBcIiBkYXlzIGFnb1wiXG4gIH0sXG4gIFwid2Vla3NcIjoge1xuICAgIFwic2luZ3VsYXJcIjogXCIgd2VlayBhZ29cIixcbiAgICBcInBsdXJhbFwiOiBcIiB3ZWVrcyBhZ29cIlxuICB9LFxuICBcIm1vbnRoc1wiOiB7XG4gICAgXCJzaW5ndWxhclwiOiBcIiBtb250aCBhZ29cIixcbiAgICBcInBsdXJhbFwiOiBcIiBtb250aHMgYWdvXCJcbiAgfSxcbiAgXCJ5ZWFyc1wiOiB7XG4gICAgXCJzaW5ndWxhclwiOiBcIiB5ZWFyIGFnb1wiLFxuICAgIFwicGx1cmFsXCI6IFwiIHllYXJzIGFnb1wiXG4gIH1cbn1cbiIsIm1vZHVsZS5leHBvcnRzID0gVGltZUFnb1xuXG5mdW5jdGlvbiBUaW1lQWdvIChwYXN0RXBvY2gsIGN1cnJlbnRFcG9jaCkge1xuICB2YXIgc2Vjb25kcyA9IE1hdGgucm91bmQodGhpcy50aW1lQ2FsY3Muc2Vjb25kcyhwYXN0RXBvY2gsIGN1cnJlbnRFcG9jaCkpXG4gIHZhciBtaW51dGVzID0gTWF0aC5yb3VuZCh0aGlzLnRpbWVDYWxjcy5taW51dGVzKHBhc3RFcG9jaCwgY3VycmVudEVwb2NoKSlcbiAgdmFyIGhvdXJzID0gTWF0aC5yb3VuZCh0aGlzLnRpbWVDYWxjcy5ob3VycyhwYXN0RXBvY2gsIGN1cnJlbnRFcG9jaCkpXG4gIHZhciBkYXlzID0gTWF0aC5yb3VuZCh0aGlzLnRpbWVDYWxjcy5kYXlzKHBhc3RFcG9jaCwgY3VycmVudEVwb2NoKSlcbiAgdmFyIHdlZWtzID0gTWF0aC5yb3VuZCh0aGlzLnRpbWVDYWxjcy53ZWVrcyhwYXN0RXBvY2gsIGN1cnJlbnRFcG9jaCkpXG4gIHZhciBtb250aHMgPSBNYXRoLnJvdW5kKHRoaXMudGltZUNhbGNzLm1vbnRocyhwYXN0RXBvY2gsIGN1cnJlbnRFcG9jaCkpXG4gIHZhciB5ZWFycyA9IE1hdGgucm91bmQodGhpcy50aW1lQ2FsY3MueWVhcnMocGFzdEVwb2NoLCBjdXJyZW50RXBvY2gpKVxuXG4gIHZhciBzdWZmaXggPSB0aGlzLnN1ZmZpeERpY3Rpb25hcnlcbiAgdmFyIGN1dG9mZiA9IHRoaXMuY3V0b2ZmXG5cbiAgaWYgKHNlY29uZHMgPCBjdXRvZmYuc2Vjb25kcykge1xuICAgIHJldHVybiBzZWNvbmRzICsgc3VmZml4LnNlY29uZHNbZ2V0Rm9ybShzZWNvbmRzKV1cbiAgfSBlbHNlIGlmIChtaW51dGVzIDwgY3V0b2ZmLm1pbnV0ZXMpIHtcbiAgICByZXR1cm4gbWludXRlcyArIHN1ZmZpeC5taW51dGVzW2dldEZvcm0obWludXRlcyldXG4gIH0gZWxzZSBpZiAoaG91cnMgPCBjdXRvZmYuaG91cnMpIHtcbiAgICByZXR1cm4gaG91cnMgKyBzdWZmaXguaG91cnNbZ2V0Rm9ybShob3VycyldXG4gIH0gZWxzZSBpZiAoZGF5cyA8IGN1dG9mZi5kYXlzKSB7XG4gICAgcmV0dXJuIGRheXMgKyBzdWZmaXguZGF5c1tnZXRGb3JtKGRheXMpXVxuICB9IGVsc2UgaWYgKHdlZWtzIDwgY3V0b2ZmLndlZWtzKSB7XG4gICAgcmV0dXJuIHdlZWtzICsgc3VmZml4LndlZWtzW2dldEZvcm0od2Vla3MpXVxuICB9IGVsc2UgaWYgKG1vbnRocyA8IGN1dG9mZi5tb250aHMpIHtcbiAgICByZXR1cm4gbW9udGhzICsgc3VmZml4Lm1vbnRoc1tnZXRGb3JtKG1vbnRocyldXG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIHllYXJzICsgc3VmZml4LnllYXJzW2dldEZvcm0oeWVhcnMpXVxuICB9XG59XG5cbmZ1bmN0aW9uIGdldEZvcm0gKHZhbHVlKSB7XG4gIGlmICh2YWx1ZSA9PT0gMSkge1xuICAgIHJldHVybiAnc2luZ3VsYXInXG4gIH1cbiAgcmV0dXJuICdwbHVyYWwnXG59XG4iLCJtb2R1bGUuZXhwb3J0cyA9IHtcbiAgc2Vjb25kczogcmVxdWlyZSgnLi90aW1lLWFnby9zZWNvbmRzLWFnby5qcycpLFxuICBtaW51dGVzOiByZXF1aXJlKCcuL3RpbWUtYWdvL21pbnV0ZXMtYWdvLmpzJyksXG4gIGhvdXJzOiByZXF1aXJlKCcuL3RpbWUtYWdvL2hvdXJzLWFnby5qcycpLFxuICBkYXlzOiByZXF1aXJlKCcuL3RpbWUtYWdvL2RheXMtYWdvLmpzJyksXG4gIHdlZWtzOiByZXF1aXJlKCcuL3RpbWUtYWdvL3dlZWtzLWFnby5qcycpLFxuICBtb250aHM6IHJlcXVpcmUoJy4vdGltZS1hZ28vbW9udGhzLWFnby5qcycpLFxuICB5ZWFyczogcmVxdWlyZSgnLi90aW1lLWFnby95ZWFycy1hZ28uanMnKVxufVxuIiwibW9kdWxlLmV4cG9ydHMgPSBEYXlzQWdvXG5cbmZ1bmN0aW9uIERheXNBZ28gKHBhc3RFcG9jaCwgY3VycmVudEVwb2NoKSB7XG4gIHZhciBkYXlzQWdvID0gKGN1cnJlbnRFcG9jaCAtIHBhc3RFcG9jaCkgLyAxMDAwIC8gNjAgLyA2MCAvIDI0XG4gIHJldHVybiBkYXlzQWdvXG59XG4iLCJtb2R1bGUuZXhwb3J0cyA9IEhvdXJzQWdvXG5cbmZ1bmN0aW9uIEhvdXJzQWdvIChwYXN0RXBvY2gsIGN1cnJlbnRFcG9jaCkge1xuICB2YXIgaG91cnNBZ28gPSAoY3VycmVudEVwb2NoIC0gcGFzdEVwb2NoKSAvIDEwMDAgLyA2MCAvIDYwXG4gIHJldHVybiBob3Vyc0Fnb1xufVxuIiwibW9kdWxlLmV4cG9ydHMgPSBNaW51dGVzQWdvXG5cbmZ1bmN0aW9uIE1pbnV0ZXNBZ28gKHBhc3RFcG9jaCwgY3VycmVudEVwb2NoKSB7XG4gIHZhciBtaW51dGVzQWdvID0gKGN1cnJlbnRFcG9jaCAtIHBhc3RFcG9jaCkgLyAxMDAwIC8gNjBcbiAgcmV0dXJuIG1pbnV0ZXNBZ29cbn1cbiIsIm1vZHVsZS5leHBvcnRzID0gTW9udGhzQWdvXG5cbmZ1bmN0aW9uIE1vbnRoc0FnbyAocGFzdEVwb2NoLCBjdXJyZW50RXBvY2gpIHtcbiAgdmFyIG1vbnRoc0FnbyA9IChjdXJyZW50RXBvY2ggLSBwYXN0RXBvY2gpIC8gMTAwMCAvIDYwIC8gNjAgLyAyNCAvIDMxXG4gIHJldHVybiBtb250aHNBZ29cbn1cbiIsIm1vZHVsZS5leHBvcnRzID0gU2Vjb25kc0Fnb1xuXG5mdW5jdGlvbiBTZWNvbmRzQWdvIChwYXN0RXBvY2gsIGN1cnJlbnRFcG9jaCkge1xuICB2YXIgc2Vjb25kc0FnbyA9IChjdXJyZW50RXBvY2ggLSBwYXN0RXBvY2gpIC8gMTAwMFxuICByZXR1cm4gc2Vjb25kc0Fnb1xufVxuIiwibW9kdWxlLmV4cG9ydHMgPSBXZWVrc0Fnb1xuXG5mdW5jdGlvbiBXZWVrc0FnbyAocGFzdEVwb2NoLCBjdXJyZW50RXBvY2gpIHtcbiAgdmFyIHdlZWtzQWdvID0gKGN1cnJlbnRFcG9jaCAtIHBhc3RFcG9jaCkgLyAxMDAwIC8gNjAgLyA2MCAvIDI0IC8gN1xuICByZXR1cm4gd2Vla3NBZ29cbn1cbiIsIm1vZHVsZS5leHBvcnRzID0gWWVhcnNBZ29cblxuZnVuY3Rpb24gWWVhcnNBZ28gKHBhc3RFcG9jaCwgY3VycmVudEVwb2NoKSB7XG4gIHZhciB5ZWFyc0FnbyA9IChjdXJyZW50RXBvY2ggLSBwYXN0RXBvY2gpIC8gMTAwMCAvIDYwIC8gNjAgLyAyNCAvIDMxIC8gMTJcbiAgcmV0dXJuIHllYXJzQWdvXG59XG4iLCIvKipcbiAqIEhhbmRsZSBuYXZpZ2F0aW9uXG4gKi9cblxuLy8gRGVwZW5kZW5jaWVzXG5pbXBvcnQgc2Nyb2xsQ2hhbmdlIGZyb20gJ2RzLWFzc2V0cy9zY3JvbGwvc2Nyb2xsLWNoYW5nZSc7XG5pbXBvcnQgZGVib3VuY2UgZnJvbSAnZHMtYXNzZXRzL2FzeW5jL2RlYm91bmNlJztcbmltcG9ydCBnZXRBbGwgZnJvbSAnZHMtYXNzZXRzL2RvbS9nZXQtYWxsJztcbmltcG9ydCBoYXNTY3JvbGxlZFBhc3QgZnJvbSAnZHMtYXNzZXRzL3Njcm9sbC9oYXMtc2Nyb2xsZWQtcGFzdCc7XG5pbXBvcnQgZ2V0VXNlckRhdGEgZnJvbSAnLi4vbGliL2dldC1sb2dnZWQtaW4tZGF0YSc7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uKCkge1xuXG4gIHZhciAkbmF2ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLm5hdicpO1xuICBpZiAoISRuYXYpIHtcbiAgICByZXR1cm47XG4gIH1cblxuICB2YXIgJGJvZHkgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdib2R5Jyk7XG5cbiAgLy8gQ2xvbmUgbmF2aWdhdGlvbiBhbmQgbWFrZSB0aGUgbmV3IG9uZSBzdGlja3lcbiAgdmFyICRzdGlja3lOYXYgPSAkbmF2LmNsb25lTm9kZSh0cnVlKTtcbiAgJHN0aWNreU5hdi5jbGFzc0xpc3QuYWRkKCduYXYtLXN0aWNreScpO1xuICAkYm9keS5pbnNlcnRCZWZvcmUoJHN0aWNreU5hdiwgJGJvZHkuZmlyc3RDaGlsZCk7XG5cbiAgdmFyICRmb290ZXJTaGFyZUJhciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5mb290ZXJfX3NoYXJlLWJhcicpO1xuICB2YXIgJHN0aWNreVNoYXJlQmFyO1xuICBpZiAoJGZvb3RlclNoYXJlQmFyKSB7XG4gICAgJHN0aWNreVNoYXJlQmFyID0gJGZvb3RlclNoYXJlQmFyLmNsb25lTm9kZSh0cnVlKTtcbiAgICAkc3RpY2t5U2hhcmVCYXIuY2xhc3NMaXN0LmFkZCgnZm9vdGVyX19zaGFyZS1iYXItLXN0aWNreScpO1xuICAgICRib2R5Lmluc2VydEJlZm9yZSgkc3RpY2t5U2hhcmVCYXIsICRib2R5LmZpcnN0Q2hpbGQpO1xuICB9XG5cbiAgLy8gQWN0aXZhdGUgdGhlIHN0aWNreSBuYXZpZ2F0aW9uIHdoZW4gdGhlIHVzZXIgc2Nyb2xscyB1cC5cbiAgLy8gVGhpcyB3aWxsIGZpcnMgdGFrZSBlZmZlY3QsIHdoZW4gdGhlIHVzZXIgaGFzIHNjcm9sbGVkIFwiYSBzY3JlZW5cIiBkb3duLlxuICBzY3JvbGxDaGFuZ2UoZnVuY3Rpb24oKSB7XG4gICAgJHN0aWNreU5hdi5jbGFzc0xpc3QucmVtb3ZlKCduYXYtLWFjdGl2ZScpO1xuICAgIGlmICgkc3RpY2t5U2hhcmVCYXIpIHtcbiAgICAgICRzdGlja3lTaGFyZUJhci5jbGFzc0xpc3QucmVtb3ZlKCdmb290ZXJfX3NoYXJlLWJhci0tc3RpY2t5LWFjdGl2ZScpO1xuICAgIH1cbiAgfSwgZnVuY3Rpb24oKSB7XG4gICAgJHN0aWNreU5hdi5jbGFzc0xpc3QuYWRkKCduYXYtLWFjdGl2ZScpO1xuICAgIGlmICgkc3RpY2t5U2hhcmVCYXIpIHtcbiAgICAgICRzdGlja3lTaGFyZUJhci5jbGFzc0xpc3QuYWRkKCdmb290ZXJfX3NoYXJlLWJhci0tc3RpY2t5LWFjdGl2ZScpO1xuICAgIH1cbiAgfSwgd2luZG93LmlubmVySGVpZ2h0KTtcblxuICAvKipcbiAgICogSGlkZSBzdGlja3kgbmF2aWdhdGlvbiB3aGVuIHNjcm9sbGVkIHRvIHRoZSB0b3Agb2YgdGhlIGRvY3VtZW50XG4gICAqIEByZXR1cm4ge3ZvaWR9XG4gICAqL1xuICB2YXIgb25Ub3AgPSBmdW5jdGlvbigpIHtcbiAgICB2YXIgc2Nyb2xsUG9zID0gd2luZG93LnNjcm9sbFkgfHwgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LnNjcm9sbFRvcDtcbiAgICBpZiAoc2Nyb2xsUG9zIDw9IDApIHtcbiAgICAgICRzdGlja3lOYXYuY2xhc3NMaXN0LmFkZCgnbmF2LS1oaWRkZW4nKTtcbiAgICAgICRzdGlja3lOYXYuY2xhc3NMaXN0LnJlbW92ZSgnbmF2LS1hY3RpdmUnKTtcbiAgICB9IGVsc2Uge1xuICAgICAgJHN0aWNreU5hdi5jbGFzc0xpc3QucmVtb3ZlKCduYXYtLWhpZGRlbicpO1xuICAgIH1cbiAgICBpZiAoJHN0aWNreVNoYXJlQmFyKSB7XG4gICAgICB2YXIgdGhyZXNob2xkID0gJGZvb3RlclNoYXJlQmFyLm9mZnNldEhlaWdodCAvIHdpbmRvdy5pbm5lckhlaWdodDtcbiAgICAgIGlmIChoYXNTY3JvbGxlZFBhc3QoJGZvb3RlclNoYXJlQmFyLCAtMSAqIHRocmVzaG9sZCkpIHtcbiAgICAgICAgJHN0aWNreVNoYXJlQmFyLmNsYXNzTGlzdC5hZGQoJ2hpZGRlbicpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgJHN0aWNreVNoYXJlQmFyLmNsYXNzTGlzdC5yZW1vdmUoJ2hpZGRlbicpO1xuICAgICAgfVxuICAgIH1cbiAgfTtcblxuICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignc2Nyb2xsJywgZGVib3VuY2Uob25Ub3ApKTtcbiAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3Jlc2l6ZScsIGRlYm91bmNlKG9uVG9wKSk7XG5cbiAgLy8gQ2hhbmdlIHdvcmRpbmcgb24gXCJzaWduIGluXCIgYnV0dG9uIHdoZW4gdXNlciBpcyBsb2dnZWQgaW5cbiAgZ2V0VXNlckRhdGEoKS50aGVuKGZ1bmN0aW9uKCkge1xuICAgIGdldEFsbCgnLm5hdl9faXRlbS0tc2lnbi1pbicpLmZvckVhY2goZnVuY3Rpb24oJHNpZ25pbikge1xuICAgICAgJHNpZ25pbi5pbm5lckhUTUwgPSAnQ3JlYXRlIGEgc3RvcnknO1xuICAgIH0pO1xuICB9KS5jYXRjaChmdW5jdGlvbigpIHt9KTtcblxufVxuIiwiLyoqXG4gKiBIYW5kbGUgcmVzcG9uc2VzIGFuZCBsaWtlcyBpbiBwb3N0c1xuICovXG5cbi8vIERlcGVuZGVuY2llc1xuaW1wb3J0IGdldEFsbCBmcm9tICdkcy1hc3NldHMvZG9tL2dldC1hbGwnO1xuaW1wb3J0IGxhenlJbWFnZXMgZnJvbSAnZHMtYXNzZXRzL2xhenkvaW1hZ2VzJztcbmltcG9ydCAqIGFzIGFwaSBmcm9tICcuLi9saWIvYXBpJztcbmltcG9ydCBnZXRVc2VyRGF0YSBmcm9tICcuLi9saWIvZ2V0LWxvZ2dlZC1pbi1kYXRhJztcbmltcG9ydCB1c2VyTWV0YVRlbXBsYXRlIGZyb20gJy4uL3RlbXBsYXRlcy9yZXNwb25zZS1tZXRhJztcbmltcG9ydCByZXNwb25zZVRlbXBsYXRlIGZyb20gJy4uL3RlbXBsYXRlcy9yZXNwb25zZSc7XG5pbXBvcnQgb2Zmc2V0VG9wIGZyb20gJ2RzLWFzc2V0cy9kb20vZ2V0LWRvY3VtZW50LW9mZnNldC10b3AnO1xuaW1wb3J0IGxpdmVWYWxpZGF0aW9uIGZyb20gJy4uL2xpYi9mb3JtL2xpdmUtdmFsaWRhdGlvbic7XG5pbXBvcnQgdmFsaWRhdGVGb3JtIGZyb20gJy4uL2xpYi9mb3JtL3ZhbGlkYXRlJztcblxuLy8gQ2FjaGVkIGRvbSBlbGVtZW50c1xudmFyICRyZXNwb25zZUZvcm07XG52YXIgJGN0YTtcbnZhciAkdmFsaWRhdG9ycztcbnZhciAkcmVzcG9uc2VzTGlzdDtcbnZhciByZW5kZXJSZXNwb25zZXM7XG52YXIgYWRkRGVsZXRlRXZlbnRzO1xudmFyIHNldFJlc3BvbnNlc051bWJlcjtcbnZhciBhZGRSZWFkTW9yZUV2ZW50O1xuXG52YXIgdXBkYXRlUmVzcG9uc2VDVEEgPSBmdW5jdGlvbih2YWxpZCkge1xuXHRpZiAodmFsaWQpIHtcblx0XHQkY3RhLmNsYXNzTGlzdC5yZW1vdmUoJ2J0bi0tZGlzYWJsZWQnKTtcblx0fSBlbHNlIHtcblx0XHQkY3RhLmNsYXNzTGlzdC5hZGQoJ2J0bi0tZGlzYWJsZWQnKTtcblx0fVxufTtcblxuLyoqXG4gKiBEZWxldGUgcmVzcG9uc2Ugd2hlbiBkZWxldGUgaWNvbiBjbGlja2VkXG4gKi9cbmFkZERlbGV0ZUV2ZW50cyA9IGZ1bmN0aW9uKCkge1xuXHRnZXRBbGwoJy5yZXNwb25zZV9fZGVsZXRlJykuZm9yRWFjaChmdW5jdGlvbigkZGVsZXRlKSB7XG5cdFx0JGRlbGV0ZS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uKGUpIHtcblx0XHRcdGUucHJldmVudERlZmF1bHQoKTtcblx0XHRcdGFwaS5yZW1vdmVSZXNwb25zZSgkZGVsZXRlLmRhdGFzZXQucHVibGlzaGVkLCAkZGVsZXRlLmRhdGFzZXQubmFtZSlcblx0XHRcdFx0LnRoZW4oZnVuY3Rpb24oZGF0YSkge1xuXHRcdFx0XHRcdHJlbmRlclJlc3BvbnNlcyhkYXRhLnJlc3BvbnNlcyk7XG5cdFx0XHRcdFx0c2V0UmVzcG9uc2VzTnVtYmVyKGRhdGEucmVzcG9uc2VzKTtcblx0XHRcdFx0fSk7XG5cdFx0fSk7XG5cdH0pO1xufTtcblxuLyoqXG4gKiBFeHBhbmQgcmVzcG9uc2Ugd2l0aCBmdWxsIHRleHQgd2hlbiByZWFkIG1vcmUgYnV0dG9uIGlzIGFjdGl2YXRlZC5cbiAqIEJhc2ljYWxseSBpdCBoaWRlcyB0aGUgZXhjZXJwdCBhbmQgdGhlIHJlYWQgbW9yZSBidXR0b24gYW5kIGRpc3BsYXlzIHRoZVxuICogZnVsbCB0ZXh0LlxuICogQHBhcmFtIHtlbGVtZW50fSAkcmVzcG9uc2VcbiAqL1xuYWRkUmVhZE1vcmVFdmVudCA9IGZ1bmN0aW9uKCRyZXNwb25zZSkge1xuXHR2YXIgJHJlYWRNb3JlID0gJHJlc3BvbnNlLnF1ZXJ5U2VsZWN0b3IoJy5yZXNwb25zZV9fcmVhZC1tb3JlJyk7XG5cdGlmICghJHJlYWRNb3JlKSB7XG5cdFx0cmV0dXJuO1xuXHR9XG5cdCRyZWFkTW9yZS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uKGUpIHtcblx0XHRlLnByZXZlbnREZWZhdWx0KCk7XG5cdFx0dmFyICRleGNlcnB0ID0gJHJlc3BvbnNlLnF1ZXJ5U2VsZWN0b3IoJy5yZXNwb25zZV9fZXhjZXJwdCcpO1xuXHRcdHZhciAkcmVhZE1vcmVDb250YWluZXIgPSAkcmVhZE1vcmUucGFyZW50Tm9kZTtcblxuXHRcdCRyZWFkTW9yZUNvbnRhaW5lci5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKCRyZWFkTW9yZUNvbnRhaW5lcik7XG5cdFx0JGV4Y2VycHQucGFyZW50Tm9kZS5yZW1vdmVDaGlsZCgkZXhjZXJwdCk7XG5cblx0XHQkcmVzcG9uc2UucXVlcnlTZWxlY3RvcignLnJlc3BvbnNlX190ZXh0JykuY2xhc3NMaXN0LnJlbW92ZSgnaGlkZGVuJyk7XG5cdH0pO1xufTtcblxuLyoqXG4gKiBSZW5kZXIgdGVtcGxhdGVzIGZvciByZXNwb25zZXMgYW5kIGluc2VydCBodG1sIGluIHRoZSByZXNwb25zZXMgbGlzdC5cbiAqIC0gTGF6eSBsb2FkIGltYWdlcyBpbiByZXNwb25zZXNcbiAqIC0gQXR0YWNoIG5ldyBldmVudHMgaW4gcmVzcG9uc2VzXG4gKiBAcGFyYW0gIHthcnJheX0gcmVzcG9uc2VzXG4gKiBAcmV0dXJuIHt2b2lkfVxuICovXG5yZW5kZXJSZXNwb25zZXMgPSBmdW5jdGlvbihyZXNwb25zZXMpIHtcblx0dmFyIGh0bWwgPSAnJztcblx0cmVzcG9uc2VzLmZvckVhY2goZnVuY3Rpb24ocmVzcG9uc2UpIHtcblx0XHRodG1sICs9IHJlc3BvbnNlVGVtcGxhdGUocmVzcG9uc2UpO1xuXHR9KTtcblx0JHJlc3BvbnNlc0xpc3QuaW5uZXJIVE1MID0gaHRtbDtcblx0bGF6eUltYWdlcygxKTtcblx0YWRkRGVsZXRlRXZlbnRzKCk7XG5cdGdldEFsbCgnLnJlc3BvbnNlJywgJHJlc3BvbnNlc0xpc3QpLmZvckVhY2goYWRkUmVhZE1vcmVFdmVudCk7XG59O1xuXG4vKipcbiAqIFVwZGF0ZSB0aGUgY291bnQgb2YgcmVzcG9uc2VzXG4gKiBAcGFyYW0ge2FycmF5fSByZXNwb25zZXNcbiAqL1xuc2V0UmVzcG9uc2VzTnVtYmVyID0gZnVuY3Rpb24ocmVzcG9uc2VzKSB7XG5cdGdldEFsbCgnLnNoYXJlX19yZXNwb25zZXMnKS5mb3JFYWNoKGZ1bmN0aW9uKCRyZXNwb25zZXMpIHtcblx0XHQkcmVzcG9uc2VzLmlubmVySFRNTCA9IHJlc3BvbnNlcy5sZW5ndGg7XG5cdH0pO1xufTtcblxuLyoqXG4gKiBVcGRhdGUgdGhlIGNvdW50IGZvIGxpa2VzIGZvciB0aGlzIHBvc3RcbiAqIEBwYXJhbSB7bnVtYmVyfSBsaWtlc1xuICovXG52YXIgc2V0TGlrZXNOdW1iZXIgPSBmdW5jdGlvbihsaWtlcykge1xuXHRnZXRBbGwoJy5zaGFyZV9fbGlrZXMnKS5mb3JFYWNoKGZ1bmN0aW9uKCRsaWtlcykge1xuXHRcdCRsaWtlcy5pbm5lckhUTUwgPSBsaWtlcztcblx0fSk7XG59O1xuXG4vKipcbiAqIEdldCBkYXRhIGZyb20gYXBpIHdpdGggbWV0YSBkYXRhOiByZXNwb25zZXMgYW5kIGxpa2VzLlxuICogUmVuZGVyIHRoaXMgaW4gdGhlIGRvbS5cbiAqIEByZXR1cm4ge3ZvaWR9XG4gKi9cbnZhciByZW5kZXJNZXRhID0gZnVuY3Rpb24oKSB7XG5cdGFwaS5nZXRNZXRhKCkudGhlbihmdW5jdGlvbihkYXRhKSB7XG5cdFx0cmVuZGVyUmVzcG9uc2VzKGRhdGEucmVzcG9uc2VzKTtcblx0XHRzZXRSZXNwb25zZXNOdW1iZXIoZGF0YS5yZXNwb25zZXMpO1xuXHRcdHNldExpa2VzTnVtYmVyKGRhdGEubGlrZXMpO1xuXHR9KTtcbn07XG5cbi8qKlxuICogUG9zdCBuZXcgcmVzcG9uc2UgdG8gcG9zdFxuICogLSBjaGVja3MgZm9yIHZhbGlkYXRpb24gYmVmb3JlIHBvc3RpbmdcbiAqIEBwYXJhbSAge2V2ZW50fSBlXG4gKiBAcmV0dXJuIHt2b2lkfVxuICovXG52YXIgc3VibWl0UmVzcG9uc2UgPSBmdW5jdGlvbihlKSB7XG5cdGUucHJldmVudERlZmF1bHQoKTtcblxuXHR2YXIgbG9nZ2VkSW4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdib2R5JykuY2xhc3NMaXN0LmNvbnRhaW5zKCd1c2VyLWxvZ2dlZC1pbicpO1xuXG5cdC8vIElmIGEgZmllbGQgaXMgbm90IHZhbGlkIHRoaXMgZmllbGQgd2lsbCBnZXQgZm9jdXMsIHNvIHRoZSB1c2VyIHF1aWNrbHkgY2FuIHVwZGF0ZSB0aGUgdmFsdWUuXG5cdHZhciBub3RWYWxpZCA9ICR2YWxpZGF0b3JzLnNvbWUoZnVuY3Rpb24oJHZhbGlkYXRvcikge1xuXHRcdGlmICgkdmFsaWRhdG9yLmNsYXNzTGlzdC5jb250YWlucygndmFsaWRhdGUtLW5vdC12YWxpZCcpKSB7XG5cdFx0XHR2YXIgJHZhbGlkYXRlRmllbGQgPSAkdmFsaWRhdG9yLnF1ZXJ5U2VsZWN0b3IoJ2lucHV0LCB0ZXh0YXJlYScpO1xuXHRcdFx0JHZhbGlkYXRlRmllbGQuZm9jdXMoKTtcblx0XHRcdHJldHVybiB0cnVlO1xuXHRcdH1cblx0fSk7XG5cblx0aWYgKG5vdFZhbGlkKSB7XG5cdFx0cmV0dXJuO1xuXHR9XG5cblx0Ly8gQ3JlYXRlIGEgcmVzcG9uc2Ugb2JqZWN0IGJhc2VkIG9uIHZhbHVlcyBpbiBmb3JtXG5cdHZhciByZXNwb25zZSA9IHt9O1xuXHRnZXRBbGwoJ2lucHV0LCB0ZXh0YXJlYScsICRyZXNwb25zZUZvcm0pLmZvckVhY2goZnVuY3Rpb24oJGZpZWxkKSB7XG5cdFx0dmFyIG5hbWUgPSAkZmllbGQuZ2V0QXR0cmlidXRlKCduYW1lJyk7XG5cdFx0aWYgKCRmaWVsZC52YWx1ZSkge1xuXHRcdFx0cmVzcG9uc2VbbmFtZV0gPSAkZmllbGQudmFsdWU7XG5cdFx0fVxuXHR9KTtcblxuXHQkY3RhLmlubmVySFRNTCA9ICdQb3N0aW5nLi4uJztcblx0JGN0YS5jbGFzc0xpc3QuYWRkKCdidG4tLWRpc2FibGVkJyk7XG5cdGFwaS5hZGRSZXNwb25zZShyZXNwb25zZSkudGhlbihmdW5jdGlvbihkYXRhKSB7XG5cdFx0cmVuZGVyUmVzcG9uc2VzKGRhdGEucmVzcG9uc2VzKTtcblx0XHRzZXRSZXNwb25zZXNOdW1iZXIoZGF0YS5yZXNwb25zZXMpO1xuXG5cdFx0Ly8gU2Nyb2xsIHRvIG5ldyByZXNwb25zZVxuXHRcdHZhciAkbGFzdFJlc3BvbnNlID0gJHJlc3BvbnNlc0xpc3QucXVlcnlTZWxlY3RvcignLnJlc3BvbnNlOmxhc3QtY2hpbGQnKTtcblx0XHR2YXIgb2Zmc2V0ID0gb2Zmc2V0VG9wKCRsYXN0UmVzcG9uc2UpO1xuXHRcdHdpbmRvdy5zY3JvbGxUbygwLCBvZmZzZXQgLSAoMC41ICogd2luZG93LmlubmVySGVpZ2h0KSk7XG5cblx0XHQvLyBSZXNldCBmb3JtXG5cdFx0JGN0YS5pbm5lckhUTUwgPSAnUmVzcG9uZCc7XG5cdFx0aWYgKGxvZ2dlZEluKSB7XG5cdFx0XHR2YXIgJHRleHQgPSAkcmVzcG9uc2VGb3JtLnF1ZXJ5U2VsZWN0b3IoJy5yZXNwb25zZXMtZm9ybV9fdGV4dCcpO1xuXHRcdFx0JHRleHQuY2xhc3NMaXN0LmFkZCgndmFsaWRhdGUtLW5vdC12YWxpZCcpO1xuXHRcdFx0JHRleHQuY2xhc3NMaXN0LnJlbW92ZSgndmFsaWRhdGUtLXZhbGlkJyk7XG5cdFx0XHQkdGV4dC5xdWVyeVNlbGVjdG9yKCd0ZXh0YXJlYScpLnZhbHVlID0gJyc7XG5cdFx0fSBlbHNlIHtcblx0XHRcdCR2YWxpZGF0b3JzLmZvckVhY2goZnVuY3Rpb24oJHZhbGlkYXRvcikge1xuXHRcdFx0XHRpZiAoJHZhbGlkYXRvci5kYXRhc2V0LnZhbGlkYXRlUmVxdWlyZWQgIT09IHVuZGVmaW5lZCkge1xuXHRcdFx0XHRcdCR2YWxpZGF0b3IuY2xhc3NMaXN0LmFkZCgndmFsaWRhdGUtLW5vdC12YWxpZCcpO1xuXHRcdFx0XHRcdCR2YWxpZGF0b3IuY2xhc3NMaXN0LnJlbW92ZSgndmFsaWRhdGUtLXZhbGlkJyk7XG5cdFx0XHRcdH1cblx0XHRcdFx0JHZhbGlkYXRvci5xdWVyeVNlbGVjdG9yKCdpbnB1dCwgdGV4dGFyZWEnKS52YWx1ZSA9ICcnO1xuXHRcdFx0fSk7XG5cdFx0fVxuXHR9KTtcblxufTtcblxuLyoqXG4gKiBVcGRhdGUgaGVhcnQgKGxpa2UpIGljb25zIHRvIGluZGljYXRlLCB0aGF0IHRoZSB1c2VyIGhhdmUgbGlrZWQgdGhlIGFydGljbGVcbiAqIEByZXR1cm4ge3ZvaWR9XG4gKi9cbnZhciBsaWtlZCA9IGZ1bmN0aW9uKCkge1xuXHR2YXIgJHRvb2xUaXBJY29uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnRvb2wtdGlwX19saWtlLWljb24nKTtcblx0JHRvb2xUaXBJY29uLnNldEF0dHJpYnV0ZSgnc3JjJywgJy9hc3NldHMvaW1hZ2VzL2hlYXJ0LS1pbnZlcnNlLS1hY3RpdmUuc3ZnJyk7XG5cdCR0b29sVGlwSWNvbi5zZXRBdHRyaWJ1dGUoJ2RhdGEtc3JjJywgJy9hc3NldHMvaW1hZ2VzL2hlYXJ0LS1pbnZlcnNlLS1hY3RpdmUuc3ZnJyk7XG5cblx0Z2V0QWxsKCcucG9zdC1mb290ZXJfX2xpa2UtaWNvbicpLmZvckVhY2goZnVuY3Rpb24oJGZvb3Rlckljb24pIHtcblx0XHQkZm9vdGVySWNvbi5zZXRBdHRyaWJ1dGUoJ3NyYycsICcvYXNzZXRzL2ltYWdlcy9oZWFydC0tYWN0aXZlLnN2ZycpO1xuXHRcdCRmb290ZXJJY29uLnNldEF0dHJpYnV0ZSgnZGF0YS1zcmMnLCAnL2Fzc2V0cy9pbWFnZXMvaGVhcnQtLWFjdGl2ZS5zdmcnKTtcblx0fSk7XG5cblx0Ly8gSW5kaWNhdGVzLCB0aGF0IHRoZSBsaWtlIGJ1dHRvbiBubyBsb25nZXIgaXMgY2xpY2thYmxlXG5cdGdldEFsbCgnLnNoYXJlX19saWtlJykuZm9yRWFjaCgkbGlrZSA9PiAkbGlrZS5jbGFzc0xpc3QuYWRkKCdkaXNhYmxlZCcpKTtcbn07XG5cbi8qKlxuICogQWN0aXZhdGUgbGlrZSwgd2hlbiBsaWtlIGJ1dHRvbnMgYXJlIGNsaWNrZWRcbiAqIEBwYXJhbSAge2VsZW1lbnR9ICRhbmNob3JcbiAqIEByZXR1cm4ge3ZvaWR9XG4gKi9cbnZhciBhdHRhY2hMaWtlRXZlbnQgPSBmdW5jdGlvbigkYW5jaG9yKSB7XG5cdCRhbmNob3IuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbihlKSB7XG5cdFx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xuXG5cdFx0Ly8gQWxyZWFkeSBsaWtlZCB0aGlzIGFydGljbGVcblx0XHRpZiAobG9jYWxTdG9yYWdlLmdldEl0ZW0oJ2xpa2U6JyArIHdpbmRvdy5wb3N0SWQpKSB7XG5cdFx0XHRyZXR1cm47XG5cdFx0fVxuXG5cdFx0bG9jYWxTdG9yYWdlLnNldEl0ZW0oJ2xpa2U6JyArIHdpbmRvdy5wb3N0SWQsIHRydWUpO1xuXHRcdGxpa2VkKCk7XG5cblx0XHRhcGkubGlrZSgpLnRoZW4oZnVuY3Rpb24oZGF0YSkge1xuXHRcdFx0c2V0TGlrZXNOdW1iZXIoZGF0YS5saWtlcyk7XG5cdFx0fSk7XG5cdH0pO1xufTtcblxuLyoqXG4gKiBVcGRhdGUgcmVzcG9uc2VzIGZvcm0gaWYgdXNlciBpcyBsb2dnZWQgaW4uXG4gKiBVc2VyIGRvIG5vdCBuZWVkIHRvIGZpbGwgZS1tYWlsLCBuYW1lIGV0Yy5cbiAqIEBwYXJhbSAge29iamVjdH0gZGF0YVxuICogQHJldHVybiB7dm9pZH1cbiAqL1xudmFyIHJlbmRlclVzZXJGb3JtID0gZnVuY3Rpb24odXNlcikge1xuXHR2YXIgaHRtbCA9IHVzZXJNZXRhVGVtcGxhdGUodXNlcik7XG5cdHZhciAkbWV0YSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuXHQkbWV0YS5pbm5lckhUTUwgPSBodG1sO1xuXHR2YXIgJGhlYWRlciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5yZXNwb25zZXNfX2Zvcm0gaDMnKTtcblxuXHQvLyBGaWxsIGlucHV0IGZpZWxkcyB3aXRoIHJlbGV2YW50IGRhdGFcblx0Z2V0QWxsKCcucmVzcG9uc2VzX19mb3JtIGlucHV0JykuZm9yRWFjaChmdW5jdGlvbigkaW5wdXQpIHtcblx0XHR2YXIgbmFtZSA9ICRpbnB1dC5nZXRBdHRyaWJ1dGUoJ25hbWUnKTtcblx0XHRpZiAobmFtZSA9PT0gJ3dlYnNpdGUnKSB7XG5cdFx0XHQkaW5wdXQudmFsdWUgPSAnL2F1dGhvci8nICsgdXNlci5zbHVnO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHQkaW5wdXQudmFsdWUgPSB1c2VyW25hbWVdO1xuXHRcdH1cblx0XHQkaW5wdXQucGFyZW50Tm9kZS5jbGFzc0xpc3QuYWRkKCd2YWxpZGF0ZS0tdmFsaWQnKTtcblx0XHQkaW5wdXQucGFyZW50Tm9kZS5jbGFzc0xpc3QucmVtb3ZlKCd2YWxpZGF0ZS0tbm90LXZhbGlkJyk7XG5cdH0pO1xuXG5cdC8vIEluc2VydCBhZnRlciBoZWFkZXJcblx0JGhlYWRlci5wYXJlbnROb2RlLmluc2VydEJlZm9yZSgkbWV0YSwgJGhlYWRlci5uZXh0U2libGluZyk7XG5cdGxhenlJbWFnZXMoMSk7XG5cdHZhbGlkYXRlRm9ybSgkdmFsaWRhdG9ycywgdXBkYXRlUmVzcG9uc2VDVEEpO1xufTtcblxuLyoqXG4gKiBJbml0IHJlc3BvbnNlc1xuICogQHJldHVybiB7dm9pZH1cbiAqL1xuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24oKSB7XG5cdCRyZXNwb25zZUZvcm0gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucmVzcG9uc2VzX19mb3JtJyk7XG5cblx0aWYgKCEkcmVzcG9uc2VGb3JtKSB7XG5cdFx0cmV0dXJuO1xuXHR9XG5cblx0Ly8gQ2FjaGUgZG9tIGVsZW1lbnRzXG5cdCRjdGEgPSAkcmVzcG9uc2VGb3JtLnF1ZXJ5U2VsZWN0b3IoJy5idG4tLWN0YScpO1xuXHQkcmVzcG9uc2VzTGlzdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5yZXNwb25zZXNfX2xpc3QnKTtcblx0JHZhbGlkYXRvcnMgPSBnZXRBbGwoJy52YWxpZGF0ZScsICRyZXNwb25zZUZvcm0pO1xuXG5cdC8vIFVwZGF0ZSBmcm9tIGFzIHVzZXIgdHlwZXNcblx0bGl2ZVZhbGlkYXRpb24oJHZhbGlkYXRvcnMsIHVwZGF0ZVJlc3BvbnNlQ1RBKTtcblxuXHQvLyBSZW5kZXIgcmVzcG9uc2VzIGFuZCBsaWtlXG5cdHJlbmRlck1ldGEoKTtcblxuXHQvLyBDaGFuZ2UgZm9ybSBpZiB1c2VyIGlzIGxvZ2dlZCBpblxuXHRnZXRVc2VyRGF0YSgpLnRoZW4ocmVuZGVyVXNlckZvcm0pLmNhdGNoKGZ1bmN0aW9uKCkge30pO1xuXG5cdC8vIFVzZXIgYWxyZWFkeSBsaWtlcyB0aGlzIGFydGljbGVcblx0aWYgKGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdsaWtlOicgKyB3aW5kb3cucG9zdElkKSkge1xuXHRcdGxpa2VkKCk7XG5cdH1cblxuXHRnZXRBbGwoJy5zaGFyZV9fbGlrZScpLmZvckVhY2goYXR0YWNoTGlrZUV2ZW50KTtcblx0JGN0YS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHN1Ym1pdFJlc3BvbnNlKTtcblxuXHQvLyBTaG93IG1hcmtkb3duIGhlbHBlcnNcblx0ZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnJlc3BvbnNlLWZvcm1fX21hcmtkb3duLWV4cGFuZGVyJykuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbihlKSB7XG5cdFx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xuXHRcdGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5yZXNwb25zZS1mb3JtX19tYXJrZG93bi1oZWxwZXJzJykuY2xhc3NMaXN0LnJlbW92ZSgnaGlkZGVuJyk7XG5cdH0pO1xuXG59XG4iLCJpbXBvcnQgbGF6eUltYWdlcyBmcm9tICdkcy1hc3NldHMvbGF6eS9pbWFnZXMnO1xuaW1wb3J0IGdldEFsbCBmcm9tICdkcy1hc3NldHMvZG9tL2dldC1hbGwnO1xuaW1wb3J0ICogYXMgYXBpIGZyb20gJy4uL2xpYi9hcGknO1xuaW1wb3J0IHBvc3RUZW1wbGF0ZSBmcm9tICcuLi90ZW1wbGF0ZXMvcG9zdCc7XG5pbXBvcnQgYXV0aG9yVGVtcGxhdGUgZnJvbSAnLi4vdGVtcGxhdGVzL2F1dGhvcic7XG5pbXBvcnQgdGFnVGVtcGxhdGUgZnJvbSAnLi4vdGVtcGxhdGVzL3RhZyc7XG5cbmNvbnN0IE1BWF9SRVNVTFRTID0gMTA7XG5cbnZhciAkc2VhcmNoSW5wdXQ7XG52YXIgJHNlYXJjaExpc3Q7XG52YXIgbGF0ZXN0Q291bnRlciA9IDA7XG5cbnZhciBnZXRTZWFyY2hSZXN1bHQgPSBmdW5jdGlvbihwYXRoKSB7XG5cdHZhciBhYnNvbHV0ZSA9IHdpbmRvdy5naG9zdC51cmwuYXBpKHBhdGgsIHtcblx0XHRpbmNsdWRlOiAndGFncyxhdXRob3IsY291bnQucG9zdHMnXG5cdH0pO1xuXHR2YXIgcmVsYXRpdmUgPSBhYnNvbHV0ZS5zdWJzdHIoYWJzb2x1dGUuaW5kZXhPZignL2dob3N0JyksIGFic29sdXRlLmxlbmd0aCk7XG5cdHJldHVybiBmZXRjaChyZWxhdGl2ZSlcblx0XHQudGhlbihmdW5jdGlvbihyZXNwb25zZSkge1xuXHRcdFx0aWYgKHJlc3BvbnNlLnN0YXR1cyA+PSAzMDApIHtcblx0XHRcdFx0cmV0dXJuIFByb21pc2UucmVqZWN0KHJlc3BvbnNlKTtcblx0XHRcdH1cblx0XHRcdHJldHVybiByZXNwb25zZTtcblx0XHR9KVxuXHRcdC50aGVuKHJlc3BvbnNlID0+IHJlc3BvbnNlLmpzb24oKSk7XG59O1xuXG52YXIgcmVuZGVyUmVzdWx0cyA9IGZ1bmN0aW9uKHJlc3VsdHMpIHtcblx0dmFyIGh0bWwgPSByZXN1bHRzLm1hcChmdW5jdGlvbihyZXN1bHQpIHtcblx0XHRpZiAocmVzdWx0LnBvc3RzKSB7XG5cdFx0XHRyZXR1cm4gcG9zdFRlbXBsYXRlKHJlc3VsdC5wb3N0c1swXSk7XG5cdFx0fVxuXHRcdGlmIChyZXN1bHQudXNlcnMpIHtcblx0XHRcdHJldHVybiBhdXRob3JUZW1wbGF0ZShyZXN1bHQudXNlcnNbMF0pO1xuXHRcdH1cblx0XHRpZiAocmVzdWx0LnRhZ3MpIHtcblx0XHRcdHJldHVybiB0YWdUZW1wbGF0ZShyZXN1bHQudGFnc1swXSk7XG5cdFx0fVxuXHRcdHJldHVybiAnJztcblx0fSkuam9pbignJyk7XG5cdCRzZWFyY2hMaXN0LmlubmVySFRNTCA9IGh0bWw7XG5cdGxhenlJbWFnZXMoMSk7XG5cdGdldEFsbCgnLmJveGVzX19pdGVtJywgJHNlYXJjaExpc3QpLmZvckVhY2goZnVuY3Rpb24oJGJveEl0ZW0sIGkpIHtcblx0XHRzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xuXHRcdFx0JGJveEl0ZW0uY2xhc3NMaXN0LnJlbW92ZSgnaGlkZGVuJyk7XG5cdFx0XHRzZXRUaW1lb3V0KCgpID0+ICRib3hJdGVtLmNsYXNzTGlzdC5hZGQoJ2FuaW1hdGUtLWFjdGl2ZScpLCAwKTtcblx0XHR9LCBpICogNTAwKTtcblx0fSk7XG59O1xuXG52YXIgc2VhcmNoID0gZnVuY3Rpb24ocXVlcnkpIHtcblxuXHR2YXIgaWQgPSArK2xhdGVzdENvdW50ZXI7XG5cdHZhciBtaW5UaW1lID0gRGF0ZS5ub3coKSArIDMwMDtcblxuXHQkc2VhcmNoTGlzdC5pbm5lckhUTUwgPSAnJztcblxuXHR2YXIgaXNMYXRlc3QgPSBmdW5jdGlvbihkYXRhKSB7XG5cdFx0aWYgKGlkICE9PSBsYXRlc3RDb3VudGVyKSB7XG5cdFx0XHRyZXR1cm4gUHJvbWlzZS5yZWplY3QoKTtcblx0XHR9XG5cdFx0cmV0dXJuIGRhdGE7XG5cdH07XG5cblx0YXBpLmdldFNlYXJjaEluZGV4KHF1ZXJ5KVxuXHRcdC50aGVuKGlzTGF0ZXN0KVxuXHRcdC50aGVuKGZ1bmN0aW9uKGluZGV4ZXMpIHtcblx0XHRcdHZhciBwcm9taXNlcyA9IGluZGV4ZXMuc2xpY2UoMCwgTUFYX1JFU1VMVFMpLm1hcChmdW5jdGlvbihpbmRleCkge1xuXHRcdFx0XHRyZXR1cm4gZ2V0U2VhcmNoUmVzdWx0KGluZGV4LnJlZik7XG5cdFx0XHR9KTtcblx0XHRcdHJldHVybiBQcm9taXNlLmFsbChwcm9taXNlcyk7XG5cdFx0fSlcblx0XHQudGhlbihmdW5jdGlvbihkYXRhKSB7XG5cdFx0XHRpZiAobWluVGltZSA8IERhdGUubm93KCkpIHtcblx0XHRcdFx0cmV0dXJuIGRhdGE7XG5cdFx0XHR9XG5cdFx0XHRyZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24ocmVzb2x2ZSkge1xuXHRcdFx0XHRzZXRUaW1lb3V0KCgpID0+IHJlc29sdmUoZGF0YSksIG1pblRpbWUgLSBEYXRlLm5vdygpKTtcblx0XHRcdH0pO1xuXHRcdH0pXG5cdFx0LnRoZW4oaXNMYXRlc3QpXG5cdFx0LnRoZW4ocmVuZGVyUmVzdWx0cylcblx0XHQuY2F0Y2goZnVuY3Rpb24oZXJyKSB7XG5cdFx0XHRpZiAoZXJyKSB7XG5cdFx0XHRcdGNvbnNvbGUuZXJyb3IoZXJyKTtcblx0XHRcdH1cblx0XHR9KTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uKCkge1xuXG5cdCRzZWFyY2hJbnB1dCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5zZWFyY2hfX2lucHV0Jyk7XG5cdCRzZWFyY2hMaXN0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnNlYXJjaF9fbGlzdCcpO1xuXG5cdGlmICghJHNlYXJjaElucHV0IHx8ICEkc2VhcmNoTGlzdCkge1xuXHRcdHJldHVybjtcblx0fVxuXHQkc2VhcmNoSW5wdXQuYWRkRXZlbnRMaXN0ZW5lcignaW5wdXQnLCBmdW5jdGlvbigpIHtcblx0XHRzZWFyY2goJHNlYXJjaElucHV0LnZhbHVlKTtcblx0fSk7XG5cblx0JHNlYXJjaElucHV0LmZvY3VzKCk7XG5cblx0JHNlYXJjaExpc3Quc2V0QXR0cmlidXRlKCdzdHlsZScsIGBtaW4taGVpZ2h0OiAke3dpbmRvdy5pbm5lckhlaWdodH1weGApO1xuXG59XG4iLCIvKipcbiAqIFRvb2wgdGlwIHNob3dlZCB3aGVuIHVzZXIgbWFya3MgdGV4dCBpbiBhcnRpY2xlLlxuICogVGhpcyBtYWtlcyB0aGUgdXNlIGFibGUgdG8gc2hhcmUvY29tbWVudCBvbiB0aGUgbWFya2VkLlxuICovXG5cbmltcG9ydCB2YWxpZGF0ZUZvcm0gZnJvbSAnLi4vbGliL2Zvcm0vdmFsaWRhdGUnO1xuaW1wb3J0IGdldEFsbCBmcm9tICdkcy1hc3NldHMvZG9tL2dldC1hbGwnO1xuXG4vLyBDYWNoZWQgZG9tIGVsZW1lbnRzXG52YXIgJHBvc3RDb250ZW50O1xudmFyICR0b29sVGlwO1xudmFyICR0d2l0dGVyO1xudmFyICRyZXNwb25zZUZvcm07XG52YXIgJGN0YTtcblxuXG4vKipcbiAqIEdldCB0aGUgdGV4dCBzZWxlY3RlZCBieSB0aGUgdXNlclxuICogQHJldHVybiB7c3RyaW5nfVxuICovXG52YXIgZ2V0U2VsZWN0ZWRUZXh0ID0gZnVuY3Rpb24oKSB7XG5cdHZhciB0ZXh0ID0gJyc7XG5cdGlmICh0eXBlb2Ygd2luZG93LmdldFNlbGVjdGlvbiAhPT0gJ3VuZGVmaW5lZCcpIHtcblx0XHR0ZXh0ID0gd2luZG93LmdldFNlbGVjdGlvbigpLnRvU3RyaW5nKCk7XG5cdH0gZWxzZSBpZiAodHlwZW9mIGRvY3VtZW50LnNlbGVjdGlvbiAhPT0gJ3VuZGVmaW5lZCcgJiYgZG9jdW1lbnQuc2VsZWN0aW9uLnR5cGUgPT09ICdUZXh0Jykge1xuXHRcdHRleHQgPSBkb2N1bWVudC5zZWxlY3Rpb24uY3JlYXRlUmFuZ2UoKS50ZXh0O1xuXHR9XG5cdHJldHVybiB0ZXh0O1xufTtcblxuLyoqXG4gKiBDaGVjayBpZiB0aGUgc2VsZWN0ZWQgdGV4dCBpcyBpbnNpZGUgdGhlIGNvbnRlbnQgY29udGFpbmVyXG4gKiBAcGFyYW0gIHtvYmplY3R9ICBzZWxlY3Rpb25cbiAqIEByZXR1cm4ge0Jvb2xlYW59XG4gKi9cbnZhciBpc0luc2lkZUNvbnRlbnQgPSBmdW5jdGlvbihzZWxlY3Rpb24pIHtcblx0dmFyICRjb250YWluZXIgPSBzZWxlY3Rpb24uYW5jaG9yTm9kZS5wYXJlbnRFbGVtZW50O1xuXG5cdHdoaWxlICgkY29udGFpbmVyICE9PSAkcG9zdENvbnRlbnQgJiYgJGNvbnRhaW5lci5wYXJlbnROb2RlKSB7XG5cdFx0JGNvbnRhaW5lciA9ICRjb250YWluZXIucGFyZW50Tm9kZTtcblx0fVxuXG5cdHJldHVybiAoJGNvbnRhaW5lciA9PT0gJHBvc3RDb250ZW50KTtcblxufTtcblxuLyoqXG4gKiBQbGFjZXMgdGhlIHRvb2wgdGlwIGFib3ZlIHRoZSBzZWxlY3RlZCB0ZXh0XG4gKiBAcmV0dXJuIHt2b2lkfVxuICovXG52YXIgcGxhY2VUb29sVGlwID0gZnVuY3Rpb24oKSB7XG5cblx0Ly8gVGltZW91dCB0byBtYWtlIHN1cmUgdGhlIHRleHQgaGFzIGJlZW4gc2VsZWN0ZWRcblx0c2V0VGltZW91dChmdW5jdGlvbigpIHtcblxuXHRcdHZhciBoaWdobGlnaHRlZFRleHQgPSBnZXRTZWxlY3RlZFRleHQoKTtcblxuXHRcdC8vIEhpZGUgdG9vbCB0aXAgaWYgbm90aGluZyBpcyBzZWxlY3RlZFxuXHRcdGlmICghaGlnaGxpZ2h0ZWRUZXh0KSB7XG5cdFx0XHQkdG9vbFRpcC5jbGFzc0xpc3QucmVtb3ZlKCd0b29sLXRpcC0tdmlzaWJsZScpO1xuXHRcdFx0cmV0dXJuO1xuXHRcdH1cblxuXHRcdC8vIERpc3BsYXkgdG9vbCB0aXAgaWYgc2VsZWN0aW9uIGlzIGluc2lkZSB0aGUgY29udGVudCBjb250YWluZXJcblx0XHR2YXIgc2VsZWN0aW9uID0gd2luZG93LmdldFNlbGVjdGlvbigpO1xuXHRcdGlmICghaXNJbnNpZGVDb250ZW50KHNlbGVjdGlvbikpIHtcblx0XHRcdCR0b29sVGlwLmNsYXNzTGlzdC5yZW1vdmUoJ3Rvb2wtdGlwLS12aXNpYmxlJyk7XG5cdFx0XHRyZXR1cm47XG5cdFx0fVxuXG5cdFx0Ly8gQ2hhbmdlIGNvbnRleHR1YWwgYWN0aW9uc1xuXHRcdCR0d2l0dGVyLnNldEF0dHJpYnV0ZSgnaHJlZicsIGBodHRwczovL3R3aXR0ZXIuY29tL2ludGVudC90d2VldD90ZXh0PSR7ZW5jb2RlVVJJQ29tcG9uZW50KCdcIicgKyBoaWdobGlnaHRlZFRleHQgKyAnXCIgLSAnICsgJHR3aXR0ZXIuZGF0YXNldC51cmwpfWApO1xuXG5cdFx0Ly8gU2hvdyBhbmQgcGxhY2UgdG9vbCB0aXBcblx0XHR2YXIgc2Nyb2xsUG9zaXRpb24gPSAod2luZG93LnNjcm9sbFkgfHwgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LnNjcm9sbFRvcCk7XG5cdFx0dmFyIHJhbmdlID0gc2VsZWN0aW9uLmdldFJhbmdlQXQoMCk7XG5cdFx0dmFyIHJlY3QgPSByYW5nZS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcblx0XHQkdG9vbFRpcC5zdHlsZS50b3AgPSAocmVjdC50b3AgKyBzY3JvbGxQb3NpdGlvbikgKyAncHgnO1xuXHRcdCR0b29sVGlwLmNsYXNzTGlzdC5hZGQoJ3Rvb2wtdGlwLS12aXNpYmxlJyk7XG5cdFx0JHRvb2xUaXAuc3R5bGUubGVmdCA9ICgwLjUgKiByZWN0LmxlZnQgKyAwLjUgKiByZWN0LnJpZ2h0IC0gMC41ICogJHRvb2xUaXAuY2xpZW50V2lkdGgpICsgJ3B4Jztcblx0fSwgMTApO1xufTtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24oKSB7XG5cdCRwb3N0Q29udGVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5jb250ZW50Jyk7XG5cdCR0b29sVGlwID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnRvb2wtdGlwJyk7XG5cblx0aWYgKCEkcG9zdENvbnRlbnQgfHwgISR0b29sVGlwKSB7XG5cdFx0cmV0dXJuO1xuXHR9XG5cblx0JHJlc3BvbnNlRm9ybSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5yZXNwb25zZXNfX2Zvcm0nKTtcblx0JGN0YSA9ICRyZXNwb25zZUZvcm0ucXVlcnlTZWxlY3RvcignLmJ0bi0tY3RhJyk7XG5cblx0JHR3aXR0ZXIgPSAkdG9vbFRpcC5xdWVyeVNlbGVjdG9yKCcudG9vbC10aXBfX3R3aXR0ZXInKTtcblxuXHRkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdtb3VzZXVwJywgcGxhY2VUb29sVGlwKTtcblx0ZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcigna2V5dXAnLCBwbGFjZVRvb2xUaXApO1xuXG5cdC8vIEZpbGwgZm9ybSB3aXRoIHNlbGVjdGVkIHRleHQgdG8gbWFrZSBhIHF1aWNrIHJlc3BvbnNlIG9uIHRoZSBhcnRpY2xlIGJ5XG5cdC8vIHRoZSB1c2VyXG5cdHZhciAkcmVzcG9uc2VUZXh0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnJlc3BvbnNlc19fZm9ybSB0ZXh0YXJlYScpO1xuXHQkdG9vbFRpcC5xdWVyeVNlbGVjdG9yKCcudG9vbC10aXBfX3Jlc3BvbnNlJykuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbihlKSB7XG5cdFx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xuXHRcdHZhciBoaWdobGlnaHRlZFRleHQgPSBnZXRTZWxlY3RlZFRleHQoKTtcblx0XHQkcmVzcG9uc2VUZXh0LnZhbHVlID0gYD4gJHtoaWdobGlnaHRlZFRleHR9XG5cbmA7XG5cdFx0JHJlc3BvbnNlVGV4dC5mb2N1cygpO1xuXHRcdCRyZXNwb25zZVRleHQucGFyZW50Tm9kZS5jbGFzc0xpc3QuYWRkKCd2YWxpZGF0ZS0tdmFsaWQnKTtcblx0XHQkcmVzcG9uc2VUZXh0LnBhcmVudE5vZGUuY2xhc3NMaXN0LnJlbW92ZSgndmFsaWRhdGUtLW5vdC12YWxpZCcpO1xuXHRcdHZhciB2YWxpZCA9IHZhbGlkYXRlRm9ybShnZXRBbGwoJy52YWxpZGF0ZScsICRyZXNwb25zZUZvcm0pKTtcblx0XHRpZiAodmFsaWQpIHtcblx0XHRcdCRjdGEuY2xhc3NMaXN0LnJlbW92ZSgnYnRuLS1kaXNhYmxlZCcpO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHQkY3RhLmNsYXNzTGlzdC5hZGQoJ2J0bi0tZGlzYWJsZWQnKTtcblx0XHR9XG5cdH0pO1xufVxuIiwiLyoqXG4gKiBIZWxwZXJzIGZvciBjb21tdW5pY2F0aW5nIHdpdGggdGhlIG1ldGEgYXBpIGhvbGRpbmcgcmVzcG9uc2VzIGFuZCBsaWtlcyBmb3JcbiAqIHRoZSBhcnRpY2xlcy5cbiAqL1xuXG52YXIgYXBpVXJsID0gd2luZG93LmFwaVVSTDtcbnZhciBpZCA9IHdpbmRvdy5wb3N0SWQ7XG5cbi8qKlxuICogTWFrZSBhIEFKQVggY2FsbCB0byB0aGUgYXBpXG4gKiBAcGFyYW0gIHtTdHJpbmd9IHBhdGhcbiAqIEBwYXJhbSAge1N0cmluZ30gbWV0aG9kXG4gKiBAcGFyYW0gIHtvYmplY3R9IGRhdGFcbiAqIEByZXR1cm4ge1Byb21pc2V9XG4gKi9cbnZhciByZXF1ZXN0ID0gZnVuY3Rpb24ocGF0aCA9ICcnLCBtZXRob2QgPSAnR0VUJywgZGF0YSA9IG51bGwpIHtcblxuICB2YXIgZmV0Y2hPcHRpb25zID0ge1xuICAgIG1ldGhvZCxcbiAgICBoZWFkZXJzOiB7XG4gICAgICAnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL2pzb247IGNoYXJzZXQ9dXRmLTgnXG4gICAgfVxuICB9O1xuXG4gIGlmIChkYXRhKSB7XG4gICAgZmV0Y2hPcHRpb25zLmJvZHkgPSBKU09OLnN0cmluZ2lmeShkYXRhKTtcbiAgfVxuXG4gIC8vIFBlcmZvcm0gdGhlIGFqYXggY2FsbFxuICByZXR1cm4gZmV0Y2goYXBpVXJsICsgcGF0aCwgZmV0Y2hPcHRpb25zKVxuICAgIC50aGVuKGZ1bmN0aW9uKHJlc3BvbnNlKSB7XG4gICAgICBpZiAocmVzcG9uc2Uuc3RhdHVzID49IDMwMCkge1xuICAgICAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QocmVzcG9uc2UpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHJlc3BvbnNlO1xuICAgIH0pXG4gICAgLnRoZW4ocmVzcG9uc2UgPT4gcmVzcG9uc2UuanNvbigpKTtcbn07XG5cbi8qKlxuICogR2V0IG1ldGEgZGF0YSBmcm9tIHRoZSBhcnRpY2xlLiBJZiBubyBtZXRhIGRhdGEgaXMgcHJlc2VudCBmb3IgdGhlIGFjdHVhbFxuICogYXJ0aWNsZSBhbmQgbmV3IGVudHJ5IHdpbGwgYmUgbWFkZS5cbiAqIEBwYXJhbSAge2Jvb2xlYW59IHJhdyBXaGV0aGVyIHRvIGluY2x1ZGUgY29tcHV0ZWQgZmllbGRzXG4gKiBAcmV0dXJuIHtQcm9taXNlfVxuICovXG5leHBvcnQgdmFyIGdldE1ldGEgPSBmdW5jdGlvbihyYXcpIHtcbiAgdmFyIHF1ZXJ5ID0gJz9pZD0nICsgaWQ7XG4gIGlmIChyYXcpIHtcbiAgICBxdWVyeSArPSAnJnJhdyc7XG4gIH1cbiAgcmV0dXJuIHJlcXVlc3QocXVlcnkpXG4gICAgLmNhdGNoKGZ1bmN0aW9uKCkge1xuICAgICAgcmV0dXJuIHJlcXVlc3QoJycsICdQT1NUJywge1xuICAgICAgICByZXNwb25zZXM6IFtdLFxuICAgICAgICBsaWtlczogMCxcbiAgICAgICAgaWRcbiAgICAgIH0pO1xuICAgIH0pO1xufTtcblxuZXhwb3J0IHZhciBnZXRTZWFyY2hJbmRleCA9IGZ1bmN0aW9uKHF1ZXJ5KSB7XG4gIHJldHVybiByZXF1ZXN0KCdzZWFyY2g/cT0nICsgcXVlcnkpO1xufTtcblxuLyoqXG4gKiBJbmNyZW1lbnQgdGhlIGxpa2UgdmFsdWUgd2l0aCBvbmVcbiAqIEByZXR1cm4ge1Byb21pc2V9XG4gKi9cbmV4cG9ydCB2YXIgbGlrZSA9IGZ1bmN0aW9uKCkge1xuICByZXR1cm4gZ2V0TWV0YShpZCwgdHJ1ZSlcbiAgICAudGhlbihmdW5jdGlvbihkYXRhKSB7XG4gICAgICByZXR1cm4gcmVxdWVzdCgnP2lkPScgKyBpZCwgJ1BVVCcsIHtcbiAgICAgICAgbGlrZXM6IGRhdGEubGlrZXMgKyAxXG4gICAgICB9KTtcbiAgICB9KTtcbn07XG5cbi8qKlxuICogVXBkYXRlIGF1dGhvciBlbWFpbCB1c2VkIHRvIHNlbmQgZS1tYWlscyB3aGVuIGEgcmVzcG9uc2UgaSByZWNlaXZlZC5cbiAqIEByZXR1cm4ge1Byb21pc2V9XG4gKi9cbmV4cG9ydCB2YXIgdXBkYXRlQXV0aG9yRW1haWwgPSBmdW5jdGlvbihhdXRob3JFbWFpbCkge1xuICBpZiAoIWlkKSB7XG4gICAgcmV0dXJuIFByb21pc2UucmVqZWN0KG5ldyBFcnJvcignTm8gcG9zdElkJykpO1xuICB9XG4gIHJldHVybiByZXF1ZXN0KCc/aWQ9JyArIGlkLCAnUFVUJywge1xuICAgIGF1dGhvckVtYWlsXG4gIH0pO1xufTtcblxuLyoqXG4gKiBBZGQgYSByZXNwb25zZVxuICogQHBhcmFtIHtvYmplY3R9IHJlc3BvbnNlXG4gKiBAcmV0dXJuIHtQcm9taXNlfVxuICovXG5leHBvcnQgdmFyIGFkZFJlc3BvbnNlID0gZnVuY3Rpb24ocmVzcG9uc2UpIHtcbiAgcmV0dXJuIGdldE1ldGEodHJ1ZSlcbiAgICAudGhlbihmdW5jdGlvbihkYXRhKSB7XG5cbiAgICAgIC8vIFNldCB0aGUgcHVibGlzaCBkYXRhIHRvIG5vd1xuICAgICAgcmVzcG9uc2UucHVibGlzaGVkID0gbmV3IERhdGUoKS50b0lTT1N0cmluZygpO1xuXG4gICAgICAvLyBVcGRhdGUgdGhlIHJlc3BvbnNlcyBsaXN0XG4gICAgICBkYXRhLnJlc3BvbnNlcy5wdXNoKHJlc3BvbnNlKTtcbiAgICAgIHJldHVybiByZXF1ZXN0KCc/aWQ9JyArIGlkLCAnUFVUJywge1xuICAgICAgICByZXNwb25zZXM6IGRhdGEucmVzcG9uc2VzXG4gICAgICB9KTtcbiAgICB9KTtcbn07XG5cbi8qKlxuICogUmVtb3ZlIGEgcmVzcG9uc2VcbiAqIEBwYXJhbSAge3N0cmluZ30gcHVibGlzaGVkXG4gKiBAcGFyYW0gIHtzdHJpbmd9IG5hbWVcbiAqIEByZXR1cm4ge1Byb21pc2V9XG4gKi9cbmV4cG9ydCB2YXIgcmVtb3ZlUmVzcG9uc2UgPSBmdW5jdGlvbihwdWJsaXNoZWQsIG5hbWUpIHtcbiAgcmV0dXJuIGdldE1ldGEodHJ1ZSlcbiAgICAudGhlbihmdW5jdGlvbihkYXRhKSB7XG5cbiAgICAgIC8vIFJlbW92ZSByZXNwb3NlIHdoaWNoIG1hdGNoZXMgb24gcHVibGlzaCBkYXRlIGFuZCBhdXRob3IgbmFtZVxuICAgICAgdmFyIHJlc3BvbnNlcyA9IGRhdGEucmVzcG9uc2VzLmZpbHRlcihmdW5jdGlvbihyZXNwb25zZSkge1xuICAgICAgICByZXR1cm4gKHJlc3BvbnNlLnB1Ymxpc2hlZCAhPT0gcHVibGlzaGVkIHx8IHJlc3BvbnNlLm5hbWUgIT09IG5hbWUpO1xuICAgICAgfSk7XG5cbiAgICAgIHJldHVybiByZXF1ZXN0KCc/aWQ9JyArIGlkLCAnUFVUJywge1xuICAgICAgICByZXNwb25zZXNcbiAgICAgIH0pO1xuICAgIH0pO1xufTtcbiIsIi8qKlxuICogVmFsaWRhdGUgaW5wdXQgZmllbGRzIGFzIHVzZXIgdHlwZXNcbiAqL1xuXG4vLyBEZXBlbmRlbmNpZXNcbmltcG9ydCB2YWxpZGF0ZUZvcm0gZnJvbSAnLi92YWxpZGF0ZSc7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uKCR2YWxpZGF0b3JzLCBjYWxsYmFjaykge1xuXHQkdmFsaWRhdG9ycy5mb3JFYWNoKGZ1bmN0aW9uKCR2YWxpZGF0ZUNvbnRhaW5lcikge1xuXHRcdHZhciAkdmFsaWRhdGVGaWVsZCA9ICR2YWxpZGF0ZUNvbnRhaW5lci5xdWVyeVNlbGVjdG9yKCdpbnB1dCwgdGV4dGFyZWEnKTtcblxuXHRcdCR2YWxpZGF0ZUZpZWxkLmFkZEV2ZW50TGlzdGVuZXIoJ2lucHV0JywgZnVuY3Rpb24oKSB7XG5cdFx0XHR2YXIgdmFsaWQgPSB2YWxpZGF0ZUZvcm0oJHZhbGlkYXRvcnMpO1xuXHRcdFx0Y2FsbGJhY2sodmFsaWQpO1xuXHRcdH0pO1xuXHR9KTtcbn1cbiIsIi8qKlxuICogQ2hlY2sgaWYgdGhlIGZvcm0gaXMgdmFsaWRcbiAqL1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbigkdmFsaWRhdG9ycykge1xuXHR2YXIgbm90VmFsaWQgPSAkdmFsaWRhdG9ycy5zb21lKGZ1bmN0aW9uKCR2YWxpZGF0b3IpIHtcblx0XHRpZiAoJHZhbGlkYXRvci5kYXRhc2V0LnZhbGlkYXRlUmVxdWlyZWQgIT09IHVuZGVmaW5lZCkge1xuXHRcdFx0cmV0dXJuICEkdmFsaWRhdG9yLmNsYXNzTGlzdC5jb250YWlucygndmFsaWRhdGUtLXZhbGlkJyk7XG5cdFx0fSBlbHNlIHtcblx0XHRcdHJldHVybiAkdmFsaWRhdG9yLmNsYXNzTGlzdC5jb250YWlucygndmFsaWRhdGUtLW5vdC12YWxpZCcpO1xuXHRcdH1cblx0fSk7XG5cblx0cmV0dXJuICFub3RWYWxpZDtcbn1cbiIsIi8qKlxuICogQ2hlY2sgaWYgdXNlciBpcyBsb2dnZWQgaW4gdXNpbmcgdGhlIGdob3N0IHNlc3Npb24uIElmIGxvZ2dlZCBpbiBnZXQgdXNlclxuICogZGF0YS5cbiAqL1xuXG4vLyBDYWNoZWQgcHJvbWlzZVxudmFyIGRhdGFQcm9taXNlO1xuXG4vKipcbiAqIEdldCB0aGUgZGF0YSBmb3IgdGhlIGxvZ2dlZCBpbiB1c2VkXG4gKiBAcGFyYW0gIHtzdHJpbmd9IHRva2VuXG4gKiBAcmV0dXJuIHtQcm9taXNlfVxuICovXG52YXIgZ2V0VXNlckRhdGEgPSBmdW5jdGlvbih0b2tlbikge1xuXHRyZXR1cm4gZmV0Y2goJy9naG9zdC9hcGkvdjAuMS91c2Vycy9tZS8/aW5jbHVkZT1yb2xlcyZzdGF0dXM9YWxsJywge1xuXHRcdG1ldGhvZDogJ0dFVCcsXG5cdFx0aGVhZGVyczoge1xuXHRcdFx0J0F1dGhvcml6YXRpb24nOiAnQmVhcmVyICcgKyB0b2tlblxuXHRcdH1cblx0fSkudGhlbihmdW5jdGlvbihyZXNwb25zZSkge1xuXHRcdGlmIChyZXNwb25zZS5zdGF0dXMgIT09IDIwMCkge1xuXHRcdFx0cmV0dXJuIFByb21pc2UucmVqZWN0KCdPbGQgc2Vzc2lvbicpO1xuXHRcdH1cblx0XHRyZXR1cm4gcmVzcG9uc2UuanNvbigpO1xuXHR9KS50aGVuKGZ1bmN0aW9uKGRhdGEpIHtcblx0XHRyZXR1cm4gZGF0YS51c2Vyc1swXTtcblx0fSk7XG59O1xuXG4vKipcbiAqIENoZWNrIGlmIHRoZXJlIGlzIGEgR2hvc3Qgc2Vzc2lvbi4gSWYgc28gdXNlIGl0IHRvIGdldCB0aGUgdXNlcnMgZGF0YS5cbiAqIEByZXR1cm4ge1Byb21pc2V9XG4gKi9cbnZhciBnZXQgPSBmdW5jdGlvbigpIHtcblxuXHQvLyBHaG9zdCBzdG9yZXMgaXQgc2Vzc2lvbiBpbiBsb2NhbFN0b3JhZ2Vcblx0dmFyIHNlc3Npb25TdHJpbmcgPSBsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnZ2hvc3Q6c2Vzc2lvbicpO1xuXHRpZiAoIXNlc3Npb25TdHJpbmcpIHtcblx0XHRyZXR1cm4gUHJvbWlzZS5yZWplY3QoJ05vIHNlc3Npb24nKTtcblx0fVxuXG5cdC8vIFZhbGlkIHNlc3Npb24/XG5cdHZhciBzZXNzaW9uID0gSlNPTi5wYXJzZShzZXNzaW9uU3RyaW5nKTtcblx0aWYgKCFzZXNzaW9uIHx8ICFzZXNzaW9uLmF1dGhlbnRpY2F0ZWQgfHwgIXNlc3Npb24uYXV0aGVudGljYXRlZC5hY2Nlc3NfdG9rZW4pIHtcblx0XHRyZXR1cm4gUHJvbWlzZS5yZWplY3QoJ05vIHNlc3Npb24nKTtcblx0fVxuXG5cdC8vIFNlc3Npb24gZXhwaXJlZD9cblx0aWYgKHNlc3Npb24uYXV0aGVudGljYXRlZC5leHBpcmVzX2F0IDwgRGF0ZS5ub3coKSkge1xuXHRcdHJldHVybiBQcm9taXNlLnJlamVjdCgnU2Vzc2lvbiBleHBpcmVkJyk7XG5cdH1cblxuXHRyZXR1cm4gZ2V0VXNlckRhdGEoc2Vzc2lvbi5hdXRoZW50aWNhdGVkLmFjY2Vzc190b2tlbik7XG5cbn07XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uKCkge1xuXG5cdC8vIFJldHVybiBjYWNoZWQgcHJvbWlzZSBpZiBhbHJlYWR5IGNhbGxlZFxuXHRpZiAoIWRhdGFQcm9taXNlKSB7XG5cdFx0ZGF0YVByb21pc2UgPSBnZXQoKTtcblx0fVxuXHRyZXR1cm4gZGF0YVByb21pc2U7XG59XG4iLCIvKipcbiAqIEVuY29kZSBhIHN0cmluZ1xuICogQHBhcmFtICB7c3RyaW5nfSBzdHJpbmdcbiAqIEByZXR1cm4ge3N0cmluZ31cbiAqL1xuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24oc3RyaW5nKSB7XG5cdHZhciBodG1sRW5jb2RlZFZhbHVlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2JykuYXBwZW5kQ2hpbGQoXG5cdFx0ZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoc3RyaW5nKSkucGFyZW50Tm9kZS5pbm5lckhUTUw7XG5cdHJldHVybiBodG1sRW5jb2RlZFZhbHVlLnJlcGxhY2UoL1xccj9cXG4vZywgJzxicj4nKTtcbn1cbiIsImltcG9ydCBnZXRBbGwgZnJvbSAnZHMtYXNzZXRzL2RvbS9nZXQtYWxsJztcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihyYXcpIHtcblx0dmFyICRjb250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcblx0JGNvbnRhaW5lci5pbm5lckhUTUwgPSByYXc7XG5cdGdldEFsbCgnaW1nJywgJGNvbnRhaW5lcikuZm9yRWFjaChmdW5jdGlvbigkaW1nKSB7XG5cdFx0dmFyICRpbWdXcmFwcGVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG5cdFx0JGltZ1dyYXBwZXIuY2xhc3NMaXN0LmFkZCgnaW1nLXdyYXBwZXInKTtcblx0XHQkaW1nV3JhcHBlci5pbm5lckhUTUwgPSAnPGRpdiBjbGFzcz1cImltZy1jb250YWluZXJcIj48aW1nPjwvZGl2Pic7XG5cdFx0dmFyIHNyYyA9ICRpbWcuZ2V0QXR0cmlidXRlKCdzcmMnKTtcblx0XHR2YXIgYWx0ID0gJGltZy5nZXRBdHRyaWJ1dGUoJ2FsdCcpO1xuXHRcdHZhciBwYWRkaW5nID0gNTA7XG5cblx0XHQvLyBMYXp5IGxvYWQgYWxsIGJ1dCB0aGUgZmlyc3QgaW1hZ2Vcblx0XHR2YXIgJG5ld0ltZyA9ICRpbWdXcmFwcGVyLnF1ZXJ5U2VsZWN0b3IoJ2ltZycpO1xuXG5cdFx0JG5ld0ltZy5zZXRBdHRyaWJ1dGUoJ2RhdGEtc3JjJywgc3JjKTtcblx0XHQkbmV3SW1nLnNldEF0dHJpYnV0ZSgnY2xhc3MnLCAnbGF6eS1pbWFnZScpO1xuXG5cdFx0YWx0LnNwbGl0KCc7JykuZm9yRWFjaChmdW5jdGlvbihzdHIpIHtcblx0XHRcdGlmIChzdHIgPT09ICdmdWxsLXNpemUnIHx8IHN0ciA9PT0gJ2Z1bGwtd2lkdGgnKSB7XG5cdFx0XHRcdCRpbWdXcmFwcGVyLmNsYXNzTGlzdC5hZGQoJ2Z1bGwtd2lkdGgnKTtcblx0XHRcdH0gZWxzZSBpZiAoc3RyLmluZGV4T2YoJ3JhdGlvPScpID09PSAwKSB7XG5cdFx0XHRcdHZhciByYXRpbyA9IHN0ci5yZXBsYWNlKCdyYXRpbz0nLCAnJyk7XG5cdFx0XHRcdGlmIChyYXRpby5pbmRleE9mKCc6JykpIHtcblx0XHRcdFx0XHR2YXIgZGltZW5zaW9ucyA9IHJhdGlvLnNwbGl0KCc6Jyk7XG5cdFx0XHRcdFx0cmF0aW8gPSBkaW1lbnNpb25zWzBdIC8gZGltZW5zaW9uc1sxXTtcblx0XHRcdFx0fVxuXHRcdFx0XHRwYWRkaW5nID0gMTAwIC8gcmF0aW87XG5cdFx0XHR9IGVsc2UgaWYgKHN0ciA9PT0gJ2JvcmRlcnMnKSB7XG5cdFx0XHRcdCRpbWdXcmFwcGVyLnF1ZXJ5U2VsZWN0b3IoJy5pbWctY29udGFpbmVyJykuY2xhc3NMaXN0LmFkZCgnaW1nLWNvbnRhaW5lci0tYm9yZGVycycpO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0YWx0ID0gc3RyO1xuXHRcdFx0fVxuXHRcdH0pO1xuXG5cdFx0JG5ld0ltZy5zZXRBdHRyaWJ1dGUoJ2FsdCcsIGFsdCk7XG5cdFx0JG5ld0ltZy5zZXRBdHRyaWJ1dGUoJ3RpdGxlJywgJGltZy5nZXRBdHRyaWJ1dGUoJ3RpdGxlJykpO1xuXG5cdFx0JGltZ1dyYXBwZXIucXVlcnlTZWxlY3RvcignLmltZy1jb250YWluZXInKVxuXHRcdFx0LnNldEF0dHJpYnV0ZSgnc3R5bGUnLCAncGFkZGluZy1ib3R0b206JyArIHBhZGRpbmcgKyAnJScpO1xuXG5cdFx0JGltZy5wYXJlbnROb2RlLm91dGVySFRNTCA9ICRpbWdXcmFwcGVyLm91dGVySFRNTDtcblx0fSk7XG5cdHJldHVybiAkY29udGFpbmVyLmlubmVySFRNTDtcbn07XG4iLCJpbXBvcnQgc3RyaXBUYWdzIGZyb20gJy4vc3RyaXAtaHRtbC10YWdzJztcbmltcG9ydCB3b3JkQ291bnQgZnJvbSAnd29yZC1jb3VudCc7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uKGh0bWwpIHtcblx0dmFyIHRleHQgPSBzdHJpcFRhZ3MoaHRtbCk7XG5cdHZhciB3b3JkcyA9IHdvcmRDb3VudCh0ZXh0KTtcblx0dmFyIHJlYWRUaW1lID0gTWF0aC5jZWlsKHdvcmRzIC8gMzAwKTtcblxuXHR2YXIgYWZmaXggPSAnIG1pbic7XG5cdGlmIChyZWFkVGltZSA+IDEpIHtcblx0XHRhZmZpeCArPSAncyc7XG5cdH1cblxuXHRyZXR1cm4gcmVhZFRpbWUgKyBhZmZpeDtcbn1cbiIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uKGh0bWwpIHtcblx0dmFyIHRtcCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuXHR0bXAuaW5uZXJIVE1MID0gaHRtbDtcblx0cmV0dXJuIHRtcC50ZXh0Q29udGVudCB8fCB0bXAuaW5uZXJUZXh0IHx8ICcnO1xufVxuIiwiLyoqXG4gKiBNYWluIGVudHJ5IGZvciB0aGUgamF2YXNjcmlwdC5cbiAqIEltcG9ydCBtb2R1bGVzIGFuZCBzdGFydCB0aGVtXG4gKi9cblxuaW1wb3J0IGxhenlJbWFnZXMgZnJvbSAnZHMtYXNzZXRzL2xhenkvaW1hZ2VzJztcbmltcG9ydCBnZXRBbGwgZnJvbSAnZHMtYXNzZXRzL2RvbS9nZXQtYWxsJztcbmltcG9ydCB2YWxpZGF0ZUlucHV0RmllbGRzIGZyb20gJ2RzLWFzc2V0cy92YWxpZGF0ZS9pbnB1dC1maWVsZHMnO1xuaW1wb3J0IG5hdmlnYXRpb24gZnJvbSAnLi9jb21wb25lbnRzL25hdmlnYXRpb24nO1xuaW1wb3J0IHJlc3BvbnNlIGZyb20gJy4vY29tcG9uZW50cy9yZXNwb25zZSc7XG5pbXBvcnQgdG9vbFRpcCBmcm9tICcuL2NvbXBvbmVudHMvdG9vbC10aXAnO1xuaW1wb3J0IHNlYXJjaCBmcm9tICcuL2NvbXBvbmVudHMvc2VhcmNoJztcbmltcG9ydCBnZXRMb2dnZWRJbkRhdGEgZnJvbSAnLi9saWIvZ2V0LWxvZ2dlZC1pbi1kYXRhJztcbmltcG9ydCAqIGFzIGFwaSBmcm9tICcuL2xpYi9hcGknO1xuXG5uYXZpZ2F0aW9uKCk7XG50b29sVGlwKCk7XG5zZWFyY2goKTtcblxuZ2V0QWxsKCdpbWcnKS5mb3JFYWNoKGZ1bmN0aW9uKCRpbWcpIHtcblx0JGltZy5vbmxvYWQgPSBmdW5jdGlvbigpIHtcblx0XHR0aGlzLmNsYXNzTGlzdC5hZGQoJ2FuaW1hdGUtLWFjdGl2ZScpO1xuXHR9O1xufSk7XG5sYXp5SW1hZ2VzKDEpO1xudmFsaWRhdGVJbnB1dEZpZWxkcygpO1xucmVzcG9uc2UoKTtcbmdldExvZ2dlZEluRGF0YSgpLnRoZW4oZnVuY3Rpb24odXNlcikge1xuXHR2YXIgJGJvZHkgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdib2R5Jyk7XG5cblx0JGJvZHkuY2xhc3NMaXN0LmFkZCgndXNlci1sb2dnZWQtaW4nKTtcblxuXHQvLyBBZG1pbiBsb2dnZWQgaW5cblx0dmFyIGFkbWluID0gdXNlci5yb2xlcy5zb21lKGZ1bmN0aW9uKHJvbGUpIHtcblx0XHRyZXR1cm4gKHJvbGUubmFtZSA9PT0gJ093bmVyJyB8fCByb2xlLm5hbWUgPT09ICdBZG1pbmlzdHJhdG9yJyk7XG5cdH0pO1xuXHRpZiAoYWRtaW4pIHtcblx0XHQkYm9keS5jbGFzc0xpc3QuYWRkKCdhZG1pbi1sb2dnZWQtaW4nKTtcblx0fVxuXG5cdC8vIEF1dGhvciBsb2dnZWQgaW5cblx0aWYgKHVzZXIubmFtZSA9PT0gd2luZG93LmF1dGhvck5hbWUpIHtcblx0XHQkYm9keS5jbGFzc0xpc3QuYWRkKCdhdXRob3ItbG9nZ2VkLWluJyk7XG5cdFx0cmV0dXJuIGFwaS51cGRhdGVBdXRob3JFbWFpbCh1c2VyLmVtYWlsKTtcblx0fVxufSkuY2F0Y2goZnVuY3Rpb24oKSB7fSk7XG4iLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbihhdXRob3IpIHtcblxuXHR2YXIgYXV0aG9ySW1hZ2UgPSAnJztcblx0aWYgKGF1dGhvci5pbWFnZSkge1xuXHRcdGF1dGhvckltYWdlID0gYDx0ZCB3aWR0aD1cIjUlXCI+PGltZyBzcmM9XCIke2F1dGhvci5pbWFnZX1cIiBjbGFzcz1cImF1dGhvcl9faW1hZ2Ugcm91bmQtaW1nXCI+PC90ZD5gO1xuXHR9XG5cblx0dmFyIGNvdmVySW1hZ2UgPSAnJztcblx0aWYgKGF1dGhvci5jb3Zlcikge1xuXHRcdGNvdmVySW1hZ2UgPSBgXG48aW1nIGRhdGEtc3JjPVwiJHthdXRob3IuY292ZXJ9XCIgY2xhc3M9XCJsYXp5LWltYWdlIGZ1bGwtd2lkdGggaW1nLWZ1bGwtd2lkdGhcIiBhbHQ9XCIke2F1dGhvci5uYW1lfVwiID5cbmA7XG5cdH1cblxuXHRyZXR1cm4gYFxuPGFydGljbGUgY2xhc3M9XCJib3hlc19faXRlbSBzbWFsbCBhbmltYXRlIGFuaW1hdGVfX2ZhZGUtaW5cIj5cbiAgPGhlYWRlciBjbGFzcz1cImF1dGhvclwiPlxuICAgICAgPHRhYmxlPlxuICAgICAgICAgIDx0cj5cbiAgICAgICAgICAgICAgJHthdXRob3JJbWFnZX1cbiAgICAgICAgICAgICAgPHRkPjxzcGFuIGNsYXNzPVwiYXV0aG9yX19uYW1lXCI+PGEgaHJlZj1cIi9hdXRob3IvJHthdXRob3Iuc2x1Z31cIj4ke2F1dGhvci5uYW1lfTwvYT48L3NwYW4+PGJyPlxuICAgICAgICAgICAgICBcdCR7YXV0aG9yLmNvdW50LnBvc3RzfSBhcnRpY2xlc1xuICAgICAgICAgICAgICA8L3RkPlxuICAgICAgICAgIDwvdHI+XG4gICAgICA8L3RhYmxlPlxuICA8L2hlYWRlcj5cbiAgJHtjb3ZlckltYWdlfVxuICA8cD4ke2F1dGhvci5iaW8gfHwgJyd9PC9wPlxuICA8cD48YSBocmVmPVwiL2F1dGhvci8ke2F1dGhvci5zbHVnfS9cIiBjbGFzcz1cImJ0blwiPkFydGljbGVzIGJ5IGF1dGhvcjwvYT48L3A+XG48L2FydGljbGU+XG5gO1xufVxuIiwiaW1wb3J0IGltYWdlQ29udmVydGVkIGZyb20gJy4uL2xpYi9pbWFnZS1jb252ZXJ0ZXInO1xuaW1wb3J0IHJlYWRUaW1lIGZyb20gJy4uL2xpYi9yZWFkLXRpbWUnO1xuaW1wb3J0IGVwb2NoVG9UaW1lYWdvIGZyb20gJ2Vwb2NoLXRvLXRpbWVhZ28nO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbihwb3N0KSB7XG5cblx0dmFyIGF1dGhvckltYWdlID0gJyc7XG5cdGlmIChwb3N0LmF1dGhvci5pbWFnZSkge1xuXHRcdGF1dGhvckltYWdlID0gYDx0ZCB3aWR0aD1cIjUlXCI+PGltZyBzcmM9XCIke3Bvc3QuYXV0aG9yLmltYWdlfVwiIGNsYXNzPVwiYXV0aG9yX19pbWFnZSByb3VuZC1pbWdcIj48L3RkPmA7XG5cdH1cblxuXHR2YXIgdGFncyA9ICcnO1xuXHRpZiAocG9zdC50YWdzKSB7XG5cdFx0dGFncyA9ICc8YnI+PHNwYW4gY2xhc3M9XCJ0YWdzXCI+JyArIHBvc3QudGFncy5tYXAoZnVuY3Rpb24odGFnKSB7XG5cdFx0XHRyZXR1cm4gYDxhIGhyZWY9XCIvdGFnLyR7dGFnLnNsdWd9L1wiPiR7dGFnLm5hbWV9PC9hPmA7XG5cdFx0fSkuam9pbignJykgKyAnPC9zcGFuPic7XG5cdH1cblxuXHR2YXIgcHVibGlzaGVkID0gbmV3IERhdGUocG9zdC5wdWJsaXNoZWRfYXQpLmdldFRpbWUoKTtcblx0dmFyIG5vdyA9IERhdGUubm93KCk7XG5cdHZhciB0aW1lQWdvID0gZXBvY2hUb1RpbWVhZ28udGltZUFnbyhwdWJsaXNoZWQsIG5vdyk7XG5cblx0dmFyIGh0bWwgPSBpbWFnZUNvbnZlcnRlZChwb3N0Lmh0bWwpO1xuXHR2YXIgZXhjZXJwdCA9IGh0bWwuc3Vic3RyKDAsIGh0bWwuaW5kZXhPZignPC9wPicpICsgNCk7XG5cblx0cmV0dXJuIGBcbjxhcnRpY2xlIGNsYXNzPVwiYm94ZXNfX2l0ZW0gc21hbGwgYW5pbWF0ZSBhbmltYXRlX19mYWRlLWluXCI+XG4gIDxoZWFkZXIgY2xhc3M9XCJhdXRob3JcIj5cbiAgICAgIDx0YWJsZT5cbiAgICAgICAgICA8dHI+XG4gICAgICAgICAgICAgICR7YXV0aG9ySW1hZ2V9XG4gICAgICAgICAgICAgIDx0ZD48c3BhbiBjbGFzcz1cImF1dGhvcl9fbmFtZVwiPjxhIGhyZWY9XCIvYXV0aG9yLyR7cG9zdC5hdXRob3Iuc2x1Z31cIj4ke3Bvc3QuYXV0aG9yLm5hbWV9PC9hPjwvc3Bhbj48YnI+XG4gICAgICAgICAgICAgICR7dGltZUFnb30gJm1pZGRvdDsgJHtyZWFkVGltZShwb3N0Lmh0bWwpfSByZWFkJHt0YWdzfTwvdGQ+XG4gICAgICAgICAgPC90cj5cbiAgICAgIDwvdGFibGU+XG4gIDwvaGVhZGVyPlxuICAke2V4Y2VycHR9XG4gIDxwPjxhIGhyZWY9XCIvJHtwb3N0LnNsdWd9L1wiIGNsYXNzPVwiYnRuXCI+UmVhZCBhcnRpY2xlPC9hPjwvcD5cbjwvYXJ0aWNsZT5cbmA7XG59XG4iLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbih1c2VyKSB7XG5cdHZhciBpbWFnZSA9ICcnO1xuXHRpZiAodXNlci5pbWFnZSkge1xuXHRcdGltYWdlID0gYFxuPHRkIHdpZHRoPVwiNSVcIj48aW1nIGRhdGEtc3JjPVwiJHt1c2VyLmltYWdlfVwiIGNsYXNzPVwiYXV0aG9yX19pbWFnZSBhdXRob3JfX2ltYWdlLS1zbWFsbCBsYXp5LWltYWdlIGltZy1iZyByb3VuZC1pbWdcIj48L3RkPlxuXHRcdGA7XG5cdH1cblxuXHRyZXR1cm4gYFxuPGRpdiBjbGFzcz1cImF1dGhvciBzbWFsbFwiPlxuICA8dGFibGU+PHRib2R5Pjx0cj5cblx0XHQke2ltYWdlfVxuICAgIDx0ZD5cbiAgICAgIDxzcGFuIGNsYXNzPVwiYXV0aG9yX19uYW1lXCI+JHt1c2VyLm5hbWV9PC9zcGFuPlxuICAgIDwvdGQ+XG4gIDwvdHI+PC90Ym9keT48L3RhYmxlPlxuPC9kaXY+XG5gO1xufVxuIiwiaW1wb3J0IGVuY29kZSBmcm9tICcuLi9saWIvaHRtbC1lbmNvZGUnO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbihyZXNwb25zZSkge1xuXG4gIHZhciBjbGFzc2VzID0gJ3Jlc3BvbnNlIGJveGVzX19pdGVtJztcbiAgaWYgKHJlc3BvbnNlLm5hbWUudG9Mb3dlckNhc2UoKSA9PT0gd2luZG93LmF1dGhvck5hbWUudG9Mb3dlckNhc2UoKSkge1xuICAgIGNsYXNzZXMgKz0gJyBib3hlc19faXRlbS0tdHJhbnNwYXJlbnQnO1xuICB9XG5cbiAgdmFyIGltYWdlID0gJyc7XG4gIGlmIChyZXNwb25zZS5pbWFnZSkge1xuICAgIGltYWdlID0gYDx0ZCB3aWR0aD1cIjUlXCI+PGltZyBkYXRhLXNyYz1cIiR7cmVzcG9uc2UuaW1hZ2V9XCIgY2xhc3M9XCJhdXRob3JfX2ltYWdlIGF1dGhvcl9faW1hZ2UtLXNtYWxsIGxhenktaW1hZ2UgaW1nLWJnIHJvdW5kLWltZ1wiPjwvdGQ+YDtcbiAgfVxuXG4gIHZhciByZWFkVGltZSA9ICcnO1xuICBpZiAocmVzcG9uc2UucmVhZFRpbWUpIHtcbiAgICByZWFkVGltZSA9IGAgJm1pZGRvdDsgJHtyZXNwb25zZS5yZWFkVGltZX0gcmVhZGA7XG4gIH1cblxuICB2YXIgZXhjZXJwdCA9IHJlc3BvbnNlLmV4Y2VycHQgfHwgcmVzcG9uc2UuaHRtbDtcblxuICB2YXIgcmVhZE1vcmUgPSAnJztcbiAgaWYgKHJlc3BvbnNlLmV4Y2VycHQpIHtcbiAgICByZWFkTW9yZSA9IGBcbjxkaXYgY2xhc3M9XCJyZXNwb25zZV9fdGV4dCBoaWRkZW5cIj4ke3Jlc3BvbnNlLmh0bWx9PC9kaXY+XG48cD48YSBocmVmPVwiI1wiIGNsYXNzPVwiYnRuIHJlc3BvbnNlX19yZWFkLW1vcmVcIj5SZWFkIG1vcmU8L2E+PC9wPlxuYDtcbiAgfVxuXG4gIHZhciBuYW1lID0gYCR7ZW5jb2RlKHJlc3BvbnNlLm5hbWUpfWA7XG4gIGlmIChyZXNwb25zZS53ZWJzaXRlKSB7XG4gICAgbmFtZSA9IGA8YSBocmVmPVwiJHtlbmNvZGUocmVzcG9uc2Uud2Vic2l0ZSl9XCI+JHtuYW1lfTwvYT5gO1xuICB9XG5cbiAgcmV0dXJuIGBcbjxkaXYgY2xhc3M9XCIke2NsYXNzZXN9IHNtYWxsXCI+XG4gIDxkaXYgY2xhc3M9XCJhdXRob3JcIj5cbiAgICA8dGFibGU+XG4gICAgICA8dHI+XG4gICAgICAgICR7aW1hZ2V9XG4gICAgICAgIDx0ZD5cbiAgICAgICAgICA8c3BhbiBjbGFzcz1cImF1dGhvcl9fbmFtZVwiPiR7bmFtZX08L3NwYW4+PGJyPlxuICAgICAgICAgICR7cmVzcG9uc2UudGltZUFnb30ke3JlYWRUaW1lfVxuICAgICAgICA8L3RkPlxuICAgICAgPC90cj5cbiAgICA8L3RhYmxlPlxuICA8L2Rpdj5cbiAgPGEgaHJlZj1cIiNcIiBjbGFzcz1cInJlc3BvbnNlX19kZWxldGVcIiBkYXRhLXB1Ymxpc2hlZD1cIiR7cmVzcG9uc2UucHVibGlzaGVkfVwiIGRhdGEtbmFtZT1cIiR7cmVzcG9uc2UubmFtZX1cIj48aW1nIGRhdGEtc3JjPVwiL2Fzc2V0cy9pbWFnZXMvdHJhc2guc3ZnXCIgY2xhc3M9XCJsYXp5LWltYWdlXCI+PC9hPlxuICA8ZGl2IGNsYXNzPVwicmVzcG9uc2VfX2V4Y2VycHRcIj4ke2V4Y2VycHR9PC9kaXY+XG4gICR7cmVhZE1vcmV9XG48L2Rpdj5gO1xufVxuIiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24odGFnKSB7XG5cbiAgY29uc29sZS5sb2codGFnKTtcblxuICB2YXIgY292ZXJJbWFnZSA9ICcnO1xuICBpZiAodGFnLmltYWdlKSB7XG4gICAgY292ZXJJbWFnZSA9IGBcbjxpbWcgZGF0YS1zcmM9XCIke3RhZy5pbWFnZX1cIiBjbGFzcz1cImxhenktaW1hZ2UgZnVsbC13aWR0aCBpbWctZnVsbC13aWR0aFwiIGFsdD1cIiR7dGFnLm5hbWV9XCIgPlxuYDtcbiAgfVxuXG4gIHJldHVybiBgXG48YXJ0aWNsZSBjbGFzcz1cImJveGVzX19pdGVtIHNtYWxsIGFuaW1hdGUgYW5pbWF0ZV9fZmFkZS1pblwiPlxuICA8aGVhZGVyIGNsYXNzPVwiYXV0aG9yXCI+XG4gICAgICA8dGFibGU+XG4gICAgICAgICAgPHRyPlxuICAgICAgICAgICAgICA8dGQ+PHNwYW4gY2xhc3M9XCJhdXRob3JfX25hbWVcIj48YSBocmVmPVwiL3RhZy8ke3RhZy5zbHVnfVwiPiR7dGFnLm5hbWV9PC9hPjwvc3Bhbj48YnI+XG4gICAgICAgICAgICAgIFx0JHt0YWcuY291bnQucG9zdHN9IGFydGljbGVzXG4gICAgICAgICAgICAgIDwvdGQ+XG4gICAgICAgICAgPC90cj5cbiAgICAgIDwvdGFibGU+XG4gIDwvaGVhZGVyPlxuICAke2NvdmVySW1hZ2V9XG4gIDxwPiR7dGFnLmRlc2NyaXB0aW9uIHx8ICcnfTwvcD5cbiAgPHA+PGEgaHJlZj1cIi90YWcvJHt0YWcuc2x1Z30vXCIgY2xhc3M9XCJidG5cIj5BcnRpY2xlcyBpbiBjYXRlZ29yeTwvYT48L3A+XG48L2FydGljbGU+XG5gO1xufVxuIiwiLyoqXG4gKiBXb3JkIENvdW50XG4gKlxuICogV29yZCBjb3VudCBpbiByZXNwZWN0IG9mIENKSyBjaGFyYWN0ZXJzLlxuICpcbiAqIENvcHlyaWdodCAoYykgMjAxNSBieSBIc2lhb21pbmcgWWFuZy5cbiAqL1xuXG52YXIgcGF0dGVybiA9IC9bYS16QS1aMC05X1xcdTAzOTItXFx1MDNjOVxcdTAwYzAtXFx1MDBmZlxcdTA2MDAtXFx1MDZmZl0rfFtcXHU0ZTAwLVxcdTlmZmZcXHUzNDAwLVxcdTRkYmZcXHVmOTAwLVxcdWZhZmZcXHUzMDQwLVxcdTMwOWZcXHVhYzAwLVxcdWQ3YWZdKy9nO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChkYXRhKSB7XG4gIHZhciBtID0gZGF0YS5tYXRjaChwYXR0ZXJuKTtcbiAgdmFyIGNvdW50ID0gMDtcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBtLmxlbmd0aDsgaSsrKSB7XG4gICAgaWYgKG1baV0uY2hhckNvZGVBdCgwKSA+PSAweDRlMDApIHtcbiAgICAgIGNvdW50ICs9IG1baV0ubGVuZ3RoO1xuICAgIH0gZWxzZSB7XG4gICAgICBjb3VudCArPSAxO1xuICAgIH1cbiAgfVxuICByZXR1cm4gY291bnQ7XG59O1xuIiwiLyoqXG4gKiBNYWtlIHN1cmUgYSBmdW5jdGlvbiBvbmx5IGlzIHJ1biBldmVyeSB4IG1zXG4gKiBAcGFyYW0gIHtGdW5jdGlvbn0gY2FsbGJhY2sgTWV0aG9kIHRvIGV4ZWN1dGUgaWYgaXQgaXMgbm90IGRlYm91bmNlZFxuICogQHBhcmFtICB7aW50ZWdlcn0gIHRpbWVvdXQgIE1pbGxpc2Vjb25kcyB0byB3YWl0IGJlZm9yZSBuZXh0IGFsbG93ZWQgY2FsbGJhY2suIERlZmF1bHRzIHRvIHRoZSBhbmltYXRpb24gZnJhbWUgcmF0ZSBpbiB0aGUgYnJvd3NlclxuICogQHJldHVybiB7dm9pZH1cbiAqL1xuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24oY2FsbGJhY2ssIHRpbWVvdXQpIHtcbiAgdmFyIHBlbmRpbmcgPSBmYWxzZTtcbiAgdmFyIGRvbmUgPSAoKSA9PiB7XG4gICAgcGVuZGluZyA9IGZhbHNlO1xuICB9O1xuICByZXR1cm4gZnVuY3Rpb24oKSB7XG4gICAgaWYgKHBlbmRpbmcpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgcGVuZGluZyA9IHRydWU7XG4gICAgY2FsbGJhY2suYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgICBpZiAoIXRpbWVvdXQpIHtcbiAgICAgIHdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUoZG9uZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHdpbmRvdy5zZXRUaW1lb3V0KGRvbmUsIHRpbWVvdXQpO1xuICAgIH1cbiAgfTtcbn1cbiIsIi8qKlxuICogRGVsYXkgYSBmdW5jdGlvbiBhbmQgb25seSBydW4gb25jZVxuICogQHBhcmFtICB7RnVuY3Rpb259IGNhbGxiYWNrIE1ldGhvZCB0byBleGVjdXRlIGlmIGl0IGlzIG5vdCBkZWJvdW5jZWRcbiAqIEBwYXJhbSAge2ludGVnZXJ9ICB0aW1lb3V0ICBNaWxsaXNlY29uZHMgdG8gd2FpdCBiZWZvcmUgbmV4dCBhbGxvd2VkIGNhbGxiYWNrLiBEZWZhdWx0cyB0byB0aGUgYW5pbWF0aW9uIGZyYW1lIHJhdGUgaW4gdGhlIGJyb3dzZXJcbiAqIEByZXR1cm4ge3ZvaWR9XG4gKi9cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uKGNhbGxiYWNrLCB0aW1lb3V0KSB7XG4gIHZhciBwZW5kaW5nID0gZmFsc2U7XG4gIHZhciBkb25lID0gKCkgPT4ge1xuICAgIGNhbGxiYWNrLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgcGVuZGluZyA9IGZhbHNlO1xuICB9O1xuICByZXR1cm4gZnVuY3Rpb24oKSB7XG4gICAgaWYgKHBlbmRpbmcpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgcGVuZGluZyA9IHRydWU7XG4gICAgaWYgKCF0aW1lb3V0KSB7XG4gICAgICB3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lKGRvbmUpO1xuICAgIH0gZWxzZSB7XG4gICAgICB3aW5kb3cuc2V0VGltZW91dChkb25lLCB0aW1lb3V0KTtcbiAgICB9XG4gIH07XG59XG4iLCIvKipcbiAqIEdldCBhbiBhcnJheSBvZiBkb20gZWxlbWVudHMgbWF0Y2hpbmcgdGhlIHNlbGVjdG9yXG4gKiBAcGFyYW0gIHtzdHJpbmd9ICAgICBzZWxlY3RvclxuICogQHBhcmFtICB7RE9NZWxlbWVudH0gRE9NIGVsZW1lbnQgdG8gc2VhcmNoIGluLiBEZWZhdWx0cyB0byBkb2N1bWVudFxuICogQHJldHVybiB7YXJyYXl9XG4gKi9cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uKHNlbGVjdG9yLCAkcm9vdCA9IGRvY3VtZW50KSB7XG4gIHJldHVybiBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbCgkcm9vdC5xdWVyeVNlbGVjdG9yQWxsKHNlbGVjdG9yKSk7XG59XG4iLCIvKipcbiAqIEdldCB0aGUgZWxlbWVudHMgb2Zmc2V0IHJlbGF0aXZlIHRvIHRoZSBkb2N1bWVudFxuICogQHBhcmFtICB7RE9NRWxlbWVudH0gJGVsZW1lbnQgRWxlbWVudCB0byBnZXQgdGhlIG9mZnNldCBmcm9tXG4gKiBAcmV0dXJuIHtpbnRlZ2VyfSAgICAgICAgICAgICBPZmZzZXQgaW4gcGl4ZWxzXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uKCRlbGVtZW50KSB7XG4gIHZhciBvZmZzZXQgPSAwO1xuXG4gIHdoaWxlICgkZWxlbWVudCAmJiAhaXNOYU4oJGVsZW1lbnQub2Zmc2V0VG9wKSkge1xuICAgIG9mZnNldCArPSAkZWxlbWVudC5vZmZzZXRUb3A7XG4gICAgJGVsZW1lbnQgPSAkZWxlbWVudC5vZmZzZXRQYXJlbnQ7XG4gIH1cbiAgcmV0dXJuIG9mZnNldDtcbn1cbiIsIi8qKlxuICogTGF6eSBsb2FkIGltYWdlcyB3aXRoIGNsYXNzIC5sYXp5LWltYWdlcy5cbiAqIERlcGVuZGluZyBvbiB0aGUgdHJlc2hvbGQgaW1hZ2VzIHdpbGwgbG9hZCBhcyB0aGUgdXNlciBzY3JvbGxzIGRvd24gb24gdGhlXG4gKiBkb2N1bWVudC5cbiAqL1xuXG4vLyBEZXBlbmRlbmNlaXNcbmltcG9ydCBnZXRBbGxFbGVtZW50cyBmcm9tICcuLi9kb20vZ2V0LWFsbCc7XG5pbXBvcnQgc2Nyb2xsVmlzaWJsZSBmcm9tICcuLi9zY3JvbGwvdmlzaWJsZSc7XG5cbi8vIExvYWQgaW1hZ2UgZWxlbWVudFxudmFyIGxvYWRJbWcgPSBmdW5jdGlvbigkaW1nKSB7XG5cbiAgaWYgKCRpbWcuZGF0YXNldC5zcmMpIHtcbiAgICAkaW1nLnNldEF0dHJpYnV0ZSgnc3JjJywgJGltZy5kYXRhc2V0LnNyYyk7XG4gIH1cbiAgaWYgKCRpbWcuZGF0YXNldC5zcmNzZXQpIHtcbiAgICAkaW1nLnNldEF0dHJpYnV0ZSgnc3Jjc2V0JywgJGltZy5kYXRhc2V0LnNyY3NldCk7XG4gIH1cbn07XG5cbi8vIExvYWQgcGljdHVyZSBlbGVtZW50XG52YXIgbG9hZFBpY3R1cmUgPSBmdW5jdGlvbigkcGljdHVyZSkge1xuICBsb2FkSW1nKCRwaWN0dXJlLnF1ZXJ5U2VsZWN0b3IoJ2ltZycpKTtcbiAgdmFyICRzb3VyY2VzID0gQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoJHBpY3R1cmUucXVlcnlTZWxlY3RvckFsbCgnc291cmNlJykpO1xuICAkc291cmNlcy5mb3JFYWNoKCRzb3VyY2UgPT4gJHNvdXJjZS5zZXRBdHRyaWJ1dGUoJ3NyY3NldCcsICRzb3VyY2UuZGF0YXNldC5zcmNzZXQpKTtcbn07XG5cbnZhciBsb2FkRWxlbWVudCA9IGZ1bmN0aW9uKCRlbGVtZW50KSB7XG4gIGlmICgkZWxlbWVudC5tYXRjaGVzKCdwaWN0dXJlJykpIHtcbiAgICBsb2FkUGljdHVyZSgkZWxlbWVudCk7XG4gIH0gZWxzZSBpZiAoJGVsZW1lbnQubWF0Y2hlcygnaW1nJykpIHtcbiAgICBsb2FkSW1nKCRlbGVtZW50KTtcbiAgfVxuXG4gIC8vIE1ha2Ugc3VyZSBwaWN0dXJlZmlsbCB3aWxsIHVwZGF0ZSB0aGUgaW1hZ2Ugd2hlbiBzb3VyY2UgaGFzIGNoYW5nZWRcbiAgaWYgKHdpbmRvdy5waWN0dXJlZmlsbCkge1xuICAgIHdpbmRvdy5waWN0dXJlZmlsbCh7XG4gICAgICByZWV2YWx1YXRlOiB0cnVlXG4gICAgfSk7XG4gIH1cbn07XG5cbi8qKlxuICogQWN0aXZhdGUgbGF6eSBsb2FkIG9mIGltYWdlcyBhcyB1c2VyIHNjcm9sbHNcbiAqIEBwYXJhbSAge2Zsb2F0fSB0aHJlc2hvbGQgIFBlcmNlbnQgYmVsb3cgc2NyZWVuIHRvIGluaXRpYWxpemUgbG9hZCBvZiBpbWFnZVxuICogQHJldHVybiB7dm9pZH1cbiAqL1xuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24odGhyZXNob2xkID0gMC41KSB7XG4gIHZhciAkbGF6eUltYWdlcyA9IGdldEFsbEVsZW1lbnRzKCcubGF6eS1pbWFnZScpO1xuXG4gIHdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUoZnVuY3Rpb24oKSB7XG4gICAgJGxhenlJbWFnZXMuZm9yRWFjaChmdW5jdGlvbigkbGF6eUltYWdlKSB7XG5cbiAgICAgIC8vIElnbm9yZSBpbWFnZXMgd2hpY2ggaGFzIGFscmVhZHkgYmVlbiByZWdpc3RlcmVkXG4gICAgICBpZiAoJGxhenlJbWFnZS5kYXRhc2V0LmxhenlJbWFnZUxpc3RlbmluZykge1xuXHRyZXR1cm47XG4gICAgICB9XG4gICAgICAkbGF6eUltYWdlLnNldEF0dHJpYnV0ZSgnZGF0YS1sYXp5LWltYWdlLWxpc3RlbmluZycsICd0cnVlJyk7XG5cbiAgICAgIHNjcm9sbFZpc2libGUoJGxhenlJbWFnZSwgdGhyZXNob2xkKVxuICAgICAgICAudGhlbigoKSA9PiBsb2FkRWxlbWVudCgkbGF6eUltYWdlKSk7XG4gICAgfSk7XG4gIH0pO1xuXG59XG4iLCIvLyBEZXBlbmRlbmNpZXNcbmltcG9ydCBnZXREb2N1bWVudE9mZnNldFRvcCBmcm9tICcuLi9kb20vZ2V0LWRvY3VtZW50LW9mZnNldC10b3AnO1xuXG4vKipcbiAqIENoZWNrcyBpZiB0aGUgdXNlciBoYXMgc2Nyb2xsZWQgdG8gb3IgcGFzdCBhbiBlbGVtZW50XG4gKiBAcGFyYW0gIHtET01FbGVtZW50fSAkZWxlbWVudCAgVGhlIGVsZW1lbnQgdG8gY2hlY2sgYWdhaW5zdFxuICogQHBhcmFtICB7ZmxvYXR9ICAgICAgdGhyZXNob2xkIERpc3RhbmNlIGluIHBlcmNlbnQgb2YgdGhlIHNjZWVlbiBoZWlnaHQgdG8gbWVhc3VyZSBhZ2FpbnN0LlxuICogQHJldHVybiB7Ym9vbGVhbn1cbiAqL1xuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24oJGVsZW1lbnQsIHRocmVzaG9sZCA9IDApIHtcbiAgdmFyIHNjcm9sbEJvdHRvbSA9ICh3aW5kb3cuc2Nyb2xsWSB8fCBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuc2Nyb2xsVG9wKSArICh3aW5kb3cuaW5uZXJIZWlnaHQgKiAoMSArIHRocmVzaG9sZCkpO1xuICB2YXIgb2Zmc2V0VG9wID0gZ2V0RG9jdW1lbnRPZmZzZXRUb3AoJGVsZW1lbnQpO1xuICByZXR1cm4gKHNjcm9sbEJvdHRvbSA+IG9mZnNldFRvcCk7XG59XG4iLCIvLyBkZXBlbmRlbmNpZXNcbmltcG9ydCBkZWxheSBmcm9tICcuLi9hc3luYy9kZWxheSc7XG5cbi8qKlxuICogUnVucyBzY3JpcHRzIGVhY2ggdGltZSB0aGUgdXNlciBjaGFuZ2VzIHNjcm9sbCBkaXJlY3Rpb25cbiAqIEBwYXJhbSAge0Z1bmN0aW9ufSBkb3duQ2FsbGJhY2sgIENhbGxiYWNrIGV2ZXJ5IHRpbWUgdGhlIHVzZXIgc3RhcnRzIHNjcm9sbGluZyBkb3duXG4gKiBAcGFyYW0gIHtGdW5jdGlvbn0gdXBDYWxsYmFjayAgICBDYWxsYmFjayBldmVyeSB0aW1lIHRoZSB1c2VyIHN0YXJ0cyBzY3JvbGxpbmcgdXBcbiAqIEBwYXJhbSAge2Zsb2F0fSAgICB0aHJlc2hvbGQgICAgIE1hcmdpbiBpbiB0b3Agd2hlcmUgc2Nyb2xsIGRvd24gaXMgaWdub3JlZCAoY291bGQgYmUgdXNlZCBmb3IgbmF2cylcbiAqIEByZXR1cm4ge3ZvaWR9XG4gKi9cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uKGRvd25DYWxsYmFjayA9IGZ1bmN0aW9uKCkge30sIHVwQ2FsbGJhY2sgPSBmdW5jdGlvbigpIHt9LCB0aHJlc2hvbGQgPSAwKSB7XG5cbiAgdmFyIGxhc3RTY3JvbGxQb3MgPSAwO1xuICB2YXIgc2Nyb2xsZWREb3duID0gZmFsc2U7XG5cbiAgdmFyIGlzU2Nyb2xsaW5nID0gZnVuY3Rpb24oKSB7XG4gICAgdmFyIGN1cnJlbnRTY3JvbGxQb3MgPSB3aW5kb3cuc2Nyb2xsWTtcblxuICAgIGlmICghc2Nyb2xsZWREb3duICYmXG4gICAgICBjdXJyZW50U2Nyb2xsUG9zID4gdGhyZXNob2xkICYmXG4gICAgICBjdXJyZW50U2Nyb2xsUG9zID4gKGxhc3RTY3JvbGxQb3MgKyAxMCkpIHtcbiAgICAgIGRvd25DYWxsYmFjaygpO1xuICAgICAgc2Nyb2xsZWREb3duID0gdHJ1ZTtcbiAgICB9IGVsc2UgaWYgKHNjcm9sbGVkRG93biAmJlxuICAgICAgKGN1cnJlbnRTY3JvbGxQb3MgPD0gdGhyZXNob2xkIHx8IGN1cnJlbnRTY3JvbGxQb3MgPCAobGFzdFNjcm9sbFBvcyAtIDEwMCkpICYmXG4gICAgICAoY3VycmVudFNjcm9sbFBvcyArIHdpbmRvdy5pbm5lckhlaWdodCA8IGRvY3VtZW50LmJvZHkuY2xpZW50SGVpZ2h0KSkge1xuICAgICAgdXBDYWxsYmFjaygpO1xuICAgICAgc2Nyb2xsZWREb3duID0gZmFsc2U7XG4gICAgfVxuXG4gICAgbGFzdFNjcm9sbFBvcyA9IGN1cnJlbnRTY3JvbGxQb3M7XG4gIH07XG5cbiAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3Njcm9sbCcsIGRlbGF5KGlzU2Nyb2xsaW5nLCAyNTApKTtcbiAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignRE9NQ29udGVudExvYWRlZCcsIGlzU2Nyb2xsaW5nKTtcbn1cbiIsIi8vIERlcGVuZGVuY2Vpc1xuaW1wb3J0IGRlYm91bmNlIGZyb20gJy4uL2FzeW5jL2RlYm91bmNlJztcbmltcG9ydCBoYXNTY3JvbGxlZFBhc3QgZnJvbSAnLi9oYXMtc2Nyb2xsZWQtcGFzdCc7XG5cbi8qKlxuICogRnVsZmlsbCBhIHByb21pc2UsIHdoZW4gdGhlIGVsZW1lbnQgaXMgdmlzaWJsZSAoc2Nyb2xsZWQgdG8gb3IgcGFzdClcbiAqIEBwYXJhbSAge0RPTUVsZW1lbnR9ICRlbGVtZW50ICBFbGVtZW50IHRvIGNoZWNrXG4gKiBAcGFyYW0gIHtmbG9hdH0gICAgICB0aHJlc2hvbGQgRGlzdGFuY2UgaW4gcGVyY2VudFxuICogQHJldHVybiB7W3R5cGVdfSAgICAgICAgICAgW2Rlc2NyaXB0aW9uXVxuICovXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbigkZWxlbWVudCwgdGhyZXNob2xkID0gMCkge1xuXG4gIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbihyZXNvbHZlKSB7XG5cbiAgICB2YXIgY2hlY2tFbGVtZW50ID0gZGVib3VuY2UoZnVuY3Rpb24oKSB7XG4gICAgICBpZiAoaGFzU2Nyb2xsZWRQYXN0KCRlbGVtZW50LCB0aHJlc2hvbGQpKSB7XG4gICAgICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKCdzY3JvbGwnLCBjaGVja0VsZW1lbnQpO1xuICAgICAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcigncmVzaXplJywgY2hlY2tFbGVtZW50KTtcbiAgICAgICAgcmVzb2x2ZSgpO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3Njcm9sbCcsIGNoZWNrRWxlbWVudCk7XG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3Jlc2l6ZScsIGNoZWNrRWxlbWVudCk7XG4gICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignRE9NQ29udGVudExvYWRlZCcsIGNoZWNrRWxlbWVudCk7XG4gICAgc2V0VGltZW91dChjaGVja0VsZW1lbnQsIDApO1xuICB9KTtcbn1cbiIsIi8qKlxuICogSGVscGVycyBmb3IgdmFsaWRhdGluZyBpbnB1dCBmaWVsZHNcbiAqL1xuXG5pbXBvcnQgaXNEYXRlIGZyb20gJy4vaXMtZGF0ZSc7XG5pbXBvcnQgaXNFbWFpbCBmcm9tICcuL2lzLWVtYWlsJztcbmltcG9ydCBpc0Zsb2F0IGZyb20gJy4vaXMtZmxvYXQnO1xuaW1wb3J0IGlzSW50IGZyb20gJy4vaXMtaW50JztcbmltcG9ydCBpc1JlcXVpcmVkIGZyb20gJy4vaXMtcmVxdWlyZWQnO1xuaW1wb3J0IGlzVXJsIGZyb20gJy4vaXMtdXJsJztcblxuZXhwb3J0IGRlZmF1bHQge1xuICBpc0RhdGUsXG4gIGlzRW1haWwsXG4gIGlzRmxvYXQsXG4gIGlzSW50LFxuICBpc1JlcXVpcmVkLFxuICBpc1VybFxufTtcbiIsImltcG9ydCBnZXRBbGxFbGVtZW50cyBmcm9tICcuLi9kb20vZ2V0LWFsbCc7XG5pbXBvcnQgdmFsaWRhdGUgZnJvbSAnLi8nO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbigpIHtcblxuICBnZXRBbGxFbGVtZW50cygnLnZhbGlkYXRlJykuZm9yRWFjaChmdW5jdGlvbigkdmFsaWRhdGVDb250YWluZXIpIHtcblxuICAgIHZhciAkdmFsaWRhdGVGaWVsZCA9ICR2YWxpZGF0ZUNvbnRhaW5lcjtcblxuICAgIGlmICghJHZhbGlkYXRlQ29udGFpbmVyLm1hdGNoZXMoJ2lucHV0LCB0ZXh0YXJlYScpKSB7XG4gICAgICAkdmFsaWRhdGVGaWVsZCA9ICR2YWxpZGF0ZUNvbnRhaW5lci5xdWVyeVNlbGVjdG9yKCdpbnB1dCwgdGV4dGFyZWEnKTtcbiAgICB9XG5cbiAgICBpZiAoISR2YWxpZGF0ZUZpZWxkKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgLy8gRmluZCByZWxldmF0IHZhbGlkYXRpb24gbWV0aG9kc1xuICAgIHZhciB2YWxpZGF0b3JOYW1lcyA9IFtdO1xuICAgIGZvciAodmFyIGtleSBpbiAkdmFsaWRhdGVDb250YWluZXIuZGF0YXNldCkge1xuICAgICAgaWYgKGtleSAhPT0gJ3ZhbGlkYXRlJyAmJiBrZXkuaW5kZXhPZigndmFsaWRhdGUnKSA9PT0gMCkge1xuICAgICAgICB2YXIgdmFsaWRhdG9yTmFtZSA9IGtleS5yZXBsYWNlKCd2YWxpZGF0ZScsICcnKTtcblxuICAgICAgICBpZiAodmFsaWRhdGVbJ2lzJyArIHZhbGlkYXRvck5hbWVdKSB7XG4gICAgICAgICAgdmFsaWRhdG9yTmFtZXMucHVzaCh2YWxpZGF0b3JOYW1lKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIGlmICh2YWxpZGF0b3JOYW1lcy5sZW5ndGggPT09IDApIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICAvLyBDaGVjayB2YWxpZGF0aW9uIHdoZW4gaW5wdXQgb24gZmllbGQgaXMgY2hhbmdlZFxuICAgICR2YWxpZGF0ZUZpZWxkLmFkZEV2ZW50TGlzdGVuZXIoJ2lucHV0JywgZnVuY3Rpb24oKSB7XG4gICAgICB2YXIgaW5wdXQgPSAkdmFsaWRhdGVGaWVsZC52YWx1ZTtcbiAgICAgIHZhciB2YWxpZCA9ICF2YWxpZGF0b3JOYW1lcy5zb21lKGZ1bmN0aW9uKHZhbGlkYXRvck5hbWUpIHtcblx0aWYgKCFpbnB1dCAmJiB2YWxpZGF0b3JOYW1lICE9PSAnUmVxdWlyZWQnKSB7XG5cdCAgcmV0dXJuIGZhbHNlO1xuXHR9XG4gICAgICAgIHJldHVybiAhdmFsaWRhdGVbJ2lzJyArIHZhbGlkYXRvck5hbWVdKGlucHV0KTtcbiAgICAgIH0pO1xuXG4gICAgICBpZiAodmFsaWQpIHtcblx0JHZhbGlkYXRlQ29udGFpbmVyLmNsYXNzTGlzdC5hZGQoJ3ZhbGlkYXRlLS12YWxpZCcpO1xuXHQkdmFsaWRhdGVDb250YWluZXIuY2xhc3NMaXN0LnJlbW92ZSgndmFsaWRhdGUtLW5vdC12YWxpZCcpO1xuICAgICAgfSBlbHNlIHtcblx0JHZhbGlkYXRlQ29udGFpbmVyLmNsYXNzTGlzdC5hZGQoJ3ZhbGlkYXRlLS1ub3QtdmFsaWQnKTtcblx0JHZhbGlkYXRlQ29udGFpbmVyLmNsYXNzTGlzdC5yZW1vdmUoJ3ZhbGlkYXRlLS12YWxpZCcpO1xuICAgICAgfVxuICAgIH0pO1xuICB9KTtcbn1cbiIsIi8qKlxuICogVmFsaWRhdGUgdGhhdCBzdHJpbmcgY2FuIGJlIGNvbnZlcnRlZCB0byBkYXRlXG4gKiBAcGFyYW0gIHtzdHJpbmd9IGRhdGUgaW5wdXRcbiAqIEByZXR1cm4ge2Jvb2xlYW59XG4gKi9cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uKGRhdGUpIHtcbiAgcmV0dXJuICFpc05hTihEYXRlLnBhcnNlKGRhdGUpKTtcbn1cbiIsIi8qKlxuICogVmFsaWRhdGUgZS1tYWlsXG4gKiBAcGFyYW0gIHtzdHJpbmd9IGVtYWlsIGlucHV0XG4gKiBAcmV0dXJuIHtib29sZWFufVxuICovXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbihlbWFpbCkge1xuICB2YXIgcmUgPSAvXihbYS16MC05X1xcLi1dKylAKFtcXGRhLXpcXC4tXSspXFwuKFthLXpcXC5dezIsNn0pJC87XG4gIHJldHVybiByZS50ZXN0KGVtYWlsKTtcbn1cbiIsIi8qKlxuICogVmFsaWRhdGUgZmxvYXRcbiAqIEBwYXJhbSAge3N0cmluZ30gZmxvYXQgaW5wdXRcbiAqIEByZXR1cm4ge2Jvb2xlYW59XG4gKi9cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uKGZsb2F0KSB7XG4gIHZhciByZSA9IC9eKD86Wy0rXT8oPzpbMC05XSspKT8oPzpcXC5bMC05XSopPyg/OltlRV1bXFwrXFwtXT8oPzpbMC05XSspKT8kLztcbiAgcmV0dXJuIGZsb2F0ICE9PSAnJyAmJiByZS50ZXN0KGZsb2F0KTtcbn1cbiIsIi8qKlxuICogVmFsaWRhdGUgaW50ZWdldFxuICogQHBhcmFtICB7c3RyaW5nfSBpbnRlZ2VyIGlucHV0XG4gKiBAcmV0dXJuIHtib29sZWFufVxuICovXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbihpbnRlZ2VyKSB7XG4gIHZhciByZSA9IC9eKD86Wy0rXT8oPzowfFsxLTldWzAtOV0qKSkkLztcbiAgcmV0dXJuIHJlLnRlc3QoaW50ZWdlcik7XG59XG4iLCIvKipcbiAqIFZhbGlkYXRlIGlmIHRoZSBzdHJpbmcgaXMgZW1wdHlcbiAqIEBwYXJhbSAge3N0cmluZ30gaW5wdXRcbiAqIEByZXR1cm4ge2Jvb2xlYW59XG4gKi9cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uKGlucHV0KSB7XG4gIHJldHVybiBpbnB1dC50cmltKCkgIT09ICcnO1xufVxuIiwiLyoqXG4gKiBWYWxpZGF0ZSB1cmxcbiAqIEBwYXJhbSAge3N0cmluZ30gdXJsIGlucHV0XG4gKiBAcmV0dXJuIHtib29sZWFufVxuICovXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbih1cmwpIHtcbiAgdmFyIHJlID0gL14oaHR0cHM/OlxcL1xcLyk/KFtcXGRhLXpcXC4tXSspXFwuKFthLXpcXC5dezIsNn0pKFtcXC9cXHcgXFwuLV0qKSpcXC8/JC87XG4gIHJldHVybiByZS50ZXN0KHVybCk7XG59XG4iXX0=
