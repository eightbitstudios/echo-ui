'use strict';
var endpoints = require('./endpoints'),
  _ = require('lodash');

module.exports = function (grunt) {
  var host = 'https://echocarrierportalqa.azure-api.net/web-api/v1';
  var apiEndpoints = _.zipObject(_.keys(endpoints), _.map(endpoints, function (value) { return host + value }));
  apiEndpoints.googleMapsApiKey = 'AIzaSyCVP3yvKSvxHj2dWHfKCVClFR0wz0vgutw';
  apiEndpoints.key = '';
  apiEndpoints.keyHeader = '';
  return apiEndpoints;
};
