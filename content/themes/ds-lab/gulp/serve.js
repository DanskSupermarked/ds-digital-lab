module.exports = function(gulp, config) {
  return function() {
    var browserSync = require('browser-sync').create();
    browserSync.init({
      proxy: 'localhost:2368',
      notify: false,
    });

    if (config.watch) {
      config.watch.forEach(function(settings) {
        gulp.watch(settings.src, settings.tasks);
      });
    }

    browserSync.watch(config.reload, function(event, file) {
      console.log(file);
      browserSync.reload(file.replace(__dirname + '/src', ''));
    });
  };
};
