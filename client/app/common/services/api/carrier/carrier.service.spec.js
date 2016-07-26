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
            'RepId': repId
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
        expect($http.get).toHaveBeenCalledWith(apiConfig.carrierById({ carrierId: carrierId }));
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
        expect($http.get).toHaveBeenCalledWith(apiConfig.portalUsers({ carrierId: carrierId }));
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
        expect($http.get).toHaveBeenCalledWith(apiConfig.driverCount({ carrierId: carrierId }));
        done();
      });

      $scope.$digest();
    });
  });

  describe('Function: fetchDrivers', function () {
    it('should make a get with page and searchText', function (done) {
      var carrierId = '1234',
        page = 1,
        searchText = 'Test';
      getRes.data = { data: '' };

      carrierApi.fetchDrivers(carrierId, page, searchText).then(function () {
        expect($http.get).toHaveBeenCalledWith(apiConfig.drivers({ carrierId: carrierId }), {
          params: {
            page: page,
            searchText: searchText
          }
        });
        done();
      });

      $scope.$digest();
    });
  });
});
