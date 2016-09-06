var driversRes = require('../data/drivers-res.js'),
  responseUtil = require('../util/response-util.js'),
  _ = require('lodash'),
  ResTemplate = require('../data/res-template.js');

var maxDelay = 2,
  minDelay = 1;

module.exports = {
  getDriverById: function (req, res) {
    var resTemplate = new ResTemplate()
    resTemplate.data = _.find(driversRes.drivers, { id: _.parseInt(req.params.driverId) });

    responseUtil.timeout(function () {
      res.json(resTemplate);
    }, minDelay, maxDelay);
  },
  deactivateDriverById: function (req, res) {
    var resTemplate = new ResTemplate();

    responseUtil.timeout(function () {
      res.json(resTemplate);
    }, minDelay, maxDelay);
  },
  updateDriverById: function (req, res) {
    var resTemplate = new ResTemplate();

    if (req.body.email === 'error@gmail.com') {
      resTemplate.status.message = 'There was an error. Please try again.';
      resTemplate.status.error = true;
    }

    responseUtil.timeout(function () {
      if (resTemplate.status.error) {
        res.status(400).json(resTemplate);
      } else {
        resTemplate.data = req.body;
        res.json(resTemplate);
      }
    }, minDelay, maxDelay);

  },
  insertDriver: function (req, res) {
    var resTemplate = new ResTemplate();

    if (req.body.email === 'error@gmail.com') {
      resTemplate.status.message = 'There was an error. Please try again.';
      resTemplate.status.error = true;
    }

    resTemplate.data = req.body;
    resTemplate.data.id = 1;
    resTemplate.data.phone = req.body.phoneNumber;

    responseUtil.timeout(function () {
      if (resTemplate.status.error) {
        res.status(400).json(resTemplate);
      } else {
        resTemplate.data = req.body;
        resTemplate.data.id = 99;
        res.json(resTemplate);
      }
    }, minDelay, maxDelay);
  }
};