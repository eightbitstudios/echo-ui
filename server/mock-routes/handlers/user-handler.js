var responseUtil = require('../util/response-util.js'),
  ResTemplate = require('../data/res-template.js');

var maxDelay = 2,
  minDelay = 1;

module.exports = {
  getUserById: function (req, res) {
    var resTemplate = new ResTemplate()
    resTemplate.data = userRes;

    responseUtil.timeout(function () {
      res.json(resTemplate);
    }, minDelay, maxDelay);
  },
  deactivateUserById: function (req, res) {
    var resTemplate = new ResTemplate();

    responseUtil.timeout(function () {
      res.json(resTemplate);
    }, minDelay, maxDelay);
  },
  updatePortalUserById: function (req, res) {
    var resTemplate = new ResTemplate();

    if (req.body.email === 'error@gmail.com') {
      resTemplate.status.message = 'There was an error. Please try again.';
      resTemplate.status.error = true;
    }

    responseUtil.timeout(function () {
      if (resTemplate.status.error) {
        res.status(400).json(resTemplate);
      } else {
        res.json(resTemplate);
      }
    }, minDelay, maxDelay);

  },
  insertPortalUser: function (req, res) {
    var resTemplate = new ResTemplate();

    if (req.body.email === 'error@gmail.com') {
      resTemplate.status.message = 'There was an error. Please try again.';
      resTemplate.status.error = true;
    }

    responseUtil.timeout(function () {
      if (resTemplate.status.error) {
        res.status(400).json(resTemplate);
      } else {
        res.json(resTemplate);
      }
    }, minDelay, maxDelay);
  },
  resendInviteToUserById: function (req, res) {
    var resTemplate = new ResTemplate();

    resTemplate.data.invitationStatus = 'Invited on Jan 4, 2017';

    responseUtil.timeout(function () {
      res.json(resTemplate);
    }, minDelay, maxDelay);
  }
};
