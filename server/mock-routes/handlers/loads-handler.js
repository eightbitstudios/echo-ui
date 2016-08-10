var responseUtil = require('../util/response-util.js'),
  loadsRes = require('../data/loads-res'),
  _ = require('lodash'),
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
    var resTemplate = new ResTemplate();
    if (req.query.offset === '21') {
      resTemplate.data.loads = _.slice(loadsRes.loads, 0, 2);
      resTemplate.data.totalLoadCount = loadsRes.totalLoadCount;
    } else {
      resTemplate.data = loadsRes;
    }

    responseUtil.timeout(function () {
      res.json(resTemplate);
    }, minDelay, maxDelay);
  }
};

