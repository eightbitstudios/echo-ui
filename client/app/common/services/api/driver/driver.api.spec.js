describe('Api: driverApi', function () {
  'use strict';

  var $scope,
    $q,
    $http,
    driverApi,
    driverConverterService,
    apiConfig,
    getRes,
    postRes,
    putRes,
    deleteRes;

  beforeEach(function () {

    module('echo.api.driver', function ($provide) {
      $provide.value('$http', $http = jasmine.createSpyObj('$http', ['get', 'post', 'put', 'delete']));
      $provide.value('DriverModel', function (data) {
        _.assign(this, data);
      });
      $provide.value('driverConverterService', driverConverterService = jasmine.createSpyObj('driverConverterService', ['driverRequest', 'driverResponse']));
    });

    inject(function ($rootScope, _$q_, _$http_, _apiConfig_, _driverApi_) {
      $scope = $rootScope.$new();
      $q = _$q_;
      apiConfig = _apiConfig_;

      driverApi = _driverApi_;
    });

    $http.get.and.returnValue($q.when(getRes = {}));
    $http.post.and.returnValue($q.when(postRes = {}));
    $http.put.and.returnValue($q.when(putRes = {}));
    $http.delete.and.returnValue($q.when(deleteRes = {}));
  });

  describe('Function: upsertDriver', function () {
    it('should call insert driver', function () {
      var carrierId = 1,
        driver = {};

      spyOn(driverApi, 'insertDriver');

      driverApi.upsertDriver(carrierId, driver);
      expect(driverApi.insertDriver).toHaveBeenCalledWith(carrierId, driver);
    });

    it('should call update driver', function () {
      var carrierId = 1,
        driver = { id: 1 };

      spyOn(driverApi, 'updateDriverById');

      driverApi.upsertDriver(carrierId, driver);
      expect(driverApi.updateDriverById).toHaveBeenCalledWith(carrierId, driver);
    });
  });

  describe('Function: updateDriverById', function () {
    it('should make a get request to update driver', function (done) {
      var carrierId = 1,
        driver = { id: 1 };

      putRes.data = { data: '' };

      driverConverterService.driverRequest.and.returnValue(driver);

      driverApi.updateDriverById(carrierId, driver).then(function () {
        expect($http.put).toHaveBeenCalledWith(_.template(apiConfig.driverById)({ carrierId: carrierId, driverId: driver.id }), driver);
        done();
      });

      $scope.$digest();
    });

    it('should return error message if put fails', function (done) {
      var carrierId = 1,
        driver = { id: 1 };

      putRes.data = {
        status: {
          code: 'error'
        }
      };

      $http.put.and.returnValue($q.reject(putRes));

      driverConverterService.driverRequest.and.returnValue(driver);

      driverApi.updateDriverById(carrierId, driver).catch(function (error) {
        expect(error).toEqual(putRes.data.status.code);
        done();
      });

      $scope.$digest();
    });
  });

  describe('Function: deactivateDriverById', function () {
    it('should make a get request to deactivate driver', function (done) {
      var carrierId = 1,
        driver = { id: 1 };

      putRes.data = { data: '' };

      driverApi.deactivateDriverById(carrierId, driver).then(function () {
        expect($http.put).toHaveBeenCalledWith(_.template(apiConfig.deactivateUserById)({ userId: driver.id }), driver);
        done();
      });

      $scope.$digest();
    });

    it('should return error message if put fails', function (done) {
      var carrierId = 1,
        driver = { id: 1 };

      putRes.data = {
        status: {
          code: 'error'
        }
      };

      $http.put.and.returnValue($q.reject(putRes));

      driverApi.deactivateDriverById(carrierId, driver).catch(function (error) {
        expect(error).toEqual(putRes.data.status.code);
        done();
      });

      $scope.$digest();
    });
  });

  describe('Function: insertDriver', function () {
    it('should make a request to insert driver', function (done) {
      var carrierId = 1,
        driver = { id: 1 };

      postRes.data = { data: '' };

      driverConverterService.driverRequest.and.returnValue(driver);

      driverApi.insertDriver(carrierId, driver).then(function () {
        expect($http.post).toHaveBeenCalledWith(apiConfig.driver, driver);
        done();
      });

      $scope.$digest();
    });

    it('should return error message if post fails', function (done) {
      var carrierId = 1,
        driver = { id: 1 };

      postRes.data = {
        status: {
          code: 'error'
        }
      };

      $http.post.and.returnValue($q.reject(postRes));

      driverConverterService.driverRequest.and.returnValue(driver);

      driverApi.insertDriver(carrierId, driver).catch(function (error) {
        expect(error).toEqual(postRes.data.status.code);
        done();
      });

      $scope.$digest();
    });
  });

  describe('Function: fetchDriverById', function () {
    it('should make a get request to get driver by id', function (done) {
      var carrierId = 1,
        driverId = 2;

      getRes.data = { data: '' };

      driverApi.fetchDriverById(carrierId, driverId).then(function () {
        expect($http.get).toHaveBeenCalledWith(_.template(apiConfig.driverById)({ carrierId: carrierId, driverId: driverId }));
        done();
      });

      $scope.$digest();
    });
  });
});
