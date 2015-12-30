var babelify = require('babelify');
var browserify = require('browserify');
var buffer = require('vinyl-buffer');
var gulp = require('gulp');
var gutil = require('gulp-util');
var source = require('vinyl-source-stream');
var sourcemaps = require('gulp-sourcemaps');
var uglify = require('gulp-uglify');
var sass = require('gulp-sass');
var gzip = require('gulp-gzip');

gulp.task('lib', function() {
	b = browserify({
		entries: 'src/lib/app.js',
		debug: true,
		transform: [
			["babelify", { presets: ["es2015", "react"]}]
		],
		paths: [ 'node_modules', 'src/lib' ]
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

gulp.task('style', function() {
	gulp.src('src/scss/app.scss')
		.pipe(sourcemaps.init())
		.pipe(sass({
			includePaths: [ 'node_modules/normalize.css']
		}))
		// the sass plugin sourcemaps suck for included files, so write
		// and reload them to let the sourcemaps plugin fix them up.
		.pipe(sourcemaps.write({includeContent: false}))
		.pipe(sourcemaps.init({loadMaps: true}))
		.pipe(sourcemaps.write('.'))
		.pipe(gulp.dest('pub/style'));
});

gulp.task('eunomia', function() {
	gulp.src('vendor/eunomia/*.otf')
		.pipe(gulp.dest('pub/fonts'));
});

gulp.task('fonts', ['eunomia']);
gulp.task('default', ['lib', 'style', 'fonts']);

gulp.task('static-gzip-lib', ['lib'], function() {
	gulp.src(['pub/lib/*.js', 'pub/lib/*.map'])
		.pipe(gzip())
		.pipe(gulp.dest('pub/lib'));
});
gulp.task('static-gzip-style', ['style'], function() {
	gulp.src(['pub/style/*.css', 'pub/style/*.map'])
		.pipe(gzip())
		.pipe(gulp.dest('pub/style'));
});
gulp.task('static-gzip-fonts', ['fonts'], function() {
	gulp.src(['pub/fonts/*.otf'])
		.pipe(gzip())
		.pipe(gulp.dest('pub/fonts'));
});
gulp.task('static-gzip', ['static-gzip-lib', 'static-gzip-style', 'static-gzip-fonts'])
