describe('Component: google-maps-polyline', function () {
  var component, scope, $componentController;
  var polyLineSpy;
  var MapPointModel, StopScheduleModel;
  var completeSchedule, incompleteSchedule;

  beforeEach( function() {
    module('echo.components.googleMapsPolyline');
    module('echo.models.mapPointModel');
    module('echo.models.stopScheduleModel');
    module('echo.services.googleMapsApi.mock');
  });

  describe('controller', function () {

    beforeEach(inject(function ($rootScope, _$componentController_, _MapPointModel_, _StopScheduleModel_) {
      scope = $rootScope.$new();

      $componentController = _$componentController_;
      MapPointModel = _MapPointModel_;
      StopScheduleModel = _StopScheduleModel_;
      polyLineSpy = jasmine.createSpy('polyLineSpy');
      google.maps.Polyline = polyLineSpy;

      completeSchedule = new StopScheduleModel({actualArrival: new moment(), actualDeparture: new moment()});
      incompleteSchedule = new StopScheduleModel({actualArrival: null, actualDeparture: null});

    }));

    afterEach(function() {
      google = {maps: {}};
    });

    describe('when there is with NO mapPoints', function () {
      beforeEach(function() {
        var mapPoints = [];

        component = $componentController('googleMapsPolyline', null, {
          mapPoints: mapPoints,
          loadStatusCode: 'PickedUp'
        });

        component.mapsCtrl = { map: {}};

        component.$onInit();
        scope.$digest();
      });

      it('compileRoutes() SHOULD compile the incomplete route for ', function() {
        expect(component.incompleteRoute).toEqual([ ]);
      });

      it('compileRoutes() SHOULD compile the complete route', function() {
        expect(component.completedRoute).toEqual([ ]);
      });

    });

    describe('when there is a stop with  ORIGIN, DESTINATION, and TRACK_AND_TRACE', function () {
      beforeEach(function() {
        var mp1 = new MapPointModel({mapPointType: 'ORIGIN', schedule: new StopScheduleModel({appointmentStart: new Date(1), actualArrival: new Date(1)})});
        var mp2 = new MapPointModel({mapPointType: 'DESTINATION', schedule: new StopScheduleModel({appointmentStart: new Date(1802002293333)})});
        var mp3 = new MapPointModel({mapPointType: 'INCOMPLETE', schedule: new StopScheduleModel({appointmentStart: new Date(1802002283332)})});
        var mp4 = new MapPointModel({mapPointType: 'CURRENT_LOCATION', schedule: new StopScheduleModel({appointmentStart: new Date(2), actualArrival: new Date(2)})});

        mp1.position = {lat: 1, lng: 1};
        mp2.position = {lat: 5, lng: 5};
        mp3.position = {lat: 4, lng: 4};
        mp4.position = {lat: 3, lng: 3};

        var mapPoints = [
          mp1, mp4, mp3, mp2
        ];

        component = $componentController('googleMapsPolyline', null, {
          mapPoints: mapPoints,
          loadStatusCode: 'PickedUp'
        });
        component.mapsCtrl = { map: {}};

        component.$onInit();
        scope.$digest();
      });

      it('should create a Polyline', function() {
        expect(polyLineSpy).toHaveBeenCalled();
      });

      it('compileRoutes() SHOULD compile the incomplete route for ', function() {
        expect(component.incompleteRoute).toEqual([{ lat: 3, lng: 3 }, {lat: 4, lng: 4},{lat: 5, lng:5}]);
      });

      it('compileRoutes() SHOULD compile the complete route', function() {
        expect(component.completedRoute).toEqual([{lat: 1, lng: 1},{lat: 3, lng: 3}]);
      });

    });

    describe('when the load is not delivered and there is an ORIGIN, DESTINATION', function () {
      beforeEach(function() {

        var mp1 = new MapPointModel({mapPointType: 'ORIGIN', schedule: new StopScheduleModel({appointmentStart: new Date(1802002293333)})});
        var mp2 = new MapPointModel({mapPointType: 'DESTINATION', schedule: new StopScheduleModel({appointmentStart: new Date(1802002293333)})});
        mp1.position = {lat: 1, lng: 1};
        mp2.position = {lat: 3, lng: 3};
        var mapPoints = [
          mp1, mp2
        ];

        component = $componentController('googleMapsPolyline', null, {
          mapPoints: mapPoints,
          loadStatusCode: 'Unloading'
        });

        component.mapsCtrl = { map: {}};

        component.$onInit();
        scope.$digest();
      });

      it('should create a Polyline', function() {
        expect(polyLineSpy).toHaveBeenCalled();
      });

      it('compileRoutes() SHOULD compile the incomplete route for ', function() {
        expect(component.incompleteRoute).toEqual([{lat: 1, lng: 1}, {lat: 3, lng: 3}]);
      });

      it('compileRoutes() SHOULD compile the complete route', function() {
        expect(component.completedRoute).toEqual([]);
      });

    });

    describe('when the load is DELIVERED and there is with ORIGIN, DESTINATION', function () {
      beforeEach(function() {
        var mp1 = new MapPointModel({mapPointType: 'ORIGIN', schedule: new StopScheduleModel({appointmentStart: new Date(1), actualArrival: new Date(1)})});
        var mp2 = new MapPointModel({mapPointType: 'DESTINATION', schedule: new StopScheduleModel({appointmentStart: new Date(2), actualArrival: new Date(2)})});
        mp1.position = {lat: 1, lng: 1};
        mp2.position = {lat: 3, lng: 3};
        var mapPoints = [
          mp1, mp2
        ];

        component = $componentController('googleMapsPolyline', null, {
          mapPoints: mapPoints,
          loadStatusCode: 'Delivered'
        });

        component.mapsCtrl = { map: {}};

        component.$onInit();
        scope.$digest();
      });

      it('should create a Polyline', function() {
        expect(polyLineSpy).toHaveBeenCalled();
      });

      it('compileRoutes() SHOULD compile the incomplete route for ', function() {
        expect(component.incompleteRoute).toEqual([]);
      });

      it('compileRoutes() SHOULD compile the complete route', function() {
        expect(component.completedRoute).toEqual([{lat: 1, lng: 1}, {lat: 3, lng: 3}]);
      });

    });

  });
});
