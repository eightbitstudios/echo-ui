describe('Resolver: Carrier', function () {
  'use strict';

  var $scope,
    carrierApi,
    $stateParams,
    carrierResolver;

  beforeEach(function () {
    module('echo.index.resolvers.carrier', function ($provide) {
      $provide.value('carrierApi', carrierApi = jasmine.createSpyObj('carrierApi', ['fetchCarrierById']));
    });

    inject(function ($rootScope, _carrierResolver_) {
      $scope = $rootScope.$new();
      carrierResolver = _carrierResolver_;
    });
  });

  describe('Function: carrierId', function() {
    it('should return carrierId', function() {
      $stateParams = {
        carrierId: 2
      };
      expect(carrierResolver.carrierId($stateParams)).toEqual($stateParams.carrierId);
    });
  });

  describe('Function: carrierDetails', function() {
    it('should call carrier details endpoint', function() {
      var carrierId = 1;
      carrierResolver.carrierDetails(carrierId);
      expect(carrierApi.fetchCarrierById).toHaveBeenCalledWith(carrierId);
    });
  });
});
