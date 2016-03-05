import getAll from 'ds-assets/dom/get-all';

module.exports = function(raw) {
	var $container = document.createElement('div');
	$container.innerHTML = raw;
	getAll('img', $container).forEach(function($img) {
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

		alt.split(';').forEach(function(str) {
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

		$imgWrapper.querySelector('.img-container')
			.setAttribute('style', 'padding-bottom:' + padding + '%');

		$img.parentNode.outerHTML = $imgWrapper.outerHTML;
	});
	return $container.innerHTML;
};
