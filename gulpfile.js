const gulp = require('gulp');
const imagemin = require('gulp-imagemin');
const clean = require('gulp-clean');
const concat = require('gulp-concat');
const htmlReplace = require('gulp-html-replace');
const cleanCSS = require('gulp-clean-css');
const browserSync = require('browser-sync');


gulp.task('default', ['copy'], function() {
   gulp.start('build-img', 'merge-css', 'html-replace');
});

gulp.task('clean', function() {
   return gulp.src('dist')
              . pipe(clean() );
});


gulp.task('copy', ['clean'] ,  function() {
  return gulp.src('src/**/*')
             .pipe(gulp.dest('dist') );
});


gulp.task('build-img', function() {
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

gulp.task('html-replace', function() {
   gulp.src('dist/**/*.html')
      .pipe(htmlReplace({css:'css/site.css'}) )
      .pipe(gulp.dest('dist') );
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

// gulp.task('server', function() {
//     browserSync.init({
//         server: {
//             baseDir: 'src'
//         }
//     });
//
//     gulp.watch('src/**/*').on('change', browserSync.reload);
//
//     gulp.watch('src/css/**/*.css').on('change', function(event) {
//         gulp.src(event.path)
//             .pipe(csslint())
//             .pipe(csslint.formatter());
//     });
//
// });
