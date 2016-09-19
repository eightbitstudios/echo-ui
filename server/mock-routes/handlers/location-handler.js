var responseUtil = require('../util/response-util.js'),
  locationRes = require('../data/location-res'),
  _ = require('lodash'),
  ResTemplate = require('../data/res-template.js');

var maxDelay = 2,
  minDelay = 1;

module.exports = {
  getLocation: function (req, res) {
    var resTemplate = new ResTemplate();

    resTemplate.data = locationRes;

    responseUtil.timeout(function () {
      res.json(resTemplate);
    }, minDelay, maxDelay);
  }
};


