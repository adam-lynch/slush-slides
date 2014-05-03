var gulp = require('gulp');

gulp.task('default', function (done) {
    gulp.src(__dirname + '/src/**')
        .pipe(gulp.dest('./'))
        .on('end', function () {
            done();
        });
});