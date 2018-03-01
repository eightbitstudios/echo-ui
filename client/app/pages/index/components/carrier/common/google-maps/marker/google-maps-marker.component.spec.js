describe('Component: googleMapsMarker', function () {
  var scope, component, $q, googleMapsApi, google, mapsCtrl;

  beforeEach(function () {
    module('echo.components.googleMapsMarker', function ($provide) {
      $provide.value('googleMapsApi', googleMapsApi = {then: function(callback) {callback(google);}});
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
        Marker: jasmine.createSpy('Marker'),
        Point: jasmine.createSpy('Point')
      }
    };

    mapsCtrl = {
      map: {
        fitBounds: jasmine.createSpy('fitBounds')
      },
      bounds: {
        extend: jasmine.createSpy('extend')
      }
    };

    component = $componentController('googleMapsMarker', null, {
      position: {lat: 30, lng: 50},
      mapsCtrl: mapsCtrl
    });
  }));

  describe('Function: $onInit', function () {
    it('should set the marker and extend bounds, but not fit bounds', function () {
      mapsCtrl.totalPoints = 1;
      component.$onInit();

      expect(google.maps.Marker).toHaveBeenCalled();
      expect(google.maps.Point).toHaveBeenCalledWith(22,22);
      expect(mapsCtrl.bounds.extend).toHaveBeenCalledWith(component.position);
      expect(mapsCtrl.map.fitBounds).not.toHaveBeenCalled();
    });

    it('should set the marker and extend bounds, and also fit bounds', function () {
      mapsCtrl.totalPoints = 3;
      component.$onInit();

      expect(google.maps.Marker).toHaveBeenCalled();
      expect(google.maps.Point).toHaveBeenCalledWith(22,22);
      expect(mapsCtrl.bounds.extend).toHaveBeenCalledWith(component.position);
      expect(mapsCtrl.map.fitBounds).toHaveBeenCalledWith(mapsCtrl.bounds);
    });
  });

});
