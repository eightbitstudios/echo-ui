'use strict';

angular.module('echo.filters.formatCityState', [
  'echo.config.globals'
])
  .filter('formatCityState', function () {
    return function(address) {
      // Default address to empty object for easier null-checking
      if (!address) {
        address = {};
      }

      if (address.city && address.state) {
        return address.city + ', ' + address.state;
      } else if (address.city) {
        return address.city;
      } else if (address.state) {
        return address.state;
      } else {
        return '';
      }
    };
  });
