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
  getLoadsBySearchText: function (req, res) {
    var resTemplate = new ResTemplate();
    var searchText = req.params.searchText;
    resTemplate.data = _.filter(loadsRes, function (item) {
      return item.loadNumber.toString().indexOf(searchText) > -1;
    });

    responseUtil.timeout(function () {
      res.json(resTemplate);
    }, minDelay, maxDelay);
  },
  getLoadsByCarrierId: function (req, res) {
    var resTemplate = new ResTemplate();
    if (req.query.offset === '21') {
      resTemplate.data = _.slice(loadsRes, 0, 2);
    } else {
      resTemplate.data = loadsRes;
    }

    responseUtil.timeout(function () {
      res.json(resTemplate);
    }, minDelay, maxDelay);
  }
};


