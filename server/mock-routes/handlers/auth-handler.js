var ResTemplate = require('../data/res-template.js'),
  responseUtil = require('../util/response-util.js');

var maxDelay = 2,
  minDelay = 1;

module.exports = {
  createPassword: function (req, res) {
    var resTemplate = new ResTemplate()

    responseUtil.timeout(function () {
      if (req.body.newPassword === 'invalidToken123') {
        res.status(400);
        resTemplate.status.message = 'Invalid Token';
      }
      res.json(resTemplate);
    }, minDelay, maxDelay);
  },
  refresh: function (req, res) {
    var resTemplate = new ResTemplate()

    responseUtil.timeout(function () {
      res.json(resTemplate);
    }, minDelay, maxDelay);
  },
  signIn: function (req, res) {
    var resTemplate = new ResTemplate()

    responseUtil.timeout(function () {
      if (req.body.password === 'invalid') {
        res.status(400);
        resTemplate.status.code = 401001;
      }
      else if (req.body.password === 'locked') {
        res.status(400);
        resTemplate.status.code = 401002;
      }
      else if (req.body.password === 'deactivated') {
        res.status(400);
        resTemplate.status.code = 401003;
      } else {
        resTemplate.data = {
          access_token: 'asdasd.eyJ1c2VyX2lkIjogIjEiLCAiY2Fycmllcl9pZCI6ICIxIiwgInJvbGUiOiAiQ2FycmllckFkbWluIn0=.asdasd'
        };
      }
      res.json(resTemplate);
    }, minDelay, maxDelay);
  },
  signOut: function (req, res) {
    var resTemplate = new ResTemplate()
    responseUtil.timeout(function () {
      res.json(resTemplate);
    }, minDelay, maxDelay);
  },
  forgotPassword: function (req, res) {
    var resTemplate = new ResTemplate()

    responseUtil.timeout(function () {
      if (req.body.username === 'invalid@gmail.com') {
        res.status(400);
        resTemplate.status.code = 400001;
      }
      else if (req.body.username === 'deactivated@gmail.com') {
        res.status(400);
        resTemplate.status.code = 401003;
      }
      res.json(resTemplate);
    }, minDelay, maxDelay);
  },
  changePassword: function (req, res) {
    var resTemplate = new ResTemplate()

    responseUtil.timeout(function () {
      if (req.body.currentPassword === 'invalid') {
        res.status(400);
        resTemplate.status.code = 401001;
      }
      res.json(resTemplate);
    }, minDelay, maxDelay);
  }
};