var responseUtil = require('../util/response-util.js'),
  loadsRes = require('../data/loads-res'),
  loadDetailsRes = require('../data/load-details-res'),
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
  getDriverStatus: function (req, res) {
    var resTemplate = new ResTemplate();
    var searchText = req.params.searchText;
    resTemplate.data = false;

    responseUtil.timeout(function () {
      res.json(resTemplate);
    }, minDelay, maxDelay);
  },
  getLoadsBySearchText: function (req, res) {
    var resTemplate = new ResTemplate();
    var searchText = req.params.searchText;
    resTemplate.data.loads = _.filter(loadsRes.loads, function (item) {
      return item.loadNumber.toString().indexOf(searchText) > -1;
    });

    resTemplate.data.totalLoadCount = loadsRes.totalLoadCount;

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
  },
  getLoadDetails: function (req, res) {
    var resTemplate = new ResTemplate();
    resTemplate.data = loadDetailsRes;

    responseUtil.timeout(function () {
      res.json(resTemplate);
    }, minDelay, maxDelay);
  }
};

