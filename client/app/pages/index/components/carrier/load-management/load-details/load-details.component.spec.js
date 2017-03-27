describe('Component: loadDetails', function() {
  var component, $scope, $stateParams, loadsApi, store$, $q;

  beforeEach(function() {
    module('echo.index.carrier.loadManagement.loadDetails', function($provide) {
      $provide.value('load-details.component.html', '');
      $provide.value('$stateParams', $stateParams = {});
      $provide.constant('loadsApi',
        loadsApi = jasmine.createSpyObj('loadsApi', ['fetchMapPointByLoadGuid', 'fetchLoadDetails']));
      $provide.constant('store$',
        store$ = jasmine.createSpyObj('store$', ['getState', 'subscribe', 'dispatch']));
    });

    inject(function($rootScope, $componentController, _$q_) {
      $scope = $rootScope.$new();
      $q = _$q_;

      $scope.ctrl = {
        getComponent: jasmine.createSpy('getComponent')
      };

      store$.getState.and.returnValue({
        carrier: {}
      });

      component = $componentController('loadDetails', null, {});
    });
  });

  describe('Function: $onInit', function() {
    it('should fetch load details', function() {
      spyOn(component, 'fetchLoadDetails');
      component.$onInit();
      expect(component.fetchLoadDetails).toHaveBeenCalled();
    });
  });

  describe('Function: getMapPoint', function() {
    it('should show map point', function() {
      var mapPoint = {
        mapId: 2
      };
      component.loadDetails = {
        loadGuid: 'ABC'
      };

      loadsApi.fetchMapPointByLoadGuid.and.returnValue($q.when(mapPoint));

      component.getMapPoint();
      $scope.$digest();
      expect(component.mapPoints).toEqual([mapPoint]);
    });

    it('should not show map point if load doesnt have one', function() {
      var mapPoint = null;
      component.loadDetails = {
        loadGuid: 'ABC'
      };

      loadsApi.fetchMapPointByLoadGuid.and.returnValue($q.when(mapPoint));

      component.getMapPoint();
      $scope.$digest();
      expect(component.mapPoints).toEqual([]);
    });
  });

  describe('Function: fetchLoadDetails', function() {
    it('should show map point', function() {
      component.loadId = {
        loadGuid: 1234
      };

      var loadDetails = {};

      loadsApi.fetchLoadDetails.and.returnValue($q.when(loadDetails));
      spyOn(component, 'getMapPoint');

      component.fetchLoadDetails();
      $scope.$digest();
      expect(component.loadDetails).toEqual(loadDetails);
    });
  });
});