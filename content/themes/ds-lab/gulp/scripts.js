module.exports = function(gulp, config) {
  return function() {

    var browserify = require('browserify');
    var notifier = require('node-notifier');
    var gutil = require('gulp-util');
    var stream = require('vinyl-source-stream');
    var buffer = require('vinyl-buffer');
    var uglify = require('gulp-uglify');
    var rename = require('gulp-rename');
    var sourcemaps = require('gulp-sourcemaps');

    // set up the browserify instance on a task basis
    var b = browserify({
      entries: './' + config.src,
      debug: true
    });

    return b
      .transform('babelify', {
        presets: ['es2015']
      })
      .bundle()
      .on('error', function(err) {
        notifier.notify({
          title: 'Javascript compile error',
          message: err.message
        });
        gutil.log(gutil.colors.red('Javascript compile error:'), err.message);
        this.emit('end');
      })
      .pipe(stream('main.js'))
      .pipe(buffer())
      .pipe(gulp.dest(config.dest))
      .pipe(rename('main.min.js'))
      .pipe(uglify())
      .pipe(gulp.dest(config.dest));
  };
};
