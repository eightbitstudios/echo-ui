var responseUtil = require('../util/response-util.js'),
  loadsRes = require('../data/loads-res'),
  ResTemplate = require('../data/res-template.js');

var maxDelay = 2,
  minDelay = 1;

module.exports = {
  getLoadCount: function (req, res) {
    var resTemplate = new ResTemplate();

    resTemplate.data = {
      active: 12,
      unbilled: 13,
      upcoming: 4
    };

    responseUtil.timeout(function () {
      res.json(resTemplate);
    }, minDelay, maxDelay);
  },
  getLoadsByCarrierId: function (req, res) {
    var resTemplate = new ResTemplate()
    resTemplate.data = loadsRes;
    responseUtil.timeout(function () {
      res.json(resTemplate);
    }, minDelay, maxDelay);
  }
};