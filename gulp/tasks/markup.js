const gulp = require('gulp');
const config = require('../config').markup;
const browserSync = require('browser-sync');

gulp.task('markup', function () {
  return gulp.src(config.src)
    .pipe(gulp.dest(config.dest))
    .pipe(browserSync.reload({ stream: true }));
});
