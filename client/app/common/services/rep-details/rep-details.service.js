'use strict';

angular.module('echo.services.repDetails', [
  'echo.models.rep'
])
  .factory('repDetailsService', function (RepModel) {

    return {
      _rep: {},
      /**
       * @description Retrieves stored user model
       */
      getRep: function () {
        return this._rep;
      },

      setRep: function (rep) {
        this._rep = new RepModel(rep);
      }
    };
  });
