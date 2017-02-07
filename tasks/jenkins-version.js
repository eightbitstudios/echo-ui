module.exports = function(grunt) {
  var version = grunt.file.readJSON('version.json');
  
  grunt.config('version', {
    buildVersion: version.buildVersion
  });
};