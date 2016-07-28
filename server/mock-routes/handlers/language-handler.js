var languageRes = require('../data/language-res.js'),
  responseUtil = require('../util/response-util.js'),
  _ = require('lodash'),
  ResTemplate = require('../data/res-template.js');

var maxDelay = 2,
  minDelay = 1;

module.exports = {
  getLanguage: function (req, res) {
    var resTemplate = new ResTemplate()
    resTemplate.data = languageRes;

    responseUtil.timeout(function () {
      res.json(resTemplate);
    }, minDelay, maxDelay);
  }
};