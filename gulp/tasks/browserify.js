const config = require('../config').browserify;
const gulp = require('gulp');  // Base gulp package
const babelify = require('babelify'); // Used to convert ES6 & JSX to ES5
const browserify = require('browserify'); // Providers "require" support, CommonJS
const browserSync = require('browser-sync');
const notify = require('gulp-notify'); // Provides notification to both the console and Growel
const rename = require('gulp-rename'); // Rename sources
const sourcemaps = require('gulp-sourcemaps'); // Provide external sourcemap files
const gutil = require('gulp-util'); // Provides gulp utilities, including logging and beep
const chalk = require('chalk'); // Allows for coloring for logging
const source = require('vinyl-source-stream'); // Vinyl stream support
const buffer = require('vinyl-buffer'); // Vinyl stream support
const watchify = require('watchify'); // Watchify for source changes
const merge = require('utils-merge'); // Object merge tool
const duration = require('gulp-duration'); // Time aspects of your gulp process

// Error reporting function
function mapError(err) {
  if (err.fileName) {
    // Regular error
    gutil.log(chalk.red(err.name)
      + ': ' + chalk.yellow(err.fileName.replace(__dirname + config.src + '/javascript/', ''))
      + ': ' + 'Line ' + chalk.magenta(err.lineNumber)
      + ' & ' + 'Column ' + chalk.magenta(err.columnNumber || err.column)
      + ': ' + chalk.blue(err.description));
  } else {
    // Browserify error..
    gutil.log(chalk.red(err.name)
      + ': '
      + chalk.yellow(err.message));
  }
}

// Completes the final file outputs
function bundle(bundler) {
  const bundleTimer = duration('Javascript bundle time');

  bundler
    .bundle()
    .on('error', mapError) // Map error reporting
    .pipe(source(config.srcFile)) // Set source name
    .pipe(buffer()) // Convert to gulp pipeline
    .pipe(rename(config.outputFile)) // Rename the output file
    .pipe(sourcemaps.init({ loadMaps: true })) // Extract the inline sourcemaps
    .pipe(sourcemaps.write('./map')) // Set folder for sourcemaps to output to
    .pipe(gulp.dest(config.outputDir)) // Set the output folder
    .pipe(notify({
      message: 'Generated file: <%= file.relative %>',
    })) // Output the file being created
    .pipe(bundleTimer) // Output time timing of the file creation
    .pipe(browserSync.reload({
      stream: true,
    }));
}

// Gulp task for build
gulp.task('browserify', function () {
  const args = merge(watchify.args, { debug: true }); // Merge in default watchify args with browserify arguments

  const bundler = browserify(config.src + '/javascript/' + config.srcFile, args) // Browserify
    .plugin(watchify, { ignoreWatch: ['**/node_modules/**', '**/bower_components/**'] }) // Watchify to watch source file changes
    .transform(babelify, { presets: ['es2015','stage-1', 'react'], plugins: ['transform-decorators-legacy'] }); // Babel tranforms

  bundle(bundler); // Run the bundle the first time (required for Watchify to kick in)

  bundler.on('update', function () {
    bundle(bundler); // Re-run bundle on source updates
  });
});
