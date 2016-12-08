var ResTemplate = require('../data/res-template.js'),
  _ = require('lodash'),
  documentsRes = require('../data/documents-res.js'),
  responseUtil = require('../util/response-util.js');

var maxDelay = 2,
  minDelay = 1;

module.exports = {
  createDocuments: function(req, res) {
    responseUtil.timeout(function() {
      res.json(new ResTemplate());
    }, minDelay, maxDelay);
  },
  fetchDocuments: function(req, res) {
    var resTemplate = new ResTemplate();
    resTemplate.data = documentsRes;
    responseUtil.timeout(function() {
      res.json(resTemplate);
    }, minDelay, maxDelay);
  }
};