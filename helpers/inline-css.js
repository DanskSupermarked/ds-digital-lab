var fs = require('fs');
var getAssetUrl = require('../core/server/data/meta/asset_url');

var cacheInline = {};

module.exports = function(context) {
	var url = getAssetUrl(context);

	var filePath = url.split('?')[0];

	if (!cacheInline[filePath]) {
		cacheInline[filePath] = fs.readFileSync('content/themes/ds-lab' + filePath, 'utf8');
	}

	return `<style>${cacheInline[filePath]}</style>`;
};
