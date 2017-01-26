// Karma configuration
// Generated on Tue Dec 17 2013 08:50:18 GMT-0700 (MST)
'use strict';
module.exports = function (config) {
  config.set({

    // base path, that will be used to resolve files and exclude
    basePath: '',


    // frameworks to use
    frameworks: ['jasmine'],


    // list of files / patterns to load in the browser
    files: [
      'client/bower_components/jquery/dist/jquery.min.js',
      'client/bower_components/angular/angular.js',
      'client/bower_components/angular-cookies/angular-cookies.js',
      'client/bower_components/angular-animate/angular-animate.js',
      'client/bower_components/angular-bootstrap/ui-bootstrap-tpls.js',
      'client/bower_components/angular-ui-router/release/angular-ui-router.js',
      'client/bower_components/angular-base64/angular-base64.min.js',
      'client/bower_components/angular-mocks/angular-mocks.js',
      'client/bower_components/lodash/dist/lodash.js',
      'client/bower_components/bootstrap/js/dropdown.js',
      'client/bower_components/moment/moment.js',
      'client/app/app.js',
      'client/app/**/*.js',
      'build/public/app/templates-*.js',
      'build/public/app/common/config/api/api.config.js',
      'client/app/**/*.spec.js'
    ],

    // list of files to exclude
    exclude: [
      'client/bower_components/angular-scenario/angular-scenario.js'
    ],

    reporters: ['dots', 'coverage', 'junit'],

    preprocessors: {
      'client/app/**/*.js': 'coverage'
    },

    coverageReporter: {
      reporters: [
        { type: 'html' },
        { type: 'text-summary' },
        { type: 'text', dir: 'coverage/', file: 'coverage.txt' },
        { type: 'json', dir: 'coverage/' }
      ]
    },

    junitReporter: {
      outputDir: 'coverage/',
      useBrowserName: false,
      outputFile: 'test-results.xml'
    },

    // web server port
    port: 9876,

    // enable / disable colors in the output (reporters and logs)
    colors: true,

    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,


    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,

    // Start these browsers, currently available:
    // - Chrome
    // - ChromeCanary
    // - Firefox
    // - Opera (has to be installed with `npm install karma-opera-launcher`)
    // - Safari (only Mac; has to be installed with `npm install karma-safari-launcher`)
    // - PhantomJS
    // - IE (only Windows; has to be installed with `npm install karma-ie-launcher`)
    browsers: ['PhantomJS'],


    // If browser does not capture in given timeout [ms], kill it
    captureTimeout: 60000,


    // Continuous Integration mode
    // if true, it capture browsers, run tests and exit
    singleRun: false
  });
};
