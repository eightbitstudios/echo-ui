'use strict';
var endpoints = require('./endpoints'),
  _ = require('lodash');

module.exports = function (grunt) {
  var host = 'https://api.local';
  return  _.zipObject(_.keys(endpoints), _.map(endpoints, function (value) { return host + value }));
};