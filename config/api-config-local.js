'use strict';
var endpoints = require('./endpoints'),
  _ = require('lodash');

module.exports = function (grunt) {
  var host = 'https://api.local/api/v1';
  var apiEndpoints = _.zipObject(_.keys(endpoints), _.map(endpoints, function (value) { return host + value }));
  apiEndpoints.googleMapsApiKey = 'AIzaSyC8RsoHfRqThfEIun95B9Q57aN2BT8L_OI';
  apiEndpoints.key = new Buffer('bd045befc19a40a68840b2d16b6dd465').toString('base64');
  return apiEndpoints;
};
