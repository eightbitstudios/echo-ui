var responseUtil = require('../util/response-util.js'),
  loadsRes = require('../data/loads-res'),
  loadsMapRes = require('../data/loads-map-res'),
  reportEmptyRes = require('../data/report-empty-res'),
  activityLogRes = require('../data/activity-log-res'),
  reportArrivalRes = require('../data/report-arrival-res'),
  loadUpdateOptionsRes = require('../data/load-update-options-res'),
  dashboardRes = require('../data/dashboard-res'),
  equipmentRes = require('../data/equipment-res'),
  _ = require('lodash'),
  ResTemplate = require('../data/res-template.js');

var maxDelay = 2,
  minDelay = 1;

module.exports = {
  getItemsByLoadGuid: function(req, res) {
    var resTemplate = new ResTemplate();

    resTemplate.data = loadsRes.loads[0].pickUp[0].items;

    responseUtil.timeout(function() {
      res.json(resTemplate);
    }, minDelay, maxDelay);
  },
  getLoadCount: function(req, res) {
    var resTemplate = new ResTemplate();

    resTemplate.data = {
      active: 12,
      unbilled: 13,
      upcoming: 4
    };

    responseUtil.timeout(function() {
      res.json(resTemplate);
    }, minDelay, maxDelay);
  },
  getActivityLogByLoadId: function(req, res) {
    var resTemplate = new ResTemplate();
    resTemplate.data = activityLogRes;

    responseUtil.timeout(function() {
      res.json(resTemplate);
    }, minDelay, maxDelay);
  },
  getDriverStatus: function(req, res) {
    var resTemplate = new ResTemplate();
    var searchText = req.params.searchText;
    resTemplate.data = {
      isDriverAvailable: false,
      conflictingLoadId: 98766789
    };

    responseUtil.timeout(function() {
      res.json(resTemplate);
    }, minDelay, maxDelay);
  },
  getLoadsBySearchText: function(req, res) {
    var resTemplate = new ResTemplate();
    var searchText = req.params.searchText;
    resTemplate.data.loads = _.filter(loadsRes.loads, function(item) {
      return item.loadNumber.toString().indexOf(searchText) > -1;
    });

    resTemplate.data.totalLoadCount = loadsRes.totalLoadCount;

    responseUtil.timeout(function() {
      res.json(resTemplate);
    }, minDelay, maxDelay);
  },
  getReportEmptyModalAction: function(req, res) {
    var resTemplate = new ResTemplate();
    resTemplate.data = reportEmptyRes;
    responseUtil.timeout(function() {
      res.json(resTemplate);
    }, minDelay, maxDelay);
  },
  getReportLoadedModalAction: function(req, res) {
    var resTemplate = new ResTemplate();
    resTemplate.data = reportEmptyRes;
    responseUtil.timeout(function() {
      res.json(resTemplate);
    }, minDelay, maxDelay);
  },
  createModalAction: function(req, res) {
    var resTemplate = new ResTemplate();

    responseUtil.timeout(function() {
      res.json(resTemplate);
    }, minDelay, maxDelay);
  },
  getLoadsByCarrierId: function(req, res) {
    var resTemplate = new ResTemplate();
    resTemplate.data.loads = _.slice(loadsRes.loads, _.parseInt(req.query.offset) - 1, _.parseInt(req.query.offset) + _.parseInt(req.query.limit) - 1);
    resTemplate.data.totalLoadCount = loadsRes.loads.length;

    responseUtil.timeout(function() {
      res.json(resTemplate);
    }, minDelay, maxDelay);
  },
  getUnbilledLoadsByCarrierId: function(req, res) {
    var resTemplate = new ResTemplate();
    resTemplate.data.loads = _.slice(loadsRes.loads, _.parseInt(req.query.offset) - 1, _.parseInt(req.query.offset) + _.parseInt(req.query.limit) - 1);
    resTemplate.data.totalLoadCount = loadsRes.loads.length;

    _.forEach(resTemplate.data.loads, function (load) {
      load.nextAction.nextAction = 10;
      delete load.escalationLevel;
    });

    responseUtil.timeout(function() {
      res.json(resTemplate);
    }, minDelay, maxDelay);
  },
  getEquipmentByLoadId: function(req, res) {
    var resTemplate = new ResTemplate();
    resTemplate.data = equipmentRes;

    responseUtil.timeout(function() {
      res.json(resTemplate);
    }, minDelay, maxDelay);
  },
  getLoadDetails: function(req, res) {
    var resTemplate = new ResTemplate();
    resTemplate.data = loadsRes.loads[0];

    responseUtil.timeout(function() {
      res.json(resTemplate);
    }, minDelay, maxDelay);
  },
  getLoadUpdateOptions: function(req, res) {
    var resTemplate = new ResTemplate();
    resTemplate.data = loadUpdateOptionsRes;

    responseUtil.timeout(function() {
      res.json(resTemplate);
    }, minDelay, maxDelay);
  },
  fetchReportArrivalByLoadGuid: function(req, res) {
    var resTemplate = new ResTemplate();
    resTemplate.data = reportArrivalRes;
    responseUtil.timeout(function() {
      res.json(resTemplate);
    }, minDelay, maxDelay);
  },
  updateProNumber: function(req, res) {
    var resTemplate = new ResTemplate();
    resTemplate.data = {};
    if (req.body.proNumber != null) {
      resTemplate.data.proNumber = req.body.proNumber;
    }

    responseUtil.timeout(function() {
      res.json(resTemplate);
    }, minDelay, maxDelay);
  },

  updateReportArrivalByLoadGuid: function(req, res) {
    var resTemplate = new ResTemplate();
    resTemplate.data = reportArrivalRes;
    responseUtil.timeout(function() {
      res.json(resTemplate);
    }, minDelay, maxDelay);
  },
  updateTrailerNumber: function(req, res) {
    var resTemplate = new ResTemplate();
    resTemplate.data = {};
    if (req.body.trailerNumber !== null) {
      resTemplate.data.trailerNumber = req.body.trailerNumber;
    }

    responseUtil.timeout(function() {
      res.json(resTemplate);
    }, minDelay, maxDelay);
  },
  fetchDashboard: function(req, res) {
    var resTemplate = new ResTemplate();
    resTemplate.data = dashboardRes;
    resTemplate.data.mapLoads = loadsMapRes;
    responseUtil.timeout(function() {
      res.json(resTemplate);
    }, minDelay, maxDelay);
  },
  fetchMapPoints: function(req, res) {
    var resTemplate = new ResTemplate();
    resTemplate.data = loadsMapRes;
    responseUtil.timeout(function() {
      res.json(resTemplate);
    }, minDelay, maxDelay);
  },
  fetchMapPointByLoadGuid: function(req, res) {
    var resTemplate = new ResTemplate();
    resTemplate.data = loadsMapRes[2];
    responseUtil.timeout(function() {
      res.json(resTemplate);
    }, minDelay, maxDelay);
  },
  fetchActiveLoadsPage: function(req, res) {
    var resTemplate = new ResTemplate();
    resTemplate.data = {};
    if (req.query.getActiveLoads) {
      resTemplate.data.loads = {};
      resTemplate.data.loads.loads = _.slice(loadsRes.loads, _.parseInt(req.query.offset) - 1, _.parseInt(req.query.offset) + _.parseInt(req.query.limit) - 1);
      resTemplate.data.loads.totalLoadCount = loadsRes.loads.length;
    }
    if (req.query.getMapLoads) {
      resTemplate.data.mapLoads = loadsMapRes;
    }
    if (req.query.getLoadsCount) {
      resTemplate.data.loadsCount = {
        active: 12,
        unbilled: 13,
        upcoming: 4
      };
    }

    responseUtil.timeout(function() {
      res.json(resTemplate);
    }, minDelay, maxDelay);
  }
};
