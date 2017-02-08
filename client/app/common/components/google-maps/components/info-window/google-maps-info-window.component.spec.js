describe('Component: googleMapsInfoWindow', function () {
  var scope, component, $q, $element, googleMapsApi, google, mapsCtrl, markerCtrl;

  beforeEach(function () {
    module('echo.components.googleMapsInfoWindow', function ($provide) {
      $provide.value('$element', $element = [{}]);
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
        InfoWindow: jasmine.createSpy('InfoWindow'),
        Size: jasmine.createSpy('Size')
      }
    };

    mapsCtrl = {
      map: {},
      popupOffset: {
        x: 17,
        y: 38
      }
    };

    markerCtrl = {
      marker: {
        addListener: jasmine.createSpy('addListener')
      }
    };

    component = $componentController('googleMapsInfoWindow', null, {
      mapsCtrl: mapsCtrl,
      markerCtrl: markerCtrl
    });
  }));

  describe('Function: $onInit', function () {
    it('should create a new info window', function () {
      component.$onInit();

      expect(google.maps.InfoWindow).toHaveBeenCalled();
      expect(google.maps.Size).toHaveBeenCalledWith(mapsCtrl.popupOffset.x, mapsCtrl.popupOffset.y);
      expect(markerCtrl.marker.addListener).toHaveBeenCalled();
    });
  });

});
