'use strict';

// Include Gulp
var gulp = require('gulp');

var concat = require("gulp-concat");
var filter = require("gulp-filter");
var jshint = require("gulp-jshint");
var clean = require('gulp-clean');
var uglify = require('gulp-uglify');
var minifyCss = require('gulp-minify-css');

var bases = {
    app: 'app/',
    dist: 'build/'
};

var paths = {
    scripts: ['scripts/**/*.js'],
    styles: ['styles/**/*.css'],
    html: ['index.html', '404.html','scripts/**/*.html'],
    images: ['images/**/*.png'],
    extras: ['crossdomain.xml', 'humans.txt', 'manifest.appcache', 'robots.txt', 'favicon.ico'],
};

/*BUILD*/
gulp.task('build-clean', function() {
    return gulp.src(bases.dist)
        .pipe(clean());
});

// Process scripts and concatenate them into one output file
gulp.task('build-scripts', ['build-clean'], function() {
    gulp.src(paths.scripts, {cwd: bases.app})
        .pipe(jshint())
        .pipe(jshint.reporter('default'))
        .pipe(uglify())
        .pipe(concat('app.min.js'))
        .pipe(gulp.dest(bases.dist + 'scripts/'));
});

gulp.task('build-bower-dependencies', function() {
 	gulp.src(g.mainBowerFiles())
		.pipe(filter('*.js'))
		.pipe(concat('bower.min.js'))
		.pipe(uglify())
		.pipe(gulp.dest(bases.dist + 'scripts/'));
 });

gulp.task('build', ['scripts']);
gulp.task('default', ['build']);

/*SERVER
gulp.task('serve', function() {
    browserSync({
        server: {
            baseDir: 'build'
        }
    });

    gulp.watch(['*.html', '*.js', '*.css'], {cwd: 'build'}, reload);
});  */
