module.exports = function(gulp, config) {
  return function() {
    var sass = require('gulp-sass');
    var notifier = require('node-notifier');
    var postCSS = require('gulp-postcss');
    var autoprefixer = require('autoprefixer');
    var csso = require('gulp-csso');

    return gulp.src(config.src)
      .pipe(sass({
        outputStyle: 'nested', // libsass doesn't support expanded yet
        precision: 4,
        includePaths: ['.']
      }).on('error', function(err) {
        notifier.notify({
          title: 'SCSS compile error',
          message: err.message
        });
        sass.logError.apply(this, arguments);
      }))
      .pipe(postCSS([
        autoprefixer({
          browsers: config.autoprefixer
        })
      ]))
      .pipe(csso())
      .pipe(gulp.dest(config.dest));
  };
};
