/**
 * Encode a string
 * @param  {string} string
 * @return {string}
 */
export default function(string) {
	var htmlEncodedValue = document.createElement('div').appendChild(
		document.createTextNode(string)).parentNode.innerHTML;
	return htmlEncodedValue.replace(/\r?\n/g, '<br>');
}
