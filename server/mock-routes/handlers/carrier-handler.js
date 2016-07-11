var carriers = require('../data/carriers-res.js'),
  _ = require('lodash'),
  repDetailsRes = require('../data/rep-details-res.js');

module.exports = {
  getCarriers: function (req, res) {
    res.json(carriers);
  },
  getCarrierById: function (req, res) {
    res.json(_.find(carriers, {id: _.parseInt(req.params.carrierId)}));
  },
  getRepByCarrierId: function (req, res) {
    res.json(repDetailsRes);
  }
};