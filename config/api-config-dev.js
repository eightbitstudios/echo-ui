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
    signOut: host + '/api/v1/auth/signOut',
    refresh: host + '/api/v1/auth/refresh',
    createPassword: host + '/api/v1/users/${userId}/createPassword',
    repByCarrierId: host +  '/api/v1/carriers/${carrierId}/echorep',
    forgotPassword: host + '/api/v1/auth/forgotPassword',
    portalUsers: host + '/api/v1/carriers/${carrierId}/portalusers',
    driverCount:host +  '/api/v1/carriers/${carrierId}/drivers/count',
    changePassword: host + '/api/v1/users/${userId}/setPassword',
    drivers: host + '/api/v1/carriers/${carrierId}/drivers',
    driver: host + '/api/v1/users/drivers',
    driverById: host + '/api/v1/users/drivers/${driverId}',
    deactivateDriverById: host + '/api/v1/carriers/${carrierId}/drivers/${driverId}/deactivate',
    searchDrivers: host + '/api/v1/carriers/${carrierId}/drivers/${searchTerm}',
    portalUserById: host + '/api/v1/carriers/${carrierId}/portalusers/${userId}',
    language: host + '/api/v1/preferredLanguages'
  };
};