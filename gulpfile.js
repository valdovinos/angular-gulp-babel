var gulp = require('gulp');
var sourcemaps = require('gulp-sourcemaps');
var babel = require('gulp-babel');
var gutil = require('gulp-util');
var ngAnnotate = require('gulp-ng-annotate');
var uglify = require('gulp-uglify');
var browserSync = require('browser-sync').create();

var path = require('path');

gulp.task('babel', function() {
    return gulp.src('scripts/controllers/*.js')
        .pipe(babel())
        .pipe(ngAnnotate())
        .pipe(uglify().on('error', gutil.log))
        .pipe(gulp.dest('scripts/controllers_builds/'))
        .pipe(browserSync.stream({once: true}));
});

gulp.task('watch', function() {
    gulp.watch('scripts/controllers/*.js', ['babel']);
});

gulp.task('browser-sync', function() {
    browserSync.init({
        server: {
            baseDir: "./"
        }
    });
    gulp.watch("./*.html").on('change', browserSync.reload);
});

/*
gulp.task('minify', function() {
  return gulp.src('scripts/controllers_builds/*.js')    
    .pipe(uglify().on('error', gutil.log))
    .pipe(gulp.dest('scripts/controllers_builds/'));
});
*/

gulp.task('default', ['watch','browser-sync']);