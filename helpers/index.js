var hbs = require('express-hbs');

module.exports = function() {
	hbs.registerHelper('convert_images', require('./convert-images'));
	hbs.registerHelper('to_first_paragraph', require('./to-first-paragraph'));
	hbs.registerHelper('read_time', require('./read-time'));
	hbs.registerHelper('inline_css', require('./inline-css'));
	hbs.registerHelper('env', require('./env'));
};
