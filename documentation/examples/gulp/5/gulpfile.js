
const 
  gulp = require('gulp'),
  liveReloadBP = require("live-reload-bp"),
  plumber = require('gulp-plumber'),
  gulpSass = require('gulp-sass'),
  postcss = require('gulp-postcss'),
  cssnano = require('cssnano'),
  webServer = require('./web-server');

const 
  cssWatch = 'src/scss/*.scss',
  cssSrc = ['src/scss/*.scss'],
  cssDest = 'dest/css';

const 
  liveReload = new liveReloadBP({
    host: '127.0.0.1', 
    port: '8080'
  });


gulp.task('css', function() {
  return gulp.src(cssSrc)
  .pipe(plumber({errorHandler: onError}))        
  .pipe(gulpSass().on('error', gulpSass.logError))   
  .pipe(postcss([
      cssnano({zindex: false, reduceIdents: false})
  ]))     
  .pipe(gulp.dest(cssDest));
});


function onError(err){
  liveReload.setError();

  this.emit('end');
}


gulp.task('reloadPage', function(ok) {

  if(liveReload.hasError() === false){
    liveReload.reloadPage();
  }

  liveReload.resetError();

  ok();
});


gulp.task('watch', function () {
  liveReload.run();
  webServer();

  gulp.watch(cssWatch, gulp.series('css', 'reloadPage'));
});


gulp.task('start', gulp.series('css', 'watch'));
