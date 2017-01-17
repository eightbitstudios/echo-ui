describe('Api: DashboardRequestBuilder', function() {
  'use strict';

  var $scope,
    $q,
    $http,
    DashboardRequestBuilder,
    apiConfig,
    carrierId,
    getRes;

  beforeEach(function() {

    module('echo.api.requestBuilder.dashboard', function($provide) {
      $provide.value('$http', $http = jasmine.createSpyObj('$http', ['get']));
    });

    inject(function($rootScope, _$q_, _apiConfig_, _DashboardRequestBuilder_) {
      $scope = $rootScope.$new();
      $q = _$q_;
      apiConfig = _apiConfig_;

      DashboardRequestBuilder = _DashboardRequestBuilder_;
    });

    carrierId = 3;

    $http.get.and.returnValue($q.when(getRes = {}));
  });

  it('should create an empty active loads request', function() {
    var dashboardRequestBuilder = new DashboardRequestBuilder(carrierId);

    expect(dashboardRequestBuilder._url).toEqual(apiConfig.loadDashboard({
      carrierId: carrierId
    }));

    expect(dashboardRequestBuilder._params).toEqual({});
  });

  describe('Function: fetchSingleStopLoads', function() {
    it('should add single stop load params', function() {
      var dashboardRequestBuilder = new DashboardRequestBuilder(carrierId);
      var paging = {
        limit: 10,
        offset: 1
      };

      dashboardRequestBuilder.fetchSingleStopLoads(paging);

      expect(dashboardRequestBuilder._params).toEqual({
        getSingleStopLoads: true,
        singleStopLoadsLimit: paging.limit,
        singleStopLoadsOffset: paging.offset,
      });
    });
  });

  describe('Function: fetchMultiStopLoads', function() {
    it('should add multi stop load params', function() {
      var dashboardRequestBuilder = new DashboardRequestBuilder(carrierId);
      var paging = {
        limit: 10,
        offset: 1
      };

      dashboardRequestBuilder.fetchMultiStopLoads(paging);

      expect(dashboardRequestBuilder._params).toEqual({
        getMultiStopLoads: true,
        multiStopLoadsLimit: paging.limit,
        multiStopLoadsOffset: paging.offset,
      });
    });
  });

  describe('Function: fetchDashboardPage', function() {
    it('should add all query parameters', function() {
      var dashboardRequestBuilder = new DashboardRequestBuilder(carrierId);

      var singleStopPage = {
        limit: 10,
        offset: 1
      };

      var multiStopPage = {
        limit: 20,
        offset: 1
      };

      dashboardRequestBuilder.fetchDashboardPage(singleStopPage, multiStopPage);

      expect(dashboardRequestBuilder._params).toEqual({
        getSingleStopLoads: true,
        singleStopLoadsLimit: singleStopPage.limit,
        singleStopLoadsOffset: singleStopPage.offset,
        getMultiStopLoads: true,
        multiStopLoadsLimit: multiStopPage.limit,
        multiStopLoadsOffset: multiStopPage.offset,
        getMapLoads: true,
        getActiveLoadsCount: true
      });
    });
  });

  describe('Function: fetchMapData', function() {
    it('should add map data param', function() {
      var dashboardRequestBuilder = new DashboardRequestBuilder(carrierId);

      dashboardRequestBuilder.fetchMapData();

      expect(dashboardRequestBuilder._params).toEqual({
        getMapLoads: true
      });
    });
  });

  describe('Function: hasMapData', function() {
    it('should have map data', function() {
      var dashboardRequestBuilder = new DashboardRequestBuilder(carrierId);

      dashboardRequestBuilder.fetchMapData();

      expect(dashboardRequestBuilder.hasMapData()).toBeTruthy();
    });

    it('should not have map data', function() {
      var dashboardRequestBuilder = new DashboardRequestBuilder(carrierId);

      expect(dashboardRequestBuilder.hasMapData()).toBeFalsy();
    });
  });

  describe('Function: fetchActiveLoadsCount', function() {
    it('should have load count param', function() {
      var dashboardRequestBuilder = new DashboardRequestBuilder(carrierId);

      dashboardRequestBuilder.fetchActiveLoadsCount();

      expect(dashboardRequestBuilder._params).toEqual({
        getActiveLoadsCount: true
      });
    });
  });

  describe('Function: execute', function() {
    it('should call http get', function() {
      var dashboardRequestBuilder = new DashboardRequestBuilder(carrierId);

      dashboardRequestBuilder.execute();

      expect($http.get).toHaveBeenCalled();
    });
  });

});