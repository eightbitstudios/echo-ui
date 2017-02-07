module.exports = function(grunt) {
  var version = {};
  if (grunt.file.exists('version.json')) {
    version = grunt.file.readJSON('version.json');
  }
  grunt.config('version', {
    buildVersion: version.buildVersion
  });
};