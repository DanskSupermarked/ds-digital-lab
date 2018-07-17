(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJub2RlX21vZHVsZXMvZHMtYXNzZXRzL2FzeW5jL2RlYm91bmNlLmpzIiwibm9kZV9tb2R1bGVzL2RzLWFzc2V0cy9hc3luYy9kZWxheS5qcyIsIm5vZGVfbW9kdWxlcy9kcy1hc3NldHMvZG9tL2dldC1hbGwuanMiLCJub2RlX21vZHVsZXMvZHMtYXNzZXRzL2RvbS9nZXQtZG9jdW1lbnQtb2Zmc2V0LXRvcC5qcyIsIm5vZGVfbW9kdWxlcy9kcy1hc3NldHMvbGF6eS9pbWFnZXMuanMiLCJub2RlX21vZHVsZXMvZHMtYXNzZXRzL3Njcm9sbC9oYXMtc2Nyb2xsZWQtcGFzdC5qcyIsIm5vZGVfbW9kdWxlcy9kcy1hc3NldHMvc2Nyb2xsL3Njcm9sbC1jaGFuZ2UuanMiLCJub2RlX21vZHVsZXMvZHMtYXNzZXRzL3Njcm9sbC92aXNpYmxlLmpzIiwibm9kZV9tb2R1bGVzL2RzLWFzc2V0cy92YWxpZGF0ZS9pbmRleC5qcyIsIm5vZGVfbW9kdWxlcy9kcy1hc3NldHMvdmFsaWRhdGUvaW5wdXQtZmllbGRzLmpzIiwibm9kZV9tb2R1bGVzL2RzLWFzc2V0cy92YWxpZGF0ZS9pcy1kYXRlLmpzIiwibm9kZV9tb2R1bGVzL2RzLWFzc2V0cy92YWxpZGF0ZS9pcy1lbWFpbC5qcyIsIm5vZGVfbW9kdWxlcy9kcy1hc3NldHMvdmFsaWRhdGUvaXMtZmxvYXQuanMiLCJub2RlX21vZHVsZXMvZHMtYXNzZXRzL3ZhbGlkYXRlL2lzLWludC5qcyIsIm5vZGVfbW9kdWxlcy9kcy1hc3NldHMvdmFsaWRhdGUvaXMtcmVxdWlyZWQuanMiLCJub2RlX21vZHVsZXMvZHMtYXNzZXRzL3ZhbGlkYXRlL2lzLXVybC5qcyIsIm5vZGVfbW9kdWxlcy9lcG9jaC10by10aW1lYWdvL2N1dG9mZi9jdXRvZmYuanNvbiIsIm5vZGVfbW9kdWxlcy9lcG9jaC10by10aW1lYWdvL2luZGV4LmpzIiwibm9kZV9tb2R1bGVzL2Vwb2NoLXRvLXRpbWVhZ28vc3VmZml4L3N1ZmZpeC1kaWN0aW9uYXJ5Lmpzb24iLCJub2RlX21vZHVsZXMvZXBvY2gtdG8tdGltZWFnby90aW1lLWFnby90aW1lLWFnby5qcyIsIm5vZGVfbW9kdWxlcy9lcG9jaC10by10aW1lYWdvL3RpbWUtY2FsY3VsYXRpb25zL2luZGV4LmpzIiwibm9kZV9tb2R1bGVzL2Vwb2NoLXRvLXRpbWVhZ28vdGltZS1jYWxjdWxhdGlvbnMvdGltZS1hZ28vZGF5cy1hZ28uanMiLCJub2RlX21vZHVsZXMvZXBvY2gtdG8tdGltZWFnby90aW1lLWNhbGN1bGF0aW9ucy90aW1lLWFnby9ob3Vycy1hZ28uanMiLCJub2RlX21vZHVsZXMvZXBvY2gtdG8tdGltZWFnby90aW1lLWNhbGN1bGF0aW9ucy90aW1lLWFnby9taW51dGVzLWFnby5qcyIsIm5vZGVfbW9kdWxlcy9lcG9jaC10by10aW1lYWdvL3RpbWUtY2FsY3VsYXRpb25zL3RpbWUtYWdvL21vbnRocy1hZ28uanMiLCJub2RlX21vZHVsZXMvZXBvY2gtdG8tdGltZWFnby90aW1lLWNhbGN1bGF0aW9ucy90aW1lLWFnby9zZWNvbmRzLWFnby5qcyIsIm5vZGVfbW9kdWxlcy9lcG9jaC10by10aW1lYWdvL3RpbWUtY2FsY3VsYXRpb25zL3RpbWUtYWdvL3dlZWtzLWFnby5qcyIsIm5vZGVfbW9kdWxlcy9lcG9jaC10by10aW1lYWdvL3RpbWUtY2FsY3VsYXRpb25zL3RpbWUtYWdvL3llYXJzLWFnby5qcyIsInNyYy9zY3JpcHRzL2NvbXBvbmVudHMvbmF2aWdhdGlvbi5qcyIsInNyYy9zY3JpcHRzL2NvbXBvbmVudHMvcmVzcG9uc2UuanMiLCJzcmMvc2NyaXB0cy9jb21wb25lbnRzL3NlYXJjaC5qcyIsInNyYy9zY3JpcHRzL2NvbXBvbmVudHMvdG9vbC10aXAuanMiLCJzcmMvc2NyaXB0cy9saWIvYXBpLmpzIiwic3JjL3NjcmlwdHMvbGliL2Zvcm0vbGl2ZS12YWxpZGF0aW9uLmpzIiwic3JjL3NjcmlwdHMvbGliL2Zvcm0vdmFsaWRhdGUuanMiLCJzcmMvc2NyaXB0cy9saWIvZ2V0LWxvZ2dlZC1pbi1kYXRhLmpzIiwic3JjL3NjcmlwdHMvbGliL2h0bWwtZW5jb2RlLmpzIiwic3JjL3NjcmlwdHMvbGliL2ltYWdlLWNvbnZlcnRlci5qcyIsInNyYy9zY3JpcHRzL2xpYi9yZWFkLXRpbWUuanMiLCJzcmMvc2NyaXB0cy9saWIvc3RyaXAtaHRtbC10YWdzLmpzIiwic3JjL3NjcmlwdHMvbWFpbi5qcyIsInNyYy9zY3JpcHRzL3RlbXBsYXRlcy9hdXRob3IuanMiLCJzcmMvc2NyaXB0cy90ZW1wbGF0ZXMvcG9zdC5qcyIsInNyYy9zY3JpcHRzL3RlbXBsYXRlcy9yZXNwb25zZS1tZXRhLmpzIiwic3JjL3NjcmlwdHMvdGVtcGxhdGVzL3Jlc3BvbnNlLmpzIiwic3JjL3NjcmlwdHMvdGVtcGxhdGVzL3RhZy5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy93b3JkLWNvdW50L2luZGV4LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7O2tCQ01lLFVBQVMsUUFBVCxFQUFtQixPQUFuQixFQUE0QjtBQUN6QyxNQUFJLFVBQVUsS0FBZDtBQUNBLE1BQUksT0FBTyxTQUFQLElBQU8sR0FBTTtBQUNmLGNBQVUsS0FBVjtBQUNELEdBRkQ7QUFHQSxTQUFPLFlBQVc7QUFDaEIsUUFBSSxPQUFKLEVBQWE7QUFDWDtBQUNEO0FBQ0QsY0FBVSxJQUFWO0FBQ0EsYUFBUyxLQUFULENBQWUsSUFBZixFQUFxQixTQUFyQjtBQUNBLFFBQUksQ0FBQyxPQUFMLEVBQWM7QUFDWixhQUFPLHFCQUFQLENBQTZCLElBQTdCO0FBQ0QsS0FGRCxNQUVPO0FBQ0wsYUFBTyxVQUFQLENBQWtCLElBQWxCLEVBQXdCLE9BQXhCO0FBQ0Q7QUFDRixHQVhEO0FBWUQsQzs7Ozs7Ozs7O2tCQ2pCYyxVQUFTLFFBQVQsRUFBbUIsT0FBbkIsRUFBNEI7QUFBQTtBQUFBOztBQUN6QyxNQUFJLFVBQVUsS0FBZDtBQUNBLE1BQUksT0FBTyxTQUFQLElBQU8sR0FBTTtBQUNmLGFBQVMsS0FBVCxDQUFlLEtBQWYsRUFBcUIsVUFBckI7QUFDQSxjQUFVLEtBQVY7QUFDRCxHQUhEO0FBSUEsU0FBTyxZQUFXO0FBQ2hCLFFBQUksT0FBSixFQUFhO0FBQ1g7QUFDRDtBQUNELGNBQVUsSUFBVjtBQUNBLFFBQUksQ0FBQyxPQUFMLEVBQWM7QUFDWixhQUFPLHFCQUFQLENBQTZCLElBQTdCO0FBQ0QsS0FGRCxNQUVPO0FBQ0wsYUFBTyxVQUFQLENBQWtCLElBQWxCLEVBQXdCLE9BQXhCO0FBQ0Q7QUFDRixHQVZEO0FBV0QsQzs7Ozs7Ozs7O2tCQ2pCYyxVQUFTLFFBQVQsRUFBcUM7QUFBQSxNQUFsQixLQUFrQix1RUFBVixRQUFVOztBQUNsRCxTQUFPLE1BQU0sU0FBTixDQUFnQixLQUFoQixDQUFzQixJQUF0QixDQUEyQixNQUFNLGdCQUFOLENBQXVCLFFBQXZCLENBQTNCLENBQVA7QUFDRCxDOzs7Ozs7Ozs7a0JDSGMsVUFBUyxRQUFULEVBQW1CO0FBQ2hDLE1BQUksU0FBUyxDQUFiOztBQUVBLFNBQU8sWUFBWSxDQUFDLE1BQU0sU0FBUyxTQUFmLENBQXBCLEVBQStDO0FBQzdDLGNBQVUsU0FBUyxTQUFuQjtBQUNBLGVBQVcsU0FBUyxZQUFwQjtBQUNEO0FBQ0QsU0FBTyxNQUFQO0FBQ0QsQzs7Ozs7Ozs7O2tCQ21DYyxZQUEwQjtBQUFBLE1BQWpCLFNBQWlCLHVFQUFMLEdBQUs7O0FBQ3ZDLE1BQUksY0FBYyxzQkFBZSxhQUFmLENBQWxCOztBQUVBLFNBQU8scUJBQVAsQ0FBNkIsWUFBVztBQUN0QyxnQkFBWSxPQUFaLENBQW9CLFVBQVMsVUFBVCxFQUFxQjs7QUFFdkM7QUFDQSxVQUFJLFdBQVcsT0FBWCxDQUFtQixrQkFBdkIsRUFBMkM7QUFDaEQ7QUFDTTtBQUNELGlCQUFXLFlBQVgsQ0FBd0IsMkJBQXhCLEVBQXFELE1BQXJEOztBQUVBLDZCQUFjLFVBQWQsRUFBMEIsU0FBMUIsRUFDRyxJQURILENBQ1E7QUFBQSxlQUFNLFlBQVksVUFBWixDQUFOO0FBQUEsT0FEUjtBQUVELEtBVkQ7QUFXRCxHQVpEO0FBY0QsQzs7QUExREQ7Ozs7QUFDQTs7Ozs7O0FBRUE7QUFWQTs7Ozs7O0FBTUE7QUFLQSxJQUFJLFVBQVUsU0FBVixPQUFVLENBQVMsSUFBVCxFQUFlOztBQUUzQixNQUFJLEtBQUssT0FBTCxDQUFhLEdBQWpCLEVBQXNCO0FBQ3BCLFNBQUssWUFBTCxDQUFrQixLQUFsQixFQUF5QixLQUFLLE9BQUwsQ0FBYSxHQUF0QztBQUNEO0FBQ0QsTUFBSSxLQUFLLE9BQUwsQ0FBYSxNQUFqQixFQUF5QjtBQUN2QixTQUFLLFlBQUwsQ0FBa0IsUUFBbEIsRUFBNEIsS0FBSyxPQUFMLENBQWEsTUFBekM7QUFDRDtBQUNGLENBUkQ7O0FBVUE7QUFDQSxJQUFJLGNBQWMsU0FBZCxXQUFjLENBQVMsUUFBVCxFQUFtQjtBQUNuQyxVQUFRLFNBQVMsYUFBVCxDQUF1QixLQUF2QixDQUFSO0FBQ0EsTUFBSSxXQUFXLE1BQU0sU0FBTixDQUFnQixLQUFoQixDQUFzQixJQUF0QixDQUEyQixTQUFTLGdCQUFULENBQTBCLFFBQTFCLENBQTNCLENBQWY7QUFDQSxXQUFTLE9BQVQsQ0FBaUI7QUFBQSxXQUFXLFFBQVEsWUFBUixDQUFxQixRQUFyQixFQUErQixRQUFRLE9BQVIsQ0FBZ0IsTUFBL0MsQ0FBWDtBQUFBLEdBQWpCO0FBQ0QsQ0FKRDs7QUFNQSxJQUFJLGNBQWMsU0FBZCxXQUFjLENBQVMsUUFBVCxFQUFtQjtBQUNuQyxNQUFJLFNBQVMsT0FBVCxDQUFpQixTQUFqQixDQUFKLEVBQWlDO0FBQy9CLGdCQUFZLFFBQVo7QUFDRCxHQUZELE1BRU8sSUFBSSxTQUFTLE9BQVQsQ0FBaUIsS0FBakIsQ0FBSixFQUE2QjtBQUNsQyxZQUFRLFFBQVI7QUFDRDs7QUFFRDtBQUNBLE1BQUksT0FBTyxXQUFYLEVBQXdCO0FBQ3RCLFdBQU8sV0FBUCxDQUFtQjtBQUNqQixrQkFBWTtBQURLLEtBQW5CO0FBR0Q7QUFDRixDQWJEOztBQWVBOzs7Ozs7Ozs7Ozs7O2tCQ2xDZSxVQUFTLFFBQVQsRUFBa0M7QUFBQSxNQUFmLFNBQWUsdUVBQUgsQ0FBRzs7QUFDL0MsTUFBSSxlQUFlLENBQUMsT0FBTyxPQUFQLElBQWtCLFNBQVMsZUFBVCxDQUF5QixTQUE1QyxJQUEwRCxPQUFPLFdBQVAsSUFBc0IsSUFBSSxTQUExQixDQUE3RTtBQUNBLE1BQUksWUFBWSxvQ0FBcUIsUUFBckIsQ0FBaEI7QUFDQSxTQUFRLGVBQWUsU0FBdkI7QUFDRCxDOztBQVpEOzs7Ozs7Ozs7Ozs7O2tCQ1NlLFlBQWtGO0FBQUEsTUFBekUsWUFBeUUsdUVBQTFELFlBQVcsQ0FBRSxDQUE2QztBQUFBLE1BQTNDLFVBQTJDLHVFQUE5QixZQUFXLENBQUUsQ0FBaUI7QUFBQSxNQUFmLFNBQWUsdUVBQUgsQ0FBRzs7O0FBRS9GLE1BQUksZ0JBQWdCLENBQXBCO0FBQ0EsTUFBSSxlQUFlLEtBQW5COztBQUVBLE1BQUksY0FBYyxTQUFkLFdBQWMsR0FBVztBQUMzQixRQUFJLG1CQUFtQixPQUFPLE9BQTlCOztBQUVBLFFBQUksQ0FBQyxZQUFELElBQ0YsbUJBQW1CLFNBRGpCLElBRUYsbUJBQW9CLGdCQUFnQixFQUZ0QyxFQUUyQztBQUN6QztBQUNBLHFCQUFlLElBQWY7QUFDRCxLQUxELE1BS08sSUFBSSxpQkFDUixvQkFBb0IsU0FBcEIsSUFBaUMsbUJBQW9CLGdCQUFnQixHQUQ3RCxLQUVSLG1CQUFtQixPQUFPLFdBQTFCLEdBQXdDLFNBQVMsSUFBVCxDQUFjLFlBRmxELEVBRWlFO0FBQ3RFO0FBQ0EscUJBQWUsS0FBZjtBQUNEOztBQUVELG9CQUFnQixnQkFBaEI7QUFDRCxHQWhCRDs7QUFrQkEsU0FBTyxnQkFBUCxDQUF3QixRQUF4QixFQUFrQyxxQkFBTSxXQUFOLEVBQW1CLEdBQW5CLENBQWxDO0FBQ0EsV0FBUyxnQkFBVCxDQUEwQixrQkFBMUIsRUFBOEMsV0FBOUM7QUFDRCxDOztBQWxDRDs7Ozs7Ozs7Ozs7OztrQkNTZSxVQUFTLFFBQVQsRUFBa0M7QUFBQSxNQUFmLFNBQWUsdUVBQUgsQ0FBRzs7O0FBRS9DLFNBQU8sSUFBSSxPQUFKLENBQVksVUFBUyxPQUFULEVBQWtCOztBQUVuQyxRQUFJLGVBQWUsd0JBQVMsWUFBVztBQUNyQyxVQUFJLCtCQUFnQixRQUFoQixFQUEwQixTQUExQixDQUFKLEVBQTBDO0FBQ3hDLGVBQU8sbUJBQVAsQ0FBMkIsUUFBM0IsRUFBcUMsWUFBckM7QUFDQSxlQUFPLG1CQUFQLENBQTJCLFFBQTNCLEVBQXFDLFlBQXJDO0FBQ0E7QUFDRDtBQUNGLEtBTmtCLENBQW5COztBQVFBLFdBQU8sZ0JBQVAsQ0FBd0IsUUFBeEIsRUFBa0MsWUFBbEM7QUFDQSxXQUFPLGdCQUFQLENBQXdCLFFBQXhCLEVBQWtDLFlBQWxDO0FBQ0EsYUFBUyxnQkFBVCxDQUEwQixrQkFBMUIsRUFBOEMsWUFBOUM7QUFDQSxlQUFXLFlBQVgsRUFBeUIsQ0FBekI7QUFDRCxHQWRNLENBQVA7QUFlRCxDOztBQTFCRDs7OztBQUNBOzs7Ozs7Ozs7Ozs7O0FDRUE7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7Ozs7QUFUQTs7OztrQkFXZTtBQUNiLDBCQURhO0FBRWIsNEJBRmE7QUFHYiw0QkFIYTtBQUliLHdCQUphO0FBS2Isa0NBTGE7QUFNYjtBQU5hLEM7Ozs7Ozs7OztrQkNSQSxZQUFXOztBQUV4Qix3QkFBZSxXQUFmLEVBQTRCLE9BQTVCLENBQW9DLFVBQVMsa0JBQVQsRUFBNkI7O0FBRS9ELFFBQUksaUJBQWlCLGtCQUFyQjs7QUFFQSxRQUFJLENBQUMsbUJBQW1CLE9BQW5CLENBQTJCLGlCQUEzQixDQUFMLEVBQW9EO0FBQ2xELHVCQUFpQixtQkFBbUIsYUFBbkIsQ0FBaUMsaUJBQWpDLENBQWpCO0FBQ0Q7O0FBRUQsUUFBSSxDQUFDLGNBQUwsRUFBcUI7QUFDbkI7QUFDRDs7QUFFRDtBQUNBLFFBQUksaUJBQWlCLEVBQXJCO0FBQ0EsU0FBSyxJQUFJLEdBQVQsSUFBZ0IsbUJBQW1CLE9BQW5DLEVBQTRDO0FBQzFDLFVBQUksUUFBUSxVQUFSLElBQXNCLElBQUksT0FBSixDQUFZLFVBQVosTUFBNEIsQ0FBdEQsRUFBeUQ7QUFDdkQsWUFBSSxnQkFBZ0IsSUFBSSxPQUFKLENBQVksVUFBWixFQUF3QixFQUF4QixDQUFwQjs7QUFFQSxZQUFJLFdBQVMsT0FBTyxhQUFoQixDQUFKLEVBQW9DO0FBQ2xDLHlCQUFlLElBQWYsQ0FBb0IsYUFBcEI7QUFDRDtBQUNGO0FBQ0Y7O0FBRUQsUUFBSSxlQUFlLE1BQWYsS0FBMEIsQ0FBOUIsRUFBaUM7QUFDL0I7QUFDRDs7QUFFRDtBQUNBLG1CQUFlLGdCQUFmLENBQWdDLE9BQWhDLEVBQXlDLFlBQVc7QUFDbEQsVUFBSSxRQUFRLGVBQWUsS0FBM0I7QUFDQSxVQUFJLFFBQVEsQ0FBQyxlQUFlLElBQWYsQ0FBb0IsVUFBUyxhQUFULEVBQXdCO0FBQzlELFlBQUksQ0FBQyxLQUFELElBQVUsa0JBQWtCLFVBQWhDLEVBQTRDO0FBQzFDLGlCQUFPLEtBQVA7QUFDRDtBQUNNLGVBQU8sQ0FBQyxXQUFTLE9BQU8sYUFBaEIsRUFBK0IsS0FBL0IsQ0FBUjtBQUNELE9BTFksQ0FBYjs7QUFPQSxVQUFJLEtBQUosRUFBVztBQUNoQiwyQkFBbUIsU0FBbkIsQ0FBNkIsR0FBN0IsQ0FBaUMsaUJBQWpDO0FBQ0EsMkJBQW1CLFNBQW5CLENBQTZCLE1BQTdCLENBQW9DLHFCQUFwQztBQUNNLE9BSEQsTUFHTztBQUNaLDJCQUFtQixTQUFuQixDQUE2QixHQUE3QixDQUFpQyxxQkFBakM7QUFDQSwyQkFBbUIsU0FBbkIsQ0FBNkIsTUFBN0IsQ0FBb0MsaUJBQXBDO0FBQ007QUFDRixLQWhCRDtBQWlCRCxHQTlDRDtBQStDRCxDOztBQXBERDs7OztBQUNBOzs7Ozs7Ozs7Ozs7O2tCQ0llLFVBQVMsSUFBVCxFQUFlO0FBQzVCLFNBQU8sQ0FBQyxNQUFNLEtBQUssS0FBTCxDQUFXLElBQVgsQ0FBTixDQUFSO0FBQ0QsQzs7Ozs7Ozs7O2tCQ0ZjLFVBQVMsS0FBVCxFQUFnQjtBQUM3QixNQUFJLEtBQUssaURBQVQ7QUFDQSxTQUFPLEdBQUcsSUFBSCxDQUFRLEtBQVIsQ0FBUDtBQUNELEM7Ozs7Ozs7OztrQkNIYyxVQUFTLEtBQVQsRUFBZ0I7QUFDN0IsTUFBSSxLQUFLLCtEQUFUO0FBQ0EsU0FBTyxVQUFVLEVBQVYsSUFBZ0IsR0FBRyxJQUFILENBQVEsS0FBUixDQUF2QjtBQUNELEM7Ozs7Ozs7OztrQkNIYyxVQUFTLE9BQVQsRUFBa0I7QUFDL0IsTUFBSSxLQUFLLDhCQUFUO0FBQ0EsU0FBTyxHQUFHLElBQUgsQ0FBUSxPQUFSLENBQVA7QUFDRCxDOzs7Ozs7Ozs7a0JDSGMsVUFBUyxLQUFULEVBQWdCO0FBQzdCLFNBQU8sTUFBTSxJQUFOLE9BQWlCLEVBQXhCO0FBQ0QsQzs7Ozs7Ozs7O2tCQ0ZjLFVBQVMsR0FBVCxFQUFjO0FBQzNCLE1BQUksS0FBSyxnRUFBVDtBQUNBLFNBQU8sR0FBRyxJQUFILENBQVEsR0FBUixDQUFQO0FBQ0QsQzs7O0FDUkQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ05BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzlCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3JDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNUQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNOQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNOQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNOQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNOQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNOQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNOQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7a0JDS2UsWUFBVzs7QUFFeEIsTUFBSSxPQUFPLFNBQVMsYUFBVCxDQUF1QixNQUF2QixDQUFYO0FBQ0EsTUFBSSxDQUFDLElBQUwsRUFBVztBQUNUO0FBQ0Q7O0FBRUQsTUFBSSxRQUFRLFNBQVMsYUFBVCxDQUF1QixNQUF2QixDQUFaOztBQUVBO0FBQ0EsTUFBSSxhQUFhLEtBQUssU0FBTCxDQUFlLElBQWYsQ0FBakI7QUFDQSxhQUFXLFNBQVgsQ0FBcUIsR0FBckIsQ0FBeUIsYUFBekI7QUFDQSxRQUFNLFlBQU4sQ0FBbUIsVUFBbkIsRUFBK0IsTUFBTSxVQUFyQzs7QUFFQSxNQUFJLGtCQUFrQixTQUFTLGFBQVQsQ0FBdUIsb0JBQXZCLENBQXRCO0FBQ0EsTUFBSSxlQUFKO0FBQ0EsTUFBSSxlQUFKLEVBQXFCO0FBQ25CLHNCQUFrQixnQkFBZ0IsU0FBaEIsQ0FBMEIsSUFBMUIsQ0FBbEI7QUFDQSxvQkFBZ0IsU0FBaEIsQ0FBMEIsR0FBMUIsQ0FBOEIsMkJBQTlCO0FBQ0EsVUFBTSxZQUFOLENBQW1CLGVBQW5CLEVBQW9DLE1BQU0sVUFBMUM7QUFDRDs7QUFFRDtBQUNBO0FBQ0EsOEJBQWEsWUFBVztBQUN0QixlQUFXLFNBQVgsQ0FBcUIsTUFBckIsQ0FBNEIsYUFBNUI7QUFDQSxRQUFJLGVBQUosRUFBcUI7QUFDbkIsc0JBQWdCLFNBQWhCLENBQTBCLE1BQTFCLENBQWlDLGtDQUFqQztBQUNEO0FBQ0YsR0FMRCxFQUtHLFlBQVc7QUFDWixRQUFJLE9BQU8sT0FBUCxHQUFpQixPQUFPLFdBQTVCLEVBQXlDO0FBQ3ZDLGlCQUFXLFNBQVgsQ0FBcUIsR0FBckIsQ0FBeUIsYUFBekI7QUFDQSxVQUFJLGVBQUosRUFBcUI7QUFDbkIsd0JBQWdCLFNBQWhCLENBQTBCLEdBQTFCLENBQThCLGtDQUE5QjtBQUNEO0FBQ0Y7QUFDRixHQVpEOztBQWNBOzs7O0FBSUEsTUFBSSxRQUFRLFNBQVIsS0FBUSxHQUFXO0FBQ3JCLFFBQUksWUFBWSxPQUFPLE9BQVAsSUFBa0IsU0FBUyxlQUFULENBQXlCLFNBQTNEO0FBQ0EsUUFBSSxhQUFhLENBQWpCLEVBQW9CO0FBQ2xCLGlCQUFXLFNBQVgsQ0FBcUIsR0FBckIsQ0FBeUIsYUFBekI7QUFDQSxpQkFBVyxTQUFYLENBQXFCLE1BQXJCLENBQTRCLGFBQTVCO0FBQ0EsVUFBSSxlQUFKLEVBQXFCO0FBQ25CLHdCQUFnQixTQUFoQixDQUEwQixNQUExQixDQUFpQyxrQ0FBakM7QUFDRDtBQUNGLEtBTkQsTUFNTztBQUNMLGlCQUFXLFNBQVgsQ0FBcUIsTUFBckIsQ0FBNEIsYUFBNUI7QUFDRDtBQUNELFFBQUksZUFBSixFQUFxQjtBQUNuQixVQUFJLFlBQVksZ0JBQWdCLFlBQWhCLEdBQStCLE9BQU8sV0FBdEQ7QUFDQSxVQUFJLCtCQUFnQixlQUFoQixFQUFpQyxDQUFDLENBQUQsR0FBSyxTQUF0QyxDQUFKLEVBQXNEO0FBQ3BELHdCQUFnQixTQUFoQixDQUEwQixHQUExQixDQUE4QixRQUE5QjtBQUNELE9BRkQsTUFFTztBQUNMLHdCQUFnQixTQUFoQixDQUEwQixNQUExQixDQUFpQyxRQUFqQztBQUNEO0FBQ0Y7QUFDRixHQW5CRDs7QUFxQkEsU0FBTyxnQkFBUCxDQUF3QixRQUF4QixFQUFrQyx3QkFBUyxLQUFULENBQWxDO0FBQ0EsU0FBTyxnQkFBUCxDQUF3QixRQUF4QixFQUFrQyx3QkFBUyxLQUFULENBQWxDOztBQUVBO0FBQ0EsbUNBQWMsSUFBZCxDQUFtQixZQUFXO0FBQzVCLDBCQUFPLHFCQUFQLEVBQThCLE9BQTlCLENBQXNDLFVBQVMsT0FBVCxFQUFrQjtBQUN0RCxjQUFRLFNBQVIsR0FBb0IsZ0JBQXBCO0FBQ0QsS0FGRDtBQUdELEdBSkQsRUFJRyxLQUpILENBSVMsWUFBVyxDQUFFLENBSnRCO0FBTUQsQzs7QUEvRUQ7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7Ozs7Ozs7Ozs7OztrQkNtUWUsWUFBVztBQUN6QixpQkFBZ0IsU0FBUyxhQUFULENBQXVCLGtCQUF2QixDQUFoQjs7QUFFQSxLQUFJLENBQUMsYUFBTCxFQUFvQjtBQUNuQjtBQUNBOztBQUVEO0FBQ0EsUUFBTyxjQUFjLGFBQWQsQ0FBNEIsV0FBNUIsQ0FBUDtBQUNBLGtCQUFpQixTQUFTLGFBQVQsQ0FBdUIsa0JBQXZCLENBQWpCO0FBQ0EsZUFBYyxzQkFBTyxXQUFQLEVBQW9CLGFBQXBCLENBQWQ7O0FBRUE7QUFDQSwrQkFBZSxXQUFmLEVBQTRCLGlCQUE1Qjs7QUFFQTtBQUNBOztBQUVBO0FBQ0Esa0NBQWMsSUFBZCxDQUFtQixjQUFuQixFQUFtQyxLQUFuQyxDQUF5QyxZQUFXLENBQUUsQ0FBdEQ7O0FBRUE7QUFDQSxLQUFJLGFBQWEsT0FBYixDQUFxQixVQUFVLE9BQU8sTUFBdEMsQ0FBSixFQUFtRDtBQUNsRDtBQUNBOztBQUVELHVCQUFPLGNBQVAsRUFBdUIsT0FBdkIsQ0FBK0IsZUFBL0I7QUFDQSxNQUFLLGdCQUFMLENBQXNCLE9BQXRCLEVBQStCLGNBQS9COztBQUVBO0FBQ0EsVUFBUyxhQUFULENBQXVCLG1DQUF2QixFQUE0RCxnQkFBNUQsQ0FBNkUsT0FBN0UsRUFBc0YsVUFBUyxDQUFULEVBQVk7QUFDakcsSUFBRSxjQUFGO0FBQ0EsV0FBUyxhQUFULENBQXVCLGtDQUF2QixFQUEyRCxTQUEzRCxDQUFxRSxNQUFyRSxDQUE0RSxRQUE1RTtBQUNBLEVBSEQ7O0FBS0EsdUJBQU8sY0FBUCxFQUF1QixPQUF2QixDQUErQixVQUFTLFlBQVQsRUFBdUI7QUFDckQsTUFBSSxTQUFTLGFBQWEsVUFBYixDQUF3QixhQUF4QixDQUFzQyxpQkFBdEMsQ0FBYjs7QUFFQSxlQUFhLGdCQUFiLENBQThCLE9BQTlCLEVBQXVDLFlBQVc7QUFDakQsVUFBTyxLQUFQO0FBQ0EsR0FGRDs7QUFJQSxTQUFPLGdCQUFQLENBQXdCLE9BQXhCLEVBQWlDLFlBQVc7QUFDM0MsT0FBSSxPQUFPLEtBQVAsS0FBaUIsRUFBckIsRUFBeUI7QUFDeEIsaUJBQWEsU0FBYixDQUF1QixNQUF2QixDQUE4Qix3QkFBOUI7QUFDQSxJQUZELE1BRU87QUFDTixpQkFBYSxTQUFiLENBQXVCLEdBQXZCLENBQTJCLHdCQUEzQjtBQUNBO0FBQ0QsR0FORDtBQU9BLEVBZEQ7QUFnQkEsQzs7QUExVEQ7Ozs7QUFDQTs7OztBQUNBOztJQUFZLEc7O0FBQ1o7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7Ozs7OztBQUVBO0FBQ0EsSUFBSSxhQUFKLEMsQ0FoQkE7Ozs7QUFJQTs7QUFhQSxJQUFJLElBQUo7QUFDQSxJQUFJLFdBQUo7QUFDQSxJQUFJLGNBQUo7QUFDQSxJQUFJLGVBQUo7QUFDQSxJQUFJLGVBQUo7QUFDQSxJQUFJLGtCQUFKO0FBQ0EsSUFBSSxnQkFBSjs7QUFFQSxJQUFJLG9CQUFvQixTQUFwQixpQkFBb0IsQ0FBUyxLQUFULEVBQWdCO0FBQ3ZDLEtBQUksS0FBSixFQUFXO0FBQ1YsT0FBSyxTQUFMLENBQWUsTUFBZixDQUFzQixlQUF0QjtBQUNBLEVBRkQsTUFFTztBQUNOLE9BQUssU0FBTCxDQUFlLEdBQWYsQ0FBbUIsZUFBbkI7QUFDQTtBQUNELENBTkQ7O0FBUUE7OztBQUdBLGtCQUFrQiwyQkFBVztBQUM1Qix1QkFBTyxtQkFBUCxFQUE0QixPQUE1QixDQUFvQyxVQUFTLE9BQVQsRUFBa0I7QUFDckQsVUFBUSxnQkFBUixDQUF5QixPQUF6QixFQUFrQyxVQUFTLENBQVQsRUFBWTtBQUM3QyxLQUFFLGNBQUY7QUFDQSxPQUFJLGNBQUosQ0FBbUIsUUFBUSxPQUFSLENBQWdCLFNBQW5DLEVBQThDLFFBQVEsT0FBUixDQUFnQixJQUE5RCxFQUNFLElBREYsQ0FDTyxVQUFTLElBQVQsRUFBZTtBQUNwQixvQkFBZ0IsS0FBSyxTQUFyQjtBQUNBLHVCQUFtQixLQUFLLFNBQXhCO0FBQ0EsSUFKRjtBQUtBLEdBUEQ7QUFRQSxFQVREO0FBVUEsQ0FYRDs7QUFhQTs7Ozs7O0FBTUEsbUJBQW1CLDBCQUFTLFNBQVQsRUFBb0I7QUFDdEMsS0FBSSxZQUFZLFVBQVUsYUFBVixDQUF3QixzQkFBeEIsQ0FBaEI7QUFDQSxLQUFJLENBQUMsU0FBTCxFQUFnQjtBQUNmO0FBQ0E7QUFDRCxXQUFVLGdCQUFWLENBQTJCLE9BQTNCLEVBQW9DLFVBQVMsQ0FBVCxFQUFZO0FBQy9DLElBQUUsY0FBRjtBQUNBLE1BQUksV0FBVyxVQUFVLGFBQVYsQ0FBd0Isb0JBQXhCLENBQWY7QUFDQSxNQUFJLHFCQUFxQixVQUFVLFVBQW5DOztBQUVBLHFCQUFtQixVQUFuQixDQUE4QixXQUE5QixDQUEwQyxrQkFBMUM7QUFDQSxXQUFTLFVBQVQsQ0FBb0IsV0FBcEIsQ0FBZ0MsUUFBaEM7O0FBRUEsWUFBVSxhQUFWLENBQXdCLGlCQUF4QixFQUEyQyxTQUEzQyxDQUFxRCxNQUFyRCxDQUE0RCxRQUE1RDtBQUNBLEVBVEQ7QUFVQSxDQWZEOztBQWlCQTs7Ozs7OztBQU9BLGtCQUFrQix5QkFBUyxTQUFULEVBQW9CO0FBQ3JDLEtBQUksT0FBTyxFQUFYO0FBQ0EsV0FBVSxPQUFWLENBQWtCLFVBQVMsUUFBVCxFQUFtQjtBQUNwQyxVQUFRLHdCQUFpQixRQUFqQixDQUFSO0FBQ0EsRUFGRDtBQUdBLGdCQUFlLFNBQWYsR0FBMkIsSUFBM0I7QUFDQSx1QkFBVyxDQUFYO0FBQ0E7QUFDQSx1QkFBTyxXQUFQLEVBQW9CLGNBQXBCLEVBQW9DLE9BQXBDLENBQTRDLGdCQUE1QztBQUNBLENBVEQ7O0FBV0E7Ozs7QUFJQSxxQkFBcUIsNEJBQVMsU0FBVCxFQUFvQjtBQUN4Qyx1QkFBTyxtQkFBUCxFQUE0QixPQUE1QixDQUFvQyxVQUFTLFVBQVQsRUFBcUI7QUFDeEQsYUFBVyxTQUFYLEdBQXVCLFVBQVUsTUFBakM7QUFDQSxFQUZEO0FBR0EsQ0FKRDs7QUFNQTs7OztBQUlBLElBQUksaUJBQWlCLFNBQWpCLGNBQWlCLENBQVMsS0FBVCxFQUFnQjtBQUNwQyx1QkFBTyxlQUFQLEVBQXdCLE9BQXhCLENBQWdDLFVBQVMsTUFBVCxFQUFpQjtBQUNoRCxNQUFJLENBQUMsTUFBTSxLQUFOLENBQUwsRUFBbUI7QUFDbEIsVUFBTyxTQUFQLEdBQW1CLEtBQW5CO0FBQ0EsR0FGRCxNQUVPLElBQUksTUFBTSxPQUFPLFNBQWIsQ0FBSixFQUE2QjtBQUNuQyxVQUFPLFNBQVAsR0FBbUIsQ0FBbkI7QUFDQSxHQUZNLE1BRUE7QUFDTixVQUFPLFNBQVAsR0FBbUIsU0FBUyxPQUFPLFNBQWhCLElBQTZCLENBQWhEO0FBQ0E7QUFDRCxFQVJEO0FBU0EsQ0FWRDs7QUFZQTs7Ozs7QUFLQSxJQUFJLGFBQWEsU0FBYixVQUFhLEdBQVc7QUFDM0IsS0FBSSxPQUFKLEdBQWMsSUFBZCxDQUFtQixVQUFTLElBQVQsRUFBZTtBQUNqQyxrQkFBZ0IsS0FBSyxTQUFyQjtBQUNBLHFCQUFtQixLQUFLLFNBQXhCO0FBQ0EsaUJBQWUsS0FBSyxLQUFwQjtBQUNBLEVBSkQ7QUFLQSxDQU5EOztBQVFBOzs7Ozs7QUFNQSxJQUFJLGlCQUFpQixTQUFqQixjQUFpQixDQUFTLENBQVQsRUFBWTtBQUNoQyxHQUFFLGNBQUY7O0FBRUEsS0FBSSxXQUFXLFNBQVMsYUFBVCxDQUF1QixNQUF2QixFQUErQixTQUEvQixDQUF5QyxRQUF6QyxDQUFrRCxnQkFBbEQsQ0FBZjs7QUFFQTtBQUNBLEtBQUksV0FBVyxZQUFZLElBQVosQ0FBaUIsVUFBUyxVQUFULEVBQXFCO0FBQ3BELE1BQUksV0FBVyxTQUFYLENBQXFCLFFBQXJCLENBQThCLHFCQUE5QixDQUFKLEVBQTBEO0FBQ3pELE9BQUksaUJBQWlCLFdBQVcsYUFBWCxDQUF5QixpQkFBekIsQ0FBckI7QUFDQSxrQkFBZSxLQUFmO0FBQ0EsVUFBTyxJQUFQO0FBQ0E7QUFDRCxFQU5jLENBQWY7O0FBUUEsS0FBSSxRQUFKLEVBQWM7QUFDYjtBQUNBOztBQUVEO0FBQ0EsS0FBSSxXQUFXLEVBQWY7QUFDQSx1QkFBTyxpQkFBUCxFQUEwQixhQUExQixFQUF5QyxPQUF6QyxDQUFpRCxVQUFTLE1BQVQsRUFBaUI7QUFDakUsTUFBSSxPQUFPLE9BQU8sWUFBUCxDQUFvQixNQUFwQixDQUFYO0FBQ0EsTUFBSSxPQUFPLEtBQVgsRUFBa0I7QUFDakIsWUFBUyxJQUFULElBQWlCLE9BQU8sS0FBeEI7QUFDQTtBQUNELEVBTEQ7O0FBT0EsTUFBSyxTQUFMLEdBQWlCLFlBQWpCO0FBQ0EsTUFBSyxTQUFMLENBQWUsR0FBZixDQUFtQixlQUFuQjtBQUNBLEtBQUksV0FBSixDQUFnQixRQUFoQixFQUEwQixJQUExQixDQUErQixVQUFTLElBQVQsRUFBZTtBQUM3QyxrQkFBZ0IsS0FBSyxTQUFyQjtBQUNBLHFCQUFtQixLQUFLLFNBQXhCOztBQUVBO0FBQ0EsTUFBSSxnQkFBZ0IsZUFBZSxhQUFmLENBQTZCLHNCQUE3QixDQUFwQjtBQUNBLE1BQUksU0FBUyxvQ0FBVSxhQUFWLENBQWI7QUFDQSxTQUFPLFFBQVAsQ0FBZ0IsQ0FBaEIsRUFBbUIsU0FBVSxNQUFNLE9BQU8sV0FBMUM7O0FBRUE7QUFDQSxPQUFLLFNBQUwsR0FBaUIsU0FBakI7QUFDQSxNQUFJLFFBQUosRUFBYztBQUNiLE9BQUksUUFBUSxjQUFjLGFBQWQsQ0FBNEIsdUJBQTVCLENBQVo7QUFDQSxTQUFNLFNBQU4sQ0FBZ0IsR0FBaEIsQ0FBb0IscUJBQXBCO0FBQ0EsU0FBTSxTQUFOLENBQWdCLE1BQWhCLENBQXVCLGlCQUF2QjtBQUNBLFNBQU0sYUFBTixDQUFvQixVQUFwQixFQUFnQyxLQUFoQyxHQUF3QyxFQUF4QztBQUNBLFNBQU0sYUFBTixDQUFvQixjQUFwQixFQUFvQyxTQUFwQyxDQUE4QyxNQUE5QyxDQUFxRCx3QkFBckQ7QUFDQSxHQU5ELE1BTU87QUFDTixlQUFZLE9BQVosQ0FBb0IsVUFBUyxVQUFULEVBQXFCO0FBQ3hDLFFBQUksV0FBVyxPQUFYLENBQW1CLGdCQUFuQixLQUF3QyxTQUE1QyxFQUF1RDtBQUN0RCxnQkFBVyxTQUFYLENBQXFCLEdBQXJCLENBQXlCLHFCQUF6QjtBQUNBLGdCQUFXLFNBQVgsQ0FBcUIsTUFBckIsQ0FBNEIsaUJBQTVCO0FBQ0E7QUFDRCxlQUFXLGFBQVgsQ0FBeUIsaUJBQXpCLEVBQTRDLEtBQTVDLEdBQW9ELEVBQXBEO0FBQ0EsZUFBVyxhQUFYLENBQXlCLGNBQXpCLEVBQXlDLFNBQXpDLENBQW1ELE1BQW5ELENBQTBELHdCQUExRDtBQUNBLElBUEQ7QUFRQTtBQUNELEVBM0JEO0FBNkJBLENBMUREOztBQTREQTs7OztBQUlBLElBQUksUUFBUSxTQUFSLEtBQVEsR0FBVztBQUN0QixLQUFJLGVBQWUsU0FBUyxhQUFULENBQXVCLHNCQUF2QixDQUFuQjtBQUNBLGNBQWEsWUFBYixDQUEwQixLQUExQixFQUFpQywyQ0FBakM7QUFDQSxjQUFhLFlBQWIsQ0FBMEIsVUFBMUIsRUFBc0MsMkNBQXRDOztBQUVBLHVCQUFPLHlCQUFQLEVBQWtDLE9BQWxDLENBQTBDLFVBQVMsV0FBVCxFQUFzQjtBQUMvRCxjQUFZLFlBQVosQ0FBeUIsS0FBekIsRUFBZ0MsMkNBQWhDO0FBQ0EsY0FBWSxZQUFaLENBQXlCLFVBQXpCLEVBQXFDLDJDQUFyQztBQUNBLEVBSEQ7O0FBS0E7QUFDQSx1QkFBTyxjQUFQLEVBQXVCLE9BQXZCLENBQStCO0FBQUEsU0FBUyxNQUFNLFNBQU4sQ0FBZ0IsR0FBaEIsQ0FBb0IsVUFBcEIsQ0FBVDtBQUFBLEVBQS9CO0FBQ0EsQ0FaRDs7QUFjQTs7Ozs7QUFLQSxJQUFJLGtCQUFrQixTQUFsQixlQUFrQixDQUFTLE9BQVQsRUFBa0I7QUFDdkMsU0FBUSxnQkFBUixDQUF5QixPQUF6QixFQUFrQyxVQUFTLENBQVQsRUFBWTtBQUM3QyxJQUFFLGNBQUY7O0FBRUE7QUFDQSxNQUFJLGFBQWEsT0FBYixDQUFxQixVQUFVLE9BQU8sTUFBdEMsQ0FBSixFQUFtRDtBQUNsRDtBQUNBOztBQUVELGVBQWEsT0FBYixDQUFxQixVQUFVLE9BQU8sTUFBdEMsRUFBOEMsSUFBOUM7QUFDQTtBQUNBO0FBQ0EsTUFBSSxJQUFKO0FBQ0EsRUFaRDtBQWFBLENBZEQ7O0FBZ0JBOzs7Ozs7QUFNQSxJQUFJLGlCQUFpQixTQUFqQixjQUFpQixDQUFTLElBQVQsRUFBZTtBQUNuQyxLQUFJLE9BQU8sNEJBQWlCLElBQWpCLENBQVg7QUFDQSxLQUFJLFFBQVEsU0FBUyxhQUFULENBQXVCLEtBQXZCLENBQVo7QUFDQSxPQUFNLFNBQU4sR0FBa0IsSUFBbEI7QUFDQSxLQUFJLFVBQVUsU0FBUyxhQUFULENBQXVCLHFCQUF2QixDQUFkOztBQUVBO0FBQ0EsdUJBQU8sd0JBQVAsRUFBaUMsT0FBakMsQ0FBeUMsVUFBUyxNQUFULEVBQWlCO0FBQ3pELE1BQUksT0FBTyxPQUFPLFlBQVAsQ0FBb0IsTUFBcEIsQ0FBWDtBQUNBLE1BQUksU0FBUyxTQUFiLEVBQXdCO0FBQ3ZCLFVBQU8sS0FBUCxHQUFlLGFBQWEsS0FBSyxJQUFqQztBQUNBLEdBRkQsTUFFTztBQUNOLFVBQU8sS0FBUCxHQUFlLEtBQUssSUFBTCxDQUFmO0FBQ0E7QUFDRCxTQUFPLFVBQVAsQ0FBa0IsU0FBbEIsQ0FBNEIsR0FBNUIsQ0FBZ0MsaUJBQWhDO0FBQ0EsU0FBTyxVQUFQLENBQWtCLFNBQWxCLENBQTRCLE1BQTVCLENBQW1DLHFCQUFuQztBQUNBLEVBVEQ7O0FBV0E7QUFDQSxTQUFRLFVBQVIsQ0FBbUIsWUFBbkIsQ0FBZ0MsS0FBaEMsRUFBdUMsUUFBUSxXQUEvQztBQUNBLHVCQUFXLENBQVg7QUFDQSx5QkFBYSxXQUFiLEVBQTBCLGlCQUExQjtBQUNBLENBdEJEOztBQXdCQTs7Ozs7Ozs7Ozs7O2tCQzlLZSxZQUFXOztBQUV6QixnQkFBZSxTQUFTLGFBQVQsQ0FBdUIsZ0JBQXZCLENBQWY7QUFDQSxlQUFjLFNBQVMsYUFBVCxDQUF1QixlQUF2QixDQUFkOztBQUVBLEtBQUksQ0FBQyxZQUFELElBQWlCLENBQUMsV0FBdEIsRUFBbUM7QUFDbEM7QUFDQTtBQUNELGNBQWEsZ0JBQWIsQ0FBOEIsT0FBOUIsRUFBdUMsWUFBVztBQUNqRCxTQUFPLGFBQWEsS0FBcEI7QUFDQSxFQUZEOztBQUlBLGNBQWEsS0FBYjs7QUFFQSxhQUFZLFlBQVosQ0FBeUIsT0FBekIsbUJBQWlELE9BQU8sV0FBeEQ7QUFFQSxDOztBQTFHRDs7OztBQUNBOzs7O0FBQ0E7O0lBQVksRzs7QUFDWjs7OztBQUNBOzs7O0FBQ0E7Ozs7Ozs7O0FBRUEsSUFBTSxjQUFjLEVBQXBCOztBQUVBLElBQUksWUFBSjtBQUNBLElBQUksV0FBSjtBQUNBLElBQUksZ0JBQWdCLENBQXBCOztBQUVBLElBQUksa0JBQWtCLFNBQWxCLGVBQWtCLENBQVMsSUFBVCxFQUFlO0FBQ3BDLEtBQUksV0FBVyxPQUFPLEtBQVAsQ0FBYSxHQUFiLENBQWlCLEdBQWpCLENBQXFCLElBQXJCLEVBQTJCO0FBQ3pDLFdBQVM7QUFEZ0MsRUFBM0IsQ0FBZjtBQUdBLEtBQUksV0FBVyxTQUFTLE1BQVQsQ0FBZ0IsU0FBUyxPQUFULENBQWlCLFFBQWpCLENBQWhCLEVBQTRDLFNBQVMsTUFBckQsQ0FBZjtBQUNBLFFBQU8sTUFBTSxRQUFOLEVBQ0wsSUFESyxDQUNBLFVBQVMsUUFBVCxFQUFtQjtBQUN4QixNQUFJLFNBQVMsTUFBVCxJQUFtQixHQUF2QixFQUE0QjtBQUMzQixVQUFPLFFBQVEsTUFBUixDQUFlLFFBQWYsQ0FBUDtBQUNBO0FBQ0QsU0FBTyxRQUFQO0FBQ0EsRUFOSyxFQU9MLElBUEssQ0FPQTtBQUFBLFNBQVksU0FBUyxJQUFULEVBQVo7QUFBQSxFQVBBLENBQVA7QUFRQSxDQWJEOztBQWVBLElBQUksZ0JBQWdCLFNBQWhCLGFBQWdCLENBQVMsT0FBVCxFQUFrQjtBQUNyQyxLQUFJLE9BQU8sUUFBUSxHQUFSLENBQVksVUFBUyxNQUFULEVBQWlCO0FBQ3ZDLE1BQUksT0FBTyxLQUFYLEVBQWtCO0FBQ2pCLFVBQU8sb0JBQWEsT0FBTyxLQUFQLENBQWEsQ0FBYixDQUFiLENBQVA7QUFDQTtBQUNELE1BQUksT0FBTyxLQUFYLEVBQWtCO0FBQ2pCLFVBQU8sc0JBQWUsT0FBTyxLQUFQLENBQWEsQ0FBYixDQUFmLENBQVA7QUFDQTtBQUNELE1BQUksT0FBTyxJQUFYLEVBQWlCO0FBQ2hCLFVBQU8sbUJBQVksT0FBTyxJQUFQLENBQVksQ0FBWixDQUFaLENBQVA7QUFDQTtBQUNELFNBQU8sRUFBUDtBQUNBLEVBWFUsRUFXUixJQVhRLENBV0gsRUFYRyxDQUFYO0FBWUEsYUFBWSxTQUFaLEdBQXdCLElBQXhCO0FBQ0EsdUJBQVcsQ0FBWDtBQUNBLHVCQUFPLGNBQVAsRUFBdUIsV0FBdkIsRUFBb0MsT0FBcEMsQ0FBNEMsVUFBUyxRQUFULEVBQW1CLENBQW5CLEVBQXNCO0FBQ2pFLGFBQVcsWUFBVztBQUNyQixZQUFTLFNBQVQsQ0FBbUIsTUFBbkIsQ0FBMEIsUUFBMUI7QUFDQSxjQUFXO0FBQUEsV0FBTSxTQUFTLFNBQVQsQ0FBbUIsR0FBbkIsQ0FBdUIsaUJBQXZCLENBQU47QUFBQSxJQUFYLEVBQTRELENBQTVEO0FBQ0EsR0FIRCxFQUdHLElBQUksR0FIUDtBQUlBLEVBTEQ7QUFNQSxDQXJCRDs7QUF1QkEsSUFBSSxTQUFTLFNBQVQsTUFBUyxDQUFTLEtBQVQsRUFBZ0I7O0FBRTVCLEtBQUksS0FBSyxFQUFFLGFBQVg7QUFDQSxLQUFJLFVBQVUsS0FBSyxHQUFMLEtBQWEsR0FBM0I7O0FBRUEsYUFBWSxTQUFaLEdBQXdCLEVBQXhCOztBQUVBLEtBQUksV0FBVyxTQUFYLFFBQVcsQ0FBUyxJQUFULEVBQWU7QUFDN0IsTUFBSSxPQUFPLGFBQVgsRUFBMEI7QUFDekIsVUFBTyxRQUFRLE1BQVIsRUFBUDtBQUNBO0FBQ0QsU0FBTyxJQUFQO0FBQ0EsRUFMRDs7QUFPQSxLQUFJLGNBQUosQ0FBbUIsS0FBbkIsRUFDRSxJQURGLENBQ08sUUFEUCxFQUVFLElBRkYsQ0FFTyxVQUFTLE9BQVQsRUFBa0I7QUFDdkIsTUFBSSxXQUFXLFFBQVEsS0FBUixDQUFjLENBQWQsRUFBaUIsV0FBakIsRUFBOEIsR0FBOUIsQ0FBa0MsVUFBUyxLQUFULEVBQWdCO0FBQ2hFLFVBQU8sZ0JBQWdCLE1BQU0sR0FBdEIsQ0FBUDtBQUNBLEdBRmMsQ0FBZjtBQUdBLFNBQU8sUUFBUSxHQUFSLENBQVksUUFBWixDQUFQO0FBQ0EsRUFQRixFQVFFLElBUkYsQ0FRTyxVQUFTLElBQVQsRUFBZTtBQUNwQixNQUFJLFVBQVUsS0FBSyxHQUFMLEVBQWQsRUFBMEI7QUFDekIsVUFBTyxJQUFQO0FBQ0E7QUFDRCxTQUFPLElBQUksT0FBSixDQUFZLFVBQVMsT0FBVCxFQUFrQjtBQUNwQyxjQUFXO0FBQUEsV0FBTSxRQUFRLElBQVIsQ0FBTjtBQUFBLElBQVgsRUFBZ0MsVUFBVSxLQUFLLEdBQUwsRUFBMUM7QUFDQSxHQUZNLENBQVA7QUFHQSxFQWZGLEVBZ0JFLElBaEJGLENBZ0JPLFFBaEJQLEVBaUJFLElBakJGLENBaUJPLGFBakJQLEVBa0JFLEtBbEJGLENBa0JRLFVBQVMsR0FBVCxFQUFjO0FBQ3BCLE1BQUksR0FBSixFQUFTO0FBQ1IsV0FBUSxLQUFSLENBQWMsR0FBZDtBQUNBO0FBQ0QsRUF0QkY7QUF1QkEsQ0FyQ0Q7Ozs7Ozs7OztrQkNnQ2UsWUFBVztBQUN6QixnQkFBZSxTQUFTLGFBQVQsQ0FBdUIsVUFBdkIsQ0FBZjtBQUNBLFlBQVcsU0FBUyxhQUFULENBQXVCLFdBQXZCLENBQVg7O0FBRUEsS0FBSSxDQUFDLFlBQUQsSUFBaUIsQ0FBQyxRQUF0QixFQUFnQztBQUMvQjtBQUNBOztBQUVELGlCQUFnQixTQUFTLGFBQVQsQ0FBdUIsa0JBQXZCLENBQWhCO0FBQ0EsUUFBTyxjQUFjLGFBQWQsQ0FBNEIsV0FBNUIsQ0FBUDs7QUFFQSxZQUFXLFNBQVMsYUFBVCxDQUF1QixvQkFBdkIsQ0FBWDs7QUFFQSxVQUFTLGdCQUFULENBQTBCLFNBQTFCLEVBQXFDLFlBQXJDO0FBQ0EsVUFBUyxnQkFBVCxDQUEwQixPQUExQixFQUFtQyxZQUFuQzs7QUFFQTtBQUNBO0FBQ0EsS0FBSSxnQkFBZ0IsU0FBUyxhQUFULENBQXVCLDJCQUF2QixDQUFwQjtBQUNBLFVBQVMsYUFBVCxDQUF1QixxQkFBdkIsRUFBOEMsZ0JBQTlDLENBQStELE9BQS9ELEVBQXdFLFVBQVMsQ0FBVCxFQUFZO0FBQ25GLElBQUUsY0FBRjtBQUNBLE1BQUksa0JBQWtCLGlCQUF0QjtBQUNBLGdCQUFjLEtBQWQsVUFBMkIsZUFBM0I7QUFHQSxnQkFBYyxLQUFkO0FBQ0EsZ0JBQWMsVUFBZCxDQUF5QixTQUF6QixDQUFtQyxHQUFuQyxDQUF1QyxpQkFBdkM7QUFDQSxnQkFBYyxVQUFkLENBQXlCLFNBQXpCLENBQW1DLE1BQW5DLENBQTBDLHFCQUExQztBQUNBLGdCQUFjLFVBQWQsQ0FBeUIsYUFBekIsQ0FBdUMsY0FBdkMsRUFBdUQsU0FBdkQsQ0FBaUUsR0FBakUsQ0FBcUUsd0JBQXJFO0FBQ0EsTUFBSSxRQUFRLHdCQUFhLHNCQUFPLFdBQVAsRUFBb0IsYUFBcEIsQ0FBYixDQUFaO0FBQ0EsTUFBSSxLQUFKLEVBQVc7QUFDVixRQUFLLFNBQUwsQ0FBZSxNQUFmLENBQXNCLGVBQXRCO0FBQ0EsR0FGRCxNQUVPO0FBQ04sUUFBSyxTQUFMLENBQWUsR0FBZixDQUFtQixlQUFuQjtBQUNBO0FBQ0QsRUFoQkQ7QUFpQkEsQzs7QUFsSEQ7Ozs7QUFDQTs7Ozs7O0FBRUE7QUFSQTs7Ozs7QUFTQSxJQUFJLFlBQUo7QUFDQSxJQUFJLFFBQUo7QUFDQSxJQUFJLFFBQUo7QUFDQSxJQUFJLGFBQUo7QUFDQSxJQUFJLElBQUo7O0FBR0E7Ozs7QUFJQSxJQUFJLGtCQUFrQixTQUFsQixlQUFrQixHQUFXO0FBQ2hDLEtBQUksT0FBTyxFQUFYO0FBQ0EsS0FBSSxPQUFPLE9BQU8sWUFBZCxLQUErQixXQUFuQyxFQUFnRDtBQUMvQyxTQUFPLE9BQU8sWUFBUCxHQUFzQixRQUF0QixFQUFQO0FBQ0EsRUFGRCxNQUVPLElBQUksT0FBTyxTQUFTLFNBQWhCLEtBQThCLFdBQTlCLElBQTZDLFNBQVMsU0FBVCxDQUFtQixJQUFuQixLQUE0QixNQUE3RSxFQUFxRjtBQUMzRixTQUFPLFNBQVMsU0FBVCxDQUFtQixXQUFuQixHQUFpQyxJQUF4QztBQUNBO0FBQ0QsUUFBTyxJQUFQO0FBQ0EsQ0FSRDs7QUFVQTs7Ozs7QUFLQSxJQUFJLGtCQUFrQixTQUFsQixlQUFrQixDQUFTLFNBQVQsRUFBb0I7QUFDekMsS0FBSSxhQUFhLFVBQVUsVUFBVixDQUFxQixhQUF0Qzs7QUFFQSxRQUFPLGVBQWUsWUFBZixJQUErQixXQUFXLFVBQWpELEVBQTZEO0FBQzVELGVBQWEsV0FBVyxVQUF4QjtBQUNBOztBQUVELFFBQVEsZUFBZSxZQUF2QjtBQUVBLENBVEQ7O0FBV0E7Ozs7QUFJQSxJQUFJLGVBQWUsU0FBZixZQUFlLEdBQVc7O0FBRTdCO0FBQ0EsWUFBVyxZQUFXOztBQUVyQixNQUFJLGtCQUFrQixpQkFBdEI7O0FBRUE7QUFDQSxNQUFJLENBQUMsZUFBTCxFQUFzQjtBQUNyQixZQUFTLFNBQVQsQ0FBbUIsTUFBbkIsQ0FBMEIsbUJBQTFCO0FBQ0E7QUFDQTs7QUFFRDtBQUNBLE1BQUksWUFBWSxPQUFPLFlBQVAsRUFBaEI7QUFDQSxNQUFJLENBQUMsZ0JBQWdCLFNBQWhCLENBQUwsRUFBaUM7QUFDaEMsWUFBUyxTQUFULENBQW1CLE1BQW5CLENBQTBCLG1CQUExQjtBQUNBO0FBQ0E7O0FBRUQ7QUFDQSxXQUFTLFlBQVQsQ0FBc0IsTUFBdEIsNkNBQXVFLG1CQUFtQixlQUFuQixDQUF2RSxhQUFrSCxtQkFBbUIsU0FBUyxPQUFULENBQWlCLEdBQXBDLENBQWxIOztBQUVBO0FBQ0EsTUFBSSxpQkFBa0IsT0FBTyxPQUFQLElBQWtCLFNBQVMsZUFBVCxDQUF5QixTQUFqRTtBQUNBLE1BQUksUUFBUSxVQUFVLFVBQVYsQ0FBcUIsQ0FBckIsQ0FBWjtBQUNBLE1BQUksT0FBTyxNQUFNLHFCQUFOLEVBQVg7QUFDQSxXQUFTLEtBQVQsQ0FBZSxHQUFmLEdBQXNCLEtBQUssR0FBTCxHQUFXLGNBQVosR0FBOEIsSUFBbkQ7QUFDQSxXQUFTLFNBQVQsQ0FBbUIsR0FBbkIsQ0FBdUIsbUJBQXZCO0FBQ0EsV0FBUyxLQUFULENBQWUsSUFBZixHQUF1QixNQUFNLEtBQUssSUFBWCxHQUFrQixNQUFNLEtBQUssS0FBN0IsR0FBcUMsTUFBTSxTQUFTLFdBQXJELEdBQW9FLElBQTFGO0FBQ0EsRUEzQkQsRUEyQkcsRUEzQkg7QUE0QkEsQ0EvQkQ7Ozs7Ozs7O0FDbERBOzs7OztBQUtBLElBQUksU0FBUyxPQUFPLE1BQXBCO0FBQ0EsSUFBSSxLQUFLLE9BQU8sTUFBaEI7O0FBRUE7Ozs7Ozs7QUFPQSxJQUFJLFVBQVUsU0FBVixPQUFVLEdBQWlEO0FBQUEsTUFBeEMsSUFBd0MsdUVBQWpDLEVBQWlDO0FBQUEsTUFBN0IsTUFBNkIsdUVBQXBCLEtBQW9CO0FBQUEsTUFBYixJQUFhLHVFQUFOLElBQU07OztBQUU3RCxNQUFJLGVBQWU7QUFDakIsa0JBRGlCO0FBRWpCLGFBQVM7QUFDUCxzQkFBZ0I7QUFEVDtBQUZRLEdBQW5COztBQU9BLE1BQUksSUFBSixFQUFVO0FBQ1IsaUJBQWEsSUFBYixHQUFvQixLQUFLLFNBQUwsQ0FBZSxJQUFmLENBQXBCO0FBQ0Q7O0FBRUQ7QUFDQSxTQUFPLE1BQU0sU0FBUyxJQUFmLEVBQXFCLFlBQXJCLEVBQ0osSUFESSxDQUNDLFVBQVMsUUFBVCxFQUFtQjtBQUN2QixRQUFJLFNBQVMsTUFBVCxJQUFtQixHQUF2QixFQUE0QjtBQUMxQixhQUFPLFFBQVEsTUFBUixDQUFlLFFBQWYsQ0FBUDtBQUNEO0FBQ0QsV0FBTyxRQUFQO0FBQ0QsR0FOSSxFQU9KLElBUEksQ0FPQztBQUFBLFdBQVksU0FBUyxJQUFULEVBQVo7QUFBQSxHQVBELENBQVA7QUFRRCxDQXRCRDs7QUF3QkE7Ozs7OztBQU1PLElBQUksNEJBQVUsU0FBVixPQUFVLENBQVMsR0FBVCxFQUFjO0FBQ2pDLE1BQUksUUFBUSxTQUFTLEVBQXJCO0FBQ0EsTUFBSSxHQUFKLEVBQVM7QUFDUCxhQUFTLE1BQVQ7QUFDRDtBQUNELFNBQU8sUUFBUSxLQUFSLEVBQ0osS0FESSxDQUNFLFlBQVc7QUFDaEIsV0FBTyxRQUFRLEVBQVIsRUFBWSxNQUFaLEVBQW9CO0FBQ3pCLGlCQUFXLEVBRGM7QUFFekIsYUFBTyxDQUZrQjtBQUd6QjtBQUh5QixLQUFwQixDQUFQO0FBS0QsR0FQSSxDQUFQO0FBUUQsQ0FiTTs7QUFlQSxJQUFJLDBDQUFpQixTQUFqQixjQUFpQixDQUFTLEtBQVQsRUFBZ0I7QUFDMUMsU0FBTyxRQUFRLGNBQWMsS0FBdEIsQ0FBUDtBQUNELENBRk07O0FBSVA7Ozs7QUFJTyxJQUFJLHNCQUFPLFNBQVAsSUFBTyxHQUFXO0FBQzNCLFNBQU8sUUFBUSxFQUFSLEVBQVksSUFBWixFQUNKLElBREksQ0FDQyxVQUFTLElBQVQsRUFBZTtBQUNuQixXQUFPLFFBQVEsU0FBUyxFQUFqQixFQUFxQixLQUFyQixFQUE0QjtBQUNqQyxhQUFPLEtBQUssS0FBTCxHQUFhO0FBRGEsS0FBNUIsQ0FBUDtBQUdELEdBTEksQ0FBUDtBQU1ELENBUE07O0FBU1A7Ozs7QUFJTyxJQUFJLGdEQUFvQixTQUFwQixpQkFBb0IsQ0FBUyxXQUFULEVBQXNCO0FBQ25ELE1BQUksQ0FBQyxFQUFMLEVBQVM7QUFDUCxXQUFPLFFBQVEsTUFBUixDQUFlLElBQUksS0FBSixDQUFVLFdBQVYsQ0FBZixDQUFQO0FBQ0Q7QUFDRCxTQUFPLFFBQVEsU0FBUyxFQUFqQixFQUFxQixLQUFyQixFQUE0QjtBQUNqQztBQURpQyxHQUE1QixDQUFQO0FBR0QsQ0FQTTs7QUFTUDs7Ozs7QUFLTyxJQUFJLG9DQUFjLFNBQWQsV0FBYyxDQUFTLFFBQVQsRUFBbUI7QUFDMUMsU0FBTyxRQUFRLElBQVIsRUFDSixJQURJLENBQ0MsVUFBUyxJQUFULEVBQWU7O0FBRW5CO0FBQ0EsYUFBUyxTQUFULEdBQXFCLElBQUksSUFBSixHQUFXLFdBQVgsRUFBckI7O0FBRUE7QUFDQSxTQUFLLFNBQUwsQ0FBZSxJQUFmLENBQW9CLFFBQXBCO0FBQ0EsV0FBTyxRQUFRLFNBQVMsRUFBakIsRUFBcUIsS0FBckIsRUFBNEI7QUFDakMsaUJBQVcsS0FBSztBQURpQixLQUE1QixDQUFQO0FBR0QsR0FYSSxDQUFQO0FBWUQsQ0FiTTs7QUFlUDs7Ozs7O0FBTU8sSUFBSSwwQ0FBaUIsU0FBakIsY0FBaUIsQ0FBUyxTQUFULEVBQW9CLElBQXBCLEVBQTBCO0FBQ3BELFNBQU8sUUFBUSxJQUFSLEVBQ0osSUFESSxDQUNDLFVBQVMsSUFBVCxFQUFlOztBQUVuQjtBQUNBLFFBQUksWUFBWSxLQUFLLFNBQUwsQ0FBZSxNQUFmLENBQXNCLFVBQVMsUUFBVCxFQUFtQjtBQUN2RCxhQUFRLFNBQVMsU0FBVCxLQUF1QixTQUF2QixJQUFvQyxTQUFTLElBQVQsS0FBa0IsSUFBOUQ7QUFDRCxLQUZlLENBQWhCOztBQUlBLFdBQU8sUUFBUSxTQUFTLEVBQWpCLEVBQXFCLEtBQXJCLEVBQTRCO0FBQ2pDO0FBRGlDLEtBQTVCLENBQVA7QUFHRCxHQVhJLENBQVA7QUFZRCxDQWJNOzs7Ozs7Ozs7a0JDN0dRLFVBQVMsV0FBVCxFQUFzQixRQUF0QixFQUFnQztBQUM5QyxhQUFZLE9BQVosQ0FBb0IsVUFBUyxrQkFBVCxFQUE2QjtBQUNoRCxNQUFJLGlCQUFpQixtQkFBbUIsYUFBbkIsQ0FBaUMsaUJBQWpDLENBQXJCOztBQUVBLGlCQUFlLGdCQUFmLENBQWdDLE9BQWhDLEVBQXlDLFlBQVc7QUFDbkQsT0FBSSxRQUFRLHdCQUFhLFdBQWIsQ0FBWjtBQUNBLFlBQVMsS0FBVDtBQUNBLEdBSEQ7QUFJQSxFQVBEO0FBUUEsQzs7QUFYRDs7Ozs7Ozs7Ozs7OztrQkNEZSxVQUFTLFdBQVQsRUFBc0I7QUFDcEMsS0FBSSxXQUFXLFlBQVksSUFBWixDQUFpQixVQUFTLFVBQVQsRUFBcUI7QUFDcEQsTUFBSSxXQUFXLE9BQVgsQ0FBbUIsZ0JBQW5CLEtBQXdDLFNBQTVDLEVBQXVEO0FBQ3RELFVBQU8sQ0FBQyxXQUFXLFNBQVgsQ0FBcUIsUUFBckIsQ0FBOEIsaUJBQTlCLENBQVI7QUFDQSxHQUZELE1BRU87QUFDTixVQUFPLFdBQVcsU0FBWCxDQUFxQixRQUFyQixDQUE4QixxQkFBOUIsQ0FBUDtBQUNBO0FBQ0QsRUFOYyxDQUFmOztBQVFBLFFBQU8sQ0FBQyxRQUFSO0FBQ0EsQzs7Ozs7Ozs7O2tCQzBDYyxZQUFXOztBQUV6QjtBQUNBLEtBQUksQ0FBQyxXQUFMLEVBQWtCO0FBQ2pCLGdCQUFjLEtBQWQ7QUFDQTtBQUNELFFBQU8sV0FBUDtBQUNBLEM7O0FBL0REOzs7OztBQUtBO0FBQ0EsSUFBSSxXQUFKOztBQUVBOzs7OztBQUtBLElBQUksY0FBYyxTQUFkLFdBQWMsQ0FBUyxLQUFULEVBQWdCO0FBQ2pDLFFBQU8sTUFBTSxvREFBTixFQUE0RDtBQUNsRSxVQUFRLEtBRDBEO0FBRWxFLFdBQVM7QUFDUixvQkFBaUIsWUFBWTtBQURyQjtBQUZ5RCxFQUE1RCxFQUtKLElBTEksQ0FLQyxVQUFTLFFBQVQsRUFBbUI7QUFDMUIsTUFBSSxTQUFTLE1BQVQsS0FBb0IsR0FBeEIsRUFBNkI7QUFDNUIsVUFBTyxRQUFRLE1BQVIsQ0FBZSxhQUFmLENBQVA7QUFDQTtBQUNELFNBQU8sU0FBUyxJQUFULEVBQVA7QUFDQSxFQVZNLEVBVUosSUFWSSxDQVVDLFVBQVMsSUFBVCxFQUFlO0FBQ3RCLFNBQU8sS0FBSyxLQUFMLENBQVcsQ0FBWCxDQUFQO0FBQ0EsRUFaTSxDQUFQO0FBYUEsQ0FkRDs7QUFnQkE7Ozs7QUFJQSxJQUFJLE1BQU0sU0FBTixHQUFNLEdBQVc7O0FBRXBCO0FBQ0EsS0FBSSxnQkFBZ0IsYUFBYSxPQUFiLENBQXFCLGVBQXJCLENBQXBCO0FBQ0EsS0FBSSxDQUFDLGFBQUwsRUFBb0I7QUFDbkIsU0FBTyxRQUFRLE1BQVIsQ0FBZSxZQUFmLENBQVA7QUFDQTs7QUFFRDtBQUNBLEtBQUksVUFBVSxLQUFLLEtBQUwsQ0FBVyxhQUFYLENBQWQ7QUFDQSxLQUFJLENBQUMsT0FBRCxJQUFZLENBQUMsUUFBUSxhQUFyQixJQUFzQyxDQUFDLFFBQVEsYUFBUixDQUFzQixZQUFqRSxFQUErRTtBQUM5RSxTQUFPLFFBQVEsTUFBUixDQUFlLFlBQWYsQ0FBUDtBQUNBOztBQUVEO0FBQ0EsS0FBSSxRQUFRLGFBQVIsQ0FBc0IsVUFBdEIsR0FBbUMsS0FBSyxHQUFMLEVBQXZDLEVBQW1EO0FBQ2xELFNBQU8sUUFBUSxNQUFSLENBQWUsaUJBQWYsQ0FBUDtBQUNBOztBQUVELFFBQU8sWUFBWSxRQUFRLGFBQVIsQ0FBc0IsWUFBbEMsQ0FBUDtBQUVBLENBckJEOzs7Ozs7Ozs7a0JDNUJlLFVBQVMsTUFBVCxFQUFpQjtBQUMvQixNQUFJLG1CQUFtQixTQUFTLGFBQVQsQ0FBdUIsS0FBdkIsRUFBOEIsV0FBOUIsQ0FDdEIsU0FBUyxjQUFULENBQXdCLE1BQXhCLENBRHNCLEVBQ1csVUFEWCxDQUNzQixTQUQ3QztBQUVBLFNBQU8saUJBQWlCLE9BQWpCLENBQXlCLFFBQXpCLEVBQW1DLE1BQW5DLENBQVA7QUFDQSxDOzs7OztBQ1REOzs7Ozs7QUFFQSxPQUFPLE9BQVAsR0FBaUIsVUFBUyxHQUFULEVBQWM7QUFDOUIsS0FBSSxhQUFhLFNBQVMsYUFBVCxDQUF1QixLQUF2QixDQUFqQjtBQUNBLFlBQVcsU0FBWCxHQUF1QixHQUF2QjtBQUNBLHVCQUFPLEtBQVAsRUFBYyxVQUFkLEVBQTBCLE9BQTFCLENBQWtDLFVBQVMsSUFBVCxFQUFlO0FBQ2hELE1BQUksY0FBYyxTQUFTLGFBQVQsQ0FBdUIsS0FBdkIsQ0FBbEI7QUFDQSxjQUFZLFNBQVosQ0FBc0IsR0FBdEIsQ0FBMEIsYUFBMUI7QUFDQSxjQUFZLFNBQVosR0FBd0Isd0NBQXhCO0FBQ0EsTUFBSSxNQUFNLEtBQUssWUFBTCxDQUFrQixLQUFsQixDQUFWO0FBQ0EsTUFBSSxNQUFNLEtBQUssWUFBTCxDQUFrQixLQUFsQixDQUFWO0FBQ0EsTUFBSSxVQUFVLEVBQWQ7O0FBRUE7QUFDQSxNQUFJLFVBQVUsWUFBWSxhQUFaLENBQTBCLEtBQTFCLENBQWQ7O0FBRUEsVUFBUSxZQUFSLENBQXFCLFVBQXJCLEVBQWlDLEdBQWpDO0FBQ0EsVUFBUSxZQUFSLENBQXFCLE9BQXJCLEVBQThCLFlBQTlCOztBQUVBLE1BQUksS0FBSixDQUFVLEdBQVYsRUFBZSxPQUFmLENBQXVCLFVBQVMsR0FBVCxFQUFjO0FBQ3BDLE9BQUksUUFBUSxXQUFSLElBQXVCLFFBQVEsWUFBbkMsRUFBaUQ7QUFDaEQsZ0JBQVksU0FBWixDQUFzQixHQUF0QixDQUEwQixZQUExQjtBQUNBLElBRkQsTUFFTyxJQUFJLElBQUksT0FBSixDQUFZLFFBQVosTUFBMEIsQ0FBOUIsRUFBaUM7QUFDdkMsUUFBSSxRQUFRLElBQUksT0FBSixDQUFZLFFBQVosRUFBc0IsRUFBdEIsQ0FBWjtBQUNBLFFBQUksTUFBTSxPQUFOLENBQWMsR0FBZCxDQUFKLEVBQXdCO0FBQ3ZCLFNBQUksYUFBYSxNQUFNLEtBQU4sQ0FBWSxHQUFaLENBQWpCO0FBQ0EsYUFBUSxXQUFXLENBQVgsSUFBZ0IsV0FBVyxDQUFYLENBQXhCO0FBQ0E7QUFDRCxjQUFVLE1BQU0sS0FBaEI7QUFDQSxJQVBNLE1BT0EsSUFBSSxRQUFRLFNBQVosRUFBdUI7QUFDN0IsZ0JBQVksYUFBWixDQUEwQixnQkFBMUIsRUFBNEMsU0FBNUMsQ0FBc0QsR0FBdEQsQ0FBMEQsd0JBQTFEO0FBQ0EsSUFGTSxNQUVBO0FBQ04sVUFBTSxHQUFOO0FBQ0E7QUFDRCxHQWZEOztBQWlCQSxVQUFRLFlBQVIsQ0FBcUIsS0FBckIsRUFBNEIsR0FBNUI7QUFDQSxVQUFRLFlBQVIsQ0FBcUIsT0FBckIsRUFBOEIsS0FBSyxZQUFMLENBQWtCLE9BQWxCLENBQTlCOztBQUVBLGNBQVksYUFBWixDQUEwQixnQkFBMUIsRUFDRSxZQURGLENBQ2UsT0FEZixFQUN3QixvQkFBb0IsT0FBcEIsR0FBOEIsR0FEdEQ7O0FBR0EsT0FBSyxVQUFMLENBQWdCLFNBQWhCLEdBQTRCLFlBQVksU0FBeEM7QUFDQSxFQXRDRDtBQXVDQSxRQUFPLFdBQVcsU0FBbEI7QUFDQSxDQTNDRDs7Ozs7Ozs7O2tCQ0NlLFVBQVMsSUFBVCxFQUFlO0FBQzdCLEtBQUksT0FBTyw2QkFBVSxJQUFWLENBQVg7QUFDQSxLQUFJLFFBQVEseUJBQVUsSUFBVixDQUFaO0FBQ0EsS0FBSSxXQUFXLEtBQUssSUFBTCxDQUFVLFFBQVEsR0FBbEIsQ0FBZjs7QUFFQSxLQUFJLFFBQVEsTUFBWjtBQUNBLEtBQUksV0FBVyxDQUFmLEVBQWtCO0FBQ2pCLFdBQVMsR0FBVDtBQUNBOztBQUVELFFBQU8sV0FBVyxLQUFsQjtBQUNBLEM7O0FBZEQ7Ozs7QUFDQTs7Ozs7Ozs7Ozs7OztrQkNEZSxVQUFTLElBQVQsRUFBZTtBQUM3QixLQUFJLE1BQU0sU0FBUyxhQUFULENBQXVCLEtBQXZCLENBQVY7QUFDQSxLQUFJLFNBQUosR0FBZ0IsSUFBaEI7QUFDQSxRQUFPLElBQUksV0FBSixJQUFtQixJQUFJLFNBQXZCLElBQW9DLEVBQTNDO0FBQ0EsQzs7Ozs7QUNDRDs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7O0lBQVksRzs7Ozs7O0FBRVosNEIsQ0FmQTs7Ozs7QUFnQkE7QUFDQTs7QUFFQSxzQkFBTyxLQUFQLEVBQWMsT0FBZCxDQUFzQixVQUFTLElBQVQsRUFBZTtBQUNwQyxNQUFLLE1BQUwsR0FBYyxZQUFXO0FBQ3hCLE9BQUssU0FBTCxDQUFlLEdBQWYsQ0FBbUIsaUJBQW5CO0FBQ0EsRUFGRDtBQUdBLENBSkQ7QUFLQSxzQkFBVyxDQUFYO0FBQ0E7QUFDQTtBQUNBLGlDQUFrQixJQUFsQixDQUF1QixVQUFTLElBQVQsRUFBZTtBQUNyQyxLQUFJLFFBQVEsU0FBUyxhQUFULENBQXVCLE1BQXZCLENBQVo7O0FBRUEsT0FBTSxTQUFOLENBQWdCLEdBQWhCLENBQW9CLGdCQUFwQjs7QUFFQTtBQUNBLEtBQUksUUFBUSxLQUFLLEtBQUwsQ0FBVyxJQUFYLENBQWdCLFVBQVMsSUFBVCxFQUFlO0FBQzFDLFNBQVEsS0FBSyxJQUFMLEtBQWMsT0FBZCxJQUF5QixLQUFLLElBQUwsS0FBYyxlQUEvQztBQUNBLEVBRlcsQ0FBWjtBQUdBLEtBQUksS0FBSixFQUFXO0FBQ1YsUUFBTSxTQUFOLENBQWdCLEdBQWhCLENBQW9CLGlCQUFwQjtBQUNBOztBQUVEO0FBQ0EsS0FBSSxLQUFLLElBQUwsS0FBYyxPQUFPLFVBQXpCLEVBQXFDO0FBQ3BDLFFBQU0sU0FBTixDQUFnQixHQUFoQixDQUFvQixrQkFBcEI7QUFDQSxTQUFPLElBQUksaUJBQUosQ0FBc0IsS0FBSyxLQUEzQixDQUFQO0FBQ0E7QUFDRCxDQWxCRCxFQWtCRyxLQWxCSCxDQWtCUyxZQUFXLENBQUUsQ0FsQnRCOzs7Ozs7Ozs7a0JDM0JlLFVBQVMsTUFBVCxFQUFpQjs7QUFFOUIsTUFBSSxjQUFjLEVBQWxCO0FBQ0EsTUFBSSxPQUFPLEtBQVgsRUFBa0I7QUFDaEIsZ0RBQTBDLE9BQU8sS0FBakQ7QUFDRDs7QUFFRCxNQUFJLGFBQWEsRUFBakI7QUFDQSxNQUFJLE9BQU8sS0FBWCxFQUFrQjtBQUNoQiw2SkFHdUIsT0FBTyxLQUg5QixlQUc2QyxPQUFPLElBSHBEO0FBTUQ7O0FBRUQsMEtBS2tCLFdBTGxCLDRFQU1rRSxPQUFPLElBTnpFLFVBTWtGLE9BQU8sSUFOekYsNkNBT21CLE9BQU8sS0FBUCxDQUFhLEtBUGhDLDRIQVl1QixPQUFPLElBWjlCLFdBWXdDLFVBWnhDLHdCQWFVLE9BQU8sSUFiakIseUJBY1MsT0FBTyxHQUFQLElBQWMsRUFkdkIseUNBZTBCLE9BQU8sSUFmakM7QUFpQkQsQzs7Ozs7Ozs7O2tCQzlCYyxVQUFTLElBQVQsRUFBZTs7QUFFN0IsTUFBSSxjQUFjLEVBQWxCO0FBQ0EsTUFBSSxLQUFLLE1BQUwsQ0FBWSxLQUFoQixFQUF1QjtBQUN0QixnREFBMEMsS0FBSyxNQUFMLENBQVksS0FBdEQ7QUFDQTs7QUFFQSxNQUFJLFlBQVksRUFBaEI7QUFDQSxNQUFJLEtBQUssS0FBVCxFQUFnQjtBQUNkLDRKQUd1QixLQUFLLEtBSDVCLGVBRzJDLEtBQUssS0FIaEQ7QUFNRDs7QUFFRixNQUFJLE9BQU8sRUFBWDtBQUNBLE1BQUksS0FBSyxJQUFULEVBQWU7QUFDZCxXQUFPLDRCQUE0QixLQUFLLElBQUwsQ0FBVSxHQUFWLENBQWMsVUFBUyxHQUFULEVBQWM7QUFDOUQsZ0NBQXdCLElBQUksSUFBNUIsV0FBc0MsSUFBSSxJQUExQztBQUNBLEtBRmtDLEVBRWhDLElBRmdDLENBRTNCLEVBRjJCLENBQTVCLEdBRU8sU0FGZDtBQUdBOztBQUVELE1BQUksWUFBWSxJQUFJLElBQUosQ0FBUyxLQUFLLFlBQWQsRUFBNEIsT0FBNUIsRUFBaEI7QUFDQSxNQUFJLE1BQU0sS0FBSyxHQUFMLEVBQVY7QUFDQSxNQUFJLFVBQVUseUJBQWUsT0FBZixDQUF1QixTQUF2QixFQUFrQyxHQUFsQyxDQUFkOztBQUVBLE1BQUksT0FBTyw4QkFBZSxLQUFLLElBQXBCLENBQVg7QUFDQSxNQUFJLFVBQVUsS0FBSyxNQUFMLENBQVksQ0FBWixFQUFlLEtBQUssT0FBTCxDQUFhLE1BQWIsSUFBdUIsQ0FBdEMsQ0FBZDs7QUFFQSwwS0FLbUIsV0FMbkIsNEVBTW1FLEtBQUssTUFBTCxDQUFZLElBTi9FLFVBTXdGLEtBQUssTUFBTCxDQUFZLElBTnBHLDJDQU9tQixPQVBuQixrQkFPdUMsd0JBQVMsS0FBSyxJQUFkLENBUHZDLGFBT2tFLElBUGxFLCtFQVdPLFNBWFAsMEJBWWlCLEtBQUssSUFadEIseUJBYWEsS0FBSyxLQWJsQix1QkFjUyxPQWRULHlDQWdCb0IsS0FBSyxJQWhCekI7QUFrQkEsQzs7QUFyREQ7Ozs7QUFDQTs7OztBQUNBOzs7Ozs7Ozs7Ozs7O2tCQ0ZlLFVBQVMsSUFBVCxFQUFlO0FBQzdCLE1BQUksUUFBUSxFQUFaO0FBQ0EsTUFBSSxLQUFLLEtBQVQsRUFBZ0I7QUFDZixpREFDOEIsS0FBSyxLQURuQztBQUdBOztBQUVELHNFQUdHLEtBSEgscURBS2tDLEtBQUssSUFMdkM7QUFVQSxDOzs7Ozs7Ozs7a0JDaEJjLFVBQVMsUUFBVCxFQUFtQjs7QUFFaEMsTUFBSSxVQUFVLHNCQUFkO0FBQ0EsTUFBSSxTQUFTLElBQVQsQ0FBYyxXQUFkLE9BQWdDLE9BQU8sVUFBUCxDQUFrQixXQUFsQixFQUFwQyxFQUFxRTtBQUNuRSxlQUFXLDJCQUFYO0FBQ0Q7O0FBRUQsTUFBSSxRQUFRLEVBQVo7QUFDQSxNQUFJLFNBQVMsS0FBYixFQUFvQjtBQUNsQiwrQ0FBeUMsU0FBUyxLQUFsRDtBQUNEOztBQUVELE1BQUksV0FBVyxFQUFmO0FBQ0EsTUFBSSxTQUFTLFFBQWIsRUFBdUI7QUFDckIsOEJBQXdCLFNBQVMsUUFBakM7QUFDRDs7QUFFRCxNQUFJLFVBQVUsU0FBUyxPQUFULElBQW9CLFNBQVMsSUFBM0M7O0FBRUEsTUFBSSxXQUFXLEVBQWY7QUFDQSxNQUFJLFNBQVMsT0FBYixFQUFzQjtBQUNwQix5REFDaUMsU0FBUyxJQUQxQztBQUlEOztBQUVELE1BQUksWUFBVSwwQkFBTyxTQUFTLElBQWhCLENBQWQ7QUFDQSxNQUFJLFNBQVMsT0FBYixFQUFzQjtBQUNwQix5QkFBbUIsMEJBQU8sU0FBUyxPQUFoQixDQUFuQixVQUFnRCxJQUFoRDtBQUNEOztBQUVELDRCQUNZLE9BRFosMkVBS1EsS0FMUiw2REFPcUMsSUFQckMsK0JBUVUsU0FBUyxPQVJuQixHQVE2QixRQVI3QixxSEFhdUQsU0FBUyxTQWJoRSxxQkFheUYsU0FBUyxJQWJsRyw2R0FjaUMsT0FkakMsa0JBZUUsUUFmRjtBQWlCRCxDOztBQW5ERDs7Ozs7Ozs7Ozs7OztrQkNBZSxVQUFTLEdBQVQsRUFBYzs7QUFFM0IsTUFBSSxhQUFhLEVBQWpCO0FBQ0EsTUFBSSxJQUFJLEtBQVIsRUFBZTtBQUNiLDZKQUd1QixJQUFJLEtBSDNCLGVBRzBDLElBQUksSUFIOUM7QUFPRDs7QUFFRCxtTUFLMkQsSUFBSSxJQUwvRCxVQUt3RSxJQUFJLElBTDVFLHlDQU1lLElBQUksS0FBSixDQUFVLEtBTnpCLHFHQVdnQixJQUFJLElBWHBCLGlCQVlJLFVBWkosd0JBY00sSUFBSSxJQWRWLHFCQWVLLElBQUksV0FBSixJQUFtQixFQWZ4QixrQ0FnQm1CLElBQUksSUFoQnZCO0FBbUJELEM7OztBQ2hDRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24oKXtmdW5jdGlvbiByKGUsbix0KXtmdW5jdGlvbiBvKGksZil7aWYoIW5baV0pe2lmKCFlW2ldKXt2YXIgYz1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlO2lmKCFmJiZjKXJldHVybiBjKGksITApO2lmKHUpcmV0dXJuIHUoaSwhMCk7dmFyIGE9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitpK1wiJ1wiKTt0aHJvdyBhLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsYX12YXIgcD1uW2ldPXtleHBvcnRzOnt9fTtlW2ldWzBdLmNhbGwocC5leHBvcnRzLGZ1bmN0aW9uKHIpe3ZhciBuPWVbaV1bMV1bcl07cmV0dXJuIG8obnx8cil9LHAscC5leHBvcnRzLHIsZSxuLHQpfXJldHVybiBuW2ldLmV4cG9ydHN9Zm9yKHZhciB1PVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmUsaT0wO2k8dC5sZW5ndGg7aSsrKW8odFtpXSk7cmV0dXJuIG99cmV0dXJuIHJ9KSgpIiwiLyoqXG4gKiBNYWtlIHN1cmUgYSBmdW5jdGlvbiBvbmx5IGlzIHJ1biBldmVyeSB4IG1zXG4gKiBAcGFyYW0gIHtGdW5jdGlvbn0gY2FsbGJhY2sgTWV0aG9kIHRvIGV4ZWN1dGUgaWYgaXQgaXMgbm90IGRlYm91bmNlZFxuICogQHBhcmFtICB7aW50ZWdlcn0gIHRpbWVvdXQgIE1pbGxpc2Vjb25kcyB0byB3YWl0IGJlZm9yZSBuZXh0IGFsbG93ZWQgY2FsbGJhY2suIERlZmF1bHRzIHRvIHRoZSBhbmltYXRpb24gZnJhbWUgcmF0ZSBpbiB0aGUgYnJvd3NlclxuICogQHJldHVybiB7dm9pZH1cbiAqL1xuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24oY2FsbGJhY2ssIHRpbWVvdXQpIHtcbiAgdmFyIHBlbmRpbmcgPSBmYWxzZTtcbiAgdmFyIGRvbmUgPSAoKSA9PiB7XG4gICAgcGVuZGluZyA9IGZhbHNlO1xuICB9O1xuICByZXR1cm4gZnVuY3Rpb24oKSB7XG4gICAgaWYgKHBlbmRpbmcpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgcGVuZGluZyA9IHRydWU7XG4gICAgY2FsbGJhY2suYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgICBpZiAoIXRpbWVvdXQpIHtcbiAgICAgIHdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUoZG9uZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHdpbmRvdy5zZXRUaW1lb3V0KGRvbmUsIHRpbWVvdXQpO1xuICAgIH1cbiAgfTtcbn1cbiIsIi8qKlxuICogRGVsYXkgYSBmdW5jdGlvbiBhbmQgb25seSBydW4gb25jZVxuICogQHBhcmFtICB7RnVuY3Rpb259IGNhbGxiYWNrIE1ldGhvZCB0byBleGVjdXRlIGlmIGl0IGlzIG5vdCBkZWJvdW5jZWRcbiAqIEBwYXJhbSAge2ludGVnZXJ9ICB0aW1lb3V0ICBNaWxsaXNlY29uZHMgdG8gd2FpdCBiZWZvcmUgbmV4dCBhbGxvd2VkIGNhbGxiYWNrLiBEZWZhdWx0cyB0byB0aGUgYW5pbWF0aW9uIGZyYW1lIHJhdGUgaW4gdGhlIGJyb3dzZXJcbiAqIEByZXR1cm4ge3ZvaWR9XG4gKi9cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uKGNhbGxiYWNrLCB0aW1lb3V0KSB7XG4gIHZhciBwZW5kaW5nID0gZmFsc2U7XG4gIHZhciBkb25lID0gKCkgPT4ge1xuICAgIGNhbGxiYWNrLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgcGVuZGluZyA9IGZhbHNlO1xuICB9O1xuICByZXR1cm4gZnVuY3Rpb24oKSB7XG4gICAgaWYgKHBlbmRpbmcpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgcGVuZGluZyA9IHRydWU7XG4gICAgaWYgKCF0aW1lb3V0KSB7XG4gICAgICB3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lKGRvbmUpO1xuICAgIH0gZWxzZSB7XG4gICAgICB3aW5kb3cuc2V0VGltZW91dChkb25lLCB0aW1lb3V0KTtcbiAgICB9XG4gIH07XG59XG4iLCIvKipcbiAqIEdldCBhbiBhcnJheSBvZiBkb20gZWxlbWVudHMgbWF0Y2hpbmcgdGhlIHNlbGVjdG9yXG4gKiBAcGFyYW0gIHtzdHJpbmd9ICAgICBzZWxlY3RvclxuICogQHBhcmFtICB7RE9NZWxlbWVudH0gRE9NIGVsZW1lbnQgdG8gc2VhcmNoIGluLiBEZWZhdWx0cyB0byBkb2N1bWVudFxuICogQHJldHVybiB7YXJyYXl9XG4gKi9cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uKHNlbGVjdG9yLCAkcm9vdCA9IGRvY3VtZW50KSB7XG4gIHJldHVybiBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbCgkcm9vdC5xdWVyeVNlbGVjdG9yQWxsKHNlbGVjdG9yKSk7XG59XG4iLCIvKipcbiAqIEdldCB0aGUgZWxlbWVudHMgb2Zmc2V0IHJlbGF0aXZlIHRvIHRoZSBkb2N1bWVudFxuICogQHBhcmFtICB7RE9NRWxlbWVudH0gJGVsZW1lbnQgRWxlbWVudCB0byBnZXQgdGhlIG9mZnNldCBmcm9tXG4gKiBAcmV0dXJuIHtpbnRlZ2VyfSAgICAgICAgICAgICBPZmZzZXQgaW4gcGl4ZWxzXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uKCRlbGVtZW50KSB7XG4gIHZhciBvZmZzZXQgPSAwO1xuXG4gIHdoaWxlICgkZWxlbWVudCAmJiAhaXNOYU4oJGVsZW1lbnQub2Zmc2V0VG9wKSkge1xuICAgIG9mZnNldCArPSAkZWxlbWVudC5vZmZzZXRUb3A7XG4gICAgJGVsZW1lbnQgPSAkZWxlbWVudC5vZmZzZXRQYXJlbnQ7XG4gIH1cbiAgcmV0dXJuIG9mZnNldDtcbn1cbiIsIi8qKlxuICogTGF6eSBsb2FkIGltYWdlcyB3aXRoIGNsYXNzIC5sYXp5LWltYWdlcy5cbiAqIERlcGVuZGluZyBvbiB0aGUgdHJlc2hvbGQgaW1hZ2VzIHdpbGwgbG9hZCBhcyB0aGUgdXNlciBzY3JvbGxzIGRvd24gb24gdGhlXG4gKiBkb2N1bWVudC5cbiAqL1xuXG4vLyBEZXBlbmRlbmNlaXNcbmltcG9ydCBnZXRBbGxFbGVtZW50cyBmcm9tICcuLi9kb20vZ2V0LWFsbCc7XG5pbXBvcnQgc2Nyb2xsVmlzaWJsZSBmcm9tICcuLi9zY3JvbGwvdmlzaWJsZSc7XG5cbi8vIExvYWQgaW1hZ2UgZWxlbWVudFxudmFyIGxvYWRJbWcgPSBmdW5jdGlvbigkaW1nKSB7XG5cbiAgaWYgKCRpbWcuZGF0YXNldC5zcmMpIHtcbiAgICAkaW1nLnNldEF0dHJpYnV0ZSgnc3JjJywgJGltZy5kYXRhc2V0LnNyYyk7XG4gIH1cbiAgaWYgKCRpbWcuZGF0YXNldC5zcmNzZXQpIHtcbiAgICAkaW1nLnNldEF0dHJpYnV0ZSgnc3Jjc2V0JywgJGltZy5kYXRhc2V0LnNyY3NldCk7XG4gIH1cbn07XG5cbi8vIExvYWQgcGljdHVyZSBlbGVtZW50XG52YXIgbG9hZFBpY3R1cmUgPSBmdW5jdGlvbigkcGljdHVyZSkge1xuICBsb2FkSW1nKCRwaWN0dXJlLnF1ZXJ5U2VsZWN0b3IoJ2ltZycpKTtcbiAgdmFyICRzb3VyY2VzID0gQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoJHBpY3R1cmUucXVlcnlTZWxlY3RvckFsbCgnc291cmNlJykpO1xuICAkc291cmNlcy5mb3JFYWNoKCRzb3VyY2UgPT4gJHNvdXJjZS5zZXRBdHRyaWJ1dGUoJ3NyY3NldCcsICRzb3VyY2UuZGF0YXNldC5zcmNzZXQpKTtcbn07XG5cbnZhciBsb2FkRWxlbWVudCA9IGZ1bmN0aW9uKCRlbGVtZW50KSB7XG4gIGlmICgkZWxlbWVudC5tYXRjaGVzKCdwaWN0dXJlJykpIHtcbiAgICBsb2FkUGljdHVyZSgkZWxlbWVudCk7XG4gIH0gZWxzZSBpZiAoJGVsZW1lbnQubWF0Y2hlcygnaW1nJykpIHtcbiAgICBsb2FkSW1nKCRlbGVtZW50KTtcbiAgfVxuXG4gIC8vIE1ha2Ugc3VyZSBwaWN0dXJlZmlsbCB3aWxsIHVwZGF0ZSB0aGUgaW1hZ2Ugd2hlbiBzb3VyY2UgaGFzIGNoYW5nZWRcbiAgaWYgKHdpbmRvdy5waWN0dXJlZmlsbCkge1xuICAgIHdpbmRvdy5waWN0dXJlZmlsbCh7XG4gICAgICByZWV2YWx1YXRlOiB0cnVlXG4gICAgfSk7XG4gIH1cbn07XG5cbi8qKlxuICogQWN0aXZhdGUgbGF6eSBsb2FkIG9mIGltYWdlcyBhcyB1c2VyIHNjcm9sbHNcbiAqIEBwYXJhbSAge2Zsb2F0fSB0aHJlc2hvbGQgIFBlcmNlbnQgYmVsb3cgc2NyZWVuIHRvIGluaXRpYWxpemUgbG9hZCBvZiBpbWFnZVxuICogQHJldHVybiB7dm9pZH1cbiAqL1xuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24odGhyZXNob2xkID0gMC41KSB7XG4gIHZhciAkbGF6eUltYWdlcyA9IGdldEFsbEVsZW1lbnRzKCcubGF6eS1pbWFnZScpO1xuXG4gIHdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUoZnVuY3Rpb24oKSB7XG4gICAgJGxhenlJbWFnZXMuZm9yRWFjaChmdW5jdGlvbigkbGF6eUltYWdlKSB7XG5cbiAgICAgIC8vIElnbm9yZSBpbWFnZXMgd2hpY2ggaGFzIGFscmVhZHkgYmVlbiByZWdpc3RlcmVkXG4gICAgICBpZiAoJGxhenlJbWFnZS5kYXRhc2V0LmxhenlJbWFnZUxpc3RlbmluZykge1xuXHRyZXR1cm47XG4gICAgICB9XG4gICAgICAkbGF6eUltYWdlLnNldEF0dHJpYnV0ZSgnZGF0YS1sYXp5LWltYWdlLWxpc3RlbmluZycsICd0cnVlJyk7XG5cbiAgICAgIHNjcm9sbFZpc2libGUoJGxhenlJbWFnZSwgdGhyZXNob2xkKVxuICAgICAgICAudGhlbigoKSA9PiBsb2FkRWxlbWVudCgkbGF6eUltYWdlKSk7XG4gICAgfSk7XG4gIH0pO1xuXG59XG4iLCIvLyBEZXBlbmRlbmNpZXNcbmltcG9ydCBnZXREb2N1bWVudE9mZnNldFRvcCBmcm9tICcuLi9kb20vZ2V0LWRvY3VtZW50LW9mZnNldC10b3AnO1xuXG4vKipcbiAqIENoZWNrcyBpZiB0aGUgdXNlciBoYXMgc2Nyb2xsZWQgdG8gb3IgcGFzdCBhbiBlbGVtZW50XG4gKiBAcGFyYW0gIHtET01FbGVtZW50fSAkZWxlbWVudCAgVGhlIGVsZW1lbnQgdG8gY2hlY2sgYWdhaW5zdFxuICogQHBhcmFtICB7ZmxvYXR9ICAgICAgdGhyZXNob2xkIERpc3RhbmNlIGluIHBlcmNlbnQgb2YgdGhlIHNjZWVlbiBoZWlnaHQgdG8gbWVhc3VyZSBhZ2FpbnN0LlxuICogQHJldHVybiB7Ym9vbGVhbn1cbiAqL1xuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24oJGVsZW1lbnQsIHRocmVzaG9sZCA9IDApIHtcbiAgdmFyIHNjcm9sbEJvdHRvbSA9ICh3aW5kb3cuc2Nyb2xsWSB8fCBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuc2Nyb2xsVG9wKSArICh3aW5kb3cuaW5uZXJIZWlnaHQgKiAoMSArIHRocmVzaG9sZCkpO1xuICB2YXIgb2Zmc2V0VG9wID0gZ2V0RG9jdW1lbnRPZmZzZXRUb3AoJGVsZW1lbnQpO1xuICByZXR1cm4gKHNjcm9sbEJvdHRvbSA+IG9mZnNldFRvcCk7XG59XG4iLCIvLyBkZXBlbmRlbmNpZXNcbmltcG9ydCBkZWxheSBmcm9tICcuLi9hc3luYy9kZWxheSc7XG5cbi8qKlxuICogUnVucyBzY3JpcHRzIGVhY2ggdGltZSB0aGUgdXNlciBjaGFuZ2VzIHNjcm9sbCBkaXJlY3Rpb25cbiAqIEBwYXJhbSAge0Z1bmN0aW9ufSBkb3duQ2FsbGJhY2sgIENhbGxiYWNrIGV2ZXJ5IHRpbWUgdGhlIHVzZXIgc3RhcnRzIHNjcm9sbGluZyBkb3duXG4gKiBAcGFyYW0gIHtGdW5jdGlvbn0gdXBDYWxsYmFjayAgICBDYWxsYmFjayBldmVyeSB0aW1lIHRoZSB1c2VyIHN0YXJ0cyBzY3JvbGxpbmcgdXBcbiAqIEBwYXJhbSAge2Zsb2F0fSAgICB0aHJlc2hvbGQgICAgIE1hcmdpbiBpbiB0b3Agd2hlcmUgc2Nyb2xsIGRvd24gaXMgaWdub3JlZCAoY291bGQgYmUgdXNlZCBmb3IgbmF2cylcbiAqIEByZXR1cm4ge3ZvaWR9XG4gKi9cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uKGRvd25DYWxsYmFjayA9IGZ1bmN0aW9uKCkge30sIHVwQ2FsbGJhY2sgPSBmdW5jdGlvbigpIHt9LCB0aHJlc2hvbGQgPSAwKSB7XG5cbiAgdmFyIGxhc3RTY3JvbGxQb3MgPSAwO1xuICB2YXIgc2Nyb2xsZWREb3duID0gZmFsc2U7XG5cbiAgdmFyIGlzU2Nyb2xsaW5nID0gZnVuY3Rpb24oKSB7XG4gICAgdmFyIGN1cnJlbnRTY3JvbGxQb3MgPSB3aW5kb3cuc2Nyb2xsWTtcblxuICAgIGlmICghc2Nyb2xsZWREb3duICYmXG4gICAgICBjdXJyZW50U2Nyb2xsUG9zID4gdGhyZXNob2xkICYmXG4gICAgICBjdXJyZW50U2Nyb2xsUG9zID4gKGxhc3RTY3JvbGxQb3MgKyAxMCkpIHtcbiAgICAgIGRvd25DYWxsYmFjaygpO1xuICAgICAgc2Nyb2xsZWREb3duID0gdHJ1ZTtcbiAgICB9IGVsc2UgaWYgKHNjcm9sbGVkRG93biAmJlxuICAgICAgKGN1cnJlbnRTY3JvbGxQb3MgPD0gdGhyZXNob2xkIHx8IGN1cnJlbnRTY3JvbGxQb3MgPCAobGFzdFNjcm9sbFBvcyAtIDEwMCkpICYmXG4gICAgICAoY3VycmVudFNjcm9sbFBvcyArIHdpbmRvdy5pbm5lckhlaWdodCA8IGRvY3VtZW50LmJvZHkuY2xpZW50SGVpZ2h0KSkge1xuICAgICAgdXBDYWxsYmFjaygpO1xuICAgICAgc2Nyb2xsZWREb3duID0gZmFsc2U7XG4gICAgfVxuXG4gICAgbGFzdFNjcm9sbFBvcyA9IGN1cnJlbnRTY3JvbGxQb3M7XG4gIH07XG5cbiAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3Njcm9sbCcsIGRlbGF5KGlzU2Nyb2xsaW5nLCAyNTApKTtcbiAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignRE9NQ29udGVudExvYWRlZCcsIGlzU2Nyb2xsaW5nKTtcbn1cbiIsIi8vIERlcGVuZGVuY2Vpc1xuaW1wb3J0IGRlYm91bmNlIGZyb20gJy4uL2FzeW5jL2RlYm91bmNlJztcbmltcG9ydCBoYXNTY3JvbGxlZFBhc3QgZnJvbSAnLi9oYXMtc2Nyb2xsZWQtcGFzdCc7XG5cbi8qKlxuICogRnVsZmlsbCBhIHByb21pc2UsIHdoZW4gdGhlIGVsZW1lbnQgaXMgdmlzaWJsZSAoc2Nyb2xsZWQgdG8gb3IgcGFzdClcbiAqIEBwYXJhbSAge0RPTUVsZW1lbnR9ICRlbGVtZW50ICBFbGVtZW50IHRvIGNoZWNrXG4gKiBAcGFyYW0gIHtmbG9hdH0gICAgICB0aHJlc2hvbGQgRGlzdGFuY2UgaW4gcGVyY2VudFxuICogQHJldHVybiB7W3R5cGVdfSAgICAgICAgICAgW2Rlc2NyaXB0aW9uXVxuICovXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbigkZWxlbWVudCwgdGhyZXNob2xkID0gMCkge1xuXG4gIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbihyZXNvbHZlKSB7XG5cbiAgICB2YXIgY2hlY2tFbGVtZW50ID0gZGVib3VuY2UoZnVuY3Rpb24oKSB7XG4gICAgICBpZiAoaGFzU2Nyb2xsZWRQYXN0KCRlbGVtZW50LCB0aHJlc2hvbGQpKSB7XG4gICAgICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKCdzY3JvbGwnLCBjaGVja0VsZW1lbnQpO1xuICAgICAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcigncmVzaXplJywgY2hlY2tFbGVtZW50KTtcbiAgICAgICAgcmVzb2x2ZSgpO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3Njcm9sbCcsIGNoZWNrRWxlbWVudCk7XG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3Jlc2l6ZScsIGNoZWNrRWxlbWVudCk7XG4gICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignRE9NQ29udGVudExvYWRlZCcsIGNoZWNrRWxlbWVudCk7XG4gICAgc2V0VGltZW91dChjaGVja0VsZW1lbnQsIDApO1xuICB9KTtcbn1cbiIsIi8qKlxuICogSGVscGVycyBmb3IgdmFsaWRhdGluZyBpbnB1dCBmaWVsZHNcbiAqL1xuXG5pbXBvcnQgaXNEYXRlIGZyb20gJy4vaXMtZGF0ZSc7XG5pbXBvcnQgaXNFbWFpbCBmcm9tICcuL2lzLWVtYWlsJztcbmltcG9ydCBpc0Zsb2F0IGZyb20gJy4vaXMtZmxvYXQnO1xuaW1wb3J0IGlzSW50IGZyb20gJy4vaXMtaW50JztcbmltcG9ydCBpc1JlcXVpcmVkIGZyb20gJy4vaXMtcmVxdWlyZWQnO1xuaW1wb3J0IGlzVXJsIGZyb20gJy4vaXMtdXJsJztcblxuZXhwb3J0IGRlZmF1bHQge1xuICBpc0RhdGUsXG4gIGlzRW1haWwsXG4gIGlzRmxvYXQsXG4gIGlzSW50LFxuICBpc1JlcXVpcmVkLFxuICBpc1VybFxufTtcbiIsImltcG9ydCBnZXRBbGxFbGVtZW50cyBmcm9tICcuLi9kb20vZ2V0LWFsbCc7XG5pbXBvcnQgdmFsaWRhdGUgZnJvbSAnLi8nO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbigpIHtcblxuICBnZXRBbGxFbGVtZW50cygnLnZhbGlkYXRlJykuZm9yRWFjaChmdW5jdGlvbigkdmFsaWRhdGVDb250YWluZXIpIHtcblxuICAgIHZhciAkdmFsaWRhdGVGaWVsZCA9ICR2YWxpZGF0ZUNvbnRhaW5lcjtcblxuICAgIGlmICghJHZhbGlkYXRlQ29udGFpbmVyLm1hdGNoZXMoJ2lucHV0LCB0ZXh0YXJlYScpKSB7XG4gICAgICAkdmFsaWRhdGVGaWVsZCA9ICR2YWxpZGF0ZUNvbnRhaW5lci5xdWVyeVNlbGVjdG9yKCdpbnB1dCwgdGV4dGFyZWEnKTtcbiAgICB9XG5cbiAgICBpZiAoISR2YWxpZGF0ZUZpZWxkKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgLy8gRmluZCByZWxldmF0IHZhbGlkYXRpb24gbWV0aG9kc1xuICAgIHZhciB2YWxpZGF0b3JOYW1lcyA9IFtdO1xuICAgIGZvciAodmFyIGtleSBpbiAkdmFsaWRhdGVDb250YWluZXIuZGF0YXNldCkge1xuICAgICAgaWYgKGtleSAhPT0gJ3ZhbGlkYXRlJyAmJiBrZXkuaW5kZXhPZigndmFsaWRhdGUnKSA9PT0gMCkge1xuICAgICAgICB2YXIgdmFsaWRhdG9yTmFtZSA9IGtleS5yZXBsYWNlKCd2YWxpZGF0ZScsICcnKTtcblxuICAgICAgICBpZiAodmFsaWRhdGVbJ2lzJyArIHZhbGlkYXRvck5hbWVdKSB7XG4gICAgICAgICAgdmFsaWRhdG9yTmFtZXMucHVzaCh2YWxpZGF0b3JOYW1lKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIGlmICh2YWxpZGF0b3JOYW1lcy5sZW5ndGggPT09IDApIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICAvLyBDaGVjayB2YWxpZGF0aW9uIHdoZW4gaW5wdXQgb24gZmllbGQgaXMgY2hhbmdlZFxuICAgICR2YWxpZGF0ZUZpZWxkLmFkZEV2ZW50TGlzdGVuZXIoJ2lucHV0JywgZnVuY3Rpb24oKSB7XG4gICAgICB2YXIgaW5wdXQgPSAkdmFsaWRhdGVGaWVsZC52YWx1ZTtcbiAgICAgIHZhciB2YWxpZCA9ICF2YWxpZGF0b3JOYW1lcy5zb21lKGZ1bmN0aW9uKHZhbGlkYXRvck5hbWUpIHtcblx0aWYgKCFpbnB1dCAmJiB2YWxpZGF0b3JOYW1lICE9PSAnUmVxdWlyZWQnKSB7XG5cdCAgcmV0dXJuIGZhbHNlO1xuXHR9XG4gICAgICAgIHJldHVybiAhdmFsaWRhdGVbJ2lzJyArIHZhbGlkYXRvck5hbWVdKGlucHV0KTtcbiAgICAgIH0pO1xuXG4gICAgICBpZiAodmFsaWQpIHtcblx0JHZhbGlkYXRlQ29udGFpbmVyLmNsYXNzTGlzdC5hZGQoJ3ZhbGlkYXRlLS12YWxpZCcpO1xuXHQkdmFsaWRhdGVDb250YWluZXIuY2xhc3NMaXN0LnJlbW92ZSgndmFsaWRhdGUtLW5vdC12YWxpZCcpO1xuICAgICAgfSBlbHNlIHtcblx0JHZhbGlkYXRlQ29udGFpbmVyLmNsYXNzTGlzdC5hZGQoJ3ZhbGlkYXRlLS1ub3QtdmFsaWQnKTtcblx0JHZhbGlkYXRlQ29udGFpbmVyLmNsYXNzTGlzdC5yZW1vdmUoJ3ZhbGlkYXRlLS12YWxpZCcpO1xuICAgICAgfVxuICAgIH0pO1xuICB9KTtcbn1cbiIsIi8qKlxuICogVmFsaWRhdGUgdGhhdCBzdHJpbmcgY2FuIGJlIGNvbnZlcnRlZCB0byBkYXRlXG4gKiBAcGFyYW0gIHtzdHJpbmd9IGRhdGUgaW5wdXRcbiAqIEByZXR1cm4ge2Jvb2xlYW59XG4gKi9cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uKGRhdGUpIHtcbiAgcmV0dXJuICFpc05hTihEYXRlLnBhcnNlKGRhdGUpKTtcbn1cbiIsIi8qKlxuICogVmFsaWRhdGUgZS1tYWlsXG4gKiBAcGFyYW0gIHtzdHJpbmd9IGVtYWlsIGlucHV0XG4gKiBAcmV0dXJuIHtib29sZWFufVxuICovXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbihlbWFpbCkge1xuICB2YXIgcmUgPSAvXihbYS16MC05X1xcLi1dKylAKFtcXGRhLXpcXC4tXSspXFwuKFthLXpcXC5dezIsNn0pJC87XG4gIHJldHVybiByZS50ZXN0KGVtYWlsKTtcbn1cbiIsIi8qKlxuICogVmFsaWRhdGUgZmxvYXRcbiAqIEBwYXJhbSAge3N0cmluZ30gZmxvYXQgaW5wdXRcbiAqIEByZXR1cm4ge2Jvb2xlYW59XG4gKi9cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uKGZsb2F0KSB7XG4gIHZhciByZSA9IC9eKD86Wy0rXT8oPzpbMC05XSspKT8oPzpcXC5bMC05XSopPyg/OltlRV1bXFwrXFwtXT8oPzpbMC05XSspKT8kLztcbiAgcmV0dXJuIGZsb2F0ICE9PSAnJyAmJiByZS50ZXN0KGZsb2F0KTtcbn1cbiIsIi8qKlxuICogVmFsaWRhdGUgaW50ZWdldFxuICogQHBhcmFtICB7c3RyaW5nfSBpbnRlZ2VyIGlucHV0XG4gKiBAcmV0dXJuIHtib29sZWFufVxuICovXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbihpbnRlZ2VyKSB7XG4gIHZhciByZSA9IC9eKD86Wy0rXT8oPzowfFsxLTldWzAtOV0qKSkkLztcbiAgcmV0dXJuIHJlLnRlc3QoaW50ZWdlcik7XG59XG4iLCIvKipcbiAqIFZhbGlkYXRlIGlmIHRoZSBzdHJpbmcgaXMgZW1wdHlcbiAqIEBwYXJhbSAge3N0cmluZ30gaW5wdXRcbiAqIEByZXR1cm4ge2Jvb2xlYW59XG4gKi9cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uKGlucHV0KSB7XG4gIHJldHVybiBpbnB1dC50cmltKCkgIT09ICcnO1xufVxuIiwiLyoqXG4gKiBWYWxpZGF0ZSB1cmxcbiAqIEBwYXJhbSAge3N0cmluZ30gdXJsIGlucHV0XG4gKiBAcmV0dXJuIHtib29sZWFufVxuICovXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbih1cmwpIHtcbiAgdmFyIHJlID0gL14oaHR0cHM/OlxcL1xcLyk/KFtcXGRhLXpcXC4tXSspXFwuKFthLXpcXC5dezIsNn0pKFtcXC9cXHcgXFwuLV0qKSpcXC8/JC87XG4gIHJldHVybiByZS50ZXN0KHVybCk7XG59XG4iLCJtb2R1bGUuZXhwb3J0cz17XG4gIFwic2Vjb25kc1wiOiA2MCxcbiAgXCJtaW51dGVzXCI6IDYwLFxuICBcImhvdXJzXCI6IDI0LFxuICBcImRheXNcIjogNyxcbiAgXCJ3ZWVrc1wiOiA0LFxuICBcIm1vbnRoc1wiOiAxMlxufVxuIiwidmFyIGNvbnZlcnRlciA9IG1vZHVsZS5leHBvcnRzID0ge1xuICBjdXRvZmY6IHJlcXVpcmUoJy4vY3V0b2ZmL2N1dG9mZi5qc29uJyksXG4gIHN1ZmZpeERpY3Rpb25hcnk6IHJlcXVpcmUoJy4vc3VmZml4L3N1ZmZpeC1kaWN0aW9uYXJ5Lmpzb24nKSxcbiAgdGltZUNhbGNzOiByZXF1aXJlKCcuL3RpbWUtY2FsY3VsYXRpb25zJylcbn1cbmNvbnZlcnRlci50aW1lQWdvID0gcmVxdWlyZSgnLi90aW1lLWFnby90aW1lLWFnby5qcycpLmJpbmQoY29udmVydGVyKVxuIiwibW9kdWxlLmV4cG9ydHM9e1xuICBcInNlY29uZHNcIjoge1xuICAgIFwic2luZ3VsYXJcIjogXCIgc2Vjb25kIGFnb1wiLFxuICAgIFwicGx1cmFsXCI6IFwiIHNlY29uZHMgYWdvXCJcbiAgfSxcbiAgXCJtaW51dGVzXCI6IHtcbiAgICBcInNpbmd1bGFyXCI6IFwiIG1pbnV0ZSBhZ29cIixcbiAgICBcInBsdXJhbFwiOiBcIiBtaW51dGVzIGFnb1wiXG4gIH0sXG4gIFwiaG91cnNcIjoge1xuICAgIFwic2luZ3VsYXJcIjogXCIgaG91ciBhZ29cIixcbiAgICBcInBsdXJhbFwiOiBcIiBob3VycyBhZ29cIlxuICB9LFxuICBcImRheXNcIjoge1xuICAgIFwic2luZ3VsYXJcIjogXCIgZGF5IGFnb1wiLFxuICAgIFwicGx1cmFsXCI6IFwiIGRheXMgYWdvXCJcbiAgfSxcbiAgXCJ3ZWVrc1wiOiB7XG4gICAgXCJzaW5ndWxhclwiOiBcIiB3ZWVrIGFnb1wiLFxuICAgIFwicGx1cmFsXCI6IFwiIHdlZWtzIGFnb1wiXG4gIH0sXG4gIFwibW9udGhzXCI6IHtcbiAgICBcInNpbmd1bGFyXCI6IFwiIG1vbnRoIGFnb1wiLFxuICAgIFwicGx1cmFsXCI6IFwiIG1vbnRocyBhZ29cIlxuICB9LFxuICBcInllYXJzXCI6IHtcbiAgICBcInNpbmd1bGFyXCI6IFwiIHllYXIgYWdvXCIsXG4gICAgXCJwbHVyYWxcIjogXCIgeWVhcnMgYWdvXCJcbiAgfVxufVxuIiwibW9kdWxlLmV4cG9ydHMgPSBUaW1lQWdvXG5cbmZ1bmN0aW9uIFRpbWVBZ28gKHBhc3RFcG9jaCwgY3VycmVudEVwb2NoKSB7XG4gIHZhciBzZWNvbmRzID0gTWF0aC5yb3VuZCh0aGlzLnRpbWVDYWxjcy5zZWNvbmRzKHBhc3RFcG9jaCwgY3VycmVudEVwb2NoKSlcbiAgdmFyIG1pbnV0ZXMgPSBNYXRoLnJvdW5kKHRoaXMudGltZUNhbGNzLm1pbnV0ZXMocGFzdEVwb2NoLCBjdXJyZW50RXBvY2gpKVxuICB2YXIgaG91cnMgPSBNYXRoLnJvdW5kKHRoaXMudGltZUNhbGNzLmhvdXJzKHBhc3RFcG9jaCwgY3VycmVudEVwb2NoKSlcbiAgdmFyIGRheXMgPSBNYXRoLnJvdW5kKHRoaXMudGltZUNhbGNzLmRheXMocGFzdEVwb2NoLCBjdXJyZW50RXBvY2gpKVxuICB2YXIgd2Vla3MgPSBNYXRoLnJvdW5kKHRoaXMudGltZUNhbGNzLndlZWtzKHBhc3RFcG9jaCwgY3VycmVudEVwb2NoKSlcbiAgdmFyIG1vbnRocyA9IE1hdGgucm91bmQodGhpcy50aW1lQ2FsY3MubW9udGhzKHBhc3RFcG9jaCwgY3VycmVudEVwb2NoKSlcbiAgdmFyIHllYXJzID0gTWF0aC5yb3VuZCh0aGlzLnRpbWVDYWxjcy55ZWFycyhwYXN0RXBvY2gsIGN1cnJlbnRFcG9jaCkpXG5cbiAgdmFyIHN1ZmZpeCA9IHRoaXMuc3VmZml4RGljdGlvbmFyeVxuICB2YXIgY3V0b2ZmID0gdGhpcy5jdXRvZmZcblxuICBpZiAoc2Vjb25kcyA8IGN1dG9mZi5zZWNvbmRzKSB7XG4gICAgcmV0dXJuIHNlY29uZHMgKyBzdWZmaXguc2Vjb25kc1tnZXRGb3JtKHNlY29uZHMpXVxuICB9IGVsc2UgaWYgKG1pbnV0ZXMgPCBjdXRvZmYubWludXRlcykge1xuICAgIHJldHVybiBtaW51dGVzICsgc3VmZml4Lm1pbnV0ZXNbZ2V0Rm9ybShtaW51dGVzKV1cbiAgfSBlbHNlIGlmIChob3VycyA8IGN1dG9mZi5ob3Vycykge1xuICAgIHJldHVybiBob3VycyArIHN1ZmZpeC5ob3Vyc1tnZXRGb3JtKGhvdXJzKV1cbiAgfSBlbHNlIGlmIChkYXlzIDwgY3V0b2ZmLmRheXMpIHtcbiAgICByZXR1cm4gZGF5cyArIHN1ZmZpeC5kYXlzW2dldEZvcm0oZGF5cyldXG4gIH0gZWxzZSBpZiAod2Vla3MgPCBjdXRvZmYud2Vla3MpIHtcbiAgICByZXR1cm4gd2Vla3MgKyBzdWZmaXgud2Vla3NbZ2V0Rm9ybSh3ZWVrcyldXG4gIH0gZWxzZSBpZiAobW9udGhzIDwgY3V0b2ZmLm1vbnRocykge1xuICAgIHJldHVybiBtb250aHMgKyBzdWZmaXgubW9udGhzW2dldEZvcm0obW9udGhzKV1cbiAgfSBlbHNlIHtcbiAgICByZXR1cm4geWVhcnMgKyBzdWZmaXgueWVhcnNbZ2V0Rm9ybSh5ZWFycyldXG4gIH1cbn1cblxuZnVuY3Rpb24gZ2V0Rm9ybSAodmFsdWUpIHtcbiAgaWYgKHZhbHVlID09PSAxKSB7XG4gICAgcmV0dXJuICdzaW5ndWxhcidcbiAgfVxuICByZXR1cm4gJ3BsdXJhbCdcbn1cbiIsIm1vZHVsZS5leHBvcnRzID0ge1xuICBzZWNvbmRzOiByZXF1aXJlKCcuL3RpbWUtYWdvL3NlY29uZHMtYWdvLmpzJyksXG4gIG1pbnV0ZXM6IHJlcXVpcmUoJy4vdGltZS1hZ28vbWludXRlcy1hZ28uanMnKSxcbiAgaG91cnM6IHJlcXVpcmUoJy4vdGltZS1hZ28vaG91cnMtYWdvLmpzJyksXG4gIGRheXM6IHJlcXVpcmUoJy4vdGltZS1hZ28vZGF5cy1hZ28uanMnKSxcbiAgd2Vla3M6IHJlcXVpcmUoJy4vdGltZS1hZ28vd2Vla3MtYWdvLmpzJyksXG4gIG1vbnRoczogcmVxdWlyZSgnLi90aW1lLWFnby9tb250aHMtYWdvLmpzJyksXG4gIHllYXJzOiByZXF1aXJlKCcuL3RpbWUtYWdvL3llYXJzLWFnby5qcycpXG59XG4iLCJtb2R1bGUuZXhwb3J0cyA9IERheXNBZ29cblxuZnVuY3Rpb24gRGF5c0FnbyAocGFzdEVwb2NoLCBjdXJyZW50RXBvY2gpIHtcbiAgdmFyIGRheXNBZ28gPSAoY3VycmVudEVwb2NoIC0gcGFzdEVwb2NoKSAvIDEwMDAgLyA2MCAvIDYwIC8gMjRcbiAgcmV0dXJuIGRheXNBZ29cbn1cbiIsIm1vZHVsZS5leHBvcnRzID0gSG91cnNBZ29cblxuZnVuY3Rpb24gSG91cnNBZ28gKHBhc3RFcG9jaCwgY3VycmVudEVwb2NoKSB7XG4gIHZhciBob3Vyc0FnbyA9IChjdXJyZW50RXBvY2ggLSBwYXN0RXBvY2gpIC8gMTAwMCAvIDYwIC8gNjBcbiAgcmV0dXJuIGhvdXJzQWdvXG59XG4iLCJtb2R1bGUuZXhwb3J0cyA9IE1pbnV0ZXNBZ29cblxuZnVuY3Rpb24gTWludXRlc0FnbyAocGFzdEVwb2NoLCBjdXJyZW50RXBvY2gpIHtcbiAgdmFyIG1pbnV0ZXNBZ28gPSAoY3VycmVudEVwb2NoIC0gcGFzdEVwb2NoKSAvIDEwMDAgLyA2MFxuICByZXR1cm4gbWludXRlc0Fnb1xufVxuIiwibW9kdWxlLmV4cG9ydHMgPSBNb250aHNBZ29cblxuZnVuY3Rpb24gTW9udGhzQWdvIChwYXN0RXBvY2gsIGN1cnJlbnRFcG9jaCkge1xuICB2YXIgbW9udGhzQWdvID0gKGN1cnJlbnRFcG9jaCAtIHBhc3RFcG9jaCkgLyAxMDAwIC8gNjAgLyA2MCAvIDI0IC8gMzFcbiAgcmV0dXJuIG1vbnRoc0Fnb1xufVxuIiwibW9kdWxlLmV4cG9ydHMgPSBTZWNvbmRzQWdvXG5cbmZ1bmN0aW9uIFNlY29uZHNBZ28gKHBhc3RFcG9jaCwgY3VycmVudEVwb2NoKSB7XG4gIHZhciBzZWNvbmRzQWdvID0gKGN1cnJlbnRFcG9jaCAtIHBhc3RFcG9jaCkgLyAxMDAwXG4gIHJldHVybiBzZWNvbmRzQWdvXG59XG4iLCJtb2R1bGUuZXhwb3J0cyA9IFdlZWtzQWdvXG5cbmZ1bmN0aW9uIFdlZWtzQWdvIChwYXN0RXBvY2gsIGN1cnJlbnRFcG9jaCkge1xuICB2YXIgd2Vla3NBZ28gPSAoY3VycmVudEVwb2NoIC0gcGFzdEVwb2NoKSAvIDEwMDAgLyA2MCAvIDYwIC8gMjQgLyA3XG4gIHJldHVybiB3ZWVrc0Fnb1xufVxuIiwibW9kdWxlLmV4cG9ydHMgPSBZZWFyc0Fnb1xuXG5mdW5jdGlvbiBZZWFyc0FnbyAocGFzdEVwb2NoLCBjdXJyZW50RXBvY2gpIHtcbiAgdmFyIHllYXJzQWdvID0gKGN1cnJlbnRFcG9jaCAtIHBhc3RFcG9jaCkgLyAxMDAwIC8gNjAgLyA2MCAvIDI0IC8gMzEgLyAxMlxuICByZXR1cm4geWVhcnNBZ29cbn1cbiIsIi8qKlxyXG4gKiBIYW5kbGUgbmF2aWdhdGlvblxyXG4gKi9cclxuXHJcbi8vIERlcGVuZGVuY2llc1xyXG5pbXBvcnQgc2Nyb2xsQ2hhbmdlIGZyb20gJ2RzLWFzc2V0cy9zY3JvbGwvc2Nyb2xsLWNoYW5nZSc7XHJcbmltcG9ydCBkZWJvdW5jZSBmcm9tICdkcy1hc3NldHMvYXN5bmMvZGVib3VuY2UnO1xyXG5pbXBvcnQgZ2V0QWxsIGZyb20gJ2RzLWFzc2V0cy9kb20vZ2V0LWFsbCc7XHJcbmltcG9ydCBoYXNTY3JvbGxlZFBhc3QgZnJvbSAnZHMtYXNzZXRzL3Njcm9sbC9oYXMtc2Nyb2xsZWQtcGFzdCc7XHJcbmltcG9ydCBnZXRVc2VyRGF0YSBmcm9tICcuLi9saWIvZ2V0LWxvZ2dlZC1pbi1kYXRhJztcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uKCkge1xyXG5cclxuICB2YXIgJG5hdiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5uYXYnKTtcclxuICBpZiAoISRuYXYpIHtcclxuICAgIHJldHVybjtcclxuICB9XHJcblxyXG4gIHZhciAkYm9keSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2JvZHknKTtcclxuXHJcbiAgLy8gQ2xvbmUgbmF2aWdhdGlvbiBhbmQgbWFrZSB0aGUgbmV3IG9uZSBzdGlja3lcclxuICB2YXIgJHN0aWNreU5hdiA9ICRuYXYuY2xvbmVOb2RlKHRydWUpO1xyXG4gICRzdGlja3lOYXYuY2xhc3NMaXN0LmFkZCgnbmF2LS1zdGlja3knKTtcclxuICAkYm9keS5pbnNlcnRCZWZvcmUoJHN0aWNreU5hdiwgJGJvZHkuZmlyc3RDaGlsZCk7XHJcblxyXG4gIHZhciAkZm9vdGVyU2hhcmVCYXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZm9vdGVyX19zaGFyZS1iYXInKTtcclxuICB2YXIgJHN0aWNreVNoYXJlQmFyO1xyXG4gIGlmICgkZm9vdGVyU2hhcmVCYXIpIHtcclxuICAgICRzdGlja3lTaGFyZUJhciA9ICRmb290ZXJTaGFyZUJhci5jbG9uZU5vZGUodHJ1ZSk7XHJcbiAgICAkc3RpY2t5U2hhcmVCYXIuY2xhc3NMaXN0LmFkZCgnZm9vdGVyX19zaGFyZS1iYXItLXN0aWNreScpO1xyXG4gICAgJGJvZHkuaW5zZXJ0QmVmb3JlKCRzdGlja3lTaGFyZUJhciwgJGJvZHkuZmlyc3RDaGlsZCk7XHJcbiAgfVxyXG5cclxuICAvLyBBY3RpdmF0ZSB0aGUgc3RpY2t5IG5hdmlnYXRpb24gd2hlbiB0aGUgdXNlciBzY3JvbGxzIHVwLlxyXG4gIC8vIFRoaXMgd2lsbCBmaXJzIHRha2UgZWZmZWN0LCB3aGVuIHRoZSB1c2VyIGhhcyBzY3JvbGxlZCBcImEgc2NyZWVuXCIgZG93bi5cclxuICBzY3JvbGxDaGFuZ2UoZnVuY3Rpb24oKSB7XHJcbiAgICAkc3RpY2t5TmF2LmNsYXNzTGlzdC5yZW1vdmUoJ25hdi0tYWN0aXZlJyk7XHJcbiAgICBpZiAoJHN0aWNreVNoYXJlQmFyKSB7XHJcbiAgICAgICRzdGlja3lTaGFyZUJhci5jbGFzc0xpc3QucmVtb3ZlKCdmb290ZXJfX3NoYXJlLWJhci0tc3RpY2t5LWFjdGl2ZScpO1xyXG4gICAgfVxyXG4gIH0sIGZ1bmN0aW9uKCkge1xyXG4gICAgaWYgKHdpbmRvdy5zY3JvbGxZID4gd2luZG93LmlubmVySGVpZ2h0KSB7XHJcbiAgICAgICRzdGlja3lOYXYuY2xhc3NMaXN0LmFkZCgnbmF2LS1hY3RpdmUnKTtcclxuICAgICAgaWYgKCRzdGlja3lTaGFyZUJhcikge1xyXG4gICAgICAgICRzdGlja3lTaGFyZUJhci5jbGFzc0xpc3QuYWRkKCdmb290ZXJfX3NoYXJlLWJhci0tc3RpY2t5LWFjdGl2ZScpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfSk7XHJcblxyXG4gIC8qKlxyXG4gICAqIEhpZGUgc3RpY2t5IG5hdmlnYXRpb24gd2hlbiBzY3JvbGxlZCB0byB0aGUgdG9wIG9mIHRoZSBkb2N1bWVudFxyXG4gICAqIEByZXR1cm4ge3ZvaWR9XHJcbiAgICovXHJcbiAgdmFyIG9uVG9wID0gZnVuY3Rpb24oKSB7XHJcbiAgICB2YXIgc2Nyb2xsUG9zID0gd2luZG93LnNjcm9sbFkgfHwgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LnNjcm9sbFRvcDtcclxuICAgIGlmIChzY3JvbGxQb3MgPD0gMCkge1xyXG4gICAgICAkc3RpY2t5TmF2LmNsYXNzTGlzdC5hZGQoJ25hdi0taGlkZGVuJyk7XHJcbiAgICAgICRzdGlja3lOYXYuY2xhc3NMaXN0LnJlbW92ZSgnbmF2LS1hY3RpdmUnKTtcclxuICAgICAgaWYgKCRzdGlja3lTaGFyZUJhcikge1xyXG4gICAgICAgICRzdGlja3lTaGFyZUJhci5jbGFzc0xpc3QucmVtb3ZlKCdmb290ZXJfX3NoYXJlLWJhci0tc3RpY2t5LWFjdGl2ZScpO1xyXG4gICAgICB9XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAkc3RpY2t5TmF2LmNsYXNzTGlzdC5yZW1vdmUoJ25hdi0taGlkZGVuJyk7XHJcbiAgICB9XHJcbiAgICBpZiAoJHN0aWNreVNoYXJlQmFyKSB7XHJcbiAgICAgIHZhciB0aHJlc2hvbGQgPSAkZm9vdGVyU2hhcmVCYXIub2Zmc2V0SGVpZ2h0IC8gd2luZG93LmlubmVySGVpZ2h0O1xyXG4gICAgICBpZiAoaGFzU2Nyb2xsZWRQYXN0KCRmb290ZXJTaGFyZUJhciwgLTEgKiB0aHJlc2hvbGQpKSB7XHJcbiAgICAgICAgJHN0aWNreVNoYXJlQmFyLmNsYXNzTGlzdC5hZGQoJ2hpZGRlbicpO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgICRzdGlja3lTaGFyZUJhci5jbGFzc0xpc3QucmVtb3ZlKCdoaWRkZW4nKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH07XHJcblxyXG4gIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdzY3JvbGwnLCBkZWJvdW5jZShvblRvcCkpO1xyXG4gIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdyZXNpemUnLCBkZWJvdW5jZShvblRvcCkpO1xyXG5cclxuICAvLyBDaGFuZ2Ugd29yZGluZyBvbiBcInNpZ24gaW5cIiBidXR0b24gd2hlbiB1c2VyIGlzIGxvZ2dlZCBpblxyXG4gIGdldFVzZXJEYXRhKCkudGhlbihmdW5jdGlvbigpIHtcclxuICAgIGdldEFsbCgnLm5hdl9faXRlbS0tc2lnbi1pbicpLmZvckVhY2goZnVuY3Rpb24oJHNpZ25pbikge1xyXG4gICAgICAkc2lnbmluLmlubmVySFRNTCA9ICdDcmVhdGUgYSBzdG9yeSc7XHJcbiAgICB9KTtcclxuICB9KS5jYXRjaChmdW5jdGlvbigpIHt9KTtcclxuXHJcbn1cclxuIiwiLyoqXHJcbiAqIEhhbmRsZSByZXNwb25zZXMgYW5kIGxpa2VzIGluIHBvc3RzXHJcbiAqL1xyXG5cclxuLy8gRGVwZW5kZW5jaWVzXHJcbmltcG9ydCBnZXRBbGwgZnJvbSAnZHMtYXNzZXRzL2RvbS9nZXQtYWxsJztcclxuaW1wb3J0IGxhenlJbWFnZXMgZnJvbSAnZHMtYXNzZXRzL2xhenkvaW1hZ2VzJztcclxuaW1wb3J0ICogYXMgYXBpIGZyb20gJy4uL2xpYi9hcGknO1xyXG5pbXBvcnQgZ2V0VXNlckRhdGEgZnJvbSAnLi4vbGliL2dldC1sb2dnZWQtaW4tZGF0YSc7XHJcbmltcG9ydCB1c2VyTWV0YVRlbXBsYXRlIGZyb20gJy4uL3RlbXBsYXRlcy9yZXNwb25zZS1tZXRhJztcclxuaW1wb3J0IHJlc3BvbnNlVGVtcGxhdGUgZnJvbSAnLi4vdGVtcGxhdGVzL3Jlc3BvbnNlJztcclxuaW1wb3J0IG9mZnNldFRvcCBmcm9tICdkcy1hc3NldHMvZG9tL2dldC1kb2N1bWVudC1vZmZzZXQtdG9wJztcclxuaW1wb3J0IGxpdmVWYWxpZGF0aW9uIGZyb20gJy4uL2xpYi9mb3JtL2xpdmUtdmFsaWRhdGlvbic7XHJcbmltcG9ydCB2YWxpZGF0ZUZvcm0gZnJvbSAnLi4vbGliL2Zvcm0vdmFsaWRhdGUnO1xyXG5cclxuLy8gQ2FjaGVkIGRvbSBlbGVtZW50c1xyXG52YXIgJHJlc3BvbnNlRm9ybTtcclxudmFyICRjdGE7XHJcbnZhciAkdmFsaWRhdG9ycztcclxudmFyICRyZXNwb25zZXNMaXN0O1xyXG52YXIgcmVuZGVyUmVzcG9uc2VzO1xyXG52YXIgYWRkRGVsZXRlRXZlbnRzO1xyXG52YXIgc2V0UmVzcG9uc2VzTnVtYmVyO1xyXG52YXIgYWRkUmVhZE1vcmVFdmVudDtcclxuXHJcbnZhciB1cGRhdGVSZXNwb25zZUNUQSA9IGZ1bmN0aW9uKHZhbGlkKSB7XHJcblx0aWYgKHZhbGlkKSB7XHJcblx0XHQkY3RhLmNsYXNzTGlzdC5yZW1vdmUoJ2J0bi0tZGlzYWJsZWQnKTtcclxuXHR9IGVsc2Uge1xyXG5cdFx0JGN0YS5jbGFzc0xpc3QuYWRkKCdidG4tLWRpc2FibGVkJyk7XHJcblx0fVxyXG59O1xyXG5cclxuLyoqXHJcbiAqIERlbGV0ZSByZXNwb25zZSB3aGVuIGRlbGV0ZSBpY29uIGNsaWNrZWRcclxuICovXHJcbmFkZERlbGV0ZUV2ZW50cyA9IGZ1bmN0aW9uKCkge1xyXG5cdGdldEFsbCgnLnJlc3BvbnNlX19kZWxldGUnKS5mb3JFYWNoKGZ1bmN0aW9uKCRkZWxldGUpIHtcclxuXHRcdCRkZWxldGUuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbihlKSB7XHJcblx0XHRcdGUucHJldmVudERlZmF1bHQoKTtcclxuXHRcdFx0YXBpLnJlbW92ZVJlc3BvbnNlKCRkZWxldGUuZGF0YXNldC5wdWJsaXNoZWQsICRkZWxldGUuZGF0YXNldC5uYW1lKVxyXG5cdFx0XHRcdC50aGVuKGZ1bmN0aW9uKGRhdGEpIHtcclxuXHRcdFx0XHRcdHJlbmRlclJlc3BvbnNlcyhkYXRhLnJlc3BvbnNlcyk7XHJcblx0XHRcdFx0XHRzZXRSZXNwb25zZXNOdW1iZXIoZGF0YS5yZXNwb25zZXMpO1xyXG5cdFx0XHRcdH0pO1xyXG5cdFx0fSk7XHJcblx0fSk7XHJcbn07XHJcblxyXG4vKipcclxuICogRXhwYW5kIHJlc3BvbnNlIHdpdGggZnVsbCB0ZXh0IHdoZW4gcmVhZCBtb3JlIGJ1dHRvbiBpcyBhY3RpdmF0ZWQuXHJcbiAqIEJhc2ljYWxseSBpdCBoaWRlcyB0aGUgZXhjZXJwdCBhbmQgdGhlIHJlYWQgbW9yZSBidXR0b24gYW5kIGRpc3BsYXlzIHRoZVxyXG4gKiBmdWxsIHRleHQuXHJcbiAqIEBwYXJhbSB7ZWxlbWVudH0gJHJlc3BvbnNlXHJcbiAqL1xyXG5hZGRSZWFkTW9yZUV2ZW50ID0gZnVuY3Rpb24oJHJlc3BvbnNlKSB7XHJcblx0dmFyICRyZWFkTW9yZSA9ICRyZXNwb25zZS5xdWVyeVNlbGVjdG9yKCcucmVzcG9uc2VfX3JlYWQtbW9yZScpO1xyXG5cdGlmICghJHJlYWRNb3JlKSB7XHJcblx0XHRyZXR1cm47XHJcblx0fVxyXG5cdCRyZWFkTW9yZS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uKGUpIHtcclxuXHRcdGUucHJldmVudERlZmF1bHQoKTtcclxuXHRcdHZhciAkZXhjZXJwdCA9ICRyZXNwb25zZS5xdWVyeVNlbGVjdG9yKCcucmVzcG9uc2VfX2V4Y2VycHQnKTtcclxuXHRcdHZhciAkcmVhZE1vcmVDb250YWluZXIgPSAkcmVhZE1vcmUucGFyZW50Tm9kZTtcclxuXHJcblx0XHQkcmVhZE1vcmVDb250YWluZXIucGFyZW50Tm9kZS5yZW1vdmVDaGlsZCgkcmVhZE1vcmVDb250YWluZXIpO1xyXG5cdFx0JGV4Y2VycHQucGFyZW50Tm9kZS5yZW1vdmVDaGlsZCgkZXhjZXJwdCk7XHJcblxyXG5cdFx0JHJlc3BvbnNlLnF1ZXJ5U2VsZWN0b3IoJy5yZXNwb25zZV9fdGV4dCcpLmNsYXNzTGlzdC5yZW1vdmUoJ2hpZGRlbicpO1xyXG5cdH0pO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIFJlbmRlciB0ZW1wbGF0ZXMgZm9yIHJlc3BvbnNlcyBhbmQgaW5zZXJ0IGh0bWwgaW4gdGhlIHJlc3BvbnNlcyBsaXN0LlxyXG4gKiAtIExhenkgbG9hZCBpbWFnZXMgaW4gcmVzcG9uc2VzXHJcbiAqIC0gQXR0YWNoIG5ldyBldmVudHMgaW4gcmVzcG9uc2VzXHJcbiAqIEBwYXJhbSAge2FycmF5fSByZXNwb25zZXNcclxuICogQHJldHVybiB7dm9pZH1cclxuICovXHJcbnJlbmRlclJlc3BvbnNlcyA9IGZ1bmN0aW9uKHJlc3BvbnNlcykge1xyXG5cdHZhciBodG1sID0gJyc7XHJcblx0cmVzcG9uc2VzLmZvckVhY2goZnVuY3Rpb24ocmVzcG9uc2UpIHtcclxuXHRcdGh0bWwgKz0gcmVzcG9uc2VUZW1wbGF0ZShyZXNwb25zZSk7XHJcblx0fSk7XHJcblx0JHJlc3BvbnNlc0xpc3QuaW5uZXJIVE1MID0gaHRtbDtcclxuXHRsYXp5SW1hZ2VzKDEpO1xyXG5cdGFkZERlbGV0ZUV2ZW50cygpO1xyXG5cdGdldEFsbCgnLnJlc3BvbnNlJywgJHJlc3BvbnNlc0xpc3QpLmZvckVhY2goYWRkUmVhZE1vcmVFdmVudCk7XHJcbn07XHJcblxyXG4vKipcclxuICogVXBkYXRlIHRoZSBjb3VudCBvZiByZXNwb25zZXNcclxuICogQHBhcmFtIHthcnJheX0gcmVzcG9uc2VzXHJcbiAqL1xyXG5zZXRSZXNwb25zZXNOdW1iZXIgPSBmdW5jdGlvbihyZXNwb25zZXMpIHtcclxuXHRnZXRBbGwoJy5zaGFyZV9fcmVzcG9uc2VzJykuZm9yRWFjaChmdW5jdGlvbigkcmVzcG9uc2VzKSB7XHJcblx0XHQkcmVzcG9uc2VzLmlubmVySFRNTCA9IHJlc3BvbnNlcy5sZW5ndGg7XHJcblx0fSk7XHJcbn07XHJcblxyXG4vKipcclxuICogVXBkYXRlIHRoZSBjb3VudCBmbyBsaWtlcyBmb3IgdGhpcyBwb3N0XHJcbiAqIEBwYXJhbSB7bnVtYmVyfSBsaWtlc1xyXG4gKi9cclxudmFyIHNldExpa2VzTnVtYmVyID0gZnVuY3Rpb24obGlrZXMpIHtcclxuXHRnZXRBbGwoJy5zaGFyZV9fbGlrZXMnKS5mb3JFYWNoKGZ1bmN0aW9uKCRsaWtlcykge1xyXG5cdFx0aWYgKCFpc05hTihsaWtlcykpIHtcclxuXHRcdFx0JGxpa2VzLmlubmVySFRNTCA9IGxpa2VzO1xyXG5cdFx0fSBlbHNlIGlmIChpc05hTigkbGlrZXMuaW5uZXJIVE1MKSkge1xyXG5cdFx0XHQkbGlrZXMuaW5uZXJIVE1MID0gMTtcclxuXHRcdH0gZWxzZSB7XHJcblx0XHRcdCRsaWtlcy5pbm5lckhUTUwgPSBwYXJzZUludCgkbGlrZXMuaW5uZXJIVE1MKSArIDE7XHJcblx0XHR9XHJcblx0fSk7XHJcbn07XHJcblxyXG4vKipcclxuICogR2V0IGRhdGEgZnJvbSBhcGkgd2l0aCBtZXRhIGRhdGE6IHJlc3BvbnNlcyBhbmQgbGlrZXMuXHJcbiAqIFJlbmRlciB0aGlzIGluIHRoZSBkb20uXHJcbiAqIEByZXR1cm4ge3ZvaWR9XHJcbiAqL1xyXG52YXIgcmVuZGVyTWV0YSA9IGZ1bmN0aW9uKCkge1xyXG5cdGFwaS5nZXRNZXRhKCkudGhlbihmdW5jdGlvbihkYXRhKSB7XHJcblx0XHRyZW5kZXJSZXNwb25zZXMoZGF0YS5yZXNwb25zZXMpO1xyXG5cdFx0c2V0UmVzcG9uc2VzTnVtYmVyKGRhdGEucmVzcG9uc2VzKTtcclxuXHRcdHNldExpa2VzTnVtYmVyKGRhdGEubGlrZXMpO1xyXG5cdH0pO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIFBvc3QgbmV3IHJlc3BvbnNlIHRvIHBvc3RcclxuICogLSBjaGVja3MgZm9yIHZhbGlkYXRpb24gYmVmb3JlIHBvc3RpbmdcclxuICogQHBhcmFtICB7ZXZlbnR9IGVcclxuICogQHJldHVybiB7dm9pZH1cclxuICovXHJcbnZhciBzdWJtaXRSZXNwb25zZSA9IGZ1bmN0aW9uKGUpIHtcclxuXHRlLnByZXZlbnREZWZhdWx0KCk7XHJcblxyXG5cdHZhciBsb2dnZWRJbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2JvZHknKS5jbGFzc0xpc3QuY29udGFpbnMoJ3VzZXItbG9nZ2VkLWluJyk7XHJcblxyXG5cdC8vIElmIGEgZmllbGQgaXMgbm90IHZhbGlkIHRoaXMgZmllbGQgd2lsbCBnZXQgZm9jdXMsIHNvIHRoZSB1c2VyIHF1aWNrbHkgY2FuIHVwZGF0ZSB0aGUgdmFsdWUuXHJcblx0dmFyIG5vdFZhbGlkID0gJHZhbGlkYXRvcnMuc29tZShmdW5jdGlvbigkdmFsaWRhdG9yKSB7XHJcblx0XHRpZiAoJHZhbGlkYXRvci5jbGFzc0xpc3QuY29udGFpbnMoJ3ZhbGlkYXRlLS1ub3QtdmFsaWQnKSkge1xyXG5cdFx0XHR2YXIgJHZhbGlkYXRlRmllbGQgPSAkdmFsaWRhdG9yLnF1ZXJ5U2VsZWN0b3IoJ2lucHV0LCB0ZXh0YXJlYScpO1xyXG5cdFx0XHQkdmFsaWRhdGVGaWVsZC5mb2N1cygpO1xyXG5cdFx0XHRyZXR1cm4gdHJ1ZTtcclxuXHRcdH1cclxuXHR9KTtcclxuXHJcblx0aWYgKG5vdFZhbGlkKSB7XHJcblx0XHRyZXR1cm47XHJcblx0fVxyXG5cclxuXHQvLyBDcmVhdGUgYSByZXNwb25zZSBvYmplY3QgYmFzZWQgb24gdmFsdWVzIGluIGZvcm1cclxuXHR2YXIgcmVzcG9uc2UgPSB7fTtcclxuXHRnZXRBbGwoJ2lucHV0LCB0ZXh0YXJlYScsICRyZXNwb25zZUZvcm0pLmZvckVhY2goZnVuY3Rpb24oJGZpZWxkKSB7XHJcblx0XHR2YXIgbmFtZSA9ICRmaWVsZC5nZXRBdHRyaWJ1dGUoJ25hbWUnKTtcclxuXHRcdGlmICgkZmllbGQudmFsdWUpIHtcclxuXHRcdFx0cmVzcG9uc2VbbmFtZV0gPSAkZmllbGQudmFsdWU7XHJcblx0XHR9XHJcblx0fSk7XHJcblxyXG5cdCRjdGEuaW5uZXJIVE1MID0gJ1Bvc3RpbmcuLi4nO1xyXG5cdCRjdGEuY2xhc3NMaXN0LmFkZCgnYnRuLS1kaXNhYmxlZCcpO1xyXG5cdGFwaS5hZGRSZXNwb25zZShyZXNwb25zZSkudGhlbihmdW5jdGlvbihkYXRhKSB7XHJcblx0XHRyZW5kZXJSZXNwb25zZXMoZGF0YS5yZXNwb25zZXMpO1xyXG5cdFx0c2V0UmVzcG9uc2VzTnVtYmVyKGRhdGEucmVzcG9uc2VzKTtcclxuXHJcblx0XHQvLyBTY3JvbGwgdG8gbmV3IHJlc3BvbnNlXHJcblx0XHR2YXIgJGxhc3RSZXNwb25zZSA9ICRyZXNwb25zZXNMaXN0LnF1ZXJ5U2VsZWN0b3IoJy5yZXNwb25zZTpsYXN0LWNoaWxkJyk7XHJcblx0XHR2YXIgb2Zmc2V0ID0gb2Zmc2V0VG9wKCRsYXN0UmVzcG9uc2UpO1xyXG5cdFx0d2luZG93LnNjcm9sbFRvKDAsIG9mZnNldCAtICgwLjUgKiB3aW5kb3cuaW5uZXJIZWlnaHQpKTtcclxuXHJcblx0XHQvLyBSZXNldCBmb3JtXHJcblx0XHQkY3RhLmlubmVySFRNTCA9ICdSZXNwb25kJztcclxuXHRcdGlmIChsb2dnZWRJbikge1xyXG5cdFx0XHR2YXIgJHRleHQgPSAkcmVzcG9uc2VGb3JtLnF1ZXJ5U2VsZWN0b3IoJy5yZXNwb25zZXMtZm9ybV9fdGV4dCcpO1xyXG5cdFx0XHQkdGV4dC5jbGFzc0xpc3QuYWRkKCd2YWxpZGF0ZS0tbm90LXZhbGlkJyk7XHJcblx0XHRcdCR0ZXh0LmNsYXNzTGlzdC5yZW1vdmUoJ3ZhbGlkYXRlLS12YWxpZCcpO1xyXG5cdFx0XHQkdGV4dC5xdWVyeVNlbGVjdG9yKCd0ZXh0YXJlYScpLnZhbHVlID0gJyc7XHJcblx0XHRcdCR0ZXh0LnF1ZXJ5U2VsZWN0b3IoJy5wbGFjZWhvbGRlcicpLmNsYXNzTGlzdC5yZW1vdmUoJ3BsYWNlaG9sZGVyLS1ub3QtZW1wdHknKTtcclxuXHRcdH0gZWxzZSB7XHJcblx0XHRcdCR2YWxpZGF0b3JzLmZvckVhY2goZnVuY3Rpb24oJHZhbGlkYXRvcikge1xyXG5cdFx0XHRcdGlmICgkdmFsaWRhdG9yLmRhdGFzZXQudmFsaWRhdGVSZXF1aXJlZCAhPT0gdW5kZWZpbmVkKSB7XHJcblx0XHRcdFx0XHQkdmFsaWRhdG9yLmNsYXNzTGlzdC5hZGQoJ3ZhbGlkYXRlLS1ub3QtdmFsaWQnKTtcclxuXHRcdFx0XHRcdCR2YWxpZGF0b3IuY2xhc3NMaXN0LnJlbW92ZSgndmFsaWRhdGUtLXZhbGlkJyk7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHRcdCR2YWxpZGF0b3IucXVlcnlTZWxlY3RvcignaW5wdXQsIHRleHRhcmVhJykudmFsdWUgPSAnJztcclxuXHRcdFx0XHQkdmFsaWRhdG9yLnF1ZXJ5U2VsZWN0b3IoJy5wbGFjZWhvbGRlcicpLmNsYXNzTGlzdC5yZW1vdmUoJ3BsYWNlaG9sZGVyLS1ub3QtZW1wdHknKTtcclxuXHRcdFx0fSk7XHJcblx0XHR9XHJcblx0fSk7XHJcblxyXG59O1xyXG5cclxuLyoqXHJcbiAqIFVwZGF0ZSBoZWFydCAobGlrZSkgaWNvbnMgdG8gaW5kaWNhdGUsIHRoYXQgdGhlIHVzZXIgaGF2ZSBsaWtlZCB0aGUgYXJ0aWNsZVxyXG4gKiBAcmV0dXJuIHt2b2lkfVxyXG4gKi9cclxudmFyIGxpa2VkID0gZnVuY3Rpb24oKSB7XHJcblx0dmFyICR0b29sVGlwSWNvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy50b29sLXRpcF9fbGlrZS1pY29uJyk7XHJcblx0JHRvb2xUaXBJY29uLnNldEF0dHJpYnV0ZSgnc3JjJywgJy9hc3NldHMvaW1hZ2VzL2hlYXJ0LS1pbnZlcnNlLS1hY3RpdmUuc3ZnJyk7XHJcblx0JHRvb2xUaXBJY29uLnNldEF0dHJpYnV0ZSgnZGF0YS1zcmMnLCAnL2Fzc2V0cy9pbWFnZXMvaGVhcnQtLWludmVyc2UtLWFjdGl2ZS5zdmcnKTtcclxuXHJcblx0Z2V0QWxsKCcucG9zdC1mb290ZXJfX2xpa2UtaWNvbicpLmZvckVhY2goZnVuY3Rpb24oJGZvb3Rlckljb24pIHtcclxuXHRcdCRmb290ZXJJY29uLnNldEF0dHJpYnV0ZSgnc3JjJywgJy9hc3NldHMvaW1hZ2VzL2hlYXJ0LS1pbnZlcnNlLS1hY3RpdmUuc3ZnJyk7XHJcblx0XHQkZm9vdGVySWNvbi5zZXRBdHRyaWJ1dGUoJ2RhdGEtc3JjJywgJy9hc3NldHMvaW1hZ2VzL2hlYXJ0LS1pbnZlcnNlLS1hY3RpdmUuc3ZnJyk7XHJcblx0fSk7XHJcblxyXG5cdC8vIEluZGljYXRlcywgdGhhdCB0aGUgbGlrZSBidXR0b24gbm8gbG9uZ2VyIGlzIGNsaWNrYWJsZVxyXG5cdGdldEFsbCgnLnNoYXJlX19saWtlJykuZm9yRWFjaCgkbGlrZSA9PiAkbGlrZS5jbGFzc0xpc3QuYWRkKCdkaXNhYmxlZCcpKTtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBBY3RpdmF0ZSBsaWtlLCB3aGVuIGxpa2UgYnV0dG9ucyBhcmUgY2xpY2tlZFxyXG4gKiBAcGFyYW0gIHtlbGVtZW50fSAkYW5jaG9yXHJcbiAqIEByZXR1cm4ge3ZvaWR9XHJcbiAqL1xyXG52YXIgYXR0YWNoTGlrZUV2ZW50ID0gZnVuY3Rpb24oJGFuY2hvcikge1xyXG5cdCRhbmNob3IuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbihlKSB7XHJcblx0XHRlLnByZXZlbnREZWZhdWx0KCk7XHJcblxyXG5cdFx0Ly8gQWxyZWFkeSBsaWtlZCB0aGlzIGFydGljbGVcclxuXHRcdGlmIChsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnbGlrZTonICsgd2luZG93LnBvc3RJZCkpIHtcclxuXHRcdFx0cmV0dXJuO1xyXG5cdFx0fVxyXG5cclxuXHRcdGxvY2FsU3RvcmFnZS5zZXRJdGVtKCdsaWtlOicgKyB3aW5kb3cucG9zdElkLCB0cnVlKTtcclxuXHRcdGxpa2VkKCk7XHJcblx0XHRzZXRMaWtlc051bWJlcigpO1xyXG5cdFx0YXBpLmxpa2UoKTtcclxuXHR9KTtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBVcGRhdGUgcmVzcG9uc2VzIGZvcm0gaWYgdXNlciBpcyBsb2dnZWQgaW4uXHJcbiAqIFVzZXIgZG8gbm90IG5lZWQgdG8gZmlsbCBlLW1haWwsIG5hbWUgZXRjLlxyXG4gKiBAcGFyYW0gIHtvYmplY3R9IGRhdGFcclxuICogQHJldHVybiB7dm9pZH1cclxuICovXHJcbnZhciByZW5kZXJVc2VyRm9ybSA9IGZ1bmN0aW9uKHVzZXIpIHtcclxuXHR2YXIgaHRtbCA9IHVzZXJNZXRhVGVtcGxhdGUodXNlcik7XHJcblx0dmFyICRtZXRhID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcblx0JG1ldGEuaW5uZXJIVE1MID0gaHRtbDtcclxuXHR2YXIgJGhlYWRlciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5yZXNwb25zZXNfX2Zvcm0gaDMnKTtcclxuXHJcblx0Ly8gRmlsbCBpbnB1dCBmaWVsZHMgd2l0aCByZWxldmFudCBkYXRhXHJcblx0Z2V0QWxsKCcucmVzcG9uc2VzX19mb3JtIGlucHV0JykuZm9yRWFjaChmdW5jdGlvbigkaW5wdXQpIHtcclxuXHRcdHZhciBuYW1lID0gJGlucHV0LmdldEF0dHJpYnV0ZSgnbmFtZScpO1xyXG5cdFx0aWYgKG5hbWUgPT09ICd3ZWJzaXRlJykge1xyXG5cdFx0XHQkaW5wdXQudmFsdWUgPSAnL2F1dGhvci8nICsgdXNlci5zbHVnO1xyXG5cdFx0fSBlbHNlIHtcclxuXHRcdFx0JGlucHV0LnZhbHVlID0gdXNlcltuYW1lXTtcclxuXHRcdH1cclxuXHRcdCRpbnB1dC5wYXJlbnROb2RlLmNsYXNzTGlzdC5hZGQoJ3ZhbGlkYXRlLS12YWxpZCcpO1xyXG5cdFx0JGlucHV0LnBhcmVudE5vZGUuY2xhc3NMaXN0LnJlbW92ZSgndmFsaWRhdGUtLW5vdC12YWxpZCcpO1xyXG5cdH0pO1xyXG5cclxuXHQvLyBJbnNlcnQgYWZ0ZXIgaGVhZGVyXHJcblx0JGhlYWRlci5wYXJlbnROb2RlLmluc2VydEJlZm9yZSgkbWV0YSwgJGhlYWRlci5uZXh0U2libGluZyk7XHJcblx0bGF6eUltYWdlcygxKTtcclxuXHR2YWxpZGF0ZUZvcm0oJHZhbGlkYXRvcnMsIHVwZGF0ZVJlc3BvbnNlQ1RBKTtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBJbml0IHJlc3BvbnNlc1xyXG4gKiBAcmV0dXJuIHt2b2lkfVxyXG4gKi9cclxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24oKSB7XHJcblx0JHJlc3BvbnNlRm9ybSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5yZXNwb25zZXNfX2Zvcm0nKTtcclxuXHJcblx0aWYgKCEkcmVzcG9uc2VGb3JtKSB7XHJcblx0XHRyZXR1cm47XHJcblx0fVxyXG5cclxuXHQvLyBDYWNoZSBkb20gZWxlbWVudHNcclxuXHQkY3RhID0gJHJlc3BvbnNlRm9ybS5xdWVyeVNlbGVjdG9yKCcuYnRuLS1jdGEnKTtcclxuXHQkcmVzcG9uc2VzTGlzdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5yZXNwb25zZXNfX2xpc3QnKTtcclxuXHQkdmFsaWRhdG9ycyA9IGdldEFsbCgnLnZhbGlkYXRlJywgJHJlc3BvbnNlRm9ybSk7XHJcblxyXG5cdC8vIFVwZGF0ZSBmcm9tIGFzIHVzZXIgdHlwZXNcclxuXHRsaXZlVmFsaWRhdGlvbigkdmFsaWRhdG9ycywgdXBkYXRlUmVzcG9uc2VDVEEpO1xyXG5cclxuXHQvLyBSZW5kZXIgcmVzcG9uc2VzIGFuZCBsaWtlXHJcblx0cmVuZGVyTWV0YSgpO1xyXG5cclxuXHQvLyBDaGFuZ2UgZm9ybSBpZiB1c2VyIGlzIGxvZ2dlZCBpblxyXG5cdGdldFVzZXJEYXRhKCkudGhlbihyZW5kZXJVc2VyRm9ybSkuY2F0Y2goZnVuY3Rpb24oKSB7fSk7XHJcblxyXG5cdC8vIFVzZXIgYWxyZWFkeSBsaWtlcyB0aGlzIGFydGljbGVcclxuXHRpZiAobG9jYWxTdG9yYWdlLmdldEl0ZW0oJ2xpa2U6JyArIHdpbmRvdy5wb3N0SWQpKSB7XHJcblx0XHRsaWtlZCgpO1xyXG5cdH1cclxuXHJcblx0Z2V0QWxsKCcuc2hhcmVfX2xpa2UnKS5mb3JFYWNoKGF0dGFjaExpa2VFdmVudCk7XHJcblx0JGN0YS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHN1Ym1pdFJlc3BvbnNlKTtcclxuXHJcblx0Ly8gU2hvdyBtYXJrZG93biBoZWxwZXJzXHJcblx0ZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnJlc3BvbnNlLWZvcm1fX21hcmtkb3duLWV4cGFuZGVyJykuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbihlKSB7XHJcblx0XHRlLnByZXZlbnREZWZhdWx0KCk7XHJcblx0XHRkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucmVzcG9uc2UtZm9ybV9fbWFya2Rvd24taGVscGVycycpLmNsYXNzTGlzdC5yZW1vdmUoJ2hpZGRlbicpO1xyXG5cdH0pO1xyXG5cclxuXHRnZXRBbGwoJy5wbGFjZWhvbGRlcicpLmZvckVhY2goZnVuY3Rpb24oJHBsYWNlaG9sZGVyKSB7XHJcblx0XHR2YXIgJGlucHV0ID0gJHBsYWNlaG9sZGVyLnBhcmVudE5vZGUucXVlcnlTZWxlY3RvcignaW5wdXQsIHRleHRhcmVhJyk7XHJcblxyXG5cdFx0JHBsYWNlaG9sZGVyLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24oKSB7XHJcblx0XHRcdCRpbnB1dC5mb2N1cygpO1xyXG5cdFx0fSk7XHJcblxyXG5cdFx0JGlucHV0LmFkZEV2ZW50TGlzdGVuZXIoJ2lucHV0JywgZnVuY3Rpb24oKSB7XHJcblx0XHRcdGlmICgkaW5wdXQudmFsdWUgPT09ICcnKSB7XHJcblx0XHRcdFx0JHBsYWNlaG9sZGVyLmNsYXNzTGlzdC5yZW1vdmUoJ3BsYWNlaG9sZGVyLS1ub3QtZW1wdHknKTtcclxuXHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHQkcGxhY2Vob2xkZXIuY2xhc3NMaXN0LmFkZCgncGxhY2Vob2xkZXItLW5vdC1lbXB0eScpO1xyXG5cdFx0XHR9XHJcblx0XHR9KTtcclxuXHR9KTtcclxuXHJcbn1cclxuIiwiaW1wb3J0IGxhenlJbWFnZXMgZnJvbSAnZHMtYXNzZXRzL2xhenkvaW1hZ2VzJztcclxuaW1wb3J0IGdldEFsbCBmcm9tICdkcy1hc3NldHMvZG9tL2dldC1hbGwnO1xyXG5pbXBvcnQgKiBhcyBhcGkgZnJvbSAnLi4vbGliL2FwaSc7XHJcbmltcG9ydCBwb3N0VGVtcGxhdGUgZnJvbSAnLi4vdGVtcGxhdGVzL3Bvc3QnO1xyXG5pbXBvcnQgYXV0aG9yVGVtcGxhdGUgZnJvbSAnLi4vdGVtcGxhdGVzL2F1dGhvcic7XHJcbmltcG9ydCB0YWdUZW1wbGF0ZSBmcm9tICcuLi90ZW1wbGF0ZXMvdGFnJztcclxuXHJcbmNvbnN0IE1BWF9SRVNVTFRTID0gMTA7XHJcblxyXG52YXIgJHNlYXJjaElucHV0O1xyXG52YXIgJHNlYXJjaExpc3Q7XHJcbnZhciBsYXRlc3RDb3VudGVyID0gMDtcclxuXHJcbnZhciBnZXRTZWFyY2hSZXN1bHQgPSBmdW5jdGlvbihwYXRoKSB7XHJcblx0dmFyIGFic29sdXRlID0gd2luZG93Lmdob3N0LnVybC5hcGkocGF0aCwge1xyXG5cdFx0aW5jbHVkZTogJ3RhZ3MsYXV0aG9yLGNvdW50LnBvc3RzJ1xyXG5cdH0pO1xyXG5cdHZhciByZWxhdGl2ZSA9IGFic29sdXRlLnN1YnN0cihhYnNvbHV0ZS5pbmRleE9mKCcvZ2hvc3QnKSwgYWJzb2x1dGUubGVuZ3RoKTtcclxuXHRyZXR1cm4gZmV0Y2gocmVsYXRpdmUpXHJcblx0XHQudGhlbihmdW5jdGlvbihyZXNwb25zZSkge1xyXG5cdFx0XHRpZiAocmVzcG9uc2Uuc3RhdHVzID49IDMwMCkge1xyXG5cdFx0XHRcdHJldHVybiBQcm9taXNlLnJlamVjdChyZXNwb25zZSk7XHJcblx0XHRcdH1cclxuXHRcdFx0cmV0dXJuIHJlc3BvbnNlO1xyXG5cdFx0fSlcclxuXHRcdC50aGVuKHJlc3BvbnNlID0+IHJlc3BvbnNlLmpzb24oKSk7XHJcbn07XHJcblxyXG52YXIgcmVuZGVyUmVzdWx0cyA9IGZ1bmN0aW9uKHJlc3VsdHMpIHtcclxuXHR2YXIgaHRtbCA9IHJlc3VsdHMubWFwKGZ1bmN0aW9uKHJlc3VsdCkge1xyXG5cdFx0aWYgKHJlc3VsdC5wb3N0cykge1xyXG5cdFx0XHRyZXR1cm4gcG9zdFRlbXBsYXRlKHJlc3VsdC5wb3N0c1swXSk7XHJcblx0XHR9XHJcblx0XHRpZiAocmVzdWx0LnVzZXJzKSB7XHJcblx0XHRcdHJldHVybiBhdXRob3JUZW1wbGF0ZShyZXN1bHQudXNlcnNbMF0pO1xyXG5cdFx0fVxyXG5cdFx0aWYgKHJlc3VsdC50YWdzKSB7XHJcblx0XHRcdHJldHVybiB0YWdUZW1wbGF0ZShyZXN1bHQudGFnc1swXSk7XHJcblx0XHR9XHJcblx0XHRyZXR1cm4gJyc7XHJcblx0fSkuam9pbignJyk7XHJcblx0JHNlYXJjaExpc3QuaW5uZXJIVE1MID0gaHRtbDtcclxuXHRsYXp5SW1hZ2VzKDEpO1xyXG5cdGdldEFsbCgnLmJveGVzX19pdGVtJywgJHNlYXJjaExpc3QpLmZvckVhY2goZnVuY3Rpb24oJGJveEl0ZW0sIGkpIHtcclxuXHRcdHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XHJcblx0XHRcdCRib3hJdGVtLmNsYXNzTGlzdC5yZW1vdmUoJ2hpZGRlbicpO1xyXG5cdFx0XHRzZXRUaW1lb3V0KCgpID0+ICRib3hJdGVtLmNsYXNzTGlzdC5hZGQoJ2FuaW1hdGUtLWFjdGl2ZScpLCAwKTtcclxuXHRcdH0sIGkgKiA1MDApO1xyXG5cdH0pO1xyXG59O1xyXG5cclxudmFyIHNlYXJjaCA9IGZ1bmN0aW9uKHF1ZXJ5KSB7XHJcblxyXG5cdHZhciBpZCA9ICsrbGF0ZXN0Q291bnRlcjtcclxuXHR2YXIgbWluVGltZSA9IERhdGUubm93KCkgKyAzMDA7XHJcblxyXG5cdCRzZWFyY2hMaXN0LmlubmVySFRNTCA9ICcnO1xyXG5cclxuXHR2YXIgaXNMYXRlc3QgPSBmdW5jdGlvbihkYXRhKSB7XHJcblx0XHRpZiAoaWQgIT09IGxhdGVzdENvdW50ZXIpIHtcclxuXHRcdFx0cmV0dXJuIFByb21pc2UucmVqZWN0KCk7XHJcblx0XHR9XHJcblx0XHRyZXR1cm4gZGF0YTtcclxuXHR9O1xyXG5cclxuXHRhcGkuZ2V0U2VhcmNoSW5kZXgocXVlcnkpXHJcblx0XHQudGhlbihpc0xhdGVzdClcclxuXHRcdC50aGVuKGZ1bmN0aW9uKGluZGV4ZXMpIHtcclxuXHRcdFx0dmFyIHByb21pc2VzID0gaW5kZXhlcy5zbGljZSgwLCBNQVhfUkVTVUxUUykubWFwKGZ1bmN0aW9uKGluZGV4KSB7XHJcblx0XHRcdFx0cmV0dXJuIGdldFNlYXJjaFJlc3VsdChpbmRleC5yZWYpO1xyXG5cdFx0XHR9KTtcclxuXHRcdFx0cmV0dXJuIFByb21pc2UuYWxsKHByb21pc2VzKTtcclxuXHRcdH0pXHJcblx0XHQudGhlbihmdW5jdGlvbihkYXRhKSB7XHJcblx0XHRcdGlmIChtaW5UaW1lIDwgRGF0ZS5ub3coKSkge1xyXG5cdFx0XHRcdHJldHVybiBkYXRhO1xyXG5cdFx0XHR9XHJcblx0XHRcdHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbihyZXNvbHZlKSB7XHJcblx0XHRcdFx0c2V0VGltZW91dCgoKSA9PiByZXNvbHZlKGRhdGEpLCBtaW5UaW1lIC0gRGF0ZS5ub3coKSk7XHJcblx0XHRcdH0pO1xyXG5cdFx0fSlcclxuXHRcdC50aGVuKGlzTGF0ZXN0KVxyXG5cdFx0LnRoZW4ocmVuZGVyUmVzdWx0cylcclxuXHRcdC5jYXRjaChmdW5jdGlvbihlcnIpIHtcclxuXHRcdFx0aWYgKGVycikge1xyXG5cdFx0XHRcdGNvbnNvbGUuZXJyb3IoZXJyKTtcclxuXHRcdFx0fVxyXG5cdFx0fSk7XHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbigpIHtcclxuXHJcblx0JHNlYXJjaElucHV0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnNlYXJjaF9faW5wdXQnKTtcclxuXHQkc2VhcmNoTGlzdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5zZWFyY2hfX2xpc3QnKTtcclxuXHJcblx0aWYgKCEkc2VhcmNoSW5wdXQgfHwgISRzZWFyY2hMaXN0KSB7XHJcblx0XHRyZXR1cm47XHJcblx0fVxyXG5cdCRzZWFyY2hJbnB1dC5hZGRFdmVudExpc3RlbmVyKCdpbnB1dCcsIGZ1bmN0aW9uKCkge1xyXG5cdFx0c2VhcmNoKCRzZWFyY2hJbnB1dC52YWx1ZSk7XHJcblx0fSk7XHJcblxyXG5cdCRzZWFyY2hJbnB1dC5mb2N1cygpO1xyXG5cclxuXHQkc2VhcmNoTGlzdC5zZXRBdHRyaWJ1dGUoJ3N0eWxlJywgYG1pbi1oZWlnaHQ6ICR7d2luZG93LmlubmVySGVpZ2h0fXB4YCk7XHJcblxyXG59XHJcbiIsIi8qKlxyXG4gKiBUb29sIHRpcCBzaG93ZWQgd2hlbiB1c2VyIG1hcmtzIHRleHQgaW4gYXJ0aWNsZS5cclxuICogVGhpcyBtYWtlcyB0aGUgdXNlIGFibGUgdG8gc2hhcmUvY29tbWVudCBvbiB0aGUgbWFya2VkLlxyXG4gKi9cclxuXHJcbmltcG9ydCB2YWxpZGF0ZUZvcm0gZnJvbSAnLi4vbGliL2Zvcm0vdmFsaWRhdGUnO1xyXG5pbXBvcnQgZ2V0QWxsIGZyb20gJ2RzLWFzc2V0cy9kb20vZ2V0LWFsbCc7XHJcblxyXG4vLyBDYWNoZWQgZG9tIGVsZW1lbnRzXHJcbnZhciAkcG9zdENvbnRlbnQ7XHJcbnZhciAkdG9vbFRpcDtcclxudmFyICR0d2l0dGVyO1xyXG52YXIgJHJlc3BvbnNlRm9ybTtcclxudmFyICRjdGE7XHJcblxyXG5cclxuLyoqXHJcbiAqIEdldCB0aGUgdGV4dCBzZWxlY3RlZCBieSB0aGUgdXNlclxyXG4gKiBAcmV0dXJuIHtzdHJpbmd9XHJcbiAqL1xyXG52YXIgZ2V0U2VsZWN0ZWRUZXh0ID0gZnVuY3Rpb24oKSB7XHJcblx0dmFyIHRleHQgPSAnJztcclxuXHRpZiAodHlwZW9mIHdpbmRvdy5nZXRTZWxlY3Rpb24gIT09ICd1bmRlZmluZWQnKSB7XHJcblx0XHR0ZXh0ID0gd2luZG93LmdldFNlbGVjdGlvbigpLnRvU3RyaW5nKCk7XHJcblx0fSBlbHNlIGlmICh0eXBlb2YgZG9jdW1lbnQuc2VsZWN0aW9uICE9PSAndW5kZWZpbmVkJyAmJiBkb2N1bWVudC5zZWxlY3Rpb24udHlwZSA9PT0gJ1RleHQnKSB7XHJcblx0XHR0ZXh0ID0gZG9jdW1lbnQuc2VsZWN0aW9uLmNyZWF0ZVJhbmdlKCkudGV4dDtcclxuXHR9XHJcblx0cmV0dXJuIHRleHQ7XHJcbn07XHJcblxyXG4vKipcclxuICogQ2hlY2sgaWYgdGhlIHNlbGVjdGVkIHRleHQgaXMgaW5zaWRlIHRoZSBjb250ZW50IGNvbnRhaW5lclxyXG4gKiBAcGFyYW0gIHtvYmplY3R9ICBzZWxlY3Rpb25cclxuICogQHJldHVybiB7Qm9vbGVhbn1cclxuICovXHJcbnZhciBpc0luc2lkZUNvbnRlbnQgPSBmdW5jdGlvbihzZWxlY3Rpb24pIHtcclxuXHR2YXIgJGNvbnRhaW5lciA9IHNlbGVjdGlvbi5hbmNob3JOb2RlLnBhcmVudEVsZW1lbnQ7XHJcblxyXG5cdHdoaWxlICgkY29udGFpbmVyICE9PSAkcG9zdENvbnRlbnQgJiYgJGNvbnRhaW5lci5wYXJlbnROb2RlKSB7XHJcblx0XHQkY29udGFpbmVyID0gJGNvbnRhaW5lci5wYXJlbnROb2RlO1xyXG5cdH1cclxuXHJcblx0cmV0dXJuICgkY29udGFpbmVyID09PSAkcG9zdENvbnRlbnQpO1xyXG5cclxufTtcclxuXHJcbi8qKlxyXG4gKiBQbGFjZXMgdGhlIHRvb2wgdGlwIGFib3ZlIHRoZSBzZWxlY3RlZCB0ZXh0XHJcbiAqIEByZXR1cm4ge3ZvaWR9XHJcbiAqL1xyXG52YXIgcGxhY2VUb29sVGlwID0gZnVuY3Rpb24oKSB7XHJcblxyXG5cdC8vIFRpbWVvdXQgdG8gbWFrZSBzdXJlIHRoZSB0ZXh0IGhhcyBiZWVuIHNlbGVjdGVkXHJcblx0c2V0VGltZW91dChmdW5jdGlvbigpIHtcclxuXHJcblx0XHR2YXIgaGlnaGxpZ2h0ZWRUZXh0ID0gZ2V0U2VsZWN0ZWRUZXh0KCk7XHJcblxyXG5cdFx0Ly8gSGlkZSB0b29sIHRpcCBpZiBub3RoaW5nIGlzIHNlbGVjdGVkXHJcblx0XHRpZiAoIWhpZ2hsaWdodGVkVGV4dCkge1xyXG5cdFx0XHQkdG9vbFRpcC5jbGFzc0xpc3QucmVtb3ZlKCd0b29sLXRpcC0tdmlzaWJsZScpO1xyXG5cdFx0XHRyZXR1cm47XHJcblx0XHR9XHJcblxyXG5cdFx0Ly8gRGlzcGxheSB0b29sIHRpcCBpZiBzZWxlY3Rpb24gaXMgaW5zaWRlIHRoZSBjb250ZW50IGNvbnRhaW5lclxyXG5cdFx0dmFyIHNlbGVjdGlvbiA9IHdpbmRvdy5nZXRTZWxlY3Rpb24oKTtcclxuXHRcdGlmICghaXNJbnNpZGVDb250ZW50KHNlbGVjdGlvbikpIHtcclxuXHRcdFx0JHRvb2xUaXAuY2xhc3NMaXN0LnJlbW92ZSgndG9vbC10aXAtLXZpc2libGUnKTtcclxuXHRcdFx0cmV0dXJuO1xyXG5cdFx0fVxyXG5cclxuXHRcdC8vIENoYW5nZSBjb250ZXh0dWFsIGFjdGlvbnNcclxuXHRcdCR0d2l0dGVyLnNldEF0dHJpYnV0ZSgnaHJlZicsIGBodHRwczovL3R3aXR0ZXIuY29tL2ludGVudC90d2VldD90ZXh0PSR7ZW5jb2RlVVJJQ29tcG9uZW50KGhpZ2hsaWdodGVkVGV4dCl9JnVybD0ke2VuY29kZVVSSUNvbXBvbmVudCgkdHdpdHRlci5kYXRhc2V0LnVybCl9YCk7XHJcblxyXG5cdFx0Ly8gU2hvdyBhbmQgcGxhY2UgdG9vbCB0aXBcclxuXHRcdHZhciBzY3JvbGxQb3NpdGlvbiA9ICh3aW5kb3cuc2Nyb2xsWSB8fCBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuc2Nyb2xsVG9wKTtcclxuXHRcdHZhciByYW5nZSA9IHNlbGVjdGlvbi5nZXRSYW5nZUF0KDApO1xyXG5cdFx0dmFyIHJlY3QgPSByYW5nZS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcclxuXHRcdCR0b29sVGlwLnN0eWxlLnRvcCA9IChyZWN0LnRvcCArIHNjcm9sbFBvc2l0aW9uKSArICdweCc7XHJcblx0XHQkdG9vbFRpcC5jbGFzc0xpc3QuYWRkKCd0b29sLXRpcC0tdmlzaWJsZScpO1xyXG5cdFx0JHRvb2xUaXAuc3R5bGUubGVmdCA9ICgwLjUgKiByZWN0LmxlZnQgKyAwLjUgKiByZWN0LnJpZ2h0IC0gMC41ICogJHRvb2xUaXAuY2xpZW50V2lkdGgpICsgJ3B4JztcclxuXHR9LCAxMCk7XHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbigpIHtcclxuXHQkcG9zdENvbnRlbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuY29udGVudCcpO1xyXG5cdCR0b29sVGlwID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnRvb2wtdGlwJyk7XHJcblxyXG5cdGlmICghJHBvc3RDb250ZW50IHx8ICEkdG9vbFRpcCkge1xyXG5cdFx0cmV0dXJuO1xyXG5cdH1cclxuXHJcblx0JHJlc3BvbnNlRm9ybSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5yZXNwb25zZXNfX2Zvcm0nKTtcclxuXHQkY3RhID0gJHJlc3BvbnNlRm9ybS5xdWVyeVNlbGVjdG9yKCcuYnRuLS1jdGEnKTtcclxuXHJcblx0JHR3aXR0ZXIgPSAkdG9vbFRpcC5xdWVyeVNlbGVjdG9yKCcudG9vbC10aXBfX3R3aXR0ZXInKTtcclxuXHJcblx0ZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignbW91c2V1cCcsIHBsYWNlVG9vbFRpcCk7XHJcblx0ZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcigna2V5dXAnLCBwbGFjZVRvb2xUaXApO1xyXG5cclxuXHQvLyBGaWxsIGZvcm0gd2l0aCBzZWxlY3RlZCB0ZXh0IHRvIG1ha2UgYSBxdWljayByZXNwb25zZSBvbiB0aGUgYXJ0aWNsZSBieVxyXG5cdC8vIHRoZSB1c2VyXHJcblx0dmFyICRyZXNwb25zZVRleHQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucmVzcG9uc2VzX19mb3JtIHRleHRhcmVhJyk7XHJcblx0JHRvb2xUaXAucXVlcnlTZWxlY3RvcignLnRvb2wtdGlwX19yZXNwb25zZScpLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24oZSkge1xyXG5cdFx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cdFx0dmFyIGhpZ2hsaWdodGVkVGV4dCA9IGdldFNlbGVjdGVkVGV4dCgpO1xyXG5cdFx0JHJlc3BvbnNlVGV4dC52YWx1ZSA9IGA+ICR7aGlnaGxpZ2h0ZWRUZXh0fVxyXG5cclxuYDtcclxuXHRcdCRyZXNwb25zZVRleHQuZm9jdXMoKTtcclxuXHRcdCRyZXNwb25zZVRleHQucGFyZW50Tm9kZS5jbGFzc0xpc3QuYWRkKCd2YWxpZGF0ZS0tdmFsaWQnKTtcclxuXHRcdCRyZXNwb25zZVRleHQucGFyZW50Tm9kZS5jbGFzc0xpc3QucmVtb3ZlKCd2YWxpZGF0ZS0tbm90LXZhbGlkJyk7XHJcblx0XHQkcmVzcG9uc2VUZXh0LnBhcmVudE5vZGUucXVlcnlTZWxlY3RvcignLnBsYWNlaG9sZGVyJykuY2xhc3NMaXN0LmFkZCgncGxhY2Vob2xkZXItLW5vdC1lbXB0eScpO1xyXG5cdFx0dmFyIHZhbGlkID0gdmFsaWRhdGVGb3JtKGdldEFsbCgnLnZhbGlkYXRlJywgJHJlc3BvbnNlRm9ybSkpO1xyXG5cdFx0aWYgKHZhbGlkKSB7XHJcblx0XHRcdCRjdGEuY2xhc3NMaXN0LnJlbW92ZSgnYnRuLS1kaXNhYmxlZCcpO1xyXG5cdFx0fSBlbHNlIHtcclxuXHRcdFx0JGN0YS5jbGFzc0xpc3QuYWRkKCdidG4tLWRpc2FibGVkJyk7XHJcblx0XHR9XHJcblx0fSk7XHJcbn1cclxuIiwiLyoqXHJcbiAqIEhlbHBlcnMgZm9yIGNvbW11bmljYXRpbmcgd2l0aCB0aGUgbWV0YSBhcGkgaG9sZGluZyByZXNwb25zZXMgYW5kIGxpa2VzIGZvclxyXG4gKiB0aGUgYXJ0aWNsZXMuXHJcbiAqL1xyXG5cclxudmFyIGFwaVVybCA9IHdpbmRvdy5hcGlVUkw7XHJcbnZhciBpZCA9IHdpbmRvdy5wb3N0SWQ7XHJcblxyXG4vKipcclxuICogTWFrZSBhIEFKQVggY2FsbCB0byB0aGUgYXBpXHJcbiAqIEBwYXJhbSAge1N0cmluZ30gcGF0aFxyXG4gKiBAcGFyYW0gIHtTdHJpbmd9IG1ldGhvZFxyXG4gKiBAcGFyYW0gIHtvYmplY3R9IGRhdGFcclxuICogQHJldHVybiB7UHJvbWlzZX1cclxuICovXHJcbnZhciByZXF1ZXN0ID0gZnVuY3Rpb24ocGF0aCA9ICcnLCBtZXRob2QgPSAnR0VUJywgZGF0YSA9IG51bGwpIHtcclxuXHJcbiAgdmFyIGZldGNoT3B0aW9ucyA9IHtcclxuICAgIG1ldGhvZCxcclxuICAgIGhlYWRlcnM6IHtcclxuICAgICAgJ0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uOyBjaGFyc2V0PXV0Zi04J1xyXG4gICAgfVxyXG4gIH07XHJcblxyXG4gIGlmIChkYXRhKSB7XHJcbiAgICBmZXRjaE9wdGlvbnMuYm9keSA9IEpTT04uc3RyaW5naWZ5KGRhdGEpO1xyXG4gIH1cclxuXHJcbiAgLy8gUGVyZm9ybSB0aGUgYWpheCBjYWxsXHJcbiAgcmV0dXJuIGZldGNoKGFwaVVybCArIHBhdGgsIGZldGNoT3B0aW9ucylcclxuICAgIC50aGVuKGZ1bmN0aW9uKHJlc3BvbnNlKSB7XHJcbiAgICAgIGlmIChyZXNwb25zZS5zdGF0dXMgPj0gMzAwKSB7XHJcbiAgICAgICAgcmV0dXJuIFByb21pc2UucmVqZWN0KHJlc3BvbnNlKTtcclxuICAgICAgfVxyXG4gICAgICByZXR1cm4gcmVzcG9uc2U7XHJcbiAgICB9KVxyXG4gICAgLnRoZW4ocmVzcG9uc2UgPT4gcmVzcG9uc2UuanNvbigpKTtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBHZXQgbWV0YSBkYXRhIGZyb20gdGhlIGFydGljbGUuIElmIG5vIG1ldGEgZGF0YSBpcyBwcmVzZW50IGZvciB0aGUgYWN0dWFsXHJcbiAqIGFydGljbGUgYW5kIG5ldyBlbnRyeSB3aWxsIGJlIG1hZGUuXHJcbiAqIEBwYXJhbSAge2Jvb2xlYW59IHJhdyBXaGV0aGVyIHRvIGluY2x1ZGUgY29tcHV0ZWQgZmllbGRzXHJcbiAqIEByZXR1cm4ge1Byb21pc2V9XHJcbiAqL1xyXG5leHBvcnQgdmFyIGdldE1ldGEgPSBmdW5jdGlvbihyYXcpIHtcclxuICB2YXIgcXVlcnkgPSAnP2lkPScgKyBpZDtcclxuICBpZiAocmF3KSB7XHJcbiAgICBxdWVyeSArPSAnJnJhdyc7XHJcbiAgfVxyXG4gIHJldHVybiByZXF1ZXN0KHF1ZXJ5KVxyXG4gICAgLmNhdGNoKGZ1bmN0aW9uKCkge1xyXG4gICAgICByZXR1cm4gcmVxdWVzdCgnJywgJ1BPU1QnLCB7XHJcbiAgICAgICAgcmVzcG9uc2VzOiBbXSxcclxuICAgICAgICBsaWtlczogMCxcclxuICAgICAgICBpZFxyXG4gICAgICB9KTtcclxuICAgIH0pO1xyXG59O1xyXG5cclxuZXhwb3J0IHZhciBnZXRTZWFyY2hJbmRleCA9IGZ1bmN0aW9uKHF1ZXJ5KSB7XHJcbiAgcmV0dXJuIHJlcXVlc3QoJ3NlYXJjaD9xPScgKyBxdWVyeSk7XHJcbn07XHJcblxyXG4vKipcclxuICogSW5jcmVtZW50IHRoZSBsaWtlIHZhbHVlIHdpdGggb25lXHJcbiAqIEByZXR1cm4ge1Byb21pc2V9XHJcbiAqL1xyXG5leHBvcnQgdmFyIGxpa2UgPSBmdW5jdGlvbigpIHtcclxuICByZXR1cm4gZ2V0TWV0YShpZCwgdHJ1ZSlcclxuICAgIC50aGVuKGZ1bmN0aW9uKGRhdGEpIHtcclxuICAgICAgcmV0dXJuIHJlcXVlc3QoJz9pZD0nICsgaWQsICdQVVQnLCB7XHJcbiAgICAgICAgbGlrZXM6IGRhdGEubGlrZXMgKyAxXHJcbiAgICAgIH0pO1xyXG4gICAgfSk7XHJcbn07XHJcblxyXG4vKipcclxuICogVXBkYXRlIGF1dGhvciBlbWFpbCB1c2VkIHRvIHNlbmQgZS1tYWlscyB3aGVuIGEgcmVzcG9uc2UgaSByZWNlaXZlZC5cclxuICogQHJldHVybiB7UHJvbWlzZX1cclxuICovXHJcbmV4cG9ydCB2YXIgdXBkYXRlQXV0aG9yRW1haWwgPSBmdW5jdGlvbihhdXRob3JFbWFpbCkge1xyXG4gIGlmICghaWQpIHtcclxuICAgIHJldHVybiBQcm9taXNlLnJlamVjdChuZXcgRXJyb3IoJ05vIHBvc3RJZCcpKTtcclxuICB9XHJcbiAgcmV0dXJuIHJlcXVlc3QoJz9pZD0nICsgaWQsICdQVVQnLCB7XHJcbiAgICBhdXRob3JFbWFpbFxyXG4gIH0pO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIEFkZCBhIHJlc3BvbnNlXHJcbiAqIEBwYXJhbSB7b2JqZWN0fSByZXNwb25zZVxyXG4gKiBAcmV0dXJuIHtQcm9taXNlfVxyXG4gKi9cclxuZXhwb3J0IHZhciBhZGRSZXNwb25zZSA9IGZ1bmN0aW9uKHJlc3BvbnNlKSB7XHJcbiAgcmV0dXJuIGdldE1ldGEodHJ1ZSlcclxuICAgIC50aGVuKGZ1bmN0aW9uKGRhdGEpIHtcclxuXHJcbiAgICAgIC8vIFNldCB0aGUgcHVibGlzaCBkYXRhIHRvIG5vd1xyXG4gICAgICByZXNwb25zZS5wdWJsaXNoZWQgPSBuZXcgRGF0ZSgpLnRvSVNPU3RyaW5nKCk7XHJcblxyXG4gICAgICAvLyBVcGRhdGUgdGhlIHJlc3BvbnNlcyBsaXN0XHJcbiAgICAgIGRhdGEucmVzcG9uc2VzLnB1c2gocmVzcG9uc2UpO1xyXG4gICAgICByZXR1cm4gcmVxdWVzdCgnP2lkPScgKyBpZCwgJ1BVVCcsIHtcclxuICAgICAgICByZXNwb25zZXM6IGRhdGEucmVzcG9uc2VzXHJcbiAgICAgIH0pO1xyXG4gICAgfSk7XHJcbn07XHJcblxyXG4vKipcclxuICogUmVtb3ZlIGEgcmVzcG9uc2VcclxuICogQHBhcmFtICB7c3RyaW5nfSBwdWJsaXNoZWRcclxuICogQHBhcmFtICB7c3RyaW5nfSBuYW1lXHJcbiAqIEByZXR1cm4ge1Byb21pc2V9XHJcbiAqL1xyXG5leHBvcnQgdmFyIHJlbW92ZVJlc3BvbnNlID0gZnVuY3Rpb24ocHVibGlzaGVkLCBuYW1lKSB7XHJcbiAgcmV0dXJuIGdldE1ldGEodHJ1ZSlcclxuICAgIC50aGVuKGZ1bmN0aW9uKGRhdGEpIHtcclxuXHJcbiAgICAgIC8vIFJlbW92ZSByZXNwb3NlIHdoaWNoIG1hdGNoZXMgb24gcHVibGlzaCBkYXRlIGFuZCBhdXRob3IgbmFtZVxyXG4gICAgICB2YXIgcmVzcG9uc2VzID0gZGF0YS5yZXNwb25zZXMuZmlsdGVyKGZ1bmN0aW9uKHJlc3BvbnNlKSB7XHJcbiAgICAgICAgcmV0dXJuIChyZXNwb25zZS5wdWJsaXNoZWQgIT09IHB1Ymxpc2hlZCB8fCByZXNwb25zZS5uYW1lICE9PSBuYW1lKTtcclxuICAgICAgfSk7XHJcblxyXG4gICAgICByZXR1cm4gcmVxdWVzdCgnP2lkPScgKyBpZCwgJ1BVVCcsIHtcclxuICAgICAgICByZXNwb25zZXNcclxuICAgICAgfSk7XHJcbiAgICB9KTtcclxufTtcclxuIiwiLyoqXHJcbiAqIFZhbGlkYXRlIGlucHV0IGZpZWxkcyBhcyB1c2VyIHR5cGVzXHJcbiAqL1xyXG5cclxuLy8gRGVwZW5kZW5jaWVzXHJcbmltcG9ydCB2YWxpZGF0ZUZvcm0gZnJvbSAnLi92YWxpZGF0ZSc7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbigkdmFsaWRhdG9ycywgY2FsbGJhY2spIHtcclxuXHQkdmFsaWRhdG9ycy5mb3JFYWNoKGZ1bmN0aW9uKCR2YWxpZGF0ZUNvbnRhaW5lcikge1xyXG5cdFx0dmFyICR2YWxpZGF0ZUZpZWxkID0gJHZhbGlkYXRlQ29udGFpbmVyLnF1ZXJ5U2VsZWN0b3IoJ2lucHV0LCB0ZXh0YXJlYScpO1xyXG5cclxuXHRcdCR2YWxpZGF0ZUZpZWxkLmFkZEV2ZW50TGlzdGVuZXIoJ2lucHV0JywgZnVuY3Rpb24oKSB7XHJcblx0XHRcdHZhciB2YWxpZCA9IHZhbGlkYXRlRm9ybSgkdmFsaWRhdG9ycyk7XHJcblx0XHRcdGNhbGxiYWNrKHZhbGlkKTtcclxuXHRcdH0pO1xyXG5cdH0pO1xyXG59XHJcbiIsIi8qKlxyXG4gKiBDaGVjayBpZiB0aGUgZm9ybSBpcyB2YWxpZFxyXG4gKi9cclxuXHJcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uKCR2YWxpZGF0b3JzKSB7XHJcblx0dmFyIG5vdFZhbGlkID0gJHZhbGlkYXRvcnMuc29tZShmdW5jdGlvbigkdmFsaWRhdG9yKSB7XHJcblx0XHRpZiAoJHZhbGlkYXRvci5kYXRhc2V0LnZhbGlkYXRlUmVxdWlyZWQgIT09IHVuZGVmaW5lZCkge1xyXG5cdFx0XHRyZXR1cm4gISR2YWxpZGF0b3IuY2xhc3NMaXN0LmNvbnRhaW5zKCd2YWxpZGF0ZS0tdmFsaWQnKTtcclxuXHRcdH0gZWxzZSB7XHJcblx0XHRcdHJldHVybiAkdmFsaWRhdG9yLmNsYXNzTGlzdC5jb250YWlucygndmFsaWRhdGUtLW5vdC12YWxpZCcpO1xyXG5cdFx0fVxyXG5cdH0pO1xyXG5cclxuXHRyZXR1cm4gIW5vdFZhbGlkO1xyXG59XHJcbiIsIi8qKlxyXG4gKiBDaGVjayBpZiB1c2VyIGlzIGxvZ2dlZCBpbiB1c2luZyB0aGUgZ2hvc3Qgc2Vzc2lvbi4gSWYgbG9nZ2VkIGluIGdldCB1c2VyXHJcbiAqIGRhdGEuXHJcbiAqL1xyXG5cclxuLy8gQ2FjaGVkIHByb21pc2VcclxudmFyIGRhdGFQcm9taXNlO1xyXG5cclxuLyoqXHJcbiAqIEdldCB0aGUgZGF0YSBmb3IgdGhlIGxvZ2dlZCBpbiB1c2VkXHJcbiAqIEBwYXJhbSAge3N0cmluZ30gdG9rZW5cclxuICogQHJldHVybiB7UHJvbWlzZX1cclxuICovXHJcbnZhciBnZXRVc2VyRGF0YSA9IGZ1bmN0aW9uKHRva2VuKSB7XHJcblx0cmV0dXJuIGZldGNoKCcvZ2hvc3QvYXBpL3YwLjEvdXNlcnMvbWUvP2luY2x1ZGU9cm9sZXMmc3RhdHVzPWFsbCcsIHtcclxuXHRcdG1ldGhvZDogJ0dFVCcsXHJcblx0XHRoZWFkZXJzOiB7XHJcblx0XHRcdCdBdXRob3JpemF0aW9uJzogJ0JlYXJlciAnICsgdG9rZW5cclxuXHRcdH1cclxuXHR9KS50aGVuKGZ1bmN0aW9uKHJlc3BvbnNlKSB7XHJcblx0XHRpZiAocmVzcG9uc2Uuc3RhdHVzICE9PSAyMDApIHtcclxuXHRcdFx0cmV0dXJuIFByb21pc2UucmVqZWN0KCdPbGQgc2Vzc2lvbicpO1xyXG5cdFx0fVxyXG5cdFx0cmV0dXJuIHJlc3BvbnNlLmpzb24oKTtcclxuXHR9KS50aGVuKGZ1bmN0aW9uKGRhdGEpIHtcclxuXHRcdHJldHVybiBkYXRhLnVzZXJzWzBdO1xyXG5cdH0pO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIENoZWNrIGlmIHRoZXJlIGlzIGEgR2hvc3Qgc2Vzc2lvbi4gSWYgc28gdXNlIGl0IHRvIGdldCB0aGUgdXNlcnMgZGF0YS5cclxuICogQHJldHVybiB7UHJvbWlzZX1cclxuICovXHJcbnZhciBnZXQgPSBmdW5jdGlvbigpIHtcclxuXHJcblx0Ly8gR2hvc3Qgc3RvcmVzIGl0IHNlc3Npb24gaW4gbG9jYWxTdG9yYWdlXHJcblx0dmFyIHNlc3Npb25TdHJpbmcgPSBsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnZ2hvc3Q6c2Vzc2lvbicpO1xyXG5cdGlmICghc2Vzc2lvblN0cmluZykge1xyXG5cdFx0cmV0dXJuIFByb21pc2UucmVqZWN0KCdObyBzZXNzaW9uJyk7XHJcblx0fVxyXG5cclxuXHQvLyBWYWxpZCBzZXNzaW9uP1xyXG5cdHZhciBzZXNzaW9uID0gSlNPTi5wYXJzZShzZXNzaW9uU3RyaW5nKTtcclxuXHRpZiAoIXNlc3Npb24gfHwgIXNlc3Npb24uYXV0aGVudGljYXRlZCB8fCAhc2Vzc2lvbi5hdXRoZW50aWNhdGVkLmFjY2Vzc190b2tlbikge1xyXG5cdFx0cmV0dXJuIFByb21pc2UucmVqZWN0KCdObyBzZXNzaW9uJyk7XHJcblx0fVxyXG5cclxuXHQvLyBTZXNzaW9uIGV4cGlyZWQ/XHJcblx0aWYgKHNlc3Npb24uYXV0aGVudGljYXRlZC5leHBpcmVzX2F0IDwgRGF0ZS5ub3coKSkge1xyXG5cdFx0cmV0dXJuIFByb21pc2UucmVqZWN0KCdTZXNzaW9uIGV4cGlyZWQnKTtcclxuXHR9XHJcblxyXG5cdHJldHVybiBnZXRVc2VyRGF0YShzZXNzaW9uLmF1dGhlbnRpY2F0ZWQuYWNjZXNzX3Rva2VuKTtcclxuXHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbigpIHtcclxuXHJcblx0Ly8gUmV0dXJuIGNhY2hlZCBwcm9taXNlIGlmIGFscmVhZHkgY2FsbGVkXHJcblx0aWYgKCFkYXRhUHJvbWlzZSkge1xyXG5cdFx0ZGF0YVByb21pc2UgPSBnZXQoKTtcclxuXHR9XHJcblx0cmV0dXJuIGRhdGFQcm9taXNlO1xyXG59XHJcbiIsIi8qKlxyXG4gKiBFbmNvZGUgYSBzdHJpbmdcclxuICogQHBhcmFtICB7c3RyaW5nfSBzdHJpbmdcclxuICogQHJldHVybiB7c3RyaW5nfVxyXG4gKi9cclxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24oc3RyaW5nKSB7XHJcblx0dmFyIGh0bWxFbmNvZGVkVmFsdWUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKS5hcHBlbmRDaGlsZChcclxuXHRcdGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKHN0cmluZykpLnBhcmVudE5vZGUuaW5uZXJIVE1MO1xyXG5cdHJldHVybiBodG1sRW5jb2RlZFZhbHVlLnJlcGxhY2UoL1xccj9cXG4vZywgJzxicj4nKTtcclxufVxyXG4iLCJpbXBvcnQgZ2V0QWxsIGZyb20gJ2RzLWFzc2V0cy9kb20vZ2V0LWFsbCc7XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKHJhdykge1xyXG5cdHZhciAkY29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcblx0JGNvbnRhaW5lci5pbm5lckhUTUwgPSByYXc7XHJcblx0Z2V0QWxsKCdpbWcnLCAkY29udGFpbmVyKS5mb3JFYWNoKGZ1bmN0aW9uKCRpbWcpIHtcclxuXHRcdHZhciAkaW1nV3JhcHBlciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG5cdFx0JGltZ1dyYXBwZXIuY2xhc3NMaXN0LmFkZCgnaW1nLXdyYXBwZXInKTtcclxuXHRcdCRpbWdXcmFwcGVyLmlubmVySFRNTCA9ICc8ZGl2IGNsYXNzPVwiaW1nLWNvbnRhaW5lclwiPjxpbWc+PC9kaXY+JztcclxuXHRcdHZhciBzcmMgPSAkaW1nLmdldEF0dHJpYnV0ZSgnc3JjJyk7XHJcblx0XHR2YXIgYWx0ID0gJGltZy5nZXRBdHRyaWJ1dGUoJ2FsdCcpO1xyXG5cdFx0dmFyIHBhZGRpbmcgPSA1MDtcclxuXHJcblx0XHQvLyBMYXp5IGxvYWRcclxuXHRcdHZhciAkbmV3SW1nID0gJGltZ1dyYXBwZXIucXVlcnlTZWxlY3RvcignaW1nJyk7XHJcblxyXG5cdFx0JG5ld0ltZy5zZXRBdHRyaWJ1dGUoJ2RhdGEtc3JjJywgc3JjKTtcclxuXHRcdCRuZXdJbWcuc2V0QXR0cmlidXRlKCdjbGFzcycsICdsYXp5LWltYWdlJyk7XHJcblxyXG5cdFx0YWx0LnNwbGl0KCc7JykuZm9yRWFjaChmdW5jdGlvbihzdHIpIHtcclxuXHRcdFx0aWYgKHN0ciA9PT0gJ2Z1bGwtc2l6ZScgfHwgc3RyID09PSAnZnVsbC13aWR0aCcpIHtcclxuXHRcdFx0XHQkaW1nV3JhcHBlci5jbGFzc0xpc3QuYWRkKCdmdWxsLXdpZHRoJyk7XHJcblx0XHRcdH0gZWxzZSBpZiAoc3RyLmluZGV4T2YoJ3JhdGlvPScpID09PSAwKSB7XHJcblx0XHRcdFx0dmFyIHJhdGlvID0gc3RyLnJlcGxhY2UoJ3JhdGlvPScsICcnKTtcclxuXHRcdFx0XHRpZiAocmF0aW8uaW5kZXhPZignOicpKSB7XHJcblx0XHRcdFx0XHR2YXIgZGltZW5zaW9ucyA9IHJhdGlvLnNwbGl0KCc6Jyk7XHJcblx0XHRcdFx0XHRyYXRpbyA9IGRpbWVuc2lvbnNbMF0gLyBkaW1lbnNpb25zWzFdO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0XHRwYWRkaW5nID0gMTAwIC8gcmF0aW87XHJcblx0XHRcdH0gZWxzZSBpZiAoc3RyID09PSAnYm9yZGVycycpIHtcclxuXHRcdFx0XHQkaW1nV3JhcHBlci5xdWVyeVNlbGVjdG9yKCcuaW1nLWNvbnRhaW5lcicpLmNsYXNzTGlzdC5hZGQoJ2ltZy1jb250YWluZXItLWJvcmRlcnMnKTtcclxuXHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRhbHQgPSBzdHI7XHJcblx0XHRcdH1cclxuXHRcdH0pO1xyXG5cclxuXHRcdCRuZXdJbWcuc2V0QXR0cmlidXRlKCdhbHQnLCBhbHQpO1xyXG5cdFx0JG5ld0ltZy5zZXRBdHRyaWJ1dGUoJ3RpdGxlJywgJGltZy5nZXRBdHRyaWJ1dGUoJ3RpdGxlJykpO1xyXG5cclxuXHRcdCRpbWdXcmFwcGVyLnF1ZXJ5U2VsZWN0b3IoJy5pbWctY29udGFpbmVyJylcclxuXHRcdFx0LnNldEF0dHJpYnV0ZSgnc3R5bGUnLCAncGFkZGluZy1ib3R0b206JyArIHBhZGRpbmcgKyAnJScpO1xyXG5cclxuXHRcdCRpbWcucGFyZW50Tm9kZS5vdXRlckhUTUwgPSAkaW1nV3JhcHBlci5vdXRlckhUTUw7XHJcblx0fSk7XHJcblx0cmV0dXJuICRjb250YWluZXIuaW5uZXJIVE1MO1xyXG59O1xyXG4iLCJpbXBvcnQgc3RyaXBUYWdzIGZyb20gJy4vc3RyaXAtaHRtbC10YWdzJztcclxuaW1wb3J0IHdvcmRDb3VudCBmcm9tICd3b3JkLWNvdW50JztcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uKGh0bWwpIHtcclxuXHR2YXIgdGV4dCA9IHN0cmlwVGFncyhodG1sKTtcclxuXHR2YXIgd29yZHMgPSB3b3JkQ291bnQodGV4dCk7XHJcblx0dmFyIHJlYWRUaW1lID0gTWF0aC5jZWlsKHdvcmRzIC8gMzAwKTtcclxuXHJcblx0dmFyIGFmZml4ID0gJyBtaW4nO1xyXG5cdGlmIChyZWFkVGltZSA+IDEpIHtcclxuXHRcdGFmZml4ICs9ICdzJztcclxuXHR9XHJcblxyXG5cdHJldHVybiByZWFkVGltZSArIGFmZml4O1xyXG59XHJcbiIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uKGh0bWwpIHtcclxuXHR2YXIgdG1wID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcblx0dG1wLmlubmVySFRNTCA9IGh0bWw7XHJcblx0cmV0dXJuIHRtcC50ZXh0Q29udGVudCB8fCB0bXAuaW5uZXJUZXh0IHx8ICcnO1xyXG59XHJcbiIsIi8qKlxyXG4gKiBNYWluIGVudHJ5IGZvciB0aGUgamF2YXNjcmlwdC5cclxuICogSW1wb3J0IG1vZHVsZXMgYW5kIHN0YXJ0IHRoZW1cclxuICovXHJcblxyXG5pbXBvcnQgbGF6eUltYWdlcyBmcm9tICdkcy1hc3NldHMvbGF6eS9pbWFnZXMnO1xyXG5pbXBvcnQgZ2V0QWxsIGZyb20gJ2RzLWFzc2V0cy9kb20vZ2V0LWFsbCc7XHJcbmltcG9ydCB2YWxpZGF0ZUlucHV0RmllbGRzIGZyb20gJ2RzLWFzc2V0cy92YWxpZGF0ZS9pbnB1dC1maWVsZHMnO1xyXG5pbXBvcnQgbmF2aWdhdGlvbiBmcm9tICcuL2NvbXBvbmVudHMvbmF2aWdhdGlvbic7XHJcbmltcG9ydCByZXNwb25zZSBmcm9tICcuL2NvbXBvbmVudHMvcmVzcG9uc2UnO1xyXG5pbXBvcnQgdG9vbFRpcCBmcm9tICcuL2NvbXBvbmVudHMvdG9vbC10aXAnO1xyXG5pbXBvcnQgc2VhcmNoIGZyb20gJy4vY29tcG9uZW50cy9zZWFyY2gnO1xyXG5pbXBvcnQgZ2V0TG9nZ2VkSW5EYXRhIGZyb20gJy4vbGliL2dldC1sb2dnZWQtaW4tZGF0YSc7XHJcbmltcG9ydCAqIGFzIGFwaSBmcm9tICcuL2xpYi9hcGknO1xyXG5cclxubmF2aWdhdGlvbigpO1xyXG50b29sVGlwKCk7XHJcbnNlYXJjaCgpO1xyXG5cclxuZ2V0QWxsKCdpbWcnKS5mb3JFYWNoKGZ1bmN0aW9uKCRpbWcpIHtcclxuXHQkaW1nLm9ubG9hZCA9IGZ1bmN0aW9uKCkge1xyXG5cdFx0dGhpcy5jbGFzc0xpc3QuYWRkKCdhbmltYXRlLS1hY3RpdmUnKTtcclxuXHR9O1xyXG59KTtcclxubGF6eUltYWdlcygxKTtcclxudmFsaWRhdGVJbnB1dEZpZWxkcygpO1xyXG5yZXNwb25zZSgpO1xyXG5nZXRMb2dnZWRJbkRhdGEoKS50aGVuKGZ1bmN0aW9uKHVzZXIpIHtcclxuXHR2YXIgJGJvZHkgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdib2R5Jyk7XHJcblxyXG5cdCRib2R5LmNsYXNzTGlzdC5hZGQoJ3VzZXItbG9nZ2VkLWluJyk7XHJcblxyXG5cdC8vIEFkbWluIGxvZ2dlZCBpblxyXG5cdHZhciBhZG1pbiA9IHVzZXIucm9sZXMuc29tZShmdW5jdGlvbihyb2xlKSB7XHJcblx0XHRyZXR1cm4gKHJvbGUubmFtZSA9PT0gJ093bmVyJyB8fCByb2xlLm5hbWUgPT09ICdBZG1pbmlzdHJhdG9yJyk7XHJcblx0fSk7XHJcblx0aWYgKGFkbWluKSB7XHJcblx0XHQkYm9keS5jbGFzc0xpc3QuYWRkKCdhZG1pbi1sb2dnZWQtaW4nKTtcclxuXHR9XHJcblxyXG5cdC8vIEF1dGhvciBsb2dnZWQgaW5cclxuXHRpZiAodXNlci5uYW1lID09PSB3aW5kb3cuYXV0aG9yTmFtZSkge1xyXG5cdFx0JGJvZHkuY2xhc3NMaXN0LmFkZCgnYXV0aG9yLWxvZ2dlZC1pbicpO1xyXG5cdFx0cmV0dXJuIGFwaS51cGRhdGVBdXRob3JFbWFpbCh1c2VyLmVtYWlsKTtcclxuXHR9XHJcbn0pLmNhdGNoKGZ1bmN0aW9uKCkge30pO1xyXG4iLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbihhdXRob3IpIHtcclxuXHJcbiAgdmFyIGF1dGhvckltYWdlID0gJyc7XHJcbiAgaWYgKGF1dGhvci5pbWFnZSkge1xyXG4gICAgYXV0aG9ySW1hZ2UgPSBgPHRkIHdpZHRoPVwiNSVcIj48aW1nIHNyYz1cIiR7YXV0aG9yLmltYWdlfVwiIGNsYXNzPVwiYXV0aG9yX19pbWFnZSByb3VuZC1pbWdcIj48L3RkPmA7XHJcbiAgfVxyXG5cclxuICB2YXIgY292ZXJJbWFnZSA9ICcnO1xyXG4gIGlmIChhdXRob3IuY292ZXIpIHtcclxuICAgIGNvdmVySW1hZ2UgPSBgXHJcbiAgICAgIDxkaXYgY2xhc3M9XCJpbWctd3JhcHBlciBmdWxsLXdpZHRoXCI+XHJcbiAgICAgICAgPGRpdiBjbGFzcz1cImltZy1jb250YWluZXJcIiBzdHlsZT1cInBhZGRpbmctYm90dG9tOjUwJVwiPlxyXG4gICAgICAgICAgPGltZyBkYXRhLXNyYz1cIiR7YXV0aG9yLmNvdmVyfVwiIGFsdD1cIiR7YXV0aG9yLm5hbWV9XCIgY2xhc3M9XCJsYXp5LWltYWdlXCI+XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICAgIDwvZGl2PmA7XHJcbiAgfVxyXG5cclxuICByZXR1cm4gYFxyXG4gICAgPGFydGljbGUgY2xhc3M9XCJib3hlc19faXRlbSBzbWFsbCBhbmltYXRlIGFuaW1hdGVfX2ZhZGUtaW5cIj5cclxuICAgICAgPGhlYWRlciBjbGFzcz1cImF1dGhvclwiPlxyXG4gICAgICAgICAgPHRhYmxlPlxyXG4gICAgICAgICAgICAgIDx0cj5cclxuICAgICAgICAgICAgICAgICAgJHthdXRob3JJbWFnZX1cclxuICAgICAgICAgICAgICAgICAgPHRkPjxzcGFuIGNsYXNzPVwiYXV0aG9yX19uYW1lXCI+PGEgaHJlZj1cIi9hdXRob3IvJHthdXRob3Iuc2x1Z31cIj4ke2F1dGhvci5uYW1lfTwvYT48L3NwYW4+PGJyPlxyXG4gICAgICAgICAgICAgICAgICBcdCR7YXV0aG9yLmNvdW50LnBvc3RzfSBzdG9yaWVzXHJcbiAgICAgICAgICAgICAgICAgIDwvdGQ+XHJcbiAgICAgICAgICAgICAgPC90cj5cclxuICAgICAgICAgIDwvdGFibGU+XHJcbiAgICAgIDwvaGVhZGVyPlxyXG4gICAgICA8YSBocmVmPVwiL2F1dGhvci8ke2F1dGhvci5zbHVnfS9cIj4ke2NvdmVySW1hZ2V9PC9hPlxyXG4gICAgICA8aDE+JHthdXRob3IubmFtZX08L2gxPlxyXG4gICAgICA8cD4ke2F1dGhvci5iaW8gfHwgJyd9PC9wPlxyXG4gICAgICA8cD48YSBocmVmPVwiL2F1dGhvci8ke2F1dGhvci5zbHVnfS9cIiBjbGFzcz1cImRpbW1lZFwiPlNlZSBzdG9yaWVzIGJ5IGF1dGhvci4uLjwvYT48L3A+XHJcbiAgICAgPC9hcnRpY2xlPmA7XHJcbn1cclxuIiwiaW1wb3J0IGltYWdlQ29udmVydGVkIGZyb20gJy4uL2xpYi9pbWFnZS1jb252ZXJ0ZXInO1xyXG5pbXBvcnQgcmVhZFRpbWUgZnJvbSAnLi4vbGliL3JlYWQtdGltZSc7XHJcbmltcG9ydCBlcG9jaFRvVGltZWFnbyBmcm9tICdlcG9jaC10by10aW1lYWdvJztcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uKHBvc3QpIHtcclxuXHJcblx0dmFyIGF1dGhvckltYWdlID0gJyc7XHJcblx0aWYgKHBvc3QuYXV0aG9yLmltYWdlKSB7XHJcblx0XHRhdXRob3JJbWFnZSA9IGA8dGQgd2lkdGg9XCI1JVwiPjxpbWcgc3JjPVwiJHtwb3N0LmF1dGhvci5pbWFnZX1cIiBjbGFzcz1cImF1dGhvcl9faW1hZ2Ugcm91bmQtaW1nXCI+PC90ZD5gO1xyXG5cdH1cclxuXHJcbiAgdmFyIHBvc3RJbWFnZSA9ICcnO1xyXG4gIGlmIChwb3N0LmltYWdlKSB7XHJcbiAgICBwb3N0SW1hZ2UgPSBgXHJcbiAgICAgIDxkaXYgY2xhc3M9XCJpbWctd3JhcHBlciBmdWxsLXdpZHRoXCI+XHJcbiAgICAgICAgPGRpdiBjbGFzcz1cImltZy1jb250YWluZXJcIiBzdHlsZT1cInBhZGRpbmctYm90dG9tOjUwJVwiPlxyXG4gICAgICAgICAgPGltZyBkYXRhLXNyYz1cIiR7cG9zdC5pbWFnZX1cIiBhbHQ9XCIke3Bvc3QudGl0bGV9XCIgY2xhc3M9XCJsYXp5LWltYWdlXCI+XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICAgIDwvZGl2PmA7XHJcbiAgfVxyXG5cclxuXHR2YXIgdGFncyA9ICcnO1xyXG5cdGlmIChwb3N0LnRhZ3MpIHtcclxuXHRcdHRhZ3MgPSAnPGJyPjxzcGFuIGNsYXNzPVwidGFnc1wiPicgKyBwb3N0LnRhZ3MubWFwKGZ1bmN0aW9uKHRhZykge1xyXG5cdFx0XHRyZXR1cm4gYDxhIGhyZWY9XCIvdGFnLyR7dGFnLnNsdWd9L1wiPiR7dGFnLm5hbWV9PC9hPmA7XHJcblx0XHR9KS5qb2luKCcnKSArICc8L3NwYW4+JztcclxuXHR9XHJcblxyXG5cdHZhciBwdWJsaXNoZWQgPSBuZXcgRGF0ZShwb3N0LnB1Ymxpc2hlZF9hdCkuZ2V0VGltZSgpO1xyXG5cdHZhciBub3cgPSBEYXRlLm5vdygpO1xyXG5cdHZhciB0aW1lQWdvID0gZXBvY2hUb1RpbWVhZ28udGltZUFnbyhwdWJsaXNoZWQsIG5vdyk7XHJcblxyXG5cdHZhciBodG1sID0gaW1hZ2VDb252ZXJ0ZWQocG9zdC5odG1sKTtcclxuXHR2YXIgZXhjZXJwdCA9IGh0bWwuc3Vic3RyKDAsIGh0bWwuaW5kZXhPZignPC9wPicpICsgNCk7XHJcblxyXG5cdHJldHVybiBgXHJcbiAgICA8YXJ0aWNsZSBjbGFzcz1cImJveGVzX19pdGVtIHNtYWxsIGFuaW1hdGUgYW5pbWF0ZV9fZmFkZS1pblwiPlxyXG4gICAgICA8aGVhZGVyIGNsYXNzPVwiYXV0aG9yXCI+XHJcbiAgICAgICAgICA8dGFibGU+XHJcbiAgICAgICAgICAgICAgPHRyPlxyXG4gICAgICAgICAgICAgICAgICAke2F1dGhvckltYWdlfVxyXG4gICAgICAgICAgICAgICAgICA8dGQ+PHNwYW4gY2xhc3M9XCJhdXRob3JfX25hbWVcIj48YSBocmVmPVwiL2F1dGhvci8ke3Bvc3QuYXV0aG9yLnNsdWd9XCI+JHtwb3N0LmF1dGhvci5uYW1lfTwvYT48L3NwYW4+PGJyPlxyXG4gICAgICAgICAgICAgICAgICAke3RpbWVBZ299ICZtaWRkb3Q7ICR7cmVhZFRpbWUocG9zdC5odG1sKX0gcmVhZCR7dGFnc308L3RkPlxyXG4gICAgICAgICAgICAgIDwvdHI+XHJcbiAgICAgICAgICA8L3RhYmxlPlxyXG4gICAgICA8L2hlYWRlcj5cclxuICAgICAgJHtwb3N0SW1hZ2V9XHJcbiAgICAgIDxhIGhyZWY9XCIvJHtwb3N0LnNsdWd9L1wiPlxyXG4gICAgICAgIDxoMT4ke3Bvc3QudGl0bGV9PC9oMT5cclxuICAgICAgICAke2V4Y2VycHR9XHJcbiAgICAgIDwvYT5cclxuICAgICAgPHA+PGEgaHJlZj1cIi8ke3Bvc3Quc2x1Z30vXCIgY2xhc3M9XCJkaW1tZWRcIj5SZWFkIG1vcmUuLi48L2E+PC9wPlxyXG4gICAgPC9hcnRpY2xlPmA7XHJcbn1cclxuIiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24odXNlcikge1xyXG5cdHZhciBpbWFnZSA9ICcnO1xyXG5cdGlmICh1c2VyLmltYWdlKSB7XHJcblx0XHRpbWFnZSA9IGBcclxuPHRkIHdpZHRoPVwiNSVcIj48aW1nIGRhdGEtc3JjPVwiJHt1c2VyLmltYWdlfVwiIGNsYXNzPVwiYXV0aG9yX19pbWFnZSBhdXRob3JfX2ltYWdlLS1zbWFsbCBsYXp5LWltYWdlIGltZy1iZyByb3VuZC1pbWdcIj48L3RkPlxyXG5cdFx0YDtcclxuXHR9XHJcblxyXG5cdHJldHVybiBgXHJcbjxkaXYgY2xhc3M9XCJhdXRob3Igc21hbGxcIj5cclxuICA8dGFibGU+PHRib2R5Pjx0cj5cclxuXHRcdCR7aW1hZ2V9XHJcbiAgICA8dGQ+XHJcbiAgICAgIDxzcGFuIGNsYXNzPVwiYXV0aG9yX19uYW1lXCI+JHt1c2VyLm5hbWV9PC9zcGFuPlxyXG4gICAgPC90ZD5cclxuICA8L3RyPjwvdGJvZHk+PC90YWJsZT5cclxuPC9kaXY+XHJcbmA7XHJcbn1cclxuIiwiaW1wb3J0IGVuY29kZSBmcm9tICcuLi9saWIvaHRtbC1lbmNvZGUnO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24ocmVzcG9uc2UpIHtcclxuXHJcbiAgdmFyIGNsYXNzZXMgPSAncmVzcG9uc2UgYm94ZXNfX2l0ZW0nO1xyXG4gIGlmIChyZXNwb25zZS5uYW1lLnRvTG93ZXJDYXNlKCkgPT09IHdpbmRvdy5hdXRob3JOYW1lLnRvTG93ZXJDYXNlKCkpIHtcclxuICAgIGNsYXNzZXMgKz0gJyBib3hlc19faXRlbS0tdHJhbnNwYXJlbnQnO1xyXG4gIH1cclxuXHJcbiAgdmFyIGltYWdlID0gJyc7XHJcbiAgaWYgKHJlc3BvbnNlLmltYWdlKSB7XHJcbiAgICBpbWFnZSA9IGA8dGQgd2lkdGg9XCI1JVwiPjxpbWcgZGF0YS1zcmM9XCIke3Jlc3BvbnNlLmltYWdlfVwiIGNsYXNzPVwiYXV0aG9yX19pbWFnZSBhdXRob3JfX2ltYWdlLS1zbWFsbCBsYXp5LWltYWdlIGltZy1iZyByb3VuZC1pbWdcIj48L3RkPmA7XHJcbiAgfVxyXG5cclxuICB2YXIgcmVhZFRpbWUgPSAnJztcclxuICBpZiAocmVzcG9uc2UucmVhZFRpbWUpIHtcclxuICAgIHJlYWRUaW1lID0gYCAmbWlkZG90OyAke3Jlc3BvbnNlLnJlYWRUaW1lfSByZWFkYDtcclxuICB9XHJcblxyXG4gIHZhciBleGNlcnB0ID0gcmVzcG9uc2UuZXhjZXJwdCB8fCByZXNwb25zZS5odG1sO1xyXG5cclxuICB2YXIgcmVhZE1vcmUgPSAnJztcclxuICBpZiAocmVzcG9uc2UuZXhjZXJwdCkge1xyXG4gICAgcmVhZE1vcmUgPSBgXHJcbjxkaXYgY2xhc3M9XCJyZXNwb25zZV9fdGV4dCBoaWRkZW5cIj4ke3Jlc3BvbnNlLmh0bWx9PC9kaXY+XHJcbjxwPjxhIGhyZWY9XCIjXCIgY2xhc3M9XCJyZXNwb25zZV9fcmVhZC1tb3JlIGRpbW1lZFwiPlJlYWQgbW9yZS4uLjwvYT48L3A+XHJcbmA7XHJcbiAgfVxyXG5cclxuICB2YXIgbmFtZSA9IGAke2VuY29kZShyZXNwb25zZS5uYW1lKX1gO1xyXG4gIGlmIChyZXNwb25zZS53ZWJzaXRlKSB7XHJcbiAgICBuYW1lID0gYDxhIGhyZWY9XCIke2VuY29kZShyZXNwb25zZS53ZWJzaXRlKX1cIj4ke25hbWV9PC9hPmA7XHJcbiAgfVxyXG5cclxuICByZXR1cm4gYFxyXG48ZGl2IGNsYXNzPVwiJHtjbGFzc2VzfSBzbWFsbFwiPlxyXG4gIDxkaXYgY2xhc3M9XCJhdXRob3JcIj5cclxuICAgIDx0YWJsZT5cclxuICAgICAgPHRyPlxyXG4gICAgICAgICR7aW1hZ2V9XHJcbiAgICAgICAgPHRkPlxyXG4gICAgICAgICAgPHNwYW4gY2xhc3M9XCJhdXRob3JfX25hbWVcIj4ke25hbWV9PC9zcGFuPjxicj5cclxuICAgICAgICAgICR7cmVzcG9uc2UudGltZUFnb30ke3JlYWRUaW1lfVxyXG4gICAgICAgIDwvdGQ+XHJcbiAgICAgIDwvdHI+XHJcbiAgICA8L3RhYmxlPlxyXG4gIDwvZGl2PlxyXG4gIDxhIGhyZWY9XCIjXCIgY2xhc3M9XCJyZXNwb25zZV9fZGVsZXRlXCIgZGF0YS1wdWJsaXNoZWQ9XCIke3Jlc3BvbnNlLnB1Ymxpc2hlZH1cIiBkYXRhLW5hbWU9XCIke3Jlc3BvbnNlLm5hbWV9XCI+PGltZyBkYXRhLXNyYz1cIi9hc3NldHMvaW1hZ2VzL3RyYXNoLnN2Z1wiIGNsYXNzPVwibGF6eS1pbWFnZVwiPjwvYT5cclxuICA8ZGl2IGNsYXNzPVwicmVzcG9uc2VfX2V4Y2VycHRcIj4ke2V4Y2VycHR9PC9kaXY+XHJcbiAgJHtyZWFkTW9yZX1cclxuPC9kaXY+YDtcclxufVxyXG4iLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbih0YWcpIHtcclxuXHJcbiAgdmFyIGNvdmVySW1hZ2UgPSAnJztcclxuICBpZiAodGFnLmltYWdlKSB7XHJcbiAgICBjb3ZlckltYWdlID0gYFxyXG4gICAgICA8ZGl2IGNsYXNzPVwiaW1nLXdyYXBwZXIgZnVsbC13aWR0aFwiPlxyXG4gICAgICAgIDxkaXYgY2xhc3M9XCJpbWctY29udGFpbmVyXCIgc3R5bGU9XCJwYWRkaW5nLWJvdHRvbTo1MCVcIj5cclxuICAgICAgICAgIDxpbWcgZGF0YS1zcmM9XCIke3RhZy5pbWFnZX1cIiBhbHQ9XCIke3RhZy5uYW1lfVwiIGNsYXNzPVwibGF6eS1pbWFnZVwiPlxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgICA8L2Rpdj5cclxuYDtcclxuICB9XHJcblxyXG4gIHJldHVybiBgXHJcbjxhcnRpY2xlIGNsYXNzPVwiYm94ZXNfX2l0ZW0gc21hbGwgYW5pbWF0ZSBhbmltYXRlX19mYWRlLWluXCI+XHJcbiAgPGhlYWRlciBjbGFzcz1cImF1dGhvclwiPlxyXG4gICAgICA8dGFibGU+XHJcbiAgICAgICAgICA8dHI+XHJcbiAgICAgICAgICAgICAgPHRkPjxzcGFuIGNsYXNzPVwiYXV0aG9yX19uYW1lXCI+PGEgaHJlZj1cIi90YWcvJHt0YWcuc2x1Z31cIj4ke3RhZy5uYW1lfTwvYT48L3NwYW4+PGJyPlxyXG4gICAgICAgICAgICAgIFx0JHt0YWcuY291bnQucG9zdHN9IHN0b3JpZXNcclxuICAgICAgICAgICAgICA8L3RkPlxyXG4gICAgICAgICAgPC90cj5cclxuICAgICAgPC90YWJsZT5cclxuICA8L2hlYWRlcj5cclxuICA8YSBocmVmPVwiL3RhZy8ke3RhZy5zbHVnfS9cIj5cclxuICAgICR7Y292ZXJJbWFnZX1cclxuICA8L2E+XHJcbiAgPGgxPiR7dGFnLm5hbWV9PC9oMT5cclxuICA8cD4ke3RhZy5kZXNjcmlwdGlvbiB8fCAnJ308L3A+XHJcbiAgPHA+PGEgaHJlZj1cIi90YWcvJHt0YWcuc2x1Z30vXCIgY2xhc3M9XCJkaW1tZWRcIj5TZWUgc3RvcmllcyBpbiBjYXRlZ29yeS4uLjwvYT48L3A+XHJcbiA8L2FydGljbGU+XHJcbmA7XHJcbn1cclxuIiwiLyoqXG4gKiBXb3JkIENvdW50XG4gKlxuICogV29yZCBjb3VudCBpbiByZXNwZWN0IG9mIENKSyBjaGFyYWN0ZXJzLlxuICpcbiAqIENvcHlyaWdodCAoYykgMjAxNSAtIDIwMTYgYnkgSHNpYW9taW5nIFlhbmcuXG4gKi9cblxudmFyIHBhdHRlcm4gPSAvW2EtekEtWjAtOV9cXHUwMzkyLVxcdTAzYzlcXHUwMGMwLVxcdTAwZmZcXHUwNjAwLVxcdTA2ZmZdK3xbXFx1NGUwMC1cXHU5ZmZmXFx1MzQwMC1cXHU0ZGJmXFx1ZjkwMC1cXHVmYWZmXFx1MzA0MC1cXHUzMDlmXFx1YWMwMC1cXHVkN2FmXSsvZztcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoZGF0YSkge1xuICB2YXIgbSA9IGRhdGEubWF0Y2gocGF0dGVybik7XG4gIHZhciBjb3VudCA9IDA7XG4gIGlmICghbSkge1xuICAgIHJldHVybiAwO1xuICB9XG4gIGZvciAodmFyIGkgPSAwOyBpIDwgbS5sZW5ndGg7IGkrKykge1xuICAgIGlmIChtW2ldLmNoYXJDb2RlQXQoMCkgPj0gMHg0ZTAwKSB7XG4gICAgICBjb3VudCArPSBtW2ldLmxlbmd0aDtcbiAgICB9IGVsc2Uge1xuICAgICAgY291bnQgKz0gMTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIGNvdW50O1xufTtcbiJdfQ==
