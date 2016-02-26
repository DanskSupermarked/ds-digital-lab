/**
 * Validate input fields as user types
 */

// Dependencies
import validateForm from './validate';

export default function($validators, callback) {
	$validators.forEach(function($validateContainer) {
		var $validateField = $validateContainer.querySelector('input, textarea');

		$validateField.addEventListener('input', function() {
			var valid = validateForm($validators);
			callback(valid);
		});
	});
}
