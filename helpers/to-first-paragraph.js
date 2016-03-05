module.exports = function(options) {
    var raw = options.fn(this);
    var closingP = raw.indexOf('</p>');
    return raw.substring(0, closingP + 4);
};
