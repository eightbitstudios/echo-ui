var userRes = require('../data/user-res.js');

module.exports = {
  getUserById: function (req, res) {
    res.json(userRes);
  }
};