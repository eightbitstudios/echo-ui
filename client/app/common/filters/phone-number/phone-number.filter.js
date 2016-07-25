'use strict';

angular.module('echo.filters.phoneNumber', [])
  .filter('phoneNumber', function () {
    return function (phone) {

      if (!phone) { return ''; }

      var value = phone.toString().trim().replace(/[\(\)\-\s]+/g, '');

      var city, number;

      if (value.length <= 3) {
        city = value;
      } else if (value.length > 3) {
        city = value.slice(0, 3);
        number = value.slice(3);
      }

      var formattedPhoneNumber = '';

      if (number) {
        if (number.length > 3) {
          number = number.slice(0, 3) + '-' + number.slice(3, 7);
        }
        else {
          number = number;
        }

        formattedPhoneNumber = ('(' + city + ') ' + number).trim();
      }
      else {
        formattedPhoneNumber = '(' + city;
      }

      return formattedPhoneNumber;

    };
  });