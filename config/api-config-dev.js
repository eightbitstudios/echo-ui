'use strict';

module.exports = function (grunt) {

  var host = 'https://api.local';

  return {
    carriers: host + '/api/v1/carriers',
    carrierById: host + '/api/v1/carriers/${carrierId}',
    userById: host + '/api/v1/users/${userId}',
    deactivateUserById: host + '/api/v1/users/${userId}/deactivate',
    user: host + '/api/v1/users',
    signIn: host + '/api/v1/auth/signIn',
    createPassword: host + '/api/v1/users/${userId}/createPassword',
    repByCarrierId: host +  '/api/v1/carriers/${carrierId}/echorep',
    portalUsers: host + '/api/v1/carriers/${carrierId}/portalusers',
    driverCount:host +  '/api/v1/carriers/${carrierId}/drivers/count',
    drivers: host + '/api/v1/carriers/${carrierId}/drivers',
    driverById: host + '/api/v1/carriers/${carrierId}/drivers/${driverId}',
    deactivateDriverById: host + '/api/v1/carriers/${carrierId}/drivers/${driverId}/deactivate',
    searchDrivers: host + '/api/v1/carriers/${carrierId}/drivers/${searchTerm}',
    portalUserById: host + '/api/v1/carriers/${carrierId}/portalusers/${userId}'
  };
};