'use strict';
var endpoints = require('./endpoints'),
  _ = require('lodash');

module.exports = function (grunt) {
  var host = 'https://echocarrierportalqa.azure-api.net/web-api/v1';
  var apiEndpoints = _.zipObject(_.keys(endpoints), _.map(endpoints, function (value) { return host + value }));
  apiEndpoints.googleMapsApiKey = 'AIzaSyCVP3yvKSvxHj2dWHfKCVClFR0wz0vgutw';
  apiEndpoints.key = new Buffer('c286143b0f254864ac611bfaddcbbe4d').toString('base64');
  apiEndpoints.keyHeader = new Buffer('ocp-apim-subscription-key').toString('base64');
  return apiEndpoints;
};
