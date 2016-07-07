var carrierDetailsRes = require('../data/carrier-details-res.js'),
repDetailsRes = require('../data/rep-details-res.js');

module.exports = {
  getCarrierById: function (req, res) {
    res.json(carrierDetailsRes);
  },
  getRepByCarrierId: function (req, res) {
    res.json(repDetailsRes);
  }
};