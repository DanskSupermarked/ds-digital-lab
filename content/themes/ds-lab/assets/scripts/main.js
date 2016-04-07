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
  var $root = arguments.length <= 1 || arguments[1] === undefined ? document : arguments[1];

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

},{"../dom/get-all":3,"../scroll/visible":8}],6:[function(require,module,exports){
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

},{"../dom/get-document-offset-top":4}],7:[function(require,module,exports){
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

},{"../async/delay":2}],8:[function(require,module,exports){
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
    coverImage = '\n<img data-src="' + author.cover + '" class="lazy-image full-width img-full-width" alt="' + author.name + '" >\n';
  }

  return '\n<article class="boxes__item small animate animate__fade-in">\n  <header class="author">\n      <table>\n          <tr>\n              ' + authorImage + '\n              <td><span class="author__name"><a href="/author/' + author.slug + '">' + author.name + '</a></span><br>\n              \t' + author.count.posts + ' stories\n              </td>\n          </tr>\n      </table>\n  </header>\n  <a href="/author/' + author.slug + '/">' + coverImage + '</a>\n  <p>' + (author.bio || '') + '</p>\n  <p><a href="/author/' + author.slug + '/" class="dimmed">See stories by author...</a></p>\n </article>\n';
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

	return '\n<article class="boxes__item small animate animate__fade-in">\n  <header class="author">\n      <table>\n          <tr>\n              ' + authorImage + '\n              <td><span class="author__name"><a href="/author/' + post.author.slug + '">' + post.author.name + '</a></span><br>\n              ' + timeAgo + ' &middot; ' + (0, _readTime2.default)(post.html) + ' read' + tags + '</td>\n          </tr>\n      </table>\n  </header>\n  <a href="/' + post.slug + '/">' + excerpt + '</a>\n  <p><a href="/' + post.slug + '/" class="dimmed">Read more...</a></p>\n</article>\n';
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
        coverImage = '\n<img data-src="' + tag.image + '" class="lazy-image full-width img-full-width" alt="' + tag.name + '" >\n';
    }

    return '\n<article class="boxes__item small animate animate__fade-in">\n  <header class="author">\n      <table>\n          <tr>\n              <td><span class="author__name"><a href="/tag/' + tag.slug + '">' + tag.name + '</a></span><br>\n              \t' + tag.count.posts + ' stories\n              </td>\n          </tr>\n      </table>\n  </header>\n  <a href="/tag/' + tag.slug + '/">' + coverImage + '</a>\n  <p>' + (tag.description || '') + '</p>\n  <p><a href="/tag/' + tag.slug + '/" class="dimmed">See stories in category...</a></p>\n </article>\n';
};

},{}],47:[function(require,module,exports){
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

},{}]},{},[41])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJub2RlX21vZHVsZXMvZHMtYXNzZXRzL2FzeW5jL2RlYm91bmNlLmpzIiwibm9kZV9tb2R1bGVzL2RzLWFzc2V0cy9hc3luYy9kZWxheS5qcyIsIm5vZGVfbW9kdWxlcy9kcy1hc3NldHMvZG9tL2dldC1hbGwuanMiLCJub2RlX21vZHVsZXMvZHMtYXNzZXRzL2RvbS9nZXQtZG9jdW1lbnQtb2Zmc2V0LXRvcC5qcyIsIm5vZGVfbW9kdWxlcy9kcy1hc3NldHMvbGF6eS9pbWFnZXMuanMiLCJub2RlX21vZHVsZXMvZHMtYXNzZXRzL3Njcm9sbC9oYXMtc2Nyb2xsZWQtcGFzdC5qcyIsIm5vZGVfbW9kdWxlcy9kcy1hc3NldHMvc2Nyb2xsL3Njcm9sbC1jaGFuZ2UuanMiLCJub2RlX21vZHVsZXMvZHMtYXNzZXRzL3Njcm9sbC92aXNpYmxlLmpzIiwibm9kZV9tb2R1bGVzL2RzLWFzc2V0cy92YWxpZGF0ZS9pbmRleC5qcyIsIm5vZGVfbW9kdWxlcy9kcy1hc3NldHMvdmFsaWRhdGUvaW5wdXQtZmllbGRzLmpzIiwibm9kZV9tb2R1bGVzL2RzLWFzc2V0cy92YWxpZGF0ZS9pcy1kYXRlLmpzIiwibm9kZV9tb2R1bGVzL2RzLWFzc2V0cy92YWxpZGF0ZS9pcy1lbWFpbC5qcyIsIm5vZGVfbW9kdWxlcy9kcy1hc3NldHMvdmFsaWRhdGUvaXMtZmxvYXQuanMiLCJub2RlX21vZHVsZXMvZHMtYXNzZXRzL3ZhbGlkYXRlL2lzLWludC5qcyIsIm5vZGVfbW9kdWxlcy9kcy1hc3NldHMvdmFsaWRhdGUvaXMtcmVxdWlyZWQuanMiLCJub2RlX21vZHVsZXMvZHMtYXNzZXRzL3ZhbGlkYXRlL2lzLXVybC5qcyIsIm5vZGVfbW9kdWxlcy9lcG9jaC10by10aW1lYWdvL2N1dG9mZi9jdXRvZmYuanNvbiIsIm5vZGVfbW9kdWxlcy9lcG9jaC10by10aW1lYWdvL2luZGV4LmpzIiwibm9kZV9tb2R1bGVzL2Vwb2NoLXRvLXRpbWVhZ28vc3VmZml4L3N1ZmZpeC1kaWN0aW9uYXJ5Lmpzb24iLCJub2RlX21vZHVsZXMvZXBvY2gtdG8tdGltZWFnby90aW1lLWFnby90aW1lLWFnby5qcyIsIm5vZGVfbW9kdWxlcy9lcG9jaC10by10aW1lYWdvL3RpbWUtY2FsY3VsYXRpb25zL2luZGV4LmpzIiwibm9kZV9tb2R1bGVzL2Vwb2NoLXRvLXRpbWVhZ28vdGltZS1jYWxjdWxhdGlvbnMvdGltZS1hZ28vZGF5cy1hZ28uanMiLCJub2RlX21vZHVsZXMvZXBvY2gtdG8tdGltZWFnby90aW1lLWNhbGN1bGF0aW9ucy90aW1lLWFnby9ob3Vycy1hZ28uanMiLCJub2RlX21vZHVsZXMvZXBvY2gtdG8tdGltZWFnby90aW1lLWNhbGN1bGF0aW9ucy90aW1lLWFnby9taW51dGVzLWFnby5qcyIsIm5vZGVfbW9kdWxlcy9lcG9jaC10by10aW1lYWdvL3RpbWUtY2FsY3VsYXRpb25zL3RpbWUtYWdvL21vbnRocy1hZ28uanMiLCJub2RlX21vZHVsZXMvZXBvY2gtdG8tdGltZWFnby90aW1lLWNhbGN1bGF0aW9ucy90aW1lLWFnby9zZWNvbmRzLWFnby5qcyIsIm5vZGVfbW9kdWxlcy9lcG9jaC10by10aW1lYWdvL3RpbWUtY2FsY3VsYXRpb25zL3RpbWUtYWdvL3dlZWtzLWFnby5qcyIsIm5vZGVfbW9kdWxlcy9lcG9jaC10by10aW1lYWdvL3RpbWUtY2FsY3VsYXRpb25zL3RpbWUtYWdvL3llYXJzLWFnby5qcyIsInNyYy9zY3JpcHRzL2NvbXBvbmVudHMvbmF2aWdhdGlvbi5qcyIsInNyYy9zY3JpcHRzL2NvbXBvbmVudHMvcmVzcG9uc2UuanMiLCJzcmMvc2NyaXB0cy9jb21wb25lbnRzL3NlYXJjaC5qcyIsInNyYy9zY3JpcHRzL2NvbXBvbmVudHMvdG9vbC10aXAuanMiLCJzcmMvc2NyaXB0cy9saWIvYXBpLmpzIiwic3JjL3NjcmlwdHMvbGliL2Zvcm0vbGl2ZS12YWxpZGF0aW9uLmpzIiwic3JjL3NjcmlwdHMvbGliL2Zvcm0vdmFsaWRhdGUuanMiLCJzcmMvc2NyaXB0cy9saWIvZ2V0LWxvZ2dlZC1pbi1kYXRhLmpzIiwic3JjL3NjcmlwdHMvbGliL2h0bWwtZW5jb2RlLmpzIiwic3JjL3NjcmlwdHMvbGliL2ltYWdlLWNvbnZlcnRlci5qcyIsInNyYy9zY3JpcHRzL2xpYi9yZWFkLXRpbWUuanMiLCJzcmMvc2NyaXB0cy9saWIvc3RyaXAtaHRtbC10YWdzLmpzIiwic3JjL3NjcmlwdHMvbWFpbi5qcyIsInNyYy9zY3JpcHRzL3RlbXBsYXRlcy9hdXRob3IuanMiLCJzcmMvc2NyaXB0cy90ZW1wbGF0ZXMvcG9zdC5qcyIsInNyYy9zY3JpcHRzL3RlbXBsYXRlcy9yZXNwb25zZS1tZXRhLmpzIiwic3JjL3NjcmlwdHMvdGVtcGxhdGVzL3Jlc3BvbnNlLmpzIiwic3JjL3NjcmlwdHMvdGVtcGxhdGVzL3RhZy5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy93b3JkLWNvdW50L2luZGV4LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7O2tCQ01lLFVBQVMsUUFBVCxFQUFtQixPQUFuQixFQUE0QjtBQUN6QyxNQUFJLFVBQVUsS0FBVixDQURxQztBQUV6QyxNQUFJLE9BQU8sU0FBUCxJQUFPLEdBQU07QUFDZixjQUFVLEtBQVYsQ0FEZTtHQUFOLENBRjhCO0FBS3pDLFNBQU8sWUFBVztBQUNoQixRQUFJLE9BQUosRUFBYTtBQUNYLGFBRFc7S0FBYjtBQUdBLGNBQVUsSUFBVixDQUpnQjtBQUtoQixhQUFTLEtBQVQsQ0FBZSxJQUFmLEVBQXFCLFNBQXJCLEVBTGdCO0FBTWhCLFFBQUksQ0FBQyxPQUFELEVBQVU7QUFDWixhQUFPLHFCQUFQLENBQTZCLElBQTdCLEVBRFk7S0FBZCxNQUVPO0FBQ0wsYUFBTyxVQUFQLENBQWtCLElBQWxCLEVBQXdCLE9BQXhCLEVBREs7S0FGUDtHQU5LLENBTGtDO0NBQTVCOzs7Ozs7Ozs7a0JDQUEsVUFBUyxRQUFULEVBQW1CLE9BQW5CLEVBQTRCOzs7O0FBQ3pDLE1B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O0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsIi8qKlxuICogTWFrZSBzdXJlIGEgZnVuY3Rpb24gb25seSBpcyBydW4gZXZlcnkgeCBtc1xuICogQHBhcmFtICB7RnVuY3Rpb259IGNhbGxiYWNrIE1ldGhvZCB0byBleGVjdXRlIGlmIGl0IGlzIG5vdCBkZWJvdW5jZWRcbiAqIEBwYXJhbSAge2ludGVnZXJ9ICB0aW1lb3V0ICBNaWxsaXNlY29uZHMgdG8gd2FpdCBiZWZvcmUgbmV4dCBhbGxvd2VkIGNhbGxiYWNrLiBEZWZhdWx0cyB0byB0aGUgYW5pbWF0aW9uIGZyYW1lIHJhdGUgaW4gdGhlIGJyb3dzZXJcbiAqIEByZXR1cm4ge3ZvaWR9XG4gKi9cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uKGNhbGxiYWNrLCB0aW1lb3V0KSB7XG4gIHZhciBwZW5kaW5nID0gZmFsc2U7XG4gIHZhciBkb25lID0gKCkgPT4ge1xuICAgIHBlbmRpbmcgPSBmYWxzZTtcbiAgfTtcbiAgcmV0dXJuIGZ1bmN0aW9uKCkge1xuICAgIGlmIChwZW5kaW5nKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIHBlbmRpbmcgPSB0cnVlO1xuICAgIGNhbGxiYWNrLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgaWYgKCF0aW1lb3V0KSB7XG4gICAgICB3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lKGRvbmUpO1xuICAgIH0gZWxzZSB7XG4gICAgICB3aW5kb3cuc2V0VGltZW91dChkb25lLCB0aW1lb3V0KTtcbiAgICB9XG4gIH07XG59XG4iLCIvKipcbiAqIERlbGF5IGEgZnVuY3Rpb24gYW5kIG9ubHkgcnVuIG9uY2VcbiAqIEBwYXJhbSAge0Z1bmN0aW9ufSBjYWxsYmFjayBNZXRob2QgdG8gZXhlY3V0ZSBpZiBpdCBpcyBub3QgZGVib3VuY2VkXG4gKiBAcGFyYW0gIHtpbnRlZ2VyfSAgdGltZW91dCAgTWlsbGlzZWNvbmRzIHRvIHdhaXQgYmVmb3JlIG5leHQgYWxsb3dlZCBjYWxsYmFjay4gRGVmYXVsdHMgdG8gdGhlIGFuaW1hdGlvbiBmcmFtZSByYXRlIGluIHRoZSBicm93c2VyXG4gKiBAcmV0dXJuIHt2b2lkfVxuICovXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbihjYWxsYmFjaywgdGltZW91dCkge1xuICB2YXIgcGVuZGluZyA9IGZhbHNlO1xuICB2YXIgZG9uZSA9ICgpID0+IHtcbiAgICBjYWxsYmFjay5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgIHBlbmRpbmcgPSBmYWxzZTtcbiAgfTtcbiAgcmV0dXJuIGZ1bmN0aW9uKCkge1xuICAgIGlmIChwZW5kaW5nKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIHBlbmRpbmcgPSB0cnVlO1xuICAgIGlmICghdGltZW91dCkge1xuICAgICAgd2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZShkb25lKTtcbiAgICB9IGVsc2Uge1xuICAgICAgd2luZG93LnNldFRpbWVvdXQoZG9uZSwgdGltZW91dCk7XG4gICAgfVxuICB9O1xufVxuIiwiLyoqXG4gKiBHZXQgYW4gYXJyYXkgb2YgZG9tIGVsZW1lbnRzIG1hdGNoaW5nIHRoZSBzZWxlY3RvclxuICogQHBhcmFtICB7c3RyaW5nfSAgICAgc2VsZWN0b3JcbiAqIEBwYXJhbSAge0RPTWVsZW1lbnR9IERPTSBlbGVtZW50IHRvIHNlYXJjaCBpbi4gRGVmYXVsdHMgdG8gZG9jdW1lbnRcbiAqIEByZXR1cm4ge2FycmF5fVxuICovXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbihzZWxlY3RvciwgJHJvb3QgPSBkb2N1bWVudCkge1xuICByZXR1cm4gQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoJHJvb3QucXVlcnlTZWxlY3RvckFsbChzZWxlY3RvcikpO1xufVxuIiwiLyoqXG4gKiBHZXQgdGhlIGVsZW1lbnRzIG9mZnNldCByZWxhdGl2ZSB0byB0aGUgZG9jdW1lbnRcbiAqIEBwYXJhbSAge0RPTUVsZW1lbnR9ICRlbGVtZW50IEVsZW1lbnQgdG8gZ2V0IHRoZSBvZmZzZXQgZnJvbVxuICogQHJldHVybiB7aW50ZWdlcn0gICAgICAgICAgICAgT2Zmc2V0IGluIHBpeGVsc1xuICovXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbigkZWxlbWVudCkge1xuICB2YXIgb2Zmc2V0ID0gMDtcblxuICB3aGlsZSAoJGVsZW1lbnQgJiYgIWlzTmFOKCRlbGVtZW50Lm9mZnNldFRvcCkpIHtcbiAgICBvZmZzZXQgKz0gJGVsZW1lbnQub2Zmc2V0VG9wO1xuICAgICRlbGVtZW50ID0gJGVsZW1lbnQub2Zmc2V0UGFyZW50O1xuICB9XG4gIHJldHVybiBvZmZzZXQ7XG59XG4iLCIvKipcbiAqIExhenkgbG9hZCBpbWFnZXMgd2l0aCBjbGFzcyAubGF6eS1pbWFnZXMuXG4gKiBEZXBlbmRpbmcgb24gdGhlIHRyZXNob2xkIGltYWdlcyB3aWxsIGxvYWQgYXMgdGhlIHVzZXIgc2Nyb2xscyBkb3duIG9uIHRoZVxuICogZG9jdW1lbnQuXG4gKi9cblxuLy8gRGVwZW5kZW5jZWlzXG5pbXBvcnQgZ2V0QWxsRWxlbWVudHMgZnJvbSAnLi4vZG9tL2dldC1hbGwnO1xuaW1wb3J0IHNjcm9sbFZpc2libGUgZnJvbSAnLi4vc2Nyb2xsL3Zpc2libGUnO1xuXG4vLyBMb2FkIGltYWdlIGVsZW1lbnRcbnZhciBsb2FkSW1nID0gZnVuY3Rpb24oJGltZykge1xuXG4gIGlmICgkaW1nLmRhdGFzZXQuc3JjKSB7XG4gICAgJGltZy5zZXRBdHRyaWJ1dGUoJ3NyYycsICRpbWcuZGF0YXNldC5zcmMpO1xuICB9XG4gIGlmICgkaW1nLmRhdGFzZXQuc3Jjc2V0KSB7XG4gICAgJGltZy5zZXRBdHRyaWJ1dGUoJ3NyY3NldCcsICRpbWcuZGF0YXNldC5zcmNzZXQpO1xuICB9XG59O1xuXG4vLyBMb2FkIHBpY3R1cmUgZWxlbWVudFxudmFyIGxvYWRQaWN0dXJlID0gZnVuY3Rpb24oJHBpY3R1cmUpIHtcbiAgbG9hZEltZygkcGljdHVyZS5xdWVyeVNlbGVjdG9yKCdpbWcnKSk7XG4gIHZhciAkc291cmNlcyA9IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKCRwaWN0dXJlLnF1ZXJ5U2VsZWN0b3JBbGwoJ3NvdXJjZScpKTtcbiAgJHNvdXJjZXMuZm9yRWFjaCgkc291cmNlID0+ICRzb3VyY2Uuc2V0QXR0cmlidXRlKCdzcmNzZXQnLCAkc291cmNlLmRhdGFzZXQuc3Jjc2V0KSk7XG59O1xuXG52YXIgbG9hZEVsZW1lbnQgPSBmdW5jdGlvbigkZWxlbWVudCkge1xuICBpZiAoJGVsZW1lbnQubWF0Y2hlcygncGljdHVyZScpKSB7XG4gICAgbG9hZFBpY3R1cmUoJGVsZW1lbnQpO1xuICB9IGVsc2UgaWYgKCRlbGVtZW50Lm1hdGNoZXMoJ2ltZycpKSB7XG4gICAgbG9hZEltZygkZWxlbWVudCk7XG4gIH1cblxuICAvLyBNYWtlIHN1cmUgcGljdHVyZWZpbGwgd2lsbCB1cGRhdGUgdGhlIGltYWdlIHdoZW4gc291cmNlIGhhcyBjaGFuZ2VkXG4gIGlmICh3aW5kb3cucGljdHVyZWZpbGwpIHtcbiAgICB3aW5kb3cucGljdHVyZWZpbGwoe1xuICAgICAgcmVldmFsdWF0ZTogdHJ1ZVxuICAgIH0pO1xuICB9XG59O1xuXG4vKipcbiAqIEFjdGl2YXRlIGxhenkgbG9hZCBvZiBpbWFnZXMgYXMgdXNlciBzY3JvbGxzXG4gKiBAcGFyYW0gIHtmbG9hdH0gdGhyZXNob2xkICBQZXJjZW50IGJlbG93IHNjcmVlbiB0byBpbml0aWFsaXplIGxvYWQgb2YgaW1hZ2VcbiAqIEByZXR1cm4ge3ZvaWR9XG4gKi9cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uKHRocmVzaG9sZCA9IDAuNSkge1xuICB2YXIgJGxhenlJbWFnZXMgPSBnZXRBbGxFbGVtZW50cygnLmxhenktaW1hZ2UnKTtcblxuICB3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lKGZ1bmN0aW9uKCkge1xuICAgICRsYXp5SW1hZ2VzLmZvckVhY2goZnVuY3Rpb24oJGxhenlJbWFnZSkge1xuXG4gICAgICAvLyBJZ25vcmUgaW1hZ2VzIHdoaWNoIGhhcyBhbHJlYWR5IGJlZW4gcmVnaXN0ZXJlZFxuICAgICAgaWYgKCRsYXp5SW1hZ2UuZGF0YXNldC5sYXp5SW1hZ2VMaXN0ZW5pbmcpIHtcblx0cmV0dXJuO1xuICAgICAgfVxuICAgICAgJGxhenlJbWFnZS5zZXRBdHRyaWJ1dGUoJ2RhdGEtbGF6eS1pbWFnZS1saXN0ZW5pbmcnLCAndHJ1ZScpO1xuXG4gICAgICBzY3JvbGxWaXNpYmxlKCRsYXp5SW1hZ2UsIHRocmVzaG9sZClcbiAgICAgICAgLnRoZW4oKCkgPT4gbG9hZEVsZW1lbnQoJGxhenlJbWFnZSkpO1xuICAgIH0pO1xuICB9KTtcblxufVxuIiwiLy8gRGVwZW5kZW5jaWVzXG5pbXBvcnQgZ2V0RG9jdW1lbnRPZmZzZXRUb3AgZnJvbSAnLi4vZG9tL2dldC1kb2N1bWVudC1vZmZzZXQtdG9wJztcblxuLyoqXG4gKiBDaGVja3MgaWYgdGhlIHVzZXIgaGFzIHNjcm9sbGVkIHRvIG9yIHBhc3QgYW4gZWxlbWVudFxuICogQHBhcmFtICB7RE9NRWxlbWVudH0gJGVsZW1lbnQgIFRoZSBlbGVtZW50IHRvIGNoZWNrIGFnYWluc3RcbiAqIEBwYXJhbSAge2Zsb2F0fSAgICAgIHRocmVzaG9sZCBEaXN0YW5jZSBpbiBwZXJjZW50IG9mIHRoZSBzY2VlZW4gaGVpZ2h0IHRvIG1lYXN1cmUgYWdhaW5zdC5cbiAqIEByZXR1cm4ge2Jvb2xlYW59XG4gKi9cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uKCRlbGVtZW50LCB0aHJlc2hvbGQgPSAwKSB7XG4gIHZhciBzY3JvbGxCb3R0b20gPSAod2luZG93LnNjcm9sbFkgfHwgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LnNjcm9sbFRvcCkgKyAod2luZG93LmlubmVySGVpZ2h0ICogKDEgKyB0aHJlc2hvbGQpKTtcbiAgdmFyIG9mZnNldFRvcCA9IGdldERvY3VtZW50T2Zmc2V0VG9wKCRlbGVtZW50KTtcbiAgcmV0dXJuIChzY3JvbGxCb3R0b20gPiBvZmZzZXRUb3ApO1xufVxuIiwiLy8gZGVwZW5kZW5jaWVzXG5pbXBvcnQgZGVsYXkgZnJvbSAnLi4vYXN5bmMvZGVsYXknO1xuXG4vKipcbiAqIFJ1bnMgc2NyaXB0cyBlYWNoIHRpbWUgdGhlIHVzZXIgY2hhbmdlcyBzY3JvbGwgZGlyZWN0aW9uXG4gKiBAcGFyYW0gIHtGdW5jdGlvbn0gZG93bkNhbGxiYWNrICBDYWxsYmFjayBldmVyeSB0aW1lIHRoZSB1c2VyIHN0YXJ0cyBzY3JvbGxpbmcgZG93blxuICogQHBhcmFtICB7RnVuY3Rpb259IHVwQ2FsbGJhY2sgICAgQ2FsbGJhY2sgZXZlcnkgdGltZSB0aGUgdXNlciBzdGFydHMgc2Nyb2xsaW5nIHVwXG4gKiBAcGFyYW0gIHtmbG9hdH0gICAgdGhyZXNob2xkICAgICBNYXJnaW4gaW4gdG9wIHdoZXJlIHNjcm9sbCBkb3duIGlzIGlnbm9yZWQgKGNvdWxkIGJlIHVzZWQgZm9yIG5hdnMpXG4gKiBAcmV0dXJuIHt2b2lkfVxuICovXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbihkb3duQ2FsbGJhY2sgPSBmdW5jdGlvbigpIHt9LCB1cENhbGxiYWNrID0gZnVuY3Rpb24oKSB7fSwgdGhyZXNob2xkID0gMCkge1xuXG4gIHZhciBsYXN0U2Nyb2xsUG9zID0gMDtcbiAgdmFyIHNjcm9sbGVkRG93biA9IGZhbHNlO1xuXG4gIHZhciBpc1Njcm9sbGluZyA9IGZ1bmN0aW9uKCkge1xuICAgIHZhciBjdXJyZW50U2Nyb2xsUG9zID0gd2luZG93LnNjcm9sbFk7XG5cbiAgICBpZiAoIXNjcm9sbGVkRG93biAmJlxuICAgICAgY3VycmVudFNjcm9sbFBvcyA+IHRocmVzaG9sZCAmJlxuICAgICAgY3VycmVudFNjcm9sbFBvcyA+IChsYXN0U2Nyb2xsUG9zICsgMTApKSB7XG4gICAgICBkb3duQ2FsbGJhY2soKTtcbiAgICAgIHNjcm9sbGVkRG93biA9IHRydWU7XG4gICAgfSBlbHNlIGlmIChzY3JvbGxlZERvd24gJiZcbiAgICAgIChjdXJyZW50U2Nyb2xsUG9zIDw9IHRocmVzaG9sZCB8fCBjdXJyZW50U2Nyb2xsUG9zIDwgKGxhc3RTY3JvbGxQb3MgLSAxMDApKSAmJlxuICAgICAgKGN1cnJlbnRTY3JvbGxQb3MgKyB3aW5kb3cuaW5uZXJIZWlnaHQgPCBkb2N1bWVudC5ib2R5LmNsaWVudEhlaWdodCkpIHtcbiAgICAgIHVwQ2FsbGJhY2soKTtcbiAgICAgIHNjcm9sbGVkRG93biA9IGZhbHNlO1xuICAgIH1cblxuICAgIGxhc3RTY3JvbGxQb3MgPSBjdXJyZW50U2Nyb2xsUG9zO1xuICB9O1xuXG4gIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdzY3JvbGwnLCBkZWxheShpc1Njcm9sbGluZywgMjUwKSk7XG4gIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ0RPTUNvbnRlbnRMb2FkZWQnLCBpc1Njcm9sbGluZyk7XG59XG4iLCIvLyBEZXBlbmRlbmNlaXNcbmltcG9ydCBkZWJvdW5jZSBmcm9tICcuLi9hc3luYy9kZWJvdW5jZSc7XG5pbXBvcnQgaGFzU2Nyb2xsZWRQYXN0IGZyb20gJy4vaGFzLXNjcm9sbGVkLXBhc3QnO1xuXG4vKipcbiAqIEZ1bGZpbGwgYSBwcm9taXNlLCB3aGVuIHRoZSBlbGVtZW50IGlzIHZpc2libGUgKHNjcm9sbGVkIHRvIG9yIHBhc3QpXG4gKiBAcGFyYW0gIHtET01FbGVtZW50fSAkZWxlbWVudCAgRWxlbWVudCB0byBjaGVja1xuICogQHBhcmFtICB7ZmxvYXR9ICAgICAgdGhyZXNob2xkIERpc3RhbmNlIGluIHBlcmNlbnRcbiAqIEByZXR1cm4ge1t0eXBlXX0gICAgICAgICAgIFtkZXNjcmlwdGlvbl1cbiAqL1xuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24oJGVsZW1lbnQsIHRocmVzaG9sZCA9IDApIHtcblxuICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24ocmVzb2x2ZSkge1xuXG4gICAgdmFyIGNoZWNrRWxlbWVudCA9IGRlYm91bmNlKGZ1bmN0aW9uKCkge1xuICAgICAgaWYgKGhhc1Njcm9sbGVkUGFzdCgkZWxlbWVudCwgdGhyZXNob2xkKSkge1xuICAgICAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcignc2Nyb2xsJywgY2hlY2tFbGVtZW50KTtcbiAgICAgICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3Jlc2l6ZScsIGNoZWNrRWxlbWVudCk7XG4gICAgICAgIHJlc29sdmUoKTtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdzY3JvbGwnLCBjaGVja0VsZW1lbnQpO1xuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdyZXNpemUnLCBjaGVja0VsZW1lbnQpO1xuICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ0RPTUNvbnRlbnRMb2FkZWQnLCBjaGVja0VsZW1lbnQpO1xuICAgIHNldFRpbWVvdXQoY2hlY2tFbGVtZW50LCAwKTtcbiAgfSk7XG59XG4iLCIvKipcbiAqIEhlbHBlcnMgZm9yIHZhbGlkYXRpbmcgaW5wdXQgZmllbGRzXG4gKi9cblxuaW1wb3J0IGlzRGF0ZSBmcm9tICcuL2lzLWRhdGUnO1xuaW1wb3J0IGlzRW1haWwgZnJvbSAnLi9pcy1lbWFpbCc7XG5pbXBvcnQgaXNGbG9hdCBmcm9tICcuL2lzLWZsb2F0JztcbmltcG9ydCBpc0ludCBmcm9tICcuL2lzLWludCc7XG5pbXBvcnQgaXNSZXF1aXJlZCBmcm9tICcuL2lzLXJlcXVpcmVkJztcbmltcG9ydCBpc1VybCBmcm9tICcuL2lzLXVybCc7XG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgaXNEYXRlLFxuICBpc0VtYWlsLFxuICBpc0Zsb2F0LFxuICBpc0ludCxcbiAgaXNSZXF1aXJlZCxcbiAgaXNVcmxcbn07XG4iLCJpbXBvcnQgZ2V0QWxsRWxlbWVudHMgZnJvbSAnLi4vZG9tL2dldC1hbGwnO1xuaW1wb3J0IHZhbGlkYXRlIGZyb20gJy4vJztcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24oKSB7XG5cbiAgZ2V0QWxsRWxlbWVudHMoJy52YWxpZGF0ZScpLmZvckVhY2goZnVuY3Rpb24oJHZhbGlkYXRlQ29udGFpbmVyKSB7XG5cbiAgICB2YXIgJHZhbGlkYXRlRmllbGQgPSAkdmFsaWRhdGVDb250YWluZXI7XG5cbiAgICBpZiAoISR2YWxpZGF0ZUNvbnRhaW5lci5tYXRjaGVzKCdpbnB1dCwgdGV4dGFyZWEnKSkge1xuICAgICAgJHZhbGlkYXRlRmllbGQgPSAkdmFsaWRhdGVDb250YWluZXIucXVlcnlTZWxlY3RvcignaW5wdXQsIHRleHRhcmVhJyk7XG4gICAgfVxuXG4gICAgaWYgKCEkdmFsaWRhdGVGaWVsZCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIC8vIEZpbmQgcmVsZXZhdCB2YWxpZGF0aW9uIG1ldGhvZHNcbiAgICB2YXIgdmFsaWRhdG9yTmFtZXMgPSBbXTtcbiAgICBmb3IgKHZhciBrZXkgaW4gJHZhbGlkYXRlQ29udGFpbmVyLmRhdGFzZXQpIHtcbiAgICAgIGlmIChrZXkgIT09ICd2YWxpZGF0ZScgJiYga2V5LmluZGV4T2YoJ3ZhbGlkYXRlJykgPT09IDApIHtcbiAgICAgICAgdmFyIHZhbGlkYXRvck5hbWUgPSBrZXkucmVwbGFjZSgndmFsaWRhdGUnLCAnJyk7XG5cbiAgICAgICAgaWYgKHZhbGlkYXRlWydpcycgKyB2YWxpZGF0b3JOYW1lXSkge1xuICAgICAgICAgIHZhbGlkYXRvck5hbWVzLnB1c2godmFsaWRhdG9yTmFtZSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAodmFsaWRhdG9yTmFtZXMubGVuZ3RoID09PSAwKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgLy8gQ2hlY2sgdmFsaWRhdGlvbiB3aGVuIGlucHV0IG9uIGZpZWxkIGlzIGNoYW5nZWRcbiAgICAkdmFsaWRhdGVGaWVsZC5hZGRFdmVudExpc3RlbmVyKCdpbnB1dCcsIGZ1bmN0aW9uKCkge1xuICAgICAgdmFyIGlucHV0ID0gJHZhbGlkYXRlRmllbGQudmFsdWU7XG4gICAgICB2YXIgdmFsaWQgPSAhdmFsaWRhdG9yTmFtZXMuc29tZShmdW5jdGlvbih2YWxpZGF0b3JOYW1lKSB7XG5cdGlmICghaW5wdXQgJiYgdmFsaWRhdG9yTmFtZSAhPT0gJ1JlcXVpcmVkJykge1xuXHQgIHJldHVybiBmYWxzZTtcblx0fVxuICAgICAgICByZXR1cm4gIXZhbGlkYXRlWydpcycgKyB2YWxpZGF0b3JOYW1lXShpbnB1dCk7XG4gICAgICB9KTtcblxuICAgICAgaWYgKHZhbGlkKSB7XG5cdCR2YWxpZGF0ZUNvbnRhaW5lci5jbGFzc0xpc3QuYWRkKCd2YWxpZGF0ZS0tdmFsaWQnKTtcblx0JHZhbGlkYXRlQ29udGFpbmVyLmNsYXNzTGlzdC5yZW1vdmUoJ3ZhbGlkYXRlLS1ub3QtdmFsaWQnKTtcbiAgICAgIH0gZWxzZSB7XG5cdCR2YWxpZGF0ZUNvbnRhaW5lci5jbGFzc0xpc3QuYWRkKCd2YWxpZGF0ZS0tbm90LXZhbGlkJyk7XG5cdCR2YWxpZGF0ZUNvbnRhaW5lci5jbGFzc0xpc3QucmVtb3ZlKCd2YWxpZGF0ZS0tdmFsaWQnKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfSk7XG59XG4iLCIvKipcbiAqIFZhbGlkYXRlIHRoYXQgc3RyaW5nIGNhbiBiZSBjb252ZXJ0ZWQgdG8gZGF0ZVxuICogQHBhcmFtICB7c3RyaW5nfSBkYXRlIGlucHV0XG4gKiBAcmV0dXJuIHtib29sZWFufVxuICovXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbihkYXRlKSB7XG4gIHJldHVybiAhaXNOYU4oRGF0ZS5wYXJzZShkYXRlKSk7XG59XG4iLCIvKipcbiAqIFZhbGlkYXRlIGUtbWFpbFxuICogQHBhcmFtICB7c3RyaW5nfSBlbWFpbCBpbnB1dFxuICogQHJldHVybiB7Ym9vbGVhbn1cbiAqL1xuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24oZW1haWwpIHtcbiAgdmFyIHJlID0gL14oW2EtejAtOV9cXC4tXSspQChbXFxkYS16XFwuLV0rKVxcLihbYS16XFwuXXsyLDZ9KSQvO1xuICByZXR1cm4gcmUudGVzdChlbWFpbCk7XG59XG4iLCIvKipcbiAqIFZhbGlkYXRlIGZsb2F0XG4gKiBAcGFyYW0gIHtzdHJpbmd9IGZsb2F0IGlucHV0XG4gKiBAcmV0dXJuIHtib29sZWFufVxuICovXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbihmbG9hdCkge1xuICB2YXIgcmUgPSAvXig/OlstK10/KD86WzAtOV0rKSk/KD86XFwuWzAtOV0qKT8oPzpbZUVdW1xcK1xcLV0/KD86WzAtOV0rKSk/JC87XG4gIHJldHVybiBmbG9hdCAhPT0gJycgJiYgcmUudGVzdChmbG9hdCk7XG59XG4iLCIvKipcbiAqIFZhbGlkYXRlIGludGVnZXRcbiAqIEBwYXJhbSAge3N0cmluZ30gaW50ZWdlciBpbnB1dFxuICogQHJldHVybiB7Ym9vbGVhbn1cbiAqL1xuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24oaW50ZWdlcikge1xuICB2YXIgcmUgPSAvXig/OlstK10/KD86MHxbMS05XVswLTldKikpJC87XG4gIHJldHVybiByZS50ZXN0KGludGVnZXIpO1xufVxuIiwiLyoqXG4gKiBWYWxpZGF0ZSBpZiB0aGUgc3RyaW5nIGlzIGVtcHR5XG4gKiBAcGFyYW0gIHtzdHJpbmd9IGlucHV0XG4gKiBAcmV0dXJuIHtib29sZWFufVxuICovXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbihpbnB1dCkge1xuICByZXR1cm4gaW5wdXQudHJpbSgpICE9PSAnJztcbn1cbiIsIi8qKlxuICogVmFsaWRhdGUgdXJsXG4gKiBAcGFyYW0gIHtzdHJpbmd9IHVybCBpbnB1dFxuICogQHJldHVybiB7Ym9vbGVhbn1cbiAqL1xuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24odXJsKSB7XG4gIHZhciByZSA9IC9eKGh0dHBzPzpcXC9cXC8pPyhbXFxkYS16XFwuLV0rKVxcLihbYS16XFwuXXsyLDZ9KShbXFwvXFx3IFxcLi1dKikqXFwvPyQvO1xuICByZXR1cm4gcmUudGVzdCh1cmwpO1xufVxuIiwibW9kdWxlLmV4cG9ydHM9e1xuICBcInNlY29uZHNcIjogNjAsXG4gIFwibWludXRlc1wiOiA2MCxcbiAgXCJob3Vyc1wiOiAyNCxcbiAgXCJkYXlzXCI6IDcsXG4gIFwid2Vla3NcIjogNCxcbiAgXCJtb250aHNcIjogMTJcbn1cbiIsInZhciBjb252ZXJ0ZXIgPSBtb2R1bGUuZXhwb3J0cyA9IHtcbiAgY3V0b2ZmOiByZXF1aXJlKCcuL2N1dG9mZi9jdXRvZmYuanNvbicpLFxuICBzdWZmaXhEaWN0aW9uYXJ5OiByZXF1aXJlKCcuL3N1ZmZpeC9zdWZmaXgtZGljdGlvbmFyeS5qc29uJyksXG4gIHRpbWVDYWxjczogcmVxdWlyZSgnLi90aW1lLWNhbGN1bGF0aW9ucycpXG59XG5jb252ZXJ0ZXIudGltZUFnbyA9IHJlcXVpcmUoJy4vdGltZS1hZ28vdGltZS1hZ28uanMnKS5iaW5kKGNvbnZlcnRlcilcbiIsIm1vZHVsZS5leHBvcnRzPXtcbiAgXCJzZWNvbmRzXCI6IHtcbiAgICBcInNpbmd1bGFyXCI6IFwiIHNlY29uZCBhZ29cIixcbiAgICBcInBsdXJhbFwiOiBcIiBzZWNvbmRzIGFnb1wiXG4gIH0sXG4gIFwibWludXRlc1wiOiB7XG4gICAgXCJzaW5ndWxhclwiOiBcIiBtaW51dGUgYWdvXCIsXG4gICAgXCJwbHVyYWxcIjogXCIgbWludXRlcyBhZ29cIlxuICB9LFxuICBcImhvdXJzXCI6IHtcbiAgICBcInNpbmd1bGFyXCI6IFwiIGhvdXIgYWdvXCIsXG4gICAgXCJwbHVyYWxcIjogXCIgaG91cnMgYWdvXCJcbiAgfSxcbiAgXCJkYXlzXCI6IHtcbiAgICBcInNpbmd1bGFyXCI6IFwiIGRheSBhZ29cIixcbiAgICBcInBsdXJhbFwiOiBcIiBkYXlzIGFnb1wiXG4gIH0sXG4gIFwid2Vla3NcIjoge1xuICAgIFwic2luZ3VsYXJcIjogXCIgd2VlayBhZ29cIixcbiAgICBcInBsdXJhbFwiOiBcIiB3ZWVrcyBhZ29cIlxuICB9LFxuICBcIm1vbnRoc1wiOiB7XG4gICAgXCJzaW5ndWxhclwiOiBcIiBtb250aCBhZ29cIixcbiAgICBcInBsdXJhbFwiOiBcIiBtb250aHMgYWdvXCJcbiAgfSxcbiAgXCJ5ZWFyc1wiOiB7XG4gICAgXCJzaW5ndWxhclwiOiBcIiB5ZWFyIGFnb1wiLFxuICAgIFwicGx1cmFsXCI6IFwiIHllYXJzIGFnb1wiXG4gIH1cbn1cbiIsIm1vZHVsZS5leHBvcnRzID0gVGltZUFnb1xuXG5mdW5jdGlvbiBUaW1lQWdvIChwYXN0RXBvY2gsIGN1cnJlbnRFcG9jaCkge1xuICB2YXIgc2Vjb25kcyA9IE1hdGgucm91bmQodGhpcy50aW1lQ2FsY3Muc2Vjb25kcyhwYXN0RXBvY2gsIGN1cnJlbnRFcG9jaCkpXG4gIHZhciBtaW51dGVzID0gTWF0aC5yb3VuZCh0aGlzLnRpbWVDYWxjcy5taW51dGVzKHBhc3RFcG9jaCwgY3VycmVudEVwb2NoKSlcbiAgdmFyIGhvdXJzID0gTWF0aC5yb3VuZCh0aGlzLnRpbWVDYWxjcy5ob3VycyhwYXN0RXBvY2gsIGN1cnJlbnRFcG9jaCkpXG4gIHZhciBkYXlzID0gTWF0aC5yb3VuZCh0aGlzLnRpbWVDYWxjcy5kYXlzKHBhc3RFcG9jaCwgY3VycmVudEVwb2NoKSlcbiAgdmFyIHdlZWtzID0gTWF0aC5yb3VuZCh0aGlzLnRpbWVDYWxjcy53ZWVrcyhwYXN0RXBvY2gsIGN1cnJlbnRFcG9jaCkpXG4gIHZhciBtb250aHMgPSBNYXRoLnJvdW5kKHRoaXMudGltZUNhbGNzLm1vbnRocyhwYXN0RXBvY2gsIGN1cnJlbnRFcG9jaCkpXG4gIHZhciB5ZWFycyA9IE1hdGgucm91bmQodGhpcy50aW1lQ2FsY3MueWVhcnMocGFzdEVwb2NoLCBjdXJyZW50RXBvY2gpKVxuXG4gIHZhciBzdWZmaXggPSB0aGlzLnN1ZmZpeERpY3Rpb25hcnlcbiAgdmFyIGN1dG9mZiA9IHRoaXMuY3V0b2ZmXG5cbiAgaWYgKHNlY29uZHMgPCBjdXRvZmYuc2Vjb25kcykge1xuICAgIHJldHVybiBzZWNvbmRzICsgc3VmZml4LnNlY29uZHNbZ2V0Rm9ybShzZWNvbmRzKV1cbiAgfSBlbHNlIGlmIChtaW51dGVzIDwgY3V0b2ZmLm1pbnV0ZXMpIHtcbiAgICByZXR1cm4gbWludXRlcyArIHN1ZmZpeC5taW51dGVzW2dldEZvcm0obWludXRlcyldXG4gIH0gZWxzZSBpZiAoaG91cnMgPCBjdXRvZmYuaG91cnMpIHtcbiAgICByZXR1cm4gaG91cnMgKyBzdWZmaXguaG91cnNbZ2V0Rm9ybShob3VycyldXG4gIH0gZWxzZSBpZiAoZGF5cyA8IGN1dG9mZi5kYXlzKSB7XG4gICAgcmV0dXJuIGRheXMgKyBzdWZmaXguZGF5c1tnZXRGb3JtKGRheXMpXVxuICB9IGVsc2UgaWYgKHdlZWtzIDwgY3V0b2ZmLndlZWtzKSB7XG4gICAgcmV0dXJuIHdlZWtzICsgc3VmZml4LndlZWtzW2dldEZvcm0od2Vla3MpXVxuICB9IGVsc2UgaWYgKG1vbnRocyA8IGN1dG9mZi5tb250aHMpIHtcbiAgICByZXR1cm4gbW9udGhzICsgc3VmZml4Lm1vbnRoc1tnZXRGb3JtKG1vbnRocyldXG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIHllYXJzICsgc3VmZml4LnllYXJzW2dldEZvcm0oeWVhcnMpXVxuICB9XG59XG5cbmZ1bmN0aW9uIGdldEZvcm0gKHZhbHVlKSB7XG4gIGlmICh2YWx1ZSA9PT0gMSkge1xuICAgIHJldHVybiAnc2luZ3VsYXInXG4gIH1cbiAgcmV0dXJuICdwbHVyYWwnXG59XG4iLCJtb2R1bGUuZXhwb3J0cyA9IHtcbiAgc2Vjb25kczogcmVxdWlyZSgnLi90aW1lLWFnby9zZWNvbmRzLWFnby5qcycpLFxuICBtaW51dGVzOiByZXF1aXJlKCcuL3RpbWUtYWdvL21pbnV0ZXMtYWdvLmpzJyksXG4gIGhvdXJzOiByZXF1aXJlKCcuL3RpbWUtYWdvL2hvdXJzLWFnby5qcycpLFxuICBkYXlzOiByZXF1aXJlKCcuL3RpbWUtYWdvL2RheXMtYWdvLmpzJyksXG4gIHdlZWtzOiByZXF1aXJlKCcuL3RpbWUtYWdvL3dlZWtzLWFnby5qcycpLFxuICBtb250aHM6IHJlcXVpcmUoJy4vdGltZS1hZ28vbW9udGhzLWFnby5qcycpLFxuICB5ZWFyczogcmVxdWlyZSgnLi90aW1lLWFnby95ZWFycy1hZ28uanMnKVxufVxuIiwibW9kdWxlLmV4cG9ydHMgPSBEYXlzQWdvXG5cbmZ1bmN0aW9uIERheXNBZ28gKHBhc3RFcG9jaCwgY3VycmVudEVwb2NoKSB7XG4gIHZhciBkYXlzQWdvID0gKGN1cnJlbnRFcG9jaCAtIHBhc3RFcG9jaCkgLyAxMDAwIC8gNjAgLyA2MCAvIDI0XG4gIHJldHVybiBkYXlzQWdvXG59XG4iLCJtb2R1bGUuZXhwb3J0cyA9IEhvdXJzQWdvXG5cbmZ1bmN0aW9uIEhvdXJzQWdvIChwYXN0RXBvY2gsIGN1cnJlbnRFcG9jaCkge1xuICB2YXIgaG91cnNBZ28gPSAoY3VycmVudEVwb2NoIC0gcGFzdEVwb2NoKSAvIDEwMDAgLyA2MCAvIDYwXG4gIHJldHVybiBob3Vyc0Fnb1xufVxuIiwibW9kdWxlLmV4cG9ydHMgPSBNaW51dGVzQWdvXG5cbmZ1bmN0aW9uIE1pbnV0ZXNBZ28gKHBhc3RFcG9jaCwgY3VycmVudEVwb2NoKSB7XG4gIHZhciBtaW51dGVzQWdvID0gKGN1cnJlbnRFcG9jaCAtIHBhc3RFcG9jaCkgLyAxMDAwIC8gNjBcbiAgcmV0dXJuIG1pbnV0ZXNBZ29cbn1cbiIsIm1vZHVsZS5leHBvcnRzID0gTW9udGhzQWdvXG5cbmZ1bmN0aW9uIE1vbnRoc0FnbyAocGFzdEVwb2NoLCBjdXJyZW50RXBvY2gpIHtcbiAgdmFyIG1vbnRoc0FnbyA9IChjdXJyZW50RXBvY2ggLSBwYXN0RXBvY2gpIC8gMTAwMCAvIDYwIC8gNjAgLyAyNCAvIDMxXG4gIHJldHVybiBtb250aHNBZ29cbn1cbiIsIm1vZHVsZS5leHBvcnRzID0gU2Vjb25kc0Fnb1xuXG5mdW5jdGlvbiBTZWNvbmRzQWdvIChwYXN0RXBvY2gsIGN1cnJlbnRFcG9jaCkge1xuICB2YXIgc2Vjb25kc0FnbyA9IChjdXJyZW50RXBvY2ggLSBwYXN0RXBvY2gpIC8gMTAwMFxuICByZXR1cm4gc2Vjb25kc0Fnb1xufVxuIiwibW9kdWxlLmV4cG9ydHMgPSBXZWVrc0Fnb1xuXG5mdW5jdGlvbiBXZWVrc0FnbyAocGFzdEVwb2NoLCBjdXJyZW50RXBvY2gpIHtcbiAgdmFyIHdlZWtzQWdvID0gKGN1cnJlbnRFcG9jaCAtIHBhc3RFcG9jaCkgLyAxMDAwIC8gNjAgLyA2MCAvIDI0IC8gN1xuICByZXR1cm4gd2Vla3NBZ29cbn1cbiIsIm1vZHVsZS5leHBvcnRzID0gWWVhcnNBZ29cblxuZnVuY3Rpb24gWWVhcnNBZ28gKHBhc3RFcG9jaCwgY3VycmVudEVwb2NoKSB7XG4gIHZhciB5ZWFyc0FnbyA9IChjdXJyZW50RXBvY2ggLSBwYXN0RXBvY2gpIC8gMTAwMCAvIDYwIC8gNjAgLyAyNCAvIDMxIC8gMTJcbiAgcmV0dXJuIHllYXJzQWdvXG59XG4iLCIvKipcbiAqIEhhbmRsZSBuYXZpZ2F0aW9uXG4gKi9cblxuLy8gRGVwZW5kZW5jaWVzXG5pbXBvcnQgc2Nyb2xsQ2hhbmdlIGZyb20gJ2RzLWFzc2V0cy9zY3JvbGwvc2Nyb2xsLWNoYW5nZSc7XG5pbXBvcnQgZGVib3VuY2UgZnJvbSAnZHMtYXNzZXRzL2FzeW5jL2RlYm91bmNlJztcbmltcG9ydCBnZXRBbGwgZnJvbSAnZHMtYXNzZXRzL2RvbS9nZXQtYWxsJztcbmltcG9ydCBoYXNTY3JvbGxlZFBhc3QgZnJvbSAnZHMtYXNzZXRzL3Njcm9sbC9oYXMtc2Nyb2xsZWQtcGFzdCc7XG5pbXBvcnQgZ2V0VXNlckRhdGEgZnJvbSAnLi4vbGliL2dldC1sb2dnZWQtaW4tZGF0YSc7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uKCkge1xuXG4gIHZhciAkbmF2ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLm5hdicpO1xuICBpZiAoISRuYXYpIHtcbiAgICByZXR1cm47XG4gIH1cblxuICB2YXIgJGJvZHkgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdib2R5Jyk7XG5cbiAgLy8gQ2xvbmUgbmF2aWdhdGlvbiBhbmQgbWFrZSB0aGUgbmV3IG9uZSBzdGlja3lcbiAgdmFyICRzdGlja3lOYXYgPSAkbmF2LmNsb25lTm9kZSh0cnVlKTtcbiAgJHN0aWNreU5hdi5jbGFzc0xpc3QuYWRkKCduYXYtLXN0aWNreScpO1xuICAkYm9keS5pbnNlcnRCZWZvcmUoJHN0aWNreU5hdiwgJGJvZHkuZmlyc3RDaGlsZCk7XG5cbiAgdmFyICRmb290ZXJTaGFyZUJhciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5mb290ZXJfX3NoYXJlLWJhcicpO1xuICB2YXIgJHN0aWNreVNoYXJlQmFyO1xuICBpZiAoJGZvb3RlclNoYXJlQmFyKSB7XG4gICAgJHN0aWNreVNoYXJlQmFyID0gJGZvb3RlclNoYXJlQmFyLmNsb25lTm9kZSh0cnVlKTtcbiAgICAkc3RpY2t5U2hhcmVCYXIuY2xhc3NMaXN0LmFkZCgnZm9vdGVyX19zaGFyZS1iYXItLXN0aWNreScpO1xuICAgICRib2R5Lmluc2VydEJlZm9yZSgkc3RpY2t5U2hhcmVCYXIsICRib2R5LmZpcnN0Q2hpbGQpO1xuICB9XG5cbiAgLy8gQWN0aXZhdGUgdGhlIHN0aWNreSBuYXZpZ2F0aW9uIHdoZW4gdGhlIHVzZXIgc2Nyb2xscyB1cC5cbiAgLy8gVGhpcyB3aWxsIGZpcnMgdGFrZSBlZmZlY3QsIHdoZW4gdGhlIHVzZXIgaGFzIHNjcm9sbGVkIFwiYSBzY3JlZW5cIiBkb3duLlxuICBzY3JvbGxDaGFuZ2UoZnVuY3Rpb24oKSB7XG4gICAgJHN0aWNreU5hdi5jbGFzc0xpc3QucmVtb3ZlKCduYXYtLWFjdGl2ZScpO1xuICAgIGlmICgkc3RpY2t5U2hhcmVCYXIpIHtcbiAgICAgICRzdGlja3lTaGFyZUJhci5jbGFzc0xpc3QucmVtb3ZlKCdmb290ZXJfX3NoYXJlLWJhci0tc3RpY2t5LWFjdGl2ZScpO1xuICAgIH1cbiAgfSwgZnVuY3Rpb24oKSB7XG4gICAgaWYgKHdpbmRvdy5zY3JvbGxZID4gd2luZG93LmlubmVySGVpZ2h0KSB7XG4gICAgICAkc3RpY2t5TmF2LmNsYXNzTGlzdC5hZGQoJ25hdi0tYWN0aXZlJyk7XG4gICAgICBpZiAoJHN0aWNreVNoYXJlQmFyKSB7XG4gICAgICAgICRzdGlja3lTaGFyZUJhci5jbGFzc0xpc3QuYWRkKCdmb290ZXJfX3NoYXJlLWJhci0tc3RpY2t5LWFjdGl2ZScpO1xuICAgICAgfVxuICAgIH1cbiAgfSk7XG5cbiAgLyoqXG4gICAqIEhpZGUgc3RpY2t5IG5hdmlnYXRpb24gd2hlbiBzY3JvbGxlZCB0byB0aGUgdG9wIG9mIHRoZSBkb2N1bWVudFxuICAgKiBAcmV0dXJuIHt2b2lkfVxuICAgKi9cbiAgdmFyIG9uVG9wID0gZnVuY3Rpb24oKSB7XG4gICAgdmFyIHNjcm9sbFBvcyA9IHdpbmRvdy5zY3JvbGxZIHx8IGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5zY3JvbGxUb3A7XG4gICAgaWYgKHNjcm9sbFBvcyA8PSAwKSB7XG4gICAgICAkc3RpY2t5TmF2LmNsYXNzTGlzdC5hZGQoJ25hdi0taGlkZGVuJyk7XG4gICAgICAkc3RpY2t5TmF2LmNsYXNzTGlzdC5yZW1vdmUoJ25hdi0tYWN0aXZlJyk7XG4gICAgICBpZiAoJHN0aWNreVNoYXJlQmFyKSB7XG4gICAgICAgICRzdGlja3lTaGFyZUJhci5jbGFzc0xpc3QucmVtb3ZlKCdmb290ZXJfX3NoYXJlLWJhci0tc3RpY2t5LWFjdGl2ZScpO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICAkc3RpY2t5TmF2LmNsYXNzTGlzdC5yZW1vdmUoJ25hdi0taGlkZGVuJyk7XG4gICAgfVxuICAgIGlmICgkc3RpY2t5U2hhcmVCYXIpIHtcbiAgICAgIHZhciB0aHJlc2hvbGQgPSAkZm9vdGVyU2hhcmVCYXIub2Zmc2V0SGVpZ2h0IC8gd2luZG93LmlubmVySGVpZ2h0O1xuICAgICAgaWYgKGhhc1Njcm9sbGVkUGFzdCgkZm9vdGVyU2hhcmVCYXIsIC0xICogdGhyZXNob2xkKSkge1xuICAgICAgICAkc3RpY2t5U2hhcmVCYXIuY2xhc3NMaXN0LmFkZCgnaGlkZGVuJyk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICAkc3RpY2t5U2hhcmVCYXIuY2xhc3NMaXN0LnJlbW92ZSgnaGlkZGVuJyk7XG4gICAgICB9XG4gICAgfVxuICB9O1xuXG4gIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdzY3JvbGwnLCBkZWJvdW5jZShvblRvcCkpO1xuICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigncmVzaXplJywgZGVib3VuY2Uob25Ub3ApKTtcblxuICAvLyBDaGFuZ2Ugd29yZGluZyBvbiBcInNpZ24gaW5cIiBidXR0b24gd2hlbiB1c2VyIGlzIGxvZ2dlZCBpblxuICBnZXRVc2VyRGF0YSgpLnRoZW4oZnVuY3Rpb24oKSB7XG4gICAgZ2V0QWxsKCcubmF2X19pdGVtLS1zaWduLWluJykuZm9yRWFjaChmdW5jdGlvbigkc2lnbmluKSB7XG4gICAgICAkc2lnbmluLmlubmVySFRNTCA9ICdDcmVhdGUgYSBzdG9yeSc7XG4gICAgfSk7XG4gIH0pLmNhdGNoKGZ1bmN0aW9uKCkge30pO1xuXG59XG4iLCIvKipcbiAqIEhhbmRsZSByZXNwb25zZXMgYW5kIGxpa2VzIGluIHBvc3RzXG4gKi9cblxuLy8gRGVwZW5kZW5jaWVzXG5pbXBvcnQgZ2V0QWxsIGZyb20gJ2RzLWFzc2V0cy9kb20vZ2V0LWFsbCc7XG5pbXBvcnQgbGF6eUltYWdlcyBmcm9tICdkcy1hc3NldHMvbGF6eS9pbWFnZXMnO1xuaW1wb3J0ICogYXMgYXBpIGZyb20gJy4uL2xpYi9hcGknO1xuaW1wb3J0IGdldFVzZXJEYXRhIGZyb20gJy4uL2xpYi9nZXQtbG9nZ2VkLWluLWRhdGEnO1xuaW1wb3J0IHVzZXJNZXRhVGVtcGxhdGUgZnJvbSAnLi4vdGVtcGxhdGVzL3Jlc3BvbnNlLW1ldGEnO1xuaW1wb3J0IHJlc3BvbnNlVGVtcGxhdGUgZnJvbSAnLi4vdGVtcGxhdGVzL3Jlc3BvbnNlJztcbmltcG9ydCBvZmZzZXRUb3AgZnJvbSAnZHMtYXNzZXRzL2RvbS9nZXQtZG9jdW1lbnQtb2Zmc2V0LXRvcCc7XG5pbXBvcnQgbGl2ZVZhbGlkYXRpb24gZnJvbSAnLi4vbGliL2Zvcm0vbGl2ZS12YWxpZGF0aW9uJztcbmltcG9ydCB2YWxpZGF0ZUZvcm0gZnJvbSAnLi4vbGliL2Zvcm0vdmFsaWRhdGUnO1xuXG4vLyBDYWNoZWQgZG9tIGVsZW1lbnRzXG52YXIgJHJlc3BvbnNlRm9ybTtcbnZhciAkY3RhO1xudmFyICR2YWxpZGF0b3JzO1xudmFyICRyZXNwb25zZXNMaXN0O1xudmFyIHJlbmRlclJlc3BvbnNlcztcbnZhciBhZGREZWxldGVFdmVudHM7XG52YXIgc2V0UmVzcG9uc2VzTnVtYmVyO1xudmFyIGFkZFJlYWRNb3JlRXZlbnQ7XG5cbnZhciB1cGRhdGVSZXNwb25zZUNUQSA9IGZ1bmN0aW9uKHZhbGlkKSB7XG5cdGlmICh2YWxpZCkge1xuXHRcdCRjdGEuY2xhc3NMaXN0LnJlbW92ZSgnYnRuLS1kaXNhYmxlZCcpO1xuXHR9IGVsc2Uge1xuXHRcdCRjdGEuY2xhc3NMaXN0LmFkZCgnYnRuLS1kaXNhYmxlZCcpO1xuXHR9XG59O1xuXG4vKipcbiAqIERlbGV0ZSByZXNwb25zZSB3aGVuIGRlbGV0ZSBpY29uIGNsaWNrZWRcbiAqL1xuYWRkRGVsZXRlRXZlbnRzID0gZnVuY3Rpb24oKSB7XG5cdGdldEFsbCgnLnJlc3BvbnNlX19kZWxldGUnKS5mb3JFYWNoKGZ1bmN0aW9uKCRkZWxldGUpIHtcblx0XHQkZGVsZXRlLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24oZSkge1xuXHRcdFx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xuXHRcdFx0YXBpLnJlbW92ZVJlc3BvbnNlKCRkZWxldGUuZGF0YXNldC5wdWJsaXNoZWQsICRkZWxldGUuZGF0YXNldC5uYW1lKVxuXHRcdFx0XHQudGhlbihmdW5jdGlvbihkYXRhKSB7XG5cdFx0XHRcdFx0cmVuZGVyUmVzcG9uc2VzKGRhdGEucmVzcG9uc2VzKTtcblx0XHRcdFx0XHRzZXRSZXNwb25zZXNOdW1iZXIoZGF0YS5yZXNwb25zZXMpO1xuXHRcdFx0XHR9KTtcblx0XHR9KTtcblx0fSk7XG59O1xuXG4vKipcbiAqIEV4cGFuZCByZXNwb25zZSB3aXRoIGZ1bGwgdGV4dCB3aGVuIHJlYWQgbW9yZSBidXR0b24gaXMgYWN0aXZhdGVkLlxuICogQmFzaWNhbGx5IGl0IGhpZGVzIHRoZSBleGNlcnB0IGFuZCB0aGUgcmVhZCBtb3JlIGJ1dHRvbiBhbmQgZGlzcGxheXMgdGhlXG4gKiBmdWxsIHRleHQuXG4gKiBAcGFyYW0ge2VsZW1lbnR9ICRyZXNwb25zZVxuICovXG5hZGRSZWFkTW9yZUV2ZW50ID0gZnVuY3Rpb24oJHJlc3BvbnNlKSB7XG5cdHZhciAkcmVhZE1vcmUgPSAkcmVzcG9uc2UucXVlcnlTZWxlY3RvcignLnJlc3BvbnNlX19yZWFkLW1vcmUnKTtcblx0aWYgKCEkcmVhZE1vcmUpIHtcblx0XHRyZXR1cm47XG5cdH1cblx0JHJlYWRNb3JlLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24oZSkge1xuXHRcdGUucHJldmVudERlZmF1bHQoKTtcblx0XHR2YXIgJGV4Y2VycHQgPSAkcmVzcG9uc2UucXVlcnlTZWxlY3RvcignLnJlc3BvbnNlX19leGNlcnB0Jyk7XG5cdFx0dmFyICRyZWFkTW9yZUNvbnRhaW5lciA9ICRyZWFkTW9yZS5wYXJlbnROb2RlO1xuXG5cdFx0JHJlYWRNb3JlQ29udGFpbmVyLnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQoJHJlYWRNb3JlQ29udGFpbmVyKTtcblx0XHQkZXhjZXJwdC5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKCRleGNlcnB0KTtcblxuXHRcdCRyZXNwb25zZS5xdWVyeVNlbGVjdG9yKCcucmVzcG9uc2VfX3RleHQnKS5jbGFzc0xpc3QucmVtb3ZlKCdoaWRkZW4nKTtcblx0fSk7XG59O1xuXG4vKipcbiAqIFJlbmRlciB0ZW1wbGF0ZXMgZm9yIHJlc3BvbnNlcyBhbmQgaW5zZXJ0IGh0bWwgaW4gdGhlIHJlc3BvbnNlcyBsaXN0LlxuICogLSBMYXp5IGxvYWQgaW1hZ2VzIGluIHJlc3BvbnNlc1xuICogLSBBdHRhY2ggbmV3IGV2ZW50cyBpbiByZXNwb25zZXNcbiAqIEBwYXJhbSAge2FycmF5fSByZXNwb25zZXNcbiAqIEByZXR1cm4ge3ZvaWR9XG4gKi9cbnJlbmRlclJlc3BvbnNlcyA9IGZ1bmN0aW9uKHJlc3BvbnNlcykge1xuXHR2YXIgaHRtbCA9ICcnO1xuXHRyZXNwb25zZXMuZm9yRWFjaChmdW5jdGlvbihyZXNwb25zZSkge1xuXHRcdGh0bWwgKz0gcmVzcG9uc2VUZW1wbGF0ZShyZXNwb25zZSk7XG5cdH0pO1xuXHQkcmVzcG9uc2VzTGlzdC5pbm5lckhUTUwgPSBodG1sO1xuXHRsYXp5SW1hZ2VzKDEpO1xuXHRhZGREZWxldGVFdmVudHMoKTtcblx0Z2V0QWxsKCcucmVzcG9uc2UnLCAkcmVzcG9uc2VzTGlzdCkuZm9yRWFjaChhZGRSZWFkTW9yZUV2ZW50KTtcbn07XG5cbi8qKlxuICogVXBkYXRlIHRoZSBjb3VudCBvZiByZXNwb25zZXNcbiAqIEBwYXJhbSB7YXJyYXl9IHJlc3BvbnNlc1xuICovXG5zZXRSZXNwb25zZXNOdW1iZXIgPSBmdW5jdGlvbihyZXNwb25zZXMpIHtcblx0Z2V0QWxsKCcuc2hhcmVfX3Jlc3BvbnNlcycpLmZvckVhY2goZnVuY3Rpb24oJHJlc3BvbnNlcykge1xuXHRcdCRyZXNwb25zZXMuaW5uZXJIVE1MID0gcmVzcG9uc2VzLmxlbmd0aDtcblx0fSk7XG59O1xuXG4vKipcbiAqIFVwZGF0ZSB0aGUgY291bnQgZm8gbGlrZXMgZm9yIHRoaXMgcG9zdFxuICogQHBhcmFtIHtudW1iZXJ9IGxpa2VzXG4gKi9cbnZhciBzZXRMaWtlc051bWJlciA9IGZ1bmN0aW9uKGxpa2VzKSB7XG5cdGdldEFsbCgnLnNoYXJlX19saWtlcycpLmZvckVhY2goZnVuY3Rpb24oJGxpa2VzKSB7XG5cdFx0aWYgKCFpc05hTihsaWtlcykpIHtcblx0XHRcdCRsaWtlcy5pbm5lckhUTUwgPSBsaWtlcztcblx0XHR9IGVsc2UgaWYgKGlzTmFOKCRsaWtlcy5pbm5lckhUTUwpKSB7XG5cdFx0XHQkbGlrZXMuaW5uZXJIVE1MID0gMTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0JGxpa2VzLmlubmVySFRNTCA9IHBhcnNlSW50KCRsaWtlcy5pbm5lckhUTUwpICsgMTtcblx0XHR9XG5cdH0pO1xufTtcblxuLyoqXG4gKiBHZXQgZGF0YSBmcm9tIGFwaSB3aXRoIG1ldGEgZGF0YTogcmVzcG9uc2VzIGFuZCBsaWtlcy5cbiAqIFJlbmRlciB0aGlzIGluIHRoZSBkb20uXG4gKiBAcmV0dXJuIHt2b2lkfVxuICovXG52YXIgcmVuZGVyTWV0YSA9IGZ1bmN0aW9uKCkge1xuXHRhcGkuZ2V0TWV0YSgpLnRoZW4oZnVuY3Rpb24oZGF0YSkge1xuXHRcdHJlbmRlclJlc3BvbnNlcyhkYXRhLnJlc3BvbnNlcyk7XG5cdFx0c2V0UmVzcG9uc2VzTnVtYmVyKGRhdGEucmVzcG9uc2VzKTtcblx0XHRzZXRMaWtlc051bWJlcihkYXRhLmxpa2VzKTtcblx0fSk7XG59O1xuXG4vKipcbiAqIFBvc3QgbmV3IHJlc3BvbnNlIHRvIHBvc3RcbiAqIC0gY2hlY2tzIGZvciB2YWxpZGF0aW9uIGJlZm9yZSBwb3N0aW5nXG4gKiBAcGFyYW0gIHtldmVudH0gZVxuICogQHJldHVybiB7dm9pZH1cbiAqL1xudmFyIHN1Ym1pdFJlc3BvbnNlID0gZnVuY3Rpb24oZSkge1xuXHRlLnByZXZlbnREZWZhdWx0KCk7XG5cblx0dmFyIGxvZ2dlZEluID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignYm9keScpLmNsYXNzTGlzdC5jb250YWlucygndXNlci1sb2dnZWQtaW4nKTtcblxuXHQvLyBJZiBhIGZpZWxkIGlzIG5vdCB2YWxpZCB0aGlzIGZpZWxkIHdpbGwgZ2V0IGZvY3VzLCBzbyB0aGUgdXNlciBxdWlja2x5IGNhbiB1cGRhdGUgdGhlIHZhbHVlLlxuXHR2YXIgbm90VmFsaWQgPSAkdmFsaWRhdG9ycy5zb21lKGZ1bmN0aW9uKCR2YWxpZGF0b3IpIHtcblx0XHRpZiAoJHZhbGlkYXRvci5jbGFzc0xpc3QuY29udGFpbnMoJ3ZhbGlkYXRlLS1ub3QtdmFsaWQnKSkge1xuXHRcdFx0dmFyICR2YWxpZGF0ZUZpZWxkID0gJHZhbGlkYXRvci5xdWVyeVNlbGVjdG9yKCdpbnB1dCwgdGV4dGFyZWEnKTtcblx0XHRcdCR2YWxpZGF0ZUZpZWxkLmZvY3VzKCk7XG5cdFx0XHRyZXR1cm4gdHJ1ZTtcblx0XHR9XG5cdH0pO1xuXG5cdGlmIChub3RWYWxpZCkge1xuXHRcdHJldHVybjtcblx0fVxuXG5cdC8vIENyZWF0ZSBhIHJlc3BvbnNlIG9iamVjdCBiYXNlZCBvbiB2YWx1ZXMgaW4gZm9ybVxuXHR2YXIgcmVzcG9uc2UgPSB7fTtcblx0Z2V0QWxsKCdpbnB1dCwgdGV4dGFyZWEnLCAkcmVzcG9uc2VGb3JtKS5mb3JFYWNoKGZ1bmN0aW9uKCRmaWVsZCkge1xuXHRcdHZhciBuYW1lID0gJGZpZWxkLmdldEF0dHJpYnV0ZSgnbmFtZScpO1xuXHRcdGlmICgkZmllbGQudmFsdWUpIHtcblx0XHRcdHJlc3BvbnNlW25hbWVdID0gJGZpZWxkLnZhbHVlO1xuXHRcdH1cblx0fSk7XG5cblx0JGN0YS5pbm5lckhUTUwgPSAnUG9zdGluZy4uLic7XG5cdCRjdGEuY2xhc3NMaXN0LmFkZCgnYnRuLS1kaXNhYmxlZCcpO1xuXHRhcGkuYWRkUmVzcG9uc2UocmVzcG9uc2UpLnRoZW4oZnVuY3Rpb24oZGF0YSkge1xuXHRcdHJlbmRlclJlc3BvbnNlcyhkYXRhLnJlc3BvbnNlcyk7XG5cdFx0c2V0UmVzcG9uc2VzTnVtYmVyKGRhdGEucmVzcG9uc2VzKTtcblxuXHRcdC8vIFNjcm9sbCB0byBuZXcgcmVzcG9uc2Vcblx0XHR2YXIgJGxhc3RSZXNwb25zZSA9ICRyZXNwb25zZXNMaXN0LnF1ZXJ5U2VsZWN0b3IoJy5yZXNwb25zZTpsYXN0LWNoaWxkJyk7XG5cdFx0dmFyIG9mZnNldCA9IG9mZnNldFRvcCgkbGFzdFJlc3BvbnNlKTtcblx0XHR3aW5kb3cuc2Nyb2xsVG8oMCwgb2Zmc2V0IC0gKDAuNSAqIHdpbmRvdy5pbm5lckhlaWdodCkpO1xuXG5cdFx0Ly8gUmVzZXQgZm9ybVxuXHRcdCRjdGEuaW5uZXJIVE1MID0gJ1Jlc3BvbmQnO1xuXHRcdGlmIChsb2dnZWRJbikge1xuXHRcdFx0dmFyICR0ZXh0ID0gJHJlc3BvbnNlRm9ybS5xdWVyeVNlbGVjdG9yKCcucmVzcG9uc2VzLWZvcm1fX3RleHQnKTtcblx0XHRcdCR0ZXh0LmNsYXNzTGlzdC5hZGQoJ3ZhbGlkYXRlLS1ub3QtdmFsaWQnKTtcblx0XHRcdCR0ZXh0LmNsYXNzTGlzdC5yZW1vdmUoJ3ZhbGlkYXRlLS12YWxpZCcpO1xuXHRcdFx0JHRleHQucXVlcnlTZWxlY3RvcigndGV4dGFyZWEnKS52YWx1ZSA9ICcnO1xuXHRcdFx0JHRleHQucXVlcnlTZWxlY3RvcignLnBsYWNlaG9sZGVyJykuY2xhc3NMaXN0LnJlbW92ZSgncGxhY2Vob2xkZXItLW5vdC1lbXB0eScpO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHQkdmFsaWRhdG9ycy5mb3JFYWNoKGZ1bmN0aW9uKCR2YWxpZGF0b3IpIHtcblx0XHRcdFx0aWYgKCR2YWxpZGF0b3IuZGF0YXNldC52YWxpZGF0ZVJlcXVpcmVkICE9PSB1bmRlZmluZWQpIHtcblx0XHRcdFx0XHQkdmFsaWRhdG9yLmNsYXNzTGlzdC5hZGQoJ3ZhbGlkYXRlLS1ub3QtdmFsaWQnKTtcblx0XHRcdFx0XHQkdmFsaWRhdG9yLmNsYXNzTGlzdC5yZW1vdmUoJ3ZhbGlkYXRlLS12YWxpZCcpO1xuXHRcdFx0XHR9XG5cdFx0XHRcdCR2YWxpZGF0b3IucXVlcnlTZWxlY3RvcignaW5wdXQsIHRleHRhcmVhJykudmFsdWUgPSAnJztcblx0XHRcdFx0JHZhbGlkYXRvci5xdWVyeVNlbGVjdG9yKCcucGxhY2Vob2xkZXInKS5jbGFzc0xpc3QucmVtb3ZlKCdwbGFjZWhvbGRlci0tbm90LWVtcHR5Jyk7XG5cdFx0XHR9KTtcblx0XHR9XG5cdH0pO1xuXG59O1xuXG4vKipcbiAqIFVwZGF0ZSBoZWFydCAobGlrZSkgaWNvbnMgdG8gaW5kaWNhdGUsIHRoYXQgdGhlIHVzZXIgaGF2ZSBsaWtlZCB0aGUgYXJ0aWNsZVxuICogQHJldHVybiB7dm9pZH1cbiAqL1xudmFyIGxpa2VkID0gZnVuY3Rpb24oKSB7XG5cdHZhciAkdG9vbFRpcEljb24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcudG9vbC10aXBfX2xpa2UtaWNvbicpO1xuXHQkdG9vbFRpcEljb24uc2V0QXR0cmlidXRlKCdzcmMnLCAnL2Fzc2V0cy9pbWFnZXMvaGVhcnQtLWludmVyc2UtLWFjdGl2ZS5zdmcnKTtcblx0JHRvb2xUaXBJY29uLnNldEF0dHJpYnV0ZSgnZGF0YS1zcmMnLCAnL2Fzc2V0cy9pbWFnZXMvaGVhcnQtLWludmVyc2UtLWFjdGl2ZS5zdmcnKTtcblxuXHRnZXRBbGwoJy5wb3N0LWZvb3Rlcl9fbGlrZS1pY29uJykuZm9yRWFjaChmdW5jdGlvbigkZm9vdGVySWNvbikge1xuXHRcdCRmb290ZXJJY29uLnNldEF0dHJpYnV0ZSgnc3JjJywgJy9hc3NldHMvaW1hZ2VzL2hlYXJ0LS1pbnZlcnNlLS1hY3RpdmUuc3ZnJyk7XG5cdFx0JGZvb3Rlckljb24uc2V0QXR0cmlidXRlKCdkYXRhLXNyYycsICcvYXNzZXRzL2ltYWdlcy9oZWFydC0taW52ZXJzZS0tYWN0aXZlLnN2ZycpO1xuXHR9KTtcblxuXHQvLyBJbmRpY2F0ZXMsIHRoYXQgdGhlIGxpa2UgYnV0dG9uIG5vIGxvbmdlciBpcyBjbGlja2FibGVcblx0Z2V0QWxsKCcuc2hhcmVfX2xpa2UnKS5mb3JFYWNoKCRsaWtlID0+ICRsaWtlLmNsYXNzTGlzdC5hZGQoJ2Rpc2FibGVkJykpO1xufTtcblxuLyoqXG4gKiBBY3RpdmF0ZSBsaWtlLCB3aGVuIGxpa2UgYnV0dG9ucyBhcmUgY2xpY2tlZFxuICogQHBhcmFtICB7ZWxlbWVudH0gJGFuY2hvclxuICogQHJldHVybiB7dm9pZH1cbiAqL1xudmFyIGF0dGFjaExpa2VFdmVudCA9IGZ1bmN0aW9uKCRhbmNob3IpIHtcblx0JGFuY2hvci5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uKGUpIHtcblx0XHRlLnByZXZlbnREZWZhdWx0KCk7XG5cblx0XHQvLyBBbHJlYWR5IGxpa2VkIHRoaXMgYXJ0aWNsZVxuXHRcdGlmIChsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnbGlrZTonICsgd2luZG93LnBvc3RJZCkpIHtcblx0XHRcdHJldHVybjtcblx0XHR9XG5cblx0XHRsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgnbGlrZTonICsgd2luZG93LnBvc3RJZCwgdHJ1ZSk7XG5cdFx0bGlrZWQoKTtcblx0XHRzZXRMaWtlc051bWJlcigpO1xuXHRcdGFwaS5saWtlKCk7XG5cdH0pO1xufTtcblxuLyoqXG4gKiBVcGRhdGUgcmVzcG9uc2VzIGZvcm0gaWYgdXNlciBpcyBsb2dnZWQgaW4uXG4gKiBVc2VyIGRvIG5vdCBuZWVkIHRvIGZpbGwgZS1tYWlsLCBuYW1lIGV0Yy5cbiAqIEBwYXJhbSAge29iamVjdH0gZGF0YVxuICogQHJldHVybiB7dm9pZH1cbiAqL1xudmFyIHJlbmRlclVzZXJGb3JtID0gZnVuY3Rpb24odXNlcikge1xuXHR2YXIgaHRtbCA9IHVzZXJNZXRhVGVtcGxhdGUodXNlcik7XG5cdHZhciAkbWV0YSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuXHQkbWV0YS5pbm5lckhUTUwgPSBodG1sO1xuXHR2YXIgJGhlYWRlciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5yZXNwb25zZXNfX2Zvcm0gaDMnKTtcblxuXHQvLyBGaWxsIGlucHV0IGZpZWxkcyB3aXRoIHJlbGV2YW50IGRhdGFcblx0Z2V0QWxsKCcucmVzcG9uc2VzX19mb3JtIGlucHV0JykuZm9yRWFjaChmdW5jdGlvbigkaW5wdXQpIHtcblx0XHR2YXIgbmFtZSA9ICRpbnB1dC5nZXRBdHRyaWJ1dGUoJ25hbWUnKTtcblx0XHRpZiAobmFtZSA9PT0gJ3dlYnNpdGUnKSB7XG5cdFx0XHQkaW5wdXQudmFsdWUgPSAnL2F1dGhvci8nICsgdXNlci5zbHVnO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHQkaW5wdXQudmFsdWUgPSB1c2VyW25hbWVdO1xuXHRcdH1cblx0XHQkaW5wdXQucGFyZW50Tm9kZS5jbGFzc0xpc3QuYWRkKCd2YWxpZGF0ZS0tdmFsaWQnKTtcblx0XHQkaW5wdXQucGFyZW50Tm9kZS5jbGFzc0xpc3QucmVtb3ZlKCd2YWxpZGF0ZS0tbm90LXZhbGlkJyk7XG5cdH0pO1xuXG5cdC8vIEluc2VydCBhZnRlciBoZWFkZXJcblx0JGhlYWRlci5wYXJlbnROb2RlLmluc2VydEJlZm9yZSgkbWV0YSwgJGhlYWRlci5uZXh0U2libGluZyk7XG5cdGxhenlJbWFnZXMoMSk7XG5cdHZhbGlkYXRlRm9ybSgkdmFsaWRhdG9ycywgdXBkYXRlUmVzcG9uc2VDVEEpO1xufTtcblxuLyoqXG4gKiBJbml0IHJlc3BvbnNlc1xuICogQHJldHVybiB7dm9pZH1cbiAqL1xuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24oKSB7XG5cdCRyZXNwb25zZUZvcm0gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucmVzcG9uc2VzX19mb3JtJyk7XG5cblx0aWYgKCEkcmVzcG9uc2VGb3JtKSB7XG5cdFx0cmV0dXJuO1xuXHR9XG5cblx0Ly8gQ2FjaGUgZG9tIGVsZW1lbnRzXG5cdCRjdGEgPSAkcmVzcG9uc2VGb3JtLnF1ZXJ5U2VsZWN0b3IoJy5idG4tLWN0YScpO1xuXHQkcmVzcG9uc2VzTGlzdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5yZXNwb25zZXNfX2xpc3QnKTtcblx0JHZhbGlkYXRvcnMgPSBnZXRBbGwoJy52YWxpZGF0ZScsICRyZXNwb25zZUZvcm0pO1xuXG5cdC8vIFVwZGF0ZSBmcm9tIGFzIHVzZXIgdHlwZXNcblx0bGl2ZVZhbGlkYXRpb24oJHZhbGlkYXRvcnMsIHVwZGF0ZVJlc3BvbnNlQ1RBKTtcblxuXHQvLyBSZW5kZXIgcmVzcG9uc2VzIGFuZCBsaWtlXG5cdHJlbmRlck1ldGEoKTtcblxuXHQvLyBDaGFuZ2UgZm9ybSBpZiB1c2VyIGlzIGxvZ2dlZCBpblxuXHRnZXRVc2VyRGF0YSgpLnRoZW4ocmVuZGVyVXNlckZvcm0pLmNhdGNoKGZ1bmN0aW9uKCkge30pO1xuXG5cdC8vIFVzZXIgYWxyZWFkeSBsaWtlcyB0aGlzIGFydGljbGVcblx0aWYgKGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdsaWtlOicgKyB3aW5kb3cucG9zdElkKSkge1xuXHRcdGxpa2VkKCk7XG5cdH1cblxuXHRnZXRBbGwoJy5zaGFyZV9fbGlrZScpLmZvckVhY2goYXR0YWNoTGlrZUV2ZW50KTtcblx0JGN0YS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHN1Ym1pdFJlc3BvbnNlKTtcblxuXHQvLyBTaG93IG1hcmtkb3duIGhlbHBlcnNcblx0ZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnJlc3BvbnNlLWZvcm1fX21hcmtkb3duLWV4cGFuZGVyJykuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbihlKSB7XG5cdFx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xuXHRcdGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5yZXNwb25zZS1mb3JtX19tYXJrZG93bi1oZWxwZXJzJykuY2xhc3NMaXN0LnJlbW92ZSgnaGlkZGVuJyk7XG5cdH0pO1xuXG5cdGdldEFsbCgnLnBsYWNlaG9sZGVyJykuZm9yRWFjaChmdW5jdGlvbigkcGxhY2Vob2xkZXIpIHtcblx0XHR2YXIgJGlucHV0ID0gJHBsYWNlaG9sZGVyLnBhcmVudE5vZGUucXVlcnlTZWxlY3RvcignaW5wdXQsIHRleHRhcmVhJyk7XG5cblx0XHQkcGxhY2Vob2xkZXIuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbigpIHtcblx0XHRcdCRpbnB1dC5mb2N1cygpO1xuXHRcdH0pO1xuXG5cdFx0JGlucHV0LmFkZEV2ZW50TGlzdGVuZXIoJ2lucHV0JywgZnVuY3Rpb24oKSB7XG5cdFx0XHRpZiAoJGlucHV0LnZhbHVlID09PSAnJykge1xuXHRcdFx0XHQkcGxhY2Vob2xkZXIuY2xhc3NMaXN0LnJlbW92ZSgncGxhY2Vob2xkZXItLW5vdC1lbXB0eScpO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0JHBsYWNlaG9sZGVyLmNsYXNzTGlzdC5hZGQoJ3BsYWNlaG9sZGVyLS1ub3QtZW1wdHknKTtcblx0XHRcdH1cblx0XHR9KTtcblx0fSk7XG5cbn1cbiIsImltcG9ydCBsYXp5SW1hZ2VzIGZyb20gJ2RzLWFzc2V0cy9sYXp5L2ltYWdlcyc7XG5pbXBvcnQgZ2V0QWxsIGZyb20gJ2RzLWFzc2V0cy9kb20vZ2V0LWFsbCc7XG5pbXBvcnQgKiBhcyBhcGkgZnJvbSAnLi4vbGliL2FwaSc7XG5pbXBvcnQgcG9zdFRlbXBsYXRlIGZyb20gJy4uL3RlbXBsYXRlcy9wb3N0JztcbmltcG9ydCBhdXRob3JUZW1wbGF0ZSBmcm9tICcuLi90ZW1wbGF0ZXMvYXV0aG9yJztcbmltcG9ydCB0YWdUZW1wbGF0ZSBmcm9tICcuLi90ZW1wbGF0ZXMvdGFnJztcblxuY29uc3QgTUFYX1JFU1VMVFMgPSAxMDtcblxudmFyICRzZWFyY2hJbnB1dDtcbnZhciAkc2VhcmNoTGlzdDtcbnZhciBsYXRlc3RDb3VudGVyID0gMDtcblxudmFyIGdldFNlYXJjaFJlc3VsdCA9IGZ1bmN0aW9uKHBhdGgpIHtcblx0dmFyIGFic29sdXRlID0gd2luZG93Lmdob3N0LnVybC5hcGkocGF0aCwge1xuXHRcdGluY2x1ZGU6ICd0YWdzLGF1dGhvcixjb3VudC5wb3N0cydcblx0fSk7XG5cdHZhciByZWxhdGl2ZSA9IGFic29sdXRlLnN1YnN0cihhYnNvbHV0ZS5pbmRleE9mKCcvZ2hvc3QnKSwgYWJzb2x1dGUubGVuZ3RoKTtcblx0cmV0dXJuIGZldGNoKHJlbGF0aXZlKVxuXHRcdC50aGVuKGZ1bmN0aW9uKHJlc3BvbnNlKSB7XG5cdFx0XHRpZiAocmVzcG9uc2Uuc3RhdHVzID49IDMwMCkge1xuXHRcdFx0XHRyZXR1cm4gUHJvbWlzZS5yZWplY3QocmVzcG9uc2UpO1xuXHRcdFx0fVxuXHRcdFx0cmV0dXJuIHJlc3BvbnNlO1xuXHRcdH0pXG5cdFx0LnRoZW4ocmVzcG9uc2UgPT4gcmVzcG9uc2UuanNvbigpKTtcbn07XG5cbnZhciByZW5kZXJSZXN1bHRzID0gZnVuY3Rpb24ocmVzdWx0cykge1xuXHR2YXIgaHRtbCA9IHJlc3VsdHMubWFwKGZ1bmN0aW9uKHJlc3VsdCkge1xuXHRcdGlmIChyZXN1bHQucG9zdHMpIHtcblx0XHRcdHJldHVybiBwb3N0VGVtcGxhdGUocmVzdWx0LnBvc3RzWzBdKTtcblx0XHR9XG5cdFx0aWYgKHJlc3VsdC51c2Vycykge1xuXHRcdFx0cmV0dXJuIGF1dGhvclRlbXBsYXRlKHJlc3VsdC51c2Vyc1swXSk7XG5cdFx0fVxuXHRcdGlmIChyZXN1bHQudGFncykge1xuXHRcdFx0cmV0dXJuIHRhZ1RlbXBsYXRlKHJlc3VsdC50YWdzWzBdKTtcblx0XHR9XG5cdFx0cmV0dXJuICcnO1xuXHR9KS5qb2luKCcnKTtcblx0JHNlYXJjaExpc3QuaW5uZXJIVE1MID0gaHRtbDtcblx0bGF6eUltYWdlcygxKTtcblx0Z2V0QWxsKCcuYm94ZXNfX2l0ZW0nLCAkc2VhcmNoTGlzdCkuZm9yRWFjaChmdW5jdGlvbigkYm94SXRlbSwgaSkge1xuXHRcdHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XG5cdFx0XHQkYm94SXRlbS5jbGFzc0xpc3QucmVtb3ZlKCdoaWRkZW4nKTtcblx0XHRcdHNldFRpbWVvdXQoKCkgPT4gJGJveEl0ZW0uY2xhc3NMaXN0LmFkZCgnYW5pbWF0ZS0tYWN0aXZlJyksIDApO1xuXHRcdH0sIGkgKiA1MDApO1xuXHR9KTtcbn07XG5cbnZhciBzZWFyY2ggPSBmdW5jdGlvbihxdWVyeSkge1xuXG5cdHZhciBpZCA9ICsrbGF0ZXN0Q291bnRlcjtcblx0dmFyIG1pblRpbWUgPSBEYXRlLm5vdygpICsgMzAwO1xuXG5cdCRzZWFyY2hMaXN0LmlubmVySFRNTCA9ICcnO1xuXG5cdHZhciBpc0xhdGVzdCA9IGZ1bmN0aW9uKGRhdGEpIHtcblx0XHRpZiAoaWQgIT09IGxhdGVzdENvdW50ZXIpIHtcblx0XHRcdHJldHVybiBQcm9taXNlLnJlamVjdCgpO1xuXHRcdH1cblx0XHRyZXR1cm4gZGF0YTtcblx0fTtcblxuXHRhcGkuZ2V0U2VhcmNoSW5kZXgocXVlcnkpXG5cdFx0LnRoZW4oaXNMYXRlc3QpXG5cdFx0LnRoZW4oZnVuY3Rpb24oaW5kZXhlcykge1xuXHRcdFx0dmFyIHByb21pc2VzID0gaW5kZXhlcy5zbGljZSgwLCBNQVhfUkVTVUxUUykubWFwKGZ1bmN0aW9uKGluZGV4KSB7XG5cdFx0XHRcdHJldHVybiBnZXRTZWFyY2hSZXN1bHQoaW5kZXgucmVmKTtcblx0XHRcdH0pO1xuXHRcdFx0cmV0dXJuIFByb21pc2UuYWxsKHByb21pc2VzKTtcblx0XHR9KVxuXHRcdC50aGVuKGZ1bmN0aW9uKGRhdGEpIHtcblx0XHRcdGlmIChtaW5UaW1lIDwgRGF0ZS5ub3coKSkge1xuXHRcdFx0XHRyZXR1cm4gZGF0YTtcblx0XHRcdH1cblx0XHRcdHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbihyZXNvbHZlKSB7XG5cdFx0XHRcdHNldFRpbWVvdXQoKCkgPT4gcmVzb2x2ZShkYXRhKSwgbWluVGltZSAtIERhdGUubm93KCkpO1xuXHRcdFx0fSk7XG5cdFx0fSlcblx0XHQudGhlbihpc0xhdGVzdClcblx0XHQudGhlbihyZW5kZXJSZXN1bHRzKVxuXHRcdC5jYXRjaChmdW5jdGlvbihlcnIpIHtcblx0XHRcdGlmIChlcnIpIHtcblx0XHRcdFx0Y29uc29sZS5lcnJvcihlcnIpO1xuXHRcdFx0fVxuXHRcdH0pO1xufTtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24oKSB7XG5cblx0JHNlYXJjaElucHV0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnNlYXJjaF9faW5wdXQnKTtcblx0JHNlYXJjaExpc3QgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuc2VhcmNoX19saXN0Jyk7XG5cblx0aWYgKCEkc2VhcmNoSW5wdXQgfHwgISRzZWFyY2hMaXN0KSB7XG5cdFx0cmV0dXJuO1xuXHR9XG5cdCRzZWFyY2hJbnB1dC5hZGRFdmVudExpc3RlbmVyKCdpbnB1dCcsIGZ1bmN0aW9uKCkge1xuXHRcdHNlYXJjaCgkc2VhcmNoSW5wdXQudmFsdWUpO1xuXHR9KTtcblxuXHQkc2VhcmNoSW5wdXQuZm9jdXMoKTtcblxuXHQkc2VhcmNoTGlzdC5zZXRBdHRyaWJ1dGUoJ3N0eWxlJywgYG1pbi1oZWlnaHQ6ICR7d2luZG93LmlubmVySGVpZ2h0fXB4YCk7XG5cbn1cbiIsIi8qKlxuICogVG9vbCB0aXAgc2hvd2VkIHdoZW4gdXNlciBtYXJrcyB0ZXh0IGluIGFydGljbGUuXG4gKiBUaGlzIG1ha2VzIHRoZSB1c2UgYWJsZSB0byBzaGFyZS9jb21tZW50IG9uIHRoZSBtYXJrZWQuXG4gKi9cblxuaW1wb3J0IHZhbGlkYXRlRm9ybSBmcm9tICcuLi9saWIvZm9ybS92YWxpZGF0ZSc7XG5pbXBvcnQgZ2V0QWxsIGZyb20gJ2RzLWFzc2V0cy9kb20vZ2V0LWFsbCc7XG5cbi8vIENhY2hlZCBkb20gZWxlbWVudHNcbnZhciAkcG9zdENvbnRlbnQ7XG52YXIgJHRvb2xUaXA7XG52YXIgJHR3aXR0ZXI7XG52YXIgJHJlc3BvbnNlRm9ybTtcbnZhciAkY3RhO1xuXG5cbi8qKlxuICogR2V0IHRoZSB0ZXh0IHNlbGVjdGVkIGJ5IHRoZSB1c2VyXG4gKiBAcmV0dXJuIHtzdHJpbmd9XG4gKi9cbnZhciBnZXRTZWxlY3RlZFRleHQgPSBmdW5jdGlvbigpIHtcblx0dmFyIHRleHQgPSAnJztcblx0aWYgKHR5cGVvZiB3aW5kb3cuZ2V0U2VsZWN0aW9uICE9PSAndW5kZWZpbmVkJykge1xuXHRcdHRleHQgPSB3aW5kb3cuZ2V0U2VsZWN0aW9uKCkudG9TdHJpbmcoKTtcblx0fSBlbHNlIGlmICh0eXBlb2YgZG9jdW1lbnQuc2VsZWN0aW9uICE9PSAndW5kZWZpbmVkJyAmJiBkb2N1bWVudC5zZWxlY3Rpb24udHlwZSA9PT0gJ1RleHQnKSB7XG5cdFx0dGV4dCA9IGRvY3VtZW50LnNlbGVjdGlvbi5jcmVhdGVSYW5nZSgpLnRleHQ7XG5cdH1cblx0cmV0dXJuIHRleHQ7XG59O1xuXG4vKipcbiAqIENoZWNrIGlmIHRoZSBzZWxlY3RlZCB0ZXh0IGlzIGluc2lkZSB0aGUgY29udGVudCBjb250YWluZXJcbiAqIEBwYXJhbSAge29iamVjdH0gIHNlbGVjdGlvblxuICogQHJldHVybiB7Qm9vbGVhbn1cbiAqL1xudmFyIGlzSW5zaWRlQ29udGVudCA9IGZ1bmN0aW9uKHNlbGVjdGlvbikge1xuXHR2YXIgJGNvbnRhaW5lciA9IHNlbGVjdGlvbi5hbmNob3JOb2RlLnBhcmVudEVsZW1lbnQ7XG5cblx0d2hpbGUgKCRjb250YWluZXIgIT09ICRwb3N0Q29udGVudCAmJiAkY29udGFpbmVyLnBhcmVudE5vZGUpIHtcblx0XHQkY29udGFpbmVyID0gJGNvbnRhaW5lci5wYXJlbnROb2RlO1xuXHR9XG5cblx0cmV0dXJuICgkY29udGFpbmVyID09PSAkcG9zdENvbnRlbnQpO1xuXG59O1xuXG4vKipcbiAqIFBsYWNlcyB0aGUgdG9vbCB0aXAgYWJvdmUgdGhlIHNlbGVjdGVkIHRleHRcbiAqIEByZXR1cm4ge3ZvaWR9XG4gKi9cbnZhciBwbGFjZVRvb2xUaXAgPSBmdW5jdGlvbigpIHtcblxuXHQvLyBUaW1lb3V0IHRvIG1ha2Ugc3VyZSB0aGUgdGV4dCBoYXMgYmVlbiBzZWxlY3RlZFxuXHRzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xuXG5cdFx0dmFyIGhpZ2hsaWdodGVkVGV4dCA9IGdldFNlbGVjdGVkVGV4dCgpO1xuXG5cdFx0Ly8gSGlkZSB0b29sIHRpcCBpZiBub3RoaW5nIGlzIHNlbGVjdGVkXG5cdFx0aWYgKCFoaWdobGlnaHRlZFRleHQpIHtcblx0XHRcdCR0b29sVGlwLmNsYXNzTGlzdC5yZW1vdmUoJ3Rvb2wtdGlwLS12aXNpYmxlJyk7XG5cdFx0XHRyZXR1cm47XG5cdFx0fVxuXG5cdFx0Ly8gRGlzcGxheSB0b29sIHRpcCBpZiBzZWxlY3Rpb24gaXMgaW5zaWRlIHRoZSBjb250ZW50IGNvbnRhaW5lclxuXHRcdHZhciBzZWxlY3Rpb24gPSB3aW5kb3cuZ2V0U2VsZWN0aW9uKCk7XG5cdFx0aWYgKCFpc0luc2lkZUNvbnRlbnQoc2VsZWN0aW9uKSkge1xuXHRcdFx0JHRvb2xUaXAuY2xhc3NMaXN0LnJlbW92ZSgndG9vbC10aXAtLXZpc2libGUnKTtcblx0XHRcdHJldHVybjtcblx0XHR9XG5cblx0XHQvLyBDaGFuZ2UgY29udGV4dHVhbCBhY3Rpb25zXG5cdFx0JHR3aXR0ZXIuc2V0QXR0cmlidXRlKCdocmVmJywgYGh0dHBzOi8vdHdpdHRlci5jb20vaW50ZW50L3R3ZWV0P3RleHQ9JHtlbmNvZGVVUklDb21wb25lbnQoaGlnaGxpZ2h0ZWRUZXh0KX0mdXJsPSR7ZW5jb2RlVVJJQ29tcG9uZW50KCR0d2l0dGVyLmRhdGFzZXQudXJsKX1gKTtcblxuXHRcdC8vIFNob3cgYW5kIHBsYWNlIHRvb2wgdGlwXG5cdFx0dmFyIHNjcm9sbFBvc2l0aW9uID0gKHdpbmRvdy5zY3JvbGxZIHx8IGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5zY3JvbGxUb3ApO1xuXHRcdHZhciByYW5nZSA9IHNlbGVjdGlvbi5nZXRSYW5nZUF0KDApO1xuXHRcdHZhciByZWN0ID0gcmFuZ2UuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG5cdFx0JHRvb2xUaXAuc3R5bGUudG9wID0gKHJlY3QudG9wICsgc2Nyb2xsUG9zaXRpb24pICsgJ3B4Jztcblx0XHQkdG9vbFRpcC5jbGFzc0xpc3QuYWRkKCd0b29sLXRpcC0tdmlzaWJsZScpO1xuXHRcdCR0b29sVGlwLnN0eWxlLmxlZnQgPSAoMC41ICogcmVjdC5sZWZ0ICsgMC41ICogcmVjdC5yaWdodCAtIDAuNSAqICR0b29sVGlwLmNsaWVudFdpZHRoKSArICdweCc7XG5cdH0sIDEwKTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uKCkge1xuXHQkcG9zdENvbnRlbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuY29udGVudCcpO1xuXHQkdG9vbFRpcCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy50b29sLXRpcCcpO1xuXG5cdGlmICghJHBvc3RDb250ZW50IHx8ICEkdG9vbFRpcCkge1xuXHRcdHJldHVybjtcblx0fVxuXG5cdCRyZXNwb25zZUZvcm0gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucmVzcG9uc2VzX19mb3JtJyk7XG5cdCRjdGEgPSAkcmVzcG9uc2VGb3JtLnF1ZXJ5U2VsZWN0b3IoJy5idG4tLWN0YScpO1xuXG5cdCR0d2l0dGVyID0gJHRvb2xUaXAucXVlcnlTZWxlY3RvcignLnRvb2wtdGlwX190d2l0dGVyJyk7XG5cblx0ZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignbW91c2V1cCcsIHBsYWNlVG9vbFRpcCk7XG5cdGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2tleXVwJywgcGxhY2VUb29sVGlwKTtcblxuXHQvLyBGaWxsIGZvcm0gd2l0aCBzZWxlY3RlZCB0ZXh0IHRvIG1ha2UgYSBxdWljayByZXNwb25zZSBvbiB0aGUgYXJ0aWNsZSBieVxuXHQvLyB0aGUgdXNlclxuXHR2YXIgJHJlc3BvbnNlVGV4dCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5yZXNwb25zZXNfX2Zvcm0gdGV4dGFyZWEnKTtcblx0JHRvb2xUaXAucXVlcnlTZWxlY3RvcignLnRvb2wtdGlwX19yZXNwb25zZScpLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24oZSkge1xuXHRcdGUucHJldmVudERlZmF1bHQoKTtcblx0XHR2YXIgaGlnaGxpZ2h0ZWRUZXh0ID0gZ2V0U2VsZWN0ZWRUZXh0KCk7XG5cdFx0JHJlc3BvbnNlVGV4dC52YWx1ZSA9IGA+ICR7aGlnaGxpZ2h0ZWRUZXh0fVxuXG5gO1xuXHRcdCRyZXNwb25zZVRleHQuZm9jdXMoKTtcblx0XHQkcmVzcG9uc2VUZXh0LnBhcmVudE5vZGUuY2xhc3NMaXN0LmFkZCgndmFsaWRhdGUtLXZhbGlkJyk7XG5cdFx0JHJlc3BvbnNlVGV4dC5wYXJlbnROb2RlLmNsYXNzTGlzdC5yZW1vdmUoJ3ZhbGlkYXRlLS1ub3QtdmFsaWQnKTtcblx0XHQkcmVzcG9uc2VUZXh0LnBhcmVudE5vZGUucXVlcnlTZWxlY3RvcignLnBsYWNlaG9sZGVyJykuY2xhc3NMaXN0LmFkZCgncGxhY2Vob2xkZXItLW5vdC1lbXB0eScpO1xuXHRcdHZhciB2YWxpZCA9IHZhbGlkYXRlRm9ybShnZXRBbGwoJy52YWxpZGF0ZScsICRyZXNwb25zZUZvcm0pKTtcblx0XHRpZiAodmFsaWQpIHtcblx0XHRcdCRjdGEuY2xhc3NMaXN0LnJlbW92ZSgnYnRuLS1kaXNhYmxlZCcpO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHQkY3RhLmNsYXNzTGlzdC5hZGQoJ2J0bi0tZGlzYWJsZWQnKTtcblx0XHR9XG5cdH0pO1xufVxuIiwiLyoqXG4gKiBIZWxwZXJzIGZvciBjb21tdW5pY2F0aW5nIHdpdGggdGhlIG1ldGEgYXBpIGhvbGRpbmcgcmVzcG9uc2VzIGFuZCBsaWtlcyBmb3JcbiAqIHRoZSBhcnRpY2xlcy5cbiAqL1xuXG52YXIgYXBpVXJsID0gd2luZG93LmFwaVVSTDtcbnZhciBpZCA9IHdpbmRvdy5wb3N0SWQ7XG5cbi8qKlxuICogTWFrZSBhIEFKQVggY2FsbCB0byB0aGUgYXBpXG4gKiBAcGFyYW0gIHtTdHJpbmd9IHBhdGhcbiAqIEBwYXJhbSAge1N0cmluZ30gbWV0aG9kXG4gKiBAcGFyYW0gIHtvYmplY3R9IGRhdGFcbiAqIEByZXR1cm4ge1Byb21pc2V9XG4gKi9cbnZhciByZXF1ZXN0ID0gZnVuY3Rpb24ocGF0aCA9ICcnLCBtZXRob2QgPSAnR0VUJywgZGF0YSA9IG51bGwpIHtcblxuICB2YXIgZmV0Y2hPcHRpb25zID0ge1xuICAgIG1ldGhvZCxcbiAgICBoZWFkZXJzOiB7XG4gICAgICAnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL2pzb247IGNoYXJzZXQ9dXRmLTgnXG4gICAgfVxuICB9O1xuXG4gIGlmIChkYXRhKSB7XG4gICAgZmV0Y2hPcHRpb25zLmJvZHkgPSBKU09OLnN0cmluZ2lmeShkYXRhKTtcbiAgfVxuXG4gIC8vIFBlcmZvcm0gdGhlIGFqYXggY2FsbFxuICByZXR1cm4gZmV0Y2goYXBpVXJsICsgcGF0aCwgZmV0Y2hPcHRpb25zKVxuICAgIC50aGVuKGZ1bmN0aW9uKHJlc3BvbnNlKSB7XG4gICAgICBpZiAocmVzcG9uc2Uuc3RhdHVzID49IDMwMCkge1xuICAgICAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QocmVzcG9uc2UpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHJlc3BvbnNlO1xuICAgIH0pXG4gICAgLnRoZW4ocmVzcG9uc2UgPT4gcmVzcG9uc2UuanNvbigpKTtcbn07XG5cbi8qKlxuICogR2V0IG1ldGEgZGF0YSBmcm9tIHRoZSBhcnRpY2xlLiBJZiBubyBtZXRhIGRhdGEgaXMgcHJlc2VudCBmb3IgdGhlIGFjdHVhbFxuICogYXJ0aWNsZSBhbmQgbmV3IGVudHJ5IHdpbGwgYmUgbWFkZS5cbiAqIEBwYXJhbSAge2Jvb2xlYW59IHJhdyBXaGV0aGVyIHRvIGluY2x1ZGUgY29tcHV0ZWQgZmllbGRzXG4gKiBAcmV0dXJuIHtQcm9taXNlfVxuICovXG5leHBvcnQgdmFyIGdldE1ldGEgPSBmdW5jdGlvbihyYXcpIHtcbiAgdmFyIHF1ZXJ5ID0gJz9pZD0nICsgaWQ7XG4gIGlmIChyYXcpIHtcbiAgICBxdWVyeSArPSAnJnJhdyc7XG4gIH1cbiAgcmV0dXJuIHJlcXVlc3QocXVlcnkpXG4gICAgLmNhdGNoKGZ1bmN0aW9uKCkge1xuICAgICAgcmV0dXJuIHJlcXVlc3QoJycsICdQT1NUJywge1xuICAgICAgICByZXNwb25zZXM6IFtdLFxuICAgICAgICBsaWtlczogMCxcbiAgICAgICAgaWRcbiAgICAgIH0pO1xuICAgIH0pO1xufTtcblxuZXhwb3J0IHZhciBnZXRTZWFyY2hJbmRleCA9IGZ1bmN0aW9uKHF1ZXJ5KSB7XG4gIHJldHVybiByZXF1ZXN0KCdzZWFyY2g/cT0nICsgcXVlcnkpO1xufTtcblxuLyoqXG4gKiBJbmNyZW1lbnQgdGhlIGxpa2UgdmFsdWUgd2l0aCBvbmVcbiAqIEByZXR1cm4ge1Byb21pc2V9XG4gKi9cbmV4cG9ydCB2YXIgbGlrZSA9IGZ1bmN0aW9uKCkge1xuICByZXR1cm4gZ2V0TWV0YShpZCwgdHJ1ZSlcbiAgICAudGhlbihmdW5jdGlvbihkYXRhKSB7XG4gICAgICByZXR1cm4gcmVxdWVzdCgnP2lkPScgKyBpZCwgJ1BVVCcsIHtcbiAgICAgICAgbGlrZXM6IGRhdGEubGlrZXMgKyAxXG4gICAgICB9KTtcbiAgICB9KTtcbn07XG5cbi8qKlxuICogVXBkYXRlIGF1dGhvciBlbWFpbCB1c2VkIHRvIHNlbmQgZS1tYWlscyB3aGVuIGEgcmVzcG9uc2UgaSByZWNlaXZlZC5cbiAqIEByZXR1cm4ge1Byb21pc2V9XG4gKi9cbmV4cG9ydCB2YXIgdXBkYXRlQXV0aG9yRW1haWwgPSBmdW5jdGlvbihhdXRob3JFbWFpbCkge1xuICBpZiAoIWlkKSB7XG4gICAgcmV0dXJuIFByb21pc2UucmVqZWN0KG5ldyBFcnJvcignTm8gcG9zdElkJykpO1xuICB9XG4gIHJldHVybiByZXF1ZXN0KCc/aWQ9JyArIGlkLCAnUFVUJywge1xuICAgIGF1dGhvckVtYWlsXG4gIH0pO1xufTtcblxuLyoqXG4gKiBBZGQgYSByZXNwb25zZVxuICogQHBhcmFtIHtvYmplY3R9IHJlc3BvbnNlXG4gKiBAcmV0dXJuIHtQcm9taXNlfVxuICovXG5leHBvcnQgdmFyIGFkZFJlc3BvbnNlID0gZnVuY3Rpb24ocmVzcG9uc2UpIHtcbiAgcmV0dXJuIGdldE1ldGEodHJ1ZSlcbiAgICAudGhlbihmdW5jdGlvbihkYXRhKSB7XG5cbiAgICAgIC8vIFNldCB0aGUgcHVibGlzaCBkYXRhIHRvIG5vd1xuICAgICAgcmVzcG9uc2UucHVibGlzaGVkID0gbmV3IERhdGUoKS50b0lTT1N0cmluZygpO1xuXG4gICAgICAvLyBVcGRhdGUgdGhlIHJlc3BvbnNlcyBsaXN0XG4gICAgICBkYXRhLnJlc3BvbnNlcy5wdXNoKHJlc3BvbnNlKTtcbiAgICAgIHJldHVybiByZXF1ZXN0KCc/aWQ9JyArIGlkLCAnUFVUJywge1xuICAgICAgICByZXNwb25zZXM6IGRhdGEucmVzcG9uc2VzXG4gICAgICB9KTtcbiAgICB9KTtcbn07XG5cbi8qKlxuICogUmVtb3ZlIGEgcmVzcG9uc2VcbiAqIEBwYXJhbSAge3N0cmluZ30gcHVibGlzaGVkXG4gKiBAcGFyYW0gIHtzdHJpbmd9IG5hbWVcbiAqIEByZXR1cm4ge1Byb21pc2V9XG4gKi9cbmV4cG9ydCB2YXIgcmVtb3ZlUmVzcG9uc2UgPSBmdW5jdGlvbihwdWJsaXNoZWQsIG5hbWUpIHtcbiAgcmV0dXJuIGdldE1ldGEodHJ1ZSlcbiAgICAudGhlbihmdW5jdGlvbihkYXRhKSB7XG5cbiAgICAgIC8vIFJlbW92ZSByZXNwb3NlIHdoaWNoIG1hdGNoZXMgb24gcHVibGlzaCBkYXRlIGFuZCBhdXRob3IgbmFtZVxuICAgICAgdmFyIHJlc3BvbnNlcyA9IGRhdGEucmVzcG9uc2VzLmZpbHRlcihmdW5jdGlvbihyZXNwb25zZSkge1xuICAgICAgICByZXR1cm4gKHJlc3BvbnNlLnB1Ymxpc2hlZCAhPT0gcHVibGlzaGVkIHx8IHJlc3BvbnNlLm5hbWUgIT09IG5hbWUpO1xuICAgICAgfSk7XG5cbiAgICAgIHJldHVybiByZXF1ZXN0KCc/aWQ9JyArIGlkLCAnUFVUJywge1xuICAgICAgICByZXNwb25zZXNcbiAgICAgIH0pO1xuICAgIH0pO1xufTtcbiIsIi8qKlxuICogVmFsaWRhdGUgaW5wdXQgZmllbGRzIGFzIHVzZXIgdHlwZXNcbiAqL1xuXG4vLyBEZXBlbmRlbmNpZXNcbmltcG9ydCB2YWxpZGF0ZUZvcm0gZnJvbSAnLi92YWxpZGF0ZSc7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uKCR2YWxpZGF0b3JzLCBjYWxsYmFjaykge1xuXHQkdmFsaWRhdG9ycy5mb3JFYWNoKGZ1bmN0aW9uKCR2YWxpZGF0ZUNvbnRhaW5lcikge1xuXHRcdHZhciAkdmFsaWRhdGVGaWVsZCA9ICR2YWxpZGF0ZUNvbnRhaW5lci5xdWVyeVNlbGVjdG9yKCdpbnB1dCwgdGV4dGFyZWEnKTtcblxuXHRcdCR2YWxpZGF0ZUZpZWxkLmFkZEV2ZW50TGlzdGVuZXIoJ2lucHV0JywgZnVuY3Rpb24oKSB7XG5cdFx0XHR2YXIgdmFsaWQgPSB2YWxpZGF0ZUZvcm0oJHZhbGlkYXRvcnMpO1xuXHRcdFx0Y2FsbGJhY2sodmFsaWQpO1xuXHRcdH0pO1xuXHR9KTtcbn1cbiIsIi8qKlxuICogQ2hlY2sgaWYgdGhlIGZvcm0gaXMgdmFsaWRcbiAqL1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbigkdmFsaWRhdG9ycykge1xuXHR2YXIgbm90VmFsaWQgPSAkdmFsaWRhdG9ycy5zb21lKGZ1bmN0aW9uKCR2YWxpZGF0b3IpIHtcblx0XHRpZiAoJHZhbGlkYXRvci5kYXRhc2V0LnZhbGlkYXRlUmVxdWlyZWQgIT09IHVuZGVmaW5lZCkge1xuXHRcdFx0cmV0dXJuICEkdmFsaWRhdG9yLmNsYXNzTGlzdC5jb250YWlucygndmFsaWRhdGUtLXZhbGlkJyk7XG5cdFx0fSBlbHNlIHtcblx0XHRcdHJldHVybiAkdmFsaWRhdG9yLmNsYXNzTGlzdC5jb250YWlucygndmFsaWRhdGUtLW5vdC12YWxpZCcpO1xuXHRcdH1cblx0fSk7XG5cblx0cmV0dXJuICFub3RWYWxpZDtcbn1cbiIsIi8qKlxuICogQ2hlY2sgaWYgdXNlciBpcyBsb2dnZWQgaW4gdXNpbmcgdGhlIGdob3N0IHNlc3Npb24uIElmIGxvZ2dlZCBpbiBnZXQgdXNlclxuICogZGF0YS5cbiAqL1xuXG4vLyBDYWNoZWQgcHJvbWlzZVxudmFyIGRhdGFQcm9taXNlO1xuXG4vKipcbiAqIEdldCB0aGUgZGF0YSBmb3IgdGhlIGxvZ2dlZCBpbiB1c2VkXG4gKiBAcGFyYW0gIHtzdHJpbmd9IHRva2VuXG4gKiBAcmV0dXJuIHtQcm9taXNlfVxuICovXG52YXIgZ2V0VXNlckRhdGEgPSBmdW5jdGlvbih0b2tlbikge1xuXHRyZXR1cm4gZmV0Y2goJy9naG9zdC9hcGkvdjAuMS91c2Vycy9tZS8/aW5jbHVkZT1yb2xlcyZzdGF0dXM9YWxsJywge1xuXHRcdG1ldGhvZDogJ0dFVCcsXG5cdFx0aGVhZGVyczoge1xuXHRcdFx0J0F1dGhvcml6YXRpb24nOiAnQmVhcmVyICcgKyB0b2tlblxuXHRcdH1cblx0fSkudGhlbihmdW5jdGlvbihyZXNwb25zZSkge1xuXHRcdGlmIChyZXNwb25zZS5zdGF0dXMgIT09IDIwMCkge1xuXHRcdFx0cmV0dXJuIFByb21pc2UucmVqZWN0KCdPbGQgc2Vzc2lvbicpO1xuXHRcdH1cblx0XHRyZXR1cm4gcmVzcG9uc2UuanNvbigpO1xuXHR9KS50aGVuKGZ1bmN0aW9uKGRhdGEpIHtcblx0XHRyZXR1cm4gZGF0YS51c2Vyc1swXTtcblx0fSk7XG59O1xuXG4vKipcbiAqIENoZWNrIGlmIHRoZXJlIGlzIGEgR2hvc3Qgc2Vzc2lvbi4gSWYgc28gdXNlIGl0IHRvIGdldCB0aGUgdXNlcnMgZGF0YS5cbiAqIEByZXR1cm4ge1Byb21pc2V9XG4gKi9cbnZhciBnZXQgPSBmdW5jdGlvbigpIHtcblxuXHQvLyBHaG9zdCBzdG9yZXMgaXQgc2Vzc2lvbiBpbiBsb2NhbFN0b3JhZ2Vcblx0dmFyIHNlc3Npb25TdHJpbmcgPSBsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnZ2hvc3Q6c2Vzc2lvbicpO1xuXHRpZiAoIXNlc3Npb25TdHJpbmcpIHtcblx0XHRyZXR1cm4gUHJvbWlzZS5yZWplY3QoJ05vIHNlc3Npb24nKTtcblx0fVxuXG5cdC8vIFZhbGlkIHNlc3Npb24/XG5cdHZhciBzZXNzaW9uID0gSlNPTi5wYXJzZShzZXNzaW9uU3RyaW5nKTtcblx0aWYgKCFzZXNzaW9uIHx8ICFzZXNzaW9uLmF1dGhlbnRpY2F0ZWQgfHwgIXNlc3Npb24uYXV0aGVudGljYXRlZC5hY2Nlc3NfdG9rZW4pIHtcblx0XHRyZXR1cm4gUHJvbWlzZS5yZWplY3QoJ05vIHNlc3Npb24nKTtcblx0fVxuXG5cdC8vIFNlc3Npb24gZXhwaXJlZD9cblx0aWYgKHNlc3Npb24uYXV0aGVudGljYXRlZC5leHBpcmVzX2F0IDwgRGF0ZS5ub3coKSkge1xuXHRcdHJldHVybiBQcm9taXNlLnJlamVjdCgnU2Vzc2lvbiBleHBpcmVkJyk7XG5cdH1cblxuXHRyZXR1cm4gZ2V0VXNlckRhdGEoc2Vzc2lvbi5hdXRoZW50aWNhdGVkLmFjY2Vzc190b2tlbik7XG5cbn07XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uKCkge1xuXG5cdC8vIFJldHVybiBjYWNoZWQgcHJvbWlzZSBpZiBhbHJlYWR5IGNhbGxlZFxuXHRpZiAoIWRhdGFQcm9taXNlKSB7XG5cdFx0ZGF0YVByb21pc2UgPSBnZXQoKTtcblx0fVxuXHRyZXR1cm4gZGF0YVByb21pc2U7XG59XG4iLCIvKipcbiAqIEVuY29kZSBhIHN0cmluZ1xuICogQHBhcmFtICB7c3RyaW5nfSBzdHJpbmdcbiAqIEByZXR1cm4ge3N0cmluZ31cbiAqL1xuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24oc3RyaW5nKSB7XG5cdHZhciBodG1sRW5jb2RlZFZhbHVlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2JykuYXBwZW5kQ2hpbGQoXG5cdFx0ZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoc3RyaW5nKSkucGFyZW50Tm9kZS5pbm5lckhUTUw7XG5cdHJldHVybiBodG1sRW5jb2RlZFZhbHVlLnJlcGxhY2UoL1xccj9cXG4vZywgJzxicj4nKTtcbn1cbiIsImltcG9ydCBnZXRBbGwgZnJvbSAnZHMtYXNzZXRzL2RvbS9nZXQtYWxsJztcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihyYXcpIHtcblx0dmFyICRjb250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcblx0JGNvbnRhaW5lci5pbm5lckhUTUwgPSByYXc7XG5cdGdldEFsbCgnaW1nJywgJGNvbnRhaW5lcikuZm9yRWFjaChmdW5jdGlvbigkaW1nKSB7XG5cdFx0dmFyICRpbWdXcmFwcGVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG5cdFx0JGltZ1dyYXBwZXIuY2xhc3NMaXN0LmFkZCgnaW1nLXdyYXBwZXInKTtcblx0XHQkaW1nV3JhcHBlci5pbm5lckhUTUwgPSAnPGRpdiBjbGFzcz1cImltZy1jb250YWluZXJcIj48aW1nPjwvZGl2Pic7XG5cdFx0dmFyIHNyYyA9ICRpbWcuZ2V0QXR0cmlidXRlKCdzcmMnKTtcblx0XHR2YXIgYWx0ID0gJGltZy5nZXRBdHRyaWJ1dGUoJ2FsdCcpO1xuXHRcdHZhciBwYWRkaW5nID0gNTA7XG5cblx0XHQvLyBMYXp5IGxvYWQgYWxsIGJ1dCB0aGUgZmlyc3QgaW1hZ2Vcblx0XHR2YXIgJG5ld0ltZyA9ICRpbWdXcmFwcGVyLnF1ZXJ5U2VsZWN0b3IoJ2ltZycpO1xuXG5cdFx0JG5ld0ltZy5zZXRBdHRyaWJ1dGUoJ2RhdGEtc3JjJywgc3JjKTtcblx0XHQkbmV3SW1nLnNldEF0dHJpYnV0ZSgnY2xhc3MnLCAnbGF6eS1pbWFnZScpO1xuXG5cdFx0YWx0LnNwbGl0KCc7JykuZm9yRWFjaChmdW5jdGlvbihzdHIpIHtcblx0XHRcdGlmIChzdHIgPT09ICdmdWxsLXNpemUnIHx8IHN0ciA9PT0gJ2Z1bGwtd2lkdGgnKSB7XG5cdFx0XHRcdCRpbWdXcmFwcGVyLmNsYXNzTGlzdC5hZGQoJ2Z1bGwtd2lkdGgnKTtcblx0XHRcdH0gZWxzZSBpZiAoc3RyLmluZGV4T2YoJ3JhdGlvPScpID09PSAwKSB7XG5cdFx0XHRcdHZhciByYXRpbyA9IHN0ci5yZXBsYWNlKCdyYXRpbz0nLCAnJyk7XG5cdFx0XHRcdGlmIChyYXRpby5pbmRleE9mKCc6JykpIHtcblx0XHRcdFx0XHR2YXIgZGltZW5zaW9ucyA9IHJhdGlvLnNwbGl0KCc6Jyk7XG5cdFx0XHRcdFx0cmF0aW8gPSBkaW1lbnNpb25zWzBdIC8gZGltZW5zaW9uc1sxXTtcblx0XHRcdFx0fVxuXHRcdFx0XHRwYWRkaW5nID0gMTAwIC8gcmF0aW87XG5cdFx0XHR9IGVsc2UgaWYgKHN0ciA9PT0gJ2JvcmRlcnMnKSB7XG5cdFx0XHRcdCRpbWdXcmFwcGVyLnF1ZXJ5U2VsZWN0b3IoJy5pbWctY29udGFpbmVyJykuY2xhc3NMaXN0LmFkZCgnaW1nLWNvbnRhaW5lci0tYm9yZGVycycpO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0YWx0ID0gc3RyO1xuXHRcdFx0fVxuXHRcdH0pO1xuXG5cdFx0JG5ld0ltZy5zZXRBdHRyaWJ1dGUoJ2FsdCcsIGFsdCk7XG5cdFx0JG5ld0ltZy5zZXRBdHRyaWJ1dGUoJ3RpdGxlJywgJGltZy5nZXRBdHRyaWJ1dGUoJ3RpdGxlJykpO1xuXG5cdFx0JGltZ1dyYXBwZXIucXVlcnlTZWxlY3RvcignLmltZy1jb250YWluZXInKVxuXHRcdFx0LnNldEF0dHJpYnV0ZSgnc3R5bGUnLCAncGFkZGluZy1ib3R0b206JyArIHBhZGRpbmcgKyAnJScpO1xuXG5cdFx0JGltZy5wYXJlbnROb2RlLm91dGVySFRNTCA9ICRpbWdXcmFwcGVyLm91dGVySFRNTDtcblx0fSk7XG5cdHJldHVybiAkY29udGFpbmVyLmlubmVySFRNTDtcbn07XG4iLCJpbXBvcnQgc3RyaXBUYWdzIGZyb20gJy4vc3RyaXAtaHRtbC10YWdzJztcbmltcG9ydCB3b3JkQ291bnQgZnJvbSAnd29yZC1jb3VudCc7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uKGh0bWwpIHtcblx0dmFyIHRleHQgPSBzdHJpcFRhZ3MoaHRtbCk7XG5cdHZhciB3b3JkcyA9IHdvcmRDb3VudCh0ZXh0KTtcblx0dmFyIHJlYWRUaW1lID0gTWF0aC5jZWlsKHdvcmRzIC8gMzAwKTtcblxuXHR2YXIgYWZmaXggPSAnIG1pbic7XG5cdGlmIChyZWFkVGltZSA+IDEpIHtcblx0XHRhZmZpeCArPSAncyc7XG5cdH1cblxuXHRyZXR1cm4gcmVhZFRpbWUgKyBhZmZpeDtcbn1cbiIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uKGh0bWwpIHtcblx0dmFyIHRtcCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuXHR0bXAuaW5uZXJIVE1MID0gaHRtbDtcblx0cmV0dXJuIHRtcC50ZXh0Q29udGVudCB8fCB0bXAuaW5uZXJUZXh0IHx8ICcnO1xufVxuIiwiLyoqXG4gKiBNYWluIGVudHJ5IGZvciB0aGUgamF2YXNjcmlwdC5cbiAqIEltcG9ydCBtb2R1bGVzIGFuZCBzdGFydCB0aGVtXG4gKi9cblxuaW1wb3J0IGxhenlJbWFnZXMgZnJvbSAnZHMtYXNzZXRzL2xhenkvaW1hZ2VzJztcbmltcG9ydCBnZXRBbGwgZnJvbSAnZHMtYXNzZXRzL2RvbS9nZXQtYWxsJztcbmltcG9ydCB2YWxpZGF0ZUlucHV0RmllbGRzIGZyb20gJ2RzLWFzc2V0cy92YWxpZGF0ZS9pbnB1dC1maWVsZHMnO1xuaW1wb3J0IG5hdmlnYXRpb24gZnJvbSAnLi9jb21wb25lbnRzL25hdmlnYXRpb24nO1xuaW1wb3J0IHJlc3BvbnNlIGZyb20gJy4vY29tcG9uZW50cy9yZXNwb25zZSc7XG5pbXBvcnQgdG9vbFRpcCBmcm9tICcuL2NvbXBvbmVudHMvdG9vbC10aXAnO1xuaW1wb3J0IHNlYXJjaCBmcm9tICcuL2NvbXBvbmVudHMvc2VhcmNoJztcbmltcG9ydCBnZXRMb2dnZWRJbkRhdGEgZnJvbSAnLi9saWIvZ2V0LWxvZ2dlZC1pbi1kYXRhJztcbmltcG9ydCAqIGFzIGFwaSBmcm9tICcuL2xpYi9hcGknO1xuXG5uYXZpZ2F0aW9uKCk7XG50b29sVGlwKCk7XG5zZWFyY2goKTtcblxuZ2V0QWxsKCdpbWcnKS5mb3JFYWNoKGZ1bmN0aW9uKCRpbWcpIHtcblx0JGltZy5vbmxvYWQgPSBmdW5jdGlvbigpIHtcblx0XHR0aGlzLmNsYXNzTGlzdC5hZGQoJ2FuaW1hdGUtLWFjdGl2ZScpO1xuXHR9O1xufSk7XG5sYXp5SW1hZ2VzKDEpO1xudmFsaWRhdGVJbnB1dEZpZWxkcygpO1xucmVzcG9uc2UoKTtcbmdldExvZ2dlZEluRGF0YSgpLnRoZW4oZnVuY3Rpb24odXNlcikge1xuXHR2YXIgJGJvZHkgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdib2R5Jyk7XG5cblx0JGJvZHkuY2xhc3NMaXN0LmFkZCgndXNlci1sb2dnZWQtaW4nKTtcblxuXHQvLyBBZG1pbiBsb2dnZWQgaW5cblx0dmFyIGFkbWluID0gdXNlci5yb2xlcy5zb21lKGZ1bmN0aW9uKHJvbGUpIHtcblx0XHRyZXR1cm4gKHJvbGUubmFtZSA9PT0gJ093bmVyJyB8fCByb2xlLm5hbWUgPT09ICdBZG1pbmlzdHJhdG9yJyk7XG5cdH0pO1xuXHRpZiAoYWRtaW4pIHtcblx0XHQkYm9keS5jbGFzc0xpc3QuYWRkKCdhZG1pbi1sb2dnZWQtaW4nKTtcblx0fVxuXG5cdC8vIEF1dGhvciBsb2dnZWQgaW5cblx0aWYgKHVzZXIubmFtZSA9PT0gd2luZG93LmF1dGhvck5hbWUpIHtcblx0XHQkYm9keS5jbGFzc0xpc3QuYWRkKCdhdXRob3ItbG9nZ2VkLWluJyk7XG5cdFx0cmV0dXJuIGFwaS51cGRhdGVBdXRob3JFbWFpbCh1c2VyLmVtYWlsKTtcblx0fVxufSkuY2F0Y2goZnVuY3Rpb24oKSB7fSk7XG4iLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbihhdXRob3IpIHtcblxuICB2YXIgYXV0aG9ySW1hZ2UgPSAnJztcbiAgaWYgKGF1dGhvci5pbWFnZSkge1xuICAgIGF1dGhvckltYWdlID0gYDx0ZCB3aWR0aD1cIjUlXCI+PGltZyBzcmM9XCIke2F1dGhvci5pbWFnZX1cIiBjbGFzcz1cImF1dGhvcl9faW1hZ2Ugcm91bmQtaW1nXCI+PC90ZD5gO1xuICB9XG5cbiAgdmFyIGNvdmVySW1hZ2UgPSAnJztcbiAgaWYgKGF1dGhvci5jb3Zlcikge1xuICAgIGNvdmVySW1hZ2UgPSBgXG48aW1nIGRhdGEtc3JjPVwiJHthdXRob3IuY292ZXJ9XCIgY2xhc3M9XCJsYXp5LWltYWdlIGZ1bGwtd2lkdGggaW1nLWZ1bGwtd2lkdGhcIiBhbHQ9XCIke2F1dGhvci5uYW1lfVwiID5cbmA7XG4gIH1cblxuICByZXR1cm4gYFxuPGFydGljbGUgY2xhc3M9XCJib3hlc19faXRlbSBzbWFsbCBhbmltYXRlIGFuaW1hdGVfX2ZhZGUtaW5cIj5cbiAgPGhlYWRlciBjbGFzcz1cImF1dGhvclwiPlxuICAgICAgPHRhYmxlPlxuICAgICAgICAgIDx0cj5cbiAgICAgICAgICAgICAgJHthdXRob3JJbWFnZX1cbiAgICAgICAgICAgICAgPHRkPjxzcGFuIGNsYXNzPVwiYXV0aG9yX19uYW1lXCI+PGEgaHJlZj1cIi9hdXRob3IvJHthdXRob3Iuc2x1Z31cIj4ke2F1dGhvci5uYW1lfTwvYT48L3NwYW4+PGJyPlxuICAgICAgICAgICAgICBcdCR7YXV0aG9yLmNvdW50LnBvc3RzfSBzdG9yaWVzXG4gICAgICAgICAgICAgIDwvdGQ+XG4gICAgICAgICAgPC90cj5cbiAgICAgIDwvdGFibGU+XG4gIDwvaGVhZGVyPlxuICA8YSBocmVmPVwiL2F1dGhvci8ke2F1dGhvci5zbHVnfS9cIj4ke2NvdmVySW1hZ2V9PC9hPlxuICA8cD4ke2F1dGhvci5iaW8gfHwgJyd9PC9wPlxuICA8cD48YSBocmVmPVwiL2F1dGhvci8ke2F1dGhvci5zbHVnfS9cIiBjbGFzcz1cImRpbW1lZFwiPlNlZSBzdG9yaWVzIGJ5IGF1dGhvci4uLjwvYT48L3A+XG4gPC9hcnRpY2xlPlxuYDtcbn1cbiIsImltcG9ydCBpbWFnZUNvbnZlcnRlZCBmcm9tICcuLi9saWIvaW1hZ2UtY29udmVydGVyJztcbmltcG9ydCByZWFkVGltZSBmcm9tICcuLi9saWIvcmVhZC10aW1lJztcbmltcG9ydCBlcG9jaFRvVGltZWFnbyBmcm9tICdlcG9jaC10by10aW1lYWdvJztcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24ocG9zdCkge1xuXG5cdHZhciBhdXRob3JJbWFnZSA9ICcnO1xuXHRpZiAocG9zdC5hdXRob3IuaW1hZ2UpIHtcblx0XHRhdXRob3JJbWFnZSA9IGA8dGQgd2lkdGg9XCI1JVwiPjxpbWcgc3JjPVwiJHtwb3N0LmF1dGhvci5pbWFnZX1cIiBjbGFzcz1cImF1dGhvcl9faW1hZ2Ugcm91bmQtaW1nXCI+PC90ZD5gO1xuXHR9XG5cblx0dmFyIHRhZ3MgPSAnJztcblx0aWYgKHBvc3QudGFncykge1xuXHRcdHRhZ3MgPSAnPGJyPjxzcGFuIGNsYXNzPVwidGFnc1wiPicgKyBwb3N0LnRhZ3MubWFwKGZ1bmN0aW9uKHRhZykge1xuXHRcdFx0cmV0dXJuIGA8YSBocmVmPVwiL3RhZy8ke3RhZy5zbHVnfS9cIj4ke3RhZy5uYW1lfTwvYT5gO1xuXHRcdH0pLmpvaW4oJycpICsgJzwvc3Bhbj4nO1xuXHR9XG5cblx0dmFyIHB1Ymxpc2hlZCA9IG5ldyBEYXRlKHBvc3QucHVibGlzaGVkX2F0KS5nZXRUaW1lKCk7XG5cdHZhciBub3cgPSBEYXRlLm5vdygpO1xuXHR2YXIgdGltZUFnbyA9IGVwb2NoVG9UaW1lYWdvLnRpbWVBZ28ocHVibGlzaGVkLCBub3cpO1xuXG5cdHZhciBodG1sID0gaW1hZ2VDb252ZXJ0ZWQocG9zdC5odG1sKTtcblx0dmFyIGV4Y2VycHQgPSBodG1sLnN1YnN0cigwLCBodG1sLmluZGV4T2YoJzwvcD4nKSArIDQpO1xuXG5cdHJldHVybiBgXG48YXJ0aWNsZSBjbGFzcz1cImJveGVzX19pdGVtIHNtYWxsIGFuaW1hdGUgYW5pbWF0ZV9fZmFkZS1pblwiPlxuICA8aGVhZGVyIGNsYXNzPVwiYXV0aG9yXCI+XG4gICAgICA8dGFibGU+XG4gICAgICAgICAgPHRyPlxuICAgICAgICAgICAgICAke2F1dGhvckltYWdlfVxuICAgICAgICAgICAgICA8dGQ+PHNwYW4gY2xhc3M9XCJhdXRob3JfX25hbWVcIj48YSBocmVmPVwiL2F1dGhvci8ke3Bvc3QuYXV0aG9yLnNsdWd9XCI+JHtwb3N0LmF1dGhvci5uYW1lfTwvYT48L3NwYW4+PGJyPlxuICAgICAgICAgICAgICAke3RpbWVBZ299ICZtaWRkb3Q7ICR7cmVhZFRpbWUocG9zdC5odG1sKX0gcmVhZCR7dGFnc308L3RkPlxuICAgICAgICAgIDwvdHI+XG4gICAgICA8L3RhYmxlPlxuICA8L2hlYWRlcj5cbiAgPGEgaHJlZj1cIi8ke3Bvc3Quc2x1Z30vXCI+JHtleGNlcnB0fTwvYT5cbiAgPHA+PGEgaHJlZj1cIi8ke3Bvc3Quc2x1Z30vXCIgY2xhc3M9XCJkaW1tZWRcIj5SZWFkIG1vcmUuLi48L2E+PC9wPlxuPC9hcnRpY2xlPlxuYDtcbn1cbiIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uKHVzZXIpIHtcblx0dmFyIGltYWdlID0gJyc7XG5cdGlmICh1c2VyLmltYWdlKSB7XG5cdFx0aW1hZ2UgPSBgXG48dGQgd2lkdGg9XCI1JVwiPjxpbWcgZGF0YS1zcmM9XCIke3VzZXIuaW1hZ2V9XCIgY2xhc3M9XCJhdXRob3JfX2ltYWdlIGF1dGhvcl9faW1hZ2UtLXNtYWxsIGxhenktaW1hZ2UgaW1nLWJnIHJvdW5kLWltZ1wiPjwvdGQ+XG5cdFx0YDtcblx0fVxuXG5cdHJldHVybiBgXG48ZGl2IGNsYXNzPVwiYXV0aG9yIHNtYWxsXCI+XG4gIDx0YWJsZT48dGJvZHk+PHRyPlxuXHRcdCR7aW1hZ2V9XG4gICAgPHRkPlxuICAgICAgPHNwYW4gY2xhc3M9XCJhdXRob3JfX25hbWVcIj4ke3VzZXIubmFtZX08L3NwYW4+XG4gICAgPC90ZD5cbiAgPC90cj48L3Rib2R5PjwvdGFibGU+XG48L2Rpdj5cbmA7XG59XG4iLCJpbXBvcnQgZW5jb2RlIGZyb20gJy4uL2xpYi9odG1sLWVuY29kZSc7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uKHJlc3BvbnNlKSB7XG5cbiAgdmFyIGNsYXNzZXMgPSAncmVzcG9uc2UgYm94ZXNfX2l0ZW0nO1xuICBpZiAocmVzcG9uc2UubmFtZS50b0xvd2VyQ2FzZSgpID09PSB3aW5kb3cuYXV0aG9yTmFtZS50b0xvd2VyQ2FzZSgpKSB7XG4gICAgY2xhc3NlcyArPSAnIGJveGVzX19pdGVtLS10cmFuc3BhcmVudCc7XG4gIH1cblxuICB2YXIgaW1hZ2UgPSAnJztcbiAgaWYgKHJlc3BvbnNlLmltYWdlKSB7XG4gICAgaW1hZ2UgPSBgPHRkIHdpZHRoPVwiNSVcIj48aW1nIGRhdGEtc3JjPVwiJHtyZXNwb25zZS5pbWFnZX1cIiBjbGFzcz1cImF1dGhvcl9faW1hZ2UgYXV0aG9yX19pbWFnZS0tc21hbGwgbGF6eS1pbWFnZSBpbWctYmcgcm91bmQtaW1nXCI+PC90ZD5gO1xuICB9XG5cbiAgdmFyIHJlYWRUaW1lID0gJyc7XG4gIGlmIChyZXNwb25zZS5yZWFkVGltZSkge1xuICAgIHJlYWRUaW1lID0gYCAmbWlkZG90OyAke3Jlc3BvbnNlLnJlYWRUaW1lfSByZWFkYDtcbiAgfVxuXG4gIHZhciBleGNlcnB0ID0gcmVzcG9uc2UuZXhjZXJwdCB8fCByZXNwb25zZS5odG1sO1xuXG4gIHZhciByZWFkTW9yZSA9ICcnO1xuICBpZiAocmVzcG9uc2UuZXhjZXJwdCkge1xuICAgIHJlYWRNb3JlID0gYFxuPGRpdiBjbGFzcz1cInJlc3BvbnNlX190ZXh0IGhpZGRlblwiPiR7cmVzcG9uc2UuaHRtbH08L2Rpdj5cbjxwPjxhIGhyZWY9XCIjXCIgY2xhc3M9XCJyZXNwb25zZV9fcmVhZC1tb3JlIGRpbW1lZFwiPlJlYWQgbW9yZS4uLjwvYT48L3A+XG5gO1xuICB9XG5cbiAgdmFyIG5hbWUgPSBgJHtlbmNvZGUocmVzcG9uc2UubmFtZSl9YDtcbiAgaWYgKHJlc3BvbnNlLndlYnNpdGUpIHtcbiAgICBuYW1lID0gYDxhIGhyZWY9XCIke2VuY29kZShyZXNwb25zZS53ZWJzaXRlKX1cIj4ke25hbWV9PC9hPmA7XG4gIH1cblxuICByZXR1cm4gYFxuPGRpdiBjbGFzcz1cIiR7Y2xhc3Nlc30gc21hbGxcIj5cbiAgPGRpdiBjbGFzcz1cImF1dGhvclwiPlxuICAgIDx0YWJsZT5cbiAgICAgIDx0cj5cbiAgICAgICAgJHtpbWFnZX1cbiAgICAgICAgPHRkPlxuICAgICAgICAgIDxzcGFuIGNsYXNzPVwiYXV0aG9yX19uYW1lXCI+JHtuYW1lfTwvc3Bhbj48YnI+XG4gICAgICAgICAgJHtyZXNwb25zZS50aW1lQWdvfSR7cmVhZFRpbWV9XG4gICAgICAgIDwvdGQ+XG4gICAgICA8L3RyPlxuICAgIDwvdGFibGU+XG4gIDwvZGl2PlxuICA8YSBocmVmPVwiI1wiIGNsYXNzPVwicmVzcG9uc2VfX2RlbGV0ZVwiIGRhdGEtcHVibGlzaGVkPVwiJHtyZXNwb25zZS5wdWJsaXNoZWR9XCIgZGF0YS1uYW1lPVwiJHtyZXNwb25zZS5uYW1lfVwiPjxpbWcgZGF0YS1zcmM9XCIvYXNzZXRzL2ltYWdlcy90cmFzaC5zdmdcIiBjbGFzcz1cImxhenktaW1hZ2VcIj48L2E+XG4gIDxkaXYgY2xhc3M9XCJyZXNwb25zZV9fZXhjZXJwdFwiPiR7ZXhjZXJwdH08L2Rpdj5cbiAgJHtyZWFkTW9yZX1cbjwvZGl2PmA7XG59XG4iLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbih0YWcpIHtcblxuICB2YXIgY292ZXJJbWFnZSA9ICcnO1xuICBpZiAodGFnLmltYWdlKSB7XG4gICAgY292ZXJJbWFnZSA9IGBcbjxpbWcgZGF0YS1zcmM9XCIke3RhZy5pbWFnZX1cIiBjbGFzcz1cImxhenktaW1hZ2UgZnVsbC13aWR0aCBpbWctZnVsbC13aWR0aFwiIGFsdD1cIiR7dGFnLm5hbWV9XCIgPlxuYDtcbiAgfVxuXG4gIHJldHVybiBgXG48YXJ0aWNsZSBjbGFzcz1cImJveGVzX19pdGVtIHNtYWxsIGFuaW1hdGUgYW5pbWF0ZV9fZmFkZS1pblwiPlxuICA8aGVhZGVyIGNsYXNzPVwiYXV0aG9yXCI+XG4gICAgICA8dGFibGU+XG4gICAgICAgICAgPHRyPlxuICAgICAgICAgICAgICA8dGQ+PHNwYW4gY2xhc3M9XCJhdXRob3JfX25hbWVcIj48YSBocmVmPVwiL3RhZy8ke3RhZy5zbHVnfVwiPiR7dGFnLm5hbWV9PC9hPjwvc3Bhbj48YnI+XG4gICAgICAgICAgICAgIFx0JHt0YWcuY291bnQucG9zdHN9IHN0b3JpZXNcbiAgICAgICAgICAgICAgPC90ZD5cbiAgICAgICAgICA8L3RyPlxuICAgICAgPC90YWJsZT5cbiAgPC9oZWFkZXI+XG4gIDxhIGhyZWY9XCIvdGFnLyR7dGFnLnNsdWd9L1wiPiR7Y292ZXJJbWFnZX08L2E+XG4gIDxwPiR7dGFnLmRlc2NyaXB0aW9uIHx8ICcnfTwvcD5cbiAgPHA+PGEgaHJlZj1cIi90YWcvJHt0YWcuc2x1Z30vXCIgY2xhc3M9XCJkaW1tZWRcIj5TZWUgc3RvcmllcyBpbiBjYXRlZ29yeS4uLjwvYT48L3A+XG4gPC9hcnRpY2xlPlxuYDtcbn1cbiIsIi8qKlxuICogV29yZCBDb3VudFxuICpcbiAqIFdvcmQgY291bnQgaW4gcmVzcGVjdCBvZiBDSksgY2hhcmFjdGVycy5cbiAqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTUgYnkgSHNpYW9taW5nIFlhbmcuXG4gKi9cblxudmFyIHBhdHRlcm4gPSAvW2EtekEtWjAtOV9cXHUwMzkyLVxcdTAzYzlcXHUwMGMwLVxcdTAwZmZcXHUwNjAwLVxcdTA2ZmZdK3xbXFx1NGUwMC1cXHU5ZmZmXFx1MzQwMC1cXHU0ZGJmXFx1ZjkwMC1cXHVmYWZmXFx1MzA0MC1cXHUzMDlmXFx1YWMwMC1cXHVkN2FmXSsvZztcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoZGF0YSkge1xuICB2YXIgbSA9IGRhdGEubWF0Y2gocGF0dGVybik7XG4gIHZhciBjb3VudCA9IDA7XG4gIGZvciAodmFyIGkgPSAwOyBpIDwgbS5sZW5ndGg7IGkrKykge1xuICAgIGlmIChtW2ldLmNoYXJDb2RlQXQoMCkgPj0gMHg0ZTAwKSB7XG4gICAgICBjb3VudCArPSBtW2ldLmxlbmd0aDtcbiAgICB9IGVsc2Uge1xuICAgICAgY291bnQgKz0gMTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIGNvdW50O1xufTtcbiJdfQ==
