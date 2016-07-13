var carriers = require('../data/carriers-res.js'),
  ResTemplate = require('../data/res-template.js'),
  _ = require('lodash'),
  repDetailsRes = require('../data/rep-details-res.js'),
  portalUserRes = require('../data/portal-users-res.js');

module.exports = {
  getCarriers: function (req, res) {
    var resTemplate = new ResTemplate();
    resTemplate.data = carriers;
    res.json(resTemplate);
  },
  getCarrierById: function (req, res) {
    var resTemplate = new ResTemplate();
    resTemplate.data = _.find(carriers, { carrierId: _.parseInt(req.params.carrierId) });
    res.json(resTemplate);
  },
  getRepByCarrierId: function (req, res) {
    var resTemplate = new ResTemplate();
    resTemplate.data = repDetailsRes;
    res.json(resTemplate);
  },
  getPortalUsers: function (req, res) {
    var resTemplate = new ResTemplate();
    resTemplate.data = _(portalUserRes).sampleSize(portalUserRes.length).slice(1, _.random(2, portalUserRes.length));
    res.json(resTemplate);
  },
  getPortalUserById: function (req, res) {
    var resTemplate = new ResTemplate();
    resTemplate.data = _(portalUserRes).find({userId: _.parseInt(req.params.userId)});
    res.json(resTemplate);
  },
  updatePortalUserById: function (req, res) {
    var resTemplate = new ResTemplate();

    if(req.body.email === 'error@gmail.com'){
      resTemplate.status.message = 'There was an error. Please try again.';
      resTemplate.status.error = true;
    }

    if(resTemplate.status.error){
      res.status(400).json(resTemplate);
    }else {
      res.json(resTemplate);
    }
  },
  insertPortalUser: function (req, res) {
    var resTemplate = new ResTemplate();
    res.json(resTemplate);
  },
  getDriverCount: function (req, res) {
    var resTemplate = new ResTemplate();
    resTemplate.data = {
      userCount: _.random(100)
    };

    res.json(resTemplate);
  }
};