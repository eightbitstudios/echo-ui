'use strict';
var endpoints = require('./endpoints'),
  _ = require('lodash');

module.exports = function (grunt) {
  var host = 'http://carr-prtl.dev.echogl.net:81';
  return _.zipObject(_.keys(endpoints), _.map(endpoints, function (value) { return host + value }));
};