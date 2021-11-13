'use strict';

const
  liveReloadBP = require("live-reload-bp"),
  sass = require('sass'),
  liveAlertFormatterStylelint = require("live-alert-bp-formatter-stylelint"),
  liveAlertFormatterSass = require("live-alert-bp-formatter-sass"),
  webServer = require('./web-server');

var
  liveReload;

webServer();

module.exports = function(grunt) {

  grunt.initConfig({
  
    liveReload: {
      run: {
        options: {
          host: '127.0.0.1',
          port: '8080'
        }
      },    
      all: {
        options: {}
      },
    },

    stylelint: {
      options: {
        customSyntax: 'postcss-scss',
        formatter: formatterStylelint,
        failOnError: true,
        fix: false
      },
      src: ['src/scss/**/*.scss']
    },

    sass: {
      options: {
        onError: function(error){
          liveReload.liveAlert(
            liveAlertFormatterSass(error)
          );
        },
        sass: {
          sourceMap: true
        }
      },
      all: {
        files: [{
          expand: true,
          cwd: 'src/scss/',
          src: ['**/*.scss'],
          dest: 'src/css',
          ext: '.css'
        }]
      }    
    },

    postcss: {
      css: {
        options: {
          map: false,
          processors: [
            require('autoprefixer')(),
            require('cssnano')() // minify the result
          ]
        },          
        files: [{
          expand: true,
          cwd: 'src',
          src: 'css/**/*.css',
          dest: 'dest'
        }]
      }
    },

    watch: {
      options: {
        spawn: false 
        // It is recommended to disable `false` or not use 'grunt-contrib-watch' 
        // or perhaps even Grunt. Because it works very very slowly.
      },
      js: {
          files: ['src/scss/**/*.scss'],
          tasks: ['stylelint', 'sass:all', 'postcss:css', 'liveReload:all']
      },       
    },

  });

  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-stylelint');
  grunt.loadNpmTasks('grunt-sass-scss');
  grunt.loadNpmTasks('@lodder/grunt-postcss');

  // Register Task
  grunt.registerTask('start', ['liveReload:run', 'watch']);


  grunt.registerMultiTask('liveReload', '', function() {
    if(this.target === 'run'){
        liveReload = new liveReloadBP(this.data.options);
        liveReload.run();
    }else{
      //if(grunt.fail.errorcount === 0 && grunt.fail.warncount === 0) {
        liveReload.resetError();
        liveReload.reloadPage();
      //}
    }

    //grunt.fail.errorcount = 0;
    //grunt.fail.warncount = 0;
  });


  function formatterStylelint(results, returnValue) {
    liveReload.liveAlert(
      liveAlertFormatterStylelint(results)
    ); 

    return results;
  }

}
