// Include some plugins and stuff
var gulp = require('gulp');
var $ = require("gulp-load-plugins")();
var each = require('through');
var lazypipe = require('lazypipe');

var latestSlides = [];
// Any reusable paths / globs go here; trying to keep things DRY
var paths = {};
paths.source = './slides/src/';
paths.imagesDir = paths.source + 'images/';
paths.images = [paths.imagesDir + '*.png', paths.imagesDir + '*.jpg'];
paths.slides = './slides/*.md';
paths.scriptsDir = paths.source + 'scripts/';
paths.scripts = paths.scriptsDir + '*.coffee';
paths.rootScript = paths.scriptsDir + 'index.coffee';
paths.stylesDir = paths.source + 'styles/';
paths.styles = paths.stylesDir + '*.less';
paths.rootStylesheet = paths.stylesDir + 'index.less';
paths.templates = paths.source + 'templates/*.jade';

paths.output = './output/';
paths.outputHtmlDir = './';
paths.outputHtml = paths.outputHtmlDir + '*.html';
paths.outputImageDir = paths.output + 'images/';
paths.outputScriptsDir = paths.output + 'scripts/';


/*
* Resusable pipelines
*/
var pipes = {
    minifyAndStoreScripts: lazypipe()
//        .pipe(minifyJs)
        .pipe(gulp.dest, paths.outputScriptsDir)
};


/*
* Main tasks
*/

gulp.task('default', ['compile']);

gulp.task('compile', ['images', 'scripts', 'styles', 'templates']);

gulp.task('watch', ['compile'], function() {
    gulp.watch(paths.images, ['images']);
    gulp.watch(paths.scripts, ['scripts']);
    gulp.watch(paths.styles, ['styles']);
    gulp.watch([paths.slides, paths.templates], ['templates']);
});


gulp.task('clean', function(done){
	gulp.src(paths.output)
        .pipe($.clean())
        .on('end', done);
});


gulp.task('validate', function(done){
	gulp.src(paths.outputHtml)
        .pipe($.w3cjs())
        .on('end', done);
});

/*
* Secondary level tasks
*/


gulp.task('images', function(done){
	gulp.src(paths.images)
	    .pipe(gulp.dest(paths.outputImageDir))
        .on('end', done);
});


gulp.task('parse-slides', function(done){
	latestSlides = []; // reset

	gulp.src(paths.slides)
        .pipe($.frontMatter())
        .pipe($.markdown())
        .pipe(each(function(slide){
            latestSlides.push(slide);
        }))
        .on('end', done);
});


gulp.task('scripts', ['scripts-first-party', 'scripts-third-party']);


gulp.task('scripts-first-party', function(done){
	gulp.src(paths.rootScript, {read: false})
        .pipe($.browserify({
                transform: ['coffeeify'],
                extensions: ['.coffee']
            }))
        .pipe($.rename('index.js'))
        .pipe(pipes.minifyAndStoreScripts())
        .on('end', done);
});


gulp.task('scripts-third-party', function(done){
	$.bowerFiles()
        .pipe($.concat('third-party.js'))
        .pipe(pipes.minifyAndStoreScripts())
        .on('error', function(err){
            exit(err);
        })
        .on('end', done);
});


gulp.task('templates', ['parse-slides'], function(done) {
    gulp.src(paths.templates)
        .pipe($.jade({
            locals: {
                slides: latestSlides
            }
        }))
        .pipe(gulp.dest(paths.outputHtmlDir))
        .on('end', done);
});


gulp.task('styles', function(done){
	gulp.src(paths.rootStylesheet)
        .pipe($.less())
        .pipe($.autoprefixer('last 2 versions'))
        .pipe(gulp.dest(paths.output))
        .on('end', done);
});