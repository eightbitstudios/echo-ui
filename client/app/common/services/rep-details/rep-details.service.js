'use strict';

angular.module('echo.services.repDetails', [])
  .factory('repDetailsService', function ($q) {
    var repDetails = {};

    return {
      getRepDetails: function(){
        return repDetails;
      },
      fetchRepDetails: function () {
        repDetails = {
          name: 'Danielle John',
          email: 'danielle.john@echoLogistics.com',
          phone: '(610) 555-1212'
        };
        return $q.when(repDetails);
      }
    };
  });
