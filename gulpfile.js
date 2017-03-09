const package = require('./package.json');

const gulp = require('gulp');
const del = require('del');
const beautify = require('gulp-beautify');
const eslint = require('gulp-eslint');
const qunit = require('gulp-qunit');
const uglify = require('gulp-uglify');
const runSequence = require('run-sequence');

const path = {
  'js': './src/*.js',
  'media': './src/**/*.{png,jpg,svg}',
  'pages': './src/**/*.html',
  'build': './build',
};


/**
 * Move static pages and images
 * to the build folder
 */
gulp.task('movestatic', function() {
  gulp.src(path.media)
    .pipe(gulp.dest(path.build));
  gulp.src(path.pages)
    .pipe(gulp.dest(path.build));
});

/**
 * Create a minified version of the JS files
 * in the build folder.
 */
gulp.task('ugly', function() {
  return gulp.src(path.js)
    .pipe(uglify())
    .pipe(gulp.dest(path.build));
});

/**
 * Run unit tests on the JS
 */
gulp.task('test', function() {
  return gulp.src('./test/index.html')
    .pipe(qunit());
});


/**
 * Lint all the code using the configuration
 * specified in the package.json file
 */
gulp.task('lint', function() {
  return gulp.src(path.js)
    .pipe(eslint(package.eslintConfig))
    .pipe(eslint.format())
    .pipe(eslint.failAfterError());
});


/**
 * Format all JS in the source folder
 */
gulp.task('beautify', function() {
  gulp.src(path.js)
    .pipe(beautify(package.beautify))
    .pipe(gulp.dest('./src/'));
});


/**
 * remove all previously created files
 * for a completely clean build
 */
gulp.task('clean', function() {
  return del(path.build);
});


gulp.task(
  'default',
  function(callback) {
    runSequence(
      'clean',
      'beautify',
      'lint',
      'test',
      'ugly',
      'movestatic',
      callback);
  }
);
