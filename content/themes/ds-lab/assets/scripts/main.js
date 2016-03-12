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
    if (window.scrollY > window.innerHeight) {
      $stickyNav.classList.add('nav--active');
      if ($stickyShareBar) {
        $stickyShareBar.classList.add('footer__share-bar--sticky-active');
      }
    }
  });

  /**
   * Hide sticky navigation when scrolled to the top of the document
   * @return {void}
   */
  var onTop = function onTop() {
    var scrollPos = window.scrollY || document.documentElement.scrollTop;
    if (scrollPos <= 0) {
      $stickyNav.classList.add('nav--hidden');
      $stickyNav.classList.remove('nav--active');
      if ($stickyShareBar) {
        $stickyShareBar.classList.remove('footer__share-bar--sticky-active');
      }
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
	$toolTipIcon.setAttribute('data-src', '/assets/images/heart--inverse--active.svg');

	(0, _getAll2.default)('.post-footer__like-icon').forEach(function ($footerIcon) {
		$footerIcon.setAttribute('data-src', '/assets/images/heart--inverse--active.svg');
	});

	// Indicates, that the like button no longer is clickable
	(0, _getAll2.default)('.share__like').forEach(function ($like) {
		return $like.classList.add('disabled');
	});

	(0, _images2.default)(1);
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
		$twitter.setAttribute('href', 'https://twitter.com/intent/tweet?text=' + encodeURIComponent(highlightedText) + '&url=' + encodeURIComponent($twitter.dataset.url));

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJub2RlX21vZHVsZXMvZXBvY2gtdG8tdGltZWFnby9jdXRvZmYvY3V0b2ZmLmpzb24iLCJub2RlX21vZHVsZXMvZXBvY2gtdG8tdGltZWFnby9pbmRleC5qcyIsIm5vZGVfbW9kdWxlcy9lcG9jaC10by10aW1lYWdvL3N1ZmZpeC9zdWZmaXgtZGljdGlvbmFyeS5qc29uIiwibm9kZV9tb2R1bGVzL2Vwb2NoLXRvLXRpbWVhZ28vdGltZS1hZ28vdGltZS1hZ28uanMiLCJub2RlX21vZHVsZXMvZXBvY2gtdG8tdGltZWFnby90aW1lLWNhbGN1bGF0aW9ucy9pbmRleC5qcyIsIm5vZGVfbW9kdWxlcy9lcG9jaC10by10aW1lYWdvL3RpbWUtY2FsY3VsYXRpb25zL3RpbWUtYWdvL2RheXMtYWdvLmpzIiwibm9kZV9tb2R1bGVzL2Vwb2NoLXRvLXRpbWVhZ28vdGltZS1jYWxjdWxhdGlvbnMvdGltZS1hZ28vaG91cnMtYWdvLmpzIiwibm9kZV9tb2R1bGVzL2Vwb2NoLXRvLXRpbWVhZ28vdGltZS1jYWxjdWxhdGlvbnMvdGltZS1hZ28vbWludXRlcy1hZ28uanMiLCJub2RlX21vZHVsZXMvZXBvY2gtdG8tdGltZWFnby90aW1lLWNhbGN1bGF0aW9ucy90aW1lLWFnby9tb250aHMtYWdvLmpzIiwibm9kZV9tb2R1bGVzL2Vwb2NoLXRvLXRpbWVhZ28vdGltZS1jYWxjdWxhdGlvbnMvdGltZS1hZ28vc2Vjb25kcy1hZ28uanMiLCJub2RlX21vZHVsZXMvZXBvY2gtdG8tdGltZWFnby90aW1lLWNhbGN1bGF0aW9ucy90aW1lLWFnby93ZWVrcy1hZ28uanMiLCJub2RlX21vZHVsZXMvZXBvY2gtdG8tdGltZWFnby90aW1lLWNhbGN1bGF0aW9ucy90aW1lLWFnby95ZWFycy1hZ28uanMiLCJzcmMvc2NyaXB0cy9jb21wb25lbnRzL25hdmlnYXRpb24uanMiLCJzcmMvc2NyaXB0cy9jb21wb25lbnRzL3Jlc3BvbnNlLmpzIiwic3JjL3NjcmlwdHMvY29tcG9uZW50cy9zZWFyY2guanMiLCJzcmMvc2NyaXB0cy9jb21wb25lbnRzL3Rvb2wtdGlwLmpzIiwic3JjL3NjcmlwdHMvbGliL2FwaS5qcyIsInNyYy9zY3JpcHRzL2xpYi9mb3JtL2xpdmUtdmFsaWRhdGlvbi5qcyIsInNyYy9zY3JpcHRzL2xpYi9mb3JtL3ZhbGlkYXRlLmpzIiwic3JjL3NjcmlwdHMvbGliL2dldC1sb2dnZWQtaW4tZGF0YS5qcyIsInNyYy9zY3JpcHRzL2xpYi9odG1sLWVuY29kZS5qcyIsInNyYy9zY3JpcHRzL2xpYi9pbWFnZS1jb252ZXJ0ZXIuanMiLCJzcmMvc2NyaXB0cy9saWIvcmVhZC10aW1lLmpzIiwic3JjL3NjcmlwdHMvbGliL3N0cmlwLWh0bWwtdGFncy5qcyIsInNyYy9zY3JpcHRzL21haW4uanMiLCJzcmMvc2NyaXB0cy90ZW1wbGF0ZXMvYXV0aG9yLmpzIiwic3JjL3NjcmlwdHMvdGVtcGxhdGVzL3Bvc3QuanMiLCJzcmMvc2NyaXB0cy90ZW1wbGF0ZXMvcmVzcG9uc2UtbWV0YS5qcyIsInNyYy9zY3JpcHRzL3RlbXBsYXRlcy9yZXNwb25zZS5qcyIsInNyYy9zY3JpcHRzL3RlbXBsYXRlcy90YWcuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvd29yZC1jb3VudC9pbmRleC5qcyIsIi4uLy4uLy4uLy4uL3RlYW0tbnBtLXBhY2thZ2VzL2RzLWFzc2V0cy9hc3luYy9kZWJvdW5jZS5qcyIsIi4uLy4uLy4uLy4uL3RlYW0tbnBtLXBhY2thZ2VzL2RzLWFzc2V0cy9hc3luYy9kZWxheS5qcyIsIi4uLy4uLy4uLy4uL3RlYW0tbnBtLXBhY2thZ2VzL2RzLWFzc2V0cy9kb20vZ2V0LWFsbC5qcyIsIi4uLy4uLy4uLy4uL3RlYW0tbnBtLXBhY2thZ2VzL2RzLWFzc2V0cy9kb20vZ2V0LWRvY3VtZW50LW9mZnNldC10b3AuanMiLCIuLi8uLi8uLi8uLi90ZWFtLW5wbS1wYWNrYWdlcy9kcy1hc3NldHMvbGF6eS9pbWFnZXMuanMiLCIuLi8uLi8uLi8uLi90ZWFtLW5wbS1wYWNrYWdlcy9kcy1hc3NldHMvc2Nyb2xsL2hhcy1zY3JvbGxlZC1wYXN0LmpzIiwiLi4vLi4vLi4vLi4vdGVhbS1ucG0tcGFja2FnZXMvZHMtYXNzZXRzL3Njcm9sbC9zY3JvbGwtY2hhbmdlLmpzIiwiLi4vLi4vLi4vLi4vdGVhbS1ucG0tcGFja2FnZXMvZHMtYXNzZXRzL3Njcm9sbC92aXNpYmxlLmpzIiwiLi4vLi4vLi4vLi4vdGVhbS1ucG0tcGFja2FnZXMvZHMtYXNzZXRzL3ZhbGlkYXRlL2luZGV4LmpzIiwiLi4vLi4vLi4vLi4vdGVhbS1ucG0tcGFja2FnZXMvZHMtYXNzZXRzL3ZhbGlkYXRlL2lucHV0LWZpZWxkcy5qcyIsIi4uLy4uLy4uLy4uL3RlYW0tbnBtLXBhY2thZ2VzL2RzLWFzc2V0cy92YWxpZGF0ZS9pcy1kYXRlLmpzIiwiLi4vLi4vLi4vLi4vdGVhbS1ucG0tcGFja2FnZXMvZHMtYXNzZXRzL3ZhbGlkYXRlL2lzLWVtYWlsLmpzIiwiLi4vLi4vLi4vLi4vdGVhbS1ucG0tcGFja2FnZXMvZHMtYXNzZXRzL3ZhbGlkYXRlL2lzLWZsb2F0LmpzIiwiLi4vLi4vLi4vLi4vdGVhbS1ucG0tcGFja2FnZXMvZHMtYXNzZXRzL3ZhbGlkYXRlL2lzLWludC5qcyIsIi4uLy4uLy4uLy4uL3RlYW0tbnBtLXBhY2thZ2VzL2RzLWFzc2V0cy92YWxpZGF0ZS9pcy1yZXF1aXJlZC5qcyIsIi4uLy4uLy4uLy4uL3RlYW0tbnBtLXBhY2thZ2VzL2RzLWFzc2V0cy92YWxpZGF0ZS9pcy11cmwuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDUkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDTkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtB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QixTQUFPLE1BQU0sSUFBTixPQUFpQixFQUFqQixDQURzQjtDQUFoQjs7Ozs7Ozs7O2tCQ0FBLFVBQVMsR0FBVCxFQUFjO0FBQzNCLE1BQUksS0FBSyxnRUFBTCxDQUR1QjtBQUUzQixTQUFPLEdBQUcsSUFBSCxDQUFRLEdBQVIsQ0FBUCxDQUYyQjtDQUFkIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsIm1vZHVsZS5leHBvcnRzPXtcbiAgXCJzZWNvbmRzXCI6IDYwLFxuICBcIm1pbnV0ZXNcIjogNjAsXG4gIFwiaG91cnNcIjogMjQsXG4gIFwiZGF5c1wiOiA3LFxuICBcIndlZWtzXCI6IDQsXG4gIFwibW9udGhzXCI6IDEyXG59XG4iLCJ2YXIgY29udmVydGVyID0gbW9kdWxlLmV4cG9ydHMgPSB7XG4gIGN1dG9mZjogcmVxdWlyZSgnLi9jdXRvZmYvY3V0b2ZmLmpzb24nKSxcbiAgc3VmZml4RGljdGlvbmFyeTogcmVxdWlyZSgnLi9zdWZmaXgvc3VmZml4LWRpY3Rpb25hcnkuanNvbicpLFxuICB0aW1lQ2FsY3M6IHJlcXVpcmUoJy4vdGltZS1jYWxjdWxhdGlvbnMnKVxufVxuY29udmVydGVyLnRpbWVBZ28gPSByZXF1aXJlKCcuL3RpbWUtYWdvL3RpbWUtYWdvLmpzJykuYmluZChjb252ZXJ0ZXIpXG4iLCJtb2R1bGUuZXhwb3J0cz17XG4gIFwic2Vjb25kc1wiOiB7XG4gICAgXCJzaW5ndWxhclwiOiBcIiBzZWNvbmQgYWdvXCIsXG4gICAgXCJwbHVyYWxcIjogXCIgc2Vjb25kcyBhZ29cIlxuICB9LFxuICBcIm1pbnV0ZXNcIjoge1xuICAgIFwic2luZ3VsYXJcIjogXCIgbWludXRlIGFnb1wiLFxuICAgIFwicGx1cmFsXCI6IFwiIG1pbnV0ZXMgYWdvXCJcbiAgfSxcbiAgXCJob3Vyc1wiOiB7XG4gICAgXCJzaW5ndWxhclwiOiBcIiBob3VyIGFnb1wiLFxuICAgIFwicGx1cmFsXCI6IFwiIGhvdXJzIGFnb1wiXG4gIH0sXG4gIFwiZGF5c1wiOiB7XG4gICAgXCJzaW5ndWxhclwiOiBcIiBkYXkgYWdvXCIsXG4gICAgXCJwbHVyYWxcIjogXCIgZGF5cyBhZ29cIlxuICB9LFxuICBcIndlZWtzXCI6IHtcbiAgICBcInNpbmd1bGFyXCI6IFwiIHdlZWsgYWdvXCIsXG4gICAgXCJwbHVyYWxcIjogXCIgd2Vla3MgYWdvXCJcbiAgfSxcbiAgXCJtb250aHNcIjoge1xuICAgIFwic2luZ3VsYXJcIjogXCIgbW9udGggYWdvXCIsXG4gICAgXCJwbHVyYWxcIjogXCIgbW9udGhzIGFnb1wiXG4gIH0sXG4gIFwieWVhcnNcIjoge1xuICAgIFwic2luZ3VsYXJcIjogXCIgeWVhciBhZ29cIixcbiAgICBcInBsdXJhbFwiOiBcIiB5ZWFycyBhZ29cIlxuICB9XG59XG4iLCJtb2R1bGUuZXhwb3J0cyA9IFRpbWVBZ29cblxuZnVuY3Rpb24gVGltZUFnbyAocGFzdEVwb2NoLCBjdXJyZW50RXBvY2gpIHtcbiAgdmFyIHNlY29uZHMgPSBNYXRoLnJvdW5kKHRoaXMudGltZUNhbGNzLnNlY29uZHMocGFzdEVwb2NoLCBjdXJyZW50RXBvY2gpKVxuICB2YXIgbWludXRlcyA9IE1hdGgucm91bmQodGhpcy50aW1lQ2FsY3MubWludXRlcyhwYXN0RXBvY2gsIGN1cnJlbnRFcG9jaCkpXG4gIHZhciBob3VycyA9IE1hdGgucm91bmQodGhpcy50aW1lQ2FsY3MuaG91cnMocGFzdEVwb2NoLCBjdXJyZW50RXBvY2gpKVxuICB2YXIgZGF5cyA9IE1hdGgucm91bmQodGhpcy50aW1lQ2FsY3MuZGF5cyhwYXN0RXBvY2gsIGN1cnJlbnRFcG9jaCkpXG4gIHZhciB3ZWVrcyA9IE1hdGgucm91bmQodGhpcy50aW1lQ2FsY3Mud2Vla3MocGFzdEVwb2NoLCBjdXJyZW50RXBvY2gpKVxuICB2YXIgbW9udGhzID0gTWF0aC5yb3VuZCh0aGlzLnRpbWVDYWxjcy5tb250aHMocGFzdEVwb2NoLCBjdXJyZW50RXBvY2gpKVxuICB2YXIgeWVhcnMgPSBNYXRoLnJvdW5kKHRoaXMudGltZUNhbGNzLnllYXJzKHBhc3RFcG9jaCwgY3VycmVudEVwb2NoKSlcblxuICB2YXIgc3VmZml4ID0gdGhpcy5zdWZmaXhEaWN0aW9uYXJ5XG4gIHZhciBjdXRvZmYgPSB0aGlzLmN1dG9mZlxuXG4gIGlmIChzZWNvbmRzIDwgY3V0b2ZmLnNlY29uZHMpIHtcbiAgICByZXR1cm4gc2Vjb25kcyArIHN1ZmZpeC5zZWNvbmRzW2dldEZvcm0oc2Vjb25kcyldXG4gIH0gZWxzZSBpZiAobWludXRlcyA8IGN1dG9mZi5taW51dGVzKSB7XG4gICAgcmV0dXJuIG1pbnV0ZXMgKyBzdWZmaXgubWludXRlc1tnZXRGb3JtKG1pbnV0ZXMpXVxuICB9IGVsc2UgaWYgKGhvdXJzIDwgY3V0b2ZmLmhvdXJzKSB7XG4gICAgcmV0dXJuIGhvdXJzICsgc3VmZml4LmhvdXJzW2dldEZvcm0oaG91cnMpXVxuICB9IGVsc2UgaWYgKGRheXMgPCBjdXRvZmYuZGF5cykge1xuICAgIHJldHVybiBkYXlzICsgc3VmZml4LmRheXNbZ2V0Rm9ybShkYXlzKV1cbiAgfSBlbHNlIGlmICh3ZWVrcyA8IGN1dG9mZi53ZWVrcykge1xuICAgIHJldHVybiB3ZWVrcyArIHN1ZmZpeC53ZWVrc1tnZXRGb3JtKHdlZWtzKV1cbiAgfSBlbHNlIGlmIChtb250aHMgPCBjdXRvZmYubW9udGhzKSB7XG4gICAgcmV0dXJuIG1vbnRocyArIHN1ZmZpeC5tb250aHNbZ2V0Rm9ybShtb250aHMpXVxuICB9IGVsc2Uge1xuICAgIHJldHVybiB5ZWFycyArIHN1ZmZpeC55ZWFyc1tnZXRGb3JtKHllYXJzKV1cbiAgfVxufVxuXG5mdW5jdGlvbiBnZXRGb3JtICh2YWx1ZSkge1xuICBpZiAodmFsdWUgPT09IDEpIHtcbiAgICByZXR1cm4gJ3Npbmd1bGFyJ1xuICB9XG4gIHJldHVybiAncGx1cmFsJ1xufVxuIiwibW9kdWxlLmV4cG9ydHMgPSB7XG4gIHNlY29uZHM6IHJlcXVpcmUoJy4vdGltZS1hZ28vc2Vjb25kcy1hZ28uanMnKSxcbiAgbWludXRlczogcmVxdWlyZSgnLi90aW1lLWFnby9taW51dGVzLWFnby5qcycpLFxuICBob3VyczogcmVxdWlyZSgnLi90aW1lLWFnby9ob3Vycy1hZ28uanMnKSxcbiAgZGF5czogcmVxdWlyZSgnLi90aW1lLWFnby9kYXlzLWFnby5qcycpLFxuICB3ZWVrczogcmVxdWlyZSgnLi90aW1lLWFnby93ZWVrcy1hZ28uanMnKSxcbiAgbW9udGhzOiByZXF1aXJlKCcuL3RpbWUtYWdvL21vbnRocy1hZ28uanMnKSxcbiAgeWVhcnM6IHJlcXVpcmUoJy4vdGltZS1hZ28veWVhcnMtYWdvLmpzJylcbn1cbiIsIm1vZHVsZS5leHBvcnRzID0gRGF5c0Fnb1xuXG5mdW5jdGlvbiBEYXlzQWdvIChwYXN0RXBvY2gsIGN1cnJlbnRFcG9jaCkge1xuICB2YXIgZGF5c0FnbyA9IChjdXJyZW50RXBvY2ggLSBwYXN0RXBvY2gpIC8gMTAwMCAvIDYwIC8gNjAgLyAyNFxuICByZXR1cm4gZGF5c0Fnb1xufVxuIiwibW9kdWxlLmV4cG9ydHMgPSBIb3Vyc0Fnb1xuXG5mdW5jdGlvbiBIb3Vyc0FnbyAocGFzdEVwb2NoLCBjdXJyZW50RXBvY2gpIHtcbiAgdmFyIGhvdXJzQWdvID0gKGN1cnJlbnRFcG9jaCAtIHBhc3RFcG9jaCkgLyAxMDAwIC8gNjAgLyA2MFxuICByZXR1cm4gaG91cnNBZ29cbn1cbiIsIm1vZHVsZS5leHBvcnRzID0gTWludXRlc0Fnb1xuXG5mdW5jdGlvbiBNaW51dGVzQWdvIChwYXN0RXBvY2gsIGN1cnJlbnRFcG9jaCkge1xuICB2YXIgbWludXRlc0FnbyA9IChjdXJyZW50RXBvY2ggLSBwYXN0RXBvY2gpIC8gMTAwMCAvIDYwXG4gIHJldHVybiBtaW51dGVzQWdvXG59XG4iLCJtb2R1bGUuZXhwb3J0cyA9IE1vbnRoc0Fnb1xuXG5mdW5jdGlvbiBNb250aHNBZ28gKHBhc3RFcG9jaCwgY3VycmVudEVwb2NoKSB7XG4gIHZhciBtb250aHNBZ28gPSAoY3VycmVudEVwb2NoIC0gcGFzdEVwb2NoKSAvIDEwMDAgLyA2MCAvIDYwIC8gMjQgLyAzMVxuICByZXR1cm4gbW9udGhzQWdvXG59XG4iLCJtb2R1bGUuZXhwb3J0cyA9IFNlY29uZHNBZ29cblxuZnVuY3Rpb24gU2Vjb25kc0FnbyAocGFzdEVwb2NoLCBjdXJyZW50RXBvY2gpIHtcbiAgdmFyIHNlY29uZHNBZ28gPSAoY3VycmVudEVwb2NoIC0gcGFzdEVwb2NoKSAvIDEwMDBcbiAgcmV0dXJuIHNlY29uZHNBZ29cbn1cbiIsIm1vZHVsZS5leHBvcnRzID0gV2Vla3NBZ29cblxuZnVuY3Rpb24gV2Vla3NBZ28gKHBhc3RFcG9jaCwgY3VycmVudEVwb2NoKSB7XG4gIHZhciB3ZWVrc0FnbyA9IChjdXJyZW50RXBvY2ggLSBwYXN0RXBvY2gpIC8gMTAwMCAvIDYwIC8gNjAgLyAyNCAvIDdcbiAgcmV0dXJuIHdlZWtzQWdvXG59XG4iLCJtb2R1bGUuZXhwb3J0cyA9IFllYXJzQWdvXG5cbmZ1bmN0aW9uIFllYXJzQWdvIChwYXN0RXBvY2gsIGN1cnJlbnRFcG9jaCkge1xuICB2YXIgeWVhcnNBZ28gPSAoY3VycmVudEVwb2NoIC0gcGFzdEVwb2NoKSAvIDEwMDAgLyA2MCAvIDYwIC8gMjQgLyAzMSAvIDEyXG4gIHJldHVybiB5ZWFyc0Fnb1xufVxuIiwiLyoqXG4gKiBIYW5kbGUgbmF2aWdhdGlvblxuICovXG5cbi8vIERlcGVuZGVuY2llc1xuaW1wb3J0IHNjcm9sbENoYW5nZSBmcm9tICdkcy1hc3NldHMvc2Nyb2xsL3Njcm9sbC1jaGFuZ2UnO1xuaW1wb3J0IGRlYm91bmNlIGZyb20gJ2RzLWFzc2V0cy9hc3luYy9kZWJvdW5jZSc7XG5pbXBvcnQgZ2V0QWxsIGZyb20gJ2RzLWFzc2V0cy9kb20vZ2V0LWFsbCc7XG5pbXBvcnQgaGFzU2Nyb2xsZWRQYXN0IGZyb20gJ2RzLWFzc2V0cy9zY3JvbGwvaGFzLXNjcm9sbGVkLXBhc3QnO1xuaW1wb3J0IGdldFVzZXJEYXRhIGZyb20gJy4uL2xpYi9nZXQtbG9nZ2VkLWluLWRhdGEnO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbigpIHtcblxuICB2YXIgJG5hdiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5uYXYnKTtcbiAgaWYgKCEkbmF2KSB7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgdmFyICRib2R5ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignYm9keScpO1xuXG4gIC8vIENsb25lIG5hdmlnYXRpb24gYW5kIG1ha2UgdGhlIG5ldyBvbmUgc3RpY2t5XG4gIHZhciAkc3RpY2t5TmF2ID0gJG5hdi5jbG9uZU5vZGUodHJ1ZSk7XG4gICRzdGlja3lOYXYuY2xhc3NMaXN0LmFkZCgnbmF2LS1zdGlja3knKTtcbiAgJGJvZHkuaW5zZXJ0QmVmb3JlKCRzdGlja3lOYXYsICRib2R5LmZpcnN0Q2hpbGQpO1xuXG4gIHZhciAkZm9vdGVyU2hhcmVCYXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZm9vdGVyX19zaGFyZS1iYXInKTtcbiAgdmFyICRzdGlja3lTaGFyZUJhcjtcbiAgaWYgKCRmb290ZXJTaGFyZUJhcikge1xuICAgICRzdGlja3lTaGFyZUJhciA9ICRmb290ZXJTaGFyZUJhci5jbG9uZU5vZGUodHJ1ZSk7XG4gICAgJHN0aWNreVNoYXJlQmFyLmNsYXNzTGlzdC5hZGQoJ2Zvb3Rlcl9fc2hhcmUtYmFyLS1zdGlja3knKTtcbiAgICAkYm9keS5pbnNlcnRCZWZvcmUoJHN0aWNreVNoYXJlQmFyLCAkYm9keS5maXJzdENoaWxkKTtcbiAgfVxuXG4gIC8vIEFjdGl2YXRlIHRoZSBzdGlja3kgbmF2aWdhdGlvbiB3aGVuIHRoZSB1c2VyIHNjcm9sbHMgdXAuXG4gIC8vIFRoaXMgd2lsbCBmaXJzIHRha2UgZWZmZWN0LCB3aGVuIHRoZSB1c2VyIGhhcyBzY3JvbGxlZCBcImEgc2NyZWVuXCIgZG93bi5cbiAgc2Nyb2xsQ2hhbmdlKGZ1bmN0aW9uKCkge1xuICAgICRzdGlja3lOYXYuY2xhc3NMaXN0LnJlbW92ZSgnbmF2LS1hY3RpdmUnKTtcbiAgICBpZiAoJHN0aWNreVNoYXJlQmFyKSB7XG4gICAgICAkc3RpY2t5U2hhcmVCYXIuY2xhc3NMaXN0LnJlbW92ZSgnZm9vdGVyX19zaGFyZS1iYXItLXN0aWNreS1hY3RpdmUnKTtcbiAgICB9XG4gIH0sIGZ1bmN0aW9uKCkge1xuICAgIGlmICh3aW5kb3cuc2Nyb2xsWSA+IHdpbmRvdy5pbm5lckhlaWdodCkge1xuICAgICAgJHN0aWNreU5hdi5jbGFzc0xpc3QuYWRkKCduYXYtLWFjdGl2ZScpO1xuICAgICAgaWYgKCRzdGlja3lTaGFyZUJhcikge1xuICAgICAgICAkc3RpY2t5U2hhcmVCYXIuY2xhc3NMaXN0LmFkZCgnZm9vdGVyX19zaGFyZS1iYXItLXN0aWNreS1hY3RpdmUnKTtcbiAgICAgIH1cbiAgICB9XG4gIH0pO1xuXG4gIC8qKlxuICAgKiBIaWRlIHN0aWNreSBuYXZpZ2F0aW9uIHdoZW4gc2Nyb2xsZWQgdG8gdGhlIHRvcCBvZiB0aGUgZG9jdW1lbnRcbiAgICogQHJldHVybiB7dm9pZH1cbiAgICovXG4gIHZhciBvblRvcCA9IGZ1bmN0aW9uKCkge1xuICAgIHZhciBzY3JvbGxQb3MgPSB3aW5kb3cuc2Nyb2xsWSB8fCBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuc2Nyb2xsVG9wO1xuICAgIGlmIChzY3JvbGxQb3MgPD0gMCkge1xuICAgICAgJHN0aWNreU5hdi5jbGFzc0xpc3QuYWRkKCduYXYtLWhpZGRlbicpO1xuICAgICAgJHN0aWNreU5hdi5jbGFzc0xpc3QucmVtb3ZlKCduYXYtLWFjdGl2ZScpO1xuICAgICAgaWYgKCRzdGlja3lTaGFyZUJhcikge1xuICAgICAgICAkc3RpY2t5U2hhcmVCYXIuY2xhc3NMaXN0LnJlbW92ZSgnZm9vdGVyX19zaGFyZS1iYXItLXN0aWNreS1hY3RpdmUnKTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgJHN0aWNreU5hdi5jbGFzc0xpc3QucmVtb3ZlKCduYXYtLWhpZGRlbicpO1xuICAgIH1cbiAgICBpZiAoJHN0aWNreVNoYXJlQmFyKSB7XG4gICAgICB2YXIgdGhyZXNob2xkID0gJGZvb3RlclNoYXJlQmFyLm9mZnNldEhlaWdodCAvIHdpbmRvdy5pbm5lckhlaWdodDtcbiAgICAgIGlmIChoYXNTY3JvbGxlZFBhc3QoJGZvb3RlclNoYXJlQmFyLCAtMSAqIHRocmVzaG9sZCkpIHtcbiAgICAgICAgJHN0aWNreVNoYXJlQmFyLmNsYXNzTGlzdC5hZGQoJ2hpZGRlbicpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgJHN0aWNreVNoYXJlQmFyLmNsYXNzTGlzdC5yZW1vdmUoJ2hpZGRlbicpO1xuICAgICAgfVxuICAgIH1cbiAgfTtcblxuICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignc2Nyb2xsJywgZGVib3VuY2Uob25Ub3ApKTtcbiAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3Jlc2l6ZScsIGRlYm91bmNlKG9uVG9wKSk7XG5cbiAgLy8gQ2hhbmdlIHdvcmRpbmcgb24gXCJzaWduIGluXCIgYnV0dG9uIHdoZW4gdXNlciBpcyBsb2dnZWQgaW5cbiAgZ2V0VXNlckRhdGEoKS50aGVuKGZ1bmN0aW9uKCkge1xuICAgIGdldEFsbCgnLm5hdl9faXRlbS0tc2lnbi1pbicpLmZvckVhY2goZnVuY3Rpb24oJHNpZ25pbikge1xuICAgICAgJHNpZ25pbi5pbm5lckhUTUwgPSAnQ3JlYXRlIGEgc3RvcnknO1xuICAgIH0pO1xuICB9KS5jYXRjaChmdW5jdGlvbigpIHt9KTtcblxufVxuIiwiLyoqXG4gKiBIYW5kbGUgcmVzcG9uc2VzIGFuZCBsaWtlcyBpbiBwb3N0c1xuICovXG5cbi8vIERlcGVuZGVuY2llc1xuaW1wb3J0IGdldEFsbCBmcm9tICdkcy1hc3NldHMvZG9tL2dldC1hbGwnO1xuaW1wb3J0IGxhenlJbWFnZXMgZnJvbSAnZHMtYXNzZXRzL2xhenkvaW1hZ2VzJztcbmltcG9ydCAqIGFzIGFwaSBmcm9tICcuLi9saWIvYXBpJztcbmltcG9ydCBnZXRVc2VyRGF0YSBmcm9tICcuLi9saWIvZ2V0LWxvZ2dlZC1pbi1kYXRhJztcbmltcG9ydCB1c2VyTWV0YVRlbXBsYXRlIGZyb20gJy4uL3RlbXBsYXRlcy9yZXNwb25zZS1tZXRhJztcbmltcG9ydCByZXNwb25zZVRlbXBsYXRlIGZyb20gJy4uL3RlbXBsYXRlcy9yZXNwb25zZSc7XG5pbXBvcnQgb2Zmc2V0VG9wIGZyb20gJ2RzLWFzc2V0cy9kb20vZ2V0LWRvY3VtZW50LW9mZnNldC10b3AnO1xuaW1wb3J0IGxpdmVWYWxpZGF0aW9uIGZyb20gJy4uL2xpYi9mb3JtL2xpdmUtdmFsaWRhdGlvbic7XG5pbXBvcnQgdmFsaWRhdGVGb3JtIGZyb20gJy4uL2xpYi9mb3JtL3ZhbGlkYXRlJztcblxuLy8gQ2FjaGVkIGRvbSBlbGVtZW50c1xudmFyICRyZXNwb25zZUZvcm07XG52YXIgJGN0YTtcbnZhciAkdmFsaWRhdG9ycztcbnZhciAkcmVzcG9uc2VzTGlzdDtcbnZhciByZW5kZXJSZXNwb25zZXM7XG52YXIgYWRkRGVsZXRlRXZlbnRzO1xudmFyIHNldFJlc3BvbnNlc051bWJlcjtcbnZhciBhZGRSZWFkTW9yZUV2ZW50O1xuXG52YXIgdXBkYXRlUmVzcG9uc2VDVEEgPSBmdW5jdGlvbih2YWxpZCkge1xuXHRpZiAodmFsaWQpIHtcblx0XHQkY3RhLmNsYXNzTGlzdC5yZW1vdmUoJ2J0bi0tZGlzYWJsZWQnKTtcblx0fSBlbHNlIHtcblx0XHQkY3RhLmNsYXNzTGlzdC5hZGQoJ2J0bi0tZGlzYWJsZWQnKTtcblx0fVxufTtcblxuLyoqXG4gKiBEZWxldGUgcmVzcG9uc2Ugd2hlbiBkZWxldGUgaWNvbiBjbGlja2VkXG4gKi9cbmFkZERlbGV0ZUV2ZW50cyA9IGZ1bmN0aW9uKCkge1xuXHRnZXRBbGwoJy5yZXNwb25zZV9fZGVsZXRlJykuZm9yRWFjaChmdW5jdGlvbigkZGVsZXRlKSB7XG5cdFx0JGRlbGV0ZS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uKGUpIHtcblx0XHRcdGUucHJldmVudERlZmF1bHQoKTtcblx0XHRcdGFwaS5yZW1vdmVSZXNwb25zZSgkZGVsZXRlLmRhdGFzZXQucHVibGlzaGVkLCAkZGVsZXRlLmRhdGFzZXQubmFtZSlcblx0XHRcdFx0LnRoZW4oZnVuY3Rpb24oZGF0YSkge1xuXHRcdFx0XHRcdHJlbmRlclJlc3BvbnNlcyhkYXRhLnJlc3BvbnNlcyk7XG5cdFx0XHRcdFx0c2V0UmVzcG9uc2VzTnVtYmVyKGRhdGEucmVzcG9uc2VzKTtcblx0XHRcdFx0fSk7XG5cdFx0fSk7XG5cdH0pO1xufTtcblxuLyoqXG4gKiBFeHBhbmQgcmVzcG9uc2Ugd2l0aCBmdWxsIHRleHQgd2hlbiByZWFkIG1vcmUgYnV0dG9uIGlzIGFjdGl2YXRlZC5cbiAqIEJhc2ljYWxseSBpdCBoaWRlcyB0aGUgZXhjZXJwdCBhbmQgdGhlIHJlYWQgbW9yZSBidXR0b24gYW5kIGRpc3BsYXlzIHRoZVxuICogZnVsbCB0ZXh0LlxuICogQHBhcmFtIHtlbGVtZW50fSAkcmVzcG9uc2VcbiAqL1xuYWRkUmVhZE1vcmVFdmVudCA9IGZ1bmN0aW9uKCRyZXNwb25zZSkge1xuXHR2YXIgJHJlYWRNb3JlID0gJHJlc3BvbnNlLnF1ZXJ5U2VsZWN0b3IoJy5yZXNwb25zZV9fcmVhZC1tb3JlJyk7XG5cdGlmICghJHJlYWRNb3JlKSB7XG5cdFx0cmV0dXJuO1xuXHR9XG5cdCRyZWFkTW9yZS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uKGUpIHtcblx0XHRlLnByZXZlbnREZWZhdWx0KCk7XG5cdFx0dmFyICRleGNlcnB0ID0gJHJlc3BvbnNlLnF1ZXJ5U2VsZWN0b3IoJy5yZXNwb25zZV9fZXhjZXJwdCcpO1xuXHRcdHZhciAkcmVhZE1vcmVDb250YWluZXIgPSAkcmVhZE1vcmUucGFyZW50Tm9kZTtcblxuXHRcdCRyZWFkTW9yZUNvbnRhaW5lci5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKCRyZWFkTW9yZUNvbnRhaW5lcik7XG5cdFx0JGV4Y2VycHQucGFyZW50Tm9kZS5yZW1vdmVDaGlsZCgkZXhjZXJwdCk7XG5cblx0XHQkcmVzcG9uc2UucXVlcnlTZWxlY3RvcignLnJlc3BvbnNlX190ZXh0JykuY2xhc3NMaXN0LnJlbW92ZSgnaGlkZGVuJyk7XG5cdH0pO1xufTtcblxuLyoqXG4gKiBSZW5kZXIgdGVtcGxhdGVzIGZvciByZXNwb25zZXMgYW5kIGluc2VydCBodG1sIGluIHRoZSByZXNwb25zZXMgbGlzdC5cbiAqIC0gTGF6eSBsb2FkIGltYWdlcyBpbiByZXNwb25zZXNcbiAqIC0gQXR0YWNoIG5ldyBldmVudHMgaW4gcmVzcG9uc2VzXG4gKiBAcGFyYW0gIHthcnJheX0gcmVzcG9uc2VzXG4gKiBAcmV0dXJuIHt2b2lkfVxuICovXG5yZW5kZXJSZXNwb25zZXMgPSBmdW5jdGlvbihyZXNwb25zZXMpIHtcblx0dmFyIGh0bWwgPSAnJztcblx0cmVzcG9uc2VzLmZvckVhY2goZnVuY3Rpb24ocmVzcG9uc2UpIHtcblx0XHRodG1sICs9IHJlc3BvbnNlVGVtcGxhdGUocmVzcG9uc2UpO1xuXHR9KTtcblx0JHJlc3BvbnNlc0xpc3QuaW5uZXJIVE1MID0gaHRtbDtcblx0bGF6eUltYWdlcygxKTtcblx0YWRkRGVsZXRlRXZlbnRzKCk7XG5cdGdldEFsbCgnLnJlc3BvbnNlJywgJHJlc3BvbnNlc0xpc3QpLmZvckVhY2goYWRkUmVhZE1vcmVFdmVudCk7XG59O1xuXG4vKipcbiAqIFVwZGF0ZSB0aGUgY291bnQgb2YgcmVzcG9uc2VzXG4gKiBAcGFyYW0ge2FycmF5fSByZXNwb25zZXNcbiAqL1xuc2V0UmVzcG9uc2VzTnVtYmVyID0gZnVuY3Rpb24ocmVzcG9uc2VzKSB7XG5cdGdldEFsbCgnLnNoYXJlX19yZXNwb25zZXMnKS5mb3JFYWNoKGZ1bmN0aW9uKCRyZXNwb25zZXMpIHtcblx0XHQkcmVzcG9uc2VzLmlubmVySFRNTCA9IHJlc3BvbnNlcy5sZW5ndGg7XG5cdH0pO1xufTtcblxuLyoqXG4gKiBVcGRhdGUgdGhlIGNvdW50IGZvIGxpa2VzIGZvciB0aGlzIHBvc3RcbiAqIEBwYXJhbSB7bnVtYmVyfSBsaWtlc1xuICovXG52YXIgc2V0TGlrZXNOdW1iZXIgPSBmdW5jdGlvbihsaWtlcykge1xuXHRnZXRBbGwoJy5zaGFyZV9fbGlrZXMnKS5mb3JFYWNoKGZ1bmN0aW9uKCRsaWtlcykge1xuXHRcdCRsaWtlcy5pbm5lckhUTUwgPSBsaWtlcztcblx0fSk7XG59O1xuXG4vKipcbiAqIEdldCBkYXRhIGZyb20gYXBpIHdpdGggbWV0YSBkYXRhOiByZXNwb25zZXMgYW5kIGxpa2VzLlxuICogUmVuZGVyIHRoaXMgaW4gdGhlIGRvbS5cbiAqIEByZXR1cm4ge3ZvaWR9XG4gKi9cbnZhciByZW5kZXJNZXRhID0gZnVuY3Rpb24oKSB7XG5cdGFwaS5nZXRNZXRhKCkudGhlbihmdW5jdGlvbihkYXRhKSB7XG5cdFx0cmVuZGVyUmVzcG9uc2VzKGRhdGEucmVzcG9uc2VzKTtcblx0XHRzZXRSZXNwb25zZXNOdW1iZXIoZGF0YS5yZXNwb25zZXMpO1xuXHRcdHNldExpa2VzTnVtYmVyKGRhdGEubGlrZXMpO1xuXHR9KTtcbn07XG5cbi8qKlxuICogUG9zdCBuZXcgcmVzcG9uc2UgdG8gcG9zdFxuICogLSBjaGVja3MgZm9yIHZhbGlkYXRpb24gYmVmb3JlIHBvc3RpbmdcbiAqIEBwYXJhbSAge2V2ZW50fSBlXG4gKiBAcmV0dXJuIHt2b2lkfVxuICovXG52YXIgc3VibWl0UmVzcG9uc2UgPSBmdW5jdGlvbihlKSB7XG5cdGUucHJldmVudERlZmF1bHQoKTtcblxuXHR2YXIgbG9nZ2VkSW4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdib2R5JykuY2xhc3NMaXN0LmNvbnRhaW5zKCd1c2VyLWxvZ2dlZC1pbicpO1xuXG5cdC8vIElmIGEgZmllbGQgaXMgbm90IHZhbGlkIHRoaXMgZmllbGQgd2lsbCBnZXQgZm9jdXMsIHNvIHRoZSB1c2VyIHF1aWNrbHkgY2FuIHVwZGF0ZSB0aGUgdmFsdWUuXG5cdHZhciBub3RWYWxpZCA9ICR2YWxpZGF0b3JzLnNvbWUoZnVuY3Rpb24oJHZhbGlkYXRvcikge1xuXHRcdGlmICgkdmFsaWRhdG9yLmNsYXNzTGlzdC5jb250YWlucygndmFsaWRhdGUtLW5vdC12YWxpZCcpKSB7XG5cdFx0XHR2YXIgJHZhbGlkYXRlRmllbGQgPSAkdmFsaWRhdG9yLnF1ZXJ5U2VsZWN0b3IoJ2lucHV0LCB0ZXh0YXJlYScpO1xuXHRcdFx0JHZhbGlkYXRlRmllbGQuZm9jdXMoKTtcblx0XHRcdHJldHVybiB0cnVlO1xuXHRcdH1cblx0fSk7XG5cblx0aWYgKG5vdFZhbGlkKSB7XG5cdFx0cmV0dXJuO1xuXHR9XG5cblx0Ly8gQ3JlYXRlIGEgcmVzcG9uc2Ugb2JqZWN0IGJhc2VkIG9uIHZhbHVlcyBpbiBmb3JtXG5cdHZhciByZXNwb25zZSA9IHt9O1xuXHRnZXRBbGwoJ2lucHV0LCB0ZXh0YXJlYScsICRyZXNwb25zZUZvcm0pLmZvckVhY2goZnVuY3Rpb24oJGZpZWxkKSB7XG5cdFx0dmFyIG5hbWUgPSAkZmllbGQuZ2V0QXR0cmlidXRlKCduYW1lJyk7XG5cdFx0aWYgKCRmaWVsZC52YWx1ZSkge1xuXHRcdFx0cmVzcG9uc2VbbmFtZV0gPSAkZmllbGQudmFsdWU7XG5cdFx0fVxuXHR9KTtcblxuXHQkY3RhLmlubmVySFRNTCA9ICdQb3N0aW5nLi4uJztcblx0JGN0YS5jbGFzc0xpc3QuYWRkKCdidG4tLWRpc2FibGVkJyk7XG5cdGFwaS5hZGRSZXNwb25zZShyZXNwb25zZSkudGhlbihmdW5jdGlvbihkYXRhKSB7XG5cdFx0cmVuZGVyUmVzcG9uc2VzKGRhdGEucmVzcG9uc2VzKTtcblx0XHRzZXRSZXNwb25zZXNOdW1iZXIoZGF0YS5yZXNwb25zZXMpO1xuXG5cdFx0Ly8gU2Nyb2xsIHRvIG5ldyByZXNwb25zZVxuXHRcdHZhciAkbGFzdFJlc3BvbnNlID0gJHJlc3BvbnNlc0xpc3QucXVlcnlTZWxlY3RvcignLnJlc3BvbnNlOmxhc3QtY2hpbGQnKTtcblx0XHR2YXIgb2Zmc2V0ID0gb2Zmc2V0VG9wKCRsYXN0UmVzcG9uc2UpO1xuXHRcdHdpbmRvdy5zY3JvbGxUbygwLCBvZmZzZXQgLSAoMC41ICogd2luZG93LmlubmVySGVpZ2h0KSk7XG5cblx0XHQvLyBSZXNldCBmb3JtXG5cdFx0JGN0YS5pbm5lckhUTUwgPSAnUmVzcG9uZCc7XG5cdFx0aWYgKGxvZ2dlZEluKSB7XG5cdFx0XHR2YXIgJHRleHQgPSAkcmVzcG9uc2VGb3JtLnF1ZXJ5U2VsZWN0b3IoJy5yZXNwb25zZXMtZm9ybV9fdGV4dCcpO1xuXHRcdFx0JHRleHQuY2xhc3NMaXN0LmFkZCgndmFsaWRhdGUtLW5vdC12YWxpZCcpO1xuXHRcdFx0JHRleHQuY2xhc3NMaXN0LnJlbW92ZSgndmFsaWRhdGUtLXZhbGlkJyk7XG5cdFx0XHQkdGV4dC5xdWVyeVNlbGVjdG9yKCd0ZXh0YXJlYScpLnZhbHVlID0gJyc7XG5cdFx0fSBlbHNlIHtcblx0XHRcdCR2YWxpZGF0b3JzLmZvckVhY2goZnVuY3Rpb24oJHZhbGlkYXRvcikge1xuXHRcdFx0XHRpZiAoJHZhbGlkYXRvci5kYXRhc2V0LnZhbGlkYXRlUmVxdWlyZWQgIT09IHVuZGVmaW5lZCkge1xuXHRcdFx0XHRcdCR2YWxpZGF0b3IuY2xhc3NMaXN0LmFkZCgndmFsaWRhdGUtLW5vdC12YWxpZCcpO1xuXHRcdFx0XHRcdCR2YWxpZGF0b3IuY2xhc3NMaXN0LnJlbW92ZSgndmFsaWRhdGUtLXZhbGlkJyk7XG5cdFx0XHRcdH1cblx0XHRcdFx0JHZhbGlkYXRvci5xdWVyeVNlbGVjdG9yKCdpbnB1dCwgdGV4dGFyZWEnKS52YWx1ZSA9ICcnO1xuXHRcdFx0fSk7XG5cdFx0fVxuXHR9KTtcblxufTtcblxuLyoqXG4gKiBVcGRhdGUgaGVhcnQgKGxpa2UpIGljb25zIHRvIGluZGljYXRlLCB0aGF0IHRoZSB1c2VyIGhhdmUgbGlrZWQgdGhlIGFydGljbGVcbiAqIEByZXR1cm4ge3ZvaWR9XG4gKi9cbnZhciBsaWtlZCA9IGZ1bmN0aW9uKCkge1xuXHR2YXIgJHRvb2xUaXBJY29uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnRvb2wtdGlwX19saWtlLWljb24nKTtcblx0JHRvb2xUaXBJY29uLnNldEF0dHJpYnV0ZSgnZGF0YS1zcmMnLCAnL2Fzc2V0cy9pbWFnZXMvaGVhcnQtLWludmVyc2UtLWFjdGl2ZS5zdmcnKTtcblxuXHRnZXRBbGwoJy5wb3N0LWZvb3Rlcl9fbGlrZS1pY29uJykuZm9yRWFjaChmdW5jdGlvbigkZm9vdGVySWNvbikge1xuXHRcdCRmb290ZXJJY29uLnNldEF0dHJpYnV0ZSgnZGF0YS1zcmMnLCAnL2Fzc2V0cy9pbWFnZXMvaGVhcnQtLWludmVyc2UtLWFjdGl2ZS5zdmcnKTtcblx0fSk7XG5cblx0Ly8gSW5kaWNhdGVzLCB0aGF0IHRoZSBsaWtlIGJ1dHRvbiBubyBsb25nZXIgaXMgY2xpY2thYmxlXG5cdGdldEFsbCgnLnNoYXJlX19saWtlJykuZm9yRWFjaCgkbGlrZSA9PiAkbGlrZS5jbGFzc0xpc3QuYWRkKCdkaXNhYmxlZCcpKTtcblxuXHRsYXp5SW1hZ2VzKDEpO1xufTtcblxuLyoqXG4gKiBBY3RpdmF0ZSBsaWtlLCB3aGVuIGxpa2UgYnV0dG9ucyBhcmUgY2xpY2tlZFxuICogQHBhcmFtICB7ZWxlbWVudH0gJGFuY2hvclxuICogQHJldHVybiB7dm9pZH1cbiAqL1xudmFyIGF0dGFjaExpa2VFdmVudCA9IGZ1bmN0aW9uKCRhbmNob3IpIHtcblx0JGFuY2hvci5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uKGUpIHtcblx0XHRlLnByZXZlbnREZWZhdWx0KCk7XG5cblx0XHQvLyBBbHJlYWR5IGxpa2VkIHRoaXMgYXJ0aWNsZVxuXHRcdGlmIChsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnbGlrZTonICsgd2luZG93LnBvc3RJZCkpIHtcblx0XHRcdHJldHVybjtcblx0XHR9XG5cblx0XHRsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgnbGlrZTonICsgd2luZG93LnBvc3RJZCwgdHJ1ZSk7XG5cdFx0bGlrZWQoKTtcblxuXHRcdGFwaS5saWtlKCkudGhlbihmdW5jdGlvbihkYXRhKSB7XG5cdFx0XHRzZXRMaWtlc051bWJlcihkYXRhLmxpa2VzKTtcblx0XHR9KTtcblx0fSk7XG59O1xuXG4vKipcbiAqIFVwZGF0ZSByZXNwb25zZXMgZm9ybSBpZiB1c2VyIGlzIGxvZ2dlZCBpbi5cbiAqIFVzZXIgZG8gbm90IG5lZWQgdG8gZmlsbCBlLW1haWwsIG5hbWUgZXRjLlxuICogQHBhcmFtICB7b2JqZWN0fSBkYXRhXG4gKiBAcmV0dXJuIHt2b2lkfVxuICovXG52YXIgcmVuZGVyVXNlckZvcm0gPSBmdW5jdGlvbih1c2VyKSB7XG5cdHZhciBodG1sID0gdXNlck1ldGFUZW1wbGF0ZSh1c2VyKTtcblx0dmFyICRtZXRhID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG5cdCRtZXRhLmlubmVySFRNTCA9IGh0bWw7XG5cdHZhciAkaGVhZGVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnJlc3BvbnNlc19fZm9ybSBoMycpO1xuXG5cdC8vIEZpbGwgaW5wdXQgZmllbGRzIHdpdGggcmVsZXZhbnQgZGF0YVxuXHRnZXRBbGwoJy5yZXNwb25zZXNfX2Zvcm0gaW5wdXQnKS5mb3JFYWNoKGZ1bmN0aW9uKCRpbnB1dCkge1xuXHRcdHZhciBuYW1lID0gJGlucHV0LmdldEF0dHJpYnV0ZSgnbmFtZScpO1xuXHRcdGlmIChuYW1lID09PSAnd2Vic2l0ZScpIHtcblx0XHRcdCRpbnB1dC52YWx1ZSA9ICcvYXV0aG9yLycgKyB1c2VyLnNsdWc7XG5cdFx0fSBlbHNlIHtcblx0XHRcdCRpbnB1dC52YWx1ZSA9IHVzZXJbbmFtZV07XG5cdFx0fVxuXHRcdCRpbnB1dC5wYXJlbnROb2RlLmNsYXNzTGlzdC5hZGQoJ3ZhbGlkYXRlLS12YWxpZCcpO1xuXHRcdCRpbnB1dC5wYXJlbnROb2RlLmNsYXNzTGlzdC5yZW1vdmUoJ3ZhbGlkYXRlLS1ub3QtdmFsaWQnKTtcblx0fSk7XG5cblx0Ly8gSW5zZXJ0IGFmdGVyIGhlYWRlclxuXHQkaGVhZGVyLnBhcmVudE5vZGUuaW5zZXJ0QmVmb3JlKCRtZXRhLCAkaGVhZGVyLm5leHRTaWJsaW5nKTtcblx0bGF6eUltYWdlcygxKTtcblx0dmFsaWRhdGVGb3JtKCR2YWxpZGF0b3JzLCB1cGRhdGVSZXNwb25zZUNUQSk7XG59O1xuXG4vKipcbiAqIEluaXQgcmVzcG9uc2VzXG4gKiBAcmV0dXJuIHt2b2lkfVxuICovXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbigpIHtcblx0JHJlc3BvbnNlRm9ybSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5yZXNwb25zZXNfX2Zvcm0nKTtcblxuXHRpZiAoISRyZXNwb25zZUZvcm0pIHtcblx0XHRyZXR1cm47XG5cdH1cblxuXHQvLyBDYWNoZSBkb20gZWxlbWVudHNcblx0JGN0YSA9ICRyZXNwb25zZUZvcm0ucXVlcnlTZWxlY3RvcignLmJ0bi0tY3RhJyk7XG5cdCRyZXNwb25zZXNMaXN0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnJlc3BvbnNlc19fbGlzdCcpO1xuXHQkdmFsaWRhdG9ycyA9IGdldEFsbCgnLnZhbGlkYXRlJywgJHJlc3BvbnNlRm9ybSk7XG5cblx0Ly8gVXBkYXRlIGZyb20gYXMgdXNlciB0eXBlc1xuXHRsaXZlVmFsaWRhdGlvbigkdmFsaWRhdG9ycywgdXBkYXRlUmVzcG9uc2VDVEEpO1xuXG5cdC8vIFJlbmRlciByZXNwb25zZXMgYW5kIGxpa2Vcblx0cmVuZGVyTWV0YSgpO1xuXG5cdC8vIENoYW5nZSBmb3JtIGlmIHVzZXIgaXMgbG9nZ2VkIGluXG5cdGdldFVzZXJEYXRhKCkudGhlbihyZW5kZXJVc2VyRm9ybSkuY2F0Y2goZnVuY3Rpb24oKSB7fSk7XG5cblx0Ly8gVXNlciBhbHJlYWR5IGxpa2VzIHRoaXMgYXJ0aWNsZVxuXHRpZiAobG9jYWxTdG9yYWdlLmdldEl0ZW0oJ2xpa2U6JyArIHdpbmRvdy5wb3N0SWQpKSB7XG5cdFx0bGlrZWQoKTtcblx0fVxuXG5cdGdldEFsbCgnLnNoYXJlX19saWtlJykuZm9yRWFjaChhdHRhY2hMaWtlRXZlbnQpO1xuXHQkY3RhLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgc3VibWl0UmVzcG9uc2UpO1xuXG5cdC8vIFNob3cgbWFya2Rvd24gaGVscGVyc1xuXHRkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucmVzcG9uc2UtZm9ybV9fbWFya2Rvd24tZXhwYW5kZXInKS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uKGUpIHtcblx0XHRlLnByZXZlbnREZWZhdWx0KCk7XG5cdFx0ZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnJlc3BvbnNlLWZvcm1fX21hcmtkb3duLWhlbHBlcnMnKS5jbGFzc0xpc3QucmVtb3ZlKCdoaWRkZW4nKTtcblx0fSk7XG5cbn1cbiIsImltcG9ydCBsYXp5SW1hZ2VzIGZyb20gJ2RzLWFzc2V0cy9sYXp5L2ltYWdlcyc7XG5pbXBvcnQgZ2V0QWxsIGZyb20gJ2RzLWFzc2V0cy9kb20vZ2V0LWFsbCc7XG5pbXBvcnQgKiBhcyBhcGkgZnJvbSAnLi4vbGliL2FwaSc7XG5pbXBvcnQgcG9zdFRlbXBsYXRlIGZyb20gJy4uL3RlbXBsYXRlcy9wb3N0JztcbmltcG9ydCBhdXRob3JUZW1wbGF0ZSBmcm9tICcuLi90ZW1wbGF0ZXMvYXV0aG9yJztcbmltcG9ydCB0YWdUZW1wbGF0ZSBmcm9tICcuLi90ZW1wbGF0ZXMvdGFnJztcblxuY29uc3QgTUFYX1JFU1VMVFMgPSAxMDtcblxudmFyICRzZWFyY2hJbnB1dDtcbnZhciAkc2VhcmNoTGlzdDtcbnZhciBsYXRlc3RDb3VudGVyID0gMDtcblxudmFyIGdldFNlYXJjaFJlc3VsdCA9IGZ1bmN0aW9uKHBhdGgpIHtcblx0dmFyIGFic29sdXRlID0gd2luZG93Lmdob3N0LnVybC5hcGkocGF0aCwge1xuXHRcdGluY2x1ZGU6ICd0YWdzLGF1dGhvcixjb3VudC5wb3N0cydcblx0fSk7XG5cdHZhciByZWxhdGl2ZSA9IGFic29sdXRlLnN1YnN0cihhYnNvbHV0ZS5pbmRleE9mKCcvZ2hvc3QnKSwgYWJzb2x1dGUubGVuZ3RoKTtcblx0cmV0dXJuIGZldGNoKHJlbGF0aXZlKVxuXHRcdC50aGVuKGZ1bmN0aW9uKHJlc3BvbnNlKSB7XG5cdFx0XHRpZiAocmVzcG9uc2Uuc3RhdHVzID49IDMwMCkge1xuXHRcdFx0XHRyZXR1cm4gUHJvbWlzZS5yZWplY3QocmVzcG9uc2UpO1xuXHRcdFx0fVxuXHRcdFx0cmV0dXJuIHJlc3BvbnNlO1xuXHRcdH0pXG5cdFx0LnRoZW4ocmVzcG9uc2UgPT4gcmVzcG9uc2UuanNvbigpKTtcbn07XG5cbnZhciByZW5kZXJSZXN1bHRzID0gZnVuY3Rpb24ocmVzdWx0cykge1xuXHR2YXIgaHRtbCA9IHJlc3VsdHMubWFwKGZ1bmN0aW9uKHJlc3VsdCkge1xuXHRcdGlmIChyZXN1bHQucG9zdHMpIHtcblx0XHRcdHJldHVybiBwb3N0VGVtcGxhdGUocmVzdWx0LnBvc3RzWzBdKTtcblx0XHR9XG5cdFx0aWYgKHJlc3VsdC51c2Vycykge1xuXHRcdFx0cmV0dXJuIGF1dGhvclRlbXBsYXRlKHJlc3VsdC51c2Vyc1swXSk7XG5cdFx0fVxuXHRcdGlmIChyZXN1bHQudGFncykge1xuXHRcdFx0cmV0dXJuIHRhZ1RlbXBsYXRlKHJlc3VsdC50YWdzWzBdKTtcblx0XHR9XG5cdFx0cmV0dXJuICcnO1xuXHR9KS5qb2luKCcnKTtcblx0JHNlYXJjaExpc3QuaW5uZXJIVE1MID0gaHRtbDtcblx0bGF6eUltYWdlcygxKTtcblx0Z2V0QWxsKCcuYm94ZXNfX2l0ZW0nLCAkc2VhcmNoTGlzdCkuZm9yRWFjaChmdW5jdGlvbigkYm94SXRlbSwgaSkge1xuXHRcdHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XG5cdFx0XHQkYm94SXRlbS5jbGFzc0xpc3QucmVtb3ZlKCdoaWRkZW4nKTtcblx0XHRcdHNldFRpbWVvdXQoKCkgPT4gJGJveEl0ZW0uY2xhc3NMaXN0LmFkZCgnYW5pbWF0ZS0tYWN0aXZlJyksIDApO1xuXHRcdH0sIGkgKiA1MDApO1xuXHR9KTtcbn07XG5cbnZhciBzZWFyY2ggPSBmdW5jdGlvbihxdWVyeSkge1xuXG5cdHZhciBpZCA9ICsrbGF0ZXN0Q291bnRlcjtcblx0dmFyIG1pblRpbWUgPSBEYXRlLm5vdygpICsgMzAwO1xuXG5cdCRzZWFyY2hMaXN0LmlubmVySFRNTCA9ICcnO1xuXG5cdHZhciBpc0xhdGVzdCA9IGZ1bmN0aW9uKGRhdGEpIHtcblx0XHRpZiAoaWQgIT09IGxhdGVzdENvdW50ZXIpIHtcblx0XHRcdHJldHVybiBQcm9taXNlLnJlamVjdCgpO1xuXHRcdH1cblx0XHRyZXR1cm4gZGF0YTtcblx0fTtcblxuXHRhcGkuZ2V0U2VhcmNoSW5kZXgocXVlcnkpXG5cdFx0LnRoZW4oaXNMYXRlc3QpXG5cdFx0LnRoZW4oZnVuY3Rpb24oaW5kZXhlcykge1xuXHRcdFx0dmFyIHByb21pc2VzID0gaW5kZXhlcy5zbGljZSgwLCBNQVhfUkVTVUxUUykubWFwKGZ1bmN0aW9uKGluZGV4KSB7XG5cdFx0XHRcdHJldHVybiBnZXRTZWFyY2hSZXN1bHQoaW5kZXgucmVmKTtcblx0XHRcdH0pO1xuXHRcdFx0cmV0dXJuIFByb21pc2UuYWxsKHByb21pc2VzKTtcblx0XHR9KVxuXHRcdC50aGVuKGZ1bmN0aW9uKGRhdGEpIHtcblx0XHRcdGlmIChtaW5UaW1lIDwgRGF0ZS5ub3coKSkge1xuXHRcdFx0XHRyZXR1cm4gZGF0YTtcblx0XHRcdH1cblx0XHRcdHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbihyZXNvbHZlKSB7XG5cdFx0XHRcdHNldFRpbWVvdXQoKCkgPT4gcmVzb2x2ZShkYXRhKSwgbWluVGltZSAtIERhdGUubm93KCkpO1xuXHRcdFx0fSk7XG5cdFx0fSlcblx0XHQudGhlbihpc0xhdGVzdClcblx0XHQudGhlbihyZW5kZXJSZXN1bHRzKVxuXHRcdC5jYXRjaChmdW5jdGlvbihlcnIpIHtcblx0XHRcdGlmIChlcnIpIHtcblx0XHRcdFx0Y29uc29sZS5lcnJvcihlcnIpO1xuXHRcdFx0fVxuXHRcdH0pO1xufTtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24oKSB7XG5cblx0JHNlYXJjaElucHV0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnNlYXJjaF9faW5wdXQnKTtcblx0JHNlYXJjaExpc3QgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuc2VhcmNoX19saXN0Jyk7XG5cblx0aWYgKCEkc2VhcmNoSW5wdXQgfHwgISRzZWFyY2hMaXN0KSB7XG5cdFx0cmV0dXJuO1xuXHR9XG5cdCRzZWFyY2hJbnB1dC5hZGRFdmVudExpc3RlbmVyKCdpbnB1dCcsIGZ1bmN0aW9uKCkge1xuXHRcdHNlYXJjaCgkc2VhcmNoSW5wdXQudmFsdWUpO1xuXHR9KTtcblxuXHQkc2VhcmNoSW5wdXQuZm9jdXMoKTtcblxuXHQkc2VhcmNoTGlzdC5zZXRBdHRyaWJ1dGUoJ3N0eWxlJywgYG1pbi1oZWlnaHQ6ICR7d2luZG93LmlubmVySGVpZ2h0fXB4YCk7XG5cbn1cbiIsIi8qKlxuICogVG9vbCB0aXAgc2hvd2VkIHdoZW4gdXNlciBtYXJrcyB0ZXh0IGluIGFydGljbGUuXG4gKiBUaGlzIG1ha2VzIHRoZSB1c2UgYWJsZSB0byBzaGFyZS9jb21tZW50IG9uIHRoZSBtYXJrZWQuXG4gKi9cblxuaW1wb3J0IHZhbGlkYXRlRm9ybSBmcm9tICcuLi9saWIvZm9ybS92YWxpZGF0ZSc7XG5pbXBvcnQgZ2V0QWxsIGZyb20gJ2RzLWFzc2V0cy9kb20vZ2V0LWFsbCc7XG5cbi8vIENhY2hlZCBkb20gZWxlbWVudHNcbnZhciAkcG9zdENvbnRlbnQ7XG52YXIgJHRvb2xUaXA7XG52YXIgJHR3aXR0ZXI7XG52YXIgJHJlc3BvbnNlRm9ybTtcbnZhciAkY3RhO1xuXG5cbi8qKlxuICogR2V0IHRoZSB0ZXh0IHNlbGVjdGVkIGJ5IHRoZSB1c2VyXG4gKiBAcmV0dXJuIHtzdHJpbmd9XG4gKi9cbnZhciBnZXRTZWxlY3RlZFRleHQgPSBmdW5jdGlvbigpIHtcblx0dmFyIHRleHQgPSAnJztcblx0aWYgKHR5cGVvZiB3aW5kb3cuZ2V0U2VsZWN0aW9uICE9PSAndW5kZWZpbmVkJykge1xuXHRcdHRleHQgPSB3aW5kb3cuZ2V0U2VsZWN0aW9uKCkudG9TdHJpbmcoKTtcblx0fSBlbHNlIGlmICh0eXBlb2YgZG9jdW1lbnQuc2VsZWN0aW9uICE9PSAndW5kZWZpbmVkJyAmJiBkb2N1bWVudC5zZWxlY3Rpb24udHlwZSA9PT0gJ1RleHQnKSB7XG5cdFx0dGV4dCA9IGRvY3VtZW50LnNlbGVjdGlvbi5jcmVhdGVSYW5nZSgpLnRleHQ7XG5cdH1cblx0cmV0dXJuIHRleHQ7XG59O1xuXG4vKipcbiAqIENoZWNrIGlmIHRoZSBzZWxlY3RlZCB0ZXh0IGlzIGluc2lkZSB0aGUgY29udGVudCBjb250YWluZXJcbiAqIEBwYXJhbSAge29iamVjdH0gIHNlbGVjdGlvblxuICogQHJldHVybiB7Qm9vbGVhbn1cbiAqL1xudmFyIGlzSW5zaWRlQ29udGVudCA9IGZ1bmN0aW9uKHNlbGVjdGlvbikge1xuXHR2YXIgJGNvbnRhaW5lciA9IHNlbGVjdGlvbi5hbmNob3JOb2RlLnBhcmVudEVsZW1lbnQ7XG5cblx0d2hpbGUgKCRjb250YWluZXIgIT09ICRwb3N0Q29udGVudCAmJiAkY29udGFpbmVyLnBhcmVudE5vZGUpIHtcblx0XHQkY29udGFpbmVyID0gJGNvbnRhaW5lci5wYXJlbnROb2RlO1xuXHR9XG5cblx0cmV0dXJuICgkY29udGFpbmVyID09PSAkcG9zdENvbnRlbnQpO1xuXG59O1xuXG4vKipcbiAqIFBsYWNlcyB0aGUgdG9vbCB0aXAgYWJvdmUgdGhlIHNlbGVjdGVkIHRleHRcbiAqIEByZXR1cm4ge3ZvaWR9XG4gKi9cbnZhciBwbGFjZVRvb2xUaXAgPSBmdW5jdGlvbigpIHtcblxuXHQvLyBUaW1lb3V0IHRvIG1ha2Ugc3VyZSB0aGUgdGV4dCBoYXMgYmVlbiBzZWxlY3RlZFxuXHRzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xuXG5cdFx0dmFyIGhpZ2hsaWdodGVkVGV4dCA9IGdldFNlbGVjdGVkVGV4dCgpO1xuXG5cdFx0Ly8gSGlkZSB0b29sIHRpcCBpZiBub3RoaW5nIGlzIHNlbGVjdGVkXG5cdFx0aWYgKCFoaWdobGlnaHRlZFRleHQpIHtcblx0XHRcdCR0b29sVGlwLmNsYXNzTGlzdC5yZW1vdmUoJ3Rvb2wtdGlwLS12aXNpYmxlJyk7XG5cdFx0XHRyZXR1cm47XG5cdFx0fVxuXG5cdFx0Ly8gRGlzcGxheSB0b29sIHRpcCBpZiBzZWxlY3Rpb24gaXMgaW5zaWRlIHRoZSBjb250ZW50IGNvbnRhaW5lclxuXHRcdHZhciBzZWxlY3Rpb24gPSB3aW5kb3cuZ2V0U2VsZWN0aW9uKCk7XG5cdFx0aWYgKCFpc0luc2lkZUNvbnRlbnQoc2VsZWN0aW9uKSkge1xuXHRcdFx0JHRvb2xUaXAuY2xhc3NMaXN0LnJlbW92ZSgndG9vbC10aXAtLXZpc2libGUnKTtcblx0XHRcdHJldHVybjtcblx0XHR9XG5cblx0XHQvLyBDaGFuZ2UgY29udGV4dHVhbCBhY3Rpb25zXG5cdFx0JHR3aXR0ZXIuc2V0QXR0cmlidXRlKCdocmVmJywgYGh0dHBzOi8vdHdpdHRlci5jb20vaW50ZW50L3R3ZWV0P3RleHQ9JHtlbmNvZGVVUklDb21wb25lbnQoaGlnaGxpZ2h0ZWRUZXh0KX0mdXJsPSR7ZW5jb2RlVVJJQ29tcG9uZW50KCR0d2l0dGVyLmRhdGFzZXQudXJsKX1gKTtcblxuXHRcdC8vIFNob3cgYW5kIHBsYWNlIHRvb2wgdGlwXG5cdFx0dmFyIHNjcm9sbFBvc2l0aW9uID0gKHdpbmRvdy5zY3JvbGxZIHx8IGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5zY3JvbGxUb3ApO1xuXHRcdHZhciByYW5nZSA9IHNlbGVjdGlvbi5nZXRSYW5nZUF0KDApO1xuXHRcdHZhciByZWN0ID0gcmFuZ2UuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG5cdFx0JHRvb2xUaXAuc3R5bGUudG9wID0gKHJlY3QudG9wICsgc2Nyb2xsUG9zaXRpb24pICsgJ3B4Jztcblx0XHQkdG9vbFRpcC5jbGFzc0xpc3QuYWRkKCd0b29sLXRpcC0tdmlzaWJsZScpO1xuXHRcdCR0b29sVGlwLnN0eWxlLmxlZnQgPSAoMC41ICogcmVjdC5sZWZ0ICsgMC41ICogcmVjdC5yaWdodCAtIDAuNSAqICR0b29sVGlwLmNsaWVudFdpZHRoKSArICdweCc7XG5cdH0sIDEwKTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uKCkge1xuXHQkcG9zdENvbnRlbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuY29udGVudCcpO1xuXHQkdG9vbFRpcCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy50b29sLXRpcCcpO1xuXG5cdGlmICghJHBvc3RDb250ZW50IHx8ICEkdG9vbFRpcCkge1xuXHRcdHJldHVybjtcblx0fVxuXG5cdCRyZXNwb25zZUZvcm0gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucmVzcG9uc2VzX19mb3JtJyk7XG5cdCRjdGEgPSAkcmVzcG9uc2VGb3JtLnF1ZXJ5U2VsZWN0b3IoJy5idG4tLWN0YScpO1xuXG5cdCR0d2l0dGVyID0gJHRvb2xUaXAucXVlcnlTZWxlY3RvcignLnRvb2wtdGlwX190d2l0dGVyJyk7XG5cblx0ZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignbW91c2V1cCcsIHBsYWNlVG9vbFRpcCk7XG5cdGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2tleXVwJywgcGxhY2VUb29sVGlwKTtcblxuXHQvLyBGaWxsIGZvcm0gd2l0aCBzZWxlY3RlZCB0ZXh0IHRvIG1ha2UgYSBxdWljayByZXNwb25zZSBvbiB0aGUgYXJ0aWNsZSBieVxuXHQvLyB0aGUgdXNlclxuXHR2YXIgJHJlc3BvbnNlVGV4dCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5yZXNwb25zZXNfX2Zvcm0gdGV4dGFyZWEnKTtcblx0JHRvb2xUaXAucXVlcnlTZWxlY3RvcignLnRvb2wtdGlwX19yZXNwb25zZScpLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24oZSkge1xuXHRcdGUucHJldmVudERlZmF1bHQoKTtcblx0XHR2YXIgaGlnaGxpZ2h0ZWRUZXh0ID0gZ2V0U2VsZWN0ZWRUZXh0KCk7XG5cdFx0JHJlc3BvbnNlVGV4dC52YWx1ZSA9IGA+ICR7aGlnaGxpZ2h0ZWRUZXh0fVxuXG5gO1xuXHRcdCRyZXNwb25zZVRleHQuZm9jdXMoKTtcblx0XHQkcmVzcG9uc2VUZXh0LnBhcmVudE5vZGUuY2xhc3NMaXN0LmFkZCgndmFsaWRhdGUtLXZhbGlkJyk7XG5cdFx0JHJlc3BvbnNlVGV4dC5wYXJlbnROb2RlLmNsYXNzTGlzdC5yZW1vdmUoJ3ZhbGlkYXRlLS1ub3QtdmFsaWQnKTtcblx0XHR2YXIgdmFsaWQgPSB2YWxpZGF0ZUZvcm0oZ2V0QWxsKCcudmFsaWRhdGUnLCAkcmVzcG9uc2VGb3JtKSk7XG5cdFx0aWYgKHZhbGlkKSB7XG5cdFx0XHQkY3RhLmNsYXNzTGlzdC5yZW1vdmUoJ2J0bi0tZGlzYWJsZWQnKTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0JGN0YS5jbGFzc0xpc3QuYWRkKCdidG4tLWRpc2FibGVkJyk7XG5cdFx0fVxuXHR9KTtcbn1cbiIsIi8qKlxuICogSGVscGVycyBmb3IgY29tbXVuaWNhdGluZyB3aXRoIHRoZSBtZXRhIGFwaSBob2xkaW5nIHJlc3BvbnNlcyBhbmQgbGlrZXMgZm9yXG4gKiB0aGUgYXJ0aWNsZXMuXG4gKi9cblxudmFyIGFwaVVybCA9IHdpbmRvdy5hcGlVUkw7XG52YXIgaWQgPSB3aW5kb3cucG9zdElkO1xuXG4vKipcbiAqIE1ha2UgYSBBSkFYIGNhbGwgdG8gdGhlIGFwaVxuICogQHBhcmFtICB7U3RyaW5nfSBwYXRoXG4gKiBAcGFyYW0gIHtTdHJpbmd9IG1ldGhvZFxuICogQHBhcmFtICB7b2JqZWN0fSBkYXRhXG4gKiBAcmV0dXJuIHtQcm9taXNlfVxuICovXG52YXIgcmVxdWVzdCA9IGZ1bmN0aW9uKHBhdGggPSAnJywgbWV0aG9kID0gJ0dFVCcsIGRhdGEgPSBudWxsKSB7XG5cbiAgdmFyIGZldGNoT3B0aW9ucyA9IHtcbiAgICBtZXRob2QsXG4gICAgaGVhZGVyczoge1xuICAgICAgJ0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uOyBjaGFyc2V0PXV0Zi04J1xuICAgIH1cbiAgfTtcblxuICBpZiAoZGF0YSkge1xuICAgIGZldGNoT3B0aW9ucy5ib2R5ID0gSlNPTi5zdHJpbmdpZnkoZGF0YSk7XG4gIH1cblxuICAvLyBQZXJmb3JtIHRoZSBhamF4IGNhbGxcbiAgcmV0dXJuIGZldGNoKGFwaVVybCArIHBhdGgsIGZldGNoT3B0aW9ucylcbiAgICAudGhlbihmdW5jdGlvbihyZXNwb25zZSkge1xuICAgICAgaWYgKHJlc3BvbnNlLnN0YXR1cyA+PSAzMDApIHtcbiAgICAgICAgcmV0dXJuIFByb21pc2UucmVqZWN0KHJlc3BvbnNlKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiByZXNwb25zZTtcbiAgICB9KVxuICAgIC50aGVuKHJlc3BvbnNlID0+IHJlc3BvbnNlLmpzb24oKSk7XG59O1xuXG4vKipcbiAqIEdldCBtZXRhIGRhdGEgZnJvbSB0aGUgYXJ0aWNsZS4gSWYgbm8gbWV0YSBkYXRhIGlzIHByZXNlbnQgZm9yIHRoZSBhY3R1YWxcbiAqIGFydGljbGUgYW5kIG5ldyBlbnRyeSB3aWxsIGJlIG1hZGUuXG4gKiBAcGFyYW0gIHtib29sZWFufSByYXcgV2hldGhlciB0byBpbmNsdWRlIGNvbXB1dGVkIGZpZWxkc1xuICogQHJldHVybiB7UHJvbWlzZX1cbiAqL1xuZXhwb3J0IHZhciBnZXRNZXRhID0gZnVuY3Rpb24ocmF3KSB7XG4gIHZhciBxdWVyeSA9ICc/aWQ9JyArIGlkO1xuICBpZiAocmF3KSB7XG4gICAgcXVlcnkgKz0gJyZyYXcnO1xuICB9XG4gIHJldHVybiByZXF1ZXN0KHF1ZXJ5KVxuICAgIC5jYXRjaChmdW5jdGlvbigpIHtcbiAgICAgIHJldHVybiByZXF1ZXN0KCcnLCAnUE9TVCcsIHtcbiAgICAgICAgcmVzcG9uc2VzOiBbXSxcbiAgICAgICAgbGlrZXM6IDAsXG4gICAgICAgIGlkXG4gICAgICB9KTtcbiAgICB9KTtcbn07XG5cbmV4cG9ydCB2YXIgZ2V0U2VhcmNoSW5kZXggPSBmdW5jdGlvbihxdWVyeSkge1xuICByZXR1cm4gcmVxdWVzdCgnc2VhcmNoP3E9JyArIHF1ZXJ5KTtcbn07XG5cbi8qKlxuICogSW5jcmVtZW50IHRoZSBsaWtlIHZhbHVlIHdpdGggb25lXG4gKiBAcmV0dXJuIHtQcm9taXNlfVxuICovXG5leHBvcnQgdmFyIGxpa2UgPSBmdW5jdGlvbigpIHtcbiAgcmV0dXJuIGdldE1ldGEoaWQsIHRydWUpXG4gICAgLnRoZW4oZnVuY3Rpb24oZGF0YSkge1xuICAgICAgcmV0dXJuIHJlcXVlc3QoJz9pZD0nICsgaWQsICdQVVQnLCB7XG4gICAgICAgIGxpa2VzOiBkYXRhLmxpa2VzICsgMVxuICAgICAgfSk7XG4gICAgfSk7XG59O1xuXG4vKipcbiAqIFVwZGF0ZSBhdXRob3IgZW1haWwgdXNlZCB0byBzZW5kIGUtbWFpbHMgd2hlbiBhIHJlc3BvbnNlIGkgcmVjZWl2ZWQuXG4gKiBAcmV0dXJuIHtQcm9taXNlfVxuICovXG5leHBvcnQgdmFyIHVwZGF0ZUF1dGhvckVtYWlsID0gZnVuY3Rpb24oYXV0aG9yRW1haWwpIHtcbiAgaWYgKCFpZCkge1xuICAgIHJldHVybiBQcm9taXNlLnJlamVjdChuZXcgRXJyb3IoJ05vIHBvc3RJZCcpKTtcbiAgfVxuICByZXR1cm4gcmVxdWVzdCgnP2lkPScgKyBpZCwgJ1BVVCcsIHtcbiAgICBhdXRob3JFbWFpbFxuICB9KTtcbn07XG5cbi8qKlxuICogQWRkIGEgcmVzcG9uc2VcbiAqIEBwYXJhbSB7b2JqZWN0fSByZXNwb25zZVxuICogQHJldHVybiB7UHJvbWlzZX1cbiAqL1xuZXhwb3J0IHZhciBhZGRSZXNwb25zZSA9IGZ1bmN0aW9uKHJlc3BvbnNlKSB7XG4gIHJldHVybiBnZXRNZXRhKHRydWUpXG4gICAgLnRoZW4oZnVuY3Rpb24oZGF0YSkge1xuXG4gICAgICAvLyBTZXQgdGhlIHB1Ymxpc2ggZGF0YSB0byBub3dcbiAgICAgIHJlc3BvbnNlLnB1Ymxpc2hlZCA9IG5ldyBEYXRlKCkudG9JU09TdHJpbmcoKTtcblxuICAgICAgLy8gVXBkYXRlIHRoZSByZXNwb25zZXMgbGlzdFxuICAgICAgZGF0YS5yZXNwb25zZXMucHVzaChyZXNwb25zZSk7XG4gICAgICByZXR1cm4gcmVxdWVzdCgnP2lkPScgKyBpZCwgJ1BVVCcsIHtcbiAgICAgICAgcmVzcG9uc2VzOiBkYXRhLnJlc3BvbnNlc1xuICAgICAgfSk7XG4gICAgfSk7XG59O1xuXG4vKipcbiAqIFJlbW92ZSBhIHJlc3BvbnNlXG4gKiBAcGFyYW0gIHtzdHJpbmd9IHB1Ymxpc2hlZFxuICogQHBhcmFtICB7c3RyaW5nfSBuYW1lXG4gKiBAcmV0dXJuIHtQcm9taXNlfVxuICovXG5leHBvcnQgdmFyIHJlbW92ZVJlc3BvbnNlID0gZnVuY3Rpb24ocHVibGlzaGVkLCBuYW1lKSB7XG4gIHJldHVybiBnZXRNZXRhKHRydWUpXG4gICAgLnRoZW4oZnVuY3Rpb24oZGF0YSkge1xuXG4gICAgICAvLyBSZW1vdmUgcmVzcG9zZSB3aGljaCBtYXRjaGVzIG9uIHB1Ymxpc2ggZGF0ZSBhbmQgYXV0aG9yIG5hbWVcbiAgICAgIHZhciByZXNwb25zZXMgPSBkYXRhLnJlc3BvbnNlcy5maWx0ZXIoZnVuY3Rpb24ocmVzcG9uc2UpIHtcbiAgICAgICAgcmV0dXJuIChyZXNwb25zZS5wdWJsaXNoZWQgIT09IHB1Ymxpc2hlZCB8fCByZXNwb25zZS5uYW1lICE9PSBuYW1lKTtcbiAgICAgIH0pO1xuXG4gICAgICByZXR1cm4gcmVxdWVzdCgnP2lkPScgKyBpZCwgJ1BVVCcsIHtcbiAgICAgICAgcmVzcG9uc2VzXG4gICAgICB9KTtcbiAgICB9KTtcbn07XG4iLCIvKipcbiAqIFZhbGlkYXRlIGlucHV0IGZpZWxkcyBhcyB1c2VyIHR5cGVzXG4gKi9cblxuLy8gRGVwZW5kZW5jaWVzXG5pbXBvcnQgdmFsaWRhdGVGb3JtIGZyb20gJy4vdmFsaWRhdGUnO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbigkdmFsaWRhdG9ycywgY2FsbGJhY2spIHtcblx0JHZhbGlkYXRvcnMuZm9yRWFjaChmdW5jdGlvbigkdmFsaWRhdGVDb250YWluZXIpIHtcblx0XHR2YXIgJHZhbGlkYXRlRmllbGQgPSAkdmFsaWRhdGVDb250YWluZXIucXVlcnlTZWxlY3RvcignaW5wdXQsIHRleHRhcmVhJyk7XG5cblx0XHQkdmFsaWRhdGVGaWVsZC5hZGRFdmVudExpc3RlbmVyKCdpbnB1dCcsIGZ1bmN0aW9uKCkge1xuXHRcdFx0dmFyIHZhbGlkID0gdmFsaWRhdGVGb3JtKCR2YWxpZGF0b3JzKTtcblx0XHRcdGNhbGxiYWNrKHZhbGlkKTtcblx0XHR9KTtcblx0fSk7XG59XG4iLCIvKipcbiAqIENoZWNrIGlmIHRoZSBmb3JtIGlzIHZhbGlkXG4gKi9cblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24oJHZhbGlkYXRvcnMpIHtcblx0dmFyIG5vdFZhbGlkID0gJHZhbGlkYXRvcnMuc29tZShmdW5jdGlvbigkdmFsaWRhdG9yKSB7XG5cdFx0aWYgKCR2YWxpZGF0b3IuZGF0YXNldC52YWxpZGF0ZVJlcXVpcmVkICE9PSB1bmRlZmluZWQpIHtcblx0XHRcdHJldHVybiAhJHZhbGlkYXRvci5jbGFzc0xpc3QuY29udGFpbnMoJ3ZhbGlkYXRlLS12YWxpZCcpO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHRyZXR1cm4gJHZhbGlkYXRvci5jbGFzc0xpc3QuY29udGFpbnMoJ3ZhbGlkYXRlLS1ub3QtdmFsaWQnKTtcblx0XHR9XG5cdH0pO1xuXG5cdHJldHVybiAhbm90VmFsaWQ7XG59XG4iLCIvKipcbiAqIENoZWNrIGlmIHVzZXIgaXMgbG9nZ2VkIGluIHVzaW5nIHRoZSBnaG9zdCBzZXNzaW9uLiBJZiBsb2dnZWQgaW4gZ2V0IHVzZXJcbiAqIGRhdGEuXG4gKi9cblxuLy8gQ2FjaGVkIHByb21pc2VcbnZhciBkYXRhUHJvbWlzZTtcblxuLyoqXG4gKiBHZXQgdGhlIGRhdGEgZm9yIHRoZSBsb2dnZWQgaW4gdXNlZFxuICogQHBhcmFtICB7c3RyaW5nfSB0b2tlblxuICogQHJldHVybiB7UHJvbWlzZX1cbiAqL1xudmFyIGdldFVzZXJEYXRhID0gZnVuY3Rpb24odG9rZW4pIHtcblx0cmV0dXJuIGZldGNoKCcvZ2hvc3QvYXBpL3YwLjEvdXNlcnMvbWUvP2luY2x1ZGU9cm9sZXMmc3RhdHVzPWFsbCcsIHtcblx0XHRtZXRob2Q6ICdHRVQnLFxuXHRcdGhlYWRlcnM6IHtcblx0XHRcdCdBdXRob3JpemF0aW9uJzogJ0JlYXJlciAnICsgdG9rZW5cblx0XHR9XG5cdH0pLnRoZW4oZnVuY3Rpb24ocmVzcG9uc2UpIHtcblx0XHRpZiAocmVzcG9uc2Uuc3RhdHVzICE9PSAyMDApIHtcblx0XHRcdHJldHVybiBQcm9taXNlLnJlamVjdCgnT2xkIHNlc3Npb24nKTtcblx0XHR9XG5cdFx0cmV0dXJuIHJlc3BvbnNlLmpzb24oKTtcblx0fSkudGhlbihmdW5jdGlvbihkYXRhKSB7XG5cdFx0cmV0dXJuIGRhdGEudXNlcnNbMF07XG5cdH0pO1xufTtcblxuLyoqXG4gKiBDaGVjayBpZiB0aGVyZSBpcyBhIEdob3N0IHNlc3Npb24uIElmIHNvIHVzZSBpdCB0byBnZXQgdGhlIHVzZXJzIGRhdGEuXG4gKiBAcmV0dXJuIHtQcm9taXNlfVxuICovXG52YXIgZ2V0ID0gZnVuY3Rpb24oKSB7XG5cblx0Ly8gR2hvc3Qgc3RvcmVzIGl0IHNlc3Npb24gaW4gbG9jYWxTdG9yYWdlXG5cdHZhciBzZXNzaW9uU3RyaW5nID0gbG9jYWxTdG9yYWdlLmdldEl0ZW0oJ2dob3N0OnNlc3Npb24nKTtcblx0aWYgKCFzZXNzaW9uU3RyaW5nKSB7XG5cdFx0cmV0dXJuIFByb21pc2UucmVqZWN0KCdObyBzZXNzaW9uJyk7XG5cdH1cblxuXHQvLyBWYWxpZCBzZXNzaW9uP1xuXHR2YXIgc2Vzc2lvbiA9IEpTT04ucGFyc2Uoc2Vzc2lvblN0cmluZyk7XG5cdGlmICghc2Vzc2lvbiB8fCAhc2Vzc2lvbi5hdXRoZW50aWNhdGVkIHx8ICFzZXNzaW9uLmF1dGhlbnRpY2F0ZWQuYWNjZXNzX3Rva2VuKSB7XG5cdFx0cmV0dXJuIFByb21pc2UucmVqZWN0KCdObyBzZXNzaW9uJyk7XG5cdH1cblxuXHQvLyBTZXNzaW9uIGV4cGlyZWQ/XG5cdGlmIChzZXNzaW9uLmF1dGhlbnRpY2F0ZWQuZXhwaXJlc19hdCA8IERhdGUubm93KCkpIHtcblx0XHRyZXR1cm4gUHJvbWlzZS5yZWplY3QoJ1Nlc3Npb24gZXhwaXJlZCcpO1xuXHR9XG5cblx0cmV0dXJuIGdldFVzZXJEYXRhKHNlc3Npb24uYXV0aGVudGljYXRlZC5hY2Nlc3NfdG9rZW4pO1xuXG59O1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbigpIHtcblxuXHQvLyBSZXR1cm4gY2FjaGVkIHByb21pc2UgaWYgYWxyZWFkeSBjYWxsZWRcblx0aWYgKCFkYXRhUHJvbWlzZSkge1xuXHRcdGRhdGFQcm9taXNlID0gZ2V0KCk7XG5cdH1cblx0cmV0dXJuIGRhdGFQcm9taXNlO1xufVxuIiwiLyoqXG4gKiBFbmNvZGUgYSBzdHJpbmdcbiAqIEBwYXJhbSAge3N0cmluZ30gc3RyaW5nXG4gKiBAcmV0dXJuIHtzdHJpbmd9XG4gKi9cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uKHN0cmluZykge1xuXHR2YXIgaHRtbEVuY29kZWRWYWx1ZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpLmFwcGVuZENoaWxkKFxuXHRcdGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKHN0cmluZykpLnBhcmVudE5vZGUuaW5uZXJIVE1MO1xuXHRyZXR1cm4gaHRtbEVuY29kZWRWYWx1ZS5yZXBsYWNlKC9cXHI/XFxuL2csICc8YnI+Jyk7XG59XG4iLCJpbXBvcnQgZ2V0QWxsIGZyb20gJ2RzLWFzc2V0cy9kb20vZ2V0LWFsbCc7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24ocmF3KSB7XG5cdHZhciAkY29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG5cdCRjb250YWluZXIuaW5uZXJIVE1MID0gcmF3O1xuXHRnZXRBbGwoJ2ltZycsICRjb250YWluZXIpLmZvckVhY2goZnVuY3Rpb24oJGltZykge1xuXHRcdHZhciAkaW1nV3JhcHBlciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuXHRcdCRpbWdXcmFwcGVyLmNsYXNzTGlzdC5hZGQoJ2ltZy13cmFwcGVyJyk7XG5cdFx0JGltZ1dyYXBwZXIuaW5uZXJIVE1MID0gJzxkaXYgY2xhc3M9XCJpbWctY29udGFpbmVyXCI+PGltZz48L2Rpdj4nO1xuXHRcdHZhciBzcmMgPSAkaW1nLmdldEF0dHJpYnV0ZSgnc3JjJyk7XG5cdFx0dmFyIGFsdCA9ICRpbWcuZ2V0QXR0cmlidXRlKCdhbHQnKTtcblx0XHR2YXIgcGFkZGluZyA9IDUwO1xuXG5cdFx0Ly8gTGF6eSBsb2FkIGFsbCBidXQgdGhlIGZpcnN0IGltYWdlXG5cdFx0dmFyICRuZXdJbWcgPSAkaW1nV3JhcHBlci5xdWVyeVNlbGVjdG9yKCdpbWcnKTtcblxuXHRcdCRuZXdJbWcuc2V0QXR0cmlidXRlKCdkYXRhLXNyYycsIHNyYyk7XG5cdFx0JG5ld0ltZy5zZXRBdHRyaWJ1dGUoJ2NsYXNzJywgJ2xhenktaW1hZ2UnKTtcblxuXHRcdGFsdC5zcGxpdCgnOycpLmZvckVhY2goZnVuY3Rpb24oc3RyKSB7XG5cdFx0XHRpZiAoc3RyID09PSAnZnVsbC1zaXplJyB8fCBzdHIgPT09ICdmdWxsLXdpZHRoJykge1xuXHRcdFx0XHQkaW1nV3JhcHBlci5jbGFzc0xpc3QuYWRkKCdmdWxsLXdpZHRoJyk7XG5cdFx0XHR9IGVsc2UgaWYgKHN0ci5pbmRleE9mKCdyYXRpbz0nKSA9PT0gMCkge1xuXHRcdFx0XHR2YXIgcmF0aW8gPSBzdHIucmVwbGFjZSgncmF0aW89JywgJycpO1xuXHRcdFx0XHRpZiAocmF0aW8uaW5kZXhPZignOicpKSB7XG5cdFx0XHRcdFx0dmFyIGRpbWVuc2lvbnMgPSByYXRpby5zcGxpdCgnOicpO1xuXHRcdFx0XHRcdHJhdGlvID0gZGltZW5zaW9uc1swXSAvIGRpbWVuc2lvbnNbMV07XG5cdFx0XHRcdH1cblx0XHRcdFx0cGFkZGluZyA9IDEwMCAvIHJhdGlvO1xuXHRcdFx0fSBlbHNlIGlmIChzdHIgPT09ICdib3JkZXJzJykge1xuXHRcdFx0XHQkaW1nV3JhcHBlci5xdWVyeVNlbGVjdG9yKCcuaW1nLWNvbnRhaW5lcicpLmNsYXNzTGlzdC5hZGQoJ2ltZy1jb250YWluZXItLWJvcmRlcnMnKTtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdGFsdCA9IHN0cjtcblx0XHRcdH1cblx0XHR9KTtcblxuXHRcdCRuZXdJbWcuc2V0QXR0cmlidXRlKCdhbHQnLCBhbHQpO1xuXHRcdCRuZXdJbWcuc2V0QXR0cmlidXRlKCd0aXRsZScsICRpbWcuZ2V0QXR0cmlidXRlKCd0aXRsZScpKTtcblxuXHRcdCRpbWdXcmFwcGVyLnF1ZXJ5U2VsZWN0b3IoJy5pbWctY29udGFpbmVyJylcblx0XHRcdC5zZXRBdHRyaWJ1dGUoJ3N0eWxlJywgJ3BhZGRpbmctYm90dG9tOicgKyBwYWRkaW5nICsgJyUnKTtcblxuXHRcdCRpbWcucGFyZW50Tm9kZS5vdXRlckhUTUwgPSAkaW1nV3JhcHBlci5vdXRlckhUTUw7XG5cdH0pO1xuXHRyZXR1cm4gJGNvbnRhaW5lci5pbm5lckhUTUw7XG59O1xuIiwiaW1wb3J0IHN0cmlwVGFncyBmcm9tICcuL3N0cmlwLWh0bWwtdGFncyc7XG5pbXBvcnQgd29yZENvdW50IGZyb20gJ3dvcmQtY291bnQnO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbihodG1sKSB7XG5cdHZhciB0ZXh0ID0gc3RyaXBUYWdzKGh0bWwpO1xuXHR2YXIgd29yZHMgPSB3b3JkQ291bnQodGV4dCk7XG5cdHZhciByZWFkVGltZSA9IE1hdGguY2VpbCh3b3JkcyAvIDMwMCk7XG5cblx0dmFyIGFmZml4ID0gJyBtaW4nO1xuXHRpZiAocmVhZFRpbWUgPiAxKSB7XG5cdFx0YWZmaXggKz0gJ3MnO1xuXHR9XG5cblx0cmV0dXJuIHJlYWRUaW1lICsgYWZmaXg7XG59XG4iLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbihodG1sKSB7XG5cdHZhciB0bXAgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcblx0dG1wLmlubmVySFRNTCA9IGh0bWw7XG5cdHJldHVybiB0bXAudGV4dENvbnRlbnQgfHwgdG1wLmlubmVyVGV4dCB8fCAnJztcbn1cbiIsIi8qKlxuICogTWFpbiBlbnRyeSBmb3IgdGhlIGphdmFzY3JpcHQuXG4gKiBJbXBvcnQgbW9kdWxlcyBhbmQgc3RhcnQgdGhlbVxuICovXG5cbmltcG9ydCBsYXp5SW1hZ2VzIGZyb20gJ2RzLWFzc2V0cy9sYXp5L2ltYWdlcyc7XG5pbXBvcnQgZ2V0QWxsIGZyb20gJ2RzLWFzc2V0cy9kb20vZ2V0LWFsbCc7XG5pbXBvcnQgdmFsaWRhdGVJbnB1dEZpZWxkcyBmcm9tICdkcy1hc3NldHMvdmFsaWRhdGUvaW5wdXQtZmllbGRzJztcbmltcG9ydCBuYXZpZ2F0aW9uIGZyb20gJy4vY29tcG9uZW50cy9uYXZpZ2F0aW9uJztcbmltcG9ydCByZXNwb25zZSBmcm9tICcuL2NvbXBvbmVudHMvcmVzcG9uc2UnO1xuaW1wb3J0IHRvb2xUaXAgZnJvbSAnLi9jb21wb25lbnRzL3Rvb2wtdGlwJztcbmltcG9ydCBzZWFyY2ggZnJvbSAnLi9jb21wb25lbnRzL3NlYXJjaCc7XG5pbXBvcnQgZ2V0TG9nZ2VkSW5EYXRhIGZyb20gJy4vbGliL2dldC1sb2dnZWQtaW4tZGF0YSc7XG5pbXBvcnQgKiBhcyBhcGkgZnJvbSAnLi9saWIvYXBpJztcblxubmF2aWdhdGlvbigpO1xudG9vbFRpcCgpO1xuc2VhcmNoKCk7XG5cbmdldEFsbCgnaW1nJykuZm9yRWFjaChmdW5jdGlvbigkaW1nKSB7XG5cdCRpbWcub25sb2FkID0gZnVuY3Rpb24oKSB7XG5cdFx0dGhpcy5jbGFzc0xpc3QuYWRkKCdhbmltYXRlLS1hY3RpdmUnKTtcblx0fTtcbn0pO1xubGF6eUltYWdlcygxKTtcbnZhbGlkYXRlSW5wdXRGaWVsZHMoKTtcbnJlc3BvbnNlKCk7XG5nZXRMb2dnZWRJbkRhdGEoKS50aGVuKGZ1bmN0aW9uKHVzZXIpIHtcblx0dmFyICRib2R5ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignYm9keScpO1xuXG5cdCRib2R5LmNsYXNzTGlzdC5hZGQoJ3VzZXItbG9nZ2VkLWluJyk7XG5cblx0Ly8gQWRtaW4gbG9nZ2VkIGluXG5cdHZhciBhZG1pbiA9IHVzZXIucm9sZXMuc29tZShmdW5jdGlvbihyb2xlKSB7XG5cdFx0cmV0dXJuIChyb2xlLm5hbWUgPT09ICdPd25lcicgfHwgcm9sZS5uYW1lID09PSAnQWRtaW5pc3RyYXRvcicpO1xuXHR9KTtcblx0aWYgKGFkbWluKSB7XG5cdFx0JGJvZHkuY2xhc3NMaXN0LmFkZCgnYWRtaW4tbG9nZ2VkLWluJyk7XG5cdH1cblxuXHQvLyBBdXRob3IgbG9nZ2VkIGluXG5cdGlmICh1c2VyLm5hbWUgPT09IHdpbmRvdy5hdXRob3JOYW1lKSB7XG5cdFx0JGJvZHkuY2xhc3NMaXN0LmFkZCgnYXV0aG9yLWxvZ2dlZC1pbicpO1xuXHRcdHJldHVybiBhcGkudXBkYXRlQXV0aG9yRW1haWwodXNlci5lbWFpbCk7XG5cdH1cbn0pLmNhdGNoKGZ1bmN0aW9uKCkge30pO1xuIiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24oYXV0aG9yKSB7XG5cblx0dmFyIGF1dGhvckltYWdlID0gJyc7XG5cdGlmIChhdXRob3IuaW1hZ2UpIHtcblx0XHRhdXRob3JJbWFnZSA9IGA8dGQgd2lkdGg9XCI1JVwiPjxpbWcgc3JjPVwiJHthdXRob3IuaW1hZ2V9XCIgY2xhc3M9XCJhdXRob3JfX2ltYWdlIHJvdW5kLWltZ1wiPjwvdGQ+YDtcblx0fVxuXG5cdHZhciBjb3ZlckltYWdlID0gJyc7XG5cdGlmIChhdXRob3IuY292ZXIpIHtcblx0XHRjb3ZlckltYWdlID0gYFxuPGltZyBkYXRhLXNyYz1cIiR7YXV0aG9yLmNvdmVyfVwiIGNsYXNzPVwibGF6eS1pbWFnZSBmdWxsLXdpZHRoIGltZy1mdWxsLXdpZHRoXCIgYWx0PVwiJHthdXRob3IubmFtZX1cIiA+XG5gO1xuXHR9XG5cblx0cmV0dXJuIGBcbjxhcnRpY2xlIGNsYXNzPVwiYm94ZXNfX2l0ZW0gc21hbGwgYW5pbWF0ZSBhbmltYXRlX19mYWRlLWluXCI+XG4gIDxoZWFkZXIgY2xhc3M9XCJhdXRob3JcIj5cbiAgICAgIDx0YWJsZT5cbiAgICAgICAgICA8dHI+XG4gICAgICAgICAgICAgICR7YXV0aG9ySW1hZ2V9XG4gICAgICAgICAgICAgIDx0ZD48c3BhbiBjbGFzcz1cImF1dGhvcl9fbmFtZVwiPjxhIGhyZWY9XCIvYXV0aG9yLyR7YXV0aG9yLnNsdWd9XCI+JHthdXRob3IubmFtZX08L2E+PC9zcGFuPjxicj5cbiAgICAgICAgICAgICAgXHQke2F1dGhvci5jb3VudC5wb3N0c30gYXJ0aWNsZXNcbiAgICAgICAgICAgICAgPC90ZD5cbiAgICAgICAgICA8L3RyPlxuICAgICAgPC90YWJsZT5cbiAgPC9oZWFkZXI+XG4gICR7Y292ZXJJbWFnZX1cbiAgPHA+JHthdXRob3IuYmlvIHx8ICcnfTwvcD5cbiAgPHA+PGEgaHJlZj1cIi9hdXRob3IvJHthdXRob3Iuc2x1Z30vXCIgY2xhc3M9XCJidG5cIj5BcnRpY2xlcyBieSBhdXRob3I8L2E+PC9wPlxuPC9hcnRpY2xlPlxuYDtcbn1cbiIsImltcG9ydCBpbWFnZUNvbnZlcnRlZCBmcm9tICcuLi9saWIvaW1hZ2UtY29udmVydGVyJztcbmltcG9ydCByZWFkVGltZSBmcm9tICcuLi9saWIvcmVhZC10aW1lJztcbmltcG9ydCBlcG9jaFRvVGltZWFnbyBmcm9tICdlcG9jaC10by10aW1lYWdvJztcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24ocG9zdCkge1xuXG5cdHZhciBhdXRob3JJbWFnZSA9ICcnO1xuXHRpZiAocG9zdC5hdXRob3IuaW1hZ2UpIHtcblx0XHRhdXRob3JJbWFnZSA9IGA8dGQgd2lkdGg9XCI1JVwiPjxpbWcgc3JjPVwiJHtwb3N0LmF1dGhvci5pbWFnZX1cIiBjbGFzcz1cImF1dGhvcl9faW1hZ2Ugcm91bmQtaW1nXCI+PC90ZD5gO1xuXHR9XG5cblx0dmFyIHRhZ3MgPSAnJztcblx0aWYgKHBvc3QudGFncykge1xuXHRcdHRhZ3MgPSAnPGJyPjxzcGFuIGNsYXNzPVwidGFnc1wiPicgKyBwb3N0LnRhZ3MubWFwKGZ1bmN0aW9uKHRhZykge1xuXHRcdFx0cmV0dXJuIGA8YSBocmVmPVwiL3RhZy8ke3RhZy5zbHVnfS9cIj4ke3RhZy5uYW1lfTwvYT5gO1xuXHRcdH0pLmpvaW4oJycpICsgJzwvc3Bhbj4nO1xuXHR9XG5cblx0dmFyIHB1Ymxpc2hlZCA9IG5ldyBEYXRlKHBvc3QucHVibGlzaGVkX2F0KS5nZXRUaW1lKCk7XG5cdHZhciBub3cgPSBEYXRlLm5vdygpO1xuXHR2YXIgdGltZUFnbyA9IGVwb2NoVG9UaW1lYWdvLnRpbWVBZ28ocHVibGlzaGVkLCBub3cpO1xuXG5cdHZhciBodG1sID0gaW1hZ2VDb252ZXJ0ZWQocG9zdC5odG1sKTtcblx0dmFyIGV4Y2VycHQgPSBodG1sLnN1YnN0cigwLCBodG1sLmluZGV4T2YoJzwvcD4nKSArIDQpO1xuXG5cdHJldHVybiBgXG48YXJ0aWNsZSBjbGFzcz1cImJveGVzX19pdGVtIHNtYWxsIGFuaW1hdGUgYW5pbWF0ZV9fZmFkZS1pblwiPlxuICA8aGVhZGVyIGNsYXNzPVwiYXV0aG9yXCI+XG4gICAgICA8dGFibGU+XG4gICAgICAgICAgPHRyPlxuICAgICAgICAgICAgICAke2F1dGhvckltYWdlfVxuICAgICAgICAgICAgICA8dGQ+PHNwYW4gY2xhc3M9XCJhdXRob3JfX25hbWVcIj48YSBocmVmPVwiL2F1dGhvci8ke3Bvc3QuYXV0aG9yLnNsdWd9XCI+JHtwb3N0LmF1dGhvci5uYW1lfTwvYT48L3NwYW4+PGJyPlxuICAgICAgICAgICAgICAke3RpbWVBZ299ICZtaWRkb3Q7ICR7cmVhZFRpbWUocG9zdC5odG1sKX0gcmVhZCR7dGFnc308L3RkPlxuICAgICAgICAgIDwvdHI+XG4gICAgICA8L3RhYmxlPlxuICA8L2hlYWRlcj5cbiAgJHtleGNlcnB0fVxuICA8cD48YSBocmVmPVwiLyR7cG9zdC5zbHVnfS9cIiBjbGFzcz1cImJ0blwiPlJlYWQgYXJ0aWNsZTwvYT48L3A+XG48L2FydGljbGU+XG5gO1xufVxuIiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24odXNlcikge1xuXHR2YXIgaW1hZ2UgPSAnJztcblx0aWYgKHVzZXIuaW1hZ2UpIHtcblx0XHRpbWFnZSA9IGBcbjx0ZCB3aWR0aD1cIjUlXCI+PGltZyBkYXRhLXNyYz1cIiR7dXNlci5pbWFnZX1cIiBjbGFzcz1cImF1dGhvcl9faW1hZ2UgYXV0aG9yX19pbWFnZS0tc21hbGwgbGF6eS1pbWFnZSBpbWctYmcgcm91bmQtaW1nXCI+PC90ZD5cblx0XHRgO1xuXHR9XG5cblx0cmV0dXJuIGBcbjxkaXYgY2xhc3M9XCJhdXRob3Igc21hbGxcIj5cbiAgPHRhYmxlPjx0Ym9keT48dHI+XG5cdFx0JHtpbWFnZX1cbiAgICA8dGQ+XG4gICAgICA8c3BhbiBjbGFzcz1cImF1dGhvcl9fbmFtZVwiPiR7dXNlci5uYW1lfTwvc3Bhbj5cbiAgICA8L3RkPlxuICA8L3RyPjwvdGJvZHk+PC90YWJsZT5cbjwvZGl2PlxuYDtcbn1cbiIsImltcG9ydCBlbmNvZGUgZnJvbSAnLi4vbGliL2h0bWwtZW5jb2RlJztcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24ocmVzcG9uc2UpIHtcblxuICB2YXIgY2xhc3NlcyA9ICdyZXNwb25zZSBib3hlc19faXRlbSc7XG4gIGlmIChyZXNwb25zZS5uYW1lLnRvTG93ZXJDYXNlKCkgPT09IHdpbmRvdy5hdXRob3JOYW1lLnRvTG93ZXJDYXNlKCkpIHtcbiAgICBjbGFzc2VzICs9ICcgYm94ZXNfX2l0ZW0tLXRyYW5zcGFyZW50JztcbiAgfVxuXG4gIHZhciBpbWFnZSA9ICcnO1xuICBpZiAocmVzcG9uc2UuaW1hZ2UpIHtcbiAgICBpbWFnZSA9IGA8dGQgd2lkdGg9XCI1JVwiPjxpbWcgZGF0YS1zcmM9XCIke3Jlc3BvbnNlLmltYWdlfVwiIGNsYXNzPVwiYXV0aG9yX19pbWFnZSBhdXRob3JfX2ltYWdlLS1zbWFsbCBsYXp5LWltYWdlIGltZy1iZyByb3VuZC1pbWdcIj48L3RkPmA7XG4gIH1cblxuICB2YXIgcmVhZFRpbWUgPSAnJztcbiAgaWYgKHJlc3BvbnNlLnJlYWRUaW1lKSB7XG4gICAgcmVhZFRpbWUgPSBgICZtaWRkb3Q7ICR7cmVzcG9uc2UucmVhZFRpbWV9IHJlYWRgO1xuICB9XG5cbiAgdmFyIGV4Y2VycHQgPSByZXNwb25zZS5leGNlcnB0IHx8IHJlc3BvbnNlLmh0bWw7XG5cbiAgdmFyIHJlYWRNb3JlID0gJyc7XG4gIGlmIChyZXNwb25zZS5leGNlcnB0KSB7XG4gICAgcmVhZE1vcmUgPSBgXG48ZGl2IGNsYXNzPVwicmVzcG9uc2VfX3RleHQgaGlkZGVuXCI+JHtyZXNwb25zZS5odG1sfTwvZGl2PlxuPHA+PGEgaHJlZj1cIiNcIiBjbGFzcz1cImJ0biByZXNwb25zZV9fcmVhZC1tb3JlXCI+UmVhZCBtb3JlPC9hPjwvcD5cbmA7XG4gIH1cblxuICB2YXIgbmFtZSA9IGAke2VuY29kZShyZXNwb25zZS5uYW1lKX1gO1xuICBpZiAocmVzcG9uc2Uud2Vic2l0ZSkge1xuICAgIG5hbWUgPSBgPGEgaHJlZj1cIiR7ZW5jb2RlKHJlc3BvbnNlLndlYnNpdGUpfVwiPiR7bmFtZX08L2E+YDtcbiAgfVxuXG4gIHJldHVybiBgXG48ZGl2IGNsYXNzPVwiJHtjbGFzc2VzfSBzbWFsbFwiPlxuICA8ZGl2IGNsYXNzPVwiYXV0aG9yXCI+XG4gICAgPHRhYmxlPlxuICAgICAgPHRyPlxuICAgICAgICAke2ltYWdlfVxuICAgICAgICA8dGQ+XG4gICAgICAgICAgPHNwYW4gY2xhc3M9XCJhdXRob3JfX25hbWVcIj4ke25hbWV9PC9zcGFuPjxicj5cbiAgICAgICAgICAke3Jlc3BvbnNlLnRpbWVBZ299JHtyZWFkVGltZX1cbiAgICAgICAgPC90ZD5cbiAgICAgIDwvdHI+XG4gICAgPC90YWJsZT5cbiAgPC9kaXY+XG4gIDxhIGhyZWY9XCIjXCIgY2xhc3M9XCJyZXNwb25zZV9fZGVsZXRlXCIgZGF0YS1wdWJsaXNoZWQ9XCIke3Jlc3BvbnNlLnB1Ymxpc2hlZH1cIiBkYXRhLW5hbWU9XCIke3Jlc3BvbnNlLm5hbWV9XCI+PGltZyBkYXRhLXNyYz1cIi9hc3NldHMvaW1hZ2VzL3RyYXNoLnN2Z1wiIGNsYXNzPVwibGF6eS1pbWFnZVwiPjwvYT5cbiAgPGRpdiBjbGFzcz1cInJlc3BvbnNlX19leGNlcnB0XCI+JHtleGNlcnB0fTwvZGl2PlxuICAke3JlYWRNb3JlfVxuPC9kaXY+YDtcbn1cbiIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uKHRhZykge1xuXG4gIGNvbnNvbGUubG9nKHRhZyk7XG5cbiAgdmFyIGNvdmVySW1hZ2UgPSAnJztcbiAgaWYgKHRhZy5pbWFnZSkge1xuICAgIGNvdmVySW1hZ2UgPSBgXG48aW1nIGRhdGEtc3JjPVwiJHt0YWcuaW1hZ2V9XCIgY2xhc3M9XCJsYXp5LWltYWdlIGZ1bGwtd2lkdGggaW1nLWZ1bGwtd2lkdGhcIiBhbHQ9XCIke3RhZy5uYW1lfVwiID5cbmA7XG4gIH1cblxuICByZXR1cm4gYFxuPGFydGljbGUgY2xhc3M9XCJib3hlc19faXRlbSBzbWFsbCBhbmltYXRlIGFuaW1hdGVfX2ZhZGUtaW5cIj5cbiAgPGhlYWRlciBjbGFzcz1cImF1dGhvclwiPlxuICAgICAgPHRhYmxlPlxuICAgICAgICAgIDx0cj5cbiAgICAgICAgICAgICAgPHRkPjxzcGFuIGNsYXNzPVwiYXV0aG9yX19uYW1lXCI+PGEgaHJlZj1cIi90YWcvJHt0YWcuc2x1Z31cIj4ke3RhZy5uYW1lfTwvYT48L3NwYW4+PGJyPlxuICAgICAgICAgICAgICBcdCR7dGFnLmNvdW50LnBvc3RzfSBhcnRpY2xlc1xuICAgICAgICAgICAgICA8L3RkPlxuICAgICAgICAgIDwvdHI+XG4gICAgICA8L3RhYmxlPlxuICA8L2hlYWRlcj5cbiAgJHtjb3ZlckltYWdlfVxuICA8cD4ke3RhZy5kZXNjcmlwdGlvbiB8fCAnJ308L3A+XG4gIDxwPjxhIGhyZWY9XCIvdGFnLyR7dGFnLnNsdWd9L1wiIGNsYXNzPVwiYnRuXCI+QXJ0aWNsZXMgaW4gY2F0ZWdvcnk8L2E+PC9wPlxuPC9hcnRpY2xlPlxuYDtcbn1cbiIsIi8qKlxuICogV29yZCBDb3VudFxuICpcbiAqIFdvcmQgY291bnQgaW4gcmVzcGVjdCBvZiBDSksgY2hhcmFjdGVycy5cbiAqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTUgYnkgSHNpYW9taW5nIFlhbmcuXG4gKi9cblxudmFyIHBhdHRlcm4gPSAvW2EtekEtWjAtOV9cXHUwMzkyLVxcdTAzYzlcXHUwMGMwLVxcdTAwZmZcXHUwNjAwLVxcdTA2ZmZdK3xbXFx1NGUwMC1cXHU5ZmZmXFx1MzQwMC1cXHU0ZGJmXFx1ZjkwMC1cXHVmYWZmXFx1MzA0MC1cXHUzMDlmXFx1YWMwMC1cXHVkN2FmXSsvZztcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoZGF0YSkge1xuICB2YXIgbSA9IGRhdGEubWF0Y2gocGF0dGVybik7XG4gIHZhciBjb3VudCA9IDA7XG4gIGZvciAodmFyIGkgPSAwOyBpIDwgbS5sZW5ndGg7IGkrKykge1xuICAgIGlmIChtW2ldLmNoYXJDb2RlQXQoMCkgPj0gMHg0ZTAwKSB7XG4gICAgICBjb3VudCArPSBtW2ldLmxlbmd0aDtcbiAgICB9IGVsc2Uge1xuICAgICAgY291bnQgKz0gMTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIGNvdW50O1xufTtcbiIsIi8qKlxuICogTWFrZSBzdXJlIGEgZnVuY3Rpb24gb25seSBpcyBydW4gZXZlcnkgeCBtc1xuICogQHBhcmFtICB7RnVuY3Rpb259IGNhbGxiYWNrIE1ldGhvZCB0byBleGVjdXRlIGlmIGl0IGlzIG5vdCBkZWJvdW5jZWRcbiAqIEBwYXJhbSAge2ludGVnZXJ9ICB0aW1lb3V0ICBNaWxsaXNlY29uZHMgdG8gd2FpdCBiZWZvcmUgbmV4dCBhbGxvd2VkIGNhbGxiYWNrLiBEZWZhdWx0cyB0byB0aGUgYW5pbWF0aW9uIGZyYW1lIHJhdGUgaW4gdGhlIGJyb3dzZXJcbiAqIEByZXR1cm4ge3ZvaWR9XG4gKi9cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uKGNhbGxiYWNrLCB0aW1lb3V0KSB7XG4gIHZhciBwZW5kaW5nID0gZmFsc2U7XG4gIHZhciBkb25lID0gKCkgPT4ge1xuICAgIHBlbmRpbmcgPSBmYWxzZTtcbiAgfTtcbiAgcmV0dXJuIGZ1bmN0aW9uKCkge1xuICAgIGlmIChwZW5kaW5nKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIHBlbmRpbmcgPSB0cnVlO1xuICAgIGNhbGxiYWNrLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgaWYgKCF0aW1lb3V0KSB7XG4gICAgICB3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lKGRvbmUpO1xuICAgIH0gZWxzZSB7XG4gICAgICB3aW5kb3cuc2V0VGltZW91dChkb25lLCB0aW1lb3V0KTtcbiAgICB9XG4gIH07XG59XG4iLCIvKipcbiAqIERlbGF5IGEgZnVuY3Rpb24gYW5kIG9ubHkgcnVuIG9uY2VcbiAqIEBwYXJhbSAge0Z1bmN0aW9ufSBjYWxsYmFjayBNZXRob2QgdG8gZXhlY3V0ZSBpZiBpdCBpcyBub3QgZGVib3VuY2VkXG4gKiBAcGFyYW0gIHtpbnRlZ2VyfSAgdGltZW91dCAgTWlsbGlzZWNvbmRzIHRvIHdhaXQgYmVmb3JlIG5leHQgYWxsb3dlZCBjYWxsYmFjay4gRGVmYXVsdHMgdG8gdGhlIGFuaW1hdGlvbiBmcmFtZSByYXRlIGluIHRoZSBicm93c2VyXG4gKiBAcmV0dXJuIHt2b2lkfVxuICovXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbihjYWxsYmFjaywgdGltZW91dCkge1xuICB2YXIgcGVuZGluZyA9IGZhbHNlO1xuICB2YXIgZG9uZSA9ICgpID0+IHtcbiAgICBjYWxsYmFjay5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgIHBlbmRpbmcgPSBmYWxzZTtcbiAgfTtcbiAgcmV0dXJuIGZ1bmN0aW9uKCkge1xuICAgIGlmIChwZW5kaW5nKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIHBlbmRpbmcgPSB0cnVlO1xuICAgIGlmICghdGltZW91dCkge1xuICAgICAgd2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZShkb25lKTtcbiAgICB9IGVsc2Uge1xuICAgICAgd2luZG93LnNldFRpbWVvdXQoZG9uZSwgdGltZW91dCk7XG4gICAgfVxuICB9O1xufVxuIiwiLyoqXG4gKiBHZXQgYW4gYXJyYXkgb2YgZG9tIGVsZW1lbnRzIG1hdGNoaW5nIHRoZSBzZWxlY3RvclxuICogQHBhcmFtICB7c3RyaW5nfSAgICAgc2VsZWN0b3JcbiAqIEBwYXJhbSAge0RPTWVsZW1lbnR9IERPTSBlbGVtZW50IHRvIHNlYXJjaCBpbi4gRGVmYXVsdHMgdG8gZG9jdW1lbnRcbiAqIEByZXR1cm4ge2FycmF5fVxuICovXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbihzZWxlY3RvciwgJHJvb3QgPSBkb2N1bWVudCkge1xuICByZXR1cm4gQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoJHJvb3QucXVlcnlTZWxlY3RvckFsbChzZWxlY3RvcikpO1xufVxuIiwiLyoqXG4gKiBHZXQgdGhlIGVsZW1lbnRzIG9mZnNldCByZWxhdGl2ZSB0byB0aGUgZG9jdW1lbnRcbiAqIEBwYXJhbSAge0RPTUVsZW1lbnR9ICRlbGVtZW50IEVsZW1lbnQgdG8gZ2V0IHRoZSBvZmZzZXQgZnJvbVxuICogQHJldHVybiB7aW50ZWdlcn0gICAgICAgICAgICAgT2Zmc2V0IGluIHBpeGVsc1xuICovXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbigkZWxlbWVudCkge1xuICB2YXIgb2Zmc2V0ID0gMDtcblxuICB3aGlsZSAoJGVsZW1lbnQgJiYgIWlzTmFOKCRlbGVtZW50Lm9mZnNldFRvcCkpIHtcbiAgICBvZmZzZXQgKz0gJGVsZW1lbnQub2Zmc2V0VG9wO1xuICAgICRlbGVtZW50ID0gJGVsZW1lbnQub2Zmc2V0UGFyZW50O1xuICB9XG4gIHJldHVybiBvZmZzZXQ7XG59XG4iLCIvKipcbiAqIExhenkgbG9hZCBpbWFnZXMgd2l0aCBjbGFzcyAubGF6eS1pbWFnZXMuXG4gKiBEZXBlbmRpbmcgb24gdGhlIHRyZXNob2xkIGltYWdlcyB3aWxsIGxvYWQgYXMgdGhlIHVzZXIgc2Nyb2xscyBkb3duIG9uIHRoZVxuICogZG9jdW1lbnQuXG4gKi9cblxuLy8gRGVwZW5kZW5jZWlzXG5pbXBvcnQgZ2V0QWxsRWxlbWVudHMgZnJvbSAnLi4vZG9tL2dldC1hbGwnO1xuaW1wb3J0IHNjcm9sbFZpc2libGUgZnJvbSAnLi4vc2Nyb2xsL3Zpc2libGUnO1xuXG4vLyBMb2FkIGltYWdlIGVsZW1lbnRcbnZhciBsb2FkSW1nID0gZnVuY3Rpb24oJGltZykge1xuXG4gIGlmICgkaW1nLmRhdGFzZXQuc3JjKSB7XG4gICAgJGltZy5zZXRBdHRyaWJ1dGUoJ3NyYycsICRpbWcuZGF0YXNldC5zcmMpO1xuICB9XG4gIGlmICgkaW1nLmRhdGFzZXQuc3Jjc2V0KSB7XG4gICAgJGltZy5zZXRBdHRyaWJ1dGUoJ3NyY3NldCcsICRpbWcuZGF0YXNldC5zcmNzZXQpO1xuICB9XG59O1xuXG4vLyBMb2FkIHBpY3R1cmUgZWxlbWVudFxudmFyIGxvYWRQaWN0dXJlID0gZnVuY3Rpb24oJHBpY3R1cmUpIHtcbiAgbG9hZEltZygkcGljdHVyZS5xdWVyeVNlbGVjdG9yKCdpbWcnKSk7XG4gIHZhciAkc291cmNlcyA9IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKCRwaWN0dXJlLnF1ZXJ5U2VsZWN0b3JBbGwoJ3NvdXJjZScpKTtcbiAgJHNvdXJjZXMuZm9yRWFjaCgkc291cmNlID0+ICRzb3VyY2Uuc2V0QXR0cmlidXRlKCdzcmNzZXQnLCAkc291cmNlLmRhdGFzZXQuc3Jjc2V0KSk7XG59O1xuXG52YXIgbG9hZEVsZW1lbnQgPSBmdW5jdGlvbigkZWxlbWVudCkge1xuICBpZiAoJGVsZW1lbnQubWF0Y2hlcygncGljdHVyZScpKSB7XG4gICAgbG9hZFBpY3R1cmUoJGVsZW1lbnQpO1xuICB9IGVsc2UgaWYgKCRlbGVtZW50Lm1hdGNoZXMoJ2ltZycpKSB7XG4gICAgbG9hZEltZygkZWxlbWVudCk7XG4gIH1cblxuICAvLyBNYWtlIHN1cmUgcGljdHVyZWZpbGwgd2lsbCB1cGRhdGUgdGhlIGltYWdlIHdoZW4gc291cmNlIGhhcyBjaGFuZ2VkXG4gIGlmICh3aW5kb3cucGljdHVyZWZpbGwpIHtcbiAgICB3aW5kb3cucGljdHVyZWZpbGwoe1xuICAgICAgcmVldmFsdWF0ZTogdHJ1ZVxuICAgIH0pO1xuICB9XG59O1xuXG4vKipcbiAqIEFjdGl2YXRlIGxhenkgbG9hZCBvZiBpbWFnZXMgYXMgdXNlciBzY3JvbGxzXG4gKiBAcGFyYW0gIHtmbG9hdH0gdGhyZXNob2xkICBQZXJjZW50IGJlbG93IHNjcmVlbiB0byBpbml0aWFsaXplIGxvYWQgb2YgaW1hZ2VcbiAqIEByZXR1cm4ge3ZvaWR9XG4gKi9cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uKHRocmVzaG9sZCA9IDAuNSkge1xuICB2YXIgJGxhenlJbWFnZXMgPSBnZXRBbGxFbGVtZW50cygnLmxhenktaW1hZ2UnKTtcblxuICB3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lKGZ1bmN0aW9uKCkge1xuICAgICRsYXp5SW1hZ2VzLmZvckVhY2goZnVuY3Rpb24oJGxhenlJbWFnZSkge1xuXG4gICAgICAvLyBJZ25vcmUgaW1hZ2VzIHdoaWNoIGhhcyBhbHJlYWR5IGJlZW4gcmVnaXN0ZXJlZFxuICAgICAgaWYgKCRsYXp5SW1hZ2UuZGF0YXNldC5sYXp5SW1hZ2VMaXN0ZW5pbmcpIHtcblx0cmV0dXJuO1xuICAgICAgfVxuICAgICAgJGxhenlJbWFnZS5zZXRBdHRyaWJ1dGUoJ2RhdGEtbGF6eS1pbWFnZS1saXN0ZW5pbmcnLCAndHJ1ZScpO1xuXG4gICAgICBzY3JvbGxWaXNpYmxlKCRsYXp5SW1hZ2UsIHRocmVzaG9sZClcbiAgICAgICAgLnRoZW4oKCkgPT4gbG9hZEVsZW1lbnQoJGxhenlJbWFnZSkpO1xuICAgIH0pO1xuICB9KTtcblxufVxuIiwiLy8gRGVwZW5kZW5jaWVzXG5pbXBvcnQgZ2V0RG9jdW1lbnRPZmZzZXRUb3AgZnJvbSAnLi4vZG9tL2dldC1kb2N1bWVudC1vZmZzZXQtdG9wJztcblxuLyoqXG4gKiBDaGVja3MgaWYgdGhlIHVzZXIgaGFzIHNjcm9sbGVkIHRvIG9yIHBhc3QgYW4gZWxlbWVudFxuICogQHBhcmFtICB7RE9NRWxlbWVudH0gJGVsZW1lbnQgIFRoZSBlbGVtZW50IHRvIGNoZWNrIGFnYWluc3RcbiAqIEBwYXJhbSAge2Zsb2F0fSAgICAgIHRocmVzaG9sZCBEaXN0YW5jZSBpbiBwZXJjZW50IG9mIHRoZSBzY2VlZW4gaGVpZ2h0IHRvIG1lYXN1cmUgYWdhaW5zdC5cbiAqIEByZXR1cm4ge2Jvb2xlYW59XG4gKi9cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uKCRlbGVtZW50LCB0aHJlc2hvbGQgPSAwKSB7XG4gIHZhciBzY3JvbGxCb3R0b20gPSAod2luZG93LnNjcm9sbFkgfHwgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LnNjcm9sbFRvcCkgKyAod2luZG93LmlubmVySGVpZ2h0ICogKDEgKyB0aHJlc2hvbGQpKTtcbiAgdmFyIG9mZnNldFRvcCA9IGdldERvY3VtZW50T2Zmc2V0VG9wKCRlbGVtZW50KTtcbiAgcmV0dXJuIChzY3JvbGxCb3R0b20gPiBvZmZzZXRUb3ApO1xufVxuIiwiLy8gZGVwZW5kZW5jaWVzXG5pbXBvcnQgZGVsYXkgZnJvbSAnLi4vYXN5bmMvZGVsYXknO1xuXG4vKipcbiAqIFJ1bnMgc2NyaXB0cyBlYWNoIHRpbWUgdGhlIHVzZXIgY2hhbmdlcyBzY3JvbGwgZGlyZWN0aW9uXG4gKiBAcGFyYW0gIHtGdW5jdGlvbn0gZG93bkNhbGxiYWNrICBDYWxsYmFjayBldmVyeSB0aW1lIHRoZSB1c2VyIHN0YXJ0cyBzY3JvbGxpbmcgZG93blxuICogQHBhcmFtICB7RnVuY3Rpb259IHVwQ2FsbGJhY2sgICAgQ2FsbGJhY2sgZXZlcnkgdGltZSB0aGUgdXNlciBzdGFydHMgc2Nyb2xsaW5nIHVwXG4gKiBAcGFyYW0gIHtmbG9hdH0gICAgdGhyZXNob2xkICAgICBNYXJnaW4gaW4gdG9wIHdoZXJlIHNjcm9sbCBkb3duIGlzIGlnbm9yZWQgKGNvdWxkIGJlIHVzZWQgZm9yIG5hdnMpXG4gKiBAcmV0dXJuIHt2b2lkfVxuICovXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbihkb3duQ2FsbGJhY2sgPSBmdW5jdGlvbigpIHt9LCB1cENhbGxiYWNrID0gZnVuY3Rpb24oKSB7fSwgdGhyZXNob2xkID0gMCkge1xuXG4gIHZhciBsYXN0U2Nyb2xsUG9zID0gMDtcbiAgdmFyIHNjcm9sbGVkRG93biA9IGZhbHNlO1xuXG4gIHZhciBpc1Njcm9sbGluZyA9IGZ1bmN0aW9uKCkge1xuICAgIHZhciBjdXJyZW50U2Nyb2xsUG9zID0gd2luZG93LnNjcm9sbFk7XG5cbiAgICBpZiAoIXNjcm9sbGVkRG93biAmJlxuICAgICAgY3VycmVudFNjcm9sbFBvcyA+IHRocmVzaG9sZCAmJlxuICAgICAgY3VycmVudFNjcm9sbFBvcyA+IChsYXN0U2Nyb2xsUG9zICsgMTApKSB7XG4gICAgICBkb3duQ2FsbGJhY2soKTtcbiAgICAgIHNjcm9sbGVkRG93biA9IHRydWU7XG4gICAgfSBlbHNlIGlmIChzY3JvbGxlZERvd24gJiZcbiAgICAgIChjdXJyZW50U2Nyb2xsUG9zIDw9IHRocmVzaG9sZCB8fCBjdXJyZW50U2Nyb2xsUG9zIDwgKGxhc3RTY3JvbGxQb3MgLSAxMDApKSAmJlxuICAgICAgKGN1cnJlbnRTY3JvbGxQb3MgKyB3aW5kb3cuaW5uZXJIZWlnaHQgPCBkb2N1bWVudC5ib2R5LmNsaWVudEhlaWdodCkpIHtcbiAgICAgIHVwQ2FsbGJhY2soKTtcbiAgICAgIHNjcm9sbGVkRG93biA9IGZhbHNlO1xuICAgIH1cblxuICAgIGxhc3RTY3JvbGxQb3MgPSBjdXJyZW50U2Nyb2xsUG9zO1xuICB9O1xuXG4gIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdzY3JvbGwnLCBkZWxheShpc1Njcm9sbGluZywgMjUwKSk7XG4gIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ0RPTUNvbnRlbnRMb2FkZWQnLCBpc1Njcm9sbGluZyk7XG59XG4iLCIvLyBEZXBlbmRlbmNlaXNcbmltcG9ydCBkZWJvdW5jZSBmcm9tICcuLi9hc3luYy9kZWJvdW5jZSc7XG5pbXBvcnQgaGFzU2Nyb2xsZWRQYXN0IGZyb20gJy4vaGFzLXNjcm9sbGVkLXBhc3QnO1xuXG4vKipcbiAqIEZ1bGZpbGwgYSBwcm9taXNlLCB3aGVuIHRoZSBlbGVtZW50IGlzIHZpc2libGUgKHNjcm9sbGVkIHRvIG9yIHBhc3QpXG4gKiBAcGFyYW0gIHtET01FbGVtZW50fSAkZWxlbWVudCAgRWxlbWVudCB0byBjaGVja1xuICogQHBhcmFtICB7ZmxvYXR9ICAgICAgdGhyZXNob2xkIERpc3RhbmNlIGluIHBlcmNlbnRcbiAqIEByZXR1cm4ge1t0eXBlXX0gICAgICAgICAgIFtkZXNjcmlwdGlvbl1cbiAqL1xuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24oJGVsZW1lbnQsIHRocmVzaG9sZCA9IDApIHtcblxuICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24ocmVzb2x2ZSkge1xuXG4gICAgdmFyIGNoZWNrRWxlbWVudCA9IGRlYm91bmNlKGZ1bmN0aW9uKCkge1xuICAgICAgaWYgKGhhc1Njcm9sbGVkUGFzdCgkZWxlbWVudCwgdGhyZXNob2xkKSkge1xuICAgICAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcignc2Nyb2xsJywgY2hlY2tFbGVtZW50KTtcbiAgICAgICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3Jlc2l6ZScsIGNoZWNrRWxlbWVudCk7XG4gICAgICAgIHJlc29sdmUoKTtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdzY3JvbGwnLCBjaGVja0VsZW1lbnQpO1xuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdyZXNpemUnLCBjaGVja0VsZW1lbnQpO1xuICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ0RPTUNvbnRlbnRMb2FkZWQnLCBjaGVja0VsZW1lbnQpO1xuICAgIHNldFRpbWVvdXQoY2hlY2tFbGVtZW50LCAwKTtcbiAgfSk7XG59XG4iLCIvKipcbiAqIEhlbHBlcnMgZm9yIHZhbGlkYXRpbmcgaW5wdXQgZmllbGRzXG4gKi9cblxuaW1wb3J0IGlzRGF0ZSBmcm9tICcuL2lzLWRhdGUnO1xuaW1wb3J0IGlzRW1haWwgZnJvbSAnLi9pcy1lbWFpbCc7XG5pbXBvcnQgaXNGbG9hdCBmcm9tICcuL2lzLWZsb2F0JztcbmltcG9ydCBpc0ludCBmcm9tICcuL2lzLWludCc7XG5pbXBvcnQgaXNSZXF1aXJlZCBmcm9tICcuL2lzLXJlcXVpcmVkJztcbmltcG9ydCBpc1VybCBmcm9tICcuL2lzLXVybCc7XG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgaXNEYXRlLFxuICBpc0VtYWlsLFxuICBpc0Zsb2F0LFxuICBpc0ludCxcbiAgaXNSZXF1aXJlZCxcbiAgaXNVcmxcbn07XG4iLCJpbXBvcnQgZ2V0QWxsRWxlbWVudHMgZnJvbSAnLi4vZG9tL2dldC1hbGwnO1xuaW1wb3J0IHZhbGlkYXRlIGZyb20gJy4vJztcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24oKSB7XG5cbiAgZ2V0QWxsRWxlbWVudHMoJy52YWxpZGF0ZScpLmZvckVhY2goZnVuY3Rpb24oJHZhbGlkYXRlQ29udGFpbmVyKSB7XG5cbiAgICB2YXIgJHZhbGlkYXRlRmllbGQgPSAkdmFsaWRhdGVDb250YWluZXI7XG5cbiAgICBpZiAoISR2YWxpZGF0ZUNvbnRhaW5lci5tYXRjaGVzKCdpbnB1dCwgdGV4dGFyZWEnKSkge1xuICAgICAgJHZhbGlkYXRlRmllbGQgPSAkdmFsaWRhdGVDb250YWluZXIucXVlcnlTZWxlY3RvcignaW5wdXQsIHRleHRhcmVhJyk7XG4gICAgfVxuXG4gICAgaWYgKCEkdmFsaWRhdGVGaWVsZCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIC8vIEZpbmQgcmVsZXZhdCB2YWxpZGF0aW9uIG1ldGhvZHNcbiAgICB2YXIgdmFsaWRhdG9yTmFtZXMgPSBbXTtcbiAgICBmb3IgKHZhciBrZXkgaW4gJHZhbGlkYXRlQ29udGFpbmVyLmRhdGFzZXQpIHtcbiAgICAgIGlmIChrZXkgIT09ICd2YWxpZGF0ZScgJiYga2V5LmluZGV4T2YoJ3ZhbGlkYXRlJykgPT09IDApIHtcbiAgICAgICAgdmFyIHZhbGlkYXRvck5hbWUgPSBrZXkucmVwbGFjZSgndmFsaWRhdGUnLCAnJyk7XG5cbiAgICAgICAgaWYgKHZhbGlkYXRlWydpcycgKyB2YWxpZGF0b3JOYW1lXSkge1xuICAgICAgICAgIHZhbGlkYXRvck5hbWVzLnB1c2godmFsaWRhdG9yTmFtZSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAodmFsaWRhdG9yTmFtZXMubGVuZ3RoID09PSAwKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgLy8gQ2hlY2sgdmFsaWRhdGlvbiB3aGVuIGlucHV0IG9uIGZpZWxkIGlzIGNoYW5nZWRcbiAgICAkdmFsaWRhdGVGaWVsZC5hZGRFdmVudExpc3RlbmVyKCdpbnB1dCcsIGZ1bmN0aW9uKCkge1xuICAgICAgdmFyIGlucHV0ID0gJHZhbGlkYXRlRmllbGQudmFsdWU7XG4gICAgICB2YXIgdmFsaWQgPSAhdmFsaWRhdG9yTmFtZXMuc29tZShmdW5jdGlvbih2YWxpZGF0b3JOYW1lKSB7XG5cdGlmICghaW5wdXQgJiYgdmFsaWRhdG9yTmFtZSAhPT0gJ1JlcXVpcmVkJykge1xuXHQgIHJldHVybiBmYWxzZTtcblx0fVxuICAgICAgICByZXR1cm4gIXZhbGlkYXRlWydpcycgKyB2YWxpZGF0b3JOYW1lXShpbnB1dCk7XG4gICAgICB9KTtcblxuICAgICAgaWYgKHZhbGlkKSB7XG5cdCR2YWxpZGF0ZUNvbnRhaW5lci5jbGFzc0xpc3QuYWRkKCd2YWxpZGF0ZS0tdmFsaWQnKTtcblx0JHZhbGlkYXRlQ29udGFpbmVyLmNsYXNzTGlzdC5yZW1vdmUoJ3ZhbGlkYXRlLS1ub3QtdmFsaWQnKTtcbiAgICAgIH0gZWxzZSB7XG5cdCR2YWxpZGF0ZUNvbnRhaW5lci5jbGFzc0xpc3QuYWRkKCd2YWxpZGF0ZS0tbm90LXZhbGlkJyk7XG5cdCR2YWxpZGF0ZUNvbnRhaW5lci5jbGFzc0xpc3QucmVtb3ZlKCd2YWxpZGF0ZS0tdmFsaWQnKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfSk7XG59XG4iLCIvKipcbiAqIFZhbGlkYXRlIHRoYXQgc3RyaW5nIGNhbiBiZSBjb252ZXJ0ZWQgdG8gZGF0ZVxuICogQHBhcmFtICB7c3RyaW5nfSBkYXRlIGlucHV0XG4gKiBAcmV0dXJuIHtib29sZWFufVxuICovXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbihkYXRlKSB7XG4gIHJldHVybiAhaXNOYU4oRGF0ZS5wYXJzZShkYXRlKSk7XG59XG4iLCIvKipcbiAqIFZhbGlkYXRlIGUtbWFpbFxuICogQHBhcmFtICB7c3RyaW5nfSBlbWFpbCBpbnB1dFxuICogQHJldHVybiB7Ym9vbGVhbn1cbiAqL1xuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24oZW1haWwpIHtcbiAgdmFyIHJlID0gL14oW2EtejAtOV9cXC4tXSspQChbXFxkYS16XFwuLV0rKVxcLihbYS16XFwuXXsyLDZ9KSQvO1xuICByZXR1cm4gcmUudGVzdChlbWFpbCk7XG59XG4iLCIvKipcbiAqIFZhbGlkYXRlIGZsb2F0XG4gKiBAcGFyYW0gIHtzdHJpbmd9IGZsb2F0IGlucHV0XG4gKiBAcmV0dXJuIHtib29sZWFufVxuICovXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbihmbG9hdCkge1xuICB2YXIgcmUgPSAvXig/OlstK10/KD86WzAtOV0rKSk/KD86XFwuWzAtOV0qKT8oPzpbZUVdW1xcK1xcLV0/KD86WzAtOV0rKSk/JC87XG4gIHJldHVybiBmbG9hdCAhPT0gJycgJiYgcmUudGVzdChmbG9hdCk7XG59XG4iLCIvKipcbiAqIFZhbGlkYXRlIGludGVnZXRcbiAqIEBwYXJhbSAge3N0cmluZ30gaW50ZWdlciBpbnB1dFxuICogQHJldHVybiB7Ym9vbGVhbn1cbiAqL1xuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24oaW50ZWdlcikge1xuICB2YXIgcmUgPSAvXig/OlstK10/KD86MHxbMS05XVswLTldKikpJC87XG4gIHJldHVybiByZS50ZXN0KGludGVnZXIpO1xufVxuIiwiLyoqXG4gKiBWYWxpZGF0ZSBpZiB0aGUgc3RyaW5nIGlzIGVtcHR5XG4gKiBAcGFyYW0gIHtzdHJpbmd9IGlucHV0XG4gKiBAcmV0dXJuIHtib29sZWFufVxuICovXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbihpbnB1dCkge1xuICByZXR1cm4gaW5wdXQudHJpbSgpICE9PSAnJztcbn1cbiIsIi8qKlxuICogVmFsaWRhdGUgdXJsXG4gKiBAcGFyYW0gIHtzdHJpbmd9IHVybCBpbnB1dFxuICogQHJldHVybiB7Ym9vbGVhbn1cbiAqL1xuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24odXJsKSB7XG4gIHZhciByZSA9IC9eKGh0dHBzPzpcXC9cXC8pPyhbXFxkYS16XFwuLV0rKVxcLihbYS16XFwuXXsyLDZ9KShbXFwvXFx3IFxcLi1dKikqXFwvPyQvO1xuICByZXR1cm4gcmUudGVzdCh1cmwpO1xufVxuIl19
