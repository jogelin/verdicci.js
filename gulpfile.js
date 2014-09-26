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

var bases = {
    app: 'app/',
    dist: 'build/'
};

var paths = {
    scripts: ['lib/**/*.js'],
    styles: ['**/*.css'],
    html: ['**/*.html'],
    images: ['images/**/*.png'],
    fonts: ['styles/webfontkit/*.eot', 'styles/webfontkit/*.svg', 'styles/webfontkit/*.ttf', 'styles/webfontkit/*.woff', 'styles/webfontkit/*.woff2'],
    datas: ['data/**/*.*'],
    extras: ['.htaccess', 'robots.txt', 'favicon.ico'],
};

// CLEAN BUILD
gulp.task('build-clean', function() {
    return gulp.src(bases.dist)
        .pipe(rimraf());
});

// APP
gulp.task('build-copy', ['build-clean'], function() {
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
        .pipe(gulp.dest(bases.dist + 'data'));

});

gulp.task('build-scripts', ['build-clean'], function() {
    gulp.src(paths.scripts, {cwd: bases.app})
        .pipe(jshint())
        .pipe(jshint.reporter('default'))
        .pipe(uglify())
        .pipe(concat('app.min.js'))
        .pipe(gulp.dest(bases.dist + 'scripts/'));
});

gulp.task('build-css', ['build-clean'], function() {
    return gulp.src(paths.styles, {cwd: bases.app})
        .pipe(minifyCSS({keepBreaks:true}))
        .pipe(concat('styles.min.css'))
        .pipe(gulp.dest(bases.dist + 'styles/'));
});

// BOWER
gulp.task('build-bower-dependencies', ['build-clean'], function() {
 	return gulp.src(mainBowerFiles())
		.pipe(filter('*.js'))
		.pipe(uglify())
		.pipe(concat('bower.min.js'))
		.pipe(gulp.dest(bases.dist + 'scripts/'));
 });

// MAIN
gulp.task('build', ['build-clean','build-scripts','build-css','build-bower-dependencies','build-copy']);

gulp.task('default', ['build']);

/*SERVER*/
var reload = browserSync.reload;
gulp.task('serve', function() {
    browserSync({
        server: {
            baseDir: 'build'
        }
    });

    gulp.watch(['./**/*.html', './**/*.js', './**/*.css'], {cwd: bases.dist}, reload);
});
