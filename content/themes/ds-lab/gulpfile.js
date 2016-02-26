var gulp = require('gulp');

gulp.task('styles', require('./gulp/styles')(gulp, {
	src: 'src/styles/main.scss',
	dest: 'assets/styles',
	autoprefixer: ['last 2 versions']
}));

gulp.task('scripts', require('./gulp/scripts')(gulp, {
	src: 'src/scripts/main.js',
	dest: 'assets/scripts'
}));

gulp.task('build', ['styles', 'scripts']);

gulp.task('serve', ['build'], require('./gulp/serve')(gulp, {
	watch: [{
		src: 'src/styles/**/*.scss',
		tasks: ['styles']
	}, {
		src: 'src/scripts/**/*.js',
		tasks: ['scripts']
	}],
	reload: ['assets/**']
}));
