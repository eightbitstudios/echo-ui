var carriers = require('../data/carriers-res.js'),
  ResTemplate = require('../data/res-template.js'),
  _ = require('lodash'),
  repDetailsRes = require('../data/rep-details-res.js');

module.exports = {
  getCarriers: function (req, res) {
    var resTemplate = new ResTemplate();
    resTemplate.data = carriers;
    res.json(resTemplate);
  },
  getCarrierById: function (req, res) {
    var resTemplate = new ResTemplate();
    resTemplate.data = _.find(carriers, {id: _.parseInt(req.params.carrierId)});
    res.json(resTemplate);
  },
  getRepByCarrierId: function (req, res) {
    var resTemplate = new ResTemplate();
    resTemplate.data = repDetailsRes;
    res.json(resTemplate);
  }
};