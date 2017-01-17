
describe('Component: reportArrivalModal', function () {
  var component, $q, modalActions, items, loadsApi, modalService, DateTimePickerModel, scope, element, state;

  beforeEach(function () {
    module('app/common/components/modal/milestones/report-arrival-modal/report-arrival-modal.template.html');
    module('echo.components.modal.milestones.reportArrival', function ($provide) {
      $provide.value('loadsApi', loadsApi = jasmine.createSpyObj('loadsApi', ['createReportArrivalByLoadGuid']));
      $provide.value('modalService', modalService = jasmine.createSpyObj('modalService', ['open']));
      $provide.value('CheckboxModel', jasmine.createSpy('CheckboxModel'));
      $provide.value('LocationModel', jasmine.createSpy('LocationModel'));
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

    modalActions = jasmine.createSpyObj('modalActions', ['close']);
    scope.$digest();

    component = $componentController('reportArrivalModal', null, { modalActions: modalActions, load: {
      nextAction: {}
    }, reportArrival: {
      actionPerformedOn: {},
      address: {
        stopType: 'Pick'
      }
    }, arrivalType: {}, timeZones: {}, reportEmpty: {}, carrierId: 1 });
    component.$onInit();
  }));

 describe('Function: confirmArrivalHandler', function () {
    var updateReportArrivalDefer;
    beforeEach(function() {
      updateReportArrivalDefer = $q.defer();
      loadsApi.createReportArrivalByLoadGuid.and.returnValue(updateReportArrivalDefer.promise);
    });

   it('should save report arrival', function() {
     component.confirmArrivalHandler();
     expect(loadsApi.createReportArrivalByLoadGuid).toHaveBeenCalled();
   });

    it('should close modal when saved', function (done) {
      updateReportArrivalDefer.resolve();
      component.confirmArrivalHandler();

      loadsApi.createReportArrivalByLoadGuid().then(function() {
        expect(component.modalActions.close).toHaveBeenCalledWith(true);
        done();
      });

      scope.$digest();
    });
  });

});
