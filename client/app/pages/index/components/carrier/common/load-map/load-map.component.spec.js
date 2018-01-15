describe('Component: loadMap', function() {
  var scope, component, $q, googleMapsApi, googleMaps, google, mapPoints, googleMapsConst, $state;

  beforeEach(function() {
    module('load-map.component.html');
    module('echo.components.loadMap', function($provide) {
      $provide.value('googleMapsApi', googleMapsApi = jasmine.createSpyObj('googleMapsApi', ['then']));
      $provide.value('googleMaps', googleMaps = jasmine.createSpyObj('googleMaps', ['formatMapPoints', 'resizeAndCenter']));
    });
  });

  beforeEach(inject(function($rootScope, _$q_, $compile, $componentController, _googleMapsConst_, _$state_) {
    scope = $rootScope.$new();
    scope.ctrl = {
      getComponent: jasmine.createSpy('getComponent')
    };

    googleMapsConst = _googleMapsConst_;
    $q = _$q_;
    $state = _$state_;

    google = {
      maps: {
        Geocoder: function() {
          return {};
        }
      }
    };
    mapPoints = [];
    googleMapsApi.then.and.returnValue($q.when({}));
    googleMaps.resizeAndCenter.and.returnValue();

    scope.$digest();

    component = $componentController('loadMap', null, {
      mapPoints: mapPoints
    });
  }));

  describe('Function: $onInit', function() {
    it('should map each map point', function() {
      mapPoints.push({
        loadId: 1234
      });

      component.$onInit();

      expect(mapPoints[0].loadNumber).toBe(mapPoints[0].loadId);
    });

    it('should offset map window', function() {
      component.detailedInfo = true;
      component.$onInit();

      expect(component.popupOffset).toBe(googleMapsConst.detailedInfoOffset);
    });
  });

  describe('Function: $onChanges', function() {

    it('should show loading if changeObj does not contain map', function() {
      component.$onChanges({
        detailedInfo: {
          currentValue: false
        }
      });

      expect(component.showLoading).toBe(true);
    });

    it('should format map points', function() {
      var google = {
        maps: {
          Geocoder: jasmine.createSpy('Geocoder')
        }
      },
      mapSettings = {};

      component.$onChanges({
        showMap: {
          currentValue: true
        }
      });

      googleMaps.formatMapPoints.and.returnValue($q.defer().promise);
      googleMapsApi.then.calls.argsFor(0)[0](google);

      scope.$digest();

      expect(googleMaps.formatMapPoints).toHaveBeenCalled();
    });
  });

  describe('Function: $onChanges', function() {
    it('should return true if this is the load management page', function() {
      $state.current.name = 'index.carrier.loadManagement.activeLoads';

      expect(component.isLoadManagementPage()).toBe(true);
    });

    it('should return true false this is not the load management page', function() {
      $state.current.name = 'index.carrier.dashboard';

      expect(component.isLoadManagementPage()).toBe(false);
    });
  });
});
