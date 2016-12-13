'use strict';

/**
 * This file/module contains all configuration for the build process.
 */
module.exports = function (grunt) {

  var pkg = grunt.file.readJSON('package.json');
  var moment = require('moment');

  return {
    pkg: pkg,
    /**
     * The `build_dir` folder is where our projects are compiled during
     * development and the `compile_dir` folder is where our app resides once it's
     * completely built.
     */
    temp_dir: '.tmp',
    build_dir: 'build',
    compile_dir: 'public',
    dist_dir: 'dist',

    /**
     * This is a collection of file patterns that refer to our app code (the
     * stuff in `src/`). These file paths are used in the configuration of
     * build tasks. `js` is all project javascript, less tests. `ctpl` contains
     * our reusable components' (`src/common`) template HTML files, while
     * `atpl` contains the same, but for our app's code. `html` is just our
     * main HTML file, `less` is our main stylesheet, and `unit` contains our
     * app's unit tests.
     */
    app_files: {
      js: ['app/**/*.js'],
      jsunit: ['app/**/*.spec.js'],

      page_specific_js: {}, //populated in grunt file
      //Entries for each 'page' are generated as exampled below.
      //    page_specific_js: {
      //      'index': {
      //        src: [
      //          'my-test.js',
      //          'my-other-test.js'
      //        ]
      //      }
      //    },

      // atpl: [ 'client/app/**/*.tpl.html' ],
      // ctpl: [ 'client/app/common/**/*.tpl.html' ],

      html: ['client/app/pages/*/*.html'],
      less: 'client/app/less/main.less',
      print_less: 'client/app/less/print.less'
    },

    pages: [
      {name: 'index'},
      {name: 'login'}
    ],

    /**
     * This is a collection of files used during testing only.
     */
    test_files: {
      js: [
        'client/bower_components/angular-mocks/angular-mocks.js',
        'client/bower_components/angular-resource/angular-resource.js'
      ]
    },

    asset_path: {
      root: 'client/assets/**',
      img: 'client/assets/images/**',
      fonts: 'client/assets/fonts/*',
      js: 'client/assets/js/**'
    },

    server_path: 'server/**',

    /**
     * This is the same as `app_files`, except it contains patterns that
     * reference vendor code (`vendor/`) that we need to place into the build
     * process somewhere. While the `app_files` property ensures all
     * standardized files are collected for compilation, it is the user's job
     * to ensure non-standardized (i.e. vendor-related) files are handled
     * appropriately in `vendor_files.js`.
     *
     * The `vendor_files.js` property holds files to be automatically
     * concatenated and minified with our project source files.
     *
     * The `vendor_files.css` property holds any CSS files to be automatically
     * included in our app.
     *
     * The `vendor_files.assets` property holds any assets to be copied along
     * with our app's assets. This structure is flattened, so it is not
     * recommended that you use wildcards.
     */
    vendor_files: {
      js: [
        'bower_components/jquery/dist/jquery.js', //Needed for date range picker
        'bower_components/angular/angular.js',
        'bower_components/angular-cookies/angular-cookies.js',
        'bower_components/angular-animate/angular-animate.js',
        'bower_components/angular-sanitize/angular-sanitize.js',
        'bower_components/angular-bootstrap/ui-bootstrap-tpls.js',
        'bower_components/angular-base64/angular-base64.min.js',
        'bower_components/angular-touch/angular-touch.js',
        'bower_components/angular-ui-router/release/angular-ui-router.js',
        'bower_components/angular-resource/angular-resource.js',
        'bower_components/lodash/dist/lodash.js',
        'bower_components/moment/moment.js',
        'bower_components/angular-base64/angular-base64.js',
        'bower_components/bootstrap-daterangepicker/daterangepicker.js',
        'bower_components/angular-ui-mask/src/mask.js',
        'bower_components/pdfjs-dist/web/compatibility.js',
        'bower_components/pdfjs-dist/build/pdf.js',
        'bower_components/pdfjs-dist/build/pdf.worker.js',
      ],
      css: [
        'bower_components/bootstrap-daterangepicker/daterangepicker.css',
      ],
      assets: [
        'assets/icons/icons.data.svg.css'
      ]
    },

    aws: {
      region: 'us-west-2',
      s3Bucket: pkg.name.replace(/\W/g, '').toLowerCase(),
      asgMinSize: 1,
      asgMaxSize: 1,
      keyName: 'us-west-2-slalom',
      instanceType: 't1.micro'
    }
  }


};
