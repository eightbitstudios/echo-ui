var _ = require('lodash');


module.exports = {
  /**
   * @description Utility method for randomizing a response to mock what a 'real' response might look like
   * @param {Function} callback     Callback method to be ran after the allocated delay
   * @param {number} minDelay       Min amount of time for the response to take
   * @param {number} maxDelay       Max amount of time for the response to take
   */
  timeout: function (callback, minDelay, maxDelay) {
    setTimeout(function () {
      callback.call();
    }, parseInt(((Math.random() * (maxDelay - minDelay)) + minDelay) * 1000));
  }
};
