describe('Resolver: Carrier Details', function () {
  'use strict';

  var $scope,
    $stateParams,
    carrierDetailsResolver;

  beforeEach(function () {
    module('echo.index.resolvers.carrierDetails');

    inject(function ($rootScope, _carrierDetailsResolver_) {
      $scope = $rootScope.$new();
      carrierDetailsResolver = _carrierDetailsResolver_;
    });
  });

  describe('Function: carrierId', function() {
    it('should return carrierId', function() {
      $stateParams = {
        carrierId: 2
      };
      expect(carrierDetailsResolver.carrierId($stateParams)).toEqual($stateParams.carrierId);
    });
  });
});
