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
    createPassword: host + '/api/v1/users/${userId}/createPassword',
    forgotPassword: host + '/api/v1/auth/forgotPassword',
    repByCarrierId: host +  '/api/v1/carriers/${carrierId}/echorep',
    portalUsers: host + '/api/v1/carriers/${carrierId}/portalusers',
    driverCount:host +  '/api/v1/carriers/${carrierId}/drivers/count',
    drivers: host + '/api/v1/carriers/${carrierId}/drivers',
    portalUserById: host + '/api/v1/carriers/${carrierId}/portalusers/${userId}'
  };
};