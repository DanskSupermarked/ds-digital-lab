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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJub2RlX21vZHVsZXMvZHMtYXNzZXRzL2FzeW5jL2RlYm91bmNlLmpzIiwibm9kZV9tb2R1bGVzL2RzLWFzc2V0cy9kb20vZ2V0LWFsbC5qcyIsIm5vZGVfbW9kdWxlcy9kcy1hc3NldHMvZG9tL2dldC1kb2N1bWVudC1vZmZzZXQtdG9wLmpzIiwibm9kZV9tb2R1bGVzL2RzLWFzc2V0cy9sYXp5L2ltYWdlcy5qcyIsIm5vZGVfbW9kdWxlcy9kcy1hc3NldHMvc2Nyb2xsL2hhcy1zY3JvbGxlZC1wYXN0LmpzIiwibm9kZV9tb2R1bGVzL2RzLWFzc2V0cy9zY3JvbGwvc2Nyb2xsLWNoYW5nZS5qcyIsIm5vZGVfbW9kdWxlcy9kcy1hc3NldHMvc2Nyb2xsL3Zpc2libGUuanMiLCJub2RlX21vZHVsZXMvZHMtYXNzZXRzL3ZhbGlkYXRlL2luZGV4LmpzIiwibm9kZV9tb2R1bGVzL2RzLWFzc2V0cy92YWxpZGF0ZS9pbnB1dC1maWVsZHMuanMiLCJub2RlX21vZHVsZXMvZHMtYXNzZXRzL3ZhbGlkYXRlL2lzLWRhdGUuanMiLCJub2RlX21vZHVsZXMvZHMtYXNzZXRzL3ZhbGlkYXRlL2lzLWVtYWlsLmpzIiwibm9kZV9tb2R1bGVzL2RzLWFzc2V0cy92YWxpZGF0ZS9pcy1mbG9hdC5qcyIsIm5vZGVfbW9kdWxlcy9kcy1hc3NldHMvdmFsaWRhdGUvaXMtaW50LmpzIiwibm9kZV9tb2R1bGVzL2RzLWFzc2V0cy92YWxpZGF0ZS9pcy1yZXF1aXJlZC5qcyIsIm5vZGVfbW9kdWxlcy9kcy1hc3NldHMvdmFsaWRhdGUvaXMtdXJsLmpzIiwibm9kZV9tb2R1bGVzL2Vwb2NoLXRvLXRpbWVhZ28vY3V0b2ZmL2N1dG9mZi5qc29uIiwibm9kZV9tb2R1bGVzL2Vwb2NoLXRvLXRpbWVhZ28vaW5kZXguanMiLCJub2RlX21vZHVsZXMvZXBvY2gtdG8tdGltZWFnby9zdWZmaXgvc3VmZml4LWRpY3Rpb25hcnkuanNvbiIsIm5vZGVfbW9kdWxlcy9lcG9jaC10by10aW1lYWdvL3RpbWUtYWdvL3RpbWUtYWdvLmpzIiwibm9kZV9tb2R1bGVzL2Vwb2NoLXRvLXRpbWVhZ28vdGltZS1jYWxjdWxhdGlvbnMvaW5kZXguanMiLCJub2RlX21vZHVsZXMvZXBvY2gtdG8tdGltZWFnby90aW1lLWNhbGN1bGF0aW9ucy90aW1lLWFnby9kYXlzLWFnby5qcyIsIm5vZGVfbW9kdWxlcy9lcG9jaC10by10aW1lYWdvL3RpbWUtY2FsY3VsYXRpb25zL3RpbWUtYWdvL2hvdXJzLWFnby5qcyIsIm5vZGVfbW9kdWxlcy9lcG9jaC10by10aW1lYWdvL3RpbWUtY2FsY3VsYXRpb25zL3RpbWUtYWdvL21pbnV0ZXMtYWdvLmpzIiwibm9kZV9tb2R1bGVzL2Vwb2NoLXRvLXRpbWVhZ28vdGltZS1jYWxjdWxhdGlvbnMvdGltZS1hZ28vbW9udGhzLWFnby5qcyIsIm5vZGVfbW9kdWxlcy9lcG9jaC10by10aW1lYWdvL3RpbWUtY2FsY3VsYXRpb25zL3RpbWUtYWdvL3NlY29uZHMtYWdvLmpzIiwibm9kZV9tb2R1bGVzL2Vwb2NoLXRvLXRpbWVhZ28vdGltZS1jYWxjdWxhdGlvbnMvdGltZS1hZ28vd2Vla3MtYWdvLmpzIiwibm9kZV9tb2R1bGVzL2Vwb2NoLXRvLXRpbWVhZ28vdGltZS1jYWxjdWxhdGlvbnMvdGltZS1hZ28veWVhcnMtYWdvLmpzIiwic3JjL3NjcmlwdHMvY29tcG9uZW50cy9uYXZpZ2F0aW9uLmpzIiwic3JjL3NjcmlwdHMvY29tcG9uZW50cy9yZXNwb25zZS5qcyIsInNyYy9zY3JpcHRzL2NvbXBvbmVudHMvc2VhcmNoLmpzIiwic3JjL3NjcmlwdHMvY29tcG9uZW50cy90b29sLXRpcC5qcyIsInNyYy9zY3JpcHRzL2xpYi9hcGkuanMiLCJzcmMvc2NyaXB0cy9saWIvZm9ybS9saXZlLXZhbGlkYXRpb24uanMiLCJzcmMvc2NyaXB0cy9saWIvZm9ybS92YWxpZGF0ZS5qcyIsInNyYy9zY3JpcHRzL2xpYi9nZXQtbG9nZ2VkLWluLWRhdGEuanMiLCJzcmMvc2NyaXB0cy9saWIvaHRtbC1lbmNvZGUuanMiLCJzcmMvc2NyaXB0cy9saWIvaW1hZ2UtY29udmVydGVyLmpzIiwic3JjL3NjcmlwdHMvbGliL3JlYWQtdGltZS5qcyIsInNyYy9zY3JpcHRzL2xpYi9zdHJpcC1odG1sLXRhZ3MuanMiLCJzcmMvc2NyaXB0cy9tYWluLmpzIiwic3JjL3NjcmlwdHMvdGVtcGxhdGVzL2F1dGhvci5qcyIsInNyYy9zY3JpcHRzL3RlbXBsYXRlcy9wb3N0LmpzIiwic3JjL3NjcmlwdHMvdGVtcGxhdGVzL3Jlc3BvbnNlLW1ldGEuanMiLCJzcmMvc2NyaXB0cy90ZW1wbGF0ZXMvcmVzcG9uc2UuanMiLCJzcmMvc2NyaXB0cy90ZW1wbGF0ZXMvdGFnLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3dvcmQtY291bnQvaW5kZXguanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7a0JDTWUsVUFBUyxRQUFULEVBQW1CLE9BQW5CLEVBQTRCO0FBQ3pDLE1BQUksVUFBVSxLQUFWLENBRHFDO0FBRXpDLE1BQUksT0FBTyxTQUFQLElBQU8sR0FBTTtBQUNmLGNBQVUsS0FBVixDQURlO0dBQU4sQ0FGOEI7QUFLekMsU0FBTyxZQUFXO0FBQ2hCLFFBQUksT0FBSixFQUFhO0FBQ1gsYUFEVztLQUFiO0FBR0EsY0FBVSxJQUFWLENBSmdCO0FBS2hCLGFBQVMsS0FBVCxDQUFlLElBQWYsRUFBcUIsU0FBckIsRUFMZ0I7QUFNaEIsUUFBSSxDQUFDLE9BQUQsRUFBVTtBQUNaLGFBQU8scUJBQVAsQ0FBNkIsSUFBN0IsRUFEWTtLQUFkLE1BRU87QUFDTCxhQUFPLFVBQVAsQ0FBa0IsSUFBbEIsRUFBd0IsT0FBeEIsRUFESztLQUZQO0dBTkssQ0FMa0M7Q0FBNUI7Ozs7Ozs7OztrQkNBQSxVQUFTLFFBQVQsRUFBcUM7TUFBbEIsOERBQVEsd0JBQVU7O0FBQ2xELFNBQU8sTUFBTSxTQUFO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QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiLyoqXG4gKiBNYWtlIHN1cmUgYSBmdW5jdGlvbiBvbmx5IGlzIHJ1biBldmVyeSB4IG1zXG4gKiBAcGFyYW0gIHtGdW5jdGlvbn0gY2FsbGJhY2sgTWV0aG9kIHRvIGV4ZWN1dGUgaWYgaXQgaXMgbm90IGRlYm91bmNlZFxuICogQHBhcmFtICB7aW50ZWdlcn0gIHRpbWVvdXQgIE1pbGxpc2Vjb25kcyB0byB3YWl0IGJlZm9yZSBuZXh0IGFsbG93ZWQgY2FsbGJhY2suIERlZmF1bHRzIHRvIHRoZSBhbmltYXRpb24gZnJhbWUgcmF0ZSBpbiB0aGUgYnJvd3NlclxuICogQHJldHVybiB7dm9pZH1cbiAqL1xuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24oY2FsbGJhY2ssIHRpbWVvdXQpIHtcbiAgdmFyIHBlbmRpbmcgPSBmYWxzZTtcbiAgdmFyIGRvbmUgPSAoKSA9PiB7XG4gICAgcGVuZGluZyA9IGZhbHNlO1xuICB9O1xuICByZXR1cm4gZnVuY3Rpb24oKSB7XG4gICAgaWYgKHBlbmRpbmcpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgcGVuZGluZyA9IHRydWU7XG4gICAgY2FsbGJhY2suYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgICBpZiAoIXRpbWVvdXQpIHtcbiAgICAgIHdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUoZG9uZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHdpbmRvdy5zZXRUaW1lb3V0KGRvbmUsIHRpbWVvdXQpO1xuICAgIH1cbiAgfTtcbn1cbiIsIi8qKlxuICogR2V0IGFuIGFycmF5IG9mIGRvbSBlbGVtZW50cyBtYXRjaGluZyB0aGUgc2VsZWN0b3JcbiAqIEBwYXJhbSAge3N0cmluZ30gICAgIHNlbGVjdG9yXG4gKiBAcGFyYW0gIHtET01lbGVtZW50fSBET00gZWxlbWVudCB0byBzZWFyY2ggaW4uIERlZmF1bHRzIHRvIGRvY3VtZW50XG4gKiBAcmV0dXJuIHthcnJheX1cbiAqL1xuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24oc2VsZWN0b3IsICRyb290ID0gZG9jdW1lbnQpIHtcbiAgcmV0dXJuIEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKCRyb290LnF1ZXJ5U2VsZWN0b3JBbGwoc2VsZWN0b3IpKTtcbn1cbiIsIi8qKlxuICogR2V0IHRoZSBlbGVtZW50cyBvZmZzZXQgcmVsYXRpdmUgdG8gdGhlIGRvY3VtZW50XG4gKiBAcGFyYW0gIHtET01FbGVtZW50fSAkZWxlbWVudCBFbGVtZW50IHRvIGdldCB0aGUgb2Zmc2V0IGZyb21cbiAqIEByZXR1cm4ge2ludGVnZXJ9ICAgICAgICAgICAgIE9mZnNldCBpbiBwaXhlbHNcbiAqL1xuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24oJGVsZW1lbnQpIHtcbiAgdmFyIG9mZnNldCA9IDA7XG5cbiAgd2hpbGUgKCRlbGVtZW50ICYmICFpc05hTigkZWxlbWVudC5vZmZzZXRUb3ApKSB7XG4gICAgb2Zmc2V0ICs9ICRlbGVtZW50Lm9mZnNldFRvcDtcbiAgICAkZWxlbWVudCA9ICRlbGVtZW50Lm9mZnNldFBhcmVudDtcbiAgfVxuICByZXR1cm4gb2Zmc2V0O1xufVxuIiwiLyoqXG4gKiBMYXp5IGxvYWQgaW1hZ2VzIHdpdGggY2xhc3MgLmxhenktaW1hZ2VzLlxuICogRGVwZW5kaW5nIG9uIHRoZSB0cmVzaG9sZCBpbWFnZXMgd2lsbCBsb2FkIGFzIHRoZSB1c2VyIHNjcm9sbHMgZG93biBvbiB0aGVcbiAqIGRvY3VtZW50LlxuICovXG5cbi8vIERlcGVuZGVuY2Vpc1xuaW1wb3J0IGdldEFsbEVsZW1lbnRzIGZyb20gJy4uL2RvbS9nZXQtYWxsJztcbmltcG9ydCBzY3JvbGxWaXNpYmxlIGZyb20gJy4uL3Njcm9sbC92aXNpYmxlJztcblxuLy8gTG9hZCBpbWFnZSBlbGVtZW50XG52YXIgbG9hZEltZyA9IGZ1bmN0aW9uKCRpbWcpIHtcblxuICBpZiAoJGltZy5kYXRhc2V0LnNyYykge1xuICAgICRpbWcuc2V0QXR0cmlidXRlKCdzcmMnLCAkaW1nLmRhdGFzZXQuc3JjKTtcbiAgfVxuICBpZiAoJGltZy5kYXRhc2V0LnNyY3NldCkge1xuICAgICRpbWcuc2V0QXR0cmlidXRlKCdzcmNzZXQnLCAkaW1nLmRhdGFzZXQuc3Jjc2V0KTtcbiAgfVxufTtcblxuLy8gTG9hZCBwaWN0dXJlIGVsZW1lbnRcbnZhciBsb2FkUGljdHVyZSA9IGZ1bmN0aW9uKCRwaWN0dXJlKSB7XG4gIGxvYWRJbWcoJHBpY3R1cmUucXVlcnlTZWxlY3RvcignaW1nJykpO1xuICB2YXIgJHNvdXJjZXMgPSBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbCgkcGljdHVyZS5xdWVyeVNlbGVjdG9yQWxsKCdzb3VyY2UnKSk7XG4gICRzb3VyY2VzLmZvckVhY2goJHNvdXJjZSA9PiAkc291cmNlLnNldEF0dHJpYnV0ZSgnc3Jjc2V0JywgJHNvdXJjZS5kYXRhc2V0LnNyY3NldCkpO1xufTtcblxudmFyIGxvYWRFbGVtZW50ID0gZnVuY3Rpb24oJGVsZW1lbnQpIHtcbiAgaWYgKCRlbGVtZW50Lm1hdGNoZXMoJ3BpY3R1cmUnKSkge1xuICAgIGxvYWRQaWN0dXJlKCRlbGVtZW50KTtcbiAgfSBlbHNlIGlmICgkZWxlbWVudC5tYXRjaGVzKCdpbWcnKSkge1xuICAgIGxvYWRJbWcoJGVsZW1lbnQpO1xuICB9XG5cbiAgLy8gTWFrZSBzdXJlIHBpY3R1cmVmaWxsIHdpbGwgdXBkYXRlIHRoZSBpbWFnZSB3aGVuIHNvdXJjZSBoYXMgY2hhbmdlZFxuICBpZiAod2luZG93LnBpY3R1cmVmaWxsKSB7XG4gICAgd2luZG93LnBpY3R1cmVmaWxsKHtcbiAgICAgIHJlZXZhbHVhdGU6IHRydWVcbiAgICB9KTtcbiAgfVxufTtcblxuLyoqXG4gKiBBY3RpdmF0ZSBsYXp5IGxvYWQgb2YgaW1hZ2VzIGFzIHVzZXIgc2Nyb2xsc1xuICogQHBhcmFtICB7ZmxvYXR9IHRocmVzaG9sZCAgUGVyY2VudCBiZWxvdyBzY3JlZW4gdG8gaW5pdGlhbGl6ZSBsb2FkIG9mIGltYWdlXG4gKiBAcmV0dXJuIHt2b2lkfVxuICovXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbih0aHJlc2hvbGQgPSAwLjUpIHtcbiAgdmFyICRsYXp5SW1hZ2VzID0gZ2V0QWxsRWxlbWVudHMoJy5sYXp5LWltYWdlJyk7XG5cbiAgd2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZShmdW5jdGlvbigpIHtcbiAgICAkbGF6eUltYWdlcy5mb3JFYWNoKGZ1bmN0aW9uKCRsYXp5SW1hZ2UpIHtcblxuICAgICAgLy8gSWdub3JlIGltYWdlcyB3aGljaCBoYXMgYWxyZWFkeSBiZWVuIHJlZ2lzdGVyZWRcbiAgICAgIGlmICgkbGF6eUltYWdlLmRhdGFzZXQubGF6eUltYWdlTGlzdGVuaW5nKSB7XG5cdHJldHVybjtcbiAgICAgIH1cbiAgICAgICRsYXp5SW1hZ2Uuc2V0QXR0cmlidXRlKCdkYXRhLWxhenktaW1hZ2UtbGlzdGVuaW5nJywgJ3RydWUnKTtcblxuICAgICAgc2Nyb2xsVmlzaWJsZSgkbGF6eUltYWdlLCB0aHJlc2hvbGQpXG4gICAgICAgIC50aGVuKCgpID0+IGxvYWRFbGVtZW50KCRsYXp5SW1hZ2UpKTtcbiAgICB9KTtcbiAgfSk7XG5cbn1cbiIsIi8vIERlcGVuZGVuY2llc1xuaW1wb3J0IGdldERvY3VtZW50T2Zmc2V0VG9wIGZyb20gJy4uL2RvbS9nZXQtZG9jdW1lbnQtb2Zmc2V0LXRvcCc7XG5cbi8qKlxuICogQ2hlY2tzIGlmIHRoZSB1c2VyIGhhcyBzY3JvbGxlZCB0byBvciBwYXN0IGFuIGVsZW1lbnRcbiAqIEBwYXJhbSAge0RPTUVsZW1lbnR9ICRlbGVtZW50ICBUaGUgZWxlbWVudCB0byBjaGVjayBhZ2FpbnN0XG4gKiBAcGFyYW0gIHtmbG9hdH0gICAgICB0aHJlc2hvbGQgRGlzdGFuY2UgaW4gcGVyY2VudCBvZiB0aGUgc2NlZWVuIGhlaWdodCB0byBtZWFzdXJlIGFnYWluc3QuXG4gKiBAcmV0dXJuIHtib29sZWFufVxuICovXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbigkZWxlbWVudCwgdGhyZXNob2xkID0gMCkge1xuICB2YXIgc2Nyb2xsQm90dG9tID0gKHdpbmRvdy5zY3JvbGxZIHx8IGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5zY3JvbGxUb3ApICsgKHdpbmRvdy5pbm5lckhlaWdodCAqICgxICsgdGhyZXNob2xkKSk7XG4gIHZhciBvZmZzZXRUb3AgPSBnZXREb2N1bWVudE9mZnNldFRvcCgkZWxlbWVudCk7XG4gIHJldHVybiAoc2Nyb2xsQm90dG9tID4gb2Zmc2V0VG9wKTtcbn1cbiIsIi8vIGRlcGVuZGVuY2llc1xuaW1wb3J0IGRlYm91bmNlIGZyb20gJy4uL2FzeW5jL2RlYm91bmNlJztcblxuLyoqXG4gKiBSdW5zIHNjcmlwdHMgZWFjaCB0aW1lIHRoZSB1c2VyIGNoYW5nZXMgc2Nyb2xsIGRpcmVjdGlvblxuICogQHBhcmFtICB7RnVuY3Rpb259IGRvd25DYWxsYmFjayAgQ2FsbGJhY2sgZXZlcnkgdGltZSB0aGUgdXNlciBzdGFydHMgc2Nyb2xsaW5nIGRvd25cbiAqIEBwYXJhbSAge0Z1bmN0aW9ufSB1cENhbGxiYWNrICAgIENhbGxiYWNrIGV2ZXJ5IHRpbWUgdGhlIHVzZXIgc3RhcnRzIHNjcm9sbGluZyB1cFxuICogQHBhcmFtICB7ZmxvYXR9ICAgIHRocmVzaG9sZCAgICAgTWFyZ2luIGluIHRvcCB3aGVyZSBzY3JvbGwgZG93biBpcyBpZ25vcmVkIChjb3VsZCBiZSB1c2VkIGZvciBuYXZzKVxuICogQHJldHVybiB7dm9pZH1cbiAqL1xuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24oZG93bkNhbGxiYWNrID0gZnVuY3Rpb24oKSB7fSwgdXBDYWxsYmFjayA9IGZ1bmN0aW9uKCkge30sIHRocmVzaG9sZCA9IDApIHtcblxuICB2YXIgbGFzdFNjcm9sbFBvcyA9IDA7XG4gIHZhciBzY3JvbGxlZERvd24gPSBmYWxzZTtcblxuICB2YXIgaXNTY3JvbGxpbmcgPSBmdW5jdGlvbigpIHtcbiAgICB2YXIgY3VycmVudFNjcm9sbFBvcyA9IHdpbmRvdy5zY3JvbGxZO1xuXG4gICAgaWYgKCFzY3JvbGxlZERvd24gJiZcbiAgICAgIGN1cnJlbnRTY3JvbGxQb3MgPiB0aHJlc2hvbGQgJiZcbiAgICAgIGN1cnJlbnRTY3JvbGxQb3MgPiBsYXN0U2Nyb2xsUG9zKSB7XG4gICAgICBkb3duQ2FsbGJhY2soKTtcbiAgICAgIHNjcm9sbGVkRG93biA9IHRydWU7XG4gICAgfSBlbHNlIGlmIChzY3JvbGxlZERvd24gJiZcbiAgICAgIChjdXJyZW50U2Nyb2xsUG9zIDw9IHRocmVzaG9sZCB8fCBjdXJyZW50U2Nyb2xsUG9zIDwgbGFzdFNjcm9sbFBvcykgJiZcbiAgICAgIChjdXJyZW50U2Nyb2xsUG9zICsgd2luZG93LmlubmVySGVpZ2h0IDwgZG9jdW1lbnQuYm9keS5jbGllbnRIZWlnaHQpKSB7XG4gICAgICB1cENhbGxiYWNrKCk7XG4gICAgICBzY3JvbGxlZERvd24gPSBmYWxzZTtcbiAgICB9XG5cbiAgICBsYXN0U2Nyb2xsUG9zID0gY3VycmVudFNjcm9sbFBvcztcbiAgfTtcblxuICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignc2Nyb2xsJywgZGVib3VuY2UoaXNTY3JvbGxpbmcpKTtcbiAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignRE9NQ29udGVudExvYWRlZCcsIGlzU2Nyb2xsaW5nKTtcbn1cbiIsIi8vIERlcGVuZGVuY2Vpc1xuaW1wb3J0IGRlYm91bmNlIGZyb20gJy4uL2FzeW5jL2RlYm91bmNlJztcbmltcG9ydCBoYXNTY3JvbGxlZFBhc3QgZnJvbSAnLi9oYXMtc2Nyb2xsZWQtcGFzdCc7XG5cbi8qKlxuICogRnVsZmlsbCBhIHByb21pc2UsIHdoZW4gdGhlIGVsZW1lbnQgaXMgdmlzaWJsZSAoc2Nyb2xsZWQgdG8gb3IgcGFzdClcbiAqIEBwYXJhbSAge0RPTUVsZW1lbnR9ICRlbGVtZW50ICBFbGVtZW50IHRvIGNoZWNrXG4gKiBAcGFyYW0gIHtmbG9hdH0gICAgICB0aHJlc2hvbGQgRGlzdGFuY2UgaW4gcGVyY2VudFxuICogQHJldHVybiB7W3R5cGVdfSAgICAgICAgICAgW2Rlc2NyaXB0aW9uXVxuICovXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbigkZWxlbWVudCwgdGhyZXNob2xkID0gMCkge1xuXG4gIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbihyZXNvbHZlKSB7XG5cbiAgICB2YXIgY2hlY2tFbGVtZW50ID0gZGVib3VuY2UoZnVuY3Rpb24oKSB7XG4gICAgICBpZiAoaGFzU2Nyb2xsZWRQYXN0KCRlbGVtZW50LCB0aHJlc2hvbGQpKSB7XG4gICAgICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKCdzY3JvbGwnLCBjaGVja0VsZW1lbnQpO1xuICAgICAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcigncmVzaXplJywgY2hlY2tFbGVtZW50KTtcbiAgICAgICAgcmVzb2x2ZSgpO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3Njcm9sbCcsIGNoZWNrRWxlbWVudCk7XG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3Jlc2l6ZScsIGNoZWNrRWxlbWVudCk7XG4gICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignRE9NQ29udGVudExvYWRlZCcsIGNoZWNrRWxlbWVudCk7XG4gICAgc2V0VGltZW91dChjaGVja0VsZW1lbnQsIDApO1xuICB9KTtcbn1cbiIsIi8qKlxuICogSGVscGVycyBmb3IgdmFsaWRhdGluZyBpbnB1dCBmaWVsZHNcbiAqL1xuXG5pbXBvcnQgaXNEYXRlIGZyb20gJy4vaXMtZGF0ZSc7XG5pbXBvcnQgaXNFbWFpbCBmcm9tICcuL2lzLWVtYWlsJztcbmltcG9ydCBpc0Zsb2F0IGZyb20gJy4vaXMtZmxvYXQnO1xuaW1wb3J0IGlzSW50IGZyb20gJy4vaXMtaW50JztcbmltcG9ydCBpc1JlcXVpcmVkIGZyb20gJy4vaXMtcmVxdWlyZWQnO1xuaW1wb3J0IGlzVXJsIGZyb20gJy4vaXMtdXJsJztcblxuZXhwb3J0IGRlZmF1bHQge1xuICBpc0RhdGUsXG4gIGlzRW1haWwsXG4gIGlzRmxvYXQsXG4gIGlzSW50LFxuICBpc1JlcXVpcmVkLFxuICBpc1VybFxufTtcbiIsImltcG9ydCBnZXRBbGxFbGVtZW50cyBmcm9tICcuLi9kb20vZ2V0LWFsbCc7XG5pbXBvcnQgdmFsaWRhdGUgZnJvbSAnLi8nO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbigpIHtcblxuICBnZXRBbGxFbGVtZW50cygnLnZhbGlkYXRlJykuZm9yRWFjaChmdW5jdGlvbigkdmFsaWRhdGVDb250YWluZXIpIHtcblxuICAgIHZhciAkdmFsaWRhdGVGaWVsZCA9ICR2YWxpZGF0ZUNvbnRhaW5lcjtcblxuICAgIGlmICghJHZhbGlkYXRlQ29udGFpbmVyLm1hdGNoZXMoJ2lucHV0LCB0ZXh0YXJlYScpKSB7XG4gICAgICAkdmFsaWRhdGVGaWVsZCA9ICR2YWxpZGF0ZUNvbnRhaW5lci5xdWVyeVNlbGVjdG9yKCdpbnB1dCwgdGV4dGFyZWEnKTtcbiAgICB9XG5cbiAgICBpZiAoISR2YWxpZGF0ZUZpZWxkKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgLy8gRmluZCByZWxldmF0IHZhbGlkYXRpb24gbWV0aG9kc1xuICAgIHZhciB2YWxpZGF0b3JOYW1lcyA9IFtdO1xuICAgIGZvciAodmFyIGtleSBpbiAkdmFsaWRhdGVDb250YWluZXIuZGF0YXNldCkge1xuICAgICAgaWYgKGtleSAhPT0gJ3ZhbGlkYXRlJyAmJiBrZXkuaW5kZXhPZigndmFsaWRhdGUnKSA9PT0gMCkge1xuICAgICAgICB2YXIgdmFsaWRhdG9yTmFtZSA9IGtleS5yZXBsYWNlKCd2YWxpZGF0ZScsICcnKTtcblxuICAgICAgICBpZiAodmFsaWRhdGVbJ2lzJyArIHZhbGlkYXRvck5hbWVdKSB7XG4gICAgICAgICAgdmFsaWRhdG9yTmFtZXMucHVzaCh2YWxpZGF0b3JOYW1lKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIGlmICh2YWxpZGF0b3JOYW1lcy5sZW5ndGggPT09IDApIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICAvLyBDaGVjayB2YWxpZGF0aW9uIHdoZW4gaW5wdXQgb24gZmllbGQgaXMgY2hhbmdlZFxuICAgICR2YWxpZGF0ZUZpZWxkLmFkZEV2ZW50TGlzdGVuZXIoJ2lucHV0JywgZnVuY3Rpb24oKSB7XG4gICAgICB2YXIgaW5wdXQgPSAkdmFsaWRhdGVGaWVsZC52YWx1ZTtcbiAgICAgIHZhciB2YWxpZCA9ICF2YWxpZGF0b3JOYW1lcy5zb21lKGZ1bmN0aW9uKHZhbGlkYXRvck5hbWUpIHtcblx0aWYgKCFpbnB1dCAmJiB2YWxpZGF0b3JOYW1lICE9PSAnUmVxdWlyZWQnKSB7XG5cdCAgcmV0dXJuIGZhbHNlO1xuXHR9XG4gICAgICAgIHJldHVybiAhdmFsaWRhdGVbJ2lzJyArIHZhbGlkYXRvck5hbWVdKGlucHV0KTtcbiAgICAgIH0pO1xuXG4gICAgICBpZiAodmFsaWQpIHtcblx0JHZhbGlkYXRlQ29udGFpbmVyLmNsYXNzTGlzdC5hZGQoJ3ZhbGlkYXRlLS12YWxpZCcpO1xuXHQkdmFsaWRhdGVDb250YWluZXIuY2xhc3NMaXN0LnJlbW92ZSgndmFsaWRhdGUtLW5vdC12YWxpZCcpO1xuICAgICAgfSBlbHNlIHtcblx0JHZhbGlkYXRlQ29udGFpbmVyLmNsYXNzTGlzdC5hZGQoJ3ZhbGlkYXRlLS1ub3QtdmFsaWQnKTtcblx0JHZhbGlkYXRlQ29udGFpbmVyLmNsYXNzTGlzdC5yZW1vdmUoJ3ZhbGlkYXRlLS12YWxpZCcpO1xuICAgICAgfVxuICAgIH0pO1xuICB9KTtcbn1cbiIsIi8qKlxuICogVmFsaWRhdGUgdGhhdCBzdHJpbmcgY2FuIGJlIGNvbnZlcnRlZCB0byBkYXRlXG4gKiBAcGFyYW0gIHtzdHJpbmd9IGRhdGUgaW5wdXRcbiAqIEByZXR1cm4ge2Jvb2xlYW59XG4gKi9cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uKGRhdGUpIHtcbiAgcmV0dXJuICFpc05hTihEYXRlLnBhcnNlKGRhdGUpKTtcbn1cbiIsIi8qKlxuICogVmFsaWRhdGUgZS1tYWlsXG4gKiBAcGFyYW0gIHtzdHJpbmd9IGVtYWlsIGlucHV0XG4gKiBAcmV0dXJuIHtib29sZWFufVxuICovXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbihlbWFpbCkge1xuICB2YXIgcmUgPSAvXihbYS16MC05X1xcLi1dKylAKFtcXGRhLXpcXC4tXSspXFwuKFthLXpcXC5dezIsNn0pJC87XG4gIHJldHVybiByZS50ZXN0KGVtYWlsKTtcbn1cbiIsIi8qKlxuICogVmFsaWRhdGUgZmxvYXRcbiAqIEBwYXJhbSAge3N0cmluZ30gZmxvYXQgaW5wdXRcbiAqIEByZXR1cm4ge2Jvb2xlYW59XG4gKi9cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uKGZsb2F0KSB7XG4gIHZhciByZSA9IC9eKD86Wy0rXT8oPzpbMC05XSspKT8oPzpcXC5bMC05XSopPyg/OltlRV1bXFwrXFwtXT8oPzpbMC05XSspKT8kLztcbiAgcmV0dXJuIGZsb2F0ICE9PSAnJyAmJiByZS50ZXN0KGZsb2F0KTtcbn1cbiIsIi8qKlxuICogVmFsaWRhdGUgaW50ZWdldFxuICogQHBhcmFtICB7c3RyaW5nfSBpbnRlZ2VyIGlucHV0XG4gKiBAcmV0dXJuIHtib29sZWFufVxuICovXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbihpbnRlZ2VyKSB7XG4gIHZhciByZSA9IC9eKD86Wy0rXT8oPzowfFsxLTldWzAtOV0qKSkkLztcbiAgcmV0dXJuIHJlLnRlc3QoaW50ZWdlcik7XG59XG4iLCIvKipcbiAqIFZhbGlkYXRlIGlmIHRoZSBzdHJpbmcgaXMgZW1wdHlcbiAqIEBwYXJhbSAge3N0cmluZ30gaW5wdXRcbiAqIEByZXR1cm4ge2Jvb2xlYW59XG4gKi9cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uKGlucHV0KSB7XG4gIHJldHVybiBpbnB1dC50cmltKCkgIT09ICcnO1xufVxuIiwiLyoqXG4gKiBWYWxpZGF0ZSB1cmxcbiAqIEBwYXJhbSAge3N0cmluZ30gdXJsIGlucHV0XG4gKiBAcmV0dXJuIHtib29sZWFufVxuICovXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbih1cmwpIHtcbiAgdmFyIHJlID0gL14oaHR0cHM/OlxcL1xcLyk/KFtcXGRhLXpcXC4tXSspXFwuKFthLXpcXC5dezIsNn0pKFtcXC9cXHcgXFwuLV0qKSpcXC8/JC87XG4gIHJldHVybiByZS50ZXN0KHVybCk7XG59XG4iLCJtb2R1bGUuZXhwb3J0cz17XG4gIFwic2Vjb25kc1wiOiA2MCxcbiAgXCJtaW51dGVzXCI6IDYwLFxuICBcImhvdXJzXCI6IDI0LFxuICBcImRheXNcIjogNyxcbiAgXCJ3ZWVrc1wiOiA0LFxuICBcIm1vbnRoc1wiOiAxMlxufVxuIiwidmFyIGNvbnZlcnRlciA9IG1vZHVsZS5leHBvcnRzID0ge1xuICBjdXRvZmY6IHJlcXVpcmUoJy4vY3V0b2ZmL2N1dG9mZi5qc29uJyksXG4gIHN1ZmZpeERpY3Rpb25hcnk6IHJlcXVpcmUoJy4vc3VmZml4L3N1ZmZpeC1kaWN0aW9uYXJ5Lmpzb24nKSxcbiAgdGltZUNhbGNzOiByZXF1aXJlKCcuL3RpbWUtY2FsY3VsYXRpb25zJylcbn1cbmNvbnZlcnRlci50aW1lQWdvID0gcmVxdWlyZSgnLi90aW1lLWFnby90aW1lLWFnby5qcycpLmJpbmQoY29udmVydGVyKVxuIiwibW9kdWxlLmV4cG9ydHM9e1xuICBcInNlY29uZHNcIjoge1xuICAgIFwic2luZ3VsYXJcIjogXCIgc2Vjb25kIGFnb1wiLFxuICAgIFwicGx1cmFsXCI6IFwiIHNlY29uZHMgYWdvXCJcbiAgfSxcbiAgXCJtaW51dGVzXCI6IHtcbiAgICBcInNpbmd1bGFyXCI6IFwiIG1pbnV0ZSBhZ29cIixcbiAgICBcInBsdXJhbFwiOiBcIiBtaW51dGVzIGFnb1wiXG4gIH0sXG4gIFwiaG91cnNcIjoge1xuICAgIFwic2luZ3VsYXJcIjogXCIgaG91ciBhZ29cIixcbiAgICBcInBsdXJhbFwiOiBcIiBob3VycyBhZ29cIlxuICB9LFxuICBcImRheXNcIjoge1xuICAgIFwic2luZ3VsYXJcIjogXCIgZGF5IGFnb1wiLFxuICAgIFwicGx1cmFsXCI6IFwiIGRheXMgYWdvXCJcbiAgfSxcbiAgXCJ3ZWVrc1wiOiB7XG4gICAgXCJzaW5ndWxhclwiOiBcIiB3ZWVrIGFnb1wiLFxuICAgIFwicGx1cmFsXCI6IFwiIHdlZWtzIGFnb1wiXG4gIH0sXG4gIFwibW9udGhzXCI6IHtcbiAgICBcInNpbmd1bGFyXCI6IFwiIG1vbnRoIGFnb1wiLFxuICAgIFwicGx1cmFsXCI6IFwiIG1vbnRocyBhZ29cIlxuICB9LFxuICBcInllYXJzXCI6IHtcbiAgICBcInNpbmd1bGFyXCI6IFwiIHllYXIgYWdvXCIsXG4gICAgXCJwbHVyYWxcIjogXCIgeWVhcnMgYWdvXCJcbiAgfVxufVxuIiwibW9kdWxlLmV4cG9ydHMgPSBUaW1lQWdvXG5cbmZ1bmN0aW9uIFRpbWVBZ28gKHBhc3RFcG9jaCwgY3VycmVudEVwb2NoKSB7XG4gIHZhciBzZWNvbmRzID0gTWF0aC5yb3VuZCh0aGlzLnRpbWVDYWxjcy5zZWNvbmRzKHBhc3RFcG9jaCwgY3VycmVudEVwb2NoKSlcbiAgdmFyIG1pbnV0ZXMgPSBNYXRoLnJvdW5kKHRoaXMudGltZUNhbGNzLm1pbnV0ZXMocGFzdEVwb2NoLCBjdXJyZW50RXBvY2gpKVxuICB2YXIgaG91cnMgPSBNYXRoLnJvdW5kKHRoaXMudGltZUNhbGNzLmhvdXJzKHBhc3RFcG9jaCwgY3VycmVudEVwb2NoKSlcbiAgdmFyIGRheXMgPSBNYXRoLnJvdW5kKHRoaXMudGltZUNhbGNzLmRheXMocGFzdEVwb2NoLCBjdXJyZW50RXBvY2gpKVxuICB2YXIgd2Vla3MgPSBNYXRoLnJvdW5kKHRoaXMudGltZUNhbGNzLndlZWtzKHBhc3RFcG9jaCwgY3VycmVudEVwb2NoKSlcbiAgdmFyIG1vbnRocyA9IE1hdGgucm91bmQodGhpcy50aW1lQ2FsY3MubW9udGhzKHBhc3RFcG9jaCwgY3VycmVudEVwb2NoKSlcbiAgdmFyIHllYXJzID0gTWF0aC5yb3VuZCh0aGlzLnRpbWVDYWxjcy55ZWFycyhwYXN0RXBvY2gsIGN1cnJlbnRFcG9jaCkpXG5cbiAgdmFyIHN1ZmZpeCA9IHRoaXMuc3VmZml4RGljdGlvbmFyeVxuICB2YXIgY3V0b2ZmID0gdGhpcy5jdXRvZmZcblxuICBpZiAoc2Vjb25kcyA8IGN1dG9mZi5zZWNvbmRzKSB7XG4gICAgcmV0dXJuIHNlY29uZHMgKyBzdWZmaXguc2Vjb25kc1tnZXRGb3JtKHNlY29uZHMpXVxuICB9IGVsc2UgaWYgKG1pbnV0ZXMgPCBjdXRvZmYubWludXRlcykge1xuICAgIHJldHVybiBtaW51dGVzICsgc3VmZml4Lm1pbnV0ZXNbZ2V0Rm9ybShtaW51dGVzKV1cbiAgfSBlbHNlIGlmIChob3VycyA8IGN1dG9mZi5ob3Vycykge1xuICAgIHJldHVybiBob3VycyArIHN1ZmZpeC5ob3Vyc1tnZXRGb3JtKGhvdXJzKV1cbiAgfSBlbHNlIGlmIChkYXlzIDwgY3V0b2ZmLmRheXMpIHtcbiAgICByZXR1cm4gZGF5cyArIHN1ZmZpeC5kYXlzW2dldEZvcm0oZGF5cyldXG4gIH0gZWxzZSBpZiAod2Vla3MgPCBjdXRvZmYud2Vla3MpIHtcbiAgICByZXR1cm4gd2Vla3MgKyBzdWZmaXgud2Vla3NbZ2V0Rm9ybSh3ZWVrcyldXG4gIH0gZWxzZSBpZiAobW9udGhzIDwgY3V0b2ZmLm1vbnRocykge1xuICAgIHJldHVybiBtb250aHMgKyBzdWZmaXgubW9udGhzW2dldEZvcm0obW9udGhzKV1cbiAgfSBlbHNlIHtcbiAgICByZXR1cm4geWVhcnMgKyBzdWZmaXgueWVhcnNbZ2V0Rm9ybSh5ZWFycyldXG4gIH1cbn1cblxuZnVuY3Rpb24gZ2V0Rm9ybSAodmFsdWUpIHtcbiAgaWYgKHZhbHVlID09PSAxKSB7XG4gICAgcmV0dXJuICdzaW5ndWxhcidcbiAgfVxuICByZXR1cm4gJ3BsdXJhbCdcbn1cbiIsIm1vZHVsZS5leHBvcnRzID0ge1xuICBzZWNvbmRzOiByZXF1aXJlKCcuL3RpbWUtYWdvL3NlY29uZHMtYWdvLmpzJyksXG4gIG1pbnV0ZXM6IHJlcXVpcmUoJy4vdGltZS1hZ28vbWludXRlcy1hZ28uanMnKSxcbiAgaG91cnM6IHJlcXVpcmUoJy4vdGltZS1hZ28vaG91cnMtYWdvLmpzJyksXG4gIGRheXM6IHJlcXVpcmUoJy4vdGltZS1hZ28vZGF5cy1hZ28uanMnKSxcbiAgd2Vla3M6IHJlcXVpcmUoJy4vdGltZS1hZ28vd2Vla3MtYWdvLmpzJyksXG4gIG1vbnRoczogcmVxdWlyZSgnLi90aW1lLWFnby9tb250aHMtYWdvLmpzJyksXG4gIHllYXJzOiByZXF1aXJlKCcuL3RpbWUtYWdvL3llYXJzLWFnby5qcycpXG59XG4iLCJtb2R1bGUuZXhwb3J0cyA9IERheXNBZ29cblxuZnVuY3Rpb24gRGF5c0FnbyAocGFzdEVwb2NoLCBjdXJyZW50RXBvY2gpIHtcbiAgdmFyIGRheXNBZ28gPSAoY3VycmVudEVwb2NoIC0gcGFzdEVwb2NoKSAvIDEwMDAgLyA2MCAvIDYwIC8gMjRcbiAgcmV0dXJuIGRheXNBZ29cbn1cbiIsIm1vZHVsZS5leHBvcnRzID0gSG91cnNBZ29cblxuZnVuY3Rpb24gSG91cnNBZ28gKHBhc3RFcG9jaCwgY3VycmVudEVwb2NoKSB7XG4gIHZhciBob3Vyc0FnbyA9IChjdXJyZW50RXBvY2ggLSBwYXN0RXBvY2gpIC8gMTAwMCAvIDYwIC8gNjBcbiAgcmV0dXJuIGhvdXJzQWdvXG59XG4iLCJtb2R1bGUuZXhwb3J0cyA9IE1pbnV0ZXNBZ29cblxuZnVuY3Rpb24gTWludXRlc0FnbyAocGFzdEVwb2NoLCBjdXJyZW50RXBvY2gpIHtcbiAgdmFyIG1pbnV0ZXNBZ28gPSAoY3VycmVudEVwb2NoIC0gcGFzdEVwb2NoKSAvIDEwMDAgLyA2MFxuICByZXR1cm4gbWludXRlc0Fnb1xufVxuIiwibW9kdWxlLmV4cG9ydHMgPSBNb250aHNBZ29cblxuZnVuY3Rpb24gTW9udGhzQWdvIChwYXN0RXBvY2gsIGN1cnJlbnRFcG9jaCkge1xuICB2YXIgbW9udGhzQWdvID0gKGN1cnJlbnRFcG9jaCAtIHBhc3RFcG9jaCkgLyAxMDAwIC8gNjAgLyA2MCAvIDI0IC8gMzFcbiAgcmV0dXJuIG1vbnRoc0Fnb1xufVxuIiwibW9kdWxlLmV4cG9ydHMgPSBTZWNvbmRzQWdvXG5cbmZ1bmN0aW9uIFNlY29uZHNBZ28gKHBhc3RFcG9jaCwgY3VycmVudEVwb2NoKSB7XG4gIHZhciBzZWNvbmRzQWdvID0gKGN1cnJlbnRFcG9jaCAtIHBhc3RFcG9jaCkgLyAxMDAwXG4gIHJldHVybiBzZWNvbmRzQWdvXG59XG4iLCJtb2R1bGUuZXhwb3J0cyA9IFdlZWtzQWdvXG5cbmZ1bmN0aW9uIFdlZWtzQWdvIChwYXN0RXBvY2gsIGN1cnJlbnRFcG9jaCkge1xuICB2YXIgd2Vla3NBZ28gPSAoY3VycmVudEVwb2NoIC0gcGFzdEVwb2NoKSAvIDEwMDAgLyA2MCAvIDYwIC8gMjQgLyA3XG4gIHJldHVybiB3ZWVrc0Fnb1xufVxuIiwibW9kdWxlLmV4cG9ydHMgPSBZZWFyc0Fnb1xuXG5mdW5jdGlvbiBZZWFyc0FnbyAocGFzdEVwb2NoLCBjdXJyZW50RXBvY2gpIHtcbiAgdmFyIHllYXJzQWdvID0gKGN1cnJlbnRFcG9jaCAtIHBhc3RFcG9jaCkgLyAxMDAwIC8gNjAgLyA2MCAvIDI0IC8gMzEgLyAxMlxuICByZXR1cm4geWVhcnNBZ29cbn1cbiIsIi8qKlxuICogSGFuZGxlIG5hdmlnYXRpb25cbiAqL1xuXG4vLyBEZXBlbmRlbmNpZXNcbmltcG9ydCBzY3JvbGxDaGFuZ2UgZnJvbSAnZHMtYXNzZXRzL3Njcm9sbC9zY3JvbGwtY2hhbmdlJztcbmltcG9ydCBkZWJvdW5jZSBmcm9tICdkcy1hc3NldHMvYXN5bmMvZGVib3VuY2UnO1xuaW1wb3J0IGdldEFsbCBmcm9tICdkcy1hc3NldHMvZG9tL2dldC1hbGwnO1xuaW1wb3J0IGdldFVzZXJEYXRhIGZyb20gJy4uL2xpYi9nZXQtbG9nZ2VkLWluLWRhdGEnO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbigpIHtcblxuICB2YXIgJG5hdiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5uYXYnKTtcbiAgaWYgKCEkbmF2KSB7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgdmFyICRib2R5ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignYm9keScpO1xuXG4gIC8vIENsb25lIG5hdmlnYXRpb24gYW5kIG1ha2UgdGhlIG5ldyBvbmUgc3RpY2t5XG4gIHZhciAkc3RpY2t5TmF2ID0gJG5hdi5jbG9uZU5vZGUodHJ1ZSk7XG4gICRzdGlja3lOYXYuY2xhc3NMaXN0LmFkZCgnbmF2LS1zdGlja3knKTtcbiAgJGJvZHkuaW5zZXJ0QmVmb3JlKCRzdGlja3lOYXYsICRib2R5LmZpcnN0Q2hpbGQpO1xuXG4gIC8vIEFjdGl2YXRlIHRoZSBzdGlja3kgbmF2aWdhdGlvbiB3aGVuIHRoZSB1c2VyIHNjcm9sbHMgdXAuXG4gIC8vIFRoaXMgd2lsbCBmaXJzIHRha2UgZWZmZWN0LCB3aGVuIHRoZSB1c2VyIGhhcyBzY3JvbGxlZCBcImEgc2NyZWVuXCIgZG93bi5cbiAgc2Nyb2xsQ2hhbmdlKGZ1bmN0aW9uKCkge1xuICAgICRzdGlja3lOYXYuY2xhc3NMaXN0LnJlbW92ZSgnbmF2LS1hY3RpdmUnKTtcbiAgfSwgZnVuY3Rpb24oKSB7XG4gICAgJHN0aWNreU5hdi5jbGFzc0xpc3QuYWRkKCduYXYtLWFjdGl2ZScpO1xuICB9LCB3aW5kb3cuaW5uZXJIZWlnaHQpO1xuXG4gIC8qKlxuICAgKiBIaWRlIHN0aWNreSBuYXZpZ2F0aW9uIHdoZW4gc2Nyb2xsZWQgdG8gdGhlIHRvcCBvZiB0aGUgZG9jdW1lbnRcbiAgICogQHJldHVybiB7dm9pZH1cbiAgICovXG4gIHZhciBvblRvcCA9IGZ1bmN0aW9uKCkge1xuICAgIHZhciBzY3JvbGxQb3MgPSB3aW5kb3cuc2Nyb2xsWSB8fCBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuc2Nyb2xsVG9wO1xuICAgIGlmIChzY3JvbGxQb3MgPD0gMCkge1xuICAgICAgJHN0aWNreU5hdi5jbGFzc0xpc3QuYWRkKCduYXYtLWhpZGRlbicpO1xuICAgICAgJHN0aWNreU5hdi5jbGFzc0xpc3QucmVtb3ZlKCduYXYtLWFjdGl2ZScpO1xuICAgIH0gZWxzZSB7XG4gICAgICAkc3RpY2t5TmF2LmNsYXNzTGlzdC5yZW1vdmUoJ25hdi0taGlkZGVuJyk7XG4gICAgfVxuICB9O1xuXG4gIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdzY3JvbGwnLCBkZWJvdW5jZShvblRvcCkpO1xuICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigncmVzaXplJywgZGVib3VuY2Uob25Ub3ApKTtcblxuICAvLyBDaGFuZ2Ugd29yZGluZyBvbiBcInNpZ24gaW5cIiBidXR0b24gd2hlbiB1c2VyIGlzIGxvZ2dlZCBpblxuICBnZXRVc2VyRGF0YSgpLnRoZW4oZnVuY3Rpb24oKSB7XG4gICAgZ2V0QWxsKCcubmF2X19pdGVtLS1zaWduLWluJykuZm9yRWFjaChmdW5jdGlvbigkc2lnbmluKSB7XG4gICAgICAkc2lnbmluLmlubmVySFRNTCA9ICdDcmVhdGUgYSBzdG9yeSc7XG4gICAgfSk7XG4gIH0pLmNhdGNoKGZ1bmN0aW9uKCkge30pO1xuXG59XG4iLCIvKipcbiAqIEhhbmRsZSByZXNwb25zZXMgYW5kIGxpa2VzIGluIHBvc3RzXG4gKi9cblxuLy8gRGVwZW5kZW5jaWVzXG5pbXBvcnQgZ2V0QWxsIGZyb20gJ2RzLWFzc2V0cy9kb20vZ2V0LWFsbCc7XG5pbXBvcnQgbGF6eUltYWdlcyBmcm9tICdkcy1hc3NldHMvbGF6eS9pbWFnZXMnO1xuaW1wb3J0ICogYXMgYXBpIGZyb20gJy4uL2xpYi9hcGknO1xuaW1wb3J0IGdldFVzZXJEYXRhIGZyb20gJy4uL2xpYi9nZXQtbG9nZ2VkLWluLWRhdGEnO1xuaW1wb3J0IHVzZXJNZXRhVGVtcGxhdGUgZnJvbSAnLi4vdGVtcGxhdGVzL3Jlc3BvbnNlLW1ldGEnO1xuaW1wb3J0IHJlc3BvbnNlVGVtcGxhdGUgZnJvbSAnLi4vdGVtcGxhdGVzL3Jlc3BvbnNlJztcbmltcG9ydCBvZmZzZXRUb3AgZnJvbSAnZHMtYXNzZXRzL2RvbS9nZXQtZG9jdW1lbnQtb2Zmc2V0LXRvcCc7XG5pbXBvcnQgbGl2ZVZhbGlkYXRpb24gZnJvbSAnLi4vbGliL2Zvcm0vbGl2ZS12YWxpZGF0aW9uJztcbmltcG9ydCB2YWxpZGF0ZUZvcm0gZnJvbSAnLi4vbGliL2Zvcm0vdmFsaWRhdGUnO1xuXG4vLyBDYWNoZWQgZG9tIGVsZW1lbnRzXG52YXIgJHJlc3BvbnNlRm9ybTtcbnZhciAkY3RhO1xudmFyICR2YWxpZGF0b3JzO1xudmFyICRyZXNwb25zZXNMaXN0O1xudmFyIHJlbmRlclJlc3BvbnNlcztcbnZhciBhZGREZWxldGVFdmVudHM7XG52YXIgc2V0UmVzcG9uc2VzTnVtYmVyO1xudmFyIGFkZFJlYWRNb3JlRXZlbnQ7XG5cbnZhciB1cGRhdGVSZXNwb25zZUNUQSA9IGZ1bmN0aW9uKHZhbGlkKSB7XG5cdGlmICh2YWxpZCkge1xuXHRcdCRjdGEuY2xhc3NMaXN0LnJlbW92ZSgnYnRuLS1kaXNhYmxlZCcpO1xuXHR9IGVsc2Uge1xuXHRcdCRjdGEuY2xhc3NMaXN0LmFkZCgnYnRuLS1kaXNhYmxlZCcpO1xuXHR9XG59O1xuXG4vKipcbiAqIERlbGV0ZSByZXNwb25zZSB3aGVuIGRlbGV0ZSBpY29uIGNsaWNrZWRcbiAqL1xuYWRkRGVsZXRlRXZlbnRzID0gZnVuY3Rpb24oKSB7XG5cdGdldEFsbCgnLnJlc3BvbnNlX19kZWxldGUnKS5mb3JFYWNoKGZ1bmN0aW9uKCRkZWxldGUpIHtcblx0XHQkZGVsZXRlLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24oZSkge1xuXHRcdFx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xuXHRcdFx0YXBpLnJlbW92ZVJlc3BvbnNlKCRkZWxldGUuZGF0YXNldC5wdWJsaXNoZWQsICRkZWxldGUuZGF0YXNldC5uYW1lKVxuXHRcdFx0XHQudGhlbihmdW5jdGlvbihkYXRhKSB7XG5cdFx0XHRcdFx0cmVuZGVyUmVzcG9uc2VzKGRhdGEucmVzcG9uc2VzKTtcblx0XHRcdFx0XHRzZXRSZXNwb25zZXNOdW1iZXIoZGF0YS5yZXNwb25zZXMpO1xuXHRcdFx0XHR9KTtcblx0XHR9KTtcblx0fSk7XG59O1xuXG4vKipcbiAqIEV4cGFuZCByZXNwb25zZSB3aXRoIGZ1bGwgdGV4dCB3aGVuIHJlYWQgbW9yZSBidXR0b24gaXMgYWN0aXZhdGVkLlxuICogQmFzaWNhbGx5IGl0IGhpZGVzIHRoZSBleGNlcnB0IGFuZCB0aGUgcmVhZCBtb3JlIGJ1dHRvbiBhbmQgZGlzcGxheXMgdGhlXG4gKiBmdWxsIHRleHQuXG4gKiBAcGFyYW0ge2VsZW1lbnR9ICRyZXNwb25zZVxuICovXG5hZGRSZWFkTW9yZUV2ZW50ID0gZnVuY3Rpb24oJHJlc3BvbnNlKSB7XG5cdHZhciAkcmVhZE1vcmUgPSAkcmVzcG9uc2UucXVlcnlTZWxlY3RvcignLnJlc3BvbnNlX19yZWFkLW1vcmUnKTtcblx0aWYgKCEkcmVhZE1vcmUpIHtcblx0XHRyZXR1cm47XG5cdH1cblx0JHJlYWRNb3JlLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24oZSkge1xuXHRcdGUucHJldmVudERlZmF1bHQoKTtcblx0XHR2YXIgJGV4Y2VycHQgPSAkcmVzcG9uc2UucXVlcnlTZWxlY3RvcignLnJlc3BvbnNlX19leGNlcnB0Jyk7XG5cdFx0dmFyICRyZWFkTW9yZUNvbnRhaW5lciA9ICRyZWFkTW9yZS5wYXJlbnROb2RlO1xuXG5cdFx0JHJlYWRNb3JlQ29udGFpbmVyLnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQoJHJlYWRNb3JlQ29udGFpbmVyKTtcblx0XHQkZXhjZXJwdC5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKCRleGNlcnB0KTtcblxuXHRcdCRyZXNwb25zZS5xdWVyeVNlbGVjdG9yKCcucmVzcG9uc2VfX3RleHQnKS5jbGFzc0xpc3QucmVtb3ZlKCdoaWRkZW4nKTtcblx0fSk7XG59O1xuXG4vKipcbiAqIFJlbmRlciB0ZW1wbGF0ZXMgZm9yIHJlc3BvbnNlcyBhbmQgaW5zZXJ0IGh0bWwgaW4gdGhlIHJlc3BvbnNlcyBsaXN0LlxuICogLSBMYXp5IGxvYWQgaW1hZ2VzIGluIHJlc3BvbnNlc1xuICogLSBBdHRhY2ggbmV3IGV2ZW50cyBpbiByZXNwb25zZXNcbiAqIEBwYXJhbSAge2FycmF5fSByZXNwb25zZXNcbiAqIEByZXR1cm4ge3ZvaWR9XG4gKi9cbnJlbmRlclJlc3BvbnNlcyA9IGZ1bmN0aW9uKHJlc3BvbnNlcykge1xuXHR2YXIgaHRtbCA9ICcnO1xuXHRyZXNwb25zZXMuZm9yRWFjaChmdW5jdGlvbihyZXNwb25zZSkge1xuXHRcdGh0bWwgKz0gcmVzcG9uc2VUZW1wbGF0ZShyZXNwb25zZSk7XG5cdH0pO1xuXHQkcmVzcG9uc2VzTGlzdC5pbm5lckhUTUwgPSBodG1sO1xuXHRsYXp5SW1hZ2VzKDEpO1xuXHRhZGREZWxldGVFdmVudHMoKTtcblx0Z2V0QWxsKCcucmVzcG9uc2UnLCAkcmVzcG9uc2VzTGlzdCkuZm9yRWFjaChhZGRSZWFkTW9yZUV2ZW50KTtcbn07XG5cbi8qKlxuICogVXBkYXRlIHRoZSBjb3VudCBvZiByZXNwb25zZXNcbiAqIEBwYXJhbSB7YXJyYXl9IHJlc3BvbnNlc1xuICovXG5zZXRSZXNwb25zZXNOdW1iZXIgPSBmdW5jdGlvbihyZXNwb25zZXMpIHtcblx0ZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnNoYXJlX19yZXNwb25zZXMnKS5pbm5lckhUTUwgPSByZXNwb25zZXMubGVuZ3RoO1xufTtcblxuLyoqXG4gKiBVcGRhdGUgdGhlIGNvdW50IGZvIGxpa2VzIGZvciB0aGlzIHBvc3RcbiAqIEBwYXJhbSB7bnVtYmVyfSBsaWtlc1xuICovXG52YXIgc2V0TGlrZXNOdW1iZXIgPSBmdW5jdGlvbihsaWtlcykge1xuXHRkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuc2hhcmVfX2xpa2VzJykuaW5uZXJIVE1MID0gbGlrZXM7XG59O1xuXG4vKipcbiAqIEdldCBkYXRhIGZyb20gYXBpIHdpdGggbWV0YSBkYXRhOiByZXNwb25zZXMgYW5kIGxpa2VzLlxuICogUmVuZGVyIHRoaXMgaW4gdGhlIGRvbS5cbiAqIEByZXR1cm4ge3ZvaWR9XG4gKi9cbnZhciByZW5kZXJNZXRhID0gZnVuY3Rpb24oKSB7XG5cdGFwaS5nZXRNZXRhKCkudGhlbihmdW5jdGlvbihkYXRhKSB7XG5cdFx0cmVuZGVyUmVzcG9uc2VzKGRhdGEucmVzcG9uc2VzKTtcblx0XHRzZXRSZXNwb25zZXNOdW1iZXIoZGF0YS5yZXNwb25zZXMpO1xuXHRcdHNldExpa2VzTnVtYmVyKGRhdGEubGlrZXMpO1xuXHR9KTtcbn07XG5cbi8qKlxuICogUG9zdCBuZXcgcmVzcG9uc2UgdG8gcG9zdFxuICogLSBjaGVja3MgZm9yIHZhbGlkYXRpb24gYmVmb3JlIHBvc3RpbmdcbiAqIEBwYXJhbSAge2V2ZW50fSBlXG4gKiBAcmV0dXJuIHt2b2lkfVxuICovXG52YXIgc3VibWl0UmVzcG9uc2UgPSBmdW5jdGlvbihlKSB7XG5cdGUucHJldmVudERlZmF1bHQoKTtcblxuXHR2YXIgbG9nZ2VkSW4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdib2R5JykuY2xhc3NMaXN0LmNvbnRhaW5zKCd1c2VyLWxvZ2dlZC1pbicpO1xuXG5cdC8vIElmIGEgZmllbGQgaXMgbm90IHZhbGlkIHRoaXMgZmllbGQgd2lsbCBnZXQgZm9jdXMsIHNvIHRoZSB1c2VyIHF1aWNrbHkgY2FuIHVwZGF0ZSB0aGUgdmFsdWUuXG5cdHZhciBub3RWYWxpZCA9ICR2YWxpZGF0b3JzLnNvbWUoZnVuY3Rpb24oJHZhbGlkYXRvcikge1xuXHRcdGlmICgkdmFsaWRhdG9yLmNsYXNzTGlzdC5jb250YWlucygndmFsaWRhdGUtLW5vdC12YWxpZCcpKSB7XG5cdFx0XHR2YXIgJHZhbGlkYXRlRmllbGQgPSAkdmFsaWRhdG9yLnF1ZXJ5U2VsZWN0b3IoJ2lucHV0LCB0ZXh0YXJlYScpO1xuXHRcdFx0JHZhbGlkYXRlRmllbGQuZm9jdXMoKTtcblx0XHRcdHJldHVybiB0cnVlO1xuXHRcdH1cblx0fSk7XG5cblx0aWYgKG5vdFZhbGlkKSB7XG5cdFx0cmV0dXJuO1xuXHR9XG5cblx0Ly8gQ3JlYXRlIGEgcmVzcG9uc2Ugb2JqZWN0IGJhc2VkIG9uIHZhbHVlcyBpbiBmb3JtXG5cdHZhciByZXNwb25zZSA9IHt9O1xuXHRnZXRBbGwoJ2lucHV0LCB0ZXh0YXJlYScsICRyZXNwb25zZUZvcm0pLmZvckVhY2goZnVuY3Rpb24oJGZpZWxkKSB7XG5cdFx0dmFyIG5hbWUgPSAkZmllbGQuZ2V0QXR0cmlidXRlKCduYW1lJyk7XG5cdFx0aWYgKCRmaWVsZC52YWx1ZSkge1xuXHRcdFx0cmVzcG9uc2VbbmFtZV0gPSAkZmllbGQudmFsdWU7XG5cdFx0fVxuXHR9KTtcblxuXHQkY3RhLmlubmVySFRNTCA9ICdQb3N0aW5nLi4uJztcblx0JGN0YS5jbGFzc0xpc3QuYWRkKCdidG4tLWRpc2FibGVkJyk7XG5cdGFwaS5hZGRSZXNwb25zZShyZXNwb25zZSkudGhlbihmdW5jdGlvbihkYXRhKSB7XG5cdFx0cmVuZGVyUmVzcG9uc2VzKGRhdGEucmVzcG9uc2VzKTtcblx0XHRzZXRSZXNwb25zZXNOdW1iZXIoZGF0YS5yZXNwb25zZXMpO1xuXG5cdFx0Ly8gU2Nyb2xsIHRvIG5ldyByZXNwb25zZVxuXHRcdHZhciAkbGFzdFJlc3BvbnNlID0gJHJlc3BvbnNlc0xpc3QucXVlcnlTZWxlY3RvcignLnJlc3BvbnNlOmxhc3QtY2hpbGQnKTtcblx0XHR2YXIgb2Zmc2V0ID0gb2Zmc2V0VG9wKCRsYXN0UmVzcG9uc2UpO1xuXHRcdHdpbmRvdy5zY3JvbGxUbygwLCBvZmZzZXQgLSAoMC41ICogd2luZG93LmlubmVySGVpZ2h0KSk7XG5cblx0XHQvLyBSZXNldCBmb3JtXG5cdFx0JGN0YS5pbm5lckhUTUwgPSAnUmVzcG9uZCc7XG5cdFx0aWYgKGxvZ2dlZEluKSB7XG5cdFx0XHR2YXIgJHRleHQgPSAkcmVzcG9uc2VGb3JtLnF1ZXJ5U2VsZWN0b3IoJy5yZXNwb25zZXMtZm9ybV9fdGV4dCcpO1xuXHRcdFx0JHRleHQuY2xhc3NMaXN0LmFkZCgndmFsaWRhdGUtLW5vdC12YWxpZCcpO1xuXHRcdFx0JHRleHQuY2xhc3NMaXN0LnJlbW92ZSgndmFsaWRhdGUtLXZhbGlkJyk7XG5cdFx0XHQkdGV4dC5xdWVyeVNlbGVjdG9yKCd0ZXh0YXJlYScpLnZhbHVlID0gJyc7XG5cdFx0fSBlbHNlIHtcblx0XHRcdCR2YWxpZGF0b3JzLmZvckVhY2goZnVuY3Rpb24oJHZhbGlkYXRvcikge1xuXHRcdFx0XHRpZiAoJHZhbGlkYXRvci5kYXRhc2V0LnZhbGlkYXRlUmVxdWlyZWQgIT09IHVuZGVmaW5lZCkge1xuXHRcdFx0XHRcdCR2YWxpZGF0b3IuY2xhc3NMaXN0LmFkZCgndmFsaWRhdGUtLW5vdC12YWxpZCcpO1xuXHRcdFx0XHRcdCR2YWxpZGF0b3IuY2xhc3NMaXN0LnJlbW92ZSgndmFsaWRhdGUtLXZhbGlkJyk7XG5cdFx0XHRcdH1cblx0XHRcdFx0JHZhbGlkYXRvci5xdWVyeVNlbGVjdG9yKCdpbnB1dCwgdGV4dGFyZWEnKS52YWx1ZSA9ICcnO1xuXHRcdFx0fSk7XG5cdFx0fVxuXHR9KTtcblxufTtcblxuLyoqXG4gKiBVcGRhdGUgaGVhcnQgKGxpa2UpIGljb25zIHRvIGluZGljYXRlLCB0aGF0IHRoZSB1c2VyIGhhdmUgbGlrZWQgdGhlIGFydGljbGVcbiAqIEByZXR1cm4ge3ZvaWR9XG4gKi9cbnZhciBsaWtlZCA9IGZ1bmN0aW9uKCkge1xuXHR2YXIgJHRvb2xUaXBJY29uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnRvb2wtdGlwX19saWtlLWljb24nKTtcblx0JHRvb2xUaXBJY29uLnNldEF0dHJpYnV0ZSgnc3JjJywgJy9hc3NldHMvaW1hZ2VzL2hlYXJ0LS1pbnZlcnNlLS1hY3RpdmUuc3ZnJyk7XG5cdCR0b29sVGlwSWNvbi5zZXRBdHRyaWJ1dGUoJ2RhdGEtc3JjJywgJy9hc3NldHMvaW1hZ2VzL2hlYXJ0LS1pbnZlcnNlLS1hY3RpdmUuc3ZnJyk7XG5cblx0dmFyICRmb290ZXJJY29uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnBvc3QtZm9vdGVyX19saWtlLWljb24nKTtcblx0JGZvb3Rlckljb24uc2V0QXR0cmlidXRlKCdzcmMnLCAnL2Fzc2V0cy9pbWFnZXMvaGVhcnQtLWFjdGl2ZS5zdmcnKTtcblx0JGZvb3Rlckljb24uc2V0QXR0cmlidXRlKCdkYXRhLXNyYycsICcvYXNzZXRzL2ltYWdlcy9oZWFydC0tYWN0aXZlLnN2ZycpO1xuXG5cdC8vIEluZGljYXRlcywgdGhhdCB0aGUgbGlrZSBidXR0b24gbm8gbG9uZ2VyIGlzIGNsaWNrYWJsZVxuXHRnZXRBbGwoJy5zaGFyZV9fbGlrZScpLmZvckVhY2goJGxpa2UgPT4gJGxpa2UuY2xhc3NMaXN0LmFkZCgnZGlzYWJsZWQnKSk7XG59O1xuXG4vKipcbiAqIEFjdGl2YXRlIGxpa2UsIHdoZW4gbGlrZSBidXR0b25zIGFyZSBjbGlja2VkXG4gKiBAcGFyYW0gIHtlbGVtZW50fSAkYW5jaG9yXG4gKiBAcmV0dXJuIHt2b2lkfVxuICovXG52YXIgYXR0YWNoTGlrZUV2ZW50ID0gZnVuY3Rpb24oJGFuY2hvcikge1xuXHQkYW5jaG9yLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24oZSkge1xuXHRcdGUucHJldmVudERlZmF1bHQoKTtcblxuXHRcdC8vIEFscmVhZHkgbGlrZWQgdGhpcyBhcnRpY2xlXG5cdFx0aWYgKGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdsaWtlOicgKyB3aW5kb3cucG9zdElkKSkge1xuXHRcdFx0cmV0dXJuO1xuXHRcdH1cblxuXHRcdGxvY2FsU3RvcmFnZS5zZXRJdGVtKCdsaWtlOicgKyB3aW5kb3cucG9zdElkLCB0cnVlKTtcblx0XHRsaWtlZCgpO1xuXG5cdFx0YXBpLmxpa2UoKS50aGVuKGZ1bmN0aW9uKGRhdGEpIHtcblx0XHRcdHNldExpa2VzTnVtYmVyKGRhdGEubGlrZXMpO1xuXHRcdH0pO1xuXHR9KTtcbn07XG5cbi8qKlxuICogVXBkYXRlIHJlc3BvbnNlcyBmb3JtIGlmIHVzZXIgaXMgbG9nZ2VkIGluLlxuICogVXNlciBkbyBub3QgbmVlZCB0byBmaWxsIGUtbWFpbCwgbmFtZSBldGMuXG4gKiBAcGFyYW0gIHtvYmplY3R9IGRhdGFcbiAqIEByZXR1cm4ge3ZvaWR9XG4gKi9cbnZhciByZW5kZXJVc2VyRm9ybSA9IGZ1bmN0aW9uKHVzZXIpIHtcblx0dmFyIGh0bWwgPSB1c2VyTWV0YVRlbXBsYXRlKHVzZXIpO1xuXHR2YXIgJG1ldGEgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcblx0JG1ldGEuaW5uZXJIVE1MID0gaHRtbDtcblx0dmFyICRoZWFkZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucmVzcG9uc2VzX19mb3JtIGgzJyk7XG5cblx0Ly8gRmlsbCBpbnB1dCBmaWVsZHMgd2l0aCByZWxldmFudCBkYXRhXG5cdGdldEFsbCgnLnJlc3BvbnNlc19fZm9ybSBpbnB1dCcpLmZvckVhY2goZnVuY3Rpb24oJGlucHV0KSB7XG5cdFx0dmFyIG5hbWUgPSAkaW5wdXQuZ2V0QXR0cmlidXRlKCduYW1lJyk7XG5cdFx0aWYgKG5hbWUgPT09ICd3ZWJzaXRlJykge1xuXHRcdFx0JGlucHV0LnZhbHVlID0gJy9hdXRob3IvJyArIHVzZXIuc2x1Zztcblx0XHR9IGVsc2Uge1xuXHRcdFx0JGlucHV0LnZhbHVlID0gdXNlcltuYW1lXTtcblx0XHR9XG5cdFx0JGlucHV0LnBhcmVudE5vZGUuY2xhc3NMaXN0LmFkZCgndmFsaWRhdGUtLXZhbGlkJyk7XG5cdFx0JGlucHV0LnBhcmVudE5vZGUuY2xhc3NMaXN0LnJlbW92ZSgndmFsaWRhdGUtLW5vdC12YWxpZCcpO1xuXHR9KTtcblxuXHQvLyBJbnNlcnQgYWZ0ZXIgaGVhZGVyXG5cdCRoZWFkZXIucGFyZW50Tm9kZS5pbnNlcnRCZWZvcmUoJG1ldGEsICRoZWFkZXIubmV4dFNpYmxpbmcpO1xuXHRsYXp5SW1hZ2VzKDEpO1xuXHR2YWxpZGF0ZUZvcm0oJHZhbGlkYXRvcnMsIHVwZGF0ZVJlc3BvbnNlQ1RBKTtcbn07XG5cbi8qKlxuICogSW5pdCByZXNwb25zZXNcbiAqIEByZXR1cm4ge3ZvaWR9XG4gKi9cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uKCkge1xuXHQkcmVzcG9uc2VGb3JtID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnJlc3BvbnNlc19fZm9ybScpO1xuXG5cdGlmICghJHJlc3BvbnNlRm9ybSkge1xuXHRcdHJldHVybjtcblx0fVxuXG5cdC8vIENhY2hlIGRvbSBlbGVtZW50c1xuXHQkY3RhID0gJHJlc3BvbnNlRm9ybS5xdWVyeVNlbGVjdG9yKCcuYnRuLS1jdGEnKTtcblx0JHJlc3BvbnNlc0xpc3QgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucmVzcG9uc2VzX19saXN0Jyk7XG5cdCR2YWxpZGF0b3JzID0gZ2V0QWxsKCcudmFsaWRhdGUnLCAkcmVzcG9uc2VGb3JtKTtcblxuXHQvLyBVcGRhdGUgZnJvbSBhcyB1c2VyIHR5cGVzXG5cdGxpdmVWYWxpZGF0aW9uKCR2YWxpZGF0b3JzLCB1cGRhdGVSZXNwb25zZUNUQSk7XG5cblx0Ly8gUmVuZGVyIHJlc3BvbnNlcyBhbmQgbGlrZVxuXHRyZW5kZXJNZXRhKCk7XG5cblx0Ly8gQ2hhbmdlIGZvcm0gaWYgdXNlciBpcyBsb2dnZWQgaW5cblx0Z2V0VXNlckRhdGEoKS50aGVuKHJlbmRlclVzZXJGb3JtKS5jYXRjaChmdW5jdGlvbigpIHt9KTtcblxuXHQvLyBVc2VyIGFscmVhZHkgbGlrZXMgdGhpcyBhcnRpY2xlXG5cdGlmIChsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnbGlrZTonICsgd2luZG93LnBvc3RJZCkpIHtcblx0XHRsaWtlZCgpO1xuXHR9XG5cblx0Z2V0QWxsKCcuc2hhcmVfX2xpa2UnKS5mb3JFYWNoKGF0dGFjaExpa2VFdmVudCk7XG5cdCRjdGEuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBzdWJtaXRSZXNwb25zZSk7XG5cblx0Ly8gU2hvdyBtYXJrZG93biBoZWxwZXJzXG5cdGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5yZXNwb25zZS1mb3JtX19tYXJrZG93bi1leHBhbmRlcicpLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24oZSkge1xuXHRcdGUucHJldmVudERlZmF1bHQoKTtcblx0XHRkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucmVzcG9uc2UtZm9ybV9fbWFya2Rvd24taGVscGVycycpLmNsYXNzTGlzdC5yZW1vdmUoJ2hpZGRlbicpO1xuXHR9KTtcblxufVxuIiwiaW1wb3J0IGxhenlJbWFnZXMgZnJvbSAnZHMtYXNzZXRzL2xhenkvaW1hZ2VzJztcbmltcG9ydCBnZXRBbGwgZnJvbSAnZHMtYXNzZXRzL2RvbS9nZXQtYWxsJztcbmltcG9ydCAqIGFzIGFwaSBmcm9tICcuLi9saWIvYXBpJztcbmltcG9ydCBwb3N0VGVtcGxhdGUgZnJvbSAnLi4vdGVtcGxhdGVzL3Bvc3QnO1xuaW1wb3J0IGF1dGhvclRlbXBsYXRlIGZyb20gJy4uL3RlbXBsYXRlcy9hdXRob3InO1xuaW1wb3J0IHRhZ1RlbXBsYXRlIGZyb20gJy4uL3RlbXBsYXRlcy90YWcnO1xuXG5jb25zdCBNQVhfUkVTVUxUUyA9IDEwO1xuXG52YXIgJHNlYXJjaElucHV0O1xudmFyICRzZWFyY2hMaXN0O1xudmFyIGxhdGVzdENvdW50ZXIgPSAwO1xuXG52YXIgZ2V0U2VhcmNoUmVzdWx0ID0gZnVuY3Rpb24ocGF0aCkge1xuXHR2YXIgYWJzb2x1dGUgPSB3aW5kb3cuZ2hvc3QudXJsLmFwaShwYXRoLCB7XG5cdFx0aW5jbHVkZTogJ3RhZ3MsYXV0aG9yLGNvdW50LnBvc3RzJ1xuXHR9KTtcblx0dmFyIHJlbGF0aXZlID0gYWJzb2x1dGUuc3Vic3RyKGFic29sdXRlLmluZGV4T2YoJy9naG9zdCcpLCBhYnNvbHV0ZS5sZW5ndGgpO1xuXHRyZXR1cm4gZmV0Y2gocmVsYXRpdmUpXG5cdFx0LnRoZW4oZnVuY3Rpb24ocmVzcG9uc2UpIHtcblx0XHRcdGlmIChyZXNwb25zZS5zdGF0dXMgPj0gMzAwKSB7XG5cdFx0XHRcdHJldHVybiBQcm9taXNlLnJlamVjdChyZXNwb25zZSk7XG5cdFx0XHR9XG5cdFx0XHRyZXR1cm4gcmVzcG9uc2U7XG5cdFx0fSlcblx0XHQudGhlbihyZXNwb25zZSA9PiByZXNwb25zZS5qc29uKCkpO1xufTtcblxudmFyIHJlbmRlclJlc3VsdHMgPSBmdW5jdGlvbihyZXN1bHRzKSB7XG5cdHZhciBodG1sID0gcmVzdWx0cy5tYXAoZnVuY3Rpb24ocmVzdWx0KSB7XG5cdFx0aWYgKHJlc3VsdC5wb3N0cykge1xuXHRcdFx0cmV0dXJuIHBvc3RUZW1wbGF0ZShyZXN1bHQucG9zdHNbMF0pO1xuXHRcdH1cblx0XHRpZiAocmVzdWx0LnVzZXJzKSB7XG5cdFx0XHRyZXR1cm4gYXV0aG9yVGVtcGxhdGUocmVzdWx0LnVzZXJzWzBdKTtcblx0XHR9XG5cdFx0aWYgKHJlc3VsdC50YWdzKSB7XG5cdFx0XHRyZXR1cm4gdGFnVGVtcGxhdGUocmVzdWx0LnRhZ3NbMF0pO1xuXHRcdH1cblx0XHRyZXR1cm4gJyc7XG5cdH0pLmpvaW4oJycpO1xuXHQkc2VhcmNoTGlzdC5pbm5lckhUTUwgPSBodG1sO1xuXHRsYXp5SW1hZ2VzKDEpO1xuXHRnZXRBbGwoJy5ib3hlc19faXRlbScsICRzZWFyY2hMaXN0KS5mb3JFYWNoKGZ1bmN0aW9uKCRib3hJdGVtLCBpKSB7XG5cdFx0c2V0VGltZW91dChmdW5jdGlvbigpIHtcblx0XHRcdCRib3hJdGVtLmNsYXNzTGlzdC5yZW1vdmUoJ2hpZGRlbicpO1xuXHRcdFx0c2V0VGltZW91dCgoKSA9PiAkYm94SXRlbS5jbGFzc0xpc3QuYWRkKCdhbmltYXRlLS1hY3RpdmUnKSwgMCk7XG5cdFx0fSwgaSAqIDUwMCk7XG5cdH0pO1xufTtcblxudmFyIHNlYXJjaCA9IGZ1bmN0aW9uKHF1ZXJ5KSB7XG5cblx0dmFyIGlkID0gKytsYXRlc3RDb3VudGVyO1xuXHR2YXIgbWluVGltZSA9IERhdGUubm93KCkgKyAzMDA7XG5cblx0JHNlYXJjaExpc3QuaW5uZXJIVE1MID0gJyc7XG5cblx0dmFyIGlzTGF0ZXN0ID0gZnVuY3Rpb24oZGF0YSkge1xuXHRcdGlmIChpZCAhPT0gbGF0ZXN0Q291bnRlcikge1xuXHRcdFx0cmV0dXJuIFByb21pc2UucmVqZWN0KCk7XG5cdFx0fVxuXHRcdHJldHVybiBkYXRhO1xuXHR9O1xuXG5cdGFwaS5nZXRTZWFyY2hJbmRleChxdWVyeSlcblx0XHQudGhlbihpc0xhdGVzdClcblx0XHQudGhlbihmdW5jdGlvbihpbmRleGVzKSB7XG5cdFx0XHR2YXIgcHJvbWlzZXMgPSBpbmRleGVzLnNsaWNlKDAsIE1BWF9SRVNVTFRTKS5tYXAoZnVuY3Rpb24oaW5kZXgpIHtcblx0XHRcdFx0cmV0dXJuIGdldFNlYXJjaFJlc3VsdChpbmRleC5yZWYpO1xuXHRcdFx0fSk7XG5cdFx0XHRyZXR1cm4gUHJvbWlzZS5hbGwocHJvbWlzZXMpO1xuXHRcdH0pXG5cdFx0LnRoZW4oZnVuY3Rpb24oZGF0YSkge1xuXHRcdFx0aWYgKG1pblRpbWUgPCBEYXRlLm5vdygpKSB7XG5cdFx0XHRcdHJldHVybiBkYXRhO1xuXHRcdFx0fVxuXHRcdFx0cmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uKHJlc29sdmUpIHtcblx0XHRcdFx0c2V0VGltZW91dCgoKSA9PiByZXNvbHZlKGRhdGEpLCBtaW5UaW1lIC0gRGF0ZS5ub3coKSk7XG5cdFx0XHR9KTtcblx0XHR9KVxuXHRcdC50aGVuKGlzTGF0ZXN0KVxuXHRcdC50aGVuKHJlbmRlclJlc3VsdHMpXG5cdFx0LmNhdGNoKGZ1bmN0aW9uKGVycikge1xuXHRcdFx0aWYgKGVycikge1xuXHRcdFx0XHRjb25zb2xlLmVycm9yKGVycik7XG5cdFx0XHR9XG5cdFx0fSk7XG59O1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbigpIHtcblxuXHQkc2VhcmNoSW5wdXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuc2VhcmNoX19pbnB1dCcpO1xuXHQkc2VhcmNoTGlzdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5zZWFyY2hfX2xpc3QnKTtcblxuXHRpZiAoISRzZWFyY2hJbnB1dCB8fCAhJHNlYXJjaExpc3QpIHtcblx0XHRyZXR1cm47XG5cdH1cblx0JHNlYXJjaElucHV0LmFkZEV2ZW50TGlzdGVuZXIoJ2lucHV0JywgZnVuY3Rpb24oKSB7XG5cdFx0c2VhcmNoKCRzZWFyY2hJbnB1dC52YWx1ZSk7XG5cdH0pO1xuXG5cdCRzZWFyY2hJbnB1dC5mb2N1cygpO1xuXG5cdCRzZWFyY2hMaXN0LnNldEF0dHJpYnV0ZSgnc3R5bGUnLCBgbWluLWhlaWdodDogJHt3aW5kb3cuaW5uZXJIZWlnaHR9cHhgKTtcblxufVxuIiwiLyoqXG4gKiBUb29sIHRpcCBzaG93ZWQgd2hlbiB1c2VyIG1hcmtzIHRleHQgaW4gYXJ0aWNsZS5cbiAqIFRoaXMgbWFrZXMgdGhlIHVzZSBhYmxlIHRvIHNoYXJlL2NvbW1lbnQgb24gdGhlIG1hcmtlZC5cbiAqL1xuXG4vLyBDYWNoZWQgZG9tIGVsZW1lbnRzXG52YXIgJHBvc3RDb250ZW50O1xudmFyICR0b29sVGlwO1xudmFyICR0d2l0dGVyO1xuXG4vKipcbiAqIEdldCB0aGUgdGV4dCBzZWxlY3RlZCBieSB0aGUgdXNlclxuICogQHJldHVybiB7c3RyaW5nfVxuICovXG52YXIgZ2V0U2VsZWN0ZWRUZXh0ID0gZnVuY3Rpb24oKSB7XG5cdHZhciB0ZXh0ID0gJyc7XG5cdGlmICh0eXBlb2Ygd2luZG93LmdldFNlbGVjdGlvbiAhPT0gJ3VuZGVmaW5lZCcpIHtcblx0XHR0ZXh0ID0gd2luZG93LmdldFNlbGVjdGlvbigpLnRvU3RyaW5nKCk7XG5cdH0gZWxzZSBpZiAodHlwZW9mIGRvY3VtZW50LnNlbGVjdGlvbiAhPT0gJ3VuZGVmaW5lZCcgJiYgZG9jdW1lbnQuc2VsZWN0aW9uLnR5cGUgPT09ICdUZXh0Jykge1xuXHRcdHRleHQgPSBkb2N1bWVudC5zZWxlY3Rpb24uY3JlYXRlUmFuZ2UoKS50ZXh0O1xuXHR9XG5cdHJldHVybiB0ZXh0O1xufTtcblxuLyoqXG4gKiBDaGVjayBpZiB0aGUgc2VsZWN0ZWQgdGV4dCBpcyBpbnNpZGUgdGhlIGNvbnRlbnQgY29udGFpbmVyXG4gKiBAcGFyYW0gIHtvYmplY3R9ICBzZWxlY3Rpb25cbiAqIEByZXR1cm4ge0Jvb2xlYW59XG4gKi9cbnZhciBpc0luc2lkZUNvbnRlbnQgPSBmdW5jdGlvbihzZWxlY3Rpb24pIHtcblx0dmFyICRjb250YWluZXIgPSBzZWxlY3Rpb24uYW5jaG9yTm9kZS5wYXJlbnRFbGVtZW50O1xuXG5cdHdoaWxlICgkY29udGFpbmVyICE9PSAkcG9zdENvbnRlbnQgJiYgJGNvbnRhaW5lci5wYXJlbnROb2RlKSB7XG5cdFx0JGNvbnRhaW5lciA9ICRjb250YWluZXIucGFyZW50Tm9kZTtcblx0fVxuXG5cdHJldHVybiAoJGNvbnRhaW5lciA9PT0gJHBvc3RDb250ZW50KTtcblxufTtcblxuLyoqXG4gKiBQbGFjZXMgdGhlIHRvb2wgdGlwIGFib3ZlIHRoZSBzZWxlY3RlZCB0ZXh0XG4gKiBAcmV0dXJuIHt2b2lkfVxuICovXG52YXIgcGxhY2VUb29sVGlwID0gZnVuY3Rpb24oKSB7XG5cblx0Ly8gVGltZW91dCB0byBtYWtlIHN1cmUgdGhlIHRleHQgaGFzIGJlZW4gc2VsZWN0ZWRcblx0c2V0VGltZW91dChmdW5jdGlvbigpIHtcblxuXHRcdHZhciBoaWdobGlnaHRlZFRleHQgPSBnZXRTZWxlY3RlZFRleHQoKTtcblxuXHRcdC8vIEhpZGUgdG9vbCB0aXAgaWYgbm90aGluZyBpcyBzZWxlY3RlZFxuXHRcdGlmICghaGlnaGxpZ2h0ZWRUZXh0KSB7XG5cdFx0XHQkdG9vbFRpcC5jbGFzc0xpc3QucmVtb3ZlKCd0b29sLXRpcC0tdmlzaWJsZScpO1xuXHRcdFx0cmV0dXJuO1xuXHRcdH1cblxuXHRcdC8vIERpc3BsYXkgdG9vbCB0aXAgaWYgc2VsZWN0aW9uIGlzIGluc2lkZSB0aGUgY29udGVudCBjb250YWluZXJcblx0XHR2YXIgc2VsZWN0aW9uID0gd2luZG93LmdldFNlbGVjdGlvbigpO1xuXHRcdGlmICghaXNJbnNpZGVDb250ZW50KHNlbGVjdGlvbikpIHtcblx0XHRcdCR0b29sVGlwLmNsYXNzTGlzdC5yZW1vdmUoJ3Rvb2wtdGlwLS12aXNpYmxlJyk7XG5cdFx0XHRyZXR1cm47XG5cdFx0fVxuXG5cdFx0Ly8gQ2hhbmdlIGNvbnRleHR1YWwgYWN0aW9uc1xuXHRcdCR0d2l0dGVyLnNldEF0dHJpYnV0ZSgnaHJlZicsIGBodHRwczovL3R3aXR0ZXIuY29tL2ludGVudC90d2VldD90ZXh0PSR7ZW5jb2RlVVJJQ29tcG9uZW50KCdcIicgKyBoaWdobGlnaHRlZFRleHQgKyAnXCIgLSAnICsgJHR3aXR0ZXIuZGF0YXNldC51cmwpfWApO1xuXG5cdFx0Ly8gU2hvdyBhbmQgcGxhY2UgdG9vbCB0aXBcblx0XHR2YXIgc2Nyb2xsUG9zaXRpb24gPSAod2luZG93LnNjcm9sbFkgfHwgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LnNjcm9sbFRvcCk7XG5cdFx0dmFyIHJhbmdlID0gc2VsZWN0aW9uLmdldFJhbmdlQXQoMCk7XG5cdFx0dmFyIHJlY3QgPSByYW5nZS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcblx0XHQkdG9vbFRpcC5zdHlsZS50b3AgPSAocmVjdC50b3AgKyBzY3JvbGxQb3NpdGlvbikgKyAncHgnO1xuXHRcdCR0b29sVGlwLmNsYXNzTGlzdC5hZGQoJ3Rvb2wtdGlwLS12aXNpYmxlJyk7XG5cdFx0JHRvb2xUaXAuc3R5bGUubGVmdCA9ICgwLjUgKiByZWN0LmxlZnQgKyAwLjUgKiByZWN0LnJpZ2h0IC0gMC41ICogJHRvb2xUaXAuY2xpZW50V2lkdGgpICsgJ3B4Jztcblx0fSwgMTApO1xufTtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24oKSB7XG5cdCRwb3N0Q29udGVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5jb250ZW50Jyk7XG5cdCR0b29sVGlwID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnRvb2wtdGlwJyk7XG5cblx0aWYgKCEkcG9zdENvbnRlbnQgfHwgISR0b29sVGlwKSB7XG5cdFx0cmV0dXJuO1xuXHR9XG5cblx0JHR3aXR0ZXIgPSAkdG9vbFRpcC5xdWVyeVNlbGVjdG9yKCcudG9vbC10aXBfX3R3aXR0ZXInKTtcblxuXHRkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdtb3VzZXVwJywgcGxhY2VUb29sVGlwKTtcblx0ZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcigna2V5dXAnLCBwbGFjZVRvb2xUaXApO1xuXG5cdC8vIEZpbGwgZm9ybSB3aXRoIHNlbGVjdGVkIHRleHQgdG8gbWFrZSBhIHF1aWNrIHJlc3BvbnNlIG9uIHRoZSBhcnRpY2xlIGJ5XG5cdC8vIHRoZSB1c2VyXG5cdHZhciAkcmVzcG9uc2VUZXh0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnJlc3BvbnNlc19fZm9ybSB0ZXh0YXJlYScpO1xuXHQkdG9vbFRpcC5xdWVyeVNlbGVjdG9yKCcudG9vbC10aXBfX3Jlc3BvbnNlJykuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbihlKSB7XG5cdFx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xuXHRcdHZhciBoaWdobGlnaHRlZFRleHQgPSBnZXRTZWxlY3RlZFRleHQoKTtcblx0XHQkcmVzcG9uc2VUZXh0LnZhbHVlID0gYD4gJHtoaWdobGlnaHRlZFRleHR9XG5cbmA7XG5cdFx0JHJlc3BvbnNlVGV4dC5mb2N1cygpO1xuXHRcdCRyZXNwb25zZVRleHQucGFyZW50Tm9kZS5jbGFzc0xpc3QuYWRkKCd2YWxpZGF0ZS0tdmFsaWQnKTtcblx0XHQkcmVzcG9uc2VUZXh0LnBhcmVudE5vZGUuY2xhc3NMaXN0LnJlbW92ZSgndmFsaWRhdGUtLW5vdC12YWxpZCcpO1xuXHR9KTtcbn1cbiIsIi8qKlxuICogSGVscGVycyBmb3IgY29tbXVuaWNhdGluZyB3aXRoIHRoZSBtZXRhIGFwaSBob2xkaW5nIHJlc3BvbnNlcyBhbmQgbGlrZXMgZm9yXG4gKiB0aGUgYXJ0aWNsZXMuXG4gKi9cblxudmFyIGFwaVVybCA9IHdpbmRvdy5hcGlVUkw7XG52YXIgaWQgPSB3aW5kb3cucG9zdElkO1xuXG4vKipcbiAqIE1ha2UgYSBBSkFYIGNhbGwgdG8gdGhlIGFwaVxuICogQHBhcmFtICB7U3RyaW5nfSBwYXRoXG4gKiBAcGFyYW0gIHtTdHJpbmd9IG1ldGhvZFxuICogQHBhcmFtICB7b2JqZWN0fSBkYXRhXG4gKiBAcmV0dXJuIHtQcm9taXNlfVxuICovXG52YXIgcmVxdWVzdCA9IGZ1bmN0aW9uKHBhdGggPSAnJywgbWV0aG9kID0gJ0dFVCcsIGRhdGEgPSBudWxsKSB7XG5cbiAgdmFyIGZldGNoT3B0aW9ucyA9IHtcbiAgICBtZXRob2QsXG4gICAgaGVhZGVyczoge1xuICAgICAgJ0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uOyBjaGFyc2V0PXV0Zi04J1xuICAgIH1cbiAgfTtcblxuICBpZiAoZGF0YSkge1xuICAgIGZldGNoT3B0aW9ucy5ib2R5ID0gSlNPTi5zdHJpbmdpZnkoZGF0YSk7XG4gIH1cblxuICAvLyBQZXJmb3JtIHRoZSBhamF4IGNhbGxcbiAgcmV0dXJuIGZldGNoKGFwaVVybCArIHBhdGgsIGZldGNoT3B0aW9ucylcbiAgICAudGhlbihmdW5jdGlvbihyZXNwb25zZSkge1xuICAgICAgaWYgKHJlc3BvbnNlLnN0YXR1cyA+PSAzMDApIHtcbiAgICAgICAgcmV0dXJuIFByb21pc2UucmVqZWN0KHJlc3BvbnNlKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiByZXNwb25zZTtcbiAgICB9KVxuICAgIC50aGVuKHJlc3BvbnNlID0+IHJlc3BvbnNlLmpzb24oKSk7XG59O1xuXG4vKipcbiAqIEdldCBtZXRhIGRhdGEgZnJvbSB0aGUgYXJ0aWNsZS4gSWYgbm8gbWV0YSBkYXRhIGlzIHByZXNlbnQgZm9yIHRoZSBhY3R1YWxcbiAqIGFydGljbGUgYW5kIG5ldyBlbnRyeSB3aWxsIGJlIG1hZGUuXG4gKiBAcGFyYW0gIHtib29sZWFufSByYXcgV2hldGhlciB0byBpbmNsdWRlIGNvbXB1dGVkIGZpZWxkc1xuICogQHJldHVybiB7UHJvbWlzZX1cbiAqL1xuZXhwb3J0IHZhciBnZXRNZXRhID0gZnVuY3Rpb24ocmF3KSB7XG4gIHZhciBxdWVyeSA9ICc/aWQ9JyArIGlkO1xuICBpZiAocmF3KSB7XG4gICAgcXVlcnkgKz0gJyZyYXcnO1xuICB9XG4gIHJldHVybiByZXF1ZXN0KHF1ZXJ5KVxuICAgIC5jYXRjaChmdW5jdGlvbigpIHtcbiAgICAgIHJldHVybiByZXF1ZXN0KCcnLCAnUE9TVCcsIHtcbiAgICAgICAgcmVzcG9uc2VzOiBbXSxcbiAgICAgICAgbGlrZXM6IDAsXG4gICAgICAgIGlkXG4gICAgICB9KTtcbiAgICB9KTtcbn07XG5cbmV4cG9ydCB2YXIgZ2V0U2VhcmNoSW5kZXggPSBmdW5jdGlvbihxdWVyeSkge1xuICByZXR1cm4gcmVxdWVzdCgnc2VhcmNoP3E9JyArIHF1ZXJ5KTtcbn07XG5cbi8qKlxuICogSW5jcmVtZW50IHRoZSBsaWtlIHZhbHVlIHdpdGggb25lXG4gKiBAcmV0dXJuIHtQcm9taXNlfVxuICovXG5leHBvcnQgdmFyIGxpa2UgPSBmdW5jdGlvbigpIHtcbiAgcmV0dXJuIGdldE1ldGEoaWQsIHRydWUpXG4gICAgLnRoZW4oZnVuY3Rpb24oZGF0YSkge1xuICAgICAgcmV0dXJuIHJlcXVlc3QoJz9pZD0nICsgaWQsICdQVVQnLCB7XG4gICAgICAgIGxpa2VzOiBkYXRhLmxpa2VzICsgMVxuICAgICAgfSk7XG4gICAgfSk7XG59O1xuXG4vKipcbiAqIFVwZGF0ZSBhdXRob3IgZW1haWwgdXNlZCB0byBzZW5kIGUtbWFpbHMgd2hlbiBhIHJlc3BvbnNlIGkgcmVjZWl2ZWQuXG4gKiBAcmV0dXJuIHtQcm9taXNlfVxuICovXG5leHBvcnQgdmFyIHVwZGF0ZUF1dGhvckVtYWlsID0gZnVuY3Rpb24oYXV0aG9yRW1haWwpIHtcbiAgaWYgKCFpZCkge1xuICAgIHJldHVybiBQcm9taXNlLnJlamVjdChuZXcgRXJyb3IoJ05vIHBvc3RJZCcpKTtcbiAgfVxuICByZXR1cm4gcmVxdWVzdCgnP2lkPScgKyBpZCwgJ1BVVCcsIHtcbiAgICBhdXRob3JFbWFpbFxuICB9KTtcbn07XG5cbi8qKlxuICogQWRkIGEgcmVzcG9uc2VcbiAqIEBwYXJhbSB7b2JqZWN0fSByZXNwb25zZVxuICogQHJldHVybiB7UHJvbWlzZX1cbiAqL1xuZXhwb3J0IHZhciBhZGRSZXNwb25zZSA9IGZ1bmN0aW9uKHJlc3BvbnNlKSB7XG4gIHJldHVybiBnZXRNZXRhKHRydWUpXG4gICAgLnRoZW4oZnVuY3Rpb24oZGF0YSkge1xuXG4gICAgICAvLyBTZXQgdGhlIHB1Ymxpc2ggZGF0YSB0byBub3dcbiAgICAgIHJlc3BvbnNlLnB1Ymxpc2hlZCA9IG5ldyBEYXRlKCkudG9JU09TdHJpbmcoKTtcblxuICAgICAgLy8gVXBkYXRlIHRoZSByZXNwb25zZXMgbGlzdFxuICAgICAgZGF0YS5yZXNwb25zZXMucHVzaChyZXNwb25zZSk7XG4gICAgICByZXR1cm4gcmVxdWVzdCgnP2lkPScgKyBpZCwgJ1BVVCcsIHtcbiAgICAgICAgcmVzcG9uc2VzOiBkYXRhLnJlc3BvbnNlc1xuICAgICAgfSk7XG4gICAgfSk7XG59O1xuXG4vKipcbiAqIFJlbW92ZSBhIHJlc3BvbnNlXG4gKiBAcGFyYW0gIHtzdHJpbmd9IHB1Ymxpc2hlZFxuICogQHBhcmFtICB7c3RyaW5nfSBuYW1lXG4gKiBAcmV0dXJuIHtQcm9taXNlfVxuICovXG5leHBvcnQgdmFyIHJlbW92ZVJlc3BvbnNlID0gZnVuY3Rpb24ocHVibGlzaGVkLCBuYW1lKSB7XG4gIHJldHVybiBnZXRNZXRhKHRydWUpXG4gICAgLnRoZW4oZnVuY3Rpb24oZGF0YSkge1xuXG4gICAgICAvLyBSZW1vdmUgcmVzcG9zZSB3aGljaCBtYXRjaGVzIG9uIHB1Ymxpc2ggZGF0ZSBhbmQgYXV0aG9yIG5hbWVcbiAgICAgIHZhciByZXNwb25zZXMgPSBkYXRhLnJlc3BvbnNlcy5maWx0ZXIoZnVuY3Rpb24ocmVzcG9uc2UpIHtcbiAgICAgICAgcmV0dXJuIChyZXNwb25zZS5wdWJsaXNoZWQgIT09IHB1Ymxpc2hlZCB8fCByZXNwb25zZS5uYW1lICE9PSBuYW1lKTtcbiAgICAgIH0pO1xuXG4gICAgICByZXR1cm4gcmVxdWVzdCgnP2lkPScgKyBpZCwgJ1BVVCcsIHtcbiAgICAgICAgcmVzcG9uc2VzXG4gICAgICB9KTtcbiAgICB9KTtcbn07XG4iLCIvKipcbiAqIFZhbGlkYXRlIGlucHV0IGZpZWxkcyBhcyB1c2VyIHR5cGVzXG4gKi9cblxuLy8gRGVwZW5kZW5jaWVzXG5pbXBvcnQgdmFsaWRhdGVGb3JtIGZyb20gJy4vdmFsaWRhdGUnO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbigkdmFsaWRhdG9ycywgY2FsbGJhY2spIHtcblx0JHZhbGlkYXRvcnMuZm9yRWFjaChmdW5jdGlvbigkdmFsaWRhdGVDb250YWluZXIpIHtcblx0XHR2YXIgJHZhbGlkYXRlRmllbGQgPSAkdmFsaWRhdGVDb250YWluZXIucXVlcnlTZWxlY3RvcignaW5wdXQsIHRleHRhcmVhJyk7XG5cblx0XHQkdmFsaWRhdGVGaWVsZC5hZGRFdmVudExpc3RlbmVyKCdpbnB1dCcsIGZ1bmN0aW9uKCkge1xuXHRcdFx0dmFyIHZhbGlkID0gdmFsaWRhdGVGb3JtKCR2YWxpZGF0b3JzKTtcblx0XHRcdGNhbGxiYWNrKHZhbGlkKTtcblx0XHR9KTtcblx0fSk7XG59XG4iLCIvKipcbiAqIENoZWNrIGlmIHRoZSBmb3JtIGlzIHZhbGlkXG4gKi9cblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24oJHZhbGlkYXRvcnMpIHtcblx0dmFyIG5vdFZhbGlkID0gJHZhbGlkYXRvcnMuc29tZShmdW5jdGlvbigkdmFsaWRhdG9yKSB7XG5cdFx0aWYgKCR2YWxpZGF0b3IuZGF0YXNldC52YWxpZGF0ZVJlcXVpcmVkICE9PSB1bmRlZmluZWQpIHtcblx0XHRcdHJldHVybiAhJHZhbGlkYXRvci5jbGFzc0xpc3QuY29udGFpbnMoJ3ZhbGlkYXRlLS12YWxpZCcpO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHRyZXR1cm4gJHZhbGlkYXRvci5jbGFzc0xpc3QuY29udGFpbnMoJ3ZhbGlkYXRlLS1ub3QtdmFsaWQnKTtcblx0XHR9XG5cdH0pO1xuXG5cdHJldHVybiAhbm90VmFsaWQ7XG59XG4iLCIvKipcbiAqIENoZWNrIGlmIHVzZXIgaXMgbG9nZ2VkIGluIHVzaW5nIHRoZSBnaG9zdCBzZXNzaW9uLiBJZiBsb2dnZWQgaW4gZ2V0IHVzZXJcbiAqIGRhdGEuXG4gKi9cblxuLy8gQ2FjaGVkIHByb21pc2VcbnZhciBkYXRhUHJvbWlzZTtcblxuLyoqXG4gKiBHZXQgdGhlIGRhdGEgZm9yIHRoZSBsb2dnZWQgaW4gdXNlZFxuICogQHBhcmFtICB7c3RyaW5nfSB0b2tlblxuICogQHJldHVybiB7UHJvbWlzZX1cbiAqL1xudmFyIGdldFVzZXJEYXRhID0gZnVuY3Rpb24odG9rZW4pIHtcblx0cmV0dXJuIGZldGNoKCcvZ2hvc3QvYXBpL3YwLjEvdXNlcnMvbWUvP2luY2x1ZGU9cm9sZXMmc3RhdHVzPWFsbCcsIHtcblx0XHRtZXRob2Q6ICdHRVQnLFxuXHRcdGhlYWRlcnM6IHtcblx0XHRcdCdBdXRob3JpemF0aW9uJzogJ0JlYXJlciAnICsgdG9rZW5cblx0XHR9XG5cdH0pLnRoZW4oZnVuY3Rpb24ocmVzcG9uc2UpIHtcblx0XHRpZiAocmVzcG9uc2Uuc3RhdHVzICE9PSAyMDApIHtcblx0XHRcdHJldHVybiBQcm9taXNlLnJlamVjdCgnT2xkIHNlc3Npb24nKTtcblx0XHR9XG5cdFx0cmV0dXJuIHJlc3BvbnNlLmpzb24oKTtcblx0fSkudGhlbihmdW5jdGlvbihkYXRhKSB7XG5cdFx0cmV0dXJuIGRhdGEudXNlcnNbMF07XG5cdH0pO1xufTtcblxuLyoqXG4gKiBDaGVjayBpZiB0aGVyZSBpcyBhIEdob3N0IHNlc3Npb24uIElmIHNvIHVzZSBpdCB0byBnZXQgdGhlIHVzZXJzIGRhdGEuXG4gKiBAcmV0dXJuIHtQcm9taXNlfVxuICovXG52YXIgZ2V0ID0gZnVuY3Rpb24oKSB7XG5cblx0Ly8gR2hvc3Qgc3RvcmVzIGl0IHNlc3Npb24gaW4gbG9jYWxTdG9yYWdlXG5cdHZhciBzZXNzaW9uU3RyaW5nID0gbG9jYWxTdG9yYWdlLmdldEl0ZW0oJ2dob3N0OnNlc3Npb24nKTtcblx0aWYgKCFzZXNzaW9uU3RyaW5nKSB7XG5cdFx0cmV0dXJuIFByb21pc2UucmVqZWN0KCdObyBzZXNzaW9uJyk7XG5cdH1cblxuXHQvLyBWYWxpZCBzZXNzaW9uP1xuXHR2YXIgc2Vzc2lvbiA9IEpTT04ucGFyc2Uoc2Vzc2lvblN0cmluZyk7XG5cdGlmICghc2Vzc2lvbiB8fCAhc2Vzc2lvbi5hdXRoZW50aWNhdGVkIHx8ICFzZXNzaW9uLmF1dGhlbnRpY2F0ZWQuYWNjZXNzX3Rva2VuKSB7XG5cdFx0cmV0dXJuIFByb21pc2UucmVqZWN0KCdObyBzZXNzaW9uJyk7XG5cdH1cblxuXHQvLyBTZXNzaW9uIGV4cGlyZWQ/XG5cdGlmIChzZXNzaW9uLmF1dGhlbnRpY2F0ZWQuZXhwaXJlc19hdCA8IERhdGUubm93KCkpIHtcblx0XHRyZXR1cm4gUHJvbWlzZS5yZWplY3QoJ1Nlc3Npb24gZXhwaXJlZCcpO1xuXHR9XG5cblx0cmV0dXJuIGdldFVzZXJEYXRhKHNlc3Npb24uYXV0aGVudGljYXRlZC5hY2Nlc3NfdG9rZW4pO1xuXG59O1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbigpIHtcblxuXHQvLyBSZXR1cm4gY2FjaGVkIHByb21pc2UgaWYgYWxyZWFkeSBjYWxsZWRcblx0aWYgKCFkYXRhUHJvbWlzZSkge1xuXHRcdGRhdGFQcm9taXNlID0gZ2V0KCk7XG5cdH1cblx0cmV0dXJuIGRhdGFQcm9taXNlO1xufVxuIiwiLyoqXG4gKiBFbmNvZGUgYSBzdHJpbmdcbiAqIEBwYXJhbSAge3N0cmluZ30gc3RyaW5nXG4gKiBAcmV0dXJuIHtzdHJpbmd9XG4gKi9cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uKHN0cmluZykge1xuXHR2YXIgaHRtbEVuY29kZWRWYWx1ZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpLmFwcGVuZENoaWxkKFxuXHRcdGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKHN0cmluZykpLnBhcmVudE5vZGUuaW5uZXJIVE1MO1xuXHRyZXR1cm4gaHRtbEVuY29kZWRWYWx1ZS5yZXBsYWNlKC9cXHI/XFxuL2csICc8YnI+Jyk7XG59XG4iLCJpbXBvcnQgZ2V0QWxsIGZyb20gJ2RzLWFzc2V0cy9kb20vZ2V0LWFsbCc7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24ocmF3KSB7XG5cdHZhciAkY29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG5cdCRjb250YWluZXIuaW5uZXJIVE1MID0gcmF3O1xuXHRnZXRBbGwoJ2ltZycsICRjb250YWluZXIpLmZvckVhY2goZnVuY3Rpb24oJGltZykge1xuXHRcdHZhciAkaW1nV3JhcHBlciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuXHRcdCRpbWdXcmFwcGVyLmNsYXNzTGlzdC5hZGQoJ2ltZy13cmFwcGVyJyk7XG5cdFx0JGltZ1dyYXBwZXIuaW5uZXJIVE1MID0gJzxkaXYgY2xhc3M9XCJpbWctY29udGFpbmVyXCI+PGltZz48L2Rpdj4nO1xuXHRcdHZhciBzcmMgPSAkaW1nLmdldEF0dHJpYnV0ZSgnc3JjJyk7XG5cdFx0dmFyIGFsdCA9ICRpbWcuZ2V0QXR0cmlidXRlKCdhbHQnKTtcblx0XHR2YXIgcGFkZGluZyA9IDUwO1xuXG5cdFx0Ly8gTGF6eSBsb2FkIGFsbCBidXQgdGhlIGZpcnN0IGltYWdlXG5cdFx0dmFyICRuZXdJbWcgPSAkaW1nV3JhcHBlci5xdWVyeVNlbGVjdG9yKCdpbWcnKTtcblxuXHRcdCRuZXdJbWcuc2V0QXR0cmlidXRlKCdkYXRhLXNyYycsIHNyYyk7XG5cdFx0JG5ld0ltZy5zZXRBdHRyaWJ1dGUoJ2NsYXNzJywgJ2xhenktaW1hZ2UnKTtcblxuXHRcdGFsdC5zcGxpdCgnOycpLmZvckVhY2goZnVuY3Rpb24oc3RyKSB7XG5cdFx0XHRpZiAoc3RyID09PSAnZnVsbC1zaXplJyB8fCBzdHIgPT09ICdmdWxsLXdpZHRoJykge1xuXHRcdFx0XHQkaW1nV3JhcHBlci5jbGFzc0xpc3QuYWRkKCdmdWxsLXdpZHRoJyk7XG5cdFx0XHR9IGVsc2UgaWYgKHN0ci5pbmRleE9mKCdyYXRpbz0nKSA9PT0gMCkge1xuXHRcdFx0XHR2YXIgcmF0aW8gPSBzdHIucmVwbGFjZSgncmF0aW89JywgJycpO1xuXHRcdFx0XHRpZiAocmF0aW8uaW5kZXhPZignOicpKSB7XG5cdFx0XHRcdFx0dmFyIGRpbWVuc2lvbnMgPSByYXRpby5zcGxpdCgnOicpO1xuXHRcdFx0XHRcdHJhdGlvID0gZGltZW5zaW9uc1swXSAvIGRpbWVuc2lvbnNbMV07XG5cdFx0XHRcdH1cblx0XHRcdFx0cGFkZGluZyA9IDEwMCAvIHJhdGlvO1xuXHRcdFx0fSBlbHNlIGlmIChzdHIgPT09ICdib3JkZXJzJykge1xuXHRcdFx0XHQkaW1nV3JhcHBlci5xdWVyeVNlbGVjdG9yKCcuaW1nLWNvbnRhaW5lcicpLmNsYXNzTGlzdC5hZGQoJ2ltZy1jb250YWluZXItLWJvcmRlcnMnKTtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdGFsdCA9IHN0cjtcblx0XHRcdH1cblx0XHR9KTtcblxuXHRcdCRuZXdJbWcuc2V0QXR0cmlidXRlKCdhbHQnLCBhbHQpO1xuXHRcdCRuZXdJbWcuc2V0QXR0cmlidXRlKCd0aXRsZScsICRpbWcuZ2V0QXR0cmlidXRlKCd0aXRsZScpKTtcblxuXHRcdCRpbWdXcmFwcGVyLnF1ZXJ5U2VsZWN0b3IoJy5pbWctY29udGFpbmVyJylcblx0XHRcdC5zZXRBdHRyaWJ1dGUoJ3N0eWxlJywgJ3BhZGRpbmctYm90dG9tOicgKyBwYWRkaW5nICsgJyUnKTtcblxuXHRcdCRpbWcucGFyZW50Tm9kZS5vdXRlckhUTUwgPSAkaW1nV3JhcHBlci5vdXRlckhUTUw7XG5cdH0pO1xuXHRyZXR1cm4gJGNvbnRhaW5lci5pbm5lckhUTUw7XG59O1xuIiwiaW1wb3J0IHN0cmlwVGFncyBmcm9tICcuL3N0cmlwLWh0bWwtdGFncyc7XG5pbXBvcnQgd29yZENvdW50IGZyb20gJ3dvcmQtY291bnQnO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbihodG1sKSB7XG5cdHZhciB0ZXh0ID0gc3RyaXBUYWdzKGh0bWwpO1xuXHR2YXIgd29yZHMgPSB3b3JkQ291bnQodGV4dCk7XG5cdHZhciByZWFkVGltZSA9IE1hdGguY2VpbCh3b3JkcyAvIDMwMCk7XG5cblx0dmFyIGFmZml4ID0gJyBtaW4nO1xuXHRpZiAocmVhZFRpbWUgPiAxKSB7XG5cdFx0YWZmaXggKz0gJ3MnO1xuXHR9XG5cblx0cmV0dXJuIHJlYWRUaW1lICsgYWZmaXg7XG59XG4iLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbihodG1sKSB7XG5cdHZhciB0bXAgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcblx0dG1wLmlubmVySFRNTCA9IGh0bWw7XG5cdHJldHVybiB0bXAudGV4dENvbnRlbnQgfHwgdG1wLmlubmVyVGV4dCB8fCAnJztcbn1cbiIsIi8qKlxuICogTWFpbiBlbnRyeSBmb3IgdGhlIGphdmFzY3JpcHQuXG4gKiBJbXBvcnQgbW9kdWxlcyBhbmQgc3RhcnQgdGhlbVxuICovXG5cbmltcG9ydCBsYXp5SW1hZ2VzIGZyb20gJ2RzLWFzc2V0cy9sYXp5L2ltYWdlcyc7XG5pbXBvcnQgZ2V0QWxsIGZyb20gJ2RzLWFzc2V0cy9kb20vZ2V0LWFsbCc7XG5pbXBvcnQgdmFsaWRhdGVJbnB1dEZpZWxkcyBmcm9tICdkcy1hc3NldHMvdmFsaWRhdGUvaW5wdXQtZmllbGRzJztcbmltcG9ydCBuYXZpZ2F0aW9uIGZyb20gJy4vY29tcG9uZW50cy9uYXZpZ2F0aW9uJztcbmltcG9ydCByZXNwb25zZSBmcm9tICcuL2NvbXBvbmVudHMvcmVzcG9uc2UnO1xuaW1wb3J0IHRvb2xUaXAgZnJvbSAnLi9jb21wb25lbnRzL3Rvb2wtdGlwJztcbmltcG9ydCBzZWFyY2ggZnJvbSAnLi9jb21wb25lbnRzL3NlYXJjaCc7XG5pbXBvcnQgZ2V0TG9nZ2VkSW5EYXRhIGZyb20gJy4vbGliL2dldC1sb2dnZWQtaW4tZGF0YSc7XG5pbXBvcnQgKiBhcyBhcGkgZnJvbSAnLi9saWIvYXBpJztcblxubmF2aWdhdGlvbigpO1xudG9vbFRpcCgpO1xuc2VhcmNoKCk7XG5cbmdldEFsbCgnaW1nJykuZm9yRWFjaChmdW5jdGlvbigkaW1nKSB7XG5cdCRpbWcub25sb2FkID0gZnVuY3Rpb24oKSB7XG5cdFx0dGhpcy5jbGFzc0xpc3QuYWRkKCdhbmltYXRlLS1hY3RpdmUnKTtcblx0fTtcbn0pO1xubGF6eUltYWdlcygxKTtcbnZhbGlkYXRlSW5wdXRGaWVsZHMoKTtcbnJlc3BvbnNlKCk7XG5nZXRMb2dnZWRJbkRhdGEoKS50aGVuKGZ1bmN0aW9uKHVzZXIpIHtcblx0dmFyICRib2R5ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignYm9keScpO1xuXG5cdCRib2R5LmNsYXNzTGlzdC5hZGQoJ3VzZXItbG9nZ2VkLWluJyk7XG5cblx0Ly8gQWRtaW4gbG9nZ2VkIGluXG5cdHZhciBhZG1pbiA9IHVzZXIucm9sZXMuc29tZShmdW5jdGlvbihyb2xlKSB7XG5cdFx0cmV0dXJuIChyb2xlLm5hbWUgPT09ICdPd25lcicgfHwgcm9sZS5uYW1lID09PSAnQWRtaW5pc3RyYXRvcicpO1xuXHR9KTtcblx0aWYgKGFkbWluKSB7XG5cdFx0JGJvZHkuY2xhc3NMaXN0LmFkZCgnYWRtaW4tbG9nZ2VkLWluJyk7XG5cdH1cblxuXHQvLyBBdXRob3IgbG9nZ2VkIGluXG5cdGlmICh1c2VyLm5hbWUgPT09IHdpbmRvdy5hdXRob3JOYW1lKSB7XG5cdFx0JGJvZHkuY2xhc3NMaXN0LmFkZCgnYXV0aG9yLWxvZ2dlZC1pbicpO1xuXHRcdHJldHVybiBhcGkudXBkYXRlQXV0aG9yRW1haWwodXNlci5lbWFpbCk7XG5cdH1cbn0pLmNhdGNoKGZ1bmN0aW9uKCkge30pO1xuIiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24oYXV0aG9yKSB7XG5cblx0dmFyIGF1dGhvckltYWdlID0gJyc7XG5cdGlmIChhdXRob3IuaW1hZ2UpIHtcblx0XHRhdXRob3JJbWFnZSA9IGA8dGQgd2lkdGg9XCI1JVwiPjxpbWcgc3JjPVwiJHthdXRob3IuaW1hZ2V9XCIgY2xhc3M9XCJhdXRob3JfX2ltYWdlIHJvdW5kLWltZ1wiPjwvdGQ+YDtcblx0fVxuXG5cdHZhciBjb3ZlckltYWdlID0gJyc7XG5cdGlmIChhdXRob3IuY292ZXIpIHtcblx0XHRjb3ZlckltYWdlID0gYFxuPGltZyBkYXRhLXNyYz1cIiR7YXV0aG9yLmNvdmVyfVwiIGNsYXNzPVwibGF6eS1pbWFnZSBmdWxsLXdpZHRoIGltZy1mdWxsLXdpZHRoXCIgYWx0PVwiJHthdXRob3IubmFtZX1cIiA+XG5gO1xuXHR9XG5cblx0cmV0dXJuIGBcbjxhcnRpY2xlIGNsYXNzPVwiYm94ZXNfX2l0ZW0gc21hbGwgYW5pbWF0ZSBhbmltYXRlX19mYWRlLWluXCI+XG4gIDxoZWFkZXIgY2xhc3M9XCJhdXRob3JcIj5cbiAgICAgIDx0YWJsZT5cbiAgICAgICAgICA8dHI+XG4gICAgICAgICAgICAgICR7YXV0aG9ySW1hZ2V9XG4gICAgICAgICAgICAgIDx0ZD48c3BhbiBjbGFzcz1cImF1dGhvcl9fbmFtZVwiPjxhIGhyZWY9XCIvYXV0aG9yLyR7YXV0aG9yLnNsdWd9XCI+JHthdXRob3IubmFtZX08L2E+PC9zcGFuPjxicj5cbiAgICAgICAgICAgICAgXHQke2F1dGhvci5jb3VudC5wb3N0c30gYXJ0aWNsZXNcbiAgICAgICAgICAgICAgPC90ZD5cbiAgICAgICAgICA8L3RyPlxuICAgICAgPC90YWJsZT5cbiAgPC9oZWFkZXI+XG4gICR7Y292ZXJJbWFnZX1cbiAgPHA+JHthdXRob3IuYmlvIHx8ICcnfTwvcD5cbiAgPHA+PGEgaHJlZj1cIi9hdXRob3IvJHthdXRob3Iuc2x1Z30vXCIgY2xhc3M9XCJidG5cIj5BcnRpY2xlcyBieSBhdXRob3I8L2E+PC9wPlxuPC9hcnRpY2xlPlxuYDtcbn1cbiIsImltcG9ydCBpbWFnZUNvbnZlcnRlZCBmcm9tICcuLi9saWIvaW1hZ2UtY29udmVydGVyJztcbmltcG9ydCByZWFkVGltZSBmcm9tICcuLi9saWIvcmVhZC10aW1lJztcbmltcG9ydCBlcG9jaFRvVGltZWFnbyBmcm9tICdlcG9jaC10by10aW1lYWdvJztcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24ocG9zdCkge1xuXG5cdHZhciBhdXRob3JJbWFnZSA9ICcnO1xuXHRpZiAocG9zdC5hdXRob3IuaW1hZ2UpIHtcblx0XHRhdXRob3JJbWFnZSA9IGA8dGQgd2lkdGg9XCI1JVwiPjxpbWcgc3JjPVwiJHtwb3N0LmF1dGhvci5pbWFnZX1cIiBjbGFzcz1cImF1dGhvcl9faW1hZ2Ugcm91bmQtaW1nXCI+PC90ZD5gO1xuXHR9XG5cblx0dmFyIHRhZ3MgPSAnJztcblx0aWYgKHBvc3QudGFncykge1xuXHRcdHRhZ3MgPSAnPGJyPjxzcGFuIGNsYXNzPVwidGFnc1wiPicgKyBwb3N0LnRhZ3MubWFwKGZ1bmN0aW9uKHRhZykge1xuXHRcdFx0cmV0dXJuIGA8YSBocmVmPVwiL3RhZy8ke3RhZy5zbHVnfS9cIj4ke3RhZy5uYW1lfTwvYT5gO1xuXHRcdH0pLmpvaW4oJycpICsgJzwvc3Bhbj4nO1xuXHR9XG5cblx0dmFyIHB1Ymxpc2hlZCA9IG5ldyBEYXRlKHBvc3QucHVibGlzaGVkX2F0KS5nZXRUaW1lKCk7XG5cdHZhciBub3cgPSBEYXRlLm5vdygpO1xuXHR2YXIgdGltZUFnbyA9IGVwb2NoVG9UaW1lYWdvLnRpbWVBZ28ocHVibGlzaGVkLCBub3cpO1xuXG5cdHZhciBodG1sID0gaW1hZ2VDb252ZXJ0ZWQocG9zdC5odG1sKTtcblx0dmFyIGV4Y2VycHQgPSBodG1sLnN1YnN0cigwLCBodG1sLmluZGV4T2YoJzwvcD4nKSArIDQpO1xuXG5cdHJldHVybiBgXG48YXJ0aWNsZSBjbGFzcz1cImJveGVzX19pdGVtIHNtYWxsIGFuaW1hdGUgYW5pbWF0ZV9fZmFkZS1pblwiPlxuICA8aGVhZGVyIGNsYXNzPVwiYXV0aG9yXCI+XG4gICAgICA8dGFibGU+XG4gICAgICAgICAgPHRyPlxuICAgICAgICAgICAgICAke2F1dGhvckltYWdlfVxuICAgICAgICAgICAgICA8dGQ+PHNwYW4gY2xhc3M9XCJhdXRob3JfX25hbWVcIj48YSBocmVmPVwiL2F1dGhvci8ke3Bvc3QuYXV0aG9yLnNsdWd9XCI+JHtwb3N0LmF1dGhvci5uYW1lfTwvYT48L3NwYW4+PGJyPlxuICAgICAgICAgICAgICAke3RpbWVBZ299ICZtaWRkb3Q7ICR7cmVhZFRpbWUocG9zdC5odG1sKX0gcmVhZCR7dGFnc308L3RkPlxuICAgICAgICAgIDwvdHI+XG4gICAgICA8L3RhYmxlPlxuICA8L2hlYWRlcj5cbiAgJHtleGNlcnB0fVxuICA8cD48YSBocmVmPVwiLyR7cG9zdC5zbHVnfS9cIiBjbGFzcz1cImJ0blwiPlJlYWQgYXJ0aWNsZTwvYT48L3A+XG48L2FydGljbGU+XG5gO1xufVxuIiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24odXNlcikge1xuXHR2YXIgaW1hZ2UgPSAnJztcblx0aWYgKHVzZXIuaW1hZ2UpIHtcblx0XHRpbWFnZSA9IGBcbjx0ZCB3aWR0aD1cIjUlXCI+PGltZyBkYXRhLXNyYz1cIiR7dXNlci5pbWFnZX1cIiBjbGFzcz1cImF1dGhvcl9faW1hZ2UgYXV0aG9yX19pbWFnZS0tc21hbGwgbGF6eS1pbWFnZSBpbWctYmcgcm91bmQtaW1nXCI+PC90ZD5cblx0XHRgO1xuXHR9XG5cblx0cmV0dXJuIGBcbjxkaXYgY2xhc3M9XCJhdXRob3Igc21hbGxcIj5cbiAgPHRhYmxlPjx0Ym9keT48dHI+XG5cdFx0JHtpbWFnZX1cbiAgICA8dGQ+XG4gICAgICA8c3BhbiBjbGFzcz1cImF1dGhvcl9fbmFtZVwiPiR7dXNlci5uYW1lfTwvc3Bhbj5cbiAgICA8L3RkPlxuICA8L3RyPjwvdGJvZHk+PC90YWJsZT5cbjwvZGl2PlxuYDtcbn1cbiIsImltcG9ydCBlbmNvZGUgZnJvbSAnLi4vbGliL2h0bWwtZW5jb2RlJztcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24ocmVzcG9uc2UpIHtcblxuICB2YXIgY2xhc3NlcyA9ICdyZXNwb25zZSBib3hlc19faXRlbSc7XG4gIGlmIChyZXNwb25zZS5uYW1lLnRvTG93ZXJDYXNlKCkgPT09IHdpbmRvdy5hdXRob3JOYW1lLnRvTG93ZXJDYXNlKCkpIHtcbiAgICBjbGFzc2VzICs9ICcgYm94ZXNfX2l0ZW0tLXRyYW5zcGFyZW50JztcbiAgfVxuXG4gIHZhciBpbWFnZSA9ICcnO1xuICBpZiAocmVzcG9uc2UuaW1hZ2UpIHtcbiAgICBpbWFnZSA9IGA8dGQgd2lkdGg9XCI1JVwiPjxpbWcgZGF0YS1zcmM9XCIke3Jlc3BvbnNlLmltYWdlfVwiIGNsYXNzPVwiYXV0aG9yX19pbWFnZSBhdXRob3JfX2ltYWdlLS1zbWFsbCBsYXp5LWltYWdlIGltZy1iZyByb3VuZC1pbWdcIj48L3RkPmA7XG4gIH1cblxuICB2YXIgcmVhZFRpbWUgPSAnJztcbiAgaWYgKHJlc3BvbnNlLnJlYWRUaW1lKSB7XG4gICAgcmVhZFRpbWUgPSBgICZtaWRkb3Q7ICR7cmVzcG9uc2UucmVhZFRpbWV9IHJlYWRgO1xuICB9XG5cbiAgdmFyIGV4Y2VycHQgPSByZXNwb25zZS5leGNlcnB0IHx8IHJlc3BvbnNlLmh0bWw7XG5cbiAgdmFyIHJlYWRNb3JlID0gJyc7XG4gIGlmIChyZXNwb25zZS5leGNlcnB0KSB7XG4gICAgcmVhZE1vcmUgPSBgXG48ZGl2IGNsYXNzPVwicmVzcG9uc2VfX3RleHQgaGlkZGVuXCI+JHtyZXNwb25zZS5odG1sfTwvZGl2PlxuPHA+PGEgaHJlZj1cIiNcIiBjbGFzcz1cImJ0biByZXNwb25zZV9fcmVhZC1tb3JlXCI+UmVhZCBtb3JlPC9hPjwvcD5cbmA7XG4gIH1cblxuICB2YXIgbmFtZSA9IGAke2VuY29kZShyZXNwb25zZS5uYW1lKX1gO1xuICBpZiAocmVzcG9uc2Uud2Vic2l0ZSkge1xuICAgIG5hbWUgPSBgPGEgaHJlZj1cIiR7ZW5jb2RlKHJlc3BvbnNlLndlYnNpdGUpfVwiPiR7bmFtZX08L2E+YDtcbiAgfVxuXG4gIHJldHVybiBgXG48ZGl2IGNsYXNzPVwiJHtjbGFzc2VzfSBzbWFsbFwiPlxuICA8ZGl2IGNsYXNzPVwiYXV0aG9yXCI+XG4gICAgPHRhYmxlPlxuICAgICAgPHRyPlxuICAgICAgICAke2ltYWdlfVxuICAgICAgICA8dGQ+XG4gICAgICAgICAgPHNwYW4gY2xhc3M9XCJhdXRob3JfX25hbWVcIj4ke25hbWV9PC9zcGFuPjxicj5cbiAgICAgICAgICAke3Jlc3BvbnNlLnRpbWVBZ299JHtyZWFkVGltZX1cbiAgICAgICAgPC90ZD5cbiAgICAgIDwvdHI+XG4gICAgPC90YWJsZT5cbiAgPC9kaXY+XG4gIDxhIGhyZWY9XCIjXCIgY2xhc3M9XCJyZXNwb25zZV9fZGVsZXRlXCIgZGF0YS1wdWJsaXNoZWQ9XCIke3Jlc3BvbnNlLnB1Ymxpc2hlZH1cIiBkYXRhLW5hbWU9XCIke3Jlc3BvbnNlLm5hbWV9XCI+PGltZyBkYXRhLXNyYz1cIi9hc3NldHMvaW1hZ2VzL3RyYXNoLnN2Z1wiIGNsYXNzPVwibGF6eS1pbWFnZVwiPjwvYT5cbiAgPGRpdiBjbGFzcz1cInJlc3BvbnNlX19leGNlcnB0XCI+JHtleGNlcnB0fTwvZGl2PlxuICAke3JlYWRNb3JlfVxuPC9kaXY+YDtcbn1cbiIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uKHRhZykge1xuXG4gIGNvbnNvbGUubG9nKHRhZyk7XG5cbiAgdmFyIGNvdmVySW1hZ2UgPSAnJztcbiAgaWYgKHRhZy5pbWFnZSkge1xuICAgIGNvdmVySW1hZ2UgPSBgXG48aW1nIGRhdGEtc3JjPVwiJHt0YWcuaW1hZ2V9XCIgY2xhc3M9XCJsYXp5LWltYWdlIGZ1bGwtd2lkdGggaW1nLWZ1bGwtd2lkdGhcIiBhbHQ9XCIke3RhZy5uYW1lfVwiID5cbmA7XG4gIH1cblxuICByZXR1cm4gYFxuPGFydGljbGUgY2xhc3M9XCJib3hlc19faXRlbSBzbWFsbCBhbmltYXRlIGFuaW1hdGVfX2ZhZGUtaW5cIj5cbiAgPGhlYWRlciBjbGFzcz1cImF1dGhvclwiPlxuICAgICAgPHRhYmxlPlxuICAgICAgICAgIDx0cj5cbiAgICAgICAgICAgICAgPHRkPjxzcGFuIGNsYXNzPVwiYXV0aG9yX19uYW1lXCI+PGEgaHJlZj1cIi90YWcvJHt0YWcuc2x1Z31cIj4ke3RhZy5uYW1lfTwvYT48L3NwYW4+PGJyPlxuICAgICAgICAgICAgICBcdCR7dGFnLmNvdW50LnBvc3RzfSBhcnRpY2xlc1xuICAgICAgICAgICAgICA8L3RkPlxuICAgICAgICAgIDwvdHI+XG4gICAgICA8L3RhYmxlPlxuICA8L2hlYWRlcj5cbiAgJHtjb3ZlckltYWdlfVxuICA8cD4ke3RhZy5kZXNjcmlwdGlvbiB8fCAnJ308L3A+XG4gIDxwPjxhIGhyZWY9XCIvdGFnLyR7dGFnLnNsdWd9L1wiIGNsYXNzPVwiYnRuXCI+QXJ0aWNsZXMgaW4gY2F0ZWdvcnk8L2E+PC9wPlxuPC9hcnRpY2xlPlxuYDtcbn1cbiIsIi8qKlxuICogV29yZCBDb3VudFxuICpcbiAqIFdvcmQgY291bnQgaW4gcmVzcGVjdCBvZiBDSksgY2hhcmFjdGVycy5cbiAqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTUgYnkgSHNpYW9taW5nIFlhbmcuXG4gKi9cblxudmFyIHBhdHRlcm4gPSAvW2EtekEtWjAtOV9cXHUwMzkyLVxcdTAzYzlcXHUwMGMwLVxcdTAwZmZcXHUwNjAwLVxcdTA2ZmZdK3xbXFx1NGUwMC1cXHU5ZmZmXFx1MzQwMC1cXHU0ZGJmXFx1ZjkwMC1cXHVmYWZmXFx1MzA0MC1cXHUzMDlmXFx1YWMwMC1cXHVkN2FmXSsvZztcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoZGF0YSkge1xuICB2YXIgbSA9IGRhdGEubWF0Y2gocGF0dGVybik7XG4gIHZhciBjb3VudCA9IDA7XG4gIGZvciAodmFyIGkgPSAwOyBpIDwgbS5sZW5ndGg7IGkrKykge1xuICAgIGlmIChtW2ldLmNoYXJDb2RlQXQoMCkgPj0gMHg0ZTAwKSB7XG4gICAgICBjb3VudCArPSBtW2ldLmxlbmd0aDtcbiAgICB9IGVsc2Uge1xuICAgICAgY291bnQgKz0gMTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIGNvdW50O1xufTtcbiJdfQ==
