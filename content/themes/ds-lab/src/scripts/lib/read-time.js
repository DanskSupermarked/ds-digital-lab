import stripTags from './strip-html-tags';
import wordCount from 'word-count';

export default function(html) {
	var text = stripTags(html);
	var words = wordCount(text);
	var readTime = Math.ceil(words / 300);

	var affix = ' min';
	if (readTime > 1) {
		affix += 's';
	}

	return readTime + affix;
}
