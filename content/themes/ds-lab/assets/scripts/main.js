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

},{"../lib/form/validate":34,"ds-assets/dom/get-all":2}],32:[function(require,module,exports){
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJub2RlX21vZHVsZXMvZHMtYXNzZXRzL2FzeW5jL2RlYm91bmNlLmpzIiwibm9kZV9tb2R1bGVzL2RzLWFzc2V0cy9kb20vZ2V0LWFsbC5qcyIsIm5vZGVfbW9kdWxlcy9kcy1hc3NldHMvZG9tL2dldC1kb2N1bWVudC1vZmZzZXQtdG9wLmpzIiwibm9kZV9tb2R1bGVzL2RzLWFzc2V0cy9sYXp5L2ltYWdlcy5qcyIsIm5vZGVfbW9kdWxlcy9kcy1hc3NldHMvc2Nyb2xsL2hhcy1zY3JvbGxlZC1wYXN0LmpzIiwibm9kZV9tb2R1bGVzL2RzLWFzc2V0cy9zY3JvbGwvc2Nyb2xsLWNoYW5nZS5qcyIsIm5vZGVfbW9kdWxlcy9kcy1hc3NldHMvc2Nyb2xsL3Zpc2libGUuanMiLCJub2RlX21vZHVsZXMvZHMtYXNzZXRzL3ZhbGlkYXRlL2luZGV4LmpzIiwibm9kZV9tb2R1bGVzL2RzLWFzc2V0cy92YWxpZGF0ZS9pbnB1dC1maWVsZHMuanMiLCJub2RlX21vZHVsZXMvZHMtYXNzZXRzL3ZhbGlkYXRlL2lzLWRhdGUuanMiLCJub2RlX21vZHVsZXMvZHMtYXNzZXRzL3ZhbGlkYXRlL2lzLWVtYWlsLmpzIiwibm9kZV9tb2R1bGVzL2RzLWFzc2V0cy92YWxpZGF0ZS9pcy1mbG9hdC5qcyIsIm5vZGVfbW9kdWxlcy9kcy1hc3NldHMvdmFsaWRhdGUvaXMtaW50LmpzIiwibm9kZV9tb2R1bGVzL2RzLWFzc2V0cy92YWxpZGF0ZS9pcy1yZXF1aXJlZC5qcyIsIm5vZGVfbW9kdWxlcy9kcy1hc3NldHMvdmFsaWRhdGUvaXMtdXJsLmpzIiwibm9kZV9tb2R1bGVzL2Vwb2NoLXRvLXRpbWVhZ28vY3V0b2ZmL2N1dG9mZi5qc29uIiwibm9kZV9tb2R1bGVzL2Vwb2NoLXRvLXRpbWVhZ28vaW5kZXguanMiLCJub2RlX21vZHVsZXMvZXBvY2gtdG8tdGltZWFnby9zdWZmaXgvc3VmZml4LWRpY3Rpb25hcnkuanNvbiIsIm5vZGVfbW9kdWxlcy9lcG9jaC10by10aW1lYWdvL3RpbWUtYWdvL3RpbWUtYWdvLmpzIiwibm9kZV9tb2R1bGVzL2Vwb2NoLXRvLXRpbWVhZ28vdGltZS1jYWxjdWxhdGlvbnMvaW5kZXguanMiLCJub2RlX21vZHVsZXMvZXBvY2gtdG8tdGltZWFnby90aW1lLWNhbGN1bGF0aW9ucy90aW1lLWFnby9kYXlzLWFnby5qcyIsIm5vZGVfbW9kdWxlcy9lcG9jaC10by10aW1lYWdvL3RpbWUtY2FsY3VsYXRpb25zL3RpbWUtYWdvL2hvdXJzLWFnby5qcyIsIm5vZGVfbW9kdWxlcy9lcG9jaC10by10aW1lYWdvL3RpbWUtY2FsY3VsYXRpb25zL3RpbWUtYWdvL21pbnV0ZXMtYWdvLmpzIiwibm9kZV9tb2R1bGVzL2Vwb2NoLXRvLXRpbWVhZ28vdGltZS1jYWxjdWxhdGlvbnMvdGltZS1hZ28vbW9udGhzLWFnby5qcyIsIm5vZGVfbW9kdWxlcy9lcG9jaC10by10aW1lYWdvL3RpbWUtY2FsY3VsYXRpb25zL3RpbWUtYWdvL3NlY29uZHMtYWdvLmpzIiwibm9kZV9tb2R1bGVzL2Vwb2NoLXRvLXRpbWVhZ28vdGltZS1jYWxjdWxhdGlvbnMvdGltZS1hZ28vd2Vla3MtYWdvLmpzIiwibm9kZV9tb2R1bGVzL2Vwb2NoLXRvLXRpbWVhZ28vdGltZS1jYWxjdWxhdGlvbnMvdGltZS1hZ28veWVhcnMtYWdvLmpzIiwic3JjL3NjcmlwdHMvY29tcG9uZW50cy9uYXZpZ2F0aW9uLmpzIiwic3JjL3NjcmlwdHMvY29tcG9uZW50cy9yZXNwb25zZS5qcyIsInNyYy9zY3JpcHRzL2NvbXBvbmVudHMvc2VhcmNoLmpzIiwic3JjL3NjcmlwdHMvY29tcG9uZW50cy90b29sLXRpcC5qcyIsInNyYy9zY3JpcHRzL2xpYi9hcGkuanMiLCJzcmMvc2NyaXB0cy9saWIvZm9ybS9saXZlLXZhbGlkYXRpb24uanMiLCJzcmMvc2NyaXB0cy9saWIvZm9ybS92YWxpZGF0ZS5qcyIsInNyYy9zY3JpcHRzL2xpYi9nZXQtbG9nZ2VkLWluLWRhdGEuanMiLCJzcmMvc2NyaXB0cy9saWIvaHRtbC1lbmNvZGUuanMiLCJzcmMvc2NyaXB0cy9saWIvaW1hZ2UtY29udmVydGVyLmpzIiwic3JjL3NjcmlwdHMvbGliL3JlYWQtdGltZS5qcyIsInNyYy9zY3JpcHRzL2xpYi9zdHJpcC1odG1sLXRhZ3MuanMiLCJzcmMvc2NyaXB0cy9tYWluLmpzIiwic3JjL3NjcmlwdHMvdGVtcGxhdGVzL2F1dGhvci5qcyIsInNyYy9zY3JpcHRzL3RlbXBsYXRlcy9wb3N0LmpzIiwic3JjL3NjcmlwdHMvdGVtcGxhdGVzL3Jlc3BvbnNlLW1ldGEuanMiLCJzcmMvc2NyaXB0cy90ZW1wbGF0ZXMvcmVzcG9uc2UuanMiLCJzcmMvc2NyaXB0cy90ZW1wbGF0ZXMvdGFnLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3dvcmQtY291bnQvaW5kZXguanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7a0JDTWUsVUFBUyxRQUFULEVBQW1CLE9BQW5CLEVBQTRCO0FBQ3pDLE1BQUksVUFBVSxLQUFWLENBRHFDO0FBRXpDLE1BQUksT0FBTyxTQUFQLElBQU8sR0FBTTtBQUNmLGNBQVUsS0FBVixDQURlO0dBQU4sQ0FGOEI7QUFLekMsU0FBTyxZQUFXO0FBQ2hCLFFBQUksT0FBSixFQUFhO0FBQ1gsYUFEVztLQUFiO0FBR0EsY0FBVSxJQUFWLENBSmdCO0FBS2hCLGFBQVMsS0FBVCxDQUFlLElBQWYsRUFBcUIsU0FBckIsRUFMZ0I7QUFNaEIsUUFBSSxDQUFDLE9BQUQsRUFBVTtBQUNaLGFBQU8scUJBQVAsQ0FBNkIsSUFBN0IsRUFEWTtLQUFkLE1BRU87QUFDTCxhQUFPLFVBQVAsQ0FBa0IsSUFBbEIsRUFBd0IsT0FBeEIsRUFESztLQUZQO0dBTkssQ0FMa0M7Q0FBNUI7Ozs7Ozs7OztrQkNBQSxVQUFTLFFBQVQsRUFBcUM7TUFBbEIsOERBQVEsd0JBQVU7O0FBQ2xELFNBQU8sTUFBTSxTQUFO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Ozs7Ozs7Ozs7O2tCQ0ZBLFVBQVMsR0FBVCxFQUFjOztBQUUzQixVQUFRLEdBQVIsQ0FBWSxHQUFaLEVBRjJCOztBQUkzQixNQUFJLGFBQWEsRUFBYixDQUp1QjtBQUszQixNQUFJLElBQUksS0FBSixFQUFXO0FBQ2IsdUNBQ2EsSUFBSSxLQUFKLDREQUFnRSxJQUFJLElBQUosVUFEN0UsQ0FEYTtHQUFmOztBQU1BLG1NQUsyRCxJQUFJLElBQUosVUFBYSxJQUFJLElBQUoseUNBQ3pELElBQUksS0FBSixDQUFVLEtBQVYsd0ZBS2IsMEJBQ0csSUFBSSxXQUFKLElBQW1CLEVBQW5CLGtDQUNjLElBQUksSUFBSiw4REFibkIsQ0FYMkI7Q0FBZDs7O0FDQWY7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCIvKipcbiAqIE1ha2Ugc3VyZSBhIGZ1bmN0aW9uIG9ubHkgaXMgcnVuIGV2ZXJ5IHggbXNcbiAqIEBwYXJhbSAge0Z1bmN0aW9ufSBjYWxsYmFjayBNZXRob2QgdG8gZXhlY3V0ZSBpZiBpdCBpcyBub3QgZGVib3VuY2VkXG4gKiBAcGFyYW0gIHtpbnRlZ2VyfSAgdGltZW91dCAgTWlsbGlzZWNvbmRzIHRvIHdhaXQgYmVmb3JlIG5leHQgYWxsb3dlZCBjYWxsYmFjay4gRGVmYXVsdHMgdG8gdGhlIGFuaW1hdGlvbiBmcmFtZSByYXRlIGluIHRoZSBicm93c2VyXG4gKiBAcmV0dXJuIHt2b2lkfVxuICovXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbihjYWxsYmFjaywgdGltZW91dCkge1xuICB2YXIgcGVuZGluZyA9IGZhbHNlO1xuICB2YXIgZG9uZSA9ICgpID0+IHtcbiAgICBwZW5kaW5nID0gZmFsc2U7XG4gIH07XG4gIHJldHVybiBmdW5jdGlvbigpIHtcbiAgICBpZiAocGVuZGluZykge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBwZW5kaW5nID0gdHJ1ZTtcbiAgICBjYWxsYmFjay5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgIGlmICghdGltZW91dCkge1xuICAgICAgd2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZShkb25lKTtcbiAgICB9IGVsc2Uge1xuICAgICAgd2luZG93LnNldFRpbWVvdXQoZG9uZSwgdGltZW91dCk7XG4gICAgfVxuICB9O1xufVxuIiwiLyoqXG4gKiBHZXQgYW4gYXJyYXkgb2YgZG9tIGVsZW1lbnRzIG1hdGNoaW5nIHRoZSBzZWxlY3RvclxuICogQHBhcmFtICB7c3RyaW5nfSAgICAgc2VsZWN0b3JcbiAqIEBwYXJhbSAge0RPTWVsZW1lbnR9IERPTSBlbGVtZW50IHRvIHNlYXJjaCBpbi4gRGVmYXVsdHMgdG8gZG9jdW1lbnRcbiAqIEByZXR1cm4ge2FycmF5fVxuICovXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbihzZWxlY3RvciwgJHJvb3QgPSBkb2N1bWVudCkge1xuICByZXR1cm4gQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoJHJvb3QucXVlcnlTZWxlY3RvckFsbChzZWxlY3RvcikpO1xufVxuIiwiLyoqXG4gKiBHZXQgdGhlIGVsZW1lbnRzIG9mZnNldCByZWxhdGl2ZSB0byB0aGUgZG9jdW1lbnRcbiAqIEBwYXJhbSAge0RPTUVsZW1lbnR9ICRlbGVtZW50IEVsZW1lbnQgdG8gZ2V0IHRoZSBvZmZzZXQgZnJvbVxuICogQHJldHVybiB7aW50ZWdlcn0gICAgICAgICAgICAgT2Zmc2V0IGluIHBpeGVsc1xuICovXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbigkZWxlbWVudCkge1xuICB2YXIgb2Zmc2V0ID0gMDtcblxuICB3aGlsZSAoJGVsZW1lbnQgJiYgIWlzTmFOKCRlbGVtZW50Lm9mZnNldFRvcCkpIHtcbiAgICBvZmZzZXQgKz0gJGVsZW1lbnQub2Zmc2V0VG9wO1xuICAgICRlbGVtZW50ID0gJGVsZW1lbnQub2Zmc2V0UGFyZW50O1xuICB9XG4gIHJldHVybiBvZmZzZXQ7XG59XG4iLCIvKipcbiAqIExhenkgbG9hZCBpbWFnZXMgd2l0aCBjbGFzcyAubGF6eS1pbWFnZXMuXG4gKiBEZXBlbmRpbmcgb24gdGhlIHRyZXNob2xkIGltYWdlcyB3aWxsIGxvYWQgYXMgdGhlIHVzZXIgc2Nyb2xscyBkb3duIG9uIHRoZVxuICogZG9jdW1lbnQuXG4gKi9cblxuLy8gRGVwZW5kZW5jZWlzXG5pbXBvcnQgZ2V0QWxsRWxlbWVudHMgZnJvbSAnLi4vZG9tL2dldC1hbGwnO1xuaW1wb3J0IHNjcm9sbFZpc2libGUgZnJvbSAnLi4vc2Nyb2xsL3Zpc2libGUnO1xuXG4vLyBMb2FkIGltYWdlIGVsZW1lbnRcbnZhciBsb2FkSW1nID0gZnVuY3Rpb24oJGltZykge1xuXG4gIGlmICgkaW1nLmRhdGFzZXQuc3JjKSB7XG4gICAgJGltZy5zZXRBdHRyaWJ1dGUoJ3NyYycsICRpbWcuZGF0YXNldC5zcmMpO1xuICB9XG4gIGlmICgkaW1nLmRhdGFzZXQuc3Jjc2V0KSB7XG4gICAgJGltZy5zZXRBdHRyaWJ1dGUoJ3NyY3NldCcsICRpbWcuZGF0YXNldC5zcmNzZXQpO1xuICB9XG59O1xuXG4vLyBMb2FkIHBpY3R1cmUgZWxlbWVudFxudmFyIGxvYWRQaWN0dXJlID0gZnVuY3Rpb24oJHBpY3R1cmUpIHtcbiAgbG9hZEltZygkcGljdHVyZS5xdWVyeVNlbGVjdG9yKCdpbWcnKSk7XG4gIHZhciAkc291cmNlcyA9IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKCRwaWN0dXJlLnF1ZXJ5U2VsZWN0b3JBbGwoJ3NvdXJjZScpKTtcbiAgJHNvdXJjZXMuZm9yRWFjaCgkc291cmNlID0+ICRzb3VyY2Uuc2V0QXR0cmlidXRlKCdzcmNzZXQnLCAkc291cmNlLmRhdGFzZXQuc3Jjc2V0KSk7XG59O1xuXG52YXIgbG9hZEVsZW1lbnQgPSBmdW5jdGlvbigkZWxlbWVudCkge1xuICBpZiAoJGVsZW1lbnQubWF0Y2hlcygncGljdHVyZScpKSB7XG4gICAgbG9hZFBpY3R1cmUoJGVsZW1lbnQpO1xuICB9IGVsc2UgaWYgKCRlbGVtZW50Lm1hdGNoZXMoJ2ltZycpKSB7XG4gICAgbG9hZEltZygkZWxlbWVudCk7XG4gIH1cblxuICAvLyBNYWtlIHN1cmUgcGljdHVyZWZpbGwgd2lsbCB1cGRhdGUgdGhlIGltYWdlIHdoZW4gc291cmNlIGhhcyBjaGFuZ2VkXG4gIGlmICh3aW5kb3cucGljdHVyZWZpbGwpIHtcbiAgICB3aW5kb3cucGljdHVyZWZpbGwoe1xuICAgICAgcmVldmFsdWF0ZTogdHJ1ZVxuICAgIH0pO1xuICB9XG59O1xuXG4vKipcbiAqIEFjdGl2YXRlIGxhenkgbG9hZCBvZiBpbWFnZXMgYXMgdXNlciBzY3JvbGxzXG4gKiBAcGFyYW0gIHtmbG9hdH0gdGhyZXNob2xkICBQZXJjZW50IGJlbG93IHNjcmVlbiB0byBpbml0aWFsaXplIGxvYWQgb2YgaW1hZ2VcbiAqIEByZXR1cm4ge3ZvaWR9XG4gKi9cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uKHRocmVzaG9sZCA9IDAuNSkge1xuICB2YXIgJGxhenlJbWFnZXMgPSBnZXRBbGxFbGVtZW50cygnLmxhenktaW1hZ2UnKTtcblxuICB3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lKGZ1bmN0aW9uKCkge1xuICAgICRsYXp5SW1hZ2VzLmZvckVhY2goZnVuY3Rpb24oJGxhenlJbWFnZSkge1xuXG4gICAgICAvLyBJZ25vcmUgaW1hZ2VzIHdoaWNoIGhhcyBhbHJlYWR5IGJlZW4gcmVnaXN0ZXJlZFxuICAgICAgaWYgKCRsYXp5SW1hZ2UuZGF0YXNldC5sYXp5SW1hZ2VMaXN0ZW5pbmcpIHtcblx0cmV0dXJuO1xuICAgICAgfVxuICAgICAgJGxhenlJbWFnZS5zZXRBdHRyaWJ1dGUoJ2RhdGEtbGF6eS1pbWFnZS1saXN0ZW5pbmcnLCAndHJ1ZScpO1xuXG4gICAgICBzY3JvbGxWaXNpYmxlKCRsYXp5SW1hZ2UsIHRocmVzaG9sZClcbiAgICAgICAgLnRoZW4oKCkgPT4gbG9hZEVsZW1lbnQoJGxhenlJbWFnZSkpO1xuICAgIH0pO1xuICB9KTtcblxufVxuIiwiLy8gRGVwZW5kZW5jaWVzXG5pbXBvcnQgZ2V0RG9jdW1lbnRPZmZzZXRUb3AgZnJvbSAnLi4vZG9tL2dldC1kb2N1bWVudC1vZmZzZXQtdG9wJztcblxuLyoqXG4gKiBDaGVja3MgaWYgdGhlIHVzZXIgaGFzIHNjcm9sbGVkIHRvIG9yIHBhc3QgYW4gZWxlbWVudFxuICogQHBhcmFtICB7RE9NRWxlbWVudH0gJGVsZW1lbnQgIFRoZSBlbGVtZW50IHRvIGNoZWNrIGFnYWluc3RcbiAqIEBwYXJhbSAge2Zsb2F0fSAgICAgIHRocmVzaG9sZCBEaXN0YW5jZSBpbiBwZXJjZW50IG9mIHRoZSBzY2VlZW4gaGVpZ2h0IHRvIG1lYXN1cmUgYWdhaW5zdC5cbiAqIEByZXR1cm4ge2Jvb2xlYW59XG4gKi9cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uKCRlbGVtZW50LCB0aHJlc2hvbGQgPSAwKSB7XG4gIHZhciBzY3JvbGxCb3R0b20gPSAod2luZG93LnNjcm9sbFkgfHwgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LnNjcm9sbFRvcCkgKyAod2luZG93LmlubmVySGVpZ2h0ICogKDEgKyB0aHJlc2hvbGQpKTtcbiAgdmFyIG9mZnNldFRvcCA9IGdldERvY3VtZW50T2Zmc2V0VG9wKCRlbGVtZW50KTtcbiAgcmV0dXJuIChzY3JvbGxCb3R0b20gPiBvZmZzZXRUb3ApO1xufVxuIiwiLy8gZGVwZW5kZW5jaWVzXG5pbXBvcnQgZGVib3VuY2UgZnJvbSAnLi4vYXN5bmMvZGVib3VuY2UnO1xuXG4vKipcbiAqIFJ1bnMgc2NyaXB0cyBlYWNoIHRpbWUgdGhlIHVzZXIgY2hhbmdlcyBzY3JvbGwgZGlyZWN0aW9uXG4gKiBAcGFyYW0gIHtGdW5jdGlvbn0gZG93bkNhbGxiYWNrICBDYWxsYmFjayBldmVyeSB0aW1lIHRoZSB1c2VyIHN0YXJ0cyBzY3JvbGxpbmcgZG93blxuICogQHBhcmFtICB7RnVuY3Rpb259IHVwQ2FsbGJhY2sgICAgQ2FsbGJhY2sgZXZlcnkgdGltZSB0aGUgdXNlciBzdGFydHMgc2Nyb2xsaW5nIHVwXG4gKiBAcGFyYW0gIHtmbG9hdH0gICAgdGhyZXNob2xkICAgICBNYXJnaW4gaW4gdG9wIHdoZXJlIHNjcm9sbCBkb3duIGlzIGlnbm9yZWQgKGNvdWxkIGJlIHVzZWQgZm9yIG5hdnMpXG4gKiBAcmV0dXJuIHt2b2lkfVxuICovXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbihkb3duQ2FsbGJhY2sgPSBmdW5jdGlvbigpIHt9LCB1cENhbGxiYWNrID0gZnVuY3Rpb24oKSB7fSwgdGhyZXNob2xkID0gMCkge1xuXG4gIHZhciBsYXN0U2Nyb2xsUG9zID0gMDtcbiAgdmFyIHNjcm9sbGVkRG93biA9IGZhbHNlO1xuXG4gIHZhciBpc1Njcm9sbGluZyA9IGZ1bmN0aW9uKCkge1xuICAgIHZhciBjdXJyZW50U2Nyb2xsUG9zID0gd2luZG93LnNjcm9sbFk7XG5cbiAgICBpZiAoIXNjcm9sbGVkRG93biAmJlxuICAgICAgY3VycmVudFNjcm9sbFBvcyA+IHRocmVzaG9sZCAmJlxuICAgICAgY3VycmVudFNjcm9sbFBvcyA+IGxhc3RTY3JvbGxQb3MpIHtcbiAgICAgIGRvd25DYWxsYmFjaygpO1xuICAgICAgc2Nyb2xsZWREb3duID0gdHJ1ZTtcbiAgICB9IGVsc2UgaWYgKHNjcm9sbGVkRG93biAmJlxuICAgICAgKGN1cnJlbnRTY3JvbGxQb3MgPD0gdGhyZXNob2xkIHx8IGN1cnJlbnRTY3JvbGxQb3MgPCBsYXN0U2Nyb2xsUG9zKSAmJlxuICAgICAgKGN1cnJlbnRTY3JvbGxQb3MgKyB3aW5kb3cuaW5uZXJIZWlnaHQgPCBkb2N1bWVudC5ib2R5LmNsaWVudEhlaWdodCkpIHtcbiAgICAgIHVwQ2FsbGJhY2soKTtcbiAgICAgIHNjcm9sbGVkRG93biA9IGZhbHNlO1xuICAgIH1cblxuICAgIGxhc3RTY3JvbGxQb3MgPSBjdXJyZW50U2Nyb2xsUG9zO1xuICB9O1xuXG4gIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdzY3JvbGwnLCBkZWJvdW5jZShpc1Njcm9sbGluZykpO1xuICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdET01Db250ZW50TG9hZGVkJywgaXNTY3JvbGxpbmcpO1xufVxuIiwiLy8gRGVwZW5kZW5jZWlzXG5pbXBvcnQgZGVib3VuY2UgZnJvbSAnLi4vYXN5bmMvZGVib3VuY2UnO1xuaW1wb3J0IGhhc1Njcm9sbGVkUGFzdCBmcm9tICcuL2hhcy1zY3JvbGxlZC1wYXN0JztcblxuLyoqXG4gKiBGdWxmaWxsIGEgcHJvbWlzZSwgd2hlbiB0aGUgZWxlbWVudCBpcyB2aXNpYmxlIChzY3JvbGxlZCB0byBvciBwYXN0KVxuICogQHBhcmFtICB7RE9NRWxlbWVudH0gJGVsZW1lbnQgIEVsZW1lbnQgdG8gY2hlY2tcbiAqIEBwYXJhbSAge2Zsb2F0fSAgICAgIHRocmVzaG9sZCBEaXN0YW5jZSBpbiBwZXJjZW50XG4gKiBAcmV0dXJuIHtbdHlwZV19ICAgICAgICAgICBbZGVzY3JpcHRpb25dXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uKCRlbGVtZW50LCB0aHJlc2hvbGQgPSAwKSB7XG5cbiAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uKHJlc29sdmUpIHtcblxuICAgIHZhciBjaGVja0VsZW1lbnQgPSBkZWJvdW5jZShmdW5jdGlvbigpIHtcbiAgICAgIGlmIChoYXNTY3JvbGxlZFBhc3QoJGVsZW1lbnQsIHRocmVzaG9sZCkpIHtcbiAgICAgICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3Njcm9sbCcsIGNoZWNrRWxlbWVudCk7XG4gICAgICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKCdyZXNpemUnLCBjaGVja0VsZW1lbnQpO1xuICAgICAgICByZXNvbHZlKCk7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignc2Nyb2xsJywgY2hlY2tFbGVtZW50KTtcbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigncmVzaXplJywgY2hlY2tFbGVtZW50KTtcbiAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdET01Db250ZW50TG9hZGVkJywgY2hlY2tFbGVtZW50KTtcbiAgICBzZXRUaW1lb3V0KGNoZWNrRWxlbWVudCwgMCk7XG4gIH0pO1xufVxuIiwiLyoqXG4gKiBIZWxwZXJzIGZvciB2YWxpZGF0aW5nIGlucHV0IGZpZWxkc1xuICovXG5cbmltcG9ydCBpc0RhdGUgZnJvbSAnLi9pcy1kYXRlJztcbmltcG9ydCBpc0VtYWlsIGZyb20gJy4vaXMtZW1haWwnO1xuaW1wb3J0IGlzRmxvYXQgZnJvbSAnLi9pcy1mbG9hdCc7XG5pbXBvcnQgaXNJbnQgZnJvbSAnLi9pcy1pbnQnO1xuaW1wb3J0IGlzUmVxdWlyZWQgZnJvbSAnLi9pcy1yZXF1aXJlZCc7XG5pbXBvcnQgaXNVcmwgZnJvbSAnLi9pcy11cmwnO1xuXG5leHBvcnQgZGVmYXVsdCB7XG4gIGlzRGF0ZSxcbiAgaXNFbWFpbCxcbiAgaXNGbG9hdCxcbiAgaXNJbnQsXG4gIGlzUmVxdWlyZWQsXG4gIGlzVXJsXG59O1xuIiwiaW1wb3J0IGdldEFsbEVsZW1lbnRzIGZyb20gJy4uL2RvbS9nZXQtYWxsJztcbmltcG9ydCB2YWxpZGF0ZSBmcm9tICcuLyc7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uKCkge1xuXG4gIGdldEFsbEVsZW1lbnRzKCcudmFsaWRhdGUnKS5mb3JFYWNoKGZ1bmN0aW9uKCR2YWxpZGF0ZUNvbnRhaW5lcikge1xuXG4gICAgdmFyICR2YWxpZGF0ZUZpZWxkID0gJHZhbGlkYXRlQ29udGFpbmVyO1xuXG4gICAgaWYgKCEkdmFsaWRhdGVDb250YWluZXIubWF0Y2hlcygnaW5wdXQsIHRleHRhcmVhJykpIHtcbiAgICAgICR2YWxpZGF0ZUZpZWxkID0gJHZhbGlkYXRlQ29udGFpbmVyLnF1ZXJ5U2VsZWN0b3IoJ2lucHV0LCB0ZXh0YXJlYScpO1xuICAgIH1cblxuICAgIGlmICghJHZhbGlkYXRlRmllbGQpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICAvLyBGaW5kIHJlbGV2YXQgdmFsaWRhdGlvbiBtZXRob2RzXG4gICAgdmFyIHZhbGlkYXRvck5hbWVzID0gW107XG4gICAgZm9yICh2YXIga2V5IGluICR2YWxpZGF0ZUNvbnRhaW5lci5kYXRhc2V0KSB7XG4gICAgICBpZiAoa2V5ICE9PSAndmFsaWRhdGUnICYmIGtleS5pbmRleE9mKCd2YWxpZGF0ZScpID09PSAwKSB7XG4gICAgICAgIHZhciB2YWxpZGF0b3JOYW1lID0ga2V5LnJlcGxhY2UoJ3ZhbGlkYXRlJywgJycpO1xuXG4gICAgICAgIGlmICh2YWxpZGF0ZVsnaXMnICsgdmFsaWRhdG9yTmFtZV0pIHtcbiAgICAgICAgICB2YWxpZGF0b3JOYW1lcy5wdXNoKHZhbGlkYXRvck5hbWUpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKHZhbGlkYXRvck5hbWVzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIC8vIENoZWNrIHZhbGlkYXRpb24gd2hlbiBpbnB1dCBvbiBmaWVsZCBpcyBjaGFuZ2VkXG4gICAgJHZhbGlkYXRlRmllbGQuYWRkRXZlbnRMaXN0ZW5lcignaW5wdXQnLCBmdW5jdGlvbigpIHtcbiAgICAgIHZhciBpbnB1dCA9ICR2YWxpZGF0ZUZpZWxkLnZhbHVlO1xuICAgICAgdmFyIHZhbGlkID0gIXZhbGlkYXRvck5hbWVzLnNvbWUoZnVuY3Rpb24odmFsaWRhdG9yTmFtZSkge1xuXHRpZiAoIWlucHV0ICYmIHZhbGlkYXRvck5hbWUgIT09ICdSZXF1aXJlZCcpIHtcblx0ICByZXR1cm4gZmFsc2U7XG5cdH1cbiAgICAgICAgcmV0dXJuICF2YWxpZGF0ZVsnaXMnICsgdmFsaWRhdG9yTmFtZV0oaW5wdXQpO1xuICAgICAgfSk7XG5cbiAgICAgIGlmICh2YWxpZCkge1xuXHQkdmFsaWRhdGVDb250YWluZXIuY2xhc3NMaXN0LmFkZCgndmFsaWRhdGUtLXZhbGlkJyk7XG5cdCR2YWxpZGF0ZUNvbnRhaW5lci5jbGFzc0xpc3QucmVtb3ZlKCd2YWxpZGF0ZS0tbm90LXZhbGlkJyk7XG4gICAgICB9IGVsc2Uge1xuXHQkdmFsaWRhdGVDb250YWluZXIuY2xhc3NMaXN0LmFkZCgndmFsaWRhdGUtLW5vdC12YWxpZCcpO1xuXHQkdmFsaWRhdGVDb250YWluZXIuY2xhc3NMaXN0LnJlbW92ZSgndmFsaWRhdGUtLXZhbGlkJyk7XG4gICAgICB9XG4gICAgfSk7XG4gIH0pO1xufVxuIiwiLyoqXG4gKiBWYWxpZGF0ZSB0aGF0IHN0cmluZyBjYW4gYmUgY29udmVydGVkIHRvIGRhdGVcbiAqIEBwYXJhbSAge3N0cmluZ30gZGF0ZSBpbnB1dFxuICogQHJldHVybiB7Ym9vbGVhbn1cbiAqL1xuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24oZGF0ZSkge1xuICByZXR1cm4gIWlzTmFOKERhdGUucGFyc2UoZGF0ZSkpO1xufVxuIiwiLyoqXG4gKiBWYWxpZGF0ZSBlLW1haWxcbiAqIEBwYXJhbSAge3N0cmluZ30gZW1haWwgaW5wdXRcbiAqIEByZXR1cm4ge2Jvb2xlYW59XG4gKi9cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uKGVtYWlsKSB7XG4gIHZhciByZSA9IC9eKFthLXowLTlfXFwuLV0rKUAoW1xcZGEtelxcLi1dKylcXC4oW2EtelxcLl17Miw2fSkkLztcbiAgcmV0dXJuIHJlLnRlc3QoZW1haWwpO1xufVxuIiwiLyoqXG4gKiBWYWxpZGF0ZSBmbG9hdFxuICogQHBhcmFtICB7c3RyaW5nfSBmbG9hdCBpbnB1dFxuICogQHJldHVybiB7Ym9vbGVhbn1cbiAqL1xuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24oZmxvYXQpIHtcbiAgdmFyIHJlID0gL14oPzpbLStdPyg/OlswLTldKykpPyg/OlxcLlswLTldKik/KD86W2VFXVtcXCtcXC1dPyg/OlswLTldKykpPyQvO1xuICByZXR1cm4gZmxvYXQgIT09ICcnICYmIHJlLnRlc3QoZmxvYXQpO1xufVxuIiwiLyoqXG4gKiBWYWxpZGF0ZSBpbnRlZ2V0XG4gKiBAcGFyYW0gIHtzdHJpbmd9IGludGVnZXIgaW5wdXRcbiAqIEByZXR1cm4ge2Jvb2xlYW59XG4gKi9cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uKGludGVnZXIpIHtcbiAgdmFyIHJlID0gL14oPzpbLStdPyg/OjB8WzEtOV1bMC05XSopKSQvO1xuICByZXR1cm4gcmUudGVzdChpbnRlZ2VyKTtcbn1cbiIsIi8qKlxuICogVmFsaWRhdGUgaWYgdGhlIHN0cmluZyBpcyBlbXB0eVxuICogQHBhcmFtICB7c3RyaW5nfSBpbnB1dFxuICogQHJldHVybiB7Ym9vbGVhbn1cbiAqL1xuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24oaW5wdXQpIHtcbiAgcmV0dXJuIGlucHV0LnRyaW0oKSAhPT0gJyc7XG59XG4iLCIvKipcbiAqIFZhbGlkYXRlIHVybFxuICogQHBhcmFtICB7c3RyaW5nfSB1cmwgaW5wdXRcbiAqIEByZXR1cm4ge2Jvb2xlYW59XG4gKi9cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uKHVybCkge1xuICB2YXIgcmUgPSAvXihodHRwcz86XFwvXFwvKT8oW1xcZGEtelxcLi1dKylcXC4oW2EtelxcLl17Miw2fSkoW1xcL1xcdyBcXC4tXSopKlxcLz8kLztcbiAgcmV0dXJuIHJlLnRlc3QodXJsKTtcbn1cbiIsIm1vZHVsZS5leHBvcnRzPXtcbiAgXCJzZWNvbmRzXCI6IDYwLFxuICBcIm1pbnV0ZXNcIjogNjAsXG4gIFwiaG91cnNcIjogMjQsXG4gIFwiZGF5c1wiOiA3LFxuICBcIndlZWtzXCI6IDQsXG4gIFwibW9udGhzXCI6IDEyXG59XG4iLCJ2YXIgY29udmVydGVyID0gbW9kdWxlLmV4cG9ydHMgPSB7XG4gIGN1dG9mZjogcmVxdWlyZSgnLi9jdXRvZmYvY3V0b2ZmLmpzb24nKSxcbiAgc3VmZml4RGljdGlvbmFyeTogcmVxdWlyZSgnLi9zdWZmaXgvc3VmZml4LWRpY3Rpb25hcnkuanNvbicpLFxuICB0aW1lQ2FsY3M6IHJlcXVpcmUoJy4vdGltZS1jYWxjdWxhdGlvbnMnKVxufVxuY29udmVydGVyLnRpbWVBZ28gPSByZXF1aXJlKCcuL3RpbWUtYWdvL3RpbWUtYWdvLmpzJykuYmluZChjb252ZXJ0ZXIpXG4iLCJtb2R1bGUuZXhwb3J0cz17XG4gIFwic2Vjb25kc1wiOiB7XG4gICAgXCJzaW5ndWxhclwiOiBcIiBzZWNvbmQgYWdvXCIsXG4gICAgXCJwbHVyYWxcIjogXCIgc2Vjb25kcyBhZ29cIlxuICB9LFxuICBcIm1pbnV0ZXNcIjoge1xuICAgIFwic2luZ3VsYXJcIjogXCIgbWludXRlIGFnb1wiLFxuICAgIFwicGx1cmFsXCI6IFwiIG1pbnV0ZXMgYWdvXCJcbiAgfSxcbiAgXCJob3Vyc1wiOiB7XG4gICAgXCJzaW5ndWxhclwiOiBcIiBob3VyIGFnb1wiLFxuICAgIFwicGx1cmFsXCI6IFwiIGhvdXJzIGFnb1wiXG4gIH0sXG4gIFwiZGF5c1wiOiB7XG4gICAgXCJzaW5ndWxhclwiOiBcIiBkYXkgYWdvXCIsXG4gICAgXCJwbHVyYWxcIjogXCIgZGF5cyBhZ29cIlxuICB9LFxuICBcIndlZWtzXCI6IHtcbiAgICBcInNpbmd1bGFyXCI6IFwiIHdlZWsgYWdvXCIsXG4gICAgXCJwbHVyYWxcIjogXCIgd2Vla3MgYWdvXCJcbiAgfSxcbiAgXCJtb250aHNcIjoge1xuICAgIFwic2luZ3VsYXJcIjogXCIgbW9udGggYWdvXCIsXG4gICAgXCJwbHVyYWxcIjogXCIgbW9udGhzIGFnb1wiXG4gIH0sXG4gIFwieWVhcnNcIjoge1xuICAgIFwic2luZ3VsYXJcIjogXCIgeWVhciBhZ29cIixcbiAgICBcInBsdXJhbFwiOiBcIiB5ZWFycyBhZ29cIlxuICB9XG59XG4iLCJtb2R1bGUuZXhwb3J0cyA9IFRpbWVBZ29cblxuZnVuY3Rpb24gVGltZUFnbyAocGFzdEVwb2NoLCBjdXJyZW50RXBvY2gpIHtcbiAgdmFyIHNlY29uZHMgPSBNYXRoLnJvdW5kKHRoaXMudGltZUNhbGNzLnNlY29uZHMocGFzdEVwb2NoLCBjdXJyZW50RXBvY2gpKVxuICB2YXIgbWludXRlcyA9IE1hdGgucm91bmQodGhpcy50aW1lQ2FsY3MubWludXRlcyhwYXN0RXBvY2gsIGN1cnJlbnRFcG9jaCkpXG4gIHZhciBob3VycyA9IE1hdGgucm91bmQodGhpcy50aW1lQ2FsY3MuaG91cnMocGFzdEVwb2NoLCBjdXJyZW50RXBvY2gpKVxuICB2YXIgZGF5cyA9IE1hdGgucm91bmQodGhpcy50aW1lQ2FsY3MuZGF5cyhwYXN0RXBvY2gsIGN1cnJlbnRFcG9jaCkpXG4gIHZhciB3ZWVrcyA9IE1hdGgucm91bmQodGhpcy50aW1lQ2FsY3Mud2Vla3MocGFzdEVwb2NoLCBjdXJyZW50RXBvY2gpKVxuICB2YXIgbW9udGhzID0gTWF0aC5yb3VuZCh0aGlzLnRpbWVDYWxjcy5tb250aHMocGFzdEVwb2NoLCBjdXJyZW50RXBvY2gpKVxuICB2YXIgeWVhcnMgPSBNYXRoLnJvdW5kKHRoaXMudGltZUNhbGNzLnllYXJzKHBhc3RFcG9jaCwgY3VycmVudEVwb2NoKSlcblxuICB2YXIgc3VmZml4ID0gdGhpcy5zdWZmaXhEaWN0aW9uYXJ5XG4gIHZhciBjdXRvZmYgPSB0aGlzLmN1dG9mZlxuXG4gIGlmIChzZWNvbmRzIDwgY3V0b2ZmLnNlY29uZHMpIHtcbiAgICByZXR1cm4gc2Vjb25kcyArIHN1ZmZpeC5zZWNvbmRzW2dldEZvcm0oc2Vjb25kcyldXG4gIH0gZWxzZSBpZiAobWludXRlcyA8IGN1dG9mZi5taW51dGVzKSB7XG4gICAgcmV0dXJuIG1pbnV0ZXMgKyBzdWZmaXgubWludXRlc1tnZXRGb3JtKG1pbnV0ZXMpXVxuICB9IGVsc2UgaWYgKGhvdXJzIDwgY3V0b2ZmLmhvdXJzKSB7XG4gICAgcmV0dXJuIGhvdXJzICsgc3VmZml4LmhvdXJzW2dldEZvcm0oaG91cnMpXVxuICB9IGVsc2UgaWYgKGRheXMgPCBjdXRvZmYuZGF5cykge1xuICAgIHJldHVybiBkYXlzICsgc3VmZml4LmRheXNbZ2V0Rm9ybShkYXlzKV1cbiAgfSBlbHNlIGlmICh3ZWVrcyA8IGN1dG9mZi53ZWVrcykge1xuICAgIHJldHVybiB3ZWVrcyArIHN1ZmZpeC53ZWVrc1tnZXRGb3JtKHdlZWtzKV1cbiAgfSBlbHNlIGlmIChtb250aHMgPCBjdXRvZmYubW9udGhzKSB7XG4gICAgcmV0dXJuIG1vbnRocyArIHN1ZmZpeC5tb250aHNbZ2V0Rm9ybShtb250aHMpXVxuICB9IGVsc2Uge1xuICAgIHJldHVybiB5ZWFycyArIHN1ZmZpeC55ZWFyc1tnZXRGb3JtKHllYXJzKV1cbiAgfVxufVxuXG5mdW5jdGlvbiBnZXRGb3JtICh2YWx1ZSkge1xuICBpZiAodmFsdWUgPT09IDEpIHtcbiAgICByZXR1cm4gJ3Npbmd1bGFyJ1xuICB9XG4gIHJldHVybiAncGx1cmFsJ1xufVxuIiwibW9kdWxlLmV4cG9ydHMgPSB7XG4gIHNlY29uZHM6IHJlcXVpcmUoJy4vdGltZS1hZ28vc2Vjb25kcy1hZ28uanMnKSxcbiAgbWludXRlczogcmVxdWlyZSgnLi90aW1lLWFnby9taW51dGVzLWFnby5qcycpLFxuICBob3VyczogcmVxdWlyZSgnLi90aW1lLWFnby9ob3Vycy1hZ28uanMnKSxcbiAgZGF5czogcmVxdWlyZSgnLi90aW1lLWFnby9kYXlzLWFnby5qcycpLFxuICB3ZWVrczogcmVxdWlyZSgnLi90aW1lLWFnby93ZWVrcy1hZ28uanMnKSxcbiAgbW9udGhzOiByZXF1aXJlKCcuL3RpbWUtYWdvL21vbnRocy1hZ28uanMnKSxcbiAgeWVhcnM6IHJlcXVpcmUoJy4vdGltZS1hZ28veWVhcnMtYWdvLmpzJylcbn1cbiIsIm1vZHVsZS5leHBvcnRzID0gRGF5c0Fnb1xuXG5mdW5jdGlvbiBEYXlzQWdvIChwYXN0RXBvY2gsIGN1cnJlbnRFcG9jaCkge1xuICB2YXIgZGF5c0FnbyA9IChjdXJyZW50RXBvY2ggLSBwYXN0RXBvY2gpIC8gMTAwMCAvIDYwIC8gNjAgLyAyNFxuICByZXR1cm4gZGF5c0Fnb1xufVxuIiwibW9kdWxlLmV4cG9ydHMgPSBIb3Vyc0Fnb1xuXG5mdW5jdGlvbiBIb3Vyc0FnbyAocGFzdEVwb2NoLCBjdXJyZW50RXBvY2gpIHtcbiAgdmFyIGhvdXJzQWdvID0gKGN1cnJlbnRFcG9jaCAtIHBhc3RFcG9jaCkgLyAxMDAwIC8gNjAgLyA2MFxuICByZXR1cm4gaG91cnNBZ29cbn1cbiIsIm1vZHVsZS5leHBvcnRzID0gTWludXRlc0Fnb1xuXG5mdW5jdGlvbiBNaW51dGVzQWdvIChwYXN0RXBvY2gsIGN1cnJlbnRFcG9jaCkge1xuICB2YXIgbWludXRlc0FnbyA9IChjdXJyZW50RXBvY2ggLSBwYXN0RXBvY2gpIC8gMTAwMCAvIDYwXG4gIHJldHVybiBtaW51dGVzQWdvXG59XG4iLCJtb2R1bGUuZXhwb3J0cyA9IE1vbnRoc0Fnb1xuXG5mdW5jdGlvbiBNb250aHNBZ28gKHBhc3RFcG9jaCwgY3VycmVudEVwb2NoKSB7XG4gIHZhciBtb250aHNBZ28gPSAoY3VycmVudEVwb2NoIC0gcGFzdEVwb2NoKSAvIDEwMDAgLyA2MCAvIDYwIC8gMjQgLyAzMVxuICByZXR1cm4gbW9udGhzQWdvXG59XG4iLCJtb2R1bGUuZXhwb3J0cyA9IFNlY29uZHNBZ29cblxuZnVuY3Rpb24gU2Vjb25kc0FnbyAocGFzdEVwb2NoLCBjdXJyZW50RXBvY2gpIHtcbiAgdmFyIHNlY29uZHNBZ28gPSAoY3VycmVudEVwb2NoIC0gcGFzdEVwb2NoKSAvIDEwMDBcbiAgcmV0dXJuIHNlY29uZHNBZ29cbn1cbiIsIm1vZHVsZS5leHBvcnRzID0gV2Vla3NBZ29cblxuZnVuY3Rpb24gV2Vla3NBZ28gKHBhc3RFcG9jaCwgY3VycmVudEVwb2NoKSB7XG4gIHZhciB3ZWVrc0FnbyA9IChjdXJyZW50RXBvY2ggLSBwYXN0RXBvY2gpIC8gMTAwMCAvIDYwIC8gNjAgLyAyNCAvIDdcbiAgcmV0dXJuIHdlZWtzQWdvXG59XG4iLCJtb2R1bGUuZXhwb3J0cyA9IFllYXJzQWdvXG5cbmZ1bmN0aW9uIFllYXJzQWdvIChwYXN0RXBvY2gsIGN1cnJlbnRFcG9jaCkge1xuICB2YXIgeWVhcnNBZ28gPSAoY3VycmVudEVwb2NoIC0gcGFzdEVwb2NoKSAvIDEwMDAgLyA2MCAvIDYwIC8gMjQgLyAzMSAvIDEyXG4gIHJldHVybiB5ZWFyc0Fnb1xufVxuIiwiLyoqXG4gKiBIYW5kbGUgbmF2aWdhdGlvblxuICovXG5cbi8vIERlcGVuZGVuY2llc1xuaW1wb3J0IHNjcm9sbENoYW5nZSBmcm9tICdkcy1hc3NldHMvc2Nyb2xsL3Njcm9sbC1jaGFuZ2UnO1xuaW1wb3J0IGRlYm91bmNlIGZyb20gJ2RzLWFzc2V0cy9hc3luYy9kZWJvdW5jZSc7XG5pbXBvcnQgZ2V0QWxsIGZyb20gJ2RzLWFzc2V0cy9kb20vZ2V0LWFsbCc7XG5pbXBvcnQgZ2V0VXNlckRhdGEgZnJvbSAnLi4vbGliL2dldC1sb2dnZWQtaW4tZGF0YSc7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uKCkge1xuXG4gIHZhciAkbmF2ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLm5hdicpO1xuICBpZiAoISRuYXYpIHtcbiAgICByZXR1cm47XG4gIH1cblxuICB2YXIgJGJvZHkgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdib2R5Jyk7XG5cbiAgLy8gQ2xvbmUgbmF2aWdhdGlvbiBhbmQgbWFrZSB0aGUgbmV3IG9uZSBzdGlja3lcbiAgdmFyICRzdGlja3lOYXYgPSAkbmF2LmNsb25lTm9kZSh0cnVlKTtcbiAgJHN0aWNreU5hdi5jbGFzc0xpc3QuYWRkKCduYXYtLXN0aWNreScpO1xuICAkYm9keS5pbnNlcnRCZWZvcmUoJHN0aWNreU5hdiwgJGJvZHkuZmlyc3RDaGlsZCk7XG5cbiAgLy8gQWN0aXZhdGUgdGhlIHN0aWNreSBuYXZpZ2F0aW9uIHdoZW4gdGhlIHVzZXIgc2Nyb2xscyB1cC5cbiAgLy8gVGhpcyB3aWxsIGZpcnMgdGFrZSBlZmZlY3QsIHdoZW4gdGhlIHVzZXIgaGFzIHNjcm9sbGVkIFwiYSBzY3JlZW5cIiBkb3duLlxuICBzY3JvbGxDaGFuZ2UoZnVuY3Rpb24oKSB7XG4gICAgJHN0aWNreU5hdi5jbGFzc0xpc3QucmVtb3ZlKCduYXYtLWFjdGl2ZScpO1xuICB9LCBmdW5jdGlvbigpIHtcbiAgICAkc3RpY2t5TmF2LmNsYXNzTGlzdC5hZGQoJ25hdi0tYWN0aXZlJyk7XG4gIH0sIHdpbmRvdy5pbm5lckhlaWdodCk7XG5cbiAgLyoqXG4gICAqIEhpZGUgc3RpY2t5IG5hdmlnYXRpb24gd2hlbiBzY3JvbGxlZCB0byB0aGUgdG9wIG9mIHRoZSBkb2N1bWVudFxuICAgKiBAcmV0dXJuIHt2b2lkfVxuICAgKi9cbiAgdmFyIG9uVG9wID0gZnVuY3Rpb24oKSB7XG4gICAgdmFyIHNjcm9sbFBvcyA9IHdpbmRvdy5zY3JvbGxZIHx8IGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5zY3JvbGxUb3A7XG4gICAgaWYgKHNjcm9sbFBvcyA8PSAwKSB7XG4gICAgICAkc3RpY2t5TmF2LmNsYXNzTGlzdC5hZGQoJ25hdi0taGlkZGVuJyk7XG4gICAgICAkc3RpY2t5TmF2LmNsYXNzTGlzdC5yZW1vdmUoJ25hdi0tYWN0aXZlJyk7XG4gICAgfSBlbHNlIHtcbiAgICAgICRzdGlja3lOYXYuY2xhc3NMaXN0LnJlbW92ZSgnbmF2LS1oaWRkZW4nKTtcbiAgICB9XG4gIH07XG5cbiAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3Njcm9sbCcsIGRlYm91bmNlKG9uVG9wKSk7XG4gIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdyZXNpemUnLCBkZWJvdW5jZShvblRvcCkpO1xuXG4gIC8vIENoYW5nZSB3b3JkaW5nIG9uIFwic2lnbiBpblwiIGJ1dHRvbiB3aGVuIHVzZXIgaXMgbG9nZ2VkIGluXG4gIGdldFVzZXJEYXRhKCkudGhlbihmdW5jdGlvbigpIHtcbiAgICBnZXRBbGwoJy5uYXZfX2l0ZW0tLXNpZ24taW4nKS5mb3JFYWNoKGZ1bmN0aW9uKCRzaWduaW4pIHtcbiAgICAgICRzaWduaW4uaW5uZXJIVE1MID0gJ0NyZWF0ZSBhIHN0b3J5JztcbiAgICB9KTtcbiAgfSkuY2F0Y2goZnVuY3Rpb24oKSB7fSk7XG5cbn1cbiIsIi8qKlxuICogSGFuZGxlIHJlc3BvbnNlcyBhbmQgbGlrZXMgaW4gcG9zdHNcbiAqL1xuXG4vLyBEZXBlbmRlbmNpZXNcbmltcG9ydCBnZXRBbGwgZnJvbSAnZHMtYXNzZXRzL2RvbS9nZXQtYWxsJztcbmltcG9ydCBsYXp5SW1hZ2VzIGZyb20gJ2RzLWFzc2V0cy9sYXp5L2ltYWdlcyc7XG5pbXBvcnQgKiBhcyBhcGkgZnJvbSAnLi4vbGliL2FwaSc7XG5pbXBvcnQgZ2V0VXNlckRhdGEgZnJvbSAnLi4vbGliL2dldC1sb2dnZWQtaW4tZGF0YSc7XG5pbXBvcnQgdXNlck1ldGFUZW1wbGF0ZSBmcm9tICcuLi90ZW1wbGF0ZXMvcmVzcG9uc2UtbWV0YSc7XG5pbXBvcnQgcmVzcG9uc2VUZW1wbGF0ZSBmcm9tICcuLi90ZW1wbGF0ZXMvcmVzcG9uc2UnO1xuaW1wb3J0IG9mZnNldFRvcCBmcm9tICdkcy1hc3NldHMvZG9tL2dldC1kb2N1bWVudC1vZmZzZXQtdG9wJztcbmltcG9ydCBsaXZlVmFsaWRhdGlvbiBmcm9tICcuLi9saWIvZm9ybS9saXZlLXZhbGlkYXRpb24nO1xuaW1wb3J0IHZhbGlkYXRlRm9ybSBmcm9tICcuLi9saWIvZm9ybS92YWxpZGF0ZSc7XG5cbi8vIENhY2hlZCBkb20gZWxlbWVudHNcbnZhciAkcmVzcG9uc2VGb3JtO1xudmFyICRjdGE7XG52YXIgJHZhbGlkYXRvcnM7XG52YXIgJHJlc3BvbnNlc0xpc3Q7XG52YXIgcmVuZGVyUmVzcG9uc2VzO1xudmFyIGFkZERlbGV0ZUV2ZW50cztcbnZhciBzZXRSZXNwb25zZXNOdW1iZXI7XG52YXIgYWRkUmVhZE1vcmVFdmVudDtcblxudmFyIHVwZGF0ZVJlc3BvbnNlQ1RBID0gZnVuY3Rpb24odmFsaWQpIHtcblx0aWYgKHZhbGlkKSB7XG5cdFx0JGN0YS5jbGFzc0xpc3QucmVtb3ZlKCdidG4tLWRpc2FibGVkJyk7XG5cdH0gZWxzZSB7XG5cdFx0JGN0YS5jbGFzc0xpc3QuYWRkKCdidG4tLWRpc2FibGVkJyk7XG5cdH1cbn07XG5cbi8qKlxuICogRGVsZXRlIHJlc3BvbnNlIHdoZW4gZGVsZXRlIGljb24gY2xpY2tlZFxuICovXG5hZGREZWxldGVFdmVudHMgPSBmdW5jdGlvbigpIHtcblx0Z2V0QWxsKCcucmVzcG9uc2VfX2RlbGV0ZScpLmZvckVhY2goZnVuY3Rpb24oJGRlbGV0ZSkge1xuXHRcdCRkZWxldGUuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbihlKSB7XG5cdFx0XHRlLnByZXZlbnREZWZhdWx0KCk7XG5cdFx0XHRhcGkucmVtb3ZlUmVzcG9uc2UoJGRlbGV0ZS5kYXRhc2V0LnB1Ymxpc2hlZCwgJGRlbGV0ZS5kYXRhc2V0Lm5hbWUpXG5cdFx0XHRcdC50aGVuKGZ1bmN0aW9uKGRhdGEpIHtcblx0XHRcdFx0XHRyZW5kZXJSZXNwb25zZXMoZGF0YS5yZXNwb25zZXMpO1xuXHRcdFx0XHRcdHNldFJlc3BvbnNlc051bWJlcihkYXRhLnJlc3BvbnNlcyk7XG5cdFx0XHRcdH0pO1xuXHRcdH0pO1xuXHR9KTtcbn07XG5cbi8qKlxuICogRXhwYW5kIHJlc3BvbnNlIHdpdGggZnVsbCB0ZXh0IHdoZW4gcmVhZCBtb3JlIGJ1dHRvbiBpcyBhY3RpdmF0ZWQuXG4gKiBCYXNpY2FsbHkgaXQgaGlkZXMgdGhlIGV4Y2VycHQgYW5kIHRoZSByZWFkIG1vcmUgYnV0dG9uIGFuZCBkaXNwbGF5cyB0aGVcbiAqIGZ1bGwgdGV4dC5cbiAqIEBwYXJhbSB7ZWxlbWVudH0gJHJlc3BvbnNlXG4gKi9cbmFkZFJlYWRNb3JlRXZlbnQgPSBmdW5jdGlvbigkcmVzcG9uc2UpIHtcblx0dmFyICRyZWFkTW9yZSA9ICRyZXNwb25zZS5xdWVyeVNlbGVjdG9yKCcucmVzcG9uc2VfX3JlYWQtbW9yZScpO1xuXHRpZiAoISRyZWFkTW9yZSkge1xuXHRcdHJldHVybjtcblx0fVxuXHQkcmVhZE1vcmUuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbihlKSB7XG5cdFx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xuXHRcdHZhciAkZXhjZXJwdCA9ICRyZXNwb25zZS5xdWVyeVNlbGVjdG9yKCcucmVzcG9uc2VfX2V4Y2VycHQnKTtcblx0XHR2YXIgJHJlYWRNb3JlQ29udGFpbmVyID0gJHJlYWRNb3JlLnBhcmVudE5vZGU7XG5cblx0XHQkcmVhZE1vcmVDb250YWluZXIucGFyZW50Tm9kZS5yZW1vdmVDaGlsZCgkcmVhZE1vcmVDb250YWluZXIpO1xuXHRcdCRleGNlcnB0LnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQoJGV4Y2VycHQpO1xuXG5cdFx0JHJlc3BvbnNlLnF1ZXJ5U2VsZWN0b3IoJy5yZXNwb25zZV9fdGV4dCcpLmNsYXNzTGlzdC5yZW1vdmUoJ2hpZGRlbicpO1xuXHR9KTtcbn07XG5cbi8qKlxuICogUmVuZGVyIHRlbXBsYXRlcyBmb3IgcmVzcG9uc2VzIGFuZCBpbnNlcnQgaHRtbCBpbiB0aGUgcmVzcG9uc2VzIGxpc3QuXG4gKiAtIExhenkgbG9hZCBpbWFnZXMgaW4gcmVzcG9uc2VzXG4gKiAtIEF0dGFjaCBuZXcgZXZlbnRzIGluIHJlc3BvbnNlc1xuICogQHBhcmFtICB7YXJyYXl9IHJlc3BvbnNlc1xuICogQHJldHVybiB7dm9pZH1cbiAqL1xucmVuZGVyUmVzcG9uc2VzID0gZnVuY3Rpb24ocmVzcG9uc2VzKSB7XG5cdHZhciBodG1sID0gJyc7XG5cdHJlc3BvbnNlcy5mb3JFYWNoKGZ1bmN0aW9uKHJlc3BvbnNlKSB7XG5cdFx0aHRtbCArPSByZXNwb25zZVRlbXBsYXRlKHJlc3BvbnNlKTtcblx0fSk7XG5cdCRyZXNwb25zZXNMaXN0LmlubmVySFRNTCA9IGh0bWw7XG5cdGxhenlJbWFnZXMoMSk7XG5cdGFkZERlbGV0ZUV2ZW50cygpO1xuXHRnZXRBbGwoJy5yZXNwb25zZScsICRyZXNwb25zZXNMaXN0KS5mb3JFYWNoKGFkZFJlYWRNb3JlRXZlbnQpO1xufTtcblxuLyoqXG4gKiBVcGRhdGUgdGhlIGNvdW50IG9mIHJlc3BvbnNlc1xuICogQHBhcmFtIHthcnJheX0gcmVzcG9uc2VzXG4gKi9cbnNldFJlc3BvbnNlc051bWJlciA9IGZ1bmN0aW9uKHJlc3BvbnNlcykge1xuXHRkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuc2hhcmVfX3Jlc3BvbnNlcycpLmlubmVySFRNTCA9IHJlc3BvbnNlcy5sZW5ndGg7XG59O1xuXG4vKipcbiAqIFVwZGF0ZSB0aGUgY291bnQgZm8gbGlrZXMgZm9yIHRoaXMgcG9zdFxuICogQHBhcmFtIHtudW1iZXJ9IGxpa2VzXG4gKi9cbnZhciBzZXRMaWtlc051bWJlciA9IGZ1bmN0aW9uKGxpa2VzKSB7XG5cdGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5zaGFyZV9fbGlrZXMnKS5pbm5lckhUTUwgPSBsaWtlcztcbn07XG5cbi8qKlxuICogR2V0IGRhdGEgZnJvbSBhcGkgd2l0aCBtZXRhIGRhdGE6IHJlc3BvbnNlcyBhbmQgbGlrZXMuXG4gKiBSZW5kZXIgdGhpcyBpbiB0aGUgZG9tLlxuICogQHJldHVybiB7dm9pZH1cbiAqL1xudmFyIHJlbmRlck1ldGEgPSBmdW5jdGlvbigpIHtcblx0YXBpLmdldE1ldGEoKS50aGVuKGZ1bmN0aW9uKGRhdGEpIHtcblx0XHRyZW5kZXJSZXNwb25zZXMoZGF0YS5yZXNwb25zZXMpO1xuXHRcdHNldFJlc3BvbnNlc051bWJlcihkYXRhLnJlc3BvbnNlcyk7XG5cdFx0c2V0TGlrZXNOdW1iZXIoZGF0YS5saWtlcyk7XG5cdH0pO1xufTtcblxuLyoqXG4gKiBQb3N0IG5ldyByZXNwb25zZSB0byBwb3N0XG4gKiAtIGNoZWNrcyBmb3IgdmFsaWRhdGlvbiBiZWZvcmUgcG9zdGluZ1xuICogQHBhcmFtICB7ZXZlbnR9IGVcbiAqIEByZXR1cm4ge3ZvaWR9XG4gKi9cbnZhciBzdWJtaXRSZXNwb25zZSA9IGZ1bmN0aW9uKGUpIHtcblx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xuXG5cdHZhciBsb2dnZWRJbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2JvZHknKS5jbGFzc0xpc3QuY29udGFpbnMoJ3VzZXItbG9nZ2VkLWluJyk7XG5cblx0Ly8gSWYgYSBmaWVsZCBpcyBub3QgdmFsaWQgdGhpcyBmaWVsZCB3aWxsIGdldCBmb2N1cywgc28gdGhlIHVzZXIgcXVpY2tseSBjYW4gdXBkYXRlIHRoZSB2YWx1ZS5cblx0dmFyIG5vdFZhbGlkID0gJHZhbGlkYXRvcnMuc29tZShmdW5jdGlvbigkdmFsaWRhdG9yKSB7XG5cdFx0aWYgKCR2YWxpZGF0b3IuY2xhc3NMaXN0LmNvbnRhaW5zKCd2YWxpZGF0ZS0tbm90LXZhbGlkJykpIHtcblx0XHRcdHZhciAkdmFsaWRhdGVGaWVsZCA9ICR2YWxpZGF0b3IucXVlcnlTZWxlY3RvcignaW5wdXQsIHRleHRhcmVhJyk7XG5cdFx0XHQkdmFsaWRhdGVGaWVsZC5mb2N1cygpO1xuXHRcdFx0cmV0dXJuIHRydWU7XG5cdFx0fVxuXHR9KTtcblxuXHRpZiAobm90VmFsaWQpIHtcblx0XHRyZXR1cm47XG5cdH1cblxuXHQvLyBDcmVhdGUgYSByZXNwb25zZSBvYmplY3QgYmFzZWQgb24gdmFsdWVzIGluIGZvcm1cblx0dmFyIHJlc3BvbnNlID0ge307XG5cdGdldEFsbCgnaW5wdXQsIHRleHRhcmVhJywgJHJlc3BvbnNlRm9ybSkuZm9yRWFjaChmdW5jdGlvbigkZmllbGQpIHtcblx0XHR2YXIgbmFtZSA9ICRmaWVsZC5nZXRBdHRyaWJ1dGUoJ25hbWUnKTtcblx0XHRpZiAoJGZpZWxkLnZhbHVlKSB7XG5cdFx0XHRyZXNwb25zZVtuYW1lXSA9ICRmaWVsZC52YWx1ZTtcblx0XHR9XG5cdH0pO1xuXG5cdCRjdGEuaW5uZXJIVE1MID0gJ1Bvc3RpbmcuLi4nO1xuXHQkY3RhLmNsYXNzTGlzdC5hZGQoJ2J0bi0tZGlzYWJsZWQnKTtcblx0YXBpLmFkZFJlc3BvbnNlKHJlc3BvbnNlKS50aGVuKGZ1bmN0aW9uKGRhdGEpIHtcblx0XHRyZW5kZXJSZXNwb25zZXMoZGF0YS5yZXNwb25zZXMpO1xuXHRcdHNldFJlc3BvbnNlc051bWJlcihkYXRhLnJlc3BvbnNlcyk7XG5cblx0XHQvLyBTY3JvbGwgdG8gbmV3IHJlc3BvbnNlXG5cdFx0dmFyICRsYXN0UmVzcG9uc2UgPSAkcmVzcG9uc2VzTGlzdC5xdWVyeVNlbGVjdG9yKCcucmVzcG9uc2U6bGFzdC1jaGlsZCcpO1xuXHRcdHZhciBvZmZzZXQgPSBvZmZzZXRUb3AoJGxhc3RSZXNwb25zZSk7XG5cdFx0d2luZG93LnNjcm9sbFRvKDAsIG9mZnNldCAtICgwLjUgKiB3aW5kb3cuaW5uZXJIZWlnaHQpKTtcblxuXHRcdC8vIFJlc2V0IGZvcm1cblx0XHQkY3RhLmlubmVySFRNTCA9ICdSZXNwb25kJztcblx0XHRpZiAobG9nZ2VkSW4pIHtcblx0XHRcdHZhciAkdGV4dCA9ICRyZXNwb25zZUZvcm0ucXVlcnlTZWxlY3RvcignLnJlc3BvbnNlcy1mb3JtX190ZXh0Jyk7XG5cdFx0XHQkdGV4dC5jbGFzc0xpc3QuYWRkKCd2YWxpZGF0ZS0tbm90LXZhbGlkJyk7XG5cdFx0XHQkdGV4dC5jbGFzc0xpc3QucmVtb3ZlKCd2YWxpZGF0ZS0tdmFsaWQnKTtcblx0XHRcdCR0ZXh0LnF1ZXJ5U2VsZWN0b3IoJ3RleHRhcmVhJykudmFsdWUgPSAnJztcblx0XHR9IGVsc2Uge1xuXHRcdFx0JHZhbGlkYXRvcnMuZm9yRWFjaChmdW5jdGlvbigkdmFsaWRhdG9yKSB7XG5cdFx0XHRcdGlmICgkdmFsaWRhdG9yLmRhdGFzZXQudmFsaWRhdGVSZXF1aXJlZCAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0XHRcdFx0JHZhbGlkYXRvci5jbGFzc0xpc3QuYWRkKCd2YWxpZGF0ZS0tbm90LXZhbGlkJyk7XG5cdFx0XHRcdFx0JHZhbGlkYXRvci5jbGFzc0xpc3QucmVtb3ZlKCd2YWxpZGF0ZS0tdmFsaWQnKTtcblx0XHRcdFx0fVxuXHRcdFx0XHQkdmFsaWRhdG9yLnF1ZXJ5U2VsZWN0b3IoJ2lucHV0LCB0ZXh0YXJlYScpLnZhbHVlID0gJyc7XG5cdFx0XHR9KTtcblx0XHR9XG5cdH0pO1xuXG59O1xuXG4vKipcbiAqIFVwZGF0ZSBoZWFydCAobGlrZSkgaWNvbnMgdG8gaW5kaWNhdGUsIHRoYXQgdGhlIHVzZXIgaGF2ZSBsaWtlZCB0aGUgYXJ0aWNsZVxuICogQHJldHVybiB7dm9pZH1cbiAqL1xudmFyIGxpa2VkID0gZnVuY3Rpb24oKSB7XG5cdHZhciAkdG9vbFRpcEljb24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcudG9vbC10aXBfX2xpa2UtaWNvbicpO1xuXHQkdG9vbFRpcEljb24uc2V0QXR0cmlidXRlKCdzcmMnLCAnL2Fzc2V0cy9pbWFnZXMvaGVhcnQtLWludmVyc2UtLWFjdGl2ZS5zdmcnKTtcblx0JHRvb2xUaXBJY29uLnNldEF0dHJpYnV0ZSgnZGF0YS1zcmMnLCAnL2Fzc2V0cy9pbWFnZXMvaGVhcnQtLWludmVyc2UtLWFjdGl2ZS5zdmcnKTtcblxuXHR2YXIgJGZvb3Rlckljb24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucG9zdC1mb290ZXJfX2xpa2UtaWNvbicpO1xuXHQkZm9vdGVySWNvbi5zZXRBdHRyaWJ1dGUoJ3NyYycsICcvYXNzZXRzL2ltYWdlcy9oZWFydC0tYWN0aXZlLnN2ZycpO1xuXHQkZm9vdGVySWNvbi5zZXRBdHRyaWJ1dGUoJ2RhdGEtc3JjJywgJy9hc3NldHMvaW1hZ2VzL2hlYXJ0LS1hY3RpdmUuc3ZnJyk7XG5cblx0Ly8gSW5kaWNhdGVzLCB0aGF0IHRoZSBsaWtlIGJ1dHRvbiBubyBsb25nZXIgaXMgY2xpY2thYmxlXG5cdGdldEFsbCgnLnNoYXJlX19saWtlJykuZm9yRWFjaCgkbGlrZSA9PiAkbGlrZS5jbGFzc0xpc3QuYWRkKCdkaXNhYmxlZCcpKTtcbn07XG5cbi8qKlxuICogQWN0aXZhdGUgbGlrZSwgd2hlbiBsaWtlIGJ1dHRvbnMgYXJlIGNsaWNrZWRcbiAqIEBwYXJhbSAge2VsZW1lbnR9ICRhbmNob3JcbiAqIEByZXR1cm4ge3ZvaWR9XG4gKi9cbnZhciBhdHRhY2hMaWtlRXZlbnQgPSBmdW5jdGlvbigkYW5jaG9yKSB7XG5cdCRhbmNob3IuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbihlKSB7XG5cdFx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xuXG5cdFx0Ly8gQWxyZWFkeSBsaWtlZCB0aGlzIGFydGljbGVcblx0XHRpZiAobG9jYWxTdG9yYWdlLmdldEl0ZW0oJ2xpa2U6JyArIHdpbmRvdy5wb3N0SWQpKSB7XG5cdFx0XHRyZXR1cm47XG5cdFx0fVxuXG5cdFx0bG9jYWxTdG9yYWdlLnNldEl0ZW0oJ2xpa2U6JyArIHdpbmRvdy5wb3N0SWQsIHRydWUpO1xuXHRcdGxpa2VkKCk7XG5cblx0XHRhcGkubGlrZSgpLnRoZW4oZnVuY3Rpb24oZGF0YSkge1xuXHRcdFx0c2V0TGlrZXNOdW1iZXIoZGF0YS5saWtlcyk7XG5cdFx0fSk7XG5cdH0pO1xufTtcblxuLyoqXG4gKiBVcGRhdGUgcmVzcG9uc2VzIGZvcm0gaWYgdXNlciBpcyBsb2dnZWQgaW4uXG4gKiBVc2VyIGRvIG5vdCBuZWVkIHRvIGZpbGwgZS1tYWlsLCBuYW1lIGV0Yy5cbiAqIEBwYXJhbSAge29iamVjdH0gZGF0YVxuICogQHJldHVybiB7dm9pZH1cbiAqL1xudmFyIHJlbmRlclVzZXJGb3JtID0gZnVuY3Rpb24odXNlcikge1xuXHR2YXIgaHRtbCA9IHVzZXJNZXRhVGVtcGxhdGUodXNlcik7XG5cdHZhciAkbWV0YSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuXHQkbWV0YS5pbm5lckhUTUwgPSBodG1sO1xuXHR2YXIgJGhlYWRlciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5yZXNwb25zZXNfX2Zvcm0gaDMnKTtcblxuXHQvLyBGaWxsIGlucHV0IGZpZWxkcyB3aXRoIHJlbGV2YW50IGRhdGFcblx0Z2V0QWxsKCcucmVzcG9uc2VzX19mb3JtIGlucHV0JykuZm9yRWFjaChmdW5jdGlvbigkaW5wdXQpIHtcblx0XHR2YXIgbmFtZSA9ICRpbnB1dC5nZXRBdHRyaWJ1dGUoJ25hbWUnKTtcblx0XHRpZiAobmFtZSA9PT0gJ3dlYnNpdGUnKSB7XG5cdFx0XHQkaW5wdXQudmFsdWUgPSAnL2F1dGhvci8nICsgdXNlci5zbHVnO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHQkaW5wdXQudmFsdWUgPSB1c2VyW25hbWVdO1xuXHRcdH1cblx0XHQkaW5wdXQucGFyZW50Tm9kZS5jbGFzc0xpc3QuYWRkKCd2YWxpZGF0ZS0tdmFsaWQnKTtcblx0XHQkaW5wdXQucGFyZW50Tm9kZS5jbGFzc0xpc3QucmVtb3ZlKCd2YWxpZGF0ZS0tbm90LXZhbGlkJyk7XG5cdH0pO1xuXG5cdC8vIEluc2VydCBhZnRlciBoZWFkZXJcblx0JGhlYWRlci5wYXJlbnROb2RlLmluc2VydEJlZm9yZSgkbWV0YSwgJGhlYWRlci5uZXh0U2libGluZyk7XG5cdGxhenlJbWFnZXMoMSk7XG5cdHZhbGlkYXRlRm9ybSgkdmFsaWRhdG9ycywgdXBkYXRlUmVzcG9uc2VDVEEpO1xufTtcblxuLyoqXG4gKiBJbml0IHJlc3BvbnNlc1xuICogQHJldHVybiB7dm9pZH1cbiAqL1xuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24oKSB7XG5cdCRyZXNwb25zZUZvcm0gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucmVzcG9uc2VzX19mb3JtJyk7XG5cblx0aWYgKCEkcmVzcG9uc2VGb3JtKSB7XG5cdFx0cmV0dXJuO1xuXHR9XG5cblx0Ly8gQ2FjaGUgZG9tIGVsZW1lbnRzXG5cdCRjdGEgPSAkcmVzcG9uc2VGb3JtLnF1ZXJ5U2VsZWN0b3IoJy5idG4tLWN0YScpO1xuXHQkcmVzcG9uc2VzTGlzdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5yZXNwb25zZXNfX2xpc3QnKTtcblx0JHZhbGlkYXRvcnMgPSBnZXRBbGwoJy52YWxpZGF0ZScsICRyZXNwb25zZUZvcm0pO1xuXG5cdC8vIFVwZGF0ZSBmcm9tIGFzIHVzZXIgdHlwZXNcblx0bGl2ZVZhbGlkYXRpb24oJHZhbGlkYXRvcnMsIHVwZGF0ZVJlc3BvbnNlQ1RBKTtcblxuXHQvLyBSZW5kZXIgcmVzcG9uc2VzIGFuZCBsaWtlXG5cdHJlbmRlck1ldGEoKTtcblxuXHQvLyBDaGFuZ2UgZm9ybSBpZiB1c2VyIGlzIGxvZ2dlZCBpblxuXHRnZXRVc2VyRGF0YSgpLnRoZW4ocmVuZGVyVXNlckZvcm0pLmNhdGNoKGZ1bmN0aW9uKCkge30pO1xuXG5cdC8vIFVzZXIgYWxyZWFkeSBsaWtlcyB0aGlzIGFydGljbGVcblx0aWYgKGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdsaWtlOicgKyB3aW5kb3cucG9zdElkKSkge1xuXHRcdGxpa2VkKCk7XG5cdH1cblxuXHRnZXRBbGwoJy5zaGFyZV9fbGlrZScpLmZvckVhY2goYXR0YWNoTGlrZUV2ZW50KTtcblx0JGN0YS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHN1Ym1pdFJlc3BvbnNlKTtcblxuXHQvLyBTaG93IG1hcmtkb3duIGhlbHBlcnNcblx0ZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnJlc3BvbnNlLWZvcm1fX21hcmtkb3duLWV4cGFuZGVyJykuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbihlKSB7XG5cdFx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xuXHRcdGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5yZXNwb25zZS1mb3JtX19tYXJrZG93bi1oZWxwZXJzJykuY2xhc3NMaXN0LnJlbW92ZSgnaGlkZGVuJyk7XG5cdH0pO1xuXG59XG4iLCJpbXBvcnQgbGF6eUltYWdlcyBmcm9tICdkcy1hc3NldHMvbGF6eS9pbWFnZXMnO1xuaW1wb3J0IGdldEFsbCBmcm9tICdkcy1hc3NldHMvZG9tL2dldC1hbGwnO1xuaW1wb3J0ICogYXMgYXBpIGZyb20gJy4uL2xpYi9hcGknO1xuaW1wb3J0IHBvc3RUZW1wbGF0ZSBmcm9tICcuLi90ZW1wbGF0ZXMvcG9zdCc7XG5pbXBvcnQgYXV0aG9yVGVtcGxhdGUgZnJvbSAnLi4vdGVtcGxhdGVzL2F1dGhvcic7XG5pbXBvcnQgdGFnVGVtcGxhdGUgZnJvbSAnLi4vdGVtcGxhdGVzL3RhZyc7XG5cbmNvbnN0IE1BWF9SRVNVTFRTID0gMTA7XG5cbnZhciAkc2VhcmNoSW5wdXQ7XG52YXIgJHNlYXJjaExpc3Q7XG52YXIgbGF0ZXN0Q291bnRlciA9IDA7XG5cbnZhciBnZXRTZWFyY2hSZXN1bHQgPSBmdW5jdGlvbihwYXRoKSB7XG5cdHZhciBhYnNvbHV0ZSA9IHdpbmRvdy5naG9zdC51cmwuYXBpKHBhdGgsIHtcblx0XHRpbmNsdWRlOiAndGFncyxhdXRob3IsY291bnQucG9zdHMnXG5cdH0pO1xuXHR2YXIgcmVsYXRpdmUgPSBhYnNvbHV0ZS5zdWJzdHIoYWJzb2x1dGUuaW5kZXhPZignL2dob3N0JyksIGFic29sdXRlLmxlbmd0aCk7XG5cdHJldHVybiBmZXRjaChyZWxhdGl2ZSlcblx0XHQudGhlbihmdW5jdGlvbihyZXNwb25zZSkge1xuXHRcdFx0aWYgKHJlc3BvbnNlLnN0YXR1cyA+PSAzMDApIHtcblx0XHRcdFx0cmV0dXJuIFByb21pc2UucmVqZWN0KHJlc3BvbnNlKTtcblx0XHRcdH1cblx0XHRcdHJldHVybiByZXNwb25zZTtcblx0XHR9KVxuXHRcdC50aGVuKHJlc3BvbnNlID0+IHJlc3BvbnNlLmpzb24oKSk7XG59O1xuXG52YXIgcmVuZGVyUmVzdWx0cyA9IGZ1bmN0aW9uKHJlc3VsdHMpIHtcblx0dmFyIGh0bWwgPSByZXN1bHRzLm1hcChmdW5jdGlvbihyZXN1bHQpIHtcblx0XHRpZiAocmVzdWx0LnBvc3RzKSB7XG5cdFx0XHRyZXR1cm4gcG9zdFRlbXBsYXRlKHJlc3VsdC5wb3N0c1swXSk7XG5cdFx0fVxuXHRcdGlmIChyZXN1bHQudXNlcnMpIHtcblx0XHRcdHJldHVybiBhdXRob3JUZW1wbGF0ZShyZXN1bHQudXNlcnNbMF0pO1xuXHRcdH1cblx0XHRpZiAocmVzdWx0LnRhZ3MpIHtcblx0XHRcdHJldHVybiB0YWdUZW1wbGF0ZShyZXN1bHQudGFnc1swXSk7XG5cdFx0fVxuXHRcdHJldHVybiAnJztcblx0fSkuam9pbignJyk7XG5cdCRzZWFyY2hMaXN0LmlubmVySFRNTCA9IGh0bWw7XG5cdGxhenlJbWFnZXMoMSk7XG5cdGdldEFsbCgnLmJveGVzX19pdGVtJywgJHNlYXJjaExpc3QpLmZvckVhY2goZnVuY3Rpb24oJGJveEl0ZW0sIGkpIHtcblx0XHRzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xuXHRcdFx0JGJveEl0ZW0uY2xhc3NMaXN0LnJlbW92ZSgnaGlkZGVuJyk7XG5cdFx0XHRzZXRUaW1lb3V0KCgpID0+ICRib3hJdGVtLmNsYXNzTGlzdC5hZGQoJ2FuaW1hdGUtLWFjdGl2ZScpLCAwKTtcblx0XHR9LCBpICogNTAwKTtcblx0fSk7XG59O1xuXG52YXIgc2VhcmNoID0gZnVuY3Rpb24ocXVlcnkpIHtcblxuXHR2YXIgaWQgPSArK2xhdGVzdENvdW50ZXI7XG5cdHZhciBtaW5UaW1lID0gRGF0ZS5ub3coKSArIDMwMDtcblxuXHQkc2VhcmNoTGlzdC5pbm5lckhUTUwgPSAnJztcblxuXHR2YXIgaXNMYXRlc3QgPSBmdW5jdGlvbihkYXRhKSB7XG5cdFx0aWYgKGlkICE9PSBsYXRlc3RDb3VudGVyKSB7XG5cdFx0XHRyZXR1cm4gUHJvbWlzZS5yZWplY3QoKTtcblx0XHR9XG5cdFx0cmV0dXJuIGRhdGE7XG5cdH07XG5cblx0YXBpLmdldFNlYXJjaEluZGV4KHF1ZXJ5KVxuXHRcdC50aGVuKGlzTGF0ZXN0KVxuXHRcdC50aGVuKGZ1bmN0aW9uKGluZGV4ZXMpIHtcblx0XHRcdHZhciBwcm9taXNlcyA9IGluZGV4ZXMuc2xpY2UoMCwgTUFYX1JFU1VMVFMpLm1hcChmdW5jdGlvbihpbmRleCkge1xuXHRcdFx0XHRyZXR1cm4gZ2V0U2VhcmNoUmVzdWx0KGluZGV4LnJlZik7XG5cdFx0XHR9KTtcblx0XHRcdHJldHVybiBQcm9taXNlLmFsbChwcm9taXNlcyk7XG5cdFx0fSlcblx0XHQudGhlbihmdW5jdGlvbihkYXRhKSB7XG5cdFx0XHRpZiAobWluVGltZSA8IERhdGUubm93KCkpIHtcblx0XHRcdFx0cmV0dXJuIGRhdGE7XG5cdFx0XHR9XG5cdFx0XHRyZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24ocmVzb2x2ZSkge1xuXHRcdFx0XHRzZXRUaW1lb3V0KCgpID0+IHJlc29sdmUoZGF0YSksIG1pblRpbWUgLSBEYXRlLm5vdygpKTtcblx0XHRcdH0pO1xuXHRcdH0pXG5cdFx0LnRoZW4oaXNMYXRlc3QpXG5cdFx0LnRoZW4ocmVuZGVyUmVzdWx0cylcblx0XHQuY2F0Y2goZnVuY3Rpb24oZXJyKSB7XG5cdFx0XHRpZiAoZXJyKSB7XG5cdFx0XHRcdGNvbnNvbGUuZXJyb3IoZXJyKTtcblx0XHRcdH1cblx0XHR9KTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uKCkge1xuXG5cdCRzZWFyY2hJbnB1dCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5zZWFyY2hfX2lucHV0Jyk7XG5cdCRzZWFyY2hMaXN0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnNlYXJjaF9fbGlzdCcpO1xuXG5cdGlmICghJHNlYXJjaElucHV0IHx8ICEkc2VhcmNoTGlzdCkge1xuXHRcdHJldHVybjtcblx0fVxuXHQkc2VhcmNoSW5wdXQuYWRkRXZlbnRMaXN0ZW5lcignaW5wdXQnLCBmdW5jdGlvbigpIHtcblx0XHRzZWFyY2goJHNlYXJjaElucHV0LnZhbHVlKTtcblx0fSk7XG5cblx0JHNlYXJjaElucHV0LmZvY3VzKCk7XG5cblx0JHNlYXJjaExpc3Quc2V0QXR0cmlidXRlKCdzdHlsZScsIGBtaW4taGVpZ2h0OiAke3dpbmRvdy5pbm5lckhlaWdodH1weGApO1xuXG59XG4iLCIvKipcbiAqIFRvb2wgdGlwIHNob3dlZCB3aGVuIHVzZXIgbWFya3MgdGV4dCBpbiBhcnRpY2xlLlxuICogVGhpcyBtYWtlcyB0aGUgdXNlIGFibGUgdG8gc2hhcmUvY29tbWVudCBvbiB0aGUgbWFya2VkLlxuICovXG5cbmltcG9ydCB2YWxpZGF0ZUZvcm0gZnJvbSAnLi4vbGliL2Zvcm0vdmFsaWRhdGUnO1xuaW1wb3J0IGdldEFsbCBmcm9tICdkcy1hc3NldHMvZG9tL2dldC1hbGwnO1xuXG4vLyBDYWNoZWQgZG9tIGVsZW1lbnRzXG52YXIgJHBvc3RDb250ZW50O1xudmFyICR0b29sVGlwO1xudmFyICR0d2l0dGVyO1xudmFyICRyZXNwb25zZUZvcm07XG52YXIgJGN0YTtcblxuXG4vKipcbiAqIEdldCB0aGUgdGV4dCBzZWxlY3RlZCBieSB0aGUgdXNlclxuICogQHJldHVybiB7c3RyaW5nfVxuICovXG52YXIgZ2V0U2VsZWN0ZWRUZXh0ID0gZnVuY3Rpb24oKSB7XG5cdHZhciB0ZXh0ID0gJyc7XG5cdGlmICh0eXBlb2Ygd2luZG93LmdldFNlbGVjdGlvbiAhPT0gJ3VuZGVmaW5lZCcpIHtcblx0XHR0ZXh0ID0gd2luZG93LmdldFNlbGVjdGlvbigpLnRvU3RyaW5nKCk7XG5cdH0gZWxzZSBpZiAodHlwZW9mIGRvY3VtZW50LnNlbGVjdGlvbiAhPT0gJ3VuZGVmaW5lZCcgJiYgZG9jdW1lbnQuc2VsZWN0aW9uLnR5cGUgPT09ICdUZXh0Jykge1xuXHRcdHRleHQgPSBkb2N1bWVudC5zZWxlY3Rpb24uY3JlYXRlUmFuZ2UoKS50ZXh0O1xuXHR9XG5cdHJldHVybiB0ZXh0O1xufTtcblxuLyoqXG4gKiBDaGVjayBpZiB0aGUgc2VsZWN0ZWQgdGV4dCBpcyBpbnNpZGUgdGhlIGNvbnRlbnQgY29udGFpbmVyXG4gKiBAcGFyYW0gIHtvYmplY3R9ICBzZWxlY3Rpb25cbiAqIEByZXR1cm4ge0Jvb2xlYW59XG4gKi9cbnZhciBpc0luc2lkZUNvbnRlbnQgPSBmdW5jdGlvbihzZWxlY3Rpb24pIHtcblx0dmFyICRjb250YWluZXIgPSBzZWxlY3Rpb24uYW5jaG9yTm9kZS5wYXJlbnRFbGVtZW50O1xuXG5cdHdoaWxlICgkY29udGFpbmVyICE9PSAkcG9zdENvbnRlbnQgJiYgJGNvbnRhaW5lci5wYXJlbnROb2RlKSB7XG5cdFx0JGNvbnRhaW5lciA9ICRjb250YWluZXIucGFyZW50Tm9kZTtcblx0fVxuXG5cdHJldHVybiAoJGNvbnRhaW5lciA9PT0gJHBvc3RDb250ZW50KTtcblxufTtcblxuLyoqXG4gKiBQbGFjZXMgdGhlIHRvb2wgdGlwIGFib3ZlIHRoZSBzZWxlY3RlZCB0ZXh0XG4gKiBAcmV0dXJuIHt2b2lkfVxuICovXG52YXIgcGxhY2VUb29sVGlwID0gZnVuY3Rpb24oKSB7XG5cblx0Ly8gVGltZW91dCB0byBtYWtlIHN1cmUgdGhlIHRleHQgaGFzIGJlZW4gc2VsZWN0ZWRcblx0c2V0VGltZW91dChmdW5jdGlvbigpIHtcblxuXHRcdHZhciBoaWdobGlnaHRlZFRleHQgPSBnZXRTZWxlY3RlZFRleHQoKTtcblxuXHRcdC8vIEhpZGUgdG9vbCB0aXAgaWYgbm90aGluZyBpcyBzZWxlY3RlZFxuXHRcdGlmICghaGlnaGxpZ2h0ZWRUZXh0KSB7XG5cdFx0XHQkdG9vbFRpcC5jbGFzc0xpc3QucmVtb3ZlKCd0b29sLXRpcC0tdmlzaWJsZScpO1xuXHRcdFx0cmV0dXJuO1xuXHRcdH1cblxuXHRcdC8vIERpc3BsYXkgdG9vbCB0aXAgaWYgc2VsZWN0aW9uIGlzIGluc2lkZSB0aGUgY29udGVudCBjb250YWluZXJcblx0XHR2YXIgc2VsZWN0aW9uID0gd2luZG93LmdldFNlbGVjdGlvbigpO1xuXHRcdGlmICghaXNJbnNpZGVDb250ZW50KHNlbGVjdGlvbikpIHtcblx0XHRcdCR0b29sVGlwLmNsYXNzTGlzdC5yZW1vdmUoJ3Rvb2wtdGlwLS12aXNpYmxlJyk7XG5cdFx0XHRyZXR1cm47XG5cdFx0fVxuXG5cdFx0Ly8gQ2hhbmdlIGNvbnRleHR1YWwgYWN0aW9uc1xuXHRcdCR0d2l0dGVyLnNldEF0dHJpYnV0ZSgnaHJlZicsIGBodHRwczovL3R3aXR0ZXIuY29tL2ludGVudC90d2VldD90ZXh0PSR7ZW5jb2RlVVJJQ29tcG9uZW50KCdcIicgKyBoaWdobGlnaHRlZFRleHQgKyAnXCIgLSAnICsgJHR3aXR0ZXIuZGF0YXNldC51cmwpfWApO1xuXG5cdFx0Ly8gU2hvdyBhbmQgcGxhY2UgdG9vbCB0aXBcblx0XHR2YXIgc2Nyb2xsUG9zaXRpb24gPSAod2luZG93LnNjcm9sbFkgfHwgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LnNjcm9sbFRvcCk7XG5cdFx0dmFyIHJhbmdlID0gc2VsZWN0aW9uLmdldFJhbmdlQXQoMCk7XG5cdFx0dmFyIHJlY3QgPSByYW5nZS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcblx0XHQkdG9vbFRpcC5zdHlsZS50b3AgPSAocmVjdC50b3AgKyBzY3JvbGxQb3NpdGlvbikgKyAncHgnO1xuXHRcdCR0b29sVGlwLmNsYXNzTGlzdC5hZGQoJ3Rvb2wtdGlwLS12aXNpYmxlJyk7XG5cdFx0JHRvb2xUaXAuc3R5bGUubGVmdCA9ICgwLjUgKiByZWN0LmxlZnQgKyAwLjUgKiByZWN0LnJpZ2h0IC0gMC41ICogJHRvb2xUaXAuY2xpZW50V2lkdGgpICsgJ3B4Jztcblx0fSwgMTApO1xufTtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24oKSB7XG5cdCRwb3N0Q29udGVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5jb250ZW50Jyk7XG5cdCR0b29sVGlwID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnRvb2wtdGlwJyk7XG5cblx0aWYgKCEkcG9zdENvbnRlbnQgfHwgISR0b29sVGlwKSB7XG5cdFx0cmV0dXJuO1xuXHR9XG5cblx0JHJlc3BvbnNlRm9ybSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5yZXNwb25zZXNfX2Zvcm0nKTtcblx0JGN0YSA9ICRyZXNwb25zZUZvcm0ucXVlcnlTZWxlY3RvcignLmJ0bi0tY3RhJyk7XG5cblx0JHR3aXR0ZXIgPSAkdG9vbFRpcC5xdWVyeVNlbGVjdG9yKCcudG9vbC10aXBfX3R3aXR0ZXInKTtcblxuXHRkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdtb3VzZXVwJywgcGxhY2VUb29sVGlwKTtcblx0ZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcigna2V5dXAnLCBwbGFjZVRvb2xUaXApO1xuXG5cdC8vIEZpbGwgZm9ybSB3aXRoIHNlbGVjdGVkIHRleHQgdG8gbWFrZSBhIHF1aWNrIHJlc3BvbnNlIG9uIHRoZSBhcnRpY2xlIGJ5XG5cdC8vIHRoZSB1c2VyXG5cdHZhciAkcmVzcG9uc2VUZXh0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnJlc3BvbnNlc19fZm9ybSB0ZXh0YXJlYScpO1xuXHQkdG9vbFRpcC5xdWVyeVNlbGVjdG9yKCcudG9vbC10aXBfX3Jlc3BvbnNlJykuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbihlKSB7XG5cdFx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xuXHRcdHZhciBoaWdobGlnaHRlZFRleHQgPSBnZXRTZWxlY3RlZFRleHQoKTtcblx0XHQkcmVzcG9uc2VUZXh0LnZhbHVlID0gYD4gJHtoaWdobGlnaHRlZFRleHR9XG5cbmA7XG5cdFx0JHJlc3BvbnNlVGV4dC5mb2N1cygpO1xuXHRcdCRyZXNwb25zZVRleHQucGFyZW50Tm9kZS5jbGFzc0xpc3QuYWRkKCd2YWxpZGF0ZS0tdmFsaWQnKTtcblx0XHQkcmVzcG9uc2VUZXh0LnBhcmVudE5vZGUuY2xhc3NMaXN0LnJlbW92ZSgndmFsaWRhdGUtLW5vdC12YWxpZCcpO1xuXHRcdHZhciB2YWxpZCA9IHZhbGlkYXRlRm9ybShnZXRBbGwoJy52YWxpZGF0ZScsICRyZXNwb25zZUZvcm0pKTtcblx0XHRpZiAodmFsaWQpIHtcblx0XHRcdCRjdGEuY2xhc3NMaXN0LnJlbW92ZSgnYnRuLS1kaXNhYmxlZCcpO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHQkY3RhLmNsYXNzTGlzdC5hZGQoJ2J0bi0tZGlzYWJsZWQnKTtcblx0XHR9XG5cdH0pO1xufVxuIiwiLyoqXG4gKiBIZWxwZXJzIGZvciBjb21tdW5pY2F0aW5nIHdpdGggdGhlIG1ldGEgYXBpIGhvbGRpbmcgcmVzcG9uc2VzIGFuZCBsaWtlcyBmb3JcbiAqIHRoZSBhcnRpY2xlcy5cbiAqL1xuXG52YXIgYXBpVXJsID0gd2luZG93LmFwaVVSTDtcbnZhciBpZCA9IHdpbmRvdy5wb3N0SWQ7XG5cbi8qKlxuICogTWFrZSBhIEFKQVggY2FsbCB0byB0aGUgYXBpXG4gKiBAcGFyYW0gIHtTdHJpbmd9IHBhdGhcbiAqIEBwYXJhbSAge1N0cmluZ30gbWV0aG9kXG4gKiBAcGFyYW0gIHtvYmplY3R9IGRhdGFcbiAqIEByZXR1cm4ge1Byb21pc2V9XG4gKi9cbnZhciByZXF1ZXN0ID0gZnVuY3Rpb24ocGF0aCA9ICcnLCBtZXRob2QgPSAnR0VUJywgZGF0YSA9IG51bGwpIHtcblxuICB2YXIgZmV0Y2hPcHRpb25zID0ge1xuICAgIG1ldGhvZCxcbiAgICBoZWFkZXJzOiB7XG4gICAgICAnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL2pzb247IGNoYXJzZXQ9dXRmLTgnXG4gICAgfVxuICB9O1xuXG4gIGlmIChkYXRhKSB7XG4gICAgZmV0Y2hPcHRpb25zLmJvZHkgPSBKU09OLnN0cmluZ2lmeShkYXRhKTtcbiAgfVxuXG4gIC8vIFBlcmZvcm0gdGhlIGFqYXggY2FsbFxuICByZXR1cm4gZmV0Y2goYXBpVXJsICsgcGF0aCwgZmV0Y2hPcHRpb25zKVxuICAgIC50aGVuKGZ1bmN0aW9uKHJlc3BvbnNlKSB7XG4gICAgICBpZiAocmVzcG9uc2Uuc3RhdHVzID49IDMwMCkge1xuICAgICAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QocmVzcG9uc2UpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHJlc3BvbnNlO1xuICAgIH0pXG4gICAgLnRoZW4ocmVzcG9uc2UgPT4gcmVzcG9uc2UuanNvbigpKTtcbn07XG5cbi8qKlxuICogR2V0IG1ldGEgZGF0YSBmcm9tIHRoZSBhcnRpY2xlLiBJZiBubyBtZXRhIGRhdGEgaXMgcHJlc2VudCBmb3IgdGhlIGFjdHVhbFxuICogYXJ0aWNsZSBhbmQgbmV3IGVudHJ5IHdpbGwgYmUgbWFkZS5cbiAqIEBwYXJhbSAge2Jvb2xlYW59IHJhdyBXaGV0aGVyIHRvIGluY2x1ZGUgY29tcHV0ZWQgZmllbGRzXG4gKiBAcmV0dXJuIHtQcm9taXNlfVxuICovXG5leHBvcnQgdmFyIGdldE1ldGEgPSBmdW5jdGlvbihyYXcpIHtcbiAgdmFyIHF1ZXJ5ID0gJz9pZD0nICsgaWQ7XG4gIGlmIChyYXcpIHtcbiAgICBxdWVyeSArPSAnJnJhdyc7XG4gIH1cbiAgcmV0dXJuIHJlcXVlc3QocXVlcnkpXG4gICAgLmNhdGNoKGZ1bmN0aW9uKCkge1xuICAgICAgcmV0dXJuIHJlcXVlc3QoJycsICdQT1NUJywge1xuICAgICAgICByZXNwb25zZXM6IFtdLFxuICAgICAgICBsaWtlczogMCxcbiAgICAgICAgaWRcbiAgICAgIH0pO1xuICAgIH0pO1xufTtcblxuZXhwb3J0IHZhciBnZXRTZWFyY2hJbmRleCA9IGZ1bmN0aW9uKHF1ZXJ5KSB7XG4gIHJldHVybiByZXF1ZXN0KCdzZWFyY2g/cT0nICsgcXVlcnkpO1xufTtcblxuLyoqXG4gKiBJbmNyZW1lbnQgdGhlIGxpa2UgdmFsdWUgd2l0aCBvbmVcbiAqIEByZXR1cm4ge1Byb21pc2V9XG4gKi9cbmV4cG9ydCB2YXIgbGlrZSA9IGZ1bmN0aW9uKCkge1xuICByZXR1cm4gZ2V0TWV0YShpZCwgdHJ1ZSlcbiAgICAudGhlbihmdW5jdGlvbihkYXRhKSB7XG4gICAgICByZXR1cm4gcmVxdWVzdCgnP2lkPScgKyBpZCwgJ1BVVCcsIHtcbiAgICAgICAgbGlrZXM6IGRhdGEubGlrZXMgKyAxXG4gICAgICB9KTtcbiAgICB9KTtcbn07XG5cbi8qKlxuICogVXBkYXRlIGF1dGhvciBlbWFpbCB1c2VkIHRvIHNlbmQgZS1tYWlscyB3aGVuIGEgcmVzcG9uc2UgaSByZWNlaXZlZC5cbiAqIEByZXR1cm4ge1Byb21pc2V9XG4gKi9cbmV4cG9ydCB2YXIgdXBkYXRlQXV0aG9yRW1haWwgPSBmdW5jdGlvbihhdXRob3JFbWFpbCkge1xuICBpZiAoIWlkKSB7XG4gICAgcmV0dXJuIFByb21pc2UucmVqZWN0KG5ldyBFcnJvcignTm8gcG9zdElkJykpO1xuICB9XG4gIHJldHVybiByZXF1ZXN0KCc/aWQ9JyArIGlkLCAnUFVUJywge1xuICAgIGF1dGhvckVtYWlsXG4gIH0pO1xufTtcblxuLyoqXG4gKiBBZGQgYSByZXNwb25zZVxuICogQHBhcmFtIHtvYmplY3R9IHJlc3BvbnNlXG4gKiBAcmV0dXJuIHtQcm9taXNlfVxuICovXG5leHBvcnQgdmFyIGFkZFJlc3BvbnNlID0gZnVuY3Rpb24ocmVzcG9uc2UpIHtcbiAgcmV0dXJuIGdldE1ldGEodHJ1ZSlcbiAgICAudGhlbihmdW5jdGlvbihkYXRhKSB7XG5cbiAgICAgIC8vIFNldCB0aGUgcHVibGlzaCBkYXRhIHRvIG5vd1xuICAgICAgcmVzcG9uc2UucHVibGlzaGVkID0gbmV3IERhdGUoKS50b0lTT1N0cmluZygpO1xuXG4gICAgICAvLyBVcGRhdGUgdGhlIHJlc3BvbnNlcyBsaXN0XG4gICAgICBkYXRhLnJlc3BvbnNlcy5wdXNoKHJlc3BvbnNlKTtcbiAgICAgIHJldHVybiByZXF1ZXN0KCc/aWQ9JyArIGlkLCAnUFVUJywge1xuICAgICAgICByZXNwb25zZXM6IGRhdGEucmVzcG9uc2VzXG4gICAgICB9KTtcbiAgICB9KTtcbn07XG5cbi8qKlxuICogUmVtb3ZlIGEgcmVzcG9uc2VcbiAqIEBwYXJhbSAge3N0cmluZ30gcHVibGlzaGVkXG4gKiBAcGFyYW0gIHtzdHJpbmd9IG5hbWVcbiAqIEByZXR1cm4ge1Byb21pc2V9XG4gKi9cbmV4cG9ydCB2YXIgcmVtb3ZlUmVzcG9uc2UgPSBmdW5jdGlvbihwdWJsaXNoZWQsIG5hbWUpIHtcbiAgcmV0dXJuIGdldE1ldGEodHJ1ZSlcbiAgICAudGhlbihmdW5jdGlvbihkYXRhKSB7XG5cbiAgICAgIC8vIFJlbW92ZSByZXNwb3NlIHdoaWNoIG1hdGNoZXMgb24gcHVibGlzaCBkYXRlIGFuZCBhdXRob3IgbmFtZVxuICAgICAgdmFyIHJlc3BvbnNlcyA9IGRhdGEucmVzcG9uc2VzLmZpbHRlcihmdW5jdGlvbihyZXNwb25zZSkge1xuICAgICAgICByZXR1cm4gKHJlc3BvbnNlLnB1Ymxpc2hlZCAhPT0gcHVibGlzaGVkIHx8IHJlc3BvbnNlLm5hbWUgIT09IG5hbWUpO1xuICAgICAgfSk7XG5cbiAgICAgIHJldHVybiByZXF1ZXN0KCc/aWQ9JyArIGlkLCAnUFVUJywge1xuICAgICAgICByZXNwb25zZXNcbiAgICAgIH0pO1xuICAgIH0pO1xufTtcbiIsIi8qKlxuICogVmFsaWRhdGUgaW5wdXQgZmllbGRzIGFzIHVzZXIgdHlwZXNcbiAqL1xuXG4vLyBEZXBlbmRlbmNpZXNcbmltcG9ydCB2YWxpZGF0ZUZvcm0gZnJvbSAnLi92YWxpZGF0ZSc7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uKCR2YWxpZGF0b3JzLCBjYWxsYmFjaykge1xuXHQkdmFsaWRhdG9ycy5mb3JFYWNoKGZ1bmN0aW9uKCR2YWxpZGF0ZUNvbnRhaW5lcikge1xuXHRcdHZhciAkdmFsaWRhdGVGaWVsZCA9ICR2YWxpZGF0ZUNvbnRhaW5lci5xdWVyeVNlbGVjdG9yKCdpbnB1dCwgdGV4dGFyZWEnKTtcblxuXHRcdCR2YWxpZGF0ZUZpZWxkLmFkZEV2ZW50TGlzdGVuZXIoJ2lucHV0JywgZnVuY3Rpb24oKSB7XG5cdFx0XHR2YXIgdmFsaWQgPSB2YWxpZGF0ZUZvcm0oJHZhbGlkYXRvcnMpO1xuXHRcdFx0Y2FsbGJhY2sodmFsaWQpO1xuXHRcdH0pO1xuXHR9KTtcbn1cbiIsIi8qKlxuICogQ2hlY2sgaWYgdGhlIGZvcm0gaXMgdmFsaWRcbiAqL1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbigkdmFsaWRhdG9ycykge1xuXHR2YXIgbm90VmFsaWQgPSAkdmFsaWRhdG9ycy5zb21lKGZ1bmN0aW9uKCR2YWxpZGF0b3IpIHtcblx0XHRpZiAoJHZhbGlkYXRvci5kYXRhc2V0LnZhbGlkYXRlUmVxdWlyZWQgIT09IHVuZGVmaW5lZCkge1xuXHRcdFx0cmV0dXJuICEkdmFsaWRhdG9yLmNsYXNzTGlzdC5jb250YWlucygndmFsaWRhdGUtLXZhbGlkJyk7XG5cdFx0fSBlbHNlIHtcblx0XHRcdHJldHVybiAkdmFsaWRhdG9yLmNsYXNzTGlzdC5jb250YWlucygndmFsaWRhdGUtLW5vdC12YWxpZCcpO1xuXHRcdH1cblx0fSk7XG5cblx0cmV0dXJuICFub3RWYWxpZDtcbn1cbiIsIi8qKlxuICogQ2hlY2sgaWYgdXNlciBpcyBsb2dnZWQgaW4gdXNpbmcgdGhlIGdob3N0IHNlc3Npb24uIElmIGxvZ2dlZCBpbiBnZXQgdXNlclxuICogZGF0YS5cbiAqL1xuXG4vLyBDYWNoZWQgcHJvbWlzZVxudmFyIGRhdGFQcm9taXNlO1xuXG4vKipcbiAqIEdldCB0aGUgZGF0YSBmb3IgdGhlIGxvZ2dlZCBpbiB1c2VkXG4gKiBAcGFyYW0gIHtzdHJpbmd9IHRva2VuXG4gKiBAcmV0dXJuIHtQcm9taXNlfVxuICovXG52YXIgZ2V0VXNlckRhdGEgPSBmdW5jdGlvbih0b2tlbikge1xuXHRyZXR1cm4gZmV0Y2goJy9naG9zdC9hcGkvdjAuMS91c2Vycy9tZS8/aW5jbHVkZT1yb2xlcyZzdGF0dXM9YWxsJywge1xuXHRcdG1ldGhvZDogJ0dFVCcsXG5cdFx0aGVhZGVyczoge1xuXHRcdFx0J0F1dGhvcml6YXRpb24nOiAnQmVhcmVyICcgKyB0b2tlblxuXHRcdH1cblx0fSkudGhlbihmdW5jdGlvbihyZXNwb25zZSkge1xuXHRcdGlmIChyZXNwb25zZS5zdGF0dXMgIT09IDIwMCkge1xuXHRcdFx0cmV0dXJuIFByb21pc2UucmVqZWN0KCdPbGQgc2Vzc2lvbicpO1xuXHRcdH1cblx0XHRyZXR1cm4gcmVzcG9uc2UuanNvbigpO1xuXHR9KS50aGVuKGZ1bmN0aW9uKGRhdGEpIHtcblx0XHRyZXR1cm4gZGF0YS51c2Vyc1swXTtcblx0fSk7XG59O1xuXG4vKipcbiAqIENoZWNrIGlmIHRoZXJlIGlzIGEgR2hvc3Qgc2Vzc2lvbi4gSWYgc28gdXNlIGl0IHRvIGdldCB0aGUgdXNlcnMgZGF0YS5cbiAqIEByZXR1cm4ge1Byb21pc2V9XG4gKi9cbnZhciBnZXQgPSBmdW5jdGlvbigpIHtcblxuXHQvLyBHaG9zdCBzdG9yZXMgaXQgc2Vzc2lvbiBpbiBsb2NhbFN0b3JhZ2Vcblx0dmFyIHNlc3Npb25TdHJpbmcgPSBsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnZ2hvc3Q6c2Vzc2lvbicpO1xuXHRpZiAoIXNlc3Npb25TdHJpbmcpIHtcblx0XHRyZXR1cm4gUHJvbWlzZS5yZWplY3QoJ05vIHNlc3Npb24nKTtcblx0fVxuXG5cdC8vIFZhbGlkIHNlc3Npb24/XG5cdHZhciBzZXNzaW9uID0gSlNPTi5wYXJzZShzZXNzaW9uU3RyaW5nKTtcblx0aWYgKCFzZXNzaW9uIHx8ICFzZXNzaW9uLmF1dGhlbnRpY2F0ZWQgfHwgIXNlc3Npb24uYXV0aGVudGljYXRlZC5hY2Nlc3NfdG9rZW4pIHtcblx0XHRyZXR1cm4gUHJvbWlzZS5yZWplY3QoJ05vIHNlc3Npb24nKTtcblx0fVxuXG5cdC8vIFNlc3Npb24gZXhwaXJlZD9cblx0aWYgKHNlc3Npb24uYXV0aGVudGljYXRlZC5leHBpcmVzX2F0IDwgRGF0ZS5ub3coKSkge1xuXHRcdHJldHVybiBQcm9taXNlLnJlamVjdCgnU2Vzc2lvbiBleHBpcmVkJyk7XG5cdH1cblxuXHRyZXR1cm4gZ2V0VXNlckRhdGEoc2Vzc2lvbi5hdXRoZW50aWNhdGVkLmFjY2Vzc190b2tlbik7XG5cbn07XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uKCkge1xuXG5cdC8vIFJldHVybiBjYWNoZWQgcHJvbWlzZSBpZiBhbHJlYWR5IGNhbGxlZFxuXHRpZiAoIWRhdGFQcm9taXNlKSB7XG5cdFx0ZGF0YVByb21pc2UgPSBnZXQoKTtcblx0fVxuXHRyZXR1cm4gZGF0YVByb21pc2U7XG59XG4iLCIvKipcbiAqIEVuY29kZSBhIHN0cmluZ1xuICogQHBhcmFtICB7c3RyaW5nfSBzdHJpbmdcbiAqIEByZXR1cm4ge3N0cmluZ31cbiAqL1xuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24oc3RyaW5nKSB7XG5cdHZhciBodG1sRW5jb2RlZFZhbHVlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2JykuYXBwZW5kQ2hpbGQoXG5cdFx0ZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoc3RyaW5nKSkucGFyZW50Tm9kZS5pbm5lckhUTUw7XG5cdHJldHVybiBodG1sRW5jb2RlZFZhbHVlLnJlcGxhY2UoL1xccj9cXG4vZywgJzxicj4nKTtcbn1cbiIsImltcG9ydCBnZXRBbGwgZnJvbSAnZHMtYXNzZXRzL2RvbS9nZXQtYWxsJztcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihyYXcpIHtcblx0dmFyICRjb250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcblx0JGNvbnRhaW5lci5pbm5lckhUTUwgPSByYXc7XG5cdGdldEFsbCgnaW1nJywgJGNvbnRhaW5lcikuZm9yRWFjaChmdW5jdGlvbigkaW1nKSB7XG5cdFx0dmFyICRpbWdXcmFwcGVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG5cdFx0JGltZ1dyYXBwZXIuY2xhc3NMaXN0LmFkZCgnaW1nLXdyYXBwZXInKTtcblx0XHQkaW1nV3JhcHBlci5pbm5lckhUTUwgPSAnPGRpdiBjbGFzcz1cImltZy1jb250YWluZXJcIj48aW1nPjwvZGl2Pic7XG5cdFx0dmFyIHNyYyA9ICRpbWcuZ2V0QXR0cmlidXRlKCdzcmMnKTtcblx0XHR2YXIgYWx0ID0gJGltZy5nZXRBdHRyaWJ1dGUoJ2FsdCcpO1xuXHRcdHZhciBwYWRkaW5nID0gNTA7XG5cblx0XHQvLyBMYXp5IGxvYWQgYWxsIGJ1dCB0aGUgZmlyc3QgaW1hZ2Vcblx0XHR2YXIgJG5ld0ltZyA9ICRpbWdXcmFwcGVyLnF1ZXJ5U2VsZWN0b3IoJ2ltZycpO1xuXG5cdFx0JG5ld0ltZy5zZXRBdHRyaWJ1dGUoJ2RhdGEtc3JjJywgc3JjKTtcblx0XHQkbmV3SW1nLnNldEF0dHJpYnV0ZSgnY2xhc3MnLCAnbGF6eS1pbWFnZScpO1xuXG5cdFx0YWx0LnNwbGl0KCc7JykuZm9yRWFjaChmdW5jdGlvbihzdHIpIHtcblx0XHRcdGlmIChzdHIgPT09ICdmdWxsLXNpemUnIHx8IHN0ciA9PT0gJ2Z1bGwtd2lkdGgnKSB7XG5cdFx0XHRcdCRpbWdXcmFwcGVyLmNsYXNzTGlzdC5hZGQoJ2Z1bGwtd2lkdGgnKTtcblx0XHRcdH0gZWxzZSBpZiAoc3RyLmluZGV4T2YoJ3JhdGlvPScpID09PSAwKSB7XG5cdFx0XHRcdHZhciByYXRpbyA9IHN0ci5yZXBsYWNlKCdyYXRpbz0nLCAnJyk7XG5cdFx0XHRcdGlmIChyYXRpby5pbmRleE9mKCc6JykpIHtcblx0XHRcdFx0XHR2YXIgZGltZW5zaW9ucyA9IHJhdGlvLnNwbGl0KCc6Jyk7XG5cdFx0XHRcdFx0cmF0aW8gPSBkaW1lbnNpb25zWzBdIC8gZGltZW5zaW9uc1sxXTtcblx0XHRcdFx0fVxuXHRcdFx0XHRwYWRkaW5nID0gMTAwIC8gcmF0aW87XG5cdFx0XHR9IGVsc2UgaWYgKHN0ciA9PT0gJ2JvcmRlcnMnKSB7XG5cdFx0XHRcdCRpbWdXcmFwcGVyLnF1ZXJ5U2VsZWN0b3IoJy5pbWctY29udGFpbmVyJykuY2xhc3NMaXN0LmFkZCgnaW1nLWNvbnRhaW5lci0tYm9yZGVycycpO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0YWx0ID0gc3RyO1xuXHRcdFx0fVxuXHRcdH0pO1xuXG5cdFx0JG5ld0ltZy5zZXRBdHRyaWJ1dGUoJ2FsdCcsIGFsdCk7XG5cdFx0JG5ld0ltZy5zZXRBdHRyaWJ1dGUoJ3RpdGxlJywgJGltZy5nZXRBdHRyaWJ1dGUoJ3RpdGxlJykpO1xuXG5cdFx0JGltZ1dyYXBwZXIucXVlcnlTZWxlY3RvcignLmltZy1jb250YWluZXInKVxuXHRcdFx0LnNldEF0dHJpYnV0ZSgnc3R5bGUnLCAncGFkZGluZy1ib3R0b206JyArIHBhZGRpbmcgKyAnJScpO1xuXG5cdFx0JGltZy5wYXJlbnROb2RlLm91dGVySFRNTCA9ICRpbWdXcmFwcGVyLm91dGVySFRNTDtcblx0fSk7XG5cdHJldHVybiAkY29udGFpbmVyLmlubmVySFRNTDtcbn07XG4iLCJpbXBvcnQgc3RyaXBUYWdzIGZyb20gJy4vc3RyaXAtaHRtbC10YWdzJztcbmltcG9ydCB3b3JkQ291bnQgZnJvbSAnd29yZC1jb3VudCc7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uKGh0bWwpIHtcblx0dmFyIHRleHQgPSBzdHJpcFRhZ3MoaHRtbCk7XG5cdHZhciB3b3JkcyA9IHdvcmRDb3VudCh0ZXh0KTtcblx0dmFyIHJlYWRUaW1lID0gTWF0aC5jZWlsKHdvcmRzIC8gMzAwKTtcblxuXHR2YXIgYWZmaXggPSAnIG1pbic7XG5cdGlmIChyZWFkVGltZSA+IDEpIHtcblx0XHRhZmZpeCArPSAncyc7XG5cdH1cblxuXHRyZXR1cm4gcmVhZFRpbWUgKyBhZmZpeDtcbn1cbiIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uKGh0bWwpIHtcblx0dmFyIHRtcCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuXHR0bXAuaW5uZXJIVE1MID0gaHRtbDtcblx0cmV0dXJuIHRtcC50ZXh0Q29udGVudCB8fCB0bXAuaW5uZXJUZXh0IHx8ICcnO1xufVxuIiwiLyoqXG4gKiBNYWluIGVudHJ5IGZvciB0aGUgamF2YXNjcmlwdC5cbiAqIEltcG9ydCBtb2R1bGVzIGFuZCBzdGFydCB0aGVtXG4gKi9cblxuaW1wb3J0IGxhenlJbWFnZXMgZnJvbSAnZHMtYXNzZXRzL2xhenkvaW1hZ2VzJztcbmltcG9ydCBnZXRBbGwgZnJvbSAnZHMtYXNzZXRzL2RvbS9nZXQtYWxsJztcbmltcG9ydCB2YWxpZGF0ZUlucHV0RmllbGRzIGZyb20gJ2RzLWFzc2V0cy92YWxpZGF0ZS9pbnB1dC1maWVsZHMnO1xuaW1wb3J0IG5hdmlnYXRpb24gZnJvbSAnLi9jb21wb25lbnRzL25hdmlnYXRpb24nO1xuaW1wb3J0IHJlc3BvbnNlIGZyb20gJy4vY29tcG9uZW50cy9yZXNwb25zZSc7XG5pbXBvcnQgdG9vbFRpcCBmcm9tICcuL2NvbXBvbmVudHMvdG9vbC10aXAnO1xuaW1wb3J0IHNlYXJjaCBmcm9tICcuL2NvbXBvbmVudHMvc2VhcmNoJztcbmltcG9ydCBnZXRMb2dnZWRJbkRhdGEgZnJvbSAnLi9saWIvZ2V0LWxvZ2dlZC1pbi1kYXRhJztcbmltcG9ydCAqIGFzIGFwaSBmcm9tICcuL2xpYi9hcGknO1xuXG5uYXZpZ2F0aW9uKCk7XG50b29sVGlwKCk7XG5zZWFyY2goKTtcblxuZ2V0QWxsKCdpbWcnKS5mb3JFYWNoKGZ1bmN0aW9uKCRpbWcpIHtcblx0JGltZy5vbmxvYWQgPSBmdW5jdGlvbigpIHtcblx0XHR0aGlzLmNsYXNzTGlzdC5hZGQoJ2FuaW1hdGUtLWFjdGl2ZScpO1xuXHR9O1xufSk7XG5sYXp5SW1hZ2VzKDEpO1xudmFsaWRhdGVJbnB1dEZpZWxkcygpO1xucmVzcG9uc2UoKTtcbmdldExvZ2dlZEluRGF0YSgpLnRoZW4oZnVuY3Rpb24odXNlcikge1xuXHR2YXIgJGJvZHkgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdib2R5Jyk7XG5cblx0JGJvZHkuY2xhc3NMaXN0LmFkZCgndXNlci1sb2dnZWQtaW4nKTtcblxuXHQvLyBBZG1pbiBsb2dnZWQgaW5cblx0dmFyIGFkbWluID0gdXNlci5yb2xlcy5zb21lKGZ1bmN0aW9uKHJvbGUpIHtcblx0XHRyZXR1cm4gKHJvbGUubmFtZSA9PT0gJ093bmVyJyB8fCByb2xlLm5hbWUgPT09ICdBZG1pbmlzdHJhdG9yJyk7XG5cdH0pO1xuXHRpZiAoYWRtaW4pIHtcblx0XHQkYm9keS5jbGFzc0xpc3QuYWRkKCdhZG1pbi1sb2dnZWQtaW4nKTtcblx0fVxuXG5cdC8vIEF1dGhvciBsb2dnZWQgaW5cblx0aWYgKHVzZXIubmFtZSA9PT0gd2luZG93LmF1dGhvck5hbWUpIHtcblx0XHQkYm9keS5jbGFzc0xpc3QuYWRkKCdhdXRob3ItbG9nZ2VkLWluJyk7XG5cdFx0cmV0dXJuIGFwaS51cGRhdGVBdXRob3JFbWFpbCh1c2VyLmVtYWlsKTtcblx0fVxufSkuY2F0Y2goZnVuY3Rpb24oKSB7fSk7XG4iLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbihhdXRob3IpIHtcblxuXHR2YXIgYXV0aG9ySW1hZ2UgPSAnJztcblx0aWYgKGF1dGhvci5pbWFnZSkge1xuXHRcdGF1dGhvckltYWdlID0gYDx0ZCB3aWR0aD1cIjUlXCI+PGltZyBzcmM9XCIke2F1dGhvci5pbWFnZX1cIiBjbGFzcz1cImF1dGhvcl9faW1hZ2Ugcm91bmQtaW1nXCI+PC90ZD5gO1xuXHR9XG5cblx0dmFyIGNvdmVySW1hZ2UgPSAnJztcblx0aWYgKGF1dGhvci5jb3Zlcikge1xuXHRcdGNvdmVySW1hZ2UgPSBgXG48aW1nIGRhdGEtc3JjPVwiJHthdXRob3IuY292ZXJ9XCIgY2xhc3M9XCJsYXp5LWltYWdlIGZ1bGwtd2lkdGggaW1nLWZ1bGwtd2lkdGhcIiBhbHQ9XCIke2F1dGhvci5uYW1lfVwiID5cbmA7XG5cdH1cblxuXHRyZXR1cm4gYFxuPGFydGljbGUgY2xhc3M9XCJib3hlc19faXRlbSBzbWFsbCBhbmltYXRlIGFuaW1hdGVfX2ZhZGUtaW5cIj5cbiAgPGhlYWRlciBjbGFzcz1cImF1dGhvclwiPlxuICAgICAgPHRhYmxlPlxuICAgICAgICAgIDx0cj5cbiAgICAgICAgICAgICAgJHthdXRob3JJbWFnZX1cbiAgICAgICAgICAgICAgPHRkPjxzcGFuIGNsYXNzPVwiYXV0aG9yX19uYW1lXCI+PGEgaHJlZj1cIi9hdXRob3IvJHthdXRob3Iuc2x1Z31cIj4ke2F1dGhvci5uYW1lfTwvYT48L3NwYW4+PGJyPlxuICAgICAgICAgICAgICBcdCR7YXV0aG9yLmNvdW50LnBvc3RzfSBhcnRpY2xlc1xuICAgICAgICAgICAgICA8L3RkPlxuICAgICAgICAgIDwvdHI+XG4gICAgICA8L3RhYmxlPlxuICA8L2hlYWRlcj5cbiAgJHtjb3ZlckltYWdlfVxuICA8cD4ke2F1dGhvci5iaW8gfHwgJyd9PC9wPlxuICA8cD48YSBocmVmPVwiL2F1dGhvci8ke2F1dGhvci5zbHVnfS9cIiBjbGFzcz1cImJ0blwiPkFydGljbGVzIGJ5IGF1dGhvcjwvYT48L3A+XG48L2FydGljbGU+XG5gO1xufVxuIiwiaW1wb3J0IGltYWdlQ29udmVydGVkIGZyb20gJy4uL2xpYi9pbWFnZS1jb252ZXJ0ZXInO1xuaW1wb3J0IHJlYWRUaW1lIGZyb20gJy4uL2xpYi9yZWFkLXRpbWUnO1xuaW1wb3J0IGVwb2NoVG9UaW1lYWdvIGZyb20gJ2Vwb2NoLXRvLXRpbWVhZ28nO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbihwb3N0KSB7XG5cblx0dmFyIGF1dGhvckltYWdlID0gJyc7XG5cdGlmIChwb3N0LmF1dGhvci5pbWFnZSkge1xuXHRcdGF1dGhvckltYWdlID0gYDx0ZCB3aWR0aD1cIjUlXCI+PGltZyBzcmM9XCIke3Bvc3QuYXV0aG9yLmltYWdlfVwiIGNsYXNzPVwiYXV0aG9yX19pbWFnZSByb3VuZC1pbWdcIj48L3RkPmA7XG5cdH1cblxuXHR2YXIgdGFncyA9ICcnO1xuXHRpZiAocG9zdC50YWdzKSB7XG5cdFx0dGFncyA9ICc8YnI+PHNwYW4gY2xhc3M9XCJ0YWdzXCI+JyArIHBvc3QudGFncy5tYXAoZnVuY3Rpb24odGFnKSB7XG5cdFx0XHRyZXR1cm4gYDxhIGhyZWY9XCIvdGFnLyR7dGFnLnNsdWd9L1wiPiR7dGFnLm5hbWV9PC9hPmA7XG5cdFx0fSkuam9pbignJykgKyAnPC9zcGFuPic7XG5cdH1cblxuXHR2YXIgcHVibGlzaGVkID0gbmV3IERhdGUocG9zdC5wdWJsaXNoZWRfYXQpLmdldFRpbWUoKTtcblx0dmFyIG5vdyA9IERhdGUubm93KCk7XG5cdHZhciB0aW1lQWdvID0gZXBvY2hUb1RpbWVhZ28udGltZUFnbyhwdWJsaXNoZWQsIG5vdyk7XG5cblx0dmFyIGh0bWwgPSBpbWFnZUNvbnZlcnRlZChwb3N0Lmh0bWwpO1xuXHR2YXIgZXhjZXJwdCA9IGh0bWwuc3Vic3RyKDAsIGh0bWwuaW5kZXhPZignPC9wPicpICsgNCk7XG5cblx0cmV0dXJuIGBcbjxhcnRpY2xlIGNsYXNzPVwiYm94ZXNfX2l0ZW0gc21hbGwgYW5pbWF0ZSBhbmltYXRlX19mYWRlLWluXCI+XG4gIDxoZWFkZXIgY2xhc3M9XCJhdXRob3JcIj5cbiAgICAgIDx0YWJsZT5cbiAgICAgICAgICA8dHI+XG4gICAgICAgICAgICAgICR7YXV0aG9ySW1hZ2V9XG4gICAgICAgICAgICAgIDx0ZD48c3BhbiBjbGFzcz1cImF1dGhvcl9fbmFtZVwiPjxhIGhyZWY9XCIvYXV0aG9yLyR7cG9zdC5hdXRob3Iuc2x1Z31cIj4ke3Bvc3QuYXV0aG9yLm5hbWV9PC9hPjwvc3Bhbj48YnI+XG4gICAgICAgICAgICAgICR7dGltZUFnb30gJm1pZGRvdDsgJHtyZWFkVGltZShwb3N0Lmh0bWwpfSByZWFkJHt0YWdzfTwvdGQ+XG4gICAgICAgICAgPC90cj5cbiAgICAgIDwvdGFibGU+XG4gIDwvaGVhZGVyPlxuICAke2V4Y2VycHR9XG4gIDxwPjxhIGhyZWY9XCIvJHtwb3N0LnNsdWd9L1wiIGNsYXNzPVwiYnRuXCI+UmVhZCBhcnRpY2xlPC9hPjwvcD5cbjwvYXJ0aWNsZT5cbmA7XG59XG4iLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbih1c2VyKSB7XG5cdHZhciBpbWFnZSA9ICcnO1xuXHRpZiAodXNlci5pbWFnZSkge1xuXHRcdGltYWdlID0gYFxuPHRkIHdpZHRoPVwiNSVcIj48aW1nIGRhdGEtc3JjPVwiJHt1c2VyLmltYWdlfVwiIGNsYXNzPVwiYXV0aG9yX19pbWFnZSBhdXRob3JfX2ltYWdlLS1zbWFsbCBsYXp5LWltYWdlIGltZy1iZyByb3VuZC1pbWdcIj48L3RkPlxuXHRcdGA7XG5cdH1cblxuXHRyZXR1cm4gYFxuPGRpdiBjbGFzcz1cImF1dGhvciBzbWFsbFwiPlxuICA8dGFibGU+PHRib2R5Pjx0cj5cblx0XHQke2ltYWdlfVxuICAgIDx0ZD5cbiAgICAgIDxzcGFuIGNsYXNzPVwiYXV0aG9yX19uYW1lXCI+JHt1c2VyLm5hbWV9PC9zcGFuPlxuICAgIDwvdGQ+XG4gIDwvdHI+PC90Ym9keT48L3RhYmxlPlxuPC9kaXY+XG5gO1xufVxuIiwiaW1wb3J0IGVuY29kZSBmcm9tICcuLi9saWIvaHRtbC1lbmNvZGUnO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbihyZXNwb25zZSkge1xuXG4gIHZhciBjbGFzc2VzID0gJ3Jlc3BvbnNlIGJveGVzX19pdGVtJztcbiAgaWYgKHJlc3BvbnNlLm5hbWUudG9Mb3dlckNhc2UoKSA9PT0gd2luZG93LmF1dGhvck5hbWUudG9Mb3dlckNhc2UoKSkge1xuICAgIGNsYXNzZXMgKz0gJyBib3hlc19faXRlbS0tdHJhbnNwYXJlbnQnO1xuICB9XG5cbiAgdmFyIGltYWdlID0gJyc7XG4gIGlmIChyZXNwb25zZS5pbWFnZSkge1xuICAgIGltYWdlID0gYDx0ZCB3aWR0aD1cIjUlXCI+PGltZyBkYXRhLXNyYz1cIiR7cmVzcG9uc2UuaW1hZ2V9XCIgY2xhc3M9XCJhdXRob3JfX2ltYWdlIGF1dGhvcl9faW1hZ2UtLXNtYWxsIGxhenktaW1hZ2UgaW1nLWJnIHJvdW5kLWltZ1wiPjwvdGQ+YDtcbiAgfVxuXG4gIHZhciByZWFkVGltZSA9ICcnO1xuICBpZiAocmVzcG9uc2UucmVhZFRpbWUpIHtcbiAgICByZWFkVGltZSA9IGAgJm1pZGRvdDsgJHtyZXNwb25zZS5yZWFkVGltZX0gcmVhZGA7XG4gIH1cblxuICB2YXIgZXhjZXJwdCA9IHJlc3BvbnNlLmV4Y2VycHQgfHwgcmVzcG9uc2UuaHRtbDtcblxuICB2YXIgcmVhZE1vcmUgPSAnJztcbiAgaWYgKHJlc3BvbnNlLmV4Y2VycHQpIHtcbiAgICByZWFkTW9yZSA9IGBcbjxkaXYgY2xhc3M9XCJyZXNwb25zZV9fdGV4dCBoaWRkZW5cIj4ke3Jlc3BvbnNlLmh0bWx9PC9kaXY+XG48cD48YSBocmVmPVwiI1wiIGNsYXNzPVwiYnRuIHJlc3BvbnNlX19yZWFkLW1vcmVcIj5SZWFkIG1vcmU8L2E+PC9wPlxuYDtcbiAgfVxuXG4gIHZhciBuYW1lID0gYCR7ZW5jb2RlKHJlc3BvbnNlLm5hbWUpfWA7XG4gIGlmIChyZXNwb25zZS53ZWJzaXRlKSB7XG4gICAgbmFtZSA9IGA8YSBocmVmPVwiJHtlbmNvZGUocmVzcG9uc2Uud2Vic2l0ZSl9XCI+JHtuYW1lfTwvYT5gO1xuICB9XG5cbiAgcmV0dXJuIGBcbjxkaXYgY2xhc3M9XCIke2NsYXNzZXN9IHNtYWxsXCI+XG4gIDxkaXYgY2xhc3M9XCJhdXRob3JcIj5cbiAgICA8dGFibGU+XG4gICAgICA8dHI+XG4gICAgICAgICR7aW1hZ2V9XG4gICAgICAgIDx0ZD5cbiAgICAgICAgICA8c3BhbiBjbGFzcz1cImF1dGhvcl9fbmFtZVwiPiR7bmFtZX08L3NwYW4+PGJyPlxuICAgICAgICAgICR7cmVzcG9uc2UudGltZUFnb30ke3JlYWRUaW1lfVxuICAgICAgICA8L3RkPlxuICAgICAgPC90cj5cbiAgICA8L3RhYmxlPlxuICA8L2Rpdj5cbiAgPGEgaHJlZj1cIiNcIiBjbGFzcz1cInJlc3BvbnNlX19kZWxldGVcIiBkYXRhLXB1Ymxpc2hlZD1cIiR7cmVzcG9uc2UucHVibGlzaGVkfVwiIGRhdGEtbmFtZT1cIiR7cmVzcG9uc2UubmFtZX1cIj48aW1nIGRhdGEtc3JjPVwiL2Fzc2V0cy9pbWFnZXMvdHJhc2guc3ZnXCIgY2xhc3M9XCJsYXp5LWltYWdlXCI+PC9hPlxuICA8ZGl2IGNsYXNzPVwicmVzcG9uc2VfX2V4Y2VycHRcIj4ke2V4Y2VycHR9PC9kaXY+XG4gICR7cmVhZE1vcmV9XG48L2Rpdj5gO1xufVxuIiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24odGFnKSB7XG5cbiAgY29uc29sZS5sb2codGFnKTtcblxuICB2YXIgY292ZXJJbWFnZSA9ICcnO1xuICBpZiAodGFnLmltYWdlKSB7XG4gICAgY292ZXJJbWFnZSA9IGBcbjxpbWcgZGF0YS1zcmM9XCIke3RhZy5pbWFnZX1cIiBjbGFzcz1cImxhenktaW1hZ2UgZnVsbC13aWR0aCBpbWctZnVsbC13aWR0aFwiIGFsdD1cIiR7dGFnLm5hbWV9XCIgPlxuYDtcbiAgfVxuXG4gIHJldHVybiBgXG48YXJ0aWNsZSBjbGFzcz1cImJveGVzX19pdGVtIHNtYWxsIGFuaW1hdGUgYW5pbWF0ZV9fZmFkZS1pblwiPlxuICA8aGVhZGVyIGNsYXNzPVwiYXV0aG9yXCI+XG4gICAgICA8dGFibGU+XG4gICAgICAgICAgPHRyPlxuICAgICAgICAgICAgICA8dGQ+PHNwYW4gY2xhc3M9XCJhdXRob3JfX25hbWVcIj48YSBocmVmPVwiL3RhZy8ke3RhZy5zbHVnfVwiPiR7dGFnLm5hbWV9PC9hPjwvc3Bhbj48YnI+XG4gICAgICAgICAgICAgIFx0JHt0YWcuY291bnQucG9zdHN9IGFydGljbGVzXG4gICAgICAgICAgICAgIDwvdGQ+XG4gICAgICAgICAgPC90cj5cbiAgICAgIDwvdGFibGU+XG4gIDwvaGVhZGVyPlxuICAke2NvdmVySW1hZ2V9XG4gIDxwPiR7dGFnLmRlc2NyaXB0aW9uIHx8ICcnfTwvcD5cbiAgPHA+PGEgaHJlZj1cIi90YWcvJHt0YWcuc2x1Z30vXCIgY2xhc3M9XCJidG5cIj5BcnRpY2xlcyBpbiBjYXRlZ29yeTwvYT48L3A+XG48L2FydGljbGU+XG5gO1xufVxuIiwiLyoqXG4gKiBXb3JkIENvdW50XG4gKlxuICogV29yZCBjb3VudCBpbiByZXNwZWN0IG9mIENKSyBjaGFyYWN0ZXJzLlxuICpcbiAqIENvcHlyaWdodCAoYykgMjAxNSBieSBIc2lhb21pbmcgWWFuZy5cbiAqL1xuXG52YXIgcGF0dGVybiA9IC9bYS16QS1aMC05X1xcdTAzOTItXFx1MDNjOVxcdTAwYzAtXFx1MDBmZlxcdTA2MDAtXFx1MDZmZl0rfFtcXHU0ZTAwLVxcdTlmZmZcXHUzNDAwLVxcdTRkYmZcXHVmOTAwLVxcdWZhZmZcXHUzMDQwLVxcdTMwOWZcXHVhYzAwLVxcdWQ3YWZdKy9nO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChkYXRhKSB7XG4gIHZhciBtID0gZGF0YS5tYXRjaChwYXR0ZXJuKTtcbiAgdmFyIGNvdW50ID0gMDtcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBtLmxlbmd0aDsgaSsrKSB7XG4gICAgaWYgKG1baV0uY2hhckNvZGVBdCgwKSA+PSAweDRlMDApIHtcbiAgICAgIGNvdW50ICs9IG1baV0ubGVuZ3RoO1xuICAgIH0gZWxzZSB7XG4gICAgICBjb3VudCArPSAxO1xuICAgIH1cbiAgfVxuICByZXR1cm4gY291bnQ7XG59O1xuIl19
