var _ = require('lodash');
var apiConfig = require('../config/api.config.js');
module.exports = function(grunt) {

  grunt.config('copy', {
    //htmlPartials is only here because jade normally puts our partials in the correct directory
    //to be transformed by html2js. However, since we are grabbing html from a bower component we need to
    //specifically put that in the partials directory before html2js is ran.
    // ENABLE IF YOU NEED TO INTEGRATE HTML FILES FROM A BOWER COMPONENT
    htmlPartials: {
      files: [{
        cwd: 'client',
        src: 'app/**/*.html',
        dest: '<%= temp_dir %>/partials',
        expand: true
      }]
    },

    version: {
      options: {
        process: function(content, srcPath) {
          console.log('Processing %s', srcPath);
          return grunt.template.process(content);
        }
      },
      files: [{
        cwd: 'client',
        src: 'app/version.html',
        dest: '<%= build_dir %>/public/',
        expand: true,
        process: true
      }]
    },

    envVars: {
      options: {
        process: function(content) {
          if(grunt.config.get('apiConfig')){
            content = content.replace('url: null', _.template('url: \'${url}\'')({url: apiConfig[grunt.config.get('apiConfig')].url}));
          }
       
          return content;
        }
      },
      files: [{
        cwd: 'client',
        src: 'app/env-vars/env-vars.config.js',
        dest: '<%= build_dir %>/public/',
        expand: true,
        process: true
      }]
    },

    build: {
      files: [{
        src: '<%= app_files.html %>',
        dest: '<%= build_dir %>/public/',
        filter: 'isFile',
        flatten: true,
        expand: true
      }, {
        cwd: 'client',
        src: ['app/**/*.js', '!app/**/*.spec.js'],
        dest: '<%= build_dir %>/public/',
        expand: true
      }, {
        cwd: 'client',
        src: '<%= vendor_files.js %>',
        dest: '<%= build_dir %>/public/',
        expand: true
      }, {
        cwd: 'client',
        src: '<%= vendor_files.css %>',
        dest: '<%= build_dir %>/public/',
        expand: true
      }, {
        cwd: 'client',
        src: '<%= vendor_files.assets %>',
        dest: '<%= build_dir %>/public/',
        expand: true
      }, {
        cwd: 'client',
        src: [
          'assets/**/*',
          '!assets/icons/**/*' //don't copy. grunticon takes care of this directory.
        ],
        dest: '<%= build_dir %>/public/',
        expand: true
      }, {
        cwd: 'client',
        src: '.well-known/**/*',
        dest: '<%= build_dir %>/public/',
        expand: true
      }, {
        cwd: 'client/bower_components/bootstrap/fonts',
        src: ['glyphicons-halflings-regular.woff2', 'glyphicons-halflings-regular.woff', 'glyphicons-halflings-regular.ttf'],
        dest: '<%= build_dir %>/public/assets/fonts',
        expand: true
      }, {
        cwd: 'client',
        src: ['favicon.ico', 'robots.txt'],
        dest: '<%= build_dir %>/public/',
        expand: true
      }],

      options: {
        noProcess: ['**/*.{png,gif,jpg,ico,psd,ttf,otf,woff,svg}'], //since they are binary, can't even send them through
        process: function(content, srcPath) {
          // Run our page html files through grunts tempalating (currently used to auto inject script tags)
          if (grunt.file.isMatch('**/*.html', srcPath)) {
            console.log('Processing %s', srcPath);
            return grunt.template.process(content);
          }

          return content; //a js or css file, just letting it pass through
        }
      }

    },

    dist: {
      files: [{
        cwd: 'build/public',
        src: ['*.html', 'app/version.html'],
        dest: '<%= dist_dir %>/public',
        expand: true
      }, {
        cwd: 'build/public',
        src: 'assets/**',
        dest: '<%= dist_dir %>/public/',
        expand: true
      }, {
        cwd: 'build/public',
        src: 'bower_components/**',
        dest: '<%= dist_dir %>/public/',
        expand: true
      }, {
        cwd: 'build/public',
        src: ['robots.txt', 'favicon.ico'],
        dest: '<%= dist_dir %>/public/',
        expand: true
      }, {
        cwd: 'build/public',
        src: '.well-known/**',
        dest: '<%= dist_dir %>/public/',
        expand: true
      }]
    },

    // Copies the server and package over to the dist directory
    deploy: {
      files: [{
        src: '<%= server_path %>',
        dest: '<%= dist_dir %>/',
        filter: 'isFile',
        flatten: false,
        expand: true
      }, {
        src: 'package.json',
        dest: '<%= dist_dir %>/',
        filter: 'isFile',
        flatten: true,
        expand: true
      }]
    }
  });

  grunt.loadNpmTasks('grunt-contrib-copy');

};