var carrierDetailsRes = require('../data/carrier-details-res.js');

module.exports = {
  getCarrierById: function (req, res) {
    res.json(carrierDetailsRes);
  }
};