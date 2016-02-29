/**
 * Handle navigation
 */

// Dependencies
import scrollChange from 'ds-assets/scroll/scroll-change';
import debounce from 'ds-assets/async/debounce';
import getAll from 'ds-assets/dom/get-all';
import getUserData from '../lib/get-logged-in-data';

export default function() {

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
  scrollChange(function() {
    $stickyNav.classList.remove('nav--active');
  }, function() {
    $stickyNav.classList.add('nav--active');
  }, window.innerHeight);

  /**
   * Hide sticky navigation when scrolled to the top of the document
   * @return {void}
   */
  var onTop = function() {
    var scrollPos = window.scrollY || document.documentElement.scrollTop;
    if (scrollPos <= 0) {
      $stickyNav.classList.add('nav--hidden');
      $stickyNav.classList.remove('nav--active');
    } else {
      $stickyNav.classList.remove('nav--hidden');
    }
  };

  window.addEventListener('scroll', debounce(onTop));
  window.addEventListener('resize', debounce(onTop));

  // Change wording on "sign in" button when user is logged in
  getUserData().then(function() {
    getAll('.nav__item--sign-in').forEach(function($signin) {
      $signin.innerHTML = 'Create a story';
    });
  }).catch(function() {});

}
