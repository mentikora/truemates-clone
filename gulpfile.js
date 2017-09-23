const gulp = require('gulp');
const livereload = require('gulp-livereload')
const uglify = require('gulp-uglifyjs');
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const sourcemaps = require('gulp-sourcemaps');
const imagemin = require('gulp-imagemin');
const pngquant = require('imagemin-pngquant');
const concat = require('gulp-minify-css');

gulp.task('imagemin', function () {
  return gulp.src('app/images/*')
    .pipe(imagemin({
      progressive: true,
      svgoPlugins: [{removeViewBox: false}],
      use: [pngquant()]
    }))
    .pipe(gulp.dest('images'));
});

gulp.task('sass', function () {
  gulp.src('app/scss/application.scss')
    .pipe(sourcemaps.init())
    .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
    .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 7', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('dist'));
});

gulp.task('uglify', function() {
  gulp.src('app/js/*.js')
    .pipe(uglify('main.js'))
    .pipe(gulp.dest('dist/js'));
});

gulp.task('watch', ['sass', 'uglify'], function(){
  livereload.listen();

  gulp.watch('app/scss/**/*.scss', ['sass']);
  gulp.watch('app/js/*.js', ['uglify']);
  gulp.watch(['dist/application.css', 'dist/*.js'], function (files){
      livereload.changed(files)
  });
});

gulp.task('default', ['sass', 'uglify']);
