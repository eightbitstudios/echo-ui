var repDetailsRes = require('../data/rep-details-res.js');

module.exports = {
  getRepById: function (req, res) {
    res.json(repDetailsRes);
  }
};