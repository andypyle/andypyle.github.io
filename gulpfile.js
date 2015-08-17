// Require Gulp & friends.
var gulp = require('gulp'),
    sass = require('gulp-sass'),
    imagemin = require('gulp-imagemin'),
    concat = require('gulp-concat'),
    rename = require('gulp-rename'),
    jade = require('gulp-jade'),
    prefix = require('gulp-autoprefixer'),
    minifyCSS = require('gulp-minify-css'),
    browserSync = require('browser-sync').create();

var process = {
    'sass':{
        'in':'./src/sass/style.sass',
        'out':'./styles',
        'opts':{
            'outputStyle': 'expanded'
        }
    },
    'jade':{
        'in':'./src/jade/index.jade',
        'out':'./',
        'opts':{
            'locals': {},
            'pretty': '\t'
        }
    },
    'img':{
        'in':'./src/img/**/*',
        'out':'./img'
    }
};

// --- PROCESS SASS
gulp.task('sass', function(){
    gulp.src(process.sass.in)
    .pipe(sass(process.sass.opts)
    .on('error', sass.logError))
    .pipe(prefix({
        browsers: [
                '> 1%',
                'last 2 versions',
                'firefox >= 4',
                'safari 7',
                'safari 8',
                'IE 8',
                'IE 9',
                'IE 10',
                'IE 11'
            ],
    cascade: true
    }))
    .pipe(rename('style.css'))
    .pipe(gulp.dest(process.sass.out))
    .pipe(minifyCSS())
    .pipe(concat('style.min.css'))
    .pipe(gulp.dest(process.sass.out))
    .pipe(browserSync.stream());
});
/// --


// --- PROCESS JADE
gulp.task('jade', function(){
    gulp.src(process.jade.in)
        .pipe(jade(process.jade.opts))
        .pipe(gulp.dest(process.jade.out))

});
/// --


// --- COMPRESS IMAGES
gulp.task('images', function(){
    gulp.src(process.img.in)
        .pipe(imagemin())
        .pipe(gulp.dest(process.img.out));
});
/// --


// --- START SERVER
gulp.task('sync', function(){
    browserSync.init({
      server: './'
    });

    gulp.watch('./src/sass/**/*.sass', ['sass']);
    gulp.watch('./src/jade/**/*.jade', ['jade']);
    gulp.watch('./*.html').on('change', browserSync.reload);
});
/// --


// --- WATCH TASK
gulp.task('watch', function(){
    gulp.watch(['./src/sass/**/*.sass', './src/jade/**/*.jade', './src/img/*'], ['sass','jade','images']);
});
/// --


// --- DEFAULT
gulp.task('default', ['sync','sass','jade','images','watch']);
/// --


