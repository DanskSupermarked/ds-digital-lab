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

},{}],3:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (selector) {
  var $root = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : document;

  return Array.prototype.slice.call($root.querySelectorAll(selector));
};

},{}],4:[function(require,module,exports){
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

},{}],5:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function () {
  var threshold = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0.5;

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

},{"../dom/get-all":3,"../scroll/visible":8}],6:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function ($element) {
  var threshold = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;

  var scrollBottom = (window.scrollY || document.documentElement.scrollTop) + window.innerHeight * (1 + threshold);
  var offsetTop = (0, _getDocumentOffsetTop2.default)($element);
  return scrollBottom > offsetTop;
};

var _getDocumentOffsetTop = require('../dom/get-document-offset-top');

var _getDocumentOffsetTop2 = _interopRequireDefault(_getDocumentOffsetTop);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

},{"../dom/get-document-offset-top":4}],7:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function () {
  var downCallback = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : function () {};
  var upCallback = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : function () {};
  var threshold = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;


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

},{"../async/delay":2}],8:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function ($element) {
  var threshold = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;


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

},{"../async/debounce":1,"./has-scrolled-past":6}],9:[function(require,module,exports){
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

},{"./is-date":11,"./is-email":12,"./is-float":13,"./is-int":14,"./is-required":15,"./is-url":16}],10:[function(require,module,exports){
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

},{"../dom/get-all":3,"./":9}],11:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (date) {
  return !isNaN(Date.parse(date));
};

},{}],12:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (email) {
  var re = /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/;
  return re.test(email);
};

},{}],13:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (float) {
  var re = /^(?:[-+]?(?:[0-9]+))?(?:\.[0-9]*)?(?:[eE][\+\-]?(?:[0-9]+))?$/;
  return float !== '' && re.test(float);
};

},{}],14:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (integer) {
  var re = /^(?:[-+]?(?:0|[1-9][0-9]*))$/;
  return re.test(integer);
};

},{}],15:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (input) {
  return input.trim() !== '';
};

},{}],16:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (url) {
  var re = /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/;
  return re.test(url);
};

},{}],17:[function(require,module,exports){
module.exports={
  "seconds": 60,
  "minutes": 60,
  "hours": 24,
  "days": 7,
  "weeks": 4,
  "months": 12
}

},{}],18:[function(require,module,exports){
var converter = module.exports = {
  cutoff: require('./cutoff/cutoff.json'),
  suffixDictionary: require('./suffix/suffix-dictionary.json'),
  timeCalcs: require('./time-calculations')
}
converter.timeAgo = require('./time-ago/time-ago.js').bind(converter)

},{"./cutoff/cutoff.json":17,"./suffix/suffix-dictionary.json":19,"./time-ago/time-ago.js":20,"./time-calculations":21}],19:[function(require,module,exports){
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

},{}],20:[function(require,module,exports){
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

},{}],21:[function(require,module,exports){
module.exports = {
  seconds: require('./time-ago/seconds-ago.js'),
  minutes: require('./time-ago/minutes-ago.js'),
  hours: require('./time-ago/hours-ago.js'),
  days: require('./time-ago/days-ago.js'),
  weeks: require('./time-ago/weeks-ago.js'),
  months: require('./time-ago/months-ago.js'),
  years: require('./time-ago/years-ago.js')
}

},{"./time-ago/days-ago.js":22,"./time-ago/hours-ago.js":23,"./time-ago/minutes-ago.js":24,"./time-ago/months-ago.js":25,"./time-ago/seconds-ago.js":26,"./time-ago/weeks-ago.js":27,"./time-ago/years-ago.js":28}],22:[function(require,module,exports){
module.exports = DaysAgo

function DaysAgo (pastEpoch, currentEpoch) {
  var daysAgo = (currentEpoch - pastEpoch) / 1000 / 60 / 60 / 24
  return daysAgo
}

},{}],23:[function(require,module,exports){
module.exports = HoursAgo

function HoursAgo (pastEpoch, currentEpoch) {
  var hoursAgo = (currentEpoch - pastEpoch) / 1000 / 60 / 60
  return hoursAgo
}

},{}],24:[function(require,module,exports){
module.exports = MinutesAgo

function MinutesAgo (pastEpoch, currentEpoch) {
  var minutesAgo = (currentEpoch - pastEpoch) / 1000 / 60
  return minutesAgo
}

},{}],25:[function(require,module,exports){
module.exports = MonthsAgo

function MonthsAgo (pastEpoch, currentEpoch) {
  var monthsAgo = (currentEpoch - pastEpoch) / 1000 / 60 / 60 / 24 / 31
  return monthsAgo
}

},{}],26:[function(require,module,exports){
module.exports = SecondsAgo

function SecondsAgo (pastEpoch, currentEpoch) {
  var secondsAgo = (currentEpoch - pastEpoch) / 1000
  return secondsAgo
}

},{}],27:[function(require,module,exports){
module.exports = WeeksAgo

function WeeksAgo (pastEpoch, currentEpoch) {
  var weeksAgo = (currentEpoch - pastEpoch) / 1000 / 60 / 60 / 24 / 7
  return weeksAgo
}

},{}],28:[function(require,module,exports){
module.exports = YearsAgo

function YearsAgo (pastEpoch, currentEpoch) {
  var yearsAgo = (currentEpoch - pastEpoch) / 1000 / 60 / 60 / 24 / 31 / 12
  return yearsAgo
}

},{}],29:[function(require,module,exports){
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

},{"../lib/get-logged-in-data":36,"ds-assets/async/debounce":1,"ds-assets/dom/get-all":3,"ds-assets/scroll/has-scrolled-past":6,"ds-assets/scroll/scroll-change":7}],30:[function(require,module,exports){
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
		if (!isNaN(likes)) {
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

},{"../lib/api":33,"../lib/form/live-validation":34,"../lib/form/validate":35,"../lib/get-logged-in-data":36,"../templates/response":45,"../templates/response-meta":44,"ds-assets/dom/get-all":3,"ds-assets/dom/get-document-offset-top":4,"ds-assets/lazy/images":5}],31:[function(require,module,exports){
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

},{"../lib/api":33,"../templates/author":42,"../templates/post":43,"../templates/tag":46,"ds-assets/dom/get-all":3,"ds-assets/lazy/images":5}],32:[function(require,module,exports){
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

},{"../lib/form/validate":35,"ds-assets/dom/get-all":3}],33:[function(require,module,exports){
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
  var path = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
  var method = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'GET';
  var data = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;


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

},{}],34:[function(require,module,exports){
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

},{"./validate":35}],35:[function(require,module,exports){
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

},{}],36:[function(require,module,exports){
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

},{}],37:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (string) {
  var htmlEncodedValue = document.createElement('div').appendChild(document.createTextNode(string)).parentNode.innerHTML;
  return htmlEncodedValue.replace(/\r?\n/g, '<br>');
};

},{}],38:[function(require,module,exports){
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

		// Lazy load
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

},{"ds-assets/dom/get-all":3}],39:[function(require,module,exports){
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

},{"./strip-html-tags":40,"word-count":47}],40:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

exports.default = function (html) {
	var tmp = document.createElement('div');
	tmp.innerHTML = html;
	return tmp.textContent || tmp.innerText || '';
};

},{}],41:[function(require,module,exports){
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

},{"./components/navigation":29,"./components/response":30,"./components/search":31,"./components/tool-tip":32,"./lib/api":33,"./lib/get-logged-in-data":36,"ds-assets/dom/get-all":3,"ds-assets/lazy/images":5,"ds-assets/validate/input-fields":10}],42:[function(require,module,exports){
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
    coverImage = '\n      <div class="img-wrapper full-width">\n        <div class="img-container" style="padding-bottom:50%">\n          <img data-src="' + author.cover + '" alt="' + author.name + '" class="lazy-image">\n        </div>\n      </div>';
  }

  return '\n    <article class="boxes__item small animate animate__fade-in">\n      <header class="author">\n          <table>\n              <tr>\n                  ' + authorImage + '\n                  <td><span class="author__name"><a href="/author/' + author.slug + '">' + author.name + '</a></span><br>\n                  \t' + author.count.posts + ' stories\n                  </td>\n              </tr>\n          </table>\n      </header>\n      <a href="/author/' + author.slug + '/">' + coverImage + '</a>\n      <h1>' + author.name + '</h1>\n      <p>' + (author.bio || '') + '</p>\n      <p><a href="/author/' + author.slug + '/" class="dimmed">See stories by author...</a></p>\n     </article>';
};

},{}],43:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (post) {

  var authorImage = '';
  if (post.author.image) {
    authorImage = '<td width="5%"><img src="' + post.author.image + '" class="author__image round-img"></td>';
  }

  var postImage = '';
  if (post.image) {
    postImage = '\n      <div class="img-wrapper full-width">\n        <div class="img-container" style="padding-bottom:50%">\n          <img data-src="' + post.image + '" alt="' + post.title + '" class="lazy-image">\n        </div>\n      </div>';
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

  return '\n    <article class="boxes__item small animate animate__fade-in">\n      <header class="author">\n          <table>\n              <tr>\n                  ' + authorImage + '\n                  <td><span class="author__name"><a href="/author/' + post.author.slug + '">' + post.author.name + '</a></span><br>\n                  ' + timeAgo + ' &middot; ' + (0, _readTime2.default)(post.html) + ' read' + tags + '</td>\n              </tr>\n          </table>\n      </header>\n      ' + postImage + '\n      <a href="/' + post.slug + '/">\n        <h1>' + post.title + '</h1>\n        ' + excerpt + '\n      </a>\n      <p><a href="/' + post.slug + '/" class="dimmed">Read more...</a></p>\n    </article>';
};

var _imageConverter = require('../lib/image-converter');

var _imageConverter2 = _interopRequireDefault(_imageConverter);

var _readTime = require('../lib/read-time');

var _readTime2 = _interopRequireDefault(_readTime);

var _epochToTimeago = require('epoch-to-timeago');

var _epochToTimeago2 = _interopRequireDefault(_epochToTimeago);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

},{"../lib/image-converter":38,"../lib/read-time":39,"epoch-to-timeago":18}],44:[function(require,module,exports){
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

},{}],45:[function(require,module,exports){
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
    readMore = '\n<div class="response__text hidden">' + response.html + '</div>\n<p><a href="#" class="response__read-more dimmed">Read more...</a></p>\n';
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

},{"../lib/html-encode":37}],46:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (tag) {

  var coverImage = '';
  if (tag.image) {
    coverImage = '\n      <div class="img-wrapper full-width">\n        <div class="img-container" style="padding-bottom:50%">\n          <img data-src="' + tag.image + '" alt="' + tag.name + '" class="lazy-image">\n        </div>\n      </div>\n';
  }

  return '\n<article class="boxes__item small animate animate__fade-in">\n  <header class="author">\n      <table>\n          <tr>\n              <td><span class="author__name"><a href="/tag/' + tag.slug + '">' + tag.name + '</a></span><br>\n              \t' + tag.count.posts + ' stories\n              </td>\n          </tr>\n      </table>\n  </header>\n  <a href="/tag/' + tag.slug + '/">\n    ' + coverImage + '\n  </a>\n  <h1>' + tag.name + '</h1>\n  <p>' + (tag.description || '') + '</p>\n  <p><a href="/tag/' + tag.slug + '/" class="dimmed">See stories in category...</a></p>\n </article>\n';
};

},{}],47:[function(require,module,exports){
/**
 * Word Count
 *
 * Word count in respect of CJK characters.
 *
 * Copyright (c) 2015 - 2016 by Hsiaoming Yang.
 */

var pattern = /[a-zA-Z0-9_\u0392-\u03c9\u00c0-\u00ff\u0600-\u06ff]+|[\u4e00-\u9fff\u3400-\u4dbf\uf900-\ufaff\u3040-\u309f\uac00-\ud7af]+/g;

module.exports = function (data) {
  var m = data.match(pattern);
  var count = 0;
  if (!m) {
    return 0;
  }
  for (var i = 0; i < m.length; i++) {
    if (m[i].charCodeAt(0) >= 0x4e00) {
      count += m[i].length;
    } else {
      count += 1;
    }
  }
  return count;
};

},{}]},{},[41])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJub2RlX21vZHVsZXMvZHMtYXNzZXRzL2FzeW5jL2RlYm91bmNlLmpzIiwibm9kZV9tb2R1bGVzL2RzLWFzc2V0cy9hc3luYy9kZWxheS5qcyIsIm5vZGVfbW9kdWxlcy9kcy1hc3NldHMvZG9tL2dldC1hbGwuanMiLCJub2RlX21vZHVsZXMvZHMtYXNzZXRzL2RvbS9nZXQtZG9jdW1lbnQtb2Zmc2V0LXRvcC5qcyIsIm5vZGVfbW9kdWxlcy9kcy1hc3NldHMvbGF6eS9pbWFnZXMuanMiLCJub2RlX21vZHVsZXMvZHMtYXNzZXRzL3Njcm9sbC9oYXMtc2Nyb2xsZWQtcGFzdC5qcyIsIm5vZGVfbW9kdWxlcy9kcy1hc3NldHMvc2Nyb2xsL3Njcm9sbC1jaGFuZ2UuanMiLCJub2RlX21vZHVsZXMvZHMtYXNzZXRzL3Njcm9sbC92aXNpYmxlLmpzIiwibm9kZV9tb2R1bGVzL2RzLWFzc2V0cy92YWxpZGF0ZS9pbmRleC5qcyIsIm5vZGVfbW9kdWxlcy9kcy1hc3NldHMvdmFsaWRhdGUvaW5wdXQtZmllbGRzLmpzIiwibm9kZV9tb2R1bGVzL2RzLWFzc2V0cy92YWxpZGF0ZS9pcy1kYXRlLmpzIiwibm9kZV9tb2R1bGVzL2RzLWFzc2V0cy92YWxpZGF0ZS9pcy1lbWFpbC5qcyIsIm5vZGVfbW9kdWxlcy9kcy1hc3NldHMvdmFsaWRhdGUvaXMtZmxvYXQuanMiLCJub2RlX21vZHVsZXMvZHMtYXNzZXRzL3ZhbGlkYXRlL2lzLWludC5qcyIsIm5vZGVfbW9kdWxlcy9kcy1hc3NldHMvdmFsaWRhdGUvaXMtcmVxdWlyZWQuanMiLCJub2RlX21vZHVsZXMvZHMtYXNzZXRzL3ZhbGlkYXRlL2lzLXVybC5qcyIsIm5vZGVfbW9kdWxlcy9lcG9jaC10by10aW1lYWdvL2N1dG9mZi9jdXRvZmYuanNvbiIsIm5vZGVfbW9kdWxlcy9lcG9jaC10by10aW1lYWdvL2luZGV4LmpzIiwibm9kZV9tb2R1bGVzL2Vwb2NoLXRvLXRpbWVhZ28vc3VmZml4L3N1ZmZpeC1kaWN0aW9uYXJ5Lmpzb24iLCJub2RlX21vZHVsZXMvZXBvY2gtdG8tdGltZWFnby90aW1lLWFnby90aW1lLWFnby5qcyIsIm5vZGVfbW9kdWxlcy9lcG9jaC10by10aW1lYWdvL3RpbWUtY2FsY3VsYXRpb25zL2luZGV4LmpzIiwibm9kZV9tb2R1bGVzL2Vwb2NoLXRvLXRpbWVhZ28vdGltZS1jYWxjdWxhdGlvbnMvdGltZS1hZ28vZGF5cy1hZ28uanMiLCJub2RlX21vZHVsZXMvZXBvY2gtdG8tdGltZWFnby90aW1lLWNhbGN1bGF0aW9ucy90aW1lLWFnby9ob3Vycy1hZ28uanMiLCJub2RlX21vZHVsZXMvZXBvY2gtdG8tdGltZWFnby90aW1lLWNhbGN1bGF0aW9ucy90aW1lLWFnby9taW51dGVzLWFnby5qcyIsIm5vZGVfbW9kdWxlcy9lcG9jaC10by10aW1lYWdvL3RpbWUtY2FsY3VsYXRpb25zL3RpbWUtYWdvL21vbnRocy1hZ28uanMiLCJub2RlX21vZHVsZXMvZXBvY2gtdG8tdGltZWFnby90aW1lLWNhbGN1bGF0aW9ucy90aW1lLWFnby9zZWNvbmRzLWFnby5qcyIsIm5vZGVfbW9kdWxlcy9lcG9jaC10by10aW1lYWdvL3RpbWUtY2FsY3VsYXRpb25zL3RpbWUtYWdvL3dlZWtzLWFnby5qcyIsIm5vZGVfbW9kdWxlcy9lcG9jaC10by10aW1lYWdvL3RpbWUtY2FsY3VsYXRpb25zL3RpbWUtYWdvL3llYXJzLWFnby5qcyIsInNyYy9zY3JpcHRzL2NvbXBvbmVudHMvbmF2aWdhdGlvbi5qcyIsInNyYy9zY3JpcHRzL2NvbXBvbmVudHMvcmVzcG9uc2UuanMiLCJzcmMvc2NyaXB0cy9jb21wb25lbnRzL3NlYXJjaC5qcyIsInNyYy9zY3JpcHRzL2NvbXBvbmVudHMvdG9vbC10aXAuanMiLCJzcmMvc2NyaXB0cy9saWIvYXBpLmpzIiwic3JjL3NjcmlwdHMvbGliL2Zvcm0vbGl2ZS12YWxpZGF0aW9uLmpzIiwic3JjL3NjcmlwdHMvbGliL2Zvcm0vdmFsaWRhdGUuanMiLCJzcmMvc2NyaXB0cy9saWIvZ2V0LWxvZ2dlZC1pbi1kYXRhLmpzIiwic3JjL3NjcmlwdHMvbGliL2h0bWwtZW5jb2RlLmpzIiwic3JjL3NjcmlwdHMvbGliL2ltYWdlLWNvbnZlcnRlci5qcyIsInNyYy9zY3JpcHRzL2xpYi9yZWFkLXRpbWUuanMiLCJzcmMvc2NyaXB0cy9saWIvc3RyaXAtaHRtbC10YWdzLmpzIiwic3JjL3NjcmlwdHMvbWFpbi5qcyIsInNyYy9zY3JpcHRzL3RlbXBsYXRlcy9hdXRob3IuanMiLCJzcmMvc2NyaXB0cy90ZW1wbGF0ZXMvcG9zdC5qcyIsInNyYy9zY3JpcHRzL3RlbXBsYXRlcy9yZXNwb25zZS1tZXRhLmpzIiwic3JjL3NjcmlwdHMvdGVtcGxhdGVzL3Jlc3BvbnNlLmpzIiwic3JjL3NjcmlwdHMvdGVtcGxhdGVzL3RhZy5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy93b3JkLWNvdW50L2luZGV4LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7O2tCQ01lLFVBQVMsUUFBVCxFQUFtQixPQUFuQixFQUE0QjtBQUN6QyxNQUFJLFVBQVUsS0FBZDtBQUNBLE1BQUksT0FBTyxTQUFQLElBQU8sR0FBTTtBQUNmLGNBQVUsS0FBVjtBQUNELEdBRkQ7QUFHQSxTQUFPLFlBQVc7QUFDaEIsUUFBSSxPQUFKLEVBQWE7QUFDWDtBQUNEO0FBQ0QsY0FBVSxJQUFWO0FBQ0EsYUFBUyxLQUFULENBQWUsSUFBZixFQUFxQixTQUFyQjtBQUNBLFFBQUksQ0FBQyxPQUFMLEVBQWM7QUFDWixhQUFPLHFCQUFQLENBQTZCLElBQTdCO0FBQ0QsS0FGRCxNQUVPO0FBQ0wsYUFBTyxVQUFQLENBQWtCLElBQWxCLEVBQXdCLE9BQXhCO0FBQ0Q7QUFDRixHQVhEO0FBWUQsQzs7Ozs7Ozs7O2tCQ2pCYyxVQUFTLFFBQVQsRUFBbUIsT0FBbkIsRUFBNEI7QUFBQTtBQUFBOztBQUN6QyxNQUFJLFVBQVUsS0FBZDtBQUNBLE1BQUksT0FBTyxTQUFQLElBQU8sR0FBTTtBQUNmLGFBQVMsS0FBVDtBQUNBLGNBQVUsS0FBVjtBQUNELEdBSEQ7QUFJQSxTQUFPLFlBQVc7QUFDaEIsUUFBSSxPQUFKLEVBQWE7QUFDWDtBQUNEO0FBQ0QsY0FBVSxJQUFWO0FBQ0EsUUFBSSxDQUFDLE9BQUwsRUFBYztBQUNaLGFBQU8scUJBQVAsQ0FBNkIsSUFBN0I7QUFDRCxLQUZELE1BRU87QUFDTCxhQUFPLFVBQVAsQ0FBa0IsSUFBbEIsRUFBd0IsT0FBeEI7QUFDRDtBQUNGLEdBVkQ7QUFXRCxDOzs7Ozs7Ozs7a0JDakJjLFVBQVMsUUFBVCxFQUFxQztBQUFBLE1BQWxCLEtBQWtCLHVFQUFWLFFBQVU7O0FBQ2xELFNBQU8sTUFBTSxTQUFOLENBQWdCLEtBQWhCLENBQXNCLElBQXRCLENBQTJCLE1BQU0sZ0JBQU4sQ0FBdUIsUUFBdkIsQ0FBM0IsQ0FBUDtBQUNELEM7Ozs7Ozs7OztrQkNIYyxVQUFTLFFBQVQsRUFBbUI7QUFDaEMsTUFBSSxTQUFTLENBQWI7O0FBRUEsU0FBTyxZQUFZLENBQUMsTUFBTSxTQUFTLFNBQWYsQ0FBcEIsRUFBK0M7QUFDN0MsY0FBVSxTQUFTLFNBQW5CO0FBQ0EsZUFBVyxTQUFTLFlBQXBCO0FBQ0Q7QUFDRCxTQUFPLE1BQVA7QUFDRCxDOzs7Ozs7Ozs7a0JDbUNjLFlBQTBCO0FBQUEsTUFBakIsU0FBaUIsdUVBQUwsR0FBSzs7QUFDdkMsTUFBSSxjQUFjLHNCQUFlLGFBQWYsQ0FBbEI7O0FBRUEsU0FBTyxxQkFBUCxDQUE2QixZQUFXO0FBQ3RDLGdCQUFZLE9BQVosQ0FBb0IsVUFBUyxVQUFULEVBQXFCOztBQUV2QztBQUNBLFVBQUksV0FBVyxPQUFYLENBQW1CLGtCQUF2QixFQUEyQztBQUNoRDtBQUNNO0FBQ0QsaUJBQVcsWUFBWCxDQUF3QiwyQkFBeEIsRUFBcUQsTUFBckQ7O0FBRUEsNkJBQWMsVUFBZCxFQUEwQixTQUExQixFQUNHLElBREgsQ0FDUTtBQUFBLGVBQU0sWUFBWSxVQUFaLENBQU47QUFBQSxPQURSO0FBRUQsS0FWRDtBQVdELEdBWkQ7QUFjRCxDOztBQTFERDs7OztBQUNBOzs7Ozs7QUFFQTtBQVZBOzs7Ozs7QUFNQTtBQUtBLElBQUksVUFBVSxTQUFWLE9BQVUsQ0FBUyxJQUFULEVBQWU7O0FBRTNCLE1BQUksS0FBSyxPQUFMLENBQWEsR0FBakIsRUFBc0I7QUFDcEIsU0FBSyxZQUFMLENBQWtCLEtBQWxCLEVBQXlCLEtBQUssT0FBTCxDQUFhLEdBQXRDO0FBQ0Q7QUFDRCxNQUFJLEtBQUssT0FBTCxDQUFhLE1BQWpCLEVBQXlCO0FBQ3ZCLFNBQUssWUFBTCxDQUFrQixRQUFsQixFQUE0QixLQUFLLE9BQUwsQ0FBYSxNQUF6QztBQUNEO0FBQ0YsQ0FSRDs7QUFVQTtBQUNBLElBQUksY0FBYyxTQUFkLFdBQWMsQ0FBUyxRQUFULEVBQW1CO0FBQ25DLFVBQVEsU0FBUyxhQUFULENBQXVCLEtBQXZCLENBQVI7QUFDQSxNQUFJLFdBQVcsTUFBTSxTQUFOLENBQWdCLEtBQWhCLENBQXNCLElBQXRCLENBQTJCLFNBQVMsZ0JBQVQsQ0FBMEIsUUFBMUIsQ0FBM0IsQ0FBZjtBQUNBLFdBQVMsT0FBVCxDQUFpQjtBQUFBLFdBQVcsUUFBUSxZQUFSLENBQXFCLFFBQXJCLEVBQStCLFFBQVEsT0FBUixDQUFnQixNQUEvQyxDQUFYO0FBQUEsR0FBakI7QUFDRCxDQUpEOztBQU1BLElBQUksY0FBYyxTQUFkLFdBQWMsQ0FBUyxRQUFULEVBQW1CO0FBQ25DLE1BQUksU0FBUyxPQUFULENBQWlCLFNBQWpCLENBQUosRUFBaUM7QUFDL0IsZ0JBQVksUUFBWjtBQUNELEdBRkQsTUFFTyxJQUFJLFNBQVMsT0FBVCxDQUFpQixLQUFqQixDQUFKLEVBQTZCO0FBQ2xDLFlBQVEsUUFBUjtBQUNEOztBQUVEO0FBQ0EsTUFBSSxPQUFPLFdBQVgsRUFBd0I7QUFDdEIsV0FBTyxXQUFQLENBQW1CO0FBQ2pCLGtCQUFZO0FBREssS0FBbkI7QUFHRDtBQUNGLENBYkQ7O0FBZUE7Ozs7Ozs7Ozs7Ozs7a0JDbENlLFVBQVMsUUFBVCxFQUFrQztBQUFBLE1BQWYsU0FBZSx1RUFBSCxDQUFHOztBQUMvQyxNQUFJLGVBQWUsQ0FBQyxPQUFPLE9BQVAsSUFBa0IsU0FBUyxlQUFULENBQXlCLFNBQTVDLElBQTBELE9BQU8sV0FBUCxJQUFzQixJQUFJLFNBQTFCLENBQTdFO0FBQ0EsTUFBSSxZQUFZLG9DQUFxQixRQUFyQixDQUFoQjtBQUNBLFNBQVEsZUFBZSxTQUF2QjtBQUNELEM7O0FBWkQ7Ozs7Ozs7Ozs7Ozs7a0JDU2UsWUFBa0Y7QUFBQSxNQUF6RSxZQUF5RSx1RUFBMUQsWUFBVyxDQUFFLENBQTZDO0FBQUEsTUFBM0MsVUFBMkMsdUVBQTlCLFlBQVcsQ0FBRSxDQUFpQjtBQUFBLE1BQWYsU0FBZSx1RUFBSCxDQUFHOzs7QUFFL0YsTUFBSSxnQkFBZ0IsQ0FBcEI7QUFDQSxNQUFJLGVBQWUsS0FBbkI7O0FBRUEsTUFBSSxjQUFjLFNBQWQsV0FBYyxHQUFXO0FBQzNCLFFBQUksbUJBQW1CLE9BQU8sT0FBOUI7O0FBRUEsUUFBSSxDQUFDLFlBQUQsSUFDRixtQkFBbUIsU0FEakIsSUFFRixtQkFBb0IsZ0JBQWdCLEVBRnRDLEVBRTJDO0FBQ3pDO0FBQ0EscUJBQWUsSUFBZjtBQUNELEtBTEQsTUFLTyxJQUFJLGlCQUNSLG9CQUFvQixTQUFwQixJQUFpQyxtQkFBb0IsZ0JBQWdCLEdBRDdELEtBRVIsbUJBQW1CLE9BQU8sV0FBMUIsR0FBd0MsU0FBUyxJQUFULENBQWMsWUFGbEQsRUFFaUU7QUFDdEU7QUFDQSxxQkFBZSxLQUFmO0FBQ0Q7O0FBRUQsb0JBQWdCLGdCQUFoQjtBQUNELEdBaEJEOztBQWtCQSxTQUFPLGdCQUFQLENBQXdCLFFBQXhCLEVBQWtDLHFCQUFNLFdBQU4sRUFBbUIsR0FBbkIsQ0FBbEM7QUFDQSxXQUFTLGdCQUFULENBQTBCLGtCQUExQixFQUE4QyxXQUE5QztBQUNELEM7O0FBbENEOzs7Ozs7Ozs7Ozs7O2tCQ1NlLFVBQVMsUUFBVCxFQUFrQztBQUFBLE1BQWYsU0FBZSx1RUFBSCxDQUFHOzs7QUFFL0MsU0FBTyxJQUFJLE9BQUosQ0FBWSxVQUFTLE9BQVQsRUFBa0I7O0FBRW5DLFFBQUksZUFBZSx3QkFBUyxZQUFXO0FBQ3JDLFVBQUksK0JBQWdCLFFBQWhCLEVBQTBCLFNBQTFCLENBQUosRUFBMEM7QUFDeEMsZUFBTyxtQkFBUCxDQUEyQixRQUEzQixFQUFxQyxZQUFyQztBQUNBLGVBQU8sbUJBQVAsQ0FBMkIsUUFBM0IsRUFBcUMsWUFBckM7QUFDQTtBQUNEO0FBQ0YsS0FOa0IsQ0FBbkI7O0FBUUEsV0FBTyxnQkFBUCxDQUF3QixRQUF4QixFQUFrQyxZQUFsQztBQUNBLFdBQU8sZ0JBQVAsQ0FBd0IsUUFBeEIsRUFBa0MsWUFBbEM7QUFDQSxhQUFTLGdCQUFULENBQTBCLGtCQUExQixFQUE4QyxZQUE5QztBQUNBLGVBQVcsWUFBWCxFQUF5QixDQUF6QjtBQUNELEdBZE0sQ0FBUDtBQWVELEM7O0FBMUJEOzs7O0FBQ0E7Ozs7Ozs7Ozs7Ozs7QUNFQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7OztBQVRBOzs7O2tCQVdlO0FBQ2IsMEJBRGE7QUFFYiw0QkFGYTtBQUdiLDRCQUhhO0FBSWIsd0JBSmE7QUFLYixrQ0FMYTtBQU1iO0FBTmEsQzs7Ozs7Ozs7O2tCQ1JBLFlBQVc7O0FBRXhCLHdCQUFlLFdBQWYsRUFBNEIsT0FBNUIsQ0FBb0MsVUFBUyxrQkFBVCxFQUE2Qjs7QUFFL0QsUUFBSSxpQkFBaUIsa0JBQXJCOztBQUVBLFFBQUksQ0FBQyxtQkFBbUIsT0FBbkIsQ0FBMkIsaUJBQTNCLENBQUwsRUFBb0Q7QUFDbEQsdUJBQWlCLG1CQUFtQixhQUFuQixDQUFpQyxpQkFBakMsQ0FBakI7QUFDRDs7QUFFRCxRQUFJLENBQUMsY0FBTCxFQUFxQjtBQUNuQjtBQUNEOztBQUVEO0FBQ0EsUUFBSSxpQkFBaUIsRUFBckI7QUFDQSxTQUFLLElBQUksR0FBVCxJQUFnQixtQkFBbUIsT0FBbkMsRUFBNEM7QUFDMUMsVUFBSSxRQUFRLFVBQVIsSUFBc0IsSUFBSSxPQUFKLENBQVksVUFBWixNQUE0QixDQUF0RCxFQUF5RDtBQUN2RCxZQUFJLGdCQUFnQixJQUFJLE9BQUosQ0FBWSxVQUFaLEVBQXdCLEVBQXhCLENBQXBCOztBQUVBLFlBQUksV0FBUyxPQUFPLGFBQWhCLENBQUosRUFBb0M7QUFDbEMseUJBQWUsSUFBZixDQUFvQixhQUFwQjtBQUNEO0FBQ0Y7QUFDRjs7QUFFRCxRQUFJLGVBQWUsTUFBZixLQUEwQixDQUE5QixFQUFpQztBQUMvQjtBQUNEOztBQUVEO0FBQ0EsbUJBQWUsZ0JBQWYsQ0FBZ0MsT0FBaEMsRUFBeUMsWUFBVztBQUNsRCxVQUFJLFFBQVEsZUFBZSxLQUEzQjtBQUNBLFVBQUksUUFBUSxDQUFDLGVBQWUsSUFBZixDQUFvQixVQUFTLGFBQVQsRUFBd0I7QUFDOUQsWUFBSSxDQUFDLEtBQUQsSUFBVSxrQkFBa0IsVUFBaEMsRUFBNEM7QUFDMUMsaUJBQU8sS0FBUDtBQUNEO0FBQ00sZUFBTyxDQUFDLFdBQVMsT0FBTyxhQUFoQixFQUErQixLQUEvQixDQUFSO0FBQ0QsT0FMWSxDQUFiOztBQU9BLFVBQUksS0FBSixFQUFXO0FBQ2hCLDJCQUFtQixTQUFuQixDQUE2QixHQUE3QixDQUFpQyxpQkFBakM7QUFDQSwyQkFBbUIsU0FBbkIsQ0FBNkIsTUFBN0IsQ0FBb0MscUJBQXBDO0FBQ00sT0FIRCxNQUdPO0FBQ1osMkJBQW1CLFNBQW5CLENBQTZCLEdBQTdCLENBQWlDLHFCQUFqQztBQUNBLDJCQUFtQixTQUFuQixDQUE2QixNQUE3QixDQUFvQyxpQkFBcEM7QUFDTTtBQUNGLEtBaEJEO0FBaUJELEdBOUNEO0FBK0NELEM7O0FBcEREOzs7O0FBQ0E7Ozs7Ozs7Ozs7Ozs7a0JDSWUsVUFBUyxJQUFULEVBQWU7QUFDNUIsU0FBTyxDQUFDLE1BQU0sS0FBSyxLQUFMLENBQVcsSUFBWCxDQUFOLENBQVI7QUFDRCxDOzs7Ozs7Ozs7a0JDRmMsVUFBUyxLQUFULEVBQWdCO0FBQzdCLE1BQUksS0FBSyxpREFBVDtBQUNBLFNBQU8sR0FBRyxJQUFILENBQVEsS0FBUixDQUFQO0FBQ0QsQzs7Ozs7Ozs7O2tCQ0hjLFVBQVMsS0FBVCxFQUFnQjtBQUM3QixNQUFJLEtBQUssK0RBQVQ7QUFDQSxTQUFPLFVBQVUsRUFBVixJQUFnQixHQUFHLElBQUgsQ0FBUSxLQUFSLENBQXZCO0FBQ0QsQzs7Ozs7Ozs7O2tCQ0hjLFVBQVMsT0FBVCxFQUFrQjtBQUMvQixNQUFJLEtBQUssOEJBQVQ7QUFDQSxTQUFPLEdBQUcsSUFBSCxDQUFRLE9BQVIsQ0FBUDtBQUNELEM7Ozs7Ozs7OztrQkNIYyxVQUFTLEtBQVQsRUFBZ0I7QUFDN0IsU0FBTyxNQUFNLElBQU4sT0FBaUIsRUFBeEI7QUFDRCxDOzs7Ozs7Ozs7a0JDRmMsVUFBUyxHQUFULEVBQWM7QUFDM0IsTUFBSSxLQUFLLGdFQUFUO0FBQ0EsU0FBTyxHQUFHLElBQUgsQ0FBUSxHQUFSLENBQVA7QUFDRCxDOzs7QUNSRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDUkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDTkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDOUJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDckNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1RBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ05BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ05BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ05BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ05BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ05BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ05BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7OztrQkNLZSxZQUFXOztBQUV4QixNQUFJLE9BQU8sU0FBUyxhQUFULENBQXVCLE1BQXZCLENBQVg7QUFDQSxNQUFJLENBQUMsSUFBTCxFQUFXO0FBQ1Q7QUFDRDs7QUFFRCxNQUFJLFFBQVEsU0FBUyxhQUFULENBQXVCLE1BQXZCLENBQVo7O0FBRUE7QUFDQSxNQUFJLGFBQWEsS0FBSyxTQUFMLENBQWUsSUFBZixDQUFqQjtBQUNBLGFBQVcsU0FBWCxDQUFxQixHQUFyQixDQUF5QixhQUF6QjtBQUNBLFFBQU0sWUFBTixDQUFtQixVQUFuQixFQUErQixNQUFNLFVBQXJDOztBQUVBLE1BQUksa0JBQWtCLFNBQVMsYUFBVCxDQUF1QixvQkFBdkIsQ0FBdEI7QUFDQSxNQUFJLGVBQUo7QUFDQSxNQUFJLGVBQUosRUFBcUI7QUFDbkIsc0JBQWtCLGdCQUFnQixTQUFoQixDQUEwQixJQUExQixDQUFsQjtBQUNBLG9CQUFnQixTQUFoQixDQUEwQixHQUExQixDQUE4QiwyQkFBOUI7QUFDQSxVQUFNLFlBQU4sQ0FBbUIsZUFBbkIsRUFBb0MsTUFBTSxVQUExQztBQUNEOztBQUVEO0FBQ0E7QUFDQSw4QkFBYSxZQUFXO0FBQ3RCLGVBQVcsU0FBWCxDQUFxQixNQUFyQixDQUE0QixhQUE1QjtBQUNBLFFBQUksZUFBSixFQUFxQjtBQUNuQixzQkFBZ0IsU0FBaEIsQ0FBMEIsTUFBMUIsQ0FBaUMsa0NBQWpDO0FBQ0Q7QUFDRixHQUxELEVBS0csWUFBVztBQUNaLFFBQUksT0FBTyxPQUFQLEdBQWlCLE9BQU8sV0FBNUIsRUFBeUM7QUFDdkMsaUJBQVcsU0FBWCxDQUFxQixHQUFyQixDQUF5QixhQUF6QjtBQUNBLFVBQUksZUFBSixFQUFxQjtBQUNuQix3QkFBZ0IsU0FBaEIsQ0FBMEIsR0FBMUIsQ0FBOEIsa0NBQTlCO0FBQ0Q7QUFDRjtBQUNGLEdBWkQ7O0FBY0E7Ozs7QUFJQSxNQUFJLFFBQVEsU0FBUixLQUFRLEdBQVc7QUFDckIsUUFBSSxZQUFZLE9BQU8sT0FBUCxJQUFrQixTQUFTLGVBQVQsQ0FBeUIsU0FBM0Q7QUFDQSxRQUFJLGFBQWEsQ0FBakIsRUFBb0I7QUFDbEIsaUJBQVcsU0FBWCxDQUFxQixHQUFyQixDQUF5QixhQUF6QjtBQUNBLGlCQUFXLFNBQVgsQ0FBcUIsTUFBckIsQ0FBNEIsYUFBNUI7QUFDQSxVQUFJLGVBQUosRUFBcUI7QUFDbkIsd0JBQWdCLFNBQWhCLENBQTBCLE1BQTFCLENBQWlDLGtDQUFqQztBQUNEO0FBQ0YsS0FORCxNQU1PO0FBQ0wsaUJBQVcsU0FBWCxDQUFxQixNQUFyQixDQUE0QixhQUE1QjtBQUNEO0FBQ0QsUUFBSSxlQUFKLEVBQXFCO0FBQ25CLFVBQUksWUFBWSxnQkFBZ0IsWUFBaEIsR0FBK0IsT0FBTyxXQUF0RDtBQUNBLFVBQUksK0JBQWdCLGVBQWhCLEVBQWlDLENBQUMsQ0FBRCxHQUFLLFNBQXRDLENBQUosRUFBc0Q7QUFDcEQsd0JBQWdCLFNBQWhCLENBQTBCLEdBQTFCLENBQThCLFFBQTlCO0FBQ0QsT0FGRCxNQUVPO0FBQ0wsd0JBQWdCLFNBQWhCLENBQTBCLE1BQTFCLENBQWlDLFFBQWpDO0FBQ0Q7QUFDRjtBQUNGLEdBbkJEOztBQXFCQSxTQUFPLGdCQUFQLENBQXdCLFFBQXhCLEVBQWtDLHdCQUFTLEtBQVQsQ0FBbEM7QUFDQSxTQUFPLGdCQUFQLENBQXdCLFFBQXhCLEVBQWtDLHdCQUFTLEtBQVQsQ0FBbEM7O0FBRUE7QUFDQSxtQ0FBYyxJQUFkLENBQW1CLFlBQVc7QUFDNUIsMEJBQU8scUJBQVAsRUFBOEIsT0FBOUIsQ0FBc0MsVUFBUyxPQUFULEVBQWtCO0FBQ3RELGNBQVEsU0FBUixHQUFvQixnQkFBcEI7QUFDRCxLQUZEO0FBR0QsR0FKRCxFQUlHLEtBSkgsQ0FJUyxZQUFXLENBQUUsQ0FKdEI7QUFNRCxDOztBQS9FRDs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7Ozs7Ozs7Ozs7O2tCQ21RZSxZQUFXO0FBQ3pCLGlCQUFnQixTQUFTLGFBQVQsQ0FBdUIsa0JBQXZCLENBQWhCOztBQUVBLEtBQUksQ0FBQyxhQUFMLEVBQW9CO0FBQ25CO0FBQ0E7O0FBRUQ7QUFDQSxRQUFPLGNBQWMsYUFBZCxDQUE0QixXQUE1QixDQUFQO0FBQ0Esa0JBQWlCLFNBQVMsYUFBVCxDQUF1QixrQkFBdkIsQ0FBakI7QUFDQSxlQUFjLHNCQUFPLFdBQVAsRUFBb0IsYUFBcEIsQ0FBZDs7QUFFQTtBQUNBLCtCQUFlLFdBQWYsRUFBNEIsaUJBQTVCOztBQUVBO0FBQ0E7O0FBRUE7QUFDQSxrQ0FBYyxJQUFkLENBQW1CLGNBQW5CLEVBQW1DLEtBQW5DLENBQXlDLFlBQVcsQ0FBRSxDQUF0RDs7QUFFQTtBQUNBLEtBQUksYUFBYSxPQUFiLENBQXFCLFVBQVUsT0FBTyxNQUF0QyxDQUFKLEVBQW1EO0FBQ2xEO0FBQ0E7O0FBRUQsdUJBQU8sY0FBUCxFQUF1QixPQUF2QixDQUErQixlQUEvQjtBQUNBLE1BQUssZ0JBQUwsQ0FBc0IsT0FBdEIsRUFBK0IsY0FBL0I7O0FBRUE7QUFDQSxVQUFTLGFBQVQsQ0FBdUIsbUNBQXZCLEVBQTRELGdCQUE1RCxDQUE2RSxPQUE3RSxFQUFzRixVQUFTLENBQVQsRUFBWTtBQUNqRyxJQUFFLGNBQUY7QUFDQSxXQUFTLGFBQVQsQ0FBdUIsa0NBQXZCLEVBQTJELFNBQTNELENBQXFFLE1BQXJFLENBQTRFLFFBQTVFO0FBQ0EsRUFIRDs7QUFLQSx1QkFBTyxjQUFQLEVBQXVCLE9BQXZCLENBQStCLFVBQVMsWUFBVCxFQUF1QjtBQUNyRCxNQUFJLFNBQVMsYUFBYSxVQUFiLENBQXdCLGFBQXhCLENBQXNDLGlCQUF0QyxDQUFiOztBQUVBLGVBQWEsZ0JBQWIsQ0FBOEIsT0FBOUIsRUFBdUMsWUFBVztBQUNqRCxVQUFPLEtBQVA7QUFDQSxHQUZEOztBQUlBLFNBQU8sZ0JBQVAsQ0FBd0IsT0FBeEIsRUFBaUMsWUFBVztBQUMzQyxPQUFJLE9BQU8sS0FBUCxLQUFpQixFQUFyQixFQUF5QjtBQUN4QixpQkFBYSxTQUFiLENBQXVCLE1BQXZCLENBQThCLHdCQUE5QjtBQUNBLElBRkQsTUFFTztBQUNOLGlCQUFhLFNBQWIsQ0FBdUIsR0FBdkIsQ0FBMkIsd0JBQTNCO0FBQ0E7QUFDRCxHQU5EO0FBT0EsRUFkRDtBQWdCQSxDOztBQTFURDs7OztBQUNBOzs7O0FBQ0E7O0lBQVksRzs7QUFDWjs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7Ozs7O0FBRUE7QUFDQSxJQUFJLGFBQUosQyxDQWhCQTs7OztBQUlBOztBQWFBLElBQUksSUFBSjtBQUNBLElBQUksV0FBSjtBQUNBLElBQUksY0FBSjtBQUNBLElBQUksZUFBSjtBQUNBLElBQUksZUFBSjtBQUNBLElBQUksa0JBQUo7QUFDQSxJQUFJLGdCQUFKOztBQUVBLElBQUksb0JBQW9CLFNBQXBCLGlCQUFvQixDQUFTLEtBQVQsRUFBZ0I7QUFDdkMsS0FBSSxLQUFKLEVBQVc7QUFDVixPQUFLLFNBQUwsQ0FBZSxNQUFmLENBQXNCLGVBQXRCO0FBQ0EsRUFGRCxNQUVPO0FBQ04sT0FBSyxTQUFMLENBQWUsR0FBZixDQUFtQixlQUFuQjtBQUNBO0FBQ0QsQ0FORDs7QUFRQTs7O0FBR0Esa0JBQWtCLDJCQUFXO0FBQzVCLHVCQUFPLG1CQUFQLEVBQTRCLE9BQTVCLENBQW9DLFVBQVMsT0FBVCxFQUFrQjtBQUNyRCxVQUFRLGdCQUFSLENBQXlCLE9BQXpCLEVBQWtDLFVBQVMsQ0FBVCxFQUFZO0FBQzdDLEtBQUUsY0FBRjtBQUNBLE9BQUksY0FBSixDQUFtQixRQUFRLE9BQVIsQ0FBZ0IsU0FBbkMsRUFBOEMsUUFBUSxPQUFSLENBQWdCLElBQTlELEVBQ0UsSUFERixDQUNPLFVBQVMsSUFBVCxFQUFlO0FBQ3BCLG9CQUFnQixLQUFLLFNBQXJCO0FBQ0EsdUJBQW1CLEtBQUssU0FBeEI7QUFDQSxJQUpGO0FBS0EsR0FQRDtBQVFBLEVBVEQ7QUFVQSxDQVhEOztBQWFBOzs7Ozs7QUFNQSxtQkFBbUIsMEJBQVMsU0FBVCxFQUFvQjtBQUN0QyxLQUFJLFlBQVksVUFBVSxhQUFWLENBQXdCLHNCQUF4QixDQUFoQjtBQUNBLEtBQUksQ0FBQyxTQUFMLEVBQWdCO0FBQ2Y7QUFDQTtBQUNELFdBQVUsZ0JBQVYsQ0FBMkIsT0FBM0IsRUFBb0MsVUFBUyxDQUFULEVBQVk7QUFDL0MsSUFBRSxjQUFGO0FBQ0EsTUFBSSxXQUFXLFVBQVUsYUFBVixDQUF3QixvQkFBeEIsQ0FBZjtBQUNBLE1BQUkscUJBQXFCLFVBQVUsVUFBbkM7O0FBRUEscUJBQW1CLFVBQW5CLENBQThCLFdBQTlCLENBQTBDLGtCQUExQztBQUNBLFdBQVMsVUFBVCxDQUFvQixXQUFwQixDQUFnQyxRQUFoQzs7QUFFQSxZQUFVLGFBQVYsQ0FBd0IsaUJBQXhCLEVBQTJDLFNBQTNDLENBQXFELE1BQXJELENBQTRELFFBQTVEO0FBQ0EsRUFURDtBQVVBLENBZkQ7O0FBaUJBOzs7Ozs7O0FBT0Esa0JBQWtCLHlCQUFTLFNBQVQsRUFBb0I7QUFDckMsS0FBSSxPQUFPLEVBQVg7QUFDQSxXQUFVLE9BQVYsQ0FBa0IsVUFBUyxRQUFULEVBQW1CO0FBQ3BDLFVBQVEsd0JBQWlCLFFBQWpCLENBQVI7QUFDQSxFQUZEO0FBR0EsZ0JBQWUsU0FBZixHQUEyQixJQUEzQjtBQUNBLHVCQUFXLENBQVg7QUFDQTtBQUNBLHVCQUFPLFdBQVAsRUFBb0IsY0FBcEIsRUFBb0MsT0FBcEMsQ0FBNEMsZ0JBQTVDO0FBQ0EsQ0FURDs7QUFXQTs7OztBQUlBLHFCQUFxQiw0QkFBUyxTQUFULEVBQW9CO0FBQ3hDLHVCQUFPLG1CQUFQLEVBQTRCLE9BQTVCLENBQW9DLFVBQVMsVUFBVCxFQUFxQjtBQUN4RCxhQUFXLFNBQVgsR0FBdUIsVUFBVSxNQUFqQztBQUNBLEVBRkQ7QUFHQSxDQUpEOztBQU1BOzs7O0FBSUEsSUFBSSxpQkFBaUIsU0FBakIsY0FBaUIsQ0FBUyxLQUFULEVBQWdCO0FBQ3BDLHVCQUFPLGVBQVAsRUFBd0IsT0FBeEIsQ0FBZ0MsVUFBUyxNQUFULEVBQWlCO0FBQ2hELE1BQUksQ0FBQyxNQUFNLEtBQU4sQ0FBTCxFQUFtQjtBQUNsQixVQUFPLFNBQVAsR0FBbUIsS0FBbkI7QUFDQSxHQUZELE1BRU8sSUFBSSxNQUFNLE9BQU8sU0FBYixDQUFKLEVBQTZCO0FBQ25DLFVBQU8sU0FBUCxHQUFtQixDQUFuQjtBQUNBLEdBRk0sTUFFQTtBQUNOLFVBQU8sU0FBUCxHQUFtQixTQUFTLE9BQU8sU0FBaEIsSUFBNkIsQ0FBaEQ7QUFDQTtBQUNELEVBUkQ7QUFTQSxDQVZEOztBQVlBOzs7OztBQUtBLElBQUksYUFBYSxTQUFiLFVBQWEsR0FBVztBQUMzQixLQUFJLE9BQUosR0FBYyxJQUFkLENBQW1CLFVBQVMsSUFBVCxFQUFlO0FBQ2pDLGtCQUFnQixLQUFLLFNBQXJCO0FBQ0EscUJBQW1CLEtBQUssU0FBeEI7QUFDQSxpQkFBZSxLQUFLLEtBQXBCO0FBQ0EsRUFKRDtBQUtBLENBTkQ7O0FBUUE7Ozs7OztBQU1BLElBQUksaUJBQWlCLFNBQWpCLGNBQWlCLENBQVMsQ0FBVCxFQUFZO0FBQ2hDLEdBQUUsY0FBRjs7QUFFQSxLQUFJLFdBQVcsU0FBUyxhQUFULENBQXVCLE1BQXZCLEVBQStCLFNBQS9CLENBQXlDLFFBQXpDLENBQWtELGdCQUFsRCxDQUFmOztBQUVBO0FBQ0EsS0FBSSxXQUFXLFlBQVksSUFBWixDQUFpQixVQUFTLFVBQVQsRUFBcUI7QUFDcEQsTUFBSSxXQUFXLFNBQVgsQ0FBcUIsUUFBckIsQ0FBOEIscUJBQTlCLENBQUosRUFBMEQ7QUFDekQsT0FBSSxpQkFBaUIsV0FBVyxhQUFYLENBQXlCLGlCQUF6QixDQUFyQjtBQUNBLGtCQUFlLEtBQWY7QUFDQSxVQUFPLElBQVA7QUFDQTtBQUNELEVBTmMsQ0FBZjs7QUFRQSxLQUFJLFFBQUosRUFBYztBQUNiO0FBQ0E7O0FBRUQ7QUFDQSxLQUFJLFdBQVcsRUFBZjtBQUNBLHVCQUFPLGlCQUFQLEVBQTBCLGFBQTFCLEVBQXlDLE9BQXpDLENBQWlELFVBQVMsTUFBVCxFQUFpQjtBQUNqRSxNQUFJLE9BQU8sT0FBTyxZQUFQLENBQW9CLE1BQXBCLENBQVg7QUFDQSxNQUFJLE9BQU8sS0FBWCxFQUFrQjtBQUNqQixZQUFTLElBQVQsSUFBaUIsT0FBTyxLQUF4QjtBQUNBO0FBQ0QsRUFMRDs7QUFPQSxNQUFLLFNBQUwsR0FBaUIsWUFBakI7QUFDQSxNQUFLLFNBQUwsQ0FBZSxHQUFmLENBQW1CLGVBQW5CO0FBQ0EsS0FBSSxXQUFKLENBQWdCLFFBQWhCLEVBQTBCLElBQTFCLENBQStCLFVBQVMsSUFBVCxFQUFlO0FBQzdDLGtCQUFnQixLQUFLLFNBQXJCO0FBQ0EscUJBQW1CLEtBQUssU0FBeEI7O0FBRUE7QUFDQSxNQUFJLGdCQUFnQixlQUFlLGFBQWYsQ0FBNkIsc0JBQTdCLENBQXBCO0FBQ0EsTUFBSSxTQUFTLG9DQUFVLGFBQVYsQ0FBYjtBQUNBLFNBQU8sUUFBUCxDQUFnQixDQUFoQixFQUFtQixTQUFVLE1BQU0sT0FBTyxXQUExQzs7QUFFQTtBQUNBLE9BQUssU0FBTCxHQUFpQixTQUFqQjtBQUNBLE1BQUksUUFBSixFQUFjO0FBQ2IsT0FBSSxRQUFRLGNBQWMsYUFBZCxDQUE0Qix1QkFBNUIsQ0FBWjtBQUNBLFNBQU0sU0FBTixDQUFnQixHQUFoQixDQUFvQixxQkFBcEI7QUFDQSxTQUFNLFNBQU4sQ0FBZ0IsTUFBaEIsQ0FBdUIsaUJBQXZCO0FBQ0EsU0FBTSxhQUFOLENBQW9CLFVBQXBCLEVBQWdDLEtBQWhDLEdBQXdDLEVBQXhDO0FBQ0EsU0FBTSxhQUFOLENBQW9CLGNBQXBCLEVBQW9DLFNBQXBDLENBQThDLE1BQTlDLENBQXFELHdCQUFyRDtBQUNBLEdBTkQsTUFNTztBQUNOLGVBQVksT0FBWixDQUFvQixVQUFTLFVBQVQsRUFBcUI7QUFDeEMsUUFBSSxXQUFXLE9BQVgsQ0FBbUIsZ0JBQW5CLEtBQXdDLFNBQTVDLEVBQXVEO0FBQ3RELGdCQUFXLFNBQVgsQ0FBcUIsR0FBckIsQ0FBeUIscUJBQXpCO0FBQ0EsZ0JBQVcsU0FBWCxDQUFxQixNQUFyQixDQUE0QixpQkFBNUI7QUFDQTtBQUNELGVBQVcsYUFBWCxDQUF5QixpQkFBekIsRUFBNEMsS0FBNUMsR0FBb0QsRUFBcEQ7QUFDQSxlQUFXLGFBQVgsQ0FBeUIsY0FBekIsRUFBeUMsU0FBekMsQ0FBbUQsTUFBbkQsQ0FBMEQsd0JBQTFEO0FBQ0EsSUFQRDtBQVFBO0FBQ0QsRUEzQkQ7QUE2QkEsQ0ExREQ7O0FBNERBOzs7O0FBSUEsSUFBSSxRQUFRLFNBQVIsS0FBUSxHQUFXO0FBQ3RCLEtBQUksZUFBZSxTQUFTLGFBQVQsQ0FBdUIsc0JBQXZCLENBQW5CO0FBQ0EsY0FBYSxZQUFiLENBQTBCLEtBQTFCLEVBQWlDLDJDQUFqQztBQUNBLGNBQWEsWUFBYixDQUEwQixVQUExQixFQUFzQywyQ0FBdEM7O0FBRUEsdUJBQU8seUJBQVAsRUFBa0MsT0FBbEMsQ0FBMEMsVUFBUyxXQUFULEVBQXNCO0FBQy9ELGNBQVksWUFBWixDQUF5QixLQUF6QixFQUFnQywyQ0FBaEM7QUFDQSxjQUFZLFlBQVosQ0FBeUIsVUFBekIsRUFBcUMsMkNBQXJDO0FBQ0EsRUFIRDs7QUFLQTtBQUNBLHVCQUFPLGNBQVAsRUFBdUIsT0FBdkIsQ0FBK0I7QUFBQSxTQUFTLE1BQU0sU0FBTixDQUFnQixHQUFoQixDQUFvQixVQUFwQixDQUFUO0FBQUEsRUFBL0I7QUFDQSxDQVpEOztBQWNBOzs7OztBQUtBLElBQUksa0JBQWtCLFNBQWxCLGVBQWtCLENBQVMsT0FBVCxFQUFrQjtBQUN2QyxTQUFRLGdCQUFSLENBQXlCLE9BQXpCLEVBQWtDLFVBQVMsQ0FBVCxFQUFZO0FBQzdDLElBQUUsY0FBRjs7QUFFQTtBQUNBLE1BQUksYUFBYSxPQUFiLENBQXFCLFVBQVUsT0FBTyxNQUF0QyxDQUFKLEVBQW1EO0FBQ2xEO0FBQ0E7O0FBRUQsZUFBYSxPQUFiLENBQXFCLFVBQVUsT0FBTyxNQUF0QyxFQUE4QyxJQUE5QztBQUNBO0FBQ0E7QUFDQSxNQUFJLElBQUo7QUFDQSxFQVpEO0FBYUEsQ0FkRDs7QUFnQkE7Ozs7OztBQU1BLElBQUksaUJBQWlCLFNBQWpCLGNBQWlCLENBQVMsSUFBVCxFQUFlO0FBQ25DLEtBQUksT0FBTyw0QkFBaUIsSUFBakIsQ0FBWDtBQUNBLEtBQUksUUFBUSxTQUFTLGFBQVQsQ0FBdUIsS0FBdkIsQ0FBWjtBQUNBLE9BQU0sU0FBTixHQUFrQixJQUFsQjtBQUNBLEtBQUksVUFBVSxTQUFTLGFBQVQsQ0FBdUIscUJBQXZCLENBQWQ7O0FBRUE7QUFDQSx1QkFBTyx3QkFBUCxFQUFpQyxPQUFqQyxDQUF5QyxVQUFTLE1BQVQsRUFBaUI7QUFDekQsTUFBSSxPQUFPLE9BQU8sWUFBUCxDQUFvQixNQUFwQixDQUFYO0FBQ0EsTUFBSSxTQUFTLFNBQWIsRUFBd0I7QUFDdkIsVUFBTyxLQUFQLEdBQWUsYUFBYSxLQUFLLElBQWpDO0FBQ0EsR0FGRCxNQUVPO0FBQ04sVUFBTyxLQUFQLEdBQWUsS0FBSyxJQUFMLENBQWY7QUFDQTtBQUNELFNBQU8sVUFBUCxDQUFrQixTQUFsQixDQUE0QixHQUE1QixDQUFnQyxpQkFBaEM7QUFDQSxTQUFPLFVBQVAsQ0FBa0IsU0FBbEIsQ0FBNEIsTUFBNUIsQ0FBbUMscUJBQW5DO0FBQ0EsRUFURDs7QUFXQTtBQUNBLFNBQVEsVUFBUixDQUFtQixZQUFuQixDQUFnQyxLQUFoQyxFQUF1QyxRQUFRLFdBQS9DO0FBQ0EsdUJBQVcsQ0FBWDtBQUNBLHlCQUFhLFdBQWIsRUFBMEIsaUJBQTFCO0FBQ0EsQ0F0QkQ7O0FBd0JBOzs7Ozs7Ozs7Ozs7a0JDOUtlLFlBQVc7O0FBRXpCLGdCQUFlLFNBQVMsYUFBVCxDQUF1QixnQkFBdkIsQ0FBZjtBQUNBLGVBQWMsU0FBUyxhQUFULENBQXVCLGVBQXZCLENBQWQ7O0FBRUEsS0FBSSxDQUFDLFlBQUQsSUFBaUIsQ0FBQyxXQUF0QixFQUFtQztBQUNsQztBQUNBO0FBQ0QsY0FBYSxnQkFBYixDQUE4QixPQUE5QixFQUF1QyxZQUFXO0FBQ2pELFNBQU8sYUFBYSxLQUFwQjtBQUNBLEVBRkQ7O0FBSUEsY0FBYSxLQUFiOztBQUVBLGFBQVksWUFBWixDQUF5QixPQUF6QixtQkFBaUQsT0FBTyxXQUF4RDtBQUVBLEM7O0FBMUdEOzs7O0FBQ0E7Ozs7QUFDQTs7SUFBWSxHOztBQUNaOzs7O0FBQ0E7Ozs7QUFDQTs7Ozs7Ozs7QUFFQSxJQUFNLGNBQWMsRUFBcEI7O0FBRUEsSUFBSSxZQUFKO0FBQ0EsSUFBSSxXQUFKO0FBQ0EsSUFBSSxnQkFBZ0IsQ0FBcEI7O0FBRUEsSUFBSSxrQkFBa0IsU0FBbEIsZUFBa0IsQ0FBUyxJQUFULEVBQWU7QUFDcEMsS0FBSSxXQUFXLE9BQU8sS0FBUCxDQUFhLEdBQWIsQ0FBaUIsR0FBakIsQ0FBcUIsSUFBckIsRUFBMkI7QUFDekMsV0FBUztBQURnQyxFQUEzQixDQUFmO0FBR0EsS0FBSSxXQUFXLFNBQVMsTUFBVCxDQUFnQixTQUFTLE9BQVQsQ0FBaUIsUUFBakIsQ0FBaEIsRUFBNEMsU0FBUyxNQUFyRCxDQUFmO0FBQ0EsUUFBTyxNQUFNLFFBQU4sRUFDTCxJQURLLENBQ0EsVUFBUyxRQUFULEVBQW1CO0FBQ3hCLE1BQUksU0FBUyxNQUFULElBQW1CLEdBQXZCLEVBQTRCO0FBQzNCLFVBQU8sUUFBUSxNQUFSLENBQWUsUUFBZixDQUFQO0FBQ0E7QUFDRCxTQUFPLFFBQVA7QUFDQSxFQU5LLEVBT0wsSUFQSyxDQU9BO0FBQUEsU0FBWSxTQUFTLElBQVQsRUFBWjtBQUFBLEVBUEEsQ0FBUDtBQVFBLENBYkQ7O0FBZUEsSUFBSSxnQkFBZ0IsU0FBaEIsYUFBZ0IsQ0FBUyxPQUFULEVBQWtCO0FBQ3JDLEtBQUksT0FBTyxRQUFRLEdBQVIsQ0FBWSxVQUFTLE1BQVQsRUFBaUI7QUFDdkMsTUFBSSxPQUFPLEtBQVgsRUFBa0I7QUFDakIsVUFBTyxvQkFBYSxPQUFPLEtBQVAsQ0FBYSxDQUFiLENBQWIsQ0FBUDtBQUNBO0FBQ0QsTUFBSSxPQUFPLEtBQVgsRUFBa0I7QUFDakIsVUFBTyxzQkFBZSxPQUFPLEtBQVAsQ0FBYSxDQUFiLENBQWYsQ0FBUDtBQUNBO0FBQ0QsTUFBSSxPQUFPLElBQVgsRUFBaUI7QUFDaEIsVUFBTyxtQkFBWSxPQUFPLElBQVAsQ0FBWSxDQUFaLENBQVosQ0FBUDtBQUNBO0FBQ0QsU0FBTyxFQUFQO0FBQ0EsRUFYVSxFQVdSLElBWFEsQ0FXSCxFQVhHLENBQVg7QUFZQSxhQUFZLFNBQVosR0FBd0IsSUFBeEI7QUFDQSx1QkFBVyxDQUFYO0FBQ0EsdUJBQU8sY0FBUCxFQUF1QixXQUF2QixFQUFvQyxPQUFwQyxDQUE0QyxVQUFTLFFBQVQsRUFBbUIsQ0FBbkIsRUFBc0I7QUFDakUsYUFBVyxZQUFXO0FBQ3JCLFlBQVMsU0FBVCxDQUFtQixNQUFuQixDQUEwQixRQUExQjtBQUNBLGNBQVc7QUFBQSxXQUFNLFNBQVMsU0FBVCxDQUFtQixHQUFuQixDQUF1QixpQkFBdkIsQ0FBTjtBQUFBLElBQVgsRUFBNEQsQ0FBNUQ7QUFDQSxHQUhELEVBR0csSUFBSSxHQUhQO0FBSUEsRUFMRDtBQU1BLENBckJEOztBQXVCQSxJQUFJLFNBQVMsU0FBVCxNQUFTLENBQVMsS0FBVCxFQUFnQjs7QUFFNUIsS0FBSSxLQUFLLEVBQUUsYUFBWDtBQUNBLEtBQUksVUFBVSxLQUFLLEdBQUwsS0FBYSxHQUEzQjs7QUFFQSxhQUFZLFNBQVosR0FBd0IsRUFBeEI7O0FBRUEsS0FBSSxXQUFXLFNBQVgsUUFBVyxDQUFTLElBQVQsRUFBZTtBQUM3QixNQUFJLE9BQU8sYUFBWCxFQUEwQjtBQUN6QixVQUFPLFFBQVEsTUFBUixFQUFQO0FBQ0E7QUFDRCxTQUFPLElBQVA7QUFDQSxFQUxEOztBQU9BLEtBQUksY0FBSixDQUFtQixLQUFuQixFQUNFLElBREYsQ0FDTyxRQURQLEVBRUUsSUFGRixDQUVPLFVBQVMsT0FBVCxFQUFrQjtBQUN2QixNQUFJLFdBQVcsUUFBUSxLQUFSLENBQWMsQ0FBZCxFQUFpQixXQUFqQixFQUE4QixHQUE5QixDQUFrQyxVQUFTLEtBQVQsRUFBZ0I7QUFDaEUsVUFBTyxnQkFBZ0IsTUFBTSxHQUF0QixDQUFQO0FBQ0EsR0FGYyxDQUFmO0FBR0EsU0FBTyxRQUFRLEdBQVIsQ0FBWSxRQUFaLENBQVA7QUFDQSxFQVBGLEVBUUUsSUFSRixDQVFPLFVBQVMsSUFBVCxFQUFlO0FBQ3BCLE1BQUksVUFBVSxLQUFLLEdBQUwsRUFBZCxFQUEwQjtBQUN6QixVQUFPLElBQVA7QUFDQTtBQUNELFNBQU8sSUFBSSxPQUFKLENBQVksVUFBUyxPQUFULEVBQWtCO0FBQ3BDLGNBQVc7QUFBQSxXQUFNLFFBQVEsSUFBUixDQUFOO0FBQUEsSUFBWCxFQUFnQyxVQUFVLEtBQUssR0FBTCxFQUExQztBQUNBLEdBRk0sQ0FBUDtBQUdBLEVBZkYsRUFnQkUsSUFoQkYsQ0FnQk8sUUFoQlAsRUFpQkUsSUFqQkYsQ0FpQk8sYUFqQlAsRUFrQkUsS0FsQkYsQ0FrQlEsVUFBUyxHQUFULEVBQWM7QUFDcEIsTUFBSSxHQUFKLEVBQVM7QUFDUixXQUFRLEtBQVIsQ0FBYyxHQUFkO0FBQ0E7QUFDRCxFQXRCRjtBQXVCQSxDQXJDRDs7Ozs7Ozs7O2tCQ2dDZSxZQUFXO0FBQ3pCLGdCQUFlLFNBQVMsYUFBVCxDQUF1QixVQUF2QixDQUFmO0FBQ0EsWUFBVyxTQUFTLGFBQVQsQ0FBdUIsV0FBdkIsQ0FBWDs7QUFFQSxLQUFJLENBQUMsWUFBRCxJQUFpQixDQUFDLFFBQXRCLEVBQWdDO0FBQy9CO0FBQ0E7O0FBRUQsaUJBQWdCLFNBQVMsYUFBVCxDQUF1QixrQkFBdkIsQ0FBaEI7QUFDQSxRQUFPLGNBQWMsYUFBZCxDQUE0QixXQUE1QixDQUFQOztBQUVBLFlBQVcsU0FBUyxhQUFULENBQXVCLG9CQUF2QixDQUFYOztBQUVBLFVBQVMsZ0JBQVQsQ0FBMEIsU0FBMUIsRUFBcUMsWUFBckM7QUFDQSxVQUFTLGdCQUFULENBQTBCLE9BQTFCLEVBQW1DLFlBQW5DOztBQUVBO0FBQ0E7QUFDQSxLQUFJLGdCQUFnQixTQUFTLGFBQVQsQ0FBdUIsMkJBQXZCLENBQXBCO0FBQ0EsVUFBUyxhQUFULENBQXVCLHFCQUF2QixFQUE4QyxnQkFBOUMsQ0FBK0QsT0FBL0QsRUFBd0UsVUFBUyxDQUFULEVBQVk7QUFDbkYsSUFBRSxjQUFGO0FBQ0EsTUFBSSxrQkFBa0IsaUJBQXRCO0FBQ0EsZ0JBQWMsS0FBZCxVQUEyQixlQUEzQjtBQUdBLGdCQUFjLEtBQWQ7QUFDQSxnQkFBYyxVQUFkLENBQXlCLFNBQXpCLENBQW1DLEdBQW5DLENBQXVDLGlCQUF2QztBQUNBLGdCQUFjLFVBQWQsQ0FBeUIsU0FBekIsQ0FBbUMsTUFBbkMsQ0FBMEMscUJBQTFDO0FBQ0EsZ0JBQWMsVUFBZCxDQUF5QixhQUF6QixDQUF1QyxjQUF2QyxFQUF1RCxTQUF2RCxDQUFpRSxHQUFqRSxDQUFxRSx3QkFBckU7QUFDQSxNQUFJLFFBQVEsd0JBQWEsc0JBQU8sV0FBUCxFQUFvQixhQUFwQixDQUFiLENBQVo7QUFDQSxNQUFJLEtBQUosRUFBVztBQUNWLFFBQUssU0FBTCxDQUFlLE1BQWYsQ0FBc0IsZUFBdEI7QUFDQSxHQUZELE1BRU87QUFDTixRQUFLLFNBQUwsQ0FBZSxHQUFmLENBQW1CLGVBQW5CO0FBQ0E7QUFDRCxFQWhCRDtBQWlCQSxDOztBQWxIRDs7OztBQUNBOzs7Ozs7QUFFQTtBQVJBOzs7OztBQVNBLElBQUksWUFBSjtBQUNBLElBQUksUUFBSjtBQUNBLElBQUksUUFBSjtBQUNBLElBQUksYUFBSjtBQUNBLElBQUksSUFBSjs7QUFHQTs7OztBQUlBLElBQUksa0JBQWtCLFNBQWxCLGVBQWtCLEdBQVc7QUFDaEMsS0FBSSxPQUFPLEVBQVg7QUFDQSxLQUFJLE9BQU8sT0FBTyxZQUFkLEtBQStCLFdBQW5DLEVBQWdEO0FBQy9DLFNBQU8sT0FBTyxZQUFQLEdBQXNCLFFBQXRCLEVBQVA7QUFDQSxFQUZELE1BRU8sSUFBSSxPQUFPLFNBQVMsU0FBaEIsS0FBOEIsV0FBOUIsSUFBNkMsU0FBUyxTQUFULENBQW1CLElBQW5CLEtBQTRCLE1BQTdFLEVBQXFGO0FBQzNGLFNBQU8sU0FBUyxTQUFULENBQW1CLFdBQW5CLEdBQWlDLElBQXhDO0FBQ0E7QUFDRCxRQUFPLElBQVA7QUFDQSxDQVJEOztBQVVBOzs7OztBQUtBLElBQUksa0JBQWtCLFNBQWxCLGVBQWtCLENBQVMsU0FBVCxFQUFvQjtBQUN6QyxLQUFJLGFBQWEsVUFBVSxVQUFWLENBQXFCLGFBQXRDOztBQUVBLFFBQU8sZUFBZSxZQUFmLElBQStCLFdBQVcsVUFBakQsRUFBNkQ7QUFDNUQsZUFBYSxXQUFXLFVBQXhCO0FBQ0E7O0FBRUQsUUFBUSxlQUFlLFlBQXZCO0FBRUEsQ0FURDs7QUFXQTs7OztBQUlBLElBQUksZUFBZSxTQUFmLFlBQWUsR0FBVzs7QUFFN0I7QUFDQSxZQUFXLFlBQVc7O0FBRXJCLE1BQUksa0JBQWtCLGlCQUF0Qjs7QUFFQTtBQUNBLE1BQUksQ0FBQyxlQUFMLEVBQXNCO0FBQ3JCLFlBQVMsU0FBVCxDQUFtQixNQUFuQixDQUEwQixtQkFBMUI7QUFDQTtBQUNBOztBQUVEO0FBQ0EsTUFBSSxZQUFZLE9BQU8sWUFBUCxFQUFoQjtBQUNBLE1BQUksQ0FBQyxnQkFBZ0IsU0FBaEIsQ0FBTCxFQUFpQztBQUNoQyxZQUFTLFNBQVQsQ0FBbUIsTUFBbkIsQ0FBMEIsbUJBQTFCO0FBQ0E7QUFDQTs7QUFFRDtBQUNBLFdBQVMsWUFBVCxDQUFzQixNQUF0Qiw2Q0FBdUUsbUJBQW1CLGVBQW5CLENBQXZFLGFBQWtILG1CQUFtQixTQUFTLE9BQVQsQ0FBaUIsR0FBcEMsQ0FBbEg7O0FBRUE7QUFDQSxNQUFJLGlCQUFrQixPQUFPLE9BQVAsSUFBa0IsU0FBUyxlQUFULENBQXlCLFNBQWpFO0FBQ0EsTUFBSSxRQUFRLFVBQVUsVUFBVixDQUFxQixDQUFyQixDQUFaO0FBQ0EsTUFBSSxPQUFPLE1BQU0scUJBQU4sRUFBWDtBQUNBLFdBQVMsS0FBVCxDQUFlLEdBQWYsR0FBc0IsS0FBSyxHQUFMLEdBQVcsY0FBWixHQUE4QixJQUFuRDtBQUNBLFdBQVMsU0FBVCxDQUFtQixHQUFuQixDQUF1QixtQkFBdkI7QUFDQSxXQUFTLEtBQVQsQ0FBZSxJQUFmLEdBQXVCLE1BQU0sS0FBSyxJQUFYLEdBQWtCLE1BQU0sS0FBSyxLQUE3QixHQUFxQyxNQUFNLFNBQVMsV0FBckQsR0FBb0UsSUFBMUY7QUFDQSxFQTNCRCxFQTJCRyxFQTNCSDtBQTRCQSxDQS9CRDs7Ozs7Ozs7QUNsREE7Ozs7O0FBS0EsSUFBSSxTQUFTLE9BQU8sTUFBcEI7QUFDQSxJQUFJLEtBQUssT0FBTyxNQUFoQjs7QUFFQTs7Ozs7OztBQU9BLElBQUksVUFBVSxTQUFWLE9BQVUsR0FBaUQ7QUFBQSxNQUF4QyxJQUF3Qyx1RUFBakMsRUFBaUM7QUFBQSxNQUE3QixNQUE2Qix1RUFBcEIsS0FBb0I7QUFBQSxNQUFiLElBQWEsdUVBQU4sSUFBTTs7O0FBRTdELE1BQUksZUFBZTtBQUNqQixrQkFEaUI7QUFFakIsYUFBUztBQUNQLHNCQUFnQjtBQURUO0FBRlEsR0FBbkI7O0FBT0EsTUFBSSxJQUFKLEVBQVU7QUFDUixpQkFBYSxJQUFiLEdBQW9CLEtBQUssU0FBTCxDQUFlLElBQWYsQ0FBcEI7QUFDRDs7QUFFRDtBQUNBLFNBQU8sTUFBTSxTQUFTLElBQWYsRUFBcUIsWUFBckIsRUFDSixJQURJLENBQ0MsVUFBUyxRQUFULEVBQW1CO0FBQ3ZCLFFBQUksU0FBUyxNQUFULElBQW1CLEdBQXZCLEVBQTRCO0FBQzFCLGFBQU8sUUFBUSxNQUFSLENBQWUsUUFBZixDQUFQO0FBQ0Q7QUFDRCxXQUFPLFFBQVA7QUFDRCxHQU5JLEVBT0osSUFQSSxDQU9DO0FBQUEsV0FBWSxTQUFTLElBQVQsRUFBWjtBQUFBLEdBUEQsQ0FBUDtBQVFELENBdEJEOztBQXdCQTs7Ozs7O0FBTU8sSUFBSSw0QkFBVSxTQUFWLE9BQVUsQ0FBUyxHQUFULEVBQWM7QUFDakMsTUFBSSxRQUFRLFNBQVMsRUFBckI7QUFDQSxNQUFJLEdBQUosRUFBUztBQUNQLGFBQVMsTUFBVDtBQUNEO0FBQ0QsU0FBTyxRQUFRLEtBQVIsRUFDSixLQURJLENBQ0UsWUFBVztBQUNoQixXQUFPLFFBQVEsRUFBUixFQUFZLE1BQVosRUFBb0I7QUFDekIsaUJBQVcsRUFEYztBQUV6QixhQUFPLENBRmtCO0FBR3pCO0FBSHlCLEtBQXBCLENBQVA7QUFLRCxHQVBJLENBQVA7QUFRRCxDQWJNOztBQWVBLElBQUksMENBQWlCLFNBQWpCLGNBQWlCLENBQVMsS0FBVCxFQUFnQjtBQUMxQyxTQUFPLFFBQVEsY0FBYyxLQUF0QixDQUFQO0FBQ0QsQ0FGTTs7QUFJUDs7OztBQUlPLElBQUksc0JBQU8sU0FBUCxJQUFPLEdBQVc7QUFDM0IsU0FBTyxRQUFRLEVBQVIsRUFBWSxJQUFaLEVBQ0osSUFESSxDQUNDLFVBQVMsSUFBVCxFQUFlO0FBQ25CLFdBQU8sUUFBUSxTQUFTLEVBQWpCLEVBQXFCLEtBQXJCLEVBQTRCO0FBQ2pDLGFBQU8sS0FBSyxLQUFMLEdBQWE7QUFEYSxLQUE1QixDQUFQO0FBR0QsR0FMSSxDQUFQO0FBTUQsQ0FQTTs7QUFTUDs7OztBQUlPLElBQUksZ0RBQW9CLFNBQXBCLGlCQUFvQixDQUFTLFdBQVQsRUFBc0I7QUFDbkQsTUFBSSxDQUFDLEVBQUwsRUFBUztBQUNQLFdBQU8sUUFBUSxNQUFSLENBQWUsSUFBSSxLQUFKLENBQVUsV0FBVixDQUFmLENBQVA7QUFDRDtBQUNELFNBQU8sUUFBUSxTQUFTLEVBQWpCLEVBQXFCLEtBQXJCLEVBQTRCO0FBQ2pDO0FBRGlDLEdBQTVCLENBQVA7QUFHRCxDQVBNOztBQVNQOzs7OztBQUtPLElBQUksb0NBQWMsU0FBZCxXQUFjLENBQVMsUUFBVCxFQUFtQjtBQUMxQyxTQUFPLFFBQVEsSUFBUixFQUNKLElBREksQ0FDQyxVQUFTLElBQVQsRUFBZTs7QUFFbkI7QUFDQSxhQUFTLFNBQVQsR0FBcUIsSUFBSSxJQUFKLEdBQVcsV0FBWCxFQUFyQjs7QUFFQTtBQUNBLFNBQUssU0FBTCxDQUFlLElBQWYsQ0FBb0IsUUFBcEI7QUFDQSxXQUFPLFFBQVEsU0FBUyxFQUFqQixFQUFxQixLQUFyQixFQUE0QjtBQUNqQyxpQkFBVyxLQUFLO0FBRGlCLEtBQTVCLENBQVA7QUFHRCxHQVhJLENBQVA7QUFZRCxDQWJNOztBQWVQOzs7Ozs7QUFNTyxJQUFJLDBDQUFpQixTQUFqQixjQUFpQixDQUFTLFNBQVQsRUFBb0IsSUFBcEIsRUFBMEI7QUFDcEQsU0FBTyxRQUFRLElBQVIsRUFDSixJQURJLENBQ0MsVUFBUyxJQUFULEVBQWU7O0FBRW5CO0FBQ0EsUUFBSSxZQUFZLEtBQUssU0FBTCxDQUFlLE1BQWYsQ0FBc0IsVUFBUyxRQUFULEVBQW1CO0FBQ3ZELGFBQVEsU0FBUyxTQUFULEtBQXVCLFNBQXZCLElBQW9DLFNBQVMsSUFBVCxLQUFrQixJQUE5RDtBQUNELEtBRmUsQ0FBaEI7O0FBSUEsV0FBTyxRQUFRLFNBQVMsRUFBakIsRUFBcUIsS0FBckIsRUFBNEI7QUFDakM7QUFEaUMsS0FBNUIsQ0FBUDtBQUdELEdBWEksQ0FBUDtBQVlELENBYk07Ozs7Ozs7OztrQkM3R1EsVUFBUyxXQUFULEVBQXNCLFFBQXRCLEVBQWdDO0FBQzlDLGFBQVksT0FBWixDQUFvQixVQUFTLGtCQUFULEVBQTZCO0FBQ2hELE1BQUksaUJBQWlCLG1CQUFtQixhQUFuQixDQUFpQyxpQkFBakMsQ0FBckI7O0FBRUEsaUJBQWUsZ0JBQWYsQ0FBZ0MsT0FBaEMsRUFBeUMsWUFBVztBQUNuRCxPQUFJLFFBQVEsd0JBQWEsV0FBYixDQUFaO0FBQ0EsWUFBUyxLQUFUO0FBQ0EsR0FIRDtBQUlBLEVBUEQ7QUFRQSxDOztBQVhEOzs7Ozs7Ozs7Ozs7O2tCQ0RlLFVBQVMsV0FBVCxFQUFzQjtBQUNwQyxLQUFJLFdBQVcsWUFBWSxJQUFaLENBQWlCLFVBQVMsVUFBVCxFQUFxQjtBQUNwRCxNQUFJLFdBQVcsT0FBWCxDQUFtQixnQkFBbkIsS0FBd0MsU0FBNUMsRUFBdUQ7QUFDdEQsVUFBTyxDQUFDLFdBQVcsU0FBWCxDQUFxQixRQUFyQixDQUE4QixpQkFBOUIsQ0FBUjtBQUNBLEdBRkQsTUFFTztBQUNOLFVBQU8sV0FBVyxTQUFYLENBQXFCLFFBQXJCLENBQThCLHFCQUE5QixDQUFQO0FBQ0E7QUFDRCxFQU5jLENBQWY7O0FBUUEsUUFBTyxDQUFDLFFBQVI7QUFDQSxDOzs7Ozs7Ozs7a0JDMENjLFlBQVc7O0FBRXpCO0FBQ0EsS0FBSSxDQUFDLFdBQUwsRUFBa0I7QUFDakIsZ0JBQWMsS0FBZDtBQUNBO0FBQ0QsUUFBTyxXQUFQO0FBQ0EsQzs7QUEvREQ7Ozs7O0FBS0E7QUFDQSxJQUFJLFdBQUo7O0FBRUE7Ozs7O0FBS0EsSUFBSSxjQUFjLFNBQWQsV0FBYyxDQUFTLEtBQVQsRUFBZ0I7QUFDakMsUUFBTyxNQUFNLG9EQUFOLEVBQTREO0FBQ2xFLFVBQVEsS0FEMEQ7QUFFbEUsV0FBUztBQUNSLG9CQUFpQixZQUFZO0FBRHJCO0FBRnlELEVBQTVELEVBS0osSUFMSSxDQUtDLFVBQVMsUUFBVCxFQUFtQjtBQUMxQixNQUFJLFNBQVMsTUFBVCxLQUFvQixHQUF4QixFQUE2QjtBQUM1QixVQUFPLFFBQVEsTUFBUixDQUFlLGFBQWYsQ0FBUDtBQUNBO0FBQ0QsU0FBTyxTQUFTLElBQVQsRUFBUDtBQUNBLEVBVk0sRUFVSixJQVZJLENBVUMsVUFBUyxJQUFULEVBQWU7QUFDdEIsU0FBTyxLQUFLLEtBQUwsQ0FBVyxDQUFYLENBQVA7QUFDQSxFQVpNLENBQVA7QUFhQSxDQWREOztBQWdCQTs7OztBQUlBLElBQUksTUFBTSxTQUFOLEdBQU0sR0FBVzs7QUFFcEI7QUFDQSxLQUFJLGdCQUFnQixhQUFhLE9BQWIsQ0FBcUIsZUFBckIsQ0FBcEI7QUFDQSxLQUFJLENBQUMsYUFBTCxFQUFvQjtBQUNuQixTQUFPLFFBQVEsTUFBUixDQUFlLFlBQWYsQ0FBUDtBQUNBOztBQUVEO0FBQ0EsS0FBSSxVQUFVLEtBQUssS0FBTCxDQUFXLGFBQVgsQ0FBZDtBQUNBLEtBQUksQ0FBQyxPQUFELElBQVksQ0FBQyxRQUFRLGFBQXJCLElBQXNDLENBQUMsUUFBUSxhQUFSLENBQXNCLFlBQWpFLEVBQStFO0FBQzlFLFNBQU8sUUFBUSxNQUFSLENBQWUsWUFBZixDQUFQO0FBQ0E7O0FBRUQ7QUFDQSxLQUFJLFFBQVEsYUFBUixDQUFzQixVQUF0QixHQUFtQyxLQUFLLEdBQUwsRUFBdkMsRUFBbUQ7QUFDbEQsU0FBTyxRQUFRLE1BQVIsQ0FBZSxpQkFBZixDQUFQO0FBQ0E7O0FBRUQsUUFBTyxZQUFZLFFBQVEsYUFBUixDQUFzQixZQUFsQyxDQUFQO0FBRUEsQ0FyQkQ7Ozs7Ozs7OztrQkM1QmUsVUFBUyxNQUFULEVBQWlCO0FBQy9CLE1BQUksbUJBQW1CLFNBQVMsYUFBVCxDQUF1QixLQUF2QixFQUE4QixXQUE5QixDQUN0QixTQUFTLGNBQVQsQ0FBd0IsTUFBeEIsQ0FEc0IsRUFDVyxVQURYLENBQ3NCLFNBRDdDO0FBRUEsU0FBTyxpQkFBaUIsT0FBakIsQ0FBeUIsUUFBekIsRUFBbUMsTUFBbkMsQ0FBUDtBQUNBLEM7Ozs7O0FDVEQ7Ozs7OztBQUVBLE9BQU8sT0FBUCxHQUFpQixVQUFTLEdBQVQsRUFBYztBQUM5QixLQUFJLGFBQWEsU0FBUyxhQUFULENBQXVCLEtBQXZCLENBQWpCO0FBQ0EsWUFBVyxTQUFYLEdBQXVCLEdBQXZCO0FBQ0EsdUJBQU8sS0FBUCxFQUFjLFVBQWQsRUFBMEIsT0FBMUIsQ0FBa0MsVUFBUyxJQUFULEVBQWU7QUFDaEQsTUFBSSxjQUFjLFNBQVMsYUFBVCxDQUF1QixLQUF2QixDQUFsQjtBQUNBLGNBQVksU0FBWixDQUFzQixHQUF0QixDQUEwQixhQUExQjtBQUNBLGNBQVksU0FBWixHQUF3Qix3Q0FBeEI7QUFDQSxNQUFJLE1BQU0sS0FBSyxZQUFMLENBQWtCLEtBQWxCLENBQVY7QUFDQSxNQUFJLE1BQU0sS0FBSyxZQUFMLENBQWtCLEtBQWxCLENBQVY7QUFDQSxNQUFJLFVBQVUsRUFBZDs7QUFFQTtBQUNBLE1BQUksVUFBVSxZQUFZLGFBQVosQ0FBMEIsS0FBMUIsQ0FBZDs7QUFFQSxVQUFRLFlBQVIsQ0FBcUIsVUFBckIsRUFBaUMsR0FBakM7QUFDQSxVQUFRLFlBQVIsQ0FBcUIsT0FBckIsRUFBOEIsWUFBOUI7O0FBRUEsTUFBSSxLQUFKLENBQVUsR0FBVixFQUFlLE9BQWYsQ0FBdUIsVUFBUyxHQUFULEVBQWM7QUFDcEMsT0FBSSxRQUFRLFdBQVIsSUFBdUIsUUFBUSxZQUFuQyxFQUFpRDtBQUNoRCxnQkFBWSxTQUFaLENBQXNCLEdBQXRCLENBQTBCLFlBQTFCO0FBQ0EsSUFGRCxNQUVPLElBQUksSUFBSSxPQUFKLENBQVksUUFBWixNQUEwQixDQUE5QixFQUFpQztBQUN2QyxRQUFJLFFBQVEsSUFBSSxPQUFKLENBQVksUUFBWixFQUFzQixFQUF0QixDQUFaO0FBQ0EsUUFBSSxNQUFNLE9BQU4sQ0FBYyxHQUFkLENBQUosRUFBd0I7QUFDdkIsU0FBSSxhQUFhLE1BQU0sS0FBTixDQUFZLEdBQVosQ0FBakI7QUFDQSxhQUFRLFdBQVcsQ0FBWCxJQUFnQixXQUFXLENBQVgsQ0FBeEI7QUFDQTtBQUNELGNBQVUsTUFBTSxLQUFoQjtBQUNBLElBUE0sTUFPQSxJQUFJLFFBQVEsU0FBWixFQUF1QjtBQUM3QixnQkFBWSxhQUFaLENBQTBCLGdCQUExQixFQUE0QyxTQUE1QyxDQUFzRCxHQUF0RCxDQUEwRCx3QkFBMUQ7QUFDQSxJQUZNLE1BRUE7QUFDTixVQUFNLEdBQU47QUFDQTtBQUNELEdBZkQ7O0FBaUJBLFVBQVEsWUFBUixDQUFxQixLQUFyQixFQUE0QixHQUE1QjtBQUNBLFVBQVEsWUFBUixDQUFxQixPQUFyQixFQUE4QixLQUFLLFlBQUwsQ0FBa0IsT0FBbEIsQ0FBOUI7O0FBRUEsY0FBWSxhQUFaLENBQTBCLGdCQUExQixFQUNFLFlBREYsQ0FDZSxPQURmLEVBQ3dCLG9CQUFvQixPQUFwQixHQUE4QixHQUR0RDs7QUFHQSxPQUFLLFVBQUwsQ0FBZ0IsU0FBaEIsR0FBNEIsWUFBWSxTQUF4QztBQUNBLEVBdENEO0FBdUNBLFFBQU8sV0FBVyxTQUFsQjtBQUNBLENBM0NEOzs7Ozs7Ozs7a0JDQ2UsVUFBUyxJQUFULEVBQWU7QUFDN0IsS0FBSSxPQUFPLDZCQUFVLElBQVYsQ0FBWDtBQUNBLEtBQUksUUFBUSx5QkFBVSxJQUFWLENBQVo7QUFDQSxLQUFJLFdBQVcsS0FBSyxJQUFMLENBQVUsUUFBUSxHQUFsQixDQUFmOztBQUVBLEtBQUksUUFBUSxNQUFaO0FBQ0EsS0FBSSxXQUFXLENBQWYsRUFBa0I7QUFDakIsV0FBUyxHQUFUO0FBQ0E7O0FBRUQsUUFBTyxXQUFXLEtBQWxCO0FBQ0EsQzs7QUFkRDs7OztBQUNBOzs7Ozs7Ozs7Ozs7O2tCQ0RlLFVBQVMsSUFBVCxFQUFlO0FBQzdCLEtBQUksTUFBTSxTQUFTLGFBQVQsQ0FBdUIsS0FBdkIsQ0FBVjtBQUNBLEtBQUksU0FBSixHQUFnQixJQUFoQjtBQUNBLFFBQU8sSUFBSSxXQUFKLElBQW1CLElBQUksU0FBdkIsSUFBb0MsRUFBM0M7QUFDQSxDOzs7OztBQ0NEOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7SUFBWSxHOzs7Ozs7QUFFWiw0QixDQWZBOzs7OztBQWdCQTtBQUNBOztBQUVBLHNCQUFPLEtBQVAsRUFBYyxPQUFkLENBQXNCLFVBQVMsSUFBVCxFQUFlO0FBQ3BDLE1BQUssTUFBTCxHQUFjLFlBQVc7QUFDeEIsT0FBSyxTQUFMLENBQWUsR0FBZixDQUFtQixpQkFBbkI7QUFDQSxFQUZEO0FBR0EsQ0FKRDtBQUtBLHNCQUFXLENBQVg7QUFDQTtBQUNBO0FBQ0EsaUNBQWtCLElBQWxCLENBQXVCLFVBQVMsSUFBVCxFQUFlO0FBQ3JDLEtBQUksUUFBUSxTQUFTLGFBQVQsQ0FBdUIsTUFBdkIsQ0FBWjs7QUFFQSxPQUFNLFNBQU4sQ0FBZ0IsR0FBaEIsQ0FBb0IsZ0JBQXBCOztBQUVBO0FBQ0EsS0FBSSxRQUFRLEtBQUssS0FBTCxDQUFXLElBQVgsQ0FBZ0IsVUFBUyxJQUFULEVBQWU7QUFDMUMsU0FBUSxLQUFLLElBQUwsS0FBYyxPQUFkLElBQXlCLEtBQUssSUFBTCxLQUFjLGVBQS9DO0FBQ0EsRUFGVyxDQUFaO0FBR0EsS0FBSSxLQUFKLEVBQVc7QUFDVixRQUFNLFNBQU4sQ0FBZ0IsR0FBaEIsQ0FBb0IsaUJBQXBCO0FBQ0E7O0FBRUQ7QUFDQSxLQUFJLEtBQUssSUFBTCxLQUFjLE9BQU8sVUFBekIsRUFBcUM7QUFDcEMsUUFBTSxTQUFOLENBQWdCLEdBQWhCLENBQW9CLGtCQUFwQjtBQUNBLFNBQU8sSUFBSSxpQkFBSixDQUFzQixLQUFLLEtBQTNCLENBQVA7QUFDQTtBQUNELENBbEJELEVBa0JHLEtBbEJILENBa0JTLFlBQVcsQ0FBRSxDQWxCdEI7Ozs7Ozs7OztrQkMzQmUsVUFBUyxNQUFULEVBQWlCOztBQUU5QixNQUFJLGNBQWMsRUFBbEI7QUFDQSxNQUFJLE9BQU8sS0FBWCxFQUFrQjtBQUNoQixnREFBMEMsT0FBTyxLQUFqRDtBQUNEOztBQUVELE1BQUksYUFBYSxFQUFqQjtBQUNBLE1BQUksT0FBTyxLQUFYLEVBQWtCO0FBQ2hCLDZKQUd1QixPQUFPLEtBSDlCLGVBRzZDLE9BQU8sSUFIcEQ7QUFNRDs7QUFFRCwwS0FLa0IsV0FMbEIsNEVBTWtFLE9BQU8sSUFOekUsVUFNa0YsT0FBTyxJQU56Riw2Q0FPbUIsT0FBTyxLQUFQLENBQWEsS0FQaEMsNEhBWXVCLE9BQU8sSUFaOUIsV0FZd0MsVUFaeEMsd0JBYVUsT0FBTyxJQWJqQix5QkFjUyxPQUFPLEdBQVAsSUFBYyxFQWR2Qix5Q0FlMEIsT0FBTyxJQWZqQztBQWlCRCxDOzs7Ozs7Ozs7a0JDOUJjLFVBQVMsSUFBVCxFQUFlOztBQUU3QixNQUFJLGNBQWMsRUFBbEI7QUFDQSxNQUFJLEtBQUssTUFBTCxDQUFZLEtBQWhCLEVBQXVCO0FBQ3RCLGdEQUEwQyxLQUFLLE1BQUwsQ0FBWSxLQUF0RDtBQUNBOztBQUVBLE1BQUksWUFBWSxFQUFoQjtBQUNBLE1BQUksS0FBSyxLQUFULEVBQWdCO0FBQ2QsNEpBR3VCLEtBQUssS0FINUIsZUFHMkMsS0FBSyxLQUhoRDtBQU1EOztBQUVGLE1BQUksT0FBTyxFQUFYO0FBQ0EsTUFBSSxLQUFLLElBQVQsRUFBZTtBQUNkLFdBQU8sNEJBQTRCLEtBQUssSUFBTCxDQUFVLEdBQVYsQ0FBYyxVQUFTLEdBQVQsRUFBYztBQUM5RCxnQ0FBd0IsSUFBSSxJQUE1QixXQUFzQyxJQUFJLElBQTFDO0FBQ0EsS0FGa0MsRUFFaEMsSUFGZ0MsQ0FFM0IsRUFGMkIsQ0FBNUIsR0FFTyxTQUZkO0FBR0E7O0FBRUQsTUFBSSxZQUFZLElBQUksSUFBSixDQUFTLEtBQUssWUFBZCxFQUE0QixPQUE1QixFQUFoQjtBQUNBLE1BQUksTUFBTSxLQUFLLEdBQUwsRUFBVjtBQUNBLE1BQUksVUFBVSx5QkFBZSxPQUFmLENBQXVCLFNBQXZCLEVBQWtDLEdBQWxDLENBQWQ7O0FBRUEsTUFBSSxPQUFPLDhCQUFlLEtBQUssSUFBcEIsQ0FBWDtBQUNBLE1BQUksVUFBVSxLQUFLLE1BQUwsQ0FBWSxDQUFaLEVBQWUsS0FBSyxPQUFMLENBQWEsTUFBYixJQUF1QixDQUF0QyxDQUFkOztBQUVBLDBLQUttQixXQUxuQiw0RUFNbUUsS0FBSyxNQUFMLENBQVksSUFOL0UsVUFNd0YsS0FBSyxNQUFMLENBQVksSUFOcEcsMkNBT21CLE9BUG5CLGtCQU91Qyx3QkFBUyxLQUFLLElBQWQsQ0FQdkMsYUFPa0UsSUFQbEUsK0VBV08sU0FYUCwwQkFZaUIsS0FBSyxJQVp0Qix5QkFhYSxLQUFLLEtBYmxCLHVCQWNTLE9BZFQseUNBZ0JvQixLQUFLLElBaEJ6QjtBQWtCQSxDOztBQXJERDs7OztBQUNBOzs7O0FBQ0E7Ozs7Ozs7Ozs7Ozs7a0JDRmUsVUFBUyxJQUFULEVBQWU7QUFDN0IsTUFBSSxRQUFRLEVBQVo7QUFDQSxNQUFJLEtBQUssS0FBVCxFQUFnQjtBQUNmLGlEQUM4QixLQUFLLEtBRG5DO0FBR0E7O0FBRUQsc0VBR0csS0FISCxxREFLa0MsS0FBSyxJQUx2QztBQVVBLEM7Ozs7Ozs7OztrQkNoQmMsVUFBUyxRQUFULEVBQW1COztBQUVoQyxNQUFJLFVBQVUsc0JBQWQ7QUFDQSxNQUFJLFNBQVMsSUFBVCxDQUFjLFdBQWQsT0FBZ0MsT0FBTyxVQUFQLENBQWtCLFdBQWxCLEVBQXBDLEVBQXFFO0FBQ25FLGVBQVcsMkJBQVg7QUFDRDs7QUFFRCxNQUFJLFFBQVEsRUFBWjtBQUNBLE1BQUksU0FBUyxLQUFiLEVBQW9CO0FBQ2xCLCtDQUF5QyxTQUFTLEtBQWxEO0FBQ0Q7O0FBRUQsTUFBSSxXQUFXLEVBQWY7QUFDQSxNQUFJLFNBQVMsUUFBYixFQUF1QjtBQUNyQiw4QkFBd0IsU0FBUyxRQUFqQztBQUNEOztBQUVELE1BQUksVUFBVSxTQUFTLE9BQVQsSUFBb0IsU0FBUyxJQUEzQzs7QUFFQSxNQUFJLFdBQVcsRUFBZjtBQUNBLE1BQUksU0FBUyxPQUFiLEVBQXNCO0FBQ3BCLHlEQUNpQyxTQUFTLElBRDFDO0FBSUQ7O0FBRUQsTUFBSSxZQUFVLDBCQUFPLFNBQVMsSUFBaEIsQ0FBZDtBQUNBLE1BQUksU0FBUyxPQUFiLEVBQXNCO0FBQ3BCLHlCQUFtQiwwQkFBTyxTQUFTLE9BQWhCLENBQW5CLFVBQWdELElBQWhEO0FBQ0Q7O0FBRUQsNEJBQ1ksT0FEWiwyRUFLUSxLQUxSLDZEQU9xQyxJQVByQywrQkFRVSxTQUFTLE9BUm5CLEdBUTZCLFFBUjdCLHFIQWF1RCxTQUFTLFNBYmhFLHFCQWF5RixTQUFTLElBYmxHLDZHQWNpQyxPQWRqQyxrQkFlRSxRQWZGO0FBaUJELEM7O0FBbkREOzs7Ozs7Ozs7Ozs7O2tCQ0FlLFVBQVMsR0FBVCxFQUFjOztBQUUzQixNQUFJLGFBQWEsRUFBakI7QUFDQSxNQUFJLElBQUksS0FBUixFQUFlO0FBQ2IsNkpBR3VCLElBQUksS0FIM0IsZUFHMEMsSUFBSSxJQUg5QztBQU9EOztBQUVELG1NQUsyRCxJQUFJLElBTC9ELFVBS3dFLElBQUksSUFMNUUseUNBTWUsSUFBSSxLQUFKLENBQVUsS0FOekIscUdBV2dCLElBQUksSUFYcEIsaUJBWUksVUFaSix3QkFjTSxJQUFJLElBZFYscUJBZUssSUFBSSxXQUFKLElBQW1CLEVBZnhCLGtDQWdCbUIsSUFBSSxJQWhCdkI7QUFtQkQsQzs7O0FDaENEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiLyoqXG4gKiBNYWtlIHN1cmUgYSBmdW5jdGlvbiBvbmx5IGlzIHJ1biBldmVyeSB4IG1zXG4gKiBAcGFyYW0gIHtGdW5jdGlvbn0gY2FsbGJhY2sgTWV0aG9kIHRvIGV4ZWN1dGUgaWYgaXQgaXMgbm90IGRlYm91bmNlZFxuICogQHBhcmFtICB7aW50ZWdlcn0gIHRpbWVvdXQgIE1pbGxpc2Vjb25kcyB0byB3YWl0IGJlZm9yZSBuZXh0IGFsbG93ZWQgY2FsbGJhY2suIERlZmF1bHRzIHRvIHRoZSBhbmltYXRpb24gZnJhbWUgcmF0ZSBpbiB0aGUgYnJvd3NlclxuICogQHJldHVybiB7dm9pZH1cbiAqL1xuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24oY2FsbGJhY2ssIHRpbWVvdXQpIHtcbiAgdmFyIHBlbmRpbmcgPSBmYWxzZTtcbiAgdmFyIGRvbmUgPSAoKSA9PiB7XG4gICAgcGVuZGluZyA9IGZhbHNlO1xuICB9O1xuICByZXR1cm4gZnVuY3Rpb24oKSB7XG4gICAgaWYgKHBlbmRpbmcpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgcGVuZGluZyA9IHRydWU7XG4gICAgY2FsbGJhY2suYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgICBpZiAoIXRpbWVvdXQpIHtcbiAgICAgIHdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUoZG9uZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHdpbmRvdy5zZXRUaW1lb3V0KGRvbmUsIHRpbWVvdXQpO1xuICAgIH1cbiAgfTtcbn1cbiIsIi8qKlxuICogRGVsYXkgYSBmdW5jdGlvbiBhbmQgb25seSBydW4gb25jZVxuICogQHBhcmFtICB7RnVuY3Rpb259IGNhbGxiYWNrIE1ldGhvZCB0byBleGVjdXRlIGlmIGl0IGlzIG5vdCBkZWJvdW5jZWRcbiAqIEBwYXJhbSAge2ludGVnZXJ9ICB0aW1lb3V0ICBNaWxsaXNlY29uZHMgdG8gd2FpdCBiZWZvcmUgbmV4dCBhbGxvd2VkIGNhbGxiYWNrLiBEZWZhdWx0cyB0byB0aGUgYW5pbWF0aW9uIGZyYW1lIHJhdGUgaW4gdGhlIGJyb3dzZXJcbiAqIEByZXR1cm4ge3ZvaWR9XG4gKi9cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uKGNhbGxiYWNrLCB0aW1lb3V0KSB7XG4gIHZhciBwZW5kaW5nID0gZmFsc2U7XG4gIHZhciBkb25lID0gKCkgPT4ge1xuICAgIGNhbGxiYWNrLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgcGVuZGluZyA9IGZhbHNlO1xuICB9O1xuICByZXR1cm4gZnVuY3Rpb24oKSB7XG4gICAgaWYgKHBlbmRpbmcpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgcGVuZGluZyA9IHRydWU7XG4gICAgaWYgKCF0aW1lb3V0KSB7XG4gICAgICB3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lKGRvbmUpO1xuICAgIH0gZWxzZSB7XG4gICAgICB3aW5kb3cuc2V0VGltZW91dChkb25lLCB0aW1lb3V0KTtcbiAgICB9XG4gIH07XG59XG4iLCIvKipcbiAqIEdldCBhbiBhcnJheSBvZiBkb20gZWxlbWVudHMgbWF0Y2hpbmcgdGhlIHNlbGVjdG9yXG4gKiBAcGFyYW0gIHtzdHJpbmd9ICAgICBzZWxlY3RvclxuICogQHBhcmFtICB7RE9NZWxlbWVudH0gRE9NIGVsZW1lbnQgdG8gc2VhcmNoIGluLiBEZWZhdWx0cyB0byBkb2N1bWVudFxuICogQHJldHVybiB7YXJyYXl9XG4gKi9cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uKHNlbGVjdG9yLCAkcm9vdCA9IGRvY3VtZW50KSB7XG4gIHJldHVybiBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbCgkcm9vdC5xdWVyeVNlbGVjdG9yQWxsKHNlbGVjdG9yKSk7XG59XG4iLCIvKipcbiAqIEdldCB0aGUgZWxlbWVudHMgb2Zmc2V0IHJlbGF0aXZlIHRvIHRoZSBkb2N1bWVudFxuICogQHBhcmFtICB7RE9NRWxlbWVudH0gJGVsZW1lbnQgRWxlbWVudCB0byBnZXQgdGhlIG9mZnNldCBmcm9tXG4gKiBAcmV0dXJuIHtpbnRlZ2VyfSAgICAgICAgICAgICBPZmZzZXQgaW4gcGl4ZWxzXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uKCRlbGVtZW50KSB7XG4gIHZhciBvZmZzZXQgPSAwO1xuXG4gIHdoaWxlICgkZWxlbWVudCAmJiAhaXNOYU4oJGVsZW1lbnQub2Zmc2V0VG9wKSkge1xuICAgIG9mZnNldCArPSAkZWxlbWVudC5vZmZzZXRUb3A7XG4gICAgJGVsZW1lbnQgPSAkZWxlbWVudC5vZmZzZXRQYXJlbnQ7XG4gIH1cbiAgcmV0dXJuIG9mZnNldDtcbn1cbiIsIi8qKlxuICogTGF6eSBsb2FkIGltYWdlcyB3aXRoIGNsYXNzIC5sYXp5LWltYWdlcy5cbiAqIERlcGVuZGluZyBvbiB0aGUgdHJlc2hvbGQgaW1hZ2VzIHdpbGwgbG9hZCBhcyB0aGUgdXNlciBzY3JvbGxzIGRvd24gb24gdGhlXG4gKiBkb2N1bWVudC5cbiAqL1xuXG4vLyBEZXBlbmRlbmNlaXNcbmltcG9ydCBnZXRBbGxFbGVtZW50cyBmcm9tICcuLi9kb20vZ2V0LWFsbCc7XG5pbXBvcnQgc2Nyb2xsVmlzaWJsZSBmcm9tICcuLi9zY3JvbGwvdmlzaWJsZSc7XG5cbi8vIExvYWQgaW1hZ2UgZWxlbWVudFxudmFyIGxvYWRJbWcgPSBmdW5jdGlvbigkaW1nKSB7XG5cbiAgaWYgKCRpbWcuZGF0YXNldC5zcmMpIHtcbiAgICAkaW1nLnNldEF0dHJpYnV0ZSgnc3JjJywgJGltZy5kYXRhc2V0LnNyYyk7XG4gIH1cbiAgaWYgKCRpbWcuZGF0YXNldC5zcmNzZXQpIHtcbiAgICAkaW1nLnNldEF0dHJpYnV0ZSgnc3Jjc2V0JywgJGltZy5kYXRhc2V0LnNyY3NldCk7XG4gIH1cbn07XG5cbi8vIExvYWQgcGljdHVyZSBlbGVtZW50XG52YXIgbG9hZFBpY3R1cmUgPSBmdW5jdGlvbigkcGljdHVyZSkge1xuICBsb2FkSW1nKCRwaWN0dXJlLnF1ZXJ5U2VsZWN0b3IoJ2ltZycpKTtcbiAgdmFyICRzb3VyY2VzID0gQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoJHBpY3R1cmUucXVlcnlTZWxlY3RvckFsbCgnc291cmNlJykpO1xuICAkc291cmNlcy5mb3JFYWNoKCRzb3VyY2UgPT4gJHNvdXJjZS5zZXRBdHRyaWJ1dGUoJ3NyY3NldCcsICRzb3VyY2UuZGF0YXNldC5zcmNzZXQpKTtcbn07XG5cbnZhciBsb2FkRWxlbWVudCA9IGZ1bmN0aW9uKCRlbGVtZW50KSB7XG4gIGlmICgkZWxlbWVudC5tYXRjaGVzKCdwaWN0dXJlJykpIHtcbiAgICBsb2FkUGljdHVyZSgkZWxlbWVudCk7XG4gIH0gZWxzZSBpZiAoJGVsZW1lbnQubWF0Y2hlcygnaW1nJykpIHtcbiAgICBsb2FkSW1nKCRlbGVtZW50KTtcbiAgfVxuXG4gIC8vIE1ha2Ugc3VyZSBwaWN0dXJlZmlsbCB3aWxsIHVwZGF0ZSB0aGUgaW1hZ2Ugd2hlbiBzb3VyY2UgaGFzIGNoYW5nZWRcbiAgaWYgKHdpbmRvdy5waWN0dXJlZmlsbCkge1xuICAgIHdpbmRvdy5waWN0dXJlZmlsbCh7XG4gICAgICByZWV2YWx1YXRlOiB0cnVlXG4gICAgfSk7XG4gIH1cbn07XG5cbi8qKlxuICogQWN0aXZhdGUgbGF6eSBsb2FkIG9mIGltYWdlcyBhcyB1c2VyIHNjcm9sbHNcbiAqIEBwYXJhbSAge2Zsb2F0fSB0aHJlc2hvbGQgIFBlcmNlbnQgYmVsb3cgc2NyZWVuIHRvIGluaXRpYWxpemUgbG9hZCBvZiBpbWFnZVxuICogQHJldHVybiB7dm9pZH1cbiAqL1xuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24odGhyZXNob2xkID0gMC41KSB7XG4gIHZhciAkbGF6eUltYWdlcyA9IGdldEFsbEVsZW1lbnRzKCcubGF6eS1pbWFnZScpO1xuXG4gIHdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUoZnVuY3Rpb24oKSB7XG4gICAgJGxhenlJbWFnZXMuZm9yRWFjaChmdW5jdGlvbigkbGF6eUltYWdlKSB7XG5cbiAgICAgIC8vIElnbm9yZSBpbWFnZXMgd2hpY2ggaGFzIGFscmVhZHkgYmVlbiByZWdpc3RlcmVkXG4gICAgICBpZiAoJGxhenlJbWFnZS5kYXRhc2V0LmxhenlJbWFnZUxpc3RlbmluZykge1xuXHRyZXR1cm47XG4gICAgICB9XG4gICAgICAkbGF6eUltYWdlLnNldEF0dHJpYnV0ZSgnZGF0YS1sYXp5LWltYWdlLWxpc3RlbmluZycsICd0cnVlJyk7XG5cbiAgICAgIHNjcm9sbFZpc2libGUoJGxhenlJbWFnZSwgdGhyZXNob2xkKVxuICAgICAgICAudGhlbigoKSA9PiBsb2FkRWxlbWVudCgkbGF6eUltYWdlKSk7XG4gICAgfSk7XG4gIH0pO1xuXG59XG4iLCIvLyBEZXBlbmRlbmNpZXNcbmltcG9ydCBnZXREb2N1bWVudE9mZnNldFRvcCBmcm9tICcuLi9kb20vZ2V0LWRvY3VtZW50LW9mZnNldC10b3AnO1xuXG4vKipcbiAqIENoZWNrcyBpZiB0aGUgdXNlciBoYXMgc2Nyb2xsZWQgdG8gb3IgcGFzdCBhbiBlbGVtZW50XG4gKiBAcGFyYW0gIHtET01FbGVtZW50fSAkZWxlbWVudCAgVGhlIGVsZW1lbnQgdG8gY2hlY2sgYWdhaW5zdFxuICogQHBhcmFtICB7ZmxvYXR9ICAgICAgdGhyZXNob2xkIERpc3RhbmNlIGluIHBlcmNlbnQgb2YgdGhlIHNjZWVlbiBoZWlnaHQgdG8gbWVhc3VyZSBhZ2FpbnN0LlxuICogQHJldHVybiB7Ym9vbGVhbn1cbiAqL1xuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24oJGVsZW1lbnQsIHRocmVzaG9sZCA9IDApIHtcbiAgdmFyIHNjcm9sbEJvdHRvbSA9ICh3aW5kb3cuc2Nyb2xsWSB8fCBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuc2Nyb2xsVG9wKSArICh3aW5kb3cuaW5uZXJIZWlnaHQgKiAoMSArIHRocmVzaG9sZCkpO1xuICB2YXIgb2Zmc2V0VG9wID0gZ2V0RG9jdW1lbnRPZmZzZXRUb3AoJGVsZW1lbnQpO1xuICByZXR1cm4gKHNjcm9sbEJvdHRvbSA+IG9mZnNldFRvcCk7XG59XG4iLCIvLyBkZXBlbmRlbmNpZXNcbmltcG9ydCBkZWxheSBmcm9tICcuLi9hc3luYy9kZWxheSc7XG5cbi8qKlxuICogUnVucyBzY3JpcHRzIGVhY2ggdGltZSB0aGUgdXNlciBjaGFuZ2VzIHNjcm9sbCBkaXJlY3Rpb25cbiAqIEBwYXJhbSAge0Z1bmN0aW9ufSBkb3duQ2FsbGJhY2sgIENhbGxiYWNrIGV2ZXJ5IHRpbWUgdGhlIHVzZXIgc3RhcnRzIHNjcm9sbGluZyBkb3duXG4gKiBAcGFyYW0gIHtGdW5jdGlvbn0gdXBDYWxsYmFjayAgICBDYWxsYmFjayBldmVyeSB0aW1lIHRoZSB1c2VyIHN0YXJ0cyBzY3JvbGxpbmcgdXBcbiAqIEBwYXJhbSAge2Zsb2F0fSAgICB0aHJlc2hvbGQgICAgIE1hcmdpbiBpbiB0b3Agd2hlcmUgc2Nyb2xsIGRvd24gaXMgaWdub3JlZCAoY291bGQgYmUgdXNlZCBmb3IgbmF2cylcbiAqIEByZXR1cm4ge3ZvaWR9XG4gKi9cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uKGRvd25DYWxsYmFjayA9IGZ1bmN0aW9uKCkge30sIHVwQ2FsbGJhY2sgPSBmdW5jdGlvbigpIHt9LCB0aHJlc2hvbGQgPSAwKSB7XG5cbiAgdmFyIGxhc3RTY3JvbGxQb3MgPSAwO1xuICB2YXIgc2Nyb2xsZWREb3duID0gZmFsc2U7XG5cbiAgdmFyIGlzU2Nyb2xsaW5nID0gZnVuY3Rpb24oKSB7XG4gICAgdmFyIGN1cnJlbnRTY3JvbGxQb3MgPSB3aW5kb3cuc2Nyb2xsWTtcblxuICAgIGlmICghc2Nyb2xsZWREb3duICYmXG4gICAgICBjdXJyZW50U2Nyb2xsUG9zID4gdGhyZXNob2xkICYmXG4gICAgICBjdXJyZW50U2Nyb2xsUG9zID4gKGxhc3RTY3JvbGxQb3MgKyAxMCkpIHtcbiAgICAgIGRvd25DYWxsYmFjaygpO1xuICAgICAgc2Nyb2xsZWREb3duID0gdHJ1ZTtcbiAgICB9IGVsc2UgaWYgKHNjcm9sbGVkRG93biAmJlxuICAgICAgKGN1cnJlbnRTY3JvbGxQb3MgPD0gdGhyZXNob2xkIHx8IGN1cnJlbnRTY3JvbGxQb3MgPCAobGFzdFNjcm9sbFBvcyAtIDEwMCkpICYmXG4gICAgICAoY3VycmVudFNjcm9sbFBvcyArIHdpbmRvdy5pbm5lckhlaWdodCA8IGRvY3VtZW50LmJvZHkuY2xpZW50SGVpZ2h0KSkge1xuICAgICAgdXBDYWxsYmFjaygpO1xuICAgICAgc2Nyb2xsZWREb3duID0gZmFsc2U7XG4gICAgfVxuXG4gICAgbGFzdFNjcm9sbFBvcyA9IGN1cnJlbnRTY3JvbGxQb3M7XG4gIH07XG5cbiAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3Njcm9sbCcsIGRlbGF5KGlzU2Nyb2xsaW5nLCAyNTApKTtcbiAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignRE9NQ29udGVudExvYWRlZCcsIGlzU2Nyb2xsaW5nKTtcbn1cbiIsIi8vIERlcGVuZGVuY2Vpc1xuaW1wb3J0IGRlYm91bmNlIGZyb20gJy4uL2FzeW5jL2RlYm91bmNlJztcbmltcG9ydCBoYXNTY3JvbGxlZFBhc3QgZnJvbSAnLi9oYXMtc2Nyb2xsZWQtcGFzdCc7XG5cbi8qKlxuICogRnVsZmlsbCBhIHByb21pc2UsIHdoZW4gdGhlIGVsZW1lbnQgaXMgdmlzaWJsZSAoc2Nyb2xsZWQgdG8gb3IgcGFzdClcbiAqIEBwYXJhbSAge0RPTUVsZW1lbnR9ICRlbGVtZW50ICBFbGVtZW50IHRvIGNoZWNrXG4gKiBAcGFyYW0gIHtmbG9hdH0gICAgICB0aHJlc2hvbGQgRGlzdGFuY2UgaW4gcGVyY2VudFxuICogQHJldHVybiB7W3R5cGVdfSAgICAgICAgICAgW2Rlc2NyaXB0aW9uXVxuICovXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbigkZWxlbWVudCwgdGhyZXNob2xkID0gMCkge1xuXG4gIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbihyZXNvbHZlKSB7XG5cbiAgICB2YXIgY2hlY2tFbGVtZW50ID0gZGVib3VuY2UoZnVuY3Rpb24oKSB7XG4gICAgICBpZiAoaGFzU2Nyb2xsZWRQYXN0KCRlbGVtZW50LCB0aHJlc2hvbGQpKSB7XG4gICAgICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKCdzY3JvbGwnLCBjaGVja0VsZW1lbnQpO1xuICAgICAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcigncmVzaXplJywgY2hlY2tFbGVtZW50KTtcbiAgICAgICAgcmVzb2x2ZSgpO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3Njcm9sbCcsIGNoZWNrRWxlbWVudCk7XG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3Jlc2l6ZScsIGNoZWNrRWxlbWVudCk7XG4gICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignRE9NQ29udGVudExvYWRlZCcsIGNoZWNrRWxlbWVudCk7XG4gICAgc2V0VGltZW91dChjaGVja0VsZW1lbnQsIDApO1xuICB9KTtcbn1cbiIsIi8qKlxuICogSGVscGVycyBmb3IgdmFsaWRhdGluZyBpbnB1dCBmaWVsZHNcbiAqL1xuXG5pbXBvcnQgaXNEYXRlIGZyb20gJy4vaXMtZGF0ZSc7XG5pbXBvcnQgaXNFbWFpbCBmcm9tICcuL2lzLWVtYWlsJztcbmltcG9ydCBpc0Zsb2F0IGZyb20gJy4vaXMtZmxvYXQnO1xuaW1wb3J0IGlzSW50IGZyb20gJy4vaXMtaW50JztcbmltcG9ydCBpc1JlcXVpcmVkIGZyb20gJy4vaXMtcmVxdWlyZWQnO1xuaW1wb3J0IGlzVXJsIGZyb20gJy4vaXMtdXJsJztcblxuZXhwb3J0IGRlZmF1bHQge1xuICBpc0RhdGUsXG4gIGlzRW1haWwsXG4gIGlzRmxvYXQsXG4gIGlzSW50LFxuICBpc1JlcXVpcmVkLFxuICBpc1VybFxufTtcbiIsImltcG9ydCBnZXRBbGxFbGVtZW50cyBmcm9tICcuLi9kb20vZ2V0LWFsbCc7XG5pbXBvcnQgdmFsaWRhdGUgZnJvbSAnLi8nO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbigpIHtcblxuICBnZXRBbGxFbGVtZW50cygnLnZhbGlkYXRlJykuZm9yRWFjaChmdW5jdGlvbigkdmFsaWRhdGVDb250YWluZXIpIHtcblxuICAgIHZhciAkdmFsaWRhdGVGaWVsZCA9ICR2YWxpZGF0ZUNvbnRhaW5lcjtcblxuICAgIGlmICghJHZhbGlkYXRlQ29udGFpbmVyLm1hdGNoZXMoJ2lucHV0LCB0ZXh0YXJlYScpKSB7XG4gICAgICAkdmFsaWRhdGVGaWVsZCA9ICR2YWxpZGF0ZUNvbnRhaW5lci5xdWVyeVNlbGVjdG9yKCdpbnB1dCwgdGV4dGFyZWEnKTtcbiAgICB9XG5cbiAgICBpZiAoISR2YWxpZGF0ZUZpZWxkKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgLy8gRmluZCByZWxldmF0IHZhbGlkYXRpb24gbWV0aG9kc1xuICAgIHZhciB2YWxpZGF0b3JOYW1lcyA9IFtdO1xuICAgIGZvciAodmFyIGtleSBpbiAkdmFsaWRhdGVDb250YWluZXIuZGF0YXNldCkge1xuICAgICAgaWYgKGtleSAhPT0gJ3ZhbGlkYXRlJyAmJiBrZXkuaW5kZXhPZigndmFsaWRhdGUnKSA9PT0gMCkge1xuICAgICAgICB2YXIgdmFsaWRhdG9yTmFtZSA9IGtleS5yZXBsYWNlKCd2YWxpZGF0ZScsICcnKTtcblxuICAgICAgICBpZiAodmFsaWRhdGVbJ2lzJyArIHZhbGlkYXRvck5hbWVdKSB7XG4gICAgICAgICAgdmFsaWRhdG9yTmFtZXMucHVzaCh2YWxpZGF0b3JOYW1lKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIGlmICh2YWxpZGF0b3JOYW1lcy5sZW5ndGggPT09IDApIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICAvLyBDaGVjayB2YWxpZGF0aW9uIHdoZW4gaW5wdXQgb24gZmllbGQgaXMgY2hhbmdlZFxuICAgICR2YWxpZGF0ZUZpZWxkLmFkZEV2ZW50TGlzdGVuZXIoJ2lucHV0JywgZnVuY3Rpb24oKSB7XG4gICAgICB2YXIgaW5wdXQgPSAkdmFsaWRhdGVGaWVsZC52YWx1ZTtcbiAgICAgIHZhciB2YWxpZCA9ICF2YWxpZGF0b3JOYW1lcy5zb21lKGZ1bmN0aW9uKHZhbGlkYXRvck5hbWUpIHtcblx0aWYgKCFpbnB1dCAmJiB2YWxpZGF0b3JOYW1lICE9PSAnUmVxdWlyZWQnKSB7XG5cdCAgcmV0dXJuIGZhbHNlO1xuXHR9XG4gICAgICAgIHJldHVybiAhdmFsaWRhdGVbJ2lzJyArIHZhbGlkYXRvck5hbWVdKGlucHV0KTtcbiAgICAgIH0pO1xuXG4gICAgICBpZiAodmFsaWQpIHtcblx0JHZhbGlkYXRlQ29udGFpbmVyLmNsYXNzTGlzdC5hZGQoJ3ZhbGlkYXRlLS12YWxpZCcpO1xuXHQkdmFsaWRhdGVDb250YWluZXIuY2xhc3NMaXN0LnJlbW92ZSgndmFsaWRhdGUtLW5vdC12YWxpZCcpO1xuICAgICAgfSBlbHNlIHtcblx0JHZhbGlkYXRlQ29udGFpbmVyLmNsYXNzTGlzdC5hZGQoJ3ZhbGlkYXRlLS1ub3QtdmFsaWQnKTtcblx0JHZhbGlkYXRlQ29udGFpbmVyLmNsYXNzTGlzdC5yZW1vdmUoJ3ZhbGlkYXRlLS12YWxpZCcpO1xuICAgICAgfVxuICAgIH0pO1xuICB9KTtcbn1cbiIsIi8qKlxuICogVmFsaWRhdGUgdGhhdCBzdHJpbmcgY2FuIGJlIGNvbnZlcnRlZCB0byBkYXRlXG4gKiBAcGFyYW0gIHtzdHJpbmd9IGRhdGUgaW5wdXRcbiAqIEByZXR1cm4ge2Jvb2xlYW59XG4gKi9cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uKGRhdGUpIHtcbiAgcmV0dXJuICFpc05hTihEYXRlLnBhcnNlKGRhdGUpKTtcbn1cbiIsIi8qKlxuICogVmFsaWRhdGUgZS1tYWlsXG4gKiBAcGFyYW0gIHtzdHJpbmd9IGVtYWlsIGlucHV0XG4gKiBAcmV0dXJuIHtib29sZWFufVxuICovXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbihlbWFpbCkge1xuICB2YXIgcmUgPSAvXihbYS16MC05X1xcLi1dKylAKFtcXGRhLXpcXC4tXSspXFwuKFthLXpcXC5dezIsNn0pJC87XG4gIHJldHVybiByZS50ZXN0KGVtYWlsKTtcbn1cbiIsIi8qKlxuICogVmFsaWRhdGUgZmxvYXRcbiAqIEBwYXJhbSAge3N0cmluZ30gZmxvYXQgaW5wdXRcbiAqIEByZXR1cm4ge2Jvb2xlYW59XG4gKi9cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uKGZsb2F0KSB7XG4gIHZhciByZSA9IC9eKD86Wy0rXT8oPzpbMC05XSspKT8oPzpcXC5bMC05XSopPyg/OltlRV1bXFwrXFwtXT8oPzpbMC05XSspKT8kLztcbiAgcmV0dXJuIGZsb2F0ICE9PSAnJyAmJiByZS50ZXN0KGZsb2F0KTtcbn1cbiIsIi8qKlxuICogVmFsaWRhdGUgaW50ZWdldFxuICogQHBhcmFtICB7c3RyaW5nfSBpbnRlZ2VyIGlucHV0XG4gKiBAcmV0dXJuIHtib29sZWFufVxuICovXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbihpbnRlZ2VyKSB7XG4gIHZhciByZSA9IC9eKD86Wy0rXT8oPzowfFsxLTldWzAtOV0qKSkkLztcbiAgcmV0dXJuIHJlLnRlc3QoaW50ZWdlcik7XG59XG4iLCIvKipcbiAqIFZhbGlkYXRlIGlmIHRoZSBzdHJpbmcgaXMgZW1wdHlcbiAqIEBwYXJhbSAge3N0cmluZ30gaW5wdXRcbiAqIEByZXR1cm4ge2Jvb2xlYW59XG4gKi9cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uKGlucHV0KSB7XG4gIHJldHVybiBpbnB1dC50cmltKCkgIT09ICcnO1xufVxuIiwiLyoqXG4gKiBWYWxpZGF0ZSB1cmxcbiAqIEBwYXJhbSAge3N0cmluZ30gdXJsIGlucHV0XG4gKiBAcmV0dXJuIHtib29sZWFufVxuICovXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbih1cmwpIHtcbiAgdmFyIHJlID0gL14oaHR0cHM/OlxcL1xcLyk/KFtcXGRhLXpcXC4tXSspXFwuKFthLXpcXC5dezIsNn0pKFtcXC9cXHcgXFwuLV0qKSpcXC8/JC87XG4gIHJldHVybiByZS50ZXN0KHVybCk7XG59XG4iLCJtb2R1bGUuZXhwb3J0cz17XG4gIFwic2Vjb25kc1wiOiA2MCxcbiAgXCJtaW51dGVzXCI6IDYwLFxuICBcImhvdXJzXCI6IDI0LFxuICBcImRheXNcIjogNyxcbiAgXCJ3ZWVrc1wiOiA0LFxuICBcIm1vbnRoc1wiOiAxMlxufVxuIiwidmFyIGNvbnZlcnRlciA9IG1vZHVsZS5leHBvcnRzID0ge1xuICBjdXRvZmY6IHJlcXVpcmUoJy4vY3V0b2ZmL2N1dG9mZi5qc29uJyksXG4gIHN1ZmZpeERpY3Rpb25hcnk6IHJlcXVpcmUoJy4vc3VmZml4L3N1ZmZpeC1kaWN0aW9uYXJ5Lmpzb24nKSxcbiAgdGltZUNhbGNzOiByZXF1aXJlKCcuL3RpbWUtY2FsY3VsYXRpb25zJylcbn1cbmNvbnZlcnRlci50aW1lQWdvID0gcmVxdWlyZSgnLi90aW1lLWFnby90aW1lLWFnby5qcycpLmJpbmQoY29udmVydGVyKVxuIiwibW9kdWxlLmV4cG9ydHM9e1xuICBcInNlY29uZHNcIjoge1xuICAgIFwic2luZ3VsYXJcIjogXCIgc2Vjb25kIGFnb1wiLFxuICAgIFwicGx1cmFsXCI6IFwiIHNlY29uZHMgYWdvXCJcbiAgfSxcbiAgXCJtaW51dGVzXCI6IHtcbiAgICBcInNpbmd1bGFyXCI6IFwiIG1pbnV0ZSBhZ29cIixcbiAgICBcInBsdXJhbFwiOiBcIiBtaW51dGVzIGFnb1wiXG4gIH0sXG4gIFwiaG91cnNcIjoge1xuICAgIFwic2luZ3VsYXJcIjogXCIgaG91ciBhZ29cIixcbiAgICBcInBsdXJhbFwiOiBcIiBob3VycyBhZ29cIlxuICB9LFxuICBcImRheXNcIjoge1xuICAgIFwic2luZ3VsYXJcIjogXCIgZGF5IGFnb1wiLFxuICAgIFwicGx1cmFsXCI6IFwiIGRheXMgYWdvXCJcbiAgfSxcbiAgXCJ3ZWVrc1wiOiB7XG4gICAgXCJzaW5ndWxhclwiOiBcIiB3ZWVrIGFnb1wiLFxuICAgIFwicGx1cmFsXCI6IFwiIHdlZWtzIGFnb1wiXG4gIH0sXG4gIFwibW9udGhzXCI6IHtcbiAgICBcInNpbmd1bGFyXCI6IFwiIG1vbnRoIGFnb1wiLFxuICAgIFwicGx1cmFsXCI6IFwiIG1vbnRocyBhZ29cIlxuICB9LFxuICBcInllYXJzXCI6IHtcbiAgICBcInNpbmd1bGFyXCI6IFwiIHllYXIgYWdvXCIsXG4gICAgXCJwbHVyYWxcIjogXCIgeWVhcnMgYWdvXCJcbiAgfVxufVxuIiwibW9kdWxlLmV4cG9ydHMgPSBUaW1lQWdvXG5cbmZ1bmN0aW9uIFRpbWVBZ28gKHBhc3RFcG9jaCwgY3VycmVudEVwb2NoKSB7XG4gIHZhciBzZWNvbmRzID0gTWF0aC5yb3VuZCh0aGlzLnRpbWVDYWxjcy5zZWNvbmRzKHBhc3RFcG9jaCwgY3VycmVudEVwb2NoKSlcbiAgdmFyIG1pbnV0ZXMgPSBNYXRoLnJvdW5kKHRoaXMudGltZUNhbGNzLm1pbnV0ZXMocGFzdEVwb2NoLCBjdXJyZW50RXBvY2gpKVxuICB2YXIgaG91cnMgPSBNYXRoLnJvdW5kKHRoaXMudGltZUNhbGNzLmhvdXJzKHBhc3RFcG9jaCwgY3VycmVudEVwb2NoKSlcbiAgdmFyIGRheXMgPSBNYXRoLnJvdW5kKHRoaXMudGltZUNhbGNzLmRheXMocGFzdEVwb2NoLCBjdXJyZW50RXBvY2gpKVxuICB2YXIgd2Vla3MgPSBNYXRoLnJvdW5kKHRoaXMudGltZUNhbGNzLndlZWtzKHBhc3RFcG9jaCwgY3VycmVudEVwb2NoKSlcbiAgdmFyIG1vbnRocyA9IE1hdGgucm91bmQodGhpcy50aW1lQ2FsY3MubW9udGhzKHBhc3RFcG9jaCwgY3VycmVudEVwb2NoKSlcbiAgdmFyIHllYXJzID0gTWF0aC5yb3VuZCh0aGlzLnRpbWVDYWxjcy55ZWFycyhwYXN0RXBvY2gsIGN1cnJlbnRFcG9jaCkpXG5cbiAgdmFyIHN1ZmZpeCA9IHRoaXMuc3VmZml4RGljdGlvbmFyeVxuICB2YXIgY3V0b2ZmID0gdGhpcy5jdXRvZmZcblxuICBpZiAoc2Vjb25kcyA8IGN1dG9mZi5zZWNvbmRzKSB7XG4gICAgcmV0dXJuIHNlY29uZHMgKyBzdWZmaXguc2Vjb25kc1tnZXRGb3JtKHNlY29uZHMpXVxuICB9IGVsc2UgaWYgKG1pbnV0ZXMgPCBjdXRvZmYubWludXRlcykge1xuICAgIHJldHVybiBtaW51dGVzICsgc3VmZml4Lm1pbnV0ZXNbZ2V0Rm9ybShtaW51dGVzKV1cbiAgfSBlbHNlIGlmIChob3VycyA8IGN1dG9mZi5ob3Vycykge1xuICAgIHJldHVybiBob3VycyArIHN1ZmZpeC5ob3Vyc1tnZXRGb3JtKGhvdXJzKV1cbiAgfSBlbHNlIGlmIChkYXlzIDwgY3V0b2ZmLmRheXMpIHtcbiAgICByZXR1cm4gZGF5cyArIHN1ZmZpeC5kYXlzW2dldEZvcm0oZGF5cyldXG4gIH0gZWxzZSBpZiAod2Vla3MgPCBjdXRvZmYud2Vla3MpIHtcbiAgICByZXR1cm4gd2Vla3MgKyBzdWZmaXgud2Vla3NbZ2V0Rm9ybSh3ZWVrcyldXG4gIH0gZWxzZSBpZiAobW9udGhzIDwgY3V0b2ZmLm1vbnRocykge1xuICAgIHJldHVybiBtb250aHMgKyBzdWZmaXgubW9udGhzW2dldEZvcm0obW9udGhzKV1cbiAgfSBlbHNlIHtcbiAgICByZXR1cm4geWVhcnMgKyBzdWZmaXgueWVhcnNbZ2V0Rm9ybSh5ZWFycyldXG4gIH1cbn1cblxuZnVuY3Rpb24gZ2V0Rm9ybSAodmFsdWUpIHtcbiAgaWYgKHZhbHVlID09PSAxKSB7XG4gICAgcmV0dXJuICdzaW5ndWxhcidcbiAgfVxuICByZXR1cm4gJ3BsdXJhbCdcbn1cbiIsIm1vZHVsZS5leHBvcnRzID0ge1xuICBzZWNvbmRzOiByZXF1aXJlKCcuL3RpbWUtYWdvL3NlY29uZHMtYWdvLmpzJyksXG4gIG1pbnV0ZXM6IHJlcXVpcmUoJy4vdGltZS1hZ28vbWludXRlcy1hZ28uanMnKSxcbiAgaG91cnM6IHJlcXVpcmUoJy4vdGltZS1hZ28vaG91cnMtYWdvLmpzJyksXG4gIGRheXM6IHJlcXVpcmUoJy4vdGltZS1hZ28vZGF5cy1hZ28uanMnKSxcbiAgd2Vla3M6IHJlcXVpcmUoJy4vdGltZS1hZ28vd2Vla3MtYWdvLmpzJyksXG4gIG1vbnRoczogcmVxdWlyZSgnLi90aW1lLWFnby9tb250aHMtYWdvLmpzJyksXG4gIHllYXJzOiByZXF1aXJlKCcuL3RpbWUtYWdvL3llYXJzLWFnby5qcycpXG59XG4iLCJtb2R1bGUuZXhwb3J0cyA9IERheXNBZ29cblxuZnVuY3Rpb24gRGF5c0FnbyAocGFzdEVwb2NoLCBjdXJyZW50RXBvY2gpIHtcbiAgdmFyIGRheXNBZ28gPSAoY3VycmVudEVwb2NoIC0gcGFzdEVwb2NoKSAvIDEwMDAgLyA2MCAvIDYwIC8gMjRcbiAgcmV0dXJuIGRheXNBZ29cbn1cbiIsIm1vZHVsZS5leHBvcnRzID0gSG91cnNBZ29cblxuZnVuY3Rpb24gSG91cnNBZ28gKHBhc3RFcG9jaCwgY3VycmVudEVwb2NoKSB7XG4gIHZhciBob3Vyc0FnbyA9IChjdXJyZW50RXBvY2ggLSBwYXN0RXBvY2gpIC8gMTAwMCAvIDYwIC8gNjBcbiAgcmV0dXJuIGhvdXJzQWdvXG59XG4iLCJtb2R1bGUuZXhwb3J0cyA9IE1pbnV0ZXNBZ29cblxuZnVuY3Rpb24gTWludXRlc0FnbyAocGFzdEVwb2NoLCBjdXJyZW50RXBvY2gpIHtcbiAgdmFyIG1pbnV0ZXNBZ28gPSAoY3VycmVudEVwb2NoIC0gcGFzdEVwb2NoKSAvIDEwMDAgLyA2MFxuICByZXR1cm4gbWludXRlc0Fnb1xufVxuIiwibW9kdWxlLmV4cG9ydHMgPSBNb250aHNBZ29cblxuZnVuY3Rpb24gTW9udGhzQWdvIChwYXN0RXBvY2gsIGN1cnJlbnRFcG9jaCkge1xuICB2YXIgbW9udGhzQWdvID0gKGN1cnJlbnRFcG9jaCAtIHBhc3RFcG9jaCkgLyAxMDAwIC8gNjAgLyA2MCAvIDI0IC8gMzFcbiAgcmV0dXJuIG1vbnRoc0Fnb1xufVxuIiwibW9kdWxlLmV4cG9ydHMgPSBTZWNvbmRzQWdvXG5cbmZ1bmN0aW9uIFNlY29uZHNBZ28gKHBhc3RFcG9jaCwgY3VycmVudEVwb2NoKSB7XG4gIHZhciBzZWNvbmRzQWdvID0gKGN1cnJlbnRFcG9jaCAtIHBhc3RFcG9jaCkgLyAxMDAwXG4gIHJldHVybiBzZWNvbmRzQWdvXG59XG4iLCJtb2R1bGUuZXhwb3J0cyA9IFdlZWtzQWdvXG5cbmZ1bmN0aW9uIFdlZWtzQWdvIChwYXN0RXBvY2gsIGN1cnJlbnRFcG9jaCkge1xuICB2YXIgd2Vla3NBZ28gPSAoY3VycmVudEVwb2NoIC0gcGFzdEVwb2NoKSAvIDEwMDAgLyA2MCAvIDYwIC8gMjQgLyA3XG4gIHJldHVybiB3ZWVrc0Fnb1xufVxuIiwibW9kdWxlLmV4cG9ydHMgPSBZZWFyc0Fnb1xuXG5mdW5jdGlvbiBZZWFyc0FnbyAocGFzdEVwb2NoLCBjdXJyZW50RXBvY2gpIHtcbiAgdmFyIHllYXJzQWdvID0gKGN1cnJlbnRFcG9jaCAtIHBhc3RFcG9jaCkgLyAxMDAwIC8gNjAgLyA2MCAvIDI0IC8gMzEgLyAxMlxuICByZXR1cm4geWVhcnNBZ29cbn1cbiIsIi8qKlxuICogSGFuZGxlIG5hdmlnYXRpb25cbiAqL1xuXG4vLyBEZXBlbmRlbmNpZXNcbmltcG9ydCBzY3JvbGxDaGFuZ2UgZnJvbSAnZHMtYXNzZXRzL3Njcm9sbC9zY3JvbGwtY2hhbmdlJztcbmltcG9ydCBkZWJvdW5jZSBmcm9tICdkcy1hc3NldHMvYXN5bmMvZGVib3VuY2UnO1xuaW1wb3J0IGdldEFsbCBmcm9tICdkcy1hc3NldHMvZG9tL2dldC1hbGwnO1xuaW1wb3J0IGhhc1Njcm9sbGVkUGFzdCBmcm9tICdkcy1hc3NldHMvc2Nyb2xsL2hhcy1zY3JvbGxlZC1wYXN0JztcbmltcG9ydCBnZXRVc2VyRGF0YSBmcm9tICcuLi9saWIvZ2V0LWxvZ2dlZC1pbi1kYXRhJztcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24oKSB7XG5cbiAgdmFyICRuYXYgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubmF2Jyk7XG4gIGlmICghJG5hdikge1xuICAgIHJldHVybjtcbiAgfVxuXG4gIHZhciAkYm9keSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2JvZHknKTtcblxuICAvLyBDbG9uZSBuYXZpZ2F0aW9uIGFuZCBtYWtlIHRoZSBuZXcgb25lIHN0aWNreVxuICB2YXIgJHN0aWNreU5hdiA9ICRuYXYuY2xvbmVOb2RlKHRydWUpO1xuICAkc3RpY2t5TmF2LmNsYXNzTGlzdC5hZGQoJ25hdi0tc3RpY2t5Jyk7XG4gICRib2R5Lmluc2VydEJlZm9yZSgkc3RpY2t5TmF2LCAkYm9keS5maXJzdENoaWxkKTtcblxuICB2YXIgJGZvb3RlclNoYXJlQmFyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmZvb3Rlcl9fc2hhcmUtYmFyJyk7XG4gIHZhciAkc3RpY2t5U2hhcmVCYXI7XG4gIGlmICgkZm9vdGVyU2hhcmVCYXIpIHtcbiAgICAkc3RpY2t5U2hhcmVCYXIgPSAkZm9vdGVyU2hhcmVCYXIuY2xvbmVOb2RlKHRydWUpO1xuICAgICRzdGlja3lTaGFyZUJhci5jbGFzc0xpc3QuYWRkKCdmb290ZXJfX3NoYXJlLWJhci0tc3RpY2t5Jyk7XG4gICAgJGJvZHkuaW5zZXJ0QmVmb3JlKCRzdGlja3lTaGFyZUJhciwgJGJvZHkuZmlyc3RDaGlsZCk7XG4gIH1cblxuICAvLyBBY3RpdmF0ZSB0aGUgc3RpY2t5IG5hdmlnYXRpb24gd2hlbiB0aGUgdXNlciBzY3JvbGxzIHVwLlxuICAvLyBUaGlzIHdpbGwgZmlycyB0YWtlIGVmZmVjdCwgd2hlbiB0aGUgdXNlciBoYXMgc2Nyb2xsZWQgXCJhIHNjcmVlblwiIGRvd24uXG4gIHNjcm9sbENoYW5nZShmdW5jdGlvbigpIHtcbiAgICAkc3RpY2t5TmF2LmNsYXNzTGlzdC5yZW1vdmUoJ25hdi0tYWN0aXZlJyk7XG4gICAgaWYgKCRzdGlja3lTaGFyZUJhcikge1xuICAgICAgJHN0aWNreVNoYXJlQmFyLmNsYXNzTGlzdC5yZW1vdmUoJ2Zvb3Rlcl9fc2hhcmUtYmFyLS1zdGlja3ktYWN0aXZlJyk7XG4gICAgfVxuICB9LCBmdW5jdGlvbigpIHtcbiAgICBpZiAod2luZG93LnNjcm9sbFkgPiB3aW5kb3cuaW5uZXJIZWlnaHQpIHtcbiAgICAgICRzdGlja3lOYXYuY2xhc3NMaXN0LmFkZCgnbmF2LS1hY3RpdmUnKTtcbiAgICAgIGlmICgkc3RpY2t5U2hhcmVCYXIpIHtcbiAgICAgICAgJHN0aWNreVNoYXJlQmFyLmNsYXNzTGlzdC5hZGQoJ2Zvb3Rlcl9fc2hhcmUtYmFyLS1zdGlja3ktYWN0aXZlJyk7XG4gICAgICB9XG4gICAgfVxuICB9KTtcblxuICAvKipcbiAgICogSGlkZSBzdGlja3kgbmF2aWdhdGlvbiB3aGVuIHNjcm9sbGVkIHRvIHRoZSB0b3Agb2YgdGhlIGRvY3VtZW50XG4gICAqIEByZXR1cm4ge3ZvaWR9XG4gICAqL1xuICB2YXIgb25Ub3AgPSBmdW5jdGlvbigpIHtcbiAgICB2YXIgc2Nyb2xsUG9zID0gd2luZG93LnNjcm9sbFkgfHwgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LnNjcm9sbFRvcDtcbiAgICBpZiAoc2Nyb2xsUG9zIDw9IDApIHtcbiAgICAgICRzdGlja3lOYXYuY2xhc3NMaXN0LmFkZCgnbmF2LS1oaWRkZW4nKTtcbiAgICAgICRzdGlja3lOYXYuY2xhc3NMaXN0LnJlbW92ZSgnbmF2LS1hY3RpdmUnKTtcbiAgICAgIGlmICgkc3RpY2t5U2hhcmVCYXIpIHtcbiAgICAgICAgJHN0aWNreVNoYXJlQmFyLmNsYXNzTGlzdC5yZW1vdmUoJ2Zvb3Rlcl9fc2hhcmUtYmFyLS1zdGlja3ktYWN0aXZlJyk7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgICRzdGlja3lOYXYuY2xhc3NMaXN0LnJlbW92ZSgnbmF2LS1oaWRkZW4nKTtcbiAgICB9XG4gICAgaWYgKCRzdGlja3lTaGFyZUJhcikge1xuICAgICAgdmFyIHRocmVzaG9sZCA9ICRmb290ZXJTaGFyZUJhci5vZmZzZXRIZWlnaHQgLyB3aW5kb3cuaW5uZXJIZWlnaHQ7XG4gICAgICBpZiAoaGFzU2Nyb2xsZWRQYXN0KCRmb290ZXJTaGFyZUJhciwgLTEgKiB0aHJlc2hvbGQpKSB7XG4gICAgICAgICRzdGlja3lTaGFyZUJhci5jbGFzc0xpc3QuYWRkKCdoaWRkZW4nKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgICRzdGlja3lTaGFyZUJhci5jbGFzc0xpc3QucmVtb3ZlKCdoaWRkZW4nKTtcbiAgICAgIH1cbiAgICB9XG4gIH07XG5cbiAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3Njcm9sbCcsIGRlYm91bmNlKG9uVG9wKSk7XG4gIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdyZXNpemUnLCBkZWJvdW5jZShvblRvcCkpO1xuXG4gIC8vIENoYW5nZSB3b3JkaW5nIG9uIFwic2lnbiBpblwiIGJ1dHRvbiB3aGVuIHVzZXIgaXMgbG9nZ2VkIGluXG4gIGdldFVzZXJEYXRhKCkudGhlbihmdW5jdGlvbigpIHtcbiAgICBnZXRBbGwoJy5uYXZfX2l0ZW0tLXNpZ24taW4nKS5mb3JFYWNoKGZ1bmN0aW9uKCRzaWduaW4pIHtcbiAgICAgICRzaWduaW4uaW5uZXJIVE1MID0gJ0NyZWF0ZSBhIHN0b3J5JztcbiAgICB9KTtcbiAgfSkuY2F0Y2goZnVuY3Rpb24oKSB7fSk7XG5cbn1cbiIsIi8qKlxuICogSGFuZGxlIHJlc3BvbnNlcyBhbmQgbGlrZXMgaW4gcG9zdHNcbiAqL1xuXG4vLyBEZXBlbmRlbmNpZXNcbmltcG9ydCBnZXRBbGwgZnJvbSAnZHMtYXNzZXRzL2RvbS9nZXQtYWxsJztcbmltcG9ydCBsYXp5SW1hZ2VzIGZyb20gJ2RzLWFzc2V0cy9sYXp5L2ltYWdlcyc7XG5pbXBvcnQgKiBhcyBhcGkgZnJvbSAnLi4vbGliL2FwaSc7XG5pbXBvcnQgZ2V0VXNlckRhdGEgZnJvbSAnLi4vbGliL2dldC1sb2dnZWQtaW4tZGF0YSc7XG5pbXBvcnQgdXNlck1ldGFUZW1wbGF0ZSBmcm9tICcuLi90ZW1wbGF0ZXMvcmVzcG9uc2UtbWV0YSc7XG5pbXBvcnQgcmVzcG9uc2VUZW1wbGF0ZSBmcm9tICcuLi90ZW1wbGF0ZXMvcmVzcG9uc2UnO1xuaW1wb3J0IG9mZnNldFRvcCBmcm9tICdkcy1hc3NldHMvZG9tL2dldC1kb2N1bWVudC1vZmZzZXQtdG9wJztcbmltcG9ydCBsaXZlVmFsaWRhdGlvbiBmcm9tICcuLi9saWIvZm9ybS9saXZlLXZhbGlkYXRpb24nO1xuaW1wb3J0IHZhbGlkYXRlRm9ybSBmcm9tICcuLi9saWIvZm9ybS92YWxpZGF0ZSc7XG5cbi8vIENhY2hlZCBkb20gZWxlbWVudHNcbnZhciAkcmVzcG9uc2VGb3JtO1xudmFyICRjdGE7XG52YXIgJHZhbGlkYXRvcnM7XG52YXIgJHJlc3BvbnNlc0xpc3Q7XG52YXIgcmVuZGVyUmVzcG9uc2VzO1xudmFyIGFkZERlbGV0ZUV2ZW50cztcbnZhciBzZXRSZXNwb25zZXNOdW1iZXI7XG52YXIgYWRkUmVhZE1vcmVFdmVudDtcblxudmFyIHVwZGF0ZVJlc3BvbnNlQ1RBID0gZnVuY3Rpb24odmFsaWQpIHtcblx0aWYgKHZhbGlkKSB7XG5cdFx0JGN0YS5jbGFzc0xpc3QucmVtb3ZlKCdidG4tLWRpc2FibGVkJyk7XG5cdH0gZWxzZSB7XG5cdFx0JGN0YS5jbGFzc0xpc3QuYWRkKCdidG4tLWRpc2FibGVkJyk7XG5cdH1cbn07XG5cbi8qKlxuICogRGVsZXRlIHJlc3BvbnNlIHdoZW4gZGVsZXRlIGljb24gY2xpY2tlZFxuICovXG5hZGREZWxldGVFdmVudHMgPSBmdW5jdGlvbigpIHtcblx0Z2V0QWxsKCcucmVzcG9uc2VfX2RlbGV0ZScpLmZvckVhY2goZnVuY3Rpb24oJGRlbGV0ZSkge1xuXHRcdCRkZWxldGUuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbihlKSB7XG5cdFx0XHRlLnByZXZlbnREZWZhdWx0KCk7XG5cdFx0XHRhcGkucmVtb3ZlUmVzcG9uc2UoJGRlbGV0ZS5kYXRhc2V0LnB1Ymxpc2hlZCwgJGRlbGV0ZS5kYXRhc2V0Lm5hbWUpXG5cdFx0XHRcdC50aGVuKGZ1bmN0aW9uKGRhdGEpIHtcblx0XHRcdFx0XHRyZW5kZXJSZXNwb25zZXMoZGF0YS5yZXNwb25zZXMpO1xuXHRcdFx0XHRcdHNldFJlc3BvbnNlc051bWJlcihkYXRhLnJlc3BvbnNlcyk7XG5cdFx0XHRcdH0pO1xuXHRcdH0pO1xuXHR9KTtcbn07XG5cbi8qKlxuICogRXhwYW5kIHJlc3BvbnNlIHdpdGggZnVsbCB0ZXh0IHdoZW4gcmVhZCBtb3JlIGJ1dHRvbiBpcyBhY3RpdmF0ZWQuXG4gKiBCYXNpY2FsbHkgaXQgaGlkZXMgdGhlIGV4Y2VycHQgYW5kIHRoZSByZWFkIG1vcmUgYnV0dG9uIGFuZCBkaXNwbGF5cyB0aGVcbiAqIGZ1bGwgdGV4dC5cbiAqIEBwYXJhbSB7ZWxlbWVudH0gJHJlc3BvbnNlXG4gKi9cbmFkZFJlYWRNb3JlRXZlbnQgPSBmdW5jdGlvbigkcmVzcG9uc2UpIHtcblx0dmFyICRyZWFkTW9yZSA9ICRyZXNwb25zZS5xdWVyeVNlbGVjdG9yKCcucmVzcG9uc2VfX3JlYWQtbW9yZScpO1xuXHRpZiAoISRyZWFkTW9yZSkge1xuXHRcdHJldHVybjtcblx0fVxuXHQkcmVhZE1vcmUuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbihlKSB7XG5cdFx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xuXHRcdHZhciAkZXhjZXJwdCA9ICRyZXNwb25zZS5xdWVyeVNlbGVjdG9yKCcucmVzcG9uc2VfX2V4Y2VycHQnKTtcblx0XHR2YXIgJHJlYWRNb3JlQ29udGFpbmVyID0gJHJlYWRNb3JlLnBhcmVudE5vZGU7XG5cblx0XHQkcmVhZE1vcmVDb250YWluZXIucGFyZW50Tm9kZS5yZW1vdmVDaGlsZCgkcmVhZE1vcmVDb250YWluZXIpO1xuXHRcdCRleGNlcnB0LnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQoJGV4Y2VycHQpO1xuXG5cdFx0JHJlc3BvbnNlLnF1ZXJ5U2VsZWN0b3IoJy5yZXNwb25zZV9fdGV4dCcpLmNsYXNzTGlzdC5yZW1vdmUoJ2hpZGRlbicpO1xuXHR9KTtcbn07XG5cbi8qKlxuICogUmVuZGVyIHRlbXBsYXRlcyBmb3IgcmVzcG9uc2VzIGFuZCBpbnNlcnQgaHRtbCBpbiB0aGUgcmVzcG9uc2VzIGxpc3QuXG4gKiAtIExhenkgbG9hZCBpbWFnZXMgaW4gcmVzcG9uc2VzXG4gKiAtIEF0dGFjaCBuZXcgZXZlbnRzIGluIHJlc3BvbnNlc1xuICogQHBhcmFtICB7YXJyYXl9IHJlc3BvbnNlc1xuICogQHJldHVybiB7dm9pZH1cbiAqL1xucmVuZGVyUmVzcG9uc2VzID0gZnVuY3Rpb24ocmVzcG9uc2VzKSB7XG5cdHZhciBodG1sID0gJyc7XG5cdHJlc3BvbnNlcy5mb3JFYWNoKGZ1bmN0aW9uKHJlc3BvbnNlKSB7XG5cdFx0aHRtbCArPSByZXNwb25zZVRlbXBsYXRlKHJlc3BvbnNlKTtcblx0fSk7XG5cdCRyZXNwb25zZXNMaXN0LmlubmVySFRNTCA9IGh0bWw7XG5cdGxhenlJbWFnZXMoMSk7XG5cdGFkZERlbGV0ZUV2ZW50cygpO1xuXHRnZXRBbGwoJy5yZXNwb25zZScsICRyZXNwb25zZXNMaXN0KS5mb3JFYWNoKGFkZFJlYWRNb3JlRXZlbnQpO1xufTtcblxuLyoqXG4gKiBVcGRhdGUgdGhlIGNvdW50IG9mIHJlc3BvbnNlc1xuICogQHBhcmFtIHthcnJheX0gcmVzcG9uc2VzXG4gKi9cbnNldFJlc3BvbnNlc051bWJlciA9IGZ1bmN0aW9uKHJlc3BvbnNlcykge1xuXHRnZXRBbGwoJy5zaGFyZV9fcmVzcG9uc2VzJykuZm9yRWFjaChmdW5jdGlvbigkcmVzcG9uc2VzKSB7XG5cdFx0JHJlc3BvbnNlcy5pbm5lckhUTUwgPSByZXNwb25zZXMubGVuZ3RoO1xuXHR9KTtcbn07XG5cbi8qKlxuICogVXBkYXRlIHRoZSBjb3VudCBmbyBsaWtlcyBmb3IgdGhpcyBwb3N0XG4gKiBAcGFyYW0ge251bWJlcn0gbGlrZXNcbiAqL1xudmFyIHNldExpa2VzTnVtYmVyID0gZnVuY3Rpb24obGlrZXMpIHtcblx0Z2V0QWxsKCcuc2hhcmVfX2xpa2VzJykuZm9yRWFjaChmdW5jdGlvbigkbGlrZXMpIHtcblx0XHRpZiAoIWlzTmFOKGxpa2VzKSkge1xuXHRcdFx0JGxpa2VzLmlubmVySFRNTCA9IGxpa2VzO1xuXHRcdH0gZWxzZSBpZiAoaXNOYU4oJGxpa2VzLmlubmVySFRNTCkpIHtcblx0XHRcdCRsaWtlcy5pbm5lckhUTUwgPSAxO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHQkbGlrZXMuaW5uZXJIVE1MID0gcGFyc2VJbnQoJGxpa2VzLmlubmVySFRNTCkgKyAxO1xuXHRcdH1cblx0fSk7XG59O1xuXG4vKipcbiAqIEdldCBkYXRhIGZyb20gYXBpIHdpdGggbWV0YSBkYXRhOiByZXNwb25zZXMgYW5kIGxpa2VzLlxuICogUmVuZGVyIHRoaXMgaW4gdGhlIGRvbS5cbiAqIEByZXR1cm4ge3ZvaWR9XG4gKi9cbnZhciByZW5kZXJNZXRhID0gZnVuY3Rpb24oKSB7XG5cdGFwaS5nZXRNZXRhKCkudGhlbihmdW5jdGlvbihkYXRhKSB7XG5cdFx0cmVuZGVyUmVzcG9uc2VzKGRhdGEucmVzcG9uc2VzKTtcblx0XHRzZXRSZXNwb25zZXNOdW1iZXIoZGF0YS5yZXNwb25zZXMpO1xuXHRcdHNldExpa2VzTnVtYmVyKGRhdGEubGlrZXMpO1xuXHR9KTtcbn07XG5cbi8qKlxuICogUG9zdCBuZXcgcmVzcG9uc2UgdG8gcG9zdFxuICogLSBjaGVja3MgZm9yIHZhbGlkYXRpb24gYmVmb3JlIHBvc3RpbmdcbiAqIEBwYXJhbSAge2V2ZW50fSBlXG4gKiBAcmV0dXJuIHt2b2lkfVxuICovXG52YXIgc3VibWl0UmVzcG9uc2UgPSBmdW5jdGlvbihlKSB7XG5cdGUucHJldmVudERlZmF1bHQoKTtcblxuXHR2YXIgbG9nZ2VkSW4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdib2R5JykuY2xhc3NMaXN0LmNvbnRhaW5zKCd1c2VyLWxvZ2dlZC1pbicpO1xuXG5cdC8vIElmIGEgZmllbGQgaXMgbm90IHZhbGlkIHRoaXMgZmllbGQgd2lsbCBnZXQgZm9jdXMsIHNvIHRoZSB1c2VyIHF1aWNrbHkgY2FuIHVwZGF0ZSB0aGUgdmFsdWUuXG5cdHZhciBub3RWYWxpZCA9ICR2YWxpZGF0b3JzLnNvbWUoZnVuY3Rpb24oJHZhbGlkYXRvcikge1xuXHRcdGlmICgkdmFsaWRhdG9yLmNsYXNzTGlzdC5jb250YWlucygndmFsaWRhdGUtLW5vdC12YWxpZCcpKSB7XG5cdFx0XHR2YXIgJHZhbGlkYXRlRmllbGQgPSAkdmFsaWRhdG9yLnF1ZXJ5U2VsZWN0b3IoJ2lucHV0LCB0ZXh0YXJlYScpO1xuXHRcdFx0JHZhbGlkYXRlRmllbGQuZm9jdXMoKTtcblx0XHRcdHJldHVybiB0cnVlO1xuXHRcdH1cblx0fSk7XG5cblx0aWYgKG5vdFZhbGlkKSB7XG5cdFx0cmV0dXJuO1xuXHR9XG5cblx0Ly8gQ3JlYXRlIGEgcmVzcG9uc2Ugb2JqZWN0IGJhc2VkIG9uIHZhbHVlcyBpbiBmb3JtXG5cdHZhciByZXNwb25zZSA9IHt9O1xuXHRnZXRBbGwoJ2lucHV0LCB0ZXh0YXJlYScsICRyZXNwb25zZUZvcm0pLmZvckVhY2goZnVuY3Rpb24oJGZpZWxkKSB7XG5cdFx0dmFyIG5hbWUgPSAkZmllbGQuZ2V0QXR0cmlidXRlKCduYW1lJyk7XG5cdFx0aWYgKCRmaWVsZC52YWx1ZSkge1xuXHRcdFx0cmVzcG9uc2VbbmFtZV0gPSAkZmllbGQudmFsdWU7XG5cdFx0fVxuXHR9KTtcblxuXHQkY3RhLmlubmVySFRNTCA9ICdQb3N0aW5nLi4uJztcblx0JGN0YS5jbGFzc0xpc3QuYWRkKCdidG4tLWRpc2FibGVkJyk7XG5cdGFwaS5hZGRSZXNwb25zZShyZXNwb25zZSkudGhlbihmdW5jdGlvbihkYXRhKSB7XG5cdFx0cmVuZGVyUmVzcG9uc2VzKGRhdGEucmVzcG9uc2VzKTtcblx0XHRzZXRSZXNwb25zZXNOdW1iZXIoZGF0YS5yZXNwb25zZXMpO1xuXG5cdFx0Ly8gU2Nyb2xsIHRvIG5ldyByZXNwb25zZVxuXHRcdHZhciAkbGFzdFJlc3BvbnNlID0gJHJlc3BvbnNlc0xpc3QucXVlcnlTZWxlY3RvcignLnJlc3BvbnNlOmxhc3QtY2hpbGQnKTtcblx0XHR2YXIgb2Zmc2V0ID0gb2Zmc2V0VG9wKCRsYXN0UmVzcG9uc2UpO1xuXHRcdHdpbmRvdy5zY3JvbGxUbygwLCBvZmZzZXQgLSAoMC41ICogd2luZG93LmlubmVySGVpZ2h0KSk7XG5cblx0XHQvLyBSZXNldCBmb3JtXG5cdFx0JGN0YS5pbm5lckhUTUwgPSAnUmVzcG9uZCc7XG5cdFx0aWYgKGxvZ2dlZEluKSB7XG5cdFx0XHR2YXIgJHRleHQgPSAkcmVzcG9uc2VGb3JtLnF1ZXJ5U2VsZWN0b3IoJy5yZXNwb25zZXMtZm9ybV9fdGV4dCcpO1xuXHRcdFx0JHRleHQuY2xhc3NMaXN0LmFkZCgndmFsaWRhdGUtLW5vdC12YWxpZCcpO1xuXHRcdFx0JHRleHQuY2xhc3NMaXN0LnJlbW92ZSgndmFsaWRhdGUtLXZhbGlkJyk7XG5cdFx0XHQkdGV4dC5xdWVyeVNlbGVjdG9yKCd0ZXh0YXJlYScpLnZhbHVlID0gJyc7XG5cdFx0XHQkdGV4dC5xdWVyeVNlbGVjdG9yKCcucGxhY2Vob2xkZXInKS5jbGFzc0xpc3QucmVtb3ZlKCdwbGFjZWhvbGRlci0tbm90LWVtcHR5Jyk7XG5cdFx0fSBlbHNlIHtcblx0XHRcdCR2YWxpZGF0b3JzLmZvckVhY2goZnVuY3Rpb24oJHZhbGlkYXRvcikge1xuXHRcdFx0XHRpZiAoJHZhbGlkYXRvci5kYXRhc2V0LnZhbGlkYXRlUmVxdWlyZWQgIT09IHVuZGVmaW5lZCkge1xuXHRcdFx0XHRcdCR2YWxpZGF0b3IuY2xhc3NMaXN0LmFkZCgndmFsaWRhdGUtLW5vdC12YWxpZCcpO1xuXHRcdFx0XHRcdCR2YWxpZGF0b3IuY2xhc3NMaXN0LnJlbW92ZSgndmFsaWRhdGUtLXZhbGlkJyk7XG5cdFx0XHRcdH1cblx0XHRcdFx0JHZhbGlkYXRvci5xdWVyeVNlbGVjdG9yKCdpbnB1dCwgdGV4dGFyZWEnKS52YWx1ZSA9ICcnO1xuXHRcdFx0XHQkdmFsaWRhdG9yLnF1ZXJ5U2VsZWN0b3IoJy5wbGFjZWhvbGRlcicpLmNsYXNzTGlzdC5yZW1vdmUoJ3BsYWNlaG9sZGVyLS1ub3QtZW1wdHknKTtcblx0XHRcdH0pO1xuXHRcdH1cblx0fSk7XG5cbn07XG5cbi8qKlxuICogVXBkYXRlIGhlYXJ0IChsaWtlKSBpY29ucyB0byBpbmRpY2F0ZSwgdGhhdCB0aGUgdXNlciBoYXZlIGxpa2VkIHRoZSBhcnRpY2xlXG4gKiBAcmV0dXJuIHt2b2lkfVxuICovXG52YXIgbGlrZWQgPSBmdW5jdGlvbigpIHtcblx0dmFyICR0b29sVGlwSWNvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy50b29sLXRpcF9fbGlrZS1pY29uJyk7XG5cdCR0b29sVGlwSWNvbi5zZXRBdHRyaWJ1dGUoJ3NyYycsICcvYXNzZXRzL2ltYWdlcy9oZWFydC0taW52ZXJzZS0tYWN0aXZlLnN2ZycpO1xuXHQkdG9vbFRpcEljb24uc2V0QXR0cmlidXRlKCdkYXRhLXNyYycsICcvYXNzZXRzL2ltYWdlcy9oZWFydC0taW52ZXJzZS0tYWN0aXZlLnN2ZycpO1xuXG5cdGdldEFsbCgnLnBvc3QtZm9vdGVyX19saWtlLWljb24nKS5mb3JFYWNoKGZ1bmN0aW9uKCRmb290ZXJJY29uKSB7XG5cdFx0JGZvb3Rlckljb24uc2V0QXR0cmlidXRlKCdzcmMnLCAnL2Fzc2V0cy9pbWFnZXMvaGVhcnQtLWludmVyc2UtLWFjdGl2ZS5zdmcnKTtcblx0XHQkZm9vdGVySWNvbi5zZXRBdHRyaWJ1dGUoJ2RhdGEtc3JjJywgJy9hc3NldHMvaW1hZ2VzL2hlYXJ0LS1pbnZlcnNlLS1hY3RpdmUuc3ZnJyk7XG5cdH0pO1xuXG5cdC8vIEluZGljYXRlcywgdGhhdCB0aGUgbGlrZSBidXR0b24gbm8gbG9uZ2VyIGlzIGNsaWNrYWJsZVxuXHRnZXRBbGwoJy5zaGFyZV9fbGlrZScpLmZvckVhY2goJGxpa2UgPT4gJGxpa2UuY2xhc3NMaXN0LmFkZCgnZGlzYWJsZWQnKSk7XG59O1xuXG4vKipcbiAqIEFjdGl2YXRlIGxpa2UsIHdoZW4gbGlrZSBidXR0b25zIGFyZSBjbGlja2VkXG4gKiBAcGFyYW0gIHtlbGVtZW50fSAkYW5jaG9yXG4gKiBAcmV0dXJuIHt2b2lkfVxuICovXG52YXIgYXR0YWNoTGlrZUV2ZW50ID0gZnVuY3Rpb24oJGFuY2hvcikge1xuXHQkYW5jaG9yLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24oZSkge1xuXHRcdGUucHJldmVudERlZmF1bHQoKTtcblxuXHRcdC8vIEFscmVhZHkgbGlrZWQgdGhpcyBhcnRpY2xlXG5cdFx0aWYgKGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdsaWtlOicgKyB3aW5kb3cucG9zdElkKSkge1xuXHRcdFx0cmV0dXJuO1xuXHRcdH1cblxuXHRcdGxvY2FsU3RvcmFnZS5zZXRJdGVtKCdsaWtlOicgKyB3aW5kb3cucG9zdElkLCB0cnVlKTtcblx0XHRsaWtlZCgpO1xuXHRcdHNldExpa2VzTnVtYmVyKCk7XG5cdFx0YXBpLmxpa2UoKTtcblx0fSk7XG59O1xuXG4vKipcbiAqIFVwZGF0ZSByZXNwb25zZXMgZm9ybSBpZiB1c2VyIGlzIGxvZ2dlZCBpbi5cbiAqIFVzZXIgZG8gbm90IG5lZWQgdG8gZmlsbCBlLW1haWwsIG5hbWUgZXRjLlxuICogQHBhcmFtICB7b2JqZWN0fSBkYXRhXG4gKiBAcmV0dXJuIHt2b2lkfVxuICovXG52YXIgcmVuZGVyVXNlckZvcm0gPSBmdW5jdGlvbih1c2VyKSB7XG5cdHZhciBodG1sID0gdXNlck1ldGFUZW1wbGF0ZSh1c2VyKTtcblx0dmFyICRtZXRhID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG5cdCRtZXRhLmlubmVySFRNTCA9IGh0bWw7XG5cdHZhciAkaGVhZGVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnJlc3BvbnNlc19fZm9ybSBoMycpO1xuXG5cdC8vIEZpbGwgaW5wdXQgZmllbGRzIHdpdGggcmVsZXZhbnQgZGF0YVxuXHRnZXRBbGwoJy5yZXNwb25zZXNfX2Zvcm0gaW5wdXQnKS5mb3JFYWNoKGZ1bmN0aW9uKCRpbnB1dCkge1xuXHRcdHZhciBuYW1lID0gJGlucHV0LmdldEF0dHJpYnV0ZSgnbmFtZScpO1xuXHRcdGlmIChuYW1lID09PSAnd2Vic2l0ZScpIHtcblx0XHRcdCRpbnB1dC52YWx1ZSA9ICcvYXV0aG9yLycgKyB1c2VyLnNsdWc7XG5cdFx0fSBlbHNlIHtcblx0XHRcdCRpbnB1dC52YWx1ZSA9IHVzZXJbbmFtZV07XG5cdFx0fVxuXHRcdCRpbnB1dC5wYXJlbnROb2RlLmNsYXNzTGlzdC5hZGQoJ3ZhbGlkYXRlLS12YWxpZCcpO1xuXHRcdCRpbnB1dC5wYXJlbnROb2RlLmNsYXNzTGlzdC5yZW1vdmUoJ3ZhbGlkYXRlLS1ub3QtdmFsaWQnKTtcblx0fSk7XG5cblx0Ly8gSW5zZXJ0IGFmdGVyIGhlYWRlclxuXHQkaGVhZGVyLnBhcmVudE5vZGUuaW5zZXJ0QmVmb3JlKCRtZXRhLCAkaGVhZGVyLm5leHRTaWJsaW5nKTtcblx0bGF6eUltYWdlcygxKTtcblx0dmFsaWRhdGVGb3JtKCR2YWxpZGF0b3JzLCB1cGRhdGVSZXNwb25zZUNUQSk7XG59O1xuXG4vKipcbiAqIEluaXQgcmVzcG9uc2VzXG4gKiBAcmV0dXJuIHt2b2lkfVxuICovXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbigpIHtcblx0JHJlc3BvbnNlRm9ybSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5yZXNwb25zZXNfX2Zvcm0nKTtcblxuXHRpZiAoISRyZXNwb25zZUZvcm0pIHtcblx0XHRyZXR1cm47XG5cdH1cblxuXHQvLyBDYWNoZSBkb20gZWxlbWVudHNcblx0JGN0YSA9ICRyZXNwb25zZUZvcm0ucXVlcnlTZWxlY3RvcignLmJ0bi0tY3RhJyk7XG5cdCRyZXNwb25zZXNMaXN0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnJlc3BvbnNlc19fbGlzdCcpO1xuXHQkdmFsaWRhdG9ycyA9IGdldEFsbCgnLnZhbGlkYXRlJywgJHJlc3BvbnNlRm9ybSk7XG5cblx0Ly8gVXBkYXRlIGZyb20gYXMgdXNlciB0eXBlc1xuXHRsaXZlVmFsaWRhdGlvbigkdmFsaWRhdG9ycywgdXBkYXRlUmVzcG9uc2VDVEEpO1xuXG5cdC8vIFJlbmRlciByZXNwb25zZXMgYW5kIGxpa2Vcblx0cmVuZGVyTWV0YSgpO1xuXG5cdC8vIENoYW5nZSBmb3JtIGlmIHVzZXIgaXMgbG9nZ2VkIGluXG5cdGdldFVzZXJEYXRhKCkudGhlbihyZW5kZXJVc2VyRm9ybSkuY2F0Y2goZnVuY3Rpb24oKSB7fSk7XG5cblx0Ly8gVXNlciBhbHJlYWR5IGxpa2VzIHRoaXMgYXJ0aWNsZVxuXHRpZiAobG9jYWxTdG9yYWdlLmdldEl0ZW0oJ2xpa2U6JyArIHdpbmRvdy5wb3N0SWQpKSB7XG5cdFx0bGlrZWQoKTtcblx0fVxuXG5cdGdldEFsbCgnLnNoYXJlX19saWtlJykuZm9yRWFjaChhdHRhY2hMaWtlRXZlbnQpO1xuXHQkY3RhLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgc3VibWl0UmVzcG9uc2UpO1xuXG5cdC8vIFNob3cgbWFya2Rvd24gaGVscGVyc1xuXHRkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucmVzcG9uc2UtZm9ybV9fbWFya2Rvd24tZXhwYW5kZXInKS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uKGUpIHtcblx0XHRlLnByZXZlbnREZWZhdWx0KCk7XG5cdFx0ZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnJlc3BvbnNlLWZvcm1fX21hcmtkb3duLWhlbHBlcnMnKS5jbGFzc0xpc3QucmVtb3ZlKCdoaWRkZW4nKTtcblx0fSk7XG5cblx0Z2V0QWxsKCcucGxhY2Vob2xkZXInKS5mb3JFYWNoKGZ1bmN0aW9uKCRwbGFjZWhvbGRlcikge1xuXHRcdHZhciAkaW5wdXQgPSAkcGxhY2Vob2xkZXIucGFyZW50Tm9kZS5xdWVyeVNlbGVjdG9yKCdpbnB1dCwgdGV4dGFyZWEnKTtcblxuXHRcdCRwbGFjZWhvbGRlci5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uKCkge1xuXHRcdFx0JGlucHV0LmZvY3VzKCk7XG5cdFx0fSk7XG5cblx0XHQkaW5wdXQuYWRkRXZlbnRMaXN0ZW5lcignaW5wdXQnLCBmdW5jdGlvbigpIHtcblx0XHRcdGlmICgkaW5wdXQudmFsdWUgPT09ICcnKSB7XG5cdFx0XHRcdCRwbGFjZWhvbGRlci5jbGFzc0xpc3QucmVtb3ZlKCdwbGFjZWhvbGRlci0tbm90LWVtcHR5Jyk7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHQkcGxhY2Vob2xkZXIuY2xhc3NMaXN0LmFkZCgncGxhY2Vob2xkZXItLW5vdC1lbXB0eScpO1xuXHRcdFx0fVxuXHRcdH0pO1xuXHR9KTtcblxufVxuIiwiaW1wb3J0IGxhenlJbWFnZXMgZnJvbSAnZHMtYXNzZXRzL2xhenkvaW1hZ2VzJztcbmltcG9ydCBnZXRBbGwgZnJvbSAnZHMtYXNzZXRzL2RvbS9nZXQtYWxsJztcbmltcG9ydCAqIGFzIGFwaSBmcm9tICcuLi9saWIvYXBpJztcbmltcG9ydCBwb3N0VGVtcGxhdGUgZnJvbSAnLi4vdGVtcGxhdGVzL3Bvc3QnO1xuaW1wb3J0IGF1dGhvclRlbXBsYXRlIGZyb20gJy4uL3RlbXBsYXRlcy9hdXRob3InO1xuaW1wb3J0IHRhZ1RlbXBsYXRlIGZyb20gJy4uL3RlbXBsYXRlcy90YWcnO1xuXG5jb25zdCBNQVhfUkVTVUxUUyA9IDEwO1xuXG52YXIgJHNlYXJjaElucHV0O1xudmFyICRzZWFyY2hMaXN0O1xudmFyIGxhdGVzdENvdW50ZXIgPSAwO1xuXG52YXIgZ2V0U2VhcmNoUmVzdWx0ID0gZnVuY3Rpb24ocGF0aCkge1xuXHR2YXIgYWJzb2x1dGUgPSB3aW5kb3cuZ2hvc3QudXJsLmFwaShwYXRoLCB7XG5cdFx0aW5jbHVkZTogJ3RhZ3MsYXV0aG9yLGNvdW50LnBvc3RzJ1xuXHR9KTtcblx0dmFyIHJlbGF0aXZlID0gYWJzb2x1dGUuc3Vic3RyKGFic29sdXRlLmluZGV4T2YoJy9naG9zdCcpLCBhYnNvbHV0ZS5sZW5ndGgpO1xuXHRyZXR1cm4gZmV0Y2gocmVsYXRpdmUpXG5cdFx0LnRoZW4oZnVuY3Rpb24ocmVzcG9uc2UpIHtcblx0XHRcdGlmIChyZXNwb25zZS5zdGF0dXMgPj0gMzAwKSB7XG5cdFx0XHRcdHJldHVybiBQcm9taXNlLnJlamVjdChyZXNwb25zZSk7XG5cdFx0XHR9XG5cdFx0XHRyZXR1cm4gcmVzcG9uc2U7XG5cdFx0fSlcblx0XHQudGhlbihyZXNwb25zZSA9PiByZXNwb25zZS5qc29uKCkpO1xufTtcblxudmFyIHJlbmRlclJlc3VsdHMgPSBmdW5jdGlvbihyZXN1bHRzKSB7XG5cdHZhciBodG1sID0gcmVzdWx0cy5tYXAoZnVuY3Rpb24ocmVzdWx0KSB7XG5cdFx0aWYgKHJlc3VsdC5wb3N0cykge1xuXHRcdFx0cmV0dXJuIHBvc3RUZW1wbGF0ZShyZXN1bHQucG9zdHNbMF0pO1xuXHRcdH1cblx0XHRpZiAocmVzdWx0LnVzZXJzKSB7XG5cdFx0XHRyZXR1cm4gYXV0aG9yVGVtcGxhdGUocmVzdWx0LnVzZXJzWzBdKTtcblx0XHR9XG5cdFx0aWYgKHJlc3VsdC50YWdzKSB7XG5cdFx0XHRyZXR1cm4gdGFnVGVtcGxhdGUocmVzdWx0LnRhZ3NbMF0pO1xuXHRcdH1cblx0XHRyZXR1cm4gJyc7XG5cdH0pLmpvaW4oJycpO1xuXHQkc2VhcmNoTGlzdC5pbm5lckhUTUwgPSBodG1sO1xuXHRsYXp5SW1hZ2VzKDEpO1xuXHRnZXRBbGwoJy5ib3hlc19faXRlbScsICRzZWFyY2hMaXN0KS5mb3JFYWNoKGZ1bmN0aW9uKCRib3hJdGVtLCBpKSB7XG5cdFx0c2V0VGltZW91dChmdW5jdGlvbigpIHtcblx0XHRcdCRib3hJdGVtLmNsYXNzTGlzdC5yZW1vdmUoJ2hpZGRlbicpO1xuXHRcdFx0c2V0VGltZW91dCgoKSA9PiAkYm94SXRlbS5jbGFzc0xpc3QuYWRkKCdhbmltYXRlLS1hY3RpdmUnKSwgMCk7XG5cdFx0fSwgaSAqIDUwMCk7XG5cdH0pO1xufTtcblxudmFyIHNlYXJjaCA9IGZ1bmN0aW9uKHF1ZXJ5KSB7XG5cblx0dmFyIGlkID0gKytsYXRlc3RDb3VudGVyO1xuXHR2YXIgbWluVGltZSA9IERhdGUubm93KCkgKyAzMDA7XG5cblx0JHNlYXJjaExpc3QuaW5uZXJIVE1MID0gJyc7XG5cblx0dmFyIGlzTGF0ZXN0ID0gZnVuY3Rpb24oZGF0YSkge1xuXHRcdGlmIChpZCAhPT0gbGF0ZXN0Q291bnRlcikge1xuXHRcdFx0cmV0dXJuIFByb21pc2UucmVqZWN0KCk7XG5cdFx0fVxuXHRcdHJldHVybiBkYXRhO1xuXHR9O1xuXG5cdGFwaS5nZXRTZWFyY2hJbmRleChxdWVyeSlcblx0XHQudGhlbihpc0xhdGVzdClcblx0XHQudGhlbihmdW5jdGlvbihpbmRleGVzKSB7XG5cdFx0XHR2YXIgcHJvbWlzZXMgPSBpbmRleGVzLnNsaWNlKDAsIE1BWF9SRVNVTFRTKS5tYXAoZnVuY3Rpb24oaW5kZXgpIHtcblx0XHRcdFx0cmV0dXJuIGdldFNlYXJjaFJlc3VsdChpbmRleC5yZWYpO1xuXHRcdFx0fSk7XG5cdFx0XHRyZXR1cm4gUHJvbWlzZS5hbGwocHJvbWlzZXMpO1xuXHRcdH0pXG5cdFx0LnRoZW4oZnVuY3Rpb24oZGF0YSkge1xuXHRcdFx0aWYgKG1pblRpbWUgPCBEYXRlLm5vdygpKSB7XG5cdFx0XHRcdHJldHVybiBkYXRhO1xuXHRcdFx0fVxuXHRcdFx0cmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uKHJlc29sdmUpIHtcblx0XHRcdFx0c2V0VGltZW91dCgoKSA9PiByZXNvbHZlKGRhdGEpLCBtaW5UaW1lIC0gRGF0ZS5ub3coKSk7XG5cdFx0XHR9KTtcblx0XHR9KVxuXHRcdC50aGVuKGlzTGF0ZXN0KVxuXHRcdC50aGVuKHJlbmRlclJlc3VsdHMpXG5cdFx0LmNhdGNoKGZ1bmN0aW9uKGVycikge1xuXHRcdFx0aWYgKGVycikge1xuXHRcdFx0XHRjb25zb2xlLmVycm9yKGVycik7XG5cdFx0XHR9XG5cdFx0fSk7XG59O1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbigpIHtcblxuXHQkc2VhcmNoSW5wdXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuc2VhcmNoX19pbnB1dCcpO1xuXHQkc2VhcmNoTGlzdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5zZWFyY2hfX2xpc3QnKTtcblxuXHRpZiAoISRzZWFyY2hJbnB1dCB8fCAhJHNlYXJjaExpc3QpIHtcblx0XHRyZXR1cm47XG5cdH1cblx0JHNlYXJjaElucHV0LmFkZEV2ZW50TGlzdGVuZXIoJ2lucHV0JywgZnVuY3Rpb24oKSB7XG5cdFx0c2VhcmNoKCRzZWFyY2hJbnB1dC52YWx1ZSk7XG5cdH0pO1xuXG5cdCRzZWFyY2hJbnB1dC5mb2N1cygpO1xuXG5cdCRzZWFyY2hMaXN0LnNldEF0dHJpYnV0ZSgnc3R5bGUnLCBgbWluLWhlaWdodDogJHt3aW5kb3cuaW5uZXJIZWlnaHR9cHhgKTtcblxufVxuIiwiLyoqXG4gKiBUb29sIHRpcCBzaG93ZWQgd2hlbiB1c2VyIG1hcmtzIHRleHQgaW4gYXJ0aWNsZS5cbiAqIFRoaXMgbWFrZXMgdGhlIHVzZSBhYmxlIHRvIHNoYXJlL2NvbW1lbnQgb24gdGhlIG1hcmtlZC5cbiAqL1xuXG5pbXBvcnQgdmFsaWRhdGVGb3JtIGZyb20gJy4uL2xpYi9mb3JtL3ZhbGlkYXRlJztcbmltcG9ydCBnZXRBbGwgZnJvbSAnZHMtYXNzZXRzL2RvbS9nZXQtYWxsJztcblxuLy8gQ2FjaGVkIGRvbSBlbGVtZW50c1xudmFyICRwb3N0Q29udGVudDtcbnZhciAkdG9vbFRpcDtcbnZhciAkdHdpdHRlcjtcbnZhciAkcmVzcG9uc2VGb3JtO1xudmFyICRjdGE7XG5cblxuLyoqXG4gKiBHZXQgdGhlIHRleHQgc2VsZWN0ZWQgYnkgdGhlIHVzZXJcbiAqIEByZXR1cm4ge3N0cmluZ31cbiAqL1xudmFyIGdldFNlbGVjdGVkVGV4dCA9IGZ1bmN0aW9uKCkge1xuXHR2YXIgdGV4dCA9ICcnO1xuXHRpZiAodHlwZW9mIHdpbmRvdy5nZXRTZWxlY3Rpb24gIT09ICd1bmRlZmluZWQnKSB7XG5cdFx0dGV4dCA9IHdpbmRvdy5nZXRTZWxlY3Rpb24oKS50b1N0cmluZygpO1xuXHR9IGVsc2UgaWYgKHR5cGVvZiBkb2N1bWVudC5zZWxlY3Rpb24gIT09ICd1bmRlZmluZWQnICYmIGRvY3VtZW50LnNlbGVjdGlvbi50eXBlID09PSAnVGV4dCcpIHtcblx0XHR0ZXh0ID0gZG9jdW1lbnQuc2VsZWN0aW9uLmNyZWF0ZVJhbmdlKCkudGV4dDtcblx0fVxuXHRyZXR1cm4gdGV4dDtcbn07XG5cbi8qKlxuICogQ2hlY2sgaWYgdGhlIHNlbGVjdGVkIHRleHQgaXMgaW5zaWRlIHRoZSBjb250ZW50IGNvbnRhaW5lclxuICogQHBhcmFtICB7b2JqZWN0fSAgc2VsZWN0aW9uXG4gKiBAcmV0dXJuIHtCb29sZWFufVxuICovXG52YXIgaXNJbnNpZGVDb250ZW50ID0gZnVuY3Rpb24oc2VsZWN0aW9uKSB7XG5cdHZhciAkY29udGFpbmVyID0gc2VsZWN0aW9uLmFuY2hvck5vZGUucGFyZW50RWxlbWVudDtcblxuXHR3aGlsZSAoJGNvbnRhaW5lciAhPT0gJHBvc3RDb250ZW50ICYmICRjb250YWluZXIucGFyZW50Tm9kZSkge1xuXHRcdCRjb250YWluZXIgPSAkY29udGFpbmVyLnBhcmVudE5vZGU7XG5cdH1cblxuXHRyZXR1cm4gKCRjb250YWluZXIgPT09ICRwb3N0Q29udGVudCk7XG5cbn07XG5cbi8qKlxuICogUGxhY2VzIHRoZSB0b29sIHRpcCBhYm92ZSB0aGUgc2VsZWN0ZWQgdGV4dFxuICogQHJldHVybiB7dm9pZH1cbiAqL1xudmFyIHBsYWNlVG9vbFRpcCA9IGZ1bmN0aW9uKCkge1xuXG5cdC8vIFRpbWVvdXQgdG8gbWFrZSBzdXJlIHRoZSB0ZXh0IGhhcyBiZWVuIHNlbGVjdGVkXG5cdHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XG5cblx0XHR2YXIgaGlnaGxpZ2h0ZWRUZXh0ID0gZ2V0U2VsZWN0ZWRUZXh0KCk7XG5cblx0XHQvLyBIaWRlIHRvb2wgdGlwIGlmIG5vdGhpbmcgaXMgc2VsZWN0ZWRcblx0XHRpZiAoIWhpZ2hsaWdodGVkVGV4dCkge1xuXHRcdFx0JHRvb2xUaXAuY2xhc3NMaXN0LnJlbW92ZSgndG9vbC10aXAtLXZpc2libGUnKTtcblx0XHRcdHJldHVybjtcblx0XHR9XG5cblx0XHQvLyBEaXNwbGF5IHRvb2wgdGlwIGlmIHNlbGVjdGlvbiBpcyBpbnNpZGUgdGhlIGNvbnRlbnQgY29udGFpbmVyXG5cdFx0dmFyIHNlbGVjdGlvbiA9IHdpbmRvdy5nZXRTZWxlY3Rpb24oKTtcblx0XHRpZiAoIWlzSW5zaWRlQ29udGVudChzZWxlY3Rpb24pKSB7XG5cdFx0XHQkdG9vbFRpcC5jbGFzc0xpc3QucmVtb3ZlKCd0b29sLXRpcC0tdmlzaWJsZScpO1xuXHRcdFx0cmV0dXJuO1xuXHRcdH1cblxuXHRcdC8vIENoYW5nZSBjb250ZXh0dWFsIGFjdGlvbnNcblx0XHQkdHdpdHRlci5zZXRBdHRyaWJ1dGUoJ2hyZWYnLCBgaHR0cHM6Ly90d2l0dGVyLmNvbS9pbnRlbnQvdHdlZXQ/dGV4dD0ke2VuY29kZVVSSUNvbXBvbmVudChoaWdobGlnaHRlZFRleHQpfSZ1cmw9JHtlbmNvZGVVUklDb21wb25lbnQoJHR3aXR0ZXIuZGF0YXNldC51cmwpfWApO1xuXG5cdFx0Ly8gU2hvdyBhbmQgcGxhY2UgdG9vbCB0aXBcblx0XHR2YXIgc2Nyb2xsUG9zaXRpb24gPSAod2luZG93LnNjcm9sbFkgfHwgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LnNjcm9sbFRvcCk7XG5cdFx0dmFyIHJhbmdlID0gc2VsZWN0aW9uLmdldFJhbmdlQXQoMCk7XG5cdFx0dmFyIHJlY3QgPSByYW5nZS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcblx0XHQkdG9vbFRpcC5zdHlsZS50b3AgPSAocmVjdC50b3AgKyBzY3JvbGxQb3NpdGlvbikgKyAncHgnO1xuXHRcdCR0b29sVGlwLmNsYXNzTGlzdC5hZGQoJ3Rvb2wtdGlwLS12aXNpYmxlJyk7XG5cdFx0JHRvb2xUaXAuc3R5bGUubGVmdCA9ICgwLjUgKiByZWN0LmxlZnQgKyAwLjUgKiByZWN0LnJpZ2h0IC0gMC41ICogJHRvb2xUaXAuY2xpZW50V2lkdGgpICsgJ3B4Jztcblx0fSwgMTApO1xufTtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24oKSB7XG5cdCRwb3N0Q29udGVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5jb250ZW50Jyk7XG5cdCR0b29sVGlwID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnRvb2wtdGlwJyk7XG5cblx0aWYgKCEkcG9zdENvbnRlbnQgfHwgISR0b29sVGlwKSB7XG5cdFx0cmV0dXJuO1xuXHR9XG5cblx0JHJlc3BvbnNlRm9ybSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5yZXNwb25zZXNfX2Zvcm0nKTtcblx0JGN0YSA9ICRyZXNwb25zZUZvcm0ucXVlcnlTZWxlY3RvcignLmJ0bi0tY3RhJyk7XG5cblx0JHR3aXR0ZXIgPSAkdG9vbFRpcC5xdWVyeVNlbGVjdG9yKCcudG9vbC10aXBfX3R3aXR0ZXInKTtcblxuXHRkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdtb3VzZXVwJywgcGxhY2VUb29sVGlwKTtcblx0ZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcigna2V5dXAnLCBwbGFjZVRvb2xUaXApO1xuXG5cdC8vIEZpbGwgZm9ybSB3aXRoIHNlbGVjdGVkIHRleHQgdG8gbWFrZSBhIHF1aWNrIHJlc3BvbnNlIG9uIHRoZSBhcnRpY2xlIGJ5XG5cdC8vIHRoZSB1c2VyXG5cdHZhciAkcmVzcG9uc2VUZXh0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnJlc3BvbnNlc19fZm9ybSB0ZXh0YXJlYScpO1xuXHQkdG9vbFRpcC5xdWVyeVNlbGVjdG9yKCcudG9vbC10aXBfX3Jlc3BvbnNlJykuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbihlKSB7XG5cdFx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xuXHRcdHZhciBoaWdobGlnaHRlZFRleHQgPSBnZXRTZWxlY3RlZFRleHQoKTtcblx0XHQkcmVzcG9uc2VUZXh0LnZhbHVlID0gYD4gJHtoaWdobGlnaHRlZFRleHR9XG5cbmA7XG5cdFx0JHJlc3BvbnNlVGV4dC5mb2N1cygpO1xuXHRcdCRyZXNwb25zZVRleHQucGFyZW50Tm9kZS5jbGFzc0xpc3QuYWRkKCd2YWxpZGF0ZS0tdmFsaWQnKTtcblx0XHQkcmVzcG9uc2VUZXh0LnBhcmVudE5vZGUuY2xhc3NMaXN0LnJlbW92ZSgndmFsaWRhdGUtLW5vdC12YWxpZCcpO1xuXHRcdCRyZXNwb25zZVRleHQucGFyZW50Tm9kZS5xdWVyeVNlbGVjdG9yKCcucGxhY2Vob2xkZXInKS5jbGFzc0xpc3QuYWRkKCdwbGFjZWhvbGRlci0tbm90LWVtcHR5Jyk7XG5cdFx0dmFyIHZhbGlkID0gdmFsaWRhdGVGb3JtKGdldEFsbCgnLnZhbGlkYXRlJywgJHJlc3BvbnNlRm9ybSkpO1xuXHRcdGlmICh2YWxpZCkge1xuXHRcdFx0JGN0YS5jbGFzc0xpc3QucmVtb3ZlKCdidG4tLWRpc2FibGVkJyk7XG5cdFx0fSBlbHNlIHtcblx0XHRcdCRjdGEuY2xhc3NMaXN0LmFkZCgnYnRuLS1kaXNhYmxlZCcpO1xuXHRcdH1cblx0fSk7XG59XG4iLCIvKipcbiAqIEhlbHBlcnMgZm9yIGNvbW11bmljYXRpbmcgd2l0aCB0aGUgbWV0YSBhcGkgaG9sZGluZyByZXNwb25zZXMgYW5kIGxpa2VzIGZvclxuICogdGhlIGFydGljbGVzLlxuICovXG5cbnZhciBhcGlVcmwgPSB3aW5kb3cuYXBpVVJMO1xudmFyIGlkID0gd2luZG93LnBvc3RJZDtcblxuLyoqXG4gKiBNYWtlIGEgQUpBWCBjYWxsIHRvIHRoZSBhcGlcbiAqIEBwYXJhbSAge1N0cmluZ30gcGF0aFxuICogQHBhcmFtICB7U3RyaW5nfSBtZXRob2RcbiAqIEBwYXJhbSAge29iamVjdH0gZGF0YVxuICogQHJldHVybiB7UHJvbWlzZX1cbiAqL1xudmFyIHJlcXVlc3QgPSBmdW5jdGlvbihwYXRoID0gJycsIG1ldGhvZCA9ICdHRVQnLCBkYXRhID0gbnVsbCkge1xuXG4gIHZhciBmZXRjaE9wdGlvbnMgPSB7XG4gICAgbWV0aG9kLFxuICAgIGhlYWRlcnM6IHtcbiAgICAgICdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24vanNvbjsgY2hhcnNldD11dGYtOCdcbiAgICB9XG4gIH07XG5cbiAgaWYgKGRhdGEpIHtcbiAgICBmZXRjaE9wdGlvbnMuYm9keSA9IEpTT04uc3RyaW5naWZ5KGRhdGEpO1xuICB9XG5cbiAgLy8gUGVyZm9ybSB0aGUgYWpheCBjYWxsXG4gIHJldHVybiBmZXRjaChhcGlVcmwgKyBwYXRoLCBmZXRjaE9wdGlvbnMpXG4gICAgLnRoZW4oZnVuY3Rpb24ocmVzcG9uc2UpIHtcbiAgICAgIGlmIChyZXNwb25zZS5zdGF0dXMgPj0gMzAwKSB7XG4gICAgICAgIHJldHVybiBQcm9taXNlLnJlamVjdChyZXNwb25zZSk7XG4gICAgICB9XG4gICAgICByZXR1cm4gcmVzcG9uc2U7XG4gICAgfSlcbiAgICAudGhlbihyZXNwb25zZSA9PiByZXNwb25zZS5qc29uKCkpO1xufTtcblxuLyoqXG4gKiBHZXQgbWV0YSBkYXRhIGZyb20gdGhlIGFydGljbGUuIElmIG5vIG1ldGEgZGF0YSBpcyBwcmVzZW50IGZvciB0aGUgYWN0dWFsXG4gKiBhcnRpY2xlIGFuZCBuZXcgZW50cnkgd2lsbCBiZSBtYWRlLlxuICogQHBhcmFtICB7Ym9vbGVhbn0gcmF3IFdoZXRoZXIgdG8gaW5jbHVkZSBjb21wdXRlZCBmaWVsZHNcbiAqIEByZXR1cm4ge1Byb21pc2V9XG4gKi9cbmV4cG9ydCB2YXIgZ2V0TWV0YSA9IGZ1bmN0aW9uKHJhdykge1xuICB2YXIgcXVlcnkgPSAnP2lkPScgKyBpZDtcbiAgaWYgKHJhdykge1xuICAgIHF1ZXJ5ICs9ICcmcmF3JztcbiAgfVxuICByZXR1cm4gcmVxdWVzdChxdWVyeSlcbiAgICAuY2F0Y2goZnVuY3Rpb24oKSB7XG4gICAgICByZXR1cm4gcmVxdWVzdCgnJywgJ1BPU1QnLCB7XG4gICAgICAgIHJlc3BvbnNlczogW10sXG4gICAgICAgIGxpa2VzOiAwLFxuICAgICAgICBpZFxuICAgICAgfSk7XG4gICAgfSk7XG59O1xuXG5leHBvcnQgdmFyIGdldFNlYXJjaEluZGV4ID0gZnVuY3Rpb24ocXVlcnkpIHtcbiAgcmV0dXJuIHJlcXVlc3QoJ3NlYXJjaD9xPScgKyBxdWVyeSk7XG59O1xuXG4vKipcbiAqIEluY3JlbWVudCB0aGUgbGlrZSB2YWx1ZSB3aXRoIG9uZVxuICogQHJldHVybiB7UHJvbWlzZX1cbiAqL1xuZXhwb3J0IHZhciBsaWtlID0gZnVuY3Rpb24oKSB7XG4gIHJldHVybiBnZXRNZXRhKGlkLCB0cnVlKVxuICAgIC50aGVuKGZ1bmN0aW9uKGRhdGEpIHtcbiAgICAgIHJldHVybiByZXF1ZXN0KCc/aWQ9JyArIGlkLCAnUFVUJywge1xuICAgICAgICBsaWtlczogZGF0YS5saWtlcyArIDFcbiAgICAgIH0pO1xuICAgIH0pO1xufTtcblxuLyoqXG4gKiBVcGRhdGUgYXV0aG9yIGVtYWlsIHVzZWQgdG8gc2VuZCBlLW1haWxzIHdoZW4gYSByZXNwb25zZSBpIHJlY2VpdmVkLlxuICogQHJldHVybiB7UHJvbWlzZX1cbiAqL1xuZXhwb3J0IHZhciB1cGRhdGVBdXRob3JFbWFpbCA9IGZ1bmN0aW9uKGF1dGhvckVtYWlsKSB7XG4gIGlmICghaWQpIHtcbiAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QobmV3IEVycm9yKCdObyBwb3N0SWQnKSk7XG4gIH1cbiAgcmV0dXJuIHJlcXVlc3QoJz9pZD0nICsgaWQsICdQVVQnLCB7XG4gICAgYXV0aG9yRW1haWxcbiAgfSk7XG59O1xuXG4vKipcbiAqIEFkZCBhIHJlc3BvbnNlXG4gKiBAcGFyYW0ge29iamVjdH0gcmVzcG9uc2VcbiAqIEByZXR1cm4ge1Byb21pc2V9XG4gKi9cbmV4cG9ydCB2YXIgYWRkUmVzcG9uc2UgPSBmdW5jdGlvbihyZXNwb25zZSkge1xuICByZXR1cm4gZ2V0TWV0YSh0cnVlKVxuICAgIC50aGVuKGZ1bmN0aW9uKGRhdGEpIHtcblxuICAgICAgLy8gU2V0IHRoZSBwdWJsaXNoIGRhdGEgdG8gbm93XG4gICAgICByZXNwb25zZS5wdWJsaXNoZWQgPSBuZXcgRGF0ZSgpLnRvSVNPU3RyaW5nKCk7XG5cbiAgICAgIC8vIFVwZGF0ZSB0aGUgcmVzcG9uc2VzIGxpc3RcbiAgICAgIGRhdGEucmVzcG9uc2VzLnB1c2gocmVzcG9uc2UpO1xuICAgICAgcmV0dXJuIHJlcXVlc3QoJz9pZD0nICsgaWQsICdQVVQnLCB7XG4gICAgICAgIHJlc3BvbnNlczogZGF0YS5yZXNwb25zZXNcbiAgICAgIH0pO1xuICAgIH0pO1xufTtcblxuLyoqXG4gKiBSZW1vdmUgYSByZXNwb25zZVxuICogQHBhcmFtICB7c3RyaW5nfSBwdWJsaXNoZWRcbiAqIEBwYXJhbSAge3N0cmluZ30gbmFtZVxuICogQHJldHVybiB7UHJvbWlzZX1cbiAqL1xuZXhwb3J0IHZhciByZW1vdmVSZXNwb25zZSA9IGZ1bmN0aW9uKHB1Ymxpc2hlZCwgbmFtZSkge1xuICByZXR1cm4gZ2V0TWV0YSh0cnVlKVxuICAgIC50aGVuKGZ1bmN0aW9uKGRhdGEpIHtcblxuICAgICAgLy8gUmVtb3ZlIHJlc3Bvc2Ugd2hpY2ggbWF0Y2hlcyBvbiBwdWJsaXNoIGRhdGUgYW5kIGF1dGhvciBuYW1lXG4gICAgICB2YXIgcmVzcG9uc2VzID0gZGF0YS5yZXNwb25zZXMuZmlsdGVyKGZ1bmN0aW9uKHJlc3BvbnNlKSB7XG4gICAgICAgIHJldHVybiAocmVzcG9uc2UucHVibGlzaGVkICE9PSBwdWJsaXNoZWQgfHwgcmVzcG9uc2UubmFtZSAhPT0gbmFtZSk7XG4gICAgICB9KTtcblxuICAgICAgcmV0dXJuIHJlcXVlc3QoJz9pZD0nICsgaWQsICdQVVQnLCB7XG4gICAgICAgIHJlc3BvbnNlc1xuICAgICAgfSk7XG4gICAgfSk7XG59O1xuIiwiLyoqXG4gKiBWYWxpZGF0ZSBpbnB1dCBmaWVsZHMgYXMgdXNlciB0eXBlc1xuICovXG5cbi8vIERlcGVuZGVuY2llc1xuaW1wb3J0IHZhbGlkYXRlRm9ybSBmcm9tICcuL3ZhbGlkYXRlJztcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24oJHZhbGlkYXRvcnMsIGNhbGxiYWNrKSB7XG5cdCR2YWxpZGF0b3JzLmZvckVhY2goZnVuY3Rpb24oJHZhbGlkYXRlQ29udGFpbmVyKSB7XG5cdFx0dmFyICR2YWxpZGF0ZUZpZWxkID0gJHZhbGlkYXRlQ29udGFpbmVyLnF1ZXJ5U2VsZWN0b3IoJ2lucHV0LCB0ZXh0YXJlYScpO1xuXG5cdFx0JHZhbGlkYXRlRmllbGQuYWRkRXZlbnRMaXN0ZW5lcignaW5wdXQnLCBmdW5jdGlvbigpIHtcblx0XHRcdHZhciB2YWxpZCA9IHZhbGlkYXRlRm9ybSgkdmFsaWRhdG9ycyk7XG5cdFx0XHRjYWxsYmFjayh2YWxpZCk7XG5cdFx0fSk7XG5cdH0pO1xufVxuIiwiLyoqXG4gKiBDaGVjayBpZiB0aGUgZm9ybSBpcyB2YWxpZFxuICovXG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uKCR2YWxpZGF0b3JzKSB7XG5cdHZhciBub3RWYWxpZCA9ICR2YWxpZGF0b3JzLnNvbWUoZnVuY3Rpb24oJHZhbGlkYXRvcikge1xuXHRcdGlmICgkdmFsaWRhdG9yLmRhdGFzZXQudmFsaWRhdGVSZXF1aXJlZCAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0XHRyZXR1cm4gISR2YWxpZGF0b3IuY2xhc3NMaXN0LmNvbnRhaW5zKCd2YWxpZGF0ZS0tdmFsaWQnKTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0cmV0dXJuICR2YWxpZGF0b3IuY2xhc3NMaXN0LmNvbnRhaW5zKCd2YWxpZGF0ZS0tbm90LXZhbGlkJyk7XG5cdFx0fVxuXHR9KTtcblxuXHRyZXR1cm4gIW5vdFZhbGlkO1xufVxuIiwiLyoqXG4gKiBDaGVjayBpZiB1c2VyIGlzIGxvZ2dlZCBpbiB1c2luZyB0aGUgZ2hvc3Qgc2Vzc2lvbi4gSWYgbG9nZ2VkIGluIGdldCB1c2VyXG4gKiBkYXRhLlxuICovXG5cbi8vIENhY2hlZCBwcm9taXNlXG52YXIgZGF0YVByb21pc2U7XG5cbi8qKlxuICogR2V0IHRoZSBkYXRhIGZvciB0aGUgbG9nZ2VkIGluIHVzZWRcbiAqIEBwYXJhbSAge3N0cmluZ30gdG9rZW5cbiAqIEByZXR1cm4ge1Byb21pc2V9XG4gKi9cbnZhciBnZXRVc2VyRGF0YSA9IGZ1bmN0aW9uKHRva2VuKSB7XG5cdHJldHVybiBmZXRjaCgnL2dob3N0L2FwaS92MC4xL3VzZXJzL21lLz9pbmNsdWRlPXJvbGVzJnN0YXR1cz1hbGwnLCB7XG5cdFx0bWV0aG9kOiAnR0VUJyxcblx0XHRoZWFkZXJzOiB7XG5cdFx0XHQnQXV0aG9yaXphdGlvbic6ICdCZWFyZXIgJyArIHRva2VuXG5cdFx0fVxuXHR9KS50aGVuKGZ1bmN0aW9uKHJlc3BvbnNlKSB7XG5cdFx0aWYgKHJlc3BvbnNlLnN0YXR1cyAhPT0gMjAwKSB7XG5cdFx0XHRyZXR1cm4gUHJvbWlzZS5yZWplY3QoJ09sZCBzZXNzaW9uJyk7XG5cdFx0fVxuXHRcdHJldHVybiByZXNwb25zZS5qc29uKCk7XG5cdH0pLnRoZW4oZnVuY3Rpb24oZGF0YSkge1xuXHRcdHJldHVybiBkYXRhLnVzZXJzWzBdO1xuXHR9KTtcbn07XG5cbi8qKlxuICogQ2hlY2sgaWYgdGhlcmUgaXMgYSBHaG9zdCBzZXNzaW9uLiBJZiBzbyB1c2UgaXQgdG8gZ2V0IHRoZSB1c2VycyBkYXRhLlxuICogQHJldHVybiB7UHJvbWlzZX1cbiAqL1xudmFyIGdldCA9IGZ1bmN0aW9uKCkge1xuXG5cdC8vIEdob3N0IHN0b3JlcyBpdCBzZXNzaW9uIGluIGxvY2FsU3RvcmFnZVxuXHR2YXIgc2Vzc2lvblN0cmluZyA9IGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdnaG9zdDpzZXNzaW9uJyk7XG5cdGlmICghc2Vzc2lvblN0cmluZykge1xuXHRcdHJldHVybiBQcm9taXNlLnJlamVjdCgnTm8gc2Vzc2lvbicpO1xuXHR9XG5cblx0Ly8gVmFsaWQgc2Vzc2lvbj9cblx0dmFyIHNlc3Npb24gPSBKU09OLnBhcnNlKHNlc3Npb25TdHJpbmcpO1xuXHRpZiAoIXNlc3Npb24gfHwgIXNlc3Npb24uYXV0aGVudGljYXRlZCB8fCAhc2Vzc2lvbi5hdXRoZW50aWNhdGVkLmFjY2Vzc190b2tlbikge1xuXHRcdHJldHVybiBQcm9taXNlLnJlamVjdCgnTm8gc2Vzc2lvbicpO1xuXHR9XG5cblx0Ly8gU2Vzc2lvbiBleHBpcmVkP1xuXHRpZiAoc2Vzc2lvbi5hdXRoZW50aWNhdGVkLmV4cGlyZXNfYXQgPCBEYXRlLm5vdygpKSB7XG5cdFx0cmV0dXJuIFByb21pc2UucmVqZWN0KCdTZXNzaW9uIGV4cGlyZWQnKTtcblx0fVxuXG5cdHJldHVybiBnZXRVc2VyRGF0YShzZXNzaW9uLmF1dGhlbnRpY2F0ZWQuYWNjZXNzX3Rva2VuKTtcblxufTtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24oKSB7XG5cblx0Ly8gUmV0dXJuIGNhY2hlZCBwcm9taXNlIGlmIGFscmVhZHkgY2FsbGVkXG5cdGlmICghZGF0YVByb21pc2UpIHtcblx0XHRkYXRhUHJvbWlzZSA9IGdldCgpO1xuXHR9XG5cdHJldHVybiBkYXRhUHJvbWlzZTtcbn1cbiIsIi8qKlxuICogRW5jb2RlIGEgc3RyaW5nXG4gKiBAcGFyYW0gIHtzdHJpbmd9IHN0cmluZ1xuICogQHJldHVybiB7c3RyaW5nfVxuICovXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbihzdHJpbmcpIHtcblx0dmFyIGh0bWxFbmNvZGVkVmFsdWUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKS5hcHBlbmRDaGlsZChcblx0XHRkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShzdHJpbmcpKS5wYXJlbnROb2RlLmlubmVySFRNTDtcblx0cmV0dXJuIGh0bWxFbmNvZGVkVmFsdWUucmVwbGFjZSgvXFxyP1xcbi9nLCAnPGJyPicpO1xufVxuIiwiaW1wb3J0IGdldEFsbCBmcm9tICdkcy1hc3NldHMvZG9tL2dldC1hbGwnO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKHJhdykge1xuXHR2YXIgJGNvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuXHQkY29udGFpbmVyLmlubmVySFRNTCA9IHJhdztcblx0Z2V0QWxsKCdpbWcnLCAkY29udGFpbmVyKS5mb3JFYWNoKGZ1bmN0aW9uKCRpbWcpIHtcblx0XHR2YXIgJGltZ1dyYXBwZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcblx0XHQkaW1nV3JhcHBlci5jbGFzc0xpc3QuYWRkKCdpbWctd3JhcHBlcicpO1xuXHRcdCRpbWdXcmFwcGVyLmlubmVySFRNTCA9ICc8ZGl2IGNsYXNzPVwiaW1nLWNvbnRhaW5lclwiPjxpbWc+PC9kaXY+Jztcblx0XHR2YXIgc3JjID0gJGltZy5nZXRBdHRyaWJ1dGUoJ3NyYycpO1xuXHRcdHZhciBhbHQgPSAkaW1nLmdldEF0dHJpYnV0ZSgnYWx0Jyk7XG5cdFx0dmFyIHBhZGRpbmcgPSA1MDtcblxuXHRcdC8vIExhenkgbG9hZFxuXHRcdHZhciAkbmV3SW1nID0gJGltZ1dyYXBwZXIucXVlcnlTZWxlY3RvcignaW1nJyk7XG5cblx0XHQkbmV3SW1nLnNldEF0dHJpYnV0ZSgnZGF0YS1zcmMnLCBzcmMpO1xuXHRcdCRuZXdJbWcuc2V0QXR0cmlidXRlKCdjbGFzcycsICdsYXp5LWltYWdlJyk7XG5cblx0XHRhbHQuc3BsaXQoJzsnKS5mb3JFYWNoKGZ1bmN0aW9uKHN0cikge1xuXHRcdFx0aWYgKHN0ciA9PT0gJ2Z1bGwtc2l6ZScgfHwgc3RyID09PSAnZnVsbC13aWR0aCcpIHtcblx0XHRcdFx0JGltZ1dyYXBwZXIuY2xhc3NMaXN0LmFkZCgnZnVsbC13aWR0aCcpO1xuXHRcdFx0fSBlbHNlIGlmIChzdHIuaW5kZXhPZigncmF0aW89JykgPT09IDApIHtcblx0XHRcdFx0dmFyIHJhdGlvID0gc3RyLnJlcGxhY2UoJ3JhdGlvPScsICcnKTtcblx0XHRcdFx0aWYgKHJhdGlvLmluZGV4T2YoJzonKSkge1xuXHRcdFx0XHRcdHZhciBkaW1lbnNpb25zID0gcmF0aW8uc3BsaXQoJzonKTtcblx0XHRcdFx0XHRyYXRpbyA9IGRpbWVuc2lvbnNbMF0gLyBkaW1lbnNpb25zWzFdO1xuXHRcdFx0XHR9XG5cdFx0XHRcdHBhZGRpbmcgPSAxMDAgLyByYXRpbztcblx0XHRcdH0gZWxzZSBpZiAoc3RyID09PSAnYm9yZGVycycpIHtcblx0XHRcdFx0JGltZ1dyYXBwZXIucXVlcnlTZWxlY3RvcignLmltZy1jb250YWluZXInKS5jbGFzc0xpc3QuYWRkKCdpbWctY29udGFpbmVyLS1ib3JkZXJzJyk7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRhbHQgPSBzdHI7XG5cdFx0XHR9XG5cdFx0fSk7XG5cblx0XHQkbmV3SW1nLnNldEF0dHJpYnV0ZSgnYWx0JywgYWx0KTtcblx0XHQkbmV3SW1nLnNldEF0dHJpYnV0ZSgndGl0bGUnLCAkaW1nLmdldEF0dHJpYnV0ZSgndGl0bGUnKSk7XG5cblx0XHQkaW1nV3JhcHBlci5xdWVyeVNlbGVjdG9yKCcuaW1nLWNvbnRhaW5lcicpXG5cdFx0XHQuc2V0QXR0cmlidXRlKCdzdHlsZScsICdwYWRkaW5nLWJvdHRvbTonICsgcGFkZGluZyArICclJyk7XG5cblx0XHQkaW1nLnBhcmVudE5vZGUub3V0ZXJIVE1MID0gJGltZ1dyYXBwZXIub3V0ZXJIVE1MO1xuXHR9KTtcblx0cmV0dXJuICRjb250YWluZXIuaW5uZXJIVE1MO1xufTtcbiIsImltcG9ydCBzdHJpcFRhZ3MgZnJvbSAnLi9zdHJpcC1odG1sLXRhZ3MnO1xuaW1wb3J0IHdvcmRDb3VudCBmcm9tICd3b3JkLWNvdW50JztcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24oaHRtbCkge1xuXHR2YXIgdGV4dCA9IHN0cmlwVGFncyhodG1sKTtcblx0dmFyIHdvcmRzID0gd29yZENvdW50KHRleHQpO1xuXHR2YXIgcmVhZFRpbWUgPSBNYXRoLmNlaWwod29yZHMgLyAzMDApO1xuXG5cdHZhciBhZmZpeCA9ICcgbWluJztcblx0aWYgKHJlYWRUaW1lID4gMSkge1xuXHRcdGFmZml4ICs9ICdzJztcblx0fVxuXG5cdHJldHVybiByZWFkVGltZSArIGFmZml4O1xufVxuIiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24oaHRtbCkge1xuXHR2YXIgdG1wID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG5cdHRtcC5pbm5lckhUTUwgPSBodG1sO1xuXHRyZXR1cm4gdG1wLnRleHRDb250ZW50IHx8IHRtcC5pbm5lclRleHQgfHwgJyc7XG59XG4iLCIvKipcbiAqIE1haW4gZW50cnkgZm9yIHRoZSBqYXZhc2NyaXB0LlxuICogSW1wb3J0IG1vZHVsZXMgYW5kIHN0YXJ0IHRoZW1cbiAqL1xuXG5pbXBvcnQgbGF6eUltYWdlcyBmcm9tICdkcy1hc3NldHMvbGF6eS9pbWFnZXMnO1xuaW1wb3J0IGdldEFsbCBmcm9tICdkcy1hc3NldHMvZG9tL2dldC1hbGwnO1xuaW1wb3J0IHZhbGlkYXRlSW5wdXRGaWVsZHMgZnJvbSAnZHMtYXNzZXRzL3ZhbGlkYXRlL2lucHV0LWZpZWxkcyc7XG5pbXBvcnQgbmF2aWdhdGlvbiBmcm9tICcuL2NvbXBvbmVudHMvbmF2aWdhdGlvbic7XG5pbXBvcnQgcmVzcG9uc2UgZnJvbSAnLi9jb21wb25lbnRzL3Jlc3BvbnNlJztcbmltcG9ydCB0b29sVGlwIGZyb20gJy4vY29tcG9uZW50cy90b29sLXRpcCc7XG5pbXBvcnQgc2VhcmNoIGZyb20gJy4vY29tcG9uZW50cy9zZWFyY2gnO1xuaW1wb3J0IGdldExvZ2dlZEluRGF0YSBmcm9tICcuL2xpYi9nZXQtbG9nZ2VkLWluLWRhdGEnO1xuaW1wb3J0ICogYXMgYXBpIGZyb20gJy4vbGliL2FwaSc7XG5cbm5hdmlnYXRpb24oKTtcbnRvb2xUaXAoKTtcbnNlYXJjaCgpO1xuXG5nZXRBbGwoJ2ltZycpLmZvckVhY2goZnVuY3Rpb24oJGltZykge1xuXHQkaW1nLm9ubG9hZCA9IGZ1bmN0aW9uKCkge1xuXHRcdHRoaXMuY2xhc3NMaXN0LmFkZCgnYW5pbWF0ZS0tYWN0aXZlJyk7XG5cdH07XG59KTtcbmxhenlJbWFnZXMoMSk7XG52YWxpZGF0ZUlucHV0RmllbGRzKCk7XG5yZXNwb25zZSgpO1xuZ2V0TG9nZ2VkSW5EYXRhKCkudGhlbihmdW5jdGlvbih1c2VyKSB7XG5cdHZhciAkYm9keSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2JvZHknKTtcblxuXHQkYm9keS5jbGFzc0xpc3QuYWRkKCd1c2VyLWxvZ2dlZC1pbicpO1xuXG5cdC8vIEFkbWluIGxvZ2dlZCBpblxuXHR2YXIgYWRtaW4gPSB1c2VyLnJvbGVzLnNvbWUoZnVuY3Rpb24ocm9sZSkge1xuXHRcdHJldHVybiAocm9sZS5uYW1lID09PSAnT3duZXInIHx8IHJvbGUubmFtZSA9PT0gJ0FkbWluaXN0cmF0b3InKTtcblx0fSk7XG5cdGlmIChhZG1pbikge1xuXHRcdCRib2R5LmNsYXNzTGlzdC5hZGQoJ2FkbWluLWxvZ2dlZC1pbicpO1xuXHR9XG5cblx0Ly8gQXV0aG9yIGxvZ2dlZCBpblxuXHRpZiAodXNlci5uYW1lID09PSB3aW5kb3cuYXV0aG9yTmFtZSkge1xuXHRcdCRib2R5LmNsYXNzTGlzdC5hZGQoJ2F1dGhvci1sb2dnZWQtaW4nKTtcblx0XHRyZXR1cm4gYXBpLnVwZGF0ZUF1dGhvckVtYWlsKHVzZXIuZW1haWwpO1xuXHR9XG59KS5jYXRjaChmdW5jdGlvbigpIHt9KTtcbiIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uKGF1dGhvcikge1xuXG4gIHZhciBhdXRob3JJbWFnZSA9ICcnO1xuICBpZiAoYXV0aG9yLmltYWdlKSB7XG4gICAgYXV0aG9ySW1hZ2UgPSBgPHRkIHdpZHRoPVwiNSVcIj48aW1nIHNyYz1cIiR7YXV0aG9yLmltYWdlfVwiIGNsYXNzPVwiYXV0aG9yX19pbWFnZSByb3VuZC1pbWdcIj48L3RkPmA7XG4gIH1cblxuICB2YXIgY292ZXJJbWFnZSA9ICcnO1xuICBpZiAoYXV0aG9yLmNvdmVyKSB7XG4gICAgY292ZXJJbWFnZSA9IGBcbiAgICAgIDxkaXYgY2xhc3M9XCJpbWctd3JhcHBlciBmdWxsLXdpZHRoXCI+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJpbWctY29udGFpbmVyXCIgc3R5bGU9XCJwYWRkaW5nLWJvdHRvbTo1MCVcIj5cbiAgICAgICAgICA8aW1nIGRhdGEtc3JjPVwiJHthdXRob3IuY292ZXJ9XCIgYWx0PVwiJHthdXRob3IubmFtZX1cIiBjbGFzcz1cImxhenktaW1hZ2VcIj5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj5gO1xuICB9XG5cbiAgcmV0dXJuIGBcbiAgICA8YXJ0aWNsZSBjbGFzcz1cImJveGVzX19pdGVtIHNtYWxsIGFuaW1hdGUgYW5pbWF0ZV9fZmFkZS1pblwiPlxuICAgICAgPGhlYWRlciBjbGFzcz1cImF1dGhvclwiPlxuICAgICAgICAgIDx0YWJsZT5cbiAgICAgICAgICAgICAgPHRyPlxuICAgICAgICAgICAgICAgICAgJHthdXRob3JJbWFnZX1cbiAgICAgICAgICAgICAgICAgIDx0ZD48c3BhbiBjbGFzcz1cImF1dGhvcl9fbmFtZVwiPjxhIGhyZWY9XCIvYXV0aG9yLyR7YXV0aG9yLnNsdWd9XCI+JHthdXRob3IubmFtZX08L2E+PC9zcGFuPjxicj5cbiAgICAgICAgICAgICAgICAgIFx0JHthdXRob3IuY291bnQucG9zdHN9IHN0b3JpZXNcbiAgICAgICAgICAgICAgICAgIDwvdGQ+XG4gICAgICAgICAgICAgIDwvdHI+XG4gICAgICAgICAgPC90YWJsZT5cbiAgICAgIDwvaGVhZGVyPlxuICAgICAgPGEgaHJlZj1cIi9hdXRob3IvJHthdXRob3Iuc2x1Z30vXCI+JHtjb3ZlckltYWdlfTwvYT5cbiAgICAgIDxoMT4ke2F1dGhvci5uYW1lfTwvaDE+XG4gICAgICA8cD4ke2F1dGhvci5iaW8gfHwgJyd9PC9wPlxuICAgICAgPHA+PGEgaHJlZj1cIi9hdXRob3IvJHthdXRob3Iuc2x1Z30vXCIgY2xhc3M9XCJkaW1tZWRcIj5TZWUgc3RvcmllcyBieSBhdXRob3IuLi48L2E+PC9wPlxuICAgICA8L2FydGljbGU+YDtcbn1cbiIsImltcG9ydCBpbWFnZUNvbnZlcnRlZCBmcm9tICcuLi9saWIvaW1hZ2UtY29udmVydGVyJztcbmltcG9ydCByZWFkVGltZSBmcm9tICcuLi9saWIvcmVhZC10aW1lJztcbmltcG9ydCBlcG9jaFRvVGltZWFnbyBmcm9tICdlcG9jaC10by10aW1lYWdvJztcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24ocG9zdCkge1xuXG5cdHZhciBhdXRob3JJbWFnZSA9ICcnO1xuXHRpZiAocG9zdC5hdXRob3IuaW1hZ2UpIHtcblx0XHRhdXRob3JJbWFnZSA9IGA8dGQgd2lkdGg9XCI1JVwiPjxpbWcgc3JjPVwiJHtwb3N0LmF1dGhvci5pbWFnZX1cIiBjbGFzcz1cImF1dGhvcl9faW1hZ2Ugcm91bmQtaW1nXCI+PC90ZD5gO1xuXHR9XG5cbiAgdmFyIHBvc3RJbWFnZSA9ICcnO1xuICBpZiAocG9zdC5pbWFnZSkge1xuICAgIHBvc3RJbWFnZSA9IGBcbiAgICAgIDxkaXYgY2xhc3M9XCJpbWctd3JhcHBlciBmdWxsLXdpZHRoXCI+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJpbWctY29udGFpbmVyXCIgc3R5bGU9XCJwYWRkaW5nLWJvdHRvbTo1MCVcIj5cbiAgICAgICAgICA8aW1nIGRhdGEtc3JjPVwiJHtwb3N0LmltYWdlfVwiIGFsdD1cIiR7cG9zdC50aXRsZX1cIiBjbGFzcz1cImxhenktaW1hZ2VcIj5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj5gO1xuICB9XG5cblx0dmFyIHRhZ3MgPSAnJztcblx0aWYgKHBvc3QudGFncykge1xuXHRcdHRhZ3MgPSAnPGJyPjxzcGFuIGNsYXNzPVwidGFnc1wiPicgKyBwb3N0LnRhZ3MubWFwKGZ1bmN0aW9uKHRhZykge1xuXHRcdFx0cmV0dXJuIGA8YSBocmVmPVwiL3RhZy8ke3RhZy5zbHVnfS9cIj4ke3RhZy5uYW1lfTwvYT5gO1xuXHRcdH0pLmpvaW4oJycpICsgJzwvc3Bhbj4nO1xuXHR9XG5cblx0dmFyIHB1Ymxpc2hlZCA9IG5ldyBEYXRlKHBvc3QucHVibGlzaGVkX2F0KS5nZXRUaW1lKCk7XG5cdHZhciBub3cgPSBEYXRlLm5vdygpO1xuXHR2YXIgdGltZUFnbyA9IGVwb2NoVG9UaW1lYWdvLnRpbWVBZ28ocHVibGlzaGVkLCBub3cpO1xuXG5cdHZhciBodG1sID0gaW1hZ2VDb252ZXJ0ZWQocG9zdC5odG1sKTtcblx0dmFyIGV4Y2VycHQgPSBodG1sLnN1YnN0cigwLCBodG1sLmluZGV4T2YoJzwvcD4nKSArIDQpO1xuXG5cdHJldHVybiBgXG4gICAgPGFydGljbGUgY2xhc3M9XCJib3hlc19faXRlbSBzbWFsbCBhbmltYXRlIGFuaW1hdGVfX2ZhZGUtaW5cIj5cbiAgICAgIDxoZWFkZXIgY2xhc3M9XCJhdXRob3JcIj5cbiAgICAgICAgICA8dGFibGU+XG4gICAgICAgICAgICAgIDx0cj5cbiAgICAgICAgICAgICAgICAgICR7YXV0aG9ySW1hZ2V9XG4gICAgICAgICAgICAgICAgICA8dGQ+PHNwYW4gY2xhc3M9XCJhdXRob3JfX25hbWVcIj48YSBocmVmPVwiL2F1dGhvci8ke3Bvc3QuYXV0aG9yLnNsdWd9XCI+JHtwb3N0LmF1dGhvci5uYW1lfTwvYT48L3NwYW4+PGJyPlxuICAgICAgICAgICAgICAgICAgJHt0aW1lQWdvfSAmbWlkZG90OyAke3JlYWRUaW1lKHBvc3QuaHRtbCl9IHJlYWQke3RhZ3N9PC90ZD5cbiAgICAgICAgICAgICAgPC90cj5cbiAgICAgICAgICA8L3RhYmxlPlxuICAgICAgPC9oZWFkZXI+XG4gICAgICAke3Bvc3RJbWFnZX1cbiAgICAgIDxhIGhyZWY9XCIvJHtwb3N0LnNsdWd9L1wiPlxuICAgICAgICA8aDE+JHtwb3N0LnRpdGxlfTwvaDE+XG4gICAgICAgICR7ZXhjZXJwdH1cbiAgICAgIDwvYT5cbiAgICAgIDxwPjxhIGhyZWY9XCIvJHtwb3N0LnNsdWd9L1wiIGNsYXNzPVwiZGltbWVkXCI+UmVhZCBtb3JlLi4uPC9hPjwvcD5cbiAgICA8L2FydGljbGU+YDtcbn1cbiIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uKHVzZXIpIHtcblx0dmFyIGltYWdlID0gJyc7XG5cdGlmICh1c2VyLmltYWdlKSB7XG5cdFx0aW1hZ2UgPSBgXG48dGQgd2lkdGg9XCI1JVwiPjxpbWcgZGF0YS1zcmM9XCIke3VzZXIuaW1hZ2V9XCIgY2xhc3M9XCJhdXRob3JfX2ltYWdlIGF1dGhvcl9faW1hZ2UtLXNtYWxsIGxhenktaW1hZ2UgaW1nLWJnIHJvdW5kLWltZ1wiPjwvdGQ+XG5cdFx0YDtcblx0fVxuXG5cdHJldHVybiBgXG48ZGl2IGNsYXNzPVwiYXV0aG9yIHNtYWxsXCI+XG4gIDx0YWJsZT48dGJvZHk+PHRyPlxuXHRcdCR7aW1hZ2V9XG4gICAgPHRkPlxuICAgICAgPHNwYW4gY2xhc3M9XCJhdXRob3JfX25hbWVcIj4ke3VzZXIubmFtZX08L3NwYW4+XG4gICAgPC90ZD5cbiAgPC90cj48L3Rib2R5PjwvdGFibGU+XG48L2Rpdj5cbmA7XG59XG4iLCJpbXBvcnQgZW5jb2RlIGZyb20gJy4uL2xpYi9odG1sLWVuY29kZSc7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uKHJlc3BvbnNlKSB7XG5cbiAgdmFyIGNsYXNzZXMgPSAncmVzcG9uc2UgYm94ZXNfX2l0ZW0nO1xuICBpZiAocmVzcG9uc2UubmFtZS50b0xvd2VyQ2FzZSgpID09PSB3aW5kb3cuYXV0aG9yTmFtZS50b0xvd2VyQ2FzZSgpKSB7XG4gICAgY2xhc3NlcyArPSAnIGJveGVzX19pdGVtLS10cmFuc3BhcmVudCc7XG4gIH1cblxuICB2YXIgaW1hZ2UgPSAnJztcbiAgaWYgKHJlc3BvbnNlLmltYWdlKSB7XG4gICAgaW1hZ2UgPSBgPHRkIHdpZHRoPVwiNSVcIj48aW1nIGRhdGEtc3JjPVwiJHtyZXNwb25zZS5pbWFnZX1cIiBjbGFzcz1cImF1dGhvcl9faW1hZ2UgYXV0aG9yX19pbWFnZS0tc21hbGwgbGF6eS1pbWFnZSBpbWctYmcgcm91bmQtaW1nXCI+PC90ZD5gO1xuICB9XG5cbiAgdmFyIHJlYWRUaW1lID0gJyc7XG4gIGlmIChyZXNwb25zZS5yZWFkVGltZSkge1xuICAgIHJlYWRUaW1lID0gYCAmbWlkZG90OyAke3Jlc3BvbnNlLnJlYWRUaW1lfSByZWFkYDtcbiAgfVxuXG4gIHZhciBleGNlcnB0ID0gcmVzcG9uc2UuZXhjZXJwdCB8fCByZXNwb25zZS5odG1sO1xuXG4gIHZhciByZWFkTW9yZSA9ICcnO1xuICBpZiAocmVzcG9uc2UuZXhjZXJwdCkge1xuICAgIHJlYWRNb3JlID0gYFxuPGRpdiBjbGFzcz1cInJlc3BvbnNlX190ZXh0IGhpZGRlblwiPiR7cmVzcG9uc2UuaHRtbH08L2Rpdj5cbjxwPjxhIGhyZWY9XCIjXCIgY2xhc3M9XCJyZXNwb25zZV9fcmVhZC1tb3JlIGRpbW1lZFwiPlJlYWQgbW9yZS4uLjwvYT48L3A+XG5gO1xuICB9XG5cbiAgdmFyIG5hbWUgPSBgJHtlbmNvZGUocmVzcG9uc2UubmFtZSl9YDtcbiAgaWYgKHJlc3BvbnNlLndlYnNpdGUpIHtcbiAgICBuYW1lID0gYDxhIGhyZWY9XCIke2VuY29kZShyZXNwb25zZS53ZWJzaXRlKX1cIj4ke25hbWV9PC9hPmA7XG4gIH1cblxuICByZXR1cm4gYFxuPGRpdiBjbGFzcz1cIiR7Y2xhc3Nlc30gc21hbGxcIj5cbiAgPGRpdiBjbGFzcz1cImF1dGhvclwiPlxuICAgIDx0YWJsZT5cbiAgICAgIDx0cj5cbiAgICAgICAgJHtpbWFnZX1cbiAgICAgICAgPHRkPlxuICAgICAgICAgIDxzcGFuIGNsYXNzPVwiYXV0aG9yX19uYW1lXCI+JHtuYW1lfTwvc3Bhbj48YnI+XG4gICAgICAgICAgJHtyZXNwb25zZS50aW1lQWdvfSR7cmVhZFRpbWV9XG4gICAgICAgIDwvdGQ+XG4gICAgICA8L3RyPlxuICAgIDwvdGFibGU+XG4gIDwvZGl2PlxuICA8YSBocmVmPVwiI1wiIGNsYXNzPVwicmVzcG9uc2VfX2RlbGV0ZVwiIGRhdGEtcHVibGlzaGVkPVwiJHtyZXNwb25zZS5wdWJsaXNoZWR9XCIgZGF0YS1uYW1lPVwiJHtyZXNwb25zZS5uYW1lfVwiPjxpbWcgZGF0YS1zcmM9XCIvYXNzZXRzL2ltYWdlcy90cmFzaC5zdmdcIiBjbGFzcz1cImxhenktaW1hZ2VcIj48L2E+XG4gIDxkaXYgY2xhc3M9XCJyZXNwb25zZV9fZXhjZXJwdFwiPiR7ZXhjZXJwdH08L2Rpdj5cbiAgJHtyZWFkTW9yZX1cbjwvZGl2PmA7XG59XG4iLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbih0YWcpIHtcblxuICB2YXIgY292ZXJJbWFnZSA9ICcnO1xuICBpZiAodGFnLmltYWdlKSB7XG4gICAgY292ZXJJbWFnZSA9IGBcbiAgICAgIDxkaXYgY2xhc3M9XCJpbWctd3JhcHBlciBmdWxsLXdpZHRoXCI+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJpbWctY29udGFpbmVyXCIgc3R5bGU9XCJwYWRkaW5nLWJvdHRvbTo1MCVcIj5cbiAgICAgICAgICA8aW1nIGRhdGEtc3JjPVwiJHt0YWcuaW1hZ2V9XCIgYWx0PVwiJHt0YWcubmFtZX1cIiBjbGFzcz1cImxhenktaW1hZ2VcIj5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj5cbmA7XG4gIH1cblxuICByZXR1cm4gYFxuPGFydGljbGUgY2xhc3M9XCJib3hlc19faXRlbSBzbWFsbCBhbmltYXRlIGFuaW1hdGVfX2ZhZGUtaW5cIj5cbiAgPGhlYWRlciBjbGFzcz1cImF1dGhvclwiPlxuICAgICAgPHRhYmxlPlxuICAgICAgICAgIDx0cj5cbiAgICAgICAgICAgICAgPHRkPjxzcGFuIGNsYXNzPVwiYXV0aG9yX19uYW1lXCI+PGEgaHJlZj1cIi90YWcvJHt0YWcuc2x1Z31cIj4ke3RhZy5uYW1lfTwvYT48L3NwYW4+PGJyPlxuICAgICAgICAgICAgICBcdCR7dGFnLmNvdW50LnBvc3RzfSBzdG9yaWVzXG4gICAgICAgICAgICAgIDwvdGQ+XG4gICAgICAgICAgPC90cj5cbiAgICAgIDwvdGFibGU+XG4gIDwvaGVhZGVyPlxuICA8YSBocmVmPVwiL3RhZy8ke3RhZy5zbHVnfS9cIj5cbiAgICAke2NvdmVySW1hZ2V9XG4gIDwvYT5cbiAgPGgxPiR7dGFnLm5hbWV9PC9oMT5cbiAgPHA+JHt0YWcuZGVzY3JpcHRpb24gfHwgJyd9PC9wPlxuICA8cD48YSBocmVmPVwiL3RhZy8ke3RhZy5zbHVnfS9cIiBjbGFzcz1cImRpbW1lZFwiPlNlZSBzdG9yaWVzIGluIGNhdGVnb3J5Li4uPC9hPjwvcD5cbiA8L2FydGljbGU+XG5gO1xufVxuIiwiLyoqXG4gKiBXb3JkIENvdW50XG4gKlxuICogV29yZCBjb3VudCBpbiByZXNwZWN0IG9mIENKSyBjaGFyYWN0ZXJzLlxuICpcbiAqIENvcHlyaWdodCAoYykgMjAxNSAtIDIwMTYgYnkgSHNpYW9taW5nIFlhbmcuXG4gKi9cblxudmFyIHBhdHRlcm4gPSAvW2EtekEtWjAtOV9cXHUwMzkyLVxcdTAzYzlcXHUwMGMwLVxcdTAwZmZcXHUwNjAwLVxcdTA2ZmZdK3xbXFx1NGUwMC1cXHU5ZmZmXFx1MzQwMC1cXHU0ZGJmXFx1ZjkwMC1cXHVmYWZmXFx1MzA0MC1cXHUzMDlmXFx1YWMwMC1cXHVkN2FmXSsvZztcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoZGF0YSkge1xuICB2YXIgbSA9IGRhdGEubWF0Y2gocGF0dGVybik7XG4gIHZhciBjb3VudCA9IDA7XG4gIGlmICghbSkge1xuICAgIHJldHVybiAwO1xuICB9XG4gIGZvciAodmFyIGkgPSAwOyBpIDwgbS5sZW5ndGg7IGkrKykge1xuICAgIGlmIChtW2ldLmNoYXJDb2RlQXQoMCkgPj0gMHg0ZTAwKSB7XG4gICAgICBjb3VudCArPSBtW2ldLmxlbmd0aDtcbiAgICB9IGVsc2Uge1xuICAgICAgY291bnQgKz0gMTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIGNvdW50O1xufTtcbiJdfQ==
