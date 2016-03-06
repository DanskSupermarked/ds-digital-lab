module.exports = function(options) {
	if (process.env.NODE_ENV === 'production') {
		return options.fn(this);
	} else {
		return options.inverse(this);
	}
};
