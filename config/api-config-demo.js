'use strict';

module.exports = function (grunt) {

  var host = 'http://carr-prtl.dev.echogl.net:81';

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
    forgotPassword: host + '/api/v1/auth/forgotPassword',
    repByCarrierId: host +  '/api/v1/carriers/${carrierId}/echorep',
    portalUsers: host + '/api/v1/carriers/${carrierId}/portalusers',
    changePassword: host + '/api/v1/users/${userId}/setPassword',
    driverCount:host +  '/api/v1/carriers/${carrierId}/drivers/count',
    drivers: host + '/api/v1/carriers/${carrierId}/drivers',
    driver: host + '/api/v1/users/drivers',
    driverById: host + '/api/v1/users/drivers/${driverId}',
    searchDrivers: host + '/api/v1/carriers/${carrierId}/drivers/${searchTerm}',
    portalUserById: host + '/api/v1/carriers/${carrierId}/portalusers/${userId}',
    language: host + '/api/v1/preferredLanguages'
  };
};