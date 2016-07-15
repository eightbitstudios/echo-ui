'use strict';

angular.module('echo.filters.phoneNumber', [])
  .filter('phoneNumber', function () {
    return function (phone) {

      if (!phone) { return ''; }

      var value = phone.toString().trim().replace(/[\-]+/g, '');

      var country, city, number;

      if(value.length === 1){
        country = value;
      } else if (value.length <= 4) {
        country = value.slice(0, 1);
        city = value.slice(1);
      } else if (value.length > 4) {
        country = value.slice(0, 1);
        city = value.slice(1, 4);
        number = value.slice(4);
      }

      var formattedPhoneNumber = '';

      if (number) {
        if (number.length > 3) {
          number = number.slice(0, 3) + '-' + number.slice(3, 7);
        }
        else {
          number = number;
        }

        formattedPhoneNumber = (country + '-' + city + '-' + number).trim();
      }
      else if(city){
        formattedPhoneNumber = country + '-' + city;
      } else{
        formattedPhoneNumber = country;
      }

      return formattedPhoneNumber;

    };
  });