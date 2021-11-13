'use strict';

const 
  liveReloadBP = require("live-reload-bp"),
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
      js: {
        options: {}
      },
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

    watch: {
      options: {
        spawn: false 
        // It is recommended to disable `false` or not use 'grunt-contrib-watch' 
        // or perhaps even Grunt. Because it works very very slowly.
      },
      js: {
          files: ['src/**/*.js'],
          tasks: ['uglify', 'liveReload:js']
      },       
    },

  });


  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-uglify');


  // Register Task
  grunt.registerTask('start', ['liveReload:run', 'watch']);


  grunt.registerMultiTask('liveReload', '', function() {
      if (grunt.fail.errorcount > 0 || grunt.fail.warncount > 0) {
          return false;
      }

      if(this.target === 'run'){
          liveReload = new liveReloadBP(this.data.options);
          liveReload.run();
      }else{
          liveReload.reloadPage();
      }
  });

}
