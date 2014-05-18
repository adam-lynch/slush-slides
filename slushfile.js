var gulp = require('gulp');
var $ = require('gulp-load-plugins')({
    config: __dirname + '/package.json'
});

gulp.task('default', ['init']);

gulp.task('init', function(done){
    gulp.src(__dirname + '/template/**', {dot: true})
        .pipe(gulp.dest('./'))
        .pipe($.install())
        .on('end', function () {
            done();
        });
});