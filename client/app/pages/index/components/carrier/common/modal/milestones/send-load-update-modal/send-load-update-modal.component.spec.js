describe('Component: sendLoadUpdateModal', function() {
  var component, $q, modalServiceOpenDefer, modalActions, loadsApi, modalService, LocationModel, DateTimePickerModel, DriverModel, arrivalTypeConstants, loadUpdateOptionConstants, scope, element, state;

  beforeEach(function() {
    module('send-load-update-modal.component.html');
    module('echo.components.modal.milestones.sendLoadUpdate', function($provide) {
      $provide.value('loadsApi', loadsApi = jasmine.createSpyObj('loadsApi', ['createReportLocation', 'createReportTrailer', 'assignDriver']));
      $provide.value('modalService', modalService = jasmine.createSpyObj('modalService', ['open']));
      $provide.value('LocationModel', LocationModel = function() {
        return jasmine.createSpyObj('location', ['isValid']);
      });
      $provide.value('DateTimePickerModel', DateTimePickerModel = function(data) {
        _.assign(this, data);
        this.getDateTime = _.noop;
      });
      $provide.value('DriverModel', DriverModel = function(data) {
        _.assign(this, data);
      });
    });
  });

  beforeEach(inject(function($rootScope, _$q_, $compile, $componentController, _arrivalTypeConstants_, _loadUpdateOptionConstants_) {
    scope = $rootScope.$new();
    arrivalTypeConstants = _arrivalTypeConstants_;
    loadUpdateOptionConstants = _loadUpdateOptionConstants_;
    $q = _$q_;
    scope.ctrl = {
      getComponent: jasmine.createSpy('getComponent')
    };

    modalServiceOpenDefer = $q.defer();

    modalService.open.and.returnValue({
      result: modalServiceOpenDefer.promise
    });

    modalActions = jasmine.createSpyObj('modalActions', ['close']);

    scope.$digest();

    component = $componentController('sendLoadUpdateModal', null, {
      modalActions: modalActions,
      load: {
        nextAction: {},
        loadNumber: 12344321
      },
      timeZones: {},
      sendLoadUpdate: {},
      reportArrival: {},
      carrierId: 1
    });
    component.$onInit();
  }));

  describe('Function: translateCardLabel', function() {
    it('should return trailer drop description', function() {
      component.load.driver = {
        id: 1
      };
      component.$onInit();
      expect(component.assignDriver).toBeDefined();
    });
  });

  describe('Function: $onInit', function() {
    it('should set assigned driver', function() {
      expect(component.translateCardLabel(loadUpdateOptionConstants.TRAILER_DROP.value)).toEqual(loadUpdateOptionConstants.TRAILER_DROP.description);
    });
  });

  describe('Function: showOption', function() {
    it('should show location', function() {
      component.showOption(loadUpdateOptionConstants.LOCATION.value);
      expect(component.currentStep).toEqual(component.modes.location);
    });

    it('should show trailer drop', function() {
      component.showOption(loadUpdateOptionConstants.TRAILER_DROP.value);
      expect(component.currentStep).toEqual(component.modes.trailerDropOff);
    });

    it('should show trailer pickup', function() {
      component.showOption(loadUpdateOptionConstants.TRAILER_PICKUP.value);
      expect(component.currentStep).toEqual(component.modes.trailerPickup);
    });

    it('should show arrival at delivery', function() {
      component.showOption(loadUpdateOptionConstants.ARRIVAL_AT_DELIVERY.value);
      expect(modalService.open).toHaveBeenCalled();
      expect(modalActions.close).toHaveBeenCalled();
    });

    it('should show single address', function() {
      component.load.delivery = [{id:1}, {id:2}];
      component.showOption(loadUpdateOptionConstants.ARRIVAL_AT_DELIVERY.value);
      expect(modalService.open).toHaveBeenCalled();
    });

    it('should show overview', function() {
      component.showOption();
      expect(component.currentStep).toEqual(component.modes.overview);
    });
  });

  describe('Function: confirmLocation', function() {
    var updateLocationDefer;
    beforeEach(function() {
      updateLocationDefer = $q.defer();
      loadsApi.createReportLocation.and.returnValue(updateLocationDefer.promise);
    });

    it('should call update location', function() {
      component.confirmLocation();
      expect(loadsApi.createReportLocation).toHaveBeenCalled();
    });

    it('should close modal when saved', function(done) {
      updateLocationDefer.resolve();
      component.confirmLocation();

      loadsApi.createReportLocation().then(function() {
        expect(component.modalActions.close).toHaveBeenCalledWith(true);
        done();
      });

      scope.$digest();
    });

    it('should show error message', function() {
      var error = {
        code: 500
      };

      updateLocationDefer.reject(error);
      component.confirmLocation();

      scope.$digest();

      expect(component.errorCode).toBe(error.code);
    });
  });

  describe('Function: confirmDropOff', function() {
    var updateDropOffDefer;
    beforeEach(function() {
      updateDropOffDefer = $q.defer();
      loadsApi.createReportTrailer.and.returnValue(updateDropOffDefer.promise);
    });

    it('should call update drop off', function() {
      component.confirmDropOff();
      expect(loadsApi.createReportTrailer).toHaveBeenCalled();
    });

    it('should close modal when saved', function(done) {
      updateDropOffDefer.resolve();
      component.confirmDropOff();

      loadsApi.createReportTrailer().then(function() {
        expect(component.modalActions.close).toHaveBeenCalledWith(true);
        done();
      });

      scope.$digest();
    });

    it('should show error message', function() {
      var error = {
        code: 500
      };

      updateDropOffDefer.reject(error);
      component.confirmDropOff();

      scope.$digest();

      expect(component.errorCode).toBe(error.code);
    });
  });

  describe('Function: confirmPickup', function() {
    var updatePickupDefer;
    var assignDriverDefer;
    beforeEach(function() {
      updatePickupDefer = $q.defer();
      assignDriverDefer = $q.defer();
      loadsApi.createReportTrailer.and.returnValue(updatePickupDefer.promise);
      loadsApi.assignDriver.and.returnValue(assignDriverDefer.promise);
    });

    it('should call update pickup', function() {
      assignDriverDefer.resolve();
      component.confirmPickup();

      scope.$digest();

      expect(loadsApi.createReportTrailer).toHaveBeenCalled();
    });

    it('should close modal when saved', function() {
      updatePickupDefer.resolve();
      assignDriverDefer.resolve();
      component.confirmPickup();

      scope.$digest();

      expect(component.modalActions.close).toHaveBeenCalledWith(true);
    });

    it('should show error message', function() {
      var error = {
        code: 500
      };

      updatePickupDefer.reject(error);
      component.confirmPickup();

      scope.$digest();

      expect(component.errorCode).toBe(error.code);
    });
  });

  describe('Function: confirmDropOffDisabled', function() {

    it('should enable confirm drop off button', function() {
      component.location.isValid.and.returnValue(true);
      expect(component.confirmDropOffDisabled()).toBeFalsy();
    });

    it('should disable confirm drop off button', function() {
      component.location.isValid.and.returnValue(false);
      expect(component.confirmDropOffDisabled()).toBeTruthy();
    });
  });

  describe('Function: assignDriver', function() {

    it('should call assign driver service', function() {
      var loadNumber = 1234,
        driverId = 1;

      component.assignDriver(loadNumber, driverId);
      expect(loadsApi.assignDriver).toHaveBeenCalledWith(loadNumber, driverId);
    });

    it('should not call assign driver service if driverId isnt set', function() {
      var loadNumber = 1234;

      component.assignDriver(loadNumber);
      expect(loadsApi.assignDriver).not.toHaveBeenCalled();
    });
  });
});