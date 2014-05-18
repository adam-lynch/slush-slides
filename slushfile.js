var gulp = require('gulp');
var $ = require('gulp-load-plugins')();

gulp.task('default', ['init']);

gulp.task('init', function(done){
    gulp.src(__dirname + '/template/**', {dot: true})
        .pipe(gulp.dest('./'))
        .pipe($.install())
        .on('end', function () {
            done();
        });
});