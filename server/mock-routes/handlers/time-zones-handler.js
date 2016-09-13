var responseUtil = require('../util/response-util.js'),
  timeZonesRes = require('../data/time-zones-res'),
  _ = require('lodash'),
  ResTemplate = require('../data/res-template.js');

var maxDelay = 2,
  minDelay = 1;

module.exports = {
  getTimeZones: function (req, res) {
    var resTemplate = new ResTemplate();

    resTemplate.data = timeZonesRes;

    responseUtil.timeout(function () {
      res.json(resTemplate);
    }, minDelay, maxDelay);
  }
};


