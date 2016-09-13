var carriers = require('../data/carriers-res.js'),
  ResTemplate = require('../data/res-template.js'),
  _ = require('lodash'),
  responseUtil = require('../util/response-util.js'),
  repDetailsRes = require('../data/rep-details-res.js'),
  driversRes = require('../data/drivers-res.js'),
  portalUserRes = require('../data/portal-users-res.js');

var maxDelay = 2,
  minDelay = 1;

module.exports = {
  getCarriers: function (req, res) {
    var resTemplate = new ResTemplate();
    resTemplate.data = carriers;

    responseUtil.timeout(function () {
      res.json(resTemplate);
    }, minDelay, maxDelay);
  },
  getCarrierById: function (req, res) {
    var resTemplate = new ResTemplate();
    resTemplate.data = _.find(carriers, { carrierId: _.parseInt(req.params.carrierId) });

    responseUtil.timeout(function () {
      res.json(resTemplate);
    }, minDelay, maxDelay);
  },
  getRepByCarrierId: function (req, res) {
    var resTemplate = new ResTemplate();
    resTemplate.data = repDetailsRes;

    responseUtil.timeout(function () {
      res.json(resTemplate);
    }, minDelay, maxDelay);
  },
  getPortalUsers: function (req, res) {
    var resTemplate = new ResTemplate();
    resTemplate.data = _(portalUserRes).sampleSize(portalUserRes.length).slice(1, _.random(2, portalUserRes.length));

    responseUtil.timeout(function () {
      res.json(resTemplate);
    }, minDelay, maxDelay);
  },
  getDrivers: function (req, res) {
    var resTemplate = new ResTemplate();
    resTemplate.data = driversRes;

    responseUtil.timeout(function () {
      res.json(resTemplate);
    }, minDelay, maxDelay);
  },
  searchDrivers: function (req, res) {
    var resTemplate = new ResTemplate();
    resTemplate.data = driversRes.drivers;

    responseUtil.timeout(function () {
      res.json(resTemplate);
    }, minDelay, maxDelay);
  },
  getDriverCount: function (req, res) {
    var resTemplate = new ResTemplate();
    resTemplate.data = {
      userCount: _.random(100)
    };

    responseUtil.timeout(function () {
      res.json(resTemplate);
    }, minDelay, maxDelay);
  }
};