describe('Api: loadsApi', function () {
  'use strict';

  var $scope,
    $q,
    $http,
    loadsApi,
    apiConfig,
    getRes,
    postRes,
    putRes,
    deleteRes;

  beforeEach(function () {

    module('echo.api.loads', function ($provide) {
      $provide.value('$http', $http = jasmine.createSpyObj('$http', ['get', 'post', 'put', 'delete']));
    });

    inject(function ($rootScope, _$q_, _apiConfig_, _loadsApi_) {
      $scope = $rootScope.$new();
      $q = _$q_;
      apiConfig = _apiConfig_;

      loadsApi = _loadsApi_;
    });

    $http.get.and.returnValue($q.when(getRes = {}));
    $http.post.and.returnValue($q.when(postRes = {}));
    $http.put.and.returnValue($q.when(putRes = {}));
    $http.delete.and.returnValue($q.when(deleteRes = {}));
  });

  describe('Function: fetchAvailableLoads', function () {
    it('should make a get request to fetch available loads', function (done) {
      getRes.data = { data: '' };
      var carrierId = 1,
        paging = {
          limit: 10,
          offset: 1,
        },
        pickupsToday = false,
        deliveriesToday = false;

      loadsApi.fetchAvailableLoads(carrierId, paging, pickupsToday, deliveriesToday).then(function () {
        expect($http.get).toHaveBeenCalledWith(apiConfig.availableLoadsByCarrierId({ carrierId: carrierId }),
          {
            params: {
              limit: paging.limit,
              offset: paging.offset,
              pickupsToday: pickupsToday,
              deliveriesToday: deliveriesToday
            }
          });
        done();
      });

      $scope.$digest();
    });
  });

  describe('Function: fetchUnbilledLoads', function () {
    it('should make a get request to fetch unbilled loads', function (done) {
      getRes.data = { data: '' };
      var carrierId = 1,
        paging = {
          limit: 10,
          offset: 1
        },
        podNeeded = false,
        invoiceNeeded = false;

      loadsApi.fetchUnbilledLoads(carrierId, paging, podNeeded, invoiceNeeded).then(function () {
        expect($http.get).toHaveBeenCalledWith(apiConfig.unbilledLoadsByCarrierId({ carrierId: carrierId }), {
          params: {
            limit: paging.limit,
            offset: paging.offset,
            podNeeded: podNeeded,
            invoiceNeeded: invoiceNeeded
          }
        });
        done();
      });

      $scope.$digest();
    });
  });

  describe('Function: fetchUpcomingLoads', function () {
    it('should make a get request to fetch available loads', function (done) {
      getRes.data = { data: '' };
      var carrierId = 1,
        paging = {
          limit: 10,
          offset: 1
        },
        driverNeeded = false;

      loadsApi.fetchUpcomingLoads(carrierId, paging, driverNeeded).then(function () {
        expect($http.get).toHaveBeenCalledWith(apiConfig.upcomingLoadsByCarrierId({ carrierId: carrierId }), {
          params: {
            limit: paging.limit,
            offset: paging.offset,
            driverNeeded: driverNeeded
          }
        });
        done();
      });

      $scope.$digest();
    });
  });

  describe('Function: fetchLoadCount', function () {
    it('should make a get request to fetch available loads', function (done) {
      getRes.data = { data: '' };
      var carrierId = 1;

      loadsApi.fetchLoadCount(carrierId).then(function () {
        expect($http.get).toHaveBeenCalledWith(apiConfig.loadCountByCarrierId({ carrierId: carrierId }));
        done();
      });

      $scope.$digest();
    });
  });
});
