var gulp = require('gulp');
var $ = require('gulp-load-plugins')();

gulp.src('./slushfile.js')
    .pipe($.replace("'./", "'./test/"))
    .pipe($.rename('gulpfile.js'))
    .pipe(gulp.dest('./'));