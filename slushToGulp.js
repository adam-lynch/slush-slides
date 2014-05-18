var gulp = require('gulp');
var $ = require('gulp-load-plugins')();

gulp.src('./slushfile.js')
    .pipe($.replace("gulp.dest('./')", "gulp.dest('./test')"))
    .pipe($.rename('gulpfile.js'))
    .pipe(gulp.dest('./'));