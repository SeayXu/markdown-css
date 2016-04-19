'use strict';
// 引入 gulp
var gulp = require('gulp');

// 引入组件
var sass = require('gulp-sass');
var minifycss = require('gulp-minify-css');
var rename = require('gulp-rename');
var browserSync = require('browser-sync').create();

// 编译sass
gulp.task('sass', function() {
    gulp.src('./src/*.scss')
        .pipe(sass())
        .pipe(gulp.dest('./build/'));
});

// 压缩css
gulp.task('css-min', function() {
    gulp.src('./build/*.css')
        .pipe(gulp.dest('./dist/'))
        //给文件添加.min后缀
        .pipe(rename({ suffix: '.min' }))
        .pipe(minifycss())
        .pipe(gulp.dest('./dist/'));
});

// 复制html文件
gulp.task('html', function() {
    gulp.src('./src/*.html')
        .pipe(gulp.dest('./dist/'));
});

gulp.task('run', function() {
    browserSync.init({
      server: {
          baseDir: "./"
      }
    });

    gulp.watch("./src/*.html", ['html']);
    gulp.watch("./src/*.scss", ['sass']);
    gulp.watch("./build/*.css", ['css-min']);
    gulp.watch("./dist/*.html").on('change', browserSync.reload);
});

// 默认任务
gulp.task('default', function(){
    gulp.run('sass');

    gulp.watch('./src/sass/*.scss', function(){
        gulp.run('sass');
    });

    gulp.watch('./src/css/*.css', function(){
        gulp.run('style');
    });
});
