const gulp = require('gulp');
const imagemin = require('gulp-imagemin');
const clean = require('gulp-clean');
const concat = require('gulp-concat');
const htmlReplace = require('gulp-html-replace');
const cleanCSS = require('gulp-clean-css');
const browserSync = require('browser-sync');
const htmlmin = require('gulp-htmlmin');
const inlinesource = require('gulp-inline-source');
const express = require('express');


gulp.task('default', ['copy'], function() {
   gulp.start('imagemin', 'merge-css', 'html-replace', 'minify-html', 'express');
});

gulp.task('clean', function() {
   return gulp.src('dist')
              . pipe(clean() );
});


gulp.task('copy', ['clean'] ,  function() {
  return gulp.src('src/**/*')
             .pipe(gulp.dest('dist') );
});


gulp.task('imagemin', function() {
   gulp.src('dist/img/**/*')
       .pipe(imagemin() )
       .pipe(gulp.dest('dist/img') );
});


gulp.task('merge-css', function() {
   gulp.src(['dist/css/normalize.css',
             'dist/css/geral.css',
             'dist/css/header.css',
             'dist/css/section1.css',
             'dist/css/section2.css',
             'dist/css/section3.css',
             'dist/css/footer.css' ])
       .pipe(concat('site.css') )
       .pipe(cleanCSS() )
       .pipe(gulp.dest('dist/css') );
});

/*-------------------  HTML  ------------------*/

/* Minify HTML */
gulp.task('minify-html', function() {
    gulp.src('dist/*.html')
        .pipe(htmlmin({collapseWhitespace: true}))
        .pipe(gulp.dest('dist'));
});

gulp.task('html-replace', function() {
   gulp.src('dist/**/*.html')
      .pipe(htmlReplace({css:'css/site.css'}) )
      .pipe(gulp.dest('dist') );
});

/*----------------- Servidor ------------------*/
gulp.task('express', function(){
    var app = express();
    app.use(express.static(__dirname + '/dist/'));
    app.listen(process.env.PORT || 5000);
});

/*----------- Dev ------------------ */
gulp.task('browser-sync', function() {
    browserSync.init({
        server: {
            baseDir: 'src'
        }
    });
    gulp.watch('src/**/*').on('change',  browserSync.reload );
});
