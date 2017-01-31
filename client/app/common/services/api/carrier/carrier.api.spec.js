describe('Api: carrierApi', function () {
  'use strict';

  var $scope,
    $q,
    $http,
    carrierApi,
    apiConfig,
    getRes,
    postRes,
    putRes,
    deleteRes;

  beforeEach(function () {

    module('echo.api.carrier', function ($provide) {
      $provide.value('$http', $http = jasmine.createSpyObj('$http', ['get', 'post', 'put', 'delete']));
      $provide.value('CarrierModel', function (data) {
        _.assign(this, data);
      });
      $provide.value('UserModel', function (data) {
        _.assign(this, data);
      });
      $provide.value('DriverModel', function (data) {
        _.assign(this, data);
      });
    });

    inject(function ($rootScope, _$q_, _$http_, _apiConfig_, _carrierApi_) {
      $scope = $rootScope.$new();
      $q = _$q_;
      apiConfig = _apiConfig_;

      carrierApi = _carrierApi_;
    });

    $http.get.and.returnValue($q.when(getRes = {}));
    $http.post.and.returnValue($q.when(postRes = {}));
    $http.put.and.returnValue($q.when(putRes = {}));
    $http.delete.and.returnValue($q.when(deleteRes = {}));
  });

  describe('Function: fetchCarriers', function () {
    it('should make a get request with repId', function (done) {
      var repId = '1234';
      getRes.data = { data: '' };

      carrierApi.fetchCarriers(repId).then(function () {
        expect($http.get).toHaveBeenCalledWith(apiConfig.carriers, {
          params: {
            'repId': repId
          }
        });
        done();
      });

      $scope.$digest();
    });
  });

  describe('Function: fetchCarrierById', function () {
    it('should make a get with carrierId', function (done) {
      var carrierId = '1234';
      getRes.data = { data: '' };

      carrierApi.fetchCarrierById(carrierId).then(function () {
        expect($http.get).toHaveBeenCalledWith(_.template(apiConfig.carrierById)({ carrierId: carrierId }));
        done();
      });

      $scope.$digest();
    });
  });

  describe('Function: fetchCarrierPortalUsers', function () {
    it('should make a get with carrierId', function (done) {
      var carrierId = '1234';

      getRes.data = { data: '' };

      carrierApi.fetchCarrierPortalUsers(carrierId).then(function () {
        expect($http.get).toHaveBeenCalledWith(_.template(apiConfig.portalUsers)({ carrierId: carrierId }));
        done();
      });

      $scope.$digest();
    });
  });

  describe('Function: fetchCarrierDriverCount', function () {
    it('should make a get with carrierId', function (done) {
      var carrierId = '1234';
      getRes.data = { data: '' };

      carrierApi.fetchCarrierDriverCount(carrierId).then(function () {
        expect($http.get).toHaveBeenCalledWith(_.template(apiConfig.driverCount)({ carrierId: carrierId }));
        done();
      });

      $scope.$digest();
    });
  });

  describe('Function: fetchDrivers', function () {
    it('should make a get with page number', function (done) {
      var carrierId = '1234',
        page = {
          offset: 1,
          limit: 10
        };
      getRes.data = { data: '' };

      carrierApi.fetchDrivers(carrierId, page).then(function () {
        expect($http.get).toHaveBeenCalledWith(_.template(apiConfig.drivers)({ carrierId: carrierId }), {
          params: {
            offset: page.offset,
            limit: page.limit
          }
        });
        done();
      });

      $scope.$digest();
    });
  });
});
