module.exports = function (grunt) {

  var userConfig = require('./build.config.js')(grunt);
  var envAppSelectorUi = require('./server/env-selector/env-selector');
  grunt.initConfig(userConfig);
  grunt.loadTasks('tasks');

  var env = grunt.config('env');
  /**
   * Serves the application based on the configuration derived from envDescriptorName.
   *
   * @param {string} envDescriptorName The environment descriptor describing the configuration from which to serve.
   */
  function serve(envDescriptorName) {
    console.log('RUNNING SERVE WITH: ' + envDescriptorName);

    grunt.task.run([
      'env:' + envDescriptorName,
      '_configAndServe'
    ]);
  }

  /**
   * Creates a list of grunt task to run based on minify setting
   */
  grunt.registerTask('_configAndServe', function () {
    var envConfig = require('./server/config/');
    var tasks = [];

    if (envConfig.buildSettings.minifyFiles) {
      grunt.config('express.dist.options.port', envConfig.server.httpPort);
      tasks.push('dist', 'copy:deploy', 'install', 'express:dist', 'keepalive');
    }
    else {
      grunt.config('express.dev.options.port', envConfig.server.httpPort);
      tasks.push('build', 'express:dev', 'watch');
    }

    grunt.task.run(tasks);
  });

  /**
   * Serves application
   */
  grunt.registerTask('serve', function (envDescriptorName) {

    if (envDescriptorName) {
        serve(envDescriptorName);
    } else {
      envAppSelectorUi.menu(env, function (selectedDescriptorName) {
        if (selectedDescriptorName) {
          serve(selectedDescriptorName);
        }
        else {
          console.log('\nNo environment configuration selected.');
        }
      }, this.async());
    }
  });

  grunt.registerTask('default', function (target) {
    grunt.task.run(['dist']);
  });

  // Creates a runnable non minified application in the root build directory
  grunt.registerTask('build', function () {
    grunt.task.run([
      'clean:build',
      'grunticon',
      'jshint',
      'less',
      'copy:htmlPartials',
      'html2js',
      'copy:build',
      'gitinfo',
      'copy:version',
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

  /**
   * Task for running frontend unit test
   */
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

  /**
   * Installs npm dependencies
   */
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
