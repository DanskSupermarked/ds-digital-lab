(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
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

},{}],2:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (selector) {
  var $root = arguments.length <= 1 || arguments[1] === undefined ? document : arguments[1];

  return Array.prototype.slice.call($root.querySelectorAll(selector));
};

},{}],3:[function(require,module,exports){
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

},{}],4:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function () {
  var threshold = arguments.length <= 0 || arguments[0] === undefined ? 0.5 : arguments[0];

  var $lazyImages = (0, _getAll2.default)('.lazy-image');

  window.requestAnimationFrame(function () {
    $lazyImages.forEach(function ($lazyImage) {
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

},{"../dom/get-all":2,"../scroll/visible":7}],5:[function(require,module,exports){
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

},{"../dom/get-document-offset-top":3}],6:[function(require,module,exports){
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

    if (!scrolledDown && currentScrollPos > threshold && currentScrollPos > lastScrollPos) {
      downCallback();
      scrolledDown = true;
    } else if (scrolledDown && (currentScrollPos <= threshold || currentScrollPos < lastScrollPos) && currentScrollPos + window.innerHeight < document.body.clientHeight) {
      upCallback();
      scrolledDown = false;
    }

    lastScrollPos = currentScrollPos;
  };

  window.addEventListener('scroll', (0, _debounce2.default)(isScrolling));
  document.addEventListener('DOMContentLoaded', isScrolling);
};

var _debounce = require('../async/debounce');

var _debounce2 = _interopRequireDefault(_debounce);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

},{"../async/debounce":1}],7:[function(require,module,exports){
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

},{"../async/debounce":1,"./has-scrolled-past":5}],8:[function(require,module,exports){
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

},{"./is-date":10,"./is-email":11,"./is-float":12,"./is-int":13,"./is-required":14,"./is-url":15}],9:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function () {

  (0, _getAll2.default)('input.validate').forEach(function ($validateField) {

    // Find relevat validation methods
    var validatorNames = [];
    for (var key in $validateField.dataset) {
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
        return !_2.default['is' + validatorName](input);
      });

      if (valid) {
        $validateField.classList.add('validate--valid');
        $validateField.classList.remove('validate--not-valid');
      } else {
        $validateField.classList.add('validate--not-valid');
        $validateField.classList.remove('validate--valid');
      }
    });
  });
};

var _getAll = require('../dom/get-all');

var _getAll2 = _interopRequireDefault(_getAll);

var _ = require('./');

var _2 = _interopRequireDefault(_);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

},{"../dom/get-all":2,"./":8}],10:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (date) {
  return !isNaN(Date.parse(date));
};

},{}],11:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (email) {
  var re = /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/;
  return re.test(email);
};

},{}],12:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (float) {
  var re = /^(?:[-+]?(?:[0-9]+))?(?:\.[0-9]*)?(?:[eE][\+\-]?(?:[0-9]+))?$/;
  return float !== '' && re.test(float);
};

},{}],13:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (integer) {
  var re = /^(?:[-+]?(?:0|[1-9][0-9]*))$/;
  return re.test(integer);
};

},{}],14:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (input) {
  return input.trim() !== '';
};

},{}],15:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (url) {
  var re = /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/;
  return re.test(url);
};

},{}],16:[function(require,module,exports){
module.exports={
  "seconds": 60,
  "minutes": 60,
  "hours": 24,
  "days": 7,
  "weeks": 4,
  "months": 12
}

},{}],17:[function(require,module,exports){
var converter = module.exports = {
  cutoff: require('./cutoff/cutoff.json'),
  suffixDictionary: require('./suffix/suffix-dictionary.json'),
  timeCalcs: require('./time-calculations')
}
converter.timeAgo = require('./time-ago/time-ago.js').bind(converter)

},{"./cutoff/cutoff.json":16,"./suffix/suffix-dictionary.json":18,"./time-ago/time-ago.js":19,"./time-calculations":20}],18:[function(require,module,exports){
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

},{}],19:[function(require,module,exports){
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

},{}],20:[function(require,module,exports){
module.exports = {
  seconds: require('./time-ago/seconds-ago.js'),
  minutes: require('./time-ago/minutes-ago.js'),
  hours: require('./time-ago/hours-ago.js'),
  days: require('./time-ago/days-ago.js'),
  weeks: require('./time-ago/weeks-ago.js'),
  months: require('./time-ago/months-ago.js'),
  years: require('./time-ago/years-ago.js')
}

},{"./time-ago/days-ago.js":21,"./time-ago/hours-ago.js":22,"./time-ago/minutes-ago.js":23,"./time-ago/months-ago.js":24,"./time-ago/seconds-ago.js":25,"./time-ago/weeks-ago.js":26,"./time-ago/years-ago.js":27}],21:[function(require,module,exports){
module.exports = DaysAgo

function DaysAgo (pastEpoch, currentEpoch) {
  var daysAgo = (currentEpoch - pastEpoch) / 1000 / 60 / 60 / 24
  return daysAgo
}

},{}],22:[function(require,module,exports){
module.exports = HoursAgo

function HoursAgo (pastEpoch, currentEpoch) {
  var hoursAgo = (currentEpoch - pastEpoch) / 1000 / 60 / 60
  return hoursAgo
}

},{}],23:[function(require,module,exports){
module.exports = MinutesAgo

function MinutesAgo (pastEpoch, currentEpoch) {
  var minutesAgo = (currentEpoch - pastEpoch) / 1000 / 60
  return minutesAgo
}

},{}],24:[function(require,module,exports){
module.exports = MonthsAgo

function MonthsAgo (pastEpoch, currentEpoch) {
  var monthsAgo = (currentEpoch - pastEpoch) / 1000 / 60 / 60 / 24 / 31
  return monthsAgo
}

},{}],25:[function(require,module,exports){
module.exports = SecondsAgo

function SecondsAgo (pastEpoch, currentEpoch) {
  var secondsAgo = (currentEpoch - pastEpoch) / 1000
  return secondsAgo
}

},{}],26:[function(require,module,exports){
module.exports = WeeksAgo

function WeeksAgo (pastEpoch, currentEpoch) {
  var weeksAgo = (currentEpoch - pastEpoch) / 1000 / 60 / 60 / 24 / 7
  return weeksAgo
}

},{}],27:[function(require,module,exports){
module.exports = YearsAgo

function YearsAgo (pastEpoch, currentEpoch) {
  var yearsAgo = (currentEpoch - pastEpoch) / 1000 / 60 / 60 / 24 / 31 / 12
  return yearsAgo
}

},{}],28:[function(require,module,exports){
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

},{"../lib/get-logged-in-data":35,"ds-assets/async/debounce":1,"ds-assets/dom/get-all":2,"ds-assets/scroll/scroll-change":6}],29:[function(require,module,exports){
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

},{"../lib/api":32,"../lib/form/live-validation":33,"../lib/form/validate":34,"../lib/get-logged-in-data":35,"../templates/response":44,"../templates/response-meta":43,"ds-assets/dom/get-all":2,"ds-assets/dom/get-document-offset-top":3,"ds-assets/lazy/images":4}],30:[function(require,module,exports){
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

},{"../lib/api":32,"../templates/author":41,"../templates/post":42,"../templates/tag":45,"ds-assets/dom/get-all":2,"ds-assets/lazy/images":4}],31:[function(require,module,exports){
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
	});
};

/**
 * Tool tip showed when user marks text in article.
 * This makes the use able to share/comment on the marked.
 */

// Cached dom elements
var $postContent;
var $toolTip;
var $twitter;

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

},{}],32:[function(require,module,exports){
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

},{}],33:[function(require,module,exports){
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

},{"./validate":34}],34:[function(require,module,exports){
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

},{}],35:[function(require,module,exports){
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

},{}],36:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (string) {
  var htmlEncodedValue = document.createElement('div').appendChild(document.createTextNode(string)).parentNode.innerHTML;
  return htmlEncodedValue.replace(/\r?\n/g, '<br>');
};

},{}],37:[function(require,module,exports){
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

},{"ds-assets/dom/get-all":2}],38:[function(require,module,exports){
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

},{"./strip-html-tags":39,"word-count":46}],39:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

exports.default = function (html) {
	var tmp = document.createElement('div');
	tmp.innerHTML = html;
	return tmp.textContent || tmp.innerText || '';
};

},{}],40:[function(require,module,exports){
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

},{"./components/navigation":28,"./components/response":29,"./components/search":30,"./components/tool-tip":31,"./lib/api":32,"./lib/get-logged-in-data":35,"ds-assets/dom/get-all":2,"ds-assets/lazy/images":4,"ds-assets/validate/input-fields":9}],41:[function(require,module,exports){
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

},{}],42:[function(require,module,exports){
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

},{"../lib/image-converter":37,"../lib/read-time":38,"epoch-to-timeago":17}],43:[function(require,module,exports){
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

},{}],44:[function(require,module,exports){
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

  var excerpt = response.excerpt || response.text;

  var readMore = '';
  if (response.excerpt) {
    readMore = '\n<p class="response__text small hidden">' + (0, _htmlEncode2.default)(response.text) + '</p>\n<p><a href="#" class="btn response__read-more">Read more</a></p>\n';
  }

  var name = '' + (0, _htmlEncode2.default)(response.name);
  if (response.website) {
    name = '<a href="' + (0, _htmlEncode2.default)(response.website) + '">' + name + '</a>';
  }

  return '\n<div class="' + classes + ' small">\n  <div class="author">\n    <table>\n      <tr>\n        ' + image + '\n        <td>\n          <span class="author__name">' + name + '</span><br>\n          ' + response.timeAgo + readTime + '\n        </td>\n      </tr>\n    </table>\n  </div>\n  <a href="#" class="response__delete" data-published="' + response.published + '" data-name="' + response.name + '"><img data-src="/assets/images/trash.svg" class="lazy-image"></a>\n  <p class="response__excerpt">' + (0, _htmlEncode2.default)(excerpt) + '</p>\n  ' + readMore + '\n</div>';
};

var _htmlEncode = require('../lib/html-encode');

var _htmlEncode2 = _interopRequireDefault(_htmlEncode);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

},{"../lib/html-encode":36}],45:[function(require,module,exports){
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

},{}],46:[function(require,module,exports){
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

},{}]},{},[40])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJub2RlX21vZHVsZXMvZHMtYXNzZXRzL2FzeW5jL2RlYm91bmNlLmpzIiwibm9kZV9tb2R1bGVzL2RzLWFzc2V0cy9kb20vZ2V0LWFsbC5qcyIsIm5vZGVfbW9kdWxlcy9kcy1hc3NldHMvZG9tL2dldC1kb2N1bWVudC1vZmZzZXQtdG9wLmpzIiwibm9kZV9tb2R1bGVzL2RzLWFzc2V0cy9sYXp5L2ltYWdlcy5qcyIsIm5vZGVfbW9kdWxlcy9kcy1hc3NldHMvc2Nyb2xsL2hhcy1zY3JvbGxlZC1wYXN0LmpzIiwibm9kZV9tb2R1bGVzL2RzLWFzc2V0cy9zY3JvbGwvc2Nyb2xsLWNoYW5nZS5qcyIsIm5vZGVfbW9kdWxlcy9kcy1hc3NldHMvc2Nyb2xsL3Zpc2libGUuanMiLCJub2RlX21vZHVsZXMvZHMtYXNzZXRzL3ZhbGlkYXRlL2luZGV4LmpzIiwibm9kZV9tb2R1bGVzL2RzLWFzc2V0cy92YWxpZGF0ZS9pbnB1dC1maWVsZHMuanMiLCJub2RlX21vZHVsZXMvZHMtYXNzZXRzL3ZhbGlkYXRlL2lzLWRhdGUuanMiLCJub2RlX21vZHVsZXMvZHMtYXNzZXRzL3ZhbGlkYXRlL2lzLWVtYWlsLmpzIiwibm9kZV9tb2R1bGVzL2RzLWFzc2V0cy92YWxpZGF0ZS9pcy1mbG9hdC5qcyIsIm5vZGVfbW9kdWxlcy9kcy1hc3NldHMvdmFsaWRhdGUvaXMtaW50LmpzIiwibm9kZV9tb2R1bGVzL2RzLWFzc2V0cy92YWxpZGF0ZS9pcy1yZXF1aXJlZC5qcyIsIm5vZGVfbW9kdWxlcy9kcy1hc3NldHMvdmFsaWRhdGUvaXMtdXJsLmpzIiwibm9kZV9tb2R1bGVzL2Vwb2NoLXRvLXRpbWVhZ28vY3V0b2ZmL2N1dG9mZi5qc29uIiwibm9kZV9tb2R1bGVzL2Vwb2NoLXRvLXRpbWVhZ28vaW5kZXguanMiLCJub2RlX21vZHVsZXMvZXBvY2gtdG8tdGltZWFnby9zdWZmaXgvc3VmZml4LWRpY3Rpb25hcnkuanNvbiIsIm5vZGVfbW9kdWxlcy9lcG9jaC10by10aW1lYWdvL3RpbWUtYWdvL3RpbWUtYWdvLmpzIiwibm9kZV9tb2R1bGVzL2Vwb2NoLXRvLXRpbWVhZ28vdGltZS1jYWxjdWxhdGlvbnMvaW5kZXguanMiLCJub2RlX21vZHVsZXMvZXBvY2gtdG8tdGltZWFnby90aW1lLWNhbGN1bGF0aW9ucy90aW1lLWFnby9kYXlzLWFnby5qcyIsIm5vZGVfbW9kdWxlcy9lcG9jaC10by10aW1lYWdvL3RpbWUtY2FsY3VsYXRpb25zL3RpbWUtYWdvL2hvdXJzLWFnby5qcyIsIm5vZGVfbW9kdWxlcy9lcG9jaC10by10aW1lYWdvL3RpbWUtY2FsY3VsYXRpb25zL3RpbWUtYWdvL21pbnV0ZXMtYWdvLmpzIiwibm9kZV9tb2R1bGVzL2Vwb2NoLXRvLXRpbWVhZ28vdGltZS1jYWxjdWxhdGlvbnMvdGltZS1hZ28vbW9udGhzLWFnby5qcyIsIm5vZGVfbW9kdWxlcy9lcG9jaC10by10aW1lYWdvL3RpbWUtY2FsY3VsYXRpb25zL3RpbWUtYWdvL3NlY29uZHMtYWdvLmpzIiwibm9kZV9tb2R1bGVzL2Vwb2NoLXRvLXRpbWVhZ28vdGltZS1jYWxjdWxhdGlvbnMvdGltZS1hZ28vd2Vla3MtYWdvLmpzIiwibm9kZV9tb2R1bGVzL2Vwb2NoLXRvLXRpbWVhZ28vdGltZS1jYWxjdWxhdGlvbnMvdGltZS1hZ28veWVhcnMtYWdvLmpzIiwic3JjL3NjcmlwdHMvY29tcG9uZW50cy9uYXZpZ2F0aW9uLmpzIiwic3JjL3NjcmlwdHMvY29tcG9uZW50cy9yZXNwb25zZS5qcyIsInNyYy9zY3JpcHRzL2NvbXBvbmVudHMvc2VhcmNoLmpzIiwic3JjL3NjcmlwdHMvY29tcG9uZW50cy90b29sLXRpcC5qcyIsInNyYy9zY3JpcHRzL2xpYi9hcGkuanMiLCJzcmMvc2NyaXB0cy9saWIvZm9ybS9saXZlLXZhbGlkYXRpb24uanMiLCJzcmMvc2NyaXB0cy9saWIvZm9ybS92YWxpZGF0ZS5qcyIsInNyYy9zY3JpcHRzL2xpYi9nZXQtbG9nZ2VkLWluLWRhdGEuanMiLCJzcmMvc2NyaXB0cy9saWIvaHRtbC1lbmNvZGUuanMiLCJzcmMvc2NyaXB0cy9saWIvaW1hZ2UtY29udmVydGVyLmpzIiwic3JjL3NjcmlwdHMvbGliL3JlYWQtdGltZS5qcyIsInNyYy9zY3JpcHRzL2xpYi9zdHJpcC1odG1sLXRhZ3MuanMiLCJzcmMvc2NyaXB0cy9tYWluLmpzIiwic3JjL3NjcmlwdHMvdGVtcGxhdGVzL2F1dGhvci5qcyIsInNyYy9zY3JpcHRzL3RlbXBsYXRlcy9wb3N0LmpzIiwic3JjL3NjcmlwdHMvdGVtcGxhdGVzL3Jlc3BvbnNlLW1ldGEuanMiLCJzcmMvc2NyaXB0cy90ZW1wbGF0ZXMvcmVzcG9uc2UuanMiLCJzcmMvc2NyaXB0cy90ZW1wbGF0ZXMvdGFnLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3dvcmQtY291bnQvaW5kZXguanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7a0JDTWUsVUFBUyxRQUFULEVBQW1CLE9BQW5CLEVBQTRCO0FBQ3pDLE1BQUksVUFBVSxLQUFWLENBRHFDO0FBRXpDLE1BQUksT0FBTyxTQUFQLElBQU8sR0FBTTtBQUNmLGNBQVUsS0FBVixDQURlO0dBQU4sQ0FGOEI7QUFLekMsU0FBTyxZQUFXO0FBQ2hCLFFBQUksT0FBSixFQUFhO0FBQ1gsYUFEVztLQUFiO0FBR0EsY0FBVSxJQUFWLENBSmdCO0FBS2hCLGFBQVMsS0FBVCxDQUFlLElBQWYsRUFBcUIsU0FBckIsRUFMZ0I7QUFNaEIsUUFBSSxDQUFDLE9BQUQsRUFBVTtBQUNaLGFBQU8scUJBQVAsQ0FBNkIsSUFBN0IsRUFEWTtLQUFkLE1BRU87QUFDTCxhQUFPLFVBQVAsQ0FBa0IsSUFBbEIsRUFBd0IsT0FBeEIsRUFESztLQUZQO0dBTkssQ0FMa0M7Q0FBNUI7Ozs7Ozs7OztrQkNBQSxVQUFTLFFBQVQsRUFBcUM7TUFBbEIsOERBQVEsd0JBQVU7O0FBQ2xELFNBQU8sTUFBTSxTQUFO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QixxQkFmRixDQWhDZ0M7Q0FBbkI7Ozs7Ozs7Ozs7Ozs7OztrQkNGQSxVQUFTLEdBQVQsRUFBYzs7QUFFM0IsVUFBUSxHQUFSLENBQVksR0FBWixFQUYyQjs7QUFJM0IsTUFBSSxhQUFhLEVBQWIsQ0FKdUI7QUFLM0IsTUFBSSxJQUFJLEtBQUosRUFBVztBQUNiLHVDQUNhLElBQUksS0FBSiw0REFBZ0UsSUFBSSxJQUFKLFVBRDdFLENBRGE7R0FBZjs7QUFNQSxtTUFLMkQsSUFBSSxJQUFKLFVBQWEsSUFBSSxJQUFKLHlDQUN6RCxJQUFJLEtBQUosQ0FBVSxLQUFWLHdGQUtiLDBCQUNHLElBQUksV0FBSixJQUFtQixFQUFuQixrQ0FDYyxJQUFJLElBQUosOERBYm5CLENBWDJCO0NBQWQ7OztBQ0FmO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiLyoqXG4gKiBNYWtlIHN1cmUgYSBmdW5jdGlvbiBvbmx5IGlzIHJ1biBldmVyeSB4IG1zXG4gKiBAcGFyYW0gIHtGdW5jdGlvbn0gY2FsbGJhY2sgTWV0aG9kIHRvIGV4ZWN1dGUgaWYgaXQgaXMgbm90IGRlYm91bmNlZFxuICogQHBhcmFtICB7aW50ZWdlcn0gIHRpbWVvdXQgIE1pbGxpc2Vjb25kcyB0byB3YWl0IGJlZm9yZSBuZXh0IGFsbG93ZWQgY2FsbGJhY2suIERlZmF1bHRzIHRvIHRoZSBhbmltYXRpb24gZnJhbWUgcmF0ZSBpbiB0aGUgYnJvd3NlclxuICogQHJldHVybiB7dm9pZH1cbiAqL1xuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24oY2FsbGJhY2ssIHRpbWVvdXQpIHtcbiAgdmFyIHBlbmRpbmcgPSBmYWxzZTtcbiAgdmFyIGRvbmUgPSAoKSA9PiB7XG4gICAgcGVuZGluZyA9IGZhbHNlO1xuICB9O1xuICByZXR1cm4gZnVuY3Rpb24oKSB7XG4gICAgaWYgKHBlbmRpbmcpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgcGVuZGluZyA9IHRydWU7XG4gICAgY2FsbGJhY2suYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgICBpZiAoIXRpbWVvdXQpIHtcbiAgICAgIHdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUoZG9uZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHdpbmRvdy5zZXRUaW1lb3V0KGRvbmUsIHRpbWVvdXQpO1xuICAgIH1cbiAgfTtcbn1cbiIsIi8qKlxuICogR2V0IGFuIGFycmF5IG9mIGRvbSBlbGVtZW50cyBtYXRjaGluZyB0aGUgc2VsZWN0b3JcbiAqIEBwYXJhbSAge3N0cmluZ30gICAgIHNlbGVjdG9yXG4gKiBAcGFyYW0gIHtET01lbGVtZW50fSBET00gZWxlbWVudCB0byBzZWFyY2ggaW4uIERlZmF1bHRzIHRvIGRvY3VtZW50XG4gKiBAcmV0dXJuIHthcnJheX1cbiAqL1xuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24oc2VsZWN0b3IsICRyb290ID0gZG9jdW1lbnQpIHtcbiAgcmV0dXJuIEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKCRyb290LnF1ZXJ5U2VsZWN0b3JBbGwoc2VsZWN0b3IpKTtcbn1cbiIsIi8qKlxuICogR2V0IHRoZSBlbGVtZW50cyBvZmZzZXQgcmVsYXRpdmUgdG8gdGhlIGRvY3VtZW50XG4gKiBAcGFyYW0gIHtET01FbGVtZW50fSAkZWxlbWVudCBFbGVtZW50IHRvIGdldCB0aGUgb2Zmc2V0IGZyb21cbiAqIEByZXR1cm4ge2ludGVnZXJ9ICAgICAgICAgICAgIE9mZnNldCBpbiBwaXhlbHNcbiAqL1xuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24oJGVsZW1lbnQpIHtcbiAgdmFyIG9mZnNldCA9IDA7XG5cbiAgd2hpbGUgKCRlbGVtZW50ICYmICFpc05hTigkZWxlbWVudC5vZmZzZXRUb3ApKSB7XG4gICAgb2Zmc2V0ICs9ICRlbGVtZW50Lm9mZnNldFRvcDtcbiAgICAkZWxlbWVudCA9ICRlbGVtZW50Lm9mZnNldFBhcmVudDtcbiAgfVxuICByZXR1cm4gb2Zmc2V0O1xufVxuIiwiLyoqXG4gKiBMYXp5IGxvYWQgaW1hZ2VzIHdpdGggY2xhc3MgLmxhenktaW1hZ2VzLlxuICogRGVwZW5kaW5nIG9uIHRoZSB0cmVzaG9sZCBpbWFnZXMgd2lsbCBsb2FkIGFzIHRoZSB1c2VyIHNjcm9sbHMgZG93biBvbiB0aGVcbiAqIGRvY3VtZW50LlxuICovXG5cbi8vIERlcGVuZGVuY2Vpc1xuaW1wb3J0IGdldEFsbEVsZW1lbnRzIGZyb20gJy4uL2RvbS9nZXQtYWxsJztcbmltcG9ydCBzY3JvbGxWaXNpYmxlIGZyb20gJy4uL3Njcm9sbC92aXNpYmxlJztcblxuLy8gTG9hZCBpbWFnZSBlbGVtZW50XG52YXIgbG9hZEltZyA9IGZ1bmN0aW9uKCRpbWcpIHtcblxuICBpZiAoJGltZy5kYXRhc2V0LnNyYykge1xuICAgICRpbWcuc2V0QXR0cmlidXRlKCdzcmMnLCAkaW1nLmRhdGFzZXQuc3JjKTtcbiAgfVxuICBpZiAoJGltZy5kYXRhc2V0LnNyY3NldCkge1xuICAgICRpbWcuc2V0QXR0cmlidXRlKCdzcmNzZXQnLCAkaW1nLmRhdGFzZXQuc3Jjc2V0KTtcbiAgfVxufTtcblxuLy8gTG9hZCBwaWN0dXJlIGVsZW1lbnRcbnZhciBsb2FkUGljdHVyZSA9IGZ1bmN0aW9uKCRwaWN0dXJlKSB7XG4gIGxvYWRJbWcoJHBpY3R1cmUucXVlcnlTZWxlY3RvcignaW1nJykpO1xuICB2YXIgJHNvdXJjZXMgPSBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbCgkcGljdHVyZS5xdWVyeVNlbGVjdG9yQWxsKCdzb3VyY2UnKSk7XG4gICRzb3VyY2VzLmZvckVhY2goJHNvdXJjZSA9PiAkc291cmNlLnNldEF0dHJpYnV0ZSgnc3Jjc2V0JywgJHNvdXJjZS5kYXRhc2V0LnNyY3NldCkpO1xufTtcblxudmFyIGxvYWRFbGVtZW50ID0gZnVuY3Rpb24oJGVsZW1lbnQpIHtcbiAgaWYgKCRlbGVtZW50Lm1hdGNoZXMoJ3BpY3R1cmUnKSkge1xuICAgIGxvYWRQaWN0dXJlKCRlbGVtZW50KTtcbiAgfSBlbHNlIGlmICgkZWxlbWVudC5tYXRjaGVzKCdpbWcnKSkge1xuICAgIGxvYWRJbWcoJGVsZW1lbnQpO1xuICB9XG5cbiAgLy8gTWFrZSBzdXJlIHBpY3R1cmVmaWxsIHdpbGwgdXBkYXRlIHRoZSBpbWFnZSB3aGVuIHNvdXJjZSBoYXMgY2hhbmdlZFxuICBpZiAod2luZG93LnBpY3R1cmVmaWxsKSB7XG4gICAgd2luZG93LnBpY3R1cmVmaWxsKHtcbiAgICAgIHJlZXZhbHVhdGU6IHRydWVcbiAgICB9KTtcbiAgfVxufTtcblxuLyoqXG4gKiBBY3RpdmF0ZSBsYXp5IGxvYWQgb2YgaW1hZ2VzIGFzIHVzZXIgc2Nyb2xsc1xuICogQHBhcmFtICB7ZmxvYXR9IHRocmVzaG9sZCAgUGVyY2VudCBiZWxvdyBzY3JlZW4gdG8gaW5pdGlhbGl6ZSBsb2FkIG9mIGltYWdlXG4gKiBAcmV0dXJuIHt2b2lkfVxuICovXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbih0aHJlc2hvbGQgPSAwLjUpIHtcbiAgdmFyICRsYXp5SW1hZ2VzID0gZ2V0QWxsRWxlbWVudHMoJy5sYXp5LWltYWdlJyk7XG5cbiAgd2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZShmdW5jdGlvbigpIHtcbiAgICAkbGF6eUltYWdlcy5mb3JFYWNoKGZ1bmN0aW9uKCRsYXp5SW1hZ2UpIHtcbiAgICAgIHNjcm9sbFZpc2libGUoJGxhenlJbWFnZSwgdGhyZXNob2xkKVxuICAgICAgICAudGhlbigoKSA9PiBsb2FkRWxlbWVudCgkbGF6eUltYWdlKSk7XG4gICAgfSk7XG4gIH0pO1xuXG59XG4iLCIvLyBEZXBlbmRlbmNpZXNcbmltcG9ydCBnZXREb2N1bWVudE9mZnNldFRvcCBmcm9tICcuLi9kb20vZ2V0LWRvY3VtZW50LW9mZnNldC10b3AnO1xuXG4vKipcbiAqIENoZWNrcyBpZiB0aGUgdXNlciBoYXMgc2Nyb2xsZWQgdG8gb3IgcGFzdCBhbiBlbGVtZW50XG4gKiBAcGFyYW0gIHtET01FbGVtZW50fSAkZWxlbWVudCAgVGhlIGVsZW1lbnQgdG8gY2hlY2sgYWdhaW5zdFxuICogQHBhcmFtICB7ZmxvYXR9ICAgICAgdGhyZXNob2xkIERpc3RhbmNlIGluIHBlcmNlbnQgb2YgdGhlIHNjZWVlbiBoZWlnaHQgdG8gbWVhc3VyZSBhZ2FpbnN0LlxuICogQHJldHVybiB7Ym9vbGVhbn1cbiAqL1xuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24oJGVsZW1lbnQsIHRocmVzaG9sZCA9IDApIHtcbiAgdmFyIHNjcm9sbEJvdHRvbSA9ICh3aW5kb3cuc2Nyb2xsWSB8fCBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuc2Nyb2xsVG9wKSArICh3aW5kb3cuaW5uZXJIZWlnaHQgKiAoMSArIHRocmVzaG9sZCkpO1xuICB2YXIgb2Zmc2V0VG9wID0gZ2V0RG9jdW1lbnRPZmZzZXRUb3AoJGVsZW1lbnQpO1xuICByZXR1cm4gKHNjcm9sbEJvdHRvbSA+IG9mZnNldFRvcCk7XG59XG4iLCIvLyBkZXBlbmRlbmNpZXNcbmltcG9ydCBkZWJvdW5jZSBmcm9tICcuLi9hc3luYy9kZWJvdW5jZSc7XG5cbi8qKlxuICogUnVucyBzY3JpcHRzIGVhY2ggdGltZSB0aGUgdXNlciBjaGFuZ2VzIHNjcm9sbCBkaXJlY3Rpb25cbiAqIEBwYXJhbSAge0Z1bmN0aW9ufSBkb3duQ2FsbGJhY2sgIENhbGxiYWNrIGV2ZXJ5IHRpbWUgdGhlIHVzZXIgc3RhcnRzIHNjcm9sbGluZyBkb3duXG4gKiBAcGFyYW0gIHtGdW5jdGlvbn0gdXBDYWxsYmFjayAgICBDYWxsYmFjayBldmVyeSB0aW1lIHRoZSB1c2VyIHN0YXJ0cyBzY3JvbGxpbmcgdXBcbiAqIEBwYXJhbSAge2Zsb2F0fSAgICB0aHJlc2hvbGQgICAgIE1hcmdpbiBpbiB0b3Agd2hlcmUgc2Nyb2xsIGRvd24gaXMgaWdub3JlZCAoY291bGQgYmUgdXNlZCBmb3IgbmF2cylcbiAqIEByZXR1cm4ge3ZvaWR9XG4gKi9cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uKGRvd25DYWxsYmFjayA9IGZ1bmN0aW9uKCkge30sIHVwQ2FsbGJhY2sgPSBmdW5jdGlvbigpIHt9LCB0aHJlc2hvbGQgPSAwKSB7XG5cbiAgdmFyIGxhc3RTY3JvbGxQb3MgPSAwO1xuICB2YXIgc2Nyb2xsZWREb3duID0gZmFsc2U7XG5cbiAgdmFyIGlzU2Nyb2xsaW5nID0gZnVuY3Rpb24oKSB7XG4gICAgdmFyIGN1cnJlbnRTY3JvbGxQb3MgPSB3aW5kb3cuc2Nyb2xsWTtcblxuICAgIGlmICghc2Nyb2xsZWREb3duICYmXG4gICAgICBjdXJyZW50U2Nyb2xsUG9zID4gdGhyZXNob2xkICYmXG4gICAgICBjdXJyZW50U2Nyb2xsUG9zID4gbGFzdFNjcm9sbFBvcykge1xuICAgICAgZG93bkNhbGxiYWNrKCk7XG4gICAgICBzY3JvbGxlZERvd24gPSB0cnVlO1xuICAgIH0gZWxzZSBpZiAoc2Nyb2xsZWREb3duICYmXG4gICAgICAoY3VycmVudFNjcm9sbFBvcyA8PSB0aHJlc2hvbGQgfHwgY3VycmVudFNjcm9sbFBvcyA8IGxhc3RTY3JvbGxQb3MpICYmXG4gICAgICAoY3VycmVudFNjcm9sbFBvcyArIHdpbmRvdy5pbm5lckhlaWdodCA8IGRvY3VtZW50LmJvZHkuY2xpZW50SGVpZ2h0KSkge1xuICAgICAgdXBDYWxsYmFjaygpO1xuICAgICAgc2Nyb2xsZWREb3duID0gZmFsc2U7XG4gICAgfVxuXG4gICAgbGFzdFNjcm9sbFBvcyA9IGN1cnJlbnRTY3JvbGxQb3M7XG4gIH07XG5cbiAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3Njcm9sbCcsIGRlYm91bmNlKGlzU2Nyb2xsaW5nKSk7XG4gIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ0RPTUNvbnRlbnRMb2FkZWQnLCBpc1Njcm9sbGluZyk7XG59XG4iLCIvLyBEZXBlbmRlbmNlaXNcbmltcG9ydCBkZWJvdW5jZSBmcm9tICcuLi9hc3luYy9kZWJvdW5jZSc7XG5pbXBvcnQgaGFzU2Nyb2xsZWRQYXN0IGZyb20gJy4vaGFzLXNjcm9sbGVkLXBhc3QnO1xuXG4vKipcbiAqIEZ1bGZpbGwgYSBwcm9taXNlLCB3aGVuIHRoZSBlbGVtZW50IGlzIHZpc2libGUgKHNjcm9sbGVkIHRvIG9yIHBhc3QpXG4gKiBAcGFyYW0gIHtET01FbGVtZW50fSAkZWxlbWVudCAgRWxlbWVudCB0byBjaGVja1xuICogQHBhcmFtICB7ZmxvYXR9ICAgICAgdGhyZXNob2xkIERpc3RhbmNlIGluIHBlcmNlbnRcbiAqIEByZXR1cm4ge1t0eXBlXX0gICAgICAgICAgIFtkZXNjcmlwdGlvbl1cbiAqL1xuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24oJGVsZW1lbnQsIHRocmVzaG9sZCA9IDApIHtcblxuICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24ocmVzb2x2ZSkge1xuXG4gICAgdmFyIGNoZWNrRWxlbWVudCA9IGRlYm91bmNlKGZ1bmN0aW9uKCkge1xuICAgICAgaWYgKGhhc1Njcm9sbGVkUGFzdCgkZWxlbWVudCwgdGhyZXNob2xkKSkge1xuICAgICAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcignc2Nyb2xsJywgY2hlY2tFbGVtZW50KTtcbiAgICAgICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3Jlc2l6ZScsIGNoZWNrRWxlbWVudCk7XG4gICAgICAgIHJlc29sdmUoKTtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdzY3JvbGwnLCBjaGVja0VsZW1lbnQpO1xuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdyZXNpemUnLCBjaGVja0VsZW1lbnQpO1xuICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ0RPTUNvbnRlbnRMb2FkZWQnLCBjaGVja0VsZW1lbnQpO1xuICAgIHNldFRpbWVvdXQoY2hlY2tFbGVtZW50LCAwKTtcbiAgfSk7XG59XG4iLCIvKipcbiAqIEhlbHBlcnMgZm9yIHZhbGlkYXRpbmcgaW5wdXQgZmllbGRzXG4gKi9cblxuaW1wb3J0IGlzRGF0ZSBmcm9tICcuL2lzLWRhdGUnO1xuaW1wb3J0IGlzRW1haWwgZnJvbSAnLi9pcy1lbWFpbCc7XG5pbXBvcnQgaXNGbG9hdCBmcm9tICcuL2lzLWZsb2F0JztcbmltcG9ydCBpc0ludCBmcm9tICcuL2lzLWludCc7XG5pbXBvcnQgaXNSZXF1aXJlZCBmcm9tICcuL2lzLXJlcXVpcmVkJztcbmltcG9ydCBpc1VybCBmcm9tICcuL2lzLXVybCc7XG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgaXNEYXRlLFxuICBpc0VtYWlsLFxuICBpc0Zsb2F0LFxuICBpc0ludCxcbiAgaXNSZXF1aXJlZCxcbiAgaXNVcmxcbn07XG4iLCJpbXBvcnQgZ2V0QWxsRWxlbWVudHMgZnJvbSAnLi4vZG9tL2dldC1hbGwnO1xuaW1wb3J0IHZhbGlkYXRlIGZyb20gJy4vJztcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24oKSB7XG5cbiAgZ2V0QWxsRWxlbWVudHMoJ2lucHV0LnZhbGlkYXRlJykuZm9yRWFjaChmdW5jdGlvbigkdmFsaWRhdGVGaWVsZCkge1xuXG4gICAgLy8gRmluZCByZWxldmF0IHZhbGlkYXRpb24gbWV0aG9kc1xuICAgIHZhciB2YWxpZGF0b3JOYW1lcyA9IFtdO1xuICAgIGZvciAodmFyIGtleSBpbiAkdmFsaWRhdGVGaWVsZC5kYXRhc2V0KSB7XG4gICAgICBpZiAoa2V5ICE9PSAndmFsaWRhdGUnICYmIGtleS5pbmRleE9mKCd2YWxpZGF0ZScpID09PSAwKSB7XG4gICAgICAgIHZhciB2YWxpZGF0b3JOYW1lID0ga2V5LnJlcGxhY2UoJ3ZhbGlkYXRlJywgJycpO1xuXG4gICAgICAgIGlmICh2YWxpZGF0ZVsnaXMnICsgdmFsaWRhdG9yTmFtZV0pIHtcbiAgICAgICAgICB2YWxpZGF0b3JOYW1lcy5wdXNoKHZhbGlkYXRvck5hbWUpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKHZhbGlkYXRvck5hbWVzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIC8vIENoZWNrIHZhbGlkYXRpb24gd2hlbiBpbnB1dCBvbiBmaWVsZCBpcyBjaGFuZ2VkXG4gICAgJHZhbGlkYXRlRmllbGQuYWRkRXZlbnRMaXN0ZW5lcignaW5wdXQnLCBmdW5jdGlvbigpIHtcbiAgICAgIHZhciBpbnB1dCA9ICR2YWxpZGF0ZUZpZWxkLnZhbHVlO1xuICAgICAgdmFyIHZhbGlkID0gIXZhbGlkYXRvck5hbWVzLnNvbWUoZnVuY3Rpb24odmFsaWRhdG9yTmFtZSkge1xuICAgICAgICByZXR1cm4gIXZhbGlkYXRlWydpcycgKyB2YWxpZGF0b3JOYW1lXShpbnB1dCk7XG4gICAgICB9KTtcblxuICAgICAgaWYgKHZhbGlkKSB7XG4gICAgICAgICR2YWxpZGF0ZUZpZWxkLmNsYXNzTGlzdC5hZGQoJ3ZhbGlkYXRlLS12YWxpZCcpO1xuICAgICAgICAkdmFsaWRhdGVGaWVsZC5jbGFzc0xpc3QucmVtb3ZlKCd2YWxpZGF0ZS0tbm90LXZhbGlkJyk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICAkdmFsaWRhdGVGaWVsZC5jbGFzc0xpc3QuYWRkKCd2YWxpZGF0ZS0tbm90LXZhbGlkJyk7XG4gICAgICAgICR2YWxpZGF0ZUZpZWxkLmNsYXNzTGlzdC5yZW1vdmUoJ3ZhbGlkYXRlLS12YWxpZCcpO1xuICAgICAgfVxuICAgIH0pO1xuICB9KTtcbn1cbiIsIi8qKlxuICogVmFsaWRhdGUgdGhhdCBzdHJpbmcgY2FuIGJlIGNvbnZlcnRlZCB0byBkYXRlXG4gKiBAcGFyYW0gIHtzdHJpbmd9IGRhdGUgaW5wdXRcbiAqIEByZXR1cm4ge2Jvb2xlYW59XG4gKi9cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uKGRhdGUpIHtcbiAgcmV0dXJuICFpc05hTihEYXRlLnBhcnNlKGRhdGUpKTtcbn1cbiIsIi8qKlxuICogVmFsaWRhdGUgZS1tYWlsXG4gKiBAcGFyYW0gIHtzdHJpbmd9IGVtYWlsIGlucHV0XG4gKiBAcmV0dXJuIHtib29sZWFufVxuICovXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbihlbWFpbCkge1xuICB2YXIgcmUgPSAvXihbYS16MC05X1xcLi1dKylAKFtcXGRhLXpcXC4tXSspXFwuKFthLXpcXC5dezIsNn0pJC87XG4gIHJldHVybiByZS50ZXN0KGVtYWlsKTtcbn1cbiIsIi8qKlxuICogVmFsaWRhdGUgZmxvYXRcbiAqIEBwYXJhbSAge3N0cmluZ30gZmxvYXQgaW5wdXRcbiAqIEByZXR1cm4ge2Jvb2xlYW59XG4gKi9cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uKGZsb2F0KSB7XG4gIHZhciByZSA9IC9eKD86Wy0rXT8oPzpbMC05XSspKT8oPzpcXC5bMC05XSopPyg/OltlRV1bXFwrXFwtXT8oPzpbMC05XSspKT8kLztcbiAgcmV0dXJuIGZsb2F0ICE9PSAnJyAmJiByZS50ZXN0KGZsb2F0KTtcbn1cbiIsIi8qKlxuICogVmFsaWRhdGUgaW50ZWdldFxuICogQHBhcmFtICB7c3RyaW5nfSBpbnRlZ2VyIGlucHV0XG4gKiBAcmV0dXJuIHtib29sZWFufVxuICovXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbihpbnRlZ2VyKSB7XG4gIHZhciByZSA9IC9eKD86Wy0rXT8oPzowfFsxLTldWzAtOV0qKSkkLztcbiAgcmV0dXJuIHJlLnRlc3QoaW50ZWdlcik7XG59XG4iLCIvKipcbiAqIFZhbGlkYXRlIGlmIHRoZSBzdHJpbmcgaXMgZW1wdHlcbiAqIEBwYXJhbSAge3N0cmluZ30gaW5wdXRcbiAqIEByZXR1cm4ge2Jvb2xlYW59XG4gKi9cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uKGlucHV0KSB7XG4gIHJldHVybiBpbnB1dC50cmltKCkgIT09ICcnO1xufVxuIiwiLyoqXG4gKiBWYWxpZGF0ZSB1cmxcbiAqIEBwYXJhbSAge3N0cmluZ30gdXJsIGlucHV0XG4gKiBAcmV0dXJuIHtib29sZWFufVxuICovXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbih1cmwpIHtcbiAgdmFyIHJlID0gL14oaHR0cHM/OlxcL1xcLyk/KFtcXGRhLXpcXC4tXSspXFwuKFthLXpcXC5dezIsNn0pKFtcXC9cXHcgXFwuLV0qKSpcXC8/JC87XG4gIHJldHVybiByZS50ZXN0KHVybCk7XG59XG4iLCJtb2R1bGUuZXhwb3J0cz17XG4gIFwic2Vjb25kc1wiOiA2MCxcbiAgXCJtaW51dGVzXCI6IDYwLFxuICBcImhvdXJzXCI6IDI0LFxuICBcImRheXNcIjogNyxcbiAgXCJ3ZWVrc1wiOiA0LFxuICBcIm1vbnRoc1wiOiAxMlxufVxuIiwidmFyIGNvbnZlcnRlciA9IG1vZHVsZS5leHBvcnRzID0ge1xuICBjdXRvZmY6IHJlcXVpcmUoJy4vY3V0b2ZmL2N1dG9mZi5qc29uJyksXG4gIHN1ZmZpeERpY3Rpb25hcnk6IHJlcXVpcmUoJy4vc3VmZml4L3N1ZmZpeC1kaWN0aW9uYXJ5Lmpzb24nKSxcbiAgdGltZUNhbGNzOiByZXF1aXJlKCcuL3RpbWUtY2FsY3VsYXRpb25zJylcbn1cbmNvbnZlcnRlci50aW1lQWdvID0gcmVxdWlyZSgnLi90aW1lLWFnby90aW1lLWFnby5qcycpLmJpbmQoY29udmVydGVyKVxuIiwibW9kdWxlLmV4cG9ydHM9e1xuICBcInNlY29uZHNcIjoge1xuICAgIFwic2luZ3VsYXJcIjogXCIgc2Vjb25kIGFnb1wiLFxuICAgIFwicGx1cmFsXCI6IFwiIHNlY29uZHMgYWdvXCJcbiAgfSxcbiAgXCJtaW51dGVzXCI6IHtcbiAgICBcInNpbmd1bGFyXCI6IFwiIG1pbnV0ZSBhZ29cIixcbiAgICBcInBsdXJhbFwiOiBcIiBtaW51dGVzIGFnb1wiXG4gIH0sXG4gIFwiaG91cnNcIjoge1xuICAgIFwic2luZ3VsYXJcIjogXCIgaG91ciBhZ29cIixcbiAgICBcInBsdXJhbFwiOiBcIiBob3VycyBhZ29cIlxuICB9LFxuICBcImRheXNcIjoge1xuICAgIFwic2luZ3VsYXJcIjogXCIgZGF5IGFnb1wiLFxuICAgIFwicGx1cmFsXCI6IFwiIGRheXMgYWdvXCJcbiAgfSxcbiAgXCJ3ZWVrc1wiOiB7XG4gICAgXCJzaW5ndWxhclwiOiBcIiB3ZWVrIGFnb1wiLFxuICAgIFwicGx1cmFsXCI6IFwiIHdlZWtzIGFnb1wiXG4gIH0sXG4gIFwibW9udGhzXCI6IHtcbiAgICBcInNpbmd1bGFyXCI6IFwiIG1vbnRoIGFnb1wiLFxuICAgIFwicGx1cmFsXCI6IFwiIG1vbnRocyBhZ29cIlxuICB9LFxuICBcInllYXJzXCI6IHtcbiAgICBcInNpbmd1bGFyXCI6IFwiIHllYXIgYWdvXCIsXG4gICAgXCJwbHVyYWxcIjogXCIgeWVhcnMgYWdvXCJcbiAgfVxufVxuIiwibW9kdWxlLmV4cG9ydHMgPSBUaW1lQWdvXG5cbmZ1bmN0aW9uIFRpbWVBZ28gKHBhc3RFcG9jaCwgY3VycmVudEVwb2NoKSB7XG4gIHZhciBzZWNvbmRzID0gTWF0aC5yb3VuZCh0aGlzLnRpbWVDYWxjcy5zZWNvbmRzKHBhc3RFcG9jaCwgY3VycmVudEVwb2NoKSlcbiAgdmFyIG1pbnV0ZXMgPSBNYXRoLnJvdW5kKHRoaXMudGltZUNhbGNzLm1pbnV0ZXMocGFzdEVwb2NoLCBjdXJyZW50RXBvY2gpKVxuICB2YXIgaG91cnMgPSBNYXRoLnJvdW5kKHRoaXMudGltZUNhbGNzLmhvdXJzKHBhc3RFcG9jaCwgY3VycmVudEVwb2NoKSlcbiAgdmFyIGRheXMgPSBNYXRoLnJvdW5kKHRoaXMudGltZUNhbGNzLmRheXMocGFzdEVwb2NoLCBjdXJyZW50RXBvY2gpKVxuICB2YXIgd2Vla3MgPSBNYXRoLnJvdW5kKHRoaXMudGltZUNhbGNzLndlZWtzKHBhc3RFcG9jaCwgY3VycmVudEVwb2NoKSlcbiAgdmFyIG1vbnRocyA9IE1hdGgucm91bmQodGhpcy50aW1lQ2FsY3MubW9udGhzKHBhc3RFcG9jaCwgY3VycmVudEVwb2NoKSlcbiAgdmFyIHllYXJzID0gTWF0aC5yb3VuZCh0aGlzLnRpbWVDYWxjcy55ZWFycyhwYXN0RXBvY2gsIGN1cnJlbnRFcG9jaCkpXG5cbiAgdmFyIHN1ZmZpeCA9IHRoaXMuc3VmZml4RGljdGlvbmFyeVxuICB2YXIgY3V0b2ZmID0gdGhpcy5jdXRvZmZcblxuICBpZiAoc2Vjb25kcyA8IGN1dG9mZi5zZWNvbmRzKSB7XG4gICAgcmV0dXJuIHNlY29uZHMgKyBzdWZmaXguc2Vjb25kc1tnZXRGb3JtKHNlY29uZHMpXVxuICB9IGVsc2UgaWYgKG1pbnV0ZXMgPCBjdXRvZmYubWludXRlcykge1xuICAgIHJldHVybiBtaW51dGVzICsgc3VmZml4Lm1pbnV0ZXNbZ2V0Rm9ybShtaW51dGVzKV1cbiAgfSBlbHNlIGlmIChob3VycyA8IGN1dG9mZi5ob3Vycykge1xuICAgIHJldHVybiBob3VycyArIHN1ZmZpeC5ob3Vyc1tnZXRGb3JtKGhvdXJzKV1cbiAgfSBlbHNlIGlmIChkYXlzIDwgY3V0b2ZmLmRheXMpIHtcbiAgICByZXR1cm4gZGF5cyArIHN1ZmZpeC5kYXlzW2dldEZvcm0oZGF5cyldXG4gIH0gZWxzZSBpZiAod2Vla3MgPCBjdXRvZmYud2Vla3MpIHtcbiAgICByZXR1cm4gd2Vla3MgKyBzdWZmaXgud2Vla3NbZ2V0Rm9ybSh3ZWVrcyldXG4gIH0gZWxzZSBpZiAobW9udGhzIDwgY3V0b2ZmLm1vbnRocykge1xuICAgIHJldHVybiBtb250aHMgKyBzdWZmaXgubW9udGhzW2dldEZvcm0obW9udGhzKV1cbiAgfSBlbHNlIHtcbiAgICByZXR1cm4geWVhcnMgKyBzdWZmaXgueWVhcnNbZ2V0Rm9ybSh5ZWFycyldXG4gIH1cbn1cblxuZnVuY3Rpb24gZ2V0Rm9ybSAodmFsdWUpIHtcbiAgaWYgKHZhbHVlID09PSAxKSB7XG4gICAgcmV0dXJuICdzaW5ndWxhcidcbiAgfVxuICByZXR1cm4gJ3BsdXJhbCdcbn1cbiIsIm1vZHVsZS5leHBvcnRzID0ge1xuICBzZWNvbmRzOiByZXF1aXJlKCcuL3RpbWUtYWdvL3NlY29uZHMtYWdvLmpzJyksXG4gIG1pbnV0ZXM6IHJlcXVpcmUoJy4vdGltZS1hZ28vbWludXRlcy1hZ28uanMnKSxcbiAgaG91cnM6IHJlcXVpcmUoJy4vdGltZS1hZ28vaG91cnMtYWdvLmpzJyksXG4gIGRheXM6IHJlcXVpcmUoJy4vdGltZS1hZ28vZGF5cy1hZ28uanMnKSxcbiAgd2Vla3M6IHJlcXVpcmUoJy4vdGltZS1hZ28vd2Vla3MtYWdvLmpzJyksXG4gIG1vbnRoczogcmVxdWlyZSgnLi90aW1lLWFnby9tb250aHMtYWdvLmpzJyksXG4gIHllYXJzOiByZXF1aXJlKCcuL3RpbWUtYWdvL3llYXJzLWFnby5qcycpXG59XG4iLCJtb2R1bGUuZXhwb3J0cyA9IERheXNBZ29cblxuZnVuY3Rpb24gRGF5c0FnbyAocGFzdEVwb2NoLCBjdXJyZW50RXBvY2gpIHtcbiAgdmFyIGRheXNBZ28gPSAoY3VycmVudEVwb2NoIC0gcGFzdEVwb2NoKSAvIDEwMDAgLyA2MCAvIDYwIC8gMjRcbiAgcmV0dXJuIGRheXNBZ29cbn1cbiIsIm1vZHVsZS5leHBvcnRzID0gSG91cnNBZ29cblxuZnVuY3Rpb24gSG91cnNBZ28gKHBhc3RFcG9jaCwgY3VycmVudEVwb2NoKSB7XG4gIHZhciBob3Vyc0FnbyA9IChjdXJyZW50RXBvY2ggLSBwYXN0RXBvY2gpIC8gMTAwMCAvIDYwIC8gNjBcbiAgcmV0dXJuIGhvdXJzQWdvXG59XG4iLCJtb2R1bGUuZXhwb3J0cyA9IE1pbnV0ZXNBZ29cblxuZnVuY3Rpb24gTWludXRlc0FnbyAocGFzdEVwb2NoLCBjdXJyZW50RXBvY2gpIHtcbiAgdmFyIG1pbnV0ZXNBZ28gPSAoY3VycmVudEVwb2NoIC0gcGFzdEVwb2NoKSAvIDEwMDAgLyA2MFxuICByZXR1cm4gbWludXRlc0Fnb1xufVxuIiwibW9kdWxlLmV4cG9ydHMgPSBNb250aHNBZ29cblxuZnVuY3Rpb24gTW9udGhzQWdvIChwYXN0RXBvY2gsIGN1cnJlbnRFcG9jaCkge1xuICB2YXIgbW9udGhzQWdvID0gKGN1cnJlbnRFcG9jaCAtIHBhc3RFcG9jaCkgLyAxMDAwIC8gNjAgLyA2MCAvIDI0IC8gMzFcbiAgcmV0dXJuIG1vbnRoc0Fnb1xufVxuIiwibW9kdWxlLmV4cG9ydHMgPSBTZWNvbmRzQWdvXG5cbmZ1bmN0aW9uIFNlY29uZHNBZ28gKHBhc3RFcG9jaCwgY3VycmVudEVwb2NoKSB7XG4gIHZhciBzZWNvbmRzQWdvID0gKGN1cnJlbnRFcG9jaCAtIHBhc3RFcG9jaCkgLyAxMDAwXG4gIHJldHVybiBzZWNvbmRzQWdvXG59XG4iLCJtb2R1bGUuZXhwb3J0cyA9IFdlZWtzQWdvXG5cbmZ1bmN0aW9uIFdlZWtzQWdvIChwYXN0RXBvY2gsIGN1cnJlbnRFcG9jaCkge1xuICB2YXIgd2Vla3NBZ28gPSAoY3VycmVudEVwb2NoIC0gcGFzdEVwb2NoKSAvIDEwMDAgLyA2MCAvIDYwIC8gMjQgLyA3XG4gIHJldHVybiB3ZWVrc0Fnb1xufVxuIiwibW9kdWxlLmV4cG9ydHMgPSBZZWFyc0Fnb1xuXG5mdW5jdGlvbiBZZWFyc0FnbyAocGFzdEVwb2NoLCBjdXJyZW50RXBvY2gpIHtcbiAgdmFyIHllYXJzQWdvID0gKGN1cnJlbnRFcG9jaCAtIHBhc3RFcG9jaCkgLyAxMDAwIC8gNjAgLyA2MCAvIDI0IC8gMzEgLyAxMlxuICByZXR1cm4geWVhcnNBZ29cbn1cbiIsIi8qKlxuICogSGFuZGxlIG5hdmlnYXRpb25cbiAqL1xuXG4vLyBEZXBlbmRlbmNpZXNcbmltcG9ydCBzY3JvbGxDaGFuZ2UgZnJvbSAnZHMtYXNzZXRzL3Njcm9sbC9zY3JvbGwtY2hhbmdlJztcbmltcG9ydCBkZWJvdW5jZSBmcm9tICdkcy1hc3NldHMvYXN5bmMvZGVib3VuY2UnO1xuaW1wb3J0IGdldEFsbCBmcm9tICdkcy1hc3NldHMvZG9tL2dldC1hbGwnO1xuaW1wb3J0IGdldFVzZXJEYXRhIGZyb20gJy4uL2xpYi9nZXQtbG9nZ2VkLWluLWRhdGEnO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbigpIHtcblxuICB2YXIgJG5hdiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5uYXYnKTtcbiAgaWYgKCEkbmF2KSB7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgdmFyICRib2R5ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignYm9keScpO1xuXG4gIC8vIENsb25lIG5hdmlnYXRpb24gYW5kIG1ha2UgdGhlIG5ldyBvbmUgc3RpY2t5XG4gIHZhciAkc3RpY2t5TmF2ID0gJG5hdi5jbG9uZU5vZGUodHJ1ZSk7XG4gICRzdGlja3lOYXYuY2xhc3NMaXN0LmFkZCgnbmF2LS1zdGlja3knKTtcbiAgJGJvZHkuaW5zZXJ0QmVmb3JlKCRzdGlja3lOYXYsICRib2R5LmZpcnN0Q2hpbGQpO1xuXG4gIC8vIEFjdGl2YXRlIHRoZSBzdGlja3kgbmF2aWdhdGlvbiB3aGVuIHRoZSB1c2VyIHNjcm9sbHMgdXAuXG4gIC8vIFRoaXMgd2lsbCBmaXJzIHRha2UgZWZmZWN0LCB3aGVuIHRoZSB1c2VyIGhhcyBzY3JvbGxlZCBcImEgc2NyZWVuXCIgZG93bi5cbiAgc2Nyb2xsQ2hhbmdlKGZ1bmN0aW9uKCkge1xuICAgICRzdGlja3lOYXYuY2xhc3NMaXN0LnJlbW92ZSgnbmF2LS1hY3RpdmUnKTtcbiAgfSwgZnVuY3Rpb24oKSB7XG4gICAgJHN0aWNreU5hdi5jbGFzc0xpc3QuYWRkKCduYXYtLWFjdGl2ZScpO1xuICB9LCB3aW5kb3cuaW5uZXJIZWlnaHQpO1xuXG4gIC8qKlxuICAgKiBIaWRlIHN0aWNreSBuYXZpZ2F0aW9uIHdoZW4gc2Nyb2xsZWQgdG8gdGhlIHRvcCBvZiB0aGUgZG9jdW1lbnRcbiAgICogQHJldHVybiB7dm9pZH1cbiAgICovXG4gIHZhciBvblRvcCA9IGZ1bmN0aW9uKCkge1xuICAgIHZhciBzY3JvbGxQb3MgPSB3aW5kb3cuc2Nyb2xsWSB8fCBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuc2Nyb2xsVG9wO1xuICAgIGlmIChzY3JvbGxQb3MgPD0gMCkge1xuICAgICAgJHN0aWNreU5hdi5jbGFzc0xpc3QuYWRkKCduYXYtLWhpZGRlbicpO1xuICAgICAgJHN0aWNreU5hdi5jbGFzc0xpc3QucmVtb3ZlKCduYXYtLWFjdGl2ZScpO1xuICAgIH0gZWxzZSB7XG4gICAgICAkc3RpY2t5TmF2LmNsYXNzTGlzdC5yZW1vdmUoJ25hdi0taGlkZGVuJyk7XG4gICAgfVxuICB9O1xuXG4gIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdzY3JvbGwnLCBkZWJvdW5jZShvblRvcCkpO1xuICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigncmVzaXplJywgZGVib3VuY2Uob25Ub3ApKTtcblxuICAvLyBDaGFuZ2Ugd29yZGluZyBvbiBcInNpZ24gaW5cIiBidXR0b24gd2hlbiB1c2VyIGlzIGxvZ2dlZCBpblxuICBnZXRVc2VyRGF0YSgpLnRoZW4oZnVuY3Rpb24oKSB7XG4gICAgZ2V0QWxsKCcubmF2X19pdGVtLS1zaWduLWluJykuZm9yRWFjaChmdW5jdGlvbigkc2lnbmluKSB7XG4gICAgICAkc2lnbmluLmlubmVySFRNTCA9ICdDcmVhdGUgYSBzdG9yeSc7XG4gICAgfSk7XG4gIH0pLmNhdGNoKGZ1bmN0aW9uKCkge30pO1xuXG59XG4iLCIvKipcbiAqIEhhbmRsZSByZXNwb25zZXMgYW5kIGxpa2VzIGluIHBvc3RzXG4gKi9cblxuLy8gRGVwZW5kZW5jaWVzXG5pbXBvcnQgZ2V0QWxsIGZyb20gJ2RzLWFzc2V0cy9kb20vZ2V0LWFsbCc7XG5pbXBvcnQgbGF6eUltYWdlcyBmcm9tICdkcy1hc3NldHMvbGF6eS9pbWFnZXMnO1xuaW1wb3J0ICogYXMgYXBpIGZyb20gJy4uL2xpYi9hcGknO1xuaW1wb3J0IGdldFVzZXJEYXRhIGZyb20gJy4uL2xpYi9nZXQtbG9nZ2VkLWluLWRhdGEnO1xuaW1wb3J0IHVzZXJNZXRhVGVtcGxhdGUgZnJvbSAnLi4vdGVtcGxhdGVzL3Jlc3BvbnNlLW1ldGEnO1xuaW1wb3J0IHJlc3BvbnNlVGVtcGxhdGUgZnJvbSAnLi4vdGVtcGxhdGVzL3Jlc3BvbnNlJztcbmltcG9ydCBvZmZzZXRUb3AgZnJvbSAnZHMtYXNzZXRzL2RvbS9nZXQtZG9jdW1lbnQtb2Zmc2V0LXRvcCc7XG5pbXBvcnQgbGl2ZVZhbGlkYXRpb24gZnJvbSAnLi4vbGliL2Zvcm0vbGl2ZS12YWxpZGF0aW9uJztcbmltcG9ydCB2YWxpZGF0ZUZvcm0gZnJvbSAnLi4vbGliL2Zvcm0vdmFsaWRhdGUnO1xuXG4vLyBDYWNoZWQgZG9tIGVsZW1lbnRzXG52YXIgJHJlc3BvbnNlRm9ybTtcbnZhciAkY3RhO1xudmFyICR2YWxpZGF0b3JzO1xudmFyICRyZXNwb25zZXNMaXN0O1xudmFyIHJlbmRlclJlc3BvbnNlcztcbnZhciBhZGREZWxldGVFdmVudHM7XG52YXIgc2V0UmVzcG9uc2VzTnVtYmVyO1xudmFyIGFkZFJlYWRNb3JlRXZlbnQ7XG5cbnZhciB1cGRhdGVSZXNwb25zZUNUQSA9IGZ1bmN0aW9uKHZhbGlkKSB7XG5cdGlmICh2YWxpZCkge1xuXHRcdCRjdGEuY2xhc3NMaXN0LnJlbW92ZSgnYnRuLS1kaXNhYmxlZCcpO1xuXHR9IGVsc2Uge1xuXHRcdCRjdGEuY2xhc3NMaXN0LmFkZCgnYnRuLS1kaXNhYmxlZCcpO1xuXHR9XG59O1xuXG4vKipcbiAqIERlbGV0ZSByZXNwb25zZSB3aGVuIGRlbGV0ZSBpY29uIGNsaWNrZWRcbiAqL1xuYWRkRGVsZXRlRXZlbnRzID0gZnVuY3Rpb24oKSB7XG5cdGdldEFsbCgnLnJlc3BvbnNlX19kZWxldGUnKS5mb3JFYWNoKGZ1bmN0aW9uKCRkZWxldGUpIHtcblx0XHQkZGVsZXRlLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24oZSkge1xuXHRcdFx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xuXHRcdFx0YXBpLnJlbW92ZVJlc3BvbnNlKCRkZWxldGUuZGF0YXNldC5wdWJsaXNoZWQsICRkZWxldGUuZGF0YXNldC5uYW1lKVxuXHRcdFx0XHQudGhlbihmdW5jdGlvbihkYXRhKSB7XG5cdFx0XHRcdFx0cmVuZGVyUmVzcG9uc2VzKGRhdGEucmVzcG9uc2VzKTtcblx0XHRcdFx0XHRzZXRSZXNwb25zZXNOdW1iZXIoZGF0YS5yZXNwb25zZXMpO1xuXHRcdFx0XHR9KTtcblx0XHR9KTtcblx0fSk7XG59O1xuXG4vKipcbiAqIEV4cGFuZCByZXNwb25zZSB3aXRoIGZ1bGwgdGV4dCB3aGVuIHJlYWQgbW9yZSBidXR0b24gaXMgYWN0aXZhdGVkLlxuICogQmFzaWNhbGx5IGl0IGhpZGVzIHRoZSBleGNlcnB0IGFuZCB0aGUgcmVhZCBtb3JlIGJ1dHRvbiBhbmQgZGlzcGxheXMgdGhlXG4gKiBmdWxsIHRleHQuXG4gKiBAcGFyYW0ge2VsZW1lbnR9ICRyZXNwb25zZVxuICovXG5hZGRSZWFkTW9yZUV2ZW50ID0gZnVuY3Rpb24oJHJlc3BvbnNlKSB7XG5cdHZhciAkcmVhZE1vcmUgPSAkcmVzcG9uc2UucXVlcnlTZWxlY3RvcignLnJlc3BvbnNlX19yZWFkLW1vcmUnKTtcblx0aWYgKCEkcmVhZE1vcmUpIHtcblx0XHRyZXR1cm47XG5cdH1cblx0JHJlYWRNb3JlLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24oZSkge1xuXHRcdGUucHJldmVudERlZmF1bHQoKTtcblx0XHR2YXIgJGV4Y2VycHQgPSAkcmVzcG9uc2UucXVlcnlTZWxlY3RvcignLnJlc3BvbnNlX19leGNlcnB0Jyk7XG5cdFx0dmFyICRyZWFkTW9yZUNvbnRhaW5lciA9ICRyZWFkTW9yZS5wYXJlbnROb2RlO1xuXG5cdFx0JHJlYWRNb3JlQ29udGFpbmVyLnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQoJHJlYWRNb3JlQ29udGFpbmVyKTtcblx0XHQkZXhjZXJwdC5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKCRleGNlcnB0KTtcblxuXHRcdCRyZXNwb25zZS5xdWVyeVNlbGVjdG9yKCcucmVzcG9uc2VfX3RleHQnKS5jbGFzc0xpc3QucmVtb3ZlKCdoaWRkZW4nKTtcblx0fSk7XG59O1xuXG4vKipcbiAqIFJlbmRlciB0ZW1wbGF0ZXMgZm9yIHJlc3BvbnNlcyBhbmQgaW5zZXJ0IGh0bWwgaW4gdGhlIHJlc3BvbnNlcyBsaXN0LlxuICogLSBMYXp5IGxvYWQgaW1hZ2VzIGluIHJlc3BvbnNlc1xuICogLSBBdHRhY2ggbmV3IGV2ZW50cyBpbiByZXNwb25zZXNcbiAqIEBwYXJhbSAge2FycmF5fSByZXNwb25zZXNcbiAqIEByZXR1cm4ge3ZvaWR9XG4gKi9cbnJlbmRlclJlc3BvbnNlcyA9IGZ1bmN0aW9uKHJlc3BvbnNlcykge1xuXHR2YXIgaHRtbCA9ICcnO1xuXHRyZXNwb25zZXMuZm9yRWFjaChmdW5jdGlvbihyZXNwb25zZSkge1xuXHRcdGh0bWwgKz0gcmVzcG9uc2VUZW1wbGF0ZShyZXNwb25zZSk7XG5cdH0pO1xuXHQkcmVzcG9uc2VzTGlzdC5pbm5lckhUTUwgPSBodG1sO1xuXHRsYXp5SW1hZ2VzKDEpO1xuXHRhZGREZWxldGVFdmVudHMoKTtcblx0Z2V0QWxsKCcucmVzcG9uc2UnLCAkcmVzcG9uc2VzTGlzdCkuZm9yRWFjaChhZGRSZWFkTW9yZUV2ZW50KTtcbn07XG5cbi8qKlxuICogVXBkYXRlIHRoZSBjb3VudCBvZiByZXNwb25zZXNcbiAqIEBwYXJhbSB7YXJyYXl9IHJlc3BvbnNlc1xuICovXG5zZXRSZXNwb25zZXNOdW1iZXIgPSBmdW5jdGlvbihyZXNwb25zZXMpIHtcblx0ZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnNoYXJlX19yZXNwb25zZXMnKS5pbm5lckhUTUwgPSByZXNwb25zZXMubGVuZ3RoO1xufTtcblxuLyoqXG4gKiBVcGRhdGUgdGhlIGNvdW50IGZvIGxpa2VzIGZvciB0aGlzIHBvc3RcbiAqIEBwYXJhbSB7bnVtYmVyfSBsaWtlc1xuICovXG52YXIgc2V0TGlrZXNOdW1iZXIgPSBmdW5jdGlvbihsaWtlcykge1xuXHRkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuc2hhcmVfX2xpa2VzJykuaW5uZXJIVE1MID0gbGlrZXM7XG59O1xuXG4vKipcbiAqIEdldCBkYXRhIGZyb20gYXBpIHdpdGggbWV0YSBkYXRhOiByZXNwb25zZXMgYW5kIGxpa2VzLlxuICogUmVuZGVyIHRoaXMgaW4gdGhlIGRvbS5cbiAqIEByZXR1cm4ge3ZvaWR9XG4gKi9cbnZhciByZW5kZXJNZXRhID0gZnVuY3Rpb24oKSB7XG5cdGFwaS5nZXRNZXRhKCkudGhlbihmdW5jdGlvbihkYXRhKSB7XG5cdFx0cmVuZGVyUmVzcG9uc2VzKGRhdGEucmVzcG9uc2VzKTtcblx0XHRzZXRSZXNwb25zZXNOdW1iZXIoZGF0YS5yZXNwb25zZXMpO1xuXHRcdHNldExpa2VzTnVtYmVyKGRhdGEubGlrZXMpO1xuXHR9KTtcbn07XG5cbi8qKlxuICogUG9zdCBuZXcgcmVzcG9uc2UgdG8gcG9zdFxuICogLSBjaGVja3MgZm9yIHZhbGlkYXRpb24gYmVmb3JlIHBvc3RpbmdcbiAqIEBwYXJhbSAge2V2ZW50fSBlXG4gKiBAcmV0dXJuIHt2b2lkfVxuICovXG52YXIgc3VibWl0UmVzcG9uc2UgPSBmdW5jdGlvbihlKSB7XG5cdGUucHJldmVudERlZmF1bHQoKTtcblxuXHR2YXIgbG9nZ2VkSW4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdib2R5JykuY2xhc3NMaXN0LmNvbnRhaW5zKCd1c2VyLWxvZ2dlZC1pbicpO1xuXG5cdC8vIElmIGEgZmllbGQgaXMgbm90IHZhbGlkIHRoaXMgZmllbGQgd2lsbCBnZXQgZm9jdXMsIHNvIHRoZSB1c2VyIHF1aWNrbHkgY2FuIHVwZGF0ZSB0aGUgdmFsdWUuXG5cdHZhciBub3RWYWxpZCA9ICR2YWxpZGF0b3JzLnNvbWUoZnVuY3Rpb24oJHZhbGlkYXRvcikge1xuXHRcdGlmICgkdmFsaWRhdG9yLmNsYXNzTGlzdC5jb250YWlucygndmFsaWRhdGUtLW5vdC12YWxpZCcpKSB7XG5cdFx0XHR2YXIgJHZhbGlkYXRlRmllbGQgPSAkdmFsaWRhdG9yLnF1ZXJ5U2VsZWN0b3IoJ2lucHV0LCB0ZXh0YXJlYScpO1xuXHRcdFx0JHZhbGlkYXRlRmllbGQuZm9jdXMoKTtcblx0XHRcdHJldHVybiB0cnVlO1xuXHRcdH1cblx0fSk7XG5cblx0aWYgKG5vdFZhbGlkKSB7XG5cdFx0cmV0dXJuO1xuXHR9XG5cblx0Ly8gQ3JlYXRlIGEgcmVzcG9uc2Ugb2JqZWN0IGJhc2VkIG9uIHZhbHVlcyBpbiBmb3JtXG5cdHZhciByZXNwb25zZSA9IHt9O1xuXHRnZXRBbGwoJ2lucHV0LCB0ZXh0YXJlYScsICRyZXNwb25zZUZvcm0pLmZvckVhY2goZnVuY3Rpb24oJGZpZWxkKSB7XG5cdFx0dmFyIG5hbWUgPSAkZmllbGQuZ2V0QXR0cmlidXRlKCduYW1lJyk7XG5cdFx0aWYgKCRmaWVsZC52YWx1ZSkge1xuXHRcdFx0cmVzcG9uc2VbbmFtZV0gPSAkZmllbGQudmFsdWU7XG5cdFx0fVxuXHR9KTtcblxuXHQkY3RhLmlubmVySFRNTCA9ICdQb3N0aW5nLi4uJztcblx0JGN0YS5jbGFzc0xpc3QuYWRkKCdidG4tLWRpc2FibGVkJyk7XG5cdGFwaS5hZGRSZXNwb25zZShyZXNwb25zZSkudGhlbihmdW5jdGlvbihkYXRhKSB7XG5cdFx0cmVuZGVyUmVzcG9uc2VzKGRhdGEucmVzcG9uc2VzKTtcblx0XHRzZXRSZXNwb25zZXNOdW1iZXIoZGF0YS5yZXNwb25zZXMpO1xuXG5cdFx0Ly8gU2Nyb2xsIHRvIG5ldyByZXNwb25zZVxuXHRcdHZhciAkbGFzdFJlc3BvbnNlID0gJHJlc3BvbnNlc0xpc3QucXVlcnlTZWxlY3RvcignLnJlc3BvbnNlOmxhc3QtY2hpbGQnKTtcblx0XHR2YXIgb2Zmc2V0ID0gb2Zmc2V0VG9wKCRsYXN0UmVzcG9uc2UpO1xuXHRcdHdpbmRvdy5zY3JvbGxUbygwLCBvZmZzZXQgLSAoMC41ICogd2luZG93LmlubmVySGVpZ2h0KSk7XG5cblx0XHQvLyBSZXNldCBmb3JtXG5cdFx0JGN0YS5pbm5lckhUTUwgPSAnUmVzcG9uZCc7XG5cdFx0aWYgKGxvZ2dlZEluKSB7XG5cdFx0XHR2YXIgJHRleHQgPSAkcmVzcG9uc2VGb3JtLnF1ZXJ5U2VsZWN0b3IoJy5yZXNwb25zZXMtZm9ybV9fdGV4dCcpO1xuXHRcdFx0JHRleHQuY2xhc3NMaXN0LmFkZCgndmFsaWRhdGUtLW5vdC12YWxpZCcpO1xuXHRcdFx0JHRleHQuY2xhc3NMaXN0LnJlbW92ZSgndmFsaWRhdGUtLXZhbGlkJyk7XG5cdFx0XHQkdGV4dC5xdWVyeVNlbGVjdG9yKCd0ZXh0YXJlYScpLnZhbHVlID0gJyc7XG5cdFx0fSBlbHNlIHtcblx0XHRcdCR2YWxpZGF0b3JzLmZvckVhY2goZnVuY3Rpb24oJHZhbGlkYXRvcikge1xuXHRcdFx0XHRpZiAoJHZhbGlkYXRvci5kYXRhc2V0LnZhbGlkYXRlUmVxdWlyZWQgIT09IHVuZGVmaW5lZCkge1xuXHRcdFx0XHRcdCR2YWxpZGF0b3IuY2xhc3NMaXN0LmFkZCgndmFsaWRhdGUtLW5vdC12YWxpZCcpO1xuXHRcdFx0XHRcdCR2YWxpZGF0b3IuY2xhc3NMaXN0LnJlbW92ZSgndmFsaWRhdGUtLXZhbGlkJyk7XG5cdFx0XHRcdH1cblx0XHRcdFx0JHZhbGlkYXRvci5xdWVyeVNlbGVjdG9yKCdpbnB1dCwgdGV4dGFyZWEnKS52YWx1ZSA9ICcnO1xuXHRcdFx0fSk7XG5cdFx0fVxuXHR9KTtcblxufTtcblxuLyoqXG4gKiBVcGRhdGUgaGVhcnQgKGxpa2UpIGljb25zIHRvIGluZGljYXRlLCB0aGF0IHRoZSB1c2VyIGhhdmUgbGlrZWQgdGhlIGFydGljbGVcbiAqIEByZXR1cm4ge3ZvaWR9XG4gKi9cbnZhciBsaWtlZCA9IGZ1bmN0aW9uKCkge1xuXHR2YXIgJHRvb2xUaXBJY29uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnRvb2wtdGlwX19saWtlLWljb24nKTtcblx0JHRvb2xUaXBJY29uLnNldEF0dHJpYnV0ZSgnc3JjJywgJy9hc3NldHMvaW1hZ2VzL2hlYXJ0LS1pbnZlcnNlLS1hY3RpdmUuc3ZnJyk7XG5cdCR0b29sVGlwSWNvbi5zZXRBdHRyaWJ1dGUoJ2RhdGEtc3JjJywgJy9hc3NldHMvaW1hZ2VzL2hlYXJ0LS1pbnZlcnNlLS1hY3RpdmUuc3ZnJyk7XG5cblx0dmFyICRmb290ZXJJY29uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnBvc3QtZm9vdGVyX19saWtlLWljb24nKTtcblx0JGZvb3Rlckljb24uc2V0QXR0cmlidXRlKCdzcmMnLCAnL2Fzc2V0cy9pbWFnZXMvaGVhcnQtLWFjdGl2ZS5zdmcnKTtcblx0JGZvb3Rlckljb24uc2V0QXR0cmlidXRlKCdkYXRhLXNyYycsICcvYXNzZXRzL2ltYWdlcy9oZWFydC0tYWN0aXZlLnN2ZycpO1xuXG5cdC8vIEluZGljYXRlcywgdGhhdCB0aGUgbGlrZSBidXR0b24gbm8gbG9uZ2VyIGlzIGNsaWNrYWJsZVxuXHRnZXRBbGwoJy5zaGFyZV9fbGlrZScpLmZvckVhY2goJGxpa2UgPT4gJGxpa2UuY2xhc3NMaXN0LmFkZCgnZGlzYWJsZWQnKSk7XG59O1xuXG4vKipcbiAqIEFjdGl2YXRlIGxpa2UsIHdoZW4gbGlrZSBidXR0b25zIGFyZSBjbGlja2VkXG4gKiBAcGFyYW0gIHtlbGVtZW50fSAkYW5jaG9yXG4gKiBAcmV0dXJuIHt2b2lkfVxuICovXG52YXIgYXR0YWNoTGlrZUV2ZW50ID0gZnVuY3Rpb24oJGFuY2hvcikge1xuXHQkYW5jaG9yLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24oZSkge1xuXHRcdGUucHJldmVudERlZmF1bHQoKTtcblxuXHRcdC8vIEFscmVhZHkgbGlrZWQgdGhpcyBhcnRpY2xlXG5cdFx0aWYgKGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdsaWtlOicgKyB3aW5kb3cucG9zdElkKSkge1xuXHRcdFx0cmV0dXJuO1xuXHRcdH1cblxuXHRcdGxvY2FsU3RvcmFnZS5zZXRJdGVtKCdsaWtlOicgKyB3aW5kb3cucG9zdElkLCB0cnVlKTtcblx0XHRsaWtlZCgpO1xuXG5cdFx0YXBpLmxpa2UoKS50aGVuKGZ1bmN0aW9uKGRhdGEpIHtcblx0XHRcdHNldExpa2VzTnVtYmVyKGRhdGEubGlrZXMpO1xuXHRcdH0pO1xuXHR9KTtcbn07XG5cbi8qKlxuICogVXBkYXRlIHJlc3BvbnNlcyBmb3JtIGlmIHVzZXIgaXMgbG9nZ2VkIGluLlxuICogVXNlciBkbyBub3QgbmVlZCB0byBmaWxsIGUtbWFpbCwgbmFtZSBldGMuXG4gKiBAcGFyYW0gIHtvYmplY3R9IGRhdGFcbiAqIEByZXR1cm4ge3ZvaWR9XG4gKi9cbnZhciByZW5kZXJVc2VyRm9ybSA9IGZ1bmN0aW9uKHVzZXIpIHtcblx0dmFyIGh0bWwgPSB1c2VyTWV0YVRlbXBsYXRlKHVzZXIpO1xuXHR2YXIgJG1ldGEgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcblx0JG1ldGEuaW5uZXJIVE1MID0gaHRtbDtcblx0dmFyICRoZWFkZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucmVzcG9uc2VzX19mb3JtIGgzJyk7XG5cblx0Ly8gRmlsbCBpbnB1dCBmaWVsZHMgd2l0aCByZWxldmFudCBkYXRhXG5cdGdldEFsbCgnLnJlc3BvbnNlc19fZm9ybSBpbnB1dCcpLmZvckVhY2goZnVuY3Rpb24oJGlucHV0KSB7XG5cdFx0dmFyIG5hbWUgPSAkaW5wdXQuZ2V0QXR0cmlidXRlKCduYW1lJyk7XG5cdFx0aWYgKG5hbWUgPT09ICd3ZWJzaXRlJykge1xuXHRcdFx0JGlucHV0LnZhbHVlID0gJy9hdXRob3IvJyArIHVzZXIuc2x1Zztcblx0XHR9IGVsc2Uge1xuXHRcdFx0JGlucHV0LnZhbHVlID0gdXNlcltuYW1lXTtcblx0XHR9XG5cdFx0JGlucHV0LnBhcmVudE5vZGUuY2xhc3NMaXN0LmFkZCgndmFsaWRhdGUtLXZhbGlkJyk7XG5cdFx0JGlucHV0LnBhcmVudE5vZGUuY2xhc3NMaXN0LnJlbW92ZSgndmFsaWRhdGUtLW5vdC12YWxpZCcpO1xuXHR9KTtcblxuXHQvLyBJbnNlcnQgYWZ0ZXIgaGVhZGVyXG5cdCRoZWFkZXIucGFyZW50Tm9kZS5pbnNlcnRCZWZvcmUoJG1ldGEsICRoZWFkZXIubmV4dFNpYmxpbmcpO1xuXHRsYXp5SW1hZ2VzKDEpO1xuXHR2YWxpZGF0ZUZvcm0oJHZhbGlkYXRvcnMsIHVwZGF0ZVJlc3BvbnNlQ1RBKTtcbn07XG5cbi8qKlxuICogSW5pdCByZXNwb25zZXNcbiAqIEByZXR1cm4ge3ZvaWR9XG4gKi9cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uKCkge1xuXHQkcmVzcG9uc2VGb3JtID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnJlc3BvbnNlc19fZm9ybScpO1xuXG5cdGlmICghJHJlc3BvbnNlRm9ybSkge1xuXHRcdHJldHVybjtcblx0fVxuXG5cdC8vIENhY2hlIGRvbSBlbGVtZW50c1xuXHQkY3RhID0gJHJlc3BvbnNlRm9ybS5xdWVyeVNlbGVjdG9yKCcuYnRuLS1jdGEnKTtcblx0JHJlc3BvbnNlc0xpc3QgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucmVzcG9uc2VzX19saXN0Jyk7XG5cdCR2YWxpZGF0b3JzID0gZ2V0QWxsKCcudmFsaWRhdGUnLCAkcmVzcG9uc2VGb3JtKTtcblxuXHQvLyBVcGRhdGUgZnJvbSBhcyB1c2VyIHR5cGVzXG5cdGxpdmVWYWxpZGF0aW9uKCR2YWxpZGF0b3JzLCB1cGRhdGVSZXNwb25zZUNUQSk7XG5cblx0Ly8gUmVuZGVyIHJlc3BvbnNlcyBhbmQgbGlrZVxuXHRyZW5kZXJNZXRhKCk7XG5cblx0Ly8gQ2hhbmdlIGZvcm0gaWYgdXNlciBpcyBsb2dnZWQgaW5cblx0Z2V0VXNlckRhdGEoKS50aGVuKHJlbmRlclVzZXJGb3JtKS5jYXRjaChmdW5jdGlvbigpIHt9KTtcblxuXHQvLyBVc2VyIGFscmVhZHkgbGlrZXMgdGhpcyBhcnRpY2xlXG5cdGlmIChsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnbGlrZTonICsgd2luZG93LnBvc3RJZCkpIHtcblx0XHRsaWtlZCgpO1xuXHR9XG5cblx0Z2V0QWxsKCcuc2hhcmVfX2xpa2UnKS5mb3JFYWNoKGF0dGFjaExpa2VFdmVudCk7XG5cdCRjdGEuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBzdWJtaXRSZXNwb25zZSk7XG5cbn1cbiIsImltcG9ydCBsYXp5SW1hZ2VzIGZyb20gJ2RzLWFzc2V0cy9sYXp5L2ltYWdlcyc7XG5pbXBvcnQgZ2V0QWxsIGZyb20gJ2RzLWFzc2V0cy9kb20vZ2V0LWFsbCc7XG5pbXBvcnQgKiBhcyBhcGkgZnJvbSAnLi4vbGliL2FwaSc7XG5pbXBvcnQgcG9zdFRlbXBsYXRlIGZyb20gJy4uL3RlbXBsYXRlcy9wb3N0JztcbmltcG9ydCBhdXRob3JUZW1wbGF0ZSBmcm9tICcuLi90ZW1wbGF0ZXMvYXV0aG9yJztcbmltcG9ydCB0YWdUZW1wbGF0ZSBmcm9tICcuLi90ZW1wbGF0ZXMvdGFnJztcblxuY29uc3QgTUFYX1JFU1VMVFMgPSAxMDtcblxudmFyICRzZWFyY2hJbnB1dDtcbnZhciAkc2VhcmNoTGlzdDtcbnZhciBsYXRlc3RDb3VudGVyID0gMDtcblxudmFyIGdldFNlYXJjaFJlc3VsdCA9IGZ1bmN0aW9uKHBhdGgpIHtcblx0dmFyIGFic29sdXRlID0gd2luZG93Lmdob3N0LnVybC5hcGkocGF0aCwge1xuXHRcdGluY2x1ZGU6ICd0YWdzLGF1dGhvcixjb3VudC5wb3N0cydcblx0fSk7XG5cdHZhciByZWxhdGl2ZSA9IGFic29sdXRlLnN1YnN0cihhYnNvbHV0ZS5pbmRleE9mKCcvZ2hvc3QnKSwgYWJzb2x1dGUubGVuZ3RoKTtcblx0cmV0dXJuIGZldGNoKHJlbGF0aXZlKVxuXHRcdC50aGVuKGZ1bmN0aW9uKHJlc3BvbnNlKSB7XG5cdFx0XHRpZiAocmVzcG9uc2Uuc3RhdHVzID49IDMwMCkge1xuXHRcdFx0XHRyZXR1cm4gUHJvbWlzZS5yZWplY3QocmVzcG9uc2UpO1xuXHRcdFx0fVxuXHRcdFx0cmV0dXJuIHJlc3BvbnNlO1xuXHRcdH0pXG5cdFx0LnRoZW4ocmVzcG9uc2UgPT4gcmVzcG9uc2UuanNvbigpKTtcbn07XG5cbnZhciByZW5kZXJSZXN1bHRzID0gZnVuY3Rpb24ocmVzdWx0cykge1xuXHR2YXIgaHRtbCA9IHJlc3VsdHMubWFwKGZ1bmN0aW9uKHJlc3VsdCkge1xuXHRcdGlmIChyZXN1bHQucG9zdHMpIHtcblx0XHRcdHJldHVybiBwb3N0VGVtcGxhdGUocmVzdWx0LnBvc3RzWzBdKTtcblx0XHR9XG5cdFx0aWYgKHJlc3VsdC51c2Vycykge1xuXHRcdFx0cmV0dXJuIGF1dGhvclRlbXBsYXRlKHJlc3VsdC51c2Vyc1swXSk7XG5cdFx0fVxuXHRcdGlmIChyZXN1bHQudGFncykge1xuXHRcdFx0cmV0dXJuIHRhZ1RlbXBsYXRlKHJlc3VsdC50YWdzWzBdKTtcblx0XHR9XG5cdFx0cmV0dXJuICcnO1xuXHR9KS5qb2luKCcnKTtcblx0JHNlYXJjaExpc3QuaW5uZXJIVE1MID0gaHRtbDtcblx0bGF6eUltYWdlcygxKTtcblx0Z2V0QWxsKCcuYm94ZXNfX2l0ZW0nLCAkc2VhcmNoTGlzdCkuZm9yRWFjaChmdW5jdGlvbigkYm94SXRlbSwgaSkge1xuXHRcdHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XG5cdFx0XHQkYm94SXRlbS5jbGFzc0xpc3QucmVtb3ZlKCdoaWRkZW4nKTtcblx0XHRcdHNldFRpbWVvdXQoKCkgPT4gJGJveEl0ZW0uY2xhc3NMaXN0LmFkZCgnYW5pbWF0ZS0tYWN0aXZlJyksIDApO1xuXHRcdH0sIGkgKiA1MDApO1xuXHR9KTtcbn07XG5cbnZhciBzZWFyY2ggPSBmdW5jdGlvbihxdWVyeSkge1xuXG5cdHZhciBpZCA9ICsrbGF0ZXN0Q291bnRlcjtcblx0dmFyIG1pblRpbWUgPSBEYXRlLm5vdygpICsgMzAwO1xuXG5cdCRzZWFyY2hMaXN0LmlubmVySFRNTCA9ICcnO1xuXG5cdHZhciBpc0xhdGVzdCA9IGZ1bmN0aW9uKGRhdGEpIHtcblx0XHRpZiAoaWQgIT09IGxhdGVzdENvdW50ZXIpIHtcblx0XHRcdHJldHVybiBQcm9taXNlLnJlamVjdCgpO1xuXHRcdH1cblx0XHRyZXR1cm4gZGF0YTtcblx0fTtcblxuXHRhcGkuZ2V0U2VhcmNoSW5kZXgocXVlcnkpXG5cdFx0LnRoZW4oaXNMYXRlc3QpXG5cdFx0LnRoZW4oZnVuY3Rpb24oaW5kZXhlcykge1xuXHRcdFx0dmFyIHByb21pc2VzID0gaW5kZXhlcy5zbGljZSgwLCBNQVhfUkVTVUxUUykubWFwKGZ1bmN0aW9uKGluZGV4KSB7XG5cdFx0XHRcdHJldHVybiBnZXRTZWFyY2hSZXN1bHQoaW5kZXgucmVmKTtcblx0XHRcdH0pO1xuXHRcdFx0cmV0dXJuIFByb21pc2UuYWxsKHByb21pc2VzKTtcblx0XHR9KVxuXHRcdC50aGVuKGZ1bmN0aW9uKGRhdGEpIHtcblx0XHRcdGlmIChtaW5UaW1lIDwgRGF0ZS5ub3coKSkge1xuXHRcdFx0XHRyZXR1cm4gZGF0YTtcblx0XHRcdH1cblx0XHRcdHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbihyZXNvbHZlKSB7XG5cdFx0XHRcdHNldFRpbWVvdXQoKCkgPT4gcmVzb2x2ZShkYXRhKSwgbWluVGltZSAtIERhdGUubm93KCkpO1xuXHRcdFx0fSk7XG5cdFx0fSlcblx0XHQudGhlbihpc0xhdGVzdClcblx0XHQudGhlbihyZW5kZXJSZXN1bHRzKVxuXHRcdC5jYXRjaChmdW5jdGlvbihlcnIpIHtcblx0XHRcdGlmIChlcnIpIHtcblx0XHRcdFx0Y29uc29sZS5lcnJvcihlcnIpO1xuXHRcdFx0fVxuXHRcdH0pO1xufTtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24oKSB7XG5cblx0JHNlYXJjaElucHV0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnNlYXJjaF9faW5wdXQnKTtcblx0JHNlYXJjaExpc3QgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuc2VhcmNoX19saXN0Jyk7XG5cblx0aWYgKCEkc2VhcmNoSW5wdXQgfHwgISRzZWFyY2hMaXN0KSB7XG5cdFx0cmV0dXJuO1xuXHR9XG5cdCRzZWFyY2hJbnB1dC5hZGRFdmVudExpc3RlbmVyKCdpbnB1dCcsIGZ1bmN0aW9uKCkge1xuXHRcdHNlYXJjaCgkc2VhcmNoSW5wdXQudmFsdWUpO1xuXHR9KTtcblxuXHQkc2VhcmNoSW5wdXQuZm9jdXMoKTtcblxuXHQkc2VhcmNoTGlzdC5zZXRBdHRyaWJ1dGUoJ3N0eWxlJywgYG1pbi1oZWlnaHQ6ICR7d2luZG93LmlubmVySGVpZ2h0fXB4YCk7XG5cbn1cbiIsIi8qKlxuICogVG9vbCB0aXAgc2hvd2VkIHdoZW4gdXNlciBtYXJrcyB0ZXh0IGluIGFydGljbGUuXG4gKiBUaGlzIG1ha2VzIHRoZSB1c2UgYWJsZSB0byBzaGFyZS9jb21tZW50IG9uIHRoZSBtYXJrZWQuXG4gKi9cblxuLy8gQ2FjaGVkIGRvbSBlbGVtZW50c1xudmFyICRwb3N0Q29udGVudDtcbnZhciAkdG9vbFRpcDtcbnZhciAkdHdpdHRlcjtcblxuLyoqXG4gKiBHZXQgdGhlIHRleHQgc2VsZWN0ZWQgYnkgdGhlIHVzZXJcbiAqIEByZXR1cm4ge3N0cmluZ31cbiAqL1xudmFyIGdldFNlbGVjdGVkVGV4dCA9IGZ1bmN0aW9uKCkge1xuXHR2YXIgdGV4dCA9ICcnO1xuXHRpZiAodHlwZW9mIHdpbmRvdy5nZXRTZWxlY3Rpb24gIT09ICd1bmRlZmluZWQnKSB7XG5cdFx0dGV4dCA9IHdpbmRvdy5nZXRTZWxlY3Rpb24oKS50b1N0cmluZygpO1xuXHR9IGVsc2UgaWYgKHR5cGVvZiBkb2N1bWVudC5zZWxlY3Rpb24gIT09ICd1bmRlZmluZWQnICYmIGRvY3VtZW50LnNlbGVjdGlvbi50eXBlID09PSAnVGV4dCcpIHtcblx0XHR0ZXh0ID0gZG9jdW1lbnQuc2VsZWN0aW9uLmNyZWF0ZVJhbmdlKCkudGV4dDtcblx0fVxuXHRyZXR1cm4gdGV4dDtcbn07XG5cbi8qKlxuICogQ2hlY2sgaWYgdGhlIHNlbGVjdGVkIHRleHQgaXMgaW5zaWRlIHRoZSBjb250ZW50IGNvbnRhaW5lclxuICogQHBhcmFtICB7b2JqZWN0fSAgc2VsZWN0aW9uXG4gKiBAcmV0dXJuIHtCb29sZWFufVxuICovXG52YXIgaXNJbnNpZGVDb250ZW50ID0gZnVuY3Rpb24oc2VsZWN0aW9uKSB7XG5cdHZhciAkY29udGFpbmVyID0gc2VsZWN0aW9uLmFuY2hvck5vZGUucGFyZW50RWxlbWVudDtcblxuXHR3aGlsZSAoJGNvbnRhaW5lciAhPT0gJHBvc3RDb250ZW50ICYmICRjb250YWluZXIucGFyZW50Tm9kZSkge1xuXHRcdCRjb250YWluZXIgPSAkY29udGFpbmVyLnBhcmVudE5vZGU7XG5cdH1cblxuXHRyZXR1cm4gKCRjb250YWluZXIgPT09ICRwb3N0Q29udGVudCk7XG5cbn07XG5cbi8qKlxuICogUGxhY2VzIHRoZSB0b29sIHRpcCBhYm92ZSB0aGUgc2VsZWN0ZWQgdGV4dFxuICogQHJldHVybiB7dm9pZH1cbiAqL1xudmFyIHBsYWNlVG9vbFRpcCA9IGZ1bmN0aW9uKCkge1xuXG5cdC8vIFRpbWVvdXQgdG8gbWFrZSBzdXJlIHRoZSB0ZXh0IGhhcyBiZWVuIHNlbGVjdGVkXG5cdHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XG5cblx0XHR2YXIgaGlnaGxpZ2h0ZWRUZXh0ID0gZ2V0U2VsZWN0ZWRUZXh0KCk7XG5cblx0XHQvLyBIaWRlIHRvb2wgdGlwIGlmIG5vdGhpbmcgaXMgc2VsZWN0ZWRcblx0XHRpZiAoIWhpZ2hsaWdodGVkVGV4dCkge1xuXHRcdFx0JHRvb2xUaXAuY2xhc3NMaXN0LnJlbW92ZSgndG9vbC10aXAtLXZpc2libGUnKTtcblx0XHRcdHJldHVybjtcblx0XHR9XG5cblx0XHQvLyBEaXNwbGF5IHRvb2wgdGlwIGlmIHNlbGVjdGlvbiBpcyBpbnNpZGUgdGhlIGNvbnRlbnQgY29udGFpbmVyXG5cdFx0dmFyIHNlbGVjdGlvbiA9IHdpbmRvdy5nZXRTZWxlY3Rpb24oKTtcblx0XHRpZiAoIWlzSW5zaWRlQ29udGVudChzZWxlY3Rpb24pKSB7XG5cdFx0XHQkdG9vbFRpcC5jbGFzc0xpc3QucmVtb3ZlKCd0b29sLXRpcC0tdmlzaWJsZScpO1xuXHRcdFx0cmV0dXJuO1xuXHRcdH1cblxuXHRcdC8vIENoYW5nZSBjb250ZXh0dWFsIGFjdGlvbnNcblx0XHQkdHdpdHRlci5zZXRBdHRyaWJ1dGUoJ2hyZWYnLCBgaHR0cHM6Ly90d2l0dGVyLmNvbS9pbnRlbnQvdHdlZXQ/dGV4dD0ke2VuY29kZVVSSUNvbXBvbmVudCgnXCInICsgaGlnaGxpZ2h0ZWRUZXh0ICsgJ1wiIC0gJyArICR0d2l0dGVyLmRhdGFzZXQudXJsKX1gKTtcblxuXHRcdC8vIFNob3cgYW5kIHBsYWNlIHRvb2wgdGlwXG5cdFx0dmFyIHNjcm9sbFBvc2l0aW9uID0gKHdpbmRvdy5zY3JvbGxZIHx8IGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5zY3JvbGxUb3ApO1xuXHRcdHZhciByYW5nZSA9IHNlbGVjdGlvbi5nZXRSYW5nZUF0KDApO1xuXHRcdHZhciByZWN0ID0gcmFuZ2UuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG5cdFx0JHRvb2xUaXAuc3R5bGUudG9wID0gKHJlY3QudG9wICsgc2Nyb2xsUG9zaXRpb24pICsgJ3B4Jztcblx0XHQkdG9vbFRpcC5jbGFzc0xpc3QuYWRkKCd0b29sLXRpcC0tdmlzaWJsZScpO1xuXHRcdCR0b29sVGlwLnN0eWxlLmxlZnQgPSAoMC41ICogcmVjdC5sZWZ0ICsgMC41ICogcmVjdC5yaWdodCAtIDAuNSAqICR0b29sVGlwLmNsaWVudFdpZHRoKSArICdweCc7XG5cdH0sIDEwKTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uKCkge1xuXHQkcG9zdENvbnRlbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuY29udGVudCcpO1xuXHQkdG9vbFRpcCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy50b29sLXRpcCcpO1xuXG5cdGlmICghJHBvc3RDb250ZW50IHx8ICEkdG9vbFRpcCkge1xuXHRcdHJldHVybjtcblx0fVxuXG5cdCR0d2l0dGVyID0gJHRvb2xUaXAucXVlcnlTZWxlY3RvcignLnRvb2wtdGlwX190d2l0dGVyJyk7XG5cblx0ZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignbW91c2V1cCcsIHBsYWNlVG9vbFRpcCk7XG5cdGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2tleXVwJywgcGxhY2VUb29sVGlwKTtcblxuXHQvLyBGaWxsIGZvcm0gd2l0aCBzZWxlY3RlZCB0ZXh0IHRvIG1ha2UgYSBxdWljayByZXNwb25zZSBvbiB0aGUgYXJ0aWNsZSBieVxuXHQvLyB0aGUgdXNlclxuXHR2YXIgJHJlc3BvbnNlVGV4dCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5yZXNwb25zZXNfX2Zvcm0gdGV4dGFyZWEnKTtcblx0JHRvb2xUaXAucXVlcnlTZWxlY3RvcignLnRvb2wtdGlwX19yZXNwb25zZScpLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24oZSkge1xuXHRcdGUucHJldmVudERlZmF1bHQoKTtcblx0XHR2YXIgaGlnaGxpZ2h0ZWRUZXh0ID0gZ2V0U2VsZWN0ZWRUZXh0KCk7XG5cdFx0JHJlc3BvbnNlVGV4dC52YWx1ZSA9IGA+ICR7aGlnaGxpZ2h0ZWRUZXh0fVxuXG5gO1xuXHRcdCRyZXNwb25zZVRleHQuZm9jdXMoKTtcblx0XHQkcmVzcG9uc2VUZXh0LnBhcmVudE5vZGUuY2xhc3NMaXN0LmFkZCgndmFsaWRhdGUtLXZhbGlkJyk7XG5cdFx0JHJlc3BvbnNlVGV4dC5wYXJlbnROb2RlLmNsYXNzTGlzdC5yZW1vdmUoJ3ZhbGlkYXRlLS1ub3QtdmFsaWQnKTtcblx0fSk7XG59XG4iLCIvKipcbiAqIEhlbHBlcnMgZm9yIGNvbW11bmljYXRpbmcgd2l0aCB0aGUgbWV0YSBhcGkgaG9sZGluZyByZXNwb25zZXMgYW5kIGxpa2VzIGZvclxuICogdGhlIGFydGljbGVzLlxuICovXG5cbnZhciBhcGlVcmwgPSB3aW5kb3cuYXBpVVJMO1xudmFyIGlkID0gd2luZG93LnBvc3RJZDtcblxuLyoqXG4gKiBNYWtlIGEgQUpBWCBjYWxsIHRvIHRoZSBhcGlcbiAqIEBwYXJhbSAge1N0cmluZ30gcGF0aFxuICogQHBhcmFtICB7U3RyaW5nfSBtZXRob2RcbiAqIEBwYXJhbSAge29iamVjdH0gZGF0YVxuICogQHJldHVybiB7UHJvbWlzZX1cbiAqL1xudmFyIHJlcXVlc3QgPSBmdW5jdGlvbihwYXRoID0gJycsIG1ldGhvZCA9ICdHRVQnLCBkYXRhID0gbnVsbCkge1xuXG4gIHZhciBmZXRjaE9wdGlvbnMgPSB7XG4gICAgbWV0aG9kLFxuICAgIGhlYWRlcnM6IHtcbiAgICAgICdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24vanNvbjsgY2hhcnNldD11dGYtOCdcbiAgICB9XG4gIH07XG5cbiAgaWYgKGRhdGEpIHtcbiAgICBmZXRjaE9wdGlvbnMuYm9keSA9IEpTT04uc3RyaW5naWZ5KGRhdGEpO1xuICB9XG5cbiAgLy8gUGVyZm9ybSB0aGUgYWpheCBjYWxsXG4gIHJldHVybiBmZXRjaChhcGlVcmwgKyBwYXRoLCBmZXRjaE9wdGlvbnMpXG4gICAgLnRoZW4oZnVuY3Rpb24ocmVzcG9uc2UpIHtcbiAgICAgIGlmIChyZXNwb25zZS5zdGF0dXMgPj0gMzAwKSB7XG4gICAgICAgIHJldHVybiBQcm9taXNlLnJlamVjdChyZXNwb25zZSk7XG4gICAgICB9XG4gICAgICByZXR1cm4gcmVzcG9uc2U7XG4gICAgfSlcbiAgICAudGhlbihyZXNwb25zZSA9PiByZXNwb25zZS5qc29uKCkpO1xufTtcblxuLyoqXG4gKiBHZXQgbWV0YSBkYXRhIGZyb20gdGhlIGFydGljbGUuIElmIG5vIG1ldGEgZGF0YSBpcyBwcmVzZW50IGZvciB0aGUgYWN0dWFsXG4gKiBhcnRpY2xlIGFuZCBuZXcgZW50cnkgd2lsbCBiZSBtYWRlLlxuICogQHBhcmFtICB7Ym9vbGVhbn0gcmF3IFdoZXRoZXIgdG8gaW5jbHVkZSBjb21wdXRlZCBmaWVsZHNcbiAqIEByZXR1cm4ge1Byb21pc2V9XG4gKi9cbmV4cG9ydCB2YXIgZ2V0TWV0YSA9IGZ1bmN0aW9uKHJhdykge1xuICB2YXIgcXVlcnkgPSAnP2lkPScgKyBpZDtcbiAgaWYgKHJhdykge1xuICAgIHF1ZXJ5ICs9ICcmcmF3JztcbiAgfVxuICByZXR1cm4gcmVxdWVzdChxdWVyeSlcbiAgICAuY2F0Y2goZnVuY3Rpb24oKSB7XG4gICAgICByZXR1cm4gcmVxdWVzdCgnJywgJ1BPU1QnLCB7XG4gICAgICAgIHJlc3BvbnNlczogW10sXG4gICAgICAgIGxpa2VzOiAwLFxuICAgICAgICBpZFxuICAgICAgfSk7XG4gICAgfSk7XG59O1xuXG5leHBvcnQgdmFyIGdldFNlYXJjaEluZGV4ID0gZnVuY3Rpb24ocXVlcnkpIHtcbiAgcmV0dXJuIHJlcXVlc3QoJ3NlYXJjaD9xPScgKyBxdWVyeSk7XG59O1xuXG4vKipcbiAqIEluY3JlbWVudCB0aGUgbGlrZSB2YWx1ZSB3aXRoIG9uZVxuICogQHJldHVybiB7UHJvbWlzZX1cbiAqL1xuZXhwb3J0IHZhciBsaWtlID0gZnVuY3Rpb24oKSB7XG4gIHJldHVybiBnZXRNZXRhKGlkLCB0cnVlKVxuICAgIC50aGVuKGZ1bmN0aW9uKGRhdGEpIHtcbiAgICAgIHJldHVybiByZXF1ZXN0KCc/aWQ9JyArIGlkLCAnUFVUJywge1xuICAgICAgICBsaWtlczogZGF0YS5saWtlcyArIDFcbiAgICAgIH0pO1xuICAgIH0pO1xufTtcblxuLyoqXG4gKiBVcGRhdGUgYXV0aG9yIGVtYWlsIHVzZWQgdG8gc2VuZCBlLW1haWxzIHdoZW4gYSByZXNwb25zZSBpIHJlY2VpdmVkLlxuICogQHJldHVybiB7UHJvbWlzZX1cbiAqL1xuZXhwb3J0IHZhciB1cGRhdGVBdXRob3JFbWFpbCA9IGZ1bmN0aW9uKGF1dGhvckVtYWlsKSB7XG4gIGlmICghaWQpIHtcbiAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QobmV3IEVycm9yKCdObyBwb3N0SWQnKSk7XG4gIH1cbiAgcmV0dXJuIHJlcXVlc3QoJz9pZD0nICsgaWQsICdQVVQnLCB7XG4gICAgYXV0aG9yRW1haWxcbiAgfSk7XG59O1xuXG4vKipcbiAqIEFkZCBhIHJlc3BvbnNlXG4gKiBAcGFyYW0ge29iamVjdH0gcmVzcG9uc2VcbiAqIEByZXR1cm4ge1Byb21pc2V9XG4gKi9cbmV4cG9ydCB2YXIgYWRkUmVzcG9uc2UgPSBmdW5jdGlvbihyZXNwb25zZSkge1xuICByZXR1cm4gZ2V0TWV0YSh0cnVlKVxuICAgIC50aGVuKGZ1bmN0aW9uKGRhdGEpIHtcblxuICAgICAgLy8gU2V0IHRoZSBwdWJsaXNoIGRhdGEgdG8gbm93XG4gICAgICByZXNwb25zZS5wdWJsaXNoZWQgPSBuZXcgRGF0ZSgpLnRvSVNPU3RyaW5nKCk7XG5cbiAgICAgIC8vIFVwZGF0ZSB0aGUgcmVzcG9uc2VzIGxpc3RcbiAgICAgIGRhdGEucmVzcG9uc2VzLnB1c2gocmVzcG9uc2UpO1xuICAgICAgcmV0dXJuIHJlcXVlc3QoJz9pZD0nICsgaWQsICdQVVQnLCB7XG4gICAgICAgIHJlc3BvbnNlczogZGF0YS5yZXNwb25zZXNcbiAgICAgIH0pO1xuICAgIH0pO1xufTtcblxuLyoqXG4gKiBSZW1vdmUgYSByZXNwb25zZVxuICogQHBhcmFtICB7c3RyaW5nfSBwdWJsaXNoZWRcbiAqIEBwYXJhbSAge3N0cmluZ30gbmFtZVxuICogQHJldHVybiB7UHJvbWlzZX1cbiAqL1xuZXhwb3J0IHZhciByZW1vdmVSZXNwb25zZSA9IGZ1bmN0aW9uKHB1Ymxpc2hlZCwgbmFtZSkge1xuICByZXR1cm4gZ2V0TWV0YSh0cnVlKVxuICAgIC50aGVuKGZ1bmN0aW9uKGRhdGEpIHtcblxuICAgICAgLy8gUmVtb3ZlIHJlc3Bvc2Ugd2hpY2ggbWF0Y2hlcyBvbiBwdWJsaXNoIGRhdGUgYW5kIGF1dGhvciBuYW1lXG4gICAgICB2YXIgcmVzcG9uc2VzID0gZGF0YS5yZXNwb25zZXMuZmlsdGVyKGZ1bmN0aW9uKHJlc3BvbnNlKSB7XG4gICAgICAgIHJldHVybiAocmVzcG9uc2UucHVibGlzaGVkICE9PSBwdWJsaXNoZWQgfHwgcmVzcG9uc2UubmFtZSAhPT0gbmFtZSk7XG4gICAgICB9KTtcblxuICAgICAgcmV0dXJuIHJlcXVlc3QoJz9pZD0nICsgaWQsICdQVVQnLCB7XG4gICAgICAgIHJlc3BvbnNlc1xuICAgICAgfSk7XG4gICAgfSk7XG59O1xuIiwiLyoqXG4gKiBWYWxpZGF0ZSBpbnB1dCBmaWVsZHMgYXMgdXNlciB0eXBlc1xuICovXG5cbi8vIERlcGVuZGVuY2llc1xuaW1wb3J0IHZhbGlkYXRlRm9ybSBmcm9tICcuL3ZhbGlkYXRlJztcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24oJHZhbGlkYXRvcnMsIGNhbGxiYWNrKSB7XG5cdCR2YWxpZGF0b3JzLmZvckVhY2goZnVuY3Rpb24oJHZhbGlkYXRlQ29udGFpbmVyKSB7XG5cdFx0dmFyICR2YWxpZGF0ZUZpZWxkID0gJHZhbGlkYXRlQ29udGFpbmVyLnF1ZXJ5U2VsZWN0b3IoJ2lucHV0LCB0ZXh0YXJlYScpO1xuXG5cdFx0JHZhbGlkYXRlRmllbGQuYWRkRXZlbnRMaXN0ZW5lcignaW5wdXQnLCBmdW5jdGlvbigpIHtcblx0XHRcdHZhciB2YWxpZCA9IHZhbGlkYXRlRm9ybSgkdmFsaWRhdG9ycyk7XG5cdFx0XHRjYWxsYmFjayh2YWxpZCk7XG5cdFx0fSk7XG5cdH0pO1xufVxuIiwiLyoqXG4gKiBDaGVjayBpZiB0aGUgZm9ybSBpcyB2YWxpZFxuICovXG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uKCR2YWxpZGF0b3JzKSB7XG5cdHZhciBub3RWYWxpZCA9ICR2YWxpZGF0b3JzLnNvbWUoZnVuY3Rpb24oJHZhbGlkYXRvcikge1xuXHRcdGlmICgkdmFsaWRhdG9yLmRhdGFzZXQudmFsaWRhdGVSZXF1aXJlZCAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0XHRyZXR1cm4gISR2YWxpZGF0b3IuY2xhc3NMaXN0LmNvbnRhaW5zKCd2YWxpZGF0ZS0tdmFsaWQnKTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0cmV0dXJuICR2YWxpZGF0b3IuY2xhc3NMaXN0LmNvbnRhaW5zKCd2YWxpZGF0ZS0tbm90LXZhbGlkJyk7XG5cdFx0fVxuXHR9KTtcblxuXHRyZXR1cm4gIW5vdFZhbGlkO1xufVxuIiwiLyoqXG4gKiBDaGVjayBpZiB1c2VyIGlzIGxvZ2dlZCBpbiB1c2luZyB0aGUgZ2hvc3Qgc2Vzc2lvbi4gSWYgbG9nZ2VkIGluIGdldCB1c2VyXG4gKiBkYXRhLlxuICovXG5cbi8vIENhY2hlZCBwcm9taXNlXG52YXIgZGF0YVByb21pc2U7XG5cbi8qKlxuICogR2V0IHRoZSBkYXRhIGZvciB0aGUgbG9nZ2VkIGluIHVzZWRcbiAqIEBwYXJhbSAge3N0cmluZ30gdG9rZW5cbiAqIEByZXR1cm4ge1Byb21pc2V9XG4gKi9cbnZhciBnZXRVc2VyRGF0YSA9IGZ1bmN0aW9uKHRva2VuKSB7XG5cdHJldHVybiBmZXRjaCgnL2dob3N0L2FwaS92MC4xL3VzZXJzL21lLz9pbmNsdWRlPXJvbGVzJnN0YXR1cz1hbGwnLCB7XG5cdFx0bWV0aG9kOiAnR0VUJyxcblx0XHRoZWFkZXJzOiB7XG5cdFx0XHQnQXV0aG9yaXphdGlvbic6ICdCZWFyZXIgJyArIHRva2VuXG5cdFx0fVxuXHR9KS50aGVuKGZ1bmN0aW9uKHJlc3BvbnNlKSB7XG5cdFx0aWYgKHJlc3BvbnNlLnN0YXR1cyAhPT0gMjAwKSB7XG5cdFx0XHRyZXR1cm4gUHJvbWlzZS5yZWplY3QoJ09sZCBzZXNzaW9uJyk7XG5cdFx0fVxuXHRcdHJldHVybiByZXNwb25zZS5qc29uKCk7XG5cdH0pLnRoZW4oZnVuY3Rpb24oZGF0YSkge1xuXHRcdHJldHVybiBkYXRhLnVzZXJzWzBdO1xuXHR9KTtcbn07XG5cbi8qKlxuICogQ2hlY2sgaWYgdGhlcmUgaXMgYSBHaG9zdCBzZXNzaW9uLiBJZiBzbyB1c2UgaXQgdG8gZ2V0IHRoZSB1c2VycyBkYXRhLlxuICogQHJldHVybiB7UHJvbWlzZX1cbiAqL1xudmFyIGdldCA9IGZ1bmN0aW9uKCkge1xuXG5cdC8vIEdob3N0IHN0b3JlcyBpdCBzZXNzaW9uIGluIGxvY2FsU3RvcmFnZVxuXHR2YXIgc2Vzc2lvblN0cmluZyA9IGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdnaG9zdDpzZXNzaW9uJyk7XG5cdGlmICghc2Vzc2lvblN0cmluZykge1xuXHRcdHJldHVybiBQcm9taXNlLnJlamVjdCgnTm8gc2Vzc2lvbicpO1xuXHR9XG5cblx0Ly8gVmFsaWQgc2Vzc2lvbj9cblx0dmFyIHNlc3Npb24gPSBKU09OLnBhcnNlKHNlc3Npb25TdHJpbmcpO1xuXHRpZiAoIXNlc3Npb24gfHwgIXNlc3Npb24uYXV0aGVudGljYXRlZCB8fCAhc2Vzc2lvbi5hdXRoZW50aWNhdGVkLmFjY2Vzc190b2tlbikge1xuXHRcdHJldHVybiBQcm9taXNlLnJlamVjdCgnTm8gc2Vzc2lvbicpO1xuXHR9XG5cblx0Ly8gU2Vzc2lvbiBleHBpcmVkP1xuXHRpZiAoc2Vzc2lvbi5hdXRoZW50aWNhdGVkLmV4cGlyZXNfYXQgPCBEYXRlLm5vdygpKSB7XG5cdFx0cmV0dXJuIFByb21pc2UucmVqZWN0KCdTZXNzaW9uIGV4cGlyZWQnKTtcblx0fVxuXG5cdHJldHVybiBnZXRVc2VyRGF0YShzZXNzaW9uLmF1dGhlbnRpY2F0ZWQuYWNjZXNzX3Rva2VuKTtcblxufTtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24oKSB7XG5cblx0Ly8gUmV0dXJuIGNhY2hlZCBwcm9taXNlIGlmIGFscmVhZHkgY2FsbGVkXG5cdGlmICghZGF0YVByb21pc2UpIHtcblx0XHRkYXRhUHJvbWlzZSA9IGdldCgpO1xuXHR9XG5cdHJldHVybiBkYXRhUHJvbWlzZTtcbn1cbiIsIi8qKlxuICogRW5jb2RlIGEgc3RyaW5nXG4gKiBAcGFyYW0gIHtzdHJpbmd9IHN0cmluZ1xuICogQHJldHVybiB7c3RyaW5nfVxuICovXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbihzdHJpbmcpIHtcblx0dmFyIGh0bWxFbmNvZGVkVmFsdWUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKS5hcHBlbmRDaGlsZChcblx0XHRkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShzdHJpbmcpKS5wYXJlbnROb2RlLmlubmVySFRNTDtcblx0cmV0dXJuIGh0bWxFbmNvZGVkVmFsdWUucmVwbGFjZSgvXFxyP1xcbi9nLCAnPGJyPicpO1xufVxuIiwiaW1wb3J0IGdldEFsbCBmcm9tICdkcy1hc3NldHMvZG9tL2dldC1hbGwnO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKHJhdykge1xuXHR2YXIgJGNvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuXHQkY29udGFpbmVyLmlubmVySFRNTCA9IHJhdztcblx0Z2V0QWxsKCdpbWcnLCAkY29udGFpbmVyKS5mb3JFYWNoKGZ1bmN0aW9uKCRpbWcpIHtcblx0XHR2YXIgJGltZ1dyYXBwZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcblx0XHQkaW1nV3JhcHBlci5jbGFzc0xpc3QuYWRkKCdpbWctd3JhcHBlcicpO1xuXHRcdCRpbWdXcmFwcGVyLmlubmVySFRNTCA9ICc8ZGl2IGNsYXNzPVwiaW1nLWNvbnRhaW5lclwiPjxpbWc+PC9kaXY+Jztcblx0XHR2YXIgc3JjID0gJGltZy5nZXRBdHRyaWJ1dGUoJ3NyYycpO1xuXHRcdHZhciBhbHQgPSAkaW1nLmdldEF0dHJpYnV0ZSgnYWx0Jyk7XG5cdFx0dmFyIHBhZGRpbmcgPSA1MDtcblxuXHRcdC8vIExhenkgbG9hZCBhbGwgYnV0IHRoZSBmaXJzdCBpbWFnZVxuXHRcdHZhciAkbmV3SW1nID0gJGltZ1dyYXBwZXIucXVlcnlTZWxlY3RvcignaW1nJyk7XG5cblx0XHQkbmV3SW1nLnNldEF0dHJpYnV0ZSgnZGF0YS1zcmMnLCBzcmMpO1xuXHRcdCRuZXdJbWcuc2V0QXR0cmlidXRlKCdjbGFzcycsICdsYXp5LWltYWdlJyk7XG5cblx0XHRhbHQuc3BsaXQoJzsnKS5mb3JFYWNoKGZ1bmN0aW9uKHN0cikge1xuXHRcdFx0aWYgKHN0ciA9PT0gJ2Z1bGwtc2l6ZScgfHwgc3RyID09PSAnZnVsbC13aWR0aCcpIHtcblx0XHRcdFx0JGltZ1dyYXBwZXIuY2xhc3NMaXN0LmFkZCgnZnVsbC13aWR0aCcpO1xuXHRcdFx0fSBlbHNlIGlmIChzdHIuaW5kZXhPZigncmF0aW89JykgPT09IDApIHtcblx0XHRcdFx0dmFyIHJhdGlvID0gc3RyLnJlcGxhY2UoJ3JhdGlvPScsICcnKTtcblx0XHRcdFx0aWYgKHJhdGlvLmluZGV4T2YoJzonKSkge1xuXHRcdFx0XHRcdHZhciBkaW1lbnNpb25zID0gcmF0aW8uc3BsaXQoJzonKTtcblx0XHRcdFx0XHRyYXRpbyA9IGRpbWVuc2lvbnNbMF0gLyBkaW1lbnNpb25zWzFdO1xuXHRcdFx0XHR9XG5cdFx0XHRcdHBhZGRpbmcgPSAxMDAgLyByYXRpbztcblx0XHRcdH0gZWxzZSBpZiAoc3RyID09PSAnYm9yZGVycycpIHtcblx0XHRcdFx0JGltZ1dyYXBwZXIucXVlcnlTZWxlY3RvcignLmltZy1jb250YWluZXInKS5jbGFzc0xpc3QuYWRkKCdpbWctY29udGFpbmVyLS1ib3JkZXJzJyk7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRhbHQgPSBzdHI7XG5cdFx0XHR9XG5cdFx0fSk7XG5cblx0XHQkbmV3SW1nLnNldEF0dHJpYnV0ZSgnYWx0JywgYWx0KTtcblx0XHQkbmV3SW1nLnNldEF0dHJpYnV0ZSgndGl0bGUnLCAkaW1nLmdldEF0dHJpYnV0ZSgndGl0bGUnKSk7XG5cblx0XHQkaW1nV3JhcHBlci5xdWVyeVNlbGVjdG9yKCcuaW1nLWNvbnRhaW5lcicpXG5cdFx0XHQuc2V0QXR0cmlidXRlKCdzdHlsZScsICdwYWRkaW5nLWJvdHRvbTonICsgcGFkZGluZyArICclJyk7XG5cblx0XHQkaW1nLnBhcmVudE5vZGUub3V0ZXJIVE1MID0gJGltZ1dyYXBwZXIub3V0ZXJIVE1MO1xuXHR9KTtcblx0cmV0dXJuICRjb250YWluZXIuaW5uZXJIVE1MO1xufTtcbiIsImltcG9ydCBzdHJpcFRhZ3MgZnJvbSAnLi9zdHJpcC1odG1sLXRhZ3MnO1xuaW1wb3J0IHdvcmRDb3VudCBmcm9tICd3b3JkLWNvdW50JztcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24oaHRtbCkge1xuXHR2YXIgdGV4dCA9IHN0cmlwVGFncyhodG1sKTtcblx0dmFyIHdvcmRzID0gd29yZENvdW50KHRleHQpO1xuXHR2YXIgcmVhZFRpbWUgPSBNYXRoLmNlaWwod29yZHMgLyAzMDApO1xuXG5cdHZhciBhZmZpeCA9ICcgbWluJztcblx0aWYgKHJlYWRUaW1lID4gMSkge1xuXHRcdGFmZml4ICs9ICdzJztcblx0fVxuXG5cdHJldHVybiByZWFkVGltZSArIGFmZml4O1xufVxuIiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24oaHRtbCkge1xuXHR2YXIgdG1wID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG5cdHRtcC5pbm5lckhUTUwgPSBodG1sO1xuXHRyZXR1cm4gdG1wLnRleHRDb250ZW50IHx8IHRtcC5pbm5lclRleHQgfHwgJyc7XG59XG4iLCIvKipcbiAqIE1haW4gZW50cnkgZm9yIHRoZSBqYXZhc2NyaXB0LlxuICogSW1wb3J0IG1vZHVsZXMgYW5kIHN0YXJ0IHRoZW1cbiAqL1xuXG5pbXBvcnQgbGF6eUltYWdlcyBmcm9tICdkcy1hc3NldHMvbGF6eS9pbWFnZXMnO1xuaW1wb3J0IGdldEFsbCBmcm9tICdkcy1hc3NldHMvZG9tL2dldC1hbGwnO1xuaW1wb3J0IHZhbGlkYXRlSW5wdXRGaWVsZHMgZnJvbSAnZHMtYXNzZXRzL3ZhbGlkYXRlL2lucHV0LWZpZWxkcyc7XG5pbXBvcnQgbmF2aWdhdGlvbiBmcm9tICcuL2NvbXBvbmVudHMvbmF2aWdhdGlvbic7XG5pbXBvcnQgcmVzcG9uc2UgZnJvbSAnLi9jb21wb25lbnRzL3Jlc3BvbnNlJztcbmltcG9ydCB0b29sVGlwIGZyb20gJy4vY29tcG9uZW50cy90b29sLXRpcCc7XG5pbXBvcnQgc2VhcmNoIGZyb20gJy4vY29tcG9uZW50cy9zZWFyY2gnO1xuaW1wb3J0IGdldExvZ2dlZEluRGF0YSBmcm9tICcuL2xpYi9nZXQtbG9nZ2VkLWluLWRhdGEnO1xuaW1wb3J0ICogYXMgYXBpIGZyb20gJy4vbGliL2FwaSc7XG5cbm5hdmlnYXRpb24oKTtcbnRvb2xUaXAoKTtcbnNlYXJjaCgpO1xuXG5nZXRBbGwoJ2ltZycpLmZvckVhY2goZnVuY3Rpb24oJGltZykge1xuXHQkaW1nLm9ubG9hZCA9IGZ1bmN0aW9uKCkge1xuXHRcdHRoaXMuY2xhc3NMaXN0LmFkZCgnYW5pbWF0ZS0tYWN0aXZlJyk7XG5cdH07XG59KTtcbmxhenlJbWFnZXMoMSk7XG52YWxpZGF0ZUlucHV0RmllbGRzKCk7XG5yZXNwb25zZSgpO1xuZ2V0TG9nZ2VkSW5EYXRhKCkudGhlbihmdW5jdGlvbih1c2VyKSB7XG5cdHZhciAkYm9keSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2JvZHknKTtcblxuXHQkYm9keS5jbGFzc0xpc3QuYWRkKCd1c2VyLWxvZ2dlZC1pbicpO1xuXG5cdC8vIEFkbWluIGxvZ2dlZCBpblxuXHR2YXIgYWRtaW4gPSB1c2VyLnJvbGVzLnNvbWUoZnVuY3Rpb24ocm9sZSkge1xuXHRcdHJldHVybiAocm9sZS5uYW1lID09PSAnT3duZXInIHx8IHJvbGUubmFtZSA9PT0gJ0FkbWluaXN0cmF0b3InKTtcblx0fSk7XG5cdGlmIChhZG1pbikge1xuXHRcdCRib2R5LmNsYXNzTGlzdC5hZGQoJ2FkbWluLWxvZ2dlZC1pbicpO1xuXHR9XG5cblx0Ly8gQXV0aG9yIGxvZ2dlZCBpblxuXHRpZiAodXNlci5uYW1lID09PSB3aW5kb3cuYXV0aG9yTmFtZSkge1xuXHRcdCRib2R5LmNsYXNzTGlzdC5hZGQoJ2F1dGhvci1sb2dnZWQtaW4nKTtcblx0XHRyZXR1cm4gYXBpLnVwZGF0ZUF1dGhvckVtYWlsKHVzZXIuZW1haWwpO1xuXHR9XG59KS5jYXRjaChmdW5jdGlvbigpIHt9KTtcbiIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uKGF1dGhvcikge1xuXG5cdHZhciBhdXRob3JJbWFnZSA9ICcnO1xuXHRpZiAoYXV0aG9yLmltYWdlKSB7XG5cdFx0YXV0aG9ySW1hZ2UgPSBgPHRkIHdpZHRoPVwiNSVcIj48aW1nIHNyYz1cIiR7YXV0aG9yLmltYWdlfVwiIGNsYXNzPVwiYXV0aG9yX19pbWFnZSByb3VuZC1pbWdcIj48L3RkPmA7XG5cdH1cblxuXHR2YXIgY292ZXJJbWFnZSA9ICcnO1xuXHRpZiAoYXV0aG9yLmNvdmVyKSB7XG5cdFx0Y292ZXJJbWFnZSA9IGBcbjxpbWcgZGF0YS1zcmM9XCIke2F1dGhvci5jb3Zlcn1cIiBjbGFzcz1cImxhenktaW1hZ2UgZnVsbC13aWR0aCBpbWctZnVsbC13aWR0aFwiIGFsdD1cIiR7YXV0aG9yLm5hbWV9XCIgPlxuYDtcblx0fVxuXG5cdHJldHVybiBgXG48YXJ0aWNsZSBjbGFzcz1cImJveGVzX19pdGVtIHNtYWxsIGFuaW1hdGUgYW5pbWF0ZV9fZmFkZS1pblwiPlxuICA8aGVhZGVyIGNsYXNzPVwiYXV0aG9yXCI+XG4gICAgICA8dGFibGU+XG4gICAgICAgICAgPHRyPlxuICAgICAgICAgICAgICAke2F1dGhvckltYWdlfVxuICAgICAgICAgICAgICA8dGQ+PHNwYW4gY2xhc3M9XCJhdXRob3JfX25hbWVcIj48YSBocmVmPVwiL2F1dGhvci8ke2F1dGhvci5zbHVnfVwiPiR7YXV0aG9yLm5hbWV9PC9hPjwvc3Bhbj48YnI+XG4gICAgICAgICAgICAgIFx0JHthdXRob3IuY291bnQucG9zdHN9IGFydGljbGVzXG4gICAgICAgICAgICAgIDwvdGQ+XG4gICAgICAgICAgPC90cj5cbiAgICAgIDwvdGFibGU+XG4gIDwvaGVhZGVyPlxuICAke2NvdmVySW1hZ2V9XG4gIDxwPiR7YXV0aG9yLmJpbyB8fCAnJ308L3A+XG4gIDxwPjxhIGhyZWY9XCIvYXV0aG9yLyR7YXV0aG9yLnNsdWd9L1wiIGNsYXNzPVwiYnRuXCI+QXJ0aWNsZXMgYnkgYXV0aG9yPC9hPjwvcD5cbjwvYXJ0aWNsZT5cbmA7XG59XG4iLCJpbXBvcnQgaW1hZ2VDb252ZXJ0ZWQgZnJvbSAnLi4vbGliL2ltYWdlLWNvbnZlcnRlcic7XG5pbXBvcnQgcmVhZFRpbWUgZnJvbSAnLi4vbGliL3JlYWQtdGltZSc7XG5pbXBvcnQgZXBvY2hUb1RpbWVhZ28gZnJvbSAnZXBvY2gtdG8tdGltZWFnbyc7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uKHBvc3QpIHtcblxuXHR2YXIgYXV0aG9ySW1hZ2UgPSAnJztcblx0aWYgKHBvc3QuYXV0aG9yLmltYWdlKSB7XG5cdFx0YXV0aG9ySW1hZ2UgPSBgPHRkIHdpZHRoPVwiNSVcIj48aW1nIHNyYz1cIiR7cG9zdC5hdXRob3IuaW1hZ2V9XCIgY2xhc3M9XCJhdXRob3JfX2ltYWdlIHJvdW5kLWltZ1wiPjwvdGQ+YDtcblx0fVxuXG5cdHZhciB0YWdzID0gJyc7XG5cdGlmIChwb3N0LnRhZ3MpIHtcblx0XHR0YWdzID0gJzxicj48c3BhbiBjbGFzcz1cInRhZ3NcIj4nICsgcG9zdC50YWdzLm1hcChmdW5jdGlvbih0YWcpIHtcblx0XHRcdHJldHVybiBgPGEgaHJlZj1cIi90YWcvJHt0YWcuc2x1Z30vXCI+JHt0YWcubmFtZX08L2E+YDtcblx0XHR9KS5qb2luKCcnKSArICc8L3NwYW4+Jztcblx0fVxuXG5cdHZhciBwdWJsaXNoZWQgPSBuZXcgRGF0ZShwb3N0LnB1Ymxpc2hlZF9hdCkuZ2V0VGltZSgpO1xuXHR2YXIgbm93ID0gRGF0ZS5ub3coKTtcblx0dmFyIHRpbWVBZ28gPSBlcG9jaFRvVGltZWFnby50aW1lQWdvKHB1Ymxpc2hlZCwgbm93KTtcblxuXHR2YXIgaHRtbCA9IGltYWdlQ29udmVydGVkKHBvc3QuaHRtbCk7XG5cdHZhciBleGNlcnB0ID0gaHRtbC5zdWJzdHIoMCwgaHRtbC5pbmRleE9mKCc8L3A+JykgKyA0KTtcblxuXHRyZXR1cm4gYFxuPGFydGljbGUgY2xhc3M9XCJib3hlc19faXRlbSBzbWFsbCBhbmltYXRlIGFuaW1hdGVfX2ZhZGUtaW5cIj5cbiAgPGhlYWRlciBjbGFzcz1cImF1dGhvclwiPlxuICAgICAgPHRhYmxlPlxuICAgICAgICAgIDx0cj5cbiAgICAgICAgICAgICAgJHthdXRob3JJbWFnZX1cbiAgICAgICAgICAgICAgPHRkPjxzcGFuIGNsYXNzPVwiYXV0aG9yX19uYW1lXCI+PGEgaHJlZj1cIi9hdXRob3IvJHtwb3N0LmF1dGhvci5zbHVnfVwiPiR7cG9zdC5hdXRob3IubmFtZX08L2E+PC9zcGFuPjxicj5cbiAgICAgICAgICAgICAgJHt0aW1lQWdvfSAmbWlkZG90OyAke3JlYWRUaW1lKHBvc3QuaHRtbCl9IHJlYWQke3RhZ3N9PC90ZD5cbiAgICAgICAgICA8L3RyPlxuICAgICAgPC90YWJsZT5cbiAgPC9oZWFkZXI+XG4gICR7ZXhjZXJwdH1cbiAgPHA+PGEgaHJlZj1cIi8ke3Bvc3Quc2x1Z30vXCIgY2xhc3M9XCJidG5cIj5SZWFkIGFydGljbGU8L2E+PC9wPlxuPC9hcnRpY2xlPlxuYDtcbn1cbiIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uKHVzZXIpIHtcblx0dmFyIGltYWdlID0gJyc7XG5cdGlmICh1c2VyLmltYWdlKSB7XG5cdFx0aW1hZ2UgPSBgXG48dGQgd2lkdGg9XCI1JVwiPjxpbWcgZGF0YS1zcmM9XCIke3VzZXIuaW1hZ2V9XCIgY2xhc3M9XCJhdXRob3JfX2ltYWdlIGF1dGhvcl9faW1hZ2UtLXNtYWxsIGxhenktaW1hZ2UgaW1nLWJnIHJvdW5kLWltZ1wiPjwvdGQ+XG5cdFx0YDtcblx0fVxuXG5cdHJldHVybiBgXG48ZGl2IGNsYXNzPVwiYXV0aG9yIHNtYWxsXCI+XG4gIDx0YWJsZT48dGJvZHk+PHRyPlxuXHRcdCR7aW1hZ2V9XG4gICAgPHRkPlxuICAgICAgPHNwYW4gY2xhc3M9XCJhdXRob3JfX25hbWVcIj4ke3VzZXIubmFtZX08L3NwYW4+XG4gICAgPC90ZD5cbiAgPC90cj48L3Rib2R5PjwvdGFibGU+XG48L2Rpdj5cbmA7XG59XG4iLCJpbXBvcnQgZW5jb2RlIGZyb20gJy4uL2xpYi9odG1sLWVuY29kZSc7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uKHJlc3BvbnNlKSB7XG5cbiAgdmFyIGNsYXNzZXMgPSAncmVzcG9uc2UgYm94ZXNfX2l0ZW0nO1xuICBpZiAocmVzcG9uc2UubmFtZS50b0xvd2VyQ2FzZSgpID09PSB3aW5kb3cuYXV0aG9yTmFtZS50b0xvd2VyQ2FzZSgpKSB7XG4gICAgY2xhc3NlcyArPSAnIGJveGVzX19pdGVtLS10cmFuc3BhcmVudCc7XG4gIH1cblxuICB2YXIgaW1hZ2UgPSAnJztcbiAgaWYgKHJlc3BvbnNlLmltYWdlKSB7XG4gICAgaW1hZ2UgPSBgPHRkIHdpZHRoPVwiNSVcIj48aW1nIGRhdGEtc3JjPVwiJHtyZXNwb25zZS5pbWFnZX1cIiBjbGFzcz1cImF1dGhvcl9faW1hZ2UgYXV0aG9yX19pbWFnZS0tc21hbGwgbGF6eS1pbWFnZSBpbWctYmcgcm91bmQtaW1nXCI+PC90ZD5gO1xuICB9XG5cbiAgdmFyIHJlYWRUaW1lID0gJyc7XG4gIGlmIChyZXNwb25zZS5yZWFkVGltZSkge1xuICAgIHJlYWRUaW1lID0gYCAmbWlkZG90OyAke3Jlc3BvbnNlLnJlYWRUaW1lfSByZWFkYDtcbiAgfVxuXG4gIHZhciBleGNlcnB0ID0gcmVzcG9uc2UuZXhjZXJwdCB8fCByZXNwb25zZS50ZXh0O1xuXG4gIHZhciByZWFkTW9yZSA9ICcnO1xuICBpZiAocmVzcG9uc2UuZXhjZXJwdCkge1xuICAgIHJlYWRNb3JlID0gYFxuPHAgY2xhc3M9XCJyZXNwb25zZV9fdGV4dCBzbWFsbCBoaWRkZW5cIj4ke2VuY29kZShyZXNwb25zZS50ZXh0KX08L3A+XG48cD48YSBocmVmPVwiI1wiIGNsYXNzPVwiYnRuIHJlc3BvbnNlX19yZWFkLW1vcmVcIj5SZWFkIG1vcmU8L2E+PC9wPlxuYDtcbiAgfVxuXG4gIHZhciBuYW1lID0gYCR7ZW5jb2RlKHJlc3BvbnNlLm5hbWUpfWA7XG4gIGlmIChyZXNwb25zZS53ZWJzaXRlKSB7XG4gICAgbmFtZSA9IGA8YSBocmVmPVwiJHtlbmNvZGUocmVzcG9uc2Uud2Vic2l0ZSl9XCI+JHtuYW1lfTwvYT5gO1xuICB9XG5cbiAgcmV0dXJuIGBcbjxkaXYgY2xhc3M9XCIke2NsYXNzZXN9IHNtYWxsXCI+XG4gIDxkaXYgY2xhc3M9XCJhdXRob3JcIj5cbiAgICA8dGFibGU+XG4gICAgICA8dHI+XG4gICAgICAgICR7aW1hZ2V9XG4gICAgICAgIDx0ZD5cbiAgICAgICAgICA8c3BhbiBjbGFzcz1cImF1dGhvcl9fbmFtZVwiPiR7bmFtZX08L3NwYW4+PGJyPlxuICAgICAgICAgICR7cmVzcG9uc2UudGltZUFnb30ke3JlYWRUaW1lfVxuICAgICAgICA8L3RkPlxuICAgICAgPC90cj5cbiAgICA8L3RhYmxlPlxuICA8L2Rpdj5cbiAgPGEgaHJlZj1cIiNcIiBjbGFzcz1cInJlc3BvbnNlX19kZWxldGVcIiBkYXRhLXB1Ymxpc2hlZD1cIiR7cmVzcG9uc2UucHVibGlzaGVkfVwiIGRhdGEtbmFtZT1cIiR7cmVzcG9uc2UubmFtZX1cIj48aW1nIGRhdGEtc3JjPVwiL2Fzc2V0cy9pbWFnZXMvdHJhc2guc3ZnXCIgY2xhc3M9XCJsYXp5LWltYWdlXCI+PC9hPlxuICA8cCBjbGFzcz1cInJlc3BvbnNlX19leGNlcnB0XCI+JHtlbmNvZGUoZXhjZXJwdCl9PC9wPlxuICAke3JlYWRNb3JlfVxuPC9kaXY+YDtcbn1cbiIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uKHRhZykge1xuXG4gIGNvbnNvbGUubG9nKHRhZyk7XG5cbiAgdmFyIGNvdmVySW1hZ2UgPSAnJztcbiAgaWYgKHRhZy5pbWFnZSkge1xuICAgIGNvdmVySW1hZ2UgPSBgXG48aW1nIGRhdGEtc3JjPVwiJHt0YWcuaW1hZ2V9XCIgY2xhc3M9XCJsYXp5LWltYWdlIGZ1bGwtd2lkdGggaW1nLWZ1bGwtd2lkdGhcIiBhbHQ9XCIke3RhZy5uYW1lfVwiID5cbmA7XG4gIH1cblxuICByZXR1cm4gYFxuPGFydGljbGUgY2xhc3M9XCJib3hlc19faXRlbSBzbWFsbCBhbmltYXRlIGFuaW1hdGVfX2ZhZGUtaW5cIj5cbiAgPGhlYWRlciBjbGFzcz1cImF1dGhvclwiPlxuICAgICAgPHRhYmxlPlxuICAgICAgICAgIDx0cj5cbiAgICAgICAgICAgICAgPHRkPjxzcGFuIGNsYXNzPVwiYXV0aG9yX19uYW1lXCI+PGEgaHJlZj1cIi90YWcvJHt0YWcuc2x1Z31cIj4ke3RhZy5uYW1lfTwvYT48L3NwYW4+PGJyPlxuICAgICAgICAgICAgICBcdCR7dGFnLmNvdW50LnBvc3RzfSBhcnRpY2xlc1xuICAgICAgICAgICAgICA8L3RkPlxuICAgICAgICAgIDwvdHI+XG4gICAgICA8L3RhYmxlPlxuICA8L2hlYWRlcj5cbiAgJHtjb3ZlckltYWdlfVxuICA8cD4ke3RhZy5kZXNjcmlwdGlvbiB8fCAnJ308L3A+XG4gIDxwPjxhIGhyZWY9XCIvdGFnLyR7dGFnLnNsdWd9L1wiIGNsYXNzPVwiYnRuXCI+QXJ0aWNsZXMgaW4gY2F0ZWdvcnk8L2E+PC9wPlxuPC9hcnRpY2xlPlxuYDtcbn1cbiIsIi8qKlxuICogV29yZCBDb3VudFxuICpcbiAqIFdvcmQgY291bnQgaW4gcmVzcGVjdCBvZiBDSksgY2hhcmFjdGVycy5cbiAqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTUgYnkgSHNpYW9taW5nIFlhbmcuXG4gKi9cblxudmFyIHBhdHRlcm4gPSAvW2EtekEtWjAtOV9cXHUwMzkyLVxcdTAzYzlcXHUwMGMwLVxcdTAwZmZcXHUwNjAwLVxcdTA2ZmZdK3xbXFx1NGUwMC1cXHU5ZmZmXFx1MzQwMC1cXHU0ZGJmXFx1ZjkwMC1cXHVmYWZmXFx1MzA0MC1cXHUzMDlmXFx1YWMwMC1cXHVkN2FmXSsvZztcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoZGF0YSkge1xuICB2YXIgbSA9IGRhdGEubWF0Y2gocGF0dGVybik7XG4gIHZhciBjb3VudCA9IDA7XG4gIGZvciAodmFyIGkgPSAwOyBpIDwgbS5sZW5ndGg7IGkrKykge1xuICAgIGlmIChtW2ldLmNoYXJDb2RlQXQoMCkgPj0gMHg0ZTAwKSB7XG4gICAgICBjb3VudCArPSBtW2ldLmxlbmd0aDtcbiAgICB9IGVsc2Uge1xuICAgICAgY291bnQgKz0gMTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIGNvdW50O1xufTtcbiJdfQ==
