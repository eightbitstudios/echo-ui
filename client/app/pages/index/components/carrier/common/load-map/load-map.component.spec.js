describe('Component: loadMap', function() {
  var scope, component, $q, googleMapsApi, googleMaps, google, mapPoints, googleMapsConst;

  beforeEach(function() {
    module('load-map.component.html');
    module('echo.components.loadMap', function($provide) {
      $provide.value('googleMapsApi', googleMapsApi = jasmine.createSpyObj('googleMapsApi', ['then']));
      $provide.value('googleMaps', googleMaps = jasmine.createSpyObj('googleMaps', ['formatMapPoints', 'resizeAndCenter']));
    });
  });

  beforeEach(inject(function($rootScope, _$q_, $compile, $componentController, _googleMapsConst_) {
    scope = $rootScope.$new();
    scope.ctrl = {
      getComponent: jasmine.createSpy('getComponent')
    };

    googleMapsConst = _googleMapsConst_;
    $q = _$q_;

    google = {
      maps: {
        Geocoder: function() {
          return {};
        }
      }
    };
    mapPoints = [];
    googleMapsApi.then.and.returnValue($q.when());
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
      };

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

    it('should filter out bad map points', function() {
      var google = {
        maps: {
          Geocoder: jasmine.createSpy('Geocoder')
        }
      };

      component.mapPoints.push({
        position: 10
      });
      component.$onChanges({
        showMap: {
          currentValue: true
        }
      });

      component.mapPoints.push({});

      googleMaps.formatMapPoints.and.returnValue($q.when());
      googleMapsApi.then.calls.argsFor(0)[0](google);

      scope.$digest();

      expect(component.mapPoints.length).toBe(1);
    });
  });
});