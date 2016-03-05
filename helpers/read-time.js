var stripTags = require('striptags');
var wordCount = require('word-count');

module.exports = function(options) {
    var raw = options.fn(this);
    var text = stripTags(raw);
    var words = wordCount(text);
    var readTime = Math.ceil(words / 300);

    var affix = ' min';
    if (readTime > 1) {
        affix += 's';
    }

    return readTime + affix;
};
