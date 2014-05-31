var gulp = require('gulp');
var $ = require('gulp-load-plugins')({
    config: __dirname + '/package.json'
});

gulp.task('default', ['init']);

gulp.task('init', ['copy'], function(done){
    gulp.src(['./package.json', './bower.json'])
        .pipe($.install())
        .on('end', done);
});

gulp.task('copy', function(done){
    gulp.src(__dirname + '/template/**', {dot: true})
        .pipe(gulp.dest('./'))
        .on('end', done);
});