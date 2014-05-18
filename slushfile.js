var gulp = require('gulp');

gulp.task('default', ['init']);

gulp.task('init', function(done){
    gulp.src(__dirname + '/template/**', {dot: true})
        .pipe(gulp.dest('./'))
        .on('end', function () {
            done();
        });
});