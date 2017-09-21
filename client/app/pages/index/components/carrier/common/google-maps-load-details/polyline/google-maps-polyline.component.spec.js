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

      it('parseMapPoints() SHOULD get the position for each marker', function() {
        expect(component.trackAndTraceMapPointPosition).toBeUndefined();
      });

      it('compileRoutes() SHOULD compile the incomplete route for ', function() {
        expect(component.incompleteRoute).toEqual([ ]);
      });

      it('compileRoutes() SHOULD compile the complete route', function() {
        expect(component.completedRoute).toEqual([ ]);
      });

    });

    describe('when there is only an ORIGIN and DESTINATION', function () {
      beforeEach(function() {

        var mapPoints = [
            new MapPointModel({mapPointType: 'ORIGIN', position: {lat: 1, lng: 1}, schedule: completeSchedule }),
            new MapPointModel({mapPointType: 'DESTINATION', position: {lat: 2, lng: 1}, schedule: incompleteSchedule})
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

      it('parseMapPoints() SHOULD get the position for each marker', function() {
        expect(component.trackAndTraceMapPointPosition).not.toBeDefined();
      });

      it('compileRoutes() SHOULD compile the incomplete route for ', function() {
        expect(component.incompleteRoute).toEqual([{lat: 1, lng: 1}, {lat: 2, lng: 1}]);
      });

      it('compileRoutes() SHOULD compile the complete route: there is none', function() {
        //
        expect(component.completedRoute).toEqual([{ lat: 1, lng: 1 }]);
      });

    });

    describe('when there is with  ORIGIN, DESTINATION, and TRACK_AND_TRACE', function () {
      beforeEach(function() {
        var mapPoints = [
          new MapPointModel({mapPointType: 'ORIGIN', position: {lat: 1, lng: 1}, schedule: completeSchedule}),
          new MapPointModel({mapPointType: 'COMPLETE', position: {lat: 2, lng: 1}, schedule: completeSchedule}),
          new MapPointModel({mapPointType: 'INCOMPLETE', position: {lat: 3, lng: 1}, schedule: incompleteSchedule}),
          new MapPointModel({mapPointType: 'DESTINATION', position: {lat: 4, lng: 1}, schedule: incompleteSchedule}),
          new MapPointModel({mapPointType: 'TRACK_AND_TRACE', position: {lat: 5, lng: 1}, schedule: null})
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

      it('parseMapPoints() SHOULD get the position for each marker', function() {
        expect(component.trackAndTraceMapPointPosition).toEqual({lat: 5, lng: 1});
      });

      it('compileRoutes() SHOULD compile the incomplete route for ', function() {
        expect(component.incompleteRoute).toEqual([{lat: 5, lng: 1},{lat: 3, lng: 1},{lat: 4, lng: 1}]);
      });

      it('compileRoutes() SHOULD compile the complete route', function() {
        expect(component.completedRoute).toEqual([{lat: 1, lng: 1},{lat: 2, lng: 1}, {lat: 5, lng: 1}]);
      });

    });

    describe('when the load is CANCELED and there is with ORIGIN, DESTINATION, and TRACK_AND_TRACE', function () {
      beforeEach(function() {
        var mapPoints = [
          new MapPointModel({mapPointType: 'ORIGIN', position: {lat: 1, lng: 1}, schedule: completeSchedule}),
          new MapPointModel({mapPointType: 'DESTINATION', position: {lat: 3, lng: 3}, schedule: incompleteSchedule}),
          new MapPointModel({mapPointType: 'TRACK_AND_TRACE', position: {lat: 2, lng: 1}})
        ];

        component = $componentController('googleMapsPolyline', null, {
          mapPoints: mapPoints,
          loadStatusCode: 'Cancelled'
        });

        component.mapsCtrl = { map: {}};

        component.$onInit();
        scope.$digest();
      });

      it('should create a Polyline', function() {
        expect(polyLineSpy).not.toHaveBeenCalled();
      });

      it('parseMapPoints() SHOULD get the position the track and trace marker', function() {
        expect(component.trackAndTraceMapPointPosition).toEqual(undefined);
      });

      it('compileRoutes() SHOULD compile the incomplete route for ', function() {
        expect(component.incompleteRoute).toEqual([]);
      });

      it('compileRoutes() SHOULD compile the complete route', function() {
        expect(component.completedRoute).toEqual([]);
      });

    });


    describe('when the load is UNLOADING and there is an ORIGIN, DESTINATION, and TRACK_AND_TRACE', function () {
      beforeEach(function() {
        var mapPoints = [
          new MapPointModel({mapPointType: 'ORIGIN', position: {lat: 1, lng: 1}, schedule: new StopScheduleModel({actualDeparture: new Date(20170418)})}),
          new MapPointModel({mapPointType: 'DESTINATION', position: {lat: 3, lng: 3}, schedule: new StopScheduleModel({actualArrival: new Date(new Date(20170423))})})
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

      it('parseMapPoints() SHOULD get the position for each marker', function() {
        expect(component.trackAndTraceMapPointPosition).not.toBeDefined();
      });

      it('compileRoutes() SHOULD compile the incomplete route for ', function() {
        expect(component.incompleteRoute).toEqual([{lat: 3, lng: 3}]);
      });

      it('compileRoutes() SHOULD compile the complete route', function() {
        expect(component.completedRoute).toEqual([{lat: 1, lng: 1}, {lat: 3, lng: 3}]);
      });

    });

    describe('when the load is DELIVERED and there is with ORIGIN, DESTINATION, and TRACK_AND_TRACE', function () {
      beforeEach(function() {
        var mapPoints = [
          new MapPointModel({mapPointType: 'ORIGIN', position: {lat: 1, lng: 1}, schedule: new StopScheduleModel({actualDeparture: new Date()})}),
          new MapPointModel({mapPointType: 'DESTINATION', position: {lat: 3, lng: 3}, schedule: new StopScheduleModel({actualDeparture: new Date()})})
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

      it('parseMapPoints() SHOULD get the position for each marker', function() {
        expect(component.trackAndTraceMapPointPosition).not.toBeDefined();
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
