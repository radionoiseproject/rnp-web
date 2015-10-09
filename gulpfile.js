var babelify = require('babelify');
var browserify = require('browserify');
var buffer = require('vinyl-buffer');
var gulp = require('gulp');
var gutil = require('gulp-util');
var source = require('vinyl-source-stream');
var sourcemaps = require('gulp-sourcemaps');
var uglify = require('gulp-uglify');

gulp.task('lib', function() {
	b = browserify({
		entries: 'src/lib/app.js',
		debug: true,
		transform: [ babelify ]
	})
	return b.bundle()
		.pipe(source('app.js'))
		.pipe(buffer())
		.pipe(sourcemaps.init({loadMaps: true}))
		//.pipe(uglify())
		.on('error', gutil.log)
		.pipe(sourcemaps.write('.'))
		.pipe(gulp.dest('pub/lib'));
});

gulp.task('default', ['lib']);
