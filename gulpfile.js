var gulp = require('gulp');
var less = require('gulp-less');
var rename = require('gulp-rename');
var sourcemaps = require('gulp-sourcemaps');
var concat = require('gulp-concat');
var cssmin = require('gulp-cssmin');
var htmlReplace = require('gulp-html-replace');
var clean = require('gulp-clean');

var now = Date.now();

gulp.task('compileTemplates', ['cleanTemplates'], function() {
	return gulp.src('./resources/templates/index.html')
		.pipe(htmlReplace({
			'css': '/css/main' + now + '.min.css'
		}))
		.pipe(gulp.dest('dist/templates'));
});

gulp.task('compileStyles', ['cleanStyles'], function () {
	return gulp.src('./resources/less/**/*.less')
		.pipe(sourcemaps.init())
		.pipe(less())
		.pipe(concat('main' + now + '.min.css'))
		.pipe(cssmin())
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

gulp.task('default', ['compileTemplates', 'compileStyles']);
gulp.task('cleanAll', ['cleanTemplates', 'cleanStyles']);