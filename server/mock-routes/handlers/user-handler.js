var userRes = require('../data/user-res.js'),
  ResTemplate = require('../data/res-template.js');

module.exports = {
  getUserById: function (req, res) {
    var resTemplate = new ResTemplate()
    resTemplate.data = userRes;
    res.json(resTemplate);
  },
  deactivateUserById: function (req, res) {
    var resTemplate = new ResTemplate()
    resTemplate.data = userRes;
    res.json(resTemplate);
  },
  updatePortalUserById: function (req, res) {
    var resTemplate = new ResTemplate();

    if (req.body.email === 'error@gmail.com') {
      resTemplate.status.message = 'There was an error. Please try again.';
      resTemplate.status.error = true;
    }

    if (resTemplate.status.error) {
      res.status(400).json(resTemplate);
    } else {
      res.json(resTemplate);
    }
  },
  insertPortalUser: function (req, res) {
    var resTemplate = new ResTemplate();

    if (req.body.email === 'error@gmail.com') {
      resTemplate.status.message = 'There was an error. Please try again.';
      resTemplate.status.error = true;
    }

    if (resTemplate.status.error) {
      res.status(400).json(resTemplate);
    } else {
      res.json(resTemplate);
    }
  }
};