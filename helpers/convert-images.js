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

        // Lazy load all but the first image
        if (i > 0) {
            $newImg('img').attr('data-src', src).addClass('lazy-image animate animate--fast animate__fade-in');
        } else {
            $newImg('img').attr('src', src);
        }

        alt.split(';').forEach(function(str) {
            if (str === 'full-size') {
                $newImg('.img-wrapper').addClass('full-width');
            } else if (str.indexOf('ratio=') === 0) {
                var ratio = str.replace('ratio=', '');
                if (ratio.indexOf(':')) {
                    var dimensions = ratio.split(':');
                    ratio = dimensions[0] / dimensions[1];
                }
                padding = 100 / ratio;
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
