var userRes = require('../data/user-res.js'),
 ResTemplate = require('../data/res-template.js');

module.exports = {
  getUserById: function (req, res) {
    var resTemplate = new ResTemplate()
    resTemplate.data = userRes;
    res.json(resTemplate);
  }
};