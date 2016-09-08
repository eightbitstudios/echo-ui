var responseUtil = require('../util/response-util.js'),
  loadsRes = require('../data/loads-res'),
  reportEmptyRes = require('../data/report-empty-res'),
  loadUpdateOptionsRes = require('../data/load-update-options-res'),
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
  getReportEmptyModalAction: function (req, res) {
    var resTemplate = new ResTemplate();
    resTemplate.data = reportEmptyRes;
    responseUtil.timeout(function () {
      res.json(resTemplate);
    }, minDelay, maxDelay);
  },
  createModalAction: function (req, res) {
    var resTemplate = new ResTemplate();

    responseUtil.timeout(function () {
      res.json(resTemplate);
    }, minDelay, maxDelay);
  },
  getLoadsByCarrierId: function (req, res) {
    var resTemplate = new ResTemplate();

    resTemplate.data.loads = _.slice(loadsRes.loads, _.parseInt(req.query.offset), _.parseInt(req.query.offset) + _.parseInt(req.query.limit));
    resTemplate.data.totalLoadCount = loadsRes.loads.length;

    responseUtil.timeout(function () {
      res.json(resTemplate);
    }, minDelay, maxDelay);
  },
  getLoadDetails: function (req, res) {
    var resTemplate = new ResTemplate();
    resTemplate.data = loadsRes.loads[0];

    responseUtil.timeout(function () {
      res.json(resTemplate);
    }, minDelay, maxDelay);
  },
  getLoadUpdateOptions: function (req, res) {
    var resTemplate = new ResTemplate();
    resTemplate.data = loadUpdateOptionsRes;

    responseUtil.timeout(function () {
      res.json(resTemplate);
    }, minDelay, maxDelay);
  }
};


