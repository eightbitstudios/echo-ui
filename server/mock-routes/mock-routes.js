var carrierHandler = require('./handlers/carrier-handler'),
  userHandler = require('./handlers/user-handler'),
  endpoints = require('../config/endpoints');

module.exports = function (app) {
  
  app.get(endpoints.api.portalUserById, carrierHandler.getPortalUserById);
  app.post(endpoints.api.portalUserById, carrierHandler.updatePortalUserById);
  app.get(endpoints.api.driverCount, carrierHandler.getDriverCount);
  app.get(endpoints.api.portalUsers, carrierHandler.getPortalUsers);
  app.post(endpoints.api.portalUsers, carrierHandler.insertPortalUser);
  app.get(endpoints.api.carriers, carrierHandler.getCarriers);
  app.get(endpoints.api.carrierById, carrierHandler.getCarrierById);
  app.get(endpoints.api.repByCarrierId, carrierHandler.getRepByCarrierId);
  app.get(endpoints.api.userById, userHandler.getUserById);
};