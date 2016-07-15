var carrierHandler = require('./handlers/carrier-handler'),
  userHandler = require('./handlers/user-handler'),
  endpoints = require('../config/endpoints');

module.exports = function (app) {
  
  app.post(endpoints.api.userById, userHandler.insertPortalUser);
  app.put(endpoints.api.userById, userHandler.updatePortalUserById);
  app.get(endpoints.api.userById, userHandler.getUserById);
  app.post(endpoints.api.deactivateUserById, userHandler.deactivateUserById);
  app.get(endpoints.api.driverCount, carrierHandler.getDriverCount);
  app.get(endpoints.api.portalUsers, carrierHandler.getPortalUsers);
  app.get(endpoints.api.carriers, carrierHandler.getCarriers);
  app.get(endpoints.api.carrierById, carrierHandler.getCarrierById);
  app.get(endpoints.api.repByCarrierId, carrierHandler.getRepByCarrierId);
};