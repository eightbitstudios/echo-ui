var carrierDetailsRes = require('../data/carrier-details-res.js'),
  carriers = require('../data/carriers-res.js'),
  repDetailsRes = require('../data/rep-details-res.js');

module.exports = {
  getCarriers: function (req, res) {
    res.json(carriers);
  },
  getCarrierById: function (req, res) {
    res.json(carrierDetailsRes);
  },
  getRepByCarrierId: function (req, res) {
    res.json(repDetailsRes);
  }
};