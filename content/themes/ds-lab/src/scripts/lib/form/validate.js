/**
 * Check if the form is valid
 */

export default function($validators) {
	var notValid = $validators.some(function($validator) {
		if ($validator.dataset.validateRequired !== undefined) {
			return !$validator.classList.contains('validate--valid');
		} else {
			return $validator.classList.contains('validate--not-valid');
		}
	});

	return !notValid;
}
