'use strict';

module.exports = function (grunt) {

  return {
    carriers:  '/mock/api/v1/carriers',
    carrierById:  '/mock/api/v1/carriers/${carrierId}',
    userById:  '/mock/api/v1/users/${userId}',
    deactivateUserById:  '/mock/api/v1/users/${userId}/deactivate',
    user:  '/mock/api/v1/users',
    signIn:  '/mock/api/v1/auth/signIn',
    createPassword:  '/mock/api/v1/users/${userId}/createPassword',
    repByCarrierId:   '/mock/api/v1/carriers/${carrierId}/echorep',
    portalUsers:  '/mock/api/v1/carriers/${carrierId}/portalusers',
    driverCount:  '/mock/api/v1/carriers/${carrierId}/drivers/count',
    drivers:  '/mock/api/v1/carriers/${carrierId}/drivers',
    driverById: '/mock/api/v1/carriers/${carrierId}/drivers/${driverId}',
    deactivateDriverById: '/mock/api/v1/carriers/${carrierId}/drivers/${driverId}/deactivate',
    searchDrivers: '/mock/api/v1/carriers/${carrierId}/drivers/${searchTerm}',
    portalUserById:  '/mock/api/v1/carriers/${carrierId}/portalusers/${userId}',
    language: '/mock/api/v1/preferredLanguages'
  };
};