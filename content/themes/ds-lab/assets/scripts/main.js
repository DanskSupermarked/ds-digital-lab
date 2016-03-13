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

	(0, _getAll2.default)('.placeholder').forEach(function ($placeholder) {
		var $input = $placeholder.parentNode.querySelector('input, textarea');

		$placeholder.addEventListener('click', function () {
			$input.focus();
		});

		$input.addEventListener('input', function () {
			if ($input.value === '') {
				$placeholder.classList.remove('placeholder--not-empty');
			} else {
				$placeholder.classList.add('placeholder--not-empty');
			}
		});
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
		if (likes) {
			$likes.innerHTML = likes;
		} else if (isNaN($likes.innerHTML)) {
			$likes.innerHTML = 1;
		} else {
			$likes.innerHTML = parseInt($likes.innerHTML) + 1;
		}
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
			$text.querySelector('.placeholder').classList.remove('placeholder--not-empty');
		} else {
			$validators.forEach(function ($validator) {
				if ($validator.dataset.validateRequired !== undefined) {
					$validator.classList.add('validate--not-valid');
					$validator.classList.remove('validate--valid');
				}
				$validator.querySelector('input, textarea').value = '';
				$validator.querySelector('.placeholder').classList.remove('placeholder--not-empty');
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
		$footerIcon.setAttribute('src', '/assets/images/heart--inverse--active.svg');
		$footerIcon.setAttribute('data-src', '/assets/images/heart--inverse--active.svg');
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
		setLikesNumber();
		api.like();
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
		$responseText.parentNode.querySelector('.placeholder').classList.add('placeholder--not-empty');
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJub2RlX21vZHVsZXMvZXBvY2gtdG8tdGltZWFnby9jdXRvZmYvY3V0b2ZmLmpzb24iLCJub2RlX21vZHVsZXMvZXBvY2gtdG8tdGltZWFnby9pbmRleC5qcyIsIm5vZGVfbW9kdWxlcy9lcG9jaC10by10aW1lYWdvL3N1ZmZpeC9zdWZmaXgtZGljdGlvbmFyeS5qc29uIiwibm9kZV9tb2R1bGVzL2Vwb2NoLXRvLXRpbWVhZ28vdGltZS1hZ28vdGltZS1hZ28uanMiLCJub2RlX21vZHVsZXMvZXBvY2gtdG8tdGltZWFnby90aW1lLWNhbGN1bGF0aW9ucy9pbmRleC5qcyIsIm5vZGVfbW9kdWxlcy9lcG9jaC10by10aW1lYWdvL3RpbWUtY2FsY3VsYXRpb25zL3RpbWUtYWdvL2RheXMtYWdvLmpzIiwibm9kZV9tb2R1bGVzL2Vwb2NoLXRvLXRpbWVhZ28vdGltZS1jYWxjdWxhdGlvbnMvdGltZS1hZ28vaG91cnMtYWdvLmpzIiwibm9kZV9tb2R1bGVzL2Vwb2NoLXRvLXRpbWVhZ28vdGltZS1jYWxjdWxhdGlvbnMvdGltZS1hZ28vbWludXRlcy1hZ28uanMiLCJub2RlX21vZHVsZXMvZXBvY2gtdG8tdGltZWFnby90aW1lLWNhbGN1bGF0aW9ucy90aW1lLWFnby9tb250aHMtYWdvLmpzIiwibm9kZV9tb2R1bGVzL2Vwb2NoLXRvLXRpbWVhZ28vdGltZS1jYWxjdWxhdGlvbnMvdGltZS1hZ28vc2Vjb25kcy1hZ28uanMiLCJub2RlX21vZHVsZXMvZXBvY2gtdG8tdGltZWFnby90aW1lLWNhbGN1bGF0aW9ucy90aW1lLWFnby93ZWVrcy1hZ28uanMiLCJub2RlX21vZHVsZXMvZXBvY2gtdG8tdGltZWFnby90aW1lLWNhbGN1bGF0aW9ucy90aW1lLWFnby95ZWFycy1hZ28uanMiLCJzcmMvc2NyaXB0cy9jb21wb25lbnRzL25hdmlnYXRpb24uanMiLCJzcmMvc2NyaXB0cy9jb21wb25lbnRzL3Jlc3BvbnNlLmpzIiwic3JjL3NjcmlwdHMvY29tcG9uZW50cy9zZWFyY2guanMiLCJzcmMvc2NyaXB0cy9jb21wb25lbnRzL3Rvb2wtdGlwLmpzIiwic3JjL3NjcmlwdHMvbGliL2FwaS5qcyIsInNyYy9zY3JpcHRzL2xpYi9mb3JtL2xpdmUtdmFsaWRhdGlvbi5qcyIsInNyYy9zY3JpcHRzL2xpYi9mb3JtL3ZhbGlkYXRlLmpzIiwic3JjL3NjcmlwdHMvbGliL2dldC1sb2dnZWQtaW4tZGF0YS5qcyIsInNyYy9zY3JpcHRzL2xpYi9odG1sLWVuY29kZS5qcyIsInNyYy9zY3JpcHRzL2xpYi9pbWFnZS1jb252ZXJ0ZXIuanMiLCJzcmMvc2NyaXB0cy9saWIvcmVhZC10aW1lLmpzIiwic3JjL3NjcmlwdHMvbGliL3N0cmlwLWh0bWwtdGFncy5qcyIsInNyYy9zY3JpcHRzL21haW4uanMiLCJzcmMvc2NyaXB0cy90ZW1wbGF0ZXMvYXV0aG9yLmpzIiwic3JjL3NjcmlwdHMvdGVtcGxhdGVzL3Bvc3QuanMiLCJzcmMvc2NyaXB0cy90ZW1wbGF0ZXMvcmVzcG9uc2UtbWV0YS5qcyIsInNyYy9zY3JpcHRzL3RlbXBsYXRlcy9yZXNwb25zZS5qcyIsInNyYy9zY3JpcHRzL3RlbXBsYXRlcy90YWcuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvd29yZC1jb3VudC9pbmRleC5qcyIsIi4uLy4uLy4uLy4uL3RlYW0tbnBtLXBhY2thZ2VzL2RzLWFzc2V0cy9hc3luYy9kZWJvdW5jZS5qcyIsIi4uLy4uLy4uLy4uL3RlYW0tbnBtLXBhY2thZ2VzL2RzLWFzc2V0cy9hc3luYy9kZWxheS5qcyIsIi4uLy4uLy4uLy4uL3RlYW0tbnBtLXBhY2thZ2VzL2RzLWFzc2V0cy9kb20vZ2V0LWFsbC5qcyIsIi4uLy4uLy4uLy4uL3RlYW0tbnBtLXBhY2thZ2VzL2RzLWFzc2V0cy9kb20vZ2V0LWRvY3VtZW50LW9mZnNldC10b3AuanMiLCIuLi8uLi8uLi8uLi90ZWFtLW5wbS1wYWNrYWdlcy9kcy1hc3NldHMvbGF6eS9pbWFnZXMuanMiLCIuLi8uLi8uLi8uLi90ZWFtLW5wbS1wYWNrYWdlcy9kcy1hc3NldHMvc2Nyb2xsL2hhcy1zY3JvbGxlZC1wYXN0LmpzIiwiLi4vLi4vLi4vLi4vdGVhbS1ucG0tcGFja2FnZXMvZHMtYXNzZXRzL3Njcm9sbC9zY3JvbGwtY2hhbmdlLmpzIiwiLi4vLi4vLi4vLi4vdGVhbS1ucG0tcGFja2FnZXMvZHMtYXNzZXRzL3Njcm9sbC92aXNpYmxlLmpzIiwiLi4vLi4vLi4vLi4vdGVhbS1ucG0tcGFja2FnZXMvZHMtYXNzZXRzL3ZhbGlkYXRlL2luZGV4LmpzIiwiLi4vLi4vLi4vLi4vdGVhbS1ucG0tcGFja2FnZXMvZHMtYXNzZXRzL3ZhbGlkYXRlL2lucHV0LWZpZWxkcy5qcyIsIi4uLy4uLy4uLy4uL3RlYW0tbnBtLXBhY2thZ2VzL2RzLWFzc2V0cy92YWxpZGF0ZS9pcy1kYXRlLmpzIiwiLi4vLi4vLi4vLi4vdGVhbS1ucG0tcGFja2FnZXMvZHMtYXNzZXRzL3ZhbGlkYXRlL2lzLWVtYWlsLmpzIiwiLi4vLi4vLi4vLi4vdGVhbS1ucG0tcGFja2FnZXMvZHMtYXNzZXRzL3ZhbGlkYXRlL2lzLWZsb2F0LmpzIiwiLi4vLi4vLi4vLi4vdGVhbS1ucG0tcGFja2FnZXMvZHMtYXNzZXRzL3ZhbGlkYXRlL2lzLWludC5qcyIsIi4uLy4uLy4uLy4uL3RlYW0tbnBtLXBhY2thZ2VzL2RzLWFzc2V0cy92YWxpZGF0ZS9pcy1yZXF1aXJlZC5qcyIsIi4uLy4uLy4uLy4uL3RlYW0tbnBtLXBhY2thZ2VzL2RzLWFzc2V0cy92YWxpZGF0ZS9pcy11cmwuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDUkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDTkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtB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QUksS0FBSyxnRUFBTCxDQUR1QjtBQUUzQixTQUFPLEdBQUcsSUFBSCxDQUFRLEdBQVIsQ0FBUCxDQUYyQjtDQUFkIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsIm1vZHVsZS5leHBvcnRzPXtcbiAgXCJzZWNvbmRzXCI6IDYwLFxuICBcIm1pbnV0ZXNcIjogNjAsXG4gIFwiaG91cnNcIjogMjQsXG4gIFwiZGF5c1wiOiA3LFxuICBcIndlZWtzXCI6IDQsXG4gIFwibW9udGhzXCI6IDEyXG59XG4iLCJ2YXIgY29udmVydGVyID0gbW9kdWxlLmV4cG9ydHMgPSB7XG4gIGN1dG9mZjogcmVxdWlyZSgnLi9jdXRvZmYvY3V0b2ZmLmpzb24nKSxcbiAgc3VmZml4RGljdGlvbmFyeTogcmVxdWlyZSgnLi9zdWZmaXgvc3VmZml4LWRpY3Rpb25hcnkuanNvbicpLFxuICB0aW1lQ2FsY3M6IHJlcXVpcmUoJy4vdGltZS1jYWxjdWxhdGlvbnMnKVxufVxuY29udmVydGVyLnRpbWVBZ28gPSByZXF1aXJlKCcuL3RpbWUtYWdvL3RpbWUtYWdvLmpzJykuYmluZChjb252ZXJ0ZXIpXG4iLCJtb2R1bGUuZXhwb3J0cz17XG4gIFwic2Vjb25kc1wiOiB7XG4gICAgXCJzaW5ndWxhclwiOiBcIiBzZWNvbmQgYWdvXCIsXG4gICAgXCJwbHVyYWxcIjogXCIgc2Vjb25kcyBhZ29cIlxuICB9LFxuICBcIm1pbnV0ZXNcIjoge1xuICAgIFwic2luZ3VsYXJcIjogXCIgbWludXRlIGFnb1wiLFxuICAgIFwicGx1cmFsXCI6IFwiIG1pbnV0ZXMgYWdvXCJcbiAgfSxcbiAgXCJob3Vyc1wiOiB7XG4gICAgXCJzaW5ndWxhclwiOiBcIiBob3VyIGFnb1wiLFxuICAgIFwicGx1cmFsXCI6IFwiIGhvdXJzIGFnb1wiXG4gIH0sXG4gIFwiZGF5c1wiOiB7XG4gICAgXCJzaW5ndWxhclwiOiBcIiBkYXkgYWdvXCIsXG4gICAgXCJwbHVyYWxcIjogXCIgZGF5cyBhZ29cIlxuICB9LFxuICBcIndlZWtzXCI6IHtcbiAgICBcInNpbmd1bGFyXCI6IFwiIHdlZWsgYWdvXCIsXG4gICAgXCJwbHVyYWxcIjogXCIgd2Vla3MgYWdvXCJcbiAgfSxcbiAgXCJtb250aHNcIjoge1xuICAgIFwic2luZ3VsYXJcIjogXCIgbW9udGggYWdvXCIsXG4gICAgXCJwbHVyYWxcIjogXCIgbW9udGhzIGFnb1wiXG4gIH0sXG4gIFwieWVhcnNcIjoge1xuICAgIFwic2luZ3VsYXJcIjogXCIgeWVhciBhZ29cIixcbiAgICBcInBsdXJhbFwiOiBcIiB5ZWFycyBhZ29cIlxuICB9XG59XG4iLCJtb2R1bGUuZXhwb3J0cyA9IFRpbWVBZ29cblxuZnVuY3Rpb24gVGltZUFnbyAocGFzdEVwb2NoLCBjdXJyZW50RXBvY2gpIHtcbiAgdmFyIHNlY29uZHMgPSBNYXRoLnJvdW5kKHRoaXMudGltZUNhbGNzLnNlY29uZHMocGFzdEVwb2NoLCBjdXJyZW50RXBvY2gpKVxuICB2YXIgbWludXRlcyA9IE1hdGgucm91bmQodGhpcy50aW1lQ2FsY3MubWludXRlcyhwYXN0RXBvY2gsIGN1cnJlbnRFcG9jaCkpXG4gIHZhciBob3VycyA9IE1hdGgucm91bmQodGhpcy50aW1lQ2FsY3MuaG91cnMocGFzdEVwb2NoLCBjdXJyZW50RXBvY2gpKVxuICB2YXIgZGF5cyA9IE1hdGgucm91bmQodGhpcy50aW1lQ2FsY3MuZGF5cyhwYXN0RXBvY2gsIGN1cnJlbnRFcG9jaCkpXG4gIHZhciB3ZWVrcyA9IE1hdGgucm91bmQodGhpcy50aW1lQ2FsY3Mud2Vla3MocGFzdEVwb2NoLCBjdXJyZW50RXBvY2gpKVxuICB2YXIgbW9udGhzID0gTWF0aC5yb3VuZCh0aGlzLnRpbWVDYWxjcy5tb250aHMocGFzdEVwb2NoLCBjdXJyZW50RXBvY2gpKVxuICB2YXIgeWVhcnMgPSBNYXRoLnJvdW5kKHRoaXMudGltZUNhbGNzLnllYXJzKHBhc3RFcG9jaCwgY3VycmVudEVwb2NoKSlcblxuICB2YXIgc3VmZml4ID0gdGhpcy5zdWZmaXhEaWN0aW9uYXJ5XG4gIHZhciBjdXRvZmYgPSB0aGlzLmN1dG9mZlxuXG4gIGlmIChzZWNvbmRzIDwgY3V0b2ZmLnNlY29uZHMpIHtcbiAgICByZXR1cm4gc2Vjb25kcyArIHN1ZmZpeC5zZWNvbmRzW2dldEZvcm0oc2Vjb25kcyldXG4gIH0gZWxzZSBpZiAobWludXRlcyA8IGN1dG9mZi5taW51dGVzKSB7XG4gICAgcmV0dXJuIG1pbnV0ZXMgKyBzdWZmaXgubWludXRlc1tnZXRGb3JtKG1pbnV0ZXMpXVxuICB9IGVsc2UgaWYgKGhvdXJzIDwgY3V0b2ZmLmhvdXJzKSB7XG4gICAgcmV0dXJuIGhvdXJzICsgc3VmZml4LmhvdXJzW2dldEZvcm0oaG91cnMpXVxuICB9IGVsc2UgaWYgKGRheXMgPCBjdXRvZmYuZGF5cykge1xuICAgIHJldHVybiBkYXlzICsgc3VmZml4LmRheXNbZ2V0Rm9ybShkYXlzKV1cbiAgfSBlbHNlIGlmICh3ZWVrcyA8IGN1dG9mZi53ZWVrcykge1xuICAgIHJldHVybiB3ZWVrcyArIHN1ZmZpeC53ZWVrc1tnZXRGb3JtKHdlZWtzKV1cbiAgfSBlbHNlIGlmIChtb250aHMgPCBjdXRvZmYubW9udGhzKSB7XG4gICAgcmV0dXJuIG1vbnRocyArIHN1ZmZpeC5tb250aHNbZ2V0Rm9ybShtb250aHMpXVxuICB9IGVsc2Uge1xuICAgIHJldHVybiB5ZWFycyArIHN1ZmZpeC55ZWFyc1tnZXRGb3JtKHllYXJzKV1cbiAgfVxufVxuXG5mdW5jdGlvbiBnZXRGb3JtICh2YWx1ZSkge1xuICBpZiAodmFsdWUgPT09IDEpIHtcbiAgICByZXR1cm4gJ3Npbmd1bGFyJ1xuICB9XG4gIHJldHVybiAncGx1cmFsJ1xufVxuIiwibW9kdWxlLmV4cG9ydHMgPSB7XG4gIHNlY29uZHM6IHJlcXVpcmUoJy4vdGltZS1hZ28vc2Vjb25kcy1hZ28uanMnKSxcbiAgbWludXRlczogcmVxdWlyZSgnLi90aW1lLWFnby9taW51dGVzLWFnby5qcycpLFxuICBob3VyczogcmVxdWlyZSgnLi90aW1lLWFnby9ob3Vycy1hZ28uanMnKSxcbiAgZGF5czogcmVxdWlyZSgnLi90aW1lLWFnby9kYXlzLWFnby5qcycpLFxuICB3ZWVrczogcmVxdWlyZSgnLi90aW1lLWFnby93ZWVrcy1hZ28uanMnKSxcbiAgbW9udGhzOiByZXF1aXJlKCcuL3RpbWUtYWdvL21vbnRocy1hZ28uanMnKSxcbiAgeWVhcnM6IHJlcXVpcmUoJy4vdGltZS1hZ28veWVhcnMtYWdvLmpzJylcbn1cbiIsIm1vZHVsZS5leHBvcnRzID0gRGF5c0Fnb1xuXG5mdW5jdGlvbiBEYXlzQWdvIChwYXN0RXBvY2gsIGN1cnJlbnRFcG9jaCkge1xuICB2YXIgZGF5c0FnbyA9IChjdXJyZW50RXBvY2ggLSBwYXN0RXBvY2gpIC8gMTAwMCAvIDYwIC8gNjAgLyAyNFxuICByZXR1cm4gZGF5c0Fnb1xufVxuIiwibW9kdWxlLmV4cG9ydHMgPSBIb3Vyc0Fnb1xuXG5mdW5jdGlvbiBIb3Vyc0FnbyAocGFzdEVwb2NoLCBjdXJyZW50RXBvY2gpIHtcbiAgdmFyIGhvdXJzQWdvID0gKGN1cnJlbnRFcG9jaCAtIHBhc3RFcG9jaCkgLyAxMDAwIC8gNjAgLyA2MFxuICByZXR1cm4gaG91cnNBZ29cbn1cbiIsIm1vZHVsZS5leHBvcnRzID0gTWludXRlc0Fnb1xuXG5mdW5jdGlvbiBNaW51dGVzQWdvIChwYXN0RXBvY2gsIGN1cnJlbnRFcG9jaCkge1xuICB2YXIgbWludXRlc0FnbyA9IChjdXJyZW50RXBvY2ggLSBwYXN0RXBvY2gpIC8gMTAwMCAvIDYwXG4gIHJldHVybiBtaW51dGVzQWdvXG59XG4iLCJtb2R1bGUuZXhwb3J0cyA9IE1vbnRoc0Fnb1xuXG5mdW5jdGlvbiBNb250aHNBZ28gKHBhc3RFcG9jaCwgY3VycmVudEVwb2NoKSB7XG4gIHZhciBtb250aHNBZ28gPSAoY3VycmVudEVwb2NoIC0gcGFzdEVwb2NoKSAvIDEwMDAgLyA2MCAvIDYwIC8gMjQgLyAzMVxuICByZXR1cm4gbW9udGhzQWdvXG59XG4iLCJtb2R1bGUuZXhwb3J0cyA9IFNlY29uZHNBZ29cblxuZnVuY3Rpb24gU2Vjb25kc0FnbyAocGFzdEVwb2NoLCBjdXJyZW50RXBvY2gpIHtcbiAgdmFyIHNlY29uZHNBZ28gPSAoY3VycmVudEVwb2NoIC0gcGFzdEVwb2NoKSAvIDEwMDBcbiAgcmV0dXJuIHNlY29uZHNBZ29cbn1cbiIsIm1vZHVsZS5leHBvcnRzID0gV2Vla3NBZ29cblxuZnVuY3Rpb24gV2Vla3NBZ28gKHBhc3RFcG9jaCwgY3VycmVudEVwb2NoKSB7XG4gIHZhciB3ZWVrc0FnbyA9IChjdXJyZW50RXBvY2ggLSBwYXN0RXBvY2gpIC8gMTAwMCAvIDYwIC8gNjAgLyAyNCAvIDdcbiAgcmV0dXJuIHdlZWtzQWdvXG59XG4iLCJtb2R1bGUuZXhwb3J0cyA9IFllYXJzQWdvXG5cbmZ1bmN0aW9uIFllYXJzQWdvIChwYXN0RXBvY2gsIGN1cnJlbnRFcG9jaCkge1xuICB2YXIgeWVhcnNBZ28gPSAoY3VycmVudEVwb2NoIC0gcGFzdEVwb2NoKSAvIDEwMDAgLyA2MCAvIDYwIC8gMjQgLyAzMSAvIDEyXG4gIHJldHVybiB5ZWFyc0Fnb1xufVxuIiwiLyoqXG4gKiBIYW5kbGUgbmF2aWdhdGlvblxuICovXG5cbi8vIERlcGVuZGVuY2llc1xuaW1wb3J0IHNjcm9sbENoYW5nZSBmcm9tICdkcy1hc3NldHMvc2Nyb2xsL3Njcm9sbC1jaGFuZ2UnO1xuaW1wb3J0IGRlYm91bmNlIGZyb20gJ2RzLWFzc2V0cy9hc3luYy9kZWJvdW5jZSc7XG5pbXBvcnQgZ2V0QWxsIGZyb20gJ2RzLWFzc2V0cy9kb20vZ2V0LWFsbCc7XG5pbXBvcnQgaGFzU2Nyb2xsZWRQYXN0IGZyb20gJ2RzLWFzc2V0cy9zY3JvbGwvaGFzLXNjcm9sbGVkLXBhc3QnO1xuaW1wb3J0IGdldFVzZXJEYXRhIGZyb20gJy4uL2xpYi9nZXQtbG9nZ2VkLWluLWRhdGEnO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbigpIHtcblxuICB2YXIgJG5hdiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5uYXYnKTtcbiAgaWYgKCEkbmF2KSB7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgdmFyICRib2R5ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignYm9keScpO1xuXG4gIC8vIENsb25lIG5hdmlnYXRpb24gYW5kIG1ha2UgdGhlIG5ldyBvbmUgc3RpY2t5XG4gIHZhciAkc3RpY2t5TmF2ID0gJG5hdi5jbG9uZU5vZGUodHJ1ZSk7XG4gICRzdGlja3lOYXYuY2xhc3NMaXN0LmFkZCgnbmF2LS1zdGlja3knKTtcbiAgJGJvZHkuaW5zZXJ0QmVmb3JlKCRzdGlja3lOYXYsICRib2R5LmZpcnN0Q2hpbGQpO1xuXG4gIHZhciAkZm9vdGVyU2hhcmVCYXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZm9vdGVyX19zaGFyZS1iYXInKTtcbiAgdmFyICRzdGlja3lTaGFyZUJhcjtcbiAgaWYgKCRmb290ZXJTaGFyZUJhcikge1xuICAgICRzdGlja3lTaGFyZUJhciA9ICRmb290ZXJTaGFyZUJhci5jbG9uZU5vZGUodHJ1ZSk7XG4gICAgJHN0aWNreVNoYXJlQmFyLmNsYXNzTGlzdC5hZGQoJ2Zvb3Rlcl9fc2hhcmUtYmFyLS1zdGlja3knKTtcbiAgICAkYm9keS5pbnNlcnRCZWZvcmUoJHN0aWNreVNoYXJlQmFyLCAkYm9keS5maXJzdENoaWxkKTtcbiAgfVxuXG4gIC8vIEFjdGl2YXRlIHRoZSBzdGlja3kgbmF2aWdhdGlvbiB3aGVuIHRoZSB1c2VyIHNjcm9sbHMgdXAuXG4gIC8vIFRoaXMgd2lsbCBmaXJzIHRha2UgZWZmZWN0LCB3aGVuIHRoZSB1c2VyIGhhcyBzY3JvbGxlZCBcImEgc2NyZWVuXCIgZG93bi5cbiAgc2Nyb2xsQ2hhbmdlKGZ1bmN0aW9uKCkge1xuICAgICRzdGlja3lOYXYuY2xhc3NMaXN0LnJlbW92ZSgnbmF2LS1hY3RpdmUnKTtcbiAgICBpZiAoJHN0aWNreVNoYXJlQmFyKSB7XG4gICAgICAkc3RpY2t5U2hhcmVCYXIuY2xhc3NMaXN0LnJlbW92ZSgnZm9vdGVyX19zaGFyZS1iYXItLXN0aWNreS1hY3RpdmUnKTtcbiAgICB9XG4gIH0sIGZ1bmN0aW9uKCkge1xuICAgIGlmICh3aW5kb3cuc2Nyb2xsWSA+IHdpbmRvdy5pbm5lckhlaWdodCkge1xuICAgICAgJHN0aWNreU5hdi5jbGFzc0xpc3QuYWRkKCduYXYtLWFjdGl2ZScpO1xuICAgICAgaWYgKCRzdGlja3lTaGFyZUJhcikge1xuICAgICAgICAkc3RpY2t5U2hhcmVCYXIuY2xhc3NMaXN0LmFkZCgnZm9vdGVyX19zaGFyZS1iYXItLXN0aWNreS1hY3RpdmUnKTtcbiAgICAgIH1cbiAgICB9XG4gIH0pO1xuXG4gIC8qKlxuICAgKiBIaWRlIHN0aWNreSBuYXZpZ2F0aW9uIHdoZW4gc2Nyb2xsZWQgdG8gdGhlIHRvcCBvZiB0aGUgZG9jdW1lbnRcbiAgICogQHJldHVybiB7dm9pZH1cbiAgICovXG4gIHZhciBvblRvcCA9IGZ1bmN0aW9uKCkge1xuICAgIHZhciBzY3JvbGxQb3MgPSB3aW5kb3cuc2Nyb2xsWSB8fCBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuc2Nyb2xsVG9wO1xuICAgIGlmIChzY3JvbGxQb3MgPD0gMCkge1xuICAgICAgJHN0aWNreU5hdi5jbGFzc0xpc3QuYWRkKCduYXYtLWhpZGRlbicpO1xuICAgICAgJHN0aWNreU5hdi5jbGFzc0xpc3QucmVtb3ZlKCduYXYtLWFjdGl2ZScpO1xuICAgICAgaWYgKCRzdGlja3lTaGFyZUJhcikge1xuICAgICAgICAkc3RpY2t5U2hhcmVCYXIuY2xhc3NMaXN0LnJlbW92ZSgnZm9vdGVyX19zaGFyZS1iYXItLXN0aWNreS1hY3RpdmUnKTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgJHN0aWNreU5hdi5jbGFzc0xpc3QucmVtb3ZlKCduYXYtLWhpZGRlbicpO1xuICAgIH1cbiAgICBpZiAoJHN0aWNreVNoYXJlQmFyKSB7XG4gICAgICB2YXIgdGhyZXNob2xkID0gJGZvb3RlclNoYXJlQmFyLm9mZnNldEhlaWdodCAvIHdpbmRvdy5pbm5lckhlaWdodDtcbiAgICAgIGlmIChoYXNTY3JvbGxlZFBhc3QoJGZvb3RlclNoYXJlQmFyLCAtMSAqIHRocmVzaG9sZCkpIHtcbiAgICAgICAgJHN0aWNreVNoYXJlQmFyLmNsYXNzTGlzdC5hZGQoJ2hpZGRlbicpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgJHN0aWNreVNoYXJlQmFyLmNsYXNzTGlzdC5yZW1vdmUoJ2hpZGRlbicpO1xuICAgICAgfVxuICAgIH1cbiAgfTtcblxuICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignc2Nyb2xsJywgZGVib3VuY2Uob25Ub3ApKTtcbiAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3Jlc2l6ZScsIGRlYm91bmNlKG9uVG9wKSk7XG5cbiAgLy8gQ2hhbmdlIHdvcmRpbmcgb24gXCJzaWduIGluXCIgYnV0dG9uIHdoZW4gdXNlciBpcyBsb2dnZWQgaW5cbiAgZ2V0VXNlckRhdGEoKS50aGVuKGZ1bmN0aW9uKCkge1xuICAgIGdldEFsbCgnLm5hdl9faXRlbS0tc2lnbi1pbicpLmZvckVhY2goZnVuY3Rpb24oJHNpZ25pbikge1xuICAgICAgJHNpZ25pbi5pbm5lckhUTUwgPSAnQ3JlYXRlIGEgc3RvcnknO1xuICAgIH0pO1xuICB9KS5jYXRjaChmdW5jdGlvbigpIHt9KTtcblxufVxuIiwiLyoqXG4gKiBIYW5kbGUgcmVzcG9uc2VzIGFuZCBsaWtlcyBpbiBwb3N0c1xuICovXG5cbi8vIERlcGVuZGVuY2llc1xuaW1wb3J0IGdldEFsbCBmcm9tICdkcy1hc3NldHMvZG9tL2dldC1hbGwnO1xuaW1wb3J0IGxhenlJbWFnZXMgZnJvbSAnZHMtYXNzZXRzL2xhenkvaW1hZ2VzJztcbmltcG9ydCAqIGFzIGFwaSBmcm9tICcuLi9saWIvYXBpJztcbmltcG9ydCBnZXRVc2VyRGF0YSBmcm9tICcuLi9saWIvZ2V0LWxvZ2dlZC1pbi1kYXRhJztcbmltcG9ydCB1c2VyTWV0YVRlbXBsYXRlIGZyb20gJy4uL3RlbXBsYXRlcy9yZXNwb25zZS1tZXRhJztcbmltcG9ydCByZXNwb25zZVRlbXBsYXRlIGZyb20gJy4uL3RlbXBsYXRlcy9yZXNwb25zZSc7XG5pbXBvcnQgb2Zmc2V0VG9wIGZyb20gJ2RzLWFzc2V0cy9kb20vZ2V0LWRvY3VtZW50LW9mZnNldC10b3AnO1xuaW1wb3J0IGxpdmVWYWxpZGF0aW9uIGZyb20gJy4uL2xpYi9mb3JtL2xpdmUtdmFsaWRhdGlvbic7XG5pbXBvcnQgdmFsaWRhdGVGb3JtIGZyb20gJy4uL2xpYi9mb3JtL3ZhbGlkYXRlJztcblxuLy8gQ2FjaGVkIGRvbSBlbGVtZW50c1xudmFyICRyZXNwb25zZUZvcm07XG52YXIgJGN0YTtcbnZhciAkdmFsaWRhdG9ycztcbnZhciAkcmVzcG9uc2VzTGlzdDtcbnZhciByZW5kZXJSZXNwb25zZXM7XG52YXIgYWRkRGVsZXRlRXZlbnRzO1xudmFyIHNldFJlc3BvbnNlc051bWJlcjtcbnZhciBhZGRSZWFkTW9yZUV2ZW50O1xuXG52YXIgdXBkYXRlUmVzcG9uc2VDVEEgPSBmdW5jdGlvbih2YWxpZCkge1xuXHRpZiAodmFsaWQpIHtcblx0XHQkY3RhLmNsYXNzTGlzdC5yZW1vdmUoJ2J0bi0tZGlzYWJsZWQnKTtcblx0fSBlbHNlIHtcblx0XHQkY3RhLmNsYXNzTGlzdC5hZGQoJ2J0bi0tZGlzYWJsZWQnKTtcblx0fVxufTtcblxuLyoqXG4gKiBEZWxldGUgcmVzcG9uc2Ugd2hlbiBkZWxldGUgaWNvbiBjbGlja2VkXG4gKi9cbmFkZERlbGV0ZUV2ZW50cyA9IGZ1bmN0aW9uKCkge1xuXHRnZXRBbGwoJy5yZXNwb25zZV9fZGVsZXRlJykuZm9yRWFjaChmdW5jdGlvbigkZGVsZXRlKSB7XG5cdFx0JGRlbGV0ZS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uKGUpIHtcblx0XHRcdGUucHJldmVudERlZmF1bHQoKTtcblx0XHRcdGFwaS5yZW1vdmVSZXNwb25zZSgkZGVsZXRlLmRhdGFzZXQucHVibGlzaGVkLCAkZGVsZXRlLmRhdGFzZXQubmFtZSlcblx0XHRcdFx0LnRoZW4oZnVuY3Rpb24oZGF0YSkge1xuXHRcdFx0XHRcdHJlbmRlclJlc3BvbnNlcyhkYXRhLnJlc3BvbnNlcyk7XG5cdFx0XHRcdFx0c2V0UmVzcG9uc2VzTnVtYmVyKGRhdGEucmVzcG9uc2VzKTtcblx0XHRcdFx0fSk7XG5cdFx0fSk7XG5cdH0pO1xufTtcblxuLyoqXG4gKiBFeHBhbmQgcmVzcG9uc2Ugd2l0aCBmdWxsIHRleHQgd2hlbiByZWFkIG1vcmUgYnV0dG9uIGlzIGFjdGl2YXRlZC5cbiAqIEJhc2ljYWxseSBpdCBoaWRlcyB0aGUgZXhjZXJwdCBhbmQgdGhlIHJlYWQgbW9yZSBidXR0b24gYW5kIGRpc3BsYXlzIHRoZVxuICogZnVsbCB0ZXh0LlxuICogQHBhcmFtIHtlbGVtZW50fSAkcmVzcG9uc2VcbiAqL1xuYWRkUmVhZE1vcmVFdmVudCA9IGZ1bmN0aW9uKCRyZXNwb25zZSkge1xuXHR2YXIgJHJlYWRNb3JlID0gJHJlc3BvbnNlLnF1ZXJ5U2VsZWN0b3IoJy5yZXNwb25zZV9fcmVhZC1tb3JlJyk7XG5cdGlmICghJHJlYWRNb3JlKSB7XG5cdFx0cmV0dXJuO1xuXHR9XG5cdCRyZWFkTW9yZS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uKGUpIHtcblx0XHRlLnByZXZlbnREZWZhdWx0KCk7XG5cdFx0dmFyICRleGNlcnB0ID0gJHJlc3BvbnNlLnF1ZXJ5U2VsZWN0b3IoJy5yZXNwb25zZV9fZXhjZXJwdCcpO1xuXHRcdHZhciAkcmVhZE1vcmVDb250YWluZXIgPSAkcmVhZE1vcmUucGFyZW50Tm9kZTtcblxuXHRcdCRyZWFkTW9yZUNvbnRhaW5lci5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKCRyZWFkTW9yZUNvbnRhaW5lcik7XG5cdFx0JGV4Y2VycHQucGFyZW50Tm9kZS5yZW1vdmVDaGlsZCgkZXhjZXJwdCk7XG5cblx0XHQkcmVzcG9uc2UucXVlcnlTZWxlY3RvcignLnJlc3BvbnNlX190ZXh0JykuY2xhc3NMaXN0LnJlbW92ZSgnaGlkZGVuJyk7XG5cdH0pO1xufTtcblxuLyoqXG4gKiBSZW5kZXIgdGVtcGxhdGVzIGZvciByZXNwb25zZXMgYW5kIGluc2VydCBodG1sIGluIHRoZSByZXNwb25zZXMgbGlzdC5cbiAqIC0gTGF6eSBsb2FkIGltYWdlcyBpbiByZXNwb25zZXNcbiAqIC0gQXR0YWNoIG5ldyBldmVudHMgaW4gcmVzcG9uc2VzXG4gKiBAcGFyYW0gIHthcnJheX0gcmVzcG9uc2VzXG4gKiBAcmV0dXJuIHt2b2lkfVxuICovXG5yZW5kZXJSZXNwb25zZXMgPSBmdW5jdGlvbihyZXNwb25zZXMpIHtcblx0dmFyIGh0bWwgPSAnJztcblx0cmVzcG9uc2VzLmZvckVhY2goZnVuY3Rpb24ocmVzcG9uc2UpIHtcblx0XHRodG1sICs9IHJlc3BvbnNlVGVtcGxhdGUocmVzcG9uc2UpO1xuXHR9KTtcblx0JHJlc3BvbnNlc0xpc3QuaW5uZXJIVE1MID0gaHRtbDtcblx0bGF6eUltYWdlcygxKTtcblx0YWRkRGVsZXRlRXZlbnRzKCk7XG5cdGdldEFsbCgnLnJlc3BvbnNlJywgJHJlc3BvbnNlc0xpc3QpLmZvckVhY2goYWRkUmVhZE1vcmVFdmVudCk7XG59O1xuXG4vKipcbiAqIFVwZGF0ZSB0aGUgY291bnQgb2YgcmVzcG9uc2VzXG4gKiBAcGFyYW0ge2FycmF5fSByZXNwb25zZXNcbiAqL1xuc2V0UmVzcG9uc2VzTnVtYmVyID0gZnVuY3Rpb24ocmVzcG9uc2VzKSB7XG5cdGdldEFsbCgnLnNoYXJlX19yZXNwb25zZXMnKS5mb3JFYWNoKGZ1bmN0aW9uKCRyZXNwb25zZXMpIHtcblx0XHQkcmVzcG9uc2VzLmlubmVySFRNTCA9IHJlc3BvbnNlcy5sZW5ndGg7XG5cdH0pO1xufTtcblxuLyoqXG4gKiBVcGRhdGUgdGhlIGNvdW50IGZvIGxpa2VzIGZvciB0aGlzIHBvc3RcbiAqIEBwYXJhbSB7bnVtYmVyfSBsaWtlc1xuICovXG52YXIgc2V0TGlrZXNOdW1iZXIgPSBmdW5jdGlvbihsaWtlcykge1xuXHRnZXRBbGwoJy5zaGFyZV9fbGlrZXMnKS5mb3JFYWNoKGZ1bmN0aW9uKCRsaWtlcykge1xuXHRcdGlmIChsaWtlcykge1xuXHRcdFx0JGxpa2VzLmlubmVySFRNTCA9IGxpa2VzO1xuXHRcdH0gZWxzZSBpZiAoaXNOYU4oJGxpa2VzLmlubmVySFRNTCkpIHtcblx0XHRcdCRsaWtlcy5pbm5lckhUTUwgPSAxO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHQkbGlrZXMuaW5uZXJIVE1MID0gcGFyc2VJbnQoJGxpa2VzLmlubmVySFRNTCkgKyAxO1xuXHRcdH1cblx0fSk7XG59O1xuXG4vKipcbiAqIEdldCBkYXRhIGZyb20gYXBpIHdpdGggbWV0YSBkYXRhOiByZXNwb25zZXMgYW5kIGxpa2VzLlxuICogUmVuZGVyIHRoaXMgaW4gdGhlIGRvbS5cbiAqIEByZXR1cm4ge3ZvaWR9XG4gKi9cbnZhciByZW5kZXJNZXRhID0gZnVuY3Rpb24oKSB7XG5cdGFwaS5nZXRNZXRhKCkudGhlbihmdW5jdGlvbihkYXRhKSB7XG5cdFx0cmVuZGVyUmVzcG9uc2VzKGRhdGEucmVzcG9uc2VzKTtcblx0XHRzZXRSZXNwb25zZXNOdW1iZXIoZGF0YS5yZXNwb25zZXMpO1xuXHRcdHNldExpa2VzTnVtYmVyKGRhdGEubGlrZXMpO1xuXHR9KTtcbn07XG5cbi8qKlxuICogUG9zdCBuZXcgcmVzcG9uc2UgdG8gcG9zdFxuICogLSBjaGVja3MgZm9yIHZhbGlkYXRpb24gYmVmb3JlIHBvc3RpbmdcbiAqIEBwYXJhbSAge2V2ZW50fSBlXG4gKiBAcmV0dXJuIHt2b2lkfVxuICovXG52YXIgc3VibWl0UmVzcG9uc2UgPSBmdW5jdGlvbihlKSB7XG5cdGUucHJldmVudERlZmF1bHQoKTtcblxuXHR2YXIgbG9nZ2VkSW4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdib2R5JykuY2xhc3NMaXN0LmNvbnRhaW5zKCd1c2VyLWxvZ2dlZC1pbicpO1xuXG5cdC8vIElmIGEgZmllbGQgaXMgbm90IHZhbGlkIHRoaXMgZmllbGQgd2lsbCBnZXQgZm9jdXMsIHNvIHRoZSB1c2VyIHF1aWNrbHkgY2FuIHVwZGF0ZSB0aGUgdmFsdWUuXG5cdHZhciBub3RWYWxpZCA9ICR2YWxpZGF0b3JzLnNvbWUoZnVuY3Rpb24oJHZhbGlkYXRvcikge1xuXHRcdGlmICgkdmFsaWRhdG9yLmNsYXNzTGlzdC5jb250YWlucygndmFsaWRhdGUtLW5vdC12YWxpZCcpKSB7XG5cdFx0XHR2YXIgJHZhbGlkYXRlRmllbGQgPSAkdmFsaWRhdG9yLnF1ZXJ5U2VsZWN0b3IoJ2lucHV0LCB0ZXh0YXJlYScpO1xuXHRcdFx0JHZhbGlkYXRlRmllbGQuZm9jdXMoKTtcblx0XHRcdHJldHVybiB0cnVlO1xuXHRcdH1cblx0fSk7XG5cblx0aWYgKG5vdFZhbGlkKSB7XG5cdFx0cmV0dXJuO1xuXHR9XG5cblx0Ly8gQ3JlYXRlIGEgcmVzcG9uc2Ugb2JqZWN0IGJhc2VkIG9uIHZhbHVlcyBpbiBmb3JtXG5cdHZhciByZXNwb25zZSA9IHt9O1xuXHRnZXRBbGwoJ2lucHV0LCB0ZXh0YXJlYScsICRyZXNwb25zZUZvcm0pLmZvckVhY2goZnVuY3Rpb24oJGZpZWxkKSB7XG5cdFx0dmFyIG5hbWUgPSAkZmllbGQuZ2V0QXR0cmlidXRlKCduYW1lJyk7XG5cdFx0aWYgKCRmaWVsZC52YWx1ZSkge1xuXHRcdFx0cmVzcG9uc2VbbmFtZV0gPSAkZmllbGQudmFsdWU7XG5cdFx0fVxuXHR9KTtcblxuXHQkY3RhLmlubmVySFRNTCA9ICdQb3N0aW5nLi4uJztcblx0JGN0YS5jbGFzc0xpc3QuYWRkKCdidG4tLWRpc2FibGVkJyk7XG5cdGFwaS5hZGRSZXNwb25zZShyZXNwb25zZSkudGhlbihmdW5jdGlvbihkYXRhKSB7XG5cdFx0cmVuZGVyUmVzcG9uc2VzKGRhdGEucmVzcG9uc2VzKTtcblx0XHRzZXRSZXNwb25zZXNOdW1iZXIoZGF0YS5yZXNwb25zZXMpO1xuXG5cdFx0Ly8gU2Nyb2xsIHRvIG5ldyByZXNwb25zZVxuXHRcdHZhciAkbGFzdFJlc3BvbnNlID0gJHJlc3BvbnNlc0xpc3QucXVlcnlTZWxlY3RvcignLnJlc3BvbnNlOmxhc3QtY2hpbGQnKTtcblx0XHR2YXIgb2Zmc2V0ID0gb2Zmc2V0VG9wKCRsYXN0UmVzcG9uc2UpO1xuXHRcdHdpbmRvdy5zY3JvbGxUbygwLCBvZmZzZXQgLSAoMC41ICogd2luZG93LmlubmVySGVpZ2h0KSk7XG5cblx0XHQvLyBSZXNldCBmb3JtXG5cdFx0JGN0YS5pbm5lckhUTUwgPSAnUmVzcG9uZCc7XG5cdFx0aWYgKGxvZ2dlZEluKSB7XG5cdFx0XHR2YXIgJHRleHQgPSAkcmVzcG9uc2VGb3JtLnF1ZXJ5U2VsZWN0b3IoJy5yZXNwb25zZXMtZm9ybV9fdGV4dCcpO1xuXHRcdFx0JHRleHQuY2xhc3NMaXN0LmFkZCgndmFsaWRhdGUtLW5vdC12YWxpZCcpO1xuXHRcdFx0JHRleHQuY2xhc3NMaXN0LnJlbW92ZSgndmFsaWRhdGUtLXZhbGlkJyk7XG5cdFx0XHQkdGV4dC5xdWVyeVNlbGVjdG9yKCd0ZXh0YXJlYScpLnZhbHVlID0gJyc7XG5cdFx0XHQkdGV4dC5xdWVyeVNlbGVjdG9yKCcucGxhY2Vob2xkZXInKS5jbGFzc0xpc3QucmVtb3ZlKCdwbGFjZWhvbGRlci0tbm90LWVtcHR5Jyk7XG5cdFx0fSBlbHNlIHtcblx0XHRcdCR2YWxpZGF0b3JzLmZvckVhY2goZnVuY3Rpb24oJHZhbGlkYXRvcikge1xuXHRcdFx0XHRpZiAoJHZhbGlkYXRvci5kYXRhc2V0LnZhbGlkYXRlUmVxdWlyZWQgIT09IHVuZGVmaW5lZCkge1xuXHRcdFx0XHRcdCR2YWxpZGF0b3IuY2xhc3NMaXN0LmFkZCgndmFsaWRhdGUtLW5vdC12YWxpZCcpO1xuXHRcdFx0XHRcdCR2YWxpZGF0b3IuY2xhc3NMaXN0LnJlbW92ZSgndmFsaWRhdGUtLXZhbGlkJyk7XG5cdFx0XHRcdH1cblx0XHRcdFx0JHZhbGlkYXRvci5xdWVyeVNlbGVjdG9yKCdpbnB1dCwgdGV4dGFyZWEnKS52YWx1ZSA9ICcnO1xuXHRcdFx0XHQkdmFsaWRhdG9yLnF1ZXJ5U2VsZWN0b3IoJy5wbGFjZWhvbGRlcicpLmNsYXNzTGlzdC5yZW1vdmUoJ3BsYWNlaG9sZGVyLS1ub3QtZW1wdHknKTtcblx0XHRcdH0pO1xuXHRcdH1cblx0fSk7XG5cbn07XG5cbi8qKlxuICogVXBkYXRlIGhlYXJ0IChsaWtlKSBpY29ucyB0byBpbmRpY2F0ZSwgdGhhdCB0aGUgdXNlciBoYXZlIGxpa2VkIHRoZSBhcnRpY2xlXG4gKiBAcmV0dXJuIHt2b2lkfVxuICovXG52YXIgbGlrZWQgPSBmdW5jdGlvbigpIHtcblx0dmFyICR0b29sVGlwSWNvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy50b29sLXRpcF9fbGlrZS1pY29uJyk7XG5cdCR0b29sVGlwSWNvbi5zZXRBdHRyaWJ1dGUoJ3NyYycsICcvYXNzZXRzL2ltYWdlcy9oZWFydC0taW52ZXJzZS0tYWN0aXZlLnN2ZycpO1xuXHQkdG9vbFRpcEljb24uc2V0QXR0cmlidXRlKCdkYXRhLXNyYycsICcvYXNzZXRzL2ltYWdlcy9oZWFydC0taW52ZXJzZS0tYWN0aXZlLnN2ZycpO1xuXG5cdGdldEFsbCgnLnBvc3QtZm9vdGVyX19saWtlLWljb24nKS5mb3JFYWNoKGZ1bmN0aW9uKCRmb290ZXJJY29uKSB7XG5cdFx0JGZvb3Rlckljb24uc2V0QXR0cmlidXRlKCdzcmMnLCAnL2Fzc2V0cy9pbWFnZXMvaGVhcnQtLWludmVyc2UtLWFjdGl2ZS5zdmcnKTtcblx0XHQkZm9vdGVySWNvbi5zZXRBdHRyaWJ1dGUoJ2RhdGEtc3JjJywgJy9hc3NldHMvaW1hZ2VzL2hlYXJ0LS1pbnZlcnNlLS1hY3RpdmUuc3ZnJyk7XG5cdH0pO1xuXG5cdC8vIEluZGljYXRlcywgdGhhdCB0aGUgbGlrZSBidXR0b24gbm8gbG9uZ2VyIGlzIGNsaWNrYWJsZVxuXHRnZXRBbGwoJy5zaGFyZV9fbGlrZScpLmZvckVhY2goJGxpa2UgPT4gJGxpa2UuY2xhc3NMaXN0LmFkZCgnZGlzYWJsZWQnKSk7XG59O1xuXG4vKipcbiAqIEFjdGl2YXRlIGxpa2UsIHdoZW4gbGlrZSBidXR0b25zIGFyZSBjbGlja2VkXG4gKiBAcGFyYW0gIHtlbGVtZW50fSAkYW5jaG9yXG4gKiBAcmV0dXJuIHt2b2lkfVxuICovXG52YXIgYXR0YWNoTGlrZUV2ZW50ID0gZnVuY3Rpb24oJGFuY2hvcikge1xuXHQkYW5jaG9yLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24oZSkge1xuXHRcdGUucHJldmVudERlZmF1bHQoKTtcblxuXHRcdC8vIEFscmVhZHkgbGlrZWQgdGhpcyBhcnRpY2xlXG5cdFx0aWYgKGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdsaWtlOicgKyB3aW5kb3cucG9zdElkKSkge1xuXHRcdFx0cmV0dXJuO1xuXHRcdH1cblxuXHRcdGxvY2FsU3RvcmFnZS5zZXRJdGVtKCdsaWtlOicgKyB3aW5kb3cucG9zdElkLCB0cnVlKTtcblx0XHRsaWtlZCgpO1xuXHRcdHNldExpa2VzTnVtYmVyKCk7XG5cdFx0YXBpLmxpa2UoKTtcblx0fSk7XG59O1xuXG4vKipcbiAqIFVwZGF0ZSByZXNwb25zZXMgZm9ybSBpZiB1c2VyIGlzIGxvZ2dlZCBpbi5cbiAqIFVzZXIgZG8gbm90IG5lZWQgdG8gZmlsbCBlLW1haWwsIG5hbWUgZXRjLlxuICogQHBhcmFtICB7b2JqZWN0fSBkYXRhXG4gKiBAcmV0dXJuIHt2b2lkfVxuICovXG52YXIgcmVuZGVyVXNlckZvcm0gPSBmdW5jdGlvbih1c2VyKSB7XG5cdHZhciBodG1sID0gdXNlck1ldGFUZW1wbGF0ZSh1c2VyKTtcblx0dmFyICRtZXRhID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG5cdCRtZXRhLmlubmVySFRNTCA9IGh0bWw7XG5cdHZhciAkaGVhZGVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnJlc3BvbnNlc19fZm9ybSBoMycpO1xuXG5cdC8vIEZpbGwgaW5wdXQgZmllbGRzIHdpdGggcmVsZXZhbnQgZGF0YVxuXHRnZXRBbGwoJy5yZXNwb25zZXNfX2Zvcm0gaW5wdXQnKS5mb3JFYWNoKGZ1bmN0aW9uKCRpbnB1dCkge1xuXHRcdHZhciBuYW1lID0gJGlucHV0LmdldEF0dHJpYnV0ZSgnbmFtZScpO1xuXHRcdGlmIChuYW1lID09PSAnd2Vic2l0ZScpIHtcblx0XHRcdCRpbnB1dC52YWx1ZSA9ICcvYXV0aG9yLycgKyB1c2VyLnNsdWc7XG5cdFx0fSBlbHNlIHtcblx0XHRcdCRpbnB1dC52YWx1ZSA9IHVzZXJbbmFtZV07XG5cdFx0fVxuXHRcdCRpbnB1dC5wYXJlbnROb2RlLmNsYXNzTGlzdC5hZGQoJ3ZhbGlkYXRlLS12YWxpZCcpO1xuXHRcdCRpbnB1dC5wYXJlbnROb2RlLmNsYXNzTGlzdC5yZW1vdmUoJ3ZhbGlkYXRlLS1ub3QtdmFsaWQnKTtcblx0fSk7XG5cblx0Ly8gSW5zZXJ0IGFmdGVyIGhlYWRlclxuXHQkaGVhZGVyLnBhcmVudE5vZGUuaW5zZXJ0QmVmb3JlKCRtZXRhLCAkaGVhZGVyLm5leHRTaWJsaW5nKTtcblx0bGF6eUltYWdlcygxKTtcblx0dmFsaWRhdGVGb3JtKCR2YWxpZGF0b3JzLCB1cGRhdGVSZXNwb25zZUNUQSk7XG59O1xuXG4vKipcbiAqIEluaXQgcmVzcG9uc2VzXG4gKiBAcmV0dXJuIHt2b2lkfVxuICovXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbigpIHtcblx0JHJlc3BvbnNlRm9ybSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5yZXNwb25zZXNfX2Zvcm0nKTtcblxuXHRpZiAoISRyZXNwb25zZUZvcm0pIHtcblx0XHRyZXR1cm47XG5cdH1cblxuXHQvLyBDYWNoZSBkb20gZWxlbWVudHNcblx0JGN0YSA9ICRyZXNwb25zZUZvcm0ucXVlcnlTZWxlY3RvcignLmJ0bi0tY3RhJyk7XG5cdCRyZXNwb25zZXNMaXN0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnJlc3BvbnNlc19fbGlzdCcpO1xuXHQkdmFsaWRhdG9ycyA9IGdldEFsbCgnLnZhbGlkYXRlJywgJHJlc3BvbnNlRm9ybSk7XG5cblx0Ly8gVXBkYXRlIGZyb20gYXMgdXNlciB0eXBlc1xuXHRsaXZlVmFsaWRhdGlvbigkdmFsaWRhdG9ycywgdXBkYXRlUmVzcG9uc2VDVEEpO1xuXG5cdC8vIFJlbmRlciByZXNwb25zZXMgYW5kIGxpa2Vcblx0cmVuZGVyTWV0YSgpO1xuXG5cdC8vIENoYW5nZSBmb3JtIGlmIHVzZXIgaXMgbG9nZ2VkIGluXG5cdGdldFVzZXJEYXRhKCkudGhlbihyZW5kZXJVc2VyRm9ybSkuY2F0Y2goZnVuY3Rpb24oKSB7fSk7XG5cblx0Ly8gVXNlciBhbHJlYWR5IGxpa2VzIHRoaXMgYXJ0aWNsZVxuXHRpZiAobG9jYWxTdG9yYWdlLmdldEl0ZW0oJ2xpa2U6JyArIHdpbmRvdy5wb3N0SWQpKSB7XG5cdFx0bGlrZWQoKTtcblx0fVxuXG5cdGdldEFsbCgnLnNoYXJlX19saWtlJykuZm9yRWFjaChhdHRhY2hMaWtlRXZlbnQpO1xuXHQkY3RhLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgc3VibWl0UmVzcG9uc2UpO1xuXG5cdC8vIFNob3cgbWFya2Rvd24gaGVscGVyc1xuXHRkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucmVzcG9uc2UtZm9ybV9fbWFya2Rvd24tZXhwYW5kZXInKS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uKGUpIHtcblx0XHRlLnByZXZlbnREZWZhdWx0KCk7XG5cdFx0ZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnJlc3BvbnNlLWZvcm1fX21hcmtkb3duLWhlbHBlcnMnKS5jbGFzc0xpc3QucmVtb3ZlKCdoaWRkZW4nKTtcblx0fSk7XG5cblx0Z2V0QWxsKCcucGxhY2Vob2xkZXInKS5mb3JFYWNoKGZ1bmN0aW9uKCRwbGFjZWhvbGRlcikge1xuXHRcdHZhciAkaW5wdXQgPSAkcGxhY2Vob2xkZXIucGFyZW50Tm9kZS5xdWVyeVNlbGVjdG9yKCdpbnB1dCwgdGV4dGFyZWEnKTtcblxuXHRcdCRwbGFjZWhvbGRlci5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uKCkge1xuXHRcdFx0JGlucHV0LmZvY3VzKCk7XG5cdFx0fSk7XG5cblx0XHQkaW5wdXQuYWRkRXZlbnRMaXN0ZW5lcignaW5wdXQnLCBmdW5jdGlvbigpIHtcblx0XHRcdGlmICgkaW5wdXQudmFsdWUgPT09ICcnKSB7XG5cdFx0XHRcdCRwbGFjZWhvbGRlci5jbGFzc0xpc3QucmVtb3ZlKCdwbGFjZWhvbGRlci0tbm90LWVtcHR5Jyk7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHQkcGxhY2Vob2xkZXIuY2xhc3NMaXN0LmFkZCgncGxhY2Vob2xkZXItLW5vdC1lbXB0eScpO1xuXHRcdFx0fVxuXHRcdH0pO1xuXHR9KTtcblxufVxuIiwiaW1wb3J0IGxhenlJbWFnZXMgZnJvbSAnZHMtYXNzZXRzL2xhenkvaW1hZ2VzJztcbmltcG9ydCBnZXRBbGwgZnJvbSAnZHMtYXNzZXRzL2RvbS9nZXQtYWxsJztcbmltcG9ydCAqIGFzIGFwaSBmcm9tICcuLi9saWIvYXBpJztcbmltcG9ydCBwb3N0VGVtcGxhdGUgZnJvbSAnLi4vdGVtcGxhdGVzL3Bvc3QnO1xuaW1wb3J0IGF1dGhvclRlbXBsYXRlIGZyb20gJy4uL3RlbXBsYXRlcy9hdXRob3InO1xuaW1wb3J0IHRhZ1RlbXBsYXRlIGZyb20gJy4uL3RlbXBsYXRlcy90YWcnO1xuXG5jb25zdCBNQVhfUkVTVUxUUyA9IDEwO1xuXG52YXIgJHNlYXJjaElucHV0O1xudmFyICRzZWFyY2hMaXN0O1xudmFyIGxhdGVzdENvdW50ZXIgPSAwO1xuXG52YXIgZ2V0U2VhcmNoUmVzdWx0ID0gZnVuY3Rpb24ocGF0aCkge1xuXHR2YXIgYWJzb2x1dGUgPSB3aW5kb3cuZ2hvc3QudXJsLmFwaShwYXRoLCB7XG5cdFx0aW5jbHVkZTogJ3RhZ3MsYXV0aG9yLGNvdW50LnBvc3RzJ1xuXHR9KTtcblx0dmFyIHJlbGF0aXZlID0gYWJzb2x1dGUuc3Vic3RyKGFic29sdXRlLmluZGV4T2YoJy9naG9zdCcpLCBhYnNvbHV0ZS5sZW5ndGgpO1xuXHRyZXR1cm4gZmV0Y2gocmVsYXRpdmUpXG5cdFx0LnRoZW4oZnVuY3Rpb24ocmVzcG9uc2UpIHtcblx0XHRcdGlmIChyZXNwb25zZS5zdGF0dXMgPj0gMzAwKSB7XG5cdFx0XHRcdHJldHVybiBQcm9taXNlLnJlamVjdChyZXNwb25zZSk7XG5cdFx0XHR9XG5cdFx0XHRyZXR1cm4gcmVzcG9uc2U7XG5cdFx0fSlcblx0XHQudGhlbihyZXNwb25zZSA9PiByZXNwb25zZS5qc29uKCkpO1xufTtcblxudmFyIHJlbmRlclJlc3VsdHMgPSBmdW5jdGlvbihyZXN1bHRzKSB7XG5cdHZhciBodG1sID0gcmVzdWx0cy5tYXAoZnVuY3Rpb24ocmVzdWx0KSB7XG5cdFx0aWYgKHJlc3VsdC5wb3N0cykge1xuXHRcdFx0cmV0dXJuIHBvc3RUZW1wbGF0ZShyZXN1bHQucG9zdHNbMF0pO1xuXHRcdH1cblx0XHRpZiAocmVzdWx0LnVzZXJzKSB7XG5cdFx0XHRyZXR1cm4gYXV0aG9yVGVtcGxhdGUocmVzdWx0LnVzZXJzWzBdKTtcblx0XHR9XG5cdFx0aWYgKHJlc3VsdC50YWdzKSB7XG5cdFx0XHRyZXR1cm4gdGFnVGVtcGxhdGUocmVzdWx0LnRhZ3NbMF0pO1xuXHRcdH1cblx0XHRyZXR1cm4gJyc7XG5cdH0pLmpvaW4oJycpO1xuXHQkc2VhcmNoTGlzdC5pbm5lckhUTUwgPSBodG1sO1xuXHRsYXp5SW1hZ2VzKDEpO1xuXHRnZXRBbGwoJy5ib3hlc19faXRlbScsICRzZWFyY2hMaXN0KS5mb3JFYWNoKGZ1bmN0aW9uKCRib3hJdGVtLCBpKSB7XG5cdFx0c2V0VGltZW91dChmdW5jdGlvbigpIHtcblx0XHRcdCRib3hJdGVtLmNsYXNzTGlzdC5yZW1vdmUoJ2hpZGRlbicpO1xuXHRcdFx0c2V0VGltZW91dCgoKSA9PiAkYm94SXRlbS5jbGFzc0xpc3QuYWRkKCdhbmltYXRlLS1hY3RpdmUnKSwgMCk7XG5cdFx0fSwgaSAqIDUwMCk7XG5cdH0pO1xufTtcblxudmFyIHNlYXJjaCA9IGZ1bmN0aW9uKHF1ZXJ5KSB7XG5cblx0dmFyIGlkID0gKytsYXRlc3RDb3VudGVyO1xuXHR2YXIgbWluVGltZSA9IERhdGUubm93KCkgKyAzMDA7XG5cblx0JHNlYXJjaExpc3QuaW5uZXJIVE1MID0gJyc7XG5cblx0dmFyIGlzTGF0ZXN0ID0gZnVuY3Rpb24oZGF0YSkge1xuXHRcdGlmIChpZCAhPT0gbGF0ZXN0Q291bnRlcikge1xuXHRcdFx0cmV0dXJuIFByb21pc2UucmVqZWN0KCk7XG5cdFx0fVxuXHRcdHJldHVybiBkYXRhO1xuXHR9O1xuXG5cdGFwaS5nZXRTZWFyY2hJbmRleChxdWVyeSlcblx0XHQudGhlbihpc0xhdGVzdClcblx0XHQudGhlbihmdW5jdGlvbihpbmRleGVzKSB7XG5cdFx0XHR2YXIgcHJvbWlzZXMgPSBpbmRleGVzLnNsaWNlKDAsIE1BWF9SRVNVTFRTKS5tYXAoZnVuY3Rpb24oaW5kZXgpIHtcblx0XHRcdFx0cmV0dXJuIGdldFNlYXJjaFJlc3VsdChpbmRleC5yZWYpO1xuXHRcdFx0fSk7XG5cdFx0XHRyZXR1cm4gUHJvbWlzZS5hbGwocHJvbWlzZXMpO1xuXHRcdH0pXG5cdFx0LnRoZW4oZnVuY3Rpb24oZGF0YSkge1xuXHRcdFx0aWYgKG1pblRpbWUgPCBEYXRlLm5vdygpKSB7XG5cdFx0XHRcdHJldHVybiBkYXRhO1xuXHRcdFx0fVxuXHRcdFx0cmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uKHJlc29sdmUpIHtcblx0XHRcdFx0c2V0VGltZW91dCgoKSA9PiByZXNvbHZlKGRhdGEpLCBtaW5UaW1lIC0gRGF0ZS5ub3coKSk7XG5cdFx0XHR9KTtcblx0XHR9KVxuXHRcdC50aGVuKGlzTGF0ZXN0KVxuXHRcdC50aGVuKHJlbmRlclJlc3VsdHMpXG5cdFx0LmNhdGNoKGZ1bmN0aW9uKGVycikge1xuXHRcdFx0aWYgKGVycikge1xuXHRcdFx0XHRjb25zb2xlLmVycm9yKGVycik7XG5cdFx0XHR9XG5cdFx0fSk7XG59O1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbigpIHtcblxuXHQkc2VhcmNoSW5wdXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuc2VhcmNoX19pbnB1dCcpO1xuXHQkc2VhcmNoTGlzdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5zZWFyY2hfX2xpc3QnKTtcblxuXHRpZiAoISRzZWFyY2hJbnB1dCB8fCAhJHNlYXJjaExpc3QpIHtcblx0XHRyZXR1cm47XG5cdH1cblx0JHNlYXJjaElucHV0LmFkZEV2ZW50TGlzdGVuZXIoJ2lucHV0JywgZnVuY3Rpb24oKSB7XG5cdFx0c2VhcmNoKCRzZWFyY2hJbnB1dC52YWx1ZSk7XG5cdH0pO1xuXG5cdCRzZWFyY2hJbnB1dC5mb2N1cygpO1xuXG5cdCRzZWFyY2hMaXN0LnNldEF0dHJpYnV0ZSgnc3R5bGUnLCBgbWluLWhlaWdodDogJHt3aW5kb3cuaW5uZXJIZWlnaHR9cHhgKTtcblxufVxuIiwiLyoqXG4gKiBUb29sIHRpcCBzaG93ZWQgd2hlbiB1c2VyIG1hcmtzIHRleHQgaW4gYXJ0aWNsZS5cbiAqIFRoaXMgbWFrZXMgdGhlIHVzZSBhYmxlIHRvIHNoYXJlL2NvbW1lbnQgb24gdGhlIG1hcmtlZC5cbiAqL1xuXG5pbXBvcnQgdmFsaWRhdGVGb3JtIGZyb20gJy4uL2xpYi9mb3JtL3ZhbGlkYXRlJztcbmltcG9ydCBnZXRBbGwgZnJvbSAnZHMtYXNzZXRzL2RvbS9nZXQtYWxsJztcblxuLy8gQ2FjaGVkIGRvbSBlbGVtZW50c1xudmFyICRwb3N0Q29udGVudDtcbnZhciAkdG9vbFRpcDtcbnZhciAkdHdpdHRlcjtcbnZhciAkcmVzcG9uc2VGb3JtO1xudmFyICRjdGE7XG5cblxuLyoqXG4gKiBHZXQgdGhlIHRleHQgc2VsZWN0ZWQgYnkgdGhlIHVzZXJcbiAqIEByZXR1cm4ge3N0cmluZ31cbiAqL1xudmFyIGdldFNlbGVjdGVkVGV4dCA9IGZ1bmN0aW9uKCkge1xuXHR2YXIgdGV4dCA9ICcnO1xuXHRpZiAodHlwZW9mIHdpbmRvdy5nZXRTZWxlY3Rpb24gIT09ICd1bmRlZmluZWQnKSB7XG5cdFx0dGV4dCA9IHdpbmRvdy5nZXRTZWxlY3Rpb24oKS50b1N0cmluZygpO1xuXHR9IGVsc2UgaWYgKHR5cGVvZiBkb2N1bWVudC5zZWxlY3Rpb24gIT09ICd1bmRlZmluZWQnICYmIGRvY3VtZW50LnNlbGVjdGlvbi50eXBlID09PSAnVGV4dCcpIHtcblx0XHR0ZXh0ID0gZG9jdW1lbnQuc2VsZWN0aW9uLmNyZWF0ZVJhbmdlKCkudGV4dDtcblx0fVxuXHRyZXR1cm4gdGV4dDtcbn07XG5cbi8qKlxuICogQ2hlY2sgaWYgdGhlIHNlbGVjdGVkIHRleHQgaXMgaW5zaWRlIHRoZSBjb250ZW50IGNvbnRhaW5lclxuICogQHBhcmFtICB7b2JqZWN0fSAgc2VsZWN0aW9uXG4gKiBAcmV0dXJuIHtCb29sZWFufVxuICovXG52YXIgaXNJbnNpZGVDb250ZW50ID0gZnVuY3Rpb24oc2VsZWN0aW9uKSB7XG5cdHZhciAkY29udGFpbmVyID0gc2VsZWN0aW9uLmFuY2hvck5vZGUucGFyZW50RWxlbWVudDtcblxuXHR3aGlsZSAoJGNvbnRhaW5lciAhPT0gJHBvc3RDb250ZW50ICYmICRjb250YWluZXIucGFyZW50Tm9kZSkge1xuXHRcdCRjb250YWluZXIgPSAkY29udGFpbmVyLnBhcmVudE5vZGU7XG5cdH1cblxuXHRyZXR1cm4gKCRjb250YWluZXIgPT09ICRwb3N0Q29udGVudCk7XG5cbn07XG5cbi8qKlxuICogUGxhY2VzIHRoZSB0b29sIHRpcCBhYm92ZSB0aGUgc2VsZWN0ZWQgdGV4dFxuICogQHJldHVybiB7dm9pZH1cbiAqL1xudmFyIHBsYWNlVG9vbFRpcCA9IGZ1bmN0aW9uKCkge1xuXG5cdC8vIFRpbWVvdXQgdG8gbWFrZSBzdXJlIHRoZSB0ZXh0IGhhcyBiZWVuIHNlbGVjdGVkXG5cdHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XG5cblx0XHR2YXIgaGlnaGxpZ2h0ZWRUZXh0ID0gZ2V0U2VsZWN0ZWRUZXh0KCk7XG5cblx0XHQvLyBIaWRlIHRvb2wgdGlwIGlmIG5vdGhpbmcgaXMgc2VsZWN0ZWRcblx0XHRpZiAoIWhpZ2hsaWdodGVkVGV4dCkge1xuXHRcdFx0JHRvb2xUaXAuY2xhc3NMaXN0LnJlbW92ZSgndG9vbC10aXAtLXZpc2libGUnKTtcblx0XHRcdHJldHVybjtcblx0XHR9XG5cblx0XHQvLyBEaXNwbGF5IHRvb2wgdGlwIGlmIHNlbGVjdGlvbiBpcyBpbnNpZGUgdGhlIGNvbnRlbnQgY29udGFpbmVyXG5cdFx0dmFyIHNlbGVjdGlvbiA9IHdpbmRvdy5nZXRTZWxlY3Rpb24oKTtcblx0XHRpZiAoIWlzSW5zaWRlQ29udGVudChzZWxlY3Rpb24pKSB7XG5cdFx0XHQkdG9vbFRpcC5jbGFzc0xpc3QucmVtb3ZlKCd0b29sLXRpcC0tdmlzaWJsZScpO1xuXHRcdFx0cmV0dXJuO1xuXHRcdH1cblxuXHRcdC8vIENoYW5nZSBjb250ZXh0dWFsIGFjdGlvbnNcblx0XHQkdHdpdHRlci5zZXRBdHRyaWJ1dGUoJ2hyZWYnLCBgaHR0cHM6Ly90d2l0dGVyLmNvbS9pbnRlbnQvdHdlZXQ/dGV4dD0ke2VuY29kZVVSSUNvbXBvbmVudChoaWdobGlnaHRlZFRleHQpfSZ1cmw9JHtlbmNvZGVVUklDb21wb25lbnQoJHR3aXR0ZXIuZGF0YXNldC51cmwpfWApO1xuXG5cdFx0Ly8gU2hvdyBhbmQgcGxhY2UgdG9vbCB0aXBcblx0XHR2YXIgc2Nyb2xsUG9zaXRpb24gPSAod2luZG93LnNjcm9sbFkgfHwgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LnNjcm9sbFRvcCk7XG5cdFx0dmFyIHJhbmdlID0gc2VsZWN0aW9uLmdldFJhbmdlQXQoMCk7XG5cdFx0dmFyIHJlY3QgPSByYW5nZS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcblx0XHQkdG9vbFRpcC5zdHlsZS50b3AgPSAocmVjdC50b3AgKyBzY3JvbGxQb3NpdGlvbikgKyAncHgnO1xuXHRcdCR0b29sVGlwLmNsYXNzTGlzdC5hZGQoJ3Rvb2wtdGlwLS12aXNpYmxlJyk7XG5cdFx0JHRvb2xUaXAuc3R5bGUubGVmdCA9ICgwLjUgKiByZWN0LmxlZnQgKyAwLjUgKiByZWN0LnJpZ2h0IC0gMC41ICogJHRvb2xUaXAuY2xpZW50V2lkdGgpICsgJ3B4Jztcblx0fSwgMTApO1xufTtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24oKSB7XG5cdCRwb3N0Q29udGVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5jb250ZW50Jyk7XG5cdCR0b29sVGlwID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnRvb2wtdGlwJyk7XG5cblx0aWYgKCEkcG9zdENvbnRlbnQgfHwgISR0b29sVGlwKSB7XG5cdFx0cmV0dXJuO1xuXHR9XG5cblx0JHJlc3BvbnNlRm9ybSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5yZXNwb25zZXNfX2Zvcm0nKTtcblx0JGN0YSA9ICRyZXNwb25zZUZvcm0ucXVlcnlTZWxlY3RvcignLmJ0bi0tY3RhJyk7XG5cblx0JHR3aXR0ZXIgPSAkdG9vbFRpcC5xdWVyeVNlbGVjdG9yKCcudG9vbC10aXBfX3R3aXR0ZXInKTtcblxuXHRkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdtb3VzZXVwJywgcGxhY2VUb29sVGlwKTtcblx0ZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcigna2V5dXAnLCBwbGFjZVRvb2xUaXApO1xuXG5cdC8vIEZpbGwgZm9ybSB3aXRoIHNlbGVjdGVkIHRleHQgdG8gbWFrZSBhIHF1aWNrIHJlc3BvbnNlIG9uIHRoZSBhcnRpY2xlIGJ5XG5cdC8vIHRoZSB1c2VyXG5cdHZhciAkcmVzcG9uc2VUZXh0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnJlc3BvbnNlc19fZm9ybSB0ZXh0YXJlYScpO1xuXHQkdG9vbFRpcC5xdWVyeVNlbGVjdG9yKCcudG9vbC10aXBfX3Jlc3BvbnNlJykuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbihlKSB7XG5cdFx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xuXHRcdHZhciBoaWdobGlnaHRlZFRleHQgPSBnZXRTZWxlY3RlZFRleHQoKTtcblx0XHQkcmVzcG9uc2VUZXh0LnZhbHVlID0gYD4gJHtoaWdobGlnaHRlZFRleHR9XG5cbmA7XG5cdFx0JHJlc3BvbnNlVGV4dC5mb2N1cygpO1xuXHRcdCRyZXNwb25zZVRleHQucGFyZW50Tm9kZS5jbGFzc0xpc3QuYWRkKCd2YWxpZGF0ZS0tdmFsaWQnKTtcblx0XHQkcmVzcG9uc2VUZXh0LnBhcmVudE5vZGUuY2xhc3NMaXN0LnJlbW92ZSgndmFsaWRhdGUtLW5vdC12YWxpZCcpO1xuXHRcdCRyZXNwb25zZVRleHQucGFyZW50Tm9kZS5xdWVyeVNlbGVjdG9yKCcucGxhY2Vob2xkZXInKS5jbGFzc0xpc3QuYWRkKCdwbGFjZWhvbGRlci0tbm90LWVtcHR5Jyk7XG5cdFx0dmFyIHZhbGlkID0gdmFsaWRhdGVGb3JtKGdldEFsbCgnLnZhbGlkYXRlJywgJHJlc3BvbnNlRm9ybSkpO1xuXHRcdGlmICh2YWxpZCkge1xuXHRcdFx0JGN0YS5jbGFzc0xpc3QucmVtb3ZlKCdidG4tLWRpc2FibGVkJyk7XG5cdFx0fSBlbHNlIHtcblx0XHRcdCRjdGEuY2xhc3NMaXN0LmFkZCgnYnRuLS1kaXNhYmxlZCcpO1xuXHRcdH1cblx0fSk7XG59XG4iLCIvKipcbiAqIEhlbHBlcnMgZm9yIGNvbW11bmljYXRpbmcgd2l0aCB0aGUgbWV0YSBhcGkgaG9sZGluZyByZXNwb25zZXMgYW5kIGxpa2VzIGZvclxuICogdGhlIGFydGljbGVzLlxuICovXG5cbnZhciBhcGlVcmwgPSB3aW5kb3cuYXBpVVJMO1xudmFyIGlkID0gd2luZG93LnBvc3RJZDtcblxuLyoqXG4gKiBNYWtlIGEgQUpBWCBjYWxsIHRvIHRoZSBhcGlcbiAqIEBwYXJhbSAge1N0cmluZ30gcGF0aFxuICogQHBhcmFtICB7U3RyaW5nfSBtZXRob2RcbiAqIEBwYXJhbSAge29iamVjdH0gZGF0YVxuICogQHJldHVybiB7UHJvbWlzZX1cbiAqL1xudmFyIHJlcXVlc3QgPSBmdW5jdGlvbihwYXRoID0gJycsIG1ldGhvZCA9ICdHRVQnLCBkYXRhID0gbnVsbCkge1xuXG4gIHZhciBmZXRjaE9wdGlvbnMgPSB7XG4gICAgbWV0aG9kLFxuICAgIGhlYWRlcnM6IHtcbiAgICAgICdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24vanNvbjsgY2hhcnNldD11dGYtOCdcbiAgICB9XG4gIH07XG5cbiAgaWYgKGRhdGEpIHtcbiAgICBmZXRjaE9wdGlvbnMuYm9keSA9IEpTT04uc3RyaW5naWZ5KGRhdGEpO1xuICB9XG5cbiAgLy8gUGVyZm9ybSB0aGUgYWpheCBjYWxsXG4gIHJldHVybiBmZXRjaChhcGlVcmwgKyBwYXRoLCBmZXRjaE9wdGlvbnMpXG4gICAgLnRoZW4oZnVuY3Rpb24ocmVzcG9uc2UpIHtcbiAgICAgIGlmIChyZXNwb25zZS5zdGF0dXMgPj0gMzAwKSB7XG4gICAgICAgIHJldHVybiBQcm9taXNlLnJlamVjdChyZXNwb25zZSk7XG4gICAgICB9XG4gICAgICByZXR1cm4gcmVzcG9uc2U7XG4gICAgfSlcbiAgICAudGhlbihyZXNwb25zZSA9PiByZXNwb25zZS5qc29uKCkpO1xufTtcblxuLyoqXG4gKiBHZXQgbWV0YSBkYXRhIGZyb20gdGhlIGFydGljbGUuIElmIG5vIG1ldGEgZGF0YSBpcyBwcmVzZW50IGZvciB0aGUgYWN0dWFsXG4gKiBhcnRpY2xlIGFuZCBuZXcgZW50cnkgd2lsbCBiZSBtYWRlLlxuICogQHBhcmFtICB7Ym9vbGVhbn0gcmF3IFdoZXRoZXIgdG8gaW5jbHVkZSBjb21wdXRlZCBmaWVsZHNcbiAqIEByZXR1cm4ge1Byb21pc2V9XG4gKi9cbmV4cG9ydCB2YXIgZ2V0TWV0YSA9IGZ1bmN0aW9uKHJhdykge1xuICB2YXIgcXVlcnkgPSAnP2lkPScgKyBpZDtcbiAgaWYgKHJhdykge1xuICAgIHF1ZXJ5ICs9ICcmcmF3JztcbiAgfVxuICByZXR1cm4gcmVxdWVzdChxdWVyeSlcbiAgICAuY2F0Y2goZnVuY3Rpb24oKSB7XG4gICAgICByZXR1cm4gcmVxdWVzdCgnJywgJ1BPU1QnLCB7XG4gICAgICAgIHJlc3BvbnNlczogW10sXG4gICAgICAgIGxpa2VzOiAwLFxuICAgICAgICBpZFxuICAgICAgfSk7XG4gICAgfSk7XG59O1xuXG5leHBvcnQgdmFyIGdldFNlYXJjaEluZGV4ID0gZnVuY3Rpb24ocXVlcnkpIHtcbiAgcmV0dXJuIHJlcXVlc3QoJ3NlYXJjaD9xPScgKyBxdWVyeSk7XG59O1xuXG4vKipcbiAqIEluY3JlbWVudCB0aGUgbGlrZSB2YWx1ZSB3aXRoIG9uZVxuICogQHJldHVybiB7UHJvbWlzZX1cbiAqL1xuZXhwb3J0IHZhciBsaWtlID0gZnVuY3Rpb24oKSB7XG4gIHJldHVybiBnZXRNZXRhKGlkLCB0cnVlKVxuICAgIC50aGVuKGZ1bmN0aW9uKGRhdGEpIHtcbiAgICAgIHJldHVybiByZXF1ZXN0KCc/aWQ9JyArIGlkLCAnUFVUJywge1xuICAgICAgICBsaWtlczogZGF0YS5saWtlcyArIDFcbiAgICAgIH0pO1xuICAgIH0pO1xufTtcblxuLyoqXG4gKiBVcGRhdGUgYXV0aG9yIGVtYWlsIHVzZWQgdG8gc2VuZCBlLW1haWxzIHdoZW4gYSByZXNwb25zZSBpIHJlY2VpdmVkLlxuICogQHJldHVybiB7UHJvbWlzZX1cbiAqL1xuZXhwb3J0IHZhciB1cGRhdGVBdXRob3JFbWFpbCA9IGZ1bmN0aW9uKGF1dGhvckVtYWlsKSB7XG4gIGlmICghaWQpIHtcbiAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QobmV3IEVycm9yKCdObyBwb3N0SWQnKSk7XG4gIH1cbiAgcmV0dXJuIHJlcXVlc3QoJz9pZD0nICsgaWQsICdQVVQnLCB7XG4gICAgYXV0aG9yRW1haWxcbiAgfSk7XG59O1xuXG4vKipcbiAqIEFkZCBhIHJlc3BvbnNlXG4gKiBAcGFyYW0ge29iamVjdH0gcmVzcG9uc2VcbiAqIEByZXR1cm4ge1Byb21pc2V9XG4gKi9cbmV4cG9ydCB2YXIgYWRkUmVzcG9uc2UgPSBmdW5jdGlvbihyZXNwb25zZSkge1xuICByZXR1cm4gZ2V0TWV0YSh0cnVlKVxuICAgIC50aGVuKGZ1bmN0aW9uKGRhdGEpIHtcblxuICAgICAgLy8gU2V0IHRoZSBwdWJsaXNoIGRhdGEgdG8gbm93XG4gICAgICByZXNwb25zZS5wdWJsaXNoZWQgPSBuZXcgRGF0ZSgpLnRvSVNPU3RyaW5nKCk7XG5cbiAgICAgIC8vIFVwZGF0ZSB0aGUgcmVzcG9uc2VzIGxpc3RcbiAgICAgIGRhdGEucmVzcG9uc2VzLnB1c2gocmVzcG9uc2UpO1xuICAgICAgcmV0dXJuIHJlcXVlc3QoJz9pZD0nICsgaWQsICdQVVQnLCB7XG4gICAgICAgIHJlc3BvbnNlczogZGF0YS5yZXNwb25zZXNcbiAgICAgIH0pO1xuICAgIH0pO1xufTtcblxuLyoqXG4gKiBSZW1vdmUgYSByZXNwb25zZVxuICogQHBhcmFtICB7c3RyaW5nfSBwdWJsaXNoZWRcbiAqIEBwYXJhbSAge3N0cmluZ30gbmFtZVxuICogQHJldHVybiB7UHJvbWlzZX1cbiAqL1xuZXhwb3J0IHZhciByZW1vdmVSZXNwb25zZSA9IGZ1bmN0aW9uKHB1Ymxpc2hlZCwgbmFtZSkge1xuICByZXR1cm4gZ2V0TWV0YSh0cnVlKVxuICAgIC50aGVuKGZ1bmN0aW9uKGRhdGEpIHtcblxuICAgICAgLy8gUmVtb3ZlIHJlc3Bvc2Ugd2hpY2ggbWF0Y2hlcyBvbiBwdWJsaXNoIGRhdGUgYW5kIGF1dGhvciBuYW1lXG4gICAgICB2YXIgcmVzcG9uc2VzID0gZGF0YS5yZXNwb25zZXMuZmlsdGVyKGZ1bmN0aW9uKHJlc3BvbnNlKSB7XG4gICAgICAgIHJldHVybiAocmVzcG9uc2UucHVibGlzaGVkICE9PSBwdWJsaXNoZWQgfHwgcmVzcG9uc2UubmFtZSAhPT0gbmFtZSk7XG4gICAgICB9KTtcblxuICAgICAgcmV0dXJuIHJlcXVlc3QoJz9pZD0nICsgaWQsICdQVVQnLCB7XG4gICAgICAgIHJlc3BvbnNlc1xuICAgICAgfSk7XG4gICAgfSk7XG59O1xuIiwiLyoqXG4gKiBWYWxpZGF0ZSBpbnB1dCBmaWVsZHMgYXMgdXNlciB0eXBlc1xuICovXG5cbi8vIERlcGVuZGVuY2llc1xuaW1wb3J0IHZhbGlkYXRlRm9ybSBmcm9tICcuL3ZhbGlkYXRlJztcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24oJHZhbGlkYXRvcnMsIGNhbGxiYWNrKSB7XG5cdCR2YWxpZGF0b3JzLmZvckVhY2goZnVuY3Rpb24oJHZhbGlkYXRlQ29udGFpbmVyKSB7XG5cdFx0dmFyICR2YWxpZGF0ZUZpZWxkID0gJHZhbGlkYXRlQ29udGFpbmVyLnF1ZXJ5U2VsZWN0b3IoJ2lucHV0LCB0ZXh0YXJlYScpO1xuXG5cdFx0JHZhbGlkYXRlRmllbGQuYWRkRXZlbnRMaXN0ZW5lcignaW5wdXQnLCBmdW5jdGlvbigpIHtcblx0XHRcdHZhciB2YWxpZCA9IHZhbGlkYXRlRm9ybSgkdmFsaWRhdG9ycyk7XG5cdFx0XHRjYWxsYmFjayh2YWxpZCk7XG5cdFx0fSk7XG5cdH0pO1xufVxuIiwiLyoqXG4gKiBDaGVjayBpZiB0aGUgZm9ybSBpcyB2YWxpZFxuICovXG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uKCR2YWxpZGF0b3JzKSB7XG5cdHZhciBub3RWYWxpZCA9ICR2YWxpZGF0b3JzLnNvbWUoZnVuY3Rpb24oJHZhbGlkYXRvcikge1xuXHRcdGlmICgkdmFsaWRhdG9yLmRhdGFzZXQudmFsaWRhdGVSZXF1aXJlZCAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0XHRyZXR1cm4gISR2YWxpZGF0b3IuY2xhc3NMaXN0LmNvbnRhaW5zKCd2YWxpZGF0ZS0tdmFsaWQnKTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0cmV0dXJuICR2YWxpZGF0b3IuY2xhc3NMaXN0LmNvbnRhaW5zKCd2YWxpZGF0ZS0tbm90LXZhbGlkJyk7XG5cdFx0fVxuXHR9KTtcblxuXHRyZXR1cm4gIW5vdFZhbGlkO1xufVxuIiwiLyoqXG4gKiBDaGVjayBpZiB1c2VyIGlzIGxvZ2dlZCBpbiB1c2luZyB0aGUgZ2hvc3Qgc2Vzc2lvbi4gSWYgbG9nZ2VkIGluIGdldCB1c2VyXG4gKiBkYXRhLlxuICovXG5cbi8vIENhY2hlZCBwcm9taXNlXG52YXIgZGF0YVByb21pc2U7XG5cbi8qKlxuICogR2V0IHRoZSBkYXRhIGZvciB0aGUgbG9nZ2VkIGluIHVzZWRcbiAqIEBwYXJhbSAge3N0cmluZ30gdG9rZW5cbiAqIEByZXR1cm4ge1Byb21pc2V9XG4gKi9cbnZhciBnZXRVc2VyRGF0YSA9IGZ1bmN0aW9uKHRva2VuKSB7XG5cdHJldHVybiBmZXRjaCgnL2dob3N0L2FwaS92MC4xL3VzZXJzL21lLz9pbmNsdWRlPXJvbGVzJnN0YXR1cz1hbGwnLCB7XG5cdFx0bWV0aG9kOiAnR0VUJyxcblx0XHRoZWFkZXJzOiB7XG5cdFx0XHQnQXV0aG9yaXphdGlvbic6ICdCZWFyZXIgJyArIHRva2VuXG5cdFx0fVxuXHR9KS50aGVuKGZ1bmN0aW9uKHJlc3BvbnNlKSB7XG5cdFx0aWYgKHJlc3BvbnNlLnN0YXR1cyAhPT0gMjAwKSB7XG5cdFx0XHRyZXR1cm4gUHJvbWlzZS5yZWplY3QoJ09sZCBzZXNzaW9uJyk7XG5cdFx0fVxuXHRcdHJldHVybiByZXNwb25zZS5qc29uKCk7XG5cdH0pLnRoZW4oZnVuY3Rpb24oZGF0YSkge1xuXHRcdHJldHVybiBkYXRhLnVzZXJzWzBdO1xuXHR9KTtcbn07XG5cbi8qKlxuICogQ2hlY2sgaWYgdGhlcmUgaXMgYSBHaG9zdCBzZXNzaW9uLiBJZiBzbyB1c2UgaXQgdG8gZ2V0IHRoZSB1c2VycyBkYXRhLlxuICogQHJldHVybiB7UHJvbWlzZX1cbiAqL1xudmFyIGdldCA9IGZ1bmN0aW9uKCkge1xuXG5cdC8vIEdob3N0IHN0b3JlcyBpdCBzZXNzaW9uIGluIGxvY2FsU3RvcmFnZVxuXHR2YXIgc2Vzc2lvblN0cmluZyA9IGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdnaG9zdDpzZXNzaW9uJyk7XG5cdGlmICghc2Vzc2lvblN0cmluZykge1xuXHRcdHJldHVybiBQcm9taXNlLnJlamVjdCgnTm8gc2Vzc2lvbicpO1xuXHR9XG5cblx0Ly8gVmFsaWQgc2Vzc2lvbj9cblx0dmFyIHNlc3Npb24gPSBKU09OLnBhcnNlKHNlc3Npb25TdHJpbmcpO1xuXHRpZiAoIXNlc3Npb24gfHwgIXNlc3Npb24uYXV0aGVudGljYXRlZCB8fCAhc2Vzc2lvbi5hdXRoZW50aWNhdGVkLmFjY2Vzc190b2tlbikge1xuXHRcdHJldHVybiBQcm9taXNlLnJlamVjdCgnTm8gc2Vzc2lvbicpO1xuXHR9XG5cblx0Ly8gU2Vzc2lvbiBleHBpcmVkP1xuXHRpZiAoc2Vzc2lvbi5hdXRoZW50aWNhdGVkLmV4cGlyZXNfYXQgPCBEYXRlLm5vdygpKSB7XG5cdFx0cmV0dXJuIFByb21pc2UucmVqZWN0KCdTZXNzaW9uIGV4cGlyZWQnKTtcblx0fVxuXG5cdHJldHVybiBnZXRVc2VyRGF0YShzZXNzaW9uLmF1dGhlbnRpY2F0ZWQuYWNjZXNzX3Rva2VuKTtcblxufTtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24oKSB7XG5cblx0Ly8gUmV0dXJuIGNhY2hlZCBwcm9taXNlIGlmIGFscmVhZHkgY2FsbGVkXG5cdGlmICghZGF0YVByb21pc2UpIHtcblx0XHRkYXRhUHJvbWlzZSA9IGdldCgpO1xuXHR9XG5cdHJldHVybiBkYXRhUHJvbWlzZTtcbn1cbiIsIi8qKlxuICogRW5jb2RlIGEgc3RyaW5nXG4gKiBAcGFyYW0gIHtzdHJpbmd9IHN0cmluZ1xuICogQHJldHVybiB7c3RyaW5nfVxuICovXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbihzdHJpbmcpIHtcblx0dmFyIGh0bWxFbmNvZGVkVmFsdWUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKS5hcHBlbmRDaGlsZChcblx0XHRkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShzdHJpbmcpKS5wYXJlbnROb2RlLmlubmVySFRNTDtcblx0cmV0dXJuIGh0bWxFbmNvZGVkVmFsdWUucmVwbGFjZSgvXFxyP1xcbi9nLCAnPGJyPicpO1xufVxuIiwiaW1wb3J0IGdldEFsbCBmcm9tICdkcy1hc3NldHMvZG9tL2dldC1hbGwnO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKHJhdykge1xuXHR2YXIgJGNvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuXHQkY29udGFpbmVyLmlubmVySFRNTCA9IHJhdztcblx0Z2V0QWxsKCdpbWcnLCAkY29udGFpbmVyKS5mb3JFYWNoKGZ1bmN0aW9uKCRpbWcpIHtcblx0XHR2YXIgJGltZ1dyYXBwZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcblx0XHQkaW1nV3JhcHBlci5jbGFzc0xpc3QuYWRkKCdpbWctd3JhcHBlcicpO1xuXHRcdCRpbWdXcmFwcGVyLmlubmVySFRNTCA9ICc8ZGl2IGNsYXNzPVwiaW1nLWNvbnRhaW5lclwiPjxpbWc+PC9kaXY+Jztcblx0XHR2YXIgc3JjID0gJGltZy5nZXRBdHRyaWJ1dGUoJ3NyYycpO1xuXHRcdHZhciBhbHQgPSAkaW1nLmdldEF0dHJpYnV0ZSgnYWx0Jyk7XG5cdFx0dmFyIHBhZGRpbmcgPSA1MDtcblxuXHRcdC8vIExhenkgbG9hZCBhbGwgYnV0IHRoZSBmaXJzdCBpbWFnZVxuXHRcdHZhciAkbmV3SW1nID0gJGltZ1dyYXBwZXIucXVlcnlTZWxlY3RvcignaW1nJyk7XG5cblx0XHQkbmV3SW1nLnNldEF0dHJpYnV0ZSgnZGF0YS1zcmMnLCBzcmMpO1xuXHRcdCRuZXdJbWcuc2V0QXR0cmlidXRlKCdjbGFzcycsICdsYXp5LWltYWdlJyk7XG5cblx0XHRhbHQuc3BsaXQoJzsnKS5mb3JFYWNoKGZ1bmN0aW9uKHN0cikge1xuXHRcdFx0aWYgKHN0ciA9PT0gJ2Z1bGwtc2l6ZScgfHwgc3RyID09PSAnZnVsbC13aWR0aCcpIHtcblx0XHRcdFx0JGltZ1dyYXBwZXIuY2xhc3NMaXN0LmFkZCgnZnVsbC13aWR0aCcpO1xuXHRcdFx0fSBlbHNlIGlmIChzdHIuaW5kZXhPZigncmF0aW89JykgPT09IDApIHtcblx0XHRcdFx0dmFyIHJhdGlvID0gc3RyLnJlcGxhY2UoJ3JhdGlvPScsICcnKTtcblx0XHRcdFx0aWYgKHJhdGlvLmluZGV4T2YoJzonKSkge1xuXHRcdFx0XHRcdHZhciBkaW1lbnNpb25zID0gcmF0aW8uc3BsaXQoJzonKTtcblx0XHRcdFx0XHRyYXRpbyA9IGRpbWVuc2lvbnNbMF0gLyBkaW1lbnNpb25zWzFdO1xuXHRcdFx0XHR9XG5cdFx0XHRcdHBhZGRpbmcgPSAxMDAgLyByYXRpbztcblx0XHRcdH0gZWxzZSBpZiAoc3RyID09PSAnYm9yZGVycycpIHtcblx0XHRcdFx0JGltZ1dyYXBwZXIucXVlcnlTZWxlY3RvcignLmltZy1jb250YWluZXInKS5jbGFzc0xpc3QuYWRkKCdpbWctY29udGFpbmVyLS1ib3JkZXJzJyk7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRhbHQgPSBzdHI7XG5cdFx0XHR9XG5cdFx0fSk7XG5cblx0XHQkbmV3SW1nLnNldEF0dHJpYnV0ZSgnYWx0JywgYWx0KTtcblx0XHQkbmV3SW1nLnNldEF0dHJpYnV0ZSgndGl0bGUnLCAkaW1nLmdldEF0dHJpYnV0ZSgndGl0bGUnKSk7XG5cblx0XHQkaW1nV3JhcHBlci5xdWVyeVNlbGVjdG9yKCcuaW1nLWNvbnRhaW5lcicpXG5cdFx0XHQuc2V0QXR0cmlidXRlKCdzdHlsZScsICdwYWRkaW5nLWJvdHRvbTonICsgcGFkZGluZyArICclJyk7XG5cblx0XHQkaW1nLnBhcmVudE5vZGUub3V0ZXJIVE1MID0gJGltZ1dyYXBwZXIub3V0ZXJIVE1MO1xuXHR9KTtcblx0cmV0dXJuICRjb250YWluZXIuaW5uZXJIVE1MO1xufTtcbiIsImltcG9ydCBzdHJpcFRhZ3MgZnJvbSAnLi9zdHJpcC1odG1sLXRhZ3MnO1xuaW1wb3J0IHdvcmRDb3VudCBmcm9tICd3b3JkLWNvdW50JztcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24oaHRtbCkge1xuXHR2YXIgdGV4dCA9IHN0cmlwVGFncyhodG1sKTtcblx0dmFyIHdvcmRzID0gd29yZENvdW50KHRleHQpO1xuXHR2YXIgcmVhZFRpbWUgPSBNYXRoLmNlaWwod29yZHMgLyAzMDApO1xuXG5cdHZhciBhZmZpeCA9ICcgbWluJztcblx0aWYgKHJlYWRUaW1lID4gMSkge1xuXHRcdGFmZml4ICs9ICdzJztcblx0fVxuXG5cdHJldHVybiByZWFkVGltZSArIGFmZml4O1xufVxuIiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24oaHRtbCkge1xuXHR2YXIgdG1wID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG5cdHRtcC5pbm5lckhUTUwgPSBodG1sO1xuXHRyZXR1cm4gdG1wLnRleHRDb250ZW50IHx8IHRtcC5pbm5lclRleHQgfHwgJyc7XG59XG4iLCIvKipcbiAqIE1haW4gZW50cnkgZm9yIHRoZSBqYXZhc2NyaXB0LlxuICogSW1wb3J0IG1vZHVsZXMgYW5kIHN0YXJ0IHRoZW1cbiAqL1xuXG5pbXBvcnQgbGF6eUltYWdlcyBmcm9tICdkcy1hc3NldHMvbGF6eS9pbWFnZXMnO1xuaW1wb3J0IGdldEFsbCBmcm9tICdkcy1hc3NldHMvZG9tL2dldC1hbGwnO1xuaW1wb3J0IHZhbGlkYXRlSW5wdXRGaWVsZHMgZnJvbSAnZHMtYXNzZXRzL3ZhbGlkYXRlL2lucHV0LWZpZWxkcyc7XG5pbXBvcnQgbmF2aWdhdGlvbiBmcm9tICcuL2NvbXBvbmVudHMvbmF2aWdhdGlvbic7XG5pbXBvcnQgcmVzcG9uc2UgZnJvbSAnLi9jb21wb25lbnRzL3Jlc3BvbnNlJztcbmltcG9ydCB0b29sVGlwIGZyb20gJy4vY29tcG9uZW50cy90b29sLXRpcCc7XG5pbXBvcnQgc2VhcmNoIGZyb20gJy4vY29tcG9uZW50cy9zZWFyY2gnO1xuaW1wb3J0IGdldExvZ2dlZEluRGF0YSBmcm9tICcuL2xpYi9nZXQtbG9nZ2VkLWluLWRhdGEnO1xuaW1wb3J0ICogYXMgYXBpIGZyb20gJy4vbGliL2FwaSc7XG5cbm5hdmlnYXRpb24oKTtcbnRvb2xUaXAoKTtcbnNlYXJjaCgpO1xuXG5nZXRBbGwoJ2ltZycpLmZvckVhY2goZnVuY3Rpb24oJGltZykge1xuXHQkaW1nLm9ubG9hZCA9IGZ1bmN0aW9uKCkge1xuXHRcdHRoaXMuY2xhc3NMaXN0LmFkZCgnYW5pbWF0ZS0tYWN0aXZlJyk7XG5cdH07XG59KTtcbmxhenlJbWFnZXMoMSk7XG52YWxpZGF0ZUlucHV0RmllbGRzKCk7XG5yZXNwb25zZSgpO1xuZ2V0TG9nZ2VkSW5EYXRhKCkudGhlbihmdW5jdGlvbih1c2VyKSB7XG5cdHZhciAkYm9keSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2JvZHknKTtcblxuXHQkYm9keS5jbGFzc0xpc3QuYWRkKCd1c2VyLWxvZ2dlZC1pbicpO1xuXG5cdC8vIEFkbWluIGxvZ2dlZCBpblxuXHR2YXIgYWRtaW4gPSB1c2VyLnJvbGVzLnNvbWUoZnVuY3Rpb24ocm9sZSkge1xuXHRcdHJldHVybiAocm9sZS5uYW1lID09PSAnT3duZXInIHx8IHJvbGUubmFtZSA9PT0gJ0FkbWluaXN0cmF0b3InKTtcblx0fSk7XG5cdGlmIChhZG1pbikge1xuXHRcdCRib2R5LmNsYXNzTGlzdC5hZGQoJ2FkbWluLWxvZ2dlZC1pbicpO1xuXHR9XG5cblx0Ly8gQXV0aG9yIGxvZ2dlZCBpblxuXHRpZiAodXNlci5uYW1lID09PSB3aW5kb3cuYXV0aG9yTmFtZSkge1xuXHRcdCRib2R5LmNsYXNzTGlzdC5hZGQoJ2F1dGhvci1sb2dnZWQtaW4nKTtcblx0XHRyZXR1cm4gYXBpLnVwZGF0ZUF1dGhvckVtYWlsKHVzZXIuZW1haWwpO1xuXHR9XG59KS5jYXRjaChmdW5jdGlvbigpIHt9KTtcbiIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uKGF1dGhvcikge1xuXG5cdHZhciBhdXRob3JJbWFnZSA9ICcnO1xuXHRpZiAoYXV0aG9yLmltYWdlKSB7XG5cdFx0YXV0aG9ySW1hZ2UgPSBgPHRkIHdpZHRoPVwiNSVcIj48aW1nIHNyYz1cIiR7YXV0aG9yLmltYWdlfVwiIGNsYXNzPVwiYXV0aG9yX19pbWFnZSByb3VuZC1pbWdcIj48L3RkPmA7XG5cdH1cblxuXHR2YXIgY292ZXJJbWFnZSA9ICcnO1xuXHRpZiAoYXV0aG9yLmNvdmVyKSB7XG5cdFx0Y292ZXJJbWFnZSA9IGBcbjxpbWcgZGF0YS1zcmM9XCIke2F1dGhvci5jb3Zlcn1cIiBjbGFzcz1cImxhenktaW1hZ2UgZnVsbC13aWR0aCBpbWctZnVsbC13aWR0aFwiIGFsdD1cIiR7YXV0aG9yLm5hbWV9XCIgPlxuYDtcblx0fVxuXG5cdHJldHVybiBgXG48YXJ0aWNsZSBjbGFzcz1cImJveGVzX19pdGVtIHNtYWxsIGFuaW1hdGUgYW5pbWF0ZV9fZmFkZS1pblwiPlxuICA8aGVhZGVyIGNsYXNzPVwiYXV0aG9yXCI+XG4gICAgICA8dGFibGU+XG4gICAgICAgICAgPHRyPlxuICAgICAgICAgICAgICAke2F1dGhvckltYWdlfVxuICAgICAgICAgICAgICA8dGQ+PHNwYW4gY2xhc3M9XCJhdXRob3JfX25hbWVcIj48YSBocmVmPVwiL2F1dGhvci8ke2F1dGhvci5zbHVnfVwiPiR7YXV0aG9yLm5hbWV9PC9hPjwvc3Bhbj48YnI+XG4gICAgICAgICAgICAgIFx0JHthdXRob3IuY291bnQucG9zdHN9IGFydGljbGVzXG4gICAgICAgICAgICAgIDwvdGQ+XG4gICAgICAgICAgPC90cj5cbiAgICAgIDwvdGFibGU+XG4gIDwvaGVhZGVyPlxuICAke2NvdmVySW1hZ2V9XG4gIDxwPiR7YXV0aG9yLmJpbyB8fCAnJ308L3A+XG4gIDxwPjxhIGhyZWY9XCIvYXV0aG9yLyR7YXV0aG9yLnNsdWd9L1wiIGNsYXNzPVwiYnRuXCI+QXJ0aWNsZXMgYnkgYXV0aG9yPC9hPjwvcD5cbjwvYXJ0aWNsZT5cbmA7XG59XG4iLCJpbXBvcnQgaW1hZ2VDb252ZXJ0ZWQgZnJvbSAnLi4vbGliL2ltYWdlLWNvbnZlcnRlcic7XG5pbXBvcnQgcmVhZFRpbWUgZnJvbSAnLi4vbGliL3JlYWQtdGltZSc7XG5pbXBvcnQgZXBvY2hUb1RpbWVhZ28gZnJvbSAnZXBvY2gtdG8tdGltZWFnbyc7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uKHBvc3QpIHtcblxuXHR2YXIgYXV0aG9ySW1hZ2UgPSAnJztcblx0aWYgKHBvc3QuYXV0aG9yLmltYWdlKSB7XG5cdFx0YXV0aG9ySW1hZ2UgPSBgPHRkIHdpZHRoPVwiNSVcIj48aW1nIHNyYz1cIiR7cG9zdC5hdXRob3IuaW1hZ2V9XCIgY2xhc3M9XCJhdXRob3JfX2ltYWdlIHJvdW5kLWltZ1wiPjwvdGQ+YDtcblx0fVxuXG5cdHZhciB0YWdzID0gJyc7XG5cdGlmIChwb3N0LnRhZ3MpIHtcblx0XHR0YWdzID0gJzxicj48c3BhbiBjbGFzcz1cInRhZ3NcIj4nICsgcG9zdC50YWdzLm1hcChmdW5jdGlvbih0YWcpIHtcblx0XHRcdHJldHVybiBgPGEgaHJlZj1cIi90YWcvJHt0YWcuc2x1Z30vXCI+JHt0YWcubmFtZX08L2E+YDtcblx0XHR9KS5qb2luKCcnKSArICc8L3NwYW4+Jztcblx0fVxuXG5cdHZhciBwdWJsaXNoZWQgPSBuZXcgRGF0ZShwb3N0LnB1Ymxpc2hlZF9hdCkuZ2V0VGltZSgpO1xuXHR2YXIgbm93ID0gRGF0ZS5ub3coKTtcblx0dmFyIHRpbWVBZ28gPSBlcG9jaFRvVGltZWFnby50aW1lQWdvKHB1Ymxpc2hlZCwgbm93KTtcblxuXHR2YXIgaHRtbCA9IGltYWdlQ29udmVydGVkKHBvc3QuaHRtbCk7XG5cdHZhciBleGNlcnB0ID0gaHRtbC5zdWJzdHIoMCwgaHRtbC5pbmRleE9mKCc8L3A+JykgKyA0KTtcblxuXHRyZXR1cm4gYFxuPGFydGljbGUgY2xhc3M9XCJib3hlc19faXRlbSBzbWFsbCBhbmltYXRlIGFuaW1hdGVfX2ZhZGUtaW5cIj5cbiAgPGhlYWRlciBjbGFzcz1cImF1dGhvclwiPlxuICAgICAgPHRhYmxlPlxuICAgICAgICAgIDx0cj5cbiAgICAgICAgICAgICAgJHthdXRob3JJbWFnZX1cbiAgICAgICAgICAgICAgPHRkPjxzcGFuIGNsYXNzPVwiYXV0aG9yX19uYW1lXCI+PGEgaHJlZj1cIi9hdXRob3IvJHtwb3N0LmF1dGhvci5zbHVnfVwiPiR7cG9zdC5hdXRob3IubmFtZX08L2E+PC9zcGFuPjxicj5cbiAgICAgICAgICAgICAgJHt0aW1lQWdvfSAmbWlkZG90OyAke3JlYWRUaW1lKHBvc3QuaHRtbCl9IHJlYWQke3RhZ3N9PC90ZD5cbiAgICAgICAgICA8L3RyPlxuICAgICAgPC90YWJsZT5cbiAgPC9oZWFkZXI+XG4gICR7ZXhjZXJwdH1cbiAgPHA+PGEgaHJlZj1cIi8ke3Bvc3Quc2x1Z30vXCIgY2xhc3M9XCJidG5cIj5SZWFkIGFydGljbGU8L2E+PC9wPlxuPC9hcnRpY2xlPlxuYDtcbn1cbiIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uKHVzZXIpIHtcblx0dmFyIGltYWdlID0gJyc7XG5cdGlmICh1c2VyLmltYWdlKSB7XG5cdFx0aW1hZ2UgPSBgXG48dGQgd2lkdGg9XCI1JVwiPjxpbWcgZGF0YS1zcmM9XCIke3VzZXIuaW1hZ2V9XCIgY2xhc3M9XCJhdXRob3JfX2ltYWdlIGF1dGhvcl9faW1hZ2UtLXNtYWxsIGxhenktaW1hZ2UgaW1nLWJnIHJvdW5kLWltZ1wiPjwvdGQ+XG5cdFx0YDtcblx0fVxuXG5cdHJldHVybiBgXG48ZGl2IGNsYXNzPVwiYXV0aG9yIHNtYWxsXCI+XG4gIDx0YWJsZT48dGJvZHk+PHRyPlxuXHRcdCR7aW1hZ2V9XG4gICAgPHRkPlxuICAgICAgPHNwYW4gY2xhc3M9XCJhdXRob3JfX25hbWVcIj4ke3VzZXIubmFtZX08L3NwYW4+XG4gICAgPC90ZD5cbiAgPC90cj48L3Rib2R5PjwvdGFibGU+XG48L2Rpdj5cbmA7XG59XG4iLCJpbXBvcnQgZW5jb2RlIGZyb20gJy4uL2xpYi9odG1sLWVuY29kZSc7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uKHJlc3BvbnNlKSB7XG5cbiAgdmFyIGNsYXNzZXMgPSAncmVzcG9uc2UgYm94ZXNfX2l0ZW0nO1xuICBpZiAocmVzcG9uc2UubmFtZS50b0xvd2VyQ2FzZSgpID09PSB3aW5kb3cuYXV0aG9yTmFtZS50b0xvd2VyQ2FzZSgpKSB7XG4gICAgY2xhc3NlcyArPSAnIGJveGVzX19pdGVtLS10cmFuc3BhcmVudCc7XG4gIH1cblxuICB2YXIgaW1hZ2UgPSAnJztcbiAgaWYgKHJlc3BvbnNlLmltYWdlKSB7XG4gICAgaW1hZ2UgPSBgPHRkIHdpZHRoPVwiNSVcIj48aW1nIGRhdGEtc3JjPVwiJHtyZXNwb25zZS5pbWFnZX1cIiBjbGFzcz1cImF1dGhvcl9faW1hZ2UgYXV0aG9yX19pbWFnZS0tc21hbGwgbGF6eS1pbWFnZSBpbWctYmcgcm91bmQtaW1nXCI+PC90ZD5gO1xuICB9XG5cbiAgdmFyIHJlYWRUaW1lID0gJyc7XG4gIGlmIChyZXNwb25zZS5yZWFkVGltZSkge1xuICAgIHJlYWRUaW1lID0gYCAmbWlkZG90OyAke3Jlc3BvbnNlLnJlYWRUaW1lfSByZWFkYDtcbiAgfVxuXG4gIHZhciBleGNlcnB0ID0gcmVzcG9uc2UuZXhjZXJwdCB8fCByZXNwb25zZS5odG1sO1xuXG4gIHZhciByZWFkTW9yZSA9ICcnO1xuICBpZiAocmVzcG9uc2UuZXhjZXJwdCkge1xuICAgIHJlYWRNb3JlID0gYFxuPGRpdiBjbGFzcz1cInJlc3BvbnNlX190ZXh0IGhpZGRlblwiPiR7cmVzcG9uc2UuaHRtbH08L2Rpdj5cbjxwPjxhIGhyZWY9XCIjXCIgY2xhc3M9XCJidG4gcmVzcG9uc2VfX3JlYWQtbW9yZVwiPlJlYWQgbW9yZTwvYT48L3A+XG5gO1xuICB9XG5cbiAgdmFyIG5hbWUgPSBgJHtlbmNvZGUocmVzcG9uc2UubmFtZSl9YDtcbiAgaWYgKHJlc3BvbnNlLndlYnNpdGUpIHtcbiAgICBuYW1lID0gYDxhIGhyZWY9XCIke2VuY29kZShyZXNwb25zZS53ZWJzaXRlKX1cIj4ke25hbWV9PC9hPmA7XG4gIH1cblxuICByZXR1cm4gYFxuPGRpdiBjbGFzcz1cIiR7Y2xhc3Nlc30gc21hbGxcIj5cbiAgPGRpdiBjbGFzcz1cImF1dGhvclwiPlxuICAgIDx0YWJsZT5cbiAgICAgIDx0cj5cbiAgICAgICAgJHtpbWFnZX1cbiAgICAgICAgPHRkPlxuICAgICAgICAgIDxzcGFuIGNsYXNzPVwiYXV0aG9yX19uYW1lXCI+JHtuYW1lfTwvc3Bhbj48YnI+XG4gICAgICAgICAgJHtyZXNwb25zZS50aW1lQWdvfSR7cmVhZFRpbWV9XG4gICAgICAgIDwvdGQ+XG4gICAgICA8L3RyPlxuICAgIDwvdGFibGU+XG4gIDwvZGl2PlxuICA8YSBocmVmPVwiI1wiIGNsYXNzPVwicmVzcG9uc2VfX2RlbGV0ZVwiIGRhdGEtcHVibGlzaGVkPVwiJHtyZXNwb25zZS5wdWJsaXNoZWR9XCIgZGF0YS1uYW1lPVwiJHtyZXNwb25zZS5uYW1lfVwiPjxpbWcgZGF0YS1zcmM9XCIvYXNzZXRzL2ltYWdlcy90cmFzaC5zdmdcIiBjbGFzcz1cImxhenktaW1hZ2VcIj48L2E+XG4gIDxkaXYgY2xhc3M9XCJyZXNwb25zZV9fZXhjZXJwdFwiPiR7ZXhjZXJwdH08L2Rpdj5cbiAgJHtyZWFkTW9yZX1cbjwvZGl2PmA7XG59XG4iLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbih0YWcpIHtcblxuICBjb25zb2xlLmxvZyh0YWcpO1xuXG4gIHZhciBjb3ZlckltYWdlID0gJyc7XG4gIGlmICh0YWcuaW1hZ2UpIHtcbiAgICBjb3ZlckltYWdlID0gYFxuPGltZyBkYXRhLXNyYz1cIiR7dGFnLmltYWdlfVwiIGNsYXNzPVwibGF6eS1pbWFnZSBmdWxsLXdpZHRoIGltZy1mdWxsLXdpZHRoXCIgYWx0PVwiJHt0YWcubmFtZX1cIiA+XG5gO1xuICB9XG5cbiAgcmV0dXJuIGBcbjxhcnRpY2xlIGNsYXNzPVwiYm94ZXNfX2l0ZW0gc21hbGwgYW5pbWF0ZSBhbmltYXRlX19mYWRlLWluXCI+XG4gIDxoZWFkZXIgY2xhc3M9XCJhdXRob3JcIj5cbiAgICAgIDx0YWJsZT5cbiAgICAgICAgICA8dHI+XG4gICAgICAgICAgICAgIDx0ZD48c3BhbiBjbGFzcz1cImF1dGhvcl9fbmFtZVwiPjxhIGhyZWY9XCIvdGFnLyR7dGFnLnNsdWd9XCI+JHt0YWcubmFtZX08L2E+PC9zcGFuPjxicj5cbiAgICAgICAgICAgICAgXHQke3RhZy5jb3VudC5wb3N0c30gYXJ0aWNsZXNcbiAgICAgICAgICAgICAgPC90ZD5cbiAgICAgICAgICA8L3RyPlxuICAgICAgPC90YWJsZT5cbiAgPC9oZWFkZXI+XG4gICR7Y292ZXJJbWFnZX1cbiAgPHA+JHt0YWcuZGVzY3JpcHRpb24gfHwgJyd9PC9wPlxuICA8cD48YSBocmVmPVwiL3RhZy8ke3RhZy5zbHVnfS9cIiBjbGFzcz1cImJ0blwiPkFydGljbGVzIGluIGNhdGVnb3J5PC9hPjwvcD5cbjwvYXJ0aWNsZT5cbmA7XG59XG4iLCIvKipcbiAqIFdvcmQgQ291bnRcbiAqXG4gKiBXb3JkIGNvdW50IGluIHJlc3BlY3Qgb2YgQ0pLIGNoYXJhY3RlcnMuXG4gKlxuICogQ29weXJpZ2h0IChjKSAyMDE1IGJ5IEhzaWFvbWluZyBZYW5nLlxuICovXG5cbnZhciBwYXR0ZXJuID0gL1thLXpBLVowLTlfXFx1MDM5Mi1cXHUwM2M5XFx1MDBjMC1cXHUwMGZmXFx1MDYwMC1cXHUwNmZmXSt8W1xcdTRlMDAtXFx1OWZmZlxcdTM0MDAtXFx1NGRiZlxcdWY5MDAtXFx1ZmFmZlxcdTMwNDAtXFx1MzA5ZlxcdWFjMDAtXFx1ZDdhZl0rL2c7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGRhdGEpIHtcbiAgdmFyIG0gPSBkYXRhLm1hdGNoKHBhdHRlcm4pO1xuICB2YXIgY291bnQgPSAwO1xuICBmb3IgKHZhciBpID0gMDsgaSA8IG0ubGVuZ3RoOyBpKyspIHtcbiAgICBpZiAobVtpXS5jaGFyQ29kZUF0KDApID49IDB4NGUwMCkge1xuICAgICAgY291bnQgKz0gbVtpXS5sZW5ndGg7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvdW50ICs9IDE7XG4gICAgfVxuICB9XG4gIHJldHVybiBjb3VudDtcbn07XG4iLCIvKipcbiAqIE1ha2Ugc3VyZSBhIGZ1bmN0aW9uIG9ubHkgaXMgcnVuIGV2ZXJ5IHggbXNcbiAqIEBwYXJhbSAge0Z1bmN0aW9ufSBjYWxsYmFjayBNZXRob2QgdG8gZXhlY3V0ZSBpZiBpdCBpcyBub3QgZGVib3VuY2VkXG4gKiBAcGFyYW0gIHtpbnRlZ2VyfSAgdGltZW91dCAgTWlsbGlzZWNvbmRzIHRvIHdhaXQgYmVmb3JlIG5leHQgYWxsb3dlZCBjYWxsYmFjay4gRGVmYXVsdHMgdG8gdGhlIGFuaW1hdGlvbiBmcmFtZSByYXRlIGluIHRoZSBicm93c2VyXG4gKiBAcmV0dXJuIHt2b2lkfVxuICovXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbihjYWxsYmFjaywgdGltZW91dCkge1xuICB2YXIgcGVuZGluZyA9IGZhbHNlO1xuICB2YXIgZG9uZSA9ICgpID0+IHtcbiAgICBwZW5kaW5nID0gZmFsc2U7XG4gIH07XG4gIHJldHVybiBmdW5jdGlvbigpIHtcbiAgICBpZiAocGVuZGluZykge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBwZW5kaW5nID0gdHJ1ZTtcbiAgICBjYWxsYmFjay5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgIGlmICghdGltZW91dCkge1xuICAgICAgd2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZShkb25lKTtcbiAgICB9IGVsc2Uge1xuICAgICAgd2luZG93LnNldFRpbWVvdXQoZG9uZSwgdGltZW91dCk7XG4gICAgfVxuICB9O1xufVxuIiwiLyoqXG4gKiBEZWxheSBhIGZ1bmN0aW9uIGFuZCBvbmx5IHJ1biBvbmNlXG4gKiBAcGFyYW0gIHtGdW5jdGlvbn0gY2FsbGJhY2sgTWV0aG9kIHRvIGV4ZWN1dGUgaWYgaXQgaXMgbm90IGRlYm91bmNlZFxuICogQHBhcmFtICB7aW50ZWdlcn0gIHRpbWVvdXQgIE1pbGxpc2Vjb25kcyB0byB3YWl0IGJlZm9yZSBuZXh0IGFsbG93ZWQgY2FsbGJhY2suIERlZmF1bHRzIHRvIHRoZSBhbmltYXRpb24gZnJhbWUgcmF0ZSBpbiB0aGUgYnJvd3NlclxuICogQHJldHVybiB7dm9pZH1cbiAqL1xuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24oY2FsbGJhY2ssIHRpbWVvdXQpIHtcbiAgdmFyIHBlbmRpbmcgPSBmYWxzZTtcbiAgdmFyIGRvbmUgPSAoKSA9PiB7XG4gICAgY2FsbGJhY2suYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgICBwZW5kaW5nID0gZmFsc2U7XG4gIH07XG4gIHJldHVybiBmdW5jdGlvbigpIHtcbiAgICBpZiAocGVuZGluZykge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBwZW5kaW5nID0gdHJ1ZTtcbiAgICBpZiAoIXRpbWVvdXQpIHtcbiAgICAgIHdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUoZG9uZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHdpbmRvdy5zZXRUaW1lb3V0KGRvbmUsIHRpbWVvdXQpO1xuICAgIH1cbiAgfTtcbn1cbiIsIi8qKlxuICogR2V0IGFuIGFycmF5IG9mIGRvbSBlbGVtZW50cyBtYXRjaGluZyB0aGUgc2VsZWN0b3JcbiAqIEBwYXJhbSAge3N0cmluZ30gICAgIHNlbGVjdG9yXG4gKiBAcGFyYW0gIHtET01lbGVtZW50fSBET00gZWxlbWVudCB0byBzZWFyY2ggaW4uIERlZmF1bHRzIHRvIGRvY3VtZW50XG4gKiBAcmV0dXJuIHthcnJheX1cbiAqL1xuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24oc2VsZWN0b3IsICRyb290ID0gZG9jdW1lbnQpIHtcbiAgcmV0dXJuIEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKCRyb290LnF1ZXJ5U2VsZWN0b3JBbGwoc2VsZWN0b3IpKTtcbn1cbiIsIi8qKlxuICogR2V0IHRoZSBlbGVtZW50cyBvZmZzZXQgcmVsYXRpdmUgdG8gdGhlIGRvY3VtZW50XG4gKiBAcGFyYW0gIHtET01FbGVtZW50fSAkZWxlbWVudCBFbGVtZW50IHRvIGdldCB0aGUgb2Zmc2V0IGZyb21cbiAqIEByZXR1cm4ge2ludGVnZXJ9ICAgICAgICAgICAgIE9mZnNldCBpbiBwaXhlbHNcbiAqL1xuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24oJGVsZW1lbnQpIHtcbiAgdmFyIG9mZnNldCA9IDA7XG5cbiAgd2hpbGUgKCRlbGVtZW50ICYmICFpc05hTigkZWxlbWVudC5vZmZzZXRUb3ApKSB7XG4gICAgb2Zmc2V0ICs9ICRlbGVtZW50Lm9mZnNldFRvcDtcbiAgICAkZWxlbWVudCA9ICRlbGVtZW50Lm9mZnNldFBhcmVudDtcbiAgfVxuICByZXR1cm4gb2Zmc2V0O1xufVxuIiwiLyoqXG4gKiBMYXp5IGxvYWQgaW1hZ2VzIHdpdGggY2xhc3MgLmxhenktaW1hZ2VzLlxuICogRGVwZW5kaW5nIG9uIHRoZSB0cmVzaG9sZCBpbWFnZXMgd2lsbCBsb2FkIGFzIHRoZSB1c2VyIHNjcm9sbHMgZG93biBvbiB0aGVcbiAqIGRvY3VtZW50LlxuICovXG5cbi8vIERlcGVuZGVuY2Vpc1xuaW1wb3J0IGdldEFsbEVsZW1lbnRzIGZyb20gJy4uL2RvbS9nZXQtYWxsJztcbmltcG9ydCBzY3JvbGxWaXNpYmxlIGZyb20gJy4uL3Njcm9sbC92aXNpYmxlJztcblxuLy8gTG9hZCBpbWFnZSBlbGVtZW50XG52YXIgbG9hZEltZyA9IGZ1bmN0aW9uKCRpbWcpIHtcblxuICBpZiAoJGltZy5kYXRhc2V0LnNyYykge1xuICAgICRpbWcuc2V0QXR0cmlidXRlKCdzcmMnLCAkaW1nLmRhdGFzZXQuc3JjKTtcbiAgfVxuICBpZiAoJGltZy5kYXRhc2V0LnNyY3NldCkge1xuICAgICRpbWcuc2V0QXR0cmlidXRlKCdzcmNzZXQnLCAkaW1nLmRhdGFzZXQuc3Jjc2V0KTtcbiAgfVxufTtcblxuLy8gTG9hZCBwaWN0dXJlIGVsZW1lbnRcbnZhciBsb2FkUGljdHVyZSA9IGZ1bmN0aW9uKCRwaWN0dXJlKSB7XG4gIGxvYWRJbWcoJHBpY3R1cmUucXVlcnlTZWxlY3RvcignaW1nJykpO1xuICB2YXIgJHNvdXJjZXMgPSBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbCgkcGljdHVyZS5xdWVyeVNlbGVjdG9yQWxsKCdzb3VyY2UnKSk7XG4gICRzb3VyY2VzLmZvckVhY2goJHNvdXJjZSA9PiAkc291cmNlLnNldEF0dHJpYnV0ZSgnc3Jjc2V0JywgJHNvdXJjZS5kYXRhc2V0LnNyY3NldCkpO1xufTtcblxudmFyIGxvYWRFbGVtZW50ID0gZnVuY3Rpb24oJGVsZW1lbnQpIHtcbiAgaWYgKCRlbGVtZW50Lm1hdGNoZXMoJ3BpY3R1cmUnKSkge1xuICAgIGxvYWRQaWN0dXJlKCRlbGVtZW50KTtcbiAgfSBlbHNlIGlmICgkZWxlbWVudC5tYXRjaGVzKCdpbWcnKSkge1xuICAgIGxvYWRJbWcoJGVsZW1lbnQpO1xuICB9XG5cbiAgLy8gTWFrZSBzdXJlIHBpY3R1cmVmaWxsIHdpbGwgdXBkYXRlIHRoZSBpbWFnZSB3aGVuIHNvdXJjZSBoYXMgY2hhbmdlZFxuICBpZiAod2luZG93LnBpY3R1cmVmaWxsKSB7XG4gICAgd2luZG93LnBpY3R1cmVmaWxsKHtcbiAgICAgIHJlZXZhbHVhdGU6IHRydWVcbiAgICB9KTtcbiAgfVxufTtcblxuLyoqXG4gKiBBY3RpdmF0ZSBsYXp5IGxvYWQgb2YgaW1hZ2VzIGFzIHVzZXIgc2Nyb2xsc1xuICogQHBhcmFtICB7ZmxvYXR9IHRocmVzaG9sZCAgUGVyY2VudCBiZWxvdyBzY3JlZW4gdG8gaW5pdGlhbGl6ZSBsb2FkIG9mIGltYWdlXG4gKiBAcmV0dXJuIHt2b2lkfVxuICovXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbih0aHJlc2hvbGQgPSAwLjUpIHtcbiAgdmFyICRsYXp5SW1hZ2VzID0gZ2V0QWxsRWxlbWVudHMoJy5sYXp5LWltYWdlJyk7XG5cbiAgd2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZShmdW5jdGlvbigpIHtcbiAgICAkbGF6eUltYWdlcy5mb3JFYWNoKGZ1bmN0aW9uKCRsYXp5SW1hZ2UpIHtcblxuICAgICAgLy8gSWdub3JlIGltYWdlcyB3aGljaCBoYXMgYWxyZWFkeSBiZWVuIHJlZ2lzdGVyZWRcbiAgICAgIGlmICgkbGF6eUltYWdlLmRhdGFzZXQubGF6eUltYWdlTGlzdGVuaW5nKSB7XG5cdHJldHVybjtcbiAgICAgIH1cbiAgICAgICRsYXp5SW1hZ2Uuc2V0QXR0cmlidXRlKCdkYXRhLWxhenktaW1hZ2UtbGlzdGVuaW5nJywgJ3RydWUnKTtcblxuICAgICAgc2Nyb2xsVmlzaWJsZSgkbGF6eUltYWdlLCB0aHJlc2hvbGQpXG4gICAgICAgIC50aGVuKCgpID0+IGxvYWRFbGVtZW50KCRsYXp5SW1hZ2UpKTtcbiAgICB9KTtcbiAgfSk7XG5cbn1cbiIsIi8vIERlcGVuZGVuY2llc1xuaW1wb3J0IGdldERvY3VtZW50T2Zmc2V0VG9wIGZyb20gJy4uL2RvbS9nZXQtZG9jdW1lbnQtb2Zmc2V0LXRvcCc7XG5cbi8qKlxuICogQ2hlY2tzIGlmIHRoZSB1c2VyIGhhcyBzY3JvbGxlZCB0byBvciBwYXN0IGFuIGVsZW1lbnRcbiAqIEBwYXJhbSAge0RPTUVsZW1lbnR9ICRlbGVtZW50ICBUaGUgZWxlbWVudCB0byBjaGVjayBhZ2FpbnN0XG4gKiBAcGFyYW0gIHtmbG9hdH0gICAgICB0aHJlc2hvbGQgRGlzdGFuY2UgaW4gcGVyY2VudCBvZiB0aGUgc2NlZWVuIGhlaWdodCB0byBtZWFzdXJlIGFnYWluc3QuXG4gKiBAcmV0dXJuIHtib29sZWFufVxuICovXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbigkZWxlbWVudCwgdGhyZXNob2xkID0gMCkge1xuICB2YXIgc2Nyb2xsQm90dG9tID0gKHdpbmRvdy5zY3JvbGxZIHx8IGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5zY3JvbGxUb3ApICsgKHdpbmRvdy5pbm5lckhlaWdodCAqICgxICsgdGhyZXNob2xkKSk7XG4gIHZhciBvZmZzZXRUb3AgPSBnZXREb2N1bWVudE9mZnNldFRvcCgkZWxlbWVudCk7XG4gIHJldHVybiAoc2Nyb2xsQm90dG9tID4gb2Zmc2V0VG9wKTtcbn1cbiIsIi8vIGRlcGVuZGVuY2llc1xuaW1wb3J0IGRlbGF5IGZyb20gJy4uL2FzeW5jL2RlbGF5JztcblxuLyoqXG4gKiBSdW5zIHNjcmlwdHMgZWFjaCB0aW1lIHRoZSB1c2VyIGNoYW5nZXMgc2Nyb2xsIGRpcmVjdGlvblxuICogQHBhcmFtICB7RnVuY3Rpb259IGRvd25DYWxsYmFjayAgQ2FsbGJhY2sgZXZlcnkgdGltZSB0aGUgdXNlciBzdGFydHMgc2Nyb2xsaW5nIGRvd25cbiAqIEBwYXJhbSAge0Z1bmN0aW9ufSB1cENhbGxiYWNrICAgIENhbGxiYWNrIGV2ZXJ5IHRpbWUgdGhlIHVzZXIgc3RhcnRzIHNjcm9sbGluZyB1cFxuICogQHBhcmFtICB7ZmxvYXR9ICAgIHRocmVzaG9sZCAgICAgTWFyZ2luIGluIHRvcCB3aGVyZSBzY3JvbGwgZG93biBpcyBpZ25vcmVkIChjb3VsZCBiZSB1c2VkIGZvciBuYXZzKVxuICogQHJldHVybiB7dm9pZH1cbiAqL1xuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24oZG93bkNhbGxiYWNrID0gZnVuY3Rpb24oKSB7fSwgdXBDYWxsYmFjayA9IGZ1bmN0aW9uKCkge30sIHRocmVzaG9sZCA9IDApIHtcblxuICB2YXIgbGFzdFNjcm9sbFBvcyA9IDA7XG4gIHZhciBzY3JvbGxlZERvd24gPSBmYWxzZTtcblxuICB2YXIgaXNTY3JvbGxpbmcgPSBmdW5jdGlvbigpIHtcbiAgICB2YXIgY3VycmVudFNjcm9sbFBvcyA9IHdpbmRvdy5zY3JvbGxZO1xuXG4gICAgaWYgKCFzY3JvbGxlZERvd24gJiZcbiAgICAgIGN1cnJlbnRTY3JvbGxQb3MgPiB0aHJlc2hvbGQgJiZcbiAgICAgIGN1cnJlbnRTY3JvbGxQb3MgPiAobGFzdFNjcm9sbFBvcyArIDEwKSkge1xuICAgICAgZG93bkNhbGxiYWNrKCk7XG4gICAgICBzY3JvbGxlZERvd24gPSB0cnVlO1xuICAgIH0gZWxzZSBpZiAoc2Nyb2xsZWREb3duICYmXG4gICAgICAoY3VycmVudFNjcm9sbFBvcyA8PSB0aHJlc2hvbGQgfHwgY3VycmVudFNjcm9sbFBvcyA8IChsYXN0U2Nyb2xsUG9zIC0gMTAwKSkgJiZcbiAgICAgIChjdXJyZW50U2Nyb2xsUG9zICsgd2luZG93LmlubmVySGVpZ2h0IDwgZG9jdW1lbnQuYm9keS5jbGllbnRIZWlnaHQpKSB7XG4gICAgICB1cENhbGxiYWNrKCk7XG4gICAgICBzY3JvbGxlZERvd24gPSBmYWxzZTtcbiAgICB9XG5cbiAgICBsYXN0U2Nyb2xsUG9zID0gY3VycmVudFNjcm9sbFBvcztcbiAgfTtcblxuICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignc2Nyb2xsJywgZGVsYXkoaXNTY3JvbGxpbmcsIDI1MCkpO1xuICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdET01Db250ZW50TG9hZGVkJywgaXNTY3JvbGxpbmcpO1xufVxuIiwiLy8gRGVwZW5kZW5jZWlzXG5pbXBvcnQgZGVib3VuY2UgZnJvbSAnLi4vYXN5bmMvZGVib3VuY2UnO1xuaW1wb3J0IGhhc1Njcm9sbGVkUGFzdCBmcm9tICcuL2hhcy1zY3JvbGxlZC1wYXN0JztcblxuLyoqXG4gKiBGdWxmaWxsIGEgcHJvbWlzZSwgd2hlbiB0aGUgZWxlbWVudCBpcyB2aXNpYmxlIChzY3JvbGxlZCB0byBvciBwYXN0KVxuICogQHBhcmFtICB7RE9NRWxlbWVudH0gJGVsZW1lbnQgIEVsZW1lbnQgdG8gY2hlY2tcbiAqIEBwYXJhbSAge2Zsb2F0fSAgICAgIHRocmVzaG9sZCBEaXN0YW5jZSBpbiBwZXJjZW50XG4gKiBAcmV0dXJuIHtbdHlwZV19ICAgICAgICAgICBbZGVzY3JpcHRpb25dXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uKCRlbGVtZW50LCB0aHJlc2hvbGQgPSAwKSB7XG5cbiAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uKHJlc29sdmUpIHtcblxuICAgIHZhciBjaGVja0VsZW1lbnQgPSBkZWJvdW5jZShmdW5jdGlvbigpIHtcbiAgICAgIGlmIChoYXNTY3JvbGxlZFBhc3QoJGVsZW1lbnQsIHRocmVzaG9sZCkpIHtcbiAgICAgICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3Njcm9sbCcsIGNoZWNrRWxlbWVudCk7XG4gICAgICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKCdyZXNpemUnLCBjaGVja0VsZW1lbnQpO1xuICAgICAgICByZXNvbHZlKCk7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignc2Nyb2xsJywgY2hlY2tFbGVtZW50KTtcbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigncmVzaXplJywgY2hlY2tFbGVtZW50KTtcbiAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdET01Db250ZW50TG9hZGVkJywgY2hlY2tFbGVtZW50KTtcbiAgICBzZXRUaW1lb3V0KGNoZWNrRWxlbWVudCwgMCk7XG4gIH0pO1xufVxuIiwiLyoqXG4gKiBIZWxwZXJzIGZvciB2YWxpZGF0aW5nIGlucHV0IGZpZWxkc1xuICovXG5cbmltcG9ydCBpc0RhdGUgZnJvbSAnLi9pcy1kYXRlJztcbmltcG9ydCBpc0VtYWlsIGZyb20gJy4vaXMtZW1haWwnO1xuaW1wb3J0IGlzRmxvYXQgZnJvbSAnLi9pcy1mbG9hdCc7XG5pbXBvcnQgaXNJbnQgZnJvbSAnLi9pcy1pbnQnO1xuaW1wb3J0IGlzUmVxdWlyZWQgZnJvbSAnLi9pcy1yZXF1aXJlZCc7XG5pbXBvcnQgaXNVcmwgZnJvbSAnLi9pcy11cmwnO1xuXG5leHBvcnQgZGVmYXVsdCB7XG4gIGlzRGF0ZSxcbiAgaXNFbWFpbCxcbiAgaXNGbG9hdCxcbiAgaXNJbnQsXG4gIGlzUmVxdWlyZWQsXG4gIGlzVXJsXG59O1xuIiwiaW1wb3J0IGdldEFsbEVsZW1lbnRzIGZyb20gJy4uL2RvbS9nZXQtYWxsJztcbmltcG9ydCB2YWxpZGF0ZSBmcm9tICcuLyc7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uKCkge1xuXG4gIGdldEFsbEVsZW1lbnRzKCcudmFsaWRhdGUnKS5mb3JFYWNoKGZ1bmN0aW9uKCR2YWxpZGF0ZUNvbnRhaW5lcikge1xuXG4gICAgdmFyICR2YWxpZGF0ZUZpZWxkID0gJHZhbGlkYXRlQ29udGFpbmVyO1xuXG4gICAgaWYgKCEkdmFsaWRhdGVDb250YWluZXIubWF0Y2hlcygnaW5wdXQsIHRleHRhcmVhJykpIHtcbiAgICAgICR2YWxpZGF0ZUZpZWxkID0gJHZhbGlkYXRlQ29udGFpbmVyLnF1ZXJ5U2VsZWN0b3IoJ2lucHV0LCB0ZXh0YXJlYScpO1xuICAgIH1cblxuICAgIGlmICghJHZhbGlkYXRlRmllbGQpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICAvLyBGaW5kIHJlbGV2YXQgdmFsaWRhdGlvbiBtZXRob2RzXG4gICAgdmFyIHZhbGlkYXRvck5hbWVzID0gW107XG4gICAgZm9yICh2YXIga2V5IGluICR2YWxpZGF0ZUNvbnRhaW5lci5kYXRhc2V0KSB7XG4gICAgICBpZiAoa2V5ICE9PSAndmFsaWRhdGUnICYmIGtleS5pbmRleE9mKCd2YWxpZGF0ZScpID09PSAwKSB7XG4gICAgICAgIHZhciB2YWxpZGF0b3JOYW1lID0ga2V5LnJlcGxhY2UoJ3ZhbGlkYXRlJywgJycpO1xuXG4gICAgICAgIGlmICh2YWxpZGF0ZVsnaXMnICsgdmFsaWRhdG9yTmFtZV0pIHtcbiAgICAgICAgICB2YWxpZGF0b3JOYW1lcy5wdXNoKHZhbGlkYXRvck5hbWUpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKHZhbGlkYXRvck5hbWVzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIC8vIENoZWNrIHZhbGlkYXRpb24gd2hlbiBpbnB1dCBvbiBmaWVsZCBpcyBjaGFuZ2VkXG4gICAgJHZhbGlkYXRlRmllbGQuYWRkRXZlbnRMaXN0ZW5lcignaW5wdXQnLCBmdW5jdGlvbigpIHtcbiAgICAgIHZhciBpbnB1dCA9ICR2YWxpZGF0ZUZpZWxkLnZhbHVlO1xuICAgICAgdmFyIHZhbGlkID0gIXZhbGlkYXRvck5hbWVzLnNvbWUoZnVuY3Rpb24odmFsaWRhdG9yTmFtZSkge1xuXHRpZiAoIWlucHV0ICYmIHZhbGlkYXRvck5hbWUgIT09ICdSZXF1aXJlZCcpIHtcblx0ICByZXR1cm4gZmFsc2U7XG5cdH1cbiAgICAgICAgcmV0dXJuICF2YWxpZGF0ZVsnaXMnICsgdmFsaWRhdG9yTmFtZV0oaW5wdXQpO1xuICAgICAgfSk7XG5cbiAgICAgIGlmICh2YWxpZCkge1xuXHQkdmFsaWRhdGVDb250YWluZXIuY2xhc3NMaXN0LmFkZCgndmFsaWRhdGUtLXZhbGlkJyk7XG5cdCR2YWxpZGF0ZUNvbnRhaW5lci5jbGFzc0xpc3QucmVtb3ZlKCd2YWxpZGF0ZS0tbm90LXZhbGlkJyk7XG4gICAgICB9IGVsc2Uge1xuXHQkdmFsaWRhdGVDb250YWluZXIuY2xhc3NMaXN0LmFkZCgndmFsaWRhdGUtLW5vdC12YWxpZCcpO1xuXHQkdmFsaWRhdGVDb250YWluZXIuY2xhc3NMaXN0LnJlbW92ZSgndmFsaWRhdGUtLXZhbGlkJyk7XG4gICAgICB9XG4gICAgfSk7XG4gIH0pO1xufVxuIiwiLyoqXG4gKiBWYWxpZGF0ZSB0aGF0IHN0cmluZyBjYW4gYmUgY29udmVydGVkIHRvIGRhdGVcbiAqIEBwYXJhbSAge3N0cmluZ30gZGF0ZSBpbnB1dFxuICogQHJldHVybiB7Ym9vbGVhbn1cbiAqL1xuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24oZGF0ZSkge1xuICByZXR1cm4gIWlzTmFOKERhdGUucGFyc2UoZGF0ZSkpO1xufVxuIiwiLyoqXG4gKiBWYWxpZGF0ZSBlLW1haWxcbiAqIEBwYXJhbSAge3N0cmluZ30gZW1haWwgaW5wdXRcbiAqIEByZXR1cm4ge2Jvb2xlYW59XG4gKi9cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uKGVtYWlsKSB7XG4gIHZhciByZSA9IC9eKFthLXowLTlfXFwuLV0rKUAoW1xcZGEtelxcLi1dKylcXC4oW2EtelxcLl17Miw2fSkkLztcbiAgcmV0dXJuIHJlLnRlc3QoZW1haWwpO1xufVxuIiwiLyoqXG4gKiBWYWxpZGF0ZSBmbG9hdFxuICogQHBhcmFtICB7c3RyaW5nfSBmbG9hdCBpbnB1dFxuICogQHJldHVybiB7Ym9vbGVhbn1cbiAqL1xuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24oZmxvYXQpIHtcbiAgdmFyIHJlID0gL14oPzpbLStdPyg/OlswLTldKykpPyg/OlxcLlswLTldKik/KD86W2VFXVtcXCtcXC1dPyg/OlswLTldKykpPyQvO1xuICByZXR1cm4gZmxvYXQgIT09ICcnICYmIHJlLnRlc3QoZmxvYXQpO1xufVxuIiwiLyoqXG4gKiBWYWxpZGF0ZSBpbnRlZ2V0XG4gKiBAcGFyYW0gIHtzdHJpbmd9IGludGVnZXIgaW5wdXRcbiAqIEByZXR1cm4ge2Jvb2xlYW59XG4gKi9cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uKGludGVnZXIpIHtcbiAgdmFyIHJlID0gL14oPzpbLStdPyg/OjB8WzEtOV1bMC05XSopKSQvO1xuICByZXR1cm4gcmUudGVzdChpbnRlZ2VyKTtcbn1cbiIsIi8qKlxuICogVmFsaWRhdGUgaWYgdGhlIHN0cmluZyBpcyBlbXB0eVxuICogQHBhcmFtICB7c3RyaW5nfSBpbnB1dFxuICogQHJldHVybiB7Ym9vbGVhbn1cbiAqL1xuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24oaW5wdXQpIHtcbiAgcmV0dXJuIGlucHV0LnRyaW0oKSAhPT0gJyc7XG59XG4iLCIvKipcbiAqIFZhbGlkYXRlIHVybFxuICogQHBhcmFtICB7c3RyaW5nfSB1cmwgaW5wdXRcbiAqIEByZXR1cm4ge2Jvb2xlYW59XG4gKi9cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uKHVybCkge1xuICB2YXIgcmUgPSAvXihodHRwcz86XFwvXFwvKT8oW1xcZGEtelxcLi1dKylcXC4oW2EtelxcLl17Miw2fSkoW1xcL1xcdyBcXC4tXSopKlxcLz8kLztcbiAgcmV0dXJuIHJlLnRlc3QodXJsKTtcbn1cbiJdfQ==
