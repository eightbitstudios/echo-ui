
describe('Component: reportDeliveryModal', function () {
  var component, $q, modalActions, items, loadsApi, DateTimePickerModel, scope, element, state;

  beforeEach(function () {
    module('app/common/components/modal/milestones/report-delivery-modal/report-delivery-modal.template.html');
    module('echo.components.modal.milestones.reportDelivery', function ($provide) {
      $provide.value('loadsApi', loadsApi = jasmine.createSpyObj('loadsApi', ['createReportDelivered']));
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
    }, timeZones: {}, reportDelivery: { lastActionDate: {}}, carrierId: 1 });
     component.$onInit();
  }));

 describe('Function: saveReportEmpty', function () {    
    var updateReportDeliveredDefer;
    beforeEach(function() {
      updateReportDeliveredDefer = $q.defer();
      loadsApi.createReportDelivered.and.returnValue(updateReportDeliveredDefer.promise);
    });

   it('should save report delivered', function() {
     component.saveReportEmpty();
     expect(loadsApi.createReportDelivered).toHaveBeenCalled();
   });

    it('should close modal when saved', function (done) {
      updateReportDeliveredDefer.resolve();
      component.saveReportEmpty();
      
      loadsApi.createReportDelivered().then(function() {
        expect(component.modalActions.close).toHaveBeenCalledWith(true);
        done();
      });

      scope.$digest();
    });
  });
});