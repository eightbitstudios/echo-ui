describe('Api: ActiveLoadsRequestBuilder', function() {
  'use strict';

  var $scope,
    $q,
    $http,
    ActiveLoadsRequestBuilder,
    apiConfig,
    carrierId,
    getRes;

  beforeEach(function() {

    module('echo.api.requestBuilder.activeLoads', function($provide) {
      $provide.value('$http', $http = jasmine.createSpyObj('$http', ['get']));
    });

    inject(function($rootScope, _$q_, _apiConfig_, _ActiveLoadsRequestBuilder_) {
      $scope = $rootScope.$new();
      $q = _$q_;
      apiConfig = _apiConfig_;

      ActiveLoadsRequestBuilder = _ActiveLoadsRequestBuilder_;
    });

    carrierId = 3;

    $http.get.and.returnValue($q.when(getRes = {}));
  });

  it('should create an empty active loads request', function() {
    var activeLoadsRequestBuilder = new ActiveLoadsRequestBuilder(carrierId);

    expect(activeLoadsRequestBuilder._url).toEqual(_.template(apiConfig.activeLoadsPage)({
      carrierId: carrierId
    }));
    expect(activeLoadsRequestBuilder._params).toEqual({});
  });

  describe('Function: fetchActiveLoads', function() {
    it('should add active load params', function() {
      var activeLoadsRequestBuilder = new ActiveLoadsRequestBuilder(carrierId);
      var paging = {
        limit: 10,
        offset: 1
      };

      activeLoadsRequestBuilder.fetchActiveLoads(paging);

      expect(activeLoadsRequestBuilder._params).toEqual({
        limit: paging.limit,
        offset: paging.offset,
        getActiveLoads: true
      });
    });
  });

  describe('Function: filterByPickupsToday', function() {
    it('should add pickup today param', function() {
      var activeLoadsRequestBuilder = new ActiveLoadsRequestBuilder(carrierId);

      activeLoadsRequestBuilder.filterByPickupsToday();

      expect(activeLoadsRequestBuilder._params).toEqual({
        pickupsToday: true
      });
    });
  });

  describe('Function: filterByDeliveriesToday', function() {
    it('should add delivery today param', function() {
      var activeLoadsRequestBuilder = new ActiveLoadsRequestBuilder(carrierId);

      activeLoadsRequestBuilder.filterByDeliveriesToday();

      expect(activeLoadsRequestBuilder._params).toEqual({
        deliveriesToday: true
      });
    });
  });

  describe('Function: fetchMapData', function() {
    it('should add map data param', function() {
      var activeLoadsRequestBuilder = new ActiveLoadsRequestBuilder(carrierId);

      activeLoadsRequestBuilder.fetchMapData();

      expect(activeLoadsRequestBuilder._params).toEqual({
        getMapLoads: true
      });
    });
  });

  describe('Function: hasMapData', function() {
    it('should have map data', function() {
      var activeLoadsRequestBuilder = new ActiveLoadsRequestBuilder(carrierId);

      activeLoadsRequestBuilder.fetchMapData();

      expect(activeLoadsRequestBuilder.hasMapData()).toBeTruthy();
    });

    it('should not have map data', function() {
      var activeLoadsRequestBuilder = new ActiveLoadsRequestBuilder(carrierId);

      expect(activeLoadsRequestBuilder.hasMapData()).toBeFalsy();
    });
  });

  describe('Function: fetchLoadsCount', function() {
    it('should have load count param', function() {
      var activeLoadsRequestBuilder = new ActiveLoadsRequestBuilder(carrierId);

      activeLoadsRequestBuilder.fetchLoadsCount();

      expect(activeLoadsRequestBuilder._params).toEqual({
        getLoadsCount: true
      });
    });
  });

  describe('Function: execute', function() {
    it('should call http get', function() {
      var activeLoadsRequestBuilder = new ActiveLoadsRequestBuilder(carrierId);

      activeLoadsRequestBuilder.execute();

      expect($http.get).toHaveBeenCalled();
    });
  });

});