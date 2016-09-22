describe('Resolver: Load Management', function () {
  'use strict';

  var $scope,
    loadsApi,
    loadManagementResolver;

  beforeEach(function () {
    module('echo.index.resolvers.loadManagement', function ($provide) {
      $provide.value('loadsApi', loadsApi = jasmine.createSpyObj('loadsApi', ['fetchLoadCount']));
    });

    inject(function ($rootScope, _loadManagementResolver_) {
      $scope = $rootScope.$new();
      loadManagementResolver = _loadManagementResolver_;
    });
  });

  describe('Function: loadCounts', function () {
    it('should call load counts endpoint', function () {
      var carrierId = 3;
      loadManagementResolver.loadCounts(carrierId);
      expect(loadsApi.fetchLoadCount).toHaveBeenCalledWith(carrierId);
    });
  });
});
