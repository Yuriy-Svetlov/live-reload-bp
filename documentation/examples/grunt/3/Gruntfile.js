'use strict';

const
  liveReloadBP = require("live-reload-bp"),
  liveAlertFormatterStylelint = require("live-alert-bp-formatter-stylelint"),
  liveAlertFormatterSass = require("live-alert-bp-formatter-sass"),
  liveAlertFormatterJShint = require("live-alert-bp-formatter-jshint"),
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

      css: {
        options: {
          action: 'page_reload',
          partial_reload: { 
              tag: 'link',
              href: '/css/main.css'
          }          
        }
      },

      js: {
        options: {
          action: 'page_reload',
          partial_reload: { 
            tag: 'script',
            src: '/js/index.js',
            //execute_before: before,
            js: {
              //clear_obsolete_tags: ['style'],
              //resetHTML: true,
              use_method_1: {
                send_event_onload: false
              }        
            }
          }          
        }
      },

      html: {
        options: {
          action: 'page_reload',
          partial_reload: { 
            tag: 'html',
            html: {
              force_load_images: false
            }
          }          
        }
      }
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
          /*
            # Formaters
            https://github.com/Yuriy-Svetlov/live-alert-bp#formaters
          */
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

    jshint: {
        options: {
          jshintrc: true,
          reporter: require('grunt-jshint-event-reporter')
        },
        all: ['src/js/**/*.js']
    },

    uglify: {
        build777: {
          files: [{
            expand: true,
            cwd: 'src',
            src: 'js/**/*.js',
            dest: 'dest'
          }]
        }
    },

    htmlmin: {
      options: {
        removeComments: true,
        collapseWhitespace: true
      },
      index: {
        files: {
          'dest/index.html': 'src/index.html'
        }
      }
    },

    watch: {
      options: {
        spawn: false 
        // It is recommended to disable `false` or not use 'grunt-contrib-watch' 
        // or perhaps even Grunt. Because it works very very slowly.
      },
      css: {
          files: ['src/scss/**/*.scss'],
          tasks: ['stylelint', 'sass:all', 'postcss:css', 'liveReload:css']
      },  
      js: {
          files: ['src/**/*.js'],
          tasks: ['jshint:all', 'uglify', 'liveReload:js']
      },
      html: {
          files: ['src/**/*.html'],
          tasks: ['htmlmin:index', 'liveReload:html']
      },
    },

  });

  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-stylelint');
  grunt.loadNpmTasks('grunt-sass-scss');
  grunt.loadNpmTasks('@lodder/grunt-postcss');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-htmlmin');

  // Register Task
  grunt.registerTask('start', ['liveReload:run', 'watch']);


  grunt.registerMultiTask('liveReload', '', function() {
    if(this.target === 'run'){
        liveReload = new liveReloadBP(this.data.options);
        liveReload.run();
    }else{
      //if(grunt.fail.errorcount === 0 && grunt.fail.warncount === 0) {
        console.log(this.data.options);
        liveReload.resetError();
        liveReload.reloadPage(this.data.options);
      //}
    }

    //grunt.fail.errorcount = 0;
    //grunt.fail.warncount = 0;
  });


  function formatterStylelint(results, returnValue) {
    /*
      # Formaters
      https://github.com/Yuriy-Svetlov/live-alert-bp#formaters
    */
    liveReload.liveAlert(
      liveAlertFormatterStylelint(results)
    ); 

    return results;
  }


  grunt.event.on('jshint-error', function(err){
    /*
      # Formaters
      https://github.com/Yuriy-Svetlov/live-alert-bp#formaters
    */
    liveReload.liveAlert(
      liveAlertFormatterJShint(err)
    );
  });

}
