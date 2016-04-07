var hbs = require('express-hbs');
var cheerio = require('cheerio');

module.exports = function(options) {
    var raw = options.fn(this);
    var $ = cheerio.load(raw);
    $('img').each(function(i) {
        var $img = $(this);
        var $newImg = cheerio.load('<div class="img-wrapper"><div class="img-container"><img></div></div>');
        var src = $img.attr('src');
        var alt = $img.attr('alt');
        var padding = 50;

        // Lazy load
        $newImg('img').attr('data-src', src).addClass('lazy-image animate animate--fast animate__fade-in');

        alt.split(';').forEach(function(str) {
            if (str === 'full-size' || str === 'full-width') {
                $newImg('.img-wrapper').addClass('full-width');
            } else if (str.indexOf('ratio=') === 0) {
                var ratio = str.replace('ratio=', '');
                if (ratio.indexOf(':')) {
                    var dimensions = ratio.split(':');
                    ratio = dimensions[0] / dimensions[1];
                }
                padding = 100 / ratio;
            } else if (str === 'borders') {
                $newImg('.img-container').addClass('img-container--borders');
            } else {
                alt = str;
            }
        });

        $newImg('img')
            .attr('alt', alt)
            .attr('title', $img.attr('title'));

        $newImg('.img-container')
            .attr('style', 'padding-bottom:' + padding + '%');

        $img.parent().replaceWith($newImg.html());
    });
    return new hbs.SafeString($.html());
};
