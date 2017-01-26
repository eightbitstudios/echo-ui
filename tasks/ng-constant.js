module.exports = function(grunt) {

  var basePath = '.tmp/config/';

  grunt.config('ngconstant', {

    options: {
      name: 'echo.config.api',
      dest: '<%= build_dir %>/public/app/common/config/api/api.config.js',
      template: grunt.file.read('config/constant.tpl.ejs'),
      constants: function() {
        return {
          /**
           * These are default configurations. Any envrionment specific values should be
           * overridden int he appropriate tasks below, in their own configuration file.
           */
          apiConfig: grunt.file.readJSON(basePath + 'api.config.json'),
          keyConstants: grunt.file.readJSON(basePath + 'keys.constants.json')
        };
      }
    },

    mocks: {
      constants: function() {
        basePath = basePath + 'mocks/';
        grunt.log.write('Merging \'mocks\' config overrides from: ' + basePath + '\r\n');
        return {
          /**
           * Add overridden configuration values as needed per envrionment in their own folder.
           * Only properties that are being overridden need to be defined (not the entire config file)
           *
           * Example: 'apiEndpoints: grunt.file.readJSON('.tmp/config/local/app.constants.json')'
           **/
          apiConfig: grunt.file.readJSON(basePath + 'api.config.json')
        };
      }
    },

    qa: {
      constants: function() {
        basePath = basePath + 'qa/';
        grunt.log.write('Merging \'qa\' config overrides from: ' + basePath + '\r\n');
        return {
          /**
           * Add overridden configuration values as needed per envrionment in their own folder.
           * Only properties that are being overridden need to be defined (not the entire config file)
           *
           * Example: 'apiEndpoints: grunt.file.readJSON('.tmp/config/local/app.constants.json')'
           **/
          apiConfig: grunt.file.readJSON(basePath + 'api.config.json'),
          keyConstants: grunt.file.readJSON(basePath + 'keys.constants.json')
        };
      }
    },

    local: {
      constants: function() {
        basePath = basePath + 'local/';
        grunt.log.write('Merging \'local\' config overrides from: ' + basePath + '\r\n');
        return {
          /**
           * Add overridden configuration values as needed per envrionment in their own folder.
           * Only properties that are being overridden need to be defined (not the entire config file)
           *
           * Example: 'apiEndpoints: grunt.file.readJSON('.tmp/config/local/app.constants.json')'
           **/
          apiConfig: grunt.file.readJSON(basePath + 'api.config.json')
        };
      }
    },

    dev: {
      constants: function() {
        basePath = basePath + 'dev/';
        grunt.log.write('Merging \'dev\' config overrides from: ' + basePath + '\r\n');

        return {
          apiConfig: grunt.file.readJSON(basePath + 'api.config.json')
        };
      }
    },

    test: {
      constants: function() {
        basePath = basePath + 'test/';
        grunt.log.write('Merging \'test\' config overrides from: ' + basePath + '\r\n');
        return {
          /**
           * Add overridden configuration values as needed per envrionment in their own folder.
           * Only properties that are being overridden need to be defined (not the entire config file)
           *
           * Example: 'apiEndpoints: grunt.file.readJSON('.tmp/config/local/app.constants.json')'
           **/
          apiConfig: grunt.file.readJSON(basePath + 'api.config.json')
        };
      }
    },

    stage: {
      constants: function() {
        basePath = basePath + 'stage/';
        grunt.log.write('Merging \'stage\' config overrides from: ' + basePath + '\r\n');

        return {
          apiConfig: grunt.file.readJSON(basePath + 'api.config.json'),
          keyConstants: grunt.file.readJSON(basePath + 'keys.constants.json')
        };
      }
    },

    bat2: {
      constants: function() {
        basePath = basePath + 'bat2/';
        grunt.log.write('Merging \'bat2\' config overrides from: ' + basePath + '\r\n');
        return {
          /**
           * Add overridden configuration values as needed per envrionment in their own folder.
           * Only properties that are being overridden need to be defined (not the entire config file)
           *
           * Example: 'apiEndpoints: grunt.file.readJSON('.tmp/config/local/app.constants.json')'
           **/
          apiConfig: grunt.file.readJSON(basePath + 'api.config.json'),
          keyConstants: grunt.file.readJSON(basePath + 'keys.constants.json')
        };
      }
    },

    prod: {
      constants: function() {
        basePath = basePath + 'prod/';
        grunt.log.write('Merging \'prod\' config overrides from: ' + basePath + '\r\n');

        return {
          apiConfig: grunt.file.readJSON(basePath + 'api.config.json'),
          keyConstants: grunt.file.readJSON(basePath + 'keys.constants.json')
        };
      }
    }
  });

  grunt.loadNpmTasks('grunt-ng-constant');
};