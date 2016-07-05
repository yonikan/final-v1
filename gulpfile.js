
var browserSync = require('browser-sync').create();
var gulp = require('gulp');
var sourcemaps = require('gulp-sourcemaps');
var sass = require('gulp-sass');
var ejs = require("gulp-ejs");
var rename = require("gulp-rename");
var concat = require('gulp-concat-util');
var gutil = require('gulp-util');
var gulpif = require('gulp-if');

// ... production version ----
var production = false;
var htmlmin = require('gulp-htmlmin');
var autoprefixer = require('gulp-autoprefixer');
var cssnano = require('gulp-cssnano');
var uglify = require('gulp-uglify');

// ... variables ----
var ejsOptions = {msg: 'works fine!'};
var htmlminOptions = {collapseWhitespace: true};
var sassOptions = {outputStyle: 'expanded'};
var autoprefixerOptions = {cascade: false};

// ... tasks ----
gulp.task('serve', ['sass', 'ejs', 'js'], function() {
    browserSync.init({server: "./"});
    gulp.watch('./ejs/**/*.ejs', ['ejs']);
    gulp.watch('./sass/**/*.scss', ['sass']);
    gulp.watch("./js/*.js", ['js']);
});

gulp.task('ejs', function() {
    return gulp.src("./ejs/index.ejs")
      .pipe(ejs(ejsOptions).on('error', gutil.log))
      .pipe(rename('index.html'))
      .pipe(gulpif(production, htmlmin(htmlminOptions)))
      .pipe(gulp.dest("./"))
      .pipe(browserSync.stream());
});

gulp.task('sass', function() {
    return gulp.src("./sass/**/*.scss")
      .pipe(sourcemaps.init())
      .pipe(sass(sassOptions).on('error', sass.logError))
      .pipe(gulpif(production, autoprefixer(autoprefixerOptions), cssnano()))
      .pipe(sourcemaps.write('./vendor/others/sourcemaps'))
      .pipe(gulp.dest("./dist"))
      .pipe(browserSync.stream());
});

gulp.task('js', function() {
    return gulp.src('./js/*.js')
      .pipe(concat('bundle.js'))
      .pipe(concat.header('\n $(document).ready(function(){ \n'))
      .pipe(concat.footer('\n }); // End document ready \n'))
      .pipe(gulpif(production, uglify()))
      .pipe(gulp.dest('./dist'))
      .pipe(browserSync.stream());
});

gulp.task('default', ['serve']);
