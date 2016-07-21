var ResTemplate = require('../data/res-template.js'),
  responseUtil = require('../util/response-util.js');

var maxDelay = 2,
  minDelay = 1;

module.exports = {
  createPassword: function (req, res) {
    var resTemplate = new ResTemplate()

    responseUtil.timeout(function () {
      if(req.body.newPassword === 'invalidToken123'){
        res.status(400);
        resTemplate.status.message = 'Invalid Token';
      }
      res.json(resTemplate);
    }, minDelay, maxDelay);
  },
  signIn: function (req, res) {
    var resTemplate = new ResTemplate()

    responseUtil.timeout(function () {
      if(req.body.password === 'invalid'){
        res.status(400);
        resTemplate.status.message = 'Incorrect username/password';
      }
      res.json(resTemplate);
    }, minDelay, maxDelay);
  },
  forgotPassword: function (req, res) {
    var resTemplate = new ResTemplate()

    responseUtil.timeout(function () {
      res.json(resTemplate);
    }, minDelay, maxDelay);
  }
};