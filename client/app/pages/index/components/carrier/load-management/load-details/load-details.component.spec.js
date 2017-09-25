describe('Component: loadDetails', function() {
  var component, $scope, $stateParams, invoicesApi, loadsApi, store$, $q;

  beforeEach(function() {
    module('echo.index.carrier.loadManagement.loadDetails', function($provide) {
      $provide.value('load-details.component.html', '');
      $provide.value('$stateParams', $stateParams = {});
      $provide.constant('invoicesApi',
        invoicesApi = jasmine.createSpyObj('invoicesApi', ['fetchInvoiceDetailsByLoadId']));
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
        "loadGuid": "59dbd4d4f0ae4c709e0e5b2b3bc7d78e",
        "loadNumber": 22229769,
        "pickUp": [{
          "city": "CHICAGO",
          "state": "IL",
          "startDate": "08/07/2017 3:00:00 PM"
        }],
        "delivery": [{
          "city": "BEVERLY HILLS",
          "state": "CA",
          "startDate": "09/07/2017 1:40:00 PM"
        }]};

      loadsApi.fetchMapPointByLoadGuid.and.returnValue($q.when(mapPoint));

      component.getMapPoint();
      $scope.$digest();
      expect(component.mapPoints.length).toEqual(2);
      expect(component.mapPoints[0].isOrigin()).toBeTruthy();
      expect(component.mapPoints[1].isDestination()).toBeTruthy();
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

      invoicesApi.fetchInvoiceDetailsByLoadId.and.returnValue($q.when(loadDetails));
      loadsApi.fetchLoadDetails.and.returnValue($q.when(loadDetails));
      spyOn(component, 'getMapPoint');

      component.fetchLoadDetails();
      $scope.$digest();
      expect(component.loadDetails).toEqual(loadDetails);
    });
  });
});
