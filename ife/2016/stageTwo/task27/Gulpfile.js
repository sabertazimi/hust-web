const path = require('node:path')
const gulp = require('gulp')
const autoprefixer = require('gulp-autoprefixer')
const concat = require('gulp-concat')
const cleanCSS = require('gulp-clean-css')
const imagemin = require('gulp-imagemin')
const rename = require('gulp-rename')
const sourcemaps = require('gulp-sourcemaps')
const uglify = require('gulp-uglify')

function vendor() {
  return gulp
    .src(path.join(__dirname, 'node_modules/jquery/dist/jquery.min.js'))
    .pipe(gulp.dest('./dist/js/'))
}

function html() {
  const htmlSrc = './src/*.html'
  const htmlDst = './dist/'
  return gulp.src(htmlSrc).pipe(gulp.dest(htmlDst))
}

function css() {
  return gulp
    .src('src/css/*.css')
    .pipe(sourcemaps.init())
    .pipe(autoprefixer())
    .pipe(rename({ suffix: '.min' }))
    .pipe(cleanCSS())
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('dist/css/'))
}

function js() {
  return gulp
    .src([
      'src/js/logger.js',
      'src/js/mediator.js',
      'src/js/spaceship.js',
      'src/js/commander.js',
    ])
    .pipe(concat('main.js'))
    .pipe(sourcemaps.init())
    .pipe(rename({ suffix: '.min' }))
    .pipe(uglify())
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('dist/js/'))
}

function fonts() {
  return gulp.src('src/fonts/**/*').pipe(gulp.dest('dist/fonts/'))
}

function images() {
  return gulp
    .src('src/images/**/*')
    .pipe(
      imagemin({
        progressive: true,
      }),
    )
    .pipe(gulp.dest('dist/images'))
}

exports.build = gulp.parallel(vendor, html, css, js)

exports.default = function () {
  gulp.watch('src/**/*.html', html)
  gulp.watch('src/css/**/*.css', css)
  gulp.watch('src/js/**/*.js', js)
  gulp.watch('src/fonts/**/*', fonts)
  gulp.watch('src/images/**/*', images)
}
