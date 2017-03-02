
describe('Component: sendLoadUpdateModal', function () {
  var component, $q, modalServiceOpenDefer, modalActions, loadsApi, modalService, LocationModel, DateTimePickerModel, DriverModel, arrivalTypeEnums, loadUpdateOptionEnums, scope, element, state;

  beforeEach(function () {
    module('app/common/components/modal/milestones/send-load-update-modal/send-load-update-modal.template.html');
    module('echo.components.modal.milestones.sendLoadUpdate', function ($provide) {
      $provide.value('loadsApi', loadsApi = jasmine.createSpyObj('loadsApi', ['createReportLocation', 'createReportTrailer', 'assignDriver']));
      $provide.value('modalService', modalService = jasmine.createSpyObj('modalService', ['open']));
      $provide.value('LocationModel', LocationModel = function(){
        return jasmine.createSpyObj('location', ['isValid']);
      });
      $provide.value('DateTimePickerModel', DateTimePickerModel = function(data){
        _.assign(this, data);
        this.getDateTime = _.noop;
      });
      $provide.value('DriverModel', DriverModel = function(data){
        _.assign(this, data);
      });
    });
  });

  beforeEach(inject(function ($rootScope, _$q_, $compile, $componentController, _arrivalTypeEnums_, _loadUpdateOptionEnums_) {
    scope = $rootScope.$new();
    arrivalTypeEnums = _arrivalTypeEnums_;
    loadUpdateOptionEnums = _loadUpdateOptionEnums_;
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

    component = $componentController('sendLoadUpdateModal', null, { modalActions: modalActions, load: {
      nextAction: {},
      loadNumber: 12344321
    }, timeZones: {}, sendLoadUpdate: {}, reportArrival: {}, carrierId: 1 });
    component.$onInit();
  }));

  describe('Function: translateCardLabel', function () {
    it('should return trailer drop description', function () {
      expect(component.translateCardLabel(loadUpdateOptionEnums.TRAILER_DROP.value)).toEqual(loadUpdateOptionEnums.TRAILER_DROP.description);
    });
  });

  describe('Function: showOption', function () {
    it('should show location', function () {
      component.showOption(loadUpdateOptionEnums.LOCATION.value);
      expect(component.currentStep).toEqual(component.modes.location);
    });

    it('should show trailer drop', function () {
      component.showOption(loadUpdateOptionEnums.TRAILER_DROP.value);
      expect(component.currentStep).toEqual(component.modes.trailerDropOff);
    });

    it('should show trailer pickup', function () {
      component.showOption(loadUpdateOptionEnums.TRAILER_PICKUP.value);
      expect(component.currentStep).toEqual(component.modes.trailerPickup);
    });

    it('should show arrival at delivery', function () {
      component.showOption(loadUpdateOptionEnums.ARRIVAL_AT_DELIVERY.value);
      expect(modalService.open).toHaveBeenCalled();
      expect(modalActions.close).toHaveBeenCalled();
    });

    it('should show overview', function () {
      component.showOption();
      expect(component.currentStep).toEqual(component.modes.overview);
    });
  });

  describe('Function: confirmLocation', function () {
    var updateLocationDefer;
    beforeEach(function() {
      updateLocationDefer = $q.defer();
      loadsApi.createReportLocation.and.returnValue(updateLocationDefer.promise);
    });

    it('should call update location', function () {
      component.confirmLocation();
      expect(loadsApi.createReportLocation).toHaveBeenCalled();
    });

    it('should close modal when saved', function (done) {
      updateLocationDefer.resolve();
      component.confirmLocation();

      loadsApi.createReportLocation().then(function() {
        expect(component.modalActions.close).toHaveBeenCalledWith(true);
        done();
      });

      scope.$digest();
    });
  });

  describe('Function: confirmDropOff', function () {
    var updateDropOffDefer;
    beforeEach(function() {
      updateDropOffDefer = $q.defer();
      loadsApi.createReportTrailer.and.returnValue(updateDropOffDefer.promise);
    });

    it('should call update drop off', function () {
      component.confirmDropOff();
      expect(loadsApi.createReportTrailer).toHaveBeenCalled();
    });

    it('should close modal when saved', function (done) {
      updateDropOffDefer.resolve();
      component.confirmDropOff();

      loadsApi.createReportTrailer().then(function() {
        expect(component.modalActions.close).toHaveBeenCalledWith(true);
        done();
      });

      scope.$digest();
    });
  });

  describe('Function: confirmPickup', function () {
    var updatePickupDefer;
    var assignDriverDefer;
    beforeEach(function() {
      updatePickupDefer = $q.defer();
      assignDriverDefer = $q.defer();
      loadsApi.createReportTrailer.and.returnValue(updatePickupDefer.promise);
      loadsApi.assignDriver.and.returnValue(assignDriverDefer.promise);
    });

    it('should call update pickup', function () {
      assignDriverDefer.resolve();
      component.confirmPickup();

      scope.$digest();

      expect(loadsApi.createReportTrailer).toHaveBeenCalled();
    });

    it('should close modal when saved', function () {
      updatePickupDefer.resolve();
      assignDriverDefer.resolve();
      component.confirmPickup();

      scope.$digest();

      expect(component.modalActions.close).toHaveBeenCalledWith(true);
    });
  });

  describe('Function: confirmDropOffDisabled', function () {

    it('should enable confirm drop off button', function () {
      component.location.isValid.and.returnValue(true);
      expect(component.confirmDropOffDisabled()).toBeFalsy();
    });

    it('should disable confirm drop off button', function () {
      component.location.isValid.and.returnValue(false);
      expect(component.confirmDropOffDisabled()).toBeTruthy();
    });
  });
});
