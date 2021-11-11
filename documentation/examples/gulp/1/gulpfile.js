
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


function css() {
  return gulp.src(cssSrc)
  .pipe(plumber({errorHandler: onError}))        
  .pipe(gulpSass().on('error', gulpSass.logError))   
  .pipe(postcss([
      cssnano({zindex: false, reduceIdents: false})
  ]))     
  .pipe(gulp.dest(cssDest));
}


function onError(err){
  /* Here can be used: 
    https://github.com/Yuriy-Svetlov/live-alert-bp

    In the Pro version of «Live Reload Browser Page - Pro», all plugins are already built in.
  */

  liveReload.setError();  // This usage is optional. You can not use this, if you want your page to reload anyway.

  this.emit('end');
}


function reloadPage(ok){
  if(liveReload.hasError() === false){ // This usage is optional. You can not use this, if you want your page to reload anyway.
    liveReload.reloadPage();
  }

  liveReload.resetError();

  ok();
}


function watch(){
  liveReload.run();
  webServer();

  gulp.watch(cssWatch, gulp.series(css, reloadPage));
}


exports.css = css;
exports.watch = watch;
exports.reloadPage = reloadPage;
exports.start = gulp.series(css, watch);
