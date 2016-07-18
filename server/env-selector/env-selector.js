var fs = require('fs'),
    _ = require('lodash'),
   envSortWeights = ['dev'];


module.exports = {

  /**
   * Sort environments by weight. Weight is environment process flow from development to production.
   *
   * @param  {string[]} envs - Abbreviated array of environment names.
   *
   * @returns {string[]}        Array of sorted environment names.
   */
  sortEnvironmentsByWeight: function(envs) {
    return _.sortBy(envs, function(env) {
      return envSortWeights.indexOf(env);
    });
  },

  /**
   * Creates an object whose properties are environment descriptor names grouped by environment.
   *
   * @param  {string[]} descriptorNames - Array of environment descriptor names. (e.g. 'dev_mixed_min')
   *
   * @returns {Object}                    Object contains descriptor names grouped by environment.
   */
  groupEnvDescriptorNamesByEnv: function(descriptorNames) {
    var descriptorNamesByEnv = { };

    _.forEach(descriptorNames, function(name) {
      var env = name.split('_')[0];
      descriptorNamesByEnv[env] = descriptorNamesByEnv[env] || [];
      descriptorNamesByEnv[env].push(name);
    });

    return descriptorNamesByEnv;
  },

  /**
   * Sorts menu options by environment then by descriptor.
   *
   * @param  {Object} taskConfigEnv - The taskConfig.env object defined in the grunt file.
   *
   * @returns {Object[]}              Array of sorted descriptors
   */
  sortMenuOptions: function(taskConfigEnv) {
    var options = [];
    var descriptorNames = _.keys(taskConfigEnv);
    var descriptorNamesByEnv = this.groupEnvDescriptorNamesByEnv(descriptorNames);
    var envs = _.keys(descriptorNamesByEnv);
    var sortedEnvs = this.sortEnvironmentsByWeight(envs);

    _.forEach(sortedEnvs, function(env) {
      descriptorNamesByEnv[env] = _.sortBy(descriptorNamesByEnv[env]);
      options = _.union(options, descriptorNamesByEnv[env]);
    });

    return options;
  },

  /**
   * Create an environment descriptor menu object that contains a question string and options.
   *
   * @param {Object} taskConfigEnv - The taskConfig.env object defined in the grunt file.
   *
   * @returns {Object}               Menu object.
   */
  createEnvironmentMenu: function(taskConfigEnv) {
    var selectionNumber = 1;
    var question = fs.readFileSync('./server/env-selector/env-selector-doc.txt');
    question += '\n';
    var options = this.sortMenuOptions(taskConfigEnv);

    _.forEach(options, function(option) {
      question += selectionNumber + '. ' + option + '\n';
      selectionNumber++;
    });

    question += '\nChoose environment (1 - ' + options.length + '): ';

    return {
      question: question,
      options: options
    };
  },

  /**
   * Outputs to the console a menu of the environment descriptors to serve.
   *
   * @param {Object}   taskConfigEnv - The taskConfig.env object defined in the grunt file.
   * @param {Function} done            An async method to be called when task is done.
   */
  menu: function(taskConfigEnv, callback, done) {
    var readline = require('readline2');
    var menu = this.createEnvironmentMenu(taskConfigEnv);
    var ui = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });

    ui.question(menu.question, function(answer) {
      ui.close();
      var isValidAnswer = !isNaN(answer) && answer <= menu.options.length;
      var selectedOption = (isValidAnswer) ? menu.options[answer - 1] : '';

      callback(selectedOption);
      done();
    });
  },
};
