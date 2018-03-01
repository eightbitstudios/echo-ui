
describe('Component: reportDeliveryModal', function () {
  var component, $q, modalActions, items, loadsApi, DateTimePickerModel, scope, element, state;

  beforeEach(function () {
    module('report-delivery-modal.component.html');
    module('echo.components.modal.milestones.reportDelivery', function ($provide) {
      $provide.value('loadsApi', loadsApi = jasmine.createSpyObj('loadsApi', ['createReportDelivered', 'createFeedback']));
      $provide.value('DateTimePickerModel', DateTimePickerModel = function(data){
        _.assign(this, data);
        this.getDateTime = _.noop;
      });
    });
  });

  beforeEach(inject(function ($rootScope, _$q_, $compile, $componentController) {
    scope = $rootScope.$new();
    $q = _$q_;
    scope.ctrl = {
      getComponent: jasmine.createSpy('getComponent')
    };

    scope.$digest();

    modalActions = jasmine.createSpyObj('modalActions', ['close']);

    component = $componentController('reportDeliveryModal', null, { modalActions: modalActions, load: {
      nextAction: {},
      items: items
    }, timeZones: {}, reportDelivery: { actionPerformedOn: {}}, carrierId: 1 });
     component.$onInit();
  }));

 describe('Function: saveReportEmpty', function () {
    var updateReportDeliveredDefer;
    var createFeedbackDefer;
    beforeEach(function() {
      updateReportDeliveredDefer = $q.defer();
      createFeedbackDefer = $q.defer();
      loadsApi.createReportDelivered.and.returnValue(updateReportDeliveredDefer.promise);
      loadsApi.createFeedback.and.returnValue(createFeedbackDefer.promise);
    });

   it('should save report delivered', function() {
     component.saveReportEmpty();
     expect(loadsApi.createReportDelivered).toHaveBeenCalled();
   });

    it('should close modal when saved', function () {
      updateReportDeliveredDefer.resolve();
      createFeedbackDefer.resolve();
      component.saveReportEmpty();

      scope.$digest();

      expect(component.modalActions.close).toHaveBeenCalledWith(true);
    });
  });
});
