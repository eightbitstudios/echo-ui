module.exports = function (grunt) {

  // API endpoints by env
  var apiConfigLocal = require('./config/api-config-local.js')(grunt);
  var apiConfigDev = require('./config/api-config-dev.js')(grunt);
  var apiConfigDemo = require('./config/api-config-demo.js')(grunt);
  var apiConfigStage = require('./config/api-config-stage.js')(grunt);
  var apiConfigMocks = require('./config/api-config-mocks.js')(grunt);

  var userConfig = require('./build.config.js')(grunt);
  grunt.initConfig(userConfig);
  grunt.loadTasks('tasks');

  grunt.registerTask('serve', function (target) {
    if (target === 'dist') {
      grunt.log.write("LOADING CONFIGS FOR DIST");
      grunt.task.run([
        'dist',
        'copy:deploy',
        'install',
        'env:heroku',
        'express:dist',
        'keepalive'
      ]);
    } else if (target === 'demo') {
      grunt.log.write("LOADING CONFIGS FOR DEMO");
      grunt.config.merge(apiConfigDemo);

      grunt.task.run([
        'build',
        'env:local',
        'express:dev',
        'watch'
      ]);
    } else if (target === 'stage') {
      grunt.log.write("LOADING CONFIGS FOR STAGING");
      grunt.config.merge(apiConfigStage);

      grunt.task.run([
        'build',
        'env:local',
        'express:dev',
        'watch'
      ]);
    } else if (target === 'dev') {
      grunt.log.write("LOADING CONFIGS FOR DEV");
      grunt.config.merge(apiConfigDev);

      grunt.task.run([
        'build',
        'env:local',
        'express:dev',
        'watch'
      ]);
    } else if (target === 'local') {
      grunt.log.write("LOADING CONFIGS FOR LOCAL");
      grunt.config.merge(apiConfigLocal);

      grunt.task.run([
        'build',
        'env:local',
        'express:dev',
        'watch'
      ]);
    } else {
      grunt.log.write("LOADING CONFIGS FOR MOCKS");
      grunt.config.merge(apiConfigMocks);

      grunt.task.run([
        'build',
        'env:local',
        'express:dev',
        'watch'
      ]);
    }
  });

  grunt.registerTask('demo', function (target) {
    grunt.config.merge(apiConfigDemo);
    grunt.task.run([
      'dist',
      'copy:deploy',
      'install',
      'grunticon',
      'env:demo',
      'express:dist'
    ]);
  });

  grunt.registerTask('dev', function (target) {
    grunt.config.merge(apiConfigDev);
    grunt.task.run([
      'dist',
      'copy:deploy',
      'install',
      'grunticon',
      'env:dev',
      'express:dist'
    ]);
  });

  grunt.registerTask('stage', function (target) {
    grunt.config.merge(apiConfigStage);
    grunt.task.run([
      'dist',
      'copy:deploy',
      'install',
      'grunticon',
      'env:stage',
      'express:dist'
    ]);
  });

  grunt.registerTask('default', function (target) {
    grunt.task.run(['dist']);
  });

  // Creates a runnable non minified application in the root build directory
  grunt.registerTask('build', function () {
    grunt.task.run([
      'clean:build',
      'jshint',
      'less',
      'grunticon',
      'copy:htmlPartials',
      'html2js',
      'copy:build',
      'gitinfo',
      'copy:version',
      'copy:endpoints',
      'injector',
      'karma:unit'
    ]);
  });

  // Does a build then minifies and copies all front end code over to the root dist directory
  // To get a fully running app in this directory, you'll need to copy the server and package.json
  // over then do an npm install. (This can all be done by calling 'grunt dist copy:deploy')
  grunt.registerTask('dist', function () {
    grunt.task.run([
      'clean',
      'build',
      'useminPrepare',
      'ngAnnotate',
      'concat:generated',
      'uglify:generated',
      'cssmin::generated',
      'copy:dist',
      'filerev',
      'usemin'
    ]);
  });

  grunt.registerTask('test', function () {
    grunt.task.run([
      'build',
      'karma:unit'
    ]);
  });

  grunt.registerTask('prepareDeploy', function () {
    grunt.task.run([
      'dist',
      'copy:deploy',
      'compress'
    ]);
  });

  grunt.registerTask('deploy', function (target) {
    if (!target) {
      console.error(); // TODO: Populate this
      grunt.fail.fatal('Target must be specified for deployment.  Valid targets are heroku-dev and heroku-qa');
      return;
    }
    grunt.task.run([
      'prepareDeploy',
      'buildcontrol:' + target
    ]);
  });


  grunt.registerTask('install', 'install server dependencies', function () {
    var exec = require('child_process').exec;
    var async = this.async();
    exec('npm install --production', { cwd: './dist' }, function (err, stdout, stderr) {
      console.log(stdout);
      console.log(stderr);
      async();
    });
  });



};
