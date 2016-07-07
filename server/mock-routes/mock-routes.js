var carrierDetailsHandler = require('./handlers/carrier-details-handler'),
  repDetailsHandler = require('./handlers/rep-details-handler'),
  userHandler = require('./handlers/user-handler'),
  endpoints = require('../config/endpoints');
module.exports = function (app) {
  app.get(endpoints.API.CARRIER_DETAILS, carrierDetailsHandler.getCarrierById);
  app.get(endpoints.API.REP_DETAILS, repDetailsHandler.getRepById);
  app.get(endpoints.API.USER, userHandler.getUserById);
};