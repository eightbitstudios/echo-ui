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
        expect($http.get).toHaveBeenCalledWith(_.template(apiConfig.unbilledLoadsByCarrierId)({ carrierId: carrierId }), {
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
        driverNeeded = false,
        cancelled = false;

      loadsApi.fetchUpcomingLoads(carrierId, paging, driverNeeded, cancelled).then(function () {
        expect($http.get).toHaveBeenCalledWith(_.template(apiConfig.upcomingLoadsByCarrierId)({ carrierId: carrierId }), {
          params: {
            limit: paging.limit,
            offset: paging.offset,
            driverNeeded: driverNeeded,
            cancelled: cancelled
          }
        });
        done();
      });

      $scope.$digest();
    });
  });

  describe('Function: fetchLoadsBySearchText', function () {
    it('should make a get request to fetch loads by search text', function (done) {
      getRes.data = { data: '' };
      var carrierId = 1,
        paging = {
          limit: 10,
          offset: 1
        },
        searchText = 'test';

      loadsApi.fetchLoadsBySearchText(carrierId, searchText, paging).then(function () {
        expect($http.get).toHaveBeenCalledWith(_.template(apiConfig.loadsBySearchText)({ carrierId: carrierId, searchText: searchText }), {
          params: {
            limit: paging.limit,
            offset: paging.offset
          }
        });
        done();
      });

      $scope.$digest();
    });
  });

  describe('Function: fetchLoadDetails', function () {
    it('should make a get request to fetch load details', function (done) {
      getRes.data = { data: '' };
      var loadId = 1;

      loadsApi.fetchLoadDetails(loadId).then(function () {
        expect($http.get).toHaveBeenCalledWith(_.template(apiConfig.loadById)({ loadId: loadId }));
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
        expect($http.get).toHaveBeenCalledWith(_.template(apiConfig.loadCountByCarrierId)({ carrierId: carrierId }));
        done();
      });

      $scope.$digest();
    });
  });

  describe('Function: assignDriver', function () {
    it('should make a post request to assign drivers', function (done) {
      postRes.data = { data: '' };
      var loadId = 1,
        driverId = 2;

      loadsApi.assignDriver(loadId, driverId).then(function () {
        expect($http.post).toHaveBeenCalledWith(_.template(apiConfig.assignDriverByLoadId)({ loadId: loadId, userId: driverId }));
        done();
      });

      $scope.$digest();
    });
  });

  describe('Function: unassignDriver', function () {
    it('should make a put request to unassign drivers', function (done) {
      putRes.data = { data: '' };
      var loadId = 1;

      loadsApi.unassignDriver(loadId).then(function () {
        expect($http.put).toHaveBeenCalledWith(_.template(apiConfig.unassignDriverByLoadId)({ loadId: loadId }));
        done();
      });

      $scope.$digest();
    });
  });

  describe('Function: reassignDriver', function () {
    it('should make a put request to reassign drivers', function (done) {
      putRes.data = { data: '' };
      var loadId = 1,
        driverId = 2;

      loadsApi.reassignDriver(loadId, driverId).then(function () {
        expect($http.put).toHaveBeenCalledWith(_.template(apiConfig.reassignDriverByLoadId)({ loadId: loadId, userId: driverId }));
        done();
      });

      $scope.$digest();
    });
  });

  describe('Function: fetchUnassignedDriversByLoadId', function () {
    it('should make a get unassigned drivers', function (done) {
      getRes.data = { data: '' };
      var loadId = 1,
        carrierId = 2;

      loadsApi.fetchUnassignedDriversByLoadId(loadId, carrierId).then(function () {
        expect($http.get).toHaveBeenCalledWith(_.template(apiConfig.unassignedDriversByLoadId)({ loadId: loadId, carrierId: carrierId }));
        done();
      });

      $scope.$digest();
    });
  });

  describe('Function: fetchDriverStatusByLoadId', function () {
    it('should make a get driver status', function (done) {
      getRes.data = { data: '' };
      var loadId = 1,
        driverId = 2;

      loadsApi.fetchDriverStatusByLoadId(loadId, driverId).then(function () {
        expect($http.get).toHaveBeenCalledWith(_.template(apiConfig.driverStatusByLoadId)({ loadId: loadId, userId: driverId }));
        done();
      });

      $scope.$digest();
    });
  });

  describe('Function: fetchActivityLogByLoadId', function () {
    it('should get activity log', function (done) {
      getRes.data = {
        data: [{
          id: 1
        }]
      };
      var loadId = 1;

      loadsApi.fetchActivityLogByLoadId(loadId).then(function () {
        expect($http.get).toHaveBeenCalledWith(_.template(apiConfig.activityLogByLoadId)({ loadId: loadId }));
        done();
      });

      $scope.$digest();
    });
  });

  describe('Function: createReportEmpty', function () {
    it('should post report empty', function (done) {
      postRes.data = { data: '' };
      var loadGuid = 1,
        reportEmpty = {
          lastAction: '09/24/2016'
        };

      loadsApi.createReportEmpty(loadGuid, reportEmpty).then(function () {
        expect($http.post).toHaveBeenCalledWith(_.template(apiConfig.reportEmptyByLoadGuid)({ loadGuid: loadGuid }), reportEmpty);
        done();
      });

      $scope.$digest();
    });
  });

  describe('Function: createReportLocation', function () {
    it('should post report location', function (done) {
      postRes.data = { data: '' };
      var loadGuid = 1,
        reportLocation = {
          location: 'Chicago'
        };

      loadsApi.createReportLocation(loadGuid, reportLocation).then(function () {
        expect($http.post).toHaveBeenCalledWith(_.template(apiConfig.reportLocation)({ loadGuid: loadGuid }), reportLocation);
        done();
      });

      $scope.$digest();
    });
  });

  describe('Function: createReportTrailer', function () {
    it('should post report trailer', function (done) {
      postRes.data = { data: '' };
      var loadGuid = 1,
        reportTrailer = {
          stopType: 'Drop'
        };

      loadsApi.createReportTrailer(loadGuid, reportTrailer).then(function () {
        expect($http.post).toHaveBeenCalledWith(_.template(apiConfig.reportTrailerByLoadGuid)({ loadGuid: loadGuid }), reportTrailer);
        done();
      });

      $scope.$digest();
    });
  });

  describe('Function: createReportLoaded', function () {
    it('should post report loaded', function (done) {
      postRes.data = { data: '' };
      var loadGuid = 1,
        reportLoaded = {
          stopType: 'Drop'
        };

      loadsApi.createReportLoaded(loadGuid, reportLoaded).then(function () {
        expect($http.post).toHaveBeenCalledWith(_.template(apiConfig.reportLoadedByLoadGuid)({ loadGuid: loadGuid }), reportLoaded);
        done();
      });

      $scope.$digest();
    });
  });

  describe('Function: updateProNumber', function () {
    it('should update pro number', function (done) {
      putRes.data = { data: '' };
      var loadId = 1,
        payload = {
          proNumber: 123
        };

      loadsApi.updateProNumber(loadId, payload).then(function () {
        expect($http.put).toHaveBeenCalledWith(_.template(apiConfig.proNumberByLoadId)({ loadId: loadId }), payload);
        done();
      });

      $scope.$digest();
    });
  });

  describe('Function: fetchReportLoadedByLoadGuid', function () {
    it('should fetch report loaded', function (done) {
      getRes.data = { data: '' };
      var loadGuid = 1;

      loadsApi.fetchReportLoadedByLoadGuid(loadGuid).then(function () {
        expect($http.get).toHaveBeenCalledWith(_.template(apiConfig.reportLoadedByLoadGuid)({ loadGuid: loadGuid }));
        done();
      });

      $scope.$digest();
    });
  });

  describe('Function: fetchItemsByLoadGuid', function () {
    it('should fetch items by load guid', function (done) {
      getRes.data = { data: '' };
      var loadGuid = 1;

      loadsApi.fetchItemsByLoadGuid(loadGuid).then(function () {
        expect($http.get).toHaveBeenCalledWith(_.template(apiConfig.itemsByLoadGuid)({ loadGuid: loadGuid }));
        done();
      });

      $scope.$digest();
    });
  });

  describe('Function: fetchReportEmptyByLoadGuid', function () {
    it('should fetch items by load guid', function (done) {
      getRes.data = { data: '' };
      var loadGuid = 1;

      loadsApi.fetchReportEmptyByLoadGuid(loadGuid).then(function () {
        expect($http.get).toHaveBeenCalledWith(_.template(apiConfig.reportEmptyByLoadGuid)({ loadGuid: loadGuid }));
        done();
      });

      $scope.$digest();
    });
  });

  describe('Function: updateTrailerNumber', function () {
    it('should update trailer number', function (done) {
      putRes.data = { data: '' };
      var loadGuid = 1,
        payload = {
          trailerNumber: '124123'
        };

      loadsApi.updateTrailerNumber(loadGuid, payload).then(function () {
        expect($http.put).toHaveBeenCalledWith(_.template(apiConfig.trailerNumberByLoadId)({ loadId: loadGuid }), payload);
        done();
      });

      $scope.$digest();
    });
  });

  describe('Function: createReportArrivalByLoadGuid', function () {
    it('should update report arrival', function (done) {
      postRes.data = { data: '' };
      var loadGuid = 1,
        reportArrival = {
          date: '10/24/2016'
        };

      loadsApi.createReportArrivalByLoadGuid(loadGuid, reportArrival).then(function () {
        expect($http.post).toHaveBeenCalledWith(_.template(apiConfig.reportArrivalByLoadGuid)({ loadGuid: loadGuid }), reportArrival);
        done();
      });

      $scope.$digest();
    });
  });

  describe('Function: fetchReportArrivalByLoadGuid', function () {
    it('should get report arrival', function (done) {
      getRes.data = { data: '' };
      var loadGuid = 1;

      loadsApi.fetchReportArrivalByLoadGuid(loadGuid).then(function () {
        expect($http.get).toHaveBeenCalledWith(_.template(apiConfig.reportArrivalByLoadGuid)({ loadGuid: loadGuid }));
        done();
      });

      $scope.$digest();
    });
  });

  describe('Function: fetchLoadUpdateOptionsByLoadGuid', function () {
    it('should get load options', function (done) {
      getRes.data = { data: '' };
      var loadGuid = 1;

      loadsApi.fetchLoadUpdateOptionsByLoadGuid(loadGuid).then(function () {
        expect($http.get).toHaveBeenCalledWith(_.template(apiConfig.loadUpdateOptionsByLoadGuid)({ loadGuid: loadGuid }));
        done();
      });

      $scope.$digest();
    });
  });

  describe('Function: fetchReportDeliveredByLoadGuid', function () {
    it('should get report delivery', function (done) {
      getRes.data = { data: '' };
      var loadGuid = 1;

      loadsApi.fetchReportDeliveredByLoadGuid(loadGuid).then(function () {
        expect($http.get).toHaveBeenCalledWith(_.template(apiConfig.reportDeliveredByLoadGuid)({ loadGuid: loadGuid }));
        done();
      });

      $scope.$digest();
    });
  });

  describe('Function: createReportDelivered', function () {
    it('should create report delivery', function (done) {
      postRes.data = { data: '' };
      var loadGuid = 1,
        reportDelivery = {
          date: '09/20/2016'
        };

      loadsApi.createReportDelivered(loadGuid, reportDelivery).then(function () {
        expect($http.post).toHaveBeenCalledWith(_.template(apiConfig.reportDeliveredByLoadGuid)({ loadGuid: loadGuid }), reportDelivery);
        done();
      });

      $scope.$digest();
    });
  });

  describe('Function: fetchEquipmentByLoadId', function () {
    it('should get equipment', function (done) {
      getRes.data = { data: '' };
      var loadGuid = 1;

      loadsApi.fetchEquipmentByLoadId(loadGuid).then(function () {
        expect($http.get).toHaveBeenCalledWith(_.template(apiConfig.equipmentByLoadId)({ loadId: loadGuid }));
        done();
      });

      $scope.$digest();
    });
  });

  describe('Function: createFeedback', function () {
    it('should post feedback', function (done) {
      postRes.data = { data: '' };
      var loadGuid = 1,
        starRatings = 4,
        comment = 'test comment';

      loadsApi.createFeedback(loadGuid, starRatings, comment).then(function () {
        expect($http.post).toHaveBeenCalledWith(_.template(apiConfig.feedbackByLoadGuid)({ loadGuid: loadGuid }), {
          starRatings: starRatings,
          comment: comment
        });
        done();
      });

      $scope.$digest();
    });
  });
});
