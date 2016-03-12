/**
 * Tool tip showed when user marks text in article.
 * This makes the use able to share/comment on the marked.
 */

import validateForm from '../lib/form/validate';
import getAll from 'ds-assets/dom/get-all';

// Cached dom elements
var $postContent;
var $toolTip;
var $twitter;
var $responseForm;
var $cta;


/**
 * Get the text selected by the user
 * @return {string}
 */
var getSelectedText = function() {
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
var isInsideContent = function(selection) {
	var $container = selection.anchorNode.parentElement;

	while ($container !== $postContent && $container.parentNode) {
		$container = $container.parentNode;
	}

	return ($container === $postContent);

};

/**
 * Places the tool tip above the selected text
 * @return {void}
 */
var placeToolTip = function() {

	// Timeout to make sure the text has been selected
	setTimeout(function() {

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
		$twitter.setAttribute('href', `https://twitter.com/intent/tweet?text=${encodeURIComponent(highlightedText)}&url=${encodeURIComponent($twitter.dataset.url)}`);

		// Show and place tool tip
		var scrollPosition = (window.scrollY || document.documentElement.scrollTop);
		var range = selection.getRangeAt(0);
		var rect = range.getBoundingClientRect();
		$toolTip.style.top = (rect.top + scrollPosition) + 'px';
		$toolTip.classList.add('tool-tip--visible');
		$toolTip.style.left = (0.5 * rect.left + 0.5 * rect.right - 0.5 * $toolTip.clientWidth) + 'px';
	}, 10);
};

export default function() {
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
	$toolTip.querySelector('.tool-tip__response').addEventListener('click', function(e) {
		e.preventDefault();
		var highlightedText = getSelectedText();
		$responseText.value = `> ${highlightedText}

`;
		$responseText.focus();
		$responseText.parentNode.classList.add('validate--valid');
		$responseText.parentNode.classList.remove('validate--not-valid');
		$responseText.parentNode.querySelector('.placeholder').classList.add('placeholder--not-empty');
		var valid = validateForm(getAll('.validate', $responseForm));
		if (valid) {
			$cta.classList.remove('btn--disabled');
		} else {
			$cta.classList.add('btn--disabled');
		}
	});
}
