describe('Resolver: Load Details', function () {
  'use strict';

  var $scope,
    $stateParams,
    loadsApi,
    loadDetailsResolver;

  beforeEach(function () {
    module('echo.index.resolvers.loadDetails', function ($provide) {
      $provide.value('loadsApi', loadsApi = jasmine.createSpyObj('loadsApi', ['fetchLoadDetails', 'fetchActivityLogByLoadId']));
    });

    inject(function ($rootScope, _loadDetailsResolver_) {
      $scope = $rootScope.$new();
      loadDetailsResolver = _loadDetailsResolver_;
    });
  });

  describe('Function: loadId', function () {
    it('should return loadId', function () {
      $stateParams = {
        loadId: 2
      };
      expect(loadDetailsResolver.loadId($stateParams)).toEqual($stateParams.loadId);
    });
  });

  describe('Function: loadDetails', function () {
    it('should call load details endpoint', function () {
      var loadId = 3;

      loadDetailsResolver.loadDetails(loadId);
      expect(loadsApi.fetchLoadDetails).toHaveBeenCalledWith(loadId);
    });
  });

  describe('Function: activityLog', function () {
    it('should call activity log endpoint', function () {
      var loadDetails = {
        loadNumber: 1234
      };
      loadDetailsResolver.activityLog(loadDetails);
      expect(loadsApi.fetchActivityLogByLoadId).toHaveBeenCalledWith(loadDetails.loadNumber);
    });
  });
});
