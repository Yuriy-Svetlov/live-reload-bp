
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
  .pipe(plumber())        
  .pipe(gulpSass().on('error', gulpSass.logError))   
  .pipe(postcss([
      cssnano({zindex: false, reduceIdents: false})
  ]))     
  .pipe(gulp.dest(cssDest));
}


function reloadPage(cb){
  liveReload.reloadPage();

  cb();
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
