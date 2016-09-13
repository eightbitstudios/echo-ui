var carrierHandler = require('./handlers/carrier-handler'),
  userHandler = require('./handlers/user-handler'),
  authHandler = require('./handlers/auth-handler'),
  languageHandler = require('./handlers/language-handler'),
  driverHandler = require('./handlers/driver-handler'),
  loadsHandler = require('./handlers/loads-handler'),
  locationHandler = require('./handlers/location-handler'),
  timeZonesHandler = require('./handlers/time-zones-handler'),
  endpoints = require('../config/endpoints');

module.exports = function (app) {
  app.get(endpoints.api.timeZones, timeZonesHandler.getTimeZones);
  app.get(endpoints.api.itemsByLoadGuid, loadsHandler.getItemsByLoadGuid);
  app.get(endpoints.api.activityLogByLoadId, loadsHandler.getActivityLogByLoadId);
  app.post(endpoints.api.reportEmptyByLoadGuid, loadsHandler.createModalAction);
  app.post(endpoints.api.reportDeliveredByLoadGuid, loadsHandler.createModalAction);
  app.post(endpoints.api.reportLoadedByLoadGuid, loadsHandler.createModalAction);
  app.put(endpoints.api.reportLocation, loadsHandler.createModalAction);
  app.post(endpoints.api.reportLoadedByLoadGuid, loadsHandler.createModalAction);
  app.post(endpoints.api.reportTrailerByLoadGuid, loadsHandler.createModalAction);
  app.get(endpoints.api.reportLoadedByLoadGuid, loadsHandler.getReportLoadedModalAction);
  app.get(endpoints.api.reportLoadedByLoadGuid, loadsHandler.getReportLoadedModalAction);
  app.get(endpoints.api.reportEmptyByLoadGuid, loadsHandler.getReportEmptyModalAction);
  app.get(endpoints.api.reportDeliveredByLoadGuid, loadsHandler.getReportEmptyModalAction);
  app.get(endpoints.api.loadUpdateOptionsByLoadGuid, loadsHandler.getLoadUpdateOptions);
  app.get(endpoints.api.location, locationHandler.getLocation);
  app.get(endpoints.api.loadsNeedingAction, loadsHandler.getLoadsByCarrierId);
  app.get(endpoints.api.multiStopLoads, loadsHandler.getLoadsByCarrierId);
  app.post(endpoints.api.assignDriverByLoadId, loadsHandler.getLoadCount);
  app.put(endpoints.api.unassignDriverByLoadId, loadsHandler.getLoadCount);
  app.put(endpoints.api.reassignDriverByLoadId, loadsHandler.getLoadCount);
  app.get(endpoints.api.driverStatusByLoadId, loadsHandler.getDriverStatus);
  app.get(endpoints.api.loadById, loadsHandler.getLoadDetails);
  app.put(endpoints.api.proNumberByLoadId, loadsHandler.updateProNumber);
  app.put(endpoints.api.trailerNumberByLoadId, loadsHandler.updateTrailerNumber);
  app.get(endpoints.api.availableLoadsByCarrierId, loadsHandler.getLoadsByCarrierId);
  app.get(endpoints.api.unbilledLoadsByCarrierId, loadsHandler.getLoadsByCarrierId);
  app.get(endpoints.api.upcomingLoadsByCarrierId, loadsHandler.getLoadsByCarrierId);
  app.get(endpoints.api.loadCountByCarrierId, loadsHandler.getLoadCount);
  app.get(endpoints.api.loadsBySearchText, loadsHandler.getLoadsBySearchText);
  app.get(endpoints.api.reportArrivalByLoadGuid, loadsHandler.fetchReportArrivalByLoadGuid);
  app.put(endpoints.api.reportArrivalByLoadGuid, loadsHandler.updateReportArrivalByLoadGuid);
  app.post(endpoints.api.users, userHandler.insertPortalUser);
  app.put(endpoints.api.userById, userHandler.updatePortalUserById);
  app.get(endpoints.api.userById, userHandler.getUserById);
  app.post(endpoints.api.signIn, authHandler.signIn);
  app.put(endpoints.api.changePassword, authHandler.changePassword);
  app.post(endpoints.api.signOut, authHandler.signOut);
  app.get(endpoints.api.refresh, authHandler.refresh);
  app.post(endpoints.api.createPassword, authHandler.createPassword);
  app.post(endpoints.api.forgotPassword, authHandler.forgotPassword);
  app.post(endpoints.api.deactivateUserById, userHandler.deactivateUserById);
  app.get(endpoints.api.driverCount, carrierHandler.getDriverCount);
  app.post(endpoints.api.driver, driverHandler.insertDriver);
  app.get(endpoints.api.driverById, driverHandler.getDriverById);
  app.put(endpoints.api.driverById, driverHandler.updateDriverById);
  app.put(endpoints.api.deactivateDriverById, driverHandler.deactivateDriverById);
  app.get(endpoints.api.unassignedDriversByLoadId, carrierHandler.getDrivers);
  app.get(endpoints.api.searchDrivers, carrierHandler.searchDrivers);
  app.get(endpoints.api.drivers, carrierHandler.getDrivers);
  app.get(endpoints.api.portalUsers, carrierHandler.getPortalUsers);
  app.get(endpoints.api.carriers, carrierHandler.getCarriers);
  app.get(endpoints.api.carrierById, carrierHandler.getCarrierById);
  app.get(endpoints.api.repByCarrierId, carrierHandler.getRepByCarrierId);
  app.get(endpoints.api.language, languageHandler.getLanguage);
};
