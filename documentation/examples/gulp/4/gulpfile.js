
const 
  gulp = require('gulp'),
  liveReloadBP = require("live-reload-bp"),
  plumber = require('gulp-plumber'),
  gulpSass = require('gulp-sass')(require('sass')),
  postcss = require('gulp-postcss'),
  cssnano = require('cssnano'),
  minifyJS = require('gulp-uglify-es').default,
  htmlmin = require('gulp-htmlmin'),
  webServer = require('./web-server'),
  changedFile = require('./live-reload.detect-changed-file');

const 
  cssWatch = 'src/scss/**/*.scss',
  cssSrc = ['src/scss/**/*.scss'],
  cssDest = 'dest/css';

const 
  htmlWatch = 'src/*.html',
  htmlSrc = ['src/*.html'],
  htmlDest = 'dest';

const 
  jsWatch = 'src/js/*.js',
  jsSrc = ['src/js/*.js'],
  jsDest = 'dest/js';

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


function html() {
  return gulp.src(htmlSrc)    
  .pipe(plumber())
  .pipe(htmlmin())
  .pipe(gulp.dest(htmlDest));
}


function js(){
  return gulp.src(jsSrc)
  .pipe(minifyJS()) 
  .pipe(gulp.dest(jsDest));
}


function reloadCss(cb){
  liveReload.reloadPage({
    action: 'page_reload',
    partial_reload: {
      tag: 'link',
      reloadPageIfResNotExists: true,    
      href: changedFile.path()
    }      
  });

  cb();
}


function reloadHtml(cb){
  liveReload.reloadPage({
    action: 'page_reload',
    partial_reload: {
      tag: 'html',    
      html: {
        force_load_images: false // Usually, images are taken from the browser cache when the HTML is partially reloaded.
      }
    }      
  });

  cb();
}


function reloadJs(cb){
  liveReload.reloadPage({
    action: 'page_reload',
    partial_reload: {
      tag: 'script',    
      src: changedFile.path(),
      js: {
        //clear_obsolete_tags: ['style'],
        //resetHTML: false,
        use_method_1: {
          send_event_onload: true
        }        
      }
    }      
  });

  cb();
}


function watch(){
  liveReload.run();
  webServer();

  gulp.watch(cssWatch, gulp.series(css, reloadCss));
  gulp.watch(htmlWatch, gulp.series(html, reloadHtml));
  gulp.watch(jsWatch, gulp.series(js, reloadJs));
}


exports.css = css;
exports.html = html;
exports.js = js;
exports.watch = watch;
exports.reloadCss = reloadCss;
exports.reloadJs = reloadJs;
exports.reloadHtml = reloadHtml;
exports.start = gulp.series(css, html, js, watch);
