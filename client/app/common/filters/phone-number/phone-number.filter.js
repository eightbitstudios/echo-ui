'use strict';

angular.module('echo.filters.phoneNumber', [])
  .filter('phoneNumber', function () {
    return function (phone) {

      if (!phone) { return ''; }

      var value = phone.toString().trim().replace(/[\(\)\-\s]+/g, '');
      var country,
        city,
        number;

      if (value.length === 10) {
        country = 1;
        city = value.slice(0, 3);
        number = value.slice(3);
      } else {
        country = value.slice(0, 1);
        city = value.slice(1, 4);
        number = value.slice(4);
      }

      return '+' + country + ' (' + city + ') ' + number.slice(0, 3) + '-' + number.slice(3, 7);

    };
  });