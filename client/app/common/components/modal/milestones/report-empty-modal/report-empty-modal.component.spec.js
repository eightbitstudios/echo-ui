
describe('Component: reportEmptyModal', function () {
  var component, $q, modalActions, items, loadsApi, modalService, DateTimePickerModel, scope, element, state;

  beforeEach(function () {
    module('app/common/components/modal/milestones/report-empty-modal/report-empty-modal.template.html');
    module('echo.components.modal.milestones.reportEmpty', function ($provide) {
      $provide.value('loadsApi', loadsApi = jasmine.createSpyObj('loadsApi', ['createReportEmpty']));
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
    items = [];
    scope.$digest();

    component = $componentController('reportEmptyModal', null, { modalActions: modalActions, load: {
      nextAction: {},
      items: items
    }, timeZones: {}, reportEmpty: {}, carrierId: 1 });
     component.$onInit();
  }));

  describe('Function: isNextStepEnabled', function () {
   it('should enable next button', function() {

    component.checkboxItems.equipmentCheckbox.isChecked = true;
    component.checkboxItems.serviceCheckbox.isChecked = true;
    component.checkboxItems.instructionCheckbox.isChecked = true;

    expect(component.isNextStepEnabled()).toBeTruthy();
   });

  it('should disable next button', function() {

    component.checkboxItems.equipmentCheckbox.isChecked = true;
    component.checkboxItems.serviceCheckbox.isChecked = false;
    component.checkboxItems.instructionCheckbox.isChecked = true;

    expect(component.isNextStepEnabled()).toBeFalsy();
   });
  });

 describe('Function: saveReportEmpty', function () {    
    var updateReportEmptyDefer;
    beforeEach(function() {
      updateReportEmptyDefer = $q.defer();
      loadsApi.createReportEmpty.and.returnValue(updateReportEmptyDefer.promise);
    });

   it('should save report empty', function() {
     component.saveReportEmpty();
     expect(loadsApi.createReportEmpty).toHaveBeenCalled();
   });

    it('should close modal when saved', function (done) {
      updateReportEmptyDefer.resolve();
      component.saveReportEmpty();
      
      loadsApi.createReportEmpty().then(function() {
        expect(component.modalActions.close).toHaveBeenCalledWith(true);
        done();
      });

      scope.$digest();
    });
  });

});