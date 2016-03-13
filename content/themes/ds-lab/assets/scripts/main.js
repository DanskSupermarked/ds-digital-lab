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
		} else {
			$likes.innerHTML = $likes.innerHTML + 1;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJub2RlX21vZHVsZXMvZXBvY2gtdG8tdGltZWFnby9jdXRvZmYvY3V0b2ZmLmpzb24iLCJub2RlX21vZHVsZXMvZXBvY2gtdG8tdGltZWFnby9pbmRleC5qcyIsIm5vZGVfbW9kdWxlcy9lcG9jaC10by10aW1lYWdvL3N1ZmZpeC9zdWZmaXgtZGljdGlvbmFyeS5qc29uIiwibm9kZV9tb2R1bGVzL2Vwb2NoLXRvLXRpbWVhZ28vdGltZS1hZ28vdGltZS1hZ28uanMiLCJub2RlX21vZHVsZXMvZXBvY2gtdG8tdGltZWFnby90aW1lLWNhbGN1bGF0aW9ucy9pbmRleC5qcyIsIm5vZGVfbW9kdWxlcy9lcG9jaC10by10aW1lYWdvL3RpbWUtY2FsY3VsYXRpb25zL3RpbWUtYWdvL2RheXMtYWdvLmpzIiwibm9kZV9tb2R1bGVzL2Vwb2NoLXRvLXRpbWVhZ28vdGltZS1jYWxjdWxhdGlvbnMvdGltZS1hZ28vaG91cnMtYWdvLmpzIiwibm9kZV9tb2R1bGVzL2Vwb2NoLXRvLXRpbWVhZ28vdGltZS1jYWxjdWxhdGlvbnMvdGltZS1hZ28vbWludXRlcy1hZ28uanMiLCJub2RlX21vZHVsZXMvZXBvY2gtdG8tdGltZWFnby90aW1lLWNhbGN1bGF0aW9ucy90aW1lLWFnby9tb250aHMtYWdvLmpzIiwibm9kZV9tb2R1bGVzL2Vwb2NoLXRvLXRpbWVhZ28vdGltZS1jYWxjdWxhdGlvbnMvdGltZS1hZ28vc2Vjb25kcy1hZ28uanMiLCJub2RlX21vZHVsZXMvZXBvY2gtdG8tdGltZWFnby90aW1lLWNhbGN1bGF0aW9ucy90aW1lLWFnby93ZWVrcy1hZ28uanMiLCJub2RlX21vZHVsZXMvZXBvY2gtdG8tdGltZWFnby90aW1lLWNhbGN1bGF0aW9ucy90aW1lLWFnby95ZWFycy1hZ28uanMiLCJzcmMvc2NyaXB0cy9jb21wb25lbnRzL25hdmlnYXRpb24uanMiLCJzcmMvc2NyaXB0cy9jb21wb25lbnRzL3Jlc3BvbnNlLmpzIiwic3JjL3NjcmlwdHMvY29tcG9uZW50cy9zZWFyY2guanMiLCJzcmMvc2NyaXB0cy9jb21wb25lbnRzL3Rvb2wtdGlwLmpzIiwic3JjL3NjcmlwdHMvbGliL2FwaS5qcyIsInNyYy9zY3JpcHRzL2xpYi9mb3JtL2xpdmUtdmFsaWRhdGlvbi5qcyIsInNyYy9zY3JpcHRzL2xpYi9mb3JtL3ZhbGlkYXRlLmpzIiwic3JjL3NjcmlwdHMvbGliL2dldC1sb2dnZWQtaW4tZGF0YS5qcyIsInNyYy9zY3JpcHRzL2xpYi9odG1sLWVuY29kZS5qcyIsInNyYy9zY3JpcHRzL2xpYi9pbWFnZS1jb252ZXJ0ZXIuanMiLCJzcmMvc2NyaXB0cy9saWIvcmVhZC10aW1lLmpzIiwic3JjL3NjcmlwdHMvbGliL3N0cmlwLWh0bWwtdGFncy5qcyIsInNyYy9zY3JpcHRzL21haW4uanMiLCJzcmMvc2NyaXB0cy90ZW1wbGF0ZXMvYXV0aG9yLmpzIiwic3JjL3NjcmlwdHMvdGVtcGxhdGVzL3Bvc3QuanMiLCJzcmMvc2NyaXB0cy90ZW1wbGF0ZXMvcmVzcG9uc2UtbWV0YS5qcyIsInNyYy9zY3JpcHRzL3RlbXBsYXRlcy9yZXNwb25zZS5qcyIsInNyYy9zY3JpcHRzL3RlbXBsYXRlcy90YWcuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvd29yZC1jb3VudC9pbmRleC5qcyIsIi4uLy4uLy4uLy4uL3RlYW0tbnBtLXBhY2thZ2VzL2RzLWFzc2V0cy9hc3luYy9kZWJvdW5jZS5qcyIsIi4uLy4uLy4uLy4uL3RlYW0tbnBtLXBhY2thZ2VzL2RzLWFzc2V0cy9hc3luYy9kZWxheS5qcyIsIi4uLy4uLy4uLy4uL3RlYW0tbnBtLXBhY2thZ2VzL2RzLWFzc2V0cy9kb20vZ2V0LWFsbC5qcyIsIi4uLy4uLy4uLy4uL3RlYW0tbnBtLXBhY2thZ2VzL2RzLWFzc2V0cy9kb20vZ2V0LWRvY3VtZW50LW9mZnNldC10b3AuanMiLCIuLi8uLi8uLi8uLi90ZWFtLW5wbS1wYWNrYWdlcy9kcy1hc3NldHMvbGF6eS9pbWFnZXMuanMiLCIuLi8uLi8uLi8uLi90ZWFtLW5wbS1wYWNrYWdlcy9kcy1hc3NldHMvc2Nyb2xsL2hhcy1zY3JvbGxlZC1wYXN0LmpzIiwiLi4vLi4vLi4vLi4vdGVhbS1ucG0tcGFja2FnZXMvZHMtYXNzZXRzL3Njcm9sbC9zY3JvbGwtY2hhbmdlLmpzIiwiLi4vLi4vLi4vLi4vdGVhbS1ucG0tcGFja2FnZXMvZHMtYXNzZXRzL3Njcm9sbC92aXNpYmxlLmpzIiwiLi4vLi4vLi4vLi4vdGVhbS1ucG0tcGFja2FnZXMvZHMtYXNzZXRzL3ZhbGlkYXRlL2luZGV4LmpzIiwiLi4vLi4vLi4vLi4vdGVhbS1ucG0tcGFja2FnZXMvZHMtYXNzZXRzL3ZhbGlkYXRlL2lucHV0LWZpZWxkcy5qcyIsIi4uLy4uLy4uLy4uL3RlYW0tbnBtLXBhY2thZ2VzL2RzLWFzc2V0cy92YWxpZGF0ZS9pcy1kYXRlLmpzIiwiLi4vLi4vLi4vLi4vdGVhbS1ucG0tcGFja2FnZXMvZHMtYXNzZXRzL3ZhbGlkYXRlL2lzLWVtYWlsLmpzIiwiLi4vLi4vLi4vLi4vdGVhbS1ucG0tcGFja2FnZXMvZHMtYXNzZXRzL3ZhbGlkYXRlL2lzLWZsb2F0LmpzIiwiLi4vLi4vLi4vLi4vdGVhbS1ucG0tcGFja2FnZXMvZHMtYXNzZXRzL3ZhbGlkYXRlL2lzLWludC5qcyIsIi4uLy4uLy4uLy4uL3RlYW0tbnBtLXBhY2thZ2VzL2RzLWFzc2V0cy92YWxpZGF0ZS9pcy1yZXF1aXJlZC5qcyIsIi4uLy4uLy4uLy4uL3RlYW0tbnBtLXBhY2thZ2VzL2RzLWFzc2V0cy92YWxpZGF0ZS9pcy11cmwuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDUkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDTkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtB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QUwsQ0FEdUI7QUFFM0IsU0FBTyxHQUFHLElBQUgsQ0FBUSxHQUFSLENBQVAsQ0FGMkI7Q0FBZCIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJtb2R1bGUuZXhwb3J0cz17XG4gIFwic2Vjb25kc1wiOiA2MCxcbiAgXCJtaW51dGVzXCI6IDYwLFxuICBcImhvdXJzXCI6IDI0LFxuICBcImRheXNcIjogNyxcbiAgXCJ3ZWVrc1wiOiA0LFxuICBcIm1vbnRoc1wiOiAxMlxufVxuIiwidmFyIGNvbnZlcnRlciA9IG1vZHVsZS5leHBvcnRzID0ge1xuICBjdXRvZmY6IHJlcXVpcmUoJy4vY3V0b2ZmL2N1dG9mZi5qc29uJyksXG4gIHN1ZmZpeERpY3Rpb25hcnk6IHJlcXVpcmUoJy4vc3VmZml4L3N1ZmZpeC1kaWN0aW9uYXJ5Lmpzb24nKSxcbiAgdGltZUNhbGNzOiByZXF1aXJlKCcuL3RpbWUtY2FsY3VsYXRpb25zJylcbn1cbmNvbnZlcnRlci50aW1lQWdvID0gcmVxdWlyZSgnLi90aW1lLWFnby90aW1lLWFnby5qcycpLmJpbmQoY29udmVydGVyKVxuIiwibW9kdWxlLmV4cG9ydHM9e1xuICBcInNlY29uZHNcIjoge1xuICAgIFwic2luZ3VsYXJcIjogXCIgc2Vjb25kIGFnb1wiLFxuICAgIFwicGx1cmFsXCI6IFwiIHNlY29uZHMgYWdvXCJcbiAgfSxcbiAgXCJtaW51dGVzXCI6IHtcbiAgICBcInNpbmd1bGFyXCI6IFwiIG1pbnV0ZSBhZ29cIixcbiAgICBcInBsdXJhbFwiOiBcIiBtaW51dGVzIGFnb1wiXG4gIH0sXG4gIFwiaG91cnNcIjoge1xuICAgIFwic2luZ3VsYXJcIjogXCIgaG91ciBhZ29cIixcbiAgICBcInBsdXJhbFwiOiBcIiBob3VycyBhZ29cIlxuICB9LFxuICBcImRheXNcIjoge1xuICAgIFwic2luZ3VsYXJcIjogXCIgZGF5IGFnb1wiLFxuICAgIFwicGx1cmFsXCI6IFwiIGRheXMgYWdvXCJcbiAgfSxcbiAgXCJ3ZWVrc1wiOiB7XG4gICAgXCJzaW5ndWxhclwiOiBcIiB3ZWVrIGFnb1wiLFxuICAgIFwicGx1cmFsXCI6IFwiIHdlZWtzIGFnb1wiXG4gIH0sXG4gIFwibW9udGhzXCI6IHtcbiAgICBcInNpbmd1bGFyXCI6IFwiIG1vbnRoIGFnb1wiLFxuICAgIFwicGx1cmFsXCI6IFwiIG1vbnRocyBhZ29cIlxuICB9LFxuICBcInllYXJzXCI6IHtcbiAgICBcInNpbmd1bGFyXCI6IFwiIHllYXIgYWdvXCIsXG4gICAgXCJwbHVyYWxcIjogXCIgeWVhcnMgYWdvXCJcbiAgfVxufVxuIiwibW9kdWxlLmV4cG9ydHMgPSBUaW1lQWdvXG5cbmZ1bmN0aW9uIFRpbWVBZ28gKHBhc3RFcG9jaCwgY3VycmVudEVwb2NoKSB7XG4gIHZhciBzZWNvbmRzID0gTWF0aC5yb3VuZCh0aGlzLnRpbWVDYWxjcy5zZWNvbmRzKHBhc3RFcG9jaCwgY3VycmVudEVwb2NoKSlcbiAgdmFyIG1pbnV0ZXMgPSBNYXRoLnJvdW5kKHRoaXMudGltZUNhbGNzLm1pbnV0ZXMocGFzdEVwb2NoLCBjdXJyZW50RXBvY2gpKVxuICB2YXIgaG91cnMgPSBNYXRoLnJvdW5kKHRoaXMudGltZUNhbGNzLmhvdXJzKHBhc3RFcG9jaCwgY3VycmVudEVwb2NoKSlcbiAgdmFyIGRheXMgPSBNYXRoLnJvdW5kKHRoaXMudGltZUNhbGNzLmRheXMocGFzdEVwb2NoLCBjdXJyZW50RXBvY2gpKVxuICB2YXIgd2Vla3MgPSBNYXRoLnJvdW5kKHRoaXMudGltZUNhbGNzLndlZWtzKHBhc3RFcG9jaCwgY3VycmVudEVwb2NoKSlcbiAgdmFyIG1vbnRocyA9IE1hdGgucm91bmQodGhpcy50aW1lQ2FsY3MubW9udGhzKHBhc3RFcG9jaCwgY3VycmVudEVwb2NoKSlcbiAgdmFyIHllYXJzID0gTWF0aC5yb3VuZCh0aGlzLnRpbWVDYWxjcy55ZWFycyhwYXN0RXBvY2gsIGN1cnJlbnRFcG9jaCkpXG5cbiAgdmFyIHN1ZmZpeCA9IHRoaXMuc3VmZml4RGljdGlvbmFyeVxuICB2YXIgY3V0b2ZmID0gdGhpcy5jdXRvZmZcblxuICBpZiAoc2Vjb25kcyA8IGN1dG9mZi5zZWNvbmRzKSB7XG4gICAgcmV0dXJuIHNlY29uZHMgKyBzdWZmaXguc2Vjb25kc1tnZXRGb3JtKHNlY29uZHMpXVxuICB9IGVsc2UgaWYgKG1pbnV0ZXMgPCBjdXRvZmYubWludXRlcykge1xuICAgIHJldHVybiBtaW51dGVzICsgc3VmZml4Lm1pbnV0ZXNbZ2V0Rm9ybShtaW51dGVzKV1cbiAgfSBlbHNlIGlmIChob3VycyA8IGN1dG9mZi5ob3Vycykge1xuICAgIHJldHVybiBob3VycyArIHN1ZmZpeC5ob3Vyc1tnZXRGb3JtKGhvdXJzKV1cbiAgfSBlbHNlIGlmIChkYXlzIDwgY3V0b2ZmLmRheXMpIHtcbiAgICByZXR1cm4gZGF5cyArIHN1ZmZpeC5kYXlzW2dldEZvcm0oZGF5cyldXG4gIH0gZWxzZSBpZiAod2Vla3MgPCBjdXRvZmYud2Vla3MpIHtcbiAgICByZXR1cm4gd2Vla3MgKyBzdWZmaXgud2Vla3NbZ2V0Rm9ybSh3ZWVrcyldXG4gIH0gZWxzZSBpZiAobW9udGhzIDwgY3V0b2ZmLm1vbnRocykge1xuICAgIHJldHVybiBtb250aHMgKyBzdWZmaXgubW9udGhzW2dldEZvcm0obW9udGhzKV1cbiAgfSBlbHNlIHtcbiAgICByZXR1cm4geWVhcnMgKyBzdWZmaXgueWVhcnNbZ2V0Rm9ybSh5ZWFycyldXG4gIH1cbn1cblxuZnVuY3Rpb24gZ2V0Rm9ybSAodmFsdWUpIHtcbiAgaWYgKHZhbHVlID09PSAxKSB7XG4gICAgcmV0dXJuICdzaW5ndWxhcidcbiAgfVxuICByZXR1cm4gJ3BsdXJhbCdcbn1cbiIsIm1vZHVsZS5leHBvcnRzID0ge1xuICBzZWNvbmRzOiByZXF1aXJlKCcuL3RpbWUtYWdvL3NlY29uZHMtYWdvLmpzJyksXG4gIG1pbnV0ZXM6IHJlcXVpcmUoJy4vdGltZS1hZ28vbWludXRlcy1hZ28uanMnKSxcbiAgaG91cnM6IHJlcXVpcmUoJy4vdGltZS1hZ28vaG91cnMtYWdvLmpzJyksXG4gIGRheXM6IHJlcXVpcmUoJy4vdGltZS1hZ28vZGF5cy1hZ28uanMnKSxcbiAgd2Vla3M6IHJlcXVpcmUoJy4vdGltZS1hZ28vd2Vla3MtYWdvLmpzJyksXG4gIG1vbnRoczogcmVxdWlyZSgnLi90aW1lLWFnby9tb250aHMtYWdvLmpzJyksXG4gIHllYXJzOiByZXF1aXJlKCcuL3RpbWUtYWdvL3llYXJzLWFnby5qcycpXG59XG4iLCJtb2R1bGUuZXhwb3J0cyA9IERheXNBZ29cblxuZnVuY3Rpb24gRGF5c0FnbyAocGFzdEVwb2NoLCBjdXJyZW50RXBvY2gpIHtcbiAgdmFyIGRheXNBZ28gPSAoY3VycmVudEVwb2NoIC0gcGFzdEVwb2NoKSAvIDEwMDAgLyA2MCAvIDYwIC8gMjRcbiAgcmV0dXJuIGRheXNBZ29cbn1cbiIsIm1vZHVsZS5leHBvcnRzID0gSG91cnNBZ29cblxuZnVuY3Rpb24gSG91cnNBZ28gKHBhc3RFcG9jaCwgY3VycmVudEVwb2NoKSB7XG4gIHZhciBob3Vyc0FnbyA9IChjdXJyZW50RXBvY2ggLSBwYXN0RXBvY2gpIC8gMTAwMCAvIDYwIC8gNjBcbiAgcmV0dXJuIGhvdXJzQWdvXG59XG4iLCJtb2R1bGUuZXhwb3J0cyA9IE1pbnV0ZXNBZ29cblxuZnVuY3Rpb24gTWludXRlc0FnbyAocGFzdEVwb2NoLCBjdXJyZW50RXBvY2gpIHtcbiAgdmFyIG1pbnV0ZXNBZ28gPSAoY3VycmVudEVwb2NoIC0gcGFzdEVwb2NoKSAvIDEwMDAgLyA2MFxuICByZXR1cm4gbWludXRlc0Fnb1xufVxuIiwibW9kdWxlLmV4cG9ydHMgPSBNb250aHNBZ29cblxuZnVuY3Rpb24gTW9udGhzQWdvIChwYXN0RXBvY2gsIGN1cnJlbnRFcG9jaCkge1xuICB2YXIgbW9udGhzQWdvID0gKGN1cnJlbnRFcG9jaCAtIHBhc3RFcG9jaCkgLyAxMDAwIC8gNjAgLyA2MCAvIDI0IC8gMzFcbiAgcmV0dXJuIG1vbnRoc0Fnb1xufVxuIiwibW9kdWxlLmV4cG9ydHMgPSBTZWNvbmRzQWdvXG5cbmZ1bmN0aW9uIFNlY29uZHNBZ28gKHBhc3RFcG9jaCwgY3VycmVudEVwb2NoKSB7XG4gIHZhciBzZWNvbmRzQWdvID0gKGN1cnJlbnRFcG9jaCAtIHBhc3RFcG9jaCkgLyAxMDAwXG4gIHJldHVybiBzZWNvbmRzQWdvXG59XG4iLCJtb2R1bGUuZXhwb3J0cyA9IFdlZWtzQWdvXG5cbmZ1bmN0aW9uIFdlZWtzQWdvIChwYXN0RXBvY2gsIGN1cnJlbnRFcG9jaCkge1xuICB2YXIgd2Vla3NBZ28gPSAoY3VycmVudEVwb2NoIC0gcGFzdEVwb2NoKSAvIDEwMDAgLyA2MCAvIDYwIC8gMjQgLyA3XG4gIHJldHVybiB3ZWVrc0Fnb1xufVxuIiwibW9kdWxlLmV4cG9ydHMgPSBZZWFyc0Fnb1xuXG5mdW5jdGlvbiBZZWFyc0FnbyAocGFzdEVwb2NoLCBjdXJyZW50RXBvY2gpIHtcbiAgdmFyIHllYXJzQWdvID0gKGN1cnJlbnRFcG9jaCAtIHBhc3RFcG9jaCkgLyAxMDAwIC8gNjAgLyA2MCAvIDI0IC8gMzEgLyAxMlxuICByZXR1cm4geWVhcnNBZ29cbn1cbiIsIi8qKlxuICogSGFuZGxlIG5hdmlnYXRpb25cbiAqL1xuXG4vLyBEZXBlbmRlbmNpZXNcbmltcG9ydCBzY3JvbGxDaGFuZ2UgZnJvbSAnZHMtYXNzZXRzL3Njcm9sbC9zY3JvbGwtY2hhbmdlJztcbmltcG9ydCBkZWJvdW5jZSBmcm9tICdkcy1hc3NldHMvYXN5bmMvZGVib3VuY2UnO1xuaW1wb3J0IGdldEFsbCBmcm9tICdkcy1hc3NldHMvZG9tL2dldC1hbGwnO1xuaW1wb3J0IGhhc1Njcm9sbGVkUGFzdCBmcm9tICdkcy1hc3NldHMvc2Nyb2xsL2hhcy1zY3JvbGxlZC1wYXN0JztcbmltcG9ydCBnZXRVc2VyRGF0YSBmcm9tICcuLi9saWIvZ2V0LWxvZ2dlZC1pbi1kYXRhJztcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24oKSB7XG5cbiAgdmFyICRuYXYgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubmF2Jyk7XG4gIGlmICghJG5hdikge1xuICAgIHJldHVybjtcbiAgfVxuXG4gIHZhciAkYm9keSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2JvZHknKTtcblxuICAvLyBDbG9uZSBuYXZpZ2F0aW9uIGFuZCBtYWtlIHRoZSBuZXcgb25lIHN0aWNreVxuICB2YXIgJHN0aWNreU5hdiA9ICRuYXYuY2xvbmVOb2RlKHRydWUpO1xuICAkc3RpY2t5TmF2LmNsYXNzTGlzdC5hZGQoJ25hdi0tc3RpY2t5Jyk7XG4gICRib2R5Lmluc2VydEJlZm9yZSgkc3RpY2t5TmF2LCAkYm9keS5maXJzdENoaWxkKTtcblxuICB2YXIgJGZvb3RlclNoYXJlQmFyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmZvb3Rlcl9fc2hhcmUtYmFyJyk7XG4gIHZhciAkc3RpY2t5U2hhcmVCYXI7XG4gIGlmICgkZm9vdGVyU2hhcmVCYXIpIHtcbiAgICAkc3RpY2t5U2hhcmVCYXIgPSAkZm9vdGVyU2hhcmVCYXIuY2xvbmVOb2RlKHRydWUpO1xuICAgICRzdGlja3lTaGFyZUJhci5jbGFzc0xpc3QuYWRkKCdmb290ZXJfX3NoYXJlLWJhci0tc3RpY2t5Jyk7XG4gICAgJGJvZHkuaW5zZXJ0QmVmb3JlKCRzdGlja3lTaGFyZUJhciwgJGJvZHkuZmlyc3RDaGlsZCk7XG4gIH1cblxuICAvLyBBY3RpdmF0ZSB0aGUgc3RpY2t5IG5hdmlnYXRpb24gd2hlbiB0aGUgdXNlciBzY3JvbGxzIHVwLlxuICAvLyBUaGlzIHdpbGwgZmlycyB0YWtlIGVmZmVjdCwgd2hlbiB0aGUgdXNlciBoYXMgc2Nyb2xsZWQgXCJhIHNjcmVlblwiIGRvd24uXG4gIHNjcm9sbENoYW5nZShmdW5jdGlvbigpIHtcbiAgICAkc3RpY2t5TmF2LmNsYXNzTGlzdC5yZW1vdmUoJ25hdi0tYWN0aXZlJyk7XG4gICAgaWYgKCRzdGlja3lTaGFyZUJhcikge1xuICAgICAgJHN0aWNreVNoYXJlQmFyLmNsYXNzTGlzdC5yZW1vdmUoJ2Zvb3Rlcl9fc2hhcmUtYmFyLS1zdGlja3ktYWN0aXZlJyk7XG4gICAgfVxuICB9LCBmdW5jdGlvbigpIHtcbiAgICBpZiAod2luZG93LnNjcm9sbFkgPiB3aW5kb3cuaW5uZXJIZWlnaHQpIHtcbiAgICAgICRzdGlja3lOYXYuY2xhc3NMaXN0LmFkZCgnbmF2LS1hY3RpdmUnKTtcbiAgICAgIGlmICgkc3RpY2t5U2hhcmVCYXIpIHtcbiAgICAgICAgJHN0aWNreVNoYXJlQmFyLmNsYXNzTGlzdC5hZGQoJ2Zvb3Rlcl9fc2hhcmUtYmFyLS1zdGlja3ktYWN0aXZlJyk7XG4gICAgICB9XG4gICAgfVxuICB9KTtcblxuICAvKipcbiAgICogSGlkZSBzdGlja3kgbmF2aWdhdGlvbiB3aGVuIHNjcm9sbGVkIHRvIHRoZSB0b3Agb2YgdGhlIGRvY3VtZW50XG4gICAqIEByZXR1cm4ge3ZvaWR9XG4gICAqL1xuICB2YXIgb25Ub3AgPSBmdW5jdGlvbigpIHtcbiAgICB2YXIgc2Nyb2xsUG9zID0gd2luZG93LnNjcm9sbFkgfHwgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LnNjcm9sbFRvcDtcbiAgICBpZiAoc2Nyb2xsUG9zIDw9IDApIHtcbiAgICAgICRzdGlja3lOYXYuY2xhc3NMaXN0LmFkZCgnbmF2LS1oaWRkZW4nKTtcbiAgICAgICRzdGlja3lOYXYuY2xhc3NMaXN0LnJlbW92ZSgnbmF2LS1hY3RpdmUnKTtcbiAgICAgIGlmICgkc3RpY2t5U2hhcmVCYXIpIHtcbiAgICAgICAgJHN0aWNreVNoYXJlQmFyLmNsYXNzTGlzdC5yZW1vdmUoJ2Zvb3Rlcl9fc2hhcmUtYmFyLS1zdGlja3ktYWN0aXZlJyk7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgICRzdGlja3lOYXYuY2xhc3NMaXN0LnJlbW92ZSgnbmF2LS1oaWRkZW4nKTtcbiAgICB9XG4gICAgaWYgKCRzdGlja3lTaGFyZUJhcikge1xuICAgICAgdmFyIHRocmVzaG9sZCA9ICRmb290ZXJTaGFyZUJhci5vZmZzZXRIZWlnaHQgLyB3aW5kb3cuaW5uZXJIZWlnaHQ7XG4gICAgICBpZiAoaGFzU2Nyb2xsZWRQYXN0KCRmb290ZXJTaGFyZUJhciwgLTEgKiB0aHJlc2hvbGQpKSB7XG4gICAgICAgICRzdGlja3lTaGFyZUJhci5jbGFzc0xpc3QuYWRkKCdoaWRkZW4nKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgICRzdGlja3lTaGFyZUJhci5jbGFzc0xpc3QucmVtb3ZlKCdoaWRkZW4nKTtcbiAgICAgIH1cbiAgICB9XG4gIH07XG5cbiAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3Njcm9sbCcsIGRlYm91bmNlKG9uVG9wKSk7XG4gIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdyZXNpemUnLCBkZWJvdW5jZShvblRvcCkpO1xuXG4gIC8vIENoYW5nZSB3b3JkaW5nIG9uIFwic2lnbiBpblwiIGJ1dHRvbiB3aGVuIHVzZXIgaXMgbG9nZ2VkIGluXG4gIGdldFVzZXJEYXRhKCkudGhlbihmdW5jdGlvbigpIHtcbiAgICBnZXRBbGwoJy5uYXZfX2l0ZW0tLXNpZ24taW4nKS5mb3JFYWNoKGZ1bmN0aW9uKCRzaWduaW4pIHtcbiAgICAgICRzaWduaW4uaW5uZXJIVE1MID0gJ0NyZWF0ZSBhIHN0b3J5JztcbiAgICB9KTtcbiAgfSkuY2F0Y2goZnVuY3Rpb24oKSB7fSk7XG5cbn1cbiIsIi8qKlxuICogSGFuZGxlIHJlc3BvbnNlcyBhbmQgbGlrZXMgaW4gcG9zdHNcbiAqL1xuXG4vLyBEZXBlbmRlbmNpZXNcbmltcG9ydCBnZXRBbGwgZnJvbSAnZHMtYXNzZXRzL2RvbS9nZXQtYWxsJztcbmltcG9ydCBsYXp5SW1hZ2VzIGZyb20gJ2RzLWFzc2V0cy9sYXp5L2ltYWdlcyc7XG5pbXBvcnQgKiBhcyBhcGkgZnJvbSAnLi4vbGliL2FwaSc7XG5pbXBvcnQgZ2V0VXNlckRhdGEgZnJvbSAnLi4vbGliL2dldC1sb2dnZWQtaW4tZGF0YSc7XG5pbXBvcnQgdXNlck1ldGFUZW1wbGF0ZSBmcm9tICcuLi90ZW1wbGF0ZXMvcmVzcG9uc2UtbWV0YSc7XG5pbXBvcnQgcmVzcG9uc2VUZW1wbGF0ZSBmcm9tICcuLi90ZW1wbGF0ZXMvcmVzcG9uc2UnO1xuaW1wb3J0IG9mZnNldFRvcCBmcm9tICdkcy1hc3NldHMvZG9tL2dldC1kb2N1bWVudC1vZmZzZXQtdG9wJztcbmltcG9ydCBsaXZlVmFsaWRhdGlvbiBmcm9tICcuLi9saWIvZm9ybS9saXZlLXZhbGlkYXRpb24nO1xuaW1wb3J0IHZhbGlkYXRlRm9ybSBmcm9tICcuLi9saWIvZm9ybS92YWxpZGF0ZSc7XG5cbi8vIENhY2hlZCBkb20gZWxlbWVudHNcbnZhciAkcmVzcG9uc2VGb3JtO1xudmFyICRjdGE7XG52YXIgJHZhbGlkYXRvcnM7XG52YXIgJHJlc3BvbnNlc0xpc3Q7XG52YXIgcmVuZGVyUmVzcG9uc2VzO1xudmFyIGFkZERlbGV0ZUV2ZW50cztcbnZhciBzZXRSZXNwb25zZXNOdW1iZXI7XG52YXIgYWRkUmVhZE1vcmVFdmVudDtcblxudmFyIHVwZGF0ZVJlc3BvbnNlQ1RBID0gZnVuY3Rpb24odmFsaWQpIHtcblx0aWYgKHZhbGlkKSB7XG5cdFx0JGN0YS5jbGFzc0xpc3QucmVtb3ZlKCdidG4tLWRpc2FibGVkJyk7XG5cdH0gZWxzZSB7XG5cdFx0JGN0YS5jbGFzc0xpc3QuYWRkKCdidG4tLWRpc2FibGVkJyk7XG5cdH1cbn07XG5cbi8qKlxuICogRGVsZXRlIHJlc3BvbnNlIHdoZW4gZGVsZXRlIGljb24gY2xpY2tlZFxuICovXG5hZGREZWxldGVFdmVudHMgPSBmdW5jdGlvbigpIHtcblx0Z2V0QWxsKCcucmVzcG9uc2VfX2RlbGV0ZScpLmZvckVhY2goZnVuY3Rpb24oJGRlbGV0ZSkge1xuXHRcdCRkZWxldGUuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbihlKSB7XG5cdFx0XHRlLnByZXZlbnREZWZhdWx0KCk7XG5cdFx0XHRhcGkucmVtb3ZlUmVzcG9uc2UoJGRlbGV0ZS5kYXRhc2V0LnB1Ymxpc2hlZCwgJGRlbGV0ZS5kYXRhc2V0Lm5hbWUpXG5cdFx0XHRcdC50aGVuKGZ1bmN0aW9uKGRhdGEpIHtcblx0XHRcdFx0XHRyZW5kZXJSZXNwb25zZXMoZGF0YS5yZXNwb25zZXMpO1xuXHRcdFx0XHRcdHNldFJlc3BvbnNlc051bWJlcihkYXRhLnJlc3BvbnNlcyk7XG5cdFx0XHRcdH0pO1xuXHRcdH0pO1xuXHR9KTtcbn07XG5cbi8qKlxuICogRXhwYW5kIHJlc3BvbnNlIHdpdGggZnVsbCB0ZXh0IHdoZW4gcmVhZCBtb3JlIGJ1dHRvbiBpcyBhY3RpdmF0ZWQuXG4gKiBCYXNpY2FsbHkgaXQgaGlkZXMgdGhlIGV4Y2VycHQgYW5kIHRoZSByZWFkIG1vcmUgYnV0dG9uIGFuZCBkaXNwbGF5cyB0aGVcbiAqIGZ1bGwgdGV4dC5cbiAqIEBwYXJhbSB7ZWxlbWVudH0gJHJlc3BvbnNlXG4gKi9cbmFkZFJlYWRNb3JlRXZlbnQgPSBmdW5jdGlvbigkcmVzcG9uc2UpIHtcblx0dmFyICRyZWFkTW9yZSA9ICRyZXNwb25zZS5xdWVyeVNlbGVjdG9yKCcucmVzcG9uc2VfX3JlYWQtbW9yZScpO1xuXHRpZiAoISRyZWFkTW9yZSkge1xuXHRcdHJldHVybjtcblx0fVxuXHQkcmVhZE1vcmUuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbihlKSB7XG5cdFx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xuXHRcdHZhciAkZXhjZXJwdCA9ICRyZXNwb25zZS5xdWVyeVNlbGVjdG9yKCcucmVzcG9uc2VfX2V4Y2VycHQnKTtcblx0XHR2YXIgJHJlYWRNb3JlQ29udGFpbmVyID0gJHJlYWRNb3JlLnBhcmVudE5vZGU7XG5cblx0XHQkcmVhZE1vcmVDb250YWluZXIucGFyZW50Tm9kZS5yZW1vdmVDaGlsZCgkcmVhZE1vcmVDb250YWluZXIpO1xuXHRcdCRleGNlcnB0LnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQoJGV4Y2VycHQpO1xuXG5cdFx0JHJlc3BvbnNlLnF1ZXJ5U2VsZWN0b3IoJy5yZXNwb25zZV9fdGV4dCcpLmNsYXNzTGlzdC5yZW1vdmUoJ2hpZGRlbicpO1xuXHR9KTtcbn07XG5cbi8qKlxuICogUmVuZGVyIHRlbXBsYXRlcyBmb3IgcmVzcG9uc2VzIGFuZCBpbnNlcnQgaHRtbCBpbiB0aGUgcmVzcG9uc2VzIGxpc3QuXG4gKiAtIExhenkgbG9hZCBpbWFnZXMgaW4gcmVzcG9uc2VzXG4gKiAtIEF0dGFjaCBuZXcgZXZlbnRzIGluIHJlc3BvbnNlc1xuICogQHBhcmFtICB7YXJyYXl9IHJlc3BvbnNlc1xuICogQHJldHVybiB7dm9pZH1cbiAqL1xucmVuZGVyUmVzcG9uc2VzID0gZnVuY3Rpb24ocmVzcG9uc2VzKSB7XG5cdHZhciBodG1sID0gJyc7XG5cdHJlc3BvbnNlcy5mb3JFYWNoKGZ1bmN0aW9uKHJlc3BvbnNlKSB7XG5cdFx0aHRtbCArPSByZXNwb25zZVRlbXBsYXRlKHJlc3BvbnNlKTtcblx0fSk7XG5cdCRyZXNwb25zZXNMaXN0LmlubmVySFRNTCA9IGh0bWw7XG5cdGxhenlJbWFnZXMoMSk7XG5cdGFkZERlbGV0ZUV2ZW50cygpO1xuXHRnZXRBbGwoJy5yZXNwb25zZScsICRyZXNwb25zZXNMaXN0KS5mb3JFYWNoKGFkZFJlYWRNb3JlRXZlbnQpO1xufTtcblxuLyoqXG4gKiBVcGRhdGUgdGhlIGNvdW50IG9mIHJlc3BvbnNlc1xuICogQHBhcmFtIHthcnJheX0gcmVzcG9uc2VzXG4gKi9cbnNldFJlc3BvbnNlc051bWJlciA9IGZ1bmN0aW9uKHJlc3BvbnNlcykge1xuXHRnZXRBbGwoJy5zaGFyZV9fcmVzcG9uc2VzJykuZm9yRWFjaChmdW5jdGlvbigkcmVzcG9uc2VzKSB7XG5cdFx0JHJlc3BvbnNlcy5pbm5lckhUTUwgPSByZXNwb25zZXMubGVuZ3RoO1xuXHR9KTtcbn07XG5cbi8qKlxuICogVXBkYXRlIHRoZSBjb3VudCBmbyBsaWtlcyBmb3IgdGhpcyBwb3N0XG4gKiBAcGFyYW0ge251bWJlcn0gbGlrZXNcbiAqL1xudmFyIHNldExpa2VzTnVtYmVyID0gZnVuY3Rpb24obGlrZXMpIHtcblx0Z2V0QWxsKCcuc2hhcmVfX2xpa2VzJykuZm9yRWFjaChmdW5jdGlvbigkbGlrZXMpIHtcblx0XHRpZiAobGlrZXMpIHtcblx0XHRcdCRsaWtlcy5pbm5lckhUTUwgPSBsaWtlcztcblx0XHR9IGVsc2Uge1xuXHRcdFx0JGxpa2VzLmlubmVySFRNTCA9ICRsaWtlcy5pbm5lckhUTUwgKyAxO1xuXHRcdH1cblx0fSk7XG59O1xuXG4vKipcbiAqIEdldCBkYXRhIGZyb20gYXBpIHdpdGggbWV0YSBkYXRhOiByZXNwb25zZXMgYW5kIGxpa2VzLlxuICogUmVuZGVyIHRoaXMgaW4gdGhlIGRvbS5cbiAqIEByZXR1cm4ge3ZvaWR9XG4gKi9cbnZhciByZW5kZXJNZXRhID0gZnVuY3Rpb24oKSB7XG5cdGFwaS5nZXRNZXRhKCkudGhlbihmdW5jdGlvbihkYXRhKSB7XG5cdFx0cmVuZGVyUmVzcG9uc2VzKGRhdGEucmVzcG9uc2VzKTtcblx0XHRzZXRSZXNwb25zZXNOdW1iZXIoZGF0YS5yZXNwb25zZXMpO1xuXHRcdHNldExpa2VzTnVtYmVyKGRhdGEubGlrZXMpO1xuXHR9KTtcbn07XG5cbi8qKlxuICogUG9zdCBuZXcgcmVzcG9uc2UgdG8gcG9zdFxuICogLSBjaGVja3MgZm9yIHZhbGlkYXRpb24gYmVmb3JlIHBvc3RpbmdcbiAqIEBwYXJhbSAge2V2ZW50fSBlXG4gKiBAcmV0dXJuIHt2b2lkfVxuICovXG52YXIgc3VibWl0UmVzcG9uc2UgPSBmdW5jdGlvbihlKSB7XG5cdGUucHJldmVudERlZmF1bHQoKTtcblxuXHR2YXIgbG9nZ2VkSW4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdib2R5JykuY2xhc3NMaXN0LmNvbnRhaW5zKCd1c2VyLWxvZ2dlZC1pbicpO1xuXG5cdC8vIElmIGEgZmllbGQgaXMgbm90IHZhbGlkIHRoaXMgZmllbGQgd2lsbCBnZXQgZm9jdXMsIHNvIHRoZSB1c2VyIHF1aWNrbHkgY2FuIHVwZGF0ZSB0aGUgdmFsdWUuXG5cdHZhciBub3RWYWxpZCA9ICR2YWxpZGF0b3JzLnNvbWUoZnVuY3Rpb24oJHZhbGlkYXRvcikge1xuXHRcdGlmICgkdmFsaWRhdG9yLmNsYXNzTGlzdC5jb250YWlucygndmFsaWRhdGUtLW5vdC12YWxpZCcpKSB7XG5cdFx0XHR2YXIgJHZhbGlkYXRlRmllbGQgPSAkdmFsaWRhdG9yLnF1ZXJ5U2VsZWN0b3IoJ2lucHV0LCB0ZXh0YXJlYScpO1xuXHRcdFx0JHZhbGlkYXRlRmllbGQuZm9jdXMoKTtcblx0XHRcdHJldHVybiB0cnVlO1xuXHRcdH1cblx0fSk7XG5cblx0aWYgKG5vdFZhbGlkKSB7XG5cdFx0cmV0dXJuO1xuXHR9XG5cblx0Ly8gQ3JlYXRlIGEgcmVzcG9uc2Ugb2JqZWN0IGJhc2VkIG9uIHZhbHVlcyBpbiBmb3JtXG5cdHZhciByZXNwb25zZSA9IHt9O1xuXHRnZXRBbGwoJ2lucHV0LCB0ZXh0YXJlYScsICRyZXNwb25zZUZvcm0pLmZvckVhY2goZnVuY3Rpb24oJGZpZWxkKSB7XG5cdFx0dmFyIG5hbWUgPSAkZmllbGQuZ2V0QXR0cmlidXRlKCduYW1lJyk7XG5cdFx0aWYgKCRmaWVsZC52YWx1ZSkge1xuXHRcdFx0cmVzcG9uc2VbbmFtZV0gPSAkZmllbGQudmFsdWU7XG5cdFx0fVxuXHR9KTtcblxuXHQkY3RhLmlubmVySFRNTCA9ICdQb3N0aW5nLi4uJztcblx0JGN0YS5jbGFzc0xpc3QuYWRkKCdidG4tLWRpc2FibGVkJyk7XG5cdGFwaS5hZGRSZXNwb25zZShyZXNwb25zZSkudGhlbihmdW5jdGlvbihkYXRhKSB7XG5cdFx0cmVuZGVyUmVzcG9uc2VzKGRhdGEucmVzcG9uc2VzKTtcblx0XHRzZXRSZXNwb25zZXNOdW1iZXIoZGF0YS5yZXNwb25zZXMpO1xuXG5cdFx0Ly8gU2Nyb2xsIHRvIG5ldyByZXNwb25zZVxuXHRcdHZhciAkbGFzdFJlc3BvbnNlID0gJHJlc3BvbnNlc0xpc3QucXVlcnlTZWxlY3RvcignLnJlc3BvbnNlOmxhc3QtY2hpbGQnKTtcblx0XHR2YXIgb2Zmc2V0ID0gb2Zmc2V0VG9wKCRsYXN0UmVzcG9uc2UpO1xuXHRcdHdpbmRvdy5zY3JvbGxUbygwLCBvZmZzZXQgLSAoMC41ICogd2luZG93LmlubmVySGVpZ2h0KSk7XG5cblx0XHQvLyBSZXNldCBmb3JtXG5cdFx0JGN0YS5pbm5lckhUTUwgPSAnUmVzcG9uZCc7XG5cdFx0aWYgKGxvZ2dlZEluKSB7XG5cdFx0XHR2YXIgJHRleHQgPSAkcmVzcG9uc2VGb3JtLnF1ZXJ5U2VsZWN0b3IoJy5yZXNwb25zZXMtZm9ybV9fdGV4dCcpO1xuXHRcdFx0JHRleHQuY2xhc3NMaXN0LmFkZCgndmFsaWRhdGUtLW5vdC12YWxpZCcpO1xuXHRcdFx0JHRleHQuY2xhc3NMaXN0LnJlbW92ZSgndmFsaWRhdGUtLXZhbGlkJyk7XG5cdFx0XHQkdGV4dC5xdWVyeVNlbGVjdG9yKCd0ZXh0YXJlYScpLnZhbHVlID0gJyc7XG5cdFx0XHQkdGV4dC5xdWVyeVNlbGVjdG9yKCcucGxhY2Vob2xkZXInKS5jbGFzc0xpc3QucmVtb3ZlKCdwbGFjZWhvbGRlci0tbm90LWVtcHR5Jyk7XG5cdFx0fSBlbHNlIHtcblx0XHRcdCR2YWxpZGF0b3JzLmZvckVhY2goZnVuY3Rpb24oJHZhbGlkYXRvcikge1xuXHRcdFx0XHRpZiAoJHZhbGlkYXRvci5kYXRhc2V0LnZhbGlkYXRlUmVxdWlyZWQgIT09IHVuZGVmaW5lZCkge1xuXHRcdFx0XHRcdCR2YWxpZGF0b3IuY2xhc3NMaXN0LmFkZCgndmFsaWRhdGUtLW5vdC12YWxpZCcpO1xuXHRcdFx0XHRcdCR2YWxpZGF0b3IuY2xhc3NMaXN0LnJlbW92ZSgndmFsaWRhdGUtLXZhbGlkJyk7XG5cdFx0XHRcdH1cblx0XHRcdFx0JHZhbGlkYXRvci5xdWVyeVNlbGVjdG9yKCdpbnB1dCwgdGV4dGFyZWEnKS52YWx1ZSA9ICcnO1xuXHRcdFx0XHQkdmFsaWRhdG9yLnF1ZXJ5U2VsZWN0b3IoJy5wbGFjZWhvbGRlcicpLmNsYXNzTGlzdC5yZW1vdmUoJ3BsYWNlaG9sZGVyLS1ub3QtZW1wdHknKTtcblx0XHRcdH0pO1xuXHRcdH1cblx0fSk7XG5cbn07XG5cbi8qKlxuICogVXBkYXRlIGhlYXJ0IChsaWtlKSBpY29ucyB0byBpbmRpY2F0ZSwgdGhhdCB0aGUgdXNlciBoYXZlIGxpa2VkIHRoZSBhcnRpY2xlXG4gKiBAcmV0dXJuIHt2b2lkfVxuICovXG52YXIgbGlrZWQgPSBmdW5jdGlvbigpIHtcblx0dmFyICR0b29sVGlwSWNvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy50b29sLXRpcF9fbGlrZS1pY29uJyk7XG5cdCR0b29sVGlwSWNvbi5zZXRBdHRyaWJ1dGUoJ3NyYycsICcvYXNzZXRzL2ltYWdlcy9oZWFydC0taW52ZXJzZS0tYWN0aXZlLnN2ZycpO1xuXHQkdG9vbFRpcEljb24uc2V0QXR0cmlidXRlKCdkYXRhLXNyYycsICcvYXNzZXRzL2ltYWdlcy9oZWFydC0taW52ZXJzZS0tYWN0aXZlLnN2ZycpO1xuXG5cdGdldEFsbCgnLnBvc3QtZm9vdGVyX19saWtlLWljb24nKS5mb3JFYWNoKGZ1bmN0aW9uKCRmb290ZXJJY29uKSB7XG5cdFx0JGZvb3Rlckljb24uc2V0QXR0cmlidXRlKCdzcmMnLCAnL2Fzc2V0cy9pbWFnZXMvaGVhcnQtLWludmVyc2UtLWFjdGl2ZS5zdmcnKTtcblx0XHQkZm9vdGVySWNvbi5zZXRBdHRyaWJ1dGUoJ2RhdGEtc3JjJywgJy9hc3NldHMvaW1hZ2VzL2hlYXJ0LS1pbnZlcnNlLS1hY3RpdmUuc3ZnJyk7XG5cdH0pO1xuXG5cdC8vIEluZGljYXRlcywgdGhhdCB0aGUgbGlrZSBidXR0b24gbm8gbG9uZ2VyIGlzIGNsaWNrYWJsZVxuXHRnZXRBbGwoJy5zaGFyZV9fbGlrZScpLmZvckVhY2goJGxpa2UgPT4gJGxpa2UuY2xhc3NMaXN0LmFkZCgnZGlzYWJsZWQnKSk7XG59O1xuXG4vKipcbiAqIEFjdGl2YXRlIGxpa2UsIHdoZW4gbGlrZSBidXR0b25zIGFyZSBjbGlja2VkXG4gKiBAcGFyYW0gIHtlbGVtZW50fSAkYW5jaG9yXG4gKiBAcmV0dXJuIHt2b2lkfVxuICovXG52YXIgYXR0YWNoTGlrZUV2ZW50ID0gZnVuY3Rpb24oJGFuY2hvcikge1xuXHQkYW5jaG9yLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24oZSkge1xuXHRcdGUucHJldmVudERlZmF1bHQoKTtcblxuXHRcdC8vIEFscmVhZHkgbGlrZWQgdGhpcyBhcnRpY2xlXG5cdFx0aWYgKGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdsaWtlOicgKyB3aW5kb3cucG9zdElkKSkge1xuXHRcdFx0cmV0dXJuO1xuXHRcdH1cblxuXHRcdGxvY2FsU3RvcmFnZS5zZXRJdGVtKCdsaWtlOicgKyB3aW5kb3cucG9zdElkLCB0cnVlKTtcblx0XHRsaWtlZCgpO1xuXHRcdHNldExpa2VzTnVtYmVyKCk7XG5cblx0XHRhcGkubGlrZSgpLnRoZW4oZnVuY3Rpb24oZGF0YSkge1xuXHRcdFx0c2V0TGlrZXNOdW1iZXIoZGF0YS5saWtlcyk7XG5cdFx0fSk7XG5cdH0pO1xufTtcblxuLyoqXG4gKiBVcGRhdGUgcmVzcG9uc2VzIGZvcm0gaWYgdXNlciBpcyBsb2dnZWQgaW4uXG4gKiBVc2VyIGRvIG5vdCBuZWVkIHRvIGZpbGwgZS1tYWlsLCBuYW1lIGV0Yy5cbiAqIEBwYXJhbSAge29iamVjdH0gZGF0YVxuICogQHJldHVybiB7dm9pZH1cbiAqL1xudmFyIHJlbmRlclVzZXJGb3JtID0gZnVuY3Rpb24odXNlcikge1xuXHR2YXIgaHRtbCA9IHVzZXJNZXRhVGVtcGxhdGUodXNlcik7XG5cdHZhciAkbWV0YSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuXHQkbWV0YS5pbm5lckhUTUwgPSBodG1sO1xuXHR2YXIgJGhlYWRlciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5yZXNwb25zZXNfX2Zvcm0gaDMnKTtcblxuXHQvLyBGaWxsIGlucHV0IGZpZWxkcyB3aXRoIHJlbGV2YW50IGRhdGFcblx0Z2V0QWxsKCcucmVzcG9uc2VzX19mb3JtIGlucHV0JykuZm9yRWFjaChmdW5jdGlvbigkaW5wdXQpIHtcblx0XHR2YXIgbmFtZSA9ICRpbnB1dC5nZXRBdHRyaWJ1dGUoJ25hbWUnKTtcblx0XHRpZiAobmFtZSA9PT0gJ3dlYnNpdGUnKSB7XG5cdFx0XHQkaW5wdXQudmFsdWUgPSAnL2F1dGhvci8nICsgdXNlci5zbHVnO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHQkaW5wdXQudmFsdWUgPSB1c2VyW25hbWVdO1xuXHRcdH1cblx0XHQkaW5wdXQucGFyZW50Tm9kZS5jbGFzc0xpc3QuYWRkKCd2YWxpZGF0ZS0tdmFsaWQnKTtcblx0XHQkaW5wdXQucGFyZW50Tm9kZS5jbGFzc0xpc3QucmVtb3ZlKCd2YWxpZGF0ZS0tbm90LXZhbGlkJyk7XG5cdH0pO1xuXG5cdC8vIEluc2VydCBhZnRlciBoZWFkZXJcblx0JGhlYWRlci5wYXJlbnROb2RlLmluc2VydEJlZm9yZSgkbWV0YSwgJGhlYWRlci5uZXh0U2libGluZyk7XG5cdGxhenlJbWFnZXMoMSk7XG5cdHZhbGlkYXRlRm9ybSgkdmFsaWRhdG9ycywgdXBkYXRlUmVzcG9uc2VDVEEpO1xufTtcblxuLyoqXG4gKiBJbml0IHJlc3BvbnNlc1xuICogQHJldHVybiB7dm9pZH1cbiAqL1xuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24oKSB7XG5cdCRyZXNwb25zZUZvcm0gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucmVzcG9uc2VzX19mb3JtJyk7XG5cblx0aWYgKCEkcmVzcG9uc2VGb3JtKSB7XG5cdFx0cmV0dXJuO1xuXHR9XG5cblx0Ly8gQ2FjaGUgZG9tIGVsZW1lbnRzXG5cdCRjdGEgPSAkcmVzcG9uc2VGb3JtLnF1ZXJ5U2VsZWN0b3IoJy5idG4tLWN0YScpO1xuXHQkcmVzcG9uc2VzTGlzdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5yZXNwb25zZXNfX2xpc3QnKTtcblx0JHZhbGlkYXRvcnMgPSBnZXRBbGwoJy52YWxpZGF0ZScsICRyZXNwb25zZUZvcm0pO1xuXG5cdC8vIFVwZGF0ZSBmcm9tIGFzIHVzZXIgdHlwZXNcblx0bGl2ZVZhbGlkYXRpb24oJHZhbGlkYXRvcnMsIHVwZGF0ZVJlc3BvbnNlQ1RBKTtcblxuXHQvLyBSZW5kZXIgcmVzcG9uc2VzIGFuZCBsaWtlXG5cdHJlbmRlck1ldGEoKTtcblxuXHQvLyBDaGFuZ2UgZm9ybSBpZiB1c2VyIGlzIGxvZ2dlZCBpblxuXHRnZXRVc2VyRGF0YSgpLnRoZW4ocmVuZGVyVXNlckZvcm0pLmNhdGNoKGZ1bmN0aW9uKCkge30pO1xuXG5cdC8vIFVzZXIgYWxyZWFkeSBsaWtlcyB0aGlzIGFydGljbGVcblx0aWYgKGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdsaWtlOicgKyB3aW5kb3cucG9zdElkKSkge1xuXHRcdGxpa2VkKCk7XG5cdH1cblxuXHRnZXRBbGwoJy5zaGFyZV9fbGlrZScpLmZvckVhY2goYXR0YWNoTGlrZUV2ZW50KTtcblx0JGN0YS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHN1Ym1pdFJlc3BvbnNlKTtcblxuXHQvLyBTaG93IG1hcmtkb3duIGhlbHBlcnNcblx0ZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnJlc3BvbnNlLWZvcm1fX21hcmtkb3duLWV4cGFuZGVyJykuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbihlKSB7XG5cdFx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xuXHRcdGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5yZXNwb25zZS1mb3JtX19tYXJrZG93bi1oZWxwZXJzJykuY2xhc3NMaXN0LnJlbW92ZSgnaGlkZGVuJyk7XG5cdH0pO1xuXG5cdGdldEFsbCgnLnBsYWNlaG9sZGVyJykuZm9yRWFjaChmdW5jdGlvbigkcGxhY2Vob2xkZXIpIHtcblx0XHR2YXIgJGlucHV0ID0gJHBsYWNlaG9sZGVyLnBhcmVudE5vZGUucXVlcnlTZWxlY3RvcignaW5wdXQsIHRleHRhcmVhJyk7XG5cblx0XHQkcGxhY2Vob2xkZXIuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbigpIHtcblx0XHRcdCRpbnB1dC5mb2N1cygpO1xuXHRcdH0pO1xuXG5cdFx0JGlucHV0LmFkZEV2ZW50TGlzdGVuZXIoJ2lucHV0JywgZnVuY3Rpb24oKSB7XG5cdFx0XHRpZiAoJGlucHV0LnZhbHVlID09PSAnJykge1xuXHRcdFx0XHQkcGxhY2Vob2xkZXIuY2xhc3NMaXN0LnJlbW92ZSgncGxhY2Vob2xkZXItLW5vdC1lbXB0eScpO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0JHBsYWNlaG9sZGVyLmNsYXNzTGlzdC5hZGQoJ3BsYWNlaG9sZGVyLS1ub3QtZW1wdHknKTtcblx0XHRcdH1cblx0XHR9KTtcblx0fSk7XG5cbn1cbiIsImltcG9ydCBsYXp5SW1hZ2VzIGZyb20gJ2RzLWFzc2V0cy9sYXp5L2ltYWdlcyc7XG5pbXBvcnQgZ2V0QWxsIGZyb20gJ2RzLWFzc2V0cy9kb20vZ2V0LWFsbCc7XG5pbXBvcnQgKiBhcyBhcGkgZnJvbSAnLi4vbGliL2FwaSc7XG5pbXBvcnQgcG9zdFRlbXBsYXRlIGZyb20gJy4uL3RlbXBsYXRlcy9wb3N0JztcbmltcG9ydCBhdXRob3JUZW1wbGF0ZSBmcm9tICcuLi90ZW1wbGF0ZXMvYXV0aG9yJztcbmltcG9ydCB0YWdUZW1wbGF0ZSBmcm9tICcuLi90ZW1wbGF0ZXMvdGFnJztcblxuY29uc3QgTUFYX1JFU1VMVFMgPSAxMDtcblxudmFyICRzZWFyY2hJbnB1dDtcbnZhciAkc2VhcmNoTGlzdDtcbnZhciBsYXRlc3RDb3VudGVyID0gMDtcblxudmFyIGdldFNlYXJjaFJlc3VsdCA9IGZ1bmN0aW9uKHBhdGgpIHtcblx0dmFyIGFic29sdXRlID0gd2luZG93Lmdob3N0LnVybC5hcGkocGF0aCwge1xuXHRcdGluY2x1ZGU6ICd0YWdzLGF1dGhvcixjb3VudC5wb3N0cydcblx0fSk7XG5cdHZhciByZWxhdGl2ZSA9IGFic29sdXRlLnN1YnN0cihhYnNvbHV0ZS5pbmRleE9mKCcvZ2hvc3QnKSwgYWJzb2x1dGUubGVuZ3RoKTtcblx0cmV0dXJuIGZldGNoKHJlbGF0aXZlKVxuXHRcdC50aGVuKGZ1bmN0aW9uKHJlc3BvbnNlKSB7XG5cdFx0XHRpZiAocmVzcG9uc2Uuc3RhdHVzID49IDMwMCkge1xuXHRcdFx0XHRyZXR1cm4gUHJvbWlzZS5yZWplY3QocmVzcG9uc2UpO1xuXHRcdFx0fVxuXHRcdFx0cmV0dXJuIHJlc3BvbnNlO1xuXHRcdH0pXG5cdFx0LnRoZW4ocmVzcG9uc2UgPT4gcmVzcG9uc2UuanNvbigpKTtcbn07XG5cbnZhciByZW5kZXJSZXN1bHRzID0gZnVuY3Rpb24ocmVzdWx0cykge1xuXHR2YXIgaHRtbCA9IHJlc3VsdHMubWFwKGZ1bmN0aW9uKHJlc3VsdCkge1xuXHRcdGlmIChyZXN1bHQucG9zdHMpIHtcblx0XHRcdHJldHVybiBwb3N0VGVtcGxhdGUocmVzdWx0LnBvc3RzWzBdKTtcblx0XHR9XG5cdFx0aWYgKHJlc3VsdC51c2Vycykge1xuXHRcdFx0cmV0dXJuIGF1dGhvclRlbXBsYXRlKHJlc3VsdC51c2Vyc1swXSk7XG5cdFx0fVxuXHRcdGlmIChyZXN1bHQudGFncykge1xuXHRcdFx0cmV0dXJuIHRhZ1RlbXBsYXRlKHJlc3VsdC50YWdzWzBdKTtcblx0XHR9XG5cdFx0cmV0dXJuICcnO1xuXHR9KS5qb2luKCcnKTtcblx0JHNlYXJjaExpc3QuaW5uZXJIVE1MID0gaHRtbDtcblx0bGF6eUltYWdlcygxKTtcblx0Z2V0QWxsKCcuYm94ZXNfX2l0ZW0nLCAkc2VhcmNoTGlzdCkuZm9yRWFjaChmdW5jdGlvbigkYm94SXRlbSwgaSkge1xuXHRcdHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XG5cdFx0XHQkYm94SXRlbS5jbGFzc0xpc3QucmVtb3ZlKCdoaWRkZW4nKTtcblx0XHRcdHNldFRpbWVvdXQoKCkgPT4gJGJveEl0ZW0uY2xhc3NMaXN0LmFkZCgnYW5pbWF0ZS0tYWN0aXZlJyksIDApO1xuXHRcdH0sIGkgKiA1MDApO1xuXHR9KTtcbn07XG5cbnZhciBzZWFyY2ggPSBmdW5jdGlvbihxdWVyeSkge1xuXG5cdHZhciBpZCA9ICsrbGF0ZXN0Q291bnRlcjtcblx0dmFyIG1pblRpbWUgPSBEYXRlLm5vdygpICsgMzAwO1xuXG5cdCRzZWFyY2hMaXN0LmlubmVySFRNTCA9ICcnO1xuXG5cdHZhciBpc0xhdGVzdCA9IGZ1bmN0aW9uKGRhdGEpIHtcblx0XHRpZiAoaWQgIT09IGxhdGVzdENvdW50ZXIpIHtcblx0XHRcdHJldHVybiBQcm9taXNlLnJlamVjdCgpO1xuXHRcdH1cblx0XHRyZXR1cm4gZGF0YTtcblx0fTtcblxuXHRhcGkuZ2V0U2VhcmNoSW5kZXgocXVlcnkpXG5cdFx0LnRoZW4oaXNMYXRlc3QpXG5cdFx0LnRoZW4oZnVuY3Rpb24oaW5kZXhlcykge1xuXHRcdFx0dmFyIHByb21pc2VzID0gaW5kZXhlcy5zbGljZSgwLCBNQVhfUkVTVUxUUykubWFwKGZ1bmN0aW9uKGluZGV4KSB7XG5cdFx0XHRcdHJldHVybiBnZXRTZWFyY2hSZXN1bHQoaW5kZXgucmVmKTtcblx0XHRcdH0pO1xuXHRcdFx0cmV0dXJuIFByb21pc2UuYWxsKHByb21pc2VzKTtcblx0XHR9KVxuXHRcdC50aGVuKGZ1bmN0aW9uKGRhdGEpIHtcblx0XHRcdGlmIChtaW5UaW1lIDwgRGF0ZS5ub3coKSkge1xuXHRcdFx0XHRyZXR1cm4gZGF0YTtcblx0XHRcdH1cblx0XHRcdHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbihyZXNvbHZlKSB7XG5cdFx0XHRcdHNldFRpbWVvdXQoKCkgPT4gcmVzb2x2ZShkYXRhKSwgbWluVGltZSAtIERhdGUubm93KCkpO1xuXHRcdFx0fSk7XG5cdFx0fSlcblx0XHQudGhlbihpc0xhdGVzdClcblx0XHQudGhlbihyZW5kZXJSZXN1bHRzKVxuXHRcdC5jYXRjaChmdW5jdGlvbihlcnIpIHtcblx0XHRcdGlmIChlcnIpIHtcblx0XHRcdFx0Y29uc29sZS5lcnJvcihlcnIpO1xuXHRcdFx0fVxuXHRcdH0pO1xufTtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24oKSB7XG5cblx0JHNlYXJjaElucHV0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnNlYXJjaF9faW5wdXQnKTtcblx0JHNlYXJjaExpc3QgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuc2VhcmNoX19saXN0Jyk7XG5cblx0aWYgKCEkc2VhcmNoSW5wdXQgfHwgISRzZWFyY2hMaXN0KSB7XG5cdFx0cmV0dXJuO1xuXHR9XG5cdCRzZWFyY2hJbnB1dC5hZGRFdmVudExpc3RlbmVyKCdpbnB1dCcsIGZ1bmN0aW9uKCkge1xuXHRcdHNlYXJjaCgkc2VhcmNoSW5wdXQudmFsdWUpO1xuXHR9KTtcblxuXHQkc2VhcmNoSW5wdXQuZm9jdXMoKTtcblxuXHQkc2VhcmNoTGlzdC5zZXRBdHRyaWJ1dGUoJ3N0eWxlJywgYG1pbi1oZWlnaHQ6ICR7d2luZG93LmlubmVySGVpZ2h0fXB4YCk7XG5cbn1cbiIsIi8qKlxuICogVG9vbCB0aXAgc2hvd2VkIHdoZW4gdXNlciBtYXJrcyB0ZXh0IGluIGFydGljbGUuXG4gKiBUaGlzIG1ha2VzIHRoZSB1c2UgYWJsZSB0byBzaGFyZS9jb21tZW50IG9uIHRoZSBtYXJrZWQuXG4gKi9cblxuaW1wb3J0IHZhbGlkYXRlRm9ybSBmcm9tICcuLi9saWIvZm9ybS92YWxpZGF0ZSc7XG5pbXBvcnQgZ2V0QWxsIGZyb20gJ2RzLWFzc2V0cy9kb20vZ2V0LWFsbCc7XG5cbi8vIENhY2hlZCBkb20gZWxlbWVudHNcbnZhciAkcG9zdENvbnRlbnQ7XG52YXIgJHRvb2xUaXA7XG52YXIgJHR3aXR0ZXI7XG52YXIgJHJlc3BvbnNlRm9ybTtcbnZhciAkY3RhO1xuXG5cbi8qKlxuICogR2V0IHRoZSB0ZXh0IHNlbGVjdGVkIGJ5IHRoZSB1c2VyXG4gKiBAcmV0dXJuIHtzdHJpbmd9XG4gKi9cbnZhciBnZXRTZWxlY3RlZFRleHQgPSBmdW5jdGlvbigpIHtcblx0dmFyIHRleHQgPSAnJztcblx0aWYgKHR5cGVvZiB3aW5kb3cuZ2V0U2VsZWN0aW9uICE9PSAndW5kZWZpbmVkJykge1xuXHRcdHRleHQgPSB3aW5kb3cuZ2V0U2VsZWN0aW9uKCkudG9TdHJpbmcoKTtcblx0fSBlbHNlIGlmICh0eXBlb2YgZG9jdW1lbnQuc2VsZWN0aW9uICE9PSAndW5kZWZpbmVkJyAmJiBkb2N1bWVudC5zZWxlY3Rpb24udHlwZSA9PT0gJ1RleHQnKSB7XG5cdFx0dGV4dCA9IGRvY3VtZW50LnNlbGVjdGlvbi5jcmVhdGVSYW5nZSgpLnRleHQ7XG5cdH1cblx0cmV0dXJuIHRleHQ7XG59O1xuXG4vKipcbiAqIENoZWNrIGlmIHRoZSBzZWxlY3RlZCB0ZXh0IGlzIGluc2lkZSB0aGUgY29udGVudCBjb250YWluZXJcbiAqIEBwYXJhbSAge29iamVjdH0gIHNlbGVjdGlvblxuICogQHJldHVybiB7Qm9vbGVhbn1cbiAqL1xudmFyIGlzSW5zaWRlQ29udGVudCA9IGZ1bmN0aW9uKHNlbGVjdGlvbikge1xuXHR2YXIgJGNvbnRhaW5lciA9IHNlbGVjdGlvbi5hbmNob3JOb2RlLnBhcmVudEVsZW1lbnQ7XG5cblx0d2hpbGUgKCRjb250YWluZXIgIT09ICRwb3N0Q29udGVudCAmJiAkY29udGFpbmVyLnBhcmVudE5vZGUpIHtcblx0XHQkY29udGFpbmVyID0gJGNvbnRhaW5lci5wYXJlbnROb2RlO1xuXHR9XG5cblx0cmV0dXJuICgkY29udGFpbmVyID09PSAkcG9zdENvbnRlbnQpO1xuXG59O1xuXG4vKipcbiAqIFBsYWNlcyB0aGUgdG9vbCB0aXAgYWJvdmUgdGhlIHNlbGVjdGVkIHRleHRcbiAqIEByZXR1cm4ge3ZvaWR9XG4gKi9cbnZhciBwbGFjZVRvb2xUaXAgPSBmdW5jdGlvbigpIHtcblxuXHQvLyBUaW1lb3V0IHRvIG1ha2Ugc3VyZSB0aGUgdGV4dCBoYXMgYmVlbiBzZWxlY3RlZFxuXHRzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xuXG5cdFx0dmFyIGhpZ2hsaWdodGVkVGV4dCA9IGdldFNlbGVjdGVkVGV4dCgpO1xuXG5cdFx0Ly8gSGlkZSB0b29sIHRpcCBpZiBub3RoaW5nIGlzIHNlbGVjdGVkXG5cdFx0aWYgKCFoaWdobGlnaHRlZFRleHQpIHtcblx0XHRcdCR0b29sVGlwLmNsYXNzTGlzdC5yZW1vdmUoJ3Rvb2wtdGlwLS12aXNpYmxlJyk7XG5cdFx0XHRyZXR1cm47XG5cdFx0fVxuXG5cdFx0Ly8gRGlzcGxheSB0b29sIHRpcCBpZiBzZWxlY3Rpb24gaXMgaW5zaWRlIHRoZSBjb250ZW50IGNvbnRhaW5lclxuXHRcdHZhciBzZWxlY3Rpb24gPSB3aW5kb3cuZ2V0U2VsZWN0aW9uKCk7XG5cdFx0aWYgKCFpc0luc2lkZUNvbnRlbnQoc2VsZWN0aW9uKSkge1xuXHRcdFx0JHRvb2xUaXAuY2xhc3NMaXN0LnJlbW92ZSgndG9vbC10aXAtLXZpc2libGUnKTtcblx0XHRcdHJldHVybjtcblx0XHR9XG5cblx0XHQvLyBDaGFuZ2UgY29udGV4dHVhbCBhY3Rpb25zXG5cdFx0JHR3aXR0ZXIuc2V0QXR0cmlidXRlKCdocmVmJywgYGh0dHBzOi8vdHdpdHRlci5jb20vaW50ZW50L3R3ZWV0P3RleHQ9JHtlbmNvZGVVUklDb21wb25lbnQoaGlnaGxpZ2h0ZWRUZXh0KX0mdXJsPSR7ZW5jb2RlVVJJQ29tcG9uZW50KCR0d2l0dGVyLmRhdGFzZXQudXJsKX1gKTtcblxuXHRcdC8vIFNob3cgYW5kIHBsYWNlIHRvb2wgdGlwXG5cdFx0dmFyIHNjcm9sbFBvc2l0aW9uID0gKHdpbmRvdy5zY3JvbGxZIHx8IGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5zY3JvbGxUb3ApO1xuXHRcdHZhciByYW5nZSA9IHNlbGVjdGlvbi5nZXRSYW5nZUF0KDApO1xuXHRcdHZhciByZWN0ID0gcmFuZ2UuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG5cdFx0JHRvb2xUaXAuc3R5bGUudG9wID0gKHJlY3QudG9wICsgc2Nyb2xsUG9zaXRpb24pICsgJ3B4Jztcblx0XHQkdG9vbFRpcC5jbGFzc0xpc3QuYWRkKCd0b29sLXRpcC0tdmlzaWJsZScpO1xuXHRcdCR0b29sVGlwLnN0eWxlLmxlZnQgPSAoMC41ICogcmVjdC5sZWZ0ICsgMC41ICogcmVjdC5yaWdodCAtIDAuNSAqICR0b29sVGlwLmNsaWVudFdpZHRoKSArICdweCc7XG5cdH0sIDEwKTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uKCkge1xuXHQkcG9zdENvbnRlbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuY29udGVudCcpO1xuXHQkdG9vbFRpcCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy50b29sLXRpcCcpO1xuXG5cdGlmICghJHBvc3RDb250ZW50IHx8ICEkdG9vbFRpcCkge1xuXHRcdHJldHVybjtcblx0fVxuXG5cdCRyZXNwb25zZUZvcm0gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucmVzcG9uc2VzX19mb3JtJyk7XG5cdCRjdGEgPSAkcmVzcG9uc2VGb3JtLnF1ZXJ5U2VsZWN0b3IoJy5idG4tLWN0YScpO1xuXG5cdCR0d2l0dGVyID0gJHRvb2xUaXAucXVlcnlTZWxlY3RvcignLnRvb2wtdGlwX190d2l0dGVyJyk7XG5cblx0ZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignbW91c2V1cCcsIHBsYWNlVG9vbFRpcCk7XG5cdGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2tleXVwJywgcGxhY2VUb29sVGlwKTtcblxuXHQvLyBGaWxsIGZvcm0gd2l0aCBzZWxlY3RlZCB0ZXh0IHRvIG1ha2UgYSBxdWljayByZXNwb25zZSBvbiB0aGUgYXJ0aWNsZSBieVxuXHQvLyB0aGUgdXNlclxuXHR2YXIgJHJlc3BvbnNlVGV4dCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5yZXNwb25zZXNfX2Zvcm0gdGV4dGFyZWEnKTtcblx0JHRvb2xUaXAucXVlcnlTZWxlY3RvcignLnRvb2wtdGlwX19yZXNwb25zZScpLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24oZSkge1xuXHRcdGUucHJldmVudERlZmF1bHQoKTtcblx0XHR2YXIgaGlnaGxpZ2h0ZWRUZXh0ID0gZ2V0U2VsZWN0ZWRUZXh0KCk7XG5cdFx0JHJlc3BvbnNlVGV4dC52YWx1ZSA9IGA+ICR7aGlnaGxpZ2h0ZWRUZXh0fVxuXG5gO1xuXHRcdCRyZXNwb25zZVRleHQuZm9jdXMoKTtcblx0XHQkcmVzcG9uc2VUZXh0LnBhcmVudE5vZGUuY2xhc3NMaXN0LmFkZCgndmFsaWRhdGUtLXZhbGlkJyk7XG5cdFx0JHJlc3BvbnNlVGV4dC5wYXJlbnROb2RlLmNsYXNzTGlzdC5yZW1vdmUoJ3ZhbGlkYXRlLS1ub3QtdmFsaWQnKTtcblx0XHQkcmVzcG9uc2VUZXh0LnBhcmVudE5vZGUucXVlcnlTZWxlY3RvcignLnBsYWNlaG9sZGVyJykuY2xhc3NMaXN0LmFkZCgncGxhY2Vob2xkZXItLW5vdC1lbXB0eScpO1xuXHRcdHZhciB2YWxpZCA9IHZhbGlkYXRlRm9ybShnZXRBbGwoJy52YWxpZGF0ZScsICRyZXNwb25zZUZvcm0pKTtcblx0XHRpZiAodmFsaWQpIHtcblx0XHRcdCRjdGEuY2xhc3NMaXN0LnJlbW92ZSgnYnRuLS1kaXNhYmxlZCcpO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHQkY3RhLmNsYXNzTGlzdC5hZGQoJ2J0bi0tZGlzYWJsZWQnKTtcblx0XHR9XG5cdH0pO1xufVxuIiwiLyoqXG4gKiBIZWxwZXJzIGZvciBjb21tdW5pY2F0aW5nIHdpdGggdGhlIG1ldGEgYXBpIGhvbGRpbmcgcmVzcG9uc2VzIGFuZCBsaWtlcyBmb3JcbiAqIHRoZSBhcnRpY2xlcy5cbiAqL1xuXG52YXIgYXBpVXJsID0gd2luZG93LmFwaVVSTDtcbnZhciBpZCA9IHdpbmRvdy5wb3N0SWQ7XG5cbi8qKlxuICogTWFrZSBhIEFKQVggY2FsbCB0byB0aGUgYXBpXG4gKiBAcGFyYW0gIHtTdHJpbmd9IHBhdGhcbiAqIEBwYXJhbSAge1N0cmluZ30gbWV0aG9kXG4gKiBAcGFyYW0gIHtvYmplY3R9IGRhdGFcbiAqIEByZXR1cm4ge1Byb21pc2V9XG4gKi9cbnZhciByZXF1ZXN0ID0gZnVuY3Rpb24ocGF0aCA9ICcnLCBtZXRob2QgPSAnR0VUJywgZGF0YSA9IG51bGwpIHtcblxuICB2YXIgZmV0Y2hPcHRpb25zID0ge1xuICAgIG1ldGhvZCxcbiAgICBoZWFkZXJzOiB7XG4gICAgICAnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL2pzb247IGNoYXJzZXQ9dXRmLTgnXG4gICAgfVxuICB9O1xuXG4gIGlmIChkYXRhKSB7XG4gICAgZmV0Y2hPcHRpb25zLmJvZHkgPSBKU09OLnN0cmluZ2lmeShkYXRhKTtcbiAgfVxuXG4gIC8vIFBlcmZvcm0gdGhlIGFqYXggY2FsbFxuICByZXR1cm4gZmV0Y2goYXBpVXJsICsgcGF0aCwgZmV0Y2hPcHRpb25zKVxuICAgIC50aGVuKGZ1bmN0aW9uKHJlc3BvbnNlKSB7XG4gICAgICBpZiAocmVzcG9uc2Uuc3RhdHVzID49IDMwMCkge1xuICAgICAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QocmVzcG9uc2UpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHJlc3BvbnNlO1xuICAgIH0pXG4gICAgLnRoZW4ocmVzcG9uc2UgPT4gcmVzcG9uc2UuanNvbigpKTtcbn07XG5cbi8qKlxuICogR2V0IG1ldGEgZGF0YSBmcm9tIHRoZSBhcnRpY2xlLiBJZiBubyBtZXRhIGRhdGEgaXMgcHJlc2VudCBmb3IgdGhlIGFjdHVhbFxuICogYXJ0aWNsZSBhbmQgbmV3IGVudHJ5IHdpbGwgYmUgbWFkZS5cbiAqIEBwYXJhbSAge2Jvb2xlYW59IHJhdyBXaGV0aGVyIHRvIGluY2x1ZGUgY29tcHV0ZWQgZmllbGRzXG4gKiBAcmV0dXJuIHtQcm9taXNlfVxuICovXG5leHBvcnQgdmFyIGdldE1ldGEgPSBmdW5jdGlvbihyYXcpIHtcbiAgdmFyIHF1ZXJ5ID0gJz9pZD0nICsgaWQ7XG4gIGlmIChyYXcpIHtcbiAgICBxdWVyeSArPSAnJnJhdyc7XG4gIH1cbiAgcmV0dXJuIHJlcXVlc3QocXVlcnkpXG4gICAgLmNhdGNoKGZ1bmN0aW9uKCkge1xuICAgICAgcmV0dXJuIHJlcXVlc3QoJycsICdQT1NUJywge1xuICAgICAgICByZXNwb25zZXM6IFtdLFxuICAgICAgICBsaWtlczogMCxcbiAgICAgICAgaWRcbiAgICAgIH0pO1xuICAgIH0pO1xufTtcblxuZXhwb3J0IHZhciBnZXRTZWFyY2hJbmRleCA9IGZ1bmN0aW9uKHF1ZXJ5KSB7XG4gIHJldHVybiByZXF1ZXN0KCdzZWFyY2g/cT0nICsgcXVlcnkpO1xufTtcblxuLyoqXG4gKiBJbmNyZW1lbnQgdGhlIGxpa2UgdmFsdWUgd2l0aCBvbmVcbiAqIEByZXR1cm4ge1Byb21pc2V9XG4gKi9cbmV4cG9ydCB2YXIgbGlrZSA9IGZ1bmN0aW9uKCkge1xuICByZXR1cm4gZ2V0TWV0YShpZCwgdHJ1ZSlcbiAgICAudGhlbihmdW5jdGlvbihkYXRhKSB7XG4gICAgICByZXR1cm4gcmVxdWVzdCgnP2lkPScgKyBpZCwgJ1BVVCcsIHtcbiAgICAgICAgbGlrZXM6IGRhdGEubGlrZXMgKyAxXG4gICAgICB9KTtcbiAgICB9KTtcbn07XG5cbi8qKlxuICogVXBkYXRlIGF1dGhvciBlbWFpbCB1c2VkIHRvIHNlbmQgZS1tYWlscyB3aGVuIGEgcmVzcG9uc2UgaSByZWNlaXZlZC5cbiAqIEByZXR1cm4ge1Byb21pc2V9XG4gKi9cbmV4cG9ydCB2YXIgdXBkYXRlQXV0aG9yRW1haWwgPSBmdW5jdGlvbihhdXRob3JFbWFpbCkge1xuICBpZiAoIWlkKSB7XG4gICAgcmV0dXJuIFByb21pc2UucmVqZWN0KG5ldyBFcnJvcignTm8gcG9zdElkJykpO1xuICB9XG4gIHJldHVybiByZXF1ZXN0KCc/aWQ9JyArIGlkLCAnUFVUJywge1xuICAgIGF1dGhvckVtYWlsXG4gIH0pO1xufTtcblxuLyoqXG4gKiBBZGQgYSByZXNwb25zZVxuICogQHBhcmFtIHtvYmplY3R9IHJlc3BvbnNlXG4gKiBAcmV0dXJuIHtQcm9taXNlfVxuICovXG5leHBvcnQgdmFyIGFkZFJlc3BvbnNlID0gZnVuY3Rpb24ocmVzcG9uc2UpIHtcbiAgcmV0dXJuIGdldE1ldGEodHJ1ZSlcbiAgICAudGhlbihmdW5jdGlvbihkYXRhKSB7XG5cbiAgICAgIC8vIFNldCB0aGUgcHVibGlzaCBkYXRhIHRvIG5vd1xuICAgICAgcmVzcG9uc2UucHVibGlzaGVkID0gbmV3IERhdGUoKS50b0lTT1N0cmluZygpO1xuXG4gICAgICAvLyBVcGRhdGUgdGhlIHJlc3BvbnNlcyBsaXN0XG4gICAgICBkYXRhLnJlc3BvbnNlcy5wdXNoKHJlc3BvbnNlKTtcbiAgICAgIHJldHVybiByZXF1ZXN0KCc/aWQ9JyArIGlkLCAnUFVUJywge1xuICAgICAgICByZXNwb25zZXM6IGRhdGEucmVzcG9uc2VzXG4gICAgICB9KTtcbiAgICB9KTtcbn07XG5cbi8qKlxuICogUmVtb3ZlIGEgcmVzcG9uc2VcbiAqIEBwYXJhbSAge3N0cmluZ30gcHVibGlzaGVkXG4gKiBAcGFyYW0gIHtzdHJpbmd9IG5hbWVcbiAqIEByZXR1cm4ge1Byb21pc2V9XG4gKi9cbmV4cG9ydCB2YXIgcmVtb3ZlUmVzcG9uc2UgPSBmdW5jdGlvbihwdWJsaXNoZWQsIG5hbWUpIHtcbiAgcmV0dXJuIGdldE1ldGEodHJ1ZSlcbiAgICAudGhlbihmdW5jdGlvbihkYXRhKSB7XG5cbiAgICAgIC8vIFJlbW92ZSByZXNwb3NlIHdoaWNoIG1hdGNoZXMgb24gcHVibGlzaCBkYXRlIGFuZCBhdXRob3IgbmFtZVxuICAgICAgdmFyIHJlc3BvbnNlcyA9IGRhdGEucmVzcG9uc2VzLmZpbHRlcihmdW5jdGlvbihyZXNwb25zZSkge1xuICAgICAgICByZXR1cm4gKHJlc3BvbnNlLnB1Ymxpc2hlZCAhPT0gcHVibGlzaGVkIHx8IHJlc3BvbnNlLm5hbWUgIT09IG5hbWUpO1xuICAgICAgfSk7XG5cbiAgICAgIHJldHVybiByZXF1ZXN0KCc/aWQ9JyArIGlkLCAnUFVUJywge1xuICAgICAgICByZXNwb25zZXNcbiAgICAgIH0pO1xuICAgIH0pO1xufTtcbiIsIi8qKlxuICogVmFsaWRhdGUgaW5wdXQgZmllbGRzIGFzIHVzZXIgdHlwZXNcbiAqL1xuXG4vLyBEZXBlbmRlbmNpZXNcbmltcG9ydCB2YWxpZGF0ZUZvcm0gZnJvbSAnLi92YWxpZGF0ZSc7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uKCR2YWxpZGF0b3JzLCBjYWxsYmFjaykge1xuXHQkdmFsaWRhdG9ycy5mb3JFYWNoKGZ1bmN0aW9uKCR2YWxpZGF0ZUNvbnRhaW5lcikge1xuXHRcdHZhciAkdmFsaWRhdGVGaWVsZCA9ICR2YWxpZGF0ZUNvbnRhaW5lci5xdWVyeVNlbGVjdG9yKCdpbnB1dCwgdGV4dGFyZWEnKTtcblxuXHRcdCR2YWxpZGF0ZUZpZWxkLmFkZEV2ZW50TGlzdGVuZXIoJ2lucHV0JywgZnVuY3Rpb24oKSB7XG5cdFx0XHR2YXIgdmFsaWQgPSB2YWxpZGF0ZUZvcm0oJHZhbGlkYXRvcnMpO1xuXHRcdFx0Y2FsbGJhY2sodmFsaWQpO1xuXHRcdH0pO1xuXHR9KTtcbn1cbiIsIi8qKlxuICogQ2hlY2sgaWYgdGhlIGZvcm0gaXMgdmFsaWRcbiAqL1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbigkdmFsaWRhdG9ycykge1xuXHR2YXIgbm90VmFsaWQgPSAkdmFsaWRhdG9ycy5zb21lKGZ1bmN0aW9uKCR2YWxpZGF0b3IpIHtcblx0XHRpZiAoJHZhbGlkYXRvci5kYXRhc2V0LnZhbGlkYXRlUmVxdWlyZWQgIT09IHVuZGVmaW5lZCkge1xuXHRcdFx0cmV0dXJuICEkdmFsaWRhdG9yLmNsYXNzTGlzdC5jb250YWlucygndmFsaWRhdGUtLXZhbGlkJyk7XG5cdFx0fSBlbHNlIHtcblx0XHRcdHJldHVybiAkdmFsaWRhdG9yLmNsYXNzTGlzdC5jb250YWlucygndmFsaWRhdGUtLW5vdC12YWxpZCcpO1xuXHRcdH1cblx0fSk7XG5cblx0cmV0dXJuICFub3RWYWxpZDtcbn1cbiIsIi8qKlxuICogQ2hlY2sgaWYgdXNlciBpcyBsb2dnZWQgaW4gdXNpbmcgdGhlIGdob3N0IHNlc3Npb24uIElmIGxvZ2dlZCBpbiBnZXQgdXNlclxuICogZGF0YS5cbiAqL1xuXG4vLyBDYWNoZWQgcHJvbWlzZVxudmFyIGRhdGFQcm9taXNlO1xuXG4vKipcbiAqIEdldCB0aGUgZGF0YSBmb3IgdGhlIGxvZ2dlZCBpbiB1c2VkXG4gKiBAcGFyYW0gIHtzdHJpbmd9IHRva2VuXG4gKiBAcmV0dXJuIHtQcm9taXNlfVxuICovXG52YXIgZ2V0VXNlckRhdGEgPSBmdW5jdGlvbih0b2tlbikge1xuXHRyZXR1cm4gZmV0Y2goJy9naG9zdC9hcGkvdjAuMS91c2Vycy9tZS8/aW5jbHVkZT1yb2xlcyZzdGF0dXM9YWxsJywge1xuXHRcdG1ldGhvZDogJ0dFVCcsXG5cdFx0aGVhZGVyczoge1xuXHRcdFx0J0F1dGhvcml6YXRpb24nOiAnQmVhcmVyICcgKyB0b2tlblxuXHRcdH1cblx0fSkudGhlbihmdW5jdGlvbihyZXNwb25zZSkge1xuXHRcdGlmIChyZXNwb25zZS5zdGF0dXMgIT09IDIwMCkge1xuXHRcdFx0cmV0dXJuIFByb21pc2UucmVqZWN0KCdPbGQgc2Vzc2lvbicpO1xuXHRcdH1cblx0XHRyZXR1cm4gcmVzcG9uc2UuanNvbigpO1xuXHR9KS50aGVuKGZ1bmN0aW9uKGRhdGEpIHtcblx0XHRyZXR1cm4gZGF0YS51c2Vyc1swXTtcblx0fSk7XG59O1xuXG4vKipcbiAqIENoZWNrIGlmIHRoZXJlIGlzIGEgR2hvc3Qgc2Vzc2lvbi4gSWYgc28gdXNlIGl0IHRvIGdldCB0aGUgdXNlcnMgZGF0YS5cbiAqIEByZXR1cm4ge1Byb21pc2V9XG4gKi9cbnZhciBnZXQgPSBmdW5jdGlvbigpIHtcblxuXHQvLyBHaG9zdCBzdG9yZXMgaXQgc2Vzc2lvbiBpbiBsb2NhbFN0b3JhZ2Vcblx0dmFyIHNlc3Npb25TdHJpbmcgPSBsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnZ2hvc3Q6c2Vzc2lvbicpO1xuXHRpZiAoIXNlc3Npb25TdHJpbmcpIHtcblx0XHRyZXR1cm4gUHJvbWlzZS5yZWplY3QoJ05vIHNlc3Npb24nKTtcblx0fVxuXG5cdC8vIFZhbGlkIHNlc3Npb24/XG5cdHZhciBzZXNzaW9uID0gSlNPTi5wYXJzZShzZXNzaW9uU3RyaW5nKTtcblx0aWYgKCFzZXNzaW9uIHx8ICFzZXNzaW9uLmF1dGhlbnRpY2F0ZWQgfHwgIXNlc3Npb24uYXV0aGVudGljYXRlZC5hY2Nlc3NfdG9rZW4pIHtcblx0XHRyZXR1cm4gUHJvbWlzZS5yZWplY3QoJ05vIHNlc3Npb24nKTtcblx0fVxuXG5cdC8vIFNlc3Npb24gZXhwaXJlZD9cblx0aWYgKHNlc3Npb24uYXV0aGVudGljYXRlZC5leHBpcmVzX2F0IDwgRGF0ZS5ub3coKSkge1xuXHRcdHJldHVybiBQcm9taXNlLnJlamVjdCgnU2Vzc2lvbiBleHBpcmVkJyk7XG5cdH1cblxuXHRyZXR1cm4gZ2V0VXNlckRhdGEoc2Vzc2lvbi5hdXRoZW50aWNhdGVkLmFjY2Vzc190b2tlbik7XG5cbn07XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uKCkge1xuXG5cdC8vIFJldHVybiBjYWNoZWQgcHJvbWlzZSBpZiBhbHJlYWR5IGNhbGxlZFxuXHRpZiAoIWRhdGFQcm9taXNlKSB7XG5cdFx0ZGF0YVByb21pc2UgPSBnZXQoKTtcblx0fVxuXHRyZXR1cm4gZGF0YVByb21pc2U7XG59XG4iLCIvKipcbiAqIEVuY29kZSBhIHN0cmluZ1xuICogQHBhcmFtICB7c3RyaW5nfSBzdHJpbmdcbiAqIEByZXR1cm4ge3N0cmluZ31cbiAqL1xuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24oc3RyaW5nKSB7XG5cdHZhciBodG1sRW5jb2RlZFZhbHVlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2JykuYXBwZW5kQ2hpbGQoXG5cdFx0ZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoc3RyaW5nKSkucGFyZW50Tm9kZS5pbm5lckhUTUw7XG5cdHJldHVybiBodG1sRW5jb2RlZFZhbHVlLnJlcGxhY2UoL1xccj9cXG4vZywgJzxicj4nKTtcbn1cbiIsImltcG9ydCBnZXRBbGwgZnJvbSAnZHMtYXNzZXRzL2RvbS9nZXQtYWxsJztcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihyYXcpIHtcblx0dmFyICRjb250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcblx0JGNvbnRhaW5lci5pbm5lckhUTUwgPSByYXc7XG5cdGdldEFsbCgnaW1nJywgJGNvbnRhaW5lcikuZm9yRWFjaChmdW5jdGlvbigkaW1nKSB7XG5cdFx0dmFyICRpbWdXcmFwcGVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG5cdFx0JGltZ1dyYXBwZXIuY2xhc3NMaXN0LmFkZCgnaW1nLXdyYXBwZXInKTtcblx0XHQkaW1nV3JhcHBlci5pbm5lckhUTUwgPSAnPGRpdiBjbGFzcz1cImltZy1jb250YWluZXJcIj48aW1nPjwvZGl2Pic7XG5cdFx0dmFyIHNyYyA9ICRpbWcuZ2V0QXR0cmlidXRlKCdzcmMnKTtcblx0XHR2YXIgYWx0ID0gJGltZy5nZXRBdHRyaWJ1dGUoJ2FsdCcpO1xuXHRcdHZhciBwYWRkaW5nID0gNTA7XG5cblx0XHQvLyBMYXp5IGxvYWQgYWxsIGJ1dCB0aGUgZmlyc3QgaW1hZ2Vcblx0XHR2YXIgJG5ld0ltZyA9ICRpbWdXcmFwcGVyLnF1ZXJ5U2VsZWN0b3IoJ2ltZycpO1xuXG5cdFx0JG5ld0ltZy5zZXRBdHRyaWJ1dGUoJ2RhdGEtc3JjJywgc3JjKTtcblx0XHQkbmV3SW1nLnNldEF0dHJpYnV0ZSgnY2xhc3MnLCAnbGF6eS1pbWFnZScpO1xuXG5cdFx0YWx0LnNwbGl0KCc7JykuZm9yRWFjaChmdW5jdGlvbihzdHIpIHtcblx0XHRcdGlmIChzdHIgPT09ICdmdWxsLXNpemUnIHx8IHN0ciA9PT0gJ2Z1bGwtd2lkdGgnKSB7XG5cdFx0XHRcdCRpbWdXcmFwcGVyLmNsYXNzTGlzdC5hZGQoJ2Z1bGwtd2lkdGgnKTtcblx0XHRcdH0gZWxzZSBpZiAoc3RyLmluZGV4T2YoJ3JhdGlvPScpID09PSAwKSB7XG5cdFx0XHRcdHZhciByYXRpbyA9IHN0ci5yZXBsYWNlKCdyYXRpbz0nLCAnJyk7XG5cdFx0XHRcdGlmIChyYXRpby5pbmRleE9mKCc6JykpIHtcblx0XHRcdFx0XHR2YXIgZGltZW5zaW9ucyA9IHJhdGlvLnNwbGl0KCc6Jyk7XG5cdFx0XHRcdFx0cmF0aW8gPSBkaW1lbnNpb25zWzBdIC8gZGltZW5zaW9uc1sxXTtcblx0XHRcdFx0fVxuXHRcdFx0XHRwYWRkaW5nID0gMTAwIC8gcmF0aW87XG5cdFx0XHR9IGVsc2UgaWYgKHN0ciA9PT0gJ2JvcmRlcnMnKSB7XG5cdFx0XHRcdCRpbWdXcmFwcGVyLnF1ZXJ5U2VsZWN0b3IoJy5pbWctY29udGFpbmVyJykuY2xhc3NMaXN0LmFkZCgnaW1nLWNvbnRhaW5lci0tYm9yZGVycycpO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0YWx0ID0gc3RyO1xuXHRcdFx0fVxuXHRcdH0pO1xuXG5cdFx0JG5ld0ltZy5zZXRBdHRyaWJ1dGUoJ2FsdCcsIGFsdCk7XG5cdFx0JG5ld0ltZy5zZXRBdHRyaWJ1dGUoJ3RpdGxlJywgJGltZy5nZXRBdHRyaWJ1dGUoJ3RpdGxlJykpO1xuXG5cdFx0JGltZ1dyYXBwZXIucXVlcnlTZWxlY3RvcignLmltZy1jb250YWluZXInKVxuXHRcdFx0LnNldEF0dHJpYnV0ZSgnc3R5bGUnLCAncGFkZGluZy1ib3R0b206JyArIHBhZGRpbmcgKyAnJScpO1xuXG5cdFx0JGltZy5wYXJlbnROb2RlLm91dGVySFRNTCA9ICRpbWdXcmFwcGVyLm91dGVySFRNTDtcblx0fSk7XG5cdHJldHVybiAkY29udGFpbmVyLmlubmVySFRNTDtcbn07XG4iLCJpbXBvcnQgc3RyaXBUYWdzIGZyb20gJy4vc3RyaXAtaHRtbC10YWdzJztcbmltcG9ydCB3b3JkQ291bnQgZnJvbSAnd29yZC1jb3VudCc7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uKGh0bWwpIHtcblx0dmFyIHRleHQgPSBzdHJpcFRhZ3MoaHRtbCk7XG5cdHZhciB3b3JkcyA9IHdvcmRDb3VudCh0ZXh0KTtcblx0dmFyIHJlYWRUaW1lID0gTWF0aC5jZWlsKHdvcmRzIC8gMzAwKTtcblxuXHR2YXIgYWZmaXggPSAnIG1pbic7XG5cdGlmIChyZWFkVGltZSA+IDEpIHtcblx0XHRhZmZpeCArPSAncyc7XG5cdH1cblxuXHRyZXR1cm4gcmVhZFRpbWUgKyBhZmZpeDtcbn1cbiIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uKGh0bWwpIHtcblx0dmFyIHRtcCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuXHR0bXAuaW5uZXJIVE1MID0gaHRtbDtcblx0cmV0dXJuIHRtcC50ZXh0Q29udGVudCB8fCB0bXAuaW5uZXJUZXh0IHx8ICcnO1xufVxuIiwiLyoqXG4gKiBNYWluIGVudHJ5IGZvciB0aGUgamF2YXNjcmlwdC5cbiAqIEltcG9ydCBtb2R1bGVzIGFuZCBzdGFydCB0aGVtXG4gKi9cblxuaW1wb3J0IGxhenlJbWFnZXMgZnJvbSAnZHMtYXNzZXRzL2xhenkvaW1hZ2VzJztcbmltcG9ydCBnZXRBbGwgZnJvbSAnZHMtYXNzZXRzL2RvbS9nZXQtYWxsJztcbmltcG9ydCB2YWxpZGF0ZUlucHV0RmllbGRzIGZyb20gJ2RzLWFzc2V0cy92YWxpZGF0ZS9pbnB1dC1maWVsZHMnO1xuaW1wb3J0IG5hdmlnYXRpb24gZnJvbSAnLi9jb21wb25lbnRzL25hdmlnYXRpb24nO1xuaW1wb3J0IHJlc3BvbnNlIGZyb20gJy4vY29tcG9uZW50cy9yZXNwb25zZSc7XG5pbXBvcnQgdG9vbFRpcCBmcm9tICcuL2NvbXBvbmVudHMvdG9vbC10aXAnO1xuaW1wb3J0IHNlYXJjaCBmcm9tICcuL2NvbXBvbmVudHMvc2VhcmNoJztcbmltcG9ydCBnZXRMb2dnZWRJbkRhdGEgZnJvbSAnLi9saWIvZ2V0LWxvZ2dlZC1pbi1kYXRhJztcbmltcG9ydCAqIGFzIGFwaSBmcm9tICcuL2xpYi9hcGknO1xuXG5uYXZpZ2F0aW9uKCk7XG50b29sVGlwKCk7XG5zZWFyY2goKTtcblxuZ2V0QWxsKCdpbWcnKS5mb3JFYWNoKGZ1bmN0aW9uKCRpbWcpIHtcblx0JGltZy5vbmxvYWQgPSBmdW5jdGlvbigpIHtcblx0XHR0aGlzLmNsYXNzTGlzdC5hZGQoJ2FuaW1hdGUtLWFjdGl2ZScpO1xuXHR9O1xufSk7XG5sYXp5SW1hZ2VzKDEpO1xudmFsaWRhdGVJbnB1dEZpZWxkcygpO1xucmVzcG9uc2UoKTtcbmdldExvZ2dlZEluRGF0YSgpLnRoZW4oZnVuY3Rpb24odXNlcikge1xuXHR2YXIgJGJvZHkgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdib2R5Jyk7XG5cblx0JGJvZHkuY2xhc3NMaXN0LmFkZCgndXNlci1sb2dnZWQtaW4nKTtcblxuXHQvLyBBZG1pbiBsb2dnZWQgaW5cblx0dmFyIGFkbWluID0gdXNlci5yb2xlcy5zb21lKGZ1bmN0aW9uKHJvbGUpIHtcblx0XHRyZXR1cm4gKHJvbGUubmFtZSA9PT0gJ093bmVyJyB8fCByb2xlLm5hbWUgPT09ICdBZG1pbmlzdHJhdG9yJyk7XG5cdH0pO1xuXHRpZiAoYWRtaW4pIHtcblx0XHQkYm9keS5jbGFzc0xpc3QuYWRkKCdhZG1pbi1sb2dnZWQtaW4nKTtcblx0fVxuXG5cdC8vIEF1dGhvciBsb2dnZWQgaW5cblx0aWYgKHVzZXIubmFtZSA9PT0gd2luZG93LmF1dGhvck5hbWUpIHtcblx0XHQkYm9keS5jbGFzc0xpc3QuYWRkKCdhdXRob3ItbG9nZ2VkLWluJyk7XG5cdFx0cmV0dXJuIGFwaS51cGRhdGVBdXRob3JFbWFpbCh1c2VyLmVtYWlsKTtcblx0fVxufSkuY2F0Y2goZnVuY3Rpb24oKSB7fSk7XG4iLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbihhdXRob3IpIHtcblxuXHR2YXIgYXV0aG9ySW1hZ2UgPSAnJztcblx0aWYgKGF1dGhvci5pbWFnZSkge1xuXHRcdGF1dGhvckltYWdlID0gYDx0ZCB3aWR0aD1cIjUlXCI+PGltZyBzcmM9XCIke2F1dGhvci5pbWFnZX1cIiBjbGFzcz1cImF1dGhvcl9faW1hZ2Ugcm91bmQtaW1nXCI+PC90ZD5gO1xuXHR9XG5cblx0dmFyIGNvdmVySW1hZ2UgPSAnJztcblx0aWYgKGF1dGhvci5jb3Zlcikge1xuXHRcdGNvdmVySW1hZ2UgPSBgXG48aW1nIGRhdGEtc3JjPVwiJHthdXRob3IuY292ZXJ9XCIgY2xhc3M9XCJsYXp5LWltYWdlIGZ1bGwtd2lkdGggaW1nLWZ1bGwtd2lkdGhcIiBhbHQ9XCIke2F1dGhvci5uYW1lfVwiID5cbmA7XG5cdH1cblxuXHRyZXR1cm4gYFxuPGFydGljbGUgY2xhc3M9XCJib3hlc19faXRlbSBzbWFsbCBhbmltYXRlIGFuaW1hdGVfX2ZhZGUtaW5cIj5cbiAgPGhlYWRlciBjbGFzcz1cImF1dGhvclwiPlxuICAgICAgPHRhYmxlPlxuICAgICAgICAgIDx0cj5cbiAgICAgICAgICAgICAgJHthdXRob3JJbWFnZX1cbiAgICAgICAgICAgICAgPHRkPjxzcGFuIGNsYXNzPVwiYXV0aG9yX19uYW1lXCI+PGEgaHJlZj1cIi9hdXRob3IvJHthdXRob3Iuc2x1Z31cIj4ke2F1dGhvci5uYW1lfTwvYT48L3NwYW4+PGJyPlxuICAgICAgICAgICAgICBcdCR7YXV0aG9yLmNvdW50LnBvc3RzfSBhcnRpY2xlc1xuICAgICAgICAgICAgICA8L3RkPlxuICAgICAgICAgIDwvdHI+XG4gICAgICA8L3RhYmxlPlxuICA8L2hlYWRlcj5cbiAgJHtjb3ZlckltYWdlfVxuICA8cD4ke2F1dGhvci5iaW8gfHwgJyd9PC9wPlxuICA8cD48YSBocmVmPVwiL2F1dGhvci8ke2F1dGhvci5zbHVnfS9cIiBjbGFzcz1cImJ0blwiPkFydGljbGVzIGJ5IGF1dGhvcjwvYT48L3A+XG48L2FydGljbGU+XG5gO1xufVxuIiwiaW1wb3J0IGltYWdlQ29udmVydGVkIGZyb20gJy4uL2xpYi9pbWFnZS1jb252ZXJ0ZXInO1xuaW1wb3J0IHJlYWRUaW1lIGZyb20gJy4uL2xpYi9yZWFkLXRpbWUnO1xuaW1wb3J0IGVwb2NoVG9UaW1lYWdvIGZyb20gJ2Vwb2NoLXRvLXRpbWVhZ28nO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbihwb3N0KSB7XG5cblx0dmFyIGF1dGhvckltYWdlID0gJyc7XG5cdGlmIChwb3N0LmF1dGhvci5pbWFnZSkge1xuXHRcdGF1dGhvckltYWdlID0gYDx0ZCB3aWR0aD1cIjUlXCI+PGltZyBzcmM9XCIke3Bvc3QuYXV0aG9yLmltYWdlfVwiIGNsYXNzPVwiYXV0aG9yX19pbWFnZSByb3VuZC1pbWdcIj48L3RkPmA7XG5cdH1cblxuXHR2YXIgdGFncyA9ICcnO1xuXHRpZiAocG9zdC50YWdzKSB7XG5cdFx0dGFncyA9ICc8YnI+PHNwYW4gY2xhc3M9XCJ0YWdzXCI+JyArIHBvc3QudGFncy5tYXAoZnVuY3Rpb24odGFnKSB7XG5cdFx0XHRyZXR1cm4gYDxhIGhyZWY9XCIvdGFnLyR7dGFnLnNsdWd9L1wiPiR7dGFnLm5hbWV9PC9hPmA7XG5cdFx0fSkuam9pbignJykgKyAnPC9zcGFuPic7XG5cdH1cblxuXHR2YXIgcHVibGlzaGVkID0gbmV3IERhdGUocG9zdC5wdWJsaXNoZWRfYXQpLmdldFRpbWUoKTtcblx0dmFyIG5vdyA9IERhdGUubm93KCk7XG5cdHZhciB0aW1lQWdvID0gZXBvY2hUb1RpbWVhZ28udGltZUFnbyhwdWJsaXNoZWQsIG5vdyk7XG5cblx0dmFyIGh0bWwgPSBpbWFnZUNvbnZlcnRlZChwb3N0Lmh0bWwpO1xuXHR2YXIgZXhjZXJwdCA9IGh0bWwuc3Vic3RyKDAsIGh0bWwuaW5kZXhPZignPC9wPicpICsgNCk7XG5cblx0cmV0dXJuIGBcbjxhcnRpY2xlIGNsYXNzPVwiYm94ZXNfX2l0ZW0gc21hbGwgYW5pbWF0ZSBhbmltYXRlX19mYWRlLWluXCI+XG4gIDxoZWFkZXIgY2xhc3M9XCJhdXRob3JcIj5cbiAgICAgIDx0YWJsZT5cbiAgICAgICAgICA8dHI+XG4gICAgICAgICAgICAgICR7YXV0aG9ySW1hZ2V9XG4gICAgICAgICAgICAgIDx0ZD48c3BhbiBjbGFzcz1cImF1dGhvcl9fbmFtZVwiPjxhIGhyZWY9XCIvYXV0aG9yLyR7cG9zdC5hdXRob3Iuc2x1Z31cIj4ke3Bvc3QuYXV0aG9yLm5hbWV9PC9hPjwvc3Bhbj48YnI+XG4gICAgICAgICAgICAgICR7dGltZUFnb30gJm1pZGRvdDsgJHtyZWFkVGltZShwb3N0Lmh0bWwpfSByZWFkJHt0YWdzfTwvdGQ+XG4gICAgICAgICAgPC90cj5cbiAgICAgIDwvdGFibGU+XG4gIDwvaGVhZGVyPlxuICAke2V4Y2VycHR9XG4gIDxwPjxhIGhyZWY9XCIvJHtwb3N0LnNsdWd9L1wiIGNsYXNzPVwiYnRuXCI+UmVhZCBhcnRpY2xlPC9hPjwvcD5cbjwvYXJ0aWNsZT5cbmA7XG59XG4iLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbih1c2VyKSB7XG5cdHZhciBpbWFnZSA9ICcnO1xuXHRpZiAodXNlci5pbWFnZSkge1xuXHRcdGltYWdlID0gYFxuPHRkIHdpZHRoPVwiNSVcIj48aW1nIGRhdGEtc3JjPVwiJHt1c2VyLmltYWdlfVwiIGNsYXNzPVwiYXV0aG9yX19pbWFnZSBhdXRob3JfX2ltYWdlLS1zbWFsbCBsYXp5LWltYWdlIGltZy1iZyByb3VuZC1pbWdcIj48L3RkPlxuXHRcdGA7XG5cdH1cblxuXHRyZXR1cm4gYFxuPGRpdiBjbGFzcz1cImF1dGhvciBzbWFsbFwiPlxuICA8dGFibGU+PHRib2R5Pjx0cj5cblx0XHQke2ltYWdlfVxuICAgIDx0ZD5cbiAgICAgIDxzcGFuIGNsYXNzPVwiYXV0aG9yX19uYW1lXCI+JHt1c2VyLm5hbWV9PC9zcGFuPlxuICAgIDwvdGQ+XG4gIDwvdHI+PC90Ym9keT48L3RhYmxlPlxuPC9kaXY+XG5gO1xufVxuIiwiaW1wb3J0IGVuY29kZSBmcm9tICcuLi9saWIvaHRtbC1lbmNvZGUnO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbihyZXNwb25zZSkge1xuXG4gIHZhciBjbGFzc2VzID0gJ3Jlc3BvbnNlIGJveGVzX19pdGVtJztcbiAgaWYgKHJlc3BvbnNlLm5hbWUudG9Mb3dlckNhc2UoKSA9PT0gd2luZG93LmF1dGhvck5hbWUudG9Mb3dlckNhc2UoKSkge1xuICAgIGNsYXNzZXMgKz0gJyBib3hlc19faXRlbS0tdHJhbnNwYXJlbnQnO1xuICB9XG5cbiAgdmFyIGltYWdlID0gJyc7XG4gIGlmIChyZXNwb25zZS5pbWFnZSkge1xuICAgIGltYWdlID0gYDx0ZCB3aWR0aD1cIjUlXCI+PGltZyBkYXRhLXNyYz1cIiR7cmVzcG9uc2UuaW1hZ2V9XCIgY2xhc3M9XCJhdXRob3JfX2ltYWdlIGF1dGhvcl9faW1hZ2UtLXNtYWxsIGxhenktaW1hZ2UgaW1nLWJnIHJvdW5kLWltZ1wiPjwvdGQ+YDtcbiAgfVxuXG4gIHZhciByZWFkVGltZSA9ICcnO1xuICBpZiAocmVzcG9uc2UucmVhZFRpbWUpIHtcbiAgICByZWFkVGltZSA9IGAgJm1pZGRvdDsgJHtyZXNwb25zZS5yZWFkVGltZX0gcmVhZGA7XG4gIH1cblxuICB2YXIgZXhjZXJwdCA9IHJlc3BvbnNlLmV4Y2VycHQgfHwgcmVzcG9uc2UuaHRtbDtcblxuICB2YXIgcmVhZE1vcmUgPSAnJztcbiAgaWYgKHJlc3BvbnNlLmV4Y2VycHQpIHtcbiAgICByZWFkTW9yZSA9IGBcbjxkaXYgY2xhc3M9XCJyZXNwb25zZV9fdGV4dCBoaWRkZW5cIj4ke3Jlc3BvbnNlLmh0bWx9PC9kaXY+XG48cD48YSBocmVmPVwiI1wiIGNsYXNzPVwiYnRuIHJlc3BvbnNlX19yZWFkLW1vcmVcIj5SZWFkIG1vcmU8L2E+PC9wPlxuYDtcbiAgfVxuXG4gIHZhciBuYW1lID0gYCR7ZW5jb2RlKHJlc3BvbnNlLm5hbWUpfWA7XG4gIGlmIChyZXNwb25zZS53ZWJzaXRlKSB7XG4gICAgbmFtZSA9IGA8YSBocmVmPVwiJHtlbmNvZGUocmVzcG9uc2Uud2Vic2l0ZSl9XCI+JHtuYW1lfTwvYT5gO1xuICB9XG5cbiAgcmV0dXJuIGBcbjxkaXYgY2xhc3M9XCIke2NsYXNzZXN9IHNtYWxsXCI+XG4gIDxkaXYgY2xhc3M9XCJhdXRob3JcIj5cbiAgICA8dGFibGU+XG4gICAgICA8dHI+XG4gICAgICAgICR7aW1hZ2V9XG4gICAgICAgIDx0ZD5cbiAgICAgICAgICA8c3BhbiBjbGFzcz1cImF1dGhvcl9fbmFtZVwiPiR7bmFtZX08L3NwYW4+PGJyPlxuICAgICAgICAgICR7cmVzcG9uc2UudGltZUFnb30ke3JlYWRUaW1lfVxuICAgICAgICA8L3RkPlxuICAgICAgPC90cj5cbiAgICA8L3RhYmxlPlxuICA8L2Rpdj5cbiAgPGEgaHJlZj1cIiNcIiBjbGFzcz1cInJlc3BvbnNlX19kZWxldGVcIiBkYXRhLXB1Ymxpc2hlZD1cIiR7cmVzcG9uc2UucHVibGlzaGVkfVwiIGRhdGEtbmFtZT1cIiR7cmVzcG9uc2UubmFtZX1cIj48aW1nIGRhdGEtc3JjPVwiL2Fzc2V0cy9pbWFnZXMvdHJhc2guc3ZnXCIgY2xhc3M9XCJsYXp5LWltYWdlXCI+PC9hPlxuICA8ZGl2IGNsYXNzPVwicmVzcG9uc2VfX2V4Y2VycHRcIj4ke2V4Y2VycHR9PC9kaXY+XG4gICR7cmVhZE1vcmV9XG48L2Rpdj5gO1xufVxuIiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24odGFnKSB7XG5cbiAgY29uc29sZS5sb2codGFnKTtcblxuICB2YXIgY292ZXJJbWFnZSA9ICcnO1xuICBpZiAodGFnLmltYWdlKSB7XG4gICAgY292ZXJJbWFnZSA9IGBcbjxpbWcgZGF0YS1zcmM9XCIke3RhZy5pbWFnZX1cIiBjbGFzcz1cImxhenktaW1hZ2UgZnVsbC13aWR0aCBpbWctZnVsbC13aWR0aFwiIGFsdD1cIiR7dGFnLm5hbWV9XCIgPlxuYDtcbiAgfVxuXG4gIHJldHVybiBgXG48YXJ0aWNsZSBjbGFzcz1cImJveGVzX19pdGVtIHNtYWxsIGFuaW1hdGUgYW5pbWF0ZV9fZmFkZS1pblwiPlxuICA8aGVhZGVyIGNsYXNzPVwiYXV0aG9yXCI+XG4gICAgICA8dGFibGU+XG4gICAgICAgICAgPHRyPlxuICAgICAgICAgICAgICA8dGQ+PHNwYW4gY2xhc3M9XCJhdXRob3JfX25hbWVcIj48YSBocmVmPVwiL3RhZy8ke3RhZy5zbHVnfVwiPiR7dGFnLm5hbWV9PC9hPjwvc3Bhbj48YnI+XG4gICAgICAgICAgICAgIFx0JHt0YWcuY291bnQucG9zdHN9IGFydGljbGVzXG4gICAgICAgICAgICAgIDwvdGQ+XG4gICAgICAgICAgPC90cj5cbiAgICAgIDwvdGFibGU+XG4gIDwvaGVhZGVyPlxuICAke2NvdmVySW1hZ2V9XG4gIDxwPiR7dGFnLmRlc2NyaXB0aW9uIHx8ICcnfTwvcD5cbiAgPHA+PGEgaHJlZj1cIi90YWcvJHt0YWcuc2x1Z30vXCIgY2xhc3M9XCJidG5cIj5BcnRpY2xlcyBpbiBjYXRlZ29yeTwvYT48L3A+XG48L2FydGljbGU+XG5gO1xufVxuIiwiLyoqXG4gKiBXb3JkIENvdW50XG4gKlxuICogV29yZCBjb3VudCBpbiByZXNwZWN0IG9mIENKSyBjaGFyYWN0ZXJzLlxuICpcbiAqIENvcHlyaWdodCAoYykgMjAxNSBieSBIc2lhb21pbmcgWWFuZy5cbiAqL1xuXG52YXIgcGF0dGVybiA9IC9bYS16QS1aMC05X1xcdTAzOTItXFx1MDNjOVxcdTAwYzAtXFx1MDBmZlxcdTA2MDAtXFx1MDZmZl0rfFtcXHU0ZTAwLVxcdTlmZmZcXHUzNDAwLVxcdTRkYmZcXHVmOTAwLVxcdWZhZmZcXHUzMDQwLVxcdTMwOWZcXHVhYzAwLVxcdWQ3YWZdKy9nO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChkYXRhKSB7XG4gIHZhciBtID0gZGF0YS5tYXRjaChwYXR0ZXJuKTtcbiAgdmFyIGNvdW50ID0gMDtcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBtLmxlbmd0aDsgaSsrKSB7XG4gICAgaWYgKG1baV0uY2hhckNvZGVBdCgwKSA+PSAweDRlMDApIHtcbiAgICAgIGNvdW50ICs9IG1baV0ubGVuZ3RoO1xuICAgIH0gZWxzZSB7XG4gICAgICBjb3VudCArPSAxO1xuICAgIH1cbiAgfVxuICByZXR1cm4gY291bnQ7XG59O1xuIiwiLyoqXG4gKiBNYWtlIHN1cmUgYSBmdW5jdGlvbiBvbmx5IGlzIHJ1biBldmVyeSB4IG1zXG4gKiBAcGFyYW0gIHtGdW5jdGlvbn0gY2FsbGJhY2sgTWV0aG9kIHRvIGV4ZWN1dGUgaWYgaXQgaXMgbm90IGRlYm91bmNlZFxuICogQHBhcmFtICB7aW50ZWdlcn0gIHRpbWVvdXQgIE1pbGxpc2Vjb25kcyB0byB3YWl0IGJlZm9yZSBuZXh0IGFsbG93ZWQgY2FsbGJhY2suIERlZmF1bHRzIHRvIHRoZSBhbmltYXRpb24gZnJhbWUgcmF0ZSBpbiB0aGUgYnJvd3NlclxuICogQHJldHVybiB7dm9pZH1cbiAqL1xuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24oY2FsbGJhY2ssIHRpbWVvdXQpIHtcbiAgdmFyIHBlbmRpbmcgPSBmYWxzZTtcbiAgdmFyIGRvbmUgPSAoKSA9PiB7XG4gICAgcGVuZGluZyA9IGZhbHNlO1xuICB9O1xuICByZXR1cm4gZnVuY3Rpb24oKSB7XG4gICAgaWYgKHBlbmRpbmcpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgcGVuZGluZyA9IHRydWU7XG4gICAgY2FsbGJhY2suYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgICBpZiAoIXRpbWVvdXQpIHtcbiAgICAgIHdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUoZG9uZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHdpbmRvdy5zZXRUaW1lb3V0KGRvbmUsIHRpbWVvdXQpO1xuICAgIH1cbiAgfTtcbn1cbiIsIi8qKlxuICogRGVsYXkgYSBmdW5jdGlvbiBhbmQgb25seSBydW4gb25jZVxuICogQHBhcmFtICB7RnVuY3Rpb259IGNhbGxiYWNrIE1ldGhvZCB0byBleGVjdXRlIGlmIGl0IGlzIG5vdCBkZWJvdW5jZWRcbiAqIEBwYXJhbSAge2ludGVnZXJ9ICB0aW1lb3V0ICBNaWxsaXNlY29uZHMgdG8gd2FpdCBiZWZvcmUgbmV4dCBhbGxvd2VkIGNhbGxiYWNrLiBEZWZhdWx0cyB0byB0aGUgYW5pbWF0aW9uIGZyYW1lIHJhdGUgaW4gdGhlIGJyb3dzZXJcbiAqIEByZXR1cm4ge3ZvaWR9XG4gKi9cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uKGNhbGxiYWNrLCB0aW1lb3V0KSB7XG4gIHZhciBwZW5kaW5nID0gZmFsc2U7XG4gIHZhciBkb25lID0gKCkgPT4ge1xuICAgIGNhbGxiYWNrLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgcGVuZGluZyA9IGZhbHNlO1xuICB9O1xuICByZXR1cm4gZnVuY3Rpb24oKSB7XG4gICAgaWYgKHBlbmRpbmcpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgcGVuZGluZyA9IHRydWU7XG4gICAgaWYgKCF0aW1lb3V0KSB7XG4gICAgICB3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lKGRvbmUpO1xuICAgIH0gZWxzZSB7XG4gICAgICB3aW5kb3cuc2V0VGltZW91dChkb25lLCB0aW1lb3V0KTtcbiAgICB9XG4gIH07XG59XG4iLCIvKipcbiAqIEdldCBhbiBhcnJheSBvZiBkb20gZWxlbWVudHMgbWF0Y2hpbmcgdGhlIHNlbGVjdG9yXG4gKiBAcGFyYW0gIHtzdHJpbmd9ICAgICBzZWxlY3RvclxuICogQHBhcmFtICB7RE9NZWxlbWVudH0gRE9NIGVsZW1lbnQgdG8gc2VhcmNoIGluLiBEZWZhdWx0cyB0byBkb2N1bWVudFxuICogQHJldHVybiB7YXJyYXl9XG4gKi9cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uKHNlbGVjdG9yLCAkcm9vdCA9IGRvY3VtZW50KSB7XG4gIHJldHVybiBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbCgkcm9vdC5xdWVyeVNlbGVjdG9yQWxsKHNlbGVjdG9yKSk7XG59XG4iLCIvKipcbiAqIEdldCB0aGUgZWxlbWVudHMgb2Zmc2V0IHJlbGF0aXZlIHRvIHRoZSBkb2N1bWVudFxuICogQHBhcmFtICB7RE9NRWxlbWVudH0gJGVsZW1lbnQgRWxlbWVudCB0byBnZXQgdGhlIG9mZnNldCBmcm9tXG4gKiBAcmV0dXJuIHtpbnRlZ2VyfSAgICAgICAgICAgICBPZmZzZXQgaW4gcGl4ZWxzXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uKCRlbGVtZW50KSB7XG4gIHZhciBvZmZzZXQgPSAwO1xuXG4gIHdoaWxlICgkZWxlbWVudCAmJiAhaXNOYU4oJGVsZW1lbnQub2Zmc2V0VG9wKSkge1xuICAgIG9mZnNldCArPSAkZWxlbWVudC5vZmZzZXRUb3A7XG4gICAgJGVsZW1lbnQgPSAkZWxlbWVudC5vZmZzZXRQYXJlbnQ7XG4gIH1cbiAgcmV0dXJuIG9mZnNldDtcbn1cbiIsIi8qKlxuICogTGF6eSBsb2FkIGltYWdlcyB3aXRoIGNsYXNzIC5sYXp5LWltYWdlcy5cbiAqIERlcGVuZGluZyBvbiB0aGUgdHJlc2hvbGQgaW1hZ2VzIHdpbGwgbG9hZCBhcyB0aGUgdXNlciBzY3JvbGxzIGRvd24gb24gdGhlXG4gKiBkb2N1bWVudC5cbiAqL1xuXG4vLyBEZXBlbmRlbmNlaXNcbmltcG9ydCBnZXRBbGxFbGVtZW50cyBmcm9tICcuLi9kb20vZ2V0LWFsbCc7XG5pbXBvcnQgc2Nyb2xsVmlzaWJsZSBmcm9tICcuLi9zY3JvbGwvdmlzaWJsZSc7XG5cbi8vIExvYWQgaW1hZ2UgZWxlbWVudFxudmFyIGxvYWRJbWcgPSBmdW5jdGlvbigkaW1nKSB7XG5cbiAgaWYgKCRpbWcuZGF0YXNldC5zcmMpIHtcbiAgICAkaW1nLnNldEF0dHJpYnV0ZSgnc3JjJywgJGltZy5kYXRhc2V0LnNyYyk7XG4gIH1cbiAgaWYgKCRpbWcuZGF0YXNldC5zcmNzZXQpIHtcbiAgICAkaW1nLnNldEF0dHJpYnV0ZSgnc3Jjc2V0JywgJGltZy5kYXRhc2V0LnNyY3NldCk7XG4gIH1cbn07XG5cbi8vIExvYWQgcGljdHVyZSBlbGVtZW50XG52YXIgbG9hZFBpY3R1cmUgPSBmdW5jdGlvbigkcGljdHVyZSkge1xuICBsb2FkSW1nKCRwaWN0dXJlLnF1ZXJ5U2VsZWN0b3IoJ2ltZycpKTtcbiAgdmFyICRzb3VyY2VzID0gQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoJHBpY3R1cmUucXVlcnlTZWxlY3RvckFsbCgnc291cmNlJykpO1xuICAkc291cmNlcy5mb3JFYWNoKCRzb3VyY2UgPT4gJHNvdXJjZS5zZXRBdHRyaWJ1dGUoJ3NyY3NldCcsICRzb3VyY2UuZGF0YXNldC5zcmNzZXQpKTtcbn07XG5cbnZhciBsb2FkRWxlbWVudCA9IGZ1bmN0aW9uKCRlbGVtZW50KSB7XG4gIGlmICgkZWxlbWVudC5tYXRjaGVzKCdwaWN0dXJlJykpIHtcbiAgICBsb2FkUGljdHVyZSgkZWxlbWVudCk7XG4gIH0gZWxzZSBpZiAoJGVsZW1lbnQubWF0Y2hlcygnaW1nJykpIHtcbiAgICBsb2FkSW1nKCRlbGVtZW50KTtcbiAgfVxuXG4gIC8vIE1ha2Ugc3VyZSBwaWN0dXJlZmlsbCB3aWxsIHVwZGF0ZSB0aGUgaW1hZ2Ugd2hlbiBzb3VyY2UgaGFzIGNoYW5nZWRcbiAgaWYgKHdpbmRvdy5waWN0dXJlZmlsbCkge1xuICAgIHdpbmRvdy5waWN0dXJlZmlsbCh7XG4gICAgICByZWV2YWx1YXRlOiB0cnVlXG4gICAgfSk7XG4gIH1cbn07XG5cbi8qKlxuICogQWN0aXZhdGUgbGF6eSBsb2FkIG9mIGltYWdlcyBhcyB1c2VyIHNjcm9sbHNcbiAqIEBwYXJhbSAge2Zsb2F0fSB0aHJlc2hvbGQgIFBlcmNlbnQgYmVsb3cgc2NyZWVuIHRvIGluaXRpYWxpemUgbG9hZCBvZiBpbWFnZVxuICogQHJldHVybiB7dm9pZH1cbiAqL1xuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24odGhyZXNob2xkID0gMC41KSB7XG4gIHZhciAkbGF6eUltYWdlcyA9IGdldEFsbEVsZW1lbnRzKCcubGF6eS1pbWFnZScpO1xuXG4gIHdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUoZnVuY3Rpb24oKSB7XG4gICAgJGxhenlJbWFnZXMuZm9yRWFjaChmdW5jdGlvbigkbGF6eUltYWdlKSB7XG5cbiAgICAgIC8vIElnbm9yZSBpbWFnZXMgd2hpY2ggaGFzIGFscmVhZHkgYmVlbiByZWdpc3RlcmVkXG4gICAgICBpZiAoJGxhenlJbWFnZS5kYXRhc2V0LmxhenlJbWFnZUxpc3RlbmluZykge1xuXHRyZXR1cm47XG4gICAgICB9XG4gICAgICAkbGF6eUltYWdlLnNldEF0dHJpYnV0ZSgnZGF0YS1sYXp5LWltYWdlLWxpc3RlbmluZycsICd0cnVlJyk7XG5cbiAgICAgIHNjcm9sbFZpc2libGUoJGxhenlJbWFnZSwgdGhyZXNob2xkKVxuICAgICAgICAudGhlbigoKSA9PiBsb2FkRWxlbWVudCgkbGF6eUltYWdlKSk7XG4gICAgfSk7XG4gIH0pO1xuXG59XG4iLCIvLyBEZXBlbmRlbmNpZXNcbmltcG9ydCBnZXREb2N1bWVudE9mZnNldFRvcCBmcm9tICcuLi9kb20vZ2V0LWRvY3VtZW50LW9mZnNldC10b3AnO1xuXG4vKipcbiAqIENoZWNrcyBpZiB0aGUgdXNlciBoYXMgc2Nyb2xsZWQgdG8gb3IgcGFzdCBhbiBlbGVtZW50XG4gKiBAcGFyYW0gIHtET01FbGVtZW50fSAkZWxlbWVudCAgVGhlIGVsZW1lbnQgdG8gY2hlY2sgYWdhaW5zdFxuICogQHBhcmFtICB7ZmxvYXR9ICAgICAgdGhyZXNob2xkIERpc3RhbmNlIGluIHBlcmNlbnQgb2YgdGhlIHNjZWVlbiBoZWlnaHQgdG8gbWVhc3VyZSBhZ2FpbnN0LlxuICogQHJldHVybiB7Ym9vbGVhbn1cbiAqL1xuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24oJGVsZW1lbnQsIHRocmVzaG9sZCA9IDApIHtcbiAgdmFyIHNjcm9sbEJvdHRvbSA9ICh3aW5kb3cuc2Nyb2xsWSB8fCBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuc2Nyb2xsVG9wKSArICh3aW5kb3cuaW5uZXJIZWlnaHQgKiAoMSArIHRocmVzaG9sZCkpO1xuICB2YXIgb2Zmc2V0VG9wID0gZ2V0RG9jdW1lbnRPZmZzZXRUb3AoJGVsZW1lbnQpO1xuICByZXR1cm4gKHNjcm9sbEJvdHRvbSA+IG9mZnNldFRvcCk7XG59XG4iLCIvLyBkZXBlbmRlbmNpZXNcbmltcG9ydCBkZWxheSBmcm9tICcuLi9hc3luYy9kZWxheSc7XG5cbi8qKlxuICogUnVucyBzY3JpcHRzIGVhY2ggdGltZSB0aGUgdXNlciBjaGFuZ2VzIHNjcm9sbCBkaXJlY3Rpb25cbiAqIEBwYXJhbSAge0Z1bmN0aW9ufSBkb3duQ2FsbGJhY2sgIENhbGxiYWNrIGV2ZXJ5IHRpbWUgdGhlIHVzZXIgc3RhcnRzIHNjcm9sbGluZyBkb3duXG4gKiBAcGFyYW0gIHtGdW5jdGlvbn0gdXBDYWxsYmFjayAgICBDYWxsYmFjayBldmVyeSB0aW1lIHRoZSB1c2VyIHN0YXJ0cyBzY3JvbGxpbmcgdXBcbiAqIEBwYXJhbSAge2Zsb2F0fSAgICB0aHJlc2hvbGQgICAgIE1hcmdpbiBpbiB0b3Agd2hlcmUgc2Nyb2xsIGRvd24gaXMgaWdub3JlZCAoY291bGQgYmUgdXNlZCBmb3IgbmF2cylcbiAqIEByZXR1cm4ge3ZvaWR9XG4gKi9cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uKGRvd25DYWxsYmFjayA9IGZ1bmN0aW9uKCkge30sIHVwQ2FsbGJhY2sgPSBmdW5jdGlvbigpIHt9LCB0aHJlc2hvbGQgPSAwKSB7XG5cbiAgdmFyIGxhc3RTY3JvbGxQb3MgPSAwO1xuICB2YXIgc2Nyb2xsZWREb3duID0gZmFsc2U7XG5cbiAgdmFyIGlzU2Nyb2xsaW5nID0gZnVuY3Rpb24oKSB7XG4gICAgdmFyIGN1cnJlbnRTY3JvbGxQb3MgPSB3aW5kb3cuc2Nyb2xsWTtcblxuICAgIGlmICghc2Nyb2xsZWREb3duICYmXG4gICAgICBjdXJyZW50U2Nyb2xsUG9zID4gdGhyZXNob2xkICYmXG4gICAgICBjdXJyZW50U2Nyb2xsUG9zID4gKGxhc3RTY3JvbGxQb3MgKyAxMCkpIHtcbiAgICAgIGRvd25DYWxsYmFjaygpO1xuICAgICAgc2Nyb2xsZWREb3duID0gdHJ1ZTtcbiAgICB9IGVsc2UgaWYgKHNjcm9sbGVkRG93biAmJlxuICAgICAgKGN1cnJlbnRTY3JvbGxQb3MgPD0gdGhyZXNob2xkIHx8IGN1cnJlbnRTY3JvbGxQb3MgPCAobGFzdFNjcm9sbFBvcyAtIDEwMCkpICYmXG4gICAgICAoY3VycmVudFNjcm9sbFBvcyArIHdpbmRvdy5pbm5lckhlaWdodCA8IGRvY3VtZW50LmJvZHkuY2xpZW50SGVpZ2h0KSkge1xuICAgICAgdXBDYWxsYmFjaygpO1xuICAgICAgc2Nyb2xsZWREb3duID0gZmFsc2U7XG4gICAgfVxuXG4gICAgbGFzdFNjcm9sbFBvcyA9IGN1cnJlbnRTY3JvbGxQb3M7XG4gIH07XG5cbiAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3Njcm9sbCcsIGRlbGF5KGlzU2Nyb2xsaW5nLCAyNTApKTtcbiAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignRE9NQ29udGVudExvYWRlZCcsIGlzU2Nyb2xsaW5nKTtcbn1cbiIsIi8vIERlcGVuZGVuY2Vpc1xuaW1wb3J0IGRlYm91bmNlIGZyb20gJy4uL2FzeW5jL2RlYm91bmNlJztcbmltcG9ydCBoYXNTY3JvbGxlZFBhc3QgZnJvbSAnLi9oYXMtc2Nyb2xsZWQtcGFzdCc7XG5cbi8qKlxuICogRnVsZmlsbCBhIHByb21pc2UsIHdoZW4gdGhlIGVsZW1lbnQgaXMgdmlzaWJsZSAoc2Nyb2xsZWQgdG8gb3IgcGFzdClcbiAqIEBwYXJhbSAge0RPTUVsZW1lbnR9ICRlbGVtZW50ICBFbGVtZW50IHRvIGNoZWNrXG4gKiBAcGFyYW0gIHtmbG9hdH0gICAgICB0aHJlc2hvbGQgRGlzdGFuY2UgaW4gcGVyY2VudFxuICogQHJldHVybiB7W3R5cGVdfSAgICAgICAgICAgW2Rlc2NyaXB0aW9uXVxuICovXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbigkZWxlbWVudCwgdGhyZXNob2xkID0gMCkge1xuXG4gIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbihyZXNvbHZlKSB7XG5cbiAgICB2YXIgY2hlY2tFbGVtZW50ID0gZGVib3VuY2UoZnVuY3Rpb24oKSB7XG4gICAgICBpZiAoaGFzU2Nyb2xsZWRQYXN0KCRlbGVtZW50LCB0aHJlc2hvbGQpKSB7XG4gICAgICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKCdzY3JvbGwnLCBjaGVja0VsZW1lbnQpO1xuICAgICAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcigncmVzaXplJywgY2hlY2tFbGVtZW50KTtcbiAgICAgICAgcmVzb2x2ZSgpO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3Njcm9sbCcsIGNoZWNrRWxlbWVudCk7XG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3Jlc2l6ZScsIGNoZWNrRWxlbWVudCk7XG4gICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignRE9NQ29udGVudExvYWRlZCcsIGNoZWNrRWxlbWVudCk7XG4gICAgc2V0VGltZW91dChjaGVja0VsZW1lbnQsIDApO1xuICB9KTtcbn1cbiIsIi8qKlxuICogSGVscGVycyBmb3IgdmFsaWRhdGluZyBpbnB1dCBmaWVsZHNcbiAqL1xuXG5pbXBvcnQgaXNEYXRlIGZyb20gJy4vaXMtZGF0ZSc7XG5pbXBvcnQgaXNFbWFpbCBmcm9tICcuL2lzLWVtYWlsJztcbmltcG9ydCBpc0Zsb2F0IGZyb20gJy4vaXMtZmxvYXQnO1xuaW1wb3J0IGlzSW50IGZyb20gJy4vaXMtaW50JztcbmltcG9ydCBpc1JlcXVpcmVkIGZyb20gJy4vaXMtcmVxdWlyZWQnO1xuaW1wb3J0IGlzVXJsIGZyb20gJy4vaXMtdXJsJztcblxuZXhwb3J0IGRlZmF1bHQge1xuICBpc0RhdGUsXG4gIGlzRW1haWwsXG4gIGlzRmxvYXQsXG4gIGlzSW50LFxuICBpc1JlcXVpcmVkLFxuICBpc1VybFxufTtcbiIsImltcG9ydCBnZXRBbGxFbGVtZW50cyBmcm9tICcuLi9kb20vZ2V0LWFsbCc7XG5pbXBvcnQgdmFsaWRhdGUgZnJvbSAnLi8nO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbigpIHtcblxuICBnZXRBbGxFbGVtZW50cygnLnZhbGlkYXRlJykuZm9yRWFjaChmdW5jdGlvbigkdmFsaWRhdGVDb250YWluZXIpIHtcblxuICAgIHZhciAkdmFsaWRhdGVGaWVsZCA9ICR2YWxpZGF0ZUNvbnRhaW5lcjtcblxuICAgIGlmICghJHZhbGlkYXRlQ29udGFpbmVyLm1hdGNoZXMoJ2lucHV0LCB0ZXh0YXJlYScpKSB7XG4gICAgICAkdmFsaWRhdGVGaWVsZCA9ICR2YWxpZGF0ZUNvbnRhaW5lci5xdWVyeVNlbGVjdG9yKCdpbnB1dCwgdGV4dGFyZWEnKTtcbiAgICB9XG5cbiAgICBpZiAoISR2YWxpZGF0ZUZpZWxkKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgLy8gRmluZCByZWxldmF0IHZhbGlkYXRpb24gbWV0aG9kc1xuICAgIHZhciB2YWxpZGF0b3JOYW1lcyA9IFtdO1xuICAgIGZvciAodmFyIGtleSBpbiAkdmFsaWRhdGVDb250YWluZXIuZGF0YXNldCkge1xuICAgICAgaWYgKGtleSAhPT0gJ3ZhbGlkYXRlJyAmJiBrZXkuaW5kZXhPZigndmFsaWRhdGUnKSA9PT0gMCkge1xuICAgICAgICB2YXIgdmFsaWRhdG9yTmFtZSA9IGtleS5yZXBsYWNlKCd2YWxpZGF0ZScsICcnKTtcblxuICAgICAgICBpZiAodmFsaWRhdGVbJ2lzJyArIHZhbGlkYXRvck5hbWVdKSB7XG4gICAgICAgICAgdmFsaWRhdG9yTmFtZXMucHVzaCh2YWxpZGF0b3JOYW1lKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIGlmICh2YWxpZGF0b3JOYW1lcy5sZW5ndGggPT09IDApIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICAvLyBDaGVjayB2YWxpZGF0aW9uIHdoZW4gaW5wdXQgb24gZmllbGQgaXMgY2hhbmdlZFxuICAgICR2YWxpZGF0ZUZpZWxkLmFkZEV2ZW50TGlzdGVuZXIoJ2lucHV0JywgZnVuY3Rpb24oKSB7XG4gICAgICB2YXIgaW5wdXQgPSAkdmFsaWRhdGVGaWVsZC52YWx1ZTtcbiAgICAgIHZhciB2YWxpZCA9ICF2YWxpZGF0b3JOYW1lcy5zb21lKGZ1bmN0aW9uKHZhbGlkYXRvck5hbWUpIHtcblx0aWYgKCFpbnB1dCAmJiB2YWxpZGF0b3JOYW1lICE9PSAnUmVxdWlyZWQnKSB7XG5cdCAgcmV0dXJuIGZhbHNlO1xuXHR9XG4gICAgICAgIHJldHVybiAhdmFsaWRhdGVbJ2lzJyArIHZhbGlkYXRvck5hbWVdKGlucHV0KTtcbiAgICAgIH0pO1xuXG4gICAgICBpZiAodmFsaWQpIHtcblx0JHZhbGlkYXRlQ29udGFpbmVyLmNsYXNzTGlzdC5hZGQoJ3ZhbGlkYXRlLS12YWxpZCcpO1xuXHQkdmFsaWRhdGVDb250YWluZXIuY2xhc3NMaXN0LnJlbW92ZSgndmFsaWRhdGUtLW5vdC12YWxpZCcpO1xuICAgICAgfSBlbHNlIHtcblx0JHZhbGlkYXRlQ29udGFpbmVyLmNsYXNzTGlzdC5hZGQoJ3ZhbGlkYXRlLS1ub3QtdmFsaWQnKTtcblx0JHZhbGlkYXRlQ29udGFpbmVyLmNsYXNzTGlzdC5yZW1vdmUoJ3ZhbGlkYXRlLS12YWxpZCcpO1xuICAgICAgfVxuICAgIH0pO1xuICB9KTtcbn1cbiIsIi8qKlxuICogVmFsaWRhdGUgdGhhdCBzdHJpbmcgY2FuIGJlIGNvbnZlcnRlZCB0byBkYXRlXG4gKiBAcGFyYW0gIHtzdHJpbmd9IGRhdGUgaW5wdXRcbiAqIEByZXR1cm4ge2Jvb2xlYW59XG4gKi9cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uKGRhdGUpIHtcbiAgcmV0dXJuICFpc05hTihEYXRlLnBhcnNlKGRhdGUpKTtcbn1cbiIsIi8qKlxuICogVmFsaWRhdGUgZS1tYWlsXG4gKiBAcGFyYW0gIHtzdHJpbmd9IGVtYWlsIGlucHV0XG4gKiBAcmV0dXJuIHtib29sZWFufVxuICovXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbihlbWFpbCkge1xuICB2YXIgcmUgPSAvXihbYS16MC05X1xcLi1dKylAKFtcXGRhLXpcXC4tXSspXFwuKFthLXpcXC5dezIsNn0pJC87XG4gIHJldHVybiByZS50ZXN0KGVtYWlsKTtcbn1cbiIsIi8qKlxuICogVmFsaWRhdGUgZmxvYXRcbiAqIEBwYXJhbSAge3N0cmluZ30gZmxvYXQgaW5wdXRcbiAqIEByZXR1cm4ge2Jvb2xlYW59XG4gKi9cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uKGZsb2F0KSB7XG4gIHZhciByZSA9IC9eKD86Wy0rXT8oPzpbMC05XSspKT8oPzpcXC5bMC05XSopPyg/OltlRV1bXFwrXFwtXT8oPzpbMC05XSspKT8kLztcbiAgcmV0dXJuIGZsb2F0ICE9PSAnJyAmJiByZS50ZXN0KGZsb2F0KTtcbn1cbiIsIi8qKlxuICogVmFsaWRhdGUgaW50ZWdldFxuICogQHBhcmFtICB7c3RyaW5nfSBpbnRlZ2VyIGlucHV0XG4gKiBAcmV0dXJuIHtib29sZWFufVxuICovXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbihpbnRlZ2VyKSB7XG4gIHZhciByZSA9IC9eKD86Wy0rXT8oPzowfFsxLTldWzAtOV0qKSkkLztcbiAgcmV0dXJuIHJlLnRlc3QoaW50ZWdlcik7XG59XG4iLCIvKipcbiAqIFZhbGlkYXRlIGlmIHRoZSBzdHJpbmcgaXMgZW1wdHlcbiAqIEBwYXJhbSAge3N0cmluZ30gaW5wdXRcbiAqIEByZXR1cm4ge2Jvb2xlYW59XG4gKi9cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uKGlucHV0KSB7XG4gIHJldHVybiBpbnB1dC50cmltKCkgIT09ICcnO1xufVxuIiwiLyoqXG4gKiBWYWxpZGF0ZSB1cmxcbiAqIEBwYXJhbSAge3N0cmluZ30gdXJsIGlucHV0XG4gKiBAcmV0dXJuIHtib29sZWFufVxuICovXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbih1cmwpIHtcbiAgdmFyIHJlID0gL14oaHR0cHM/OlxcL1xcLyk/KFtcXGRhLXpcXC4tXSspXFwuKFthLXpcXC5dezIsNn0pKFtcXC9cXHcgXFwuLV0qKSpcXC8/JC87XG4gIHJldHVybiByZS50ZXN0KHVybCk7XG59XG4iXX0=
