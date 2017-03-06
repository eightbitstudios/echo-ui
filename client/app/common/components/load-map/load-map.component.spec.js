
describe('Component: loadMap', function () {
  var scope, component, $q, googleMapsApi, googleMaps, google;

  beforeEach(function () {
    module('app/common/components/load-map/load-map.component.html');
    module('echo.components.loadMap', function ($provide) {
      $provide.value('googleMapsApi', googleMapsApi = {});
      $provide.value('googleMaps', googleMaps = jasmine.createSpyObj('googleMaps', ['formatMapPoints', 'resizeAndCenter']));
    });
  });

  beforeEach(inject(function ($rootScope, _$q_, $compile, $componentController) {
    scope = $rootScope.$new();
    scope.ctrl = {
      getComponent: jasmine.createSpy('getComponent')
    };

    $q = _$q_;

    google = {
      maps: {
        Geocoder: function () { return {}; }
      }
    };
    googleMapsApi.then = function() { return $q.when({lat: function() { return 30; }, lng: function() { return 50; }}); };
    googleMaps.resizeAndCenter.and.returnValue();

    scope.$digest();

    component = $componentController('loadMap', null, {});
  }));

  describe('Function: $onChanges', function () {

    it('should show loading if changeObj does not contain map', function () {
      component.$onChanges({detailedInfo: {currentValue: false}});

      expect(component.showLoading).toBe(true);
    });

    it('should set mapCenter on showMap', function () {
      component.$onChanges({showMap: {currentValue: true}});

      scope.$digest();

      expect(component.showLoading).toBe(false);
      expect(component.mapCenter.lat()).toBe(30);
      expect(component.mapCenter.lng()).toBe(50);
    });

  });

});
