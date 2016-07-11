var carrierDetailsHandler = require('./handlers/carrier-details-handler'),
  userHandler = require('./handlers/user-handler'),
  endpoints = require('../config/endpoints');

module.exports = function (app) {
  app.get(endpoints.api.carrierById, carrierDetailsHandler.getCarrierById);
  app.get(endpoints.api.repByCarrierId, carrierDetailsHandler.getRepByCarrierId);
  app.get(endpoints.api.userById, userHandler.getUserById);
};