describe('Resolver: Driver Profile', function () {
  'use strict';

  var $scope,
    $stateParams,
    driverApi,
    languageApi,
    driverProfileResolver;

  beforeEach(function () {
    module('echo.index.resolvers.driverProfile', function ($provide) {
      $provide.value('driverApi', driverApi = jasmine.createSpyObj('driverApi', ['fetchDriverById']));
      $provide.value('languageApi', languageApi = jasmine.createSpyObj('languageApi', ['fetchLanguages']));
    });

    inject(function ($rootScope, _driverProfileResolver_) {
      $scope = $rootScope.$new();
      driverProfileResolver = _driverProfileResolver_;
    });
  });

  describe('Function: driverId', function () {
    it('should return driverId', function () {
      $stateParams = {
        driverId: 2
      };
      expect(driverProfileResolver.driverId($stateParams)).toEqual($stateParams.driverId);
    });
  });

  describe('Function: driver', function () {
    it('should call driver endpoint', function () {
      var carrierId = 3,
        driverId = 4;
      driverProfileResolver.driver(carrierId, driverId);
      expect(driverApi.fetchDriverById).toHaveBeenCalledWith(carrierId, driverId);
    });

    it('should not call driver endpoint if driverId is not defined', function () {
      var carrierId = 3;

      driverProfileResolver.driver(carrierId);
      expect(driverApi.fetchDriverById).not.toHaveBeenCalled();
    });
  });

  describe('Function: languages', function () {
    it('should call language endpoint', function () {
      driverProfileResolver.languages();
      expect(languageApi.fetchLanguages).toHaveBeenCalled();
    });
  });
});
