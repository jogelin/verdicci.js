'use strict';

// Include Gulp
var gulp = require('gulp');

var concat = require("gulp-concat");
var filter = require("gulp-filter");
var jshint = require("gulp-jshint");
var uglify = require('gulp-uglify');
var minifyCSS = require('gulp-minify-css');
var rimraf = require('gulp-rimraf');
var mainBowerFiles = require('main-bower-files');
var debug = require('gulp-debug');
var browserSync = require('browser-sync');
var runSequence = require('run-sequence');

var bases = {
    app: 'app/',
    dist: 'build/'
};

var paths = {
    scripts: ['lib/**/*.js'],
    styles: ['**/*.css', '!styles/webfontkit/**/*.css'],
    html: ['**/*.html'],
    images: ['images/**/*.png'],
    fonts: ['styles/webfontkit/*.eot', 'styles/webfontkit/*.svg', 'styles/webfontkit/*.ttf', 'styles/webfontkit/*.woff', 'styles/webfontkit/*.woff2'],
    datas: ['data/**/*.*'],
    extras: ['.htaccess', 'robots.txt', 'favicon.ico'],
};

// CLEAN
gulp.task('build-clean', function() {
    return gulp.src(bases.dist)
        .pipe(rimraf());
});

// APP
gulp.task('build-copy', function() {
    // Copy html
    gulp.src(paths.html, {cwd: bases.app})
        .pipe(gulp.dest(bases.dist));

     // Copy images
    gulp.src(paths.images, {cwd: bases.app})
        .pipe(gulp.dest(bases.dist + 'images/'));

    // Copy fonts
    gulp.src(paths.fonts, {cwd: bases.app})
        .pipe(gulp.dest(bases.dist + 'styles/webfontkit/'));

    // Copy extras
    gulp.src(paths.extras, {cwd: bases.app})
        .pipe(gulp.dest(bases.dist));

    // Copy datas
    gulp.src(paths.datas, {cwd: bases.app})
        .pipe(gulp.dest(bases.dist + 'data'))
        .pipe(browserSync.reload({stream:true}));

});

gulp.task('build-scripts', function() {
    return gulp.src(paths.scripts, {cwd: bases.app})
        .pipe(jshint())
        .pipe(jshint.reporter('default'))
        .pipe(uglify())
        .pipe(concat('app.min.js'))
        .pipe(gulp.dest(bases.dist + 'scripts/'));
});

gulp.task('build-css', function() {
    return gulp.src(paths.styles, {cwd: bases.app})
        .pipe(minifyCSS({keepBreaks:true}))
        .pipe(concat('styles.min.css'))
        .pipe(gulp.dest(bases.dist + 'styles/'));
});

// BOWER
gulp.task('build-bower-dependencies', function() {
 	gulp.src(mainBowerFiles())
		.pipe(filter('*.js'))
		.pipe(uglify())
		.pipe(concat('bower.min.js'))
		.pipe(gulp.dest(bases.dist + 'scripts/'));

 	gulp.src(mainBowerFiles())
		.pipe(filter('*.css'))
		.pipe(minifyCSS({keepBreaks:true}))
		.pipe(concat('bower.min.css'))
		.pipe(gulp.dest(bases.dist + 'styles/'));
 });

// MAIN
gulp.task('watch', function() {
    gulp.watch(bases.app + paths.scripts, ['build-scripts']);
    gulp.watch(bases.app + paths.styles[0], ['build-css']);
    gulp.watch(bases.app + paths.html, ['build-copy']);
    gulp.watch(bases.app + paths.datas, ['build-copy']);
    gulp.watch(bases.app + paths.fonts, ['build-copy']);
    gulp.watch(bases.app + paths.images, ['build-copy']);
    gulp.watch(bases.app + paths.extras, ['build-copy']);
    gulp.watch(mainBowerFiles(), ['build-bower-dependencies']);
});

gulp.task('build', function(callback) {
    return runSequence('build-clean',
        ['build-scripts','build-css','build-bower-dependencies','build-copy'],
        'watch',
        callback);
});

/*SERVER*/
gulp.task('serve', function() {
    browserSync({
        server: {
            baseDir: 'build'
        }
    });

    gulp.watch(['./**/*.*'], {cwd: bases.dist}, browserSync.reload);
});
