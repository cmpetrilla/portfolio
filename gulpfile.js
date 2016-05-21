var gulp = require('gulp');
var less = require('gulp-less');
var rename = require('gulp-rename');
var sourcemaps = require('gulp-sourcemaps');
var concat = require('gulp-concat');
var cleanCSS = require('gulp-clean-css');
var htmlReplace = require('gulp-html-replace');
var clean = require('gulp-clean');
var watch = require('gulp-watch');

var now = Date.now();

gulp.task('compileTemplates', ['cleanTemplates'], function() {
	return gulp.src('./resources/templates/index.html')
		.pipe(htmlReplace({
			'css': '/css/main' + now + '.min.css'
		}))
		.pipe(gulp.dest('dist/templates'));
});

// todo: turn off source mapping in production
gulp.task('compileStyles', ['cleanStyles'], function () {
	return gulp.src('./resources/less/**/*.less')
		.pipe(sourcemaps.init())
		.pipe(less())
		.pipe(concat('main' + now + '.min.css'))
		.pipe(cleanCSS())
		.pipe(sourcemaps.write())
		.pipe(gulp.dest('./dist/css'));
});

gulp.task('cleanTemplates', function() {
	return gulp.src('./dist/templates/**/*.html', {read: false})
		.pipe(clean());
});

gulp.task('cleanStyles', function() {
	return gulp.src('./dist/css/**/*.css', {read: false})
		.pipe(clean());
});

gulp.task('watchTemplates', function() {
	gulp.watch('./resources/templates/**/*.html', ['compileTemplates'])
});


gulp.task('watchStyles', function() {
	gulp.watch('./resources/less/**/*.less', ['compileStyles'])
});

gulp.task('default', ['compileTemplates', 'compileStyles']);
gulp.task('cleanAll', ['cleanTemplates', 'cleanStyles']);
gulp.task('watchAll', ['default', 'watchTemplates', 'watchStyles']);