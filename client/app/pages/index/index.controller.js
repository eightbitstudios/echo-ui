'use strict';

angular.module('echo.index.controller', [])
  .controller('IndexCtrl', function (carrierDetails) {
    this.carrierDetails = carrierDetails;
  }
);
