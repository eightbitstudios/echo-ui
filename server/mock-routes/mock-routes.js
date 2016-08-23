var carrierHandler = require('./handlers/carrier-handler'),
  userHandler = require('./handlers/user-handler'),
  authHandler = require('./handlers/auth-handler'),
  languageHandler = require('./handlers/language-handler'),
  driverHandler = require('./handlers/driver-handler'),
  loadsHandler = require('./handlers/loads-handler'),
  endpoints = require('../config/endpoints');

module.exports = function (app) {

  app.get(endpoints.api.loadById, loadsHandler.getLoadDetails);
  app.get(endpoints.api.availableLoadsByCarrierId, loadsHandler.getLoadsByCarrierId);
  app.get(endpoints.api.unbilledLoadsByCarrierId, loadsHandler.getLoadsByCarrierId);
  app.get(endpoints.api.upcomingLoadsByCarrierId, loadsHandler.getLoadsByCarrierId);
  app.get(endpoints.api.loadCountByCarrierId, loadsHandler.getLoadCount);
  app.get(endpoints.api.loadsBySearchText, loadsHandler.getLoadsBySearchText);
  app.post(endpoints.api.users, userHandler.insertPortalUser);
  app.put(endpoints.api.userById, userHandler.updatePortalUserById);
  app.get(endpoints.api.userById, userHandler.getUserById);
  app.post(endpoints.api.signIn, authHandler.signIn);
  app.put(endpoints.api.changePassword,  authHandler.changePassword);
  app.post(endpoints.api.signOut, authHandler.signOut);
  app.get(endpoints.api.refresh, authHandler.refresh);
  app.post(endpoints.api.createPassword, authHandler.createPassword);
  app.post(endpoints.api.forgotPassword, authHandler.forgotPassword);
  app.post(endpoints.api.deactivateUserById, userHandler.deactivateUserById);
  app.get(endpoints.api.driverCount, carrierHandler.getDriverCount);
  app.post(endpoints.api.drivers, driverHandler.insertDriver);
  app.get(endpoints.api.driverById, driverHandler.getDriverById);
  app.put(endpoints.api.driverById, driverHandler.updateDriverById);
  app.put(endpoints.api.deactivateDriverById, driverHandler.deactivateDriverById);
  app.get(endpoints.api.unassignedDriversByLoadId, carrierHandler.getDrivers);
  app.get(endpoints.api.searchDrivers, carrierHandler.getDrivers);
  app.get(endpoints.api.drivers, carrierHandler.getDrivers);
  app.get(endpoints.api.portalUsers, carrierHandler.getPortalUsers);
  app.get(endpoints.api.carriers, carrierHandler.getCarriers);
  app.get(endpoints.api.carrierById, carrierHandler.getCarrierById);
  app.get(endpoints.api.repByCarrierId, carrierHandler.getRepByCarrierId);
  app.get(endpoints.api.language, languageHandler.getLanguage);
};