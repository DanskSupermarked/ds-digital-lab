module.exports = function(name, fallback) {

	if (process.env[name]) {
		return process.env[name];
	}

	return fallback || '';
};
