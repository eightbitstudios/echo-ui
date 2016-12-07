var ResTemplate = require('../data/res-template.js'),
  _ = require('lodash'),
  responseUtil = require('../util/response-util.js');

var maxDelay = 2,
  minDelay = 1;

module.exports = {
  createDocuments: function(req, res) {
    responseUtil.timeout(function() {
      console.log('done');
      res.json(new ResTemplate());
    }, minDelay, maxDelay);
  }
};