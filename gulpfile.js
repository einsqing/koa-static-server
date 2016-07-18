/**
 * Created by heqing on 16/6/14.
 */
var gulp = require('gulp');
var uglifycss = require('gulp-uglifycss');
var uglify = require('gulp-uglify');
var htmlmin = require('gulp-htmlmin');
var ngAnnotate = require('gulp-ng-annotate');
var ngmin = require('gulp-ngmin');
var clean = require('gulp-clean');
var gulpSequence = require('gulp-sequence');
var plumber = require('gulp-plumber');
var inline = require('gulp-inline');

gulp.task('default', gulpSequence('css', 'js', 'html', 'image', 'public', 'font'));

gulp.task('public', function () {
    return gulp.src('./browser/src/public/**')
        .pipe(plumber())
        .pipe(gulp.dest('./browser/dist/public'));
})

gulp.task('font', function () {
    return gulp.src(['./browser/src/**/*.{ttf,eot,svg,woff}', '!./browser/src/public/**'])
        .pipe(plumber())
        .pipe(gulp.dest('./browser/dist'));
})

gulp.task('clean', function () {
    return gulp.src('./browser/dist')
        .pipe(plumber())
        .pipe(clean());
});

gulp.task('css', function () {
    return gulp.src(['./browser/src/**/*.css', '!./browser/src/public/**'])
        .pipe(plumber())
        .pipe(uglifycss({
            "maxLineLen": 80,
            "uglyComments": true
        }))
        .pipe(gulp.dest('./browser/dist'));
});

gulp.task('js', function () {
    return gulp.src(['./browser/src/**/*.js', '!./browser/src/public/**'])
        .pipe(plumber())
        .pipe(ngAnnotate())
        .pipe(ngmin({dynamic: false}))
        .pipe(uglify())
        .pipe(gulp.dest('./browser/dist'));
});

gulp.task('html', function () {
    return gulp.src(['./browser/src/**/*.html', '!./browser/src/public/**'])
        .pipe(plumber())
        .pipe(htmlmin({collapseWhitespace: true}))
        .pipe(inline({
            js: uglify,
            css: uglifycss,
            disabledTypes: ['svg', 'img', 'js'] // Only inline css files
        }))
        .pipe(gulp.dest('./browser/dist'))
});

gulp.task('image', function () {
    return gulp.src(['./browser/src/**/*.{png,jpg,gif,ico}', '!./browser/src/public/**'])
        .pipe(plumber())
        .pipe(gulp.dest('./browser/dist'))
});