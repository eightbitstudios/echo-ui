'use strict';
var endpoints = require('./endpoints'),
  _ = require('lodash');

module.exports = function (grunt) {
  var host = 'http://carrierportal-stage.dev.echogl.net:81';
  var apiEndpoints = _.zipObject(_.keys(endpoints), _.map(endpoints, function (value) { return host + value }));
  apiEndpoints.googleMapsApiKey = 'AIzaSyC8RsoHfRqThfEIun95B9Q57aN2BT8L_OI';
  return apiEndpoints;
};
