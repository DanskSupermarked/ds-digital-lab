var fs = require('fs');
var hbs = require('express-hbs');
var cheerio = require('cheerio');
var stripTags = require('striptags');
var wordCount = require('word-count');
var getAssetUrl = require('../core/server/data/meta/asset_url');

cacheInline = {};

module.exports = function() {
    hbs.registerHelper('convertImages', function(options) {
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
    });


    hbs.registerHelper('toFirstParagraph', function(options) {
        var raw = options.fn(this);
        var closingP = raw.indexOf('</p>');
        return raw.substring(0, closingP + 4);
    });

    hbs.registerHelper('readTime', function(options) {
        var raw = options.fn(this);
        var text = stripTags(raw);
        var words = wordCount(text);
        var readTime = Math.ceil(words / 300);

        var affix = ' min';
        if (readTime > 1) {
            affix += 's';
        }

        return readTime + affix;
    });

    hbs.registerHelper('inline_css', function(context, options) {
        var url = getAssetUrl(context);

        if (process.env.NODE_ENV !== 'production') {
            return `<link rel="stylesheet" type="text/css" href="${url}" />`
        }

        var filePath = url.split('?')[0]

        if (!cacheInline[filePath]) {
            cacheInline[filePath] = fs.readFileSync('content/themes/ds-lab' + filePath, 'utf8');
        }

        return `<style>${cacheInline[filePath]}</style>`;
    })
};
